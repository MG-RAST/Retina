(function () {
    var root = this;
    var stm = root.stm = {};

    /*
      Setup
     */
    stm.Config = typeof RetinaConfig == 'undefined' ? {} : RetinaConfig;

    // set up / reset the DataHandler
    stm.init = function (params) {

	// global variables
	stm.DataStore = [];
	stm.DataRepositories = params.DataRepositories || [];
	stm.CallbackList = [];
	stm.DataRepositoryDefault = params.DataRepositoryDefault || null;
	stm.SourceOrigin = params.SourceOrigin || "*";
	stm.TargetOrigin = params.TargetOrigin || "*";
	stm.Authentication = params.Authentication || null;
	stm.AuthHeaderName = params.AuthHeaderName || 'AUTH';
	if (params && params.Data) {
	    stm.import_data({ merge: false, data: params.Data });
	}
    };
    
    // adds / replaces a repository in the stm.DataRepositories list
    stm.add_repository = function (params) {
	stm.DataRepositories[params.name] = { url: params.url,
					      name: params.name,
					      description: params.description || "",
					      auth: params.auth || false };
	if (stm.DataRepositoryDefault == null || params.isDefault) {
	    stm.DataRepositoryDefault = stm.DataRepositories[params.name];
	}
    };
    
    // removes a repository from the stm.DataRepositories list
    stm.remove_repository = function (name) {
	delete stm.DataRepositories[name];
    };
    
    // sets the default repository
    stm.default_repository = function (name) {
	if (name && stm.DataRepositories[name]) {
	    stm.DataRepositoryDefault = stm.DataRepositories[name];
	}
	return stm.DataRepositoryDefault;
    };
    
    /*
      Data Import
     */

    // import a JSON data structure into the DataStore
    stm.import_data = function (params) {
	var merge = params.hasOwnProperty('merge') ? params.merge : true;
	var data = params.data;
	
	if (params.structure == 'instance') {
	    var identifier = params.id || data.id;
	    if (! stm.DataStore.hasOwnProperty(params.type)) {
		stm.DataStore[params.type] = {};
	    }
	    stm.DataStore[params.type][identifier] = data;
	} else if (params.structure == 'list') {
	    var identifier = params.id || "id";
	    if (! stm.DataStore.hasOwnProperty(params.type) || ! merge) {
		stm.DataStore[params.type] = {};
	    }
	    for (var i=0;i<data.length;i++) {
		stm.DataStore[params.type][data[i][identifier]] = data[i];
	    }
	} else {
	    for (var i in data) {
		if (data.hasOwnProperty(i)) {
		    if (! stm.DataStore.hasOwnProperty(i) || ! merge) {
			stm.DataStore[i] = {};
		    }
		    for (var h in data[i]) {
			if (data[i].hasOwnProperty(h)) {
			stm.DataStore[i][h] = data[i][h];
			}
		    }
		}
	    }
	}
    };

    // event handler for an input type file element, which interprets the selected file(s)
    // as JSON data and loads them into the DataStore
    stm.file_upload = function (evt, callback_function, callback_parameters) {
	var files = evt.target.files;
	
	if (files.length) {
	    for (var i = 0; i < files.length; i++) {
		var f = files[i];
		var reader = new FileReader();
		reader.onload = (function(theFile) {
		    return function(e) {
			var new_data = JSON.parse(e.target.result.toString().replace(/\n/g, ""));
			stm.import_data({ merge: true, data: new_data });
			if (typeof(callback_function) == 'function') {
			    callback_function.call(null, callback_parameters);
			}
		    };
		})(f);
		reader.readAsText(f);
	    }
	}
    };
    
    // data retrieval from a data source
    stm.get_objects = function (params) {
	var promise = jQuery.Deferred();

	var repo = params['repository'] ? stm.repository(params['repository']) : stm.default_repository();
	params.return_type = params.return_type || 'api';

	var method = 'GET';
	if (params.hasOwnProperty('method')) {
            method = params['method'];
	}

	var type = params['type'];
	var id = params['id'];
	if (params.return_type == 'search') {
	    id = '"'+id+'"';
	}
	if (id) {
	    id = '/'+id;
	} else {
	    id = '';
	}
	var options = params['options'];
	
	var query_params = "";
	if (options) {
	    query_params = "?";
	    for (var i in options) {
		if (typeof options[i] == "object") {
		    for (var h=0;h<options[i].length;h++) {
			query_params += i + '=' + options[i][h] + '&';
		    }
		} else {
		    query_params += i + '=' + options[i] + '&';
		}
	    }
	    query_params = query_params.slice(0,-1);
	}
	
	var base_url = repo.url;
	base_url += "/" + type + id + query_params;
	var xhr = new XMLHttpRequest();
	if (params.errorCallback && typeof params.errorCallback == 'function') {
	    xhr.errorCallback = params.errorCallback;
	}
	xhr.addEventListener("progress", updateProgress, false);
	if ("withCredentials" in xhr) {
	    xhr.open(method, base_url, true);
	} else if (typeof XDomainRequest != "undefined") {
	    xhr = new XDomainRequest();
	    xhr.open(method, base_url);
	} else {
	    if (xhr.errorCallback) {
		xhr.errorCallback.call(null, { "ERROR": "your browser does not support CORS requests" });
	    }
	    console.log("your browser does not support CORS requests");
	    return undefined;
	}
	
	xhr.onload = function() {
	    var retval = JSON.parse(xhr.responseText);
	    if (retval.hasOwnProperty('error')) {
		console.log('Error in stm.get_obects: '+retval.error);
		stm.error = retval.error;
		promise.resolve;
		return;
	    }
	    var progressIndicator = document.getElementById('progressIndicator');
	    if (progressIndicator) {
		document.getElementById('progressBar').innerHTML = "waiting for respose...";
	    }
	    var d = {};
	    switch (params.return_type) {
	    case 'text':
		d[type] = {};
		d[type][params['id']] = retval.data;
		stm.import_data({ "data": d, 'merge': true });
		break;
	    default:
		if (retval.hasOwnProperty('data')) {
		    stm.import_data({ "type": type, "data": retval.data, "merge": true, "structure": 'list' });
		} else {
		    stm.import_data({ "type": type, "data": retval, "merge": true, "structure": 'instance' });
		}
		break;
	    }
	    
	    promise.resolve();
	};
	
	xhr.onerror = function(xhr, error) {
	    if (xhr.errorCallback) {
		xhr.errorCallback.call(null, { "ERROR": error });
	    }
	    console.log("data retrieval failed: "+error);
	    return;
	};
	
	xhr.onabort = function() {
	    if (xhr.errorCallback) {
		xhr.errorCallback.call(null, { "ERROR": "aborted by user" });
	    }
	    console.log("data retrieval was aborted");
	    return;
	};

	if (stm.Authentication) {
	    xhr.setRequestHeader(stm.authHeaderName, stm.Authentication);
	}
	
	var progressIndicator = document.getElementById('progressIndicator');
	if (progressIndicator) {
	    progressIndicator.style.display = "";
	    document.getElementById('progressBar').innerHTML = "requesting data...";
	}

	xhr.send();

	return promise;
    };
    
    function updateProgress (e) {
	var progressBar = document.getElementById('progressBar');
	if (progressBar) {
	    document.getElementById('progressIndicator').style.display = "";	    
	    if (e.loaded) {
		progressBar.innerHTML = "received... "+e.loaded.byteSize();
	    }
	}
    }
        
    // executes the callback functions for a given type
    stm.callback = function (type) {
	type = type.toLowerCase();
	for (var c = 0; c < stm.CallbackList[type].length; c++) {
	    stm.CallbackList[type][c][0].call(null, stm.CallbackList[type][c][1], type);
	}
	stm.CallbackList[type] = null;
    };

    /*
      Data handling / export
     */
    
    // deletes an object from the DataStore
    stm.delete_object = function (type, id) {
	type = type.toLowerCase();
	if (stm.DataStore[type][id]) {
	    delete stm.DataStore[type][id];
	}
    };
    
    // deletes a set of objects from the DataStore
    stm.delete_objects = function (type, ids) {
	type = type.toLowerCase();
	for (var i = 0; i < ids.length; i++) {
	    delete_object(type, ids[i]);
	}
    };
    
    // deletes an entire type from the DataStore
    stm.delete_object_type = function (type) {
	type = type.toLowerCase();
	delete stm.DataStore[type];
    };

    // session dumping
    stm.dump = function () {
	var dstring = "{";
	for (var i in stm.DataStore) {
	    if (stm.DataStore.hasOwnProperty(i)) {
		dstring += '"'+i+'":{';
		var hasOne = false;
		for (var h in stm.DataStore[i]) {
		    if (stm.DataStore[i].hasOwnProperty(h)) {
			hasOne = true;
			dstring += '"'+h+'":'+JSON.stringify(stm.DataStore[i][h]);
			dstring += ",";
		    }
		}
		if (hasOne) {
		    dstring = dstring.slice(0,-1);
		}
		dstring += "},";
	    }
	}
	dstring = dstring.slice(0,-1);
	dstring += "}";
	stm.saveAs(dstring,"session.dump");
	/*var w = window.open('', '_blank', '');
	w.document.open();
	w.document.write(dstring);
	w.document.close();
	w.document.title = "session.dump";*/
    };

    // save as dialog
    stm.saveAs = function (data, filename) {
	try {
	    data = window.btoa(data);
	} catch (err) {
	    var utftext = "";
	    for(var n=0; n<data.length; n++) {
		var c=data.charCodeAt(n);
		if (c<128)
		    utftext += String.fromCharCode(c);
                else if((c>127) && (c<2048)) {
                    utftext += String.fromCharCode((c>>6)|192);
                    utftext += String.fromCharCode((c&63)|128);}
		else {
		    utftext += String.fromCharCode((c>>12)|224);
                    utftext += String.fromCharCode(((c>>6)&63)|128);
                    utftext += String.fromCharCode((c&63)|128);}
            }
	    data = window.btoa(utftext);
	}
	data = 'data:application/octet-stream;base64,'+data;
	
	var anchor = document.createElement('a');
	anchor.setAttribute('download', filename || "download.txt");
	anchor.setAttribute('href', data);
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
    };

    /*
      Frame Messaging
     */

    // receive messages sent from other frames
    //window.addEventListener("message", receiveMessage, false);
    var receiveMessage = stm.receiveMessage = function (event) {

	// do not caputre the event if the allowed origin does not match
	if (stm.SourceOrigin != '*' && event.origin !== stm.SourceOrigin) { return; }
	
	// parse the data into an object
	var data = event.data;
	if (typeof(data) == 'object' && data.hasOwnProperty('type')) {
	    // check what kind of message this is
	    if (type == 'data') {
		// try to load the data
		var d = {};
		d[data.type] = data.data;
		stm.import_data({ "merge": true, "data": d });
	    } else if (type == 'action') {
		data.data = data.data.replace(/##/g, "\\'").replace(/!!/g, '"');
		eval(data.data);
	    } else if (type == 'html') {
		document.getElementById(data.data.target).innerHTML = data.data.data;
	    }
	}
	// alert if the data is not valid json
	else {
	    alert('invalid message received');
	}
    };

    // send data to another iframe
    stm.send_message = function (frame, data, type, no_clear) {
	// if frame is a string, interpret it as an id
	if (typeof(frame) == 'string') {
	    frame = document.getElementById(frame);
	}

	if (! (frame.parent === frame)) {
	    // check if frame is an iframe
	    if (typeof(frame.contentWindow) !== 'undefined') {
		frame = frame.contentWindow;	    
	    }
	}

	// check if frame is now a window object
	if (typeof(frame.postMessage) == 'undefined') {
	    alert('invalid target object');
	}

	// check if a type was passed
	if (! type) {
	    type = 'data';
	}

	if (type == 'data') {

	    // check if data is an array
	    if (typeof(data.length) == 'undefined') {
		data = [ data ];
	    }
	    if (typeof(data[0].type) == 'undefined') {
		alert('invalid data');
	    } else {
		type = data[0].type;
	    }

	}

	// send out the data
	frame.postMessage({ 'type': type, 'data': data }, stm.TargetOrigin);
    };

}).call(this);

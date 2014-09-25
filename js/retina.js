(function () {
    var root = this;
    var Retina = root.Retina = {
	loaded_renderers    : {},  
	loaded_widgets      : {},
	loaded_libraries    : {},
	library_queue       : [],
	RendererInstances   : [],
	WidgetInstances     : []
    };
    
    /*
      initialization
    */
    Retina.init = function (params) {
	Retina.dataServiceURI    = params.dataServiceURI     || "";
	Retina.renderer_resource = params.renderer_resources || "Retina/renderers";
	Retina.widget_resource   = params.widget_resources   || "widgets";
	Retina.library_resource  = params.library_resource   || "Retina/js";
    };
    
    /*
      Widgets
     */
    var Widget = Retina.Widget = {};
    Widget.extend = function (spec) {
	var widget = jQuery.extend(true, {}, Widget);
	spec = (spec || {});
	var about;
	switch (typeof spec.about) {
	case 'function' : about = spec.about();  break;
	case 'object'   : about = spec.about;    break;
	default         : about = {};            break;
	};
	
	if (spec.setup && typeof spec.setup !== 'function') {
	    throw "setup() must be a function returning a string.";
	}
	jQuery.extend(widget, spec);
	
	Retina.extend(widget, {
	    loadRenderer: function (args) {
		return Retina.load_renderer(args);
	    },
	    setup: function (args) { return [] },
	    display: function () {},
	    getJSON: Retina.getJSON
	});
	if (widget.about.name) {
	    if (typeof(Retina.WidgetInstances[widget.about.name]) == 'undefined') {
		Retina.WidgetInstances[widget.about.name] = [];
	    }
	    widget.index = Retina.WidgetInstances[widget.about.name].length;
	    Retina.WidgetInstances[widget.about.name].push(widget);
	} else {
	    alert('called invalid renderer, missing about.name');
	    return null;
	}
	return widget;
    };
    
    Retina.load_widget = function (widget) {
	if (typeof widget == "string") {
	    widget = { name: widget };
	}
	var promise;
	if (Retina.loaded_widgets[widget.name]) {
	    promise = Retina.loaded_widgets[widget.name];
	} else {
	    promise = jQuery.Deferred();
	    Retina.loaded_widgets[widget.name] = promise;
	    
	    var promises = [];
	    
	    var script_url = (widget.hasOwnProperty('resource') ? widget.resource : Retina.widget_resource) + "/widget." + widget.name + ".js";
	    jQuery.getScript(script_url).then(function() {
		var requires = Retina.WidgetInstances[widget.name][0].about.requires;
		for (var i=0; i<requires.length; i++) {
		    promises.push(Retina.load_library(requires[i]));
		}
		var setup = Retina.WidgetInstances[widget.name][0].setup();
		for (var i=0; i<setup.length; i++) {
		    promises.push(setup[i]);
		}
		
		jQuery.when.apply(this, promises).then(function() {
		    promise.resolve();
		});
	    }, function(jqXHR, textStatus, errorThrown) {
		if (textStatus === 'parsererror') {
		    console.log(errorThrown);
		    Retina.parserError(script_url);
		}
	    });
	}
	
	return promise;
    };

    Widget.create = function (element, args, nodisplay) {
	var widgetInstance = jQuery.extend(true, {}, Retina.WidgetInstances[element][0]);
	widgetInstance.index = Retina.WidgetInstances[element].length;
	jQuery.extend(true, widgetInstance, args);
	Retina.WidgetInstances[element].push(widgetInstance);

	if (! nodisplay) {
	    widgetInstance.display(args);
	}
	
	return widgetInstance;
    };
    
    /*
      Renderers
     */
    var Renderer = Retina.Renderer = {};
    Renderer.extend = function (spec) {
	var renderer = jQuery.extend(true, {}, Renderer);
	renderer.settings = {};
	spec = (spec || {});
	jQuery.extend(renderer, spec);
	jQuery.extend(true, renderer.settings, renderer.about.defaults);
	if (renderer.about.name) {
	    if (typeof(Retina.RendererInstances[renderer.about.name]) == 'undefined') {
		Retina.RendererInstances[renderer.about.name] = [];
	    }
	    renderer.index = Retina.RendererInstances[renderer.about.name].length;
	    Retina.RendererInstances[renderer.about.name].push(renderer);
	} else {
	    alert('called invalid renderer, missing about.name');
	    return null;
	}
	
	return renderer;
    };

    Retina.load_renderer = function (renderer, synch) {
	if (typeof renderer == "string") {
	    renderer = { name: renderer };
	}
	var promise;
	if (Retina.loaded_renderers[renderer.name]) {
	    promise = Retina.loaded_renderers[renderer.name];
	} else {
	    promise = jQuery.Deferred();
	    Retina.loaded_renderers[renderer.name] = promise;
	    
	    var promises = [];
	    var script_url = (renderer.hasOwnProperty('resource') ? renderer.resource : Retina.renderer_resource) + "/renderer." + renderer.name + ".js";
	    if (synch) {
		jQuery.ajaxSetup({async:false});
	    }
	    jQuery.getScript(script_url).then(function() {
		var requires = Retina.RendererInstances[renderer.name][0].about.requires;
		for (var i=0; i<requires.length; i++) {
		    promises.push(Retina.load_library(requires[i]));
		}
		
		jQuery.when.apply(this, promises).then(function() {
		    promise.resolve();
		});
	    }, function(jqXHR, textStatus, errorThrown) {
		if (textStatus === 'parsererror') {
		    console.log(errorThrown);
		    Retina.parserError(script_url);
		}
	    });
	    jQuery.ajaxSetup({async:true});
	}

	return promise;
    };

    Renderer.create = function (rend, settings) {
	var renderer_instance = jQuery.extend(true, {}, Retina.RendererInstances[rend][0]);
	renderer_instance.index = Retina.RendererInstances[rend].length;
	jQuery.extend(true, renderer_instance.settings, settings);
	Retina.RendererInstances[rend].push(renderer_instance);
	return renderer_instance;
    };
    
    /*
      Libraries
     */
    Retina.load_library = function (library) {
	var promise;
	var library_resource = Retina.library_resource;
	if (library == undefined) {
	    library = Retina.library_queue[0];
	}
	if (typeof library != "string") {
	    library_resource = library.resource;
	    library = library.name;
	}
	if (Retina.loaded_libraries[library]) {
	    promise = Retina.loaded_libraries[library];
	} else {
	    promise = jQuery.Deferred();
	    Retina.loaded_libraries[library] = promise;
	    
	    if (Retina.library_queue.length) {
		Retina.loaded_libraries[Retina.library_queue[Retina.library_queue.length - 1]].then(Retina.load_library());
		Retina.library_queue.push(library);
		return promise;
	    } else {

		var script_url = library_resource + "/" + library;
		if (library.match(/^http/)) {
		    script_url = library;
		}
		jQuery.getScript(script_url).then(function() {
		    Retina.library_queue.shift();
		    promise.resolve();
		}, function(jqXHR, textStatus, errorThrown) {
		    if (textStatus === 'parsererror') {
			console.log(errorThrown);
			Retina.parserError(script_url);
		    }
		});
	    }
	}
	
	return promise;
    };
    
    Retina.require = function (resource, successCb, errorCb) {
	var promise = Retina.load_library(resource);
	promise.then(successCb, errorCb);
	return promise;
    };

    Retina.parserError = function (script_url) {
	var error = "ParserError: '" + script_url + "' has a syntax error";
	
	if (jQuery.isFunction(alert)) {
	    alert(error);
	}
	
	throw error;
    };

    /*
      Utility fuctions
    */
    Retina.each = function (array, func) {
	for (var i = 0; i < array.length; i++) {
	    func(array[i]);
	}
	return array;
    };
    
    Retina.extend = function (object) {
	Retina.each(Array.prototype.slice.apply(arguments), function (source) {
	    for (var property in source) {
		if (!object[property]) {
		    object[property] = source[property];
		}
	    }
	});
	return object;
    };
    
    Retina.keys = function (object) {
	if (object !== Object(object)) throw new TypeError('Invalid object');
	var keys = [];
	for (var key in object) {
	    if (object.hasOwnProperty(key)) {
		keys[keys.length] = key;
	    }
	}
	return keys;
    };
    
    // Retrieve the values of an object's properties.
    Retina.values = function (object) {
	var values = [];
	for (var key in object) {
	    if (object.hasOwnProperty(key)) {
		values[values.length] = object[key];
	    }
	}
	return values;
    };
    
    Retina.propSort = function(prop, ltr) {
	if (ltr) {
	    return function(a, b) {
		return b[prop] - a[prop];
	    }
	} else {
	    return function(a, b) {
		return a[prop] - b[prop];
	    }
	}
    };
     
    Retina.dataURI = function (path) { return dataServiceURI + path; };
    Retina.getJSON = function (path, callback) {
	var url = Retina.dataURI(path);
	jQuery.ajax({
	    url: url,
	    dataType: 'json',
	    data: [],
	    success: callback,
	    error: function (event, request, settings) {
		console.warn("AJAX error! ", event, request, settings);
	    }
	});
    };
    
    Retina.mouseCoords = function (ev) {
	if (ev.pageX || ev.pageY) {
	    return {
		x: ev.pageX,
		y: ev.pageY
	    };
	}
	return {
	    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
	    y: ev.clientY + document.body.scrollTop - document.body.clientTop
	};
    };

    Retina.capitalize = function (string) {
	if (string == null || string == "") return string;
	return string[0].toUpperCase() + string.slice(1);
    }

    Retina.wait = function (ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
    }

    // get date string from ISO8601 timestamp
    Retina.date_string = function (timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleString();
    };
    
    // awsome code i found to produce RFC4122 complient UUID v4
    Retina.uuidv4 = function(a,b) {
        for (b=a=''; a++<36; b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
        return b;
    };

    // find the x and y coordinates of an object on the page
    Retina.findPos = function (obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
	    do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	    } while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
    }

    Retina.Numsort = function (a, b) {
	return a - b;
    }

    /* create an image from an svg  */
    Retina.svg2png = function (source, target, width, height) {
	Retina.load_library('canvg.js').then( function () {
	    var svg = source.innerHTML;
	    svg = svg.replace(/:/, "");
	    svg = svg.replace(/xlink:/g, "");
	    var canvas = document.createElement('canvas');
	    canvas.setAttribute("width", width+"px");
	    canvas.setAttribute("height", height+"px");
	    target.appendChild(canvas);
	    canvg(canvas, svg);
	} );
    }

    Retina.Base64 = {
	
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	// public method for encoding
	encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
	    
            input = Retina.Base64._utf8_encode(input);
	    
            while (i < input.length) {
		
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		
		if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
                    enc4 = 64;
		}
		
		output = output +
		    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
		    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		
            }
	    
            return output;
	},
	
	// public method for decoding
	decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
	    
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	    
            while (i < input.length) {
		
		enc1 = this._keyStr.indexOf(input.charAt(i++));
		enc2 = this._keyStr.indexOf(input.charAt(i++));
		enc3 = this._keyStr.indexOf(input.charAt(i++));
		enc4 = this._keyStr.indexOf(input.charAt(i++));
		
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		
		output = output + String.fromCharCode(chr1);
		
		if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
		}
		
            }
	    
            output = Retina.Base64._utf8_decode(output);
	    
            return output;
	    
	},
	
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
	    
            for (var n = 0; n < string.length; n++) {
		
		var c = string.charCodeAt(n);
		
		if (c < 128) {
                    utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
		}
		
            }
	    
            return utftext;
	},
	
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
	    
            while ( i < utftext.length ) {
		
		c = utftext.charCodeAt(i);
		
		if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
		}
		else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
		}
		else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
		}
		
            }
	    
            return string;
	}
	
    }

    Retina.cgiParam = function (name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    Retina.dateString = function (date) {
	var d = date || new Date,
	dformat = [d.getFullYear(),
		   (d.getMonth()+1).padLeft(),
		   d.getDate().padLeft()].join('-') +' ' +
            [d.getHours().padLeft(),
             d.getMinutes().padLeft(),
             d.getSeconds().padLeft()].join(':');

	return dformat;
    };

    Number.prototype.formatString = function(c, d, t) {
	var n = this, c = isNaN(c = Math.abs(c)) ? 0 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    Number.prototype.padLeft = function(base,chr){
	var  len = (String(base || 10).length - String(this).length)+1;
	return len > 0? new Array(len).join(chr || '0')+this : this;
    };
    
    Number.prototype.byteSize = function() {
	var size = this;
	var magnitude = "B";
	if (size > 999) {
	    size = size / 1024;
	    magnitude = "KB";
	}
	if (size > 999) {
	    size = size / 1024;
	    magnitude = "MB";
	}
	if (size > 999) {
	    size = size / 1024;
	    magnitude = "GB";
	}
	if (size > 999) {
	    size = size / 1024;
	    magnitude = "TB";
	}
	if (size > 999) {
	    size = size / 1024;
	    magnitude = "PB";
	}
	size = size.toFixed(1);

	size += '';
	var x = size.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
	    x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	size =  x1 + x2;

	return size + " " + magnitude;
    };

    Number.prototype.baseSize = function() {
	var size = this;
	var magnitude = "B";
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "KB";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "MB";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "GB";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "TB";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "PB";
	}
	size = size.toFixed(1);

	size += '';
	var x = size.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
	    x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	size =  x1 + x2;

	return size + " " + magnitude;
    };

    String.prototype.hexDecode = function(){var r='';for(var i=0;i<this.length;i+=2){r+=unescape('%'+this.substr(i,2));}return r;}
    String.prototype.hexEncode = function(){var r='';var i=0;var h;while(i<this.length){h=this.charCodeAt(i++).toString(16);while(h.length<2){h=h;}r+=h;}return r;}

    Array.prototype.max = function() {
	return Math.max.apply(null, this);
    };
    
    Array.prototype.min = function() {
	return Math.min.apply(null, this);
    };

}).call(this);

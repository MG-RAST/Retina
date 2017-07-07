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
	Retina.renderer_resource = params.renderer_resource || "Retina/renderers";
	Retina.widget_resource   = params.widget_resource   || "widgets";
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
		if (Retina.hasOwnProperty('errorCallback') && typeof Retina.errorCallback == 'function') {
		    Retina.errorCallback.call(jqXHR, textStatus, errorThrown);
		} else {
		    if (textStatus === 'parsererror') {
			console.log(errorThrown);
			Retina.parserError(script_url);
		    } else {
			console.log(jqXHR);
		    }
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
		} else {
		    console.log(jqXHR);
		}
	    });
	    jQuery.ajaxSetup({async:true});
	}

	return promise;
    };

    Renderer.create = function (rend, settings, replaceIndex) {
	var renderer_instance = jQuery.extend(true, {}, Retina.RendererInstances[rend][0]);
	if (replaceIndex == null) {
	    renderer_instance.index = Retina.RendererInstances[rend].length;
	} else {
	    renderer_instance.index = replaceIndex;
	}
	jQuery.extend(true, renderer_instance.settings, settings);
	Retina.RendererInstances[rend][renderer_instance.index] = renderer_instance;
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
    
    Retina.keys = function (object, nofunctions) {
	if (object !== Object(object)) return [];//throw new TypeError('Invalid object');
	var keys = [];
	for (var key in object) {
	    if (object.hasOwnProperty(key) && (! nofunctions || typeof object[key] !== "function")) {
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
		return typeof a[prop].localeCompare == 'function' ? b[prop].localeCompare(a[prop]) : b[prop] - a[prop];
	    }
	} else {
	    return function(a, b) {
		return typeof a[prop].localeCompare == 'function' ? a[prop].localeCompare(b[prop]) : a[prop] - b[prop];
	    }
	}
    };
     
    Retina.dataURI = function (path) { return dataServiceURI + path; };
    Retina.getJSON = function (path, callback) {
	var url = Retina.dataURI(path);
	jQuery.ajax({
	    url: url,
	    contentType: 'application/json',
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
    };

    Retina.sortDesc = function (a, b) {
	if (a > b) {
	    return -1;
	} else if (b > a) {
	    return 1;
	} else {
	    return 0;
	}
    };
    
    // parse an XML document
    if (typeof window.DOMParser != "undefined") {
	Retina.parseXML = function(xmlStr) {
            return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
	};
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
	Retina.parseXML = function(xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
	};
    } else {
	throw new Error("No XML parser found");
    }
    
    // strip html from a string
    Retina.htmlFilter = new RegExp("<.+?>", "ig");
    Retina.stripHTML = function(s) {
	return s.replace(Retina.htmlFilter, "");
    }

    /* create an image from an svg  */
    Retina.svg2png = function (source, target, width, height) {
	var promise = jQuery.Deferred();
	Retina.load_library('canvg.js').then( function () {
	    var svg = document.querySelector(source || 'svg');
	    var serializer = new XMLSerializer();
	    svg = serializer.serializeToString(svg);
	    var canvas = document.createElement('canvas');
	    canvas.setAttribute("width", width+"px");
	    canvas.setAttribute("height", height+"px");
	    target.appendChild(canvas);
	    canvg(canvas, svg);
	    promise.resolve();
	} );
	return promise;
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
	var d = (date && typeof date.match != 'function') ? date : new Date(date.replace(/t/, "T"));
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

    Number.prototype.timestring = function(precision, longform) {
	var num = this;
	precision = precision || 0;
	var timestring = "";
	if (num > 999) {
	    if (precision < 1) {
		timestring = " "+(num % 1000)+(longform ? " milliseconds" : "ms");
	    }
	    num = (num / 1000).toFixed();
	} else if (num > 0) {
	    timestring = num+(longform ? " milliseconds" : "ms");
	    num = 0;
	}
	if (num > 59) {
	    if (precision < 2) {
		timestring = " "+(num % 60)+(longform ? " seconds" : "s") + timestring;
	    }
	    num = (num / 60).toFixed();
	} else if (num > 0) {
	    timestring = num + (longform ? " seconds" : "s") + timestring;
	    num = 0;
	}
	if (num > 59) {
	    if (precision < 3) {
		timestring = " "+(num % 60)+(longform ? " minutes" : "m") + timestring;
	    }
	    num = (num / 60).toFixed();
	} else if (num > 0) {
	    timestring = num + (longform ? " minutes" : "m") + timestring;
	    num = 0;
	}
	if (num > 23) {
	    if (precision < 4) {
		timestring = " "+(num % 24)+(longform ? " hours" : "h") + timestring;
	    }
	    num = (num / 24).toFixed();
	} else if (num > 0) {
	    timestring = num + (longform ? " hours" : "h") + timestring;
	    num = 0;
	}
	if (num > 364) {
	    if (precision < 5) {
		timestring = " "+(num % 60)+(longform ? " days" : "d") + timestring;
	    }
	    num = (num / 365).toFixed();
	    timestring = num + (longform ? " years" : "y") + timestring;
	} else if (num > 0) {
	    timestring = num + (longform ? " days" : "d") + timestring;
	    num = 0;
	}

	if (timestring.length == 0) {
	    timestring = "0ms";
	}

	return timestring;
    };

    Number.prototype.baseSize = function() {
	var size = this;
	var magnitude = "bp";
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "Kbp";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "Mbp";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "Gbp";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "Tbp";
	}
	if (size > 999) {
	    size = size / 1000;
	    magnitude = "Pbp";
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

    Retina.reverseComplement = function (seq) {
	var rc = [];
	for (var i=0; i<seq.length; i++) {
	    if (seq.charAt(i) == 'a') {
		rc.push('t');
	    } else if (seq.charAt(i) == 'A') {
		rc.push('T');
	    } else if (seq.charAt(i) == 't') {
		rc.push('a');
	    } else if (seq.charAt(i) == 'T') {
		rc.push('A');
	    } else if (seq.charAt(i) == 'c') {
		rc.push('g');
	    } else if (seq.charAt(i) == 'C') {
		rc.push('G');
	    } else if (seq.charAt(i) == 'g') {
		rc.push('c');
	    } else if (seq.charAt(i) == 'G') {
		rc.push('C');
	    }
	}
	return rc.reverse().join('');
    }

    /* Round a number to a given number of decimal points. */
    Number.prototype.round = function(dec) {
	var num = this;
	return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }
    
    /* calculate the log 10 of a number */
    Retina.log10 = function (val) {
	if (val == 0) {
	    return 0;
	}
	return Math.log(val) / Math.LN10;
    }

    /* get a nice number */
    Retina.niceNum = function (range, round) {
        var exponent = Math.floor(Math.log10(range)); /** exponent of range */
        var fraction = range / Math.pow(10, exponent); /** fractional part of range */
        var niceFraction; /** nice, rounded fraction */
	
        if (round) {
            if (fraction < 1.5) {
                niceFraction = 1;
	    } else if (fraction < 3) {
                niceFraction = 2;
            } else if (fraction < 7) {
                niceFraction = 5;
            } else {
                niceFraction = 10;
	    }
        } else {
            if (fraction <= 1) {
                niceFraction = 1;
            } else if (fraction <= 2) {
                niceFraction = 2;
            } else if (fraction <= 5) {
                niceFraction = 5;
            } else {
                niceFraction = 10;
	    }
        }
	
        return niceFraction * Math.pow(10, exponent);
    }

    /* get a nice scale, min, max and tick interval */
    Retina.niceScale = function (params) {
 	var minPoint = params.min;
	var maxPoint = params.max;
	var maxTicks = params.ticks || 10;
	var range = Retina.niceNum(maxPoint - minPoint, false);
	var tickSpacing = Retina.niceNum(range / (maxTicks - 1), true);
	var niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;;
	var niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
	
	return { min: niceMin, max: niceMax, space: tickSpacing };
    }

    String.prototype.hexDecode = function(){var r='';for(var i=0;i<this.length;i+=2){r+=unescape('%'+this.substr(i,2));}return r;}
    String.prototype.hexEncode = function(){var r='';var i=0;var h;while(i<this.length){h=this.charCodeAt(i++).toString(16);while(h.length<2){h=h;}r+=h;}return r;}

    Array.prototype.max = function() {
	return Math.max.apply(null, this);
    };
    
    Array.prototype.min = function() {
	return Math.min.apply(null, this);
    };

    // matrix functions

    /* do a PCA (MDS) given a distance matrix from Retina.distanceMatrix */
    Retina.pca = function (D) {
	var N = numeric.dim(D)[0];
	var M = numeric.dim(D)[1];
	var centerL = numeric.sub(numeric.identity(N) , numeric.div(numeric.rep([N,N], 1), N));
	var centerR = numeric.sub(numeric.identity(M) , numeric.div(numeric.rep([M,M], 1), M));
	var doublecentered = numeric.dot(numeric.dot(centerL, D), centerR);
	var B = numeric.eig(doublecentered);
	var weights = numeric.div(numeric.mul(B.lambda.x, B.lambda.x), numeric.norm2Squared(B.lambda.x));
	var newcoords = numeric.dot(B.E.x, numeric.diag(numeric.sqrt(numeric.abs(B.lambda.x))));
	
	return { "coordinates": newcoords, "weights": weights };
    };
    
    Retina.transpose = Retina.transposeMatrix = function (matrix) {
	var mnew = [];
	for (var i=0;i<matrix.length; i++) {
	    for (var h=0;h<matrix[i].length;h++) {
		if (! mnew[h]) {
		    mnew[h] = [];
		}
		mnew[h][i] = matrix[i][h];
	    }
	}
	
	return mnew;
    };

    Retina.logMatrix = function (matrix) {
	for (var i=0; i<matrix.length; i++) {
	    for (var h=0; h<matrix[i].length; h++) {
		matrix[i][h] = Retina.log10(matrix[i][h]);
	    }
	}

	return matrix;
    };

    Retina.standardizeMatrix = function (matrix) {
	// calculate the mean of each column
	var sums = [];
	for (var i=0; i<matrix.lenght; i++) {
	    sums[i] = 0;
	    for (var h=0; h<matrix[i].length; h++) {
		sums[i] += matrix[i][h];
	    }
	}
	var means = [];
	for (var i=0; i<sums.length; i++) {
	    means[i] = sums[i] / matrix[i].length;
	}

	// calculate the standard deviation
	sums = [];
	for (var i=0; i<matrix.length; i++) {
	    sums[i] = 0;
	    for (var h=0; h<matrix[i].length; h++) {
		sums[i] += Math.pow(matrix[i][h] - means[i], 2);
	    }
	}
	var devs = [];
	for (var i=0; i<sums.length; i++) {
	    devs[i] = sums[i] / matrix[i].length;
	}
	
	// calculate the standards
	for (var i=0; i<matrix.lenght; i++) {
	    for (var h=0; h<matrix[i].length; h++) {
		matrix[i][h] = (matrix[i][h] - means[i]) / devs[i];
	    }
	}

	return matrix;
    };

    Retina.normalizeMatrix = function (matrix) {
	// first calculate the total for each column
	var sums = [];
	for (var i=0; i<matrix.length; i++) {

	    sums[i] = 0;
	    for (var h=0; h<matrix[i].length; h++) {
		sums[i] += matrix[i][h];
	    }
	}

	// calculate the maximum of the totals
	var max = 0;
	for (var i=0; i<sums.length; i++) {
	    if (max < sums[i]) {
		max = sums[i];
	    }
	}

	// calculate the weight factors for each column
	var factors = [];
	for (var i=0; i<sums.length; i++) {
	    factors[i] = max / sums[i];
	}

	// apply the weight factors to the cells
	for (var i=0; i<matrix.length; i++) {
	    for (var h=0; h<matrix[i].length; h++) {
		matrix[i][h] = parseInt(matrix[i][h] * factors[i]);
	    }
	}

	return matrix;
    };

    Retina.scaleMatrix = function (matrix) {
	var maxes = [];
	var mins = [];
	
	for (var i=0; i<matrix[0].length; i++) {
	    maxes.push(0);
	    mins.push(0);
	}
	
	for (var i=0;i<matrix.length;i++) {
	    for (var h=0; h<matrix[i].length; h++) {
		if (maxes[h]<matrix[i][h]) {
		    maxes[h] = matrix[i][h];
		}
		if (mins[h]>matrix[i][h]) {
		    mins[h] = matrix[i][h];
		}
	    }
	}
	for (var i=0;i<matrix.length;i++) {
	    for (var h=0; h<matrix[i].length; h++) {
		matrix[i][h] = (Math.abs(mins[h]) + matrix[i][h]) / (maxes[h] + Math.abs(mins[h]));
	    }
	}
	
	return matrix;
    };

    Retina.heatMatrix = function (matrix) {
	var sums = [];
	var means = [];
	var mins = [];
	var maxes = [];

	for (var i=0; i<matrix.length; i++) {
	    sums[i] = 0;
	    mins[i] = matrix[i][0];
	    maxes[i] = matrix[i][0];
	    for (var h=0; h<matrix[i].length; h++) {
		if (matrix[i][h] > maxes[i]) {
		    maxes[i] = matrix[i][h];
		}
		if (matrix[i][h] < mins[i]) {
		    mins[i] = matrix[i][h];
		}
		sums[i] += matrix[i][h];
	    }
	}
	for (var i=0; i<sums.length; i++) {
	    means.push(sums[i] / matrix[i].length);
	}
	var retval = [];
	for (var i=0; i<matrix.length; i++) {
	    retval[i] = [];
	    for (var h=0; h<matrix[i].length; h++) {
		var val = matrix[i][h] < means[i] ? 0 - (matrix[i][h] / (means[i] - mins[i])) : matrix[i][h] / (maxes[i] - means[i]);
		retval[i].push(val);
	    }
	}

	return retval;
    };

    Retina.average = function (vector) {
	var sum = 0;
	for (var i=0; i<vector.length; i++) {
	    sum += vector[i];
	}

	return sum / vector.length;
    };
    
    Retina.mean = function (vector) {
	var mean = 0;
	for (var i=0; i<vector.length; i++) {
            mean += vector[i];
	}
	
	return mean / vector.length;
    };

    /* calculate a distance matrix given a matrix and an optional measure */
    Retina.distanceMatrix = function (data, measure) {
	var d = [];
	measure = measure || 'euclidean';
	for (var i=0; i<data.length; i++) {
	    var row = [];
	    for (var h=0; h<data.length; h++) {
		row.push(0);
	    }
	    d.push(row);
	}

	var n = data.length;
	for (var i=0; i<data.length; i++) {
	    for (var h=i; h<data.length; h++) {
		if (i == h) {
		    d[i][h] = 0;
		} else {
		    var intermediate = []; // tested ok
		    for (var j=0; j<data[i].length; j++) {
			intermediate.push([ data[i][j], data[h][j] ]);
		    }
		    
		    switch (measure) {
		    case "euclidean": // tested ok
			var dist = 0;
			for (var j=0; j<data[i].length; j++) {
			    dist += Math.pow(data[i][j] - data[h][j], 2);
			}
			d[i][h] = d[h][i] = Math.sqrt(dist);
			
			break;
			
		    case "maximum": // tested ok
			var dists = [];
			for (var j=0; j<data[i].length; j++) {
			    dists.push(Math.abs(data[i][j] - data[h][j]));
			}
			d[i][h] = d[h][i] = Math.max.apply(null, dists);

			break;
			
		    case "manhattan": // tested ok
			var dist = 0;
			for (var j=0; j<data[i].length; j++) {
			    dist += Math.abs(data[i][j] - data[h][j]);
			}
			d[i][h] = d[h][i] = dist;
			break;
			
		    case "braycurtis": // tested ok
			var s1 = 0;
			var s2 = 0;
			for (var j=0; j<intermediate.length; j++) {
			    s1 += intermediate[j].min();
			    s2 += intermediate[j][0] + intermediate[j][1];
			}
			
			d[i][h] = d[h][i] = 1 - 2 * s1 / s2;
			
		    	break;
			
		    case "minkowski": // there is no difference to euclidean?
			var dist = 0;
			var p = 0.5;
			for (var j=0; j<data[i].length; j++) {
			    dist += Math.pow(Math.abs(data[i][j] - data[h][j]), p);
			}
			d[i][h] = d[h][i] = Math.pow(dist, 1 / p);
			
			break;
		    };
		}
	    }
	}
	
	return d;
    };

    Retina.copyMatrix = function (matrix) {
	var ret = [];
	for (var i=0; i<matrix.length; i++) {
	    ret.push(matrix[i].slice());
	}
	return ret;
    };

    // heatmap / clustering
    Retina.clusterDistance = function (data) {
	var distances = {};
	for (var i=0;i<data.length;i++) {
	    distances[i] = {};
	}
	for (var i=0;i<data.length;i++) {
	    for (var h=0;h<data.length;h++) {
	    	if (i>=h) {
	    	    continue;
	    	}
	    	var dist = 0;
	    	for (var j=0;j<data[i].data[0].length;j++) {
	    	    dist += Math.pow(data[i].data[0][j] - data[h].data[0][j], 2);
	    	}
	    	distances[i][h] = Math.pow(dist, 0.5);
	    }
	}	    
	return distances;
    };

    Retina.cluster = function (data) {
	var num_avail = data.length;
	var avail = {};
	var clusters = [];
	for (var i=0;i<data.length;i++) {
	    clusters.push( { points: [ i ], data: [ data[i] ], basepoints: [ i ], level: [ 0 ] } );
	    avail[i] = true;
	}
	
	// get the initial distances between all nodes
	var distances = Retina.clusterDistance(clusters);
	
	// calculate clusters
	var min;
	var coords;
	while (num_avail > 1) {
	    var found = false;
	    for (var i in distances) {
	    	if (distances.hasOwnProperty(i)) {
	    	    for (var h in distances[i]) {
	    		if (distances[i].hasOwnProperty(h) && avail[i] && avail[h]) {
	    		    min = distances[i][h];
	    		    coords = [ i, h ];
			    found = true;
	    		    break;
	    		}
	    	    }
		    if (found) {
	    		break;
		    }
	    	}
	    }
	    for (var i in distances) {
	    	if (distances.hasOwnProperty(i)) {
	    	    for (var h in distances[i]) {
	    		if (distances[i].hasOwnProperty(h)) {
	    		    if (avail[i] && avail[h] && distances[i][h]<min) {
	    			coords = [ i, h ];
				min  = distances[i][h];
	    		    }
	    		}
	    	    }
	    	}
	    }
	    avail[coords[0]] = false;
	    avail[coords[1]] = false;
	    num_avail--;
	    avail[clusters.length] = true;
	    
	    var sumpa = 0;
	    var sumpb = 0
	    for (var h=0;h<2;h++) {
		for (var i=0;i<clusters[coords[h]].data.length;i++) {
		    if (h==0) {
			sumpa += clusters[coords[h]].data[i];
		    } else {
			sumpb += clusters[coords[h]].data[i];
		    }
	    	}
	    }
	    var pdata = [];
	    var bpoints = [];
	    for (var h=0;h<2;h++) {
		var j = h;
		if (sumpa > sumpb) {
		    if (h==0) { j = 1; } else { j = 0; }
		}
		for (var i=0;i<clusters[coords[j]].data.length;i++) {
	    	    pdata.push(clusters[coords[j]].data[i]);
	    	}
		for (var i=0;i<clusters[coords[j]].basepoints.length;i++) {
		    bpoints.push(clusters[coords[j]].basepoints[i]);
		}
	    }
	    var coord_a = coords[0];
	    var coord_b = coords[1];
	    if (sumpa > sumpb) {
		var triangle = coord_a;
		coord_a = coord_b;
		coord_b = triangle;
	    }
	    coord_a = parseInt(coord_a);
	    coord_b = parseInt(coord_b);
	    
	    clusters.push({ points: [ coord_a, coord_b ], data: pdata, basepoints: bpoints, level: [ clusters[coord_a].level.max() + 1, clusters[coord_b].level.max() + 1 ] });
	    
	    var row_a = [];
	    for (var h=0;h<2;h++) {
	    	for (var i=0;i<clusters[coords[h]].data.length;i++) {
	    	    for (var j=0; j<clusters[coords[h]].data[i].length; j++) {
	    		if (h==0 && i==0) {
	    		    row_a[j] = 0;
	    		}
	    		row_a[j] += clusters[coords[h]].data[i][j];
	    	    }
	    	}
	    }
	    for (var i=0; i<row_a.length; i++) {
	    	row_a[i] = row_a[i] / (clusters[coord_a].data.length + clusters[coord_b].data.length);
	    }
	    var index = clusters.length - 1;
	    distances[index] = {};
	    for (var h=0; h<index; h++) {
	    	var row_b = [];
	    	for (var i=0;i<clusters[h].data.length;i++) {
	    	    for (var j=0; j<clusters[h].data[i].length; j++) {
	    		if (i==0) {
	    		    row_b[j] = 0;
	    		}
	    		row_b[j] += clusters[h].data[i][j];
	    	    }
	    	}
	    	for (var i=0; i<row_b.length; i++) {
	    	    row_b[i] = row_b[i] / clusters[h].data.length;
	    	}
	    	var dist = 0;
	    	for (var i=0;i<row_a.length;i++) {
	    	    dist += Math.pow(row_a[i] - row_b[i], 2);
	    	}
	    	distances[h][index] = Math.pow(dist, 0.5);
	    }
	}
	
	// record the row order after clustering
	var rowindex = [];
	var cind = clusters.length - 1;
	for (var i=0;i<clusters[cind].basepoints.length; i++) {
	    rowindex.push(clusters[cind].basepoints[i] + 1);
	}
	
	// record the reverse row order for lookup
	var roworder = {};
	for (var i=0;i<rowindex.length;i++) {
	    roworder[rowindex[i]] = i;
	}
	
	// get the depth
	var depth = 0;
	for (var i=0; i<clusters.length; i++) {
	    if (clusters[i].level[0] && clusters[i].level[0] > depth) {
		depth = clusters[i].level[0];
	    }
	    if (clusters[i].level[1] && clusters[i].level[1] > depth) {
		depth = clusters[i].level[1];
	    }
	}
	
	// format the cluster data for visualization
	var clusterdata = { "depth": depth };
	for (var i=0;i<clusterdata.depth;i++) {
	    clusterdata[i] = [];
	}
	for (var i=data.length; i<clusters.length; i++) {
	    
	    // get the level this cluster is at
	    var level = clusters[i].level.max() - 1;
	    
	    clusterdata[level].push({a: clusters[clusters[i].points[0]].data.length, b:clusters[clusters[i].points[1]].data.length, amin: roworder[clusters[clusters[i].points[0]].basepoints.min() + 1] });
	    
	    // draw single lines until we reach the next root
	    if (clusters[i].level[0] != clusters[i].level[1]) {
		var n = 0;
		if (clusters[i].level[1] < clusters[i].level[0]) {
		    n = 1;
		}
		for (var h=0;h<Math.abs(clusters[i].level[0] - clusters[i].level[1]);h++) {
		    clusterdata[level - (h+1)].push({ a: clusters[clusters[i].points[n]].data.length, amin: roworder[clusters[clusters[i].points[n]].basepoints.min() + 1] });
		}
	    }
	}
	
	// sort the clusterdata
	var clusterdataout = [];
	for (var i in clusterdata) {
	    if (clusterdata.hasOwnProperty(i) && ! isNaN(i)) {
	    	clusterdataout.push(clusterdata[i].sort(Retina.propSort('amin')));
	    }
	}

	return [clusterdataout, rowindex];
    };

    // END OF MATRIX FUNCTIONS
    
    Retina.idmap = function (id) {

	// this is a decoded id, encode it
	if (id.match(/mgm/) || id.match(/mgp/)) {
	    var text = "";
	    var possible = "abcdef0123456789";
	    for (var i=0; i<10; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    text += Retina.stringToHex(id);
	    id = text;
	}
	// this is an encoded id, decode it
	else {
	    id = Retina.hexToString(id.substr(10));
	}
	return id;
    };

    function d2h(d) {
        return d.toString(16);
    }
    
    function h2d (h) {
        return parseInt(h, 16);
    }
    
    Retina.stringToHex = function (tmp) {
        var str = '',
            i = 0,
            tmp_len = tmp.length,
            c;
     
        for (; i < tmp_len; i += 1) {
            c = tmp.charCodeAt(i);
            str += d2h(c);
        }
        return str;
    };
    
    Retina.hexToString = function (tmp) {
	var l = tmp.length / 2;
	var str = "";
        for (var i=0; i<l; i++) {
            c = String.fromCharCode( h2d( tmp.substr(i*2, 2) ) );
            str += c;
        }
	
        return str;
    };
    
}).call(this);

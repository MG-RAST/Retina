/*
 * retina.js
 *
 */
(function () {
    jQuery.noConflict();
    var root = this;
    var Retina = root.Retina = {};
    var dataServiceURI;
    var renderer_resources  = [];
    var available_renderers = {};
    var loaded_renderers    = {};  
    var widget_resources    = [];
    var available_widgets   = {};
    var loaded_widgets      = {};
    var library_resource    = null;
    var loaded_libraries    = {};
    
    //
    // initialization
    //
    Retina.init = function (settings) {
	var promise = jQuery.Deferred();
	var promises = [];
	
	var rendererResources = settings.renderer_resources;
	if (rendererResources) {
	    for (i in rendererResources) {
		promises.push(Retina.query_renderer_resource(rendererResources[i]));
	    }
	}
	
	var widgetResources = settings.widget_resources;
	if (widgetResources) {
	    for (i in widgetResources) {
		promises.push(Retina.query_widget_resource(widgetResources[i]));
	    }
	}
		
	var libraryResource = settings.library_resource;
	if (libraryResource) {
	    library_resource = libraryResource;
	}
		
	jQuery.when.apply(this, promises).then(function() {
	    promise.resolve();
	});
	
	return promise;
    };
    
    // Utility fuctions
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
	for (var key in this) {
	    if (object.hasOwnProperty(key)) {
		values[values.length] = object[key];
	    }
	}
	return values;
    };
    
    Retina.require = function (resource, successCb, errorCb) {
	var promise = Retina.load_library(resource);
	promise.then(successCb, errorCb);
	return promise;
    }
     
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
    
    Retina.validate = function (obj, schema) {
	if (window.json.validate) {
	    return window.json.validate(obj, schema);
	} else {
	    if (revalidator !== undefined) {
		return revalidator.validate(obj, schema);
	    } else {
		return {valid: false, errors: ['validate function not defined']};
	    }
	}
    }

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

    /* ===================================================
     * Retina.Widget
     */
    var Widget = Retina.Widget = {};
    Widget.extend = function (spec) {
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
	
	var widget = Retina.extend({}, spec);
	Retina.extend(widget, {
	    target: function (target) {
		widget.targetElement = target;
		return widget;
	    },
	    loadRenderer: function (args) {
		return Retina.load_renderer(args);
	    },
	    create: function (element, args) {
		var widgetInstance = {
		    about: function (name) {
			return about[name];
		    }
		};
		Retina.extend(widgetInstance, widget);
		var promises = widgetInstance.setup(args);
		if (!jQuery.isArray(promises)) {
		    throw "setup() needs to return an array";
		}
		jQuery.when.apply(this, promises).then(function () {
		    widgetInstance.display(element, args);
		});
		return widgetInstance;
	    },
	    setup: function (args) { return [] },
	    display: function () {},
	    getJSON: Retina.getJSON
	});
	Retina.extend(widget, Widget);
	if (about.name) {
	    Widget[about.name] = widget;
	}
	return widget;
    };
    
    /* ===================================================
     * Retina.Renderer
     */
    var Renderer = Retina.Renderer = {};
    
    Renderer.extend = function (spec) {
	spec = (spec || {});
	var renderer = Retina.extend({}, spec);
	Retina.extend(renderer, Renderer);
	if (renderer.about.name) {
	    Retina.Renderer[renderer.about.name] = renderer;
	}
	
	var tmpRender = renderer.render;
	renderer.render = function (settings) {
	    settings = (settings || {});
	    if (renderer.about) {
		if (renderer.about.defaults) {
		    Retina.extend(settings, renderer.about.defaults);
		}
		if (renderer.about.setDefaults) {
		    Retina.extend(settings, renderer.about.setDefaults());
		}
	    }
	    
	    // validate(args);
	    if (renderer.about.schema) {
		var check = Retina.validate(settings, renderer.about.schema);
		if (check['valid']) {
		    console.log("automatic validation", renderer.about.name);
		    return tmpRender(settings);
		} else {
		    console.log(check['errors']);
		    return check['errors'];
		}
	    }
	    return tmpRender(settings);
	};
	return renderer;
    };
    
    //
    // resource section
    //
    Retina.query_renderer_resource = function (resource, list) {
	var promise = jQuery.Deferred();
	
	jQuery.getJSON(resource, function (data) {
	    renderer_resources.push(resource);
	    for (i = 0; i < data.length; i++) {
		var rend = {};
		rend.resource = resource;
		rend.name = data[i].substring(data[i].indexOf(".") + 1, data[i].lastIndexOf("."));
		rend.filename = data[i];
		available_renderers[rend.name] = rend;
	    }
	    if (list) {
		Retina.update_renderer_list(list);
	    }
	    promise.resolve();
	});
	
	return promise;
    };
    
    Retina.update_renderer_list = function (list) {
	var renderer_select = document.getElementById(list);
	if (renderer_select) {
	    renderer_select.options.length = 0;
	    for (i in available_renderers) {
		renderer_select.add(new Option(i, i), null);
	    }
	}
    };
    
    Retina.query_widget_resource = function (resource, list) {
	var promise = jQuery.Deferred();
	
	jQuery.getJSON(resource, function (data) {
	    widget_resources.push(resource);
	    for (ii=0; ii < data.length; ii++) {
		var widget = {};
		widget.resource = resource;
		widget.name = data[ii].substring(data[ii].indexOf(".") + 1, data[ii].lastIndexOf("."));
		widget.filename = data[ii];
		available_widgets[widget.name] = widget;
	    }
	    if (list) {
		Retina.update_widget_list(list);
	    }
	    promise.resolve();
	});
	
	return promise;
    };

    //
    // renderers
    //
    Retina.test_renderer = function (params) {
	if (params.ret) {
	    params.target.innerHTML = "";
	    
	    Retina.Renderer[params.renderer].render({ data: Retina.Renderer[params.renderer].exampleData(), target: params.target });
	} else {
	    params.ret = 1;
	    Retina.load_renderer(params.renderer).then(function() {
		Retina.test_renderer(params);
	    });
	}
    };

    // renderer = { name, resource, filename }
    Retina.add_renderer = function (renderer) {
	available_renderers[renderer.name] = renderer;
    }
    
    Retina.load_renderer = function (renderer) {
	var promise;
	if (loaded_renderers[renderer]) {
	    promise = loaded_renderers[renderer];
	} else {
	    promise = jQuery.Deferred();
	    loaded_renderers[renderer] = promise;
	    
	    var promises = [];
	    
	    var rend_data = available_renderers[renderer];
	    var script_url = rend_data.resource + rend_data.filename;
	    jQuery.getScript(script_url).then(function() {
		var requires = Retina.Renderer[renderer].about.requires;
		for (var i=0; i<requires.length; i++) {
		    promises.push(Retina.load_library(requires[i]));
		}
		
		jQuery.when.apply(this, promises).then(function() {
		    promise.resolve();
		});
	    }, function(jqXHR, textStatus, errorThrown) {
		if (textStatus === 'parsererror') {
		    parserError(script_url);
		}
	    });
	}
	
	return promise;
    };
    
    // widget = { name, resource, filename }
    Retina.add_widget = function (widget) {
	available_widgets[widget.name] = widget;
    }
    
    Retina.load_widget = function (widget) {
	var promise;
	if (loaded_widgets[widget]) {
	    promise = loaded_widgets[widget];
	} else {
	    promise = jQuery.Deferred();
	    loaded_widgets[widget] = promise;
	    
	    var promises = [];
	    
	    var widget_data = available_widgets[widget];
	    var script_url = widget_data.resource + widget_data.filename;
	    jQuery.getScript(script_url).then(function() {
		var requires = Retina.Widget[widget].about('requires');
		for (var i=0; i<requires.length; i++) {
		    promises.push(Retina.load_library(requires[i]));
		}
		
		jQuery.when.apply(this, promises).then(function() {
		    promise.resolve();
		});
	    }, function(jqXHR, textStatus, errorThrown) {
		if (textStatus === 'parsererror') {
		    parserError(script_url);
		}
	    });
	}
	
	return promise;
    };
    
    Retina.load_library = function (library) {
	var promise;
	if (loaded_libraries[library]) {
	    promise = loaded_libraries[library];
	} else {
	    promise = jQuery.Deferred();
	    loaded_libraries[library] = promise;
	    
	    var script_url = library_resource + library;
	    jQuery.getScript(script_url).then(function() {
		promise.resolve();
	    }, function(jqXHR, textStatus, errorThrown) {
		if (textStatus === 'parsererror') {
		    parserError(script_url);
		}
	    });
	}
	
	return promise;
    };
    
    function parserError(script_url) {
	var error = "ParserError: '" + script_url + "' has a syntax error";
	
	if (jQuery.isFunction(alert)) {
	    alert(error);
	}
	
	throw error;
    }

}).call(this);

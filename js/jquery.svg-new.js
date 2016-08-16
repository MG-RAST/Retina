/* http://keith-wood.name/svg.html
   SVG for jQuery v1.4.5.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function (jQuery) { // Hide scope, no jQuery conflict
    
    /* Determine whether a given ActiveX control is available.
       @param  classId  (string) the ID for the ActiveX control
       @return  (boolean) true if found, false if not */
    function detectActiveX(classId) {
	try {
	    return !!(window.ActiveXObject && new ActiveXObject(classId));
	}
	catch (e) {
	    return false;
	}
    }

    /* SVG manager.
       Use the singleton instance of this class, jQuery.svg, 
       to interact with the SVG functionality. */
    function SVGManager() {
	this._settings = []; // Settings to be remembered per SVG object
	this._extensions = []; // List of SVG extensions added to SVGWrapper
	// for each entry [0] is extension name, [1] is extension class (function)
	// the function takes one parameter - the SVGWrapper instance
	this.regional = []; // Localisations, indexed by language, '' for default (English)
	this.regional[''] = {errorLoadingText: 'Error loading',
			     notSupportedText: 'This browser does not support SVG'};
	this.local = this.regional['']; // Current localisation
	this._uuid = new Date().getTime();
	this._renesis = detectActiveX('RenesisX.RenesisCtrl');
    }
        
    var PROP_NAME = 'svgwrapper';
    
    jQuery.extend(SVGManager.prototype, {
	/* Class name added to elements to indicate already configured with SVG. */
	markerClassName: 'hasSVG',
	
	/* SVG namespace. */
	svgNS: 'http://www.w3.org/2000/svg',
	/* XLink namespace. */
	xlinkNS: 'http://www.w3.org/1999/xlink',
	
	/* SVG wrapper class. */
	_wrapperClass: SVGWrapper,
	
	/* Camel-case versions of attribute names containing dashes or are reserved words. */
	_attrNames: {class_: 'class', in_: 'in',
		     alignmentBaseline: 'alignment-baseline', baselineShift: 'baseline-shift',
		     clipPath: 'clip-path', clipRule: 'clip-rule',
		     colorInterpolation: 'color-interpolation',
		     colorInterpolationFilters: 'color-interpolation-filters',
		     colorRendering: 'color-rendering', dominantBaseline: 'dominant-baseline',
		     enableBackground: 'enable-background', fillOpacity: 'fill-opacity',
		     fillRule: 'fill-rule', floodColor: 'flood-color',
		     floodOpacity: 'flood-opacity', fontFamily: 'font-family',
		     fontSize: 'font-size', fontSizeAdjust: 'font-size-adjust',
		     fontStretch: 'font-stretch', fontStyle: 'font-style',
		     fontVariant: 'font-variant', fontWeight: 'font-weight',
		     glyphOrientationHorizontal: 'glyph-orientation-horizontal',
		     glyphOrientationVertical: 'glyph-orientation-vertical',
		     horizAdvX: 'horiz-adv-x', horizOriginX: 'horiz-origin-x',
		     imageRendering: 'image-rendering', letterSpacing: 'letter-spacing',
		     lightingColor: 'lighting-color', markerEnd: 'marker-end',
		     markerMid: 'marker-mid', markerStart: 'marker-start',
		     stopColor: 'stop-color', stopOpacity: 'stop-opacity',
		     strikethroughPosition: 'strikethrough-position',
		     strikethroughThickness: 'strikethrough-thickness',
		     strokeDashArray: 'stroke-dasharray', strokeDashOffset: 'stroke-dashoffset',
		     strokeLineCap: 'stroke-linecap', strokeLineJoin: 'stroke-linejoin',
		     strokeMiterLimit: 'stroke-miterlimit', strokeOpacity: 'stroke-opacity',
		     strokeWidth: 'stroke-width', textAnchor: 'text-anchor',
		     textDecoration: 'text-decoration', textRendering: 'text-rendering',
		     underlinePosition: 'underline-position', underlineThickness: 'underline-thickness',
		     vertAdvY: 'vert-adv-y', vertOriginY: 'vert-origin-y',
		     wordSpacing: 'word-spacing', writingMode: 'writing-mode'},
	
	/* Add the SVG object to its container. */
	_attachSVG: function(container, settings) {
	    var svg = (container.namespaceURI == this.svgNS ? container : null);
	    container = (svg ? null : container);
	    if (jQuery(container || svg).hasClass(this.markerClassName)) {
		return;
	    }
	    if (typeof settings == 'string') {
		settings = {loadURL: settings};
	    }
	    else if (typeof settings == 'function') {
		settings = {onLoad: settings};
	    }
	    jQuery(container || svg).addClass(this.markerClassName);
	    try {
		if (!svg) {
		    svg = document.createElementNS(this.svgNS, 'svg');
		    svg.setAttribute('version', '1.1');
		    svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
		    if (container.clientWidth > 0) {
			svg.setAttribute('width', container.clientWidth);
		    }
		    if (container.clientHeight > 0) {
			svg.setAttribute('height', container.clientHeight);
		    }
		    container.appendChild(svg);
		}
		this._afterLoad(container, svg, settings || {});
	    }
	    catch (e) {
		if (jQuery.browser.msie) {
		    if (!container.id) {
			container.id = 'svg' + (this._uuid++);
		    }
		    this._settings[container.id] = settings;
		    container.innerHTML = '<embed type="image/svg+xml" width="100%" ' +
			'height="100%" src="' + (settings.initPath || '') + 'blank.svg" ' +
			'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>';
		}
		else {
		    container.innerHTML = '<p class="svg_error">' +
			this.local.notSupportedText + '</p>';
		}
	    }
	},
	
	/* SVG callback after loading - register SVG root. */
	_registerSVG: function() {
	    var i;
	    for (i = 0; i < document.embeds.length; i++) { // Check all
		var container = document.embeds[i].parentNode;
		if (!jQuery(container).hasClass(jQuery.svg.markerClassName) || // Not SVG
		    jQuery.data(container, PROP_NAME)) { // Already done
		    continue;
		}
		var svg = null;
		try {
		    svg = document.embeds[i].getSVGDocument();
		}
		catch(e) {
		    setTimeout(jQuery.svg._registerSVG, 250); // Renesis takes longer to load
		    return;
		}
		svg = (svg ? svg.documentElement : null);
		if (svg) {
		    jQuery.svg._afterLoad(container, svg);
		}
	    }
	},
	
	/* Post-processing once loaded. */
	_afterLoad: function(container, svg, settings) {
	    var settings = settings || this._settings[container.id];
	    this._settings[container ? container.id : ''] = null;
	    var wrapper = new this._wrapperClass(svg, container);
	    jQuery.data(container || svg, PROP_NAME, wrapper);
	    try {
		if (settings.loadURL) { // Load URL
		    wrapper.load(settings.loadURL, settings);
		}
		if (settings.settings) { // Additional settings
		    wrapper.configure(settings.settings);
		}
		if (settings.onLoad && !settings.loadURL) { // Onload callback
		    settings.onLoad.apply(container || svg, [wrapper]);
		}
	    }
	    catch (e) {
		alert(e);
	    }
	},
	
	/* Return the SVG wrapper created for a given container.
	   @param  container  (string) selector for the container or
	   (element) the container for the SVG object or
	   jQuery collection - first entry is the container
	   @return  (SVGWrapper) the corresponding SVG wrapper element, or null if not attached */
	_getSVG: function(container) {
	    container = (typeof container == 'string' ? jQuery(container)[0] :
			 (container.jquery ? container[0] : container));
	    return jQuery.data(container, PROP_NAME);
	},
	
	/* Remove the SVG functionality from a div.
	   @param  container  (element) the container for the SVG object */
	_destroySVG: function(container) {
	    var jQuerycontainer = jQuery(container);
	    if (!jQuerycontainer.hasClass(this.markerClassName)) {
		return;
	    }
	    jQuerycontainer.removeClass(this.markerClassName);
	    if (container.namespaceURI != this.svgNS) {
		jQuerycontainer.empty();
	    }
	    jQuery.removeData(container, PROP_NAME);
	},
	
	/* Extend the SVGWrapper object with an embedded class.
	   The constructor function must take a single parameter that is
	   a reference to the owning SVG root object. This allows the 
	   extension to access the basic SVG functionality.
	   @param  name      (string) the name of the SVGWrapper attribute to access the new class
	   @param  extClass  (function) the extension class constructor */
	addExtension: function(name, extClass) {
	    this._extensions.push([name, extClass]);
	},
	
	/* Does this node belong to SVG?
	   @param  node  (element) the node to be tested
	   @return  (boolean) true if an SVG node, false if not */
	isSVGElem: function(node) {
	    return (node.nodeType == 1 && node.namespaceURI == jQuery.svg.svgNS);
	}
    });
    
    /* The main SVG interface, which encapsulates the SVG element.
       Obtain a reference from jQuery().svg('get') */
    function SVGWrapper(svg, container) {
	this._svg = svg; // The SVG root node
	this._container = container; // The containing div
	for (var i = 0; i < jQuery.svg._extensions.length; i++) {
	    var extension = jQuery.svg._extensions[i];
	    this[extension[0]] = new extension[1](this);
	}
    };

    jQuery.extend(SVGWrapper.prototype, {
	/* Retrieve the width of the SVG object. */
	_width: function() {
	    return (this._container ? this._container.clientWidth : this._svg.width);
	},
	
	/* Retrieve the height of the SVG object. */
	_height: function() {
	    return (this._container ? this._container.clientHeight : this._svg.height);
	},
	
	/* Retrieve the root SVG element.
	   @return  the top-level SVG element */
	root: function() {
	    return this._svg;
	},
	
	/* Configure a SVG node.
	   @param  node      (element, optional) the node to configure
	   @param  settings  (object) additional settings for the root
	   @param  clear     (boolean) true to remove existing attributes first,
	   false to add to what is already there (optional)
	   @return  (SVGWrapper) this root */
	configure: function(node, settings, clear) {
	    if (!node.nodeName) {
		clear = settings;
		settings = node;
		node = this._svg;
	    }
	    if (clear) {
		for (var i = node.attributes.length - 1; i >= 0; i--) {
		    var attr = node.attributes.item(i);
		    if (!(attr.nodeName == 'onload' || attr.nodeName == 'version' || 
			  attr.nodeName.substring(0, 5) == 'xmlns')) {
			node.attributes.removeNamedItem(attr.nodeName);
		    }
		}
	    }
	    for (var attrName in settings) {
		node.setAttribute(jQuery.svg._attrNames[attrName] || attrName, settings[attrName]);
	    }
	    return this;
	},
	
	/* Locate a specific element in the SVG document.
	   @param  id  (string) the element's identifier
	   @return  (element) the element reference, or null if not found */
	getElementById: function(id) {
	    return this._svg.ownerDocument.getElementById(id);
	},
	
	/* Change the attributes for a SVG node.
	   @param  element   (SVG element) the node to change
	   @param  settings  (object) the new settings
	   @return  (SVGWrapper) this root */
	change: function(element, settings) {
	    if (element) {
		for (var name in settings) {
		    if (settings[name] == null) {
			element.removeAttribute(jQuery.svg._attrNames[name] || name);
		    }
		    else {
			element.setAttribute(jQuery.svg._attrNames[name] || name, settings[name]);
		    }
		}
	    }
	    return this;
	},
	
	/* Check for parent being absent and adjust arguments accordingly. */
	_args: function(values, names, optSettings) {
	    names.splice(0, 0, 'parent');
	    names.splice(names.length, 0, 'settings');
	    var args = {};
	    var offset = 0;
	    if (values[0] != null && values[0].jquery) {
		values[0] = values[0][0];
	    }
	    if (values[0] != null && !(typeof values[0] == 'object' && values[0].nodeName)) {
		args['parent'] = null;
		offset = 1;
	    }
	    for (var i = 0; i < values.length; i++) {
		args[names[i + offset]] = values[i];
	    }
	    if (optSettings) {
		jQuery.each(optSettings, function(i, value) {
		    if (typeof args[value] == 'object') {
			args.settings = args[value];
			args[value] = null;
		    }
		});
	    }
	    return args;
	},
	
	/* Add a title.
	   @param  parent    (element or jQuery) the parent node for the new title (optional)
	   @param  text      (string) the text of the title
	   @param  settings  (object) additional settings for the title (optional)
	   @return  (element) the new title node */
	doctitle: function(parent, text, settings) {
	    var args = this._args(arguments, ['text']);
	    var node = this._makeNode(args.parent, 'title', args.settings || {});
	    node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
	    return node;
	},
	
	/* Add a description.
	   @param  parent    (element or jQuery) the parent node for the new description (optional)
	   @param  text      (string) the text of the description
	   @param  settings  (object) additional settings for the description (optional)
	   @return  (element) the new description node */
	describe: function(parent, text, settings) {
	    var args = this._args(arguments, ['text']);
	    var node = this._makeNode(args.parent, 'desc', args.settings || {});
	    node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
	    return node;
	},
	
	/* Add a definitions node.
	   @param  parent    (element or jQuery) the parent node for the new definitions (optional)
	   @param  id        (string) the ID of this definitions (optional)
	   @param  settings  (object) additional settings for the definitions (optional)
	   @return  (element) the new definitions node */
	defs: function(parent, id, settings) {
	    var args = this._args(arguments, ['id'], ['id']);
	    return this._makeNode(args.parent, 'defs', jQuery.extend(
		(args.id ? {id: args.id} : {}), args.settings || {}));
	},
	
	/* Add a symbol definition.
	   @param  parent    (element or jQuery) the parent node for the new symbol (optional)
	   @param  id        (string) the ID of this symbol
	   @param  x1        (number) the left coordinate for this symbol
	   @param  y1        (number) the top coordinate for this symbol
	   @param  width     (number) the width of this symbol
	   @param  height    (number) the height of this symbol
	   @param  settings  (object) additional settings for the symbol (optional)
	   @return  (element) the new symbol node */
	symbol: function(parent, id, x1, y1, width, height, settings) {
	    var args = this._args(arguments, ['id', 'x1', 'y1', 'width', 'height']);
	    return this._makeNode(args.parent, 'symbol', jQuery.extend({id: args.id,
									viewBox: args.x1 + ' ' + args.y1 + ' ' + args.width + ' ' + args.height},
								       args.settings || {}));
	},
	
	/* Add a marker definition.
	   @param  parent    (element or jQuery) the parent node for the new marker (optional)
	   @param  id        (string) the ID of this marker
	   @param  refX      (number) the x-coordinate for the reference point
	   @param  refY      (number) the y-coordinate for the reference point
	   @param  mWidth    (number) the marker viewport width
	   @param  mHeight   (number) the marker viewport height
	   @param  orient    (string or int) 'auto' or angle (degrees) (optional)
	   @param  settings  (object) additional settings for the marker (optional)
	   @return  (element) the new marker node */
	marker: function(parent, id, refX, refY, mWidth, mHeight, orient, settings) {
	    var args = this._args(arguments, ['id', 'refX', 'refY',
					      'mWidth', 'mHeight', 'orient'], ['orient']);
	    return this._makeNode(args.parent, 'marker', jQuery.extend(
		{id: args.id, refX: args.refX, refY: args.refY, markerWidth: args.mWidth, 
		 markerHeight: args.mHeight, orient: args.orient || 'auto'}, args.settings || {}));
	},
	
	/* Add a style node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  styles    (string) the CSS styles
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new style node */
	style: function(parent, styles, settings) {
	    var args = this._args(arguments, ['styles']);
	    var node = this._makeNode(args.parent, 'style', jQuery.extend(
		{type: 'text/css'}, args.settings || {}));
	    node.appendChild(this._svg.ownerDocument.createTextNode(args.styles));
	    if (jQuery.browser.opera) {
		jQuery('head').append('<style type="text/css">' + args.styles + '</style>');
	    }
	    return node;
	},
	
	/* Add a script node.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  script    (string) the JavaScript code
	   @param  type      (string) the MIME type for the code (optional, default 'text/javascript')
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new script node */
	script: function(parent, script, type, settings) {
	    var args = this._args(arguments, ['script', 'type'], ['type']);
	    var node = this._makeNode(args.parent, 'script', jQuery.extend(
		{type: args.type || 'text/javascript'}, args.settings || {}));
	    node.appendChild(this._svg.ownerDocument.createTextNode(args.script));
	    if (!jQuery.browser.mozilla) {
		jQuery.globalEval(args.script);
	    }
	    return node;
	},
	
	/* Add a linear gradient definition.
	   Specify all of x1, y1, x2, y2 or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry is
	   [0] is offset (0.0-1.0 or 0%-100%), [1] is colour, 
	   [2] is opacity (optional)
	   @param  x1        (number) the x-coordinate of the gradient start (optional)
	   @param  y1        (number) the y-coordinate of the gradient start (optional)
	   @param  x2        (number) the x-coordinate of the gradient end (optional)
	   @param  y2        (number) the y-coordinate of the gradient end (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	linearGradient: function(parent, id, stops, x1, y1, x2, y2, settings) {
	    var args = this._args(arguments,
				  ['id', 'stops', 'x1', 'y1', 'x2', 'y2'], ['x1']);
	    var sets = jQuery.extend({id: args.id}, 
				     (args.x1 != null ? {x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2} : {}));
	    return this._gradient(args.parent, 'linearGradient', 
				  jQuery.extend(sets, args.settings || {}), args.stops);
	},
	
	/* Add a radial gradient definition.
	   Specify all of cx, cy, r, fx, fy or none of them.
	   @param  parent    (element or jQuery) the parent node for the new gradient (optional)
	   @param  id        (string) the ID for this gradient
	   @param  stops     (string[][]) the gradient stops, each entry
	   [0] is offset, [1] is colour, [2] is opacity (optional)
	   @param  cx        (number) the x-coordinate of the largest circle centre (optional)
	   @param  cy        (number) the y-coordinate of the largest circle centre (optional)
	   @param  r         (number) the radius of the largest circle (optional)
	   @param  fx        (number) the x-coordinate of the gradient focus (optional)
	   @param  fy        (number) the y-coordinate of the gradient focus (optional)
	   @param  settings  (object) additional settings for the gradient (optional)
	   @return  (element) the new gradient node */
	radialGradient: function(parent, id, stops, cx, cy, r, fx, fy, settings) {
	    var args = this._args(arguments,
				  ['id', 'stops', 'cx', 'cy', 'r', 'fx', 'fy'], ['cx']);
	    var sets = jQuery.extend({id: args.id}, (args.cx != null ?
						     {cx: args.cx, cy: args.cy, r: args.r, fx: args.fx, fy: args.fy} : {}));
	    return this._gradient(args.parent, 'radialGradient', 
				  jQuery.extend(sets, args.settings || {}), args.stops);
	},
	
	/* Add a gradient node. */
	_gradient: function(parent, name, settings, stops) {
	    var node = this._makeNode(parent, name, settings);
	    for (var i = 0; i < stops.length; i++) {
		var stop = stops[i];
		this._makeNode(node, 'stop', jQuery.extend(
		    {offset: stop[0], stopColor: stop[1]}, 
		    (stop[2] != null ? {stopOpacity: stop[2]} : {})));
	    }
	    return node;
	},
	
	/* Add a pattern definition.
	   Specify all of vx, vy, xwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new pattern (optional)
	   @param  id        (string) the ID for this pattern
	   @param  x         (number) the x-coordinate for the left edge of the pattern
	   @param  y         (number) the y-coordinate for the top edge of the pattern
	   @param  width     (number) the width of the pattern
	   @param  height    (number) the height of the pattern
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the pattern (optional)
	   @return  (element) the new pattern node */
	pattern: function(parent, id, x, y, width, height, vx, vy, vwidth, vheight, settings) {
	    var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height',
					      'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
	    var sets = jQuery.extend({id: args.id, x: args.x, y: args.y,
				      width: args.width, height: args.height}, (args.vx != null ?
										{viewBox: args.vx + ' ' + args.vy + ' ' + args.vwidth + ' ' + args.vheight} : {}));
	    return this._makeNode(args.parent, 'pattern', jQuery.extend(sets, args.settings || {}));
	},
	
	/* Add a clip path definition.
	   @param  parent  (element) the parent node for the new element (optional)
	   @param  id      (string) the ID for this path
	   @param  units   (string) either 'userSpaceOnUse' (default) or 'objectBoundingBox' (optional)
	   @return  (element) the new clipPath node */
	clipPath: function(parent, id, units, settings) {
	    var args = this._args(arguments, ['id', 'units']);
	    args.units = args.units || 'userSpaceOnUse';
	    return this._makeNode(args.parent, 'clipPath', jQuery.extend(
		{id: args.id, clipPathUnits: args.units}, args.settings || {}));
	},
	
	/* Add a mask definition.
	   @param  parent    (element or jQuery) the parent node for the new mask (optional)
	   @param  id        (string) the ID for this mask
	   @param  x         (number) the x-coordinate for the left edge of the mask
	   @param  y         (number) the y-coordinate for the top edge of the mask
	   @param  width     (number) the width of the mask
	   @param  height    (number) the height of the mask
	   @param  settings  (object) additional settings for the mask (optional)
	   @return  (element) the new mask node */
	mask: function(parent, id, x, y, width, height, settings) {
	    var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
	    return this._makeNode(args.parent, 'mask', jQuery.extend(
		{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height},
		args.settings || {}));
	},
	
	/* Create a new path object.
	   @return  (SVGPath) a new path object */
	createPath: function() {
	    return new SVGPath();
	},
	
	/* Create a new text object.
	   @return  (SVGText) a new text object */
	createText: function() {
	    return new SVGText();
	},
	
	/* Add an embedded SVG element.
	   Specify all of vx, vy, vwidth, vheight or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node
	   @param  y         (number) the y-coordinate for the top edge of the node
	   @param  width     (number) the width of the node
	   @param  height    (number) the height of the node
	   @param  vx        (number) the minimum x-coordinate for view box (optional)
	   @param  vy        (number) the minimum y-coordinate for the view box (optional)
	   @param  vwidth    (number) the width of the view box (optional)
	   @param  vheight   (number) the height of the view box (optional)
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	svg: function(parent, x, y, width, height, vx, vy, vwidth, vheight, settings) {
	    var args = this._args(arguments, ['x', 'y', 'width', 'height',
					      'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
	    var sets = jQuery.extend({x: args.x, y: args.y, width: args.width, height: args.height}, 
				     (args.vx != null ? {viewBox: args.vx + ' ' + args.vy + ' ' +
							 args.vwidth + ' ' + args.vheight} : {}));
	    return this._makeNode(args.parent, 'svg', jQuery.extend(sets, args.settings || {}));
	},
	
	/* Create a group.
	   @param  parent    (element or jQuery) the parent node for the new group (optional)
	   @param  id        (string) the ID of this group (optional)
	   @param  settings  (object) additional settings for the group (optional)
	   @return  (element) the new group node */
	group: function(parent, id, settings) {
	    var args = this._args(arguments, ['id'], ['id']);
	    return this._makeNode(args.parent, 'g', jQuery.extend({id: args.id}, args.settings || {}));
	},
	
	/* Add a usage reference.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    (element or jQuery) the parent node for the new node (optional)
	   @param  x         (number) the x-coordinate for the left edge of the node (optional)
	   @param  y         (number) the y-coordinate for the top edge of the node (optional)
	   @param  width     (number) the width of the node (optional)
	   @param  height    (number) the height of the node (optional)
	   @param  ref       (string) the ID of the definition node
	   @param  settings  (object) additional settings for the node (optional)
	   @return  (element) the new node */
	use: function(parent, x, y, width, height, ref, settings) {
	    var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
	    if (typeof args.x == 'string') {
		args.ref = args.x;
		args.settings = args.y;
		args.x = args.y = args.width = args.height = null;
	    }
	    var node = this._makeNode(args.parent, 'use', jQuery.extend(
		{x: args.x, y: args.y, width: args.width, height: args.height},
		args.settings || {}));
	    node.setAttributeNS(jQuery.svg.xlinkNS, 'href', args.ref);
	    return node;
	},
	
	/* Add a link, which applies to all child elements.
	   @param  parent    (element or jQuery) the parent node for the new link (optional)
	   @param  ref       (string) the target URL
	   @param  settings  (object) additional settings for the link (optional)
	   @return  (element) the new link node */
	link: function(parent, ref, settings) {
	    var args = this._args(arguments, ['ref']);
	    var node = this._makeNode(args.parent, 'a', args.settings);
	    node.setAttributeNS(jQuery.svg.xlinkNS, 'href', args.ref);
	    return node;
	},
	
	/* Add an image.
	   @param  parent    (element or jQuery) the parent node for the new image (optional)
	   @param  x         (number) the x-coordinate for the left edge of the image
	   @param  y         (number) the y-coordinate for the top edge of the image
	   @param  width     (number) the width of the image
	   @param  height    (number) the height of the image
	   @param  ref       (string) the path to the image
	   @param  settings  (object) additional settings for the image (optional)
	   @return  (element) the new image node */
	image: function(parent, x, y, width, height, ref, settings) {
	    var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
	    var node = this._makeNode(args.parent, 'image', jQuery.extend(
		{x: args.x, y: args.y, width: args.width, height: args.height},
		args.settings || {}));
	    node.setAttributeNS(jQuery.svg.xlinkNS, 'href', args.ref);
	    return node;
	},
	
	/* Draw a path.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  path      (string or SVGPath) the path to draw
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	path: function(parent, path, settings) {
	    var args = this._args(arguments, ['path']);
	    return this._makeNode(args.parent, 'path', jQuery.extend(
		{d: (args.path.path ? args.path.path() : args.path)}, args.settings || {}));
	},
	
	/* Draw a rectangle.
	   Specify both of rx and ry or neither.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x         (number) the x-coordinate for the left edge of the rectangle
	   @param  y         (number) the y-coordinate for the top edge of the rectangle
	   @param  width     (number) the width of the rectangle
	   @param  height    (number) the height of the rectangle
	   @param  rx        (number) the x-radius of the ellipse for the rounded corners (optional)
	   @param  ry        (number) the y-radius of the ellipse for the rounded corners (optional)
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	rect: function(parent, x, y, width, height, rx, ry, settings) {
	    var args = this._args(arguments, ['x', 'y', 'width', 'height', 'rx', 'ry'], ['rx']);
	    return this._makeNode(args.parent, 'rect', jQuery.extend(
		{x: args.x, y: args.y, width: args.width, height: args.height},
		(args.rx ? {rx: args.rx, ry: args.ry} : {}), args.settings || settings || {}));
	},
	
	/* Draw a circle.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the circle
	   @param  cy        (number) the y-coordinate for the centre of the circle
	   @param  r         (number) the radius of the circle
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	circle: function(parent, cx, cy, r, settings) {
	    var args = this._args(arguments, ['cx', 'cy', 'r']);
	    return this._makeNode(args.parent, 'circle', jQuery.extend(
		{cx: args.cx, cy: args.cy, r: args.r}, args.settings || {}));
	},
	
	/* Draw an ellipse.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  cx        (number) the x-coordinate for the centre of the ellipse
	   @param  cy        (number) the y-coordinate for the centre of the ellipse
	   @param  rx        (number) the x-radius of the ellipse
	   @param  ry        (number) the y-radius of the ellipse
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	ellipse: function(parent, cx, cy, rx, ry, settings) {
	    var args = this._args(arguments, ['cx', 'cy', 'rx', 'ry']);
	    return this._makeNode(args.parent, 'ellipse', jQuery.extend(
		{cx: args.cx, cy: args.cy, rx: args.rx, ry: args.ry}, args.settings || {}));
	},
	
	/* Draw a line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  x1        (number) the x-coordinate for the start of the line
	   @param  y1        (number) the y-coordinate for the start of the line
	   @param  x2        (number) the x-coordinate for the end of the line
	   @param  y2        (number) the y-coordinate for the end of the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	line: function(parent, x1, y1, x2, y2, settings) {
	    var args = this._args(arguments, ['x1', 'y1', 'x2', 'y2']);
	    return this._makeNode(args.parent, 'line', jQuery.extend(
		{x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2}, args.settings || {}));
	},
	
	/* Draw a polygonal line.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the line
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polyline: function(parent, points, settings) {
	    var args = this._args(arguments, ['points']);
	    return this._poly(args.parent, 'polyline', args.points, args.settings);
	},
	
	/* Draw a polygonal shape.
	   @param  parent    (element or jQuery) the parent node for the new shape (optional)
	   @param  points    (number[][]) the x-/y-coordinates for the points on the shape
	   @param  settings  (object) additional settings for the shape (optional)
	   @return  (element) the new shape node */
	polygon: function(parent, points, settings) {
	    var args = this._args(arguments, ['points']);
	    return this._poly(args.parent, 'polygon', args.points, args.settings);
	},
	
	/* Draw a polygonal line or shape. */
	_poly: function(parent, name, points, settings) {
	    var ps = '';
	    for (var i = 0; i < points.length; i++) {
		ps += points[i].join() + ' ';
	    }
	    return this._makeNode(parent, name, jQuery.extend(
		{points: jQuery.trim(ps)}, settings || {}));
	},
	
	/* Draw text.
	   Specify both of x and y or neither of them.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  x         (number or number[]) the x-coordinate(s) for the text (optional)
	   @param  y         (number or number[]) the y-coordinate(s) for the text (optional)
	   @param  value     (string) the text content or
	   (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	text: function(parent, x, y, value, settings) {
	    var args = this._args(arguments, ['x', 'y', 'value']);
	    if (typeof args.x == 'string' && arguments.length < 4) {
		args.value = args.x;
		args.settings = args.y;
		args.x = args.y = null;
	    }
	    return this._text(args.parent, 'text', args.value, jQuery.extend(
		{x: (args.x && isArray(args.x) ? args.x.join(' ') : args.x),
		 y: (args.y && isArray(args.y) ? args.y.join(' ') : args.y)}, 
		args.settings || {}));
	},
	
	/* Draw text along a path.
	   @param  parent    (element or jQuery) the parent node for the text (optional)
	   @param  path      (string) the ID of the path
	   @param  value     (string) the text content or
	   (SVGText) text with spans and references
	   @param  settings  (object) additional settings for the text (optional)
	   @return  (element) the new text node */
	textpath: function(parent, path, value, settings) {
	    var args = this._args(arguments, ['path', 'value']);
	    var node = this._text(args.parent, 'textPath', args.value, args.settings || {});
	    node.setAttributeNS(jQuery.svg.xlinkNS, 'href', args.path);
	    return node;
	},
	
	/* Draw text. */
	_text: function(parent, name, value, settings) {
	    var node = this._makeNode(parent, name, settings);
	    if (typeof value == 'number') {
		value = value.toString();
	    }
	    if (typeof value == 'string') {
		node.appendChild(node.ownerDocument.createTextNode(value));
	    }
	    else {
		for (var i = 0; i < value._parts.length; i++) {
		    var part = value._parts[i];
		    if (part[0] == 'tspan') {
			var child = this._makeNode(node, part[0], part[2]);
			child.appendChild(node.ownerDocument.createTextNode(part[1]));
			node.appendChild(child);
		    }
		    else if (part[0] == 'tref') {
			var child = this._makeNode(node, part[0], part[2]);
			child.setAttributeNS(jQuery.svg.xlinkNS, 'href', part[1]);
			node.appendChild(child);
		    }
		    else if (part[0] == 'textpath') {
			var set = jQuery.extend({}, part[2]);
			set.href = null;
			var child = this._makeNode(node, part[0], set);
			child.setAttributeNS(jQuery.svg.xlinkNS, 'href', part[2].href);
			child.appendChild(node.ownerDocument.createTextNode(part[1]));
			node.appendChild(child);
		    }
		    else { // straight text
			node.appendChild(node.ownerDocument.createTextNode(part[1]));
		    }
		}
	    }
	    return node;
	},
	
	/* Add a custom SVG element.
	   @param  parent    (element or jQuery) the parent node for the new element (optional)
	   @param  name      (string) the name of the element
	   @param  settings  (object) additional settings for the element (optional)
	   @return  (element) the new custom node */
	other: function(parent, name, settings) {
	    var args = this._args(arguments, ['name']);
	    return this._makeNode(args.parent, args.name, args.settings || {});
	},
	
	/* Create a shape node with the given settings. */
	_makeNode: function(parent, name, settings) {
	    parent = parent || this._svg;
	    var node = this._svg.ownerDocument.createElementNS(jQuery.svg.svgNS, name);
	    for (var name in settings) {
		var value = settings[name];
		if (value != null && value != null && 
		    (typeof value != 'string' || value != '')) {
		    node.setAttribute(jQuery.svg._attrNames[name] || name, value);
		}
	    }
	    parent.appendChild(node);
	    return node;
	},
	
	/* Add an existing SVG node to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	   (string) the jQuery selector for the node or
	   (jQuery collection) set of nodes to add
	   @return  (SVGWrapper) this wrapper */
	add: function(parent, node) {
	    var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
	    var svg = this;
	    args.parent = args.parent || this._svg;
	    args.node = (args.node.jquery ? args.node : jQuery(args.node));
	    try {
		if (jQuery.svg._renesis) {
		    throw 'Force traversal';
		}
		args.parent.appendChild(args.node.cloneNode(true));
	    }
	    catch (e) {
		args.node.each(function() {
		    var child = svg._cloneAsSVG(this);
		    if (child) {
			args.parent.appendChild(child);
		    }
		});
	    }
	    return this;
	},
	
	/* Clone an existing SVG node and add it to the diagram.
	   @param  parent  (element or jQuery) the parent node for the new node (optional)
	   @param  node    (element) the new node to add or
	   (string) the jQuery selector for the node or
	   (jQuery collection) set of nodes to add
	   @return  (element[]) collection of new nodes */
	clone: function(parent, node) {
	    var svg = this;
	    var args = this._args((arguments.length == 1 ? [null, parent] : arguments), ['node']);
	    args.parent = args.parent || this._svg;
	    args.node = (args.node.jquery ? args.node : jQuery(args.node));
	    var newNodes = [];
	    args.node.each(function() {
		var child = svg._cloneAsSVG(this);
		if (child) {
		    child.id = '';
		    args.parent.appendChild(child);
		    newNodes.push(child);
		}
	    });
	    return newNodes;
	},
	
	/* SVG nodes must belong to the SVG namespace, so clone and ensure this is so.
	   @param  node  (element) the SVG node to clone
	   @return  (element) the cloned node */
	_cloneAsSVG: function(node) {
	    var newNode = null;
	    if (node.nodeType == 1) { // element
		newNode = this._svg.ownerDocument.createElementNS(
		    jQuery.svg.svgNS, this._checkName(node.nodeName));
		for (var i = 0; i < node.attributes.length; i++) {
		    var attr = node.attributes.item(i);
		    if (attr.nodeName != 'xmlns' && attr.nodeValue) {
			if (attr.prefix == 'xlink') {
			    newNode.setAttributeNS(jQuery.svg.xlinkNS,
						   attr.localName || attr.baseName, attr.nodeValue);
			}
			else {
			    newNode.setAttribute(this._checkName(attr.nodeName), attr.nodeValue);
			}
		    }
		}
		for (var i = 0; i < node.childNodes.length; i++) {
		    var child = this._cloneAsSVG(node.childNodes[i]);
		    if (child) {
			newNode.appendChild(child);
		    }
		}
	    }
	    else if (node.nodeType == 3) { // text
		if (jQuery.trim(node.nodeValue)) {
		    newNode = this._svg.ownerDocument.createTextNode(node.nodeValue);
		}
	    }
	    else if (node.nodeType == 4) { // CDATA
		if (jQuery.trim(node.nodeValue)) {
		    try {
			newNode = this._svg.ownerDocument.createCDATASection(node.nodeValue);
		    }
		    catch (e) {
			newNode = this._svg.ownerDocument.createTextNode(
			    node.nodeValue.replace(/&/g, '&amp;').
				replace(/</g, '&lt;').replace(/>/g, '&gt;'));
		    }
		}
	    }
	    return newNode;
	},
	
	/* Node names must be lower case and without SVG namespace prefix. */
	_checkName: function(name) {
	    name = (name.substring(0, 1) >= 'A' && name.substring(0, 1) <= 'Z' ?
		    name.toLowerCase() : name);
	    return (name.substring(0, 4) == 'svg:' ? name.substring(4) : name);
	},
	
	/* Load an external SVG document.
	   @param  url       (string) the location of the SVG document or
	   the actual SVG content
	   @param  settings  (boolean) see addTo below or
	   (function) see onLoad below or
	   (object) additional settings for the load with attributes below:
	   addTo       (boolean) true to add to what's already there,
	   or false to clear the canvas first
	   changeSize  (boolean) true to allow the canvas size to change,
	   or false to retain the original
	   onLoad      (function) callback after the document has loaded,
	   'this' is the container, receives SVG object and
	   optional error message as a parameter
	   parent      (string or element or jQuery) the parent to load
	   into, defaults to top-level svg element
	   @return  (SVGWrapper) this root */
	load: function(url, settings) {
	    settings = (typeof settings == 'boolean' ? {addTo: settings} :
			(typeof settings == 'function' ? {onLoad: settings} :
			 (typeof settings == 'string' ? {parent: settings} : 
			  (typeof settings == 'object' && settings.nodeName ? {parent: settings} :
			   (typeof settings == 'object' && settings.jquery ? {parent: settings} :
			    settings || {})))));
	    if (!settings.parent && !settings.addTo) {
		this.clear(false);
	    }
	    var size = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
	    var wrapper = this;
	    // Report a problem with the load
	    var reportError = function(message) {
		message = jQuery.svg.local.errorLoadingText + ': ' + message;
		if (settings.onLoad) {
		    settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper, message]);
		}
		else {
		    wrapper.text(null, 10, 20, message);
		}
	    };
	    // Create a DOM from SVG content
	    var loadXML4IE = function(data) {
		var xml = new ActiveXObject('Microsoft.XMLDOM');
		xml.validateOnParse = false;
		xml.resolveExternals = false;
		xml.async = false;
		xml.loadXML(data);
		if (xml.parseError.errorCode != 0) {
		    reportError(xml.parseError.reason);
		    return null;
		}
		return xml;
	    };
	    // Load the SVG DOM
	    var loadSVG = function(data) {
		if (!data) {
		    return;
		}
		if (data.documentElement.nodeName != 'svg') {
		    var errors = data.getElementsByTagName('parsererror');
		    var messages = (errors.length ? errors[0].getElementsByTagName('div') : []); // Safari
		    reportError(!errors.length ? '???' :
				(messages.length ? messages[0] : errors[0]).firstChild.nodeValue);
		    return;
		}
		var parent = (settings.parent ? jQuery(settings.parent)[0] : wrapper._svg);
		var attrs = {};
		for (var i = 0; i < data.documentElement.attributes.length; i++) {
		    var attr = data.documentElement.attributes.item(i);
		    if (!(attr.nodeName == 'version' || attr.nodeName.substring(0, 5) == 'xmlns')) {
			attrs[attr.nodeName] = attr.nodeValue;
		    }
		}
		wrapper.configure(parent, attrs, !settings.parent);
		var nodes = data.documentElement.childNodes;
		for (var i = 0; i < nodes.length; i++) {
		    try {
			if (jQuery.svg._renesis) {
			    throw 'Force traversal';
			}
			parent.appendChild(wrapper._svg.ownerDocument.importNode(nodes[i], true));
			if (nodes[i].nodeName == 'script') {
			    jQuery.globalEval(nodes[i].textContent);
			}
		    }
		    catch (e) {
			wrapper.add(parent, nodes[i]);
		    }
		}
		if (!settings.changeSize) {
		    wrapper.configure(parent, {width: size[0], height: size[1]});
		}
		if (settings.onLoad) {
		    settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper]);
		}
	    };
	    if (url.match('<svg')) { // Inline SVG
		loadSVG(jQuery.browser.msie ? loadXML4IE(url) :
			new DOMParser().parseFromString(url, 'text/xml'));
	    }
	    else { // Remote SVG
		jQuery.ajax({url: url, dataType: (jQuery.browser.msie ? 'text' : 'xml'),
			     success: function(xml) {
				 loadSVG(jQuery.browser.msie ? loadXML4IE(xml) : xml);
			     }, error: function(http, message, exc) {
				 reportError(message + (exc ? ' ' + exc.message : ''));
			     }});
	    }
	    return this;
	},
	
	/* Delete a specified node.
	   @param  node  (element or jQuery) the drawing node to remove
	   @return  (SVGWrapper) this root */
	remove: function(node) {
	    node = (node.jquery ? node[0] : node);
	    node.parentNode.removeChild(node);
	    return this;
	},
	
	/* Delete everything in the current document.
	   @param  attrsToo  (boolean) true to clear any root attributes as well,
	   false to leave them (optional)
	   @return  (SVGWrapper) this root */
	clear: function(attrsToo) {
	    if (attrsToo) {
		this.configure({}, true);
	    }
	    while (this._svg.firstChild) {
		this._svg.removeChild(this._svg.firstChild);
	    }
	    return this;
	},
	
	/* Serialise the current diagram into an SVG text document.
	   @param  node  (SVG element) the starting node (optional)
	   @return  (string) the SVG as text */
	toSVG: function(node) {
	    node = node || this._svg;
	    return (typeof XMLSerializer == 'undefined' ? this._toSVG(node) :
		    new XMLSerializer().serializeToString(node));
	},
	
	/* Serialise one node in the SVG hierarchy. */
	_toSVG: function(node) {
	    var svgDoc = '';
	    if (!node) {
		return svgDoc;
	    }
	    if (node.nodeType == 3) { // Text
		svgDoc = node.nodeValue;
	    }
	    else if (node.nodeType == 4) { // CDATA
		svgDoc = '<![CDATA[' + node.nodeValue + ']]>';
	    }
	    else { // Element
		svgDoc = '<' + node.nodeName;
		if (node.attributes) {
		    for (var i = 0; i < node.attributes.length; i++) {
			var attr = node.attributes.item(i);
			if (!(jQuery.trim(attr.nodeValue) == '' || attr.nodeValue.match(/^\[object/) ||
			      attr.nodeValue.match(/^function/))) {
			    svgDoc += ' ' + (attr.namespaceURI == jQuery.svg.xlinkNS ? 'xlink:' : '') + 
				attr.nodeName + '="' + attr.nodeValue + '"';
			}
		    }
		}	
		if (node.firstChild) {
		    svgDoc += '>';
		    var child = node.firstChild;
		    while (child) {
			svgDoc += this._toSVG(child);
			child = child.nextSibling;
		    }
		    svgDoc += '</' + node.nodeName + '>';
		}
		else {
		    svgDoc += '/>';
		}
	    }
	    return svgDoc;
	}
    });
    
    /* Helper to generate an SVG path.
       Obtain an instance from the SVGWrapper object.
       String calls together to generate the path and use its value:
       var path = root.createPath();
       root.path(null, path.move(100, 100).line(300, 100).line(200, 300).close(), {fill: 'red'});
       or
       root.path(null, path.move(100, 100).line([[300, 100], [200, 300]]).close(), {fill: 'red'}); */
    function SVGPath() {
	this._path = '';
    }
    
    jQuery.extend(SVGPath.prototype, {
	/* Prepare to create a new path.
	   @return  (SVGPath) this path */
	reset: function() {
	    this._path = '';
	    return this;
	},
	
	/* Move the pointer to a position.
	   @param  x         (number) x-coordinate to move to or
	   (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	move: function(x, y, relative) {
	    relative = (isArray(x) ? y : relative);
	    return this._coords((relative ? 'm' : 'M'), x, y);
	},
	
	/* Draw a line to a position.
	   @param  x         (number) x-coordinate to move to or
	   (number[][]) x-/y-coordinates to move to
	   @param  y         (number) y-coordinate to move to (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	line: function(x, y, relative) {
	    relative = (isArray(x) ? y : relative);
	    return this._coords((relative ? 'l' : 'L'), x, y);
	},
	
	/* Draw a horizontal line to a position.
	   @param  x         (number) x-coordinate to draw to or
	   (number[]) x-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	horiz: function(x, relative) {
	    this._path += (relative ? 'h' : 'H') + (isArray(x) ? x.join(' ') : x);
	    return this;
	},
	
	/* Draw a vertical line to a position.
	   @param  y         (number) y-coordinate to draw to or
	   (number[]) y-coordinates to draw to
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	vert: function(y, relative) {
	    this._path += (relative ? 'v' : 'V') + (isArray(y) ? y.join(' ') : y);
	    return this;
	},
	
	/* Draw a cubic Bézier curve.
	   @param  x1        (number) x-coordinate of beginning control point or
	   (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of beginning control point (omitted if x1 is array)
	   @param  x2        (number) x-coordinate of ending control point (omitted if x1 is array)
	   @param  y2        (number) y-coordinate of ending control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveC: function(x1, y1, x2, y2, x, y, relative) {
	    relative = (isArray(x1) ? y1 : relative);
	    return this._coords((relative ? 'c' : 'C'), x1, y1, x2, y2, x, y);
	},
	
	/* Continue a cubic Bézier curve.
	   Starting control point is the reflection of the previous end control point.
	   @param  x2        (number) x-coordinate of ending control point or
	   (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y2        (number) y-coordinate of ending control point (omitted if x2 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x2 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x2 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothC: function(x2, y2, x, y, relative) {
	    relative = (isArray(x2) ? y2 : relative);
	    return this._coords((relative ? 's' : 'S'), x2, y2, x, y);
	},
	
	/* Draw a quadratic Bézier curve.
	   @param  x1        (number) x-coordinate of control point or
	   (number[][]) x-/y-coordinates of control and end points to draw to
	   @param  y1        (number) y-coordinate of control point (omitted if x1 is array)
	   @param  x         (number) x-coordinate of curve end (omitted if x1 is array)
	   @param  y         (number) y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	curveQ: function(x1, y1, x, y, relative) {
	    relative = (isArray(x1) ? y1 : relative);
	    return this._coords((relative ? 'q' : 'Q'), x1, y1, x, y);
	},
	
	/* Continue a quadratic Bézier curve.
	   Control point is the reflection of the previous control point.
	   @param  x         (number) x-coordinate of curve end or
	   (number[][]) x-/y-coordinates of points to draw to
	   @param  y         (number) y-coordinate of curve end (omitted if x is array)
	   @param  relative  (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	smoothQ: function(x, y, relative) {
	    relative = (isArray(x) ? y : relative);
	    return this._coords((relative ? 't' : 'T'), x, y);
	},
	
	/* Generate a path command with (a list of) coordinates. */
	_coords: function(cmd, x1, y1, x2, y2, x3, y3) {
	    if (isArray(x1)) {
		for (var i = 0; i < x1.length; i++) {
		    var cs = x1[i];
		    this._path += (i == 0 ? cmd : ' ') + cs[0] + ',' + cs[1] +
			(cs.length < 4 ? '' : ' ' + cs[2] + ',' + cs[3] +
			 (cs.length < 6 ? '': ' ' + cs[4] + ',' + cs[5]));
		}
	    }
	    else {
		this._path += cmd + x1 + ',' + y1 + 
		    (x2 == null ? '' : ' ' + x2 + ',' + y2 +
		     (x3 == null ? '' : ' ' + x3 + ',' + y3));
	    }
	    return this;
	},
	
	/* Draw an arc to a position.
	   @param  rx         (number) x-radius of arc or
	   (number/boolean[][]) x-/y-coordinates and flags for points to draw to
	   @param  ry         (number) y-radius of arc (omitted if rx is array)
	   @param  xRotate    (number) x-axis rotation (degrees, clockwise) (omitted if rx is array)
	   @param  large      (boolean) true to draw the large part of the arc,
	   false to draw the small part (omitted if rx is array)
	   @param  clockwise  (boolean) true to draw the clockwise arc,
	   false to draw the anti-clockwise arc (omitted if rx is array)
	   @param  x          (number) x-coordinate of arc end (omitted if rx is array)
	   @param  y          (number) y-coordinate of arc end (omitted if rx is array)
	   @param  relative   (boolean) true for coordinates relative to the current point,
	   false for coordinates being absolute
	   @return  (SVGPath) this path */
	arc: function(rx, ry, xRotate, large, clockwise, x, y, relative) {
	    relative = (isArray(rx) ? ry : relative);
	    this._path += (relative ? 'a' : 'A');
	    if (isArray(rx)) {
		for (var i = 0; i < rx.length; i++) {
		    var cs = rx[i];
		    this._path += (i == 0 ? '' : ' ') + cs[0] + ',' + cs[1] + ' ' +
			cs[2] + ' ' + (cs[3] ? '1' : '0') + ',' +
			(cs[4] ? '1' : '0') + ' ' + cs[5] + ',' + cs[6];
		}
	    }
	    else {
		this._path += rx + ',' + ry + ' ' + xRotate + ' ' +
		    (large ? '1' : '0') + ',' + (clockwise ? '1' : '0') + ' ' + x + ',' + y;
	    }
	    return this;
	},
	
	/* Close the current path.
	   @return  (SVGPath) this path */
	close: function() {
	    this._path += 'z';
	    return this;
	},
	
	/* Return the string rendering of the specified path.
	   @return  (string) stringified path */
	path: function() {
	    return this._path;
	}
    });
    
    SVGPath.prototype.moveTo = SVGPath.prototype.move;
    SVGPath.prototype.lineTo = SVGPath.prototype.line;
    SVGPath.prototype.horizTo = SVGPath.prototype.horiz;
    SVGPath.prototype.vertTo = SVGPath.prototype.vert;
    SVGPath.prototype.curveCTo = SVGPath.prototype.curveC;
    SVGPath.prototype.smoothCTo = SVGPath.prototype.smoothC;
    SVGPath.prototype.curveQTo = SVGPath.prototype.curveQ;
    SVGPath.prototype.smoothQTo = SVGPath.prototype.smoothQ;
    SVGPath.prototype.arcTo = SVGPath.prototype.arc;
    
    /* Helper to generate an SVG text object.
       Obtain an instance from the SVGWrapper object.
       String calls together to generate the text and use its value:
       var text = root.createText();
       root.text(null, x, y, text.string('This is ').
       span('red', {fill: 'red'}).string('!'), {fill: 'blue'}); */
    function SVGText() {
	this._parts = []; // The components of the text object
    }
    
    jQuery.extend(SVGText.prototype, {
	/* Prepare to create a new text object.
	   @return  (SVGText) this text */
	reset: function() {
	    this._parts = [];
	    return this;
	},
	
	/* Add a straight string value.
	   @param  value  (string) the actual text
	   @return  (SVGText) this text object */
	string: function(value) {
	    this._parts[this._parts.length] = ['text', value];
	    return this;
	},
	
	/* Add a separate text span that has its own settings.
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	span: function(value, settings) {
	    this._parts[this._parts.length] = ['tspan', value, settings];
	    return this;
	},
	
	/* Add a reference to a previously defined text string.
	   @param  id        (string) the ID of the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	ref: function(id, settings) {
	    this._parts[this._parts.length] = ['tref', id, settings];
	    return this;
	},
	
	/* Add text drawn along a path.
	   @param  id        (string) the ID of the path
	   @param  value     (string) the actual text
	   @param  settings  (object) the settings for this text
	   @return  (SVGText) this text object */
	path: function(id, value, settings) {
	    this._parts[this._parts.length] = ['textpath', value, 
					       jQuery.extend({href: id}, settings || {})];
	    return this;
	}
    });
    
    /* Attach the SVG functionality to a jQuery selection.
       @param  command  (string) the command to run (optional, default 'attach')
       @param  options  (object) the new settings to use for these SVG instances
       @return jQuery (object) for chaining further calls */
    jQuery.fn.svg = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && options == 'get') {
	    return jQuery.svg['_' + options + 'SVG'].apply(jQuery.svg, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
	    if (typeof options == 'string') {
		jQuery.svg['_' + options + 'SVG'].apply(jQuery.svg, [this].concat(otherArgs));
	    }
	    else {
		jQuery.svg._attachSVG(this, options || {});
	    } 
	});
    };

    // Singleton primary SVG interface
    jQuery.svg = new SVGManager();
    
    //====================
    /* Helper Functions */
    //====================

    /* Determine whether an object is an array. */
    function isArray(a) {
	return (a && a.constructor == Array);
    }
    
    /* Calculate log10 */
    function log10(val) {
	if (val == 0) {
	    return 0;
	}
	return Math.log(val) / Math.LN10;
    }
    
    /* Round a number to a given number of decimal points. */
    function roundNumber(num, dec) {
	return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }

 //=======
 /* CSS */
 //=======
 jQuery("<style>")
 .prop("type", "text/css")
 .html("\
svg:svg {\
    display: none;\
}\
\
.svg_error {\
    color: red;\
    font-weight: bold;\
}\
\
.marquee {\
    fill-opacity: 0.2;\
    stroke: #000;\
    stroke-dasharray: 2,4;\
    vector-effect:non-scaling-stroke;\
}")
	.appendTo("head");
    
    //===================
    /* High Level Graphics */
    //===================
    jQuery.extend(SVGWrapper.prototype, {
	
	legend: function(params) {
	    var group = params.group || null;
	    var top = params.top == null ? 0 : params.top;
	    var left = params.left == null ? 0 : params.left;
	    var labels = params.labels || params.data;
	    var colors = params.colors || GooglePalette();
	    var format = { fontSize: 12, fontWeight: "normal", fontFamily: "Helvetica" };
	    if (params.format !== null) {
		jQuery.extend(format, params.format);
	    }

	    var fontSize = parseInt(format.fontSize);
	    var labelSpacing = params.labelSpacing == null ? 10 : params.labelSpacing;
	    
	    var g = this.group(group, params.id, params.groupSettings);
	    for (var i=0; i<labels.length; i++) {
		this.rect(g, left, top, fontSize, fontSize, { stroke: "white", strokeWidth: 0, fill: colors[i] });
		this.text(g, left + fontSize + fontSize, top + fontSize - 2, labels[i], format);
		top += fontSize + labelSpacing;
	    }
	    
	    return g;
	},

	axis: function(params) {
	    var group = params.group || null;
	    var orientation = params.orientation == null ? "bottom" : params.orientation;
	    var direction = params.direction == null ? "horizontal" : params.direction;
	    var height = this._height();
	    var length = params.length;
	    
	    var shift = params.shift;
	    if (shift == null) {
		if (direction == "horizontal" || orientation == "top") {
		    shift = 0;
		}
		else {
		    shift = height;
		}
	    } else {
		if (direction == "vertical" && orientation == "bottom") {
		    shift = height - shift;
		}
	    }
	    
	    var base = params.base;
	    if (base == null) {
		if (direction == "horizontal" || orientation == "top") {
		    base = height;
		}
		else {
		    base = 0;
		}
	    } else {
		if (direction == "horizontal" && orientation == "bottom") {
		    base = height - base;
		}
	    }
	    
	    var spaceMajor = params.spaceMajor == null ? parseInt(length / 10) : params.spaceMajor;
	    var numMajor = parseInt(length / spaceMajor);
	    var numMinor = params.numMinor == null ? 4 : params.numMinor;
	    var spaceMinor = spaceMajor / (numMinor + 1);
	    var minorTickLength = params.minorTickLength == null ? 5 : params.minorTickLength;
	    var majorTickLength = params.majorTickLength == null ? 10 : params.majorTickLength;
	    var tickShift = params.tickShift == null ? 0 : params.tickShift;
	    var tickBase = params.tickBase == null ? 0 : params.tickBase;

	    var min = params.min == null ? 0 : params.min; // minimum value of the scale
	    var max = params.max == null ? 100 : params.max; // maximum value of the scale

	    var lineFormat = { stroke: "black", strokeWidth: 1 };
	    if (params.lineFormat !== null) {
		jQuery.extend(lineFormat, params.lineFormat);
	    }
	    var labelFormat = { fontFamily: "Helvetica", fontWeight: 100, fontSize: 12 };
	    if (params.labelFormat !== null) {
		jQuery.extend(labelFormat, params.labelFormat);
	    }

	    var showLabels = params.showLabels == null ? true : params.showLabels;
	    var labels = params.labels || params.data; // array of labels if the labels should not be the value
	    var labelPosition = params.labelPosition == null ? "left-bottom" : params.labelPosition;
	    var labelRotation = params.labelRotation == null ? null : params.labelRotation; // degrees the labels should be rotated
	    var labelOrigin = params.labelOrigin == null ? true : params.labelOrigin;

	    // create group
	    var g = this.group(group, params.id, params.groupSettings);
	    
	    // create baseline
	    var x1 = direction == "horizontal" ? shift : base;
	    var y1 = direction == "horizontal" ? base : shift;
	    var x2 = direction == "horizontal" ? shift + length : base;
	    var y2 = direction == "horizontal" ? base : (orientation == "bottom" ? shift - length : shift + length);
	    if (! params.noLine) {
		this.line(g, x1, y1, x2, y2, lineFormat);
	    }
	    
	    // create ticks
	    x1 = direction == "horizontal" ? shift + tickShift : base + tickBase;
	    y1 = direction == "horizontal" ? base - tickBase : shift - tickShift;
	    x2 = direction == "horizontal" ? shift + tickShift : (labelPosition == "left-bottom" ? base - majorTickLength + tickBase : base + majorTickLength - tickBase);
	    y2 = direction == "horizontal" ? (labelPosition == "left-bottom" ? base + majorTickLength - tickBase : base - majorTickLength + tickBase) : shift - tickShift;
	    var x1m = direction == "horizontal" ? shift : base;
	    var y1m = direction == "horizontal" ? base : shift;
	    var x2m = direction == "horizontal" ? shift : (labelPosition == "left-bottom" ? base - minorTickLength : base + minorTickLength);
	    var y2m = direction == "horizontal" ? (labelPosition == "left-bottom" ? base + minorTickLength : base - minorTickLength) : shift;
	    	    
	    for (var i=0; i<=numMajor; i++) {
		// calculate the numerical label value
		var labelVal = min + (i * ((max - min) / numMajor));
		
		// skip the origin label and tick if unwanted
		if (! labelOrigin && labelVal == 0) {
		    continue;
		}
		if (labels && labels.length && i >= labels.length) {
		    continue;
		}

		if (! params.noLine) {
		    this.line(g, x1, y1, x2, y2, lineFormat);
		}
		if (showLabels) {
		    var suff = { "k": 1000,
				 "M": 1000000,
				 "G": 1000000000,
				 "T": 1000000000000 };
		    var decimals = params.hasOwnProperty('decimals') ? params.decimals : (max <= 10 && ! params.isLog ? 2 : 0);
		    var text = labelVal.formatString(decimals);
		    if (labels && labels.length) {
			text = labels[i];
		    } else if (params.latinSuffix && suff[params.latinSuffix]) {
			text = (labelVal / suff[params.latinSuffix]).formatString(decimals) + params.latinSuffix;
		    }
		    var lx = x1 + (direction == "horizontal" ? 0 : ((labelPosition == "left-bottom" ? -1 : 1) * (majorTickLength + 5)));
		    var ly = y1 + parseInt(parseInt(labelFormat.fontSize) / (direction == "horizontal" ? (labelPosition == "left-bottom" ? 1 : -1) : 3)) + (direction == "horizontal" ? ((labelPosition == "left-bottom" ? 1 : -1) * majorTickLength) : 0);
		    var f = { textAnchor: (direction == "horizontal" ? (labelRotation == null ? "middle" : "end") : (labelPosition == "left-bottom" ? "end" : "start")), transform: (labelRotation == null ? "" : "rotate(-"+labelRotation+","+lx+","+ly+")") };
		    jQuery.extend(f, labelFormat);
		    this.text(g, lx, ly, params.isLog ? (text == "0" ? "0" : "10^"+text) : text, f);
		}
		if (numMajor != i) {
		    if (! params.isLog) {
			for (var h=0; h<numMinor; h++) {
			    if (direction == 'horizontal') {
				x1m += spaceMinor;
				x2m += spaceMinor;
			    } else {
				if (orientation == "bottom") {
				    y1m -= spaceMinor;
				    y2m -= spaceMinor;
				} else {
				    y1m += spaceMinor;
				    y2m += spaceMinor;
				}
			    }
			    if (! params.noLine) {
				this.line(g, x1m, y1m, x2m, y2m, lineFormat);
			    }
			}
		    }
		}
		if (direction == 'horizontal') {
		    x1 += spaceMajor;
		    x2 += spaceMajor;
		} else {
		    if (orientation == "bottom") {
			y1 -= spaceMajor;
			y2 -= spaceMajor;
		    } else {
			y1 += spaceMajor;
			y2 += spaceMajor;
		    }
		}
		if (direction == 'horizontal') {
		    x1m = x1;
		    x2m = x2;
		} else {
		    y1m = y1;
		    y2m = y2;
		}
	    }
	    
	    return g;
	},
	
	grid: function(params) {
	    var direction = params.direction == null ? "horizontal" : params.direction;
	    var group = params.group || null;
	    var height = params.height == null ? this._height() : params.height;
	    var width = params.width; // width of the grid
	    var shift = params.shift == null ? 0 : params.shift;
	    var base = params.base == null ? height : params.base;
	    var space = params.space == null ? parseInt(direction == "horizontal" ? height : width) / 10 : params.space; // space between two lines of the grid
	    var format = { stroke: "gray", strokeWidth: 1, "stroke-dasharray": "2,2" };
	    if (params.format !== null) {
		jQuery.extend(format, params.format);
	    }
	    
	    var numLines = Math.floor((direction == "horizontal" ? height : width) / space);

	    var x1 = shift;
	    var y1 = this._height() - base;
	    var x2 = direction == "horizontal" ? shift + width : x1;
	    var y2 = direction == "horizontal" ? y1 : y1 - height;
	    
	    var g = this.group(group, params.id, params.groupSettings);

	    for (var i=0; i<=numLines; i++) {
		this.line(g, x1, y1, x2, y2, format);
		if (direction == 'horizontal') {
		    y1 -= space;
		    y2 -= space;
		} else {
		    x1 += space;
		    x2 += space;
		}
	    }

	    return g;
	},

	boxplot: function(params) {
	    var group = params.group || null;
	    var shift = params.shift == null ? 0 : params.shift;
	    var height = params.height == null ? this._height() : params.height;
	    var direction = params.direction == null ? "vertical" : params.direction;
	    var base = params.base == null ? (direction == "vertical" ? height : 0) : (direction == "vertical" ? height - params.base : params.base);
	    var width = params.width == null ? 10 : params.width;
	    var space = params.space == null ? 5 : params.space;
	    var radius = params.radius == null ? width / 6 : params.radius;
	    var boxes = params.boxes || params.data || [];
	    var format = { fill: "white", stroke: "black", strokeWidth: 1 };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    // create group
	    var g = this.group(group, params.id, params.groupSettings);

	    // initialize coords
	    var x = direction == "vertical" ? shift : base;
	    var y = direction == "vertical" ? base : shift;

	    // iterate over the boxes array
	    for (var i=0; i<boxes.length; i++) {
		var box = boxes[i];
		var f = jQuery.extend({}, format, box.format == null ? {} : box.format);
		if (direction == "vertical") {

		    // main box
		    this.rect(g, x, y - box.uq, width, box.uq - box.lq, 0, 0, f);

		    // median
		    this.line(g, x, y - box.median, x + width, y - box.median, { strokeWidth: f.strokeWidth, stroke: f.stroke });
		    
		    // top whisker
		    this.line(g, x + (width / 2), y - box.uq, x + (width / 2), y - box.max, { strokeWidth: f.strokeWidth, stroke: f.stroke, "stroke-dasharray": "2,2" });
		    this.line(g, x + (width / 5), y - box.max, x + width - (width / 5), y - box.max, { strokeWidth: f.strokeWidth, stroke: f.stroke });

		    // bottom whisker
		    this.line(g, x + (width / 2), y - box.lq, x + (width / 2), y - box.min, { strokeWidth: f.strokeWidth, stroke: f.stroke, "stroke-dasharray": "2,2" });
		    this.line(g, x + (width / 5), y - box.min, x + width - (width / 5), y - box.min, { strokeWidth: f.strokeWidth, stroke: f.stroke });

		    // outliers
		    if (box.hasOwnProperty('outliers')) {
			for (var h=0; h<box.outliers.length; h++) {
			    this.circle(g, x + (width / 2), y - box.outliers[h], radius, { strokeWidth: f.strokeWidth, stroke: f.stroke, fill: "white" });
			}
		    }

		    x += space + width;
		} else {
		    // main box
		    this.rect(g, x + box.lq, y, box.uq - box.lq, width, 0, 0, f);

		    // median
		    this.line(g, x + box.median, y, x + box.median, y + width, { strokeWidth: f.strokeWidth, stroke: f.stroke });
		    
		    // top whisker
		    this.line(g, x + box.uq, y + (width / 2), x + box.max, y + (width / 2), { strokeWidth: f.strokeWidth, stroke: f.stroke, "stroke-dasharray": "2,2" });
		    this.line(g, x + box.max, y + (width / 5), x + box.max, y + width - (width / 5), { strokeWidth: f.strokeWidth, stroke: f.stroke });

		    // bottom whisker
		    this.line(g, x + box.lq, y + (width / 2), x + box.min, y + (width / 2), { strokeWidth: f.strokeWidth, stroke: f.stroke, "stroke-dasharray": "2,2" });
		    this.line(g, x + box.min, y + (width / 5), x + box.min, y + width - (width / 5), { strokeWidth: f.strokeWidth, stroke: f.stroke });

		    // outliers
		    if (box.hasOwnProperty('outliers')) {
			for (var h=0; h<box.outliers.length; h++) {
			    this.circle(g, x + box.outliers[h], y + (width / 2), radius, { strokeWidth: f.strokeWidth, stroke: f.stroke, fill: "white" });
			}
		    }

		    y += space + width;
		}
	    }

	    return g;
	},

	barchart: function(params) {
	    var direction = params.direction == null ? "vertical" : params.direction;
	    var group = params.group || null;
	    var height = params.height == null ? this._height() : params.height;
	    var shift = params.shift == null ? (direction == "vertical" ? 0 : height) : (direction == "vertical" ? params.shift : height - params.shift);
	    var base = params.base == null ? (direction == "vertical" ? height : 0) : (direction == "vertical" ? this._height() - params.base : params.base);
	    var width = params.width == null ? 10 : params.width;
	    var space = params.space == null ? 5 : params.space;
	    var bars = params.bars || params.data || [];
	    var format = { fill: "white", stroke: "black", strokeWidth: 1 };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    // create group
	    var g = this.group(group, params.id, params.groupSettings);
	    var sgs = [];

	    // initialize coords
	    var x = direction == "vertical" ? shift : base;
	    var y = direction == "vertical" ? base : shift;

	    // iterate over the boxes array
	    for (var i=0; i<bars.length; i++) {
		var subbars = bars[i];
		if (typeof subbars.length !== "number") {
		    subbars = [ subbars ];
		}
		var x1 = x;
		var y1 = y;
		sgs.push(this.group(g));
		for (var h=0; h<subbars.length; h++) {
		    var bar = subbars[h];
		    var f = jQuery.extend({}, format, bar.format == null ? {} : bar.format);
		    var bg;
		    if (f.hasOwnProperty('title')) {
			bg = this.group(sgs[i]);
			this.doctitle(bg, f.title);
		    } else {
			bg = sgs[i];
		    }
		    if (direction == "vertical") {
			this.rect(bg, x, y1 - bar.height, width, bar.height, 0, 0, f);
			y1 -= bar.height;
		    } else {
			this.rect(bg, x1, y, bar.height, width, 0, 0, f);
			x1 += bar.height;
		    }   
		}
		if (direction == "vertical") {
		    x += space + width;
		} else {
		    y -= space + width;
		}
	    }

	    return g;
	},

	linechart: function(params) {
	    var shift = params.shift == null ? 0 : params.shift;
	    var height = this._height();
	    var base = params.base == null ? height : height - params.base;
	    var space = params.space == null ? 5 : params.space;
	    var radius = params.radius;
	    var groups = params.groups || params.data || [];
	    var group = params.group || null;
	    var colors = params.colors || GooglePalette();
	    var format = { fill: "white", stroke: "black", strokeWidth: 1 };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    // create group
	    var mg = this.group(group, params.id, params.groupSettings);
	    
	    // iterate over the groups
	    for (var h=0; h<groups.length; h++) {
		var g = this.group(mg);
		this.doctitle(g, groups[h].name);
		points = groups[h].points;
		format.stroke = colors[h];
		if (groups[h].hasOwnProperty('format')) {
		    format = jQuery.extend(format, groups[h].format);
		}
		if (groups[h].hasOwnProperty('radius')) {
		    radius = groups[h].radius;
		}
	    
		// initialize coords
		var x = shift;
		var y = base;
		
		// iterate over the points array
		var lastX = null;
		var lastY = null;
		for (var i=0; i<points.length; i++) {
		    var point = points[i];
		    var f = jQuery.extend({}, format, point.format == null ? {} : point.format);
		    var y1 = y - point.y;
		    var x1 = x;
		    if (point.hasOwnProperty('x')) {
			x1 = x + point.x;
		    }
		    if (i>0) {
			this.line(g, lastX, lastY, x1, y1, { stroke: f.stroke, strokeWidth: f.strokeWidth });
			var r = points[i - 1].radius == null ? radius : points[i - 1].radius;
			if (r) {
			    var pg = this.group(g);
			    f = jQuery.extend({}, format, points[i - 1].format == null ? {} : points[i - 1].format);
			    this.circle(pg, lastX, lastY, r, f);
			    if (point.hasOwnProperty('value')) {
				this.doctitle(pg, point.value);
			    }
			}
		    }
		    lastX = x1;
		    lastY = y1;
		    if (! point.hasOwnProperty('x')) {
			x += space;
		    }
		}
		var point = points[points.length - 1];
		var f = jQuery.extend({}, format, point.format == null ? {} : point.format);
		var r = point.radius == null ? radius : point.radius;
		if (r) {
		    this.circle(g, lastX, lastY, r, f); 
		}
	    }
	    
	    return mg;
	},

	areachart: function(params) {
	    var group = params.group || null;
	    var shift = params.shift == null ? 0 : params.shift;
	    var height = params.height == null ? this._height() : params.height;
	    var base = params.base == null ? this._height() : this._height() - params.base;
	    var space = params.space == null ? 5 : params.space;
	    var areas = params.areas || params.data || [];
	    var format = { fill: "white", stroke: "black", strokeWidth: 1 };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    // create group
	    var g = this.group(group, params.id, params.groupSettings);

	    // initialize coords
	    var x = shift;
	    var y = base;

	    // iterate over the areas
	    var lastPoints = [];
	    var x1 = x;
	    for (var h=0; h<areas[0].values.length; h++) {
		lastPoints.push([x1, y]);
		x1 += space;
	    }
	    lastPoints.reverse();
	    for (var i=0; i<areas.length; i++) {
		var points = [];
		x1 = x;
		for (var h=0; h<lastPoints.length; h++) {
		    points.push([lastPoints[h][0], lastPoints[h][1]]);
		}
		var newLastPoints = [];
		for (var h=0; h<areas[i].values.length; h++) {
		    var y1 = lastPoints[lastPoints.length - 1 - h][1] - areas[i].values[h];
		    points.push([x1, y1]);
		    newLastPoints.push([x1, y1]);
		    x1 += space;
		}
		newLastPoints.reverse();
		lastPoints = newLastPoints;
		var f = jQuery.extend({}, format, areas[i].format == null ? {} : areas[i].format);
		this.polygon(g, points, f);
	    }

	    return g;
	},

	plot: function(params) {
	    var group = params.group || null;
	    var height = params.height == null ? this._height() : params.height;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? this._height() : this._height() - params.shiftY;
	    var radius = params.radius == null ? 2 : params.radius;
	    var groups = params.dots || params.data || [];
	    var format = { fill: "white", stroke: "black", strokeWidth: 1 };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    // create group
	    var g = this.group(group, params.id, params.groupSettings);

	    // iterate over the groups
	    for (var h=0; h<groups.length; h++) {
		var dots = groups[h].points;
		var sg = this.group(g, params.id + "_" + groups[h].name, groups[h].settings || {});

		// add a title
		if (groups[h].hasOwnProperty('name')) {
		    this.doctitle(sg, groups[h].name);
		}
		
		// draw the dots
		for (var i=0; i<dots.length; i++) {
		    var dot = dots[i];
		    var f = {};
		    jQuery.extend(f, format, dot.format || {});
		    var r = dot.radius == null ? radius : dot.radius;
		    var pg = sg;
		    if (dot.hasOwnProperty('name')) {
			pg = this.group(sg);
			this.doctitle(pg, dot.name);
		    }
		    this.circle(pg, dot.x + shiftX, shiftY - dot.y, r, f);
		}
		
	    }
	    
	    return g;
	},

	/* Draw a donut slice.
	   @param center (int) radius of the full circle
	   @param inner (int) radius of the inner circle of the current slice
	   @param outer (int) radius of the outer circle of the current slice
	   @param startAngle (int) angle of the start of the slice (in degrees)
	   @param endAngle (int) angle of the end of the slice (in degrees)
	   @param format (object) any key/value pairs for the SVG element
	   @return (element) the new shape node */
	donutslice: function(params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var center = params.center;
	    var inner = params.inner == null ? 0 : params.inner;
	    var outer = params.outer == null ? center : params.outer;
	    var startAngle = params.startAngle == null ? -90 : params.startAngle - 90;
	    var endAngle = params.endAngle == null ? 269 : params.endAngle - 90;
	    var largeArc = endAngle - startAngle > 180 ? 1 : 0;
	    var format = { stroke: "black", strokeWidth: 1, fill: "white" };
	    if (params.format != null) {
		jQuery.extend(format, params.format);
	    }

	    var r1 = outer;
	    var r2 = inner;
	    
	    var startAngleRad = Math.PI*startAngle/180;
	    var endAngleRad = Math.PI*endAngle/180;

	    var x1inner = parseInt(shiftX + center + r2*Math.cos(startAngleRad));
	    var y1inner = parseInt(shiftY + center + r2*Math.sin(startAngleRad));
	    
	    var x2inner = parseInt(shiftX + center + r2*Math.cos(endAngleRad));
	    var y2inner = parseInt(shiftY + center + r2*Math.sin(endAngleRad));
	    
	    var x1outer = parseInt(shiftX + center + r1*Math.cos(startAngleRad));
	    var y1outer = parseInt(shiftY + center + r1*Math.sin(startAngleRad));
	    
	    var x2outer = parseInt(shiftX + center + r1*Math.cos(endAngleRad));
	    var y2outer = parseInt(shiftY + center + r1*Math.sin(endAngleRad));
	    
	    r1 = parseInt(r1);
	    r2 = parseInt(r2);
	    
	    var path = "M"+x1inner+","+y1inner+"  L"+x1outer+","+y1outer+"  A"+r1+","+r1+" 0 "+largeArc+",1 "+x2outer+","+y2outer+" L"+x2inner+","+y2inner+"  A"+r2+","+r2+" 0 "+largeArc+",0 "+x1inner+","+y1inner;

	    var g;
	    if (format && format.hasOwnProperty('title')) {
		g = this.group(group);
		this.doctitle(g, format.title);
	    } else {
		g = group;
	    }
	    
	    return this.path(g, path, format);
	},
	donutchart: function(params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var center = params.center;
	    var rims = params.rims || params.data || [];
	    var width = params.width == null ? parseInt(center / rims.length) : params.width;
	    var inner = params.inner == null ? center - width : params.inner;
	    var outer = center;
	    var startAngle = params.startAngle == null ? 0 : params.startAngle;
	    var format = params.format == null ? {} : params.format;
	    
	    var g = this.group(group, params.id, params.groupSettings);
	    for (var i=0; i<rims.length; i++) {
		var start = startAngle;
		for (var h=0; h<rims[i].length; h++) {
		    var end = start + rims[i][h].angle;
		    var f = {};
		    jQuery.extend(f, format, rims[i][h].format == null ? {} : rims[i][h].format);
		    this.donutslice({ group: g, shiftX: shiftX, shiftY: shiftY, center: center, inner: inner, outer: outer, startAngle: start, endAngle: end, format: f });
		    start = end;
		}
		outer = inner;
		inner -= width;
	    }
	    
	    return g;
	},
	heatmap: function(params) {
	    var group = params.group || null;
	    var data = params.data;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var height = this._height();
	    var boxwidth = params.boxwidth == null ? 10 : params.boxwidth;
	    var boxheight = params.boxheight == null ? params.boxwidth : params.boxheight;
	    var format = params.format == null ? {} : params.format;
	    var colorscale = params.colorscale || "green2red";
	    
	    var g = this.group(group, params.id, params.groupSettings);
	    for (var i=0; i<data.cells.length; i++) {

		for (var h=0; h<data.cells[i].length; h++) {

		    // calculate box margins
		    var x = h * boxwidth + shiftX;
		    var y = i * boxheight + shiftY;

		    // calculate box color
		    var color = "black";
		    var adjusted_value = (data.cells[data.rowindex[i]-1][data.colindex[h]-1] * 2) - 1;
		    var cval = 255 - parseInt(255 * Math.abs(adjusted_value));
		    if (colorscale == 'green2red') {
			if (adjusted_value < 0) {
			    color = "rgb(255,"+cval+","+cval+")";
			} else {
			    color = "rgb("+cval+",255,"+cval+")";
			}
		    } else {
			if (adjusted_value < 0) {
			    color = "rgb("+cval+","+cval+",255)";
			} else {
			    color = "rgb(255,255,"+cval+")";
			}
		    }
		    format.stroke = "gray";
		    format.fill = color;

		    // draw the box
		    this.rect(g, x, y, boxwidth, boxheight, 0, 0, format);
		    
		}
		
	    }
	    
	    return g;
	},
	colorscale: function(params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var min = params.min == null ? -1 : params.min;
	    var max = params.max == null ? 1 : params.max;
	    var steps = params.steps == null ? 20 : params.steps;
	    var boxwidth = params.boxwidth == null ? 10 : params.boxwidth;
	    var boxheight = params.boxheight == null ? params.boxwidth : params.boxheight;
	    var format = params.format == null ? {} : params.format;
	    var textformat = jQuery.extend(true, {}, format);
	    textformat.stroke = "black";
	    textformat.fill = "black";
	    textformat['stroke-width'] = 0;
	    textformat['text-anchor'] = "middle";
	    var colorscale = params.colorscale || "green2red";
	    var step = Math.abs(max - min) / steps;
	    
	    var g = this.group(group, params.id, params.groupSettings);
	    for (var i=0; i<steps + 1; i++) {

		var x = i * boxwidth + shiftX;
		var y = boxheight + shiftY + 5;
		
		// draw box
		var color = "black";
		var adjusted_value = (min + (i * step)).toFixed(1);
		var cval = 255 - parseInt(255 * Math.abs(adjusted_value));
		if (colorscale == 'green2red') {
			if (adjusted_value < 0) {
			    color = "rgb(255,"+cval+","+cval+")";
			} else {
			    color = "rgb("+cval+",255,"+cval+")";
			}
		    } else {
			if (adjusted_value < 0) {
			    color = "rgb("+cval+","+cval+",255)";
			} else {
			    color = "rgb(255,255,"+cval+")";
			}
		    }
		format.fill = color;
		this.rect(g, x, shiftY, boxwidth, boxheight, 0, 0, format);

		// draw text
		var t = this.text(g, x + (boxwidth / 2), y, adjusted_value+'', textformat);
		t.setAttribute('y', y + t.getBBox().height);
	    }
	    
	    return g;
	},
	title: function (params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var format = params.format == null ? {} : params.format;
	    var text = params.data == null ? "Title" : params.data;

	    if (params.rotation !== null) {
		format.transform = "rotate(-"+params.rotation+", "+shiftX+", "+shiftY+")";
	    }
	    
	    var g = this.group(group, params.id, params.groupSettings);

	    this.text(g, shiftX, shiftY, text, format);
	    
	    return g;
	},

	deviationplot: function (params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var format = params.format == null ? {} : params.format;
	    var height = params.height == null ? 80 : params.height;
	    var width = params.width == null ? 400 : params.width;
	    var data = params.data || {};

	    var colors = { 'darkblue': '#8caad8',
			   'mediumblue': '#a8bfe2',
			   'lightblue': '#d9e3f2',
			   'border': '#789cd2',
			   'mean': '#3f72bf',
			   'mark': '#ff0000' };
	    
	    format = jQuery.extend({}, { fill:"none", stroke: "black" }, format);

	    var g = this.group(group, params.id, params.groupSettings);

	    var padding = parseInt(height / 4);
	    var factor = width / (data.max - data.min);
	    
	    // main rectangle
	    this.rect(g, shiftX + 1, shiftY + padding, width - 2, height - (padding * 2), 0, 0, {fill: colors['lightblue'], stroke: colors['darkblue'], strokeWidth: 2});
	    
	    // 2 std dv
	    this.rect(g, shiftX + ((data.mean - (2 * data.stdv)) - data.min) * factor, shiftY + padding, 4 * data.stdv * factor, height - (padding * 2), 0, 0, {fill: colors['mediumblue'], stroke: colors['border'], strokeWidth: 2});
	    
	    // std dv
	    this.rect(g, shiftX + ((data.mean - data.stdv) - data.min) * factor, shiftY + padding, 2 * data.stdv * factor, height - (padding * 2), 0, 0, {fill: colors['darkblue'], stroke: colors['border'], strokeWidth: 2});
	    
	    // mean
	    this.line(g, shiftX + (data.mean - data.min) * factor, shiftY + padding, shiftX + (data.mean - data.min) * factor, shiftY + height - padding, { strokeWidth: 2, strokeDashArray: "6,2", stroke: colors['mean'] }); 
	    
	    // mark
	    var mark = this.group(g);
	    this.line(mark, shiftX + (data.val - data.min) * factor, shiftY + padding, shiftX + (data.val - data.min) * factor, shiftY + height - padding, { stroke: colors['mark'], strokeWidth: 2 });
	    this.circle(mark, shiftX + (data.val - data.min) * factor, shiftY + padding - 6, 3, { stroke: colors['mark'], fill: colors['mark'] });
	    this.doctitle(mark, data.val);
	    
	    // 2 σ -
	    this.text(g, shiftX + ((data.mean - (2 * data.stdv)) - data.min) * factor, shiftY + padding - 5, "2σ", { fontSize: '10px', textAnchor: 'middle' });
	    
	    // σ -
	    this.text(g, shiftX + ((data.mean - data.stdv) - data.min) * factor, shiftY + padding - 5, "σ", { fontSize: '10px', textAnchor: 'middle' });
	    
	    // μ
	    this.text(g, shiftX + (data.mean - data.min) * factor, shiftY + padding - 5, "μ", { fontSize: '10px', textAnchor: 'middle' });
	    
	    // σ +
	    this.text(g, shiftX + ((data.mean + data.stdv) - data.min) * factor, shiftY + padding - 5, "σ", { fontSize: '10px', textAnchor: 'middle' });
	    
	    // 2 σ +
	    this.text(g, shiftX + ((data.mean + (2 * data.stdv)) - data.min) * factor, shiftY + padding - 5, "2σ", { fontSize: '10px', textAnchor: 'middle' });
	    
	    // min
	    this.text(g, shiftX + 0, shiftY + height - padding + 12, data.min.formatString(2), { fontSize: '10px' });
	    
	    // max
	    this.text(shiftX + width, shiftY + height - padding + 12, data.max.formatString(2), { fontSize: '10px', textAnchor: 'end' });
	    
	    // mean
	    this.text(shiftX + (data.mean - data.min) * factor, shiftY + height - padding + 12, data.mean.formatString(2), { fontSize: '10px', textAnchor: 'middle' });

	    return g;
	},

	dendogram: function (params) {
	    var group = params.group || null;
	    var shiftX = params.shiftX == null ? 0 : params.shiftX;
	    var shiftY = params.shiftY == null ? 0 : params.shiftY;
	    var format = params.format == null ? {} : params.format;
	    var height = params.height == null ? 100 : params.height;
	    var width = params.width == null ? 10 : params.width;
	    var direction = params.direction || "ltr";
	    var data = params.data || [];

	    format = jQuery.extend({}, { fill:"none", stroke: "black" }, format);

	    var g = this.group(group, params.id, params.groupSettings);
	    
	    var interval = parseInt(height / data.length);
	    var path = "";
	    if (direction == "ltr") {
		shiftX += height + 1;
		for (var i=0;i<data.length;i++) {
		    var curr_shift = shiftY + height + (interval / 2) + 1;
		    for (var h=0;h<data[i].length;h++) {
			var cluster = data[i][h];
			path += "M"+shiftX+","+parseInt(curr_shift + ((width * cluster.a) / 2))+"l-"+parseInt(interval)+",0";
			if (cluster.hasOwnProperty('b')) {
			    path += "l0,"+parseInt((width * (cluster.a / 2)) + (width * (cluster.b / 2)))+"l"+parseInt(interval)+",0";
			}
			curr_shift += cluster.b ? (cluster.a + cluster.b) * width : cluster.a * width;
		    }
		    shiftX -= interval;
		}
	    } else if (direction == "ttb") {
		for (var i=0;i<data.length;i++) {
		    var curr_shift = 0 + shiftX;
		    for (var h=0;h<data[i].length;h++) {
			var cluster = data[i][h];
			path += "M"+parseInt(curr_shift + ((width * cluster.a) / 2))+","+shiftY+"l0,-"+parseInt(interval);
			if (cluster.hasOwnProperty('b')) {
			    path += "l"+parseInt((width * (cluster.a / 2)) + (width * (cluster.b / 2)))+",0l0,"+parseInt(interval);
			}
			curr_shift += cluster.b ? (cluster.a + cluster.b) * width : cluster.a * width;
		    }
		    shiftY -= interval;
		}
	    } else if (direction == "rtl") {
		shiftX += 1;
		for (var i=0;i<data.length;i++) {
		    var curr_shift = shiftY + height + (interval / 2) + 1;
		    for (var h=0;h<data[i].length;h++) {
			var cluster = data[i][h];
			path += "M"+shiftX+","+parseInt(curr_shift + ((width * cluster.a) / 2))+"l"+parseInt(interval)+",0";
			if (cluster.hasOwnProperty('b')) {
			    path += "l0,"+parseInt((width * (cluster.a / 2)) + (width * (cluster.b / 2)))+"l-"+parseInt(interval)+",0";
			}
			curr_shift += cluster.b ? (cluster.a + cluster.b) * width : cluster.a * width;
		    }
		    shiftX += interval;
		}
	    } else if (direction == "btt") {
		for (var i=0;i<data.length;i++) {
		    var curr_shift = 0 + shiftX;
		    for (var h=0;h<data[i].length;h++) {
			var cluster = data[i][h];
			path += "M"+parseInt(curr_shift + ((width * cluster.a) / 2))+","+shiftY+"l0,"+parseInt(interval);
			if (cluster.hasOwnProperty('b')) {
			    path += "l"+parseInt((width * (cluster.a / 2)) + (width * (cluster.b / 2)))+",0l0,-"+parseInt(interval);
			}
			curr_shift += cluster.b ? (cluster.a + cluster.b) * width : cluster.a * width;
		    }
		    shiftY += interval;
		}
	    }
	    
	    return this.path(g, path, format);
	}
    });
    
})(jQuery);

//===================
/* Drag-Select-Box */
//===================
(function createMarquee(global){
    var svgNS = 'http://www.w3.org/2000/svg',
    svg   = document.createElementNS(svgNS,'svg'),
    pt    = svg.createSVGPoint();
    
    global.trackMarquee = function(forElement,onRelease,onDrag){
	forElement.addEventListener('mousedown',function(evt){
	    var point0 = getLocalCoordinatesFromMouseEvent(forElement,evt);
	    var marquee = document.createElementNS(svgNS,'rect');
	    marquee.setAttribute('class','marquee');
	    updateMarquee(marquee,point0,point0);
	    forElement.appendChild(marquee);
	    document.documentElement.addEventListener('mousemove',trackMouseMove,false);
	    document.documentElement.addEventListener('mouseup',stopTrackingMove,false);
	    function trackMouseMove(evt){
		var point1 = getLocalCoordinatesFromMouseEvent(forElement,evt);
		updateMarquee(marquee,point0,point1);
		if (onDrag) callWithBBox(onDrag,marquee);
	    }
	    function stopTrackingMove(){
		document.documentElement.removeEventListener('mousemove',trackMouseMove,false);
		document.documentElement.removeEventListener('mouseup',stopTrackingMove,false);
		forElement.removeChild(marquee);
		if (onRelease) callWithBBox(onRelease,marquee,forElement);
	    }
	},false);
    };
    
    function callWithBBox(func,rect,elem){
	var x = rect.getAttribute('x')*1,
        y = rect.getAttribute('y')*1,
        w = rect.getAttribute('width')*1,
        h = rect.getAttribute('height')*1;
	func(jQuery("#"+elem.parentNode.id).svg('get').plot.pointsInBounds(x,y,x+w,y+h));
    }
    
    function updateMarquee(rect,p0,p1){
	var xs = [p0.x,p1.x].sort(sortByNumber),
        ys = [p0.y,p1.y].sort(sortByNumber);
	rect.setAttribute('x',xs[0]);
	rect.setAttribute('y',ys[0]);
	rect.setAttribute('width', xs[1]-xs[0]);
	rect.setAttribute('height',ys[1]-ys[0]);
    }
    
    function getLocalCoordinatesFromMouseEvent(el,evt){
	pt.x = evt.clientX; pt.y = evt.clientY;
	return pt.matrixTransform(el.getScreenCTM().inverse());
    }
    
    function sortByNumber(a,b){ return a-b; }

    // Enable animation for all of these SVG numeric attributes -
    // named as svg-* or svg* (with first character upper case)
    jQuery.each(['x', 'y', 'width', 'height', 'rx', 'ry', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2',
		 'stroke-width', 'strokeWidth', 'opacity', 'fill-opacity', 'fillOpacity',
		 'stroke-opacity', 'strokeOpacity', 'stroke-dashoffset', 'strokeDashOffset',
		 'font-size', 'fontSize', 'font-weight', 'fontWeight',
		 'letter-spacing', 'letterSpacing', 'word-spacing', 'wordSpacing'],
		function(i, attrName) {
		    var ccName = attrName.charAt(0).toUpperCase() + attrName.substr(1);
		    if (jQuery.cssProps) {
			jQuery.cssProps['svg' + ccName] = jQuery.cssProps['svg-' + attrName] = attrName;
		    }
		    jQuery.fx.step['svg' + ccName] = jQuery.fx.step['svg-' + attrName] = function(fx) {
			var realAttrName = jQuery.svg._attrNames[attrName] || attrName;
			var attr = fx.elem.attributes.getNamedItem(realAttrName);
			if (!fx.set) {
			    fx.start = (attr ? parseFloat(attr.nodeValue) : 0);
			    var offset = (jQuery.fn.jquery >= '1.6' ? '' :
					  fx.options.curAnim['svg' + ccName] || fx.options.curAnim['svg-' + attrName]);
			    if (/^[+-]=/.exec(offset)) {
				fx.end = fx.start + parseFloat(offset.replace(/=/, ''));
			    }
			    jQuery(fx.elem).css(realAttrName, '');
			    fx.set = true;
			}
			var value = (fx.pos * (fx.end - fx.start) + fx.start) + (fx.unit == '%' ? '%' : '');
			(attr ? attr.nodeValue = value : fx.elem.setAttribute(realAttrName, value));
		    };
		}
	       );

    // Enable animation for the SVG strokeDashArray attribute
    jQuery.fx.step['svgStrokeDashArray'] = jQuery.fx.step['svg-strokeDashArray'] =
	jQuery.fx.step['svgStroke-dasharray'] = jQuery.fx.step['svg-stroke-dasharray'] = function(fx) {
	    var attr = fx.elem.attributes.getNamedItem('stroke-dasharray');
	    if (!fx.set) {
		fx.start = parseDashArray(attr ? attr.nodeValue : '');
		var offset = (jQuery.fn.jquery >= '1.6' ? fx.end :
			      fx.options.curAnim['svgStrokeDashArray'] || fx.options.curAnim['svg-strokeDashArray'] ||
			      fx.options.curAnim['svgStroke-dasharray'] || fx.options.curAnim['svg-stroke-dasharray']);
		fx.end = parseDashArray(offset);
		if (/^[+-]=/.exec(offset)) {
		    offset = offset.split(/[, ]+/);
		    if (offset.length % 2 == 1) { // Must have an even number
			var len = offset.length;
			for (var i = 0; i < len; i++) { // So repeat
			    offset.push(offset[i]);
			}
		    }
		    for (var i = 0; i < offset.length; i++) {
			if (/^[+-]=/.exec(offset[i])) {
			    fx.end[i] = fx.start[i] + parseFloat(offset[i].replace(/=/, ''));
			}
		    }
		}
		fx.set = true;
	    }
	    var value = jQuery.map(fx.start, function(n, i) {
		return (fx.pos * (fx.end[i] - n) + n);
	    }).join(',');
	    (attr ? attr.nodeValue = value : fx.elem.setAttribute('stroke-dasharray', value));
	};

    /* Parse a strokeDashArray definition: dash, gap, ...
       @param  value  (string) the definition
       @return  (number[2n]) the extracted values */
    function parseDashArray(value) {
	var dashArray = value.split(/[, ]+/);
	for (var i = 0; i < dashArray.length; i++) {
	    dashArray[i] = parseFloat(dashArray[i]);
	    if (isNaN(dashArray[i])) {
		dashArray[i] = 0;
	    }
	}
	if (dashArray.length % 2 == 1) { // Must have an even number
	    var len = dashArray.length;
	    for (var i = 0; i < len; i++) { // So repeat
		dashArray.push(dashArray[i]);
	    }
	}
	return dashArray;
    }

    // Enable animation for the SVG viewBox attribute
    jQuery.fx.step['svgViewBox'] = jQuery.fx.step['svg-viewBox'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('viewBox');
	if (!fx.set) {
	    fx.start = parseViewBox(attr ? attr.nodeValue : '');
	    var offset = (jQuery.fn.jquery >= '1.6' ? fx.end :
			  fx.options.curAnim['svgViewBox'] || fx.options.curAnim['svg-viewBox']);
	    fx.end = parseViewBox(offset);
	    if (/^[+-]=/.exec(offset)) {
		offset = offset.split(/[, ]+/);
		while (offset.length < 4) {
		    offset.push('0');
		}
		for (var i = 0; i < 4; i++) {
		    if (/^[+-]=/.exec(offset[i])) {
			fx.end[i] = fx.start[i] + parseFloat(offset[i].replace(/=/, ''));
		    }
		}
	    }
	    fx.set = true;
	}
	var value = jQuery.map(fx.start, function(n, i) {
	    return (fx.pos * (fx.end[i] - n) + n);
	}).join(' ');
	(attr ? attr.nodeValue = value : fx.elem.setAttribute('viewBox', value));
    };

    /* Parse a viewBox definition: x, y, width, height.
       @param  value  (string) the definition
       @return  (number[4]) the extracted values */
    function parseViewBox(value) {
	var viewBox = value.split(/[, ]+/);
	for (var i = 0; i < viewBox.length; i++) {
	    viewBox[i] = parseFloat(viewBox[i]);
	    if (isNaN(viewBox[i])) {
		viewBox[i] = 0;
	    }
	}
	while (viewBox.length < 4) {
	    viewBox.push(0);
	}
	return viewBox;
    }

    // Enable animation for the SVG transform attribute
    jQuery.fx.step['svgTransform'] = jQuery.fx.step['svg-transform'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('transform');
	if (!fx.set) {
	    fx.start = parseTransform(attr ? attr.nodeValue : '');
	    fx.end = parseTransform(fx.end, fx.start);
	    fx.set = true;
	}
	var transform = '';
	for (var i = 0; i < fx.end.order.length; i++) {
	    switch (fx.end.order.charAt(i)) {
	    case 't':
		transform += ' translate(' +
		    (fx.pos * (fx.end.translateX - fx.start.translateX) + fx.start.translateX) + ',' +
		    (fx.pos * (fx.end.translateY - fx.start.translateY) + fx.start.translateY) + ')';
		break;
	    case 's':
		transform += ' scale(' +
		    (fx.pos * (fx.end.scaleX - fx.start.scaleX) + fx.start.scaleX) + ',' +
		    (fx.pos * (fx.end.scaleY - fx.start.scaleY) + fx.start.scaleY) + ')';
		break;
	    case 'r':
		transform += ' rotate(' +
		    (fx.pos * (fx.end.rotateA - fx.start.rotateA) + fx.start.rotateA) + ',' +
		    (fx.pos * (fx.end.rotateX - fx.start.rotateX) + fx.start.rotateX) + ',' +
		    (fx.pos * (fx.end.rotateY - fx.start.rotateY) + fx.start.rotateY) + ')';
		break;
	    case 'x':
		transform += ' skewX(' +
		    (fx.pos * (fx.end.skewX - fx.start.skewX) + fx.start.skewX) + ')';
	    case 'y':
		transform += ' skewY(' +
		    (fx.pos * (fx.end.skewY - fx.start.skewY) + fx.start.skewY) + ')';
		break;
	    case 'm':
		var matrix = '';
		for (var j = 0; j < 6; j++) {
		    matrix += ',' + (fx.pos * (fx.end.matrix[j] - fx.start.matrix[j]) + fx.start.matrix[j]);
		}				
		transform += ' matrix(' + matrix.substr(1) + ')';
		break;
	    }
	}
	(attr ? attr.nodeValue = transform : fx.elem.setAttribute('transform', transform));
    };

    /* Decode a transform string and extract component values.
       @param  value     (string) the transform string to parse
       @param  original  (object) the settings from the original node
       @return  (object) the combined transformation attributes */
    function parseTransform(value, original) {
	value = value || '';
	if (typeof value == 'object') {
	    value = value.nodeValue;
	}
	var transform = jQuery.extend({translateX: 0, translateY: 0, scaleX: 0, scaleY: 0,
				       rotateA: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0,
				       matrix: [0, 0, 0, 0, 0, 0]}, original || {});
	transform.order = '';
	var pattern = /([a-zA-Z]+)\(\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*)?)?)?\)/g;
	var result = pattern.exec(value);
	while (result) {
	    switch (result[1]) {
	    case 'translate':
		transform.order += 't';
		transform.translateX = parseFloat(result[2]);
		transform.translateY = (result[3] ? parseFloat(result[3]) : 0);
		break;
	    case 'scale':
		transform.order += 's';
		transform.scaleX = parseFloat(result[2]);
		transform.scaleY = (result[3] ? parseFloat(result[3]) : transform.scaleX);
		break;
	    case 'rotate':
		transform.order += 'r';
		transform.rotateA = parseFloat(result[2]);
		transform.rotateX = (result[3] ? parseFloat(result[3]) : 0);
		transform.rotateY = (result[4] ? parseFloat(result[4]) : 0);
		break;
	    case 'skewX':
		transform.order += 'x';
		transform.skewX = parseFloat(result[2]);
		break;
	    case 'skewY':
		transform.order += 'y';
		transform.skewY = parseFloat(result[2]);
		break;
	    case 'matrix':
		transform.order += 'm';
		transform.matrix = [parseFloat(result[2]), parseFloat(result[3]),
				    parseFloat(result[4]), parseFloat(result[5]),
				    parseFloat(result[6]), parseFloat(result[7])];
		break;
	    }
	    result = pattern.exec(value);
	}
	if (transform.order == 'm' && Math.abs(transform.matrix[0]) == Math.abs(transform.matrix[3]) &&
	    transform.matrix[1] != 0 && Math.abs(transform.matrix[1]) == Math.abs(transform.matrix[2])) {
	    // Simple rotate about origin and translate
	    var angle = Math.acos(transform.matrix[0]) * 180 / Math.PI;
	    angle = (transform.matrix[1] < 0 ? 360 - angle : angle);
	    transform.order = 'rt';
	    transform.rotateA = angle;
	    transform.rotateX = transform.rotateY = 0;
	    transform.translateX = transform.matrix[4];
	    transform.translateY = transform.matrix[5];
	}
	return transform;
    }

    // Enable animation for all of these SVG colour properties - based on jquery.color.js
    jQuery.each(['fill', 'stroke'],
		function(i, attrName) {
		    var ccName = attrName.charAt(0).toUpperCase() + attrName.substr(1);
		    jQuery.fx.step['svg' + ccName] = jQuery.fx.step['svg-' + attrName] = function(fx) {
			if (!fx.set) {
			    fx.start = jQuery.svg._getColour(fx.elem, attrName);
			    var toNone = (fx.end == 'none');
			    fx.end = (toNone ? jQuery.svg._getColour(fx.elem.parentNode, attrName) : jQuery.svg._getRGB(fx.end));
			    fx.end[3] = toNone;
			    jQuery(fx.elem).css(attrName, '');
			    fx.set = true;
			}
			var attr = fx.elem.attributes.getNamedItem(attrName);
			var colour = 'rgb(' + [
			    Math.min(Math.max(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 0), 255),
			    Math.min(Math.max(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 0), 255),
			    Math.min(Math.max(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 0), 255)
			].join(',') + ')';
			colour = (fx.end[3] && fx.state == 1 ? 'none' : colour);
			(attr ? attr.nodeValue = colour : fx.elem.setAttribute(attrName, colour));
		    }
		}
	       );

    /* Find this attribute value somewhere up the node hierarchy.
       @param  elem  (element) the starting element to find the attribute
       @param  attr  (string) the attribute name
       @return  (number[3]) RGB components for the attribute colour */
    jQuery.svg._getColour = function(elem, attr) {
	elem = jQuery(elem);
	var colour;
	do {
	    colour = elem.attr(attr) || elem.css(attr);
	    // Keep going until we find an element that has colour, or exit SVG
	    if ((colour != '' && colour != 'none') || elem.hasClass(jQuery.svg.markerClassName)) {
		break; 
	    }
	} while (elem = elem.parent());
	return jQuery.svg._getRGB(colour);
    };

    /* Parse strings looking for common colour formats.
       @param  colour  (string) colour description to parse
       @return  (number[3]) RGB components of this colour */
    jQuery.svg._getRGB = function(colour) {
	var result;
	// Check if we're already dealing with an array of colors
	if (colour && colour.constructor == Array) {
	    return (colour.length == 3 || colour.length == 4 ? colour : colours['none']);
	}
	// Look for rgb(num,num,num)
	if (result = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)jQuery/.exec(colour)) {
	    return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
	}
	// Look for rgb(num%,num%,num%)
	if (result = /^rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)jQuery/.exec(colour)) {
	    return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55,
		    parseFloat(result[3]) * 2.55];
	}
	// Look for #a0b1c2
	if (result = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})jQuery/.exec(colour)) {
	    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
	}
	// Look for #abc
	if (result = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])jQuery/.exec(colour)) {
	    return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16),
		    parseInt(result[3] + result[3], 16)];
	}
	// Otherwise, we're most likely dealing with a named color
	return colours[jQuery.trim(colour).toLowerCase()] || colours['none'];
    };

    // The SVG named colours
    var colours = {
	'':						[255, 255, 255, 1],
	none:					[255, 255, 255, 1],
	aliceblue:				[240, 248, 255],
	antiquewhite:			[250, 235, 215],
	aqua:					[0, 255, 255],
	aquamarine:				[127, 255, 212],
	azure:					[240, 255, 255],
	beige:					[245, 245, 220],
	bisque:					[255, 228, 196],
	black:					[0, 0, 0],
	blanchedalmond:			[255, 235, 205],
	blue:					[0, 0, 255],
	blueviolet:				[138, 43, 226],
	brown:					[165, 42, 42],
	burlywood:				[222, 184, 135],
	cadetblue:				[95, 158, 160],
	chartreuse:				[127, 255, 0],
	chocolate:				[210, 105, 30],
	coral:					[255, 127, 80],
	cornflowerblue:			[100, 149, 237],
	cornsilk:				[255, 248, 220],
	crimson:				[220, 20, 60],
	cyan:					[0, 255, 255],
	darkblue:				[0, 0, 139],
	darkcyan:				[0, 139, 139],
	darkgoldenrod:			[184, 134, 11],
	darkgray:				[169, 169, 169],
	darkgreen:				[0, 100, 0],
	darkgrey:				[169, 169, 169],
	darkkhaki:				[189, 183, 107],
	darkmagenta:			[139, 0, 139],
	darkolivegreen:			[85, 107, 47],
	darkorange:				[255, 140, 0],
	darkorchid:				[153, 50, 204],
	darkred:				[139, 0, 0],
	darksalmon:				[233, 150, 122],
	darkseagreen:			[143, 188, 143],
	darkslateblue:			[72, 61, 139],
	darkslategray:			[47, 79, 79],
	darkslategrey:			[47, 79, 79],
	darkturquoise:			[0, 206, 209],
	darkviolet:				[148, 0, 211],
	deeppink:				[255, 20, 147],
	deepskyblue:			[0, 191, 255],
	dimgray:				[105, 105, 105],
	dimgrey:				[105, 105, 105],
	dodgerblue:				[30, 144, 255],
	firebrick:				[178, 34, 34],
	floralwhite:			[255, 250, 240],
	forestgreen:			[34, 139, 34],
	fuchsia:				[255, 0, 255],
	gainsboro:				[220, 220, 220],
	ghostwhite:				[248, 248, 255],
	gold:					[255, 215, 0],
	goldenrod:				[218, 165, 32],
	gray:					[128, 128, 128],
	grey:					[128, 128, 128],
	green:					[0, 128, 0],
	greenyellow:			[173, 255, 47],
	honeydew:				[240, 255, 240],
	hotpink:				[255, 105, 180],
	indianred:				[205, 92, 92],
	indigo:					[75, 0, 130],
	ivory:					[255, 255, 240],
	khaki:					[240, 230, 140],
	lavender:				[230, 230, 250],
	lavenderblush:			[255, 240, 245],
	lawngreen:				[124, 252, 0],
	lemonchiffon:			[255, 250, 205],
	lightblue:				[173, 216, 230],
	lightcoral:				[240, 128, 128],
	lightcyan:				[224, 255, 255],
	lightgoldenrodyellow:	[250, 250, 210],
	lightgray:				[211, 211, 211],
	lightgreen:				[144, 238, 144],
	lightgrey:				[211, 211, 211],
	lightpink:				[255, 182, 193],
	lightsalmon:			[255, 160, 122],
	lightseagreen:			[32, 178, 170],
	lightskyblue:			[135, 206, 250],
	lightslategray:			[119, 136, 153],
	lightslategrey:			[119, 136, 153],
	lightsteelblue:			[176, 196, 222],
	lightyellow:			[255, 255, 224],
	lime:					[0, 255, 0],
	limegreen:				[50, 205, 50],
	linen:					[250, 240, 230],
	magenta:				[255, 0, 255],
	maroon:					[128, 0, 0],
	mediumaquamarine:		[102, 205, 170],
	mediumblue:				[0, 0, 205],
	mediumorchid:			[186, 85, 211],
	mediumpurple:			[147, 112, 219],
	mediumseagreen:			[60, 179, 113],
	mediumslateblue:		[123, 104, 238],
	mediumspringgreen:		[0, 250, 154],
	mediumturquoise:		[72, 209, 204],
	mediumvioletred:		[199, 21, 133],
	midnightblue:			[25, 25, 112],
	mintcream:				[245, 255, 250],
	mistyrose:				[255, 228, 225],
	moccasin:				[255, 228, 181],
	navajowhite:			[255, 222, 173],
	navy:					[0, 0, 128],
	oldlace:				[253, 245, 230],
	olive:					[128, 128, 0],
	olivedrab:				[107, 142, 35],
	orange:					[255, 165, 0],
	orangered:				[255, 69, 0],
	orchid:					[218, 112, 214],
	palegoldenrod:			[238, 232, 170],
	palegreen:				[152, 251, 152],
	paleturquoise:			[175, 238, 238],
	palevioletred:			[219, 112, 147],
	papayawhip:				[255, 239, 213],
	peachpuff:				[255, 218, 185],
	peru:					[205, 133, 63],
	pink:					[255, 192, 203],
	plum:					[221, 160, 221],
	powderblue:				[176, 224, 230],
	purple:					[128, 0, 128],
	red:					[255, 0, 0],
	rosybrown:				[188, 143, 143],
	royalblue:				[65, 105, 225],
	saddlebrown:			[139, 69, 19],
	salmon:					[250, 128, 114],
	sandybrown:				[244, 164, 96],
	seagreen:				[46, 139, 87],
	seashell:				[255, 245, 238],
	sienna:					[160, 82, 45],
	silver:					[192, 192, 192],
	skyblue:				[135, 206, 235],
	slateblue:				[106, 90, 205],
	slategray:				[112, 128, 144],
	slategrey:				[112, 128, 144],
	snow:					[255, 250, 250],
	springgreen:			[0, 255, 127],
	steelblue:				[70, 130, 180],
	tan:					[210, 180, 140],
	teal:					[0, 128, 128],
	thistle:				[216, 191, 216],
	tomato:					[255, 99, 71],
	turquoise:				[64, 224, 208],
	violet:					[238, 130, 238],
	wheat:					[245, 222, 179],
	white:					[255, 255, 255],
	whitesmoke:				[245, 245, 245],
	yellow:					[255, 255, 0],
	yellowgreen:			[154, 205, 50]
    };

})(window);

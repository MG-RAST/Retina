/*
  SVG Renderer

  Displays an SVG graphic.

  Options

  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "svg2",
	    title: "SVG",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg-new.js", "rgbcolor.js" ],
            defaults: {
		'width': 600,
		'height': 500,
		'items': [ ],
		'connections': [],
		'data': null
	    }
	},
	exampleData: function () {
	    return [];
        },
	
	render: function () {
	    var renderer = this;
	    
	    // get the target div
	    var target = renderer.settings.target;
	    var index = renderer.index;
	    target.innerHTML = "<div id='SVGdiv"+index+"'></div>";
	    target.firstChild.setAttribute('style', "width: "+ renderer.settings.width+"px; height: "+renderer.settings.height+"px;");
	    renderer.svg = jQuery('#SVGdiv'+index).svg().svg('get');

	    for (var i=0; i<renderer.settings.items.length; i++) {
		var type = renderer.settings.items[i].type;
		renderer.svg[type](jQuery.extend({}, renderer[type], renderer.settings.items[i].parameters));
	    }
	    
	    return renderer;
	},
	
	axis: function () {
	    return [ { "name": 'direction', "default": 'vertical', "description": "the orientation of the baseline of the axis, either horizontal or vertical", "valueType": "select", "options": [ "vertical", "horizontal" ] },
		     { "name": 'labelPosition', "default": 'left-bottom', "description": "where in relation to the base line the labels should be rendered", "valueType": "select", "options": [ "left-bottom", "right-top" ] },
		     { "name": 'labelRotation', "default": 0, "description": "rotation in degrees of the labels", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical axes", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical axes", "valueType": "int" },
		     { "name": 'length', "default": 400, "description": "the total length of the axis", "valueType": "int" },
		     { "name": 'min', "default": 0, "description": "the minimum value of the scale", "valueType": "int" },
		     { "name": 'max', "default": 10, "description": "the maximum value of the scale", "valueType": "int" },
		     { "name": 'spaceMajor', "default": 40, "description": "the spacing between two major ticks", "valueType": "int" },
		     { "name": 'numMinor', "default": 5, "description": "the number of minor ticks between two major ticks", "valueType": "int" },
		     { "name": 'tickShift', "default": 0, "description": "the number of pixels the ticks overlap the axis to the inside of the graph", "valueType": "int" },
		     { "name": 'majorTickLength', "default": 10, "description": "the length of the major ticks", "valueType": "int" },
		     { "name": 'minorTickLength', "default": 5, "description": "the length of the minor ticks", "valueType": "int" },
		     { "name": 'lineFormat', "default": { 'stroke': 'black', 'strokeWidth': 1 }, "description": "the attributes (color, width) of the base line of the axis", "valueType": "line" },
		     { "name": 'labelFormat', "default": { 'fontFamily': "Helvetica", 'fontWeight': 100, 'fontSize': 12 }, "description": "the font attributes of the axis labels", "valueType": "font" },
		     { "name": 'showLabels', "default": true, "description": "turns display of labels on and off", "valueType": "boolean" },
		     { "name": 'labelOrigin', "default": true, "description": "turns display of the label at the origin point on or off", "valueType": "boolean" },
		     { "name": 'isLog', "default": false, "description": "shows log or linear values as the axis labels", "valueType": "boolean" },
		     { "name": 'noLine', "default": false, "description": "hides the lines", "valueType": "boolean" },
		     { "name": 'labels', "default": [], "description": "a list of labels to be used instead of the values", "valueType": "list" }
		   ];
	},
	
	legend: function () {
	    return [ { "name": 'top', "default": 150, "description": "the top position of the legend", "valueType": "int" },
		     { "name": 'left', "default": 500, "description": "the left position of the legend", "valueType": "int" },
		     { "name": 'colors', "default": GooglePalette(), "description": "the list of colors of the legend", "valueType": "list" },
		     { "name": 'format', "default": { "fontSize": 12, "fontFamily": "arial", "fontWeight": "normal" }, "description": "the font format of the legend labels", "valueType": "font" },
		     { "name": 'data', "default": this.demodata.labels, "description": "the list of labels of the legend", "valueType": "list" }
		   ];
	},
	
	grid: function () {
	    return [ { "name": 'direction', "default": 'vertical', "description": "the orientation of the lines of the grid", "valueType": "select", "options": [ "vertical", "horizontal" ] },
		     { "name": 'topMargin', "default": 50, "description": "the top margin of the grid", "valueType": "int" },
		     { "name": 'height', "default": 400, "description": "the height of the grid", "valueType": "int" },
		     { "name": 'width', "default": 400, "description": "the width of the grid", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical grids", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical grids", "valueType": "int" },
		     { "name": 'space', "default": 50, "description": "the spacing between two lines of the grid", "valueType": "int" },
		     { "name": 'format', "default": { stroke: "gray", strokeWidth: 1, "stroke-dasharray": "2,2" }, "description": "the line format", "valueType": "line" }
		   ];
	},
	
	title: function () {
	    return [ { "name": 'rotation', "default": 0, "description": "rotation of the title in degrees", "valueType": "int" },
		     { "name": 'shiftY', "default": 30, "description": "the y offset from the top", "valueType": "int" },
		     { "name": 'shiftX', "default": 250, "description": "the x offset from the left", "valueType": "int" },
		     { "name": 'format', "default": { "font-size": 22, "font-family": "arial", "text-anchor": "middle" }, "description": "the font format", "valueType": "font" },
		     { "name": 'data', "default": 'Title', "description": "the text of the title", "valueType": "text" }
		   ];
	},
	    
	dendogram: function () {
	    return [];
	},
	
	barchart: function () {
	    return [ { "name": 'direction', "default": 'vertical', "description": "the orientation of the bars", "valueType": "select", "options": [ "vertical", "horizontal" ] },
		     { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'width', "default": 25, "description": "the width of each bar", "valueType": "int" },
		     { "name": 'shift', "default": 60, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'space', "default": 10, "description": "the spacing between two bars", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "white", 'stroke': "black", 'strokeWidth': 1 }, "description": "the line format", "valueType": "line" },
		     { "name": 'data', "default": renderer.demodata.stackedBar, "description": "the data", "valueType": "data" }
		   ];
	},
	
	linechart: function () {
	    return [ { "name": 'height', "default": 400, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'radius', "default": 2, "description": "the radius of the dots", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'space', "default": 50, "description": "the spacing between two data points", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "white", 'stroke': "blue", 'strokeWidth': 1 }, "description": "the format of the circles and lines", "valueType": "line" },
		     { "name": 'data', "default": renderer.demodata.linechart, "description": "the data", "valueType": "data" }
		   ];
	},
	
	areachart: function () {
	    return [ { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'space', "default": 70, "description": "the spacing between two data points", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "blue", 'stroke': "white" }, "description": "the format of the areas", "valueType": "area" },
		     { "name": 'data', "default": renderer.demodata.areachart, "description": "the data", "valueType": "data" }
		   ];
	},
	
	plot: function () {
	    return [ { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'radius', "default": 2, "description": "the radius of the data points", "valueType": "int" },
		     { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the bottom", "valueType": "int" },
		     { "name": 'format', "default": { fill: "white", stroke: "black", strokeWidth: 1 }, "description": "the format of the circles", "valueType": "area" },
		     { "name": 'data', "default": renderer.demodata.plot, "description": "the data", "valueType": "data" }
		   ];
	},
	
	donutchart: function () {
	    return [ { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'center', "default": 200, "description": "the radius of the full circle", "valueType": "int" },
		     { "name": 'width', "default": 50, "description": "the width of each rim", "valueType": "int" },
		     { "name": 'startAngle', "default": 0, "description": "the degree position to start the first slice", "valueType": "int" },
		     { "name": 'data', "default": renderer.demodata.donutchart, "description": "the data", "valueType": "data" }
		   ];
	},

	boxplot: function () {
	    return [ { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'shift', "default": 70, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'space', "default": 20, "description": "the spacing between two boxes", "valueType": "int" },
		     { "name": 'width', "default": 30, "description": "the width of each box", "valueType": "int" },
		     { "name": 'radius', "default": 2, "description": "the radius of the outliers", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "white", 'stroke': "black" }, "description": "the format of the boxes", "valueType": "area" },
		     { "name": 'data', "default": renderer.demodata.boxplot, "description": "the data", "valueType": "data" } ];
	},

	dendogram: function () {
	    return [ { "name": 'direction', "default": "ltr", "description": "the orientation of the dendogram", "valueType": "select", "options": [ "ltr", "rtl", "ttb", "btt" ] },
		     { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'height', "default": 30, "description": "the height of the dendrogram", "valueType": "int" },
		     { "name": 'width', "default": 10, "description": "the width of the leafs", "valueType": "int" },
		     { "name": 'format', "default": { 'stroke': "black", "stroke-width": 1 }, "description": "the format of the lines", "valueType": "line" },
		     { "name": 'data', "default": renderer.demodata.dendogram, "description": "the data", "valueType": "data" } ];


	    var direction = params.direction || "ltr";
	    var data = params.data || { "depth": 1 };
	    
	},
	
	demodata: {
	    'labels': [ "Label A", "Label B", "Label C", "Label D", "Label E", "Label F" ],
	    "boxplot": [ { "uq": 300, "lq": 150, "median": 225, "min": 100, "max": 325, "outliers": [ 370, 390, 75, 50 ] },
			 { "uq": 300, "lq": 150, "median": 225, "min": 100, "max": 325, "outliers": [ 370, 390, 75, 50 ] },
			 { "uq": 300, "lq": 150, "median": 225, "min": 100, "max": 325, "outliers": [ 370, 390, 75, 50 ] },
			 { "uq": 300, "lq": 150, "median": 225, "min": 100, "max": 325, "outliers": [ 370, 390, 75, 50 ] },
			 { "uq": 300, "lq": 150, "median": 225, "min": 100, "max": 325, "outliers": [ 370, 390, 75, 50 ] }
		       ],
	    "dendogram": [ [ { a: 1 }, { a: 1, b: 1 }, { a: 1 } ],
			   [ { a: 1, b: 2 }, { a: 1 } ],
			   [ { a: 3, b: 1 } ]
			 ],
	    "linechart": [ { "y": 0 },
			   { "y": 100 },
			   { "y": 50 },
			   { "y": 75 },
			   { "y": 250 },
			   { "y": 210 },
			   { "y": 99 },
			   { "y": 20 },
			   { "y": 275 } ],
	    "plot": [ { "x": 20, "y": 20 },
		      { "x": 30, "y": 200 },
		      { "x": 140, "y": 130 },
		      { "x": 50, "y": 310 },
		      { "x": 160, "y": 160 },
		      { "x": 70, "y": 99 },
		      { "x": 200, "y": 105 },
		      { "x": 390, "y": 240 },
		      { "x": 270, "y": 20, "radius": 3, "format": { "fill": "blue" } }
		    ],
	    "donutchart": [
		[ { "angle": 30, "format": { "fill": "blue" } },
		  { "angle": 40, "format": { "fill": "red" } },
		  { "angle": 50, "format": { "fill": "green" } },
		  { "angle": 60, "format": { "fill": "orange" } },
		  { "angle": 70, "format": { "fill": "purple" } },
		  { "angle": 110, "format": { "fill": "magenta" } }
		]
			  ],
	    "areachart": [ { "values": [ 40, 70, 30, 60, 50, 60, 70 ], "format": { 'fill': "blue" } },
			   { "values": [ 50, 40, 60, 50, 50, 60, 70 ], "format": { 'fill': "red" } },
			   { "values": [ 60, 50, 40, 30, 50, 60, 70 ], "format": { 'fill': "green" } },
			   { "values": [ 70, 60, 50, 70, 50, 60, 70 ], "format": { 'fill': "orange" } }
			 ],
	    "stackedBar": [
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 90, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 80, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 70, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 60, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 50, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 40, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 90, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 80, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 70, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 60, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 50, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 40, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 90, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 80, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 70, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 60, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 50, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 40, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 90, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 80, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 70, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 60, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 50, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 40, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 90, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 80, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 70, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 60, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 50, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 40, "title": "Label F", "format": { "fill": "#0099c6" }} ],
		[ { "height": 40, "title": "Label A", "format": { "fill": "#3366cc" }},
		  { "height": 50, "title": "Label B", "format": { "fill": "#dc3912" }},
		  { "height": 60, "title": "Label C", "format": { "fill": "#ff9900" }},
		  { "height": 70, "title": "Label D", "format": { "fill": "#109618" }},
		  { "height": 80, "title": "Label E", "format": { "fill": "#990099" }},
		  { "height": 90, "title": "Label F", "format": { "fill": "#0099c6" }} ]
	    ] }	
    });
}).call(this);

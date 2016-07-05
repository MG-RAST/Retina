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
		'data': null
	    }
	},
	exampleData: function () {
	    return [];
        },
	
	render: function (refresh) {
	    var renderer = this;

	    // get the target div
	    var target = renderer.settings.target;
	    var index = renderer.index;
	    target.innerHTML = "<div id='SVGdiv"+index+"'></div>";
	    target.firstChild.setAttribute('style', "width: "+ renderer.settings.width+"px; height: "+renderer.settings.height+"px;");
	    renderer.svg = jQuery('#SVGdiv'+index).svg().svg('get');

	    // set data to default
	    if (! renderer.settings.data || refresh) {
		renderer.settings.data = jQuery.extend({}, renderer.inputs.matrix);
	    }
	    
	    renderer.settings.data = renderer.prepareData(renderer.settings.data);

	    for (var i=0; i<renderer.settings.items.length; i++) {
		var type = renderer.settings.items[i].type;
		
		var params = renderer.settings.items[i].parameters;
		if (renderer.settings.items[i].hasOwnProperty('data')) {
		    jQuery.extend(params, renderer[renderer.settings.items[i].data].call(null, params, renderer.settings.data));
		}

		renderer.svg[type](jQuery.extend({}, renderer[type], params));
	    }
	    
	    return renderer;
	},

	/* 
	   input data conversion methods
	 */
	matrix2valueaxis: function (params, data) {
	    var retval = { "min": data.min, "max": data.max, "spaceMajor": 0 };

	    var scale = Retina.niceScale({ "min": data.min, "max": data.max });
	    
	    retval.spaceMajor = params.length / scale.max * scale.space;
	    
	    return retval;
	},

	matrix2stackedvalueaxis: function (params, data) {
	    var retval = { "min": data.min, "max": data.sumMax, "spaceMajor": 0 };

	    var scale = Retina.niceScale({ "min": data.min, "max": data.sumMax });

	    retval.spaceMajor = params.length / scale.max * scale.space;

	    return retval;
	},

	matrix2collabelaxis: function (params, data) {
	    var retval = { "labels": data.cols, "spaceMajor": 0 };

	    retval.spaceMajor = params.spaceMajor ? params.spaceMajor : Math.floor(params.length / data.cols.length);
	    
	    return retval;
	},

	matrix2rowlabelaxis: function (params, data) {
	    var retval = { "labels": data.rows, "spaceMajor": 0 };
	    
	    retval.spaceMajor = params.spaceMajor ? params.spaceMajor : Math.floor(params.length / data.rows.length);
	    
	    return retval;
	},

	matrix2heatmaprowaxis: function (params, data) {
	    var retval = { "spaceMajor": 0 };

	    var labels = [];
	    var ind = Retina.cluster(Retina.normalizeMatrix(Retina.transposeMatrix(data.data)))[1];
	    for (var i=0; i<data.rows.length; i++) {
		labels.push(data.rows[ind[i] - 1]);
	    }

	    retval.labels = labels;
	    retval.spaceMajor = params.spaceMajor ? params.spaceMajor : Math.floor(params.length / data.rows.length);
	    
	    return retval;
	},

	matrix2heatmapcolaxis: function (params, data) {
	    var retval = { "spaceMajor": 0 };
	    
	    var labels = [];
	    var ind = Retina.cluster(Retina.normalizeMatrix(data.data))[1];
	    console.log(ind);
	    for (var i=0; i<data.cols.length; i++) {
		labels.push(data.cols[ind[i] - 1]);
	    }

	    retval.labels = labels;
	    retval.spaceMajor = params.spaceMajor ? params.spaceMajor : Math.floor(params.length / data.rows.length);
	    
	    return retval;
	},

	matrix2rowlegend: function (params, data) {
	    var retval = { "data": data.rows };

	    return retval;
	},

	matrix2columnlegend: function (params, data) {
	    var retval = { "data": data.cols };

	    return retval;
	},

	matrix2barsrow: function (params, data) {
	    var retval = { "data": [] };

	    var factor = params.height / data.sumMax;
	    
	    for (var i=0; i<data.data[0].length; i++) {
		retval.data.push([]);
		retval.data[i].push({ "height": data.data[0][i] * factor, "format": { "fill": data.colors[0], "title": data.rows[i] +" - " + data.data[0][i] } });
	    }

	    return retval;
	},

	matrix2barscolumn: function (params, data) {
	    var retval = { "data": [] };

	    var factor = params.height / data.sumMax;
	    
	    for (var i=0; i<data.data.length; i++) {
		retval.data.push([]);
		retval.data[i].push({ "height": data.data[i][0] * factor, "format": { "fill": data.colors[0], "title": data.cols[i] +" - " + data.data[i][0] } });
	    }

	    return retval;
	},

	matrix2stackedbars: function (params, data) {
	    var retval = { "data": [] };

	    var factor = params.height / data.sumMax;
	    
	    for (var i=0; i<data.data.length; i++) {
		retval.data.push([]);
		for (var h=0; h<data.data[i].length; h++) {
		    retval.data[i].push({ "height": data.data[i][h] * factor, "format": { "fill": data.colors[h], "title": data.cols[i] +" - " + data.rows[h] +" - " + data.data[i][h] } });
		}
	    }

	    return retval;
	},

	matrix2donut: function (params, data) {
	    var retval = { "data": [] };

	    for (var i=0; i<data.cols.length; i++) {
		retval.data[i] = [];
		for (var h=0; h<data.data[i].length; h++) {
		    retval.data[i].push({ "angle": 360 / data.totals[i] * data.data[i][h], "format": { "fill": data.colors[h], "title": data.cols[i] +" - " + data.rows[h] +" - " + data.data[i][h].formatString(0) + " ("+(data.data[i][h] / data.totals[i] * 100).formatString(2)+"%)", "stroke": "white" } });
		}
	    }
	    
	    return retval;
	},

	matrix2pie: function (params, data) {
	    var retval = { "data": [ [ ] ] };

	    for (var h=0; h<data.data[0].length; h++) {
		retval.data[0].push({ "angle": 360 / data.totals[0] * data.data[0][h], "format": { "fill": data.colors[h], "title": data.cols[0] +" - " + data.rows[h] +" - " + data.data[0][h].formatString(0) + " ("+(data.data[0][h] / data.totals[0] * 100).formatString(2)+"%)", "stroke": "white" } });
	    }
	    
	    return retval;
	},

	matrix2area: function (params, data) {
	    var retval = { "data": [] };

	    var factor = params.height / data.sumMax;

	    for (var i=0; i<data.dataTransposed.length; i++) {
		retval.data.push({ "values": [], "format": { "fill": data.colors[i] } });
	    }
	    for (var i=0; i<data.dataTransposed.length; i++) {
		for (var h=0; h<data.dataTransposed[i].length; h++) {
		    retval.data[i].values.push(data.dataTransposed[i][h] * factor);
		}
	    }
	    
	    return retval;
	},

	matrix2rowdendogram: function (params, data) {
	    var retval = {};

	    retval["data"] = Retina.cluster(Retina.scaleMatrix(Retina.normalizeMatrix(Retina.transposeMatrix(data.data))))[0];
	    
	    return retval;
	},

	matrix2columndendogram: function (params, data) {
	    var retval = {};

	    retval["data"] = Retina.cluster(Retina.scaleMatrix(Retina.normalizeMatrix(data.data)))[0];
	    
	    return retval;
	},

	matrix2heatmap: function (params, data) {
	    var retval = { "data": { "cells": [], "rowindex": [], "colindex": [] } };

	    var norm = Retina.scaleMatrix(Retina.normalizeMatrix(data.data));
	    retval.data.colindex = Retina.cluster(norm)[1];
	    retval.data.rowindex = Retina.cluster(Retina.transposeMatrix(norm))[1];
	    retval.data.cells = Retina.transposeMatrix(norm);
	    
	    return retval;
	},

	/*
	  data preparation for input data conversion
	 */
	prepareData: function (data) {
	    
	    // check if we have data
	    if (! data) {
		return;
	    }
	    
	    // check if we have already done this
	    if (data.hasOwnProperty('max')) {
		return data;
	    }
	    
	    /// transpose the matrix
	    var d = Retina.transposeMatrix(data.data);
	    
	    // get the overall max, sumMax and totals of the matrix
	    var maxes = [];
	    var mins = [];
	    var sumMaxes = [];
	    for (var i=0; i<d.length; i++) {
		maxes.push(Math.max.apply(null, d[i]));
		mins.push(Math.min.apply(null, data[i]));
		sumMaxes[i] = 0;
		for (var h=0; h<d[i].length; h++) {
		    sumMaxes[i] += d[i][h];
		}
	    }
	    var max = Math.max.apply(null, maxes);
	    var sumMax = Math.max.apply(null, sumMaxes);
	    var min = Math.min.apply(null, mins);
	    if (min > 0) {
		min = 0;
	    }

	    // get a nice scale
	    var scale = Retina.niceScale({ "min": min, "max": max });
	    var sumScale = Retina.niceScale({ "min": min, "max": sumMax });

	    // assign the newly calculated data
	    data.min = scale.min;
	    data.max = scale.max;
	    data.sumMax = sumScale.max;
	    data.totals = sumMaxes;
	    data.colors = GooglePalette();
	    data.dataTransposed = data.data;
	    data.data = d;
	    
	    return data;
	},

	/*
	  graphic items attribute functions
	 */
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
		     { "name": 'tickShift', "default": 0, "description": "the number of pixels the ticks start to the right of the origin", "valueType": "int" },
		     { "name": 'tickBase', "default": 0, "description": "the number of pixels the ticks overlap the axis to the inside of the graph", "valueType": "int" },
		     { "name": 'majorTickLength', "default": 10, "description": "the length of the major ticks", "valueType": "int" },
		     { "name": 'minorTickLength', "default": 5, "description": "the length of the minor ticks", "valueType": "int" },
		     { "name": 'lineFormat', "default": { 'stroke': 'black', 'strokeWidth': 1 }, "description": "the attributes (color, width) of the base line of the axis", "valueType": "line" },
		     { "name": 'labelFormat', "default": { 'fontFamily': "Helvetica", 'fontWeight': 100, 'fontSize': 12 }, "description": "the font attributes of the axis labels", "valueType": "font" },
		     { "name": 'showLabels', "default": true, "description": "turns display of labels on and off", "valueType": "boolean" },
		     { "name": 'labelOrigin', "default": true, "description": "turns display of the label at the origin point on or off", "valueType": "boolean" },
		     { "name": 'isLog', "default": false, "description": "shows log or linear values as the axis labels", "valueType": "boolean" },
		     { "name": 'noLine', "default": false, "description": "hides the lines", "valueType": "boolean" },
		     { "name": 'data', "default": "matrix2valueaxis", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "value axis", "value": "matrix2valueaxis" }, { "name": "column label axis", "value": "matrix2collabelaxis" }, { "name": "row label axis", "value": "matrix2rowlabelaxis" }, { "name": "heatmap column label axis", "value": "matrix2heatmapcolaxis" }, { "name": "heatmap row label axis", "value": "matrix2heatmaprowaxis" }, { "name": "stacked value axis", "value": "matrix2stackedvalueaxis" } ] }
		   ];
	},
	
	legend: function () {
	    return [ { "name": 'top', "default": 150, "description": "the top position of the legend", "valueType": "int" },
		     { "name": 'left', "default": 500, "description": "the left position of the legend", "valueType": "int" },
		     { "name": 'colors', "default": GooglePalette(), "description": "the list of colors of the legend", "valueType": "list" },
		     { "name": 'format', "default": { "fontSize": 12, "fontFamily": "arial", "fontWeight": "normal" }, "description": "the font format of the legend labels", "valueType": "font" },
		     { "name": 'data', "default": "matrix2rowlegend", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "column legend", "value": "matrix2columnlegend" }, { "name": "row legend", "value": "matrix2rowlegend" } ] }
		   ];
	},
	
	grid: function () {
	    return [ { "name": 'direction', "default": 'vertical', "description": "the orientation of the lines of the grid", "valueType": "select", "options": [ "vertical", "horizontal" ] },
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
	    return [ { "name": 'direction', "default": 'ltr', "description": "the orientation of the bars", "valueType": "select", "options": [ "ltr", "rtl", "ttb", "btt" ] },
		     { "name": 'height', "default": 500, "description": "the height of the dendogram", "valueType": "int" },
		     { "name": 'width', "default": 25, "description": "the width of each cell", "valueType": "int" },
		     { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 20, "description": "the offset from top", "valueType": "int" },
		     { "name": 'format', "default": { 'stroke': "black" }, "description": "the line format", "valueType": "line" },
		     { "name": 'data', "default": "matrix2rowdendogram", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "row dendogram", "value": "matrix2rowdendogram" }, { "name": "column dendogram", "value": "matrix2columndendogram" } ] }
		   ];
	},
	
	barchart: function () {
	    return [ { "name": 'direction', "default": 'vertical', "description": "the orientation of the bars", "valueType": "select", "options": [ "vertical", "horizontal" ] },
		     { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'width', "default": 25, "description": "the width of each bar", "valueType": "int" },
		     { "name": 'shift', "default": 60, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'space', "default": 10, "description": "the spacing between two bars", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "white", 'stroke': "black", 'strokeWidth': 1 }, "description": "the line format", "valueType": "line" },
		     { "name": 'data', "default": "matrix2stackedbars", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "column barchart", "value": "matrix2barscolumn" }, { "name": "row barchart", "value": "matrix2barsrow" }, { "name": "stacked barchart", "value": "matrix2stackedbars" } ] }
		   ];
	},
	
	linechart: function () {
	    return [ { "name": 'height', "default": 400, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'radius', "default": 2, "description": "the radius of the dots", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'space', "default": 50, "description": "the spacing between two data points", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "white", 'stroke': "blue", 'strokeWidth': 1 }, "description": "the format of the circles and lines", "valueType": "line" },
		     { "name": 'data', "default": "matrix2lines", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "linechart", "value": "matrix2lines" } ] }
		   ];
	},
	
	areachart: function () {
	    return [ { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'space', "default": 70, "description": "the spacing between two data points", "valueType": "int" },
		     { "name": 'shift', "default": 50, "description": "the offset from the left for horizontal, the offset from the top for vertical charts", "valueType": "int" },
		     { "name": 'base', "default": 50, "description": "the offset from the bottom for horizontal, the offset from the left for vertical charts", "valueType": "int" },
		     { "name": 'format', "default": { 'fill': "blue", 'stroke': "white" }, "description": "the format of the areas", "valueType": "area" },
		     { "name": 'data', "default": "matrix2area", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "areachart", "value": "matrix2area" } ] }
		   ];
	},
	
	plot: function () {
	    return [ { "name": 'height', "default": 500, "description": "the height of the graph", "valueType": "int" },
		     { "name": 'radius', "default": 2, "description": "the radius of the data points", "valueType": "int" },
		     { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the bottom", "valueType": "int" },
		     { "name": 'format', "default": { fill: "white", stroke: "black", strokeWidth: 1 }, "description": "the format of the circles", "valueType": "area" },
		     { "name": 'data', "default": "matrix2plot", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "plot", "value": "matrix2plot" } ] }
		   ];
	},
	
	donutchart: function () {
	    return [ { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'center', "default": 200, "description": "the radius of the full circle", "valueType": "int" },
		     { "name": 'width', "default": 50, "description": "the width of each rim", "valueType": "int" },
		     { "name": 'startAngle', "default": 0, "description": "the degree position to start the first slice", "valueType": "int" },
		     { "name": 'data', "default": "matrix2donut", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "donutchart", "value": "matrix2donut" }, { "name": "piechart", "value": "matrix2pie" } ] }
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
		     { "name": 'data', "default": "matrix2boxplot", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "boxplot", "value": "matrix2boxplot" } ] }
		   ];
	},

	dendogram: function () {
	    return [ { "name": 'direction', "default": "ltr", "description": "the orientation of the dendogram", "valueType": "select", "options": [ "ltr", "rtl", "ttb", "btt" ] },
		     { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'height', "default": 30, "description": "the height of the dendrogram", "valueType": "int" },
		     { "name": 'width', "default": 10, "description": "the width of the leafs", "valueType": "int" },
		     { "name": 'format', "default": { 'stroke': "black", "stroke-width": 1 }, "description": "the format of the lines", "valueType": "line" },
		     { "name": 'data', "default": "matrix2dendogram", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "row dendogram", "value": "matrix2rowdendogram" }, { "name": "column dendogram", "value": "matrix2columndendogram" } ] }
		   ];	    
	},

	heatmap: function () {
	    return [ { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'boxheight', "default": 20, "description": "the height of the dendrogram", "valueType": "int" },
		     { "name": 'boxwidth', "default": 20, "description": "the width of the leafs", "valueType": "int" },
		     { "name": 'format', "default": { 'stroke': "black", "stroke-width": 1 }, "description": "the format of the lines", "valueType": "line" },
		     { "name": 'colorscale', "default": "green2red", "description": "color scale", "valueType": "select", "options": [ "green2red", "blue2yellow" ] },
		     { "name": 'data', "default": "matrix2heatmap", "description": "the data function for this item", "valueType": "data", "options": [ { "name": "heatmap", "value": "matrix2heatmap" }] }
		   ];	    
	},

	colorscale: function () {
	    return [ { "name": 'shiftX', "default": 50, "description": "the offset from the left", "valueType": "int" },
		     { "name": 'shiftY', "default": 50, "description": "the offset from the top", "valueType": "int" },
		     { "name": 'boxheight', "default": 20, "description": "the height of the dendrogram", "valueType": "int" },
		     { "name": 'boxwidth', "default": 25, "description": "the width of the leafs", "valueType": "int" },
		     { "name": 'format', "default": { 'stroke': "gray", "fontSize": 10, "fontFamily": "arial", "fontWeight": "normal" }, "description": "the format of the lines and text", "valueType": "line" },
		     { "name": 'colorscale', "default": "green2red", "description": "color scale", "valueType": "select", "options": [ "green2red", "blue2yellow" ] }
		   ];	    
	},

	/*
	  input test data
	 */
	inputs: {
	    "matrix": {"data":[[753,532],[47929,39321],[6450,4219],[730,902]],"rows":["Archaea","Bacteria","Eukaryota","Viruses"],"cols":["Metagenome A","Metagenome B"]}
	}

    });
}).call(this);

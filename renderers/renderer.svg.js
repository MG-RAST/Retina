/*
  SVG Renderer

  Displays an SVG graphic.

  Options

  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "svg",
	    title: "SVG",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg-new.js", "rgbcolor.js" ],
            defaults: {
		'width': 500,
		'height': 500,
		'showLegend': true,
		'legendWidth': 150,
		'graphWidth': 340,
		'graphTopMargin': 50,
		'graphLineColor': "white",
		'legendPosition': "right",
		'legendLabels': [],
		'barWidth': 20,
		'barSpace': 5,
		'valueAxisWidth': 50,
		'labelAxisWidth': 50,
		'showPercent': true,
		'sorted': false,
		'showValuesOnHover': true,
		'showValuesOnLabel': false,
		'showTitles': true,
		'showTitlesValueOnly': false,
		'callback': null,
		'sortLargeToSmall': true,
		'graphDirection': "horizontal",
		'data': [],
		'legendFormat': { fontSize: 15 }
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
	    
	    return renderer;
	},
	pieChart: function(params) {
	    var renderer = this;
	    
	    renderer.checkSettings(params);

	    var center = renderer.settings.showLegend ? renderer.settings.graphWidth / 2 : renderer.settings.width / 2;
	    var data = [];
	    var total = 0;
	    var labels = [];
	    var d = renderer.settings.data;
	    for (var i=0; i<d.length; i++) {
		total += d[i].value;
		var l = d[i].label;
		if (renderer.settings.showValuesOnLabel) {
		    l += " - " + d[i].value;
		}
		labels.push(l);
	    }
	    if (renderer.settings.showPercent && renderer.settings.showValuesOnLabel) {
		for (var i=0; i<labels.length; i++) {
		    labels[i] = d[i].label + " - " + (100 / total * d[i].value).formatString(2) + "%";
		}
	    }
	    renderer.settings.legendLabels = labels;
	    for (var i=0; i<d.length; i++) {
		var val = 360 / total * d[i].value;
		var displayVal = renderer.settings.showPercent ? (100 / total * d[i].value).formatString(2) + "%" : d[i].value.formatString();
		var title = "";
		if (renderer.settings.showTitles) {
		    if (renderer.settings.showTitlesValueOnly) {
			title = val;
		    } else {
			title = d[i].label + ": " + displayVal;
		    }
		}
		data.push({ label: d[i].label, value: displayVal, angle: val, format: { stroke: renderer.settings.graphLineColor, fill: renderer.settings.colors[i], value: d[i].value, title: title } });
	    }
	    
	    renderer.graphic = renderer.svg.donutchart({ center: center, shiftX: renderer.settings.shiftX+10, rims: [ data ] });
	    renderer.checkLegend();
	    renderer.checkEvents();
	},
	donutChart: function(params) {
	    var renderer = this;
	    
	    renderer.checkSettings(params);

	    var center = renderer.settings.showLegend ? renderer.settings.graphWidth / 2 : renderer.settings.width / 2;
	    var data = [];
	    var totals = [];
	    var labels = [];
	    var d = renderer.settings.data;
	    var count = 0;
	    for (var i=0; i<d.length; i++) {
		totals[i] = 0;
		for (var h=0; h<d[i].data.length; h++) {
		    totals[i] += d[i].data[h].value;
		    count++;
		}
	    }
	    renderer.settings.colors = GooglePalette(count);
	    var c = 0;
	    for (var i=0; i<d.length; i++) {
		var rim = []
		for (var h=0; h<d[i].data.length; h++) {
		    var val = 360 / totals[i] * d[i].data[h].value;
		    var displayVal = renderer.settings.showPercent ? (100 / totals[i] * d[i].data[h].value).formatString(2) + "%" : d[i].data[h].value.formatString();
		    var title = "";
		    if (renderer.settings.showTitles) {
			if (renderer.settings.showTitlesValueOnly) {
			    title = val;
			} else {
			    title = d[i].data[h].label + ": " + displayVal;
			}
		    }
		    rim.push({ label: d[i].data[h].label, value: displayVal, angle: val, format: { stroke: renderer.settings.graphLineColor, fill: renderer.settings.colors[c], value: d[i].data[h].value, title: title } });
		    c++;
		}
		data.push(rim);
	    }
	    data = data.reverse();
	    
	    renderer.graphic = renderer.svg.donutchart({ center: center, shiftX: renderer.settings.shiftX + 10, rims: data });
	    renderer.checkEvents();
	},
	barChart: function(params) {
	    var renderer = this;

	    renderer.checkSettings(params);

	    var d = renderer.settings.data;
	    var data = [];
	    var max = 0;
	    for (var i=0; i<d.length; i++) {
		if (renderer.settings.logScale) {
		     if (Retina.log10(d[i].value) > max) {
		    	max = Retina.log10(d[i].value);
		    }
		} else {
		    if (d[i].value > max) {
			max = d[i].value;
		    }
		}
	    }
	    var scale = Retina.niceScale({ min: 0, max: max, ticks: renderer.settings.logScale ? Math.ceil(max) : 10 });
	    var shift = renderer.settings.valueAxisWidth;
	    var base = renderer.settings.labelAxisWidth;
	    var height = renderer.settings.height - renderer.settings.labelAxisWidth - renderer.settings.graphTopMargin;
	    var width = renderer.settings.graphWidth;
	    var factor = height / max;
	    var labels = [];
	    for (var i=0; i<d.length; i++) {
		var title = "";
		if (renderer.settings.showTitles) {
		    if (renderer.settings.showTitlesValueOnly) {
			title = d[i].value;
		    } else {
			title = d[i].label + ": " + d[i].value;
		    }
		}
		var val = d[i].value;
		if (renderer.settings.logScale) {
		    val = Retina.log10(d[i].value);
		}
		data.push({ height: val * factor, format: { fill: renderer.settings.hasOwnProperty('color') ? renderer.settings.color : renderer.settings.colors[i], value: d[i].value, title: title } });
		var l = d[i].label;
		if (renderer.settings.showValuesOnLabel) {
		    l += " - " + d[i].value;
		}
		labels.push(l);
	    }
	    if (renderer.settings.labelAxisTitle) {
		renderer.svg.text(shift + ((width - shift) / 2), renderer.settings.height - 15, renderer.settings.labelAxisTitle.text, jQuery.extend({ "text-anchor": "middle" }, renderer.settings.labelAxisTitle.settings || {}));
	    }
	    if (renderer.settings.valueAxisTitle) {
		renderer.svg.text(0, (renderer.settings.height - renderer.settings.labelAxisWidth) / 2, renderer.settings.valueAxisTitle.text, jQuery.extend({"text-anchor": "middle", "transform": "rotate(-90, 15, "+((renderer.settings.height - renderer.settings.labelAxisWidth) / 2)+")"}, renderer.settings.valueAxisTitle.settings || {}));
	    }
	    renderer.settings.barWidth = (width - ((data.length + 1) * (renderer.settings.barSpace || 2))) / data.length;
	    renderer.settings.legendLabels = labels;
	    renderer.graphic = renderer.svg.barchart({ width: renderer.settings.barWidth, bars: data, shift: shift + renderer.settings.barSpace, space: renderer.settings.barSpace, base: base });
	    renderer.svg.axis({ shift: base, base: shift, length: height, min: 0, max: scale.max, spaceMajor: renderer.settings.logScale ? height / Math.ceil(max) : null, direction: "vertical", isLog: true });
	    renderer.svg.axis({ shift: shift, base: base, length: width, spaceMajor: renderer.settings.barWidth + renderer.settings.barSpace, labels: labels, direction: "horizontal", numMinor: 0, space: renderer.settings.barSpace, labelRotation: renderer.settings.labelRotation || 30, tickShift: renderer.settings.barWidth / 2 + renderer.settings.barSpace });
	    
	    renderer.checkLegend();
	    renderer.checkEvents();
	},
	stackedBarChart: function(params) {
	    var renderer = this;

	    renderer.checkSettings(params);

	    var d = renderer.settings.data;

	    var sums = [];
	    for (var i=0; i<d.length; i++) {
		for (var h=0; h<d[i].values.length; h++) {
		    if (i==0) {
			sums[h] = 0;
		    }
		    sums[h] += d[i].values[h];
		}
	    }
	    var max = 0;
	    for (var i=0; i<sums.length; i++) {
		if (sums[i] > max) {
		    max = sums[i];
		}
	    }

	    var scale = Retina.niceScale({ min: 0, max: max});
	    var shift = renderer.settings.valueAxisWidth;
	    var base = renderer.settings.labelAxisWidth;
	    var height = renderer.settings.height - shift - renderer.settings.graphTopMargin;
	    var width = renderer.settings.graphWidth;
	    var factor = height / max;
	    var labels = [];
	    var data = [];
	    var axisLabels = [];
	    
	    for (var i=0; i<d.length; i++) {
		labels.push(d[i].label);
		for (var h=0; h<d[i].values.length; h++) {
		    if (i==0) {
			data[h] = [];
		    }
		    var title = "";
		    if (renderer.settings.showTitles) {
			if (renderer.settings.showTitlesValueOnly) {
			    title = d[i].values[h].formatString();
			} else {
			    title = d[i].labels[h] + ": " + d[i].values[h].formatString();
			}
			if (i==0) {
			    axisLabels.push(d[i].hasOwnProperty('labels') ? d[i].labels[h] : "");
			}
		    }
		    data[h].push({ height: d[i].values[h] * factor, format: { fill: renderer.settings.colors[i], value: d[i].values[h], title: title } });
		}
	    }

	    if (renderer.settings.labelAxisTitle) {
		renderer.svg.text(shift + ((width - shift) / 2), renderer.settings.height - 15, renderer.settings.labelAxisTitle.text, jQuery.extend({ "text-anchor": "middle" }, renderer.settings.labelAxisTitle.settings || {}));
	    }
	    if (renderer.settings.valueAxisTitle) {
		renderer.svg.text(0, (renderer.settings.height - renderer.settings.labelAxisWidth) / 2, renderer.settings.valueAxisTitle.text, jQuery.extend({"text-anchor": "middle", "transform": "rotate(-90, 15, "+((renderer.settings.height - renderer.settings.labelAxisWidth) / 2)+")"}, renderer.settings.valueAxisTitle.settings || {}));
	    }
	    renderer.settings.legendLabels = labels;
	    var width = axisLabels.length * (renderer.settings.barWidth + renderer.settings.barSpace);
	    renderer.graphic = renderer.svg.barchart({ width: renderer.settings.barWidth, bars: data, shift: shift + renderer.settings.barSpace, space: renderer.settings.barSpace, base: base });
	    renderer.svg.axis({ shift: base, base: shift, length: height, min: 0, max: scale.max, direction: "vertical" });
	    renderer.svg.axis({ shift: shift, base: base, length: width, spaceMajor: renderer.settings.barWidth + renderer.settings.barSpace, labels: axisLabels, direction: "horizontal", numMinor: 0, space: renderer.settings.barSpace, labelRotation: 30, tickShift: renderer.settings.barWidth / 2 + renderer.settings.barSpace });
	    
	    renderer.checkLegend();
	    //renderer.checkEvents();
	},
	areaGraph: function(params) {
	    var renderer = this;

	    renderer.checkSettings(params);

	    var d = renderer.settings.data;
	    var sums = [];
	    for (var i=0; i<d.length; i++) {
		for (var h=0; h<d[i].values.length; h++) {
		    if (i==0) {
			sums[h] = 0;
		    }
		    sums[h] += d[i].values[h];
		}
 - 15	    }
	    var max = 0;
	    for (var i=0; i<sums.length; i++) {
		if (sums[i] > max) {
		    max = sums[i];
		}
	    }

	    var scale = Retina.niceScale({ min: 0, max: max});
	    var shift = renderer.settings.valueAxisWidth;
	    var base = renderer.settings.labelAxisWidth;
	    var height = renderer.settings.height - shift - renderer.settings.graphTopMargin;
	    var width = renderer.settings.graphWidth;
	    var factor = height / max;
	    var labels = [];
	    var data = [];
	    var colors = renderer.settings.colors || GooglePalette(renderer.settings.data.length);
	    for (var i=0; i<d.length; i++) {
		labels.push(d[i].label);
		data[i] = { values: [], format: { fill: colors[i], stroke: "white" } };
		for (var h=0; h<d[i].values.length; h++) {
		    data[i].values.push(d[i].values[h] * factor);
		}
	    }
	    if (renderer.settings.labelAxisTitle) {
		renderer.svg.text(shift + ((width - shift) / 2), renderer.settings.height - 15, renderer.settings.labelAxisTitle.text, jQuery.extend({ "text-anchor": "middle" }, renderer.settings.labelAxisTitle.settings || {}));
	    }
	    if (renderer.settings.valueAxisTitle) {
		renderer.svg.text(0, (renderer.settings.height - renderer.settings.labelAxisWidth) / 2, renderer.settings.valueAxisTitle.text, jQuery.extend({"text-anchor": "middle", "transform": "rotate(-90, 15, "+((renderer.settings.height - renderer.settings.labelAxisWidth) / 2)+")"}, renderer.settings.valueAxisTitle.settings || {}));
	    }
	    renderer.settings.legendLabels = labels;
	    var space = renderer.settings.graphWidth / data[0].values.length;
	    renderer.graphic = renderer.svg.areachart({ areas: data, shift: shift, space: space, base: base });
	    renderer.svg.axis({ shift: base, base: shift, length: height, min: 0, max: scale.max, direction: "vertical" });
	    renderer.svg.axis({ shift: shift, base: base, length: width, min: 0, max: data[0].values.length, direction: "horizontal" });
	    
	    renderer.checkLegend();
	    renderer.checkEvents();
	},
	lineChart: function(params) {
	    var renderer = this;

	    renderer.checkSettings(params);

	    var d = renderer.settings.data;
	    if (d.hasOwnProperty('values')) {
		d = [ d ];
	    }

	    var maxX = 0;
	    var maxY = 0;
	    var minX = renderer.settings.logScale ? Retina.log10(d[0].values[0].x) : d[0].values[0].x;
	    var minY = renderer.settings.logScale ? Retina.log10(d[0].values[0].y) : d[0].values[0].y;
	    for (var i=0; i<d.length; i++) {
		for (var h=0; h<d[i].values.length; h++) {
		    if (renderer.settings.logScaleX) {
			if (Retina.log10(d[i].values[h].x) > maxX) {
			    maxX = Retina.log10(d[i].values[h].x);
			}
			if (Retina.log10(d[i].values[h].x) < minX) {
			    minX = Retina.log10(d[i].values[h].x);
			}
		    } else {
			if (d[i].values[h].x > maxX) {
			    maxX = d[i].values[h].x;
			}
			if (d[i].values[h].x < minX) {
			    minX = d[i].values[h].x;
			}
		    }
		    if (renderer.settings.logScaleY) {
			if (Retina.log10(d[i].values[h].y) > maxY) {
			    maxY = Retina.log10(d[i].values[h].y);
			}
			if (Retina.log10(d[i].values[h].y) < minY) {
			    minY = Retina.log10(d[i].values[h].y);
			}
		    } else {
			if (d[i].values[h].y > maxY) {
			    maxY = d[i].values[h].y;
			}
			
			if (d[i].values[h].y < minY) {
			    minY = d[i].values[h].y;
			}
		    }
		}
	    }
	    if (renderer.settings.hasOwnProperty('maxY')) {
		maxY = renderer.settings.maxY;
	    }

	    var scaleX = Retina.niceScale({ min: renderer.settings.minValIsZeroX ? minX : 0, max: maxX});
	    var scaleY = Retina.niceScale({ min: renderer.settings.minValIsZeroY ? minY : 0, max: maxY});
	    var shift = renderer.settings.valueAxisWidth;
	    var base = renderer.settings.labelAxisWidth;
	    var height = renderer.settings.height - base - renderer.settings.graphTopMargin;
	    var width = renderer.settings.graphWidth;
	    var factorY = height / (maxY - (renderer.settings.minValIsZeroY ? minY : 0));
	    var factorX = width / (maxX - (renderer.settings.minValIsZeroX ? minX : 0));
	    var labels = [];
	    var colors = renderer.settings.color ? [ renderer.settings.color ] : renderer.settings.colors || GooglePalette(d.length);

	    for (var i=0; i<d.length; i++) {
		for (var h=0; h<d[i].values.length; h++) {
		    d[i].values[h].x = (renderer.settings.logScaleX ? Retina.log10(d[i].values[h].x) : d[i].values[h].x) * factorX - (renderer.settings.minValIsZeroX ? minX * factorX : 0);
		    d[i].values[h].y = (renderer.settings.logScaleY ? Retina.log10(d[i].values[h].y) : d[i].values[h].y) * factorY - (renderer.settings.minValIsZeroY ? minY * factorY : 0);
		}
	    }

	    renderer.graphic = renderer.svg.group();
	    for (var i=0; i<d.length; i++) {
		if (renderer.settings.showLegend) {
		    labels.push(d[i].label);
		}
		renderer.svg.linechart({ group: renderer.graphic, points: d[i].values, shift: shift, base: base, format: { stroke: d[i].color || renderer.settings.colors[i], strokeWidth: renderer.settings.strokeWidth || 1 } });
	    }
	    if (renderer.settings.labelAxisTitle) {
		renderer.svg.text(shift + ((width - shift) / 2), renderer.settings.height - 15, renderer.settings.labelAxisTitle.text, jQuery.extend({ "text-anchor": "middle" }, renderer.settings.labelAxisTitle.settings || {}));
	    }
	    if (renderer.settings.valueAxisTitle) {
		renderer.svg.text(0, (renderer.settings.height - renderer.settings.labelAxisWidth) / 2, renderer.settings.valueAxisTitle.text, jQuery.extend({"text-anchor": "middle", "transform": "rotate(-90, 15, "+((renderer.settings.height - renderer.settings.labelAxisWidth) / 2)+")"}, renderer.settings.valueAxisTitle.settings || {}));
	    }
	    renderer.settings.legendLabels = labels;
	    renderer.svg.axis({ shift: base, base: shift, length: height, min: renderer.settings.minValIsZeroY ? minY : 0, max: scaleY.max, direction: "vertical", spaceMajor: renderer.settings.logScaleY ? height / Math.ceil(maxY) : null, isLog: renderer.settings.logScaleY, labelRotation: renderer.settings.labelRotationY ? renderer.settings.labelRotationY : 0 });
	    renderer.svg.axis({ shift: shift, base: base, length: width, min: renderer.settings.minValIsZeroX ? minX : 0, max: scaleX.max, direction: "horizontal", spaceMajor: renderer.settings.logScaleX ? width / Math.ceil(maxX) : null, isLog: renderer.settings.logScaleX, labelRotation: renderer.settings.labelRotationX ? renderer.settings.labelRotationX : 0 });
	    renderer.svg.grid({ shift: shift, base: base, width: width, height: height, topMargin: renderer.settings.graphTopMargin, space: renderer.settings.logScaleY ? height / Math.ceil(maxY) : null });
	    renderer.svg.grid({ shift: shift, base: base, width: width, height: height, topMargin: renderer.settings.graphTopMargin, direction: "vertical", space: renderer.settings.logScaleX ? width / Math.ceil(maxX) : null });

	    renderer.checkEvents();
	    renderer.checkLegend();
	},
	checkSettings: function(params) {
	    var renderer = this;

	    jQuery.extend(renderer.settings, params);

	    if (renderer.settings.showLegend) {
		if (renderer.settings.graphWidth + renderer.settings.legendWidth > renderer.settings.width) {
		    var f = renderer.settings.width / (renderer.settings.graphWidth + renderer.settings.legendWidth + 10);
		    renderer.settings.graphWidth = renderer.settings.graphWidth * f;
		    renderer.settings.legendWidth = renderer.settings.legendWidth * f;
		}
	    } else {
		if (renderer.settings.graphWidth > renderer.settings.width) {
		    renderer.settings.graphWidth = renderer.settings.width;
		}
	    }

	    renderer.settings.colors = renderer.settings.colors || GooglePalette(renderer.settings.data.length);

	    if (renderer.settings.sorted && renderer.settings.data[0].hasOwnProperty('value')) {
		renderer.settings.data = renderer.settings.data.sort(Retina.propSort('value', renderer.settings.sortLargeToSmall));
	    }

	    renderer.settings.shiftX = renderer.settings.showLegend ? (renderer.settings.legendPosition == "left" ? renderer.settings.legendWidth : 0) : 0;
	},
	checkLegend: function() {
	    var renderer = this;
	    if (renderer.settings.showLegend) {
		renderer.legend = renderer.svg.legend({ top: renderer.settings.graphTopMargin, left: renderer.settings.legendPosition == "left" ? 0 : renderer.settings.width - renderer.settings.legendWidth, labels: renderer.settings.legendLabels, colors: renderer.settings.colors, format: renderer.settings.legendFormat || {} });
	    }
	},
	checkEvents: function() {
	    var renderer = this;
	    
	    if (renderer.settings.showValuesOnHover) {
		// connect legend and graphic
		if (renderer.legend) {
		    for (var i=0; i<renderer.graphic.childNodes.length; i++) {
			renderer.legend.childNodes[i*2+1].style.cursor = "default";
			var context = { renderer: renderer,
					graphic: renderer.graphic.childNodes[i],
					legend: renderer.legend.childNodes[i*2+1],
					value: renderer.graphic.childNodes[i].getAttribute('value') };
			renderer.legend.childNodes[i*2+1].addEventListener('mouseover', renderer.hover.bind(context), false);
			renderer.legend.childNodes[i*2+1].addEventListener('mouseout', renderer.hover.bind(context), false);
		    }
		}
		// attach graphic event listeners
		for (var i=0; i<renderer.graphic.childNodes.length; i++) {
		    var context = { renderer: renderer,
				    graphic: renderer.graphic.childNodes[i],
				    value: renderer.graphic.childNodes[i].getAttribute('value'),
				    legend: renderer.legend ? renderer.legend.childNodes[i*2+1] : null };
		    renderer.graphic.childNodes[i].addEventListener('mouseover', renderer.hover.bind(context), false);
		    renderer.graphic.childNodes[i].addEventListener('mouseout', renderer.hover.bind(context), false);

		    // attack onclick event if desired
		    if (typeof renderer.settings.callback == "function") {
			renderer.graphic.childNodes[i].addEventListener('click', renderer.settings.callback.bind(context), false);
		    }
		}
	    }
	},
	hover: function(event) {
	    var renderer = this.renderer;

	    event = event || window.event;	    
	    
	    var graphic = this.graphic;
	    var legend = this.legend;
	    var value = this.value;

	    if (event.type == "mouseover") {
		graphic.style.opacity = 0.6;
		if (legend) {
		    legend.style.fontWeight = "bold";
		}
	    } else {
		graphic.style.opacity = 1;
		if (legend) {
		    legend.style.fontWeight = "normal";
		}
	    }
	}
    });
}).call(this);

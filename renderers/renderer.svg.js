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
	piechart: function(params) {
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
	    
	    renderer.graphic = renderer.svg.donutchart({ center: center, shiftX: renderer.settings.shiftX, rims: [ data ] });
	    renderer.checkLegend();
	    renderer.checkEvents();
	},
	barchart: function(params) {
	    var renderer = this;

	    renderer.checkSettings(params);

	    var d = renderer.settings.data;
	    var data = [];
	    var max = 0;
	    for (var i=0; i<d.length; i++) {
		if (d[i].value > max) {
		    max = d[i].value;
		}
	    }
	    var scale = Retina.niceScale({ min: 0, max: max});
	    var shift = renderer.settings.valueAxisWidth;
	    var base = renderer.settings.labelAxisWidth;
	    var height = renderer.settings.height - shift - renderer.settings.graphTopMargin;
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
		data.push({ height: d[i].value * factor, format: { fill: renderer.settings.colors[i], value: d[i].value, title: title } });
		var l = d[i].label;
		if (renderer.settings.showValuesOnLabel) {
		    l += " - " + d[i].value;
		}
		labels.push(l);
	    }
	    renderer.settings.legendLabels = labels;
	    var width = labels.length * (renderer.settings.barWidth + renderer.settings.barSpace);
	    renderer.graphic = renderer.svg.barchart({ width: renderer.settings.barWidth, bars: data, shift: shift + renderer.settings.barSpace, space: renderer.settings.barSpace, base: base });
	    renderer.svg.axis({ shift: shift, base: base, length: height, min: 0, max: scale.max, direction: "vertical" });
	    renderer.svg.axis({ shift: shift, base: base, length: width, spaceMajor: renderer.settings.barWidth + renderer.settings.barSpace, labels: labels, direction: "horizontal", numMinor: 0, space: renderer.settings.barSpace, labelRotation: 30, tickShift: renderer.settings.barWidth / 2 + renderer.settings.barSpace });
	    
	    renderer.checkLegend();
	    renderer.checkEvents();
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

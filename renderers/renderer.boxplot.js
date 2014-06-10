/*
  Box-Plot Renderer

  Displays a box plot.

  Options

  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "boxplot",
	    title: "Box-Plot",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg.js" ],
            defaults: {
		'boxwidth': 50,
		'minwidth': 0,
		'height': 300,
		'width': 0,
		'normalized_standardized': false,
		'titles': [],
		'title': "",
		'orientation': 'vertical' },
	    options: [
		{ text:
		  [
		      { name: 'title', type: 'text', description: "title of the plot", title: "title" }
		  ]
		},
		{ layout:
		  [
		      { name: 'boxwidth', type: 'int', description: "width of the boxes", title: "box width" },
		      { name: 'minwidth', type: 'int', description: "minimum width of a box", title: "minumum width" },
		      { name: 'height', type: 'int', description: "height of the plot", title: "height" },
		      { name: 'width', type: 'int', description: "width of the plot", title: "width" },
		      { name: 'orientation', type: 'select', description: "orientation of the plot", title: "orientation", 
			options: [
			    { value: 'vertical', selected: true },
			    { value: 'horizontal' } ] }
		  ]
		}
	    ]
	},
	exampleData: function () {
	    return [ [ 10, 5, 7, 3, 5, 1, 9, 20, 13, 7, 9, 15, 4 ],
		     [ 23, 5, 7, 14, 6, 16, 2, 13, 16, 17, 6, 9, 2 ],
		     [ 12, 11, 15, 16, 18, 9, 10, 8, 9, 8, 11, 13, 14 ] ];
        },
	
	render: function () {
	    renderer = this;

	    var orientation = renderer.settings.orientation || "vertical";

	    // do the calculations
	    var data = renderer.settings.data;
	    renderer.settings.fivenumbers = [];

	    if (renderer.settings.normalize_standardize) {
		var colsums = [];
		for (var i=0;i<data.length;i++) {
		    colsums[i] = 0;
		    for (var j=0;j<data[i].length;j++) {
			data[i][j] = Math.log(data[i][j] + 1) / Math.LN2;
			colsums[i] += data[i][j];
		    }
		}
		var colaverage = [];
		for (var i=0;i<colsums.length;i++) {
		    colaverage[i] = colsums[i] / data[i].length;
		}
		var colvariance = [];
		for (var i=0;i<data.length;i++) {
		    colvariance[i] = 0;
		    for (var j=0;j<data[i].length;j++) {
			colvariance[i] += (colaverage[i] - data[i][j]) ^ 2;
		    }
		}
		var colstdv = [];
		for (var i=0;i<colvariance.length;i++) {
		    colstdv[i] = Math.sqrt(Math.abs(colvariance[i] / data[i].length));
		}
		for (var i=0;i<data.length;i++) {
		    for (var j=0;j<data[i].length;j++) {
			data[i][j] = (data[i][j] - colaverage[i]) / colstdv[i];
		    }
		}
	    }

	    renderer.settings.min = data[0][0];
	    renderer.settings.max = data[0][0];
	    
	    for (var i=0;i<data.length;i++) {
		data[i] = data[i].sort(Retina.Numsort);
		if (data[i][0] < renderer.settings.min) {
		    renderer.settings.min = data[i][0];
		}
		if (data[i][data[i].length - 1] > renderer.settings.max) {
		    renderer.settings.max = data[i][data[i].length - 1];
		}
		renderer.settings.fivenumbers[i] = [];
		renderer.settings.fivenumbers[i]['min'] = data[i][0];
		renderer.settings.fivenumbers[i]['max'] = data[i][data[i].length - 1];
		var boxarray = [];
		if (data[i].length % 2 == 1) {
		    var med = parseInt(data[i].length / 2);
		    renderer.settings.fivenumbers[i]['median'] = data[i][med];
		    if ((med + 1) % 2 == 1) {
			renderer.settings.fivenumbers[i]['lower'] = data[i][parseInt((med + 1) / 2)];
			renderer.settings.fivenumbers[i]['upper'] = data[i][med + parseInt((med + 1) / 2)];
		    } else {
			renderer.settings.fivenumbers[i]['lower'] = ((data[i][(med + 1) / 2]) + (data[i][((med + 1) / 2) + 1])) / 2;
			renderer.settings.fivenumbers[i]['upper'] = ((data[i][med + ((med + 1) / 2) - 1]) + (data[i][med + ((med + 1) / 2)])) / 2;
		    }
		} else {
		    var medup = data[i].length / 2;
		    var medlow = (data[i].length / 2) - 1;
		    renderer.settings.fivenumbers[i]['median'] = (data[i][medlow] + data[i][medup]) / 2;
		    if (medup % 2 == 1) {
			renderer.settings.fivenumbers[i]['lower'] = data[i][medlow / 2];
			renderer.settings.fivenumbers[i]['upper'] = data[i][medup + (medlow / 2)];
		    } else {
			renderer.settings.fivenumbers[i]['lower'] = (data[i][(medup / 2) - 1] + data[i][medup / 2]) / 2;
			renderer.settings.fivenumbers[i]['upper'] = (data[i][medup + (medup / 2) - 1] + data[i][medup + (medup / 2)]) / 2;
		    }
		}
	    }

	    // get the target div
	    var target = renderer.settings.target;
	    var index = 0;
	    while (document.getElementById('boxplot_div'+index)) {
		index++;
	    }
	    target.innerHTML = "<div id='boxplot_div"+index+"'></div>";
	    renderer.settings.width = renderer.settings.boxwidth * renderer.settings.data.length;
	    if (renderer.settings.width < renderer.settings.minwidth) {
		renderer.settings.width = renderer.settings.minwidth;
	    }
	    target.firstChild.setAttribute('style', "width: " + (orientation == 'vertical' ? renderer.settings.width : renderer.settings.height) + "px; height: "+(orientation == 'vertical' ? renderer.settings.height : renderer.settings.width)+"px;");
	    jQuery('#boxplot_div'+index).svg();
	    Retina.RendererInstances.boxplot[renderer.index].drawImage(jQuery('#boxplot_div'+index).svg('get'), renderer.index, orientation, renderer.settings.height);
	    
	    return renderer;
	},
	
	drawImage: function (svg, index, orientation, height) {
	    renderer = Retina.RendererInstances.boxplot[index];

	    var title_height = 0;
	    if (renderer.settings.title) {
		title_height = 40;
		svg.text(10,20, renderer.settings.title, { "style": "fill: black; font-size: 18px; font-weight: bold;" });
	    }
	    
	    var label_height = 0;
	    if (renderer.settings.titles.length) {
		label_height = 200;
	    }

	    var boxwidth = renderer.settings.width / (renderer.settings.fivenumbers.length * 1.5 - 0.5);
	    var yfactor = (renderer.settings.height - title_height - label_height) / (renderer.settings.max - renderer.settings.min);
	    var pad = parseInt(boxwidth / 6);

	    var trans = orientation == 'vertical' ? {} : { transform: "rotate(90,0,0) translate(0,-"+height+")" };
	    var group = svg.group(trans);
	    
	    for (var i=0;i<renderer.settings.fivenumbers.length;i++) {
		var data = renderer.settings.fivenumbers[i];
		var xoffset = parseInt(i * (boxwidth * 1.5));

		// median - upper
		svg.rect(group, xoffset + 1, Math.ceil((renderer.settings.max - data.upper) * yfactor + title_height), parseInt(boxwidth - 2), parseInt((data.upper - data.median) * yfactor), 0, 0, { stroke: 'black', strokeWidth: 1, fill: 'white' });

		// median - lower
		svg.rect(group, xoffset + 1, parseInt((renderer.settings.max - data.median) * yfactor + title_height), parseInt(boxwidth - 2), parseInt((data.median - data.lower) * yfactor), 0, 0, { stroke: 'black', strokeWidth: 1, fill: 'white' });

		// max - upper
		svg.line(group, xoffset + 1 + pad, parseInt((renderer.settings.max - data.max) * yfactor + 1 + title_height), parseInt(xoffset + 1 + boxwidth - 2 - pad), parseInt((renderer.settings.max - data.max) * yfactor + 1 + title_height), { stroke: 'black', strokeWidth: 1 });
		svg.line(group, xoffset + parseInt(boxwidth / 2), parseInt((renderer.settings.max - data.max) * yfactor + 1 + title_height), parseInt(xoffset + parseInt(boxwidth / 2)), parseInt((renderer.settings.max - data.upper) * yfactor + 1 + title_height), { stroke: 'black', strokeWidth: 1, strokeDashArray: "2,2" });

		// lower - min
		svg.line(group, xoffset + 1 + pad, parseInt((renderer.settings.max - data.min) * yfactor - 1 + title_height), parseInt(xoffset + 1 + boxwidth - 2 - pad), parseInt((renderer.settings.max - data.min) * yfactor - 1 + title_height), { stroke: 'black', strokeWidth: 1 });
		svg.line(group, xoffset + parseInt(boxwidth / 2), parseInt((renderer.settings.max - data.lower) * yfactor - 1 + title_height), parseInt(xoffset + parseInt(boxwidth / 2)), parseInt((renderer.settings.max - data.min) * yfactor - 1 + title_height), { stroke: 'black', strokeWidth: 1, strokeDashArray: "2,2" });

		// label
		if (renderer.settings.titles[i]) {
		    svg.text(group, parseInt(xoffset + (boxwidth / 2)),renderer.settings.height - label_height + 5,renderer.settings.titles[i],{"style": "fill: black; font-size: 14px;", "transform":"rotate(-90 "+parseInt(xoffset + (boxwidth / 2))+" "+(renderer.settings.height - label_height + 5)+")", "textAnchor": "end"})
		}
	    }
	}
    });
}).call(this);
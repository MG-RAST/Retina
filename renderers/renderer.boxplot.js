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
		'width': 300,
		'height': 300,
		'data': [ ] }
	},
	exampleData: function () {
	    return [ [ 2, 5, 7, 3, 5, 1, 9, 20, 13, 7, 9, 15, 4 ],
		     [ 23, 5, 7, 14, 6, 16, 2, 13, 16, 17, 6, 9, 2 ],
		     [ 12, 11, 15, 16, 18, 9, 10, 8, 9, 8, 11, 13, 14 ] ];
        },
	
	render: function () {
	    renderer = this;

	    // do the calculations
	    var data = renderer.settings.data;
	    renderer.settings.min = data[0][0];
	    renderer.settings.max = data[0][0];
	    renderer.settings.fivenumbers = [];
	    
	    for (i=0;i<data.length;i++) {
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
	    target.firstChild.setAttribute('style', "width: "+ renderer.settings.width+"px; height: "+renderer.settings.height+"px;");
	    jQuery('#boxplot_div'+index).svg();
	    Retina.RendererInstances.boxplot[renderer.index].drawImage(jQuery('#boxplot_div'+index).svg('get'), renderer.index);
	    
	    return renderer;
	},
	
	drawImage: function (svg, index) {
	    renderer = Retina.RendererInstances.boxplot[index];
	    	    
	    var boxwidth = renderer.settings.width / (renderer.settings.fivenumbers.length * 1.5 - 0.5);
	    var yfactor = renderer.settings.height / (renderer.settings.max - renderer.settings.min);
	    var pad = parseInt(boxwidth / 6);

	    for (i=0;i<renderer.settings.fivenumbers.length;i++) {
		var data = renderer.settings.fivenumbers[i];
		var xoffset = parseInt(i * (boxwidth * 1.5));

		// median - upper
		svg.rect(xoffset + 1, (renderer.settings.max - data.upper) * yfactor, boxwidth - 2, (data.upper - data.median) * yfactor, 0, 0, { stroke: 'black', strokeWidth: 1, fill: 'white' });

		// median - lower
		svg.rect(xoffset + 1, (renderer.settings.max - data.median) * yfactor, boxwidth - 2, (data.median - data.lower) * yfactor, 0, 0, { stroke: 'black', strokeWidth: 1, fill: 'white' });

		// max - upper
		svg.line(xoffset + 1 + pad, (renderer.settings.max - data.max) * yfactor + 1, xoffset + 1 + boxwidth - 2 - pad, (renderer.settings.max - data.max) * yfactor + 1, { stroke: 'black', strokeWidth: 1 });
		svg.line(xoffset + parseInt(boxwidth / 2), (renderer.settings.max - data.max) * yfactor + 1, xoffset + parseInt(boxwidth / 2), (renderer.settings.max - data.upper) * yfactor + 1, { stroke: 'black', strokeWidth: 1, strokeDashArray: "2,2" });

		// lower - min
		svg.line(xoffset + 1 + pad, (renderer.settings.max - data.min) * yfactor - 1, xoffset + 1 + boxwidth - 2 - pad, (renderer.settings.max - data.min) * yfactor - 1, { stroke: 'black', strokeWidth: 1 });
		svg.line(xoffset + parseInt(boxwidth / 2), (renderer.settings.max - data.lower) * yfactor - 1, xoffset + parseInt(boxwidth / 2), (renderer.settings.max - data.min) * yfactor - 1, { stroke: 'black', strokeWidth: 1, strokeDashArray: "2,2" });

	    }
	}
    });
}).call(this);
/*
  Heatmap Renderer

  Displays a heatmap.

  Options
  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "heatmap",
	    title: "Heatmap",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg.js" ],
            defaults: {
		'width': 700,
		'height': 700,
		'tree_height': 50,
		'tree_width': 50,
		'legend_height': 250,
		'legend_width': 250,
		'row_text_size': 15,
		'col_text_size': 15,
		'min_cell_height': 19,
		'data': {} }
	},
	exampleData: function () {
	    return { columns: ["Metagenome a", "Metagenome b", "Metagenome c", "Metagenome d"], rows: ["Tax 1", "Tax 2", "Tax 3","Tax 4", "Tax 5", "Tax 6"], data: [[-1,1,-1,1],[-0.5,0.5,-0.5,0.5],[-0.25,0.25,-0.25,0.25],[-1,1,-1,1],[-0.5,0.5,-0.5,0.5],[-0.25,0.25,-0.25,0.25]] };
        },

	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    var min_height = (renderer.settings.data.rows.length * renderer.settings.min_cell_height) + renderer.settings.tree_height + renderer.settings.legend_height;
	    if (renderer.settings.height < min_height) {
		renderer.settings.height = min_height;
	    }
	    var min_width = (renderer.settings.data.columns.length * renderer.settings.min_cell_height) + renderer.settings.tree_width + renderer.settings.legend_width;
	    if (renderer.settings.width < min_width) {
		renderer.settings.width = min_width;
	    }

	    // get the target div
	    var target = renderer.settings.target;
	    var index = 0;
	    while (document.getElementById('heatmap_div'+index)) {
		    index++;
	    }
	    target.innerHTML = "<div id='heatmap_div"+index+"'></div>";
	    target.firstChild.setAttribute('style', "width: "+ renderer.settings.width+"px; height: "+renderer.settings.height+"px;");
	    jQuery('#heatmap_div'+index).svg();
	    Retina.RendererInstances.heatmap[index].drawImage(jQuery('#heatmap_div'+index).svg('get'), renderer.index);
	    
	    return renderer;
	},

	drawImage: function (svg, index) {
	    renderer = Retina.RendererInstances.heatmap[index];

	    // initialize shortcut variables
	    var data = renderer.settings.data;
	    var numrows = data.rows.length;
	    var numcols = data.columns.length;
	    var boxwidth = parseInt((renderer.settings.width - renderer.settings.legend_width - renderer.settings.tree_width) / numcols);
	    var boxheight = parseInt((renderer.settings.height - renderer.settings.legend_height - renderer.settings.tree_height) / numrows);
	    var displaywidth = parseInt(renderer.settings.width - renderer.settings.legend_width - renderer.settings.tree_width);
	    var displayheight = parseInt(renderer.settings.height = renderer.settings.legend_height - renderer.settings.tree_height);

	    var x = 0;
	    var y = 0;
	    var rx = 0;
	    var ry = 0;
	    var width = 0;
	    var height = 0;
	    var settings = {fill: 'red', strokeWidth: 1, stroke: 'black'};

	    // draw the heatmap
	    for (i=0;i<data.data.length;i++) {
		// draw row text
		var textx = renderer.settings.tree_width + displaywidth + 5;
		var texty = renderer.settings.tree_height + renderer.settings.legend_height + (boxheight * (i+1) - parseInt((boxheight - renderer.settings.row_text_size) / 2));
		svg.text(null, textx, texty, data.rows[i], { fontSize: renderer.settings.row_text_size+"px" });

		// draw cells
		for (h=0;h<data.data[i].length;h++) {
		    // draw column text
		    if (i==0) {
			var ctextx = renderer.settings.tree_width + (boxwidth * h) + (parseInt((boxwidth - renderer.settings.col_text_size) / 2));
			var ctexty = renderer.settings.legend_height - 5;
			svg.text(null, ctextx, ctexty, data.columns[h], { fontSize: renderer.settings.col_text_size+"px", transform: "rotate(-90, "+ctextx+", "+ctexty+")" });
			
		    }

		    // calculate box margins
		    x = h * boxwidth + renderer.settings.tree_width;
		    width = boxwidth;
		    y = i * boxheight + renderer.settings.tree_height + renderer.settings.legend_height;
		    height = boxheight;

		    // calculate box color
		    var color = "black";
		    var cval = parseInt(255*Math.abs(data.data[i][h]));
		    if (data.data[i][h] < 0) {
			color = "rgb("+cval+",0,0)";
		    } else {
			color = "rgb(0,"+cval+",0)";
		    }
		    settings.fill = color;

		    // draw the box
		    svg.rect(null, x, y, width, height, rx, ry, settings);		    
		}
	    }	    
	}
    });
}).call(this);

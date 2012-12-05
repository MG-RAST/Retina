/*
  Plot Renderer

  Displays a two dimensional plot.

  Options

  title (STRING)
      Title string written at the top of the plot
  
  title_color (CSS Color Value)
      Color of the title text. Default is black.

  default_line_color (CSS Color Value)
      Determines the color of lines if not specified for an individual line. Default is black.

  default_line_width (INT)
      Number of pixels lines should be wide if not specified for an individual line. Default is 1.
  
  width (INT)
      The width of the graph in pixel (including legend).
  
  height (INT)
      The height of the graph in pixel (including legend).

  data (ARRAY of OBJECT)
      List of data objects with the attributes
         name
         function
         lineColor
         lineWidth

  show_legend (BOOLEAN)
      Turns the display of the legend on / off. Default ist true.

  legend_position (STRING)
      Can be one of
        left
        right
        top
        bottom
  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "plot",
	    title: "Plot",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ ],
            defaults: {
		'type': 'pie', // [ column, stackedColumn, row, stackedRow, line, pie ]
		'title': 'Functions',
		'title_color': 'black',
		'default_line_color': 'black',
		'default_line_width': 1,
		'show_legend': true,
		'legend_position': 'left',
		'width': 800,
		'height': 400,
		'data': [ ] }
	},
	exampleData: function () {
	    return [ { "name": 'Sine', "function": Math.sin },
		     { "name": 'Cosine', "function": Math.cos },
		     { "name": 'Decaying', "function": renderer.decay },
		     { "name": 'Square', "function": renderer.square, "lineWidth": 3 }
	    ];
        },

	render: function (options) {

	    // load the libs
	    Retina.load_library("jquery.svg.js").then(function(){ Retina.load_library("jquery.svgplot.js").then(function(){

		// get the target div
		var target = options.target;
		target.innerHTML = "<div id='plot_div"+renderer.index+"'></div>";
		target.firstChild.setAttribute('style', "width: "+ options.width+"px; height: "+options.height+"px;");
		
		jQuery('#plot_div'+renderer.index).svg({onLoad: renderer.drawImage});

		return renderer;
		
	    })});
	},

	square: function (x) {
	    return x * x;
	},

	decay: function (x) { 
	    return Math.exp(-0.4 * x) * Math.sin(x); 
	},

	drawImage: function (svg) {

	    var plotZooms   = [ [ -2, 2, -1.5, 1.5 ],
				[ -10, 10, -10, 10 ],
				[ -20, 20, -10, 10 ] ]; 
	    var chartAreas  = [ [ 0.1, 0.1, 0.95, 0.9 ],
				[ 0.2, 0.1, 0.95, 0.9 ],
				[ 0.1, 0.1, 0.8, 0.9 ],
				[ 0.1, 0.25, 0.9, 0.9 ],
				[ 0.1, 0.1, 0.9, 0.8 ] ]; 
	    var legendAreas = [ [ 0.0, 0.0, 0.0, 0.0 ],
				[ 0.005, 0.1, 0.125, 0.5 ],
				[ 0.85, 0.1, 0.97, 0.5 ],
				[ 0.2, 0.1, 0.8, 0.2 ],
				[ 0.2, 0.9, 0.8, 0.995 ] ]; 
	    
	    var colors = [ '#BD362F', // red
			   '#0044CC', // blue
			   '#51A351', // green
			   '#F89406', // yellow
			   '#2F96B4', // lightblue
			   '#bd2fa6', // purple 
			 ];

	    svg.plot.noDraw().title(renderer.settings.title, renderer.settings.title_color);
	    for (i=0;i<renderer.settings.data.length;i++) {
		var d = renderer.settings.data[i];
		svg.plot.noDraw().addFunction(d.name, d.function, d.color || colors[i] || renderer.settings.default_line_color, d.lineWidth || renderer.settings.default_line_width);
	    }
	    svg.plot.noDraw().format('white', 'gray'). 
		gridlines({stroke: 'gray', strokeDashArray: '2,2'}, 'gray'); 
	    svg.plot.xAxis.scale(-1, 3.5).ticks(10, 1); 
	    svg.plot.yAxis.scale(-1.5, 1.5).ticks(2, 1); 
	    svg.plot.legend.settings({fill: 'white', 
				      stroke: 'gray'});

	    var plotZoom = 2; 
	    var plotEqual = 1; 
	    var plotLegend = 0;
	    if (renderer.settings.show_legend) {
		switch (renderer.settings.legend_position) {
		case 'left': plotLegend = 1; 
		    break;
		case 'right': plotLegend = 2;
		    break;
		case 'top': plotLegend = 3;
		    break;
		case 'bottom': plotLegend = 4;
		    break;
		};
	    }
	    svg.plot.noDraw(). 
		legend.show(plotLegend).area(legendAreas[plotLegend]).end(). 
		xAxis.scale(plotZooms[plotZoom][0], plotZooms[plotZoom][1]).end(). 
		yAxis.scale(plotZooms[plotZoom][2], plotZooms[plotZoom][3]).end(). 
		area(chartAreas[plotLegend]).equalXY(plotEqual).redraw(); 
	}
    });
}).call(this);

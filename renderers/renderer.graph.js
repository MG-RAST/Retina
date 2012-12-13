/*
  Graph Renderer

  Displays a graph of pie / bar charts with an optional legend.

  Options

  type (STRING)
      Defines the display type of the graph, can be one of
        pie
        column
        stackedColumn
        row
        stackedRow
        line
      Default is pie.

  title (STRING)
      Title string written at the top of the graph
  
  title_color (CSS Color Value)
      Color of the title text. Default is black.

  x_title (STRING)
      Title written below the x-axis.

  y_title (STRING)
      Title written to the left of the y-axis.

  x_title_color (CSS Color Value)
      Color of the x-axis title string. Default is black.

  y_title_color (CSS Color Value)
      Color of the y-axis title string. Default is black.

  x_labels (ARRAY of STRING)
      List of the labels at the ticks of the x-axis.

  y_labels (ARRAY of STRING)
      List of the labels at the ticks of the y-axis. If no list is passed will use the y-valus.

  x_tick_interval (INT)
      Determines how many ticks are actually drawn on the x-axis. Default is 0.

  y_tick_interval (INT)
      Determines how many ticks are actually drawn on the y-axis. Default is 1.
  
  x_labeled_tick_interval (INT)
      Determines which ticks on the x-axis get labels. Default is 1.

  y_labeled_tick_interval (INT)
      Determines which ticks on the y-axis get labels. Default is 10.

  default_line_color (CSS Color Value)
      Determines the color of lines if not specified for an individual line. Default is black.

  default_line_width (INT)
      Number of pixels lines should be wide if not specified for an individual line. Default is 1.

  show_legend (BOOLEAN)
      Turns the display of the legend on / off. Default ist true.

  legend_position (STRING)
      Can be one of
        left
        right
        top
        bottom
  
  width (INT)
      The width of the graph in pixel (including legend).
  
  height (INT)
      The height of the graph in pixel (including legend).

  data (ARRAY of OBJECT)
      List of data series. Each series has a name and a data attribute. The data attribute is a list of y-values for the series.

*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "graph",
	    title: "Graph",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg.js", "jquery.svggraph.js" ],
            defaults: {
		'type': 'pie', // [ column, stackedColumn, row, stackedRow, line, pie ]
		'title': '',
		'title_color': 'black',
		'x_title': '',
		'y_title': '',
		'x_title_color': 'black',
		'y_title_color': 'black',
		'x_labels': [],
		'y_labels': [],
		'x_tick_interval': 0,
		'y_tick_interval': 5,
		'x_labeled_tick_interval': 1,
		'y_labeled_tick_interval': 10,
		'default_line_color': 'black',
		'default_line_width': 1,
		'show_legend': false,
		'legend_position': 'left',
		'show_grid': false,
		'width': 800,
		'height': 400,
		'data': [ ] }
	},
	exampleData: function () {
	    return [ { "name": 'IE', "data": [95, 91, 78, 66] },
		     { "name": 'Netscape', "data": [3, 12, 18, 18] },
		     { "name": 'Firefox', "data": [0, 4, 8, 9] },
		     { "name": 'Chrome', "data": [0, 8, 18, 22] },
		     { "name": 'Gecko', "data": [1, 2, 3, 33] } ];
        },

	render: function () {
	    renderer = this;

	    // get the target div
	    var target = renderer.settings.target;
	    var index = 0;
	    while (document.getElementById('graph_div'+index)) {
		index++;
	    }
	    target.innerHTML = "<div id='graph_div"+index+"'></div>";
	    target.firstChild.setAttribute('style', "width: "+ renderer.settings.width+"px; height: "+renderer.settings.height+"px;");
	    jQuery('#graph_div'+index).svg();
	    Retina.RendererInstances.graph[index].drawImage(jQuery('#graph_div'+index).svg('get'));
	    
	    return renderer;
	},
	hover: function (title, value, event) {
	    var svg = jQuery('#graph_div'+renderer.index).svg('get');
	    if (title) {
		jQuery(this, svg.root()).attr('fill-opacity', .8);
		jQuery(this, svg.root()).attr('title', title+": "+value);
	    } else {
		jQuery(this, svg.root()).attr('fill-opacity', 1);
	    }
	    if (event == 'click') {
		var num = parseInt(this.parentElement.className.baseVal.substr(this.parentElement.className.baseVal.search(/\d+/)));
		svg.graph.options({ explode: [ num ], explodeDist: 15 });
	    }
	},
	drawImage: function (svg) {

	    var chartAreas = [ [ 0.1, 0.1, 0.95, 0.9 ],   // no legend
			       [ 0.2, 0.1, 0.95, 0.9 ],   // legend left
			       [ 0.1, 0.1, 0.75, 0.9 ],   // legend right
			       [ 0.1, 0.25, 0.9, 0.9 ],   // legend top
			       [ 0.1, 0.1, 0.9, 0.8  ] ]; // legend bottom

	    var legendAreas = [ [ 0.0, 0.0, 0.0, 0.0     ],   // no legend
				[ 0.005, 0.1, 0.125, 0.5 ],   // left
				[ 0.8, 0.1, 0.97, 0.5    ],   // right
				[ 0.2, 0.1, 0.8, 0.2     ],   // top
				[ 0.2, 0.9, 0.8, 0.995   ] ]; // bottom

	    var fills = [ 'url(#fadeBlue)', 'url(#fadeRed)', 'url(#fadeGreen)', 'url(#fadeYellow)', 'url(#fadeLightblue)', 'url(#fadePurple)' ];
	    
	    var defs = svg.defs(); 
	    
	    svg.linearGradient(defs, 'fadeRed', [[0, '#EE5F5B'], [1, '#BD362F']]); 
	    svg.linearGradient(defs, 'fadeBlue', [[0, '#0088CC'], [1, '#0044CC']]); 
	    svg.linearGradient(defs, 'fadeGreen', [[0, '#62C462'], [1, '#51A351']]);
	    svg.linearGradient(defs, 'fadeYellow', [[0, '#FBB450'], [1, '#F89406']]);
	    svg.linearGradient(defs, 'fadeLightblue', [[0, '#5BC0DE'], [1, '#2F96B4']]);
	    svg.linearGradient(defs, 'fadePurple', [[0, '#ee5be0'], [1, '#bd2fa6']]);
	    svg.graph.noDraw().title(renderer.settings.title, renderer.settings.title_color, renderer.settings.title_settings);
	    svg.graph.noDraw().format('white', renderer.settings.show_grid ? 'gray' : 'white' );
	    if (renderer.settings.show_grid) {
		svg.graph.noDraw().gridlines({stroke: 'gray', strokeDashArray: '2,2'}, 'gray');
	    }

	    for (i=0;i<renderer.settings.data.length;i++) {
		svg.graph.noDraw().addSeries( renderer.settings.data[i].name, renderer.settings.data[i].data, null, renderer.settings.data[i].lineColor || renderer.settings.default_line_color, renderer.settings.data[i].lineWidth || renderer.settings.default_line_width);
	    }
	    
	    svg.graph.xAxis.title(renderer.settings.x_title, renderer.settings.x_title_color).
		ticks(renderer.settings.x_labeled_tick_interval, renderer.settings.x_tick_interval).
		scale(0, 3);
	    if (renderer.settings.x_labels.length) {
		svg.graph.xAxis.labels(renderer.settings.x_labels); 
	    }
	    svg.graph.yAxis.title(renderer.settings.y_title, renderer.settings.y_title_color).
		ticks(renderer.settings.y_labeled_tick_interval, renderer.settings.y_tick_interval);
	    if (renderer.settings.y_labels.length) {
		svg.graph.xAxis.labels(renderer.settings.y_labels); 
	    }
	    svg.graph.legend.settings({fill: 'white', stroke: 'white'}); 
	    
	    var chartType = renderer.settings.type;
	    var chartLegend = 0;
	    if (renderer.settings.show_legend) {
		switch (renderer.settings.legend_position) {
		case 'left': chartLegend = 1; 
		    break;
		case 'right': chartLegend = 2;
		    break;
		case 'top': chartLegend = 3;
		    break;
		case 'bottom': chartLegend = 4;
		    break;
		};
	    }
	    var chartOptions = { };
	    	    
	    svg.graph.status(Retina.RendererInstances.graph[renderer.index].hover);

	    svg.graph.noDraw(). 
		legend.show(chartLegend).area(legendAreas[chartLegend]).end();
	    for (i=0; i< renderer.settings.data.length; i++) {
		svg.graph.noDraw().series(i).format(renderer.settings.data[i].fill || fills[i]).end();
	    }
	    svg.graph.noDraw().area(chartAreas[chartLegend]).
		type(chartType, chartOptions).redraw();
	}
    });
}).call(this);

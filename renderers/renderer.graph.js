(function () {
    var schema = {};
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "graph",
	    title: "Graph",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ ],
            defaults: {
		'type': 'pie', // [ column, stackedColumn, row, stackedRow, line, pie ]
		'title': 'Browser Usage',
		'title_color': 'black',
		'x_title': 'Year',
		'y_title': 'Percentage',
		'x_title_color': 'blue',
		'y_title_color': 'black',
		'x_labels': ['2002', '2004', '2005', '2006'],
		'y_labels': [],
		'x_tick_interval': 0,
		'y_tick_interval': 5,
		'x_labeled_tick_interval': 1,
		'y_labeled_tick_interval': 10,
		'default_line_color': 'black',
		'default_line_width': 1,
		'show_legend': true,
		'legend_position': 'left',
		'width': 800,
		'height': 400,
		'data': [ { "name": 'IE', "data": [95, 91, 78, 66] },
			  { "name": 'Netscape', "data": [3, 12, 18, 18] },
			  { "name": 'Firefox', "data": [0, 4, 8, 9] },
			  { "name": 'Chrome', "data": [0, 8, 18, 22] },
			  { "name": 'Gecko', "data": [1, 2, 3, 33] } ] }
	},
	exampleData: function () {
	    return [ ];
        },

	render: function (options) {

	    // load the libs
	    Retina.load_library("jquery.svg.js").then(function(){ Retina.load_library("jquery.svggraph.js").then(function(){

		// get the target div
		var target = options.target;
		target.innerHTML = "<div id='graph_div"+renderer.index+"'></div>";
		target.firstChild.setAttribute('style', "width: "+ options.width+"px; height: "+options.height+"px;");
		
		jQuery('#graph_div'+renderer.index).svg({onLoad: renderer.drawImage});

		return renderer;
		
	    })});
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
			       [ 0.1, 0.1, 0.8, 0.9  ],   // legend right
			       [ 0.1, 0.25, 0.9, 0.9 ],   // legend top
			       [ 0.1, 0.1, 0.9, 0.8  ] ]; // legend bottom

	    var legendAreas = [ [ 0.0, 0.0, 0.0, 0.0     ],   // no legend
				[ 0.005, 0.1, 0.125, 0.5 ],   // left
				[ 0.85, 0.1, 0.97, 0.5   ],   // right
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
	    
	    svg.graph.noDraw().title(renderer.settings.title, renderer.settings.title_color).
		format('white', 'gray'). 
		gridlines({stroke: 'gray', strokeDashArray: '2,2'}, 'gray'); 

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
	    	    
	    svg.graph.status(renderer.hover);

	    svg.graph.noDraw(). 
		legend.show(chartLegend).area(legendAreas[chartLegend]).end();
	    for (i=0; i< renderer.settings.data.length; i++) {
		svg.graph.noDraw().series(i).format(fills[i]).end();
	    }
	    svg.graph.noDraw().area(chartAreas[chartLegend]).
		type(chartType, chartOptions).redraw();
	}
    });
}).call(this);

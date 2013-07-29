(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Metagenome Browser Widget",
                name: "mgbrowse",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ 
 	    Retina.add_renderer({"name": "table", "resource": "./renderers/",  "filename": "renderer.table.js" }),
  	    Retina.load_renderer("table")
	];
    };

    widget.state = { "initial": true,
		     "sort": "name",
		     "sortDir": "asc",
		     "limit": 10,
		     "offset": 0,
		     "query": {},
		     "api_url": 'http://dunkirk.mcs.anl.gov/~jbischof/mgrast/api2.cgi/search/metagenome?' };
        
    widget.display = function (wparams) {
        widget = this;
	var index = widget.index;

	var content = widget.target = wparams.target;
	
	var result_table_header = wparams.header || [ "country", "location","status","name","sequence_type","job","feature","PI_lastname","biome","id","project_name","project_id","material" ];

	widget.result_table = Retina.Renderer.create("table", { target: document.getElementById('result'),
								rows_per_page: 10,
								filter_autodetect: false,
								sort_autodetect: false,
								synchronous: false,
								navigation_callback: widget.update,
								data: { data: [], header: result_table_header } } );
	widget.result_table.render();
	if (widget.state.initial) {
	    widget.state.initial = false;
	    widget.update();
	}
    };

    widget.update = function (params) {
	if (typeof params == 'string') {
	    if (params == 'first') {
		Retina.WidgetInstances.mgbrowse[1].state.offset = 0;
	    }
	    if (params == 'previous') {
		Retina.WidgetInstances.mgbrowse[1].state.offset -= Retina.WidgetInstances.mgbrowse[1].state.limit;
		if (Retina.WidgetInstances.mgbrowse[1].state.offset < 0) {
		    Retina.WidgetInstances.mgbrowse[1].state.offset = 0;
		}
	    }
	    if (params == 'next') {
		Retina.WidgetInstances.mgbrowse[1].state.offset += widget.state.limit;
	    }
	    if (params == 'last') {
		Retina.WidgetInstances.mgbrowse[1].state.offset = Retina.WidgetInstances.mgbrowse[1].state.numrows - Retina.WidgetInstances.mgbrowse[1].state.limit;
		if (Retina.WidgetInstances.mgbrowse[1].state.offset < 0) {
		    Retina.WidgetInstances.mgbrowse[1].state.offset = 0;
		}
	    }
	}
	if (typeof params == 'object') {
	    if (params.sort) {
		Retina.WidgetInstances.mgbrowse[1].state.sort = params.sort;
		Retina.WidgetInstances.mgbrowse[1].state.sortDir = params.dir;
	    }
	    if (params.query) {
		for (i=0;i<params.query.length;i++) {
		    Retina.WidgetInstances.mgbrowse[1].state.query[params.query[i].field] = { "searchword": params.query[i].searchword, "comparison": params.query[i].comparison || "=" };
		}
	    }
	}

	var query = "";
	for (i in Retina.WidgetInstances.mgbrowse[1].state.query) {
	    if (Retina.WidgetInstances.mgbrowse[1].state.query.hasOwnProperty(i) && Retina.WidgetInstances.mgbrowse[1].state.query[i].searchword.length) {
		query += i + Retina.WidgetInstances.mgbrowse[1].state.query[i].comparison + Retina.WidgetInstances.mgbrowse[1].state.query[i].searchword + "&";
	    }
	}

	var url = Retina.WidgetInstances.mgbrowse[1].state.api_url + query + "order=" + Retina.WidgetInstances.mgbrowse[1].state.sort + "&direction=" + Retina.WidgetInstances.mgbrowse[1].state.sortDir + "&match=any" + "&limit=" + Retina.WidgetInstances.mgbrowse[1].state.limit + "&offset=" + Retina.WidgetInstances.mgbrowse[1].state.offset;
	
	jQuery.getJSON(url, function(data) {
            Retina.WidgetInstances.mgbrowse[1].result_table.settings.tdata = data.data;
	    Retina.WidgetInstances.mgbrowse[1].result_table.settings.filter_changed = false;
	    Retina.WidgetInstances.mgbrowse[1].result_table.settings.sorted = true;
            Retina.WidgetInstances.mgbrowse[1].result_table.settings.numrows = Retina.WidgetInstances.mgbrowse[1].state.numrows = data.total_count;
            Retina.WidgetInstances.mgbrowse[1].result_table.settings.offset = Retina.WidgetInstances.mgbrowse[1].state.offset;
	    Retina.WidgetInstances.mgbrowse[1].result_table.render();
	});
    };
    
})();
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
  	    Retina.load_renderer("table"),
 	    Retina.add_renderer({"name": "listselect", "resource": "./renderers/",  "filename": "renderer.listselect.js" }),
  	    Retina.load_renderer("listselect")
	];
    };

    widget.state = { "initial": true,
		     "sort": "name",
		     "sortDir": "asc",
		     "limit": 15,
		     "offset": 0,
		     "total_count": 0,
		     "query": {},
		     "api_url": stm.Config.mgrast_api+'/metagenome?' };
    
    widget.display = function (wparams) {
        widget = this;

	widget.state.type = wparams.type || "table";

	var result_columns = wparams.header || [ "id", "name", "project_id", "project_name", "PI_lastname", "biome", "feature", "material", "env_package_type", "location", "country", "longitude", "latitude", "collection_date", "sequence_type", "seq_method", "status", "created" ];

	var result_table_filter = wparams.filter;
	if (result_table_filter == null) {
	    result_table_filter = {};
	    for (i=0;i<result_columns.length;i++) {
		result_table_filter[i] = { "type": "text" };
	    }
	}

	if (widget.state.type == "listselect") {
	    widget.state.limit = 100;
	    widget.result_list = Retina.Renderer.create("listselect", {
		    target: wparams.target,
		    callback: wparams.callback || null,
		    asynch_limit: widget.state.limit,
		    synchronous: false,
		    navigation_callback: widget.update,
		    data: [],
		    filter: result_columns,
		    multiple: true,
		    extra_wide: true,
		    return_object: true,
		    filter_attribute: 'name',
		    value: "id"
	    });
	    widget.result_list.render();
	} else {	
	    widget.result_table = Retina.Renderer.create("table", {
		    target: wparams.target,
		    rows_per_page: 15,
		    filter_autodetect: false,
		    filter: result_table_filter,
		    sort_autodetect: false,
		    synchronous: false,
		    navigation_callback: widget.update,
		    data: { data: [], header: result_columns }
		});
	    widget.result_table.render();
	}

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
	    if (params == 'next' || params == 'more') {
		Retina.WidgetInstances.mgbrowse[1].state.offset += widget.state.limit;
		if (params == 'more' && Retina.WidgetInstances.mgbrowse[1].state.total_count <= Retina.WidgetInstances.mgbrowse[1].state.limit) {
		    return;
		}
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
	        if (params.sort == 'default') {
	            Retina.WidgetInstances.mgbrowse[1].state.sort = 'name';
    		    Retina.WidgetInstances.mgbrowse[1].state.sortDir = 'asc';
	        } else {
		        Retina.WidgetInstances.mgbrowse[1].state.sort = params.sort;
		        Retina.WidgetInstances.mgbrowse[1].state.sortDir = params.dir;
	        }
	    }
	    if (params.query) {
		if (Retina.WidgetInstances.mgbrowse[1].state.type == "listselect") {
		    Retina.WidgetInstances.mgbrowse[1].state.offset = 0;
		}
		if (params.clear) {
		    Retina.WidgetInstances.mgbrowse[1].state.query = {};
		}
	        if (typeof params.query == 'object') {
		    for (i=0;i<params.query.length;i++) {
		        Retina.WidgetInstances.mgbrowse[1].state.query[params.query[i].field] = { "searchword": "*"+params.query[i].searchword+"*", "comparison": params.query[i].comparison || "=" };
		    }
	        } else {
	            Retina.WidgetInstances.mgbrowse[1].state.query = {};
	        }
	    }
	    if (params.goto != null) {
		Retina.WidgetInstances.mgbrowse[1].state.offset = params.goto;
	    }
	    if (params.limit) {
		Retina.WidgetInstances.mgbrowse[1].state.limit = params.limit;
	    }
	}

	var query = "";
	for (i in Retina.WidgetInstances.mgbrowse[1].state.query) {
	    if (Retina.WidgetInstances.mgbrowse[1].state.query.hasOwnProperty(i) && Retina.WidgetInstances.mgbrowse[1].state.query[i].searchword.length) {
		    query += i + Retina.WidgetInstances.mgbrowse[1].state.query[i].comparison + Retina.WidgetInstances.mgbrowse[1].state.query[i].searchword + "&";
	    }
	}

	var url = Retina.WidgetInstances.mgbrowse[1].state.api_url + query + "order=" + Retina.WidgetInstances.mgbrowse[1].state.sort + "&direction=" + Retina.WidgetInstances.mgbrowse[1].state.sortDir + "&match=any&verbosity=mixs" + "&limit=" + Retina.WidgetInstances.mgbrowse[1].state.limit + "&offset=" + Retina.WidgetInstances.mgbrowse[1].state.offset;
	var headers = stm.Authentication ? {'AUTH': stm.Authentication} : {};
	
	jQuery.ajax({ url: url, headers: headers, dataType: "json", success: function(data) {
	    if (Retina.WidgetInstances.mgbrowse[1].state.type == "table") {
		    Retina.WidgetInstances.mgbrowse[1].result_table.settings.tdata = data.data;
		    Retina.WidgetInstances.mgbrowse[1].result_table.settings.filter_changed = false;
		    Retina.WidgetInstances.mgbrowse[1].result_table.settings.sorted = true;
		    Retina.WidgetInstances.mgbrowse[1].result_table.settings.numrows = Retina.WidgetInstances.mgbrowse[1].state.numrows = data.total_count;
		    Retina.WidgetInstances.mgbrowse[1].result_table.settings.offset = Retina.WidgetInstances.mgbrowse[1].state.offset;
		    Retina.WidgetInstances.mgbrowse[1].result_table.render();
	    } else {
		    Retina.WidgetInstances.mgbrowse[1].state.total_count = data.total_count;
		    if (typeof params == 'string' && params == "more") {
		        Retina.WidgetInstances.mgbrowse[1].result_list.settings.data = Retina.WidgetInstances.mgbrowse[1].result_list.settings.data.concat(data.data);
		    } else {
		        Retina.WidgetInstances.mgbrowse[1].result_list.settings.data = data.data;
		    }
		    Retina.WidgetInstances.mgbrowse[1].result_list.render();
	    }
	}});
    };
    
})();
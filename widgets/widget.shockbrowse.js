(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "SHOCK Browser Widget",
                name: "shockbrowse",
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

    widget.shock_url = "http://140.221.43.49:80/node?query&data_type=sequence";
    
    widget.display = function (wparams) {
        widget = this;

	wparams.type || "table";

	var result_columns = wparams.header || [ "created", "file_format", "id", "job_id", "kbase_id", "name", "project_id", "project_name" ];

	var result_table_filter = wparams.filter;
	if (result_table_filter == null) {
	    result_table_filter = {};
	    for (var i=0;i<result_columns.length;i++) {
		result_table_filter[i] = { "type": "text" };
	    }
	}

	if (wparams.type == "listselect") {
	    widget.result_list = Retina.Renderer.create("listselect", {
		target: wparams.target,
		callback: wparams.callback || null,
		asynch_limit: 100,
		synchronous: false,
		navigation_url: widget.shock_url,
		data: [],
		filter: result_columns,
		multiple: (wparams.multiple === false) ? false : true,
		extra_wide: wparams.wide || false,
		return_object: true,
		filter_attribute: 'name',
		asynch_filter_attribute: 'name',
		value: "id"
	    });
	    //widget.result_list.render();
	    widget.result_list.update_data({},1);
	} else {	
	    widget.result_table = Retina.Renderer.create("table", {
		target: wparams.target,
		rows_per_page: 14,
		filter_autodetect: false,
		filter: result_table_filter,
		sort_autodetect: false,
		synchronous: false,
		query_type: 'prefix',
		data_manipulation: widget.dataManipulation,
//		invisible_columns: {0:1,2:1,6:1,7:1,8:1,11:1,12:1,15:1,16:1,17:1},
		navigation_url: widget.shock_url,
		data: { data: [], header: result_columns }
	    });
	    widget.result_table.render();
	    widget.result_table.update({},1);
	}
    };

    widget.dataManipulation = function (data) {
	var new_data = [];
	for (var i=0;i<data.length;i++) {
	    new_data.push(data[i].attributes);
	}
	return new_data;
    };
    
})();
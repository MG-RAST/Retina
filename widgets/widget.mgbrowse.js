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
    
    widget.display = function (wparams) {
        widget = this;

	wparams.type || "table";

	var result_columns = wparams.header || [ "id", "name", "project_id", "project_name", "PI_lastname", "biome", "feature", "material", "env_package_type", "location", "country", "longitude", "latitude", "collection_date", "sequence_type", "seq_method", "status", "created" ];

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
		navigation_url: stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs',
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
		invisible_columns: {0:1,2:1,6:1,7:1,8:1,11:1,12:1,15:1,16:1,17:1},
		navigation_url: stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs',
		data: { data: [], header: result_columns }
	    });
	    widget.result_table.render();
	    widget.result_table.update({},1);
	}
    };
    
})();
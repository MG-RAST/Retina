(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "SHOCK Browser Widget",
                name: "shockbrowse",
                author: "Tobias Paczian",
                requires: [ "AuxStore.js" ]
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

    widget.shock_base = "http://shock.metagenomics.anl.gov/node";
    widget.shock_url = widget.shock_base + "?query&type=dockerimage";
    
    widget.display = function (wparams) {
        widget = this;
	
	if (Retina.WidgetInstances.hasOwnProperty('login') && Retina.WidgetInstances.login.length > 1) {
	    Retina.WidgetInstances.login[1].callback = Retina.WidgetInstances.shockbrowse[1].update;
	}

	wparams.type || "table";

	var result_columns = wparams.header || [ "name", "base_image_tag", "docker version", "id", "temporary", "Arch", "GitCommit", "GoVersion", "KernelVersion", "Os" ];

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
		navigation_url: widget.shock_url,
		invisible_columns: { 4: 1,
				     5: 1,
				     6: 1,
				     7: 1,
				     8: 1,
				     9: 1 },
		data: { data: [], header: result_columns }
	    });
	    widget.result_table.render();
	    widget.result_table.update({},1);
	}
    };

    widget.update = function () {
	Retina.WidgetInstances.shockbrowse[1].result_table.update({}, 1);
    };

    widget.dataManipulation = function (data) {
	var new_data = [];
	for (var i=0;i<data.length;i++) {
	    new_data.push({ "name": data[i].attributes.name, 
			    "base_image_tag": data[i].attributes.base_image_tag,
			    "docker version": data[i].attributes.docker_version.Version,
			    "id": "<a href='"+Retina.WidgetInstances.shockbrowse[1].shock_base+"/"+data[i].id+"' target=_blank>"+data[i].id+"</a>",
			    "temporary": data[i].attributes.temporary, 
			    "Arch": data[i].attributes.docker_version.Arch, 
			    "GitCommit": data[i].attributes.docker_version.GitCommit, 
			    "GoVersion": data[i].attributes.docker_version.GoVersion,
			    "KernelVersion": data[i].attributes.docker_version.KernelVersion, 
			    "Os": data[i].attributes.docker_version.Os });
	}
	return new_data;
    };
    
})();
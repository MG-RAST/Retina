(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "SHOCK Browser Widget for Docker Images",
                name: "dockerimages",
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
	    Retina.WidgetInstances.login[1].callback = Retina.WidgetInstances.dockerimages[1].update;
	}

	wparams.type || "table";

	var result_columns = wparams.header || [ "name", "namespace", "repository", "tag", "base_image_tag", "docker version", "shock node id", "docker image id", "temporary", "Arch", "GitCommit", "GoVersion", "KernelVersion", "Os" ];

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
				invisible_columns: { 0:1,
					5:1, //docker version
					 7:1,
					 8: 1,
				     9: 1,
				     10: 1,
				     11: 1,
					12:1,
				     13: 1 },
		data: { data: [], header: result_columns }
	    });
	    widget.result_table.render();
	    widget.result_table.update({},1);
	}
    };

    widget.update = function () {
	Retina.WidgetInstances.dockerimages[1].result_table.update({}, 1);
    };

    widget.dataManipulation = function (data) {
	var new_data = [];
	for (var i=0;i<data.length;i++) {
		var namearray = data[i].attributes.name.split(":");
		//var repository_name = namearray[0];
		var repository_tag = namearray[1] || "";
 
		var namespacearray = namearray[0].split("/");
		var namespace="";
		var repository_name=namespacearray[0];
		if (namespacearray.length == 2) {
			namespace=namespacearray[0];
			repository_name=namespacearray[1];
		}
 
	    var idfield = "<a href='"+Retina.WidgetInstances.dockerimages[1].shock_base+"/"+data[i].id+"' target=_blank title='no docker file available'>"+data[i].id+"</a>";
	    if (data[i].attributes.dockerfile) {
		idfield = "<a style='cursor: pointer;' onclick='Retina.WidgetInstances.dockerimages[1].tooltip(jQuery(this), \""+data[i].id+"\")'>"+data[i].id+"</a>";
		if (! stm.DataStore.hasOwnProperty('dockerfile')) {
		    stm.DataStore.dockerfile = {};
		}
		stm.DataStore.dockerfile[data[i].id] = data[i].attributes.dockerfile;
	    }
	    
	    new_data.push({ "name": data[i].attributes.name,
				"namespace" : namespace,
				"repository" : repository_name,
				"tag" : repository_tag,
			    "base_image_tag": data[i].attributes.base_image_tag,
			    "docker version": data[i].attributes.docker_version.Version,
			    "shock node id": idfield,
				"docker image id" : data[i].attributes.id,
			    "temporary": data[i].attributes.temporary, 
			    "Arch": data[i].attributes.docker_version.Arch, 
			    "GitCommit": data[i].attributes.docker_version.GitCommit, 
			    "GoVersion": data[i].attributes.docker_version.GoVersion,
			    "KernelVersion": data[i].attributes.docker_version.KernelVersion,
			    "Os": data[i].attributes.docker_version.Os ,
				"Size": data[i].file.size });
	}
	return new_data;
    };

    widget.dockerfile = function (id) {
	stm.saveAs(Retina.Base64.decode(stm.DataStore.dockerfile[id]), "dockerfile");
    };

    widget.tooltip = function (obj, id) {
	obj.popover('destroy');
	obj.popover({content: "<button class='close' style='position: relative; bottom: 8px; left: 8px;' type='button' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);'>×</button><a href='"+Retina.WidgetInstances.dockerimages[1].shock_base+"/"+id+"' target=_blank onclick=this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)>view node</a><br><a style='cursor: pointer;' onclick='Retina.WidgetInstances.dockerimages[1].dockerfile(&#39;"+id+"&#39;);this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);'>view dockerfile</a>",html:true,placement:"top"});
	obj.popover('show');
    }
    
})();
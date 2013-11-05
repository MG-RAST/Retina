(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Rank Abundance Comparison",
                name: "rankabundance",
                author: "Tobias Paczian",
                requires: [ "rgbcolor.js" ]
        }
    });

    widget.setup = function () {
	return [ Retina.add_renderer({"name": "listselect", "resource": "renderers/",  "filename": "renderer.listselect.js" }),
		 Retina.load_renderer("listselect"),
		 Retina.add_renderer({"name": "groupselect", "resource": "renderers/",  "filename": "renderer.groupselect.js" }),
		 Retina.load_renderer("groupselect"),
		 Retina.add_renderer({"name": "table", "resource": "renderers/",  "filename": "renderer.table.js" }),
		 Retina.load_renderer("table"),
		 Retina.add_renderer({"name": "graph", "resource": "renderers/",  "filename": "renderer.graph.js" }),
		 Retina.load_renderer("graph")
	       ];
    };
    
    widget.ids = [];
    widget.groups = {};
    widget.stmid = "";

    widget.level = "phylum";
    widget.evalue = "5";
    widget.alignmentLength = "15";
    widget.identity = "60";
    widget.minhits = "1";
    widget.source = "M5NR";
    widget.hittype = "lca";

    widget.display = function (wparams) {
	widget = this;
	var index = widget.index;

	var target = widget.target ? widget.target : widget.target = wparams.target;

	// we do not yet have metagenomes selected, show the select
	if (widget.ids.length == 0) {
	    target.innerHTML = "";
	    var wrapper = document.createElement('div');
	    wrapper.setAttribute('class', 'container');
	    wrapper.setAttribute('style', 'width: 640px;');

	    target.appendChild(wrapper);

	    var title = document.createElement('div');
	    var select = document.createElement('div');

	    wrapper.appendChild(title);
	    wrapper.appendChild(select);

	    title.innerHTML = "<h3 style='margin-bottom: 20px;'>select your samples</h3>";

	    var rend = Retina.Renderer.create("listselect", { target: select,
							      multiple: true,
							      data: [],
							      filter_attribute: 'name',
							      asynch_filter_attribute: 'name',
							      asynch_limit: 100,
							      synchronous: false,
							      navigation_url: stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs',
							      value: "id",
							      button: { 'text': 'next ',
									'icon': "<i class='icon-forward' style='position: relative; top: 2px;'></i>",
									'class': 'btn btn-large',
									'style': 'margin-bottom: 10px; margin-left: 465px;' },
							      callback: function (data) {
								  widget.target.innerHTML = '<div class="alert alert-block alert-info" style="position: absolute; top: 250px; width: 400px; right: 38%;">\
<button type="button" class="close" data-dismiss="alert">×</button>\
<h4><img src="images/loading.gif"> Please wait...</h4>\
<p>The data to be displayed is currently loading.</p>\
</div>';
								  var promises = [];
								  for (var i=0;i<data.length;i++) {
								      promises.push(stm.get_objects({"type": "metagenome", "options": {"verbosity": "mixs","id": data[i]}}));
								  }
								  jQuery.when.apply(this, promises).then(function() {
								      widget.ids = data;
								      widget.display(wparams);
								  });
							      },
							      filter: ["id", "name", "project_id", "project_name", "PI_lastname", "biome", "feature", "material", "env_package_type", "location", "country", "longitude", "latitude", "collection_date", "sequence_type", "seq_method", "status", "created"] });
	    rend.render();
	    rend.update_data({},1);
	    if (Retina.WidgetInstances.hasOwnProperty('login')) {
		Retina.WidgetInstances.login[1].callback = function() {
		    rend.update_data({},1);
		};
	    }
	}
	
	// we have metagenomes, show the wizard
	else {
	    widget.stmid = widget.ids.sort().join("_") + "_organism_"+widget.level+"_"+widget.source+"_"+widget.hittype+"_abundance_"+widget.evalue+"_"+widget.identity+"_"+widget.alignmentLength+"_0";
	    
	    // check if all data is loaded
	    if (stm.DataStore.hasOwnProperty('matrix') && stm.DataStore.matrix.hasOwnProperty(widget.stmid)) {
		widget.render_graph(index);
	    } else {
		stm.get_objects({ "type": "matrix", "id": "organism", "options": {"source": widget.source, "id": widget.ids, "hit_type": widget.hittype, "result_type": "abundance", "group_level": widget.level, "evalue": widget.evalue, "identity": widget.identity, "length": widget.alignmentLength } }).then(function(){
		    if (document.getElementById('loading_status')) {
			document.getElementById('loading_status').innerHTML = "";
		    }
		    widget.render_graph(index);
		});
		
		if (document.getElementById('loading_status')) {
	 	    document.getElementById('loading_status').innerHTML = '<div class="alert alert-block alert-info" style="width: 400px;">\
<button type="button" class="close" data-dismiss="alert">×</button>\
<h4><img src="images/loading.gif"> Please wait...</h4>\
<p>The data to be displayed is currently loading.</p>\
</div>';
		}
		
		return;
	    }
	}
    };


    widget.render_menu = function (index) {
	widget = Retina.WidgetInstances.rankabundance[index];

	var query_params = '<div style="clear: both; margin-top: 280px; margin-left: 50px; margin-bottom: 30px;">\
<span>level</span> <select id="level_select" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;">\
  <option>domain</option>\
  <option selected>phylum</option>\
  <option>class</option>\
  <option>order</option>\
  <option>family</option>\
  <option>species</option>\
  <option>strain</option>\
</select>\
<span>source</span> <select id="source" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span2">\
  <option selected>M5NR</option>\
  <option>M5RNA</option>\
  <option>RefSeq</option>\
  <option>GenBank</option>\
  <option>IMG</option>\
  <option>SEED</option>\
  <option>TrEMBL</option>\
  <option>SwissProt</option>\
  <option>PATRIC</option>\
  <option>KEGG</option>\
  <option>RDP</option>\
  <option>Greengenes</option>\
  <option>LSU</option>\
  <option>SSU</option>\
</select>\
<span>hit type</span> <select id="hittype" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span2">\
  <option selected>all</option>\
  <option>single</option>\
  <option>lca</option>\
</select>\
<span>evalue</span><input type="text" id="evalue" value="'+widget.evalue+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<span>% identity</span><input type="text" id="identity" value="'+widget.identity+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<span>alignment length</span><input type="text" id="alignment" value="'+widget.alignmentLength+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<span>minimum abundance</span><input type="text" id="minhits" value="'+widget.minhits+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<button class="btn btn-primary" onclick="Retina.WidgetInstances.rankabundance[1].reload();">show</button>\
</div>';
	
	widget.target.innerHTML = "<div id='loading_status' style='position: absolute; top: 70px; right: 30px;'></div><div id='settings' style='margin-top: 90px;'><div style='float: left; margin-left: 50px;'><div id='group'></div></div></div>"+query_params+"<div id='graph_target'></div>";

	if (widget.group_select) {
	    widget.group_select.settings.target = document.getElementById('group');
	    widget.group_select.render();
	} else {
	    var mgdata = [];
	    for (var i in stm.DataStore.metagenome) {
		if (stm.DataStore.metagenome.hasOwnProperty(i)) {
		    mgdata.push(stm.DataStore.metagenome[i]);
		}
	    }
	    var group_select = widget.group_select = Retina.Renderer.create("groupselect", { multiple: true,
											     data: mgdata,
											     filter_attribute: 'name',
											     value: "id",
											     target: document.getElementById('group'),
											     callback: function (data) {
												 Retina.WidgetInstances.rankabundance[1].groups = data;
												 Retina.WidgetInstances.rankabundance[1].render_graph(1);
											     },
	    										     filter: [ "id", "name", "project_id", "project_name", "PI_lastname", "biome", "feature", "material", "env_package_type", "location", "country", "longitude", "latitude", "collection_date", "sequence_type", "seq_method", "status", "created" ] });
	    group_select.render();
	}

	widget.render_graph(index);
    };


    widget.render_graph = function(index) {
	widget = Retina.WidgetInstances.rankabundance[index];

	if (! document.getElementById('graph_target')) {
	    widget.render_menu(index);
	    return;
	}

	var data =  [];
	for (var i in widget.groups) {
	    if (widget.groups.hasOwnProperty(i)) {
		data.push( { "name": i, "data": [] } );
	    }
	}

	var xlabels = [];
	var d = stm.DataStore.matrix[widget.stmid];
	for (var i=0;i<d.rows.length;i++) {
	    xlabels.push(d.rows[i].id);
	}
	var col2group = {};
	for (var i=0;i<d.columns.length;i++) {
	    for (var h=0;h<data.length;h++) {
		for (var j=0;j<widget.groups[data[h].name].length;j++) {
		    if (d.columns[i].id == widget.groups[data[h].name][j]) {
			col2group[i] = h;
		    }
		}
	    }
	}

	// fill matrix with 0
	var sortmatrix = [];
	for (var i=0;i<d.rows.length;i++) {
	    sortmatrix.push([]);
	    for (var h=0;h<data.length;h++) {
		sortmatrix[i][h] = 0;
	    }
	    
	    // store the row index
	    sortmatrix[i].push(i);
	}

	// fill sparse values into inflated 0 matrix
	for (var i=0;i<d.data.length;i++) {
	    for (var h=0;h<d.data[i].length;h++) {
		sortmatrix[d.data[i][0]][col2group[d.data[i][1]]] += d.data[i][2];
	    }
	}

	// sort the data by abundance
	sortmatrix.sort(widget.abusort);
	var sortedlabels = [];
	var indexcol = sortmatrix[0].length - 1;
	for (var i=0;i<sortmatrix.length;i++) {
	    sortedlabels.push(xlabels[sortmatrix[i][indexcol]]);
	    for (var h=0;h<data.length;h++) {
		data[h].data.push(sortmatrix[i][h]);
	    }
	}

	// remove rows with all 0 values
	for (var i=sortedlabels.length - 1;i>-1;i--) {
	    var has_value = false;
	    for (var h=0;h<data.length;h++) {
		if (data[h].data[i] >= widget.minhits) {
		    has_value = true;
		    break;
		}
	    }
	    if (has_value) {
		sortedlabels.splice(i + 1);
		for (var h=0;h<data.length;h++) {
		    data[h].data.splice(i + 1);
		}
		break;
	    }
	}

	// render the graph
	if (widget.graph) {
	    widget.graph.settings.x_labels = sortedlabels;
	    widget.graph.settings.data = data;
	} else {
	    widget.graph = Retina.Renderer.create("graph", { target: document.getElementById('graph_target'), x_labels: sortedlabels, data: data, x_labels_rotation: -40, y_scale: 'log', chartArea: [ 0.1, 0.05, 0.95, 0.6 ], onclick: Retina.WidgetInstances.rankabundance[index].graph_click, width: 1200 });
	}
	widget.graph.render();
    };

    widget.reload = function () {
	widget.level = document.getElementById('level_select').options[document.getElementById('level_select').selectedIndex].value;
	widget.hittype = document.getElementById('hittype').options[document.getElementById('hittype').selectedIndex].value;
	widget.source = document.getElementById('source').options[document.getElementById('source').selectedIndex].value;
	widget.evalue = document.getElementById('evalue').value;
	widget.alignmentLength = document.getElementById('alignment').value;
	widget.identity = document.getElementById('identity').value;
	widget.minhits = document.getElementById('minhits').value;
	widget.display();
    };

    widget.abusort = function (a, b) {
	var ax = a.slice(0,a.length - 1);
	var bx = b.slice(0,b.length - 1);
	var ma = Math.max.apply(Math, ax);
	var mb = Math.max.apply(Math, bx);
	return mb - ma;
    };

    widget.graph_click = function (a, b, c, d) {

    };
   
})();
(function () {
    widget = Retina.Widget.extend({
        about: {
            title: "Ecological Network Association Map",
            name: "enam",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	if (! stm.DataStore.hasOwnProperty('profile')) {
	    stm.DataStore.profile = {};
	    stm.DataStore.metagenome = {};
	}

	return [ Retina.add_renderer({"name": "heatmap", "resource": "./renderers/",  "filename": "renderer.heatmap.js" }),
  		 Retina.load_renderer("heatmap"),
		 Retina.add_renderer({"name": "listselect", "resource": "./renderers/",  "filename": "renderer.listselect.js" }),
  		 Retina.load_renderer("listselect") ];
    };

    widget.offlineMode = true;
    widget.mgData = [];
    widget.ids = [];
    widget.level = 0;
    widget.filter = [];
    widget.type = "function";
    widget.maxlevel = 3;
    widget.source = "Subsystems";
    widget.hittype = "single";
    widget.evalue = "5";
    widget.identity = "60";
    widget.alignmentLength = "15";
    widget.lastCell = null;
    widget.md_attribute = null;
    widget.org = ["M5NR","M5RNA","SwissProt","GenBank","IMG","SEED","TrEMBL","RefSeq","PATRIC","KEGG","RDP","Greengenes","LSU","SSU"];
    widget.func = ["Subsystems","NOG","COG","KO"];
    widget.org_lvl = ["domain","phylum","class","order","family","genus","species","strain"];
    widget.func_lvl = ['level 1','level 2', 'level 3', 'function'];
    
    widget.display = function (params) {
        widget = this;
	var index = widget.index;
	var target;
	if (params) {
	    target = widget.target = params.target;
	} else {
	    target = widget.target;
	}

	if (widget.offlineMode) {
	    if (Retina.keys(stm.DataStore.metagenome).length == 0) {
		jQuery.get('data/enam.dump', function(data) {
		    var new_data = JSON.parse(data.replace(/\n/g, ""));
		    for (var h in new_data) {
			if (new_data.hasOwnProperty(h)) {
			    stm.load_data({ data: new_data[h], type: h});
			}
		    }
		}, 'text').fail(function(){
		    if (confirm("The data for the offline mode could not be found.\nWould you like to switch to online mode?")) {
			Retina.WidgetInstances.enam[1].offlineMode = false;
			Retina.WidgetInstances.enam[1].display();
		    } else {
			alert('data download cancelled');
		    }
		}).then(function(){
		    Retina.WidgetInstances.enam[1].display();
		});
		return;
	    } else {
		var d = [];
		for (var i in stm.DataStore.metagenome) {
		    if (stm.DataStore.metagenome.hasOwnProperty(i)) {
			d.push( { "id": i,
				  "name": stm.DataStore.metagenome[i].name || "" ,
				  "project_id": stm.DataStore.metagenome[i].metadata.project.id || "",
				  "project_name": stm.DataStore.metagenome[i].metadata.project.name || "",
				  "PI_lastname": stm.DataStore.metagenome[i].metadata.project.data.PI_lastname || "",
				  "biome": stm.DataStore.metagenome[i].metadata.sample.data.biome || "",
				  "feature": stm.DataStore.metagenome[i].metadata.sample.data.feature || "",
				  "material": stm.DataStore.metagenome[i].metadata.sample.data.material || "",
				  "env_package_type": stm.DataStore.metagenome[i].metadata.env_package.type || "",
				  "location": stm.DataStore.metagenome[i].metadata.sample.data.location || "",
				  "country": stm.DataStore.metagenome[i].metadata.sample.data.country || "",
				  "longitude": stm.DataStore.metagenome[i].metadata.sample.data.logitude || "",
				  "latitude": stm.DataStore.metagenome[i].metadata.sample.data.latitude || "",
				  "collection_date": stm.DataStore.metagenome[i].metadata.sample.data.collection_date || "",
				  "sequence_type": stm.DataStore.metagenome[i].sequence_type || "",
				  "seq_method": stm.DataStore.metagenome[i].metadata.library.data.seq_meth || "",
				  "status": stm.DataStore.metagenome[i].status || "",
				  "created": stm.DataStore.metagenome[i].created || "" } );
		    }
		}
		widget.mgData = d;
	    }
	}

	var query_params = '\
<span>type</span> <select id="type_select" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px; width: 100px;" onchange="Retina.WidgetInstances.enam['+index+'].typeSelect('+index+');">\
  <option selected>function</option>\
  <option>taxonomy</option>\
</select>\
<span>source</span> <select id="source_select" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px; width: 115px;" onchange="Retina.WidgetInstances.enam['+index+'].source=this.options[this.selectedIndex].text;Retina.WidgetInstances.enam['+index+'].filter=[];Retina.WidgetInstances.enam['+index+'].updateFilterDisplay('+index+');">';
	for (var i=0;i<widget.func.length;i++) {
	    query_params += "<option>"+widget.func[i]+"</option>";
	}
	query_params += '\
</select>\
<span>level</span> <select id="level_select" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px; width: 100px;">\
  <option selected value=0>level 1</option>\
  <option value=1>level 2</option>\
  <option value=2>level 3</option>\
  <option value=3>function</option>\
</select>\
<span>evalue</span><input type="text" id="evalue" value="'+widget.evalue+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<span>% identity</span><input type="text" id="identity" value="'+widget.identity+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<span>alignment length</span><input type="text" id="alignment" value="'+widget.alignmentLength+'" style="margin-left: 5px; margin-right: 5px; position: relative; top: 5px;" class="span1">\
<button class="btn btn-primary" onclick="Retina.WidgetInstances.enam[1].reload('+index+');" title="update heatmap with\nselected values"><i class="icon-refresh icon-white"></i></button>\
<div class="btn-toolbar" style="margin-top: 0px; clear: left;">\
  <div class="btn-group">\
    <button class="btn btn-primary" title="move up one level" onclick="if(document.getElementById(\'level_select\').selectedIndex>0){document.getElementById(\'level_select\').selectedIndex--;Retina.WidgetInstances.enam['+index+'].reload('+index+');}"><i class="icon-arrow-up icon-white"></i></button>\
    <button class="btn btn-primary" title="move down one level" onclick="if(document.getElementById(\'level_select\').selectedIndex<Retina.WidgetInstances.enam['+index+'].maxlevel){document.getElementById(\'level_select\').selectedIndex++;Retina.WidgetInstances.enam['+index+'].reload('+index+');}"><i class="icon-arrow-down icon-white"></i></button>\
  </div>\
  <div class="btn-group" data-toggle="buttons-radio">\
    <button class="btn active" title="zoom into category" onclick="if(Retina.WidgetInstances.enam['+index+'].heatmap){Retina.WidgetInstances.enam['+index+'].heatmap.settings.rowClicked=Retina.WidgetInstances.enam['+index+'].heatmapRowClicked;Retina.WidgetInstances.enam['+index+'].heatmap.render();document.getElementById(\'keep_selected_button\').setAttribute(\'disabled\',\'disabled\');document.getElementById(\'drop_selected_button\').setAttribute(\'disabled\',\'disabled\');document.getElementById(\'clear_selection_button\').setAttribute(\'disabled\',\'disabled\');}"><i class="icon-zoom-in"></i></button>\
    <button class="btn" title="select categories" onclick="if(Retina.WidgetInstances.enam['+index+'].heatmap){Retina.WidgetInstances.enam['+index+'].heatmap.settings.rowClicked=null;Retina.WidgetInstances.enam['+index+'].heatmap.render();document.getElementById(\'keep_selected_button\').removeAttribute(\'disabled\');document.getElementById(\'drop_selected_button\').removeAttribute(\'disabled\');document.getElementById(\'clear_selection_button\').removeAttribute(\'disabled\');}"><i class="icon-list"></i></button>\
  </div>\
  <div class="btn-group">\
    <button class="btn btn-success" title="keep only selected categories" disabled id="keep_selected_button" onclick="Retina.WidgetInstances.enam['+index+'].removeSelected('+index+',\'in\');"><i class="icon-plus icon-white"></i></button>\
    <button class="btn btn-danger" title="remove all selected categories" disabled id="drop_selected_button" onclick="Retina.WidgetInstances.enam['+index+'].removeSelected('+index+',\'out\');"><i class="icon-minus icon-white"></i></button>\
    <button class="btn" title="clear selection" disabled id="clear_selection_button" onclick="Retina.WidgetInstances.enam['+index+'].clearSelection('+index+');"><i class="icon-trash"></i></button>\
  </div>\
</div>\
';
	
	widget.target.innerHTML = widget.offlineModeButton() + "<div id='info_space' style='position: absolute; right: 10px; top: 105px; width: 330px; bottom: 10px;border-radius: 6px 6px 6px 6px;box-shadow: 4px 4px 4px #666666;border:1px solid #aaaaaa;padding: 10px;overflow-y: scroll;'><h4>current metagenomes</h4><div id='currmgs' style='max-height: 295px;overflow-y:scroll;overflow-x:hidden;'>-</div><hr><h4>cell information</h4><div id='currcell' style='min-height: 100px;'></div><hr><h4>metadata</h4><div id='metadata'></div><hr><h4>filter</h4><div id='currfilter'>-</div></div><div id='loading_status' style='position: absolute; top: 40%; left: 30%;'></div><div id='group_container' style='margin-top: 5px; width: 620px; float: left; margin-bottom: 10px;'><div id='group'></div><button id='listselect_collapse' class='btn btn-small' style='width: 612px; height: 29px;' onclick='if(document.getElementById(\"group\").style.display==\"none\"){this.firstChild.className=\"icon-chevron-up\";document.getElementById(\"group\").style.display=\"\";}else{this.firstChild.className=\"icon-chevron-down\";document.getElementById(\"group\").style.display=\"none\";}'><i class='icon-chevron-up'></i></button></div><div id='param_container'>"+query_params+"</div><div id='heatmap_target'></div>";
	
	var rend;
	if (widget.listselect) {
	    rend = Retina.RendererInstances.listselect[widget.listselect];
	    rend.settings.target = document.getElementById('group');
	    rend.settings.synchronous = widget.offlineMode;
	    rend.settings.navigation_url = widget.offlineMode ? null : stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs';
	    if (widget.offlineMode) {
		rend.settings.data = widget.mgData;
	    } else {
		rend.settings.data = [];
	    }
	} else {
	    rend = Retina.Renderer.create("listselect", { target: document.getElementById('group'),
							  multiple: true,
							  data: [],
							  filter_attribute: 'name',
							  asynch_filter_attribute: 'name',
							  asynch_limit: 100,
							  synchronous: widget.offlineMode,
							  navigation_url: widget.offlineMode ? null : stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs',
							  value: "id",
							  callback: function (data) {
							      widget = Retina.WidgetInstances.enam[1];
							      
							      if (document.getElementById("group").style.display != 'none') {
								  document.getElementById('listselect_collapse').click();
							      }

							      var avail = true;
							      for (var i=0;i<data.length;i++) {
								  if (! stm.DataStore.profile.hasOwnProperty(data[i]+"_"+widget.type+"_"+widget.source)) {
								      avail = false;
								      break;
								  }
								  if (! stm.DataStore.metagenome.hasOwnProperty(data[i])) {
								      avail = false;
								      break;
								  }
							      }
							      if (! avail && widget.offlineMode) {
								  if (confirm("The data you are requesting is not available offline.\nWould you like to switch to online mode?")) {
								      Retina.WidgetInstances.enam[1].offlineMode = false;
								      document.getElementById('olbutton').setAttribute('class', 'btn btn-success');
								      document.getElementById('olbutton').innerHTML = "online";
								      var rend = Retina.RendererInstances.listselect[widget.listselect];
								      rend.settings.synchronous = false;
								      rend.settings.navigation_url = stm.Config.mgrast_api+'/metagenome?match=all&verbosity=mixs';
								      rend.settings.data = [];
								      var sel = {};
								      for (var i=0;i<data.length;i++) {
									  sel[data[i]] = true;
								      }
								      rend.settings.selection = sel;
								      rend.render();
								      rend.update_data({},1);
								  } else {
								      alert('data download cancelled');
								      return;
								  }
							      }

							      document.getElementById('loading_status').innerHTML = '<div class="alert alert-block alert-info">\
<button type="button" class="close" data-dismiss="alert">×</button>\
<h4><img src="images/loading.gif"> Please wait...</h4>\
<p>The data to be displayed is currently loading.</p>\
<div class="progress" style="margin-top: 10px;margin-bottom:0px;"><div class="bar" id="pbar" style="width: 0%;"></div></div>\
</div>';

							      var promises = [];
							      for (var i=0;i<data.length;i++) {
								  if (! stm.DataStore.profile.hasOwnProperty(data[i]+"_"+widget.type+"_"+widget.source)) {
								      promises.push(stm.get_objects({"type": "profile", "id": data[i], "options": {"type": widget.type, "source": widget.source }}));
								  }
								  if (! stm.DataStore.metagenome.hasOwnProperty(data[i])) {
								       promises.push(stm.get_objects({"type": "metagenome", "id": data[i], "options": {"verbosity": "metadata" }}));
								  }
							      }
							      var percent = promises.length ? 100 / promises.length : 100;
							      for (var i=0;i<promises.length;i++) {
								  promises[i].then(function(){
								      var curr = parseFloat(document.getElementById('pbar').style.width);
								      curr += percent;
								      document.getElementById('pbar').style.width = curr+"%";
								  });
							      }
							      jQuery.when.apply(this, promises).then(function() {
								  document.getElementById('loading_status').innerHTML = "";
								  if (document.getElementById("group").style.display != 'none') {
								      document.getElementById('listselect_collapse').click();
								  }
								  widget.ids = data;
								  mgs = [];
								  for (var i=0;i<widget.ids.length;i++) {
								      mgs.push(stm.DataStore.metagenome[widget.ids[i]].name + " ("+widget.ids[i]+")");
								  }
								  document.getElementById('currmgs').innerHTML = mgs.join('<br>');
								  widget.prepareData(1);
								  widget.drawHeatmap(1);
							      });
							  },
							  filter: ["id", "name", "project_id", "project_name", "PI_lastname", "biome", "feature", "material", "env_package_type", "location", "country", "longitude", "latitude", "collection_date", "sequence_type", "seq_method", "status", "created"] });
	}

	if (widget.offlineMode) {
	    rend.settings.data = widget.mgData;
	}
	rend.render();
	if (! widget.offlineMode) {
	    rend.update_data({},1);
	}
	widget.listselect = rend.index;
	if (Retina.WidgetInstances.hasOwnProperty('login')) {
	    Retina.WidgetInstances.login[1].callback = function() {
		rend.update_data({},1);
	    };
	}
    };

    widget.typeSelect = function (index) {
	widget = Retina.WidgetInstances.enam[index];

	widget.filter = [];
	widget.updateFilterDisplay(index);
	var opts = "";
	var lvl_opts = "";
	if (document.getElementById('type_select').selectedIndex == 1) {
	    widget.type = "organism";
	    widget.maxlevel = 7;
	    for (var i=0;i<widget.org.length;i++) {
		opts += "<option>"+widget.org[i]+"</option>";
	    }
	    for (var i=0;i<widget.org_lvl.length;i++) {
		lvl_opts += "<option value='"+i+"'>"+widget.org_lvl[i]+"</option>";
	    }
	} else {
	    widget.type = "function";
	    widget.maxlevel = 3;
	    for (var i=0;i<widget.func.length;i++) {
		opts += "<option>"+widget.func[i]+"</option>";
	    }
	    for (var i=0;i<widget.func_lvl.length;i++) {
		lvl_opts += "<option value='"+i+"'>"+widget.func_lvl[i]+"</option>";
	    }
	}

	document.getElementById('source_select').innerHTML = opts;
	document.getElementById('level_select').innerHTML = lvl_opts;
	widget.source = document.getElementById('source_select').options[0].text;
	widget.level = 0;
    };
    
    widget.reload = function (index) {
	widget = Retina.WidgetInstances.enam[index];

	if (document.getElementById('level_select').options[document.getElementById('level_select').selectedIndex].value != widget.level) {
	    widget.filter = widget.filter.slice(0, document.getElementById('level_select').options[document.getElementById('level_select').selectedIndex].value + 1)
	    widget.updateFilterDisplay(index);
	}
	var md = document.getElementById('md_attribute');
	if (md && md.options[md.selectedIndex].text == "-") {
	    widget.md_attribute = null;
	} else {
	    if (md) {
		widget.md_attribute = md.options[md.selectedIndex].text;
	    }
	}
	widget.level = document.getElementById('level_select').options[document.getElementById('level_select').selectedIndex].value;
	widget.evalue = document.getElementById('evalue').value;
	widget.alignmentLength = document.getElementById('alignment').value;
	widget.identity = document.getElementById('identity').value;
	document.getElementById('listselect_submit_button'+widget.listselect).click();
    };

    widget.prepareData = function (index) {
	widget = Retina.WidgetInstances.enam[index];

	widget.evalue = parseFloat(widget.evalue);
	widget.identity = parseFloat(widget.identity);
	widget.alignmentLength = parseFloat(widget.alignmentLength);

	// get the metadata
	var common = {};
	
	// whitelist of metadata groups to parse
	var whitelist = [ 'env_package', 'library', 'sample' ];

	// go through each selected metagenome
	for (var i=0;i<widget.ids.length;i++) {
	    var mg = stm.DataStore.metagenome[widget.ids[i]].metadata;

	    if (! mg) {
		continue;
	    }

	    // iterate over the whitelist groups in the metagenomes metadata
	    for (var h=0;h<whitelist.length;h++) {
		if (mg.hasOwnProperty(whitelist[h])) {
		    for (var j in mg[whitelist[h]].data) {
			if (mg[whitelist[h]].data.hasOwnProperty(j)) {
			    
			    // record the values for the metadata in a flat hash
			    // keep count of how many metagenomes have this property
			    if (! common.hasOwnProperty(j)) {
				common[j] = { count: 0, data: {} };
			    }
			    common[j].count++;
			    common[j].data[widget.ids[i]] = mg[whitelist[h]].data[j];
			}
		    }
		}
	    }
	}

	// delete every property that is not common across all selected metagenomes
	var metadata = [];
	for (var i in common) {
	    if (common.hasOwnProperty(i)) {
		if (common[i].count == widget.ids.length) {
		    metadata.push(i);
		} else {
		    delete common[i];
		}
	    }
	}
	widget.common_metadata = common;
	metadata = metadata.sort();
	var mdselect = "<select id='md_attribute' onchange='Retina.WidgetInstances.enam["+index+"].reload("+index+");'><option>-</option>";
	for (var i=0;i<metadata.length;i++) {
	    var sel = "";
	    if (widget.md_attribute == metadata[i]) {
		sel = " selected";
	    }
	    mdselect += "<option"+sel+">"+metadata[i]+"</option>";
	}
	mdselect += "</select>";
	document.getElementById('metadata').innerHTML = mdselect;

	// get the data from the DataStore
	var rows = [];
	var matrix = [];
	var columns = [];
	var rid = {};
	var col_sum = [];
	for (var i=0;i<widget.ids.length;i++) {
	    if (widget.md_attribute) {
		columns.push(common[widget.md_attribute].data[widget.ids[i]]);
	    } else {
		columns.push(stm.DataStore.metagenome[widget.ids[i]].id);
	    }
	    var d = stm.DataStore.profile[widget.ids[i]+"_"+widget.type+"_"+widget.source];
	    for (var h=0;h<d.data.length;h++) {

		// record total hits per sample for normalization
		if (h==0) {
		    col_sum[i] = d.data[h][0];
		} else {
		    col_sum[i] += d.data[h][0];
		}
		
		// apply level filter
		var t = widget.type == "function" ? "ontology" : "taxonomy";
		if (widget.filter) {
		    var skip = false;
		    for (var j=0;j<widget.filter.length;j++) {
			if (widget.filter[j]) {
			    if (widget.filter[j].type == "in" && ! widget.filter[j].values[d.rows[h].metadata[t][j]]) {
				skip = true;
			    } else if (widget.filter[j].type == "out" && widget.filter[j].values[d.rows[h].metadata[t][j]]) {
				skip = true;
			    }
			}
		    }
		    if (skip) {
			continue;
		    }
		}

		// filter: abundance, e-value, percent identity, alignment length
		if (Math.abs(d.data[h][1]) >= widget.evalue && d.data[h][2] >= widget.identity && d.data[h][3] >= widget.alignmentLength) {
		    if (! rid.hasOwnProperty(d.rows[h].metadata[t][widget.level])){
			rid[d.rows[h].metadata[t][widget.level]] = rows.length;
			matrix[rows.length] = [];
			for (var j=0;j<widget.ids.length;j++) {
			    matrix[rows.length].push(0);
			}
			rows.push(d.rows[h].metadata[t][widget.level]);
		    }
		    matrix[rid[d.rows[h].metadata[t][widget.level]]][i] += d.data[h][0];
		}
	    }
	}

	// calculate column normalization factors
	var max_sum = 0;
	for (var i=0;i<col_sum.length;i++) {
	    if (col_sum[i] > max_sum) {
		max_sum = col_sum[i];
	    }
	}
	var colfactor = [];
	for (var i=0;i<col_sum.length;i++) {
	    colfactor[i] = max_sum / col_sum[i];
	}

	// normalize, then calculate the min and max for each row
	var mins = [];
	var maxs = [];
	for (var i=0;i<matrix.length;i++) {
	    for (var h=0;h<matrix[i].length;h++) {
		matrix[i][h] = colfactor[h] * matrix[i][h];
		if (mins[i] == null || mins[i] > matrix[i][h]) {
		    mins[i] = matrix[i][h];
		}
		if (maxs[i] == null || maxs[i] < matrix[i][h]) {
		    maxs[i] = matrix[i][h];
		}
	    }
	}

	widget.rawHeatmapData = [];
	for (var i=0;i<matrix.length;i++) {
	    widget.rawHeatmapData.push(matrix[i].slice());
	}

	// scale to 0-1
	for (var i=0;i<matrix.length;i++) {
	    for (var h=0;h<matrix[i].length;h++) {
		if (matrix[i][h] > 0) {
		    matrix[i][h] = 1 / maxs[i] * matrix[i][h];
		}
	    }
	}

	widget.heatmapData = { rows: rows, columns: columns, data: matrix };
    };

    widget.drawHeatmap = function (index) {
	widget = Retina.WidgetInstances.enam[index];

	if (! document.getElementById('heatmap_target')) {
	    widget.render_menu(index);
	    return;
	}

	if (widget.heatmap) {
	    widget.heatmap.settings.target = document.getElementById('heatmap_target');
	} else {
	    widget.heatmap = Retina.Renderer.create("heatmap", {
		target: document.getElementById('heatmap_target'),
		rowClicked: widget.heatmapRowClicked,
		cellHovered: widget.heatmapCellHovered,
		legend_height: 150,
		legend_width: 1000,
		width: 0,
		height: 0 });
	}
	
	widget.heatmap.settings.data = widget.heatmapData;
	widget.heatmap.settings.width = 0;
	widget.heatmap.settings.height = 0;
	widget.heatmap.render();
    };

    widget.heatmapRowClicked = function (row) {
	var index = 1;
	widget = Retina.WidgetInstances.enam[index];
	
	if (widget.level < widget.maxlevel) {
	    widget.filter[widget.level] = { type: "in", values: {}};
	    widget.filter[widget.level].values[widget.heatmap.settings.data.rows[widget.heatmap.settings.data.rowindex[row]-1]] =  true;
	    widget.updateFilterDisplay(index);
	    widget.level++;
	    document.getElementById('level_select').selectedIndex = widget.level;
	    widget.prepareData(index);
	    widget.drawHeatmap(index);
	}
    };

    widget.heatmapColClicked = function (params) {
    };

    widget.heatmapCellHovered = function (params) {
	var index = 1;
	widget = Retina.WidgetInstances.enam[index];
	if (params.over) {
	    jQuery(params.cell).attr('title', widget.heatmap.settings.data.columns[widget.heatmap.settings.data.colindex[params.col]-1]+" - "+widget.heatmap.settings.data.rows[widget.heatmap.settings.data.rowindex[params.row]-1]+": "+widget.heatmap.settings.data.data[widget.heatmap.settings.data.rowindex[params.row]-1][widget.heatmap.settings.data.colindex[params.col]-1]);
	    var id = widget.ids[widget.heatmap.settings.data.colindex[params.col]-1];
	    var mgname =  stm.DataStore.metagenome[id].name;
	    var row = widget.heatmap.settings.data.rows[widget.heatmap.settings.data.rowindex[params.row]-1];
	    var raw_value = widget.rawHeatmapData[widget.heatmap.settings.data.rowindex[params.row]-1][widget.heatmap.settings.data.colindex[params.col]-1];
	    var normalized_value = widget.heatmapData.data[widget.heatmap.settings.data.rowindex[params.row]-1][widget.heatmap.settings.data.colindex[params.col]-1];
	    
	    document.getElementById('currcell').innerHTML = "<b>column:</b> "+mgname+" ("+id+")<br><b>row:</b> "+row+"<br><b>value:</b> "+raw_value.formatString()+" ("+normalized_value.toFixed(4)+")";
	}
    };

    widget.removeSelected = function(index, inout) {
	widget = Retina.WidgetInstances.enam[index];

	var rows = widget.heatmap.settings.selectedRows;
	if (! (inout == "out" && widget.filter[widget.level] && widget.filter[widget.level].type == "out")) {
	    widget.filter[widget.level] = { type: inout, values: {} };
	}
	var numrows = 0;
	for (var i in rows) {
	    var value = widget.heatmap.settings.data.rows[widget.heatmap.settings.data.rowindex[i]-1];
	    widget.filter[widget.level].values[value] = true;
	    numrows++;
	}
	if (numrows) {
	    widget.clearSelection(index);
	    widget.reload(index);
	    widget.updateFilterDisplay(index);
	}
    };

    widget.clearSelection = function (index) {
	widget = Retina.WidgetInstances.enam[index];

	widget.heatmap.settings.selectedRows = [];
	widget.heatmap.render();
    };

    widget.updateFilterDisplay = function(index) {
	widget = Retina.WidgetInstances.enam[index];

	var ftext = "";
	for (var i=0;i<widget.filter.length;i++) {
	    if (widget.filter[i]) {
		ftext += "<i class='icon-remove-circle' style='cursor: pointer; float: right; opacity: 0.5;' title='remove filter' onclick='Retina.WidgetInstances.enam["+index+"].filter["+i+"]=null;Retina.WidgetInstances.enam["+index+"].updateFilterDisplay("+index+");Retina.WidgetInstances.enam["+index+"].reload("+index+");'></i> <b>"+document.getElementById('level_select').options[i].text + " - " + (widget.filter[i].type=="in" ? "only show" : "exclude") + ":</b><br>";
		var cats = [];
		for (var h in widget.filter[i].values) {
		    if (widget.filter[i].values.hasOwnProperty(h)) {
			cats.push(h);
		    }
		}
		cats = cats.sort();
		ftext += cats.join("<br>");
		ftext += "<br>";
	    }
	}

	document.getElementById('currfilter').innerHTML = ftext;
    };

    widget.offlineModeButton = function () {
	var widget = Retina.WidgetInstances.enam[1];
	var html = "<button id='olbutton' style='position: absolute; top: 13px; right: 200px; z-index: 10000;' class='btn " + (widget.offlineMode ? "btn-danger" : "btn-success") + "' onclick='Retina.WidgetInstances.enam[1].switchOfflineMode();'>"+(widget.offlineMode ? "offline" : "online")+"</button>";
	return html;
    };

    widget.switchOfflineMode = function () {
	var widget = Retina.WidgetInstances.enam[1];
	if (widget.offlineMode) {
	    widget.offlineMode = false;
	} else {
	    widget.offlineMode = true;
	}
	widget.display();
    };

})();

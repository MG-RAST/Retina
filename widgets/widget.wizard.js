(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Experimental Design Wizard",
                name: "wizard",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });

    widget.setup = function () {
	return [ Retina.add_renderer({"name": "heatmap", "resource": "renderers/",  "filename": "renderer.heatmap.js" }),
		 Retina.load_renderer("heatmap"),
		 Retina.add_renderer({"name": "listselect", "resource": "renderers/",  "filename": "renderer.listselect.js" }),
		 Retina.load_renderer("listselect"),
		 Retina.add_renderer({"name": "table", "resource": "renderers/",  "filename": "renderer.table.js" }),
		 Retina.load_renderer("table"),
		 Retina.add_renderer({"name": "plot", "resource": "renderers/",  "filename": "renderer.plot.js" }),
		 Retina.load_renderer("plot"),
		 Retina.add_renderer({"name": "graph", "resource": "renderers/",  "filename": "renderer.graph.js" }),
		 Retina.load_renderer("graph"),
		 Retina.add_renderer({"name": "deviationplot", "resource": "renderers/",  "filename": "renderer.deviationplot.js" }),
		 Retina.load_renderer("deviationplot"),
		 Retina.add_renderer({"name": "boxplot", "resource": "renderers/",  "filename": "renderer.boxplot.js" }),
		 Retina.load_renderer("boxplot")
	       ];
    };
    
    widget.ids = [];
    widget.table = null;
    widget.stats_loaded = false;

    widget.display = function (wparams) {
	widget = this;
	var index = widget.index;

	var target = wparams.target;
	target.innerHTML = "";

	if (! stm.DataStore.hasOwnProperty('metagenome')) {
	    var progress = document.createElement('div');
	    progress.innerHTML = '<div class="alert alert-block alert-info" id="progressIndicator" style="position: absolute; top: 250px; width: 400px; right: 38%;">\
<button type="button" class="close" data-dismiss="alert">×</button>\
<h4><img src="images/loading.gif"> Please wait...</h4>\
<p>The data to be displayed is currently loading.</p>\
<p id="progressBar"></p>\
</div>';
	    target.appendChild(progress);
	    stm.get_objects( { type: 'metagenome', options: { verbosity: 'migs', limit: 10 } } ).then(function(){widget.display(wparams);});
	    return;
	}
	
	var metagenome_data = [];
	for (i in stm.DataStore["metagenome"]) {
	    if (stm.DataStore["metagenome"].hasOwnProperty(i)) {
		var md = { "name": stm.DataStore["metagenome"][i]["name"],
			   "id": i,
			   "project": stm.DataStore["metagenome"][i]["project"],
			   "lat/long": stm.DataStore["metagenome"][i]["latitude"]+"/"+stm.DataStore["metagenome"][i]["longitude"],
			   "location": stm.DataStore["metagenome"][i]["location"]+" - "+stm.DataStore["metagenome"][i]["country"],
			   "collection date": stm.DataStore["metagenome"][i]["collection_date"],
			   "biome": stm.DataStore["metagenome"][i]["biome"],
			   "feature": stm.DataStore["metagenome"][i]["feature"],
			   "material": stm.DataStore["metagenome"][i]["material"],
			   "package": stm.DataStore["metagenome"][i]["package"],
			   "sequencing method": stm.DataStore["metagenome"][i]["seq_method"]
			 };
		metagenome_data.push(md);
	    }
	}

	// we do not yet have metagenomes selected, show the select
	if (widget.ids.length == 0) {
	    var wrapper = document.createElement('div');
	    wrapper.setAttribute('class', 'container');
	    wrapper.setAttribute('style', 'width: 640px;');

	    target.appendChild(wrapper);

	    var title = document.createElement('div');
	    var select = document.createElement('div');

	    wrapper.appendChild(title);
	    wrapper.appendChild(select);

	    title.innerHTML = "<h2>Welcome to the Experimental Design Wizard</h2>\
<p style='width: 600px; margin-top: 20px; margin-bottom: 20px;'>\
This wizard was designed to help users to perform comparative analyses on the annotation results (abundance profiles) of multiple samples.<br>\
<button type='button' class='btn btn-primary' data-toggle='collapse' data-target='#more_info' style='height: 40px; position: relative; left: 200px; margin-top: 20px;'>\
  What can this wizard do?\
</button>\
</p>\
<div id='more_info' class='collapse' style='width: 600px;'>\
<p>The wizard will help you to<br>\
<ul>\
    <li>select sample for analysis (from your data as well as all available public data)</li>\
    <li>allow you to determine if any of the samples exhibit quality issues that should preclude them from analysis</li>\
    <li>place your samples into groups based on\
        <ul>\
            <li>metadata</li>\
            <li>preliminary analyses/visualizations (e.g. PCoA and heatmap-dendrogram)</li>\
            <li>arbitrary groupings</li>\
            <li>see if your data benefit from normalization/standardization</li>\
        </ul>\
    </li>\
    <li>perform comparative analyses</li>\
        <ul>\
            <li>PCoA</li>\
            <li>heatmap-dendrogram</li>\
        </ul>\
    </li>\
    <li>perform statistical analyses (to identify functions or taxa that exhibit the most significant differences\
        <ul>\
            <li>parametric and non-parametric tests</li>\
            <li>control of FDR through p-value adjustment and/or q-value analysis</li>\
        </ul>\
    </li>\
    <li>use statistical outputs to subselect data for more detailed analyses</li>\
</ul>\
</p>\
</div>\
<h3 style='margin-bottom: 20px;'>select your samples</h3>";

	    Retina.Renderer.create("listselect", { target: select,
						   multiple: true,
						   data: metagenome_data,
						   value: "id",
						   callback: function (data) {
						       widget.ids = data;
						       widget.display(wparams);
						   },
						   filter: [ "name", "id", "project", "lat/long", "location", "collection date", "biome", "feature", "material", "package", "sequencing method" ] }).render();
	}
	
	// we have metagenomes, show the wizard
	else {
	    
	    // check if all data is loaded
	    if (! widget.stats_loaded) {
		
		// make a promise list
		var num_resolved = 0;
		var total = widget.ids.length * 3;
		var stats_promises = [];
		for (i=0; i<widget.ids.length; i++) {
		    stats_promises.push(stm.get_objects({ "type": "metagenome_statistics", "id": widget.ids[i], options: { verbosity: 'full' } }).then(function(){ num_resolved++; document.getElementById('stats_progress').innerHTML = num_resolved + " of " + total; document.getElementById('stats_progress_bar').style.width = parseInt(num_resolved / total * 100)+"%"; }));
		    stats_promises.push(stm.get_objects({ "type": "abundanceprofile", "id": widget.ids[i], options: { "source": "Subsystems", "type": "function" } }).then(function(){ num_resolved++; document.getElementById('stats_progress').innerHTML = num_resolved + " of " + total; document.getElementById('stats_progress_bar').style.width = parseInt(num_resolved / total * 100)+"%"; }));
		    stats_promises.push(stm.get_objects({ "type": "abundanceprofile", "id": widget.ids[i], options: { "source": "M5RNA", "type": "organism" } }).then(function(){ num_resolved++; document.getElementById('stats_progress').innerHTML = num_resolved + " of " + total; document.getElementById('stats_progress_bar').style.width = parseInt(num_resolved / total * 100)+"%"; }));
		}
		
		jQuery.when.apply(this, stats_promises).then(function() {
		    widget.stats_loaded = true;
		    widget.display(wparams);
		});

		target.innerHTML = "<p style='position: absolute; top: 300px; left: 37%;'><img src='images/loading.gif'> loading stats <span id='stats_progress'></span></p>\
<div class='progress' style='width: 400px; position: absolute; top: 350px; left: 37%;'>\
  <div class='bar' id='stats_progress_bar' style='width: 0%;'></div>\
</div>";
		
		return;
	    }
	    
	    // create the layout elements
	    var layout_table = document.createElement('table');
	    var top = document.createElement('tr');
	    var bottom = document.createElement('tr');
	    var titles = document.createElement('tr');
	    
	    layout_table.appendChild(titles);
	    layout_table.appendChild(top);
	    layout_table.appendChild(bottom);
	    
	    var group_cell = document.createElement('td');
	    group_cell.setAttribute('style', "padding-right: 10px;");
	    var table_cell = document.createElement('td');
	    table_cell.setAttribute('style', "width: 100%;");
	    //var field_cell = document.createElement('td');
	    //field_cell.setAttribute('style', "padding-left: 10px;");
	    
	    top.appendChild(group_cell);
	    top.appendChild(table_cell);
	    //top.appendChild(field_cell);
	    
	    var group_container = document.createElement('div');
	    group_cell.appendChild(group_container);
	    //var field_container = document.createElement('div');
	    //field_cell.appendChild(field_container);
	    
	    target.appendChild(layout_table);

	    // create the titles
	    titles.innerHTML = "<td><h3>select sample</h3></td><td><h3>sample overview</h3></td>";//<td style='padding-left: 10px;'><h3>select fields</h3></td>";
	    
	    // create the selection table
	    var tdata = [];
	    var metagenome_data = [];
	    for (i=0;i<widget.ids.length;i++) {
		var mg = stm.DataStore.metagenome[widget.ids[i]];
		tdata.push([ mg.id, mg.name, " - ", "-", parseInt(stm.DataStore.metagenome_statistics[widget.ids[i]].sequence_stats.alpha_diversity_shannon).formatString(2),"-" ]);
		metagenome_data.push({name: mg.name, id: mg.id});
	    }
	    var table_data = { data: tdata, header: [ "ID", "name", "user notes", "group", "alpha diversity", "include in analyses" ] };
	    var tab = widget.table = Retina.Renderer.create("table", { target: table_cell,
								       data: table_data,
								       rows_per_page: 6,
								       filter_autodetect: true,
								       sort_autodetect: true,
								       editable: { 2: true, 3: true, 5: true },
								       hide_options: true });
	    tab.render();
	    
	    // create the group select
	    var group_select = widget.group_select = Retina.Renderer.create("listselect", { target: group_container,
											    multiple: false,
											    data: metagenome_data,
											    no_button: true,
											    value: "id",
											    callback: function(data){
												widget.render_overview(data, index);
												widget.render_depth(data, index);
											    },
											    filter: [ "name", "id" ] });
	    group_select.render();
	    
	    // create the field select
	    // var field_data = widget.field_data = [ { name: "project" },
	    // 					   { name: "lat/long" },
	    // 					   { name: "location" },
	    // 					   { name: "collection date" },
	    // 					   { name: "biome" },
	    // 					   { name: "feature" },
	    // 					   { name: "material" },
	    // 					   { name: "package" },
	    // 					   { name: "sequencing method" },
	    // 					   { name: "DRISEE score" },
	    // 					   { name: "alpha diversity" } ];
	    // var field_select = widget.field_select = Retina.Renderer.create("listselect", { target: field_container,
	    // 										    multiple: false,
	    // 										    data: field_data,
	    // 										    value: "id",
	    // 										    filter: [ "name" ] });
	    // field_select.render();
	    
	    // do the bottom part
	    bottom.innerHTML = '<td colspan=3 style="padding-top: 10px;">\
  <div class="tabbable">\
    <ul class="nav nav-tabs" id="tab_list">\
       <li class="active"><a data-toggle="tab" href="#overview">Sample Overview</a></li>\
       <li><a data-toggle="tab" href="#depth" onclick="if(! Retina.WidgetInstances.wizard['+index+'].depth_graph){document.getElementById(\'depth\').className=\'tab-pane active\';Retina.WidgetInstances.wizard['+index+'].render_depth(\''+widget.ids[0]+'\', '+index+');}">Sequence Depth Estimation</a></li>\
       <li><a data-toggle="tab" href="#qc">Abundance Distributions</a></li>\
       <li><a data-toggle="tab" href="#pcoa">PCoA</a></li>\
       <li><a data-toggle="tab" href="#stats">Result</a></li>\
    </ul>\
     \
    <div id="tab_div" class="tab-content" style="overflow: visible;">\
       <div class="tab-pane active" id="overview" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="depth" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="qc" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="pcoa" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="stats" style="padding-left: 15px;"><button class="btn" onclick="Retina.WidgetInstances.wizard[1].show_result();">calculate</button></div>\
    </div>\
  </div>\
</td>';
	    
	    // call the tab rendering
	    widget.render_overview(widget.ids[0], index);
	    widget.render_qc_distribution(index);
	    widget.render_pcoa(index);
	}
    };

    widget.render_depth = function (id, index) {
	if (document.getElementById('depth').className == 'tab-pane active') {
	    widget = Retina.WidgetInstances.wizard[index];
	    
	    var disp = document.getElementById('depth');
	    
	    var genome_size = document.getElementById('depth_genomesize') ? parseInt(document.getElementById('depth_genomesize').value) : 5000000;
	    var coverage = document.getElementById('depth_coverage') ? parseInt(document.getElementById('depth_coverage').value) : 30;
	    var sequence_size = genome_size * coverage;
	    var level = 3;
	    var data = widget.extract_data({ ids: [ id ], type: "organism", level: level });
	    var sum = 0;
	    var max = 0;
	    for (i=0;i<data.matrix_data.length;i++) {
		sum += data.matrix_data[i][0];
		if (data.matrix_data[i][0] > max) {
		    max = data.matrix_data[i][0];
		}
	    }
	    var graph_data = [];
	    for (i=0;i<data.matrix_data.length;i++) {
		graph_data.push(Math.round(sequence_size / (data.matrix_data[i][0] / sum)));
	    }
	    
	    var name = stm.DataStore.metagenome[id].name;
	    disp.innerHTML = "<h3>"+name+"</h3><p>The graph below shows the estimated sequence depth required to obtain the specified coverage of each taxa.</p><div id='depth_result' style='float: left;'></div><div style='float: left;'><p>coverage</p> <input type='text' value='"+coverage+"' id='depth_coverage'><br><p>average genome size</p> <div class='input-append'><input type='text' value='"+genome_size+"' id='depth_genomesize'><button class='btn' onclick='Retina.WidgetInstances.wizard[1].render_depth(\""+id+"\", "+index+");' style='margin-left: 15px;'>calculate</button></div></div>";
	    
	    var rend = widget.depth_graph = Retina.Renderer.create("graph", { target: document.getElementById('depth_result'), x_labels: data.rows, data: [ { name: name, data: graph_data, fill: '#0088CC' } ], x_labels_rotation: -60, chartArea: [ 0.1, 0.1, 0.95, 0.6 ], height: 500, short_axis_labels: true });
	    rend.render();
	}
    };

    widget.render_qc_distribution = function (index, distribution) {
	widget = Retina.WidgetInstances.wizard[index];

	var display_area = document.getElementById('qc');
	var menu = document.createElement('div');
	menu.setAttribute('style', 'margin-bottom: 20px;');
	var display = document.createElement('div');

	display_area.innerHTML = "";
	display_area.appendChild(menu);
	display_area.appendChild(display);

	var d1 = document.createElement('div');
	d1.setAttribute('style', 'margin-bottom: 20px;');
	var d2 = document.createElement('div');

	display.appendChild(d1);
	display.appendChild(d2);

	var active_t = "";
	var active_f = "";
	if (! distribution) {
	    display.innerHTML = "<h3 style='margin-left: 150px; margin-top: 100px;'>Please select taxonomy or function</h3>";
	}
	if (distribution && distribution == 'taxonomy') {
	    active_t = " active";
	}
	if (distribution && distribution == 'function') {
	    active_f = " active";
	}

	menu.innerHTML = '\
<div class="btn-group" data-toggle="buttons-radio">\
    <button type="button" class="btn'+active_t+'" onclick="Retina.WidgetInstances.wizard['+index+'].render_qc_distribution('+index+', \'taxonomy\');">Taxonomy</button>\
    <button type="button" class="btn'+active_f+'" onclick="Retina.WidgetInstances.wizard['+index+'].render_qc_distribution('+index+', \'function\');">Function</button>\
</div>';

	// a distribution was selected, draw the according visualization
	if (distribution) {
	    var result;
	    var res2;
	    if (distribution == 'function') {
		// result: { table_header, table_data, matrix_data, columns, rows };
		result = widget.extract_data({ ids: widget.ids, level: 3, normalize: true });
		res2 = widget.extract_data({ ids: widget.ids, level: 3, normalize: false });
	    } else {
		result = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: true });
		res2 = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: false });
	    }

	    var data = widget.transpose(result.matrix_data);
	    if (widget.distribution_box_1) {
		jQuery.extend(widget.distribution_box_1.settings, { data: data, target: d1 });
	    } else {
		widget.distribution_box_1 = Retina.Renderer.create('boxplot', { data: data, target: d1, title: 'raw abundance', titles: widget.ids, height: 400, minwidth: 400 });
	    }
	    widget.distribution_box_1.render();

	    var data2 = widget.transpose(res2.matrix_data);
	    if (widget.distribution_box_2) {
		jQuery.extend(widget.distribution_box_2.settings, { data: data2, target: d2 });
	    } else {
		widget.distribution_box_2 = Retina.Renderer.create('boxplot', { data: data2, target: d2, normalize_standardize: true, title: 'normalized-standardized abundance', titles: widget.ids, height: 400, minwidth: 400 });
	    }
	    widget.distribution_box_2.render();
	}
	
    };

    widget.plot_select = function (points) {
	var ps = Retina.WidgetInstances.wizard[1].pcoa.svg.plot.plotPoints;
	for (i=0;i<ps.length;i++) {
	    ps[i][0].svg.style.fill = "black";
	    ps[i][0].svg.style.stroke = "black";
	}
	var opts = "";
	for (i=0;i<points.length;i++) {
	    points[i].svg.style.fill = "red";
	    points[i].svg.style.stroke = "red";
	    opts += "<option>"+points[i].title+"</option>";
	}
	document.getElementById('pcoa_group_list').innerHTML = opts;
	Retina.WidgetInstances.wizard[1].pcoa_selection = points;
    };

    widget.assign_group = function () {
	var points = Retina.WidgetInstances.wizard[1].pcoa_selection;
	var pnames = {};
	for (i=0;i<points.length;i++) {
	    pnames[points[i].title] = 1;
	}
	var group = document.getElementById('pcoa_group_name').value;
	var table = Retina.WidgetInstances.wizard[1].table;
	for (i=0;i<table.settings.tdata.length;i++) {
	    if (pnames[table.settings.tdata[i].name]) {
		table.settings.tdata[i].group = group;
	    }
	}
	table.render();
    };

    widget.render_pcoa = function (index, distribution) {
	widget = Retina.WidgetInstances.wizard[index];

	var display_area = document.getElementById('pcoa');
	var menu = document.createElement('div');
	menu.setAttribute('style', 'margin-bottom: 20px;');
	var display = document.createElement('div');
	display.setAttribute('style', "float: left;");
	var grouper = document.createElement('div');
	grouper.setAttribute('style', "float: left; margin-left: 40px;");

	display_area.innerHTML = "";
	display_area.appendChild(menu);
	display_area.appendChild(display);
	display_area.appendChild(grouper);

	var active_t = "";
	var active_f = "";
	if (! distribution) {
	    display.innerHTML = "<h3 style='margin-left: 150px; margin-top: 100px;'>Please select taxonomy or function</h3>";
	}
	if (distribution && distribution == 'taxonomy') {
	    active_t = " active";
	}
	if (distribution && distribution == 'function') {
	    active_f = " active";
	}

	menu.innerHTML = '\
<div class="btn-group" data-toggle="buttons-radio">\
    <button type="button" class="btn'+active_t+'" onclick="Retina.WidgetInstances.wizard['+index+'].render_pcoa('+index+', \'taxonomy\');">Taxonomy</button>\
    <button type="button" class="btn'+active_f+'" onclick="Retina.WidgetInstances.wizard['+index+'].render_pcoa('+index+', \'function\');">Function</button>\
</div>';

	// a distribution was selected, draw the according visualization
	if (distribution) {

	    grouper.innerHTML = "<h3 style='margin-top: 35px;'>current selection</h3><select multiple id='pcoa_group_list' size=12></select><h3>group name</h3><div class='input-append'><input type='text' id='pcoa_group_name' value='group 1'><button class='btn' onclick='Retina.WidgetInstances.wizard[1].assign_group()'>assign group</button></div>";

	    var result;
	    if (distribution == 'function') {
		// result: { table_header, table_data, matrix_data, columns, rows };
		result = widget.extract_data({ ids: widget.ids, level: 3, normalize: true });
	    } else {
		result = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: true });
	    }
	    var data = [['']];
	    for (i=0;i<widget.ids.length;i++) {
		var idname = widget.ids[i].replace(/\./, "A");
		data[0].push(idname);
	    }
	    for (i=0;i<result.matrix_data.length;i++) {
		var row = [ i ];
		for (h=0; h<result.matrix_data[i].length;h++) {
		    row.push(result.matrix_data[i][h]);
		}
		data.push(row);
	    }

	    
	    jQuery.post( "http://api.metagenomics.anl.gov/pcoa/calc", JSON.stringify(data)).then(function(d){
		var retstr = JSON.parse(d);
		var retlist = retstr.result[0].replace(/\"/g, "").split(/\n/);
		var pcoa_result = { "components": [], "samples": {} };
		for (i=0;i<retlist.length;i++) {
		    var row = retlist[i].split(/\t/)
		    if (row[0].match(/^PCO/)) {
			pcoa_result.components.push({ "val": parseFloat(row[1]), "min": null, "max": null });
		    } else {
			var cid = row[0].replace(/A/, ".");
			pcoa_result.samples[cid] = [];
			for (h=1;h<row.length;h++) {
			    var v = parseFloat(row[h]);
			    if ((pcoa_result.components[h - 1].min == null) || (pcoa_result.components[h - 1].min > v)) {
				pcoa_result.components[h - 1].min = v;
			    }
			    if ((pcoa_result.components[h - 1].max == null) || (pcoa_result.components[h - 1].max < v)) {
				pcoa_result.components[h - 1].max = v;
			    }
			    pcoa_result.samples[cid].push(v);
			}
		    }
		}

		var xcomp = 0;
		var ycomp = 1;
		var xmax = Math.ceil(pcoa_result.components[xcomp].max);
		var xmin = Math.floor(pcoa_result.components[xcomp].min);
		var ymax = Math.ceil(pcoa_result.components[ycomp].max);
		var ymin = Math.floor(pcoa_result.components[ycomp].min);
		var plot_data = { series: [], points: [] };
		for (i=0;i<widget.ids.length;i++) {
		    plot_data.series.push({ name: stm.DataStore.metagenome[widget.ids[i]].name, color: 'black', shape: 'circle', filled: true });
		    plot_data.points.push([{ x: pcoa_result.samples[widget.ids[i]][xcomp], y: pcoa_result.samples[widget.ids[i]][ycomp], title: stm.DataStore.metagenome[widget.ids[i]].name }]);
		}
		
	    	if (widget.pcoa) {
	    	    jQuery.extend(widget.pcoa.settings, {  x_min: xmin, x_max: xmax, y_min: ymin, y_max: ymax, data: plot_data, target: display });
		} else {
	    	    widget.pcoa = Retina.Renderer.create('plot', { data: plot_data, target: display, x_min: xmin, x_max: xmax, y_min: ymin, y_max: ymax, connected: false, show_legend: false, drag_select: Retina.WidgetInstances['wizard'][index].plot_select });
		}
		widget.pcoa.render();
		
	    });
	}
	
    };

    widget.transpose = function (data) {
	var transposed = [];
	for (i=0;i<data[0].length;i++) {
	    transposed.push([]);
	}
	for (i=0;i<data.length;i++) {
	    for (h=0;h<data[i].length;h++) {
		transposed[h][i] = data[i][h];
	    }
	}
	return transposed;
    }

    widget.extract_data = function (params) {
	var ids = params.ids;
	var normalize = params.normalize || false;
	var type = params.type || 'function';
	var level = params.level || 1;
	var source = (type == 'function') ? (params.source || 'Subsystems') : (params.source || 'M5RNA');
	var md_field = (type == 'function') ? "ontology" : "taxonomy";

	// generate a table header
	var theader = [];
	for (k=0; k<level; k++) {
	    theader.push("Level "+(k+1));
	}
	
	// extract the data from the api datastructure into a table structure
	var td = [];
	for (h=0;h<ids.length;h++) {
	    var data = stm.DataStore.abundanceprofile[ids[h]+"_"+type+"_"+source];
	    for (i=0;i<data.data.length;i++) {
		if (! td.hasOwnProperty(data.rows[i].metadata[md_field][level - 1])) {
		    td[data.rows[i].metadata[md_field][level - 1]] = [];
		    for (k=0; k<level; k++) {
			td[data.rows[i].metadata[md_field][level - 1]][k] = data.rows[i].metadata[md_field][k];
		    }
		    for (j=0;j<(ids.length);j++) {
			td[data.rows[i].metadata[md_field][level - 1]][j + level] = "0";
		    }
		}
		td[data.rows[i].metadata[md_field][level - 1]][h + level] = parseInt(td[data.rows[i].metadata[md_field][level - 1]][h + level]) + parseInt(data.data[i][0]);
	    }
	    
	    theader.push(stm.DataStore.metagenome[ids[h]].name);
	}

	// turn the data hash into an array
	var tdata = [];
	for (i in td) {
	    if (td.hasOwnProperty(i)) {
		tdata.push(td[i]);
	    }
	}

	// create a data matrix
	var hcols = [];
	var hrows = [];
	var hdata = [];
	var maxvals = [];
	var minvals = [];
	for (i=0;i<ids.length;i++) {
	    hcols.push(stm.DataStore.metagenome[ids[i]].name);
	    maxvals.push(0);
	    minvals.push(-1);
	}
	
	// fill the matrix and calculate min and max values
	for (i=0;i<tdata.length;i++) {
	    var desccol = tdata[i].length - ids.length - 1;
	    hrows.push(tdata[i][desccol]);
	    var hrow = [];
	    for (h=desccol+1; h<tdata[i].length;h++) {
		if (parseInt(tdata[i][h]) > maxvals[h-desccol-1]) {
		    maxvals[h-desccol-1] = parseInt(tdata[i][h]);
		}
		if ((minvals[h-desccol-1] == -1) || (minvals[h-desccol-1] > parseInt(tdata[i][h]))) {
		    minvals[h-desccol-1] = parseInt(tdata[i][h]);
		}
		hrow.push(parseInt(tdata[i][h]));
	    }
	    hdata.push(hrow);
	}

	// perform normalization
	if (normalize) {
	    for (i=0;i<hdata.length;i++) {
		for (h=0;h<hdata[i].length;h++) {
		    hdata[i][h] = hdata[i][h] / (maxvals[h] - minvals[h])
		}
	    }
	}

	return { table_header: theader, table_data: tdata, matrix_data: hdata, columns: hcols, rows: hrows };
    }

    widget.render_overview = function (id, index) {
	if (document.getElementById('overview').className == 'tab-pane active') {
	widget = Retina.WidgetInstances.wizard[index];

	document.getElementById('overview').innerHTML = '<h3 id="overview_header"></h3>\
<table><tr><td><div id="stats_overview_table"></div></td><td><div id="breakdown"></div></td></tr></table>\
<table style="width: 600px;">\
<tr><th align=left>Alpha Diversity (Shannon Index)</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.alpha_diversity_shannon).formatString(2)+'</td><td><div id="alphadiversity"></div></td></tr>\
<tr><th align=left>Mean DRISEE error</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.drisee_score_raw).formatString(2)+'</td><td><div id="drisee_dist"></div></td></tr>\
<tr><th align=left>Mean GC Content</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_content_preprocessed).formatString(2)+' %</td><td><div id="gc_dist"></div></td></tr>\
</table>\
<table><tr><td><div id="nuc_hist"></div></td><td><div id="drisee"></div></td></tr></table>\
<div id="rarefaction"></div>\
<table><tr><td><div id="seqlenu"></div></td><td><div id="seqlen"></div></td></tr></table>\
<table><tr><td><div id="gchistu"></div></td><td><div id="gchist"></div></td></tr></table>';

	// header
	document.getElementById('overview_header').innerHTML = stm.DataStore.metagenome[id].name;

	// stats
	var stats_space = document.getElementById('stats_overview_table');
	stats_space.innerHTML = '<p style="font-size: 15px;">Individual Sample Statistics</p>\
<table class="table" style="width: 600px;">\
 <thead>\
  <tr><td></td><th>Upload</th><th>Post QC</th></tr>\
 </thead>\
 <tbody>\
  <tr><th>number of base pairs</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.bp_count_raw).formatString(0)+' bp</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.bp_count_preprocessed).formatString(0)+' bp</td></tr>\
  <tr><th>number of reads</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_raw).formatString(0)+'</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_preprocessed).formatString(0)+'</td></tr>\
<tr><th>mean read length</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_length_raw).formatString(0)+' bp</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_length_preprocessed).formatString(0)+' bp</td></tr>\
  <tr><th>mean GC percent</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_content_raw).formatString(0)+'</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_content_preprocessed).formatString(0)+'</td></tr>\
  <tr><td></td><th>predicted features</th><th>alignment (identified)</th></tr>\
  <tr><th>protein</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_processed).formatString(0)+'</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_sims_aa).formatString(0)+'</td></tr>\
  <tr><th>tRNA</th><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_processed_rna).formatString(0)+'</td><td>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_sims_rna).formatString(0)+'</td></tr>\
  <tr><td></td><th colspan=2>Annotation</th></tr>\
  <tr><th>Identified Functional Categories</th><td colspan=2>'+parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_ontology).formatString(0)+'</td></tr>\
 </tbody>\
</table>';

    	// sequence distribution
    	var stats = stm.DataStore.metagenome_statistics[id].sequence_stats;
    	var breakdown_data = [ { name: 'Failed QC' , data: [ parseInt(stats.sequence_count_raw) - parseInt(stats.sequence_count_processed) ], fill: 'gray' },
			       { name: 'Unknown' , data: [ parseInt(stats.sequence_count_processed) - parseInt(stats.sequence_count_processed_aa) - parseInt(stats.sequence_count_sims_rna) ], fill: 'url(#fadeRed)' },
    			       { name: 'Unknown Protein' , data: [ parseInt(stats.sequence_count_processed_aa) - parseInt(stats.sequence_count_sims_aa) ], fill: 'url(#fadeYellow)' },
			       { name: 'Annotated Protein' , data: [ parseInt(stats.sequence_count_sims_aa) ], fill: 'url(#fadeGreen)' },
			       { name: 'ribosomal RNA' , data: [ parseInt(stats.sequence_count_sims_rna) ], fill: 'url(#fadeBlue)' } ];
	var bdsettings = { target: document.getElementById('breakdown'),
    			   data: breakdown_data,
    			   title: "Sequence Breakdown",
    			   show_legend: true,
			   legendArea: [ 0.7, 0.1, 0.97, 0.5 ],
			   legend_position: 'right',
			   width: 600,
    			   x_labels: [ '' ],
    			   type: "pie" };
	if (widget.breakdown) {
	    jQuery.extend(widget.breakdown.settings, bdsettings);
	} else {
	    widget.breakdown = Retina.Renderer.create("graph", bdsettings);
	}
    	widget.breakdown.render();
	
    	// nucleotide histogram
    	var nucprof_data = [ { name: 'A', data: [], fill: 'green', lineColor: 'green' },
    			     { name: 'T', data: [], fill: 'red', lineColor: 'red' },
    			     { name: 'C', data: [], fill: 'blue', lineColor: 'blue' },
    			     { name: 'G', data: [], fill: 'orange', lineColor: 'orange' },
    			     { name: 'N', data: [], fill: 'brown', lineColor: 'brown' } ];
    	var bp_prof = stm.DataStore.metagenome_statistics[id].qc.bp_profile.percents.data;
    	for (i=0; i<bp_prof.length; i++) {
    	    for (h=0; h<5; h++) {
    		nucprof_data[h].data.push(bp_prof[i][h+1]);
    	    }
    	}
    	var nucsettings = { target: document.getElementById('nuc_hist'),
    			    data: nucprof_data,
			    width: 600,
    			    title: "Nucleotide Histogram",
    			    x_title: 'bp position',
    			    x_labeled_tick_interval: parseInt(bp_prof.length / 10),
    			    x_tick_interval: parseInt(bp_prof.length / 10),
    			    show_legend: true,
    			    chartArea: [ 0.2, 0.1, 0.95, 350 ],
    			    type: "stackedArea",
    			    y_title: 'percentage' };
	if (widget.nuc) {
	    jQuery.extend(widget.nuc.settings, nucsettings);
	} else {
	    widget.nuc = Retina.Renderer.create("graph", nucsettings);
	}
    	widget.nuc.render();
	
    	// drisee
	if (stm.DataStore.metagenome_statistics[id].qc.drisee.percents.data) {
    	    var drisee_data = { series: [ { name: 'A', color: 'green' },
    					  { name: 'T', color: 'red' },
    					  { name: 'C', color: 'blue' },
    					  { name: 'G', color: 'orange' },
    					  { name: 'N', color: 'brown' },
    					  { name: 'InDel', color: 'black' },
    					  { name: 'Total', color: 'purple' }],
    				points: [ [], [], [], [], [], [], [] ] };
    	    var drisee_prof = stm.DataStore.metagenome_statistics[id].qc.drisee.percents.data;
    	    for (i=0; i<drisee_prof.length; i++) {
    		for (h=0; h<7; h++) {
    		    drisee_data.points[h].push({ x: drisee_prof[i][0], y: drisee_prof[i][h+1]});
    		}
    	    }
    	    var driseesettings = { target: document.getElementById('drisee'),
    				   data: drisee_data,
    				   title: 'DRISEE Error Profile',
    				   show_legend: true,
    				   legend_position: 'left',
    				   connected: true,
    				   show_dots: false,
				   width: 600,
    				   x_min: 0,
    				   x_max: drisee_prof[0][0] + drisee_prof.length - 1,
    				   x_title: "bp position",
    				   y_title: "percent error" };
	    if (widget.drisee) {
		jQuery.extend(widget.drisee.settings, driseesettings);
	    } else {
		widget.drisee = Retina.Renderer.create("plot", driseesettings);
	    }
    	    widget.drisee.render();
	}	    
	
    	// rarefaction curve
    	var rare_data = { series: [ { name: 'A', color: 'blue' } ],
    			  points: [ [] ] };
    	var rare_prof = stm.DataStore.metagenome_statistics[id].rarefaction;
    	var rmax_x = 0;
    	var rmax_y = 0;
    	for (i=0; i<rare_prof.length; i++) {
    	    rare_prof[i][0] = parseFloat(rare_prof[i][0]);
    	    rare_prof[i][1] = parseFloat(rare_prof[i][1]);
    	    if (rare_prof[i][0] > rmax_x) {
    		rmax_x = rare_prof[i][0];
    	    }
    	    if (rare_prof[i][1] > rmax_y) {
    		rmax_y = rare_prof[i][1];
    	    }
    	    rare_data.points[0].push({ x: rare_prof[i][0], y: rare_prof[i][1]});
    	}
    	var rarefactionsettings = { target: document.getElementById('rarefaction'),
    				    data: rare_data,
    				    title: 'Rarefaction Curve',
    				    show_legend: false,
    				    connected: true,
    				    show_dots: false,
				    width: 600,
    				    x_min: 0,
    				    x_max: rmax_x,
    				    y_min: 0,
    				    y_max: parseInt(rmax_y),
    				    x_title: "number of reads",
    				    y_title: "species count" };
	
	if (widget.rarefaction) {
	    jQuery.extend(widget.rarefaction.settings, rarefactionsettings);
	} else {
	    widget.rarefaction = Retina.Renderer.create("plot", rarefactionsettings);
	}
    	widget.rarefaction.render();

	// gc histogram upload
    	var gchistu_data = { series: [ { name: 'A', color: 'blue' } ],
    			     points: [ [] ] };
    	var gchistu_prof = stm.DataStore.metagenome_statistics[id].gc_histogram.upload;
    	var gumax_x = 0;
    	var gumax_y = 0;
    	for (i=0; i<gchistu_prof.length; i++) {
    	    gchistu_prof[i][0] = parseFloat(gchistu_prof[i][0]);
    	    gchistu_prof[i][1] = parseFloat(gchistu_prof[i][1]);
    	    if (gchistu_prof[i][0] > gumax_x) {
    		gumax_x = gchistu_prof[i][0];
    	    }
    	    if (gchistu_prof[i][1] > gumax_y) {
    		gumax_y = gchistu_prof[i][1];
    	    }
    	    gchistu_data.points[0].push({ x: gchistu_prof[i][0], y: gchistu_prof[i][1]});
    	}
    	var gchistusettings = { target: document.getElementById('gchistu'),
    				data: gchistu_data,
    				title: 'GC Historam Upload',
    				show_legend: false,
    				connected: true,
    				show_dots: false,
				width: 600,
    				x_min: 0,
    				x_max: gumax_x,
    				y_min: 0,
    				y_max: parseInt(gumax_y),
    				x_title: "GC",
    				y_title: "number of reads" };
	
	if (widget.gchistu) {
	    jQuery.extend(widget.gchistu.settings, gchistusettings);
	} else {
	    widget.gchistu = Retina.Renderer.create("plot", gchistusettings);
	}
    	widget.gchistu.render();

	// gc histogram post qc
    	var gchist_data = { series: [ { name: 'A', color: 'blue' } ],
    			    points: [ [] ] };
    	var gchist_prof = stm.DataStore.metagenome_statistics[id].gc_histogram.post_qc;
    	var gmax_x = 0;
    	var gmax_y = 0;
    	for (i=0; i<gchist_prof.length; i++) {
    	    gchist_prof[i][0] = parseFloat(gchist_prof[i][0]);
    	    gchist_prof[i][1] = parseFloat(gchist_prof[i][1]);
    	    if (gchist_prof[i][0] > gmax_x) {
    		gmax_x = gchist_prof[i][0];
    	    }
    	    if (gchist_prof[i][1] > gmax_y) {
    		gmax_y = gchist_prof[i][1];
    	    }
    	    gchist_data.points[0].push({ x: gchist_prof[i][0], y: gchist_prof[i][1]});
    	}
    	var gchistsettings = { target: document.getElementById('gchist'),
    			       data: gchist_data,
    			       title: 'GC Historam Post QC',
    			       show_legend: false,
    			       connected: true,
    			       show_dots: false,
			       width: 600,
    			       x_min: 0,
    			       x_max: gmax_x,
    			       y_min: 0,
    			       y_max: parseInt(gmax_y),
    			       x_title: "GC",
    			       y_title: "number of reads" };
	
	if (widget.gchist) {
	    jQuery.extend(widget.gchist.settings, gchistsettings);
	} else {
	    widget.gchist = Retina.Renderer.create("plot", gchistsettings);
	}
    	widget.gchist.render();

	// sequence length histogram upload
    	var seqlenu_data = { series: [ { name: 'A', color: 'blue' } ],
    			     points: [ [] ] };
    	var seqlenu_prof = stm.DataStore.metagenome_statistics[id].length_histogram.upload;
    	var sumax_x = 0;
    	var sumax_y = 0;
    	for (i=0; i<seqlenu_prof.length; i++) {
    	    seqlenu_prof[i][0] = parseFloat(seqlenu_prof[i][0]);
    	    seqlenu_prof[i][1] = parseFloat(seqlenu_prof[i][1]);
    	    if (seqlenu_prof[i][0] > sumax_x) {
    		sumax_x = seqlenu_prof[i][0];
    	    }
    	    if (seqlenu_prof[i][1] > sumax_y) {
    		sumax_y = seqlenu_prof[i][1];
    	    }
    	    seqlenu_data.points[0].push({ x: seqlenu_prof[i][0], y: seqlenu_prof[i][1]});
    	}
    	var seqlenusettings = { target: document.getElementById('seqlenu'),
    				data: seqlenu_data,
    				title: 'Sequence Length Histogram Upload',
    				show_legend: false,
    				connected: true,
    				show_dots: false,
				width: 600,
    				x_min: 0,
    				x_max: sumax_x,
    				y_min: 0,
    				y_max: parseInt(sumax_y),
    				x_title: "sequence length",
    				y_title: "number of reads" };
	
	if (widget.seqlenu) {
	    jQuery.extend(widget.seqlenu.settings,seqlenusettings);
	} else {
	    widget.seqlenu = Retina.Renderer.create("plot", seqlenusettings);
	}
    	widget.seqlenu.render();

	// sequence length histogram post qc
    	var seqlen_data = { series: [ { name: 'A', color: 'blue' } ],
    			    points: [ [] ] };
    	var seqlen_prof = stm.DataStore.metagenome_statistics[id].length_histogram.post_qc;
    	var smax_x = 0;
    	var smax_y = 0;
    	for (i=0; i<seqlen_prof.length; i++) {
    	    seqlen_prof[i][0] = parseFloat(seqlen_prof[i][0]);
    	    seqlen_prof[i][1] = parseFloat(seqlen_prof[i][1]);
    	    if (seqlen_prof[i][0] > smax_x) {
    		smax_x = seqlen_prof[i][0];
    	    }
    	    if (seqlen_prof[i][1] > smax_y) {
    		smax_y = seqlen_prof[i][1];
    	    }
    	    seqlen_data.points[0].push({ x: seqlen_prof[i][0], y: seqlen_prof[i][1]});
    	}
    	var seqlensettings = { target: document.getElementById('seqlen'),
    			       data: seqlen_data,
    			       title: 'Sequence Length Histogram Post QC',
    			       show_legend: false,
    			       connected: true,
    			       show_dots: false,
			       width: 600,
    			       x_min: 0,
    			       x_max: smax_x,
    			       y_min: 0,
    			       y_max: parseInt(smax_y),
    			       x_title: "sequence length",
    			       y_title: "number of reads" };
	
	if (widget.seqlen) {
	    jQuery.extend(widget.seqlen.settings,seqlensettings);
	} else {
	    widget.seqlen = Retina.Renderer.create("plot", seqlensettings);
	}
    	widget.seqlen.render();

	var alpha_data = [ parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.alpha_diversity_shannon) ];
	for (i=0;i<widget.ids.length;i++) {
	    if (widget.ids[i] == id) {
		continue;
	    }
	    alpha_data.push(parseFloat(stm.DataStore.metagenome_statistics[widget.ids[i]].sequence_stats.alpha_diversity_shannon));
	}
	var alphadiversitysettings = { target: document.getElementById('alphadiversity'), 
				       data: alpha_data };
	if (widget.alphadiversity) {
	    jQuery.extend(widget.alphadiversity.settings, alphadiversitysettings);
	} else {
	    widget.alphadiversity = Retina.Renderer.create("deviationplot", alphadiversitysettings);
	}
	widget.alphadiversity.render();

	var driseedist_data = [ parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.drisee_score_raw) ];
	for (i=0;i<widget.ids.length;i++) {
	    if (widget.ids[i] == id) {
		continue;
	    }
	    driseedist_data.push(parseFloat(stm.DataStore.metagenome_statistics[widget.ids[i]].sequence_stats.drisee_score_raw));
	}
	var driseedistsettings = { target: document.getElementById('drisee_dist'),
				   data: driseedist_data };
	if (widget.driseedist) {
	    jQuery.extend(widget.driseedist.settings, driseedistsettings);
	} else {
	    widget.driseedist = Retina.Renderer.create("deviationplot", driseedistsettings);
	}
	widget.driseedist.render();

	var gcdist_data = [ parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_content_preprocessed) ];
	for (i=0;i<widget.ids.length;i++) {
	    if (widget.ids[i] == id) {
		continue;
	    }
	    gcdist_data.push(parseFloat(stm.DataStore.metagenome_statistics[widget.ids[i]].sequence_stats.average_gc_content_preprocessed));
	}
	var gcdistsettings = { target: document.getElementById('gc_dist'),
			       data: gcdist_data };
	if (widget.gcdist) {
	    jQuery.extend(widget.gcdist.settings, gcdistsettings);
	} else {
	    widget.gcdist = Retina.Renderer.create("deviationplot", gcdistsettings);
	}
	widget.gcdist.render();
	}
    };

    widget.show_result = function () {
	widget = Retina.WidgetInstances.wizard[1];

	var display = document.getElementById('stats');
	display.innerHTML = "";
	var menu_space = document.createElement('div');
	var table_space = document.createElement('div');

	menu_space.innerHTML = '<button class="btn" onclick="Retina.WidgetInstances.wizard[1].show_result();">calculate</button>';
	menu_space.setAttribute('style', "margin-bottom: 20px;");

	display.appendChild(menu_space);
	display.appendChild(table_space);

	var t1 = widget.table.settings.tdata;
	var group_data = {};
	for (i=0;i<t1.length;i++) {
	    if (group_data.hasOwnProperty(t1[i]['group'])) {
		if (parseFloat(t1[i]['alpha diversity']) > parseFloat(group_data[t1[i]['group']].diversity)) {
		    group_data[t1[i]['group']].diversity = parseFloat(t1[i]['alpha diversity']);
		    group_data[t1[i]['group']].mgid = t1[i]['ID'];
		}
	    } else {
		group_data[t1[i]['group']] = { "diversity": parseFloat(t1[i]['alpha diversity']),
						     "mgid": t1[i]['ID'] };
	    }
	}
	var includes = {};
	for (i in group_data) {
	    if (group_data.hasOwnProperty(i)) {
		includes[group_data[i].mgid] = 1;
	    }
	}
	
	var tdata2 = [];
	for (i=0;i<widget.ids.length;i++) {
	    var mg = stm.DataStore.metagenome[widget.ids[i]];
	    var id = widget.ids[i];
	    tdata2.push([ mg.id, mg.name, stm.DataStore.metagenome[id].group ? stm.DataStore.metagenome[id].group : "-", parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.alpha_diversity_shannon).formatString(2), includes[mg.id] ? "<span style='color: green;'>include</span>" : "-" ]);
	}
	var table_data2 = { data: tdata2, header: [ "ID", "name", "group", "alpha diversity", "suggestion" ] };
	var tab2 = widget.result_table = Retina.Renderer.create("table", { target: table_space,
									   data: table_data2,
									   rows_per_page: 15,
									   sort_autodetect: true,
									   filter_autodetect: true,
									   editable: { 2: true, 3: true, 6: true },
									   hide_options: false });
	tab2.render();
    };
})();
(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Experimental Design Wizard",
                name: "wizard",
                author: "Tobias Paczian",
                requires: [ "rgbcolor.js" ]
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
	    jQuery.getJSON('data/mg_migs_public.json', function(data) {
		for (var d in data) {
                    if (data.hasOwnProperty(d)) {
			stm.load_data({"data": data[d], "type": d});
                    }
		}
		widget.display(wparams);
            }).fail( function() {
		stm.get_objects({"type": "metagenome", "options": {"status": "public", "verbosity": "migs", "limit": 0}}).then(function() {
                    widget.display(wparams);
		});
	    });
	    
	    //stm.get_objects( { type: 'metagenome', options: { verbosity: 'migs', limit: 0 } } ).then(function(){widget.display(wparams);});
	    //stm.get_objects( { type: 'metagenome', id: '4477840.3', options: { verbosity: 'migs', limit: 0 } } ).then(function(){stm.get_objects( { type: 'metagenome', id: '4478370.3', options: { verbosity: 'migs', limit: 0 } } ).then(function(){widget.display(wparams);})});
	    return;
	}
	
	var metagenome_data = [];
	for (i in stm.DataStore["metagenome"]) {
	    if (stm.DataStore["metagenome"].hasOwnProperty(i)) {
		stm.DataStore["metagenome"][i].group = '-';
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
			   "sequencing method": stm.DataStore["metagenome"][i]["seq_method"],
			   "sequencing type": stm.DataStore["metagenome"][i]["sequence_type"]
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

	    title.innerHTML = "<h2 style='margin-top: 50px;'>Welcome to the Experiment Design Wizard</h2>\
<p style='width: 600px; margin-top: 20px; margin-bottom: 20px;'>\
With the KBase metagenomics wizard, you can design your metagenomic sequencing experiment. Selecting samples for deep(er) sequencing based on a metadata and on inexpensive 16s data. The wizard assumes that you either already have the data describing your samples (metadata) or are willing to create a spreadsheet with this data using the GSC conventions<p><p>If you have already uploaded your sequences, you can select them below. Otherwise please proceed to the <a href='http://140.221.92.81:7051/' target=_blank>upload</a>.</p>";

	    title.innerHTML += "<h3 style='margin-bottom: 20px;'>select your samples</h3>";

	    Retina.Renderer.create("listselect", { target: select,
						   multiple: true,
						   data: metagenome_data,
						   value: "id",
						   callback: function (data) {
						       widget.ids = data;
						       widget.display(wparams);
						   },
						   filter: ["name", "id", "project", "lat/long", "location", "collection date", "biome", "feature", "material", "package", "sequencing method", "sequencing type"] }).render();
	}
	
	// we have metagenomes, show the wizard
	else {
	    
	    // check if all data is loaded
	    if (! widget.stats_loaded) {
		
		// make a promise list
		var num_resolved = 0;
		var total = widget.ids.length * 4;
		var stats_promises = [];
		for (i=0; i<widget.ids.length; i++) {
		    stats_promises.push(stm.get_objects({ "type": "metagenome", "id": widget.ids[i], options: { verbosity: 'full' } }).then(function(){ num_resolved++; document.getElementById('stats_progress').innerHTML = num_resolved + " of " + total; document.getElementById('stats_progress_bar').style.width = parseInt(num_resolved / total * 100)+"%"; }));
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
	    
	    var metagenome_data = [];
	    for (i=0;i<widget.ids.length;i++) {
	    	var mg = stm.DataStore.metagenome[widget.ids[i]];
	    	metagenome_data.push({name: mg.name, id: mg.id, group: "-"});
	    }

	    var group_select = widget.group_select = Retina.Renderer.create("listselect", { multiple: true,
	    										    data: metagenome_data,
	    										    value: "id",
	    										    filter: [ "name", "id", "group" ] });

	    var single_select = widget.single_select = Retina.Renderer.create("listselect", { multiple: false,
	    										     data: metagenome_data,
	    										     no_button: true,
	    										     value: "id",
	    										     filter: [ "name", "id" ] });
	    
	    // do the bottom part
	    target.innerHTML = '<td colspan=3 style="padding-top: 10px;">\
  <div class="tabbable">\
    <ul class="nav nav-tabs" id="tab_list">\
       <li class="active"><a onfocus="this.blur();" data-toggle="tab" href="#welcome">Get Started</a></li>\
       <li style="margin-bottom: -11px;"><a onfocus="this.blur();" data-toggle="tab" href="#depth" onclick="if(! Retina.WidgetInstances.wizard['+index+'].depth_graph){document.getElementById(\'depth\').className=\'tab-pane active\';Retina.WidgetInstances.wizard['+index+'].render_depth(null, null, '+index+');}">'+widget.number('A')+'Sequence Depth Estimation</a></li>\
       <li style="margin-bottom: -11px;"><a onfocus="this.blur();" data-toggle="tab" href="#pcoa" onclick="if(! Retina.WidgetInstances.wizard['+index+'].pcoa){document.getElementById(\'pcoa\').className=\'tab-pane active\';Retina.WidgetInstances.wizard['+index+'].render_pcoa('+index+');}">'+widget.number('B')+'Sample Groupings</a></li>\
       <li><a onfocus="this.blur();" data-toggle="tab" href="#overview" onclick="if(! Retina.WidgetInstances.wizard['+index+'].breakdown){document.getElementById(\'overview\').className=\'tab-pane active\';Retina.WidgetInstances.wizard['+index+'].render_overview(\''+widget.ids[0]+'\', '+index+');}">Sample Overview</a></li>\
       <li><a onfocus="this.blur();" data-toggle="tab" href="#qc" onclick="if(! Retina.WidgetInstances.wizard['+index+'].distribution_box_1){document.getElementById(\'qc\').className=\'tab-pane active\';Retina.WidgetInstances.wizard['+index+'].render_qc_distribution('+index+');}">Abundance Distributions</a></li>\
    </ul>\
     \
    <div id="tab_div" class="tab-content" style="overflow: visible;">\
<div class="tab-pane active span10" id="welcome" style="padding-left: 15px;"><h2 style="margin-bottom: 15px;">Getting started using the KBase Experiment Design Wizard</h2><p style="margin-bottom: 20px;">This wizard will help you to design your whole genome shotgun sequencing experiment. It uses information from your 16s amplicon data to predict the amount of sequencing you will need to recover a selected genome (or group of genomes) at your desired level of coverage.<br><br>This wizard is broken into two main sections.<br><br>The Sequence Depth Estimator will show you the distribution of taxa in your 16s sample, and will allow you to quickly calculate the amount of WGS sequencing it will take to recover desired genomes at a selected level of coverage.<br><br>The  Group Tool will allow you to explore samples in the context of biologically relevant groups.  You will be able to explore how well your samples group with respect to metadata, and combined with the Sequence Depth Estimator, select the best representative samples to pursue with WGS sequencing.<br><br>Additional tools (The Sample Overview and Abundance Distribution) will allow you to explore characteristics of your samples (QC related parameters as well as distributions of annotated features) that will help you to select the best samples to follow up with WGS.</p></div>\
    <div class="tab-pane" id="pcoa" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="depth" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="overview" style="padding-left: 15px;"></div>\
       <div class="tab-pane" id="qc" style="padding-left: 15px;"></div>\
    </div>\
  </div>\
</td>';
	}
    };

    widget.rerender_depth = function (params) {
	var genome_size = document.getElementById('depth_genomesize') ? parseInt(document.getElementById('depth_genomesize').value) : 5000000;
	var coverage = document.getElementById('depth_coverage') ? parseInt(document.getElementById('depth_coverage').value) : 30;
	var sequence_size = genome_size * coverage;
	var data = Retina.WidgetInstances.wizard[1].abu_graph.settings.data;
	var new_data = [];
	var new_labels = Retina.WidgetInstances.wizard[1].abu_graph.settings.x_labels.slice(0,params.index+1);
	var sum = [];
	for (i=0;i<data.length;i++) {
	    sum[i] = 0;
	    for (h=0;h<data[i].data.length;h++) {
		sum[i] += parseInt(data[i].data[h]);
	    }
	}

	for (h=0;h<data.length;h++) {
	    new_data.push({ name: data[h].name, data: [], fill: data[h].fill });
	    for (i=0;i<=params.index;i++) {
		var n = parseInt(data[h].data[i]) / sum[h];
		new_data[h].data.push((n>0) ? Math.round(sequence_size / n) : 0);
	    }
	}

	Retina.WidgetInstances.wizard[1].depth_graph.settings.data = new_data;
	Retina.WidgetInstances.wizard[1].depth_graph.settings.x_labels = new_labels;
	Retina.WidgetInstances.wizard[1].depth_graph.render();
    }

    widget.render_depth = function (mgs, taxa, index) {
	if (document.getElementById('depth').className == 'tab-pane active') {
	    widget = Retina.WidgetInstances.wizard[index];

	    var disp = document.getElementById('depth');
	    
	    var mgsel = {};
	    var show_ids = mgs || widget.depth_mgs || [ widget.ids[0] ];
	    for (i=0;i<show_ids.length;i++) {
		mgsel[show_ids[i]] = true;
	    }
	    widget.depth_mgs = show_ids;

	    var genome_size = document.getElementById('depth_genomesize') ? parseInt(document.getElementById('depth_genomesize').value) : 5000000;
	    var coverage = document.getElementById('depth_coverage') ? parseInt(document.getElementById('depth_coverage').value) : 30;
	    var sequence_size = genome_size * coverage;
	    var level = 4;
	    var data = widget.extract_data({ ids: show_ids, type: "organism", level: level });

	    var taxasel = {};
	    var skip_taxa = {};
	    if (widget.depth_taxa && ! taxa) {
		taxa = widget.depth_taxa;
	    }
	    if (taxa) {
		var avail = widget.taxa_select.settings.data;
		for (i=0;i<avail.length;i++) {
		    skip_taxa[avail[i].genus] = true;
		}
		for (i=0;i<taxa.length;i++) {
		    taxasel[taxa[i]] = true;
		    delete skip_taxa[taxa[i]];
		}
		widget.depth_taxa = taxa;
	    } else {
		var init_show = 6;
		if (data.rows.length < 6) {
		    init_show = data.rows.length;
		}
		for (i=0;i<init_show;i++) {
		    taxasel[data.rows[i]] = true;
		}
	    }

	    var sum = [];
	    for (h=0;h<data.matrix_data[0].length;h++) {
		sum.push(0);
	    }
	    var max = 0;
	    var taxa_data = [];
	    var rows = [];
	    for (i=0;i<data.rows.length;i++) {
		taxa_data.push({ genus: data.rows[i] });
		if (skip_taxa[data.rows[i]]) {
		    continue;
		}
		var row = [data.rows[i]];
		for (h=0;h<data.matrix_data[i].length;h++) {
		    row.push(data.matrix_data[i][h]);
		    sum[h] += data.matrix_data[i][h];
		    if (data.matrix_data[i][h] > max) {
			max = data.matrix_data[i][h];
		    }
		}
		rows.push(row);
	    }
	    rows.sort(function(a,b){return b[1] - a[1];});

	    var max_sum = 0;
	    for (i=0;i<sum.length;i++) {
		if (sum[i] > max_sum) {
		    max_sum = sum[i];
		}
	    }

	    var normalize = true;
	    var normcheck = " checked";
	    if (document.getElementById('normalize_depth') && document.getElementById('normalize_depth').checked == false) {
		normalize = false;
		normcheck = "";
	    }

	    var colors = GooglePalette(show_ids.length);
	    var graph_data = [];
	    var label_data = [];
	    var graph2_data = []
	    for (h=0;h<show_ids.length;h++) {
		var name = stm.DataStore.metagenome[show_ids[h]].name;
		var d = [];
		var d2 = [];
		var factor = normalize ? (max_sum / sum[h]) : 1;
		for (i=0;i<rows.length;i++) {
		    d.push(parseInt(rows[i][h + 1] * factor));
		    var n = rows[i][h + 1] / sum[h];
		    d2.push((n>0) ? Math.round(sequence_size / n) : 0);
		    label_data.push(rows[i][0]);
		}
		graph_data.push( { name: name, data: d, fill: colors[h] } );
		graph2_data.push( { name: name, data: d2, fill: colors[h] } );
	    }

	    disp.innerHTML = "<h3>Sequence Depth Estimation</h3><p style='width: 940px; margin-bottom: 40px; margin-top: 10px;'>The graphs below show the rank abundance and estimated sequence depth required to obtain the specified coverage of each taxa respectively. The rank abundance plot is shown on a log scale. Clicking on a bar in the rank abundance graph will set the selected genus as the cutoff for the estimated sequence graph. All taxa with lower abundance will not be displayed. You can adjust the average genome size and the required coverage below. You can also select which samples and which taxa should be shown in the graph.</p><div><p style='float: left; position: relative; top: 4px; margin-bottom: 0px; margin-right: 5px;'>coverage</p> <input type='text' value='"+coverage+"' id='depth_coverage' style='float: left;'><p style='margin-left: 20px; float: left; position: relative; top: 4px; margin-bottom: 0px; margin-right: 5px;'>average genome size</p> <div class='input-append' style='float: left;'><input type='text' value='"+genome_size+"' id='depth_genomesize' style='float: left;'><button class='btn' onclick='Retina.WidgetInstances.wizard[1].render_depth(null, null, "+index+");' style='margin-left: 15px; float: left;'>calculate</button></div></div><br><br><br><table><tr><td><h3 style='float: left;'>select samples</h3><div style='float: left; margin-left: 30px; padding-top: 6px;'>normalize <input id='normalize_depth' type='checkbox'"+normcheck+"></div></td><td><h3>select taxa</h3></td></tr><tr><td style='padding-right: 50px;'><div id='depth_mg_select'></div></td><td><div id='depth_taxa_select'></div></td></tr></table><br><br><br><div style='float: left; width: 300px; margin-left: 150px; margin-right: 250px; margin-bottom: 0px;' class='alert alert-info'>Using these abundance data from your 16s Data</div><div style='float: left; width: 400px; margin-bottom: 0px;' class='alert alert-info'>This is the predicted amount of WGS sequencing you will need to recover the indicated taxa at the selected level of coverage</div><br><div id='abundance_result' style='float: left;'></div><div id='depth_result' style='float: left;'></div>";
	    
	    // mg-select
	    widget.group_select.settings.target = document.getElementById('depth_mg_select');
	    widget.group_select.settings.callback = function(data){
	    	widget.render_depth(data, null, index);
	    };
	    widget.group_select.settings.selection = mgsel;
	    widget.group_select.render(index);

	    // taxa select
	    var taxa_select = widget.taxa_select = Retina.Renderer.create("listselect", { multiple: true,
	    										  data: taxa_data,
	    										  value: "genus",
	    										  filter: [ "genus" ],
											  target: document.getElementById('depth_taxa_select'),
											  selection: taxasel });
	    taxa_select.settings.callback = function (data) {
		widget.render_depth(null, data, index);
	    };
	    taxa_select.render();

	    var rend = widget.abu_graph = Retina.Renderer.create("graph", { target: document.getElementById('abundance_result'), x_labels: label_data, data: graph_data, x_labels_rotation: -60, chartArea: [ 0.1, 0.05, 0.95, 0.4 ], legendArea: [ 0.3, 0.7, 0.8, 0.995], width: 650, height: 700, y_scale: 'log', show_legend: true });
	    rend.settings.onclick = Retina.WidgetInstances.wizard[index].rerender_depth;
	    rend.render();

	    var rend2 = widget.depth_graph = Retina.Renderer.create("graph", { target: document.getElementById('depth_result'), x_labels: label_data, data: graph2_data, x_labels_rotation: -60, chartArea: [ 0.1, 0.05, 0.95, 0.4 ], width: 650, height: 700, short_axis_labels: true });
	    rend2.render();
	}
    };

    widget.render_qc_distribution = function (index) {
	if (document.getElementById('qc').className == 'tab-pane active') {
	    
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
	    	    
	    menu.innerHTML = '';
	    
	    var result = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: true });
	    var res2 = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: false });
		
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

    widget.color_pcoa = function () {
	var datum = document.getElementById('pcoa_metadata_select').options[document.getElementById('pcoa_metadata_select').selectedIndex].value;
	var colors = [ '#EE5F5B', '#0088CC', '#62C462', '#FBB450', '#5BC0DE', '#ee5be0', '#BD362F', '#0044CC', '#51A351', '#F89406', '#2F96B4', '#bd2fa6'];
	var colorcount = 0;
	var md = {};
	var mg = {};
	var series = [];
	var new_points = [];
	for (i=0;i<widget.ids.length;i++) {
	    if (stm.DataStore.metagenome[widget.ids[i]].hasOwnProperty(datum) || (stm.DataStore.metagenome[widget.ids[i]].migs && stm.DataStore.metagenome[widget.ids[i]].migs.hasOwnProperty(datum))) {
		var check = stm.DataStore.metagenome[widget.ids[i]].hasOwnProperty(datum) ? stm.DataStore.metagenome[widget.ids[i]][datum] : stm.DataStore.metagenome[widget.ids[i]].migs[datum];
		if (! md.hasOwnProperty(check)) {
		    md[check] = colorcount;
		    series.push({ name: check, color: colors[colorcount], shape: 'circle', filled: true });
		    new_points.push([]);
		    colorcount++;
		    
		}
		mg[stm.DataStore.metagenome[widget.ids[i]].name] = md[check];
	    }
	}

	var pcoa = Retina.WidgetInstances.wizard[1].pcoa;
	var ps = Retina.WidgetInstances.wizard[1].plotPoints;

	for (i=0;i<ps.length;i++) {
	    new_points[mg[ps[i][0].title]].push(ps[i][0]);
	}
	pcoa.settings.data = { series: series, points: new_points };
	pcoa.settings.show_legend = true;
	pcoa.settings.legend_position = 'right';
	pcoa.settings.target.innerHTML = "";
	pcoa.render();
    }

    widget.assign_group = function () {
	var points = Retina.WidgetInstances.wizard[1].pcoa_selection;
	var pnames = {};
	for (i=0;i<points.length;i++) {
	    pnames[points[i].title] = 1;
	}
	var group = document.getElementById('pcoa_group_name').value;

	for (i=0;i<widget.group_select.settings.data.length;i++) {
	    if (pnames[widget.group_select.settings.data[i].name]) {
		widget.group_select.settings.data[i].group = group;
		stm.DataStore.metagenome[widget.group_select.settings.data[i].id].group = group;
	    }
	}
	widget.group_select.render();

	var table = Retina.WidgetInstances.wizard[1].sample_table;
	for (i=0;i<table.settings.tdata.length;i++) {
	    if (pnames[table.settings.tdata[i].name]) {
		table.settings.tdata[i].group = group;
	    }
	}
	table.render();
    };

    widget.render_pcoa = function (index) {
	if (document.getElementById('pcoa').className == 'tab-pane active') {
	    
	    widget = Retina.WidgetInstances.wizard[index];
	    
	    var display_area = document.getElementById('pcoa');
	    var menu = document.createElement('div');
	    menu.setAttribute('style', 'margin-bottom: 20px;');
	    var display = document.createElement('div');
	    display.setAttribute('style', "float: left;");
	    var grouper = document.createElement('div');
	    grouper.setAttribute('style', "float: left; margin-left: 40px;");
	    var tablespace = document.createElement('div');
	    tablespace.setAttribute('style', 'clear: both; padding-top: 50px;');

	    display_area.innerHTML = "";
	    display_area.appendChild(menu);
	    display_area.appendChild(display);
	    display_area.appendChild(grouper);
	    display_area.appendChild(tablespace);
	    	    
	    var tdata = [];
	    for (i=0;i<widget.ids.length;i++) {
		var mg = stm.DataStore.metagenome[widget.ids[i]];
		var id = widget.ids[i];
		tdata.push([ mg.id, mg.name, stm.DataStore.metagenome[id].group ? stm.DataStore.metagenome[id].group : "-", parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.alpha_diversity_shannon).formatString(2), mg.migs.biome, parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.bp_count_raw), parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.sequence_count_raw), parseInt(stm.DataStore.metagenome_statistics[id].sequence_stats.average_length_raw), parseInt(parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_ratio_raw) * 100), parseFloat(stm.DataStore.metagenome_statistics[id].sequence_stats.average_gc_content_raw) ]);
	    }
	    var table_data = { data: tdata, header: [ "ID", "name", "group", "alpha diversity", "biome", "# bp", "# reads", "mean read length", "mean GC %", "mean GC content" ] };
	    var table = widget.sample_table = Retina.Renderer.create("table", { target: tablespace,
										data: table_data,
										rows_per_page: 15,
										sort_autodetect: true,
										filter_autodetect: true,
										editable: { 2: true },
										edit_callback: function(data){
										    Retina.WidgetInstances.wizard[index].update_groups(data, index);
										},
										hide_options: false });
	    table.render();

	    menu.innerHTML = '\
<h3>Groups Tool</h3>\
<p style="width: 940px; margin-top: 10px;">This tool will allow you to explore how well your samples group. This will help you to select the best sample(s) for WGS sequencing.<br><br>The PCoA presented on the page provides a preliminary characterization of your samples that will enable you to see how closely related they are. The PCoA represents the first two principal coordinates of a euclidean distance based principal coordinate analysis of abundance data that have undergone normalization and standardization.</p><ul style="list-style: decimal outside none; width: 920px;"><li>Automatically generate groupings based on available metadata<br>Click on the metadata drop down list and select any of the metadata values. The PCoA will be automatically colored. You can save the metadata based grouping by typing a name in the "group name" box and then clicking on "assign group".</li><li>Select sample groups from the PCoA<br>You can use your mouse to draw a box around any group of samples in the PCoA. The corresponding points will change color. These can be saved as a group by entering a name in the "group name" box and then clicking "assign group"</li><li>Select sample groups from the the summary table<br>You can manually create groupings in the the summary table.</li</ul></p>\
<div class="btn-group" data-toggle="buttons-radio">\
</div>';

	    // a distribution was selected, draw the according visualization		
	    grouper.innerHTML = "<table><tr><td><h3 style='margin-top: 35px;'>current selection</h3><select multiple id='pcoa_group_list' size=12></select><h3>group name</h3><div class='input-append'><input type='text' id='pcoa_group_name' value='group 1'><button class='btn' onclick='Retina.WidgetInstances.wizard[1].assign_group()'>assign group</button></div></td><td style='vertical-align: top;padding-top: 35px;'><h3>metadata</h3><div class='input-append'><select id='pcoa_metadata_select'></select><button class='btn' onclick='Retina.WidgetInstances.wizard[1].color_pcoa();'>color PCoA</button></div></td></tr></table>";
	    
	    var opts = "<option>group</option>";
	    for (i in stm.DataStore.metagenome[widget.ids[0]].migs) {
		if (stm.DataStore.metagenome[widget.ids[0]].migs.hasOwnProperty(i)) {
		    opts += "<option>"+i+"</option>";
		}
	    }
	    document.getElementById('pcoa_metadata_select').innerHTML = opts;
	    
	    var result = widget.extract_data({ ids: widget.ids, level: 3, type: 'organism', normalize: true });
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
	    	    jQuery.extend(widget.pcoa.settings, { show_legend: false, x_min: xmin, x_max: xmax, y_min: ymin, y_max: ymax, data: plot_data, target: display });
		} else {
	    	    widget.pcoa = Retina.Renderer.create('plot', { data: plot_data, target: display, x_min: xmin, x_max: xmax, y_min: ymin, y_max: ymax, connected: false, show_legend: false, drag_select: Retina.WidgetInstances['wizard'][index].plot_select });
		}
		widget.pcoa.render();
		widget.plotPoints = Retina.WidgetInstances.wizard[1].pcoa.svg.plot.plotPoints;
		
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
	    

	document.getElementById('overview').innerHTML = '<div style="float: right;"><h3>select sample</h3><div id="overview_mg_select"></div></div><h3 id="overview_header"></h3>\
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

	    // mg-select
	    widget.single_select.settings.target = document.getElementById('overview_mg_select');
	    widget.single_select.settings.callback = function(data){
	    	widget.render_overview(data, index);
	    };
	    widget.single_select.render();
	    
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
				   { name: 'Unknown' , data: [ parseInt(stats.sequence_count_processed) - parseInt(stats.sequence_count_processed_aa) - parseInt(stats.sequence_count_sims_rna) ], fill: '#EE5F5B' },
    				   { name: 'Unknown Protein' , data: [ parseInt(stats.sequence_count_processed_aa) - parseInt(stats.sequence_count_sims_aa) ], fill: '#FBB450' },
				   { name: 'Annotated Protein' , data: [ parseInt(stats.sequence_count_sims_aa) ], fill: '#62C462' },
				   { name: 'ribosomal RNA' , data: [ parseInt(stats.sequence_count_sims_rna) ], fill: '#0088CC' } ];
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

    widget.update_groups = function (data, index) {
	widget = Retina.WidgetInstances.wizard[index];
	data = data || widget.sample_table.settings.tdata;
	for (i=0;i<data.length;i++) {
	    if (stm.DataStore.metagenome[data[i].ID]) {
		stm.DataStore.metagenome[data[i].ID].group = data[i].group;
	    }
	}
	
	for (i=0;i<widget.group_select.settings.data.length;i++) {
	    widget.group_select.settings.data[i].group = stm.DataStore.metagenome[widget.group_select.settings.data[i].id].group;
	}
	widget.group_select.render();
    }
    
    widget.number = function (number) {
	return '<p style="font-size: 16px; float: left; font-weight: bold; height: 18px; text-align: center; vertical-align: middle; margin-right: 8px; border: 5px solid #0088CC; width: 18px; border-radius: 14px 14px 14px 14px; position: relative; bottom: 5px; right: 9px;">'+number+'</p>';
    };
})();
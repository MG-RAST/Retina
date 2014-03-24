(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Metagenome Analysis Widget",
                name: "metagenome_analysis",
                author: "Tobias Paczian",
                requires: [ "rgbcolor.js" ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_renderer({"name": "listselect", "resource": "./renderers/",  "filename": "renderer.listselect.js" }),
                 Retina.load_renderer("listselect"),
		 Retina.add_renderer({"name": "graph", "resource": "./renderers/",  "filename": "renderer.graph.js" }),
		 Retina.load_renderer("graph"),
		 Retina.add_renderer({"name": "plot", "resource": "./renderers/",  "filename": "renderer.plot.js" }),
 		 Retina.load_renderer("plot"),
 		 Retina.add_renderer({"name": "table", "resource": "./renderers/",  "filename": "renderer.table.js" }),
  		 Retina.load_renderer("table"),
		 Retina.add_widget({"name": "mgbrowse", "resource": "./widgets/",  "filename": "widget.mgbrowse.js"}),
		 Retina.load_widget("mgbrowse")
	       ];
    };
    
    widget.display = function (wparams) {
        widget = this;
	var index = widget.index;

	var content = wparams.main;
	
	// set the output area
	content.innerHTML = '<h3>Select Metagenomes</h3><div id="mgbrowse"></div>';

	widget.browse = Retina.Widget.create('mgbrowse', { "target": document.getElementById("mgbrowse"), "type": "listselect", "multiple": true, "wide": true });
	
    };

    widget.loginAction = function (params) {
	Retina.WidgetInstances.metagenome_analysis[1].browse.result_list.update_data({},1);
    };

    widget.summary_piechart = function(index) {
        var mg = Retina.WidgetInstances.metagenome_overview[index].curr_mg;
	    var pieData = [];
	    var pieNums = Retina.WidgetInstances.metagenome_overview[index]._summary_fuzzy_math(mg);
	    var legend  = ["Failed QC", "Unknown", "Unknown Protein", "Annotated Protein", "ribosomal RNA"];
	    var colors  = ["#6C6C6C", "#dc3912", "#ff9900", "#109618", "#3366cc", "#990099"];
	    for (var i = 0; i < pieNums.length; i++) {
	        pieData.push({ name: legend[i], data: [ parseInt(pieNums[i]) ], fill: colors[i] });
	    }
	    var data = { 'title': 'Sequence Breakdown',
	                 'type': 'pie',
		             'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		             'x_labels': [ " " ],		     
		             'show_legend': true,
		             'legend_position': 'right',
		             'width': 650,
		             'height': 300,
		             'data': pieData };
	    return data;
    };
    
    widget._summary_fuzzy_math = function(mg) {
        // get base numbers
        var stats  = mg.statistics.sequence_stats;
        var is_rna = (mg.sequence_type == 'Amplicon') ? 1 : 0;
        var raw_seqs    = ('sequence_count_raw' in stats) ? parseFloat(stats.sequence_count_raw) : 0;
        var qc_rna_seqs = ('sequence_count_preprocessed_rna' in stats) ? parseFloat(stats.sequence_count_preprocessed_rna) : 0;
        var qc_seqs     = ('sequence_count_preprocessed' in stats) ? parseFloat(stats.sequence_count_preprocessed) : 0;
        var rna_sims    = ('sequence_count_sims_rna' in stats) ? parseFloat(stats.sequence_count_sims_rna) : 0;
        var r_clusts    = ('cluster_count_processed_rna' in stats) ? parseFloat(stats.cluster_count_processed_rna) : 0;
        var r_clust_seq = ('clustered_sequence_count_processed_rna' in stats) ? parseFloat(stats.clustered_sequence_count_processed_rna) : 0;
        var ann_reads   = ('read_count_annotated' in stats) ? parseFloat(stats.read_count_annotated) : 0;
        var aa_reads    = ('read_count_processed_aa' in stats) ? parseFloat(stats.read_count_processed_aa) : 0;
        // first round math
        var qc_fail_seqs  = raw_seqs - qc_seqs;
        var ann_rna_reads = rna_sims ? (rna_sims - r_clusts) + r_clust_seq : 0;
        var ann_aa_reads  = (ann_reads && (ann_reads > ann_rna_reads)) ? ann_reads - ann_rna_reads : 0;
        var unkn_aa_reads = aa_reads - ann_aa_reads;
        var unknown_all   = raw_seqs - (qc_fail_seqs + unkn_aa_reads + ann_aa_reads + ann_rna_reads);
        if (raw_seqs < (qc_fail_seqs + ann_rna_reads)) {
            var diff = (qc_fail_seqs + ann_rna_reads) - raw_seqs;
            unknown_all = (diff > unknown_all) ? 0 : unknown_all - diff;
        }
        // fuzzy math
        if (is_rna) {
            qc_fail_seqs  = raw_seqs - qc_rna_seqs;
            unkn_aa_reads = 0;
            ann_aa_reads  = 0;
            unknown_all   = raw_seqs - (qc_fail_seqs + ann_rna_reads);
        } else {
            if (unknown_all < 0) { unknown_all = 0; }
            if (raw_seqs < (qc_fail_seqs + unknown_all + unkn_aa_reads + ann_aa_reads + ann_rna_reads)) {
      	        var diff = (qc_fail_seqs + unknown_all + unkn_aa_reads + ann_aa_reads + ann_rna_reads) - raw_seqs;
      	        unknown_all = (diff > unknown_all) ? 0 : unknown_all - diff;
            }
            if ((unknown_all == 0) && (raw_seqs < (qc_fail_seqs + unkn_aa_reads + ann_aa_reads + ann_rna_reads))) {
      	        var diff = (qc_fail_seqs + unkn_aa_reads + ann_aa_reads + ann_rna_reads) - raw_seqs;
      	        unkn_aa_reads = (diff > unkn_aa_reads) ? 0 : unkn_aa_reads - diff;
            }
            // hack to make MT numbers add up
            if ((unknown_all == 0) && (unkn_aa_reads == 0) && (raw_seqs < (qc_fail_seqs + ann_aa_reads + ann_rna_reads))) {
      	        var diff = (qc_fail_seqs + ann_aa_reads + ann_rna_reads) - raw_seqs;
      	        ann_rna_reads = (diff > ann_rna_reads) ? 0 : ann_rna_reads - diff;
            }
        }
        return [ qc_fail_seqs, unknown_all, unkn_aa_reads, ann_aa_reads, ann_rna_reads ];
    };
    
    widget.annotation_piechart = function(index, dcat, dtype) {
        var annData = Retina.WidgetInstances.metagenome_overview[index].curr_mg.statistics[dcat][dtype];
        var pieData = [];
        var colors  = GooglePalette(annData.length);
        var annMax  = 0;
        var annSort = annData.sort(function(a,b) {
            return b[1] - a[1];
        });
        var skip = Math.max.apply(Math, annData.map(function(x){ return x[1]; })) / 20;

        for (var i = 0; i < annSort.length; i++) {
            var val = parseInt(annSort[i][1]);
            // skip if value too low to view
            if (val < skip) {
                continue;
            }
    	    pieData.push({ name: annSort[i][0], data: [ val ], fill: colors[i] });
    	    annMax = Math.max(annMax, annSort[i][0].length);
    	}
    	var pwidth  = 250;
    	var pheight = 250;
    	var lwidth  = Math.max(pwidth, annMax*7.5);
    	var lheight = pieData.length * 23;
    	var width   = pwidth+lwidth;
    	var height  = (lheight > pheight) ? Math.min(lheight, pheight+(pheight/2)) : pheight;
    	var data = { 'title': dtype,
    	             'type': 'pie',
    		         'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
    		         'x_labels': [""],
    		         'show_legend': true,
    		         'legendArea': [pwidth+40, 20, lwidth, lheight],
    		         'chartArea': [25, 20, pwidth, pheight],
    		         'width': width,
    		         'height': height,
    		         'data': pieData };
    	return data;
    };

    widget.taxon_linegraph = function(index, level, num) {
        var taxons = Retina.WidgetInstances.metagenome_overview[index].curr_mg.statistics.taxonomy;
        var lineData = [{ name: level+' rank abundance', data: []}];
        var xlabels  = [];
        var annSort  = taxons[level].sort(function(a,b) {
            return b[1] - a[1];
        });
        for (var i = 0; i < Math.min(num, annSort.length); i++) {
    	    lineData[0].data.push( parseInt(annSort[i][1]) );
    	    xlabels.push( annSort[i][0] );
    	}
        var gwidth  = 750;
    	var gheight = 300;
    	var longest = xlabels.reduce(function (a, b) { return a.length > b.length ? a : b; });
    	var data = { 'title': '',
    	             'type': 'column',
    	             'default_line_width': 2,
    	             'default_line_color': 'blue',
		     'y_scale': 'log',
    		     'x_labels': xlabels,
    		     'x_labels_rotation': '310',
    		     'x_tick_interval': xlabels.length,
    		     'show_legend': false,
    		     'chartArea': [80, 20, gwidth, gheight],
    		     'width': gwidth+80,
    		     'height': gheight+(longest.length * 4)+40,
    		     'data': lineData };
    	return data;
    };

    widget.bp_areagraph = function(index) {
        var mg = Retina.WidgetInstances.metagenome_overview[index].curr_mg;
        var labels = mg.statistics.qc.bp_profile.percents.columns;
        var bpdata = mg.statistics.qc.bp_profile.percents.data;
        var xt = 'bp '+labels[0];
        var yt = 'Percent bp';
        var names  = labels.slice(1);
        var colors = GooglePalette(names.length);
        var areaData = [];
        for (var x = 0; x < names.length; x++) {
    	    areaData.push({ name: names[x], data: [], fill: colors[x] });
    	}
        for (var i = 0; i < bpdata.length; i++) {
            labels.push(bpdata[i][0]);
            for (var j = 1; j < bpdata[i].length; j++) {
                areaData[j-1].data.push( parseFloat(bpdata[i][j]) );
            }
        }
        var pwidth  = 750;
    	var pheight = 300;
    	var lwidth  = 15;
    	var lheight = areaData.length * 23;
    	var width   = pwidth+lwidth;
    	var height  = (lheight > pheight) ? Math.min(lheight, pheight+(pheight/2)) : pheight;
        var data = { 'x_title': xt,
                     'y_title': yt,
                     'type': 'stackedArea',
                     'x_tick_interval': parseInt(bpdata.length/50),
                     'x_labeled_tick_interval': parseInt(bpdata.length/10),
                     'show_legend': true,
                     'legendArea': [pwidth+20, 20, lwidth, lheight],
     		         'chartArea': [70, 20, pwidth, pheight],
     		         'width': width+40,
     		         'height': height+45,
                     'data': areaData
                 };
        return data;
    };

    widget.mg_plot = function(index, type, kmer) {
        var mg = Retina.WidgetInstances.metagenome_overview[index].curr_mg;
        var data, x, y, labels, points, xt, yt;
        var xscale = 'linear';
        var yscale = 'linear';
	    switch (type) {
	        case 'drisee':
	        try {
	            data = Retina.WidgetInstances.metagenome_overview[0].multi_plot(0, [1,2,3,4,5,6,7], mg.statistics.qc.drisee.percents.columns, mg.statistics.qc.drisee.percents.data, 'bp position', 'percent error');
	        } catch (err) {
        	    data = undefined;
        	}
            break;
            case 'kmer':
	        points = [];
	        var xi, yi;
            switch (kmer) {
                case 'ranked':
                xi = 3;
                yi = 5;
                xt = 'sequence size';
                yt = 'fraction of observed kmers';
                xscale = 'log';
                yscale = 'linear';
                break;
                case 'spectrum':
                xi = 0;
                yi = 1;
                xt = 'kmer coverage';
                yt = 'number of kmers';
                xscale = 'log';
                yscale = 'log';
                break;
                default:
                xi = 3;
                yi = 0;
                xt = 'sequence size';
                yt = 'kmer coverage';
                xscale = 'log';
                yscale = 'log';
                break;
            }
	        try {
	            for (var i = 0; i < mg.statistics.qc.kmer['15_mer']['data'].length; i+=2) {
	                var thisY = (yi == 5) ? 1 - parseFloat(mg.statistics.qc.kmer['15_mer']['data'][i][yi]) : mg.statistics.qc.kmer['15_mer']['data'][i][yi];
                    points.push([ mg.statistics.qc.kmer['15_mer']['data'][i][xi], thisY ]);
                }
                data = Retina.WidgetInstances.metagenome_overview[0].single_plot(points, xt, yt, xscale, yscale);
            } catch (err) {
        	    data = undefined;
        	}
            break;
            case 'rarefaction':
            try {
                data = Retina.WidgetInstances.metagenome_overview[0].single_plot(mg.statistics.rarefaction, 'number of reads', 'species count', xscale, yscale);
            } catch (err) {
            	data = undefined;
            }
            break;
            default:
            break;
        }
        return data;
    };

    widget.single_plot = function(nums, xt, yt, xscale, yscale) {
        if (! (nums && nums.length)) {
            return undefined;
        }
        var xy = [];
        var x_all = [];
        var y_all = [];
        for (var i = 0; i < nums.length; i++) {
            xy.push({ 'x': parseFloat(nums[i][0]), 'y': parseFloat(nums[i][1]) });
            x_all.push( parseFloat(nums[i][0]) );
            y_all.push( parseFloat(nums[i][1]) );
        }
        var pwidth  = 750;
    	var pheight = 300;
	    var ymax = Math.max.apply(Math, y_all);
	    ymax = ymax + (((yscale == 'log') ? 0.25 : 0.05) * ymax);
	    var pot = ymax.toString().indexOf('.') || ymax.toString.length;
	    pot = Math.pow(10, pot - 1);
	    ymax = Math.floor((ymax + pot) / pot) * pot;
        var data = { 'x_titleOffset': 40,
                     'y_titleOffset': 60,
		             'x_title': xt,
                     'y_title': yt,
                     'x_scale': xscale,
                     'y_scale': yscale,
                     'x_min': Math.min.apply(Math, x_all),
                     'x_max': Math.max.apply(Math, x_all),
                     'y_min': 0,
                     'y_max': ymax,
                     'show_legend': false,
                     'show_dots': false,
                     'connected': true,
                     'chartArea': [70, 20, pwidth, pheight],
                     'width': pwidth+40,
                     'height': pheight+45,
                     'data': {'series': [{'name': ''}], 'points': [xy]}          
                 };
        return data;
    };

    widget.multi_plot = function(x, y, labels, nums, xt, yt) {
        if (! (labels && nums && labels.length && nums.length)) {
            return undefined;
        }
        var series = [];
        var points = [];
        var x_all  = [];
        var y_all  = [];
        var annMax = 0;
        var colors = GooglePalette(y.length);
        for (var i = 0; i < y.length; i++) {
            series.push({'name': labels[y[i]], 'color': colors[i]});
            annMax = Math.max(annMax, labels[y[i]].length);
            xy = [];
            for (var j = 0; j < nums.length; j++) {
                xy.push({ 'x': parseFloat(nums[j][x]), 'y': parseFloat(nums[j][y[i]]) });
                x_all.push( parseFloat(nums[j][x]) );
                y_all.push( parseFloat(nums[j][y[i]]) );
            }
            points.push(xy);
        }
        var pwidth  = 750;
    	var pheight = 300;
    	var lwidth  = annMax * 10;
    	var lheight = series.length * 23;
    	var width   = pwidth+lwidth;
    	var height  = (lheight > pheight) ? Math.min(lheight, pheight+(pheight/2)) : pheight;
        var data = { 'y_titleOffset': 60,
                     'x_titleOffset': 40,
                     'x_title': xt,
                     'y_title': yt,
                     'x_min': Math.min.apply(Math, x_all),
                     'x_max': Math.max.apply(Math, x_all),
                     'y_min': Math.min.apply(Math, y_all),
                     'y_max': Math.max.apply(Math, y_all),
                     'show_legend': true,
                     'show_dots': false,
                     'connected': true,
                     'legendArea': [pwidth+20, 20, lwidth, lheight],
     		         'chartArea': [70, 20, pwidth, pheight],
     		         'width': width+40,
     		         'height': height+45,
                     'data': {'series': series, 'points': points}
                 };
        return data;
    };

    widget.metadata_table = function(index) {
        var md = Retina.WidgetInstances.metagenome_overview[index].curr_mg.metadata;
        var cats  = ['project', 'sample', 'library', 'env_package'];
        var tdata = [];
        for (var c in cats) {
            if (md[cats[c]]) {
                for (var key in md[cats[c]]['data']) {
                    tdata.push([ cats[c], key, md[cats[c]]['data'][key] ]);
                }
            }
        }
        var data = { 'width': 400,
                     'height': 600,
                     'data': {'data': tdata, 'header': ['category', 'field', 'value']},
                     'rows_per_page': 20,
                     'sort_autodetect': true,
                     'filter_autodetect': true,
                     'hide_options': false
                   };
        return data;
    };

    widget.analysis_statistics = function(index) {
        var stats = Retina.WidgetInstances.metagenome_overview[index].curr_mg.statistics.sequence_stats;
	    return { width: "span6",
		         style: "float: left;",
		         data: [ { header: "Analysis Statistics" },
			             { fancy_table: { data: [
			                 [ { header: "Upload: bp Count" }, widget._to_num('bp_count_raw', stats)+" bp" ],
			                 [ { header: "Upload: Sequences Count" }, widget._to_num('sequence_count_raw', stats) ],
			                 [ { header: "Upload: Mean Sequence Length" }, widget._to_num('average_length_raw', stats)+" ± "+widget._to_num('standard_deviation_length_raw', stats)+" bp" ],
			                 [ { header: "Upload: Mean GC percent" }, widget._to_num('average_gc_content_raw', stats)+" ± "+widget._to_num('standard_deviation_gc_content_raw', stats)+" %" ],
			                 [ { header: "Artificial Duplicate Reads: Sequence Count" }, widget._to_num('sequence_count_dereplication_removed', stats) ],
			                 [ { header: "Post QC: bp Count" }, widget._to_num('bp_count_preprocessed', stats)+" bp" ],
			                 [ { header: "Post QC: Sequences Count" }, widget._to_num('sequence_count_preprocessed', stats) ],
			                 [ { header: "Post QC: Mean Sequence Length" }, widget._to_num('average_length_preprocessed', stats)+" ± "+widget._to_num('standard_deviation_length_preprocessed', stats)+" bp" ],
			                 [ { header: "Post QC: Mean GC percent" }, widget._to_num('average_gc_content_preprocessed', stats)+" ± "+widget._to_num('standard_deviation_gc_content_preprocessed', stats)+" %" ],
			                 [ { header: "Processed: Predicted Protein Features" }, widget._to_num('sequence_count_processed_aa', stats) ],
			                 [ { header: "Processed: Predicted rRNA Features" }, widget._to_num('sequence_count_processed_rna', stats) ],
			                 [ { header: "Alignment: Identified Protein Features" }, widget._to_num('sequence_count_sims_aa', stats) ],
			                 [ { header: "Alignment: Identified rRNA Features" }, widget._to_num('sequence_count_sims_rna', stats) ],
			                 [ { header: "Annotation: Identified Functional Categories" }, widget._to_num('sequence_count_ontology', stats) ]
			                 ] } }
			            ] };
    };
    
    widget.mixs_metadata = function(index, hide_link) {
        var md = Retina.WidgetInstances.metagenome_overview[index].curr_mg.mixs;
        var data = { width: "span6",
		             style: "float: right;",
		             data: [ { header: "GSC MIxS Info" },
			                 { fancy_table: { data: [
			                     [ { header: "Investigation Type" }, md['sequence_type'] ],
			                     [ { header: "Project Name" }, md['project'] ],
			                     [ { header: "Latitude and Longitude" }, md['latitude']+" , "+md['longitude'] ],
			                     [ { header: "Country and/or Sea, Location" }, md['country']+" , "+md['location'] ],
			                     [ { header: "Collection Date" }, md['collection_date'] ],
			                     [ { header: "Environment (Biome)" }, md['biome'] ],
			                     [ { header: "Environment (Feature)" }, md['feature'] ],
			                     [ { header: "Environment (Material)" }, md['material'] ],
			                     [ { header: "Environmental Package" }, md['package'] ],
			                     [ { header: "Sequencing Method" }, md['seq_method'] ]
			                     ] }
			                 }
			            ] };
		if (! hide_link) {
		    data.data[1].fancy_table.data.push( [{header: "More Metadata"}, "<a href='#metadata_table'>click for full table</a>"] );
	    }
		return data;
    };
    
    widget._to_per = function(n, d) {
        return (parseInt(n) / parseInt(d) * 100).formatString(1) + "%";
    };
    
    widget._to_num = function(key, obj) {
        var num = (key in obj) ? obj[key] : 0;
        return parseInt(num).formatString();
    };
    
})();
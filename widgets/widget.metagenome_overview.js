(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Metagenome Overview Widget",
                name: "metagenome_overview",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_renderer({"name": "paragraph", "resource": "./",  "filename": "renderer.paragraph.js" }),
		 Retina.load_renderer("paragraph"),
		 Retina.add_renderer({"name": "graph", "resource": "./",  "filename": "renderer.graph.js" }),
		 Retina.load_renderer("graph"),
	       ];
    };
    
    widget.display = function (wparams) {
	// check if required data is loaded
	if (! (stm.DataStore.hasOwnProperty('metagenome') && stm.DataStore.metagenome.hasOwnProperty(wparams.id))) {

	    // make a promise list
	    var stats_promises = [];
	    stats_promises.push(stm.get_objects({ "type": "metagenome", "id": wparams.id, "options": { "verbosity": "full" } }));
	    stats_promises.push(stm.get_objects({ "type": "metagenome_statistics", "id": wparams.id }));
	    
	    jQuery.when.apply(this, stats_promises).then(function() {
		widget.display(wparams);
	    });

	    return;
	}

	// make some shortcuts
	var mg = stm.DataStore.metagenome[wparams.id];
	var mg_stats = stm.DataStore.metagenome_statistics[wparams.id];
	var content = wparams.target;

	// empty the output area
	content.innerHTML = "";
	
	// set style variables
	var header_color = "black";
	var title_color = "#8FBC3F";

	var outputs = [ 
	    { type: 'paragraph', data: 'general_overview' },
	    { type: 'paragraph', data: 'metagenome_summary' },
	    { type: 'graph', data: 'summary_piechart' },
	    { type: 'paragraph', data: 'piechart_footnote' },
	    { type: 'paragraph', data: 'project_information' },
	    { type: 'paragraph', data: 'analysis_statistics' },
	    { type: 'paragraph', data: 'functional_introtext' },
	    { type: 'graph', data: 'COG_piechart' },
	    { type: 'graph', data: 'KO_piechart' },
	    { type: 'graph', data: 'NOG_piechart' },
	    { type: 'graph', data: 'Subsystems_piechart' },
	    { type: 'paragraph', data: 'taxonomic_introtext' },
	    { type: 'graph', data: 'domain_barchart' },
	    { type: 'graph', data: 'phylum_barchart' },
	    { type: 'graph', data: 'class_barchart' },
	    { type: 'graph', data: 'order_barchart' },
	    { type: 'graph', data: 'family_barchart' },
	    { type: 'graph', data: 'genus_barchart' },
	];
	
	// iterate over the outputs
	for (out=0;out<outputs.length;out++) {
	    // create and append the output div
	    var div = document.createElement('div');
	    content.appendChild(div);
	    
	    // check the type and call the according renderer with the data generated
	    // by the defined function
	    switch (outputs[out].type) {
	    case 'paragraph':
		var data = widget[outputs[out].data](mg, mg_stats);
		data.target = div;
		data.title_color = title_color;
		data.header_color = header_color;
		var rend = new Retina.Renderer.paragraph.render(data);	
		break;
	    case 'graph':
		var data = widget[outputs[out].data](mg, mg_stats);
		div.setAttribute('class', 'span12');
		data.target = div;
		var rend = new Retina.Renderer.graph.render(data);
		break;
	    };
	}
    },
    widget.general_overview = function (mg) {
	// general overview
	var ncbi_id;
	try {
	    ncbi_id = mg.metadata.project.data.ncbi_id;
	    ncbi_id = "<a href='http://www.ncbi.nlm.nih.gov/genomeprj/"+ncbi_id+"'>"+ncbi_id+"</a>";
	} catch (err) {
	    ncbi_id = "-";
	}
	var gold_id;
	try {
 	    gold_id = mg.metadata.library.data.gold_id;
	    gold_id = "<a href='http://www.ncbi.nlm.nih.gov/genomeprj/"+gold_id+"'>"+gold_id+"</a>";
	} catch (err) {
	    gold_id = "-";
	}
	var pubmed_id;
	try {
 	    pubmed_id = mg.metadata.library.data.pubmed_id.split(", ");
	    var pm = [];
	    for (i=0;i<pubmed_id.length;i++) {
		pm.push("<a href='http://www.ncbi.nlm.nih.gov/pubmed/"+pubmed_id[i]+"'>"+pubmed_id[i]+"</a>");
	    }
	    pubmed_id = pm.join(", ");
	} catch (err) {
	    pubmed_id = "-";
	}
	var pi_link;
	try {
	    pi_link = "<a href='mailto:"+mg.metadata.project.data.PI_email+"'>"+mg.metadata.project.data.PI_firstname+" "+mg.metadata.project.data.PI_lastname+"</a>";
	} catch (err) {
	    pi_link = "-";
	}
	var organization;
	try {
	    organization = mg.metadata.project.data.PI_organization;
	} catch (err) {
	    organization = "-";
	}
	
	var data = { data: [ { title: "Metagenome Overview"},
			     { header: "MG-RAST ID " + mg.id.substring(3) },
			     { table: [
				 [ { header: "Metagenome Name" }, mg.name, { header: "NCBI Project ID" }, ncbi_id ],
				 [ { header: "PI" }, pi_link, { header: "GOLD ID" }, gold_id ],
				 [ { header: "Organization" }, organization, { header: "PubMed ID" }, pubmed_id ],
				 [ { header: "Visibility" }, mg.status ],
				 [ { header: "Static Link" }, "<a href='http://metagenomics.anl.gov/linkin.cgi?metagenome="+mg.id.substring(3)+"'>http://metagenomics.anl.gov/linkin.cgi?metagenome="+mg.id.substring(3)+"</a>" ] ] } ] };
	
	return data;
    },
    widget.metagenome_summary = function(mg, mg_stats) {
	// hash the basic stats
	var stats = {};
	for (var i=0;i<mg_stats.basic.length;i++) {
	    stats[mg_stats.basic[i][0]] = mg_stats.basic[i][1];
	}
	// hash the sims
	var sims = {};
	var totalcount = parseInt(stats['sequence_count']);
	var simscount = 0;
	for (var i=0;i<mg_stats.sims.length;i++) {
	    sims[mg_stats.sims[i][0]] = mg_stats.sims[i][1];
	    simscount += parseInt(mg_stats.sims[i][1]);
	}
	var failed_seqs = totalcount - simscount;
	var failed_percent = (failed_seqs / totalcount * 100).formatString(1);

	var data = { data: [ { header: "Metagenome Summary" },
		     { p: "The dataset "+mg.name+" was uploaded on "+mg.created+" and contains "+parseInt(stats['sequence_count']).formatString()+" sequences totaling "+parseInt(stats['bp_count']).formatString()+" basepairs with an average length of "+parseInt(stats['average_length']).formatString()+" bps. The piechart below breaks down the uploaded sequences into "+mg_stats.sims.length.toString()+" distinct categories." },
		     { p: simscount.formatString() + " sequences ("+failed_percent+"%) failed to pass the QC pipeline. Of the sequences that passed QC, "+sims['sequence_count_sims_rna']+" sequences ("+(parseInt(sims['sequence_count_sims_rna']) / simscount * 100).formatString(1)+"%) contain ribosomal RNA genes. Of the remainder, "+sims['sequence_count_ontology']+" sequences ("+(parseInt(sims['sequence_count_ontology']) / simscount * 100).formatString(1)+"%) contain predicted proteins with known functions and "+sims['sequence_count_sims_aa']+" sequences ("+(parseInt(sims['sequence_count_sims_aa']) / simscount * 100).formatString(1)+"%) contain predicted proteins with unknown function." },
		     { p: "The analysis results shown on this page are computed by MG-RAST. Please note that authors may upload data that they have published their own analysis for, in such cases comparison within the MG-RAST framework can not be done." } ] };
	
	return data;
    },
    widget.summary_piechart = function(mg, mg_stats) {
	var piedata = [];
	var legendmap = { 'sequence_count_sims_rna': 'ribosomal RNA',
			  'sequence_count_sims_aa': 'unknown Protein',
			  'sequence_count_ontology': 'annotated Protein' };

	var colors = [ 'url(#fadeBlue)', 'url(#fadeYellow)', 'url(#fadeGreen)' ];
			  
	for (var i=0;i<mg_stats.sims.length;i++) {
	    piedata.push({ name: legendmap[ mg_stats.sims[i][0] ], data: [ parseInt(mg_stats.sims[i][1]) ], fill: colors[i] });
	}

	
	var data = { 'title': 'Sequence Breakdown',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ " " ],		     
		     'show_legend': true,
		     'legend_position': 'right',
		     'width': 700,
		     'height': 350,
		     'data': piedata };

	return data;
    },
    widget.piechart_footnote = function(mg, mg_stats) {
	return { data: [ { footnote: { title: "Note:", text: "Sequences containing multiple predicted features are only counted in one category. Currently downloading of sequences via chart slices is not enabeled." } } ], width: 'span8' };
    },
    widget.functional_introtext = function(mg, mg_stats) {
	return { data: [ { header: "Functional Category Hits Distribution" },
			 { p: "The pie charts below illustrate the distribution of functional categories for COGs, KOs, NOGs, and Subsystems at the highest level supported by these functional hierarchies. Each slice indicates the percentage of reads with predicted protein functions annotated to the category for the given source. " } ] };
    },
    widget.taxonomic_introtext = function(mg, mg_stats) {
	return { data: [ { header: "Taxonomic Hits Distribution" },
			 { p: "The pie charts below illustrate the distribution of taxonomic domains, phyla, and orders for the annotations. Each slice indicates the percentage of reads with predicted proteins and ribosomal RNA genes annotated to the indicated taxonomic level. This information is based on all the annotation source databases used by MG-RAST." } ] };
    },
    widget.COG_piechart = function(mg, mg_stats) {
	var piedata = [];
			  
	for (var i=0;i<mg_stats.COG.length;i++) {
	    piedata.push({ name: mg_stats.COG[i][0], data: [ parseInt(mg_stats.COG[i][1]) ] });
	}

	var data = { 'title': 'COG',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ " " ],		     
		     'show_legend': true,
		     'legend_position': 'right',
		     'width': 700,
		     'height': 350,
		     'data': piedata };

	return data;
    },
    widget.KO_piechart = function(mg, mg_stats) {
	var piedata = [];
	
	for (var i=0;i<mg_stats.KO.length;i++) {
	    piedata.push({ name: mg_stats.KO[i][0], data: [ parseInt(mg_stats.KO[i][1]) ] });
	}
	
	var data = { 'title': 'KO',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ " " ],		     
		     'show_legend': true,
		     'legend_position': 'right',
		     'width': 700,
		     'height': 350,
		     'data': piedata };

	return data;
    },
    widget.NOG_piechart = function(mg, mg_stats) {
	var piedata = [];
			  
	for (var i=0;i<mg_stats.NOG.length;i++) {
	    piedata.push({ name: mg_stats.NOG[i][0], data: [ parseInt(mg_stats.NOG[i][1]) ] });
	}

	var data = { 'title': 'NOG',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ " " ],		     
		     'show_legend': true,
		     'legend_position': 'right',
		     'width': 700,
		     'height': 350,
		     'data': piedata };

	return data;
    },
    widget.Subsystems_piechart = function(mg, mg_stats) {
	var piedata = [];
	
	for (var i=0;i<mg_stats.Subsystems.length;i++) {
	    piedata.push({ name: mg_stats.Subsystems[i][0], data: [ parseInt(mg_stats.Subsystems[i][1]) ] });
	}

	var data = { 'title': 'Subsystems',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ " " ],		     
		     'show_legend': true,
		     'legend_position': 'right',
		     'width': 700,
		     'height': 350,
		     'data': piedata };

	return data;
    },
    widget.domain_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.domain.length;i++) {
	    if (parseInt(mg_stats.domain[i][1]) > max) { max = parseInt(mg_stats.domain[i][1]); }
	    total += parseInt(mg_stats.domain[i][1]);
	}
	for (var i=0;i<mg_stats.domain.length;i++) {
	    bardata.push({ name: mg_stats.domain[i][0], data: [ parseFloat(parseInt(mg_stats.domain[i][1]) / max * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Domain',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.phylum_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.phylum.length;i++) {
	    if (parseInt(mg_stats.phylum[i][1]) > max) { max = parseInt(mg_stats.phylum[i][1]); }
	    total += parseInt(mg_stats.phylum[i][1]);
	}
	for (var i=0;i<mg_stats.phylum.length;i++) {
	    bardata.push({ name: mg_stats.phylum[i][0], data: [ parseFloat(parseInt(mg_stats.phylum[i][1]) / max * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Phylum',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.class_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.class.length;i++) {
	    if (parseInt(mg_stats.class[i][1]) > max) { max = parseInt(mg_stats.class[i][1]); }
	    total += parseInt(mg_stats.class[i][1]);
	}
	for (var i=0;i<mg_stats.class.length;i++) {
	    bardata.push({ name: mg_stats.class[i][0], data: [ parseFloat(parseInt(mg_stats.class[i][1]) / max * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Class',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.order_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.order.length;i++) {
	    if (parseInt(mg_stats.order[i][1]) > max) { max = parseInt(mg_stats.order[i][1]); }
	    total += parseInt(mg_stats.order[i][1]);
	}
	for (var i=0;i<mg_stats.order.length;i++) {
	    bardata.push({ name: mg_stats.order[i][0], data: [ parseFloat(parseInt(mg_stats.order[i][1]) / max * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Order',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.family_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.family.length;i++) {
	    if (parseInt(mg_stats.family[i][1]) > max) { max = parseInt(mg_stats.family[i][1]); }
	    total += parseInt(mg_stats.family[i][1]);
	}
	for (var i=0;i<mg_stats.family.length;i++) {
	    bardata.push({ name: mg_stats.family[i][0], data: [ parseFloat(parseInt(mg_stats.family[i][1]) / total * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Family',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.genus_barchart = function(mg, mg_stats) {
	var bardata = [];
	
	var total = 0;
	var max = 0;
	for (var i=0;i<mg_stats.genus.length;i++) {
	    if (parseInt(mg_stats.genus[i][1]) > max) { max = parseInt(mg_stats.genus[i][1]); }
	    total += parseInt(mg_stats.genus[i][1]);
	}
	for (var i=0;i<mg_stats.genus.length;i++) {
	    bardata.push({ name: mg_stats.genus[i][0], data: [ parseFloat(parseInt(mg_stats.genus[i][1]) / max * 100).toFixed(2) ] });
	}
	
	var data = { 'title': 'Genus',
		     'type': 'column',
		     'title_settings': { 'font-size': '18px', 'font-weight': 'bold', 'x': 0, 'text-anchor': 'start' },
		     'x_labels': [ "Distribution" ],		     
		     'show_legend': true,
		     'show_grid': true,
		     'legend_position': 'left',
		     'width': 700,
		     'height': 350,
		     'data': bardata };

	return data;
    },
    widget.analysis_statistics = function(mg, mg_stats) {
	return { width: "span6",
		 style: "float: left; margin-top: -20px;",
		 data: [ { header: "Analysis Statistics" },
			 { fancy_table: { data: [
			     [ { header: "Upload: bp Count" }, "181,571,516 bp" ],
			     [ { header: "Upload: Sequences Count" }, "180,713" ],
			     [ { header: "Upload: Mean Sequence Length" }, "1,004 ± 211 bp" ],
			     [ { header: "Upload: Mean GC percent" }, "46 ± 8 %" ],
			     [ { header: "Artificial Duplicate Reads: Sequence Count" }, "0" ],
			     [ { header: "Post QC: bp Count" }, "181,571,516 bp" ],
			     [ { header: "Post QC: Sequences Count" }, "180,713" ],
			     [ { header: "Post QC: Mean Sequence Length" }, "1,004 ± 211 bp" ],
			     [ { header: "Post QC: Mean GC percent" }, "46 ± 8 %" ],
			     [ { header: "Processed: Predicted Protein Features" }, "157,894" ],
			     [ { header: "Processed: Predicted rRNA Features" }, "22,229" ],
			     [ { header: "Alignment: Identified Protein Features" }, "109,081" ],
			     [ { header: "Alignment: Identified rRNA Features" }, "3,717" ],
			     [ { header: "Annotation: Identified Functional Categories" }, "90,658" ]
			 ] } } ] };
			 
    },
    widget.project_information = function(mg, mg_stats) {
	return { width: "span6",
		 data: [ { header: "Project Information" },
			 { p: "This metagenome is part of the project "+mg.metadata.project.name },
			 { p: mg.metadata.project.data.project_description } ] };
    };
    
})();
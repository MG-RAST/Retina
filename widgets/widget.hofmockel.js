(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Demonstration Widget for the Hofmockel Project",
                name: "hofmockel",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_renderer({"name": "paragraph", "resource": "./renderers/",  "filename": "renderer.paragraph.js" }),
		 Retina.load_renderer("paragraph"),
		 Retina.add_renderer({"name": "graph", "resource": "./renderers/",  "filename": "renderer.graph.js" }),
		 Retina.load_renderer("graph"),
	       ];
    };
    
    widget.display = function (wparams) {
	var graph_space = document.createElement('div');
	var menu_space = document.createElement('div');

	wparams.target.appendChild(menu_space);
	wparams.target.appendChild(graph_space);

	// check if required data is loaded
	if (! (stm.DataStore.hasOwnProperty('project') && stm.DataStore.project.hasOwnProperty(wparams.id))) {

	    stm.get_objects({ "type": "project", "id": wparams.id, "options": { "verbosity": "full" } }).then( function () {
		
		// make a promise list
		var stats_promises = [];
		var mgs = stm.DataStore.project[wparams.id].analyzed;
		for (i=0; i<mgs.length; i++) {
		    widget.ids.push(mgs[i][0]);
		    stats_promises.push(stm.get_objects({ "type": "metagenome", "id": mgs[i][0], "options": { "verbosity": "full" } }));
		    stats_promises.push(stm.get_objects({ "type": "metagenome_statistics", "id": mgs[i][0], "options": { "verbosity": "full" } }));
		}

		jQuery.when.apply(this, stats_promises).then(function() {
		    widget.display(wparams);
		});

	    });

	    return;
	}
	
	var valid_ids = [];
	for (i=0;i<widget.ids.length;i++) {
	    if (stm.DataStore.metagenome_statistics[widget.ids[i]]) {
		valid_ids.push(widget.ids[i]);
	    }
	}
	widget.ids = valid_ids;

	var settings = { show_grid: true, type: 'column', target: graph_space, width: "100%", height: 800, chartArea: [ 0.1, 0.1, 0.9, 0.58 ], x_labels_rotation: "300" };

	jQuery.extend(settings, widget.updateGraph('Subsystems'));
	
	var rend = widget.graph = Retina.Renderer.create("graph", settings);
	
	var sel = document.createElement('select');
	var sel_options = "";
	var categories = ["Subsystems", "COG", "NOG", "KO", "domain"];
	for (i=0; i<categories.length; i++) {
	    sel_options += "<option>"+categories[i]+"</option>";
	}
	sel.innerHTML = sel_options;
	sel.addEventListener('change', function(){
	    jQuery.extend(widget.graph.settings, widget.updateGraph(this.options[this.selectedIndex].value));
	    widget.graph.render();
	});
	menu_space.appendChild(sel);

	rend.render();
    };
    
    widget.updateGraph = function (category) {
	var x_labels = [];
	var bardata = [];
	for (i=0;i<widget.ids.length;i++) {
	    dataset = stm.DataStore.metagenome_statistics[widget.ids[i]][category];
	    var series = [];
	    for (h=0;h<dataset.length;h++) {
		if (i==0) {
		    x_labels.push(dataset[h][0]);
		}
		series.push(parseInt(dataset[h][1]));
	    }
	    bardata.push({ name: stm.DataStore.metagenome[widget.ids[i]].name, data: series});
	}

	return { x_labels: x_labels, data: bardata };
    };

    widget.ids = [];
    widget.graph = null;
    
})();
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
	return [ Retina.add_renderer({"name": "matrix", "resource": "./renderers/",  "filename": "renderer.matrix.js" }),
                 Retina.load_renderer("matrix"),
		 Retina.add_widget({"name": "mgbrowse", "resource": "./widgets/",  "filename": "widget.mgbrowse.js"}),
		 Retina.load_widget("mgbrowse")
	       ];
    };
    
    widget.display = function (wparams) {
        widget = this;
	var index = widget.index;

	var content = widget.content = wparams.main;
	
	// set the output area
	content.innerHTML = '<h3>Select Metagenomes</h3><div id="mgbrowse"></div><div id="result"></div>';

	widget.browse = Retina.Widget.create('mgbrowse', { "target": document.getElementById("mgbrowse"), "type": "listselect", "multiple": true, "wide": true, callback: Retina.WidgetInstances.metagenome_analysis[1].showData });
    };

    widget.showData = function (mgs) {
	var url = "http://api.metagenomics.anl.gov/matrix/organism?group_level=phylum&result_type=abundance&source=SEED";
	for (var i=0;i<mgs.length;i++) {
	    url += "&id="+mgs[i].id;
	}
	jQuery.getJSON(url, function (data) {
	    var dhash = [];
	    for (var i=0;i<data.columns.length;i++) {
		dhash[i] = [];
		for (var h=0;h<data.rows.length;h++) {
		    dhash[i][h] = 0;
		}
	    }
	    for (var i=0;i<data.data.length;i++) {
		var d = data.data[i];
		dhash[d[1]][d[0]] = d[2];
	    }
	    var cols = [];
	    for (var i=0;i<data.rows.length;i++) {
		cols.push(data.rows[i].id);
	    }
	    var rows = [];
	    for (var i=0;i<data.columns.length;i++) {
		rows.push(data.columns[i].name);
	    }

	    var matrix = Retina.Renderer.create("matrix", { target: document.getElementById('result'),
							    circleSize: 20,
							    data: { rows: rows, columns: cols, data: dhash } });
	    matrix.render();
	});
    }

    widget.loginAction = function (params) {
	Retina.WidgetInstances.metagenome_analysis[1].browse.result_list.update_data({},1);
    };

    
})();
(function () {
    widget = Retina.Widget.extend({
        about: function () {
            return {
                title: "MGRAST Browser Widget",
                name: "MGRASTBrowser",
                author: "Tobias Paczian",
                requires: [ ]
            };
        }
    });

    widget.setup = function () {
	return [ this.loadRenderer('table') ];
    }
    
    widget.display = function (div, args) {
	var loaded_displays = {};
	
	var header_disp;
	var table_disp;
	var detail_disp;

	if (div.selector) {
	    header_disp = div.selector;
	    table_disp = div.renderer;
	    detail_disp = div.detail;
	}

	Retina.Widget.MGRASTBrowser.detailSpace = detail_disp;

	table_disp.innerHTML = '<div class="alert alert-block alert-info" style="position: relative; top: 50px; width: 400px; left: 100px;">\
    <button type="button" class="close" data-dismiss="alert">×</button>\
    <h4>Please wait...</h4>\
    <p>The data to be displayed is currently loading. Depending on your connection speed, this may take up to one minute.</p>\
    </div>';
	
	stm.get_objects({ "type": "metagenome", "options": { "verbosity": "verbose" } }).then(function () {
	    Retina.Widget.MGRASTBrowser.show_data( { "display": table_disp } );
	});
	
	var header = document.createElement('div');
	header.setAttribute('class', 'navbar navbar-fixed-top navbar-inverse');
	header.innerHTML = '<div class="navbar-inner">\
<img src="MGRAST_logo.png" style="height: 55px; float: left;">\
  <ul class="nav">\
    <li><a href="#" onclick="Retina.Widget.UI.switchContext(\'home\');">Home</a></li>\
    <li><a href="#" onclick="Retina.Widget.UI.switchContext(\'home\');if(document.getElementById(\'register\').style.display==\'none\'){document.getElementById(\'register\').style.display=\'\';}else{document.getElementById(\'register\').style.display=\'none\'}">Register</a></li>\
    <li><a href="#">Upload</a></li>\
    <li><a href="#">Contact</a></li>\
    <li><a href="#" onclick="Retina.Widget.UI.switchContext(\'home\');if(document.getElementById(\'video\').style.display==\'none\'){document.getElementById(\'video\').style.display=\'\';}else{document.getElementById(\'video\').style.display=\'none\'}">Help</a></li>\
  </ul>\
  <form class="navbar-search pull-right" action="#"><input type="text" class="input-medium search-query" placeholder="search metagenomes"></form>\
    </div>';
	header_disp.appendChild(header);

	var title = document.createElement('div');
	title.innerHTML = "<h3>Browse all available Metagenomes</h3>";
	header_disp.appendChild(title);
    };

    widget.tableclick = function (clicked_row, clicked_cell, clicked_row_index, clicked_cell_index) {
	var id = clicked_row[6];	
	stm.get_objects({ "type": "metagenome", "id": id, "options": { "verbosity": "full" } }).then(function () {
	    Retina.Widget.MGRASTBrowser.show_details({ "id": id })
	} );
    };

    widget.show_details = function (params) {
	Retina.Widget.MGRASTBrowser.detailSpace.innerHTML = "";
	var id = params["id"];
	var data = stm.DataStore["metagenome"][id];

	if (Retina.Widget.Metagenome) {
	    Retina.Widget.Metagenome.display(document.getElementById("detail_space"), { "id": id });
	} else {
	    Retina.load_widget("Metagenome").then( function () {
		Retina.Widget.Metagenome.create(document.getElementById("detail_space"), { "id": id });
	    });
	}
    };
    
    widget.show_data = function (params) {
	var target_disp = params["display"];
	var indata = stm.DataStore["metagenome"];
	var table_data = [];
	var table_header = [ 'Project', 'Metagenome', 'PI', 'biome', 'country', 'location', 'ID', 'created' ];
	for (var i in indata) {
	    var row = [ indata[i].project_name,
			indata[i].name,
			indata[i].PI,
			indata[i].biome,
			indata[i].country,
			indata[i].location,
			indata[i].id,
			indata[i].created ];
	    table_data.push(row);
	}

	Retina.Renderer.table.render( { "target": target_disp, "data": { "data": table_data, "header": table_header }, "sort_autodetect": true, "filter": {}, "filter_autodetect": true, "sorttype": {}, "onclick": Retina.Widget.MGRASTBrowser.tableclick } );
    }
    
})();

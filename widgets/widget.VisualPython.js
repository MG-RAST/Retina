(function () {
    var widget = Retina.Widget.extend({
        about: {
                title: "Visual iPython Input Widget",
                name: "VisualPython",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.mg_select = null;
    widget.mg_multi_select = null;

    widget.setup = function () {
	return [ this.loadRenderer("listselect"),
		 this.loadRenderer("graph"),
		 this.loadRenderer("table"),
	         stm.get_objects({ "type": "metagenome", "options": { "verbosity": "full", "limit": 1 } })
	       ];
    };

    widget.cellnum = 0;
    
    widget.display = function (params) {	
	
	// get the content div
	var content = params.target;
	content.setAttribute('style', "margin-top: -20px; margin-left: 40px;");

	// create a tab menu
	var ul = document.createElement('ul');
	ul.setAttribute('class', 'nav nav-tabs')
	ul.setAttribute('style', "margin-bottom: 10px;");
	ul.setAttribute('id', 'actiontab');

	// create the div-container
	var div = document.createElement('div');
	div.setAttribute('class', 'tab-content');

	content.appendChild(ul);
	content.appendChild(div);

	// metagenome select
	var mg_sel = document.createElement('li');
	mg_sel.setAttribute('class', 'active');
	mg_sel.innerHTML = '<a href="#single_mg_select" data-toggle="tab">metagenome select</a>';
	ul.appendChild(mg_sel);

	var mg_div = document.createElement('div');
	mg_div.setAttribute('class', 'tab-pane active');
	mg_div.setAttribute('id', 'single_mg_select');
	var ls = document.createElement('div');
	mg_div.appendChild(ls);
	div.appendChild(mg_div);

	widget.mg_select = Retina.Renderer.create('listselect', {
	    target: ls,
	    multiple: false,
	    data: [],
	    value: "id",
	    label: "name",
	    filter: [ "name", "id", "biome", "project",  "pi" ],
	    callback: function (data) {
		var senddata = "# the user selected the metagenome "+stm.DataStore.metagenome[data].name+"\nmetagenome_id = '" + data + "'";
		widget.transfer(senddata, 0);
	    }
	});
	widget.mg_select.render();

	// multiple metagenome select
	var mg_sel_multi = document.createElement('li');
	mg_sel_multi.innerHTML = '<a href="#multi_mg_select" data-toggle="tab">metagenome multiselect</a>';
	ul.appendChild(mg_sel_multi);

	var mg_multi_div = document.createElement('div');
	mg_multi_div.setAttribute('class', 'tab-pane');
	mg_multi_div.setAttribute('id', 'multi_mg_select');
	var ls_multi = document.createElement('div');
	mg_multi_div.appendChild(ls_multi);
	div.appendChild(mg_multi_div);

	widget.mg_multi_select = Retina.Renderer.create('listselect', {
	    target: ls_multi,
	    multiple: true,
	    data: [],
	    value: "id",
	    label: "name",
	    filter: [ "name", "id", "biome", "project",  "pi" ],
	    callback: function (data) {
		var senddata = "# the user selected the metagenomes "+stm.DataStore.metagenome[data].name+"\nmetagenome_ids = ['" + join("','", data) + "']";
		widget.transfer(senddata, 0);
	    }
	});
	widget.mg_multi_select.render();

	// chart UI
	var chart_sel = document.createElement('li');
	chart_sel.innerHTML = '<a href="#chart" data-toggle="tab">bar-/pie-chart</a>';
	ul.appendChild(chart_sel);

	var chart_div = document.createElement('div');
	chart_div.setAttribute('class', 'tab-pane');
	chart_div.setAttribute('id', 'chart');
	chart_div.innerHTML = "<h3>insert graph UI here</h3>";
	div.appendChild(chart_div);

	// data load / convert
	var data_sel = document.createElement('li');
	data_sel.innerHTML = '<a href="#data" data-toggle="tab">data loader</a>';
	ul.appendChild(data_sel);

	var data_div = document.createElement('div');
	data_div.setAttribute('class', 'tab-pane');
	data_div.setAttribute('id', 'data');
	data_div.innerHTML = "<h3>insert data selector UI here</h3>";
	div.appendChild(data_div);

	// paragraph UI
	var paragraph_sel = document.createElement('li');
	paragraph_sel.innerHTML = '<a href="#paragraph" data-toggle="tab">text writer</a>';
	ul.appendChild(paragraph_sel);

	var paragraph_div = document.createElement('div');
	paragraph_div.setAttribute('class', 'tab-pane');
	paragraph_div.setAttribute('id', 'paragraph');
	paragraph_div.innerHTML = "<h3>insert paragraph UI here</h3>";
	div.appendChild(paragraph_div);

	// table UI
	var table_sel = document.createElement('li');
	table_sel.innerHTML = '<a href="#table" data-toggle="tab">table</a>';
	ul.appendChild(table_sel);

	var table_div = document.createElement('div');
	table_div.setAttribute('class', 'tab-pane');
	table_div.setAttribute('id', 'table');
	table_div.innerHTML = "<h3>insert table UI here</h3>";
	div.appendChild(table_div);

	// manhatten plot UI
	var manplot_sel = document.createElement('li');
	manplot_sel.innerHTML = '<a href="#manplot" data-toggle="tab">manhatten plot</a>';
	ul.appendChild(manplot_sel);

	var manplot_div = document.createElement('div');
	manplot_div.setAttribute('class', 'tab-pane');
	manplot_div.setAttribute('id', 'manplot');
	manplot_div.innerHTML = "<h3>insert manhatten plot UI here</h3>";
	div.appendChild(manplot_div);

	// heatmap UI
	var heatmap_sel = document.createElement('li');
	heatmap_sel.innerHTML = '<a href="#heatmap" data-toggle="tab">heatmap</a>';
	ul.appendChild(heatmap_sel);

	var heatmap_div = document.createElement('div');
	heatmap_div.setAttribute('class', 'tab-pane');
	heatmap_div.setAttribute('id', 'heatmap');
	heatmap_div.innerHTML = "<h3>insert heatmap UI here</h3>";
	div.appendChild(heatmap_div);

	// plot UI
	var plot_sel = document.createElement('li');
	plot_sel.innerHTML = '<a href="#plot" data-toggle="tab">plot</a>';
	ul.appendChild(plot_sel);

	var plot_div = document.createElement('div');
	plot_div.setAttribute('class', 'tab-pane');
	plot_div.setAttribute('id', 'plot');
	plot_div.innerHTML = "<h3>insert plot UI here</h3>";
	div.appendChild(plot_div);

	// spatial map UI
	var spatial_sel = document.createElement('li');
	spatial_sel.innerHTML = '<a href="#spatial" data-toggle="tab">spatial map</a>';
	ul.appendChild(spatial_sel);

	var spatial_div = document.createElement('div');
	spatial_div.setAttribute('class', 'tab-pane');
	spatial_div.setAttribute('id', 'spatial');
	spatial_div.innerHTML = "<h3>insert spatial map UI here</h3>";
	div.appendChild(spatial_div);

    };
    
    widget.transfer = function (data, n) {
	var command = data.replace(/'/g, '"').replace(/"/g, "!!").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
	var msgstring = 'ipy.write_cell('+n+', \''+command+'\');';
	stm.send_message('myframe', msgstring, 'action');
    };
    
    widget.loadSelector = function () {
	var metagenome_data = [];
	for (i in stm.DataStore["metagenome"]) {
	    if (stm.DataStore["metagenome"].hasOwnProperty(i)) {
		if (stm.DataStore["metagenome"][i]["metadata"]  ==  null ) {
		    continue;
		}
		if (stm.DataStore["metagenome"][i]["metadata"]["sample"]  ==  null ) {
		    continue;
		}
		if (stm.DataStore["metagenome"][i]["metadata"]["project"]  ==  null ) {
		    continue;
		}
		metagenome_data.push( { "name": stm.DataStore["metagenome"][i]["name"],
					"id": i,
					"biome": stm.DataStore["metagenome"][i]["metadata"]["sample"]["data"]["biome"],
					"project": stm.DataStore["metagenome"][i]["metadata"]["project"]["name"],
					"pi": stm.DataStore["metagenome"][i]["metadata"]["project"]["data"]["PI_firstname"] + ' ' + stm.DataStore["metagenome"][i]["metadata"]["project"]["data"]["PI_lastname"] });
	    }
	}

	widget.mg_select.settings.data = metagenome_data;
	widget.mg_select.render();
    };
    
})();
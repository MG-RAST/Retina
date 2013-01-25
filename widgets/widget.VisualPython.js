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
	         stm.get_objects({ "type": "metagenome", "options": { "verbosity": "full", "limit": 10 } })
	       ];
    };

    widget.cellnum = 0;
    
    widget.transfer = function (data, overwrite) {
	var command = data.replace(/'/g, '"').replace(/"/g, "!!").replace(/\n/g, "\\n");
	var msgstring = 'ipy.'+(overwrite ? 'write' : 'append_to')+'_cell(null, \''+command+'\');';
	stm.send_message('ipython_dash', msgstring, 'action');
    };

    widget.display = function (params) {	
	
	// get the content div
	var content = params.target;
	content.setAttribute('style', "margin-top: 5px;margin-left: 10px;");

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
	mg_sel.innerHTML = '<a href="#single_mg_select" data-toggle="tab">object select</a>';
	ul.appendChild(mg_sel);

	var mg_div = document.createElement('div');
	mg_div.setAttribute('class', 'tab-pane active');
	mg_div.setAttribute('id', 'single_mg_select');
	var ls = document.createElement('div');
	var ls_container = document.createElement('div');
	ls_container.appendChild(ls);
	ls_container.setAttribute('style', 'float: left;');
	mg_div.appendChild(ls_container);
	div.appendChild(mg_div);

	var control_mg = document.createElement('div');
	control_mg.setAttribute('style', 'float: left; margin-left: 20px;');
	mg_div.appendChild(control_mg);

	control_mg.innerHTML = '<table style="text-align: left; margin-top: 10px;">\
<tr><th style="width: 120px;">variable name</th><td><input type="text" id="mg_variable_name" value="object_id" style="margin-bottom: 0px;"></td></tr>\
<tr><th>stored attribute</th><td><select id="mg_attribute_select" style="margin-bottom: 0px;"><option>id</option><option>name</option></select></td></tr>\
<tr><th>cell content</th><td><select id="mg_content_handling" style="margin-bottom: 0px;"><option>append</option><option>replace</option></select></td></tr>\
<tr><th style="vertical-align: top;">comment</th><td><textarea id="mg_comment">the id of the object to load data for</textarea></td></tr>\
</table>';

	var metagenome_data = [];
	for (i in stm.DataStore["metagenome"]) {
	    if (stm.DataStore["metagenome"].hasOwnProperty(i)) {
		metagenome_data.push( { "name": stm.DataStore["metagenome"][i]["name"], "id": i, "project": (stm.DataStore["metagenome"][i].metadata && stm.DataStore["metagenome"][i].metadata.project && stm.DataStore["metagenome"][i].metadata.project.name) ? stm.DataStore["metagenome"][i].metadata.project.name : "-",  "biome": (stm.DataStore["metagenome"][i].metadata && stm.DataStore["metagenome"][i].metadata.env_package && stm.DataStore["metagenome"][i].metadata.env_package.type) ? stm.DataStore["metagenome"][i].metadata.env_package.type : "-", "type": "metagenome", "pi": "-" });
	    }
	}

	widget.mg_select = Retina.Renderer.create('listselect', {
	    target: ls,
	    multiple: false,
	    data: metagenome_data,
	    value: "id",
	    label: "name",
	    filter: [ "name", "id", "biome", "project", "type" ],
	    callback: function (data) {
		var senddata = "";
		if (document.getElementById('mg_comment').value) {
		    senddata += "# " + document.getElementById('mg_comment').value.split(/\n/).join("\n# ") + "\n";
		}
		senddata += document.getElementById('mg_variable_name').value + " = '" + stm.DataStore.metagenome[data][document.getElementById('mg_attribute_select').options[document.getElementById('mg_attribute_select').selectedIndex].value] + "'";
		widget.transfer(senddata, (document.getElementById('mg_content_handling').options[document.getElementById('mg_content_handling').selectedIndex].value == 'replace'));
	    }
	});
	widget.mg_select.render();

	// multiple metagenome select
	var mg_sel_multi = document.createElement('li');
	mg_sel_multi.innerHTML = '<a href="#multi_mg_select" data-toggle="tab">object multiselect</a>';
	ul.appendChild(mg_sel_multi);

	var mg_multi_div = document.createElement('div');
	mg_multi_div.setAttribute('class', 'tab-pane');
	mg_multi_div.setAttribute('id', 'multi_mg_select');
	var ls_multi = document.createElement('div');
	var ls_multi_container = document.createElement('div');
	ls_multi_container.setAttribute('style', 'float: left;');
	ls_multi_container.appendChild(ls_multi);
	mg_multi_div.appendChild(ls_multi_container);
	div.appendChild(mg_multi_div);

	var control_mg_multi = document.createElement('div');
	control_mg_multi.setAttribute('style', 'float: left; margin-left: 20px;');
	mg_multi_div.appendChild(control_mg_multi);

	control_mg_multi.innerHTML = '<table style="text-align: left; margin-top: 10px;">\
<tr><th style="width: 120px;">variable name</th><td><input type="text" id="mg_multi_variable_name" value="object_ids" style="margin-bottom: 0px;"></td></tr>\
<tr><th>stored attribute</th><td><select id="mg_multi_attribute_select" style="margin-bottom: 0px;"><option>id</option><option>name</option></select></td></tr>\
<tr><th>cell content</th><td><select id="mg_multi_content_handling" style="margin-bottom: 0px;"><option>append</option><option>replace</option></select></td></tr>\
<tr><th style="vertical-align: top;">comment</th><td><textarea id="mg_multi_comment">the ids of the objects to load data for</textarea></td></tr>\
</table>';


	widget.mg_multi_select = Retina.Renderer.create('listselect', {
	    target: ls_multi,
	    multiple: true,
	    data: metagenome_data,
	    value: "id",
	    label: "name",
	    filter: [ "name", "id", "biome", "project", "type" ],
	    callback: function (data) {
		var senddata = "";
		if (document.getElementById('mg_multi_comment').value) {
		    senddata += "# " + document.getElementById('mg_multi_comment').value.split(/\n/).join("\n# ") + "\n";
		}
		senddata += document.getElementById('mg_multi_variable_name').value + " = [ ";
		var sd = [];
		for (i=0;i<data.length;i++) {
		    sd.push("'" + stm.DataStore.metagenome[data[i]][document.getElementById('mg_multi_attribute_select').options[document.getElementById('mg_multi_attribute_select').selectedIndex].value] + "'");
		}
		senddata += sd.join(", ");
		senddata += " ]";
		widget.transfer(senddata, (document.getElementById('mg_multi_content_handling').options[document.getElementById('mg_multi_content_handling').selectedIndex].value == 'replace'));
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
	chart_div.innerHTML = '<table style="vertical-align: middle; text-align: left;">\
<tr><th>type</th><td><select id="graph_type" style="margin-bottom: 0px;"><option>column</option><option>stackedColumn</option><option>row</option><option>stackedRow</option><option>line</option><option>pie</option><option>stackedArea</option></select></td><td rowspan=5 style="width: 10px;"></td><th>data variable</th><td><input type="text" id="graph_data" value="graph_data" style="margin-bottom: 0px;"></td></tr>\
<tr><th>title</th><td><input type="text" id="graph_title" value="Graph 1" style="margin-bottom: 0px;"></td><th>target name</th><td><input type="text" id="graph_target" value="graph_1" style="margin-bottom: 0px;"></td></tr>\
<tr><th>x-axis title</th><td><input type="text" id="graph_x_title" value="X" style="margin-bottom: 0px;"></td></tr>\
<tr><th>y-axis title</th><td><input type="text" id="graph_y_title" value="Y" style="margin-bottom: 0px;"></td></tr>\
<tr><th>legend position</th><td><select id="graph_legend_position" style="margin-bottom: 0px;"><option>left</option><option>right</option><option>none</option></select></td></tr>\
</table>';
	div.appendChild(chart_div);

	var graph_button = document.createElement('button');
	graph_button.setAttribute('class', 'btn btn-success');
	graph_button.innerHTML = "<i class='icon-ok icon-white'></i>";
	graph_button.setAttribute('style', 'position: relative; bottom: 40px; left: 660px;');
	graph_button.addEventListener('click', function(){
	    var senddata = "Ipy.RETINA.graph(target='"+document.getElementById('graph_target').value+"', data="+document.getElementById('graph_data').value+", btype='"+document.getElementById('graph_type').options[document.getElementById('graph_type').selectedIndex].value+"', title='"+document.getElementById('graph_title').value+"', x_title='"+document.getElementById('graph_x_title').value+"', y_title='"+document.getElementById('graph_y_title').value+"', ";
	    var lpos = document.getElementById('graph_legend_position').options[document.getElementById('graph_legend_position').selectedIndex].value;
	    if (lpos == 'none') {
		senddata += "show_legend=False)";
	    } else {
		senddata += "show_legend=True, legend_position='"+lpos+"')";
	    }
	    widget.transfer(senddata, false);
	});
	chart_div.appendChild(graph_button);

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
	heatmap_div.innerHTML = '<table style="vertical-align: middle; text-align: left;">\
<tr><th>tree height</th><td><input type="text" id="heat_tree_height" style="margin-bottom: 0px;" value="50"></td><td rowspan=5 style="width: 10px;"></td><th>data variable</th><td><input type="text" id="heat_data" value="heatmap_data" style="margin-bottom: 0px;"></td></tr>\
<tr><th>tree width</th><td><input type="text" id="heat_tree_width" value="50" style="margin-bottom: 0px;"></td><th>target name</th><td><input type="text" id="heat_target" value="heatmap_1" style="margin-bottom: 0px;"></td></tr>\
<tr><th>legend height</th><td><input type="text" id="heat_legend_height" value="250" style="margin-bottom: 0px;"></td></tr>\
<tr><th>legend width</th><td><input type="text" id="heat_legend_width" value="250" style="margin-bottom: 0px;"></td></tr>\
<tr><th>minimum cell height</th><td><input type="text" id="heat_min_cell_height" value="19" style="margin-bottom: 0px;"></td></tr>\
</table>';

	var heat_button = document.createElement('button');
	heat_button.setAttribute('class', 'btn btn-success');
	heat_button.innerHTML = "<i class='icon-ok icon-white'></i>";
	heat_button.setAttribute('style', 'position: relative; bottom: 40px; left: 660px;');
	heat_button.addEventListener('click', function(){
	    var senddata = "Ipy.RETINA.heatmap(target='"+document.getElementById('heat_target').value+"', data="+document.getElementById('heat_data').value+", tree_height="+document.getElementById('heat_tree_height').value+", tree_width="+document.getElementById('heat_tree_width').value+", legend_width='"+document.getElementById('heat_legend_width').value+"', legend_height='"+document.getElementById('heat_legend_height').value+"', min_cell_height='"+document.getElementById('heat_min_cell_height').value+"')";
	    widget.transfer(senddata, false);
	});
	heatmap_div.appendChild(heat_button);
	div.appendChild(heatmap_div);

	// plot UI
	var plot_sel = document.createElement('li');
	plot_sel.innerHTML = '<a href="#plot" data-toggle="tab">plot</a>';
	ul.appendChild(plot_sel);

	var plot_div = document.createElement('div');
	plot_div.setAttribute('class', 'tab-pane');
	plot_div.setAttribute('id', 'plot');
	plot_div.innerHTML = '<table style="vertical-align: middle; text-align: left;">\
<tr><th>connected</th><td><select id="plot_connected" style="margin-bottom: 0px;"><option value="True">yes</option><option value="False">no</option></select></td><td rowspan=5 style="width: 10px;"></td><th>data variable</th><td><input type="text" id="plot_data" value="plot_data" style="margin-bottom: 0px;"></td></tr>\
<tr><th>title</th><td><input type="text" id="plot_title" value="Plot 1" style="margin-bottom: 0px;"></td><th>target name</th><td><input type="text" id="plot_target" value="plot_1" style="margin-bottom: 0px;"></td></tr>\
<tr><th>x-axis maximum value</th><td><input type="text" id="plot_x_max" value="100" style="margin-bottom: 0px;"></td><th>show dots</th><td><select id="plot_dots" style="margin-bottom: 0px;"><option value="True">yes</option><option value="False">no</option></select></td></tr>\
<tr><th>y-axis maximum value</th><td><input type="text" id="plot_y_max" value="100" style="margin-bottom: 0px;"></td></tr>\
<tr><th>legend position</th><td><select id="graph_legend_position" style="margin-bottom: 0px;"><option>left</option><option>right</option><option>none</option></select></td></tr>\
</table>';

	var plot_button = document.createElement('button');
	plot_button.setAttribute('class', 'btn btn-success');
	plot_button.innerHTML = "<i class='icon-ok icon-white'></i>";
	plot_button.setAttribute('style', 'position: relative; bottom: 40px; left: 660px;');
	plot_button.addEventListener('click', function(){
	    var senddata = "Ipy.RETINA.plot(target='"+document.getElementById('plot_target').value+"', data="+document.getElementById('plot_data').value+", show_dots="+document.getElementById('plot_dots').options[document.getElementById('plot_dots').selectedIndex].value+", connected="+document.getElementById('plot_connected').options[document.getElementById('plot_connected').selectedIndex].value+", title='"+document.getElementById('plot_title').value+"', x_max='"+document.getElementById('plot_x_max').value+"', y_max='"+document.getElementById('plot_y_max').value+"', ";
	    var lpos = document.getElementById('graph_legend_position').options[document.getElementById('graph_legend_position').selectedIndex].value;
	    if (lpos == 'none') {
		senddata += "show_legend=False)";
	    } else {
		senddata += "show_legend=True, legend_position='"+lpos+"')";
	    }
	    widget.transfer(senddata, false);
	});
	plot_div.appendChild(plot_button);
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
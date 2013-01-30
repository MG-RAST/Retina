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
	content.setAttribute('style', "margin-top: 5px; margin-left: 10px;");
	content.setAttribute('class', "tabbable tabs-left");

	// create a tab menu
	var ul = document.createElement('ul');
	ul.setAttribute('class', 'nav nav-tabs')
	ul.setAttribute('style', "margin-top: 35px; margin-right: -1px; height: 280px;");

	// create the div-container
	var div = document.createElement('div');
	div.setAttribute('class', 'tab-content');
	div.setAttribute('style', 'height: 315px; border-bottom: 1px solid #DDDDDD;');

	content.appendChild(ul);
	content.appendChild(div);

	// get the data for the metagenome select
	var metagenome_data = [];
	for (i in stm.DataStore["metagenome"]) {
	    if (stm.DataStore["metagenome"].hasOwnProperty(i)) {
		metagenome_data.push( { "name": stm.DataStore["metagenome"][i]["name"], "id": i, "project": (stm.DataStore["metagenome"][i].metadata && stm.DataStore["metagenome"][i].metadata.project && stm.DataStore["metagenome"][i].metadata.project.name) ? stm.DataStore["metagenome"][i].metadata.project.name : "-",  "biome": (stm.DataStore["metagenome"][i].metadata && stm.DataStore["metagenome"][i].metadata.env_package && stm.DataStore["metagenome"][i].metadata.env_package.type) ? stm.DataStore["metagenome"][i].metadata.env_package.type : "-", "type": "metagenome", "pi": "-" });
	    }
	}

	// sample select
	var sample_select = document.createElement('li');
	sample_select.setAttribute('class', 'active');
	sample_select.innerHTML = '<a href="#sample_select" data-toggle="tab">'+widget.number(1)+'select samples</a>';
	ul.appendChild(sample_select);

	var sample_select_div = document.createElement('div');
	sample_select_div.setAttribute('class', 'tab-pane active');
	sample_select_div.setAttribute('id', 'sample_select');

	var sample_select_ul = document.createElement('ul');
	sample_select_ul.setAttribute('class', 'nav nav-tabs')
	sample_select_ul.setAttribute('style', "margin-bottom: 10px;");

	var sample_select_disp = document.createElement('div');
	sample_select_disp.setAttribute('class', 'tab-content');

	var sample_select_li = document.createElement('li');
	sample_select_li.setAttribute('class', 'active');
	sample_select_li.innerHTML = '<a href="#sample_select_li" data-toggle="tab">select the samples you want to analyze</a>';
	sample_select_ul.appendChild(sample_select_li);

	var sample_select_disp_div = document.createElement('div');
	sample_select_disp_div.setAttribute('class', 'tab-pane active');
	sample_select_disp_div.setAttribute('id', 'sample_select_li');
	sample_select_disp_div.setAttribute('style', 'padding-top: 10px');
	sample_select_disp.appendChild(sample_select_disp_div);

	var ls_multi_container = document.createElement('div');
	ls_multi_container.setAttribute('style', 'float: left; margin-left: 20px;');

	var ls_multi = document.createElement('div');
	ls_multi_container.appendChild(ls_multi);

	sample_select_disp_div.appendChild(ls_multi_container);

	sample_select_disp.appendChild(sample_select_disp_div);

	sample_select_div.appendChild(sample_select_ul);
	sample_select_div.appendChild(sample_select_disp);

	div.appendChild(sample_select_div);

	var control_sample_select = document.createElement('div');
	control_sample_select.setAttribute('style', 'float: left; margin-left: 20px;');
	sample_select_disp_div.appendChild(control_sample_select);

	control_sample_select.innerHTML = '<table style="text-align: left; margin-top: 10px;">\
<tr><th style="width: 120px;">variable name</th><td><input type="text" id="mg_multi_variable_name" value="object_ids" style="margin-bottom: 0px;"></td></tr>\
<tr><th>stored attribute</th><td><select id="sample_select_attribute_select" style="margin-bottom: 0px;"><option>id</option><option>name</option></select></td></tr>\
<tr><th>cell content</th><td><select id="sample_select_content_handling" style="margin-bottom: 0px;"><option>append</option><option>replace</option></select></td></tr>\
<tr><th style="vertical-align: top;">comment</th><td><textarea id="sample_select_comment">the ids of the objects to load data for</textarea></td></tr>\
</table>';

	widget.sample_select = Retina.Renderer.create('listselect', {
	    target: ls_multi,
	    multiple: true,
	    data: metagenome_data,
	    value: "id",
	    label: "name",
	    filter: [ "name", "id", "biome", "project", "type" ],
	    callback: function (data) {
		var senddata = "";
		if (document.getElementById('sample_select_comment').value) {
		    senddata += "# " + document.getElementById('sample_select_comment').value.split(/\n/).join("\n# ") + "\n";
		}
		senddata += document.getElementById('sample_select_variable_name').value + " = [ ";
		var sd = [];
		for (i=0;i<data.length;i++) {
		    sd.push("'" + stm.DataStore.metagenome[data[i]][document.getElementById('sample_select_attribute_select').options[document.getElementById('sample_select_attribute_select').selectedIndex].value] + "'");
		}
		senddata += sd.join(", ");
		senddata += " ]";
		widget.transfer(senddata, (document.getElementById('sample_select_content_handling').options[document.getElementById('sample_select_content_handling').selectedIndex].value == 'replace'));
	    }
	});
	widget.sample_select.render();

	// data load / convert
	var data_sel = document.createElement('li');
	data_sel.innerHTML = '<a href="#data" data-toggle="tab">'+widget.number(2)+'select data</a>';
	ul.appendChild(data_sel);

	var data_div = document.createElement('div');
	data_div.setAttribute('class', 'tab-pane');
	data_div.setAttribute('id', 'data');

	var data_ul = document.createElement('ul');
	data_ul.setAttribute('class', 'nav nav-tabs')
	data_ul.setAttribute('style', "margin-bottom: 10px;");

	var data_disp = document.createElement('div');
	data_disp.setAttribute('class', 'tab-content');
	data_disp.setAttribute('style', 'padding-left: 15px;');

	data_div.appendChild(data_ul);
	data_div.appendChild(data_disp);

	var data_li = document.createElement('li');
	data_li.setAttribute('class', 'active');
	data_li.innerHTML = '<a href="#data_li" data-toggle="tab">select the data you want to analyze</a>';
	data_ul.appendChild(data_li);

	var data_disp_div = document.createElement('div');
	data_disp_div.setAttribute('class', 'tab-pane active');
	data_disp_div.setAttribute('id', 'data_li');
	data_disp_div.innerHTML = "<h3>Select Data</h3>";

	div.appendChild(data_div);

	// visualizations
	var vis_sel = document.createElement('li');
	vis_sel.innerHTML = '<a href="#vis" data-toggle="tab">'+widget.number(3)+'select visualization</a>';
	ul.appendChild(vis_sel);

	var vis_div = document.createElement('div');
	vis_div.setAttribute('class', 'tab-pane');
	vis_div.setAttribute('id', 'vis');
	div.appendChild(vis_div);

	var vis_ul = document.createElement('ul');
	vis_ul.setAttribute('class', 'nav nav-tabs')
	vis_ul.setAttribute('style', "margin-bottom: 10px;");

	var vis_disp = document.createElement('div');
	vis_disp.setAttribute('class', 'tab-content');
	vis_disp.setAttribute('style', 'padding-left: 15px;');

	vis_div.appendChild(vis_ul);
	vis_div.appendChild(vis_disp);

	// paragraph UI
	var paragraph_sel = document.createElement('li');
	paragraph_sel.setAttribute('class', 'active');
	paragraph_sel.innerHTML = '<a href="#paragraph" data-toggle="tab"><i class="icon-align-center" style="margin-right: 5px;"></i>text writer</a>';
	vis_ul.appendChild(paragraph_sel);

	var paragraph_div = document.createElement('div');
	widget.currentParagraph = [];
	paragraph_div.setAttribute('class', 'tab-pane active');
	paragraph_div.setAttribute('id', 'paragraph');
	paragraph_div.innerHTML = '<table>\
<tr>\
 <td>\
  <div class="btn-toolbar">\
   <div class="btn-group" data-toggle="buttons-radio">\
     <button type="button" class="btn active" style="font-weight: bold;" title="title" id="paragraph_t">T</button>\
     <button type="button" class="btn" style="font-weight: bold;" title="header" id="paragraph_h">H</button>\
     <button type="button" class="btn" style="font-weight: bold;" title="paragraph" id="paragraph_p">P</button>\
   </div>\
   <div class="btn-group">\
    <button type="button" class="btn" style="margin-left: 70px;" onclick="document.getElementById(\'paragraph_text\').value = \'\';" title="clear text"><i class="icon-trash"></i></button>\
    <button type="button" class="btn" onclick="Retina.WidgetInstances.VisualPython[0].paragraph(\'replace\');" title="replace paragraph"><i class="icon-refresh"></i></button>\
    <button type="button" class="btn" onclick="Retina.WidgetInstances.VisualPython[0].paragraph(\'add\');" title="add paragraph"><i class="icon-plus"></i></button>\
   </div>\
  </div>\
  <textarea style="width: 275px; height: 175px;" id="paragraph_text"></textarea>\
 </td>\
 <td style="padding-left: 20px;">\
  <div class="btn-toolbar">\
   <div class="btn-group">\
    <button type="button" class="btn" onclick="if(confirm(\'Do you really want to delete ALL paragraphs from the list?\')){Retina.WidgetInstances.VisualPython[0].paragraph(\'delete_all\');}" title="delete all paragraphs"><i class="icon-trash"></i></button>\
    <button type="button" class="btn" onclick="if(confirm(\'Do you really want to delete the selected paragraph from the list?\')){Retina.WidgetInstances.VisualPython[0].paragraph(\'delete\');}" title="delete selected paragraph"><i class="icon-remove"></i></button>\
    <button type="button" class="btn" onclick="Retina.WidgetInstances.VisualPython[0].paragraph(\'edit\');" title="edit paragraph"><i class="icon-edit"></i></button>\
   </div>\
   <div class="btn-group">\
    <button type="button" class="btn btn-success" style="margin-left: 70px;" title="create IPython command" onclick="Retina.WidgetInstances.VisualPython[0].paragraph(\'submit\');"><i class="icon-ok icon-white"></i></button>\
   </div>\
  </div>\
  <select multiple size=11 id="paragraph_list"></select>\
 </td>\
 <td style="padding-left: 20px; vertical-align: top;">\
  <table style="text-align: left; margin-top: 50px;">\
   <tr><th style="width: 100px;">target</th><td><input type="text" value="paragraph_1" id="paragraph_target"></td></tr>\
   <tr><th>cell content</th><td><select id="para_content_handling" style="margin-bottom: 0px;"><option>append</option><option>replace</option></select></td></tr>\
   <tr><th style="vertical-align: top;">comment</th><td><textarea id="para_comment">introductory paragraph</textarea></td></tr>\
  </table>\
 </td>\
</tr>\
</table>';
	vis_disp.appendChild(paragraph_div);

	// chart UI
	var chart_sel = document.createElement('li');
	chart_sel.innerHTML = '<a href="#chart" data-toggle="tab"><i class="icon-signal" style="margin-right: 5px;"></i>bar-/pie-chart</a>';
	vis_ul.appendChild(chart_sel);

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
	vis_disp.appendChild(chart_div);

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

	// // table UI
	// var table_sel = document.createElement('li');
	// table_sel.innerHTML = '<a href="#table" data-toggle="tab">table</a>';
	// vis_ul.appendChild(table_sel);

	// var table_div = document.createElement('div');
	// table_div.setAttribute('class', 'tab-pane');
	// table_div.setAttribute('id', 'table');
	// table_div.innerHTML = "<h3>table UI in development</h3>";
	// vis_disp.appendChild(table_div);

	// heatmap UI
	var heatmap_sel = document.createElement('li');
	heatmap_sel.innerHTML = '<a href="#heatmap" data-toggle="tab"><img style="margin-right: 5px; position: relative; bottom: 2px;" src="images/icon_heatmap.png">heatmap</a>';
	vis_ul.appendChild(heatmap_sel);

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
	    var senddata = "Ipy.RETINA.heatmap(target='"+document.getElementById('heat_target').value+"', data="+document.getElementById('heat_data').value+", tree_height="+document.getElementById('heat_tree_height').value+", tree_width="+document.getElementById('heat_tree_width').value+", legend_width="+document.getElementById('heat_legend_width').value+", legend_height="+document.getElementById('heat_legend_height').value+", min_cell_height="+document.getElementById('heat_min_cell_height').value+")";
	    widget.transfer(senddata, false);
	});
	heatmap_div.appendChild(heat_button);
	vis_disp.appendChild(heatmap_div);

	// plot UI
	var plot_sel = document.createElement('li');
	plot_sel.innerHTML = '<a href="#plot" data-toggle="tab"><img style="margin-right: 5px; position: relative; bottom: 2px;" src="images/icon_plot.png">plot</a>';
	vis_ul.appendChild(plot_sel);

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
	vis_disp.appendChild(plot_div);

	// boxplot map UI
	var boxplot_sel = document.createElement('li');
	boxplot_sel.innerHTML = '<a href="#boxplot" data-toggle="tab"><img style="margin-right: 5px; position: relative; bottom: 2px;" src="images/icon_boxplot.png">boxplot</a>';
	vis_ul.appendChild(boxplot_sel);

	var boxplot_div = document.createElement('div');
	boxplot_div.setAttribute('class', 'tab-pane');
	boxplot_div.setAttribute('id', 'boxplot');
	boxplot_div.innerHTML = '<table style="vertical-align: middle; text-align: left;">\
<tr><th>height</th><td><input type="text" id="boxplot_height" style="margin-bottom: 0px;" value="350"></td><td rowspan=5 style="width: 10px;"></td><th>data variable</th><td><input type="text" id="boxplot_data" value="boxplot_data" style="margin-bottom: 0px;"></td></tr>\
<tr><th>width</th><td><input type="text" id="boxplot_width" value="150" style="margin-bottom: 0px;"></td><th>target name</th><td><input type="text" id="boxplot_target" value="boxplot_1" style="margin-bottom: 0px;"></td></tr>\
</table>';

	var boxplot_button = document.createElement('button');
	boxplot_button.setAttribute('class', 'btn btn-success');
	boxplot_button.innerHTML = "<i class='icon-ok icon-white'></i>";
	boxplot_button.setAttribute('style', 'position: relative; bottom: 40px; left: 660px;');
	boxplot_button.addEventListener('click', function(){
	    var senddata = "Ipy.RETINA.boxplot(target='"+document.getElementById('boxplot_target').value+"', data="+document.getElementById('boxplot_data').value+", height="+document.getElementById('boxplot_height').value+", width="+document.getElementById('boxplot_width').value+")";
	    widget.transfer(senddata, false);
	});
	boxplot_div.appendChild(boxplot_button);
	vis_disp.appendChild(boxplot_div);

	// deviationplot UI
	var deviationplot_sel = document.createElement('li');
	deviationplot_sel.innerHTML = '<a href="#deviationplot" data-toggle="tab"><i class="icon-tasks" style="margin-right: 5px;"></i>deviationplot</a>';
	vis_ul.appendChild(deviationplot_sel);

	var deviationplot_div = document.createElement('div');
	deviationplot_div.setAttribute('class', 'tab-pane');
	deviationplot_div.setAttribute('id', 'deviationplot');
	deviationplot_div.innerHTML = '<table style="vertical-align: middle; text-align: left;">\
<tr><th>height</th><td><input type="text" id="deviationplot_height" style="margin-bottom: 0px;" value="80"></td><td rowspan=5 style="width: 10px;"></td><th>data variable</th><td><input type="text" id="deviationplot_data" value="deviationplot_data" style="margin-bottom: 0px;"></td></tr>\
<tr><th>width</th><td><input type="text" id="deviationplot_width" value="400" style="margin-bottom: 0px;"></td><th>target name</th><td><input type="text" id="deviationplot_target" value="deviationplot_1" style="margin-bottom: 0px;"></td></tr>\
</table>';

	var deviationplot_button = document.createElement('button');
	deviationplot_button.setAttribute('class', 'btn btn-success');
	deviationplot_button.innerHTML = "<i class='icon-ok icon-white'></i>";
	deviationplot_button.setAttribute('style', 'position: relative; bottom: 40px; left: 660px;');
	deviationplot_button.addEventListener('click', function(){
	    var senddata = "Ipy.RETINA.deviationplot(target='"+document.getElementById('deviationplot_target').value+"', data="+document.getElementById('deviationplot_data').value+", height="+document.getElementById('deviationplot_height').value+", width="+document.getElementById('deviationplot_width').value+")";
	    widget.transfer(senddata, false);
	});
	deviationplot_div.appendChild(deviationplot_button);
	vis_disp.appendChild(deviationplot_div);

	// // manhatten plot UI
	// var manplot_sel = document.createElement('li');
	// manplot_sel.innerHTML = '<a href="#manplot" data-toggle="tab">manhatten plot</a>';
	// vis_ul.appendChild(manplot_sel);

	// var manplot_div = document.createElement('div');
	// manplot_div.setAttribute('class', 'tab-pane');
	// manplot_div.setAttribute('id', 'manplot');
	// manplot_div.innerHTML = "<h3>manhatten plot UI in development</h3>";
	// div.appendChild(manplot_div);

	// // spatial map UI
	// var spatial_sel = document.createElement('li');
	// spatial_sel.innerHTML = '<a href="#spatial" data-toggle="tab">spatial map</a>';
	// vis_ul.appendChild(spatial_sel);

	// var spatial_div = document.createElement('div');
	// spatial_div.setAttribute('class', 'tab-pane');
	// spatial_div.setAttribute('id', 'spatial');
	// spatial_div.innerHTML = "<h3>spatial map UI in development</h3>";
	// div.appendChild(spatial_div);
    };

    widget.paragraph = function (command) {
	widget = Retina.WidgetInstances.VisualPython[0];
	var sel = document.getElementById('paragraph_list');
	var txt = document.getElementById('paragraph_text');
    	switch (command) {
    	case 'add':
	    var para = { "title": txt.value };
	    var type = "T";
	    if (document.getElementById('paragraph_h').className == 'btn active') {
		type = "H";
		para = { "header": txt.value };
	    } else if (document.getElementById('paragraph_p').className == 'btn active') {
		type = "P";
		para = { "p": txt.value };
	    }
	    sel.options[sel.options.length] = new Option(type+": "+txt.value, type+": "+txt.value);
	    widget.currentParagraph.push(para);
    	    break;
    	case 'delete':
	    if (sel.selectedIndex > -1) {
		widget.currentParagraph.splice(sel.selectedIndex, 1);
		sel.remove(sel.selectedIndex);
	    }
    	    break;
    	case 'edit':
	    if (sel.selectedIndex > -1) {
    		var hash = widget.currentParagraph[sel.selectedIndex];
		var val;
		if (hash.hasOwnProperty('header')) {
		    document.getElementById('paragraph_h').click();
		    val = hash.header;
		} else if (hash.hasOwnProperty('title')) {
		    document.getElementById('paragraph_t').click();
		    val = hash.title;
		} else {
		    document.getElementById('paragraph_p').click();
		    val = hash.p;
		}
		txt.value = val;
	    }
    	    break;
	case 'replace':
	    if (sel.selectedIndex > -1) {
		var para = { "title": txt.value };
		var type = "T";
		if (document.getElementById('paragraph_h').className == 'btn active') {
		    type = "H";
		    para = { "header": txt.value };
		} else if (document.getElementById('paragraph_p').className == 'btn active') {
		    type = "P";
		    para = { "p": txt.value };
		}
		widget.currentParagraph[sel.selectedIndex] = para;
		sel.options[sel.selectedIndex] = new Option(type+": "+txt.value, type+": "+txt.value);
	    }
	    break;
	case 'delete_all':
	    sel.options.length = 0;
	    widget.currentParagraph = [];
	    break;
    	case 'submit':
    	    var senddata = "";
	    if (document.getElementById('para_comment').value) {
		senddata += "# " + document.getElementById('para_comment').value.split(/\n/).join("\n# ") + "\n";
	    }
	    senddata += "Ipy.RETINA.paragraph(target='"+document.getElementById('paragraph_target').value+"', data="+JSON.stringify(widget.currentParagraph)+")";

	    widget.transfer(senddata, (document.getElementById('para_content_handling').options[document.getElementById('para_content_handling').selectedIndex].value == 'replace'));
    	    break;
    	}
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

    widget.number = function (number) {
	return '<p style="font-size: 16px; float: left; font-weight: bold; height: 18px; text-align: center; vertical-align: middle; margin-right: 8px; border: 5px solid #0088CC; width: 18px; border-radius: 14px 14px 14px 14px; position: relative; bottom: 5px; right: 9px;">'+number+'</p>'
    };
    
})();
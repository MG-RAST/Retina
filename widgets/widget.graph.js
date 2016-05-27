(function () {
    var widget = Retina.Widget.extend({
	about: {
            title: "Graph Widget",
            name: "graph",
	    version: 1,
            author: "Tobias Paczian",
            requires: [  ]
        }
    });

    widget.setup = function () {
	return [ 
  	    Retina.load_renderer("svg2")
	];
    }

    widget.graph = null;
    widget.currentGraph = null;
    
    widget.display = function (params) {
	var widget = this;

	widget.target = widget.target || params.target;

	if (! widget.hasOwnProperty('graphList')) {
	    widget.target.innerHTML = "<div style='width: 100%; text-align: center; margin-top: 100px;'><img src='images/waiting.gif'></div>";
	    jQuery.getJSON("data/graphlist.json", function (data) {
		var widget = Retina.WidgetInstances.graph[1];
		widget.graphList = data;
		widget.display();
	    });
	    return;
	}

	var html = [];

	html.push('<div class="row-fluid"><div class="span8"><div id="graph" style="border: 1px dotted black; margin: 50px;"></div></div><div class="span3" id="controls"></div></div>');
	
	widget.target.innerHTML = html.join("");

	widget.graph = Retina.Renderer.create("svg2", { "target": document.getElementById("graph") }).render();
	widget.controls();
	widget.showItemParams();
	widget.updateGraphList();
	document.getElementById('graph').style.width = widget.graph.settings.width + "px";
	document.getElementById('globalWidth').value = widget.graph.settings.width;
	document.getElementById('globalHeight').value = widget.graph.settings.height;
	widget.applyGlobalProperties();
    };

    widget.controls = function () {
	var widget = this;
	
	var html = [];

	var types = [ 'axis', 'grid', 'title', 'legend', 'dendogram', 'barchart', 'linechart', 'areachart', 'plot', 'donutchart', 'boxplot' ];

	html.push('<div class="form-horizontal">');

	html.push('<legend>load graph<button class="btn btn-small pull-right btn-success" onclick="Retina.WidgetInstances.graph[1].selectGraph(); return false;" style="position: relative; top: 7px;"><i class="icon icon-ok"></i></button><button style="position: relative; top: 7px; margin-right: 5px;" class="btn btn-small pull-right btn-danger" onclick="Retina.WidgetInstances.graph[1].deleteGraph(); return false;"><i class="icon icon-trash"></i></button><button style="position: relative; top: 7px; margin-right: 5px;" class="btn btn-small pull-right" onclick="Retina.WidgetInstances.graph[1].selectGraph(\'new\'); return false;"><i class="icon icon-star-empty"></i></button><button style="position: relative; top: 7px; margin-right: 5px;" class="btn btn-small pull-right" onclick="stm.saveAs(JSON.stringify(Retina.WidgetInstances.graph[1].graphList), \'graphlist.json\'); return false;"><i class="icon icon-download-alt"></i></button></legend>\
<select id="graphList" style="width: 100px; float: left;" onchange="Retina.WidgetInstances.graph[1].selectGraph();"><option>new</option></select><div style="clear: both;"></div>');
	
	html.push('<legend>global<button class="btn btn-success btn-small pull-right" style="position: relative; top: 7px;" onclick="Retina.WidgetInstances.graph[1].applyGlobalProperties(); return false;"><i class="icon icon-ok"></i></button></legend>\
<div class="control-group"><label class="control-label" for="globalName">name</label><div class="controls"><input type="text" id="globalName" placeholder="name of the graph" value="graph1"></div></div>\
<div class="control-group"><label class="control-label" for="globalWidth">width</label><div class="controls"><input type="text" id="globalWidth" placeholder="width of the graph"></div></div>\
<div class="control-group"><label class="control-label" for="globalHeight">height</label><div class="controls"><input type="text" id="globalHeight" placeholder="height of the graph"></div></div>\
');
	
	html.push('<legend>edit item<button class="btn btn-small pull-right btn-success" onclick="Retina.WidgetInstances.graph[1].editItem(); return false;" style="position: relative; top: 7px;"><i class="icon icon-ok"></i></button><button style="position: relative; top: 7px; margin-right: 5px;" class="btn btn-small pull-right btn-danger" onclick="Retina.WidgetInstances.graph[1].deleteItem(); return false;"><i class="icon icon-trash"></i></button><button style="position: relative; top: 7px; margin-right: 5px;" class="btn btn-small pull-right" onclick="Retina.WidgetInstances.graph[1].selectItem(\'new\'); return false;"><i class="icon icon-star-empty"></i></button></legend>\
<select id="itemList" style="width: 100px; float: left;" onchange="Retina.WidgetInstances.graph[1].selectItem();"><option>new</option></select>\
<select id="itemType"  style="width: 100px; float: left; margin-left: 5px; margin-right: 5px;" onchange="Retina.WidgetInstances.graph[1].showItemParams();">');
	for (var i=0; i<types.length; i++) {
	    html.push('<option>'+types[i]+'</option>');
	}
	html.push('</select><input type="text" id="itemName" placeholder="name" style="width: 150px; float: left;" value="item0"><div id="itemParams"></div></div>');

	document.getElementById("controls").innerHTML = html.join("");
    };

    widget.applyGlobalProperties = function () {
	var widget = this;

	widget.graph.settings.width = document.getElementById('globalWidth').value;
	document.getElementById('graph').style.width = widget.graph.settings.width + "px";
	widget.graph.settings.height = document.getElementById('globalHeight').value;
	var name = document.getElementById('globalName').value || "graph" + (Retina.keys(widget.graphList).length + 1);
	document.getElementById('globalName').value = name;
	widget.graphList[name] = { "name": document.getElementById('globalName').value, "width": parseInt(document.getElementById('globalWidth').value), "height": parseInt(document.getElementById('globalHeight').value), "items": widget.graph.settings.items };
	if (widget.currentGraph !== name) {
	    delete widget.graphList[widget.currentGraph];
	    widget.currentGraph = name;
	}
	
	widget.graph.render();
    };

    widget.deleteGraph = function () {
	var widget = this;

	var list = document.getElemenById('graphList');
	var graph = list.options[list.selectedIndex].value;

	delete widget.graphList[graph];
	widget.updateGraphList();
	widget.selectGraph('new');
    };

    widget.selectGraph = function (item) {
	var widget = this;

	var list = document.getElementById('graphList');
	if (item) {
	    for (var i=0; i<list.options.length; i++) {
		if (list.options[i].value == item) {
		    list.selectedIndex = i;
		    break;
		}
	    }
	}
	
	var val = list.options[list.selectedIndex].value;
	if (val == "new") {
	    document.getElementById('globalName').value = "graph"+(Retina.keys(widget.graphList).length + 1);
	    widget.graph.settings.items = [];
	    widget.updateItemList();
	    widget.selectItem('new');
	    widget.applyGlobalProperties();
	    widget.currentGraph = document.getElementById('globalName').value;
	    widget.updateGraphList();
	} else {
	    document.getElementById('globalName').value = val;
	    var graph;
	    var list = Retina.keys(widget.graphList).sort();
	    for (var i=0; i<list.length; i++) {
		if (val == list[i]) {
		    graph = widget.graphList[val];
		    break;
		}
	    }
	    if (! graph) {
		alert('graph not found');
		return;
	    }
	    widget.graph.settings.items = graph.items;
	    document.getElementById('globalWidth').value = graph.width;
	    document.getElementById('globalHeight').value = graph.height;
	    document.getElementById('globalName').value = graph.name;
	    widget.updateItemList();
	    widget.currentGraph = graph.name;
	    widget.applyGlobalProperties();
	}
    };

    widget.updateGraphList = function () {
	var widget = this;

	var html = ['<option>new</option>'];
	var list = Retina.keys(widget.graphList).sort();
	for (var i=0; i<list.length; i++) {
	    html.push('<option>'+list[i]+'</option>');
	}

	document.getElementById('graphList').innerHTML = html.join("");
    };
    
    widget.deleteItem = function () {
	var widget = this;

	var name = document.getElementById('itemName').value;
	for (var i=0; i<widget.graph.settings.items.length; i++) {
	    if (widget.graph.settings.items[i].name == name) {
		widget.graph.settings.items.splice(i, 1);
		widget.updateItemList();
		widget.graph.render();
		break;
	    }
	}
    };

    widget.selectItem = function (item) {
	var widget = this;

	var ilist = document.getElementById('itemList');
	if (item) {
	    for (var i=0; i<ilist.options.length; i++) {
		if (ilist.options[i].value == item) {
		    ilist.selectedIndex = i;
		    break;
		}
	    }
	}
	
	var val = ilist.options[ilist.selectedIndex].value;
	if (val == "new") {
	    document.getElementById('itemName').value = "item"+widget.graph.settings.items.length;
	    widget.showItemParams();
	} else {
	    document.getElementById('itemName').value = val;
	    var item;
	    for (var i=0; i<widget.graph.settings.items.length; i++) {
		if (val == widget.graph.settings.items[i].name) {
		    item = widget.graph.settings.items[i];
		    break;
		}
	    }
	    if (! item) {
		alert('item not found');
		return;
	    }
	    var typeSel = document.getElementById('itemType');
	    for (var i=0; i<typeSel.options.length; i++) {
		if (typeSel.options[i].value == item.type) {
		    typeSel.selectedIndex = i;
		    break;
		}
	    }
	    widget.showItemParams(item.parameters);
	}
	
    };

    widget.showItemParams = function (params) {
	var widget = this;
	
	params = params || {};

	var html = [];

	var type = document.getElementById("itemType").options[document.getElementById("itemType").selectedIndex].value;

	var attributes = widget.graph[type]();
	for (var i=0; i<attributes.length; i++) {
	    if (params.hasOwnProperty(attributes[i].name)) {
		attributes[i]['default'] = params[attributes[i].name];
	    }
	    html.push('<div class="control-group"><label class="control-label" for="attribute_'+attributes[i].name+'">'+attributes[i].name+'</label><div class="controls">');
	    if (attributes[i].valueType == "text" || attributes[i].valueType == "int") {
		html.push('<input type="text" id="attribute_'+attributes[i].name+'" value="'+attributes[i]['default']+'">');
	    } else if (attributes[i].valueType == "boolean") {
		html.push('<label class="checkbox"><input type="checkbox" id="attribute_'+attributes[i].name+'"'+(attributes[i]['default'] ? " checked" : "")+'> '+attributes[i].name+'</label>');
	    } else if (attributes[i].valueType == "select") {
		html.push('<select id="attribute_'+attributes[i].name+'">');
		for (var h=0; h<attributes[i].options.length; h++) {
		    var sel = "";
		    if (attributes[i].options[h] == attributes[i]['default']) {
			sel = ' selected=selected';
		    }
		    html.push('<option'+sel+'>'+attributes[i].options[h]+'</option>');
		}
		html.push('</select>');
	    } else {

	    }
	    
	    html.push('</div><span class="help-block" style="text-align: right">'+attributes[i].description+'</span></div>');
	}

	document.getElementById("itemParams").innerHTML = html.join("");
    };

    widget.updateItemList = function () {
	var widget = this;
	var html = ['<option>new</option>'];
	for (var i=0; i<widget.graph.settings.items.length; i++) {
	    html.push('<option>'+widget.graph.settings.items[i].name+'</option>');
	}

	document.getElementById('itemList').innerHTML = html.join("");
    };

    widget.editItem = function () {
	var widget = this;

	var type = document.getElementById('itemType').options[document.getElementById('itemType').selectedIndex].value;
	var params = {};
	var attributes = widget.graph[type]();
	for (var i=0; i<attributes.length; i++) {
	    var field = document.getElementById('attribute_'+attributes[i].name);
	    if (field) {
		if (attributes[i].valueType == "text") {
		    params[attributes[i].name] = field.value;
		} else if (attributes[i].valueType == "int") {
		    params[attributes[i].name] = parseInt(field.value);
		} else if (attributes[i].valueType == "boolean") {
		    if (field.checked) {
			params[attributes[i].name] = true;
		    } else {
			params[attributes[i].name] = false;
		    }
		} else if (attributes[i].valueType == "select") {
		    params[attributes[i].name] = field.options[field.selectedIndex].value;
		}
	    } else {
		params[attributes[i].name] = attributes[i]['default'];
	    }
	}
	var found = null;
	var name = document.getElementById('itemName').value ? document.getElementById('itemName').value : "item"+widget.graph.settings.items.length;
	
	params.id = name;
	params.groupSettings = { "onclick": "Retina.WidgetInstances.graph[1].selectItem('"+name+"');", "style": "cursor: pointer;" };
	    
	for (var i=0; i<widget.graph.settings.items.length; i++) {	    
	    if (widget.graph.settings.items[i].name == name) {
		found = i + 1;
		widget.graph.settings.items[i].parameters = params;
	    }
	}
	if (found == null) {
	    widget.graph.settings.items.push({ "type": document.getElementById('itemType').options[document.getElementById('itemType').selectedIndex].value, "name": name, "parameters": params });
	    found = widget.graph.settings.items.length;
	}
	widget.graph.render();
	widget.updateItemList();
	document.getElementById('itemList').selectedIndex = found;
    };
    
})();

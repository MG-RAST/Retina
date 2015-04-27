/*
  Notebook Renderer
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "notebook",
	    title: "Notebook",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		dataLoaded: false,
		flow: [],
		images: {},
		dataContainer: {},
		trash: [],
		editMode: false,
		currentIndex: null
	    }
	},
	exampleData: function () {
	    
        },
	render: function () {
	    var renderer = this;

	    var html = [ "<div class='notebook'>" ];
	    var tocList = [];
	    
	    for (var i=0; i<renderer.settings.flow.length; i++) {
		var item = renderer.settings.flow[i];
		var edit = "";
		if (renderer.settings.editMode) {
		    edit = " onclick='Retina.RendererInstances.notebook["+this.index+"].editFlowItem("+i+");' style='cursor: pointer;";
		}
		var width = "";
		var clear = "; clear: both;'";
		if (item.hasOwnProperty('width')) {
		    width = " "+item.width;
		    clear = "'";
		}
		edit += clear;
		
		// this is an image
		if (item.type == 'Image') {
		    html.push("<div id='flowItem"+i+"' class='notebookImage'"+edit+">"+renderer.settings.images[item.reference]+"</div>");
		}
		// this is table data
		else if (item.type == 'Table') {
		    
		    html.push("<div id='flowItem"+i+"' class='notebook"+item.type+width+"'"+edit+">");
		    html.push("<table class='table "+item.style+"'>");
		    if (item.hasOwnProperty('header')) {
			html.push("<tr><th>"+item.header.join("</th><th>")+"</th></tr>");
		    }

		    // resolve the data reference
		    if (item.hasOwnProperty('dataReference') && ! item.hasOwnProperty('data')) {
			var splits = item.dataReference.split(/\./);
			var value = renderer.settings.dataContainer[splits[0]];
		    
			// try to navigate through the dataContainer object
			try {
			    for (var j=1; j<splits.length; j++) {
				value = value[splits[j]];
			    }
			} catch (error) {
			    alert('variable '+variables[h]+' could not be resolved');
			    continue;
			}
			
			if (value.hasOwnProperty(0)) {
			    item.data = value;
			} else {
			    var k = Retina.keys(value).sort();
			    var d = [];
			    for (var h=0; h<k.length; h++) {
				d.push([ "<b>"+k[h]+"</b>", value[k[h]] ]);
			    }
			    item.data = d;
			}
		    }
		    
		    for (var h=0; h<item.data.length; h++) {
			for (var j=0; j<item.data[h].length; j++) {
			    item.data[h][j] = renderer.parseVariables(item.data[h][j]);
			}
			html.push("<tr><td>"+item.data[h].join("</td><td>")+"</td></tr>");
		    }
		    html.push("</table>");
		    html.push("</div>");
		}
		// this is an encoded graphic
		else if (item.type == 'Graphic') {
		    item.width = item.width || 800;
		    item.height = item.height || 400;
		    html.push("<div id='flowItem"+i+"' class='notebook"+item.type+"'"+edit+"><div id='flowGraphic"+i+"' style='margin-left: auto; margin-right: auto; width: "+item.width+"px;'></div></div>");
		    if (typeof item.data == "string") {
			item.data = renderer.parseVariables(item.data);
		    } else {
			for (var h=0; h<item.data.length; h++) {
			    if (typeof item.data[h] == "object") {
				var k = Retina.keys(item.data[h]);
				for (var j=0; j<k.length; j++) {
				    item.data[h][k[j]] = renderer.parseVariables(item.data[h][k[j]], true);
				}
			    } else {
				item.data[h] = renderer.parseVariables(item.data[h], true);
			    }
			}
		    }
		    if (! item.hasOwnProperty("settings")) {
			item.settings = {};
		    }
		    item.settings.data = item.data;
		}
		// this is some form of plain text
		else {
		    var variables = item.text.match(/\$\$[^\$]+\$\$/);
		    var text = renderer.parseVariables(item.text);
		    var toc = "";
		    if (item.tocName) {
			toc = "<a name='"+item.tocName+"' style='padding-top: 60px;'></a>";
			tocList.push("<a href='#"+item.tocName+"'>"+(item.tocTitle || item.tocName)+"</a>");
		    }
		    html.push(toc+"<div id='flowItem"+i+"' class='notebook"+item.type+width+"'"+edit+">"+text+"</div>");
		}
	    }

	    html.push( "</div>" );
	    
	    html = html.join("");

	    if (renderer.settings.showTOC) {
		renderer.settings.tocTarget.innerHTML = "<div style='padding: 10px;'><h3>Table of Contents</h3><table class='table table-condensed table-striped table-hover' style='width: 100%;'><tr><td>"+tocList.join("</td></tr><tr><td>")+"</td></tr></table></div>";
	    }

	    renderer.settings.target.innerHTML = html;

	    // the html has been written, check for graphic renderer execution
	    for (var i=0; i<renderer.settings.flow.length; i++) {
		var item = renderer.settings.flow[i];
		if (item.type == 'Graphic') {
		    var r = Retina.Renderer.create('svg', {target: document.getElementById('flowGraphic'+i), width: item.width, height: item.height}).render()[item.graphicType](item.settings);
		}
	    }

	    return renderer;
	},
	parseVariables: function (text, keepType) {
	    var renderer = this;
	    var variables = [];
	    try {
		variables = text.match(/\$\$[^\$]+\$\$/g);
	    } catch (error) {

	    }
	    
	    // if there are variables in the text, replace them
	    if (variables !== null) {
		for (var h=0; h<variables.length; h++) {
		    
		    // remove the $$
		    variables[h] = variables[h].replace(/\$/g, "");
		    var splits = variables[h].split(/\./);
		    var value = renderer.settings.dataContainer[splits[0]];
		    
		    // try to navigate through the dataContainer object
		    try {
			for (var j=1; j<splits.length; j++) {
			    value = value[splits[j]];
			}
		    } catch (error) {
			alert('variable '+variables[h]+' could not be resolved');
			continue;
		    }
		    if (typeof value == "object") {
			return value;
		    }
		    if (keepType) {
			return value;
		    }
		    if (typeof value == "number") {
			value = value.formatString();
		    }
		    
		    // replace all instances of the variable with the value found
		    variables[h] = "$$"+variables[h]+"$$";
		    var re = new RegExp(variables[h].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),"g");
		    text = text.replace(re, value);
		}
	    }

	    return text;
	},
	// control interface to create / edit flow items
	controller: function () {
	    var renderer = this;

	    var html = "<div style='padding: 10px;'>";

	    html += '\
<div style="margin-bottom: 10px;">\
  <div class="btn-group">\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].deleteFlowItem();"><i class="icon-trash"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].moveFlowItem(\'up\');"><i class="icon-arrow-up"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].moveFlowItem(\'down\');"><i class="icon-arrow-down"></i></button>\
  </div>\
  <div class="btn-group" data-toggle="buttons-radio">\
    <button type="button" class="btn btn-small active" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Text\');"><i class="icon-align-left"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Image\');"><i class="icon-picture"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Trash\');"><i class="icon-refresh"></i></button>\
  </div>\
</div>';

	    // text editor
	    html += "<div id='flowEditText'><h4>Add Text</h4>";
	    html += "<select id='typeField"+this.index+"'><option>Title</option><option>Subtitle</option><option>Header</option><option>Introduction</option><option>Paragraph</option></select><textarea id='textField"+this.index+"'></textarea><button style='position: relative; left: 10px; top: 5px;' class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"text\");'>add</button>";
	    html += "</div>";

	    // image editor
	    html += "<div id='flowEditImage' style='display: none;'><h4>Add Image</h4>";
	    html += "<div class='input-append'><select id='imageField'>";
	    var images = Retina.keys(renderer.settings.images);
	    for (var i=0; i<images.length; i++) {
		html += "<option>"+images[i]+"</option>";
	    }
	    html += "</select><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"image\");'>add</button></div>";
	    html += "</div>";

	    // trash
	    html += "<div id='flowEditTrash' style='display: none;'><h4>Restore</h4>";
	    html += "<div class='input-append'><select id='trashField'>";
	    html += "</select><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"trash\");'>add</button></div>";
	    html += "</div>";


	    html += "</div>";

	    return html;
	},
	updateTrash: function () {
	    var renderer = this;

	    var select = document.getElementById('trashField');
	    html = "";
	    var tableCount = 1;
	    for (var i=0; i<renderer.settings.trash.length; i++) {
		var trashItem = renderer.settings.trash[i];
		var desc = trashItem.type+": ";
		if (trashItem.hasOwnProperty('text')) {
		    desc += trashItem.text.substr(0, 15) + "...";
		} else if (trashItem.type == 'Image') {
		    desc += trashItem.reference;
		} else if (trashItem.type == 'Table') {
		    desc += tableCount;
		    tableCount++;
		}
		html += "<option>"+desc+"</option>";
	    }
	    select.innerHTML = html;
	},
	showFlowEdit: function (which) {
	    var renderer = this;

	    document.getElementById('flowEditText').style.display = "none";
	    document.getElementById('flowEditImage').style.display = "none";
	    document.getElementById('flowEditTrash').style.display = "none";

	    document.getElementById('flowEdit'+which).style.display = "";
	},
	addFlowItem: function (which) {
	    var renderer = this;
	    
	    if (which == 'text') {
		renderer.settings.flow.push({type: document.getElementById('typeField'+this.index).options[document.getElementById('typeField'+this.index).selectedIndex].value, text: document.getElementById('textField'+this.index).value});
	    } else if (which == 'image') {
		renderer.settings.flow.push({type: 'Image', reference: document.getElementById('imageField').options[document.getElementById('imageField').selectedIndex].value});
	    } else if (which == 'trash') {
		renderer.settings.flow.push(renderer.settings.trash.splice(document.getElementById('trashField').selectedIndex, 1)[0]);
		renderer.updateTrash();
	    }

	    renderer.render();
	},
	editFlowItem: function (which) {
	    var renderer = this;

	    var item = renderer.settings.flow[which];

	    if (renderer.settings.currentIndex !== null) {
		document.getElementById('flowItem'+renderer.settings.currentIndex).setAttribute('style', "cursor: pointer;");
	    }
	    renderer.settings.currentIndex = which;
	    document.getElementById('flowItem'+renderer.settings.currentIndex).setAttribute('style', 'border-radius: 3px; padding: 5px; box-shadow: 0px 1px 7px 0 rgba(12, 65, 190, 0.9);');
	},
	deleteFlowItem: function () {
	    var renderer = this;
	    
	    if (renderer.settings.currentIndex !== null) {
		renderer.settings.trash.push(renderer.settings.flow.splice(renderer.settings.currentIndex, 1)[0]);
		renderer.settings.currentIndex = null;
		renderer.updateTrash();
	    }

	    renderer.render();
	},
	moveFlowItem: function (dir) {
	    var renderer = this;

	    if (renderer.settings.currentIndex !== null) {
		var ind = renderer.settings.currentIndex;
		if (dir == 'up' && ind > 0) {
		    var x = renderer.settings.flow[ind];
		    renderer.settings.flow[ind] = renderer.settings.flow[ind - 1]
		    renderer.settings.flow[ind - 1] = x;
		    renderer.settings.currentIndex--;
		} else if (dir == 'down' && renderer.settings.currentIndex < renderer.settings.flow.length - 1) {
		    var x = renderer.settings.flow[ind];
		    renderer.settings.flow[ind] = renderer.settings.flow[ind + 1]
		    renderer.settings.flow[ind + 1] = x;
		    renderer.settings.currentIndex++;
		}
	    }

	    renderer.render();
	    renderer.editFlowItem(renderer.settings.currentIndex);
	}
    });
 }).call(this);

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
            requires: [ 'jsoneditor.min.js' ],
            defaults: {
		dataLoaded: false,
		flows: {},
		flow: [],
		images: [],
		dataContainer: {},
		graphicItems: [],
		trash: [],
		editMode: false,
		currentIndex: null,
		currentFlow: null,
		shockBase: RetinaConfig.shock_url,
		flowsLoaded: false,
		canCSV: { "areaGraph": true,
			  "pieChart": true,
			  "barChart": true }
	    }
	},
	exampleData: function () {
	    
        },
	render: function () {
	    var renderer = this;
	    
	    var html = [ "<div class='notebook'>" ];
	    var tocList = [];
	    if (renderer.settings.editMode && renderer.settings.editTarget) {
		if (! renderer.settings.flowsLoaded) {
		    renderer.settings.editTarget.innerHTML = renderer.controller();
		    renderer.listSHOCKFlows();
		}
	    }
	    var widthOn = false;
	    for (var i=0; i<renderer.settings.flow.length; i++) {
		try {
		    var item = renderer.settings.flow[i];
		    if (renderer.settings.errors && renderer.settings.errors[i]) {
			throw "item error";
		    }
		    if (item.hasOwnProperty('width')) {
			widthOn = true;
		    } else if (widthOn) {
			widthOn = false;
			html.push("<div style='clear: both;'></div>");
		    }
		    var edit = item.hasOwnProperty('width') ? "" : " style='clear: both;'";
		    if (renderer.settings.editMode) {
			edit = " onclick='Retina.RendererInstances.notebook["+this.index+"].editFlowItem("+i+");' style='cursor: pointer;"+(item.hasOwnProperty('width') ? "" : " clear: both;")+"'";
		    }		    
		    // this is an image
		    if (item.type == 'Image') {
			html.push("<div id='flowItem"+i+"' class='notebookImage"+(item.width ? " "+item.width : "")+"'"+edit+">"+item.reference+"</div>");
		    }
		    // this is table data
		    else if (item.type == 'Table') {
			
			html.push("<div id='flowItem"+i+"' class='notebook"+item.type+""+(item.width ? " "+item.width : "")+"'"+edit+">");

			if (! item.noDownload) {
			    html.push('<div style="text-align: right;"><button class="btn btn-mini" style="position: absolute; margin-top: -30px; margin-left: -30px;" onclick="Retina.RendererInstances.notebook['+this.index+'].downloadCSV('+i+');" title="download table"><img src="Retina/images/cloud-download.png" style="width: 16px;"></button></div>');
			}
			
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
				    if (typeof value[k[h]] == 'function') {
					continue;
				    }
				    d.push([ "<b>"+k[h]+"</b>", value[k[h]] ]);
				}
				item.data = d;
			    }
			}
			
			for (var h=0; h<item.data.length; h++) {
			    if (typeof item.data[h] == "object") {
				for (var j=0; j<item.data[h].length; j++) {
				    item.data[h][j] = renderer.parseVariables(item.data[h][j]);
				}
				html.push("<tr><td>"+item.data[h].join("</td><td>")+"</td></tr>");
			    } else {
				html.push("</table><div class='notebookSubheader'>"+item.data[h]+"</div><table class='table "+item.style+"'>");
			    }
			}
			html.push("</table>");
			html.push("</div>");
		    }
		    // this is an encoded graphic
		    else if (item.type == 'Graphic') {
			renderer.settings.graphicItems.push(jQuery.extend(true, {}, item));
			var gindex = renderer.settings.graphicItems.length - 1;
			item = renderer.settings.graphicItems[gindex];
			item.index = i;
			item.width = item.width || 800;
			item.height = item.height || 400;
			var provenance = [ "<div class='btn-group pull-right'>" ];
			if (item.hasOwnProperty("provenance")) {
			    provenance.push("<button title='show provenance information' class='btn btn-mini' onclick='Retina.RendererInstances.notebook["+this.index+"].showProvenance("+i+");'><i class='icon-info-sign'></i></button>");
			}
			if (! item.noDownload) {
			    provenance.push('<button title="download" class="btn btn-mini dropdown-toggle" role="button" data-toggle="dropdown" data-target="#" href="/page.html"><img src="Retina/images/cloud-download.png" style="width: 16px; margin-right: 3px;"><b class="caret"></b></button><ul class="dropdown-menu" role="menu">');

			    // check if the data of this graphic is a 2D matrix we can parse
			    if (renderer.settings.canCSV[item.graphicType]) {
				provenance.push("<li role='presentation'><a href='#' role='menuitem' class='noclick' onclick='Retina.RendererInstances.notebook["+this.index+"].downloadCSV("+gindex+", true); return false;'>download CSV</a></li>");
			    }
			    provenance.push("<li role='presentation'><a href='#' role='menuitem' class='noclick' onclick='Retina.RendererInstances.notebook["+this.index+"].downloadData("+gindex+"); return false;'>download JSON data</a></li>");
			    provenance.push("<li role='presentation'><a href='#' role='menuitem' class='noclick' onclick='Retina.RendererInstances.notebook["+this.index+"].downloadSVG("+i+"); return false;'>download as SVG</a></li>");
			    provenance.push("<li role='presentation'><a href='#' role='menuitem' class='noclick' onclick='Retina.RendererInstances.notebook["+this.index+"].downloadPNG("+i+"); return false;'>download as PNG</a></li>");
			    
			    provenance.push('</ul>');
			    
			}
			provenance.push("</div>");

			html.push("<div id='flowItem"+i+"' class='notebook"+item.type+""+(item.width ? " "+item.width : "")+"'"+edit+">"+provenance.join("")+"<div id='flowGraphic"+i+"' style='margin-left: auto; margin-right: auto; width: "+item.width+"px;'></div></div>");
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
		    // this is plain text
		    else if (item.type == "Text") {
			var text = renderer.parseVariables(item.text);
			var toc = "";
			var tocLink = "";
			if (item.tocLink) {
			    tocLink = renderer.parseVariables(item.tocLink);
			}
			if (item.tocName) {
			    toc = "<a name='"+item.tocName+"' style='padding-top: 60px;'></a>";
			    tocList.push("<a href='"+(item.tocLink ? tocLink : "#"+item.tocName)+"'>"+(item.tocIcon ? '<img src="Retina/images/'+item.tocIcon+'" style="width: 16px; margin-right: 5px;">' : "")+(item.tocTitle || item.tocName)+"</a>");
			}
			html.push(toc+"<div id='flowItem"+i+"' class='notebook"+item.style+""+(item.width ? " "+item.width : "")+"'"+edit+">"+text+"</div>");
		    } else {
			console.log('unknown type: '+item.type);
		    }
		} catch (error) {
		    if (item.hasOwnProperty("error")) {
			html.push("<div id='flowItem"+i+"' class='alert notebookParagraph"+(item.width ? " "+item.width : "")+"'"+edit+">"+item.error+"</div>");
		    } else {
			console.log("Error rendering flow item "+i+": "+error);
			console.log(item);
		    }
		}
	    }

	    html.push( "</div>" );

	    // your friendly neighborhood modal
	    html.push( '\
<div id="notebookModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="notebookModalLabel" aria-hidden="true">\
  <div class="modal-header">\
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
    <h3 id="notebookModalLabel">Provenance Information</h3>\
  </div>\
  <div class="modal-body" id="notebookModalBody">\
  </div>\
  <div class="modal-footer">\
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>\
  </div>\
</div>');

	    // modal for object browser
	    html.push( '\
<div id="objectBrowserModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="objectBrowserModalLabel" aria-hidden="true">\
  <div class="modal-header">\
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
    <h3 id="objectBrowserModalLabel">Object Browser</h3>\
  </div>\
  <div class="modal-body" id="objectBrowserModalBody">\
  </div>\
  <div class="modal-footer">\
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>\
  </div>\
</div>');
	    
	    html = html.join("");

	    if (renderer.settings.showTOC) {
		renderer.settings.tocTarget.innerHTML = "<div style='padding: 10px;'><h3>Table of Contents</h3><table class='table table-condensed table-striped table-hover' style='width: 100%;'><tr><td>"+tocList.join("</td></tr><tr><td>")+"</td></tr></table></div>";
	    }

	    renderer.settings.target.innerHTML = html;

	    // the html has been written, check for graphic renderer execution
	    for (var i=0; i<renderer.settings.graphicItems.length; i++) {
		var item = renderer.settings.graphicItems[i];
		try {
		    var r = Retina.Renderer.create('svg', {target: document.getElementById('flowGraphic'+item.index), width: item.width, height: item.height}).render()[item.graphicType](item.settings);
		    r = null;
		} catch (error) {
		    if (item.hasOwnProperty("error")) {
			var graphicItem = document.getElementById('flowGraphic'+item.index);
			graphicItem.style = "";
			graphicItem.innerHTML = "<div id='flowItem"+item.index+"' class='alert notebookParagraph'>"+item.error+"</div>";
			if (graphicItem.previousSibling) {
			    graphicItem.previousSibling.style.display = "none";
			}
		    } else {
			console.log("Error rendering flow item "+item.index+": "+error);
			console.log(item);
		    }
		}
	    }
	    
	    Retina.RendererInstances.svg = [Retina.RendererInstances.svg[0]];

	    return renderer;
	},
	parseVariables: function (text, keepType) {
	    var renderer = this;
	    var variables = [];
	    try {
		variables = text.match(/\$\$[^\$]+\$\$/g);
	    } catch (error) {
		// guess it ain't text
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

			    // check if we have an array index
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

	    var html = [ "<div style='padding: 10px;'>" ];

	    // top select
	    html.push("\
<div class='input-append'><select id='availableFlows'></select><input type='button' class='btn' onclick='Retina.RendererInstances.notebook[1].showFlow();' value='show'></div>\
<div class='input-append'><input type='text' id='flowNameField'>\
<div class='btn-group'><button class='btn' title='save' onclick='Retina.RendererInstances.notebook[1].storeSHOCKFlow();' style='border-radius: 0;'><img src='Retina/images/disk.png' style='width: 16px;'></button><button class='btn' title='new' onclick='Retina.RendererInstances.notebook[1].settings.currentFlow=null;'><i class='icon-star-empty'></i></button><button class='btn btn-danger' title='delete' onclick='Retina.RendererInstances.notebook[1].deleteSHOCKFlow();'><i class='icon-trash'></i></button></div></div><hr style='margin-bottom: 10px; margin-top: 2px;'>");

	    // button bar
	    html.push('\
<div style="margin-bottom: 10px;">\
  <div class="btn-group">\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].deleteFlowItem();"><i class="icon-trash"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].moveFlowItem(\'up\');"><i class="icon-arrow-up"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].moveFlowItem(\'down\');"><i class="icon-arrow-down"></i></button>\
  </div>\
  <div class="btn-group" data-toggle="buttons-radio">\
    <button type="button" class="btn btn-small active" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Text\');"><i class="icon-align-left"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Image\');"><i class="icon-picture"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Graphic\');"><i class="icon-signal"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Table\');"><i class="icon-th"></i></button>\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showFlowEdit(\'Trash\');"><i class="icon-refresh"></i></button>\
  </div>\
  <div class="btn-group">\
    <button type="button" class="btn btn-small" onclick="Retina.RendererInstances.notebook['+renderer.index+'].showObjectBrowser();"><i class="icon-search"></i></button>\
  </div>\
  <div style="margin-top: 3px;">\
    <span style="margin-right: 10px; position: relative; bottom: 2px;">width</span><select id="flowItemWidth" style="width: 80px;"><option>100%</option><option>span1</option><option>span2</option><option>span3</option><option>span4</option><option>span5</option><option>span6</option><option>span7</option><option>span8</option><option>span9</option><option>span10</option><option>span11</option></select>\
  </div>\
</div>');

	    // text editor
	    html.push("<div id='flowEditText'><h4>Text</h4>");
	    html.push("<select id='typeField'><option>Title</option><option>Subtitle</option><option>Header</option><option>Introduction</option><option>Paragraph</option></select><textarea id='textField' style='width: 335px; height: 300px;'></textarea><br><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"text\");'>add</button><button class='btn pull-right' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"text\", true);'>update</button>");
	    html.push("</div>");

	    // image editor
	    html.push("<div id='flowEditImage' style='display: none;'><h4>Image</h4>");
	    html.push("<select id='imageField'>");
	    for (var i=0; i<renderer.settings.images.length; i++) {
		html.push("<option value='<img src=\""+renderer.settings.images[i].url+"\">'>"+renderer.settings.images[i].name+"</option>");
	    }
	    html.push("</select><div style='clear: both; margin-bottom: 25px;'></div><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"image\");'>add</button><button class='btn pull-right' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"image\", true);'>update</button></div>");

	    // graphics editor
	    html.push("<div id='flowEditGraphic' style='display: none;'><h4>Graphic</h4><table>");
	    html.push("<tr><td>type</td><td><select id='graphicTypeField'>");
	    html.push("<option>pieChart</option>");
	    html.push("<option>donutChart</option>");
	    html.push("<option>lineChart</option>");
	    html.push("<option>areaChart</option>");
	    html.push("<option>barChart</option>");
	    html.push("<option>stackedBarchart</option>");
	    html.push("</select></td></tr>");
	    html.push("<tr><td>data</td><td><textarea id='dataField' style='height: 250px;'></textarea></td></tr>");
	    html.push("<tr><td>graph width</td><td><input type='text' id='graphWidthField' value='300'></td></tr>");
	    html.push("<tr><td>show legend</td><td><input type='checkbox' id='showLegendField' checked></td></tr>");
	    html.push("<tr><td>legend width</td><td><input type='text' id='legendWidthField' value='400'></td></tr>");
	    html.push("<tr><td>sorted</td><td><input type='checkbox' id='sortedField'></td></tr>");
	    html.push("<tr><td>show values on label</td><td><input type='checkbox' id='showValuesOnLabelField' checked></td></tr>");
	    html.push("<tr><td>height</td><td><input type='text' id='heightField' value='400'></td></tr>");
	    html.push("<tr><td>log scale X</td><td><input type='checkbox' id='logScaleXField'></td></tr>");
	    html.push("<tr><td>log scale Y</td><td><input type='checkbox' id='logScaleYField'></td></tr>");
	    html.push("</table><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"graphic\");'>add</button><button class='btn pull-right' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"graphic\", true);'>update</button></div>");

	    // table
	    html.push("<div id='flowEditTable' style='display: none;'><h4>Table</h4>");
	    html.push("<table><tr><td style='vertical-align: top; padding-right: 15px;'>data</td><td><textarea id='tableDataField' style='height: 250px; width: 290px;'></textarea></td></tr></table>");
	    html.push("<div style='margin-bottom: 10px;'>");
	    html.push("<input type='checkbox' id='tableCondensed'><span style='margin-left: 5px; margin-right: 10px; position: relative; top: 2px;'>condensed</span>");
	    html.push("<input type='checkbox' id='tableHover'><span style='margin-left: 5px; margin-right: 10px; position: relative; top: 2px;'>hover</span>");
	    html.push("<input type='checkbox' id='tableBordered'><span style='margin-left: 5px; margin-right: 10px; position: relative; top: 2px;'>bordered</span>");
	    html.push("<input type='checkbox' id='tableStriped'><span style='margin-left: 5px; position: relative; top: 2px;'>striped</span>");
	    html.push("</div>");
	    html.push("<button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"table\");'>add</button><button class='btn pull-right' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"table\", true);'>update</button>");
	    html.push("</div>");

	    // trash
	    html.push("<div id='flowEditTrash' style='display: none;'><h4>Restore</h4>");
	    html.push("<select id='trashField'>");
	    html.push("</select><div style='clear: both; margin-bottom: 25px;'></div><button class='btn' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"trash\");'>add</button><button class='btn pull-right' onclick='Retina.RendererInstances.notebook["+this.index+"].addFlowItem(\"trash\", true);'>update</button>");
	    html.push("</div>");


	    html.push("</div>");

	    return html.join("");
	},
	showObjectBrowser: function () {
	    var renderer = this;

	    var bdiv = document.getElementById('objectBrowserModalBody');
	    bdiv.innerHTML = "";
	    var jsonEditor = new JSONEditor(bdiv, { mode: 'view'}, renderer.settings.dataContainer);
	    jQuery('#objectBrowserModal').modal({});
	},
	showProvenance: function (index) {
	    var renderer = this;

	    var provenance = renderer.settings.flow[index].provenance;
	    var k = Retina.keys(provenance);
	    for (var i=0; i<k.length; i++) {
		if (typeof provenance[k[i]] == "string") {
		    provenance[k[i]] = renderer.parseVariables(provenance[k[i]]);
		} else {
		    for (var j=0; j<provenance[k[i]].length; j++) {
			provenance[k[i]][j] = renderer.parseVariables(provenance[k[i]][j]);
		    }
		}
	    }
	    
	    var html = "This graphic was produced using data from the "+provenance.source+". It represents "+provenance.subselection+" data of "+provenance.type+" from the metagenome"+(provenance.metagenomes.length > 1 ? "s <i>'"+provenance.metagenomes.join("', '") : " <i>'"+provenance.metagenomes[0])+"'</i>."+(provenance.noCutoffs ? " No further cutoffs were used." : "<br><br>The cutoffs used were:<p style='padding-left: 50px; padding-top: 15px;'>alignment length: "+provenance["alignment length"]+"<br>e-value: "+provenance["e-value"]+"<br>percent identity: "+provenance["percent identity"]+"</p>")+"<p style='padding-top: 10px; padding-bottom: 5px;'>You can download this data from the following url. Note that private data requires you to append your <a href='' target=_blank>webkey</a>.</p><a href='"+provenance["link"]+"' target=_blank>"+provenance["link"]+"</a>";
	    
	    document.getElementById('notebookModalBody').innerHTML = html;
	    jQuery('#notebookModal').modal({});
	},
	downloadSVG: function (index) {
	    var renderer = this;
	    var data = document.getElementById('flowGraphic'+index).firstChild.innerHTML;
	    stm.saveAs(data, "graphic.svg");
	},
	downloadPNG: function (index) {
	    var renderer = this;

	    var source = document.getElementById('flowGraphic'+index).firstChild.firstChild;
	    source.setAttribute('id', 'exportID');
	    var resultDiv = document.createElement('div');
	    resultDiv.setAttribute('id', 'svgExportDiv');
	    document.body.appendChild(resultDiv);
	    Retina.svg2png("#"+source.getAttribute('id'), resultDiv, source.getAttribute('width'), source.getAttribute('height')).then(
		function() {
		    // create the href and click it
		    var href = document.createElement('a');
		    var canvas = document.getElementById('svgExportDiv').children[0];
		    href.setAttribute('href', canvas.toDataURL());
		    href.setAttribute('download', "graphic.png");
		    href.setAttribute('style', 'display: none;');
		    document.body.appendChild(href);
		    href.click();
		    
		    // remove the elements
		    document.body.removeChild(href);
		    document.body.removeChild(document.getElementById('svgExportDiv'));
		    source.removeAttribute('id');
		});
	},
	downloadCSV: function (index, isObject) {
	    var renderer = this;

	    var data = isObject ? renderer.settings.graphicItems[index].settings.data : renderer.settings.flow[index].data;
	    var csv = [];
	    if (isObject) {
		for (var i=0; i<data.length; i++) {
		    if (data[i].hasOwnProperty('label') && (data[i].hasOwnProperty('value') || data[i].hasOwnProperty('values'))) {
			csv.push( [ data[i].label ].concat(data[i].value || data[i].values) );
		    }
		}
		data = Retina.transpose(csv);
		csv = [];
	    }
	    
	    for (var i=0; i< data.length; i++) {
		if (typeof data[i].join == "function") {
		    csv.push(Retina.stripHTML(data[i].join("\t")));
		} else {
		    csv.push(Retina.stripHTML(data[i]));
		}
	    }
	    stm.saveAs(csv.join("\n"), "data.csv");
	},
	downloadData: function (index) {
	    var renderer = this;

	    var data = renderer.settings.graphicItems[index].settings.data;
	    stm.saveAs(JSON.stringify(data, null, 2), "data.json");
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
	    document.getElementById('flowEditGraphic').style.display = "none";
	    document.getElementById('flowEditTable').style.display = "none";
	    document.getElementById('flowEditTrash').style.display = "none";

	    document.getElementById('flowEdit'+which).style.display = "";
	},
	addFlowItem: function (which, update) {
	    var renderer = this;

	    var item = {};
	    if (which == 'text') {
		item = {type: "Text", style: document.getElementById('typeField').options[document.getElementById('typeField').selectedIndex].value, text: document.getElementById('textField').value};
	    } else if (which == 'image') {
		item = {type: 'Image', reference: document.getElementById('imageField').options[document.getElementById('imageField').selectedIndex].value};
	    } else if (which == 'trash') {
		item = renderer.settings.trash.splice(document.getElementById('trashField').selectedIndex, 1)[0];
		renderer.updateTrash();
	    } else if (which == 'graphic') {
		item = {type: 'Graphic', graphicType: document.getElementById('graphicTypeField').options[document.getElementById('graphicTypeField').selectedIndex].value, data: eval(document.getElementById('dataField').value), height: parseInt(document.getElementById('heightField').value), settings: { legendWidth: parseInt(document.getElementById('legendWidthField').value), graphWidth: parseInt(document.getElementById('graphWidthField').value), sorted: document.getElementById('sortedField').checked, showValuesOnLabel: document.getElementById('showValuesOnLabelField').checked, showLegend: document.getElementById('showLegendField').checked, logScaleX: document.getElementById('logScaleXField').checked, logScaleY: document.getElementById('logScaleYField').checked } };
	    } else if (which == "table") {
		var data = [];
		try {
		    data = JSON.parse(document.getElementById('tableDataField').value);
		} catch (error) {
		    alert(error);
		    return;
		}
		var style = [];
		if (document.getElementById('tableCondensed').checked) { style.push('table-condensed'); }
		if (document.getElementById('tableHover').checked) { style.push('table-hover'); }
		if (document.getElementById('tableStriped').checked) { style.push('table-striped'); }
		if (document.getElementById('tableBordered').checked) { style.push('table-bordered'); }
		item = {type: "Table", style: style.join(" "), data: data};
	    }

	    var wsel = document.getElementById('flowItemWidth').selectedIndex;
	    if (wsel > 0) {
		item.width = "span"+wsel;
	    }
	    
	    if (update) {
		renderer.settings.flow[renderer.settings.currentIndex] = item;
	    } else {
		renderer.settings.flow.push(item);
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
	    var item = renderer.settings.flow[renderer.settings.currentIndex];
	    renderer.showFlowEdit(item.type);
	    if (item.type == 'Text') {
		document.getElementById('textField').value = item.text;
		var opt = document.getElementById('typeField');
		for (var i=0; i<opt.options.length; i++) {
		    if (opt.options[i].value == item.style) {
			opt.selectedIndex = i;
			break;
		    }
		}
	    } else if (item.type == 'Image') {
		var opt = document.getElementById('imageField');
		for (var i=0; i<opt.options.length; i++) {
		    if (opt.options[i].value == item.reference) {
			opt.selectedIndex = i;
			break;
		    }
		}		
	    } else if (item.type == 'Table') {
		document.getElementById('tableDataField').value = JSON.stringify(item.data, null, 2);
		if (item.style.match(/bordered/)) { jQuery('#tableBordered').prop('checked', true); } else { jQuery('#tableBordered').prop('checked', false); }
		if (item.style.match(/striped/)) { jQuery('#tableStriped').prop('checked', true); } else { jQuery('#tableStriped').prop('checked', false); }
		if (item.style.match(/condensed/)) { jQuery('#tableCondensed').prop('checked', true); } else { jQuery('#tableCondensed').prop('checked', false); }
		if (item.style.match(/hover/)) { jQuery('#tableHover').prop('checked', true); } else { jQuery('#tableHover').prop('checked', false); }
	    } else if (item.type == 'Graphic') {
		var sel = document.getElementById('graphicTypeField');
		for (var i=0; i<sel.options.length; i++) {
		    if (sel.options[i].value == item.graphicType) {
			sel.selectedIndex = i;
			break;
		    }
		}
		document.getElementById('dataField').value = JSON.stringify(item.data, null, 2);
		document.getElementById('graphWidthField').value = item.settings.graphWidth;
		document.getElementById('legendWidthField').value = item.settings.legendWidth;
		document.getElementById('heightField').value = item.height;
		item.settings.showLegend ? document.getElementById('showLegendField').setAttribute("checked", "checked") : document.getElementById('showLegendField').removeAttribute("checked");
	    }

	    if (item.hasOwnProperty('width')) {
		var ind = item.width.match(/(\d+)/);
		document.getElementById('flowItemWidth').selectedIndex = ind[0];
	    } else {
		document.getElementById('flowItemWidth').selectedIndex = 0;
	    }
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
	},
	showFlow: function () {
	    var renderer = this;

	    if (Retina.keys(renderer.settings.flows).length > 0) {
		var sel = document.getElementById('availableFlows');
		var id = sel.options[sel.selectedIndex].value;
		renderer.settings.flow = renderer.settings.flows[id].flow;
		renderer.settings.currentFlow = id;
		document.getElementById('flowNameField').value = renderer.settings.flows[id].name;
		renderer.settings.flowsLoaded = true;
		renderer.render();
	    }
	},
	// file operations
	listSHOCKFlows: function () {
	    var renderer = this;

	    jQuery.ajax({ url: renderer.settings.shockBase + "/node/?query&type=flow",
			  dataType: "json",
			  success: function(data) {
			      var nb = Retina.RendererInstances.notebook[1];
			      var opts = "";
			      for (var i=0; i<data.data.length; i++) {
				  var sel  = "";
				  if (data.data[i].id == Retina.RendererInstances.notebook[1].settings.currentFlow) {
				      sel = " selected=selected";
				  }
				  opts += "<option value='"+data.data[i].id+"'"+sel+">"+data.data[i].attributes.name+"</option>";
				  nb.settings.flows[data.data[i].id] = data.data[i].attributes;
			      }
			      document.getElementById('availableFlows').innerHTML = opts;
			      nb.showFlow();
			  },
			  error: function(jqXHR, error) {
			      console.log( "error: unable to connect to SHOCK server" );
			      console.log(error);
			  },
			  crossDomain: true,
			  headers: stm.authHeader || {}
			});
	},
	deleteSHOCKFlow: function () {
	    var renderer = this;
	    
	    var id = renderer.settings.currentFlow;
	    if (id !== null) {
		jQuery.ajax(renderer.settings.shockBase+"/node/"+id, {
		    success: function(data) {
			Retina.RendererInstances.notebook[1].listSHOCKFlows();
		    },
		    error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
		    },
		    crossDomain: true,
		    headers: stm.authHeader,
		    type: "DELETE"
		});
	    }
	},
	storeSHOCKFlow: function () {
	    var renderer = this;

	    var name = document.getElementById('flowNameField').value;
	    var flow = renderer.settings.flow;
	    var id = renderer.settings.currentFlow;
	    var attributes = new Blob([ JSON.stringify({ "name": name, "type": "flow", "owner": stm.user.login ,"flow": flow }) ], { "type" : "text\/json" });
	    var form = new FormData();
	    form.append('attributes', attributes);

	    // this is an update to an existing node
	    if (id) {
		jQuery.ajax(renderer.settings.shockBase+"/node/"+id, {
		    contentType: false,
		    processData: false,
		    data: form,
		    success: function(data) {
			Retina.RendererInstances.notebook[1].listSHOCKFlows();
		    },
		    error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
		    },
		    crossDomain: true,
		    headers: stm.authHeader,
		    type: "PUT"
		});
	    }
	    // this is a new node
	    else {
		jQuery.ajax(renderer.settings.shockBase+"/node", {
		    contentType: false,
		    processData: false,
		    data: form,
		    success: function(data) {
			Retina.RendererInstances.notebook[1].listSHOCKFlows();
		    },
		    error: function(jqXHR, error){
			console.log(jqXHR);
			console.log(error);
		    },
		    crossDomain: true,
		    headers: stm.authHeader,
		    type: "POST"
		});
	    }
	}
    });
 }).call(this);

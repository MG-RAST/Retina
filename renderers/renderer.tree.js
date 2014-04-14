(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "tree",
	    title: "Tree",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: [],
	    defaults: {
		'width' : 200,
		'height': 400,
		'indent': 10,
		'showCollapseAllButton': true,
		'showExpandAllButton': true,
		'showSearchBar': true
	    },
	},

	exampleData: function () {
	    return { "name": "testTree",
		     "version": 1,
		     "showRoot": false,
		     "rootNode": "root",
		     "nodes": { "root": { "id": "root",
					  "label": "root",
  	   	      			  "description": "cool node",
					  "childNodes": [ "1", "2" ] },
				"1": { "id": "1",
				       "label": "node 1",
				       "description": "first node",
				       "childNodes": [ "3", "4" ] },
				"2": { "id": "2",
				       "label": "node 2",
				       "description": "second node",
				       "childNodes": [ "5" ] },
				"3": { "id": "3",
				       "label": "node 3",
				       "description": "third node",
				       "childNodes": [ "6", "7", "8" ] },
				"4": { "id": "4",
				       "label": "node 4",
				       "description": "fourth node",
				       "childNodes": [ "9" ] },
				"5": { "id": "5",
				       "label": "node 5",
				       "description": "fifth node",
				       "childNodes": [] },
				"6": { "id": "6",
				       "label": "node 6",
				       "description": "sixths node",
				       "childNodes": [] },
				"7": { "id": "7",
				       "label": "node 7",
				       "description": "seventh node",
				       "childNodes": [] },
				"8": { "id": "8",
				       "label": "node 8",
				       "description": "eighth node",
				       "childNodes": [] },
				"9": { "id": "9",
				       "label": "node 9",
				       "description": "nineth node",
				       "childNodes": [] }
			      }
		   }
	},

	render: function () {
	    renderer = this;
	    var index = this.index;

	    renderer.settings.target.innerHTML = "<style>\
.tree-node {\
  cursor: pointer;\
  color: #0088CC;\
  background-color: #FFFFFF;\
  border-radius: 3px;\
}\
.tree-node:hover {\
  color: #005580;\
  background-color: #F5F5F5;\
}\
.tree-node-selected {\
  cursor: pointer;\
  background-color: #0088CC;\
  color: #FFFFFF;\
  border-radius: 3px;\
}\
</style>";

	    // check if the data structure has parent information in the nodes, otherwise add it
	    if (! renderer.settings.data.nodes[renderer.settings.data.rootNode].childNodes[0].hasOwnProperty('parentNodes')) {
		renderer.setParentNode(index, renderer.settings.data.nodes[renderer.settings.data.rootNode], null);
	    }

	    if (renderer.settings.showCollapseAllButton) {
		var cB = document.createElement('button');
		cB.className = "btn btn-small";
		cB.innerHTML = "collapse all";
		cB.setAttribute('style', "margin-bottom: 5px; margin-right: 5px;");
		cB.index = index;
		cB.addEventListener('click', function () {
		    var index = this.index;
		    Retina.RendererInstances.tree[index].collapseAll(index);
		});
		renderer.settings.target.appendChild(cB);
	    }

	    if (renderer.settings.showExpandAllButton) {
		var cB = document.createElement('button');
		cB.className = "btn btn-small";
		cB.innerHTML = "expand all";
		cB.setAttribute('style', "margin-bottom: 5px; margin-right: 5px;");
		cB.index = index;
		cB.addEventListener('click', function () {
		    var index = this.index;
		    Retina.RendererInstances.tree[index].expandAll(index);
		});
		renderer.settings.target.appendChild(cB);
	    }

	    if (renderer.settings.showSearchBar) {
		var typeAheadData = [];
		var label2id = {};
		for (var i in renderer.settings.data.nodes) {
		    if (renderer.settings.data.nodes.hasOwnProperty(i)) {
			typeAheadData.push(renderer.settings.data.nodes[i].label);
			label2id[renderer.settings.data.nodes[i].label] = i;
		    }
		}
		renderer.settings.data.label2id = label2id;
		var sB = document.createElement('div');
		sB.setAttribute('style', "float: left;");
		sB.className = "input-append";
		sB.innerHTML = "<input type='text' style='width: 144px;' id='tree_search_input_"+index+"' autocomplete='off'><button class='btn' onclick='Retina.RendererInstances.tree["+index+"].goTo("+index+");'>go</button>";
		renderer.settings.target.appendChild(sB);
		jQuery('#tree_search_input_'+index).typeahead({ source: typeAheadData });
	    }

	    renderer.settings.target.setAttribute('style', "border: 1px solid black; width: "+renderer.settings.width+"px; overflow: auto; height: "+renderer.settings.height+"px; padding: 5px; border-radius: 3px;");

	    renderer.settings.nodeSpace = document.createElement('div');
	    renderer.settings.nodeSpace.setAttribute('style', "clear: both;");
	    renderer.settings.target.appendChild(renderer.settings.nodeSpace);

	    renderer.redraw(index);

	    return renderer;
	},

	redraw: function (index) {
	    var renderer = Retina.RendererInstances.tree[index];

	    var currIndent = -1;
	    var hide = true;
	    if (renderer.settings.data.showRoot) {
		currIndent = 0;
		hide = false;
	    }

	    renderer.settings.nodeSpace.innerHTML = "";
	    renderer.settings.data.nodes[renderer.settings.data.rootNode].expanded = true;

	    renderer.renderNode( { "index": index,
				   "node": renderer.settings.data.nodes[renderer.settings.data.rootNode],
				   "indent": currIndent,
				   "hide": hide } );

	    return;
	},
	
	renderNode: function (params) {
	    var index = params.index;
	    var renderer = Retina.RendererInstances.tree[index];
	    
	    var nodeDiv = document.createElement('div');
	    if (renderer.settings.selectedNode && renderer.settings.selectedNode == params.node.id) {
		nodeDiv.className = "tree-node-selected";
	    } else {
		nodeDiv.className = "tree-node";
	    }
	    renderer.settings.nodeSpace.appendChild(nodeDiv);

	    if (! params.node.hasOwnProperty('expanded')) {
		params.node.expanded = false;
	    }

	    if (! params.hide) {
		nodeDiv.setAttribute('style', "padding-left: "+(renderer.settings.indent * params.indent)+"px;");
		var html = "";
		if (params.node.childNodes.length) {
		    if (params.node.expanded) {
			html += "<span style='cursor: pointer; margin-right: 5px;' onclick='Retina.RendererInstances.tree["+index+"].settings.data.nodes[\""+params.node.id+"\"].expanded=false;Retina.RendererInstances.tree["+index+"].redraw("+index+");'>&dtrif;</span>";
		    } else {
			html += "<span style='cursor: pointer; margin-right: 5px;' onclick='Retina.RendererInstances.tree["+index+"].settings.data.nodes[\""+params.node.id+"\"].expanded=true;Retina.RendererInstances.tree["+index+"].redraw("+index+");'>&rtrif;</span>";
		    }
		} else {
		    html += '<div style="float: left; height: 16px; width: 13px;"></div>';
		}
		html += "<span title='"+params.node.description+"' onclick='Retina.RendererInstances.tree["+index+"].settings.selectedNode=\""+params.node.id+"\";Retina.RendererInstances.tree["+index+"].redraw("+index+");'>"+params.node.label+"</span>";
		
		nodeDiv.innerHTML = html;
	    }
	    
	    if (params.node.childNodes.length && params.node.expanded) {
		params.indent++;
		for (var i=0; i<params.node.childNodes.length; i++) {
		    renderer.renderNode( { "index": index,
					   "node": renderer.settings.data.nodes[params.node.childNodes[i]],
					   "indent": params.indent });
		}
	    }
	},

	collapseAll: function (index) {
	    var renderer = Retina.RendererInstances.tree[index];

	    for (var i in renderer.settings.data.nodes) {
		if (renderer.settings.data.nodes.hasOwnProperty(i)) {
		    renderer.settings.data.nodes[i].expanded = false;
		}
	    }

	    renderer.redraw(index);
	},

	expandAll: function (index) {
	    var renderer = Retina.RendererInstances.tree[index];

	    for (var i in renderer.settings.data.nodes) {
		if (renderer.settings.data.nodes.hasOwnProperty(i)) {
		    renderer.settings.data.nodes[i].expanded = true;
		}
	    }

	    renderer.renderer.redraw(index);
	},

	goTo: function (index) {
	    var renderer = Retina.RendererInstances.tree[index];

	    // collapse all nodes
	    for (var i in renderer.settings.data.nodes) {
		if (renderer.settings.data.nodes.hasOwnProperty(i)) {
		    renderer.settings.data.nodes[i].expanded = false;
		}
	    }
	    
	    // find the goto node
	    var id = renderer.settings.data.label2id[document.getElementById('tree_search_input_'+index).value];
	    var node = renderer.settings.data.nodes[id];
	    node.expanded = false;
	    renderer.settings.selectedNode = id;

	    // expand all parent nodes
	    while (node.parentNode != null) {
		node = renderer.settings.data.nodes[node.parentNode];
		node.expanded = true;
	    }
	    
	    // rerender the tree
	    renderer.redraw(index);
	},

	setParentNode: function (index, node, parent) {
	    var renderer = Retina.RendererInstances.tree[index];

	    node.parentNode = parent;
	    for (var i=0; i<node.childNodes.length; i++) {
		renderer.setParentNode(index, renderer.settings.data.nodes[node.childNodes[i]], node.id);
	    }

	    return;
	}

    });
}).call(this);
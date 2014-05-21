(function () {
    var widget = Retina.Widget.extend({
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
    
    widget.display = function (params) {
	widget = this;
        var index = widget.index;

	jQuery.extend(widget, params);
	
	// set the output area
	widget.main.innerHTML = '<style>\
.tool {\
    border: 1px solid #808080;\
    border-radius: 6px;\
    box-shadow: 3px 3px 3px;\
    padding: 4px;\
    width: 32px;\
    margin: 10px;\
    cursor: pointer;\
}\
.tool:hover {\
    background-color: #F0F0F0;\
}\
.tool:active {\
    box-shadow: 0px 0px 1px;\
}\
</style><div id="main"></div>';

	// set the tool area
	var tools = widget.sidebar;
	tools.setAttribute('style', 'padding: 10px;');

	var html = "<h4>Data Container</h4><div id='data_containers'></div><hr><h4>Manipulate</h4><div id='manipulation'></div><hr><h4>Visualizer</h4><div id='visualize'></div>";

	tools.innerHTML = html;

	widget.fillContainers();
	widget.fillManipulators();
	widget.fillVisualizations();
	
	widget.dataLoader(document.getElementById('main'));
	
    };

    widget.dataLoader = function (container) {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];

	container.innerHTML = '<h4>Load Data</h4><div class="form-inline" style="margin-bottom: 10px;"><b>name</b><input type="text" placeholder="pick a name" style="margin-left: 10px; margin-right: 10px; width: 185px;" id="dataContainerName"><b>source</b> <select style="margin-left: 10px; margin-right: 10px;" id="profile_source"><optgroup label="protein databases"><option>M5NR</option><option>RefSeq</option><option>GenBank</option><option>IMG</option><option>SEED</option><option>TrEMBL</option><option>SwissProt</option><option>PATRIC</option><option>KEGG</option></optgroup><optgroup label="RNA databases"><option>M5RNA</option><option>RDP</option><option>Greengenes</option><option>LSU</option><option>SSU</option></optgroup><optgroup label="ontology databases"><option>Subsystems</option><option>NOG</option><option>COG</option><option>KO</option></optgroup></select> <b>type</b> <select id="profile_type" style="margin-left: 10px;"><option>organism</option><option>function</option><option>feature</option></select></div><div style="float: left; margin-right: 10px; margin-bottom: 10px;"><div id="mgbrowse"></div></div><div style="float: left; width: 790px; padding-left: 10px; padding-right: 10px; padding-bottom: 10px; height: 265px; border: 1px solid rgb(212, 212, 212); border-radius: 4px; box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.067); overflow-y: scroll;"><h4>loading state</h4><button class="btn-mini btn" style="float: right; margin-top: -30px;" onclick="this.nextSibling.innerHTML=\'\';" type="button">clear</button><div id="dataprogress"></div></div>';

	widget.browse = Retina.Widget.create('mgbrowse', { "target": document.getElementById("mgbrowse"), "type": "listselect", "multiple": true, "wide": true, callback: Retina.WidgetInstances.metagenome_analysis[1].loadData });
    };

    widget.fillContainers = function () {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];

	var container = document.getElementById('data_containers');

	container.innerHTML = "<img src='images/data.png' class='tool'>";
    };

    widget.fillManipulators = function () {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];

	var container = document.getElementById('manipulation');

	container.innerHTML = "<img src='images/filter.png' class='tool'><img src='images/shuffle.png' class='tool'><div class='tool' style='float: left;'><img src='images/tree.png' style='transform: rotate(90deg); width: 32px;'></div><img src='images/cart.png' class='tool'>";
    };

    widget.fillVisualizations = function () {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];

	var container = document.getElementById('visualize');

	container.innerHTML = "<img src='images/pie.png' class='tool'><img src='images/icon_heatmap.png' class='tool'><img src='images/stats.png' class='tool'><img src='images/bars2.png' class='tool'><img src='images/icon_pcoa.png' class='tool'><img src='images/icon_boxplot.png' class='tool'><img src='images/table.png' class='tool'>";
    };

    widget.loadData = function (ids) {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];

	var type = document.getElementById('profile_type').options[document.getElementById('profile_type').selectedIndex].value;
	var source = document.getElementById('profile_source').options[document.getElementById('profile_source').selectedIndex].value;
	var name = document.getElementById('dataContainerName').value;
	if (! stm.DataStore.hasOwnProperty('dataContainer')) {
	    stm.DataStore.dataContainer = {};
	}
	if (ids.length) {
	    if (! name) {
		var i = Retina.keys(stm.DataStore.dataContainer).length;
		while (stm.DataStore.dataContainer.hasOwnProperty('data_'+i)) {
		    i++;
		}
		name = 'data_'+i;
		document.getElementById('dataContainerName').value = name;
	    }
	    if (stm.DataStore.dataContainer.hasOwnProperty(name)) {
		if (! confirm("The name '"+name+"' already exists. Do you want \nto replace it with the current selection?")) {
		    return;
		}
	    }
	    stm.DataStore.dataContainer[name] = { name: name,
						  type: 'load',
						  items: ids,
						  status: "loading",
						  promises: [],
						  callbacks: [],
						  parameters: { type: type,
								source: source },
						  created: Retina.date_string(new Date().getTime()),
						  user: widget.user || "public" };
	}
	if (! stm.DataStore.hasOwnProperty('profile') ) {
	    stm.DataStore.profile = [];
	}
	if (! stm.DataStore.hasOwnProperty('inprogress')) {
	    stm.DataStore.inprogress = [];
	}
	for (i=0;i<ids.length;i++) {
	    var id = ids[i].id+"_"+type+"_"+source;
	    if (! stm.DataStore.profile.hasOwnProperty(id) && ! stm.DataStore.inprogress.hasOwnProperty('profile'+id)) {
		widget.pDiv('profile'+id, false, ids[i].name, type, source);

		stm.DataStore.inprogress['profile'+id] = true;
		stm.DataStore.dataContainer[name].promises.push(
		    jQuery.ajax({ bound: 'profile'+id,
				  url: RetinaConfig.mgrast_api + "/profile/" + ids[i].id + "?type="+type+"&source="+source,
				  dataType: "json",
				  success: function(data) {
				      var widget = Retina.WidgetInstances.metagenome_analysis[1];
				      if (data != null) {
					  if (data.hasOwnProperty('ERROR')) {
					      console.log("error: "+data.ERROR);
					  } else {
					      stm.DataStore.profile[data.id] = data;
					  }
				      } else {
					  console.log("error: invalid return structure from API server");
					  console.log(data);
				      }
				  },
				  error: function(jqXHR, error) {
				      var widget = Retina.WidgetInstances.metagenome_analysis[1];
				      console.log("error: unable to connect to API server");
				      console.log(error);
				  },
				  xhr: function() {
				      var xhr = new window.XMLHttpRequest();
				      xhr.bound = this.bound;
				      xhr.addEventListener("progress", function(evt){
					  var display = document.getElementById('progress'+this.bound);
					  if (display) {
					      if (evt.lengthComputable) {
						  var bar = document.getElementById('progressbar'+this.bound);
						  bar.parentNode.setAttribute('class', 'progress')
						  var percentComplete = evt.loaded / evt.total;
						  display.innerHTML = evt.loaded.byteSize;
						  bar.style.width = percentComplete +"%";
					      } else {
						  display.innerHTML = evt.loaded.byteSize();
					      }
					  }
				      }, false); 
				      return xhr;
				  },
				  headers: Retina.WidgetInstances.metagenome_analysis[1].authHeader
				}).then(function(data){
				    Retina.WidgetInstances.metagenome_analysis[1].dataLoaded(this.bound);
				    delete stm.DataStore.inprogress[this.bound];
				    var bar = document.getElementById('progressbar'+this.bound);
				    if (bar) {
					document.getElementById('progress'+this.bound).innerHTML += " - complete.";
					bar.parentNode.setAttribute('class', 'progress');
					bar.setAttribute('class', 'bar bar-success');
					bar.style.width = '100%';
				    }
				}));
	    } else {
		widget.pDiv('profile'+id, true, ids[i].name, type, source);
	    }
	}
	if (ids.length) {
	    jQuery.when.apply(this, stm.DataStore.dataContainer[name].promises).then(function() {
		Retina.WidgetInstances.metagenome_analysis[1].dataContainerReady(name);
	    });
	}

	return;
    };

    widget.dataContainerReady = function (name) {
	var widget = Retina.WidgetInstances.metagenome_analysis[1];
	
	var dataContainer = stm.DataStore.dataContainer[name];
	dataContainer.promises = [];
	dataContainer.status = "ready";
	for (var i=0; i<dataContainer.callbacks.length; i++) {
	    dataContainer.callbacks[i].call(null, dataContainer);
	}

	alert('Your data container '+name+' is ready!');
    };

    widget.pDiv = function (id, done, name, type, source) {
	var progressContainer = document.getElementById('dataprogress');
	if (document.getElementById(id)) {
	    return;
	}
	var div = document.createElement('div');
	div.setAttribute('id', id);
	div.setAttribute('class', 'prog');
	div.setAttribute('style', 'clear: both;');
	div.innerHTML = '<div style="float: left; margin-right: 10px;">'+name+' ['+source+' - '+type+']</div><button class="close" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" type="button" style="margin-top: -3px;">×</button><div style="float: right; margin-right: 10px;"><div class="progress'+(done ? '' : ' progress-striped active')+'" style="width: 100px;"><div class="bar'+(done ? ' bar-success' : '')+'" id="progressbar'+id+'" style="width: 100%;"></div></div></div><div style="float: right; margin-right: 10px;" id="progress'+id+'">'+(done ? "complete." : "waiting for server... <img src='images/waiting.gif' style='height: 12px;'>")+'</div>';
	progressContainer.appendChild(div);
    };

    widget.dataLoaded = function (id) {
	console.log(id);
    };

    widget.loginAction = function (params) {
	Retina.WidgetInstances.metagenome_analysis[1].browse.result_list.update_data({},1);
	if (params.token) {
	    Retina.WidgetInstances.metagenome_analysis[1].user = params.user;
	    Retina.WidgetInstances.metagenome_analysis[1].authHeader = { "Auth": params.token };
	} else {
	    Retina.WidgetInstances.metagenome_analysis[1].user = null;
	    Retina.WidgetInstances.metagenome_analysis[1].authHeader = {};
	}
    };

    
})();
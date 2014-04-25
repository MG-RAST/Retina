(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "SHOCK Browser Widget",
                name: "shockbrowse",
                author: "Tobias Paczian",
                requires: []
        }
    });
    
    widget.setup = function () {
	return [ 
 	    Retina.add_renderer({"name": "table", "resource": "./renderers/",  "filename": "renderer.table.js" }),
  	    Retina.load_renderer("table"),
 	    Retina.add_renderer({"name": "listselect", "resource": "./renderers/",  "filename": "renderer.listselect.js" }),
  	    Retina.load_renderer("listselect"),
 	    Retina.add_renderer({"name": "tree", "resource": "./renderers/",  "filename": "renderer.tree.js" }),
  	    Retina.load_renderer("tree")
	];
    };

    /*
     * VARIABLES
     */
    widget.shock_base = RetinaConfig.shock_url;
    widget.authHeader = {};
    widget.width = 1200;
    widget.height = 600;
    widget.borderRadius = 4;
    widget.fontSize = 13;
    widget.chunkSize = 2048;

    widget.sizes = { "small": [ 800, 400 ],
		     "medium": [ 1200, 600 ],
		     "large": [ 1550, 800 ] };

    widget.sections = {};

    widget.title = "SHOCK Browser";
    widget.status = "<img src='images/waiting.gif' style='height: 15px;'> connecting to SHOCK server...";
    widget.progress = null;
    widget.detailType = "info";
    widget.selectedFile = null;
    widget.detailInfo = null;
    widget.infoRequest = null;
    widget.append = false;
    widget.currentOffset = 0;
    widget.currentLimit = 100;
    widget.scrollPosition = 0;
    widget.filters = {};
    widget.keylist = [
	{ "name": "type", "value": "type" },
	{ "name": "data_type", "value": "data type" },
	{ "name": "status", "value": "status" },
	{ "name": "file_format", "value": "file format" },
	{ "name": "_custom_", "value": "custom - 'field=value'" }
    ];

    /*
     * STYLESHEET
     */
    widget.style = function () {
	return '\
<style>\
.btn-moremini {\
  padding-left: 5px;padding-right:5px\
}\
\
.btn-menu {\
  border: 1px solid #838383;\
  height: 28px;\
}\
.fileItem {\
  cursor: pointer;\
}\
.fileItem:hover {\
  background-color: #e6eaef;\
}\
</style>\
';
    };
    
    /*
     * DISPLAY 
     */
    widget.display = function (wparams) {
        var widget = Retina.WidgetInstances.shockbrowse[1];

	if (wparams) {
	    jQuery.extend(true, widget, wparams);
	}

	if (widget.width < 1200) {
	    widget.filterWidth = Math.floor(widget.width / 3) - 5;
	    widget.fileWidth = Math.floor(widget.width / 3) - 5;
	    widget.detailWidth = Math.floor(widget.width / 3) - 5;
	} else {
	    widget.filterWidth = Math.floor(widget.width / 5) - 5;
	    widget.fileWidth = Math.floor(widget.width / 5 * 2) - 5;
	    widget.detailWidth = Math.floor(widget.width / 5 * 2) - 5;
	}

	widget.sections = {};

	var browser = document.createElement('div');
	widget.sections.browser = browser;

	browser.setAttribute('style', "width: "+widget.width+"px; height: "+widget.height+"px; border: 1px solid #C7C7C7; border-radius: "+widget.borderRadius+"px; box-shadow: 6px 6px 6px #BBBBBB;");

	widget.target.innerHTML = widget.style();
	widget.target.appendChild(browser);

	widget.top_section();
	widget.middle_section();
	widget.bottom_section();

	if (! widget.data) {
	    widget.updateData();
	}
    };

    /*
     * GENERAL SECTIONS 
     */
    widget.top_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.topSection) {
	    section = widget.sections.topSection;
	    section.innerHTML = "";
	    widget.sections.titleBar = null;
	    widget.sections.toolBar = null;
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "height: 50px; border-bottom: 1px solid #838383; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FDFDFD, #C3C3C3); background-repeat: repeat-x; position: relative; border-radius: "+widget.borderRadius+"px "+widget.borderRadius+"px 0 0;");
	    widget.sections.browser.appendChild(section);
	    widget.sections.topSection = section;
	}

	widget.title_bar();
	widget.tool_bar();
    };

    widget.middle_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var height = widget.height - 72;

	var section;
	if (widget.sections.middleSection) {
	    section = widget.sections.middleSection;
	    section.innerHTML = "";
	    widget.sections.filterSection = null;
	    widget.sections.fileSection = null;
	    widget.sections.detailSection = null;
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "height: "+height+"px;");
	    widget.sections.browser.appendChild(section);
	    widget.sections.middleSection = section;
	}

	widget.filter_section();
	widget.middle_border();
	widget.file_section();
	widget.middle_border();
	widget.detail_section();
    };

    widget.bottom_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.bottomSection) {
	    section = widget.sections.bottomSection;
	    section.innerHTML = "";
	    widget.sections.statusBar = null;
	} else {
	    section = document.createElement('div');
	section.setAttribute('style', "height: 20px; border-top: 1px solid #838383; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FDFDFD, #C3C3C3); background-repeat: repeat-x; position: relative;");
	    widget.sections.browser.appendChild(section);
	    widget.sections.bottomSection = section;
	}

	widget.status_bar();
    };

    /*
     * TOP SECTION INTERNALS
     */
    widget.title_bar = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.titleBar) {
	    section = widget.sections.titleBar;
	    section.innerHTML = "";
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);");
	    widget.sections.topSection.appendChild(section);
	    widget.sections.titleBar = section;
	}

	section.innerHTML = widget.title;
	var resizer = document.createElement('div');
	resizer.setAttribute('style', "float: left;");
	resizer.innerHTML = '\
<img src="images/box.png" style="margin-left: 10px; margin-right: 5px; width: 16px; cursor: pointer;" onclick="Retina.WidgetInstances.shockbrowse[1].width=Retina.WidgetInstances.shockbrowse[1].sizes[\'large\'][0];Retina.WidgetInstances.shockbrowse[1].height=Retina.WidgetInstances.shockbrowse[1].sizes[\'large\'][1];Retina.WidgetInstances.shockbrowse[1].display();">\
\
<img src="images/box.png" style="margin-right: 5px; width: 12px; cursor: pointer;" onclick="Retina.WidgetInstances.shockbrowse[1].width=Retina.WidgetInstances.shockbrowse[1].sizes[\'medium\'][0];Retina.WidgetInstances.shockbrowse[1].height=Retina.WidgetInstances.shockbrowse[1].sizes[\'medium\'][1];Retina.WidgetInstances.shockbrowse[1].display();">\
\
<img src="images/box.png" style="width: 8px; cursor: pointer;" onclick="Retina.WidgetInstances.shockbrowse[1].width=Retina.WidgetInstances.shockbrowse[1].sizes[\'small\'][0];Retina.WidgetInstances.shockbrowse[1].height=Retina.WidgetInstances.shockbrowse[1].sizes[\'small\'][1];Retina.WidgetInstances.shockbrowse[1].display();">\
';
	section.appendChild(resizer);
    };

    widget.tool_bar = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.toolBar) {
	    section = widget.sections.toolBar;
	    section.innerHTML = "";
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "text-align: left; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); margin-left: 10px; margin-right: 10px;");
	    widget.sections.topSection.appendChild(section);
	    widget.sections.toolBar = section;
	}

	var toolBar = document.createElement('div');
	toolBar.setAttribute("style", "position: relative; bottom: 4px; margin-left: "+widget.filterWidth+"px;");

	// upload bar
	var uploadBar = document.createElement('div');
	uploadBar.className = "btn-group";

	var uploadButton = document.createElement('button');
	uploadButton.className = "btn btn-menu btn-small";
	uploadButton.title = "upload file";
	uploadButton.innerHTML = "<img src='images/upload.png' style='height: 16px;'>";
	uploadButton.addEventListener('click', function(){
	    var widget = Retina.WidgetInstances.shockbrowse[1];
	    alert('not implemented');
	});
	//uploadBar.appendChild(uploadButton);

	toolBar.appendChild(uploadBar);

	// modify bar
	var modifyBar = document.createElement('div');
	modifyBar.className = "btn-group";
	
	var downloadButton = document.createElement('button');
	downloadButton.className = "btn btn-menu btn-small";
	downloadButton.title = "download selected file";
	downloadButton.innerHTML = "<img src='images/download.png' style='height: 16px;'>";
	downloadButton.addEventListener('click', function(){
	    var widget = Retina.WidgetInstances.shockbrowse[1];
	    if (widget.selectedFile) {
		window.location = widget.shock_base + "/node/" + widget.selectedFile.getAttribute('fi') + "?download";
	    } else {
		alert('no file selected for download');
	    }
	});
	modifyBar.appendChild(downloadButton);

	var deleteButton = document.createElement('button');
	deleteButton.className = "btn btn-menu btn-small";
	deleteButton.title = "delete selected file";
	deleteButton.innerHTML = "<img src='images/remove.png' style='height: 16px;'>";
	deleteButton.addEventListener('click', function(){
	    var widget = Retina.WidgetInstances.shockbrowse[1];
	    alert('not implemented');
	});
	//modifyBar.appendChild(deleteButton);

	toolBar.appendChild(modifyBar);

	// detail type
	var detailBar = document.createElement('div');
	detailBar.className = "btn-group";
	detailBar.setAttribute("data-toggle", "buttons-radio");
	detailBar.setAttribute("style", "float: right;");
	
	var types = [ "info", "attributes", "acl", "preview" ];
	for (var i=0; i<types.length; i++) {
	    var button = document.createElement('button');
	    var active = "";
	    if (types[i] == widget.detailType) {
		active = " active";
	    }
	    button.className = "btn btn-menu btn-small"+active;
	    button.title = types[i];
	    button.innerHTML = "<img src='images/"+types[i]+".png' style='height: 16px;'>";
	    button.setAttribute('onclick', "Retina.WidgetInstances.shockbrowse[1].detailType='"+types[i]+"';Retina.WidgetInstances.shockbrowse[1].showDetails(null, true);");
	    detailBar.appendChild(button);
	}

	toolBar.appendChild(detailBar);

	// search bar
	var searchBar = document.createElement('div');
	searchBar.setAttribute("style", "display: inline-block; margin-left: 10px;");

	var searchField = document.createElement('input');
	searchField.type = "text";
	searchField.setAttribute('style', "border-radius: 13px; height: 13px; position: relative; top: 1px; margin-bottom: 0px;");
	searchField.setAttribute('placeholder', "enter searchtext");
	searchBar.appendChild(searchField);

	//toolBar.appendChild(searchBar);

	section.appendChild(toolBar);
    };

    /*
     * MIDDLE SECTION INTERNALS
     */

    widget.filter_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.filterSection) {
	    section = widget.sections.filterSection;
	    section.innerHTML = "";
	    widget.sections.filterSectionContent = null;
	} else {
	    var height = widget.height - 72;
	    var section = document.createElement('div');
	    section.setAttribute('style', "height: "+height+"px; width: "+widget.filterWidth+"px; float: left; background-color: #e6eaef; color: #6e7886;");
	    widget.sections.middleSection.appendChild(section);
	    widget.sections.filterSection = section;
	}

	var sectionContent = document.createElement('div');
	sectionContent.setAttribute("style", "padding-left: 5px; padding-top: 1px; padding-right: 5px; height: inherit; overflow-y: scroll;");
	section.appendChild(sectionContent);

	sectionContent.innerHTML = '\
<p style="font-weight: bold;">Filter</p>\
<div class="control-group">\
    <label class="control-label" for="filter_key">field</label>\
    <div class="controls">\
      <select id="filter_key" style="width: 220px; font-size: '+widget.fontSize+'px;"></select>\
    </div>\
  </div>\
  <div class="control-group">\
    <label class="control-label" for="filter_value">term</label>\
    <div class="controls input-append">\
      <input type="text" id="filter_value" placeholder="enter filter term" style="width: 157px; font-size: '+widget.fontSize+'px;">\
      <button class="btn" onclick="Retina.WidgetInstances.shockbrowse[1].refineFilter(\'add\');">add</button>\
    </div>\
  </div>\
  <hr>\
  <div id="refine_filter_terms"></div>\
';
	
	var keyselect = document.getElementById('filter_key');
	var keylist = widget.keylist;
	document.getElementById('filter_value').addEventListener('keypress', function (e) {
	    e = e || window.event;
	    if (e.keyCode == 13) {
		Retina.WidgetInstances.shockbrowse[1].refineFilter('add');
	    }
	});
	
	var keyselect_html = "";
	for (var i=0; i<keylist.length; i++) {
	    keyselect_html += "<option value='"+keylist[i].name+"'>"+keylist[i].value+"</option>";
	}
	keyselect.innerHTML = keyselect_html;

	widget.sections.filterSectionContent = sectionContent;
    };

    widget.file_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	var sectionContent;
	if (widget.append) {
	    sectionContent = widget.sections.fileSectionContent;
	} else {
	    if (widget.sections.fileSection) {
		section = widget.sections.fileSection;
		section.innerHTML = "";
		widget.sections.fileSectionContent = null;
	    } else {
		var height = widget.height - 72;
		section = document.createElement('div');
		section.setAttribute('style', "height: "+height+"px; width: "+widget.fileWidth+"px; float: left;");
		widget.sections.middleSection.appendChild(section);
		widget.sections.fileSection = section;
	    }

	    sectionContent = document.createElement('div');
	    sectionContent.setAttribute("style", "padding-left: 5px; padding-top: 1px; padding-right: 5px; height: inherit; overflow-y: scroll; font-size: "+widget.fontSize+"px;");
	    section.appendChild(sectionContent);
	    widget.sections.fileSectionContent = sectionContent

	    sectionContent.addEventListener('scroll', function(event) {
		event = event || window.event;
		var widget = Retina.WidgetInstances.shockbrowse[1];
		if (widget.currentOffset + widget.currentLimit < widget.data.total_count) {
		    if (event.target.scrollTop == event.target.scrollTopMax) {
			widget.scrollPosition = event.target.scrollTop;
			widget.currentOffset += Retina.WidgetInstances.shockbrowse[1].currentLimit;
			widget.append = true;
			widget.updateData();
		    }
		}
	    });
	}

	if (widget.data) {
	    var html = "";
	    for (var i=widget.currentOffset; i<widget.data.data.length; i++) {
		var ds = widget.data.data[i];
		html += "<div id='file"+ds.id+"' class='fileItem' fi='"+ds.id+"' onclick='Retina.WidgetInstances.shockbrowse[1].showDetails(event);' draggable='true' data-downloadurl='application/octet-stream:"+ds.file.name+":"+widget.shock_base + "/node/" + ds.id + "?download'>" + ds.file.name + "</div>";
	    }
	    if (widget.append) {
		sectionContent.innerHTML += html;
	    } else {
		sectionContent.innerHTML = html;
	    }

	    for (var i=widget.currentOffset; i<widget.data.data.length; i++) {
		var div = document.getElementById("file"+widget.data.data[i].id);
		div.addEventListener("dragstart", function(evt){
		    evt.dataTransfer.setData("DownloadURL", typeof this.dataset === "undefined" ? this.getAttribute("data-downloadurl") : this.dataset.downloadurl);
		},false);
	    }
	    widget.append = false;
	}

	sectionContent.scrollTop = widget.scrollPosition;
	
	widget.sections.fileSectionContent = sectionContent;
    };

    widget.detail_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.detailSection) {
	    section = widget.sections.detailSection;
	    section.innerHTML = "";
	    widget.sections.detailSectionContent = null;
	} else {
	    section = document.createElement('div');
	    var height = widget.height - 72;
	    section.setAttribute('style', "height: "+height+"px; width: "+widget.detailWidth+"px; float: left;");
	    widget.sections.middleSection.appendChild(section);
	    widget.sections.detailSection = section;
	}

	var sectionContent = document.createElement('div');
	sectionContent.setAttribute("style", "padding-left: 5px; padding-top: 1px; padding-right: 5px; height: inherit; overflow-y: scroll;");
	section.appendChild(sectionContent);

	widget.sections.detailSectionContent = sectionContent;
    };

    widget.middle_border = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var height = widget.height - 72;

	var bar = document.createElement('div');
	bar.setAttribute('style', "background-color: #E9E9E9; width: 4px; border-left: 1px solid #808080; border-right: 1px solid #808080; height: "+height+"px; float: left; cursor: col-resize;");
	widget.sections.middleSection.appendChild(bar);
	
	var start;
	var wA;
	var wB;

	function startSplitMouse(evt) {
	    start = evt.pageX;
	    wA = parseInt(bar.previousSibling.style.width);
	    wB = parseInt(bar.nextSibling.style.width);
	    jQuery(document)
		.bind("mousemove", doSplitMouse)
		.bind("mouseup", endSplitMouse);
	}
	function doSplitMouse(evt) {
	    bar.previousSibling.style.width = (wA - (start - evt.pageX)) + "px";
	    bar.nextSibling.style.width = (wB + (start - evt.pageX)) + "px";
	}
	function endSplitMouse(evt) {
	    var widget = Retina.WidgetInstances.shockbrowse[1];
	    if (bar.previousSibling.previousSibling) {
		widget.fileWidth = bar.previousSibling.style.width;
		widget.detailWidth = bar.nextSibling.style.width;
	    } else {
		widget.filterWidth = bar.previousSibling.style.width;
		widget.fileWidth = bar.nextSibling.style.width;
	    }
	    jQuery(document)
		.unbind("mousemove", doSplitMouse)
		.unbind("mouseup", endSplitMouse);
	}

	bar.addEventListener('mousedown', startSplitMouse);
    };

    /*
     * BOTTOM SECTION INTERNALS
     */
    widget.status_bar = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
	if (widget.sections.statusBar) {
	    section = widget.sections.statusBar;
	    section.innerHTML = "";
	    widget.sections.progressContainer = null;
	    widget.sections.authContainer = null;
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); z-index: 1;");
	    widget.sections.bottomSection.appendChild(section);
	    widget.sections.statusBar = section;
	}

	section.innerHTML = widget.status;

	var progressContainer = document.createElement('div');
	widget.sections.progressContainer = progressContainer;
	progressContainer.setAttribute("style", "float: left; width: 100px; margin-left: 10px; height: 15px; position: relative; top: 3px;");
	if (widget.progress != null) {    
	    progressContainer.className = "progress";
	    var progressBar = document.createElement('div');
	    progressBar.className = "bar";
	    progressBar.setAttribute("style", "width: "+widget.progress+"%;");
	    progressContainer.appendChild(progressBar);	    
	    widget.sections.progressBar = progressBar;
	} else {
	    widget.sections.progressBar = null;
	}
	section.appendChild(progressContainer);

	var authContainer = document.createElement('div');
	authContainer.setAttribute("style", "float: right; width: 100px; margin-right: 10px; height: 16px; position: relative; top: 2px; text-align: right;");
	if (widget.user) {
	    authContainer.innerHTML = '<img src="images/lock.png" style="width: 16px; position: relative; bottom: 3px;" title="authenticated as '+widget.user.firstname+' '+widget.user.lastname+'">';
	} else {
	    authContainer.innerHTML = '<img src="images/unlocked.png" style="width: 16px; position: relative; bottom: 3px;" title="not authenticated">';
	}
	widget.sections.authContainer = authContainer;
	section.appendChild(authContainer);
    };

    /*
     * ACTION FUNCTIONS
     */
    widget.setShockBase = function (url) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	widget.shock_base = url;

	widget.display();
    };

    widget.loginAction = function (action) {
	var widget = Retina.WidgetInstances.shockbrowse[1];
	if (action.action == "login" && action.result == "success") {
	    widget.user = action.user;
	    widget.authHeader = { "Authorization": "OAuth "+action.token };
	} else {
	    widget.user = null;
	    widget.authHeader = {};
	}
	widget.data = null;
	widget.status = "<img src='images/waiting.gif' style='height: 15px;'> connecting to SHOCK server...";
	widget.updateData();
    };
    
    widget.updateData = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	widget.status = "<img src='images/waiting.gif' style='height: 15px;'> fetching data...";
	widget.status_bar();
	
	var url = widget.shock_base + "/node/?limit="+widget.currentLimit+"&offset="+widget.currentOffset;
	if (Retina.keys(widget.filters).length) {
	    url += "&query&";
	    for (var i in widget.filters) {
		if (widget.filters.hasOwnProperty(i)) {
		    url += i+"="+widget.filters[i];
		}
	    }
	}
	jQuery.ajax({ url: url,
		      dataType: "json",
		      success: function(data) {
			  var widget = Retina.WidgetInstances.shockbrowse[1];
			  if (data != null) {
			      if (data.error != null) {
				  console.log("error: "+data.error);
			      }
			  } else {
			      console.log("error: invalid return structure from SHOCK server");
			      console.log(data);
			  }
			  if (widget.currentOffset == 0) {
			      widget.data = data;
			  } else {
			      for (var i=0; i<data.data.length; i++) {
				  widget.data.data.push(data.data[i]);
			      }
			  }
			  widget.updateDisplay();
		      },
		      error: function(jqXHR, error) {
			  var widget = Retina.WidgetInstances.shockbrowse[1];
			  console.log( "error: unable to connect to SHOCK server" );
			  console.log(error);
			  widget.updateDisplay();
		      },
		      headers: widget.authHeader
		    });
    };

    widget.updateDisplay = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.data && widget.data.hasOwnProperty('total_count')) {
	    var numNodes = widget.data.total_count.formatString(0);
	    var maxNodes = widget.currentOffset+widget.currentLimit;
	    widget.status = "loaded "+(maxNodes > numNodes ? numNodes : maxNodes)+" of "+numNodes+" nodes for current filter";
	    widget.status_bar();
	    widget.file_section();
	    widget.detail_section();
	}
    };

    widget.showDetails = function (e, update) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (! widget.selectedFile && ! e) {
	    return;
	}

	if (! update) {
	    if (widget.selectedFile != null) {
		widget.selectedFile.style.backgroundColor = null;
	    }
	    
	    widget.selectedFile = e.currentTarget;
	    widget.selectedFile.style.backgroundColor = "#e6eaef";

	    widget.currentFileId = e.currentTarget.getAttribute('fi');
	}
	var id = widget.currentFileId;
	var node;
	for (var i=0; i<widget.data.data.length; i++) {
	    if (widget.data.data[i].id == id) {
		node = widget.data.data[i];
		break;
	    }
	}
	
	var html;
	var height = parseInt((widget.height - 85) / 2) - 50;

	var detailInfo = widget.detailInfo || "<div style='padding-top: "+height+"px; text-align: center;'><img src='images/waiting.gif' style='width: 25px;'></div>";

	if (widget.detailType == "info") {
	    html = "<h4>file information - "+node.file.name+"</h4><table style='text-align: left; font-size: "+widget.fontSize+"px;'>\
<tr><th style='width: 75px;'>name</th><td>"+node.file.name+"</td></tr>\
<tr><th>created</th><td>"+node.created_on+"</td></tr>\
<tr><th>modified</th><td>"+node.last_modified+"</td></tr>\
<tr><th>size</th><td>"+node.file.size.formatString()+"</td></tr>\
<tr><th>MD5</th><td>"+node.file.checksum.md5+"</td></tr>\
<tr><th>SHA1</th><td>"+node.file.checksum.sha1+"</td></tr>\
<tr><th>format</th><td>"+(node.file.format ? node.file.format : "unknown")+"</td></tr>\
<tr><th>virtual</th><td>"+(node.file.virtual ? "yes" : "no")+"</td></tr>\
</table>";
	} else if (widget.detailType == "acl") {
	    html = "<h4>acl - "+node.file.name+"</h4>"+detailInfo;
	} else if (widget.detailType == "attributes") {
	    html = "<h4>attributes - "+node.file.name+"</h4><pre style='font-size: "+(widget.fontSize - 1) +"px;'>"+JSON.stringify(node.attributes, null, 2)+"</pre>";
	} else if (widget.detailType == "preview") {
	    html = "<h4>preview - "+node.file.name+"</h4>"+detailInfo;
	    if (widget.detailInfo) {
		widget.detailInfo = null;
	    } else {
		var url = widget.shock_base + "/node/" + node.id + "?download&index=size&part=1&chunksize="+widget.chunkSize;
		jQuery.ajax({ url: url,
			      success: function(data) {
				  var widget = Retina.WidgetInstances.shockbrowse[1];
				  data = data.slice(0, widget.chunkSize);
				  widget.detailInfo = "<pre style='font-size: "+(widget.fontSize - 1)+"px;'>"+data+"</pre>";
				  widget.showDetails(null, true);
			      },
			      error: function(jqXHR, error) {
				  var widget = Retina.WidgetInstances.shockbrowse[1];
				  console.log( "error: unable to connect to SHOCK server" );
				  console.log(error);
			      },
			      headers: widget.authHeader
			    });
	    }
	}

	widget.sections.detailSectionContent.innerHTML = html;
    };

    widget.refineFilter = function (action, item) {
	widget = Retina.WidgetInstances.shockbrowse[1];

	// get the DOM space for the buttons
	var target = document.getElementById('refine_filter_terms');

	if (action == "add") {

	    // add key and value to the filters
	    var skeyList = document.getElementById('filter_key');
	    var skey = skeyList.options[skeyList.selectedIndex].value;
	    var sname = skeyList.options[skeyList.selectedIndex].text;
	    var sval = document.getElementById('filter_value').value;

	    // check for custom filter
	    if (skey == "_custom_") {
		var f = sval.split(/=/);
		if (f.length == 2) {
		    skey = f[0];
		    sname = f[0];
		    sval = f[1];
		} else {
		    alert("invalid format for custom filter\nPlease use 'field=value'");
		    return;
		}
	    }
	    widget.filters[skey] = sval;

	    // check if this is the first button
	    if (target.innerHTML == "") {
		// create a 'clear' button

		var clear = document.createElement('button');
		clear.className = "btn btn-small btn-danger";
		clear.innerHTML = "clear filters";
		clear.addEventListener('click', function () {
		    Retina.WidgetInstances.shockbrowse[1].refineFilter("clear");
		});
		clear.setAttribute('style', "width: 100%; clear: both; margin-bottom: 20px; margin-top: -15px;");
		target.appendChild(clear);
	    }
	    
	    var button = document.createElement('button');
	    button.className = "btn btn-small";
	    button.setAttribute('style', "float: left; margin-right: 10px;");
	    button.innerHTML = sname+" - "+sval+" <i class='icon icon-remove'></i>";
	    button.title = "click to remove";
	    button.setAttribute('id', 'advFilter_'+skey);
	    button.skey = skey;
	    button.addEventListener('click', function() {
		Retina.WidgetInstances.shockbrowse[1].refineFilter("remove", this.skey);
	    });
	    target.appendChild(button);
	} else if (action == "remove") {
	    delete widget.filters[item];
	    target.removeChild(document.getElementById('advFilter_'+item));
	    if (target.childNodes.length == 1) {
		target.innerHTML = "";
	    }
	} else if (action == "clear") {
	    widget.filters = {};
	    target.innerHTML = "";
	} else {
	    console.log("undefined action for refineFilter");
	    return;
	}
	widget.currentOffset = 0;
	widget.scrollPosition = 0;
	widget.data = null;
	widget.append = false;
	widget.updateData();
    };

})();

(function () {
    widget = Retina.Widget.extend({
        about: {
            title: "SHOCK Browser Widget",
            name: "shockbrowse",
            author: "Tobias Paczian",
            requires: [ 'jszip.min.js' ]
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

    // shock url for this browser
    widget.shock_base = RetinaConfig.shock_url;

    // user authentication
    widget.authHeader = {};

    // layout
    widget.width = 1200;
    widget.height = 600;
    widget.borderRadius = 4;
    widget.fontSize = 13;
    widget.sizes = { "small": [ 800, 400 ],
		     "medium": [ 1200, 600 ],
		     "large": [ 1550, 800 ] };

    // upload status information
    widget.previewChunkSize = 2048; // 2 KB
    widget.uploadChunkSize = 1024 * 1024 * 1; // 10 MB
    widget.currentUploadChunk = 0;
    widget.uploadPaused = false;
    widget.chunkComplete = false;

    // store the different sections
    widget.sections = {};

    // title bar text
    widget.title = "SHOCK Browser";

    // status bar text
    widget.status = "<img src='images/waiting.gif' style='height: 15px;'> connecting to SHOCK server...";

    // interface settings
    widget.detailType = "info";
    widget.detailInfo = null;
    widget.selectedFile = null;
    widget.infoRequest = null;
    widget.append = false;
    widget.currentOffset = 0;
    widget.currentLimit = 100;
    widget.scrollPosition = 0;
    widget.filters = {};

    // preset filters
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

	widget.filterWidth = 232;
	widget.fileWidth = Math.floor((widget.width - 229) / 2) - 5;
	widget.detailWidth = Math.floor((widget.width - 229) / 2) - 5;

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

	var realUploadButton = document.createElement('input');
	realUploadButton.setAttribute('type', 'file');
	realUploadButton.setAttribute('style', 'display: none;');
	jQuery(realUploadButton).on('change',  function(event){
	    Retina.WidgetInstances.shockbrowse[1].uploadFileSelected(event);
	});
	widget.uploadDialog = realUploadButton;
	section.appendChild(realUploadButton);

	var uploadButton = document.createElement('button');
	uploadButton.className = "btn btn-menu btn-small";
	uploadButton.title = "upload file";
	uploadButton.innerHTML = "<img src='images/upload.png' style='height: 16px;'><div id='progress_button_progress' style='bottom: 20px; position: relative; margin-right: -11px; background-color: green; height: 26px; margin-top: -2px; margin-left: -10px; width: 0px; opacity: 0.4;'></div>";
	uploadButton.addEventListener('click', function(){ Retina.WidgetInstances.shockbrowse[1].uploadDialog.click(); });
	uploadBar.appendChild(uploadButton);
	widget.uploadButton = uploadButton;

	var resumeButton = document.createElement('button');
	resumeButton.className = "btn btn-menu btn-small";
	resumeButton.title = "resume incomplete uploads";
	resumeButton.innerHTML = "<i class='icon-play'></i>";
	resumeButton.addEventListener('click', Retina.WidgetInstances.shockbrowse[1].findResumableUploads);
	widget.resumeButton = resumeButton;
	uploadBar.appendChild(resumeButton);

	if (! widget.user) {
	    uploadButton.setAttribute('disabled', 'disabled');
	    resumeButton.setAttribute('disabled', 'disabled');
	}

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
	    section.setAttribute('style', "height: "+height+"px; width: "+widget.filterWidth+"px; float: left; background-color: #e6eaef; color: #6e7886; border-right: 1px solid #808080;");
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
		var fn = ds.file.name || ds.id;
		html += "<div id='file"+ds.id+"' class='fileItem' fi='"+ds.id+"' onclick='Retina.WidgetInstances.shockbrowse[1].showDetails(event);' draggable='true' data-downloadurl='application/octet-stream:"+fn+":"+widget.shock_base + "/node/" + ds.id + "?download'>" + fn + "</div>";
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
	    widget.sections.authContainer = null;
	} else {
	    section = document.createElement('div');
	    section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); z-index: 1;");
	    widget.sections.bottomSection.appendChild(section);
	    widget.sections.statusBar = section;
	}

	section.innerHTML = widget.status;

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
	    // set user
	    widget.user = action.user;

	    // set authentication
	    widget.authHeader = { "Authorization": "OAuth "+action.token };

	    // enable functions only available when logged in
	    widget.uploadButton.removeAttribute('disabled');
	    widget.resumeButton.removeAttribute('disabled');

	} else {
	    // remove user
	    widget.user = null;

	    // remove authentication
	    widget.authHeader = {};

	    // disable functions only available when logged in
	    widget.uploadButton.setAttribute('disabled', 'disabled');
	    widget.resumeButton.setAttribute('disabled', 'disabled');
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
	    url += "&query";
	    for (var i in widget.filters) {
		if (widget.filters.hasOwnProperty(i)) {
		    url += "&"+i+"="+widget.filters[i];
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

	var fn = node.file.name || node.id;
	
	var html;
	var height = parseInt((widget.height - 85) / 2) - 50;

	var detailInfo = widget.detailInfo || "<div style='padding-top: "+height+"px; text-align: center;'><img src='images/waiting.gif' style='width: 25px;'></div>";

	if (widget.detailType == "info") {
	    html = "<h4>file information - "+fn+"</h4><table style='text-align: left; font-size: "+widget.fontSize+"px;'>\
<tr><th style='width: 75px;'>name</th><td>"+fn+"</td></tr>\
<tr><th>created</th><td>"+node.created_on+"</td></tr>\
<tr><th>modified</th><td>"+node.last_modified+"</td></tr>\
<tr><th>size</th><td>"+node.file.size.formatString()+"</td></tr>\
<tr><th>MD5</th><td>"+node.file.checksum.md5+"</td></tr>\
<tr><th>SHA1</th><td>"+node.file.checksum.sha1+"</td></tr>\
<tr><th>format</th><td>"+(node.file.format ? node.file.format : "unknown")+"</td></tr>\
<tr><th>virtual</th><td>"+(node.file.virtual ? "yes" : "no")+"</td></tr>\
</table>";
	} else if (widget.detailType == "acl") {
	    html = "<h4>acl - "+fn+"</h4>"+detailInfo;
	} else if (widget.detailType == "attributes") {
	    html = "<h4>attributes - "+fn+"</h4><pre style='font-size: "+(widget.fontSize - 1) +"px;'>"+JSON.stringify(node.attributes, null, 2)+"</pre>";
	} else if (widget.detailType == "preview") {
	    html = "<h4>preview - "+fn+"</h4>"+detailInfo;
	    if (widget.detailInfo) {
		widget.detailInfo = null;
	    } else {
		var url = widget.shock_base + "/node/" + node.id + "?download&index=size&part=1&chunksize="+widget.previewChunkSize;
		jQuery.ajax({ url: url,
			      success: function(data) {
				  var widget = Retina.WidgetInstances.shockbrowse[1];
				  data = data.slice(0, widget.previewChunkSize);
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
    
    // UPLOAD FUNCTIONS

    // start the actual upload
    widget.uploadFile = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// get the selected file
	var file = widget.uploadDialog.files[0];

	// set up the url
	var url = widget.shock_base+'/node';
	widget.uploadURL = url;
	
	widget.currentUpload();

	widget.currentUploadChunk = 0;

	widget.initializeFileReader(file);
	var chunkSize = widget.uploadChunkSize;
	var chunks = Math.ceil(file.size / chunkSize);

	// set up the node
	var incomplete = new Blob([ JSON.stringify({ "incomplete": "1", "incomplete_size": file.size, "incomplete_name": file.name, "incomplete_user": widget.user.login, "incomplete_chunk": Retina.WidgetInstances.shockbrowse[1].currentUploadChunk, "incomplete_chunksize": Retina.WidgetInstances.shockbrowse[1].uploadChunkSize }) ], { "type" : "text\/json" });
	var form = new FormData();
	form.append('attributes', incomplete);
	form.append('parts', chunks);
	jQuery.ajax(widget.uploadURL, {
	    contentType: false,
	    processData: false,
	    data: form,
	    success: function(data) {
		widget.uploadURL += "/" + data.data.id;
		Retina.WidgetInstances.shockbrowse[1].loadNext();
	    },
	    error: function(jqXHR, error){
		Retina.WidgetInstances.shockbrowse[1].uploadDone(null, error);
	    },
	    headers: Retina.WidgetInstances.shockbrowse[1].authHeader,
	    type: "POST"
	});
    };

    widget.initializeFileReader = function (file) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.fileReader) {
	    return;
	}

	// get the tools
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	var chunkSize = widget.uploadChunkSize;
	var start = 0;
	var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
	var chunks = Math.ceil(file.size / chunkSize);

	// file reader
	var fileReader = new FileReader();
	widget.fileReader = fileReader;
	fileReader.onerror = function (error) {
	    Retina.WidgetInstances.shockbrowse[1].uploadDone(null, error);
	};
	fileReader.onload = function(e) {
	    var data = e.target.result;
	    var fd = new FormData();
	    var oMyBlob = new Blob([data], { "type" : file.type });
	    var incomplete = new Blob([ JSON.stringify({ "incomplete": "1", "incomplete_size": file.size, "incomplete_name": file.name, "incomplete_user": widget.user.login, "incomplete_chunk": Retina.WidgetInstances.shockbrowse[1].currentUploadChunk, "incomplete_chunksize": Retina.WidgetInstances.shockbrowse[1].uploadChunkSize }) ], { "type" : "text\/json" });
	    fd.append('attributes', incomplete);

	    fd.append(Retina.WidgetInstances.shockbrowse[1].currentUploadChunk+1, oMyBlob, file.name);
	    jQuery.ajax(widget.uploadURL, {
		xhr: function() {
		    var xhr = new window.XMLHttpRequest();
		    xhr.upload.addEventListener("progress", Retina.WidgetInstances.shockbrowse[1].uploadProgress, false);
		    Retina.WidgetInstances.shockbrowse[1].uploadXHR = xhr;
		    return xhr;
		},
		contentType: false,
		processData: false,
		data: fd,
		success: function(data) {
		    Retina.WidgetInstances.shockbrowse[1].currentUploadChunk++;
		    if ((Retina.WidgetInstances.shockbrowse[1].currentUploadChunk * Retina.WidgetInstances.shockbrowse[1].uploadChunkSize) > file.size) {
			Retina.WidgetInstances.shockbrowse[1].uploadDone(data.data);
		    } else {
			if (! Retina.WidgetInstances.shockbrowse[1].uploadPaused) {
			    Retina.WidgetInstances.shockbrowse[1].loadNext();
			} else {
			    Retina.WidgetInstances.shockbrowse[1].chunkComplete = true;
			}
		    }
		},
		error: function(jqXHR, error){
		    Retina.WidgetInstances.shockbrowse[1].uploadDone(null, error);
		},
		headers: Retina.WidgetInstances.shockbrowse[1].authHeader,
		type: "PUT"
	    });
	}
    };

    widget.loadNext = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// get the selected file
	var file = widget.uploadDialog.files[0];

	var start = Retina.WidgetInstances.shockbrowse[1].currentUploadChunk * Retina.WidgetInstances.shockbrowse[1].uploadChunkSize,
	end = ((start + Retina.WidgetInstances.shockbrowse[1].uploadChunkSize) >= file.size) ? file.size : start + Retina.WidgetInstances.shockbrowse[1].uploadChunkSize;
	
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	widget.fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };

    // show the details about the current upload in the detail section
    widget.currentUpload = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// prevent another upload from starting simultaneously
	widget.uploadButton.addEventListener('click', function(){ Retina.WidgetInstances.shockbrowse[1].currentUpload(); });

	// get the section
	var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;

	// get the selected file
	var file = widget.uploadDialog.files[0];

	var html = "<div style='margin-bottom: 25px;'><h4>uploading "+file.name+"</h4><table style='text-align: left;'><tr><th style='padding-right: 20px;'>filename</th><td>"+file.name+"</td><tr></tr><th>modified</th><td>"+file.lastModifiedDate+"</td></tr><tr><th>size</th><td>"+file.size.byteSize()+"</td></tr><tr><th>type</th><td>"+(file.type || "-")+"</td></tr></table></div>";

	section.innerHTML = html;

	var progressText = document.createElement('div');
	progressText.setAttribute('style', 'text-align: center;');
	section.appendChild(progressText);
	widget.sections.progressText = progressText;
	var progressContainer = document.createElement('div');
	widget.sections.progressContainer = progressContainer;
	progressContainer.setAttribute("style", "height: 25px;");
	progressContainer.className = "progress";
	var progressBar = document.createElement('div');
	progressBar.className = "bar";
	progressBar.setAttribute("style", "width: 0%;");
	progressContainer.appendChild(progressBar);	    
	widget.sections.progressBar = progressBar;
	section.appendChild(progressContainer);

	var buttons = document.createElement('div');
	widget.abortButtons = buttons;
	buttons.setAttribute('style', 'margin-top: 25px;');
	buttons.innerHTML = "<button class='btn pull-left' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].pauseUpload();'><i class='icon-pause'></i> pause upload</button><button class='btn btn-danger pull-right' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].abortUpload();'><i class='icon-stop'></i> abort</button>";
	section.appendChild(buttons);
    };

    widget.abortUpload = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// abort the upload
	widget.uploadXHR.abort();
	widget.abortButtons.innerHTML = "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>aborted...</strong> the upload has been aborted by user request.</div>";
	widget.uploadDone(null, "aborted by user");
    };

    widget.pauseUpload = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// do pause and resume
	if (widget.uploadPaused) {
	    widget.uploadPaused = false;
	    widget.abortButtons.innerHTML = "<button class='btn pull-left' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].pauseUpload();'><i class='icon-pause'></i> pause upload</button><button class='btn btn-danger pull-right' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].abortUpload();'><i class='icon-stop'></i> abort</button>";
	    if (widget.chunkComplete) {
		widget.chunkComplete = false;
		widget.loadNext();
	    }
	} else {
	    widget.uploadPaused = true;
	    widget.abortButtons.innerHTML = "<div class='alert alert-info'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>pausing...</strong> the upload will pause when the current chunk is complete.</div><button class='btn pull-left' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].pauseUpload();'><i class='icon-play'></i> resume upload</button><button class='btn btn-danger pull-right' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].abortUpload();'><i class='icon-stop'></i> abort</button>";
	}
    };

    // update the progress bars
    widget.uploadProgress = function (event) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// get the selected file
	var file = widget.uploadDialog.files[0];

	var loaded = event.loaded + (widget.currentUploadChunk * widget.uploadChunkSize);
	var total = file.size;
	var percent = parseFloat(loaded / total * 100);
	document.getElementById('progress_button_progress').style.width = parseInt(36 * percent / 100) + "px";
	widget.sections.progressText.innerHTML = loaded.byteSize() + " complete";
	widget.sections.progressBar.style.width = percent+"%";
    };

    // the upload has completed successfully, show the details about the uploaded file
    widget.uploadDone = function (data, error) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	widget.uploadButton.addEventListener('click', function(){ Retina.WidgetInstances.shockbrowse[1].uploadDialog.click(); });
	widget.sections.progressContainer.style.width = "100%";
	document.getElementById('progress_button_progress').style.display = "none";
	widget.uploadPaused = false;
	widget.chunkComplete = false;

	// upload was successful, remove incomplete attributes
	if (data) {
	    widget.abortButtons.style.display = "none";
	    
	    // set up the url
	    var url = widget.shock_base+'/node';

	    var fd = new FormData();
	    fd.append('attributes', new Blob([ JSON.stringify({}) ], { "type" : "text\/json" }));
	    jQuery.ajax(url +  "/" + data.id, {
		contentType: false,
		processData: false,
		data: fd,
		success: function(data){
		    //console.log(data);
		},
		error: function(jqXHR, error){
		    console.log(error);
		    console.log(jqXHR);
		},
		headers: Retina.WidgetInstances.shockbrowse[1].authHeader,
		type: "PUT"
	    });
	}
    };

    // a file was selected for upload, show details, preview, settings and upload button
    widget.uploadFileSelected = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// get the selected file
	var file = widget.uploadDialog.files[0];
	
	// get the filereader
	var fileReader = new FileReader();
	fileReader.onerror = function (error) {
	    console.log(error);
	};
	var chunkSize = widget.previewChunkSize;
	var start = 0;
	var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

	// check file type
	var fileType = file.type || "-";
	if (! file.type) {

	    // check for sequence files
	    var sequenceFiles = { "fasta$": "fasta",
				  "fna$": "fasta",
				  "fq$": "fastq",
				  "fastq$": "fastq",
				  "faa$": "fasta" };

	    for (var i in sequenceFiles) {
		if (sequenceFiles.hasOwnProperty(i)) {
		    if (file.name.match(i)) {
			fileType = "text/"+sequenceFiles[i];
		    }
		}
	    }
	}

	// show file details and settings
	var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;
	var html = "<p><table style='text-align: left;'><tr><th style='padding-right: 20px;'>filename</th><td>"+file.name+"</td><tr></tr><th>modified</th><td>"+file.lastModifiedDate+"</td></tr><tr><th>size</th><td>"+file.size.byteSize()+"</td></tr><tr><th>type</th><td>"+fileType+"</td></tr></table></p><div style='text-align: center;'><button class='btn btn-success' type='button' onclick='Retina.WidgetInstances.shockbrowse[1].uploadFile();'>commence upload</button><button class='btn pull-right' data-toggle='button' type='button' onclick='if(this.className.match(/active/)){document.getElementById(\"upload_advanced_options\").style.display=\"none\";}else{document.getElementById(\"upload_advanced_options\").style.display=\"\";}'><i class='icon icon-cog'></i> advanced</button></div><div id='upload_advanced_options' style='margin-top: 10px; border: 1px solid #bbbbbb; padding: 5px; margin-bottom: 10px; display: none;'><b>upload chunk size</b> <select id='upload_chunk_size' onchange='Retina.WidgetInstances.shockbrowse[1].uploadChunkSize=this.options[this.selectedIndex].value;' style='position: relative; top: 4px; left: 5px;'>";
	
	// upload chunk size is currently the only advanced parameter
	var chunkSizes = [ [ 1024 * 100, "100 KB" ],
			   [ 1024 * 1024, "1 MB" ],
			   [ 1024 * 1024 * 10, "10 MB" ],
			   [ 1024 * 1024 * 100, "100 MB" ],
			   [ 0, "unchunked" ] ];
	for (var i=0; i<chunkSizes.length; i++) {
	    var sel = "";
	    if (chunkSizes[i][0] == widget.uploadChunkSize) {
		sel = " selected";
	    }
	    html += "<option value='"+chunkSizes[i][0]+"'"+sel+">"+chunkSizes[i][1]+"</option>";
	}

	html += "</select></div>";
	
	section.innerHTML = html;

	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

	// check if we can show a preview
	if (fileType.match(/json$/)) {
	    fileReader.onload = function(e) {
		var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;
		section.innerHTML += "<p><b>Preview</b></p><pre>" + e.target.result + "\n"+(file.size > chunkSize ? "..." : "")+"</pre>";
	    };
	    fileReader.readAsText(blobSlice.call(file, start, end));	    
	} else if (fileType.match(/^text/)) {
	    fileReader.onload = function(e) {
		var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;
		section.innerHTML += "<p><b>Preview</b></p><pre style='overflow: auto;'><xmp>" + e.target.result + "\n"+(file.size > chunkSize ? "..." : "")+"</xmp></pre>";
	    };
	    fileReader.readAsText(blobSlice.call(file, start, end));
	} else if (fileType.match(/^image/)) {
	    fileReader.onload = function(e) {
		var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;
		var img = document.createElement('img');
		img.setAttribute('src', e.target.result);
		section.innerHTML += "<p><b>Preview</b></p>";
		section.appendChild(img);
		img.addEventListener('load', function () {
		    if (img.naturalWidth > (Retina.WidgetInstances.shockbrowse[1].detailWidth - 20)) {
			img.setAttribute('style', 'width: '+(Retina.WidgetInstances.shockbrowse[1].detailWidth - 20)+'px');
		    }
		    var sizeNode = document.createElement("p");
		    sizeNode.innerHTML = " <i style='font-size: 12px;'>original size: "+img.naturalWidth+"px wide - "+img.naturalHeight+"px high</i>";
		    Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent.insertBefore(sizeNode, img);
		});
	    };
	    fileReader.readAsDataURL(file);	    
	} else if (fileType.match(/\/zip$/)) {
	    fileReader.onload = function(e) {
		var zip = new JSZip(e.target.result);
		var html = "<p><b>Contents</b></p><table class='table' style='margin-top: 25px; font-size: 12px;'><tr><th>name</th><th>compressed</th><th>uncompressed</th></tr>";
		var first;
		for (var i in zip.files) {
		    if (zip.files.hasOwnProperty(i)) {
			if (! first) {
			    first = i;
			}
			html += "<tr><td>"+i+"</td><td>"+zip.files[i]._data.compressedSize.byteSize()+"</td><td>"+zip.files[i]._data.uncompressedSize.byteSize()+"</td></tr>";
		    }
		}
		html += "</table>";
		var buf = zip.file(first).asText(10);
		console.log(buf);
		Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent.innerHTML += html;
	    }
	    fileReader.readAsArrayBuffer(file);
	}
    }

    // RESUME UPLOAD SECTION
    
    // find the resumable uploads for the current user
    widget.findResumableUploads = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// remove previously fetched data
	widget.resumableData = [];

	// construct URL
	var url = widget.shock_base + "/node?query&incomplete=1&incomplete_user=" + widget.user.login;

	// get the section
	var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;

	section.innerHTML = "<h4>Resumable Uploads</h4><div style='text-align: center; margin-top: 100px;'>loading<br><img src='images/waiting.gif' style='width: 25px;'></div>";
	
	jQuery.ajax({ url: url,
		      dataType: "json",
		      success: function(data) {
			  var widget = Retina.WidgetInstances.shockbrowse[1];
			  if (data != null) {
			      if (data.error != null) {
				  widget.displayResumableUploads(null, data.error);
			      } else {
				  widget.displayResumableUploads(data);
			      }
			  } else {
			      widget.displayResumableUploads(null, data);
			  }
		      },
		      error: function(jqXHR, error) {
			  var widget = Retina.WidgetInstances.shockbrowse[1];
			  console.log( "error: unable to connect to SHOCK server" );
			  console.log(error);
			  widget.displayResumableUploads(null, error);
		      },
		      headers: widget.authHeader
		    });
    };
    
    widget.displayResumableUploads = function (data, error) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// get the section
	var section = Retina.WidgetInstances.shockbrowse[1].sections.detailSectionContent;
	
	if (error) {
	    section.innerHTML = "<h4>Error</h4><pre>"+JSON.stringify(error, null, 2)+"</pre>";
	} else {
	    if (data.data.length) {
		widget.resumableData = data.data;
		var html = "<h4>Resumable Uploads</h4><table class='table' style='text-align: left; font-size: 12px;'><tr><th>filename</th><th>full size</th><th>complete</th><th>resume</th></tr>";
		for (var i=0; i<data.data.length; i++) {
		    var ds = data.data[i].attributes;
		    var size = (ds.incomplete_chunk + 1) * ds.incomplete_chunksize;
		    html += "<tr><td>"+ds.incomplete_name+"</td><td>"+ds.incomplete_size.byteSize()+"</td><td>"+size.byteSize()+"</td><td><button class='btn btn-small' onclick='Retina.WidgetInstances.shockbrowse[1].resumeUploadIndex="+i+";Retina.WidgetInstances.shockbrowse[1].uploadDialog.click();'><i class='icon-play'></i></button></td></tr>";
		}
		html += "</table>";
		section.innerHTML = html;

		jQuery(widget.uploadDialog).off('change');
		jQuery(widget.uploadDialog).on('change', function(event){
		    Retina.WidgetInstances.shockbrowse[1].resumeUpload();
		});
	    } else {
		section.innerHTML = "<h4>Resumable Uploads</h4><p>No resumable uploads were found.</p>";
	    }
	}
    };

    widget.resumeUpload = function (event) {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	// if no resume index is set, this is a real upload
	if (Retina.WidgetInstances.shockbrowse[1].resumeUploadIndex == null) {
	    jQuery(widget.uploadDialog).off('change');
	    jQuery(widget.uploadDialog).on('change', function(event){
		Retina.WidgetInstances.shockbrowse[1].uploadFileSelected(event);
	    });
	    widget.uploadFileSelected(event);
	    return;
	}

	// get the selected file
	var file = widget.uploadDialog.files[0];

	// get the file to be resumed
	var node = widget.resumableData[Retina.WidgetInstances.shockbrowse[1].resumeUploadIndex];
	Retina.WidgetInstances.shockbrowse[1].resumeUploadIndex = null;

 	// check if the selected file matches the one to be resumed
	if (file.name == node.attributes.incomplete_name && file.size == node.attributes.incomplete_size) {
	    widget.currentUploadChunk = node.attributes.incomplete_chunk + 1;
	    widget.currentChunksize = node.attributes.incomplete_chunksize;
	    widget.uploadURL = widget.shock_base + "/node/" + node.id;
	    widget.currentUpload();
	    widget.initializeFileReader(file);
	    widget.loadNext();
	} else {
	    alert("The selected file does not match the file to be resumed");
	    return;
	}
    };

})();

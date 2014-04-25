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
    widget.width = 1400;
    widget.height = 600;
    widget.borderRadius = 4;
    widget.fontSize = 13;

    widget.filterWidth = Math.floor(widget.width / 5) - 5;
    widget.fileWidth = Math.floor(widget.width / 5 * 2) - 5;
    widget.detailWidth = Math.floor(widget.width / 5 * 2) - 5;

    widget.sections = {};

    widget.title = "SHOCK Browser";
    widget.status = "<img src='images/waiting.gif' style='height: 15px;'> connecting to SHOCK server...";
    widget.nodeData = {};
    widget.progress = null;
    widget.detailType = "info";
    widget.selectedFile = null;
    widget.detailInfo = null;
    widget.infoRequest = null;

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
  background-color: lightblue;\
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
	    section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);");
	    widget.sections.topSection.appendChild(section);
	    widget.sections.titleBar = section;
	}

	section.innerHTML = widget.title;
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
	toolBar.setAttribute("style", "position: relative; bottom: 4px;");

	// upload bar
	var uploadBar = document.createElement('div');
	uploadBar.className = "btn-group";

	var uploadButton = document.createElement('button');
	uploadButton.className = "btn btn-menu btn-small";
	uploadButton.title = "upload file";
	uploadButton.innerHTML = "<img src='images/upload.png' style='height: 16px;'>";
	uploadBar.appendChild(uploadButton);

	toolBar.appendChild(uploadBar);

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
	    section.setAttribute('style', "height: "+height+"px; width: "+widget.filterWidth+"px; float: left; background-color: #ADD8E6;");
	    widget.sections.middleSection.appendChild(section);
	    widget.sections.filterSection = section;
	}

	var sectionContent = document.createElement('div');
	sectionContent.setAttribute("style", "padding-left: 5px; padding-top: 1px; padding-right: 5px; height: inherit; overflow-y: scroll;");
	section.appendChild(sectionContent);

	sectionContent.innerHTML = "\
<p style='font-weight: bold;'>Filter</p>\
<select><option>data type</option></select>\
<input type='text' placeholder='enter filter text' id='filterText'>\
<button class='btn' onclick='Retina.WidgetInstances.shockbrowse[1].updateData();'>set</button>\
";

	widget.sections.filterSectionContent = sectionContent;
    };

    widget.file_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var section;
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

	var sectionContent = document.createElement('div');
	sectionContent.setAttribute("style", "padding-left: 5px; padding-top: 1px; padding-right: 5px; height: inherit; overflow-y: scroll; font-size: "+widget.fontSize+"px;");
	section.appendChild(sectionContent);

	if (widget.data) {
	    var html = "";
	    for (var i=0; i<widget.data.data.length; i++) {
		var ds = widget.data.data[i];
		html += "<div id='file"+ds.id+"' class='fileItem' fi='"+ds.id+"' onclick='Retina.WidgetInstances.shockbrowse[1].showDetails(event);' draggable='true' data-downloadurl='application/octet-stream:"+ds.file.name+":"+widget.shock_base + "/node/" + ds.id + "?download'>" + ds.file.name + "</div>";
	    }
	    sectionContent.innerHTML = html;
	    for (var i=0; i<widget.data.data.length; i++) {
		var div = document.getElementById("file"+widget.data.data[i].id);
		div.addEventListener("dragstart", function(evt){
		    evt.dataTransfer.setData("DownloadURL", typeof this.dataset === "undefined" ? this.getAttribute("data-downloadurl") : this.dataset.downloadurl);
		},false);
	    }
	}

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
	    section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);");
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
	widget.display();
    };
    
    widget.updateData = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	var url = widget.shock_base + "/node";
	if (document.getElementById('filterText').value) {
	    url += "/?query&data_type="+document.getElementById('filterText').value;
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
			  widget.data = data;
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
	    widget.status = "connected to SHOCK - "+numNodes+" nodes available";
	    widget.status_bar();
	    widget.middle_section();
	}
    };

    widget.showDetails = function (e, update) {
	e = e || window.event;

	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (! update) {
	    if (widget.selectedFile != null) {
		widget.selectedFile.style.backgroundColor = null;
	    }
	    
	    widget.selectedFile = e.currentTarget;
	    widget.selectedFile.style.backgroundColor = "lightblue";

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
	    html = "<h4>file information</h4><table style='text-align: left; font-size: "+widget.fontSize+"px;'>\
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
	    html = "<h4>acl</h4>"+detailInfo;
	} else if (widget.detailType == "attributes") {
	    html = "<h4>attributes</h4><pre style='font-family: arial; font-size: "+widget.fontSize+"px;'>"+JSON.stringify(node.attributes, null, 2)+"</pre>";
	} else if (widget.detailType == "preview") {
	    html = "<h4>preview</h4>"+detailInfo;
	    if (widget.detailInfo) {
		widget.detailInfo = null;
	    } else {
		var url = widget.shock_base + "/node/" + node.id + "?download&index=size&part=1&chunksize=1024";
		jQuery.ajax({ url: url,
			      success: function(data) {
				  var widget = Retina.WidgetInstances.shockbrowse[1];
				  data = data.slice(0, 1024);
				  widget.detailInfo = "<pre>"+data+"</pre>";
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
})();

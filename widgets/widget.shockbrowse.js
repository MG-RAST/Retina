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

    widget.shock_base = RetinaConfig.shock_url;
    widget.authHeader = {};
    widget.width = 1000;
    widget.height = 400;
    widget.borderRadius = 4;

    widget.title = "SHOCK Browser";
    widget.status = "<img src='images/loading.gif' style='height: 15px;'> connecting to SHOCK server...";
    widget.nodeData = {};

    widget.style = function () {
	return '\
<style>\
.btn-moremini {\
  padding-left: 5px;padding-right:5px\
}\
</style>\
';
    };
    
    widget.display = function (wparams) {
        widget = this;
	
	if (wparams) {
	    jQuery.extend(true, widget, wparams);
	}

	var browser = document.createElement('div');
	widget.browser = browser;

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

	if (widget.topSection) {
	    widget.browser.removeChild(widget.topSection);
	}

	var section = document.createElement('div');
	section.setAttribute('style', "height: 50px; border-bottom: 1px solid #838383; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FDFDFD, #C3C3C3); background-repeat: repeat-x; position: relative; border-radius: "+widget.borderRadius+"px "+widget.borderRadius+"px 0 0;");

	if (widget.middleSection) {
	    widget.browser.insertBefore(widget.middleSection, section);
	} else {
	    widget.browser.appendChild(section);
	}

	widget.topSection = section;

	widget.title_bar();
    };

    widget.middle_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.middleSection) {
	    widget.browser.removeChild(widget.middleSection);
	}

	var height = widget.height - 72;

	var section = document.createElement('div');
	section.setAttribute('style', "height: "+height+"px;");

	if (widget.bottomSection) {
	    widget.browser.insertBefore(widget.bottomSection, section);
	} else {
	    widget.browser.appendChild(section);
	}
	widget.middleSection = section;
    };

    widget.bottom_section = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.bottomSection) {
	    widget.browser.removeChild(widget.bottomSection);
	}

	var section = document.createElement('div');
	section.setAttribute('style', "height: 20px; border-top: 1px solid #838383; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FDFDFD, #C3C3C3); background-repeat: repeat-x; position: relative;");

	widget.browser.appendChild(section);
	widget.bottomSection = section;

	widget.status_bar();
    };

    /*
     * TOP SECTION INTERNALS
     */
    widget.title_bar = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.titleBar) {
	    widget.topSection.removeChild(widget.titleBar);
	}

	var section = document.createElement('div');
	section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);");
	section.innerHTML = widget.title;

	if (widget.toolSection) {
	    widget.topSection.insertBefore(widget.toolSection, section);
	} else {
	    widget.topSection.appendChild(section);
	}
	widget.titleBar = section;
    };

    /*
     * MIDDLE SECTION INTERNALS
     */


    /*
     * BOTTOM SECTION INTERNALS
     */
    widget.status_bar = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	if (widget.statusBar) {
	    widget.bottomSection.removeChild(widget.statusBar);
	}

	var section = document.createElement('div');
	section.setAttribute('style', "width: 100%; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);");
	section.innerHTML = widget.status;

	widget.bottomSection.appendChild(section);
	
	widget.statusBar = section;
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
	    widget.authHeader = { "Authorization": "OAuth "+action.token };
	} else {
	    widget.authHeader = {};
	}
	widget.display();
    };
    
    widget.updateData = function () {
	var widget = Retina.WidgetInstances.shockbrowse[1];

	jQuery.ajax({ url: widget.shock_base + "/node",
		      dataType: "json",
		      success: function(data) {
			  var widget = Retina.WidgetInstances.shockbrowse[1];
			  var retval = null;
			  if (data != null) {
			      if (data.error != null) {
				  retval = null;
				  console.log("error: "+data.error);
			      } else {
				  retval = data.data;
			      }
			  } else {
			      retval = null;
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
	    widget.status = "Connected to SHOCK - "+widget.data.total_count+" nodes available";
	    widget.status_bar();
	}
    };
    
})();
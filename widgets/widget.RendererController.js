(function () {
    widget = Retina.Widget.extend({
	about: {
            title: "Renderer Controller",
            name: "RendererController",
	    version: 1,
            author: "Tobias Paczian",
            requires: []
        }
    });

    widget.setup = function () {
	return [];
    }

    widget.renderer = null;
    
    widget.display = function (params) {
	var widget = this;
	var index = widget.index;

	widget.params = widget.params || params;

	if (! Retina.RendererInstances.hasOwnProperty(widget.params.type)) {
	    Retina.add_renderer({"name": widget.params.type, "resource": "./renderers/",  "filename": "renderer."+widget.params.type+".js" }),
            Retina.load_renderer(widget.params.type).then(function () { Retina.WidgetInstances.RendererController[index].display() });
	    return;
	}

	if (! widget.d) {
	    widget.d = jQuery.extend(true, {}, Retina.RendererInstances[widget.params.type][0].settings, widget.params.settings);
	    if (! widget.d.data) {
		widget.d.data = jQuery.extend(true, {}, Retina.RendererInstances[widget.params.type][0].exampleData());
		if (typeof Retina.RendererInstances[widget.params.type][0].exampleData().length === 'number') {
		    var d = [];
		    var k = Retina.keys(widget.d.data).sort();
		    for (var i=0; i<k.length; i++) {
			if (widget.d.data.hasOwnProperty(i)) {
			    d.push(widget.d.data[i]);
			}
		    }
		    widget.d.data = d;
		}
	    }
	}
	var cDiv = widget.controlDiv = document.createElement('div');
	widget.displayDiv = document.createElement('div');
	widget.d.target = widget.displayDiv;
	widget.renderer = Retina.Renderer.create(widget.params.type, widget.d);
	widget.params.width = widget.params.width || 800;

	var html = '<div class="accordion" id="RendererController_accordion'+index+'" style="width: '+widget.params.width+'px; margin-bottom: 20px;">';

	for (var i=0; i<widget.renderer.about.options.length; i++) {
	    var groupname = Retina.keys(widget.renderer.about.options[i])[0];
	    var group = widget.renderer.about.options[i][groupname];

	    html += '\
<div class="accordion-group">\
  <div class="accordion-heading">\
    <a class="accordion-toggle" data-toggle="collapse" data-parent="#RendererController_accordion'+index+'" href="#RendererController_collapse_'+index+'_'+i+'">'+groupname+'</a>\
  </div>\
  <div id="RendererController_collapse_'+index+'_'+i+'" class="accordion-body collapse">\
    <div class="accordion-inner">\
      <table>\
';
	    for (var h=0; h<group.length; h++) {
		var opt = group[h];
		opt.index = index;
		html += "<tr><td style='text-align: right; vertical-align: middle;'>"+opt.title+"</td><td style='padding-left: 10px; text-align: left;'>";
		try {
		    html += widget["inputRender"+opt.type](opt);
		} catch (error) {
		    console.log(opt.type);
		}
		html += "</td><td style='padding-left: 10px; text-align: left; vertical-align: middle;'>"+opt.description+"</td></tr>";
	    }
	    html += '\
      </table>\
    </div>\
  </div>\
</div>';

	}

	html += "</div>";
	cDiv.innerHTML = html;

	widget.params.target.innerHTML = "";
	widget.params.target.appendChild(widget.controlDiv);

	if (widget.params.breadcrumbs) {
	    var bc = document.createElement('div');
	    bc.setAttribute('id', widget.params.breadcrumbs);
	    bc.setAttribute('style', "margin-bottom: 20px;");
	    widget.params.target.appendChild(bc);
	}

	widget.params.target.appendChild(widget.displayDiv);

	widget.render(index);

	return widget;
    };

    widget.data = function (index, data) {
	var widget = Retina.WidgetInstances.RendererController[index];
	
	if (data) {
	    widget.d.data = data;
	    widget.renderer.settings.data = data;
	}

	return widget.d.data;
    };

    widget.render = function (index) {
	var widget = Retina.WidgetInstances.RendererController[index];

	widget.renderer.render();

	return widget;
    };

    // input render functions
    widget.inputRendercolor = function (opt) {
	return "<input type='text' style='margin-bottom: 0px;' value='"+(Retina.WidgetInstances.RendererController[opt.index].renderer.settings[opt.name] || "")+"' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=this.value;Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";
    };

    widget.inputRenderfloat = function (opt) {
	return "<input type='text' style='margin-bottom: 0px;' value='"+(Retina.WidgetInstances.RendererController[opt.index].renderer.settings[opt.name] || "")+"' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=parseFloat(this.value);Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";
    };

    widget.inputRendertext = function (opt) {
	return "<input type='text' style='margin-bottom: 0px;' value='"+(Retina.WidgetInstances.RendererController[opt.index].renderer.settings[opt.name] || "")+"' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=this.value;Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";
    };
    
    widget.inputRenderfontsize = function (opt) {
	return "<input type='text' style='margin-bottom: 0px;' value='"+(Retina.WidgetInstances.RendererController[opt.index].renderer.settings[opt.name] || "")+"' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=this.value;Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";
    };
    
    widget.inputRenderint = function (opt) {
	return "<input type='text' style='margin-bottom: 0px;' value='"+(Retina.WidgetInstances.RendererController[opt.index].renderer.settings[opt.name] || "")+"' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=parseInt(this.value);Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";
    };

    widget.inputRenderselect = function (opt) {
	var html = "<select style='margin-bottom: 0px;' onchange='Retina.WidgetInstances.RendererController["+opt.index+"].renderer.settings."+opt.name+"=this.options[this.selectedIndex].value;Retina.WidgetInstances.RendererController["+opt.index+"].renderer.render();' id='RendererControllerInput_"+opt.index+"_"+opt.name+"'>";

	for (var i=0; i<opt.options.length; i++) {
	    var selected = "";
	    var o = opt.options[i];
	    if (o.selected) {
		selected = " selected=selected";
	    }
	    html += "<option"+selected+" value='"+o.value+"'>"+(o.label || o.value)+"</option>";
	}

	html += "</select>";
	return html;
    };
})();

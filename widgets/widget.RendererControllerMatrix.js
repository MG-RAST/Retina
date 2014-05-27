(function () {
    widget = Retina.Widget.extend({
	about: {
            title: "Matrix Renderer Controller",
            name: "RendererControllerMatrix",
	    version: 1,
            author: "Tobias Paczian",
            requires: []
        }
    });

    widget.setup = function () {
	return [ Retina.add_renderer({"name": "matrix", "resource": "./renderers/",  "filename": "renderer.matrix.js" }),
                 Retina.load_renderer("matrix") ];
    }
    
/*

  rowColors (HASH of INT -> CSS color value)
    hash of row index pointing to a CSS color value, determining the base color of the circles in that row. Overwrites the default color.

  colColors (HASH of INT -> CSS color value)
    hash of column index pointing to a CSS color value, determining the base color of the circles in that column. Overwrites the default color and row color.

*/

    widget.d = { data: { rows: ['metagenome a', 'metagenome b', 'metagenome c'],
			 columns: ['function 1', 'function 2', 'function 3', 'function 4', 'function 5', 'function 6', 'function 7', 'function 8', 'function 9', 'function 10' ],
			 data: [ [1,2,3,4,5,4,3,2,1,0],
				 [5,4,3,2,1,0,1,2,3,4],
				 [0,1,0,4,0,7,0,3,0,2] ] },
		 colHeaderHeight: 100 };
    
    widget.renderer = null;
    
    widget.display = function (params) {
	var widget = this;
	var index = widget.index;

	var cDiv = widget.controlDiv = document.createElement('div');
	widget.displayDiv = document.createElement('div');

	var data = jQuery.extend(true, { target: widget.displayDiv }, widget.d );
	widget.renderer = Retina.Renderer.create('matrix', data);

	var html = "<table>";
	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>minimum opacity</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.minOpacity+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.minOpacity=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>circle color</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.circleColor+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.circleColor=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>data font size</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.dataFontSize+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.dataFontSize=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>row font size</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.rowFontSize+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.rowFontSize=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>column font size</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.colFontSize+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.colFontSize=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>circle size</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.circleSize+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.circleSize=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "<tr><td style='padding-right: 20px; vertical-align: middle;'><b>column header height</b></td><td><input style='margin-bottom: 0px;' type='text' value='"+widget.renderer.settings.colHeaderHeight+"' onchange='Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.settings.colHeaderHeight=this.value;Retina.WidgetInstances.RendererControllerMatrix["+index+"].renderer.render();'></td></tr>";

	html += "</table>";
	cDiv.innerHTML = html;

	params.target.innerHTML = "";
	params.target.appendChild(widget.controlDiv);
	params.target.appendChild(widget.displayDiv);

	widget.render(index);

	return widget;
    };

    widget.data = function (index, data) {
	var widget = Retina.WidgetInstances.RendererControllerMatrix[index];
	
	if (data) {
	    widget.d.data = data;
	    widget.renderer.settings.data = data;
	}

	return widget.d.data;
    };

    widget.render = function (index) {
	var widget = Retina.WidgetInstances.RendererControllerMatrix[index];

	widget.renderer.render();

	return widget;
    };

})();

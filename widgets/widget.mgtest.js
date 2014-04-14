(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "MG-RAST v4 Test Widget",
                name: "mgtest",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ 
 	    Retina.add_renderer({"name": "tree", "resource": "./renderers/",  "filename": "renderer.tree.js" }),
  	    Retina.load_renderer("tree"),
	];
    };
    
    widget.display = function (wparams) {
        widget = this;

	var container = wparams.target;

	var html = "<h2>Hello World</h2>";
	html += "<div id='test'></div>";

	container.innerHTML = html;

	widget.test = Retina.Renderer.create("tree", {
	    target: document.getElementById('test'),
	    data: Retina.RendererInstances.tree[0].exampleData()
	});
	widget.test.render();
    };
    
})();
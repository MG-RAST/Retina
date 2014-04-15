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

	jQuery.get("http://api.metagenomics.anl.gov/1/metadata/ontology?name=biome&version=2013-04-27", function (data) {
	    widget.test = Retina.Renderer.create("tree", {
		target: document.getElementById('test'),
		data: data
	    });
	    widget.test.render();
	});
    };
    
})();
(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "MG-RAST v4 Test Widget",
                name: "mgtest",
                author: "Tobias Paczian",
                requires: []
        }
    });
    
    widget.setup = function () {
	return [];
    };
    
    widget.display = function (wparams) {
        widget = this;

	var container = wparams.target;

	var html = "<h2>Tree Test</h2>";

	html += "<div style='width: 376px; float: left; margin-right: 20px;'><h3>biome</h3></div><div style='width: 376px; float: left; margin-right: 20px;'><h3>feature</h3></div><div style='width: 376px; float: left;'><h3>material</h3></div><div style='clear: both;'></div>";

	html += "<div id='biome' style='float: left; margin-right: 20px;'></div>";
	html += "<div id='feature' style='float: left; margin-right: 20px;'></div>";
	html += "<div id='material' style='float: left;'></div>";
	
	container.innerHTML = html;

	jQuery.get("http://api.metagenomics.anl.gov/1/metadata/ontology?name=biome&version=2013-04-27", function (data) {
	    standaloneTree.create({
		target: document.getElementById('biome'),
		data: data,
		index: 0
	    }).render(0);
	});

	jQuery.get("http://api.metagenomics.anl.gov/1/metadata/ontology?name=feature&version=2013-04-27", function (data) {
	    standaloneTree.create({
		target: document.getElementById('feature'),
		data: data,
		index: 1
	    }).render(1);
	});

	jQuery.get("http://api.metagenomics.anl.gov/1/metadata/ontology?name=material&version=2013-04-27", function (data) {
	    standaloneTree.create({
		target: document.getElementById('material'),
		data: data,
		index: 2
	    }).render(2);
	});
    };
    
})();

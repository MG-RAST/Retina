(function () {
    var widget = Retina.Widget.extend({
	about: {
            title: "Tutorial Widget",
            name: "tutorial",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	return [ ];
    }
    
    widget.display = function (params) {
	var widget = this;
	var target = params.target;
	
	params.target.innerHTML = "<p>Hello World</p>";

	return widget;
    };

})();

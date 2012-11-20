(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Tutorial Widget",
                name: "tutorial",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });

    widget.setup = function () {
	return [ ];
    }
    
    widget.display = function (div) {
	div.innerHTML = "<p>Hello World</p>";
    };

})();

(function () {
    // I have to look back into the schema validation, it was implemented by Andrew
    // seemed useful when he demoed it, but I did not yet take a closer look
    var schema = {
        properties: {
            target: {
                type: 'object',
                required: true
            },
            data: {
                type: 'object',
                properties: {
                    data: {
                        required: true,
                        type: 'array',
                        items: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    };
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "example",
	    title: "Table",
            author: "Tobias Paczian",
            version: "1.0",
	    // the requires is a list of javascript libraries that will be loaded when the
	    // widget is loaded
            requires: [],
	    // put default values for all parameters to the renderer in here
	    // they will be extended by the parameters actually passed to the renderer
            defaults: {
		'width': null,
		'height': null,
		'target': 'table_space',
		'data': 'exampleData()'
	    },
	},
	// this function must return sample data that allows the renderer to render
	// the data can be any arbitrary JSON data structure
	// it will be used by the testRenderer function
	exampleData: function () {
	    return { data: [ ["a1", "b1", "c1"],
			     ["a3", "b2", "c2"],
			     ["a4", "b3", "c3"] ] };
        },
	render: function (options) {
	    // this will be called to display the renderer
	    // the options will contain the contents of the defaults attribute
	    // of the about function extended by anything actually passed to the
	    // function when it is called
	    // the target parameter should always be the DOM element the renderer
	    // is to render to. It is usually a good idea to empty the the target
	    // just in case the renderer is called multiple times
	    options.target.innerHTML = "";

	},
	somefunc: function () {
	    // put any additional functions your renderer might need in like this
	}
	
    });
 }).call(this);

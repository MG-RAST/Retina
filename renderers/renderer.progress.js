(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "progress",
	    title: "Progress",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: [],
	    defaults: {
		'width' : 400,
		'radius': 10,
		'border': 2,
		'placement': "bottom"
	    },
	},
	exampleData: function () {
	    return { "data": [ { "name": "project", "title": "project", "content": "Your project data is complete." },
			       { "name": "sample", "title": "sample", "content": "You have completed 3 out of 10 steps for the sample section." },
			       { "name": "library", "title": "library", "content": "You still need to complete the library section." } ],
		     "currentStep": 1,
		     "fraction": 0.3 };
        },
	render: function () {
	    renderer = this;

	    var data = renderer.settings.data;

	    var line = (renderer.settings.width / data.length) - (renderer.settings.radius + renderer.settings.border + renderer.settings.border);
	    var current = ((renderer.settings.radius + renderer.settings.border + renderer.settings.border + line + 2) * renderer.settings.currentStep) + (line * renderer.settings.fraction) - 6;
	    var lineOffset = parseInt((renderer.settings.radius / 2) + (renderer.settings.border / 2));

	    var html = [];
	    html.push('<div><div style="color: red; margin-left: '+current+'px;">&#9660;</div></div><div>');
	    
	    for (var i=0; i<data.length; i++) {
		if (i<renderer.settings.currentStep) {
		    html.push('<div style="float: left; width: '+line+'px; height: 0px; border: 1px solid black; position: relative; top: '+lineOffset+'px;"></div>');
		    html.push('<div id="progress'+renderer.index+data[i].name+'" style="float: left; width: '+renderer.settings.radius+'px; height: '+renderer.settings.radius+'px; border-radius: '+renderer.settings.radius+'px; border: '+renderer.settings.border+'px solid black; background-color: green;"></div>');
		} else if (i == renderer.settings.currentStep) {
		    html.push('<div style="float: left; width: '+parseInt(line * renderer.settings.fraction)+'px; height: 0px; border: 1px solid black; position: relative; top: '+lineOffset+'px;"></div>');
		    html.push('<div style="float: left; width: '+parseInt(line * (1 - renderer.settings.fraction))+'px; height: 0px; border: 1px solid lightgray; position: relative; top: '+lineOffset+'px;"></div>');
		    html.push('<div id="progress'+renderer.index+data[i].name+'" style="float: left; width: '+renderer.settings.radius+'px; height: '+renderer.settings.radius+'px; border-radius: '+renderer.settings.radius+'px; border: '+renderer.settings.border+'px solid black; background-color: white;"></div>');
		} else {
		    html.push('<div style="float: left; width: '+line+'px; height: 0px; border: 1px solid lightgray; position: relative; top: '+lineOffset+'px;"></div>');
		    html.push('<div id="progress'+renderer.index+data[i].name+'" style="float: left; width: '+renderer.settings.radius+'px; height: '+renderer.settings.radius+'px; border-radius: '+renderer.settings.radius+'px; border: '+renderer.settings.border+'px solid lightgray; background-color: white;"></div>');
		}
	    }

	    html.push('</div><div style="clear: both;"><div style="color: red; margin-left: '+current+'px;">&#9650;</div></div>');
	    
	    renderer.settings.target.innerHTML = html.join('');

	    for (var i=0; i<data.length; i++) {
		jQuery('#progress'+renderer.index+data[i].name).popover( { "title": data[i].title, "content": data[i].content, "trigger": "hover", "placement": renderer.settings.placement } );
	    }

	    return renderer;
	}
    });
 }).call(this);

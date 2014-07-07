(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "cvfield",
	    title: "cvfield",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: { minlength: 2,
			fieldWidth: 286 },
	},
	exampleData: function () {
	    return [];
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    // prepare helper structures
	    var items = renderer.settings.data.items;
	    renderer.itemkeys = Retina.keys(items);

	    // render the completion text
	    var completion = document.createElement('span');
	    completion.setAttribute('style', "color: #CCCCCC; position: absolute; margin-top: 5px;");
	    completion.innerHTML = "";
	    completion.addEventListener('click', function(){ Retina.RendererInstances.cvfield[index].textbox.focus(); Retina.RendererInstances.cvfield[index].textbox.selectionStart = Retina.RendererInstances.cvfield[index].textbox.value.length; });
	    renderer.settings.target.appendChild(completion);
	    renderer.completion = completion;

	    // render the input box
	    var textbox = document.createElement('input');
	    renderer.textbox = textbox;
	    textbox.setAttribute('type', 'text');
	    textbox.setAttribute('style', 'width: '+renderer.settings.fieldWidth+'px');
	    if (renderer.settings.id) {
		textbox.setAttribute('id', renderer.settings.id);
	    }
	    textbox.addEventListener('keyup', function(e) { Retina.RendererInstances.cvfield[index].updateText(e, index); });
	    textbox.addEventListener('keydown', function(e) {
		if (e.keyCode==9) { e.preventDefault(); e.stopPropagation(); return false; };
		if (e.keyCode==8) { Retina.RendererInstances.cvfield[index].current = 0; };
		if (e.keyCode==38) { e.preventDefault(); e.stopPropagation(); return false; };
	    });
	    renderer.settings.target.appendChild(textbox);

	    // check the current input text width
	    var textWidth = document.createElement('div');
	    textWidth.setAttribute('style', 'position: absolute; width: auto; white-space: pre-wrap; visibility: hidden;');
	    renderer.settings.target.appendChild(textWidth);
	    renderer.textWidth = textWidth;

	    var suggestions = document.createElement('div');
	    suggestions.setAttribute('style', 'position: relative; bottom: 42px; left: '+(25+renderer.settings.fieldWidth)+'px;');
	    renderer.settings.target.appendChild(suggestions);
	    renderer.suggestions = suggestions;

	    return renderer;
	},
	updateText: function (e, index) {
	    renderer = Retina.RendererInstances.cvfield[index];

	    var t = renderer.textbox.value.toLowerCase();
	    if (t && t.length >= renderer.settings.minlength) {
		var items = renderer.settings.data.items;
		var newKey = true;
		var completed = false;
		if (renderer.results && renderer.results.prefix.length) {
		    // arrow down
		    if (e.keyCode == 40) {
			if (renderer.results.prefix.length > (renderer.current + 1)) {
			    renderer.current++;
			}
			newKey = false;
		    }
		    
		    // arrow up
		    if (e.keyCode == 38) {
			if (renderer.current > 0) {
			    renderer.current--;
			}
			newKey = false;
		    }

		    // tab
		    if (e.keyCode == 9) {
			renderer.completion.innerHTML = "";
			renderer.textbox.value = renderer.settings.data.items[renderer.results.prefix[renderer.current]];
			newKey = false;
			completed = true;
			if (typeof renderer.settings.callback == 'function') {
			    renderer.settings.callback.call(null, renderer.textbox.value);
			}
		    }
		}

		// enter
		if (e.keyCode == 13) {
		    var found = false;
		    if (renderer.results.prefix.length) {
			if (renderer.settings.data.items[renderer.results.prefix[0]] == renderer.textbox.value) {
			    found = true;
			} else if (renderer.settings.data.items[renderer.results.prefix[0]].toLowerCase() == renderer.textbox.value.toLowerCase()) {
			    renderer.textbox.value = renderer.settings.data.items[renderer.results.prefix[0]];
			    found = true;
			}
		    }
		    if (! found) {
			var html = '\
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">\
    <li class="disabled"><a tabindex="-1" href="#" style="color: black; font-weight: bold;">Did you mean...</a></li>\
';
			// fill the suggestions
			if (! renderer.results) {
			    html += '    <li class="disabled"><a tabindex="-1" href="#" style="color: black;" onclick=>- no matches found -</a></li>\
';
			} else {
			    if (renderer.results.prefix.length) {
				for (var i=0;i<renderer.results.prefix.length;i++) {
				    var x = renderer.settings.data.items[renderer.results.prefix[i]];
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');"><span style="font-weight: bold">'+x.substr(0,t.length)+'</span>'+x.substr(t.length)+'</a></li>\
';
				}
			    }
			    if (renderer.results.wordPrefix.length) {
				for (var i=0;i<renderer.results.wordPrefix.length;i++) {
				    var x = renderer.settings.data.items[renderer.results.wordPrefix[i]];
				    var l = renderer.settings.data.items[renderer.results.wordPrefix[i]].toLowerCase().indexOf(t);
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');">'+x.substr(0,l)+'<span style="font-weight: bold">'+x.substr(l,t.length)+'</span>'+x.substr(l + t.length)+'</a></li>\
';
				}
			    }
			    if (renderer.results.infix.length) {
				for (var i=0;i<renderer.results.infix.length;i++) {
				    var x = renderer.settings.data.items[renderer.results.infix[i]];
				    var l = renderer.settings.data.items[renderer.results.infix[i]].toLowerCase().indexOf(t);
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');">'+x.substr(0,l)+'<span style="font-weight: bold">'+x.substr(l,t.length)+'</span>'+x.substr(l + t.length)+'</a></li>\
';
				}
			    }
			}

			html+= '    <li class="divider"></li>\
    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].suggestions.setAttribute(\'class\', \'\');"><i>my item is not in the list</i></a></li>\
</ul>';
			renderer.suggestions.innerHTML = html;
			renderer.suggestions.setAttribute('class', 'open');
		    } else {
			if (typeof renderer.settings.callback == 'function') {
			    renderer.settings.callback.call(null, renderer.textbox.value);
			}
		    }
		    newKey = false;
		}

		if (newKey) {
		    var results = { prefix: [],
				    wordPrefix: [],
				    infix: [] };
		    for (var i=0;i<renderer.itemkeys.length;i++) {
			var ind = renderer.itemkeys[i].toLowerCase().indexOf(t);
			if (ind > -1) {
			    if (ind == 0) {
				results.prefix.push(renderer.itemkeys[i]);
			    } else if (renderer.itemkeys[i].charAt(ind - 1) == " ") {
				results.wordPrefix.push(renderer.itemkeys[i]);
			    } else {
				results.infix.push(renderer.itemkeys[i]);
			    }
			}
		    }
		    renderer.results = results;
		}

		if (renderer.results && renderer.results.prefix.length) {
		    if  (! completed) {
			renderer.completion.innerHTML = renderer.settings.data.items[renderer.results.prefix[renderer.current]].substr(t.length).replace(/^\s/, "&nbsp;");
		    }
		    renderer.textWidth.innerHTML = renderer.textbox.value;
		    renderer.completion.style.marginLeft = (renderer.textWidth.clientWidth + 9)+"px";		  		    
		} else {
		    renderer.completion.innerHTML = "";
		}
	    } else {
		renderer.completion.innerHTML = "";
	    }
	},
	
	textbox: null,
	current: 0,

	setData: function (index, text) {
	    var renderer = Retina.RendererInstances.cvfield[index];
	    renderer.suggestions.setAttribute('class', '');
	    renderer.textbox.value = text;
	    renderer.completion.innerHTML = "";
	    if (typeof renderer.settings.callback == 'function') {
		renderer.settings.callback.call(null, renderer.textbox.value);
	    }
	},

	itemsort: function (a, b) {
	    if (a.toLowerCase() > b.toLowerCase()) {
		return 1;
	    } else if (a.toLowerCase() < b.toLowerCase()) {
		return -1;
	    } else {
		return 0;
	    }
	}
    });
}).call(this);
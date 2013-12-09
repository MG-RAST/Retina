(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "cvfield",
	    title: "cvfield",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: { minlength: 3,
			fieldWidth: 350 },
	},
	exampleData: function () {
	    return [];
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    if (! renderer.data.hasOwnProperty('items')) {
		renderer.loadData(index);
		return renderer;
	    }

	    // prepare helper structures
	    var items = renderer.data.items;

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
		var items = renderer.data.items;
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
			renderer.textbox.value = renderer.data.items[renderer.results.prefix[renderer.current]];
			newKey = false;
			completed = true;
		    }
		}

		// enter
		if (e.keyCode == 13) {
		    var found = false;
		    if (renderer.results.prefix.length) {
			if (renderer.data.items[renderer.results.prefix[0]] == renderer.textbox.value) {
			    found = true;
			} else if (renderer.data.items[renderer.results.prefix[0]].toLowerCase() == renderer.textbox.value.toLowerCase()) {
			    renderer.textbox.value = renderer.data.items[renderer.results.prefix[0]];
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
				    var x = renderer.data.items[renderer.results.prefix[i]];
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');"><span style="font-weight: bold">'+x.substr(0,t.length)+'</span>'+x.substr(t.length)+'</a></li>\
';
				}
			    }
			    if (renderer.results.wordPrefix.length) {
				for (var i=0;i<renderer.results.wordPrefix.length;i++) {
				    var x = renderer.data.items[renderer.results.wordPrefix[i]];
				    var l = renderer.data.items[renderer.results.wordPrefix[i]].toLowerCase().indexOf(t);
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');">'+x.substr(0,l)+'<span style="font-weight: bold">'+x.substr(l,t.length)+'</span>'+x.substr(l + t.length)+'</a></li>\
';
				}
			    }
			    if (renderer.results.infix.length) {
				for (var i=0;i<renderer.results.infix.length;i++) {
				    var x = renderer.data.items[renderer.results.infix[i]];
				    var l = renderer.data.items[renderer.results.infix[i]].toLowerCase().indexOf(t);
				    html += '    <li><a tabindex="-1" href="#" onclick="Retina.RendererInstances.cvfield['+index+'].setData('+index+',\''+x+'\');">'+x.substr(0,l)+'<span style="font-weight: bold">'+x.substr(l,t.length)+'</span>'+x.substr(l + t.length)+'</a></li>\
';
				}
			    }
			}

			html+= '    <li class="divider"></li>\
    <li><a tabindex="-1" href="#"><i>my item is not in the list</i></a></li>\
</ul>';
			renderer.suggestions.innerHTML = html;
			renderer.suggestions.setAttribute('class', 'open');
		    }
		    newKey = false;
		}

		if (newKey) {
		    var results = { prefix: [],
				    wordPrefix: [],
				    infix: [] };
		    for (var i=0;i<items.length;i++) {
			var ind = items[i].toLowerCase().indexOf(t);
			if (ind > -1) {
			    if (ind == 0) {
				results.prefix.push(i);
			    } else if (items[i].charAt(ind - 1) == " ") {
				results.wordPrefix.push(i);
			    } else {
				results.infix.push(i);
			    }
			}
		    }
		    renderer.results = results;
		}

		if (renderer.results && renderer.results.prefix.length) {
		    if  (! completed) {
			renderer.completion.innerHTML = renderer.data.items[renderer.results.prefix[renderer.current]].substr(t.length).replace(/^\s/, "&nbsp;");
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
	
	data: {},
	textbox: null,
	current: 0,

	loadData: function (index) {

	    jQuery.get('data/funding_source_list', function(data) {
		data = data.split(/\n/);
		data = data.sort(Retina.RendererInstances.cvfield[index].itemsort);
		Retina.RendererInstances.cvfield[index].data.items = data;
		Retina.RendererInstances.cvfield[index].render();		
            }, 'text');
	},

	setData: function (index, text) {
	    Retina.RendererInstances.cvfield[index].suggestions.setAttribute('class', '');
	    Retina.RendererInstances.cvfield[index].textbox.value = text;
	    Retina.RendererInstances.cvfield[index].completion.innerHTML = "";
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
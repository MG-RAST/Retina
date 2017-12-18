(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "listgenerator",
	    title: "List Generator",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		type: 'api', // [ api, static ]
		api: {
		    url: '',
		    url_suffix: '',
		    idfield: '',
		    textfield: ''
		},
		minkeys: 3,
		max_search_entries: 8,
		width: 200,
		viewable_list_entries: 8,
		default_list_name: 'list_1',
		callback: null
	    },
	},
	exampleData: function () {
	    return [ ];
        },
	render: function () {
	    renderer = this;

	    var index = renderer.index;

	    var html = [];
	    
	    html.push('<input type="text" id="renderer_listgenerator_input'+index+'" style="float: left; margin-right: 15px; width: '+renderer.settings.width+'px;">');
	    html.push('<div style="float: left; margin-right: 15px;"><input type="text" autocomplete="off" value="'+renderer.settings.default_list_name+'" style="margin-bottom: 0px; border-radius: 4px 4px 0 0; background-color: #f5f5f5; background-image: linear-gradient(to bottom,#fff,#e6e6e6); text-shadow: 0 1px 1px rgba(255,255,255,0.75); width: '+(renderer.settings.width - 14)+'px; padding" id="renderer_listgenerator_title'+index+'"><br><select multiple size='+renderer.settings.viewable_list_entries+' id="renderer_listgenerator_list'+index+'" style="position: relative; bottom: 1px; border-radius: 0 0 4px 4px; width: '+renderer.settings.width+'px;"></select></div>');
	    html.push('<div style="float: left; margin-right: 15px; padding-top: 3px;"><button class="btn btn-small btn-danger" style="margin-bottom: 3px;" onclick="if(confirm(\'Really delete this list?\')){Retina.RendererInstances.listgenerator['+index+'].deleteList();}"><i class="icon icon-trash"></i></button><br><button class="btn btn-small" style="margin-bottom: 15px;" onclick="Retina.RendererInstances.listgenerator['+index+'].deleteItem();"><i class="icon icon-remove"></i></button><br><button class="btn btn-small" style="margin-bottom: 3px;" onclick="Retina.RendererInstances.listgenerator['+index+'].moveUp();"><i class="icon icon-arrow-up"></i></button><br><button class="btn btn-small" style="margin-bottom: 15px;" onclick="Retina.RendererInstances.listgenerator['+index+'].moveDown();"><i class="icon icon-arrow-down"></i></button><br><button class="btn btn-small btn-success" onclick="Retina.RendererInstances.listgenerator['+index+'].sendList();"><i class="icon icon-ok"></i></button></div>');
	    
	    renderer.settings.target.innerHTML = html.join('');

	    jQuery('#renderer_listgenerator_input'+index).typeahead({
		source: renderer.apicall,
		minLength: renderer.settings.minkeys,
		items: renderer.settings.max_search_entries,
		updater: renderer.updatetext
	    });
	    
	    return renderer;
	},
	apicall: function (query, cb) {
	    var renderer = Retina.RendererInstances.listgenerator[this.$element[0].id.substr(28)];
	    if (renderer.runningQuery) {
		renderer.runningQuery.abort();
	    }
	    renderer.runningQuery = jQuery.ajax({
		url: renderer.settings.api.url+query+renderer.settings.api.url_suffix,
		method: 'GET',
		cb: cb,
		rend: renderer,
		success: function (result) {
		    var res = [];
		    var mapping = {};
		    for (var i=0; i<result.data.length; i++) {
			res.push(result.data[i][this.rend.settings.api.textfield]);
			mapping[result.data[i][this.rend.settings.api.textfield]] = result.data[i][this.rend.settings.api.idfield];
		    }
		    window['listgenerator_mapping_'+this.rend.index] = mapping;
		    this.rend.runningQuery = null;
		    this.cb(res);
		}
	    });
	    
	    return false;
	},
	updatetext: function (item) {
	    var renderer = Retina.RendererInstances.listgenerator[this.$element[0].id.substr(28)];

	    var o = document.createElement('option');
	    o.value = window['listgenerator_mapping_'+renderer.index][item];
	    o.innerHTML = item;
	    document.getElementById('renderer_listgenerator_list'+renderer.index).appendChild(o);
	    
	    return '';
	},
	deleteList: function () {
	    var renderer = this;
	    var list = document.getElementById('renderer_listgenerator_list'+renderer.index);
	    list.innerHTML = '';
	},
	deleteItem: function () {
	    var renderer = this;
	    var list = document.getElementById('renderer_listgenerator_list'+renderer.index);
	    list.removeChild(list.options[list.selectedIndex]);
	},
	sendList: function () {
	    var renderer = this;
	    var list = document.getElementById('renderer_listgenerator_list'+renderer.index);
	    var result = [];
	    for (var i=0; i<list.options.length; i++) {
		var o = list.options[i];
		result.push({ "text": o.innerHTML, "value": o.value });
	    }
	    renderer.settings.callback.call(renderer, result, document.getElementById('renderer_listgenerator_title'+renderer.index).value);
	},
	moveUp: function () {
	    var renderer = this;
	    var list = document.getElementById('renderer_listgenerator_list'+renderer.index);
	    if (list.selectedIndex > 0) {
		var a = list.options[list.selectedIndex - 1];
		var b = list.options[list.selectedIndex];
		var val = a.value;
		var text = a.innerHTML;
		a.value = b.value;
		a.innerHTML = b.innerHTML;
		b.value = val;
		b.innerHTML = text;
		list.selectedIndex--;
	    }
	},
	moveDown: function () {
	    var renderer = this;
	    var list = document.getElementById('renderer_listgenerator_list'+renderer.index);
	    if (list.selectedIndex < list.options.length - 1) {
		var a = list.options[list.selectedIndex + 1];
		var b = list.options[list.selectedIndex];
		var val = a.value;
		var text = a.innerHTML;
		a.value = b.value;
		a.innerHTML = b.innerHTML;
		b.value = val;
		b.innerHTML = text;
		list.selectedIndex++;
	    }
	}
    });
 }).call(this);

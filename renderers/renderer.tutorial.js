(function () {
    var schema = {};
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "listselect",
	    title: "List Select",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		'rows': 10,
		'filter': [],
		'enable_filter': true,
		'filter_value': '',
		'filter_type': 'substring',
		'filter_attribute': null,
		'selection': {},
		'data': {},
		'filtered_data': [] },
	},
	exampleData: function () {
	    return { };
        },
	render: function (options) {

	    // get the target div
	    var target = options.target;
	    target.setAttribute('style', 'background-image: linear-gradient(to bottom, #FAFAFA, #F2F2F2); background-repeat: repeat-x; border: 1px solid #D4D4D4; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067); padding-left: 10px; padding-top: 10px; width: 600px;');
	    target.innerHTML = "";

	    // initialize filter attribute
	    if (options.filter_attribute == null) {
		options.filter_attribute = options.filter[0];
	    }

	    // get the selection list
	    var selection_list = document.createElement('select');
	    selection_list.setAttribute('multiple', '');
	    selection_list.setAttribute('size', options.rows);
	    renderer.redrawSelection(selection_list);

	    // create a filter box
	    var filter = document.createElement('div');
	    var filter_grp = document.createElement('div');
	    filter_grp.setAttribute('class', 'btn-group');
	    var filter_input = document.createElement('input');
	    filter_input.setAttribute('type', 'text');
	    filter_input.setAttribute('class', 'span2');
	    filter_input.setAttribute('style', 'float: left;');
	    filter_input.setAttribute('placeholder', 'Enter filter');
	    filter_input.setAttribute('value', options.filter_value);
	    filter_input.addEventListener('keyup', function () {
		renderer.settings.filter_value = filter_input.value;
		renderer.redrawSelection(selection_list);
	    });
	    var filter_select = document.createElement('button');
	    filter_select.setAttribute('class', 'btn dropdown-toggle');
	    filter_select.setAttribute('style', 'width: 80px; text-align: right;');
	    filter_select.setAttribute('data-toggle', 'dropdown');
	    filter_select.innerHTML = options.filter[0]+' <span class="caret"></span>';
	    var filter_list = document.createElement('ul');
	    filter_list.setAttribute('class', 'dropdown-menu');
	    filter_list.setAttribute('style', 'left: 58px;');
	    var filter_string = '';
	    for (i=0; i<options.filter.length; i++) {
		filter_string += '<li><a onclick="this.parentNode.parentNode.previousSibling.firstChild.textContent=this.innerHTML;Retina.RendererInstances[\'listselect\']['+renderer.index+'].settings.filter_attribute=this.innerHTML.slice(0, -1);" style="cursor: pointer;">'+options.filter[i]+' </a></li>';
	    }
	    filter_list.innerHTML = filter_string;
	    filter_grp.appendChild(filter_input);
	    filter_grp.appendChild(filter_select);
	    filter_grp.appendChild(filter_list);
	    filter.appendChild(filter_grp);
	
	    // create the result list
	    var result_list = document.createElement('select');
	    result_list.setAttribute('multiple', '');
	    result_list.setAttribute('size', options.rows);
	    renderer.redrawResultlist(result_list);
	    
	    // create the action buttons
	    var button_span = document.createElement('span');
	    var button_left = document.createElement('a');
	    button_left.setAttribute('class', 'btn btn-small');
	    button_left.setAttribute('style', 'position: relative; left: 34px; top: 40px;');
	    button_left.innerHTML = '<i class="icon-chevron-left"></i>';
	    button_left.addEventListener('click', function () {
		for (x=0; x<result_list.options.length; x++) {
		    if (result_list.options[x].selected) {
			delete renderer.settings.selection[result_list.options[x].value];			
		    }
		}
		renderer.redrawResultlist(result_list);
		renderer.redrawSelection(selection_list);
	    });
	    var button_right = document.createElement('a');
	    button_right.setAttribute('class', 'btn btn-small');
	    button_right.setAttribute('style', 'position: relative; right: 34px; bottom: 40px;');
	    button_right.innerHTML = '<i class="icon-chevron-right"></i>';
	    button_right.addEventListener('click', function () {
		for (x=0; x<selection_list.options.length; x++) {
		    if (selection_list.options[x].selected) {
			renderer.settings.selection[selection_list.options[x].value] = 1;
		    }
		}
		renderer.redrawResultlist(result_list);
		renderer.redrawSelection(selection_list);
	    });
	    var button_x = document.createElement('a');
	    button_x.setAttribute('class', 'btn btn-small');
	    button_x.innerHTML = '<i class="icon-remove"></i>';
	    button_x.addEventListener('click', function () {
		renderer.settings.selection = {};
		renderer.redrawResultlist(result_list);
		renderer.redrawSelection(selection_list);
	    });
	    button_span.appendChild(button_left);
	    button_span.appendChild(button_x);
	    button_span.appendChild(button_right);

	    // create the submit button
	    var submit_button = document.createElement('a');
	    submit_button.setAttribute('class', 'btn btn-small btn-success');
	    submit_button.setAttribute('style', 'margin-left: 15px;');
	    submit_button.innerHTML = '<i class="icon-ok icon-white"></i>';
	    if (typeof(options.callback) == 'function') {
		submit_button.addEventListener('click', function () {
		    var selection_result = [];
		    for (x=0; x<result_list.options.length; x++) {
			selection_result.push(result_list.options[x].value);			
		    }
		    options.callback(selection_result);
		});
	    }

	    // build the output
	    target.appendChild(filter);
	    target.appendChild(document.createElement('br'));
	    target.appendChild(selection_list);
	    target.appendChild(button_span);
	    target.appendChild(result_list);
	    target.appendChild(submit_button);
	},
	redrawResultlist: function (result_list) {
	    var result_list_string = "";
	    for (i in renderer.settings.selection) {
		if (renderer.settings.selection.hasOwnProperty(i)) {
		    result_list_string += '<option value="'+renderer.settings.data[i][renderer.settings.value]+'">'+renderer.settings.data[i][renderer.settings.label]+'</option>';
		}
	    }
	    result_list.innerHTML = result_list_string;
	},
	redrawSelection: function (selection_list) {
	    // filter the list
	    renderer.settings.filtered_data = renderer.filter({ data: renderer.settings.data, value: renderer.settings.filter_value, type: renderer.settings.filter_type, attribute: renderer.settings.filter_attribute })
	    renderer.settings.filter_updated = false;
	    
	    // sort the list
	    renderer.settings.filtered_data.sort(renderer.objectsort);
	    
	    // create the selection list
	    var options_string = "";
	    for (i=0; i<renderer.settings.filtered_data.length; i++) {
		options_string += '<option value="'+renderer.settings.filtered_data[i][renderer.settings.value]+'">'+renderer.settings.filtered_data[i][renderer.settings.label]+'</option>';
	    }
	    selection_list.innerHTML = options_string;
	    
	    return;
	},
	filter: function(options) {
	    var results = [];
	    if (options.value == '') {
		for (x in options.data) {
		    if (options.data.hasOwnProperty(x)) {
			if (typeof(renderer.settings.selection[x]) == 'undefined') {
			    results.push(options.data[x]);
			}
		    }
		}
		return results;
	    }
	    for (x in options.data) {
		if (options.data.hasOwnProperty(x)) {
		    if (typeof(renderer.settings.selection[x]) == 'undefined') {
			if (options.data[x].hasOwnProperty(options.attribute) && typeof(options.data[x][options.attribute]) == 'string') {
			    if (options.type == 'substring') {
				if (options.data[x][options.attribute].toLowerCase().indexOf(options.value.toLowerCase()) > -1) {
				    results.push(options.data[x]);
				}
			    } else if (options.type == 'complete') {
				if (options.data[x][options.attribute] == options.value) {
				    results.push(options.data[x]);
				}
			    }
			}
		    }
		}
	    }
	    return results;
	},
	objectsort: function(a, b) {
	    if (a[renderer.settings.label] > b[renderer.settings.label]) {
		return 1;
	    } else if (b[renderer.settings.label] > a[renderer.settings.label]) {
		return -1;
	    } else {
		return 0;
	    }
	}
    });
}).call(this);

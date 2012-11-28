/* 
   Listselect Renderer

   Provides a select list that allows the selection of one or multiple data items that can be filtered by their attributes. The attribute to be filtered will be displayed as the label in the selection list. Filters can be chained by pressing the enter key in the filter box.

   Options:

   target (HTML Container Element)
      Element to render in.

   data (HASH of IDs pointing to objects)
      The data to display.

   multiple (BOOLEAN)
      If set to false, displays a single select vs a multi select. Default is true.

   rows (INT)
      The number of rows to display in the select list. Default is 10.

   filter (ARRAY of STRING)
      An ordered list of attribute names that are attributes of the objects passed in data that the selection list may be filtered by

   filter_value (STRING)
      Initial value of the filter. Default is an empty string.

   filter_attribute (STRING)
      Initial attribute to be displayed and filtered by. Default is the first element in the filter list.

   value (STRING)
      The attribute of the data objects to be used as the value of the select options.

   callback (FUNCTION)
      The function to be called when the submit button is pressed. This function will pass the values of the selected option(s).

   selection (HASH of STRING)
      Hash of values pointing to 1. The inital selection in the result box. The values must be attribute values of the data object attribute selected as the value attribute of the selection list.

*/
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
		'filter_value': '',
		'filter_type': 'substring',
		'filter_attribute': null,
		'filtered_data': [],
		'filter_breadcrumbs': [],
		'selection': {},
		'data': {},
		'multiple': true },
	},
	exampleData: function () {
	    return { };
        },
	render: function (options) {

	    // get the target div
	    var target = options.target;
	    var tstyle = 'background-image: linear-gradient(to bottom, #FAFAFA, #F2F2F2); background-repeat: repeat-x; border: 1px solid #D4D4D4; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067); padding-left: 10px; padding-top: 10px; width: ';
	    if (options.multiple) {
		tstyle += '600px;';
	    } else {
		tstyle += '286px;';
	    }
	    target.setAttribute('style', tstyle);
	    target.innerHTML = "";

	    // initialize filter attribute
	    if (options.filter_attribute == null) {
		options.filter_attribute = options.filter[0];
	    }

	    // get the selection list
	    var selection_list = document.createElement('select');
	    if (options.multiple) {
		selection_list.setAttribute('multiple', '');
	    }
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
	    filter_input.addEventListener('keyup', function (event) {
		if (event.keyCode == 13) {
		    renderer.addBreadcrumb();
		}
		renderer.settings.filter_value = filter_input.value;
		renderer.redrawSelection(selection_list);
	    });
	    var filter_select = document.createElement('button');
	    filter_select.setAttribute('class', 'btn dropdown-toggle');
	    filter_select.setAttribute('style', 'width: 80px; text-align: right;');
	    filter_select.setAttribute('data-toggle', 'dropdown');
	    filter_select.innerHTML = options.filter_attribute + ' <span class="caret"></span>';
	    var filter_list = document.createElement('ul');
	    filter_list.setAttribute('class', 'dropdown-menu');
	    filter_list.setAttribute('style', 'left: 58px;');
	    var filter_string = '';
	    for (i=0; i<options.filter.length; i++) {
		filter_string += '<li><a onclick="Retina.RendererInstances[\'listselect\']['+renderer.index+'].settings.filter_value=\'\';Retina.RendererInstances[\'listselect\']['+renderer.index+'].render({filter_attribute: this.innerHTML.slice(0, -1)});" style="cursor: pointer;">'+options.filter[i]+' </a></li>';
	    }
	    filter_list.innerHTML = filter_string;
	    filter_grp.appendChild(filter_input);
	    filter_grp.appendChild(filter_select);
	    filter_grp.appendChild(filter_list);
	    filter.appendChild(filter_grp);

	    // create the filter breadcrumbs
	    var filter_breadcrumbs = document.createElement('div');
	    filter_breadcrumbs.setAttribute('style', 'font-size: 9px; position: relative; top: -5px;');
	    for (i=0;i<options.filter_breadcrumbs.length;i++) {
		var bc_button = document.createElement('button');
		bc_button.setAttribute('class', "btn btn-mini");
		bc_button.setAttribute('style', "margin-right: 3px;");
		bc_button.setAttribute('title', "remove filter");
		bc_button.setAttribute('name', i);
		bc_button.innerHTML = options.filter_breadcrumbs[i][0]+": "+options.filter_breadcrumbs[i][1]+' <span style="font-size: 11px; color: gray;">x</span>';
		bc_button.addEventListener('click', function (event) {
		    renderer.removeBreadcrumb(this);
		});
		filter_breadcrumbs.appendChild(bc_button);
	    }

	    // check for multi-select vs single select
	    if (options.multiple) {
	    
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
	    }

	    // create the submit button
	    var submit_button = document.createElement('a');
	    submit_button.setAttribute('class', 'btn btn-small btn-success');
	    submit_button.setAttribute('style', 'margin-left: 15px;');
	    submit_button.innerHTML = '<i class="icon-ok icon-white"></i>';
	    if (typeof(options.callback) == 'function') {
		if (options.multiple) {
		    submit_button.addEventListener('click', function () {
			var selection_result = [];
			for (x=0; x<result_list.options.length; x++) {
			    selection_result.push(result_list.options[x].value);			
			}
			options.callback(selection_result);
		    });
		} else {
		    submit_button.addEventListener('click', function () {
			options.callback(selection_list.options[selection_list.selectedIndex].value);
		    });
		}
	    }

	    // build the output
	    target.appendChild(filter);
	    target.appendChild(filter_breadcrumbs);
	    target.appendChild(selection_list);
	    if (options.multiple) {
		target.appendChild(button_span);
		target.appendChild(result_list);
	    }
	    target.appendChild(submit_button);
	},
	addBreadcrumb: function () {
	    if (renderer.settings.filter_value != "") {
		renderer.settings.filter_breadcrumbs.push([renderer.settings.filter_attribute, renderer.settings.filter_value]);
		renderer.settings.filter_value = "";
		renderer.settings.filter_attribute = null;
		renderer.render();
	    }
	},
	removeBreadcrumb: function (button) {
	    renderer.settings.filter_breadcrumbs.splice(button.name, 1);
	    renderer.settings.filter_value = '';
	    renderer.render();
	},
	redrawResultlist: function (result_list) {
	    var result_list_string = "";
	    for (i in renderer.settings.selection) {
		if (renderer.settings.selection.hasOwnProperty(i)) {
		    var popid = 'sl'+i;
		    result_list_string += '<option value="'+renderer.settings.data[i][renderer.settings.value]+'" title="'+renderer.settings.data[i][renderer.settings.filter_attribute]+'">'+renderer.settings.data[i][renderer.settings.filter_attribute]+'</option>';
		}
	    }
	    result_list.innerHTML = result_list_string;
	},
	redrawSelection: function (selection_list) {
	    // initialize the filter
	    renderer.settings.filtered_data = renderer.object_to_list();

	    // apply all filter breadcrumbs
	    for (i=0; i<renderer.settings.filter_breadcrumbs.length; i++) {
		renderer.settings.filtered_data = renderer.filter({ data: renderer.settings.filtered_data, value: renderer.settings.filter_breadcrumbs[i][1], type: renderer.settings.filter_type, attribute: renderer.settings.filter_breadcrumbs[i][0] });
	    }

	    // filter the list with the current filter
	    renderer.settings.filtered_data = renderer.filter({ data: renderer.settings.filtered_data, value: renderer.settings.filter_value, type: renderer.settings.filter_type, attribute: renderer.settings.filter_attribute });

	    // sort the list
	    renderer.settings.filtered_data.sort(renderer.objectsort);
	    
	    // create the selection list
	    var options_string = "";
	    for (i=0; i<renderer.settings.filtered_data.length; i++) {
		options_string += '<option value="'+renderer.settings.filtered_data[i][renderer.settings.value]+'" title="'+renderer.settings.filtered_data[i][renderer.settings.filter_attribute]+'">'+renderer.settings.filtered_data[i][renderer.settings.filter_attribute]+'</option>';
	    }
	    selection_list.innerHTML = options_string;
	    
	    return;
	},
	object_to_list: function () {
	    var results = [];
	    for (x in renderer.settings.data) {
		if (renderer.settings.data.hasOwnProperty(x)) {
		    if (typeof(renderer.settings.selection[x]) == 'undefined') {
			results.push(renderer.settings.data[x]);
		    }
		}
	    }
	    return results;
	},
	filter: function(options) {
	    var results = [];
	    for (x=0;x<options.data.length;x++) {
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

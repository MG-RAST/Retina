/* 
   Groupselect Renderer

   Provides a select list that allows the selection of one or multiple data items that can be filtered by their attributes. The attribute to be filtered will be displayed as the label in the selection list. Filters can be chained by pressing the enter key in the filter box. The resulting lists can be named and stored in a group list.

   Options:

   target (HTML Container Element)
      Element to render in.

   data (ARRAY of objects)
      The data to display.

   rows (INT)
      The number of rows to display in the select list. Default is 10.

   sort (BOOLEAN)
      Setting this to true will automatically sort the lists by the currently selected filter. Default is false.

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

   groups (HASH of ARRAY of STRING)
      Hash of group names pointing to an array of data item ids.

   synchronous (BOOLEAN)
      This is true by default. If set to false, the listselect expects its data to be set, filtered and browsed externally. It will issue a callback to the navigation callback function on any of those events, expecting an external data update.

   navigation_callback (FUNCTION)
      The function to be called when a navigation / filter action is issued and the listselect is in asynchronous state (synchronous set to false). It will be passed either a string ("more", "reset") or an object that can contain one of the following structures:
        query: [ { searchword: $filter_value, field: $column_name_to_search, comparison: $comparison_operator }, ... ]
        limit: $number_of_rows_per_page

   asynch_limit (INTEGER)
      The number of items initially loaded in asynchronous mode, default is 100.

   asynch_filter_min_length (INTEGER)
      The number of characters that need to be entered into the filter before the filter callback is performed. Default is 3.
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "groupselect",
	    title: "Group Select",
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
		'selection_data': [],
		'filter_breadcrumbs': [],
		'selection': {},
		'data': [],
		'target': null,
		'sort': false,
		'synchronous': true,
		'navigation_callback': null,
		'navigation_url': null,
		'asynch_limit': 100,
		'asynch_filter_min_length': 3,
		'groups': {},
		'current_group': null,
		'new_group_name': null,
		'style': "" }
	},
	exampleData: function () {
	    return { };
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    if (renderer.settings.navigation_url) {
		renderer.settings.navigation_callback = renderer.update_data;
	    }

	    // get the target div
	    var target = renderer.settings.target;
	    var tstyle = 'background-image: linear-gradient(to bottom, #FAFAFA, #F2F2F2); background-repeat: repeat-x; border: 1px solid #D4D4D4; border-radius: 4px 4px 4px 4px; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067); padding-left: 10px; padding-top: 10px; width: ';
	    tstyle += renderer.settings.extra_wide ? '1187px;' : '887px;';
	    target.setAttribute('style', tstyle+renderer.settings.style);
	    target.innerHTML = "";

	    // initialize filter attribute
	    if (renderer.settings.filter_attribute == null) {
		renderer.settings.filter_attribute = renderer.settings.filter[0];
	    }

	    // get the selection list
	    var selection_list = document.createElement('select');
	    if (typeof renderer.settings.navigation_callback == "function") {
		selection_list.addEventListener('scroll', function(event) {
		    event = event || window.event;
		    if (event.target.scrollTop == event.target.scrollTopMax) {
			Retina.RendererInstances.groupselect[index].settings.scroll_position = event.target.scrollTop;
			Retina.RendererInstances.groupselect[index].settings.navigation_callback("more", index);
		    }
		});
	    }
	    if (renderer.settings.extra_wide) {
		selection_list.setAttribute('style', 'width: 415px');
	    }
	    selection_list.setAttribute('multiple', '');
	    selection_list.setAttribute('size', renderer.settings.rows);
	    renderer.selection_list = selection_list;
	    renderer.redrawSelection(index);

	    // create a filter box
	    var filter = document.createElement('div');
	    var filter_grp = document.createElement('div');
	    filter_grp.setAttribute('class', 'btn-group');
	    var filter_input = document.createElement('input');
	    filter_input.setAttribute('type', 'text');
	    filter_input.setAttribute('class', renderer.settings.extra_wide ? 'span3' : 'span2');
	    filter_input.setAttribute('style', 'float: left;');
	    filter_input.setAttribute('placeholder', 'enter filter');
	    filter_input.setAttribute('value', renderer.settings.filter_value);
	    filter_input.addEventListener('keyup', function (event) {
		if (event.keyCode == 13) {
		    Retina.RendererInstances.groupselect[index].addBreadcrumb(index);
		    return;
		}
		Retina.RendererInstances.groupselect[index].settings.filter_value = filter_input.value;
		if (Retina.RendererInstances.groupselect[index].settings.synchronous) {
		    Retina.RendererInstances.groupselect[index].redrawSelection(index);
		} else {
		    if (filter_input.value.length >= Retina.RendererInstances.groupselect[index].settings.asynch_filter_min_length) {
			Retina.RendererInstances.groupselect[index].update(index);
		    }
		}
	    });
	    var filter_select = document.createElement('button');
	    filter_select.setAttribute('class', 'btn dropdown-toggle');
	    filter_select.setAttribute('style', (renderer.settings.extra_wide ? 'width: 195px;' : 'width: 85px;') + ' text-align: right;');
	    filter_select.setAttribute('data-toggle', 'dropdown');
	    filter_select.innerHTML = renderer.settings.filter_attribute + ' <span class="caret"></span>';
	    var filter_list = document.createElement('ul');
	    filter_list.setAttribute('class', 'dropdown-menu');
	    filter_list.setAttribute('style', renderer.settings.extra_wide ? 'left: 252px; max-height: 200px; overflow: auto;' : 'left: 58px; max-height: 200px; overflow: auto;');
	    var filter_string = '';
	    for (i=0; i<renderer.settings.filter.length; i++) {
		filter_string += '<li><a onclick="Retina.RendererInstances[\'groupselect\']['+renderer.index+'].settings.filter_value=\'\';Retina.RendererInstances[\'groupselect\']['+renderer.index+'].settings.filter_attribute=this.innerHTML.slice(0, -1);Retina.RendererInstances[\'groupselect\']['+renderer.index+'].render();" style="cursor: pointer;">'+renderer.settings.filter[i]+' </a></li>';
	    }
	    filter_list.innerHTML = filter_string;
	    filter_grp.appendChild(filter_input);
	    filter_grp.appendChild(filter_select);
	    filter_grp.appendChild(filter_list);
	    
	    // group name input
	    var gname = document.createElement('input');
	    gname.setAttribute('type', 'text');
	    gname.setAttribute('style', 'margin-left: 103px;');
	    gname.setAttribute('title', 'enter group name');
	    gname.setAttribute('placeholder', 'enter group name');
	    gname.addEventListener('change', function() {
		Retina.RendererInstances.groupselect[index].settings.new_group_name = this.value;
	    });
	    renderer.groupname_field = gname;

	    // title for the group list
	    var glist_title = document.createElement('span');
	    glist_title.innerHTML = "groups";
	    glist_title.setAttribute('style', "margin-left: 110px; font-size: 20px; font-weight: bold; color: #333333;");

	    filter.appendChild(filter_grp);
	    filter.appendChild(gname);
	    filter.appendChild(glist_title);

	    // create the filter breadcrumbs
	    var filter_breadcrumbs = document.createElement('div');
	    filter_breadcrumbs.setAttribute('style', 'font-size: 9px; position: relative; top: -5px;');
	    for (i=0;i<renderer.settings.filter_breadcrumbs.length;i++) {
		var bc_button = document.createElement('button');
		bc_button.setAttribute('class', "btn btn-mini");
		bc_button.setAttribute('style', "margin-right: 3px;");
		bc_button.setAttribute('title', "remove filter");
		bc_button.setAttribute('name', i);
		bc_button.innerHTML = renderer.settings.filter_breadcrumbs[i][0]+": "+renderer.settings.filter_breadcrumbs[i][1]+' <span style="font-size: 11px; color: gray;">x</span>';
		bc_button.addEventListener('click', function (event) {
		    Retina.RendererInstances.groupselect[index].removeBreadcrumb(this, index);
		});
		filter_breadcrumbs.appendChild(bc_button);
	    }

	    // create the result list
	    var result_list = document.createElement('select');
	    result_list.setAttribute('multiple', '');
	    result_list.setAttribute('size', renderer.settings.rows);
	    renderer.result_list = result_list;
	    renderer.redrawResultlist(index);
	    
	    // create the action buttons
	    var button_span = document.createElement('span');
	    var button_left = document.createElement('a');
	    button_left.setAttribute('class', 'btn btn-small');
	    button_left.setAttribute('style', 'position: relative; left: 36px; top: 40px;');
	    button_left.innerHTML = '<i class="icon-chevron-left"></i>';
	    button_left.setAttribute('title', 'remove');
	    button_left.addEventListener('click', function () {
		for (x=0; x<result_list.options.length; x++) {
		    if (result_list.options[x].selected) {
			for (y=0;y<Retina.RendererInstances.groupselect[index].settings.selection_data.length;y++) {
			    if (Retina.RendererInstances.groupselect[index].settings.selection_data[y][Retina.RendererInstances.groupselect[index].settings.value] == result_list.options[x].value) {
				Retina.RendererInstances.groupselect[index].settings.selection_data.splice(y,1);
				break;
			    }
			}
			
			delete Retina.RendererInstances.groupselect[index].settings.selection[result_list.options[x].value];			
		    }
		}
		Retina.RendererInstances.groupselect[index].redrawResultlist(index);
		Retina.RendererInstances.groupselect[index].redrawSelection(index);
	    });
	    var button_right = document.createElement('a');
	    button_right.setAttribute('class', 'btn btn-small');
	    button_right.setAttribute('style', 'position: relative; right: 36px; bottom: 40px;');
	    button_right.innerHTML = '<i class="icon-chevron-right"></i>';
	    button_right.setAttribute('title', 'add');
	    button_right.addEventListener('click', function () {
		for (x=0; x<selection_list.options.length; x++) {
		    if (selection_list.options[x].selected) {
			Retina.RendererInstances.groupselect[index].settings.selection[selection_list.options[x].value] = 1;
			for (y=0;y<Retina.RendererInstances.groupselect[index].settings.data.length;y++) {
			    if (Retina.RendererInstances.groupselect[index].settings.data[y][Retina.RendererInstances.groupselect[index].settings.value] == selection_list.options[x].value) {
				Retina.RendererInstances.groupselect[index].settings.selection_data.push(Retina.RendererInstances.groupselect[index].settings.data[y]);
				break;
			    }
			}
		    }
		}
		Retina.RendererInstances.groupselect[index].redrawResultlist(index);
		Retina.RendererInstances.groupselect[index].redrawSelection(index);
	    });
	    var button_x = document.createElement('a');
	    button_x.setAttribute('class', 'btn btn-small');
	    button_x.innerHTML = '<i class="icon-remove"></i>';
	    button_x.setAttribute('title', 'clear selection');
	    button_x.addEventListener('click', function () {
		Retina.RendererInstances.groupselect[index].settings.selection = {};
		Retina.RendererInstances.groupselect[index].settings.selection_data = [];
		Retina.RendererInstances.groupselect[index].groupname_field.value = "";
		Retina.RendererInstances.groupselect[index].redrawResultlist(index);
		Retina.RendererInstances.groupselect[index].redrawSelection(index);
	    });
	    button_span.appendChild(button_left);
	    button_span.appendChild(button_x);
	    button_span.appendChild(button_right);
	    
	    // create the submit button
	    var submit_button = document.createElement('a');
	    submit_button.setAttribute('class', 'btn btn-small btn-success');
	    submit_button.setAttribute('style', 'position: relative; bottom: 40px;');
	    submit_button.innerHTML = '<i class="icon-ok icon-white"></i>';
	    submit_button.setAttribute('title', 'create group');
	    if (typeof(renderer.settings.callback) == 'function') {
	        var index = renderer.index;
		submit_button.addEventListener('click', function () {
		    Retina.RendererInstances.groupselect[index].add_group(index);
		});
            }

	    // create the group display
	    var glist = document.createElement('select');
	    glist.setAttribute('multiple', 'multiple');
	    glist.setAttribute('size', renderer.settings.rows);
	    renderer.grouplist = glist;
	    renderer.redrawGroups(index);
	    glist.addEventListener('click', function() {
		Retina.RendererInstances.groupselect[index].show_group(index, this.options[this.selectedIndex].value);
	    });

	    var update_group_button = document.createElement('button');
	    update_group_button.setAttribute('class', 'btn btn-small btn-primary');
	    update_group_button.innerHTML = '<i class="icon-refresh icon-white"></i>';
	    update_group_button.setAttribute('style', "position: relative; left: 36px;");
	    update_group_button.setAttribute('title', 'update group');
	    update_group_button.addEventListener('click', function () {
		Retina.RendererInstances.groupselect[index].update_group(index);
	    });

	    var del_group_button = document.createElement('button');
	    del_group_button.setAttribute('class', 'btn btn-small btn-danger');
	    del_group_button.setAttribute('title', 'delete group');
	    del_group_button.innerHTML = '<i class="icon-remove icon-white"></i>';
	    del_group_button.setAttribute('style', "position: relative; top: 40px; right: 36px;");
	    del_group_button.addEventListener('click', function () {
		Retina.RendererInstances.groupselect[index].delete_group(index);
	    });
	    
	    // build the output
	    target.appendChild(filter);
	    target.appendChild(filter_breadcrumbs);
	    target.appendChild(selection_list);
	    selection_list.scrollTop = Retina.RendererInstances.groupselect[index].settings.scroll_position || 0;
	    target.appendChild(button_span);
	    target.appendChild(result_list);
	    target.appendChild(update_group_button);
	    target.appendChild(submit_button);
	    target.appendChild(del_group_button);
	    target.appendChild(glist);
	    filter_input.focus();
	    filter_input.selectionStart = filter_input.value.length;
	    filter_input.selectionEnd = filter_input.value.length;
	},
	// add a breadcrumb to the list
	addBreadcrumb: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    if (renderer.settings.filter_value != "") {
		renderer.settings.filter_breadcrumbs.push([renderer.settings.filter_attribute, renderer.settings.filter_value]);
		renderer.settings.filter_value = "";
		if (renderer.settings.synchronous) {
		    renderer.render();
		} else {
		    renderer.update(index);
		}
	    }
	},
	// remove a breadcrumb from the list
	removeBreadcrumb: function (button, index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    renderer.settings.filter_breadcrumbs.splice(button.name, 1);
	    renderer.settings.filter_value = '';
	    if (renderer.settings.synchronous) {
		renderer.render();
	    } else {
		renderer.update(index);
	    }
	},
	// redraw the result list (right)
	redrawResultlist: function (index) {  
	    renderer = Retina.RendererInstances.groupselect[index];
	    result_list = renderer.result_list;
	    var result_list_array = [];
	    for (i=0; i<renderer.settings.selection_data.length; i++) {
		result_list_array.push( [ renderer.settings.selection_data[i][renderer.settings.value], '<option value="'+renderer.settings.selection_data[i][renderer.settings.value]+'" title="'+renderer.settings.selection_data[i][renderer.settings.filter_attribute]+'">'+renderer.settings.selection_data[i][renderer.settings.filter_attribute]+'</option>'] );
	    }
	    if (renderer.settings.sort) {
		result_list_array.sort(renderer.listsort);
	    }
	    var result_list_string = "";
	    for (i=0; i<result_list_array.length; i++) {
		result_list_string += result_list_array[i][1];
	    }
	    result_list.innerHTML = result_list_string;
	},
	// redraw the selection list (left)
	redrawSelection: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    selection_list = renderer.selection_list;

	    // initialize the filter
	    renderer.settings.filtered_data = renderer.settings.data;

	    // apply all filter breadcrumbs
	    for (i=0; i<renderer.settings.filter_breadcrumbs.length; i++) {
		renderer.settings.filtered_data = renderer.filter({ data: renderer.settings.filtered_data, value: renderer.settings.filter_breadcrumbs[i][1], type: renderer.settings.filter_type, attribute: renderer.settings.filter_breadcrumbs[i][0] }, index);
	    }
	    
	    // filter the list with the current filter
	    renderer.settings.filtered_data = renderer.filter({ data: renderer.settings.filtered_data, value: renderer.settings.filter_value, type: renderer.settings.filter_type, attribute: renderer.settings.filter_attribute }, index);
	    
	    // sort the list
	    if (renderer.settings.sort) {
		renderer.settings.filtered_data.sort(renderer.objectsort);
	    }
	    
	    // create the selection list
	    var settings_string = "";
	    for (i=0; i<renderer.settings.filtered_data.length; i++) {
		if (! renderer.settings.selection[renderer.settings.filtered_data[i][renderer.settings.value]]) {
		    settings_string += '<option value="'+renderer.settings.filtered_data[i][renderer.settings.value]+'" title="'+renderer.settings.filtered_data[i][renderer.settings.filter_attribute]+'">'+renderer.settings.filtered_data[i][renderer.settings.filter_attribute]+'</option>';
		}
	    }
	    selection_list.innerHTML = settings_string;

	    return;
	},

	update: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    var query = [];
	    for (i=0; i<renderer.settings.filter_breadcrumbs.length; i++) {
		query.push( { "field": renderer.settings.filter_breadcrumbs[i][0],
			      "searchword": renderer.settings.filter_breadcrumbs[i][1] } );
	    }
	    if (renderer.settings.filter_value.length) {
		query.push( { "field": renderer.settings.filter_attribute,
			      "searchword": renderer.settings.filter_value } );
	    }
	    renderer.settings.navigation_callback( { "clear": true, "query": query }, index );
	},

	add_group: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    renderer.settings.current_group = renderer.settings.new_group_name;
	    renderer.settings.groups[renderer.settings.new_group_name] = [];
	    for (var i=0;i<renderer.settings.selection_data.length;i++) {
		renderer.settings.groups[renderer.settings.new_group_name].push(renderer.settings.selection_data[i][renderer.settings.value]);
	    }
	    renderer.settings.selection = {};
	    renderer.settings.selection_data = [];
	    renderer.groupname_field.value = "";
	    renderer.settings.current_group = null;
	    renderer.redrawSelection(index);
	    renderer.redrawResultlist(index);
	    renderer.redrawGroups(index);
	    if (typeof renderer.settings.callback == 'function') {
		renderer.settings.callback(renderer.settings.groups);
	    }
	},

	delete_group: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    if (renderer.settings.current_group) {
		if (confirm('really delete group '+renderer.settings.current_group+'?')) {
		    renderer.settings.selection = {};
		    delete renderer.settings.groups[renderer.settings.current_group];
		    renderer.settings.selection_data = [];
		    renderer.groupname_field.value = "";
		    renderer.settings.current_group = null;
		    renderer.redrawSelection(index);
		    renderer.redrawResultlist(index);
		    renderer.redrawGroups(index);
		    if (typeof renderer.settings.callback == 'function') {
			renderer.settings.callback(renderer.settings.groups);
		    }
		}
	    };
	},

	redrawGroups: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    renderer.grouplist.options.length = 0;
	    var sgroups = [];
	    for (var i in renderer.settings.groups) {
		if (renderer.settings.groups.hasOwnProperty(i)) {
		    sgroups.push(i);
		}
	    }
	    sgroups = sgroups.sort();
	    var sopts = "";
	    for (var i=0;i<sgroups.length;i++) {
		sopts += "<option>"+sgroups[i]+"</option>";
	    }
	    renderer.grouplist.innerHTML = sopts;
	},

	update_group: function (index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    if (renderer.settings.current_group) {
		delete renderer.settings.groups[renderer.settings.current_group];
		renderer.settings.current_group = renderer.settings.new_group_name;
		renderer.settings.groups[renderer.settings.new_group_name] = [];
		for (var i=0;i<renderer.settings.selection_data.length;i++) {
		    renderer.settings.groups[renderer.settings.new_group_name].push(renderer.settings.selection_data[i][renderer.settings.value]);
		}
	    }
	    renderer.redrawGroups(index);
	    if (typeof renderer.settings.callback == 'function') {
		renderer.settings.callback(renderer.settings.groups);
	    }
	},

	show_group: function (index, group) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    renderer.settings.selection = {};
	    renderer.settings.selection_data = [];
	    renderer.groupname_field.value = group;
	    renderer.settings.current_group = group;
	    for (var i=0;i<renderer.settings.groups[group].length;i++) {
		renderer.settings.selection[renderer.settings.groups[group][i]] = 1;
		for (var h=0;h<renderer.settings.data.length;h++) {
		    if (renderer.settings.data[h][renderer.settings.value] == renderer.settings.groups[group][i]) {
			renderer.settings.selection_data.push(renderer.settings.data[h]);
		    }
		}
	    }
	    renderer.redrawSelection(index);
	    renderer.redrawResultlist(index);
	},

	// filter the data according to all breadcrumbs and the current filter
	filter: function(settings, index) {
	    renderer = Retina.RendererInstances.groupselect[index];
	    var results = [];
	    for (x=0;x<settings.data.length;x++) {
		if (typeof(renderer.settings.selection[x]) == 'undefined') {
		    if (settings.data[x].hasOwnProperty(settings.attribute) && typeof(settings.data[x][settings.attribute]) == 'string') {
			if (settings.type == 'substring') {
			    if (settings.data[x][settings.attribute].toLowerCase().indexOf(settings.value.toLowerCase()) > -1) {
				results.push(settings.data[x]);
			    }
			} else if (settings.type == 'complete') {
			    if (settings.data[x][settings.attribute] == settings.value) {
				results.push(settings.data[x]);
			    }
			}
		    }
		}
	    }
	    return results;
	},
	// sort the list by the label attribute
	objectsort: function(a, b) {
	    if (a[renderer.settings.label] > b[renderer.settings.label]) {
		return 1;
	    } else if (b[renderer.settings.label] > a[renderer.settings.label]) {
		return -1;
	    } else {
		return 0;
	    }
	},
	// sort the list by the first item in the sublist
	listsort: function (a, b) {
	    if (a[0] > b[0]) {
		return 1;
	    } else if (b[0] > a[0]) {
		return -1;
	    } else {
		return 0;
	    }
	},
	update_data: function (params, index) {
	    renderer = Retina.RendererInstances.groupselect[index];

	    if (typeof params == 'string' && params == 'more') {
		renderer.settings.offset = renderer.settings.data.length;
		if (renderer.settings.total_count <= renderer.settings.asynch_limit) {
		    return;
		}
	    } 
	    if (typeof params == 'object') {
	        if (params.sort) {
	            if (params.sort == 'default') {
	                renderer.settings.sort = 'name';
    		        renderer.settings.sortDir = 'asc';
	            } else {
		        renderer.settings.sort = params.sort;
		        renderer.settings.sortDir = params.dir;
	            }
	        }
	        if (params.query) {
		    renderer.settings.offset = 0;
		    if (params.clear) {
		        renderer.settings.query = {};
		    }
	            if (typeof params.query != 'object') {
	                renderer.settings.query = {};
	            } else {
			renderer.settings.query = params.query;
		    }
	        }
	        if (params.goto != null) {
		    renderer.settings.offset = params.goto;
	        }
	        if (params.limit) {
		    renderer.settings.limit = params.limit;
	        }
	    }

	    var query = "";
	    for (var i in renderer.settings.query) {
	        if (renderer.settings.query.hasOwnProperty(i) && renderer.settings.query[i].searchword.length) {
		    query +=  "&" + renderer.settings.query[i].field + '=*' + renderer.settings.query[i].searchword + '*';
	        }
	    }

	    var url = renderer.settings.navigation_url + query + "&limit=" + renderer.settings.asynch_limit + "&offset=" + (renderer.settings.offset || 0) + "&order=" +renderer.settings.asynch_filter_attribute;

	    var headers = stm.Authentication ? {'AUTH': stm.Authentication} : {};
	
	    jQuery.ajax({ url: url, headers: headers, dataType: "json", success: function(data) {
		renderer =  Retina.RendererInstances.groupselect[index];
		renderer.settings.total_count = data.total_count;
		if (typeof params == 'string' && params == "more") {
		    renderer.settings.data = renderer.settings.data.concat(data.data);
		} else {
		    renderer.settings.data = data.data;
		}
		renderer.render();
	    }});
	}
    });
}).call(this);

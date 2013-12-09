(function () {
    widget = Retina.Widget.extend({
        about: {
            title: "template validator",
            name: "template_validator",
            author: "Tobias Paczian",
            requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_renderer({"name": "metadataConverter", "resource": "renderers/",  "filename": "renderer.metadataConverter.js" }),
		 Retina.load_renderer("metadataConverter") ];
    };
    
    widget.template = {};
    widget.template_status = [];
    widget.data = {};
    widget.data_status = [];

    widget.setTemplate = function (template) {
	widget = Retina.WidgetInstances.template_validator[1];

	widget.template = template;
	widget.display_template_entry_mask();
    };
    
    widget.display = function (wparams) {
        widget = this;
	
	widget.target = wparams.target || null;

	widget.converter = Retina.Renderer.create("metadataConverter", {});

	widget.converter.mgrast2template(widget.setTemplate);
	
	return widget;
    };

    widget.activate_subgroup = function (group, subgroup) {
	widget = Retina.WidgetInstances.template_validator[1];

	var nav = document.getElementById(subgroup+'_nav');
	if (! nav) {
	    nav = document.createElement('div');
	    nav.setAttribute('id', subgroup+'_nav');
	    nav.setAttribute('class', "tabbable tabs-right");
	    nav.setAttribute('style', "float: right");
	    nav.innerHTML = '<ul class="nav nav-tabs" style="margin-top: -21px;"><li class="active">'+subgroup+' 1</li><li onclick="alert(\'hello world\');">+</li></ul>';
	    document.getElementById('entry_navs').appendChild(nav);
	}

	var pane = document.getElementById(subgroup);
	if (! pane) {
	    pane = document.createElement('div');
	    pane.setAttribute('id', subgroup);
	}
    };

    widget.display_template_entry_mask = function () {
	widget = Retina.WidgetInstances.template_validator[1];

	widget.target.innerHTML = '<div id="entry_navs"><ul class="nav nav-tabs" id="entry_mask_tabs"></ul></div><div id="entry_masks"><div class="tab-content" id="entry_mask"></div></div>';

	var first = true;
	for (i in widget.template.groups) {
	    if (widget.template.groups.hasOwnProperty(i)) {
		if (widget.template.groups[i].toplevel) {
		    var tab = document.createElement('li');
		    tab.innerHTML = '<a>'+widget.template.groups[i].label+'</a>';
		    document.getElementById('entry_mask_tabs').appendChild(tab);
		    var content = document.createElement('div');
		    content.setAttribute('id', widget.template.groups[i].name);
		    content.setAttribute('class', 'tab-pane');
		    document.getElementById('entry_mask').appendChild(content);
		    if (first) {
			first = false;
			tab.setAttribute('class', 'active');
			content.setAttribute('class', 'tab-pane active');
		    }

		    // subgroups
		    if (widget.template.groups[i].hasOwnProperty('subgroups')) {
			var groups = widget.template.groups[i].subgroups;
			var groups_html = '';
			for (h in groups) {
			    groups_html += '<button class="btn btn-large btn-block" type="button" onclick="Retina.WidgetInstances.template_validator[1].activate_subgroup(\''+widget.template.groups[i].name+'\', \''+widget.template.groups[h].name+'\');">'+groups[h].label+'</button>';
			}
			groups_html += '<div style="height: 15px;"></div>';
			content.innerHTML += groups_html;
		    }

		    // fields
		    if (widget.template.groups[i].hasOwnProperty('fields')) {
			var fields = widget.template.groups[i].fields;
			var fields_html = '<form class="form-horizontal" action="#">';
			var ordered = [];
			var unordered = [];
			for (h in fields) {
			    if (fields.hasOwnProperty(h)) {
				if (fields[h].hasOwnProperty('order')) {
				    ordered[fields[h].order] = h;
				} else {
				    unordered.push(h);
				}
			    }
			}
			unordered = unordered.sort();
			ordered = ordered.concat(unordered);
			for (h=0;h<ordered.length;h++) {
			    var field = fields[ordered[h]];
			    fields_html += '<div class="control-group">';
			    fields_html += '<label class="control-label" for="'+widget.template.groups[i].name+'_'+ordered[h]+'">'+(field.label || ordered[h])+'</label>';
			    fields_html += '<div class="controls">';
			    fields_html += '<input type="text" id="'+h+'_'+ordered[h]+'" value="'+(field.default || "")+'">';
			    fields_html += '<span class="help-block">'+field.description+'</span>';
			    fields_html += '</div>';
			    fields_html += '</div>';
			}
			fields_html += '</form>';
			content.innerHTML += fields_html;
		    }
		}
	    }
	}
    };
    
    widget.load_template = function (url) {
	widget = Retina.WidgetInstances.template_validator[1];

	return jQuery.getJSON(url, function(data) {
	    widget = Retina.WidgetInstances.template_validator[1];
	    widget.template = data;
	});
    };
    
    widget.check_template = function (template) {
	widget = Retina.WidgetInstances.template_validator[1];

	widget.template_status = [];
	
	if (template) {
	    widget.template = template;
	}
	
	template = widget.template;
	
	if (! template.hasOwnProperty('name')) {
	    widget.template_status.push('template name missing');
	} else {
	    if (typeof template.name != 'string') {
		widget.template_status.push('template name is not a string');
	    } else {
		if (! template.hasOwnProperty('label')) {
		    template.label = template.name;
		}
	    }
	}

	if (! template.hasOwnProperty('description')) {
	    template.description = "";
	} else if (typeof template.description != 'string') {
	    widget.template_status.push('template description is not a string');
	}
	
	if (! template.hasOwnProperty('cvs') ) {
	    template.cvs = {};
	} else {
	    if (typeof template.cvs != 'object') {
		widget.template_status.push('template cvs is not an object');
	    } else {
		for (i in template.cvs) {
		    if (template.cvs.hasOwnProperty(i)) {
			if (! typeof template.cvs[i] == 'object') {
			    widget.template_status.push('the cv '+i+' is not an object');
			}
		    }
		}
	    }
	}
	
	if (! template.hasOwnProperty('groups')) {
	    template.groups = { "default": { "name": "default",
					     "label": "default",
					     "description": "",
					     "fields": [] } };
	} else if (typeof template.groups != 'object') {
	    widget.template_status.push('template groups is not an object');
	} else {
	    var subgroups = {};
	    for (i in template.groups) {
		if (template.groups.hasOwnProperty(i)) {
		    var group = template.groups[i];
		    if (! group.hasOwnProperty('name')) {
			group.name = i;
		    } else if (typeof group.name != 'string') {
			widget.template_status.push('name of group '+i+' is not a string');
		    }
		    if (! group.hasOwnProperty('label')) {
			group.label = group.name;
		    }
		    if (! group.hasOwnProperty('mandatory')) {
			group.mandatory = false;
		    }
		    if (! group.hasOwnProperty('toplevel')) {
			group.toplevel = false;
		    }
		    if (! group.hasOwnProperty('description')) {
			group.description = "";
		    } else if (typeof group.description != 'string') {
			widget.template_status.push('description of group '+i+' is not a string');
		    }
		    if (! group.hasOwnProperty('fields')) {
			if (! group.hasOwnProperty('subgroups')) {
			    widget.template_status.push('group '+i+' has no fields or subgroups');
			}
		    } else if (typeof group.fields != 'object') {
			widget.template_status.push('group '+i+' fields attribute is not an object');
		    } else {
			for (h in group.fields) {
			    if (group.fields.hasOwnProperty(h)) {
				var field = group.fields[h];
				if (typeof field == 'object') {
				    if (! field.hasOwnProperty('name')) {
					field.name = h;
				    } else if (typeof field.name != 'string') {
					widget.template_status.push('the name of field '+h+' is not a string');
				    }
				    if (! field.hasOwnProperty('label') ) {
					field.label = field.name;
				    } else if (typeof field.label != 'string') {
					widget.template_status.push('the label of field '+h+' is not a string');
				    }
				    if (! field.hasOwnProperty('description')) {
					field.description = "";
				    } else if (typeof field.description != 'string') {
					widget.template_status.push('the description of field '+h+' is not a string');
				    }
				    if (field.hasOwnProperty('type')) {
					if (typeof field.type != 'string') {
					    widget.template_status.push('the type of field '+h+' is not a string');
					}
				    } else {
					field.type = 'text';
				    }
				    if (field.hasOwnProperty('mandatory')) {
					if (field.mandatory && field.mandatory != "0" && field.mandatory != "false") {
					    field.mandatory = true;
					} else {
					    field.mandatory = false;
					}
				    } else {
					field.mandatory = false;
				    }
				    if (! field.hasOwnProperty('default')) {
					field.default = null;
				    }
				    if (field.hasOwnProperty('validation')) {
					if (typeof field.validation == 'object') {
					    if (field.validation.hasOwnProperty('type')) {
						if (typeof field.validation.type == 'string') {
						    if (field.validation.type != 'none') {
							if (field.validation.hasOwnProperty('value')) {
							    if (field.validation.type == 'cv') {
								if (typeof field.validation.value != 'string') {
								    widget.template_status.push('the validation type of the field '+h+' is cv, but the validation value of the field is not a string');
								} else {
								    if (! template.cvs.hasOwnProperty(field.validation.value)) {
									widget.template_status.push('the referenced cv of the validation of field '+h+' does not exist');
								    }
								}
							    } else if (field.validation.type == 'expression') {
								if (typeof field.validation.value.exec != 'function') {
								    if (typeof field.validation.value == 'string') {
									field.validation.value = new RegExp(field.validation.value);
								    } else {
									widget.template_status.push('the value of the expression validation of field '+h+' is neither a RegExp or a string');
								    }
								}
							    } else if (field.validation.type == 'function') {
								if (typeof field.validation.value != 'function') {
								    widget.template_status.push('field '+h+' has the validation type function, but the value attribute of the validation is not a function');
								}
							    } else {
								widget.template_status.push('the validation of field '+h+' has an invalid type');
							    }
							} else {
							    widget.template_status.push('validation of field '+h+' has no value');
							}
						    }
						} else {
						    widget.template_status.push('validation type of field '+h+' is not a string');
						}
					    } else {
						widget.template_status.push('the validation of field '+h+' has no type');
					    }
					} else {
					    widget.template_status.push('the validation of field '+h+' is not an object');
					}
				    } else {
					field.validation = { "type": "none" };
				    }
				}
			    }
			}
		    }
		    if (! group.hasOwnProperty('subgroups') ) {
			group.subgroups = {};
		    } else if (typeof group.subgroups == 'object') {
			for (var h in group.subgroups) {
			    if (group.subgroups.hasOwnProperty(h)) {
				subgroups[h] = i;
				var subgroup = group.subgroups[h];
				if (typeof subgroup == "object") {
				    if (subgroup.hasOwnProperty('type')) {
					if (typeof subgroup.type == "string") {
					    if (subgroup.type != "instance" && subgroup.type != "list") {
						widget.template_status.push('the type attribute of subgroup '+h+' of group '+i+' is '+subgroup.type+" (must be 'list' nor 'instance')");
					    }
					} else {
					    widget.template_status.push('the type attribute of subgroup '+h+' of group '+i+' is not a string');
					}
				    } else {
					subgroup.type = "list";
				    }
				    
				    if (subgroup.hasOwnProperty('label')) {
					if (typeof subgroup.label != "string") {
					    widget.template_status.push('the label attribute of subgroup '+h+' of group '+i+' is not a string');
					}
				    } else {
					subgroup.label = h;
				    }

				    if (subgroup.hasOwnProperty('mandatory')) {
					subgroup.mandatory = false;
				    } else {
					if (typeof subgroup.mandatory != "boolean") {
					    widget.template_status.push('the mandatory attribute of subgroup '+h+' of group '+i+' is not a boolen');
					}
				    }
				} else {
				    widget.template_status.push('subgroup '+h+' of group '+i+' is not an object');
				}
			    }
			}
		    } else {
			widget.template_status.push('subgroups property of group '+i+' is not an object');
		    }
		}
	    }
	    for (i in subgroups) {
		if (subgroups.hasOwnProperty(i)) {
		    if (! template.groups.hasOwnProperty(i)) {
			widget.template_status.push('subgroup '+i+' referenced in group '+subgroups[i]+' does not exist in template');
		    }
		}
	    }
	}
	
	if (widget.template_status.length) {
	    alert(widget.template_status.join("\n"));
	    return true;
	} else {
	    return false;
	}
    };
    
    widget.validate_data = function (data) {
	widget = Retina.WidgetInstances.template_validator[1];

	if (data) {
	    widget.data = data;
	}
	
	data = widget.data;
	
	if (widget.check_template()) {
	    
	    widget.data_status = [];
	    
	    if (typeof data == 'object') {
		for (var i in data) {
		    if (data.hasOwnProperty(i)) {
			if (widget.template.groups.hasOwnProperty(i)) {
			    var item = data[i];
			    var group = widget.template.groups[i];
			    if (typeof item == 'object') {
				widget.check_group(item, group);
			    } else {
				widget.data_status.push('data item '+i+' is not an object');
			    }
			} else {
			    widget.data_status.push('group '+i+' does not exist in template');
			}
		    }
		}
	    } else {
		widget.data_status.push('the data is not an object');
	    }
	    
	    if (widget.data_status.length) {
		return true;
	    } else {
		alert(widget.data_status.join("\n"));
		return false;
	    }
	}
    };

    widget.check_group = function (item, group) {
	widget = Retina.WidgetInstances.template_validator[1];

	if (typeof item.length == 'undefined') {
	    for (var h in item) {
		if (item.hasOwnProperty(h)) {
		    if (group.fields.hasOwnProperty(h)) {
			widget.check_field(item[h], h, group);
		    } else if (group.subgroups.hasOwnProperty(h)) {
			widget.check_group(item[h], widget.template.groups[h]);
		    } else {
			widget.data_status.push('field '+h+' in does not exist in template');
		    }
		}
	    }
	    for (var h in group.fields) {
		if (group.fields.hasOwnProperty(h) && group.fields[h].mandatory && ! item.hasOwnProperty(h)) {
		    widget.data_status.push('mandatory field '+h+' missing in group '+group.name);
		}
	    }
	} else {
	    for (var h=0;h<item.length;h++) {
		if (typeof item[h] == 'object') {
		    for (var j in item[h]) {
			if (item[h].hasOwnProperty(j)) {
			    if (widget.template.fields.hasOwnProperty(j)) {
				widget.check_field(item[h][j], j, group, h);
			    } else if (group.subgroups.hasOwnProperty(j)) {
				widget.check_group(item[h][j], widget.template.groups[j]);
			    } else {
				widget.data_status.push('field '+h+' in does not exist in template');
			    }
			}
		    }
		    for (var j in group.fields) {
			if (group.fields.hasOwnProperty(j) && group.fields[j].mandatory && ! item[h].hasOwnProperty(j)) {
			    widget.data_status.push('mandatory field '+j+' missing in group '+group.name+' instance '+h);
			}
		    }
		} else {
		    widget.data_status.push('instance '+h+' of group '+group.name+' is not an object');
		}
	    }
	}
	
	return;
    };
    
    widget.check_field = function (value, fieldname, group, location) {
	widget = Retina.WidgetInstances.template_validator[1];

	var error = "field "+fieldname;
	if (typeof group == 'string') {
	    error = " of group "+group;
	}
	if (typeof location == 'number') {
	    error += " instance "+location;
	}
	
	if (group.hasOwnProperty(fieldname)) {
	    var field = group.fields[fieldname];
	    if (field.validation.type == 'none') {
		if (field.mandatory && ! field.length) {
		    widget.data_status.push('mandatory field '+fieldname+' missing');
		}
		return;
	    } else {
		if (field.validation.type == 'cv') {
		    if (! widget.template.cvs[field.validation.value][value]) {
			widget.data_status.push('field '+fieldname+' was not found in the controlled vocabulary '+field.validation.value);
		    }
		    return;
		} else if (field.validation.type == 'expression') {
		    if (! field.validation.value.test(value)) {
			widget.data_status.push('field '+fieldname+' has an invalid value');
		    }
		    return;
		} else if (field.validation.type == 'function') {
		    var error = field.validation.value.call(value);
		    if (error) {
			widget.data_status.push('field '+fieldname+' invalid: '+error);
		    }
		    return;
		}
	    }
	} else {
	    widget.data_status.push('field '+fieldname+' does not exist in template');
	    return;
	}
    };
    
})();
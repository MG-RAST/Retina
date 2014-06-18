(function () {
    widget = Retina.Widget.extend({
        about: {
            title: "Template Validator",
            name: "templateValidator",
            author: "Tobias Paczian",
            requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [];
    };
    
    widget.template = {};
    widget.template_status = [];
    widget.template_warnings = [];
    widget.data = {};
    widget.data_status = [];
    widget.data_warnings = [];
    widget.tod = 'template';
    
    widget.display = function (wparams) {
        widget = this;
	
	var target = widget.target = wparams.target || null;

	if (! target) {
	    return widget;
	}
	
	var help = document.createElement('div');
	help.innerHTML = "<h3>Select a template or data file to validate</h3><select onchange='Retina.WidgetInstances.templateValidator[1].tod=this.options[this.selectedIndex].value;'><option>template</option><option>data</option></select>";
	target.appendChild(help);

	var fu = document.createElement('div');
	target.appendChild(fu);

	var fuDialog = document.createElement('input');
	fuDialog.setAttribute('type', 'file');
	fuDialog.setAttribute('style', 'display:none;');
	fuDialog.addEventListener('change', function(evt){
	    var files = evt.target.files;
	
	    if (files.length) {
		for (var i = 0; i < files.length; i++) {
		    var f = files[i];
		    var reader = new FileReader();
		    reader.onload = (function(theFile) {
			return function(e) {
			    var data = JSON.parse(e.target.result.toString().replace(/\n/g, ""));
			    if (Retina.WidgetInstances.templateValidator[1].tod == 'template') {
				Retina.WidgetInstances.templateValidator[1].check_template(data);
			    } else {
				Retina.WidgetInstances.templateValidator[1].validate_data(data);
			    }
			};
		    })(f);
		    reader.readAsText(f);
		}
	    }
	});
	fu.appendChild(fuDialog);

	var fakeButton = document.createElement('button');
	fakeButton.setAttribute('class', 'btn');
	fakeButton.innerHTML = "select file";
	fakeButton.addEventListener('click', function() {
	    fuDialog.click();
	});
	fu.appendChild(fakeButton);
	fu.setAttribute('style', "margin-bottom: 25px;");

	var result = document.createElement('div');
	result.setAttribute('id', 'resultDiv');
	target.appendChild(result);

	return widget;
    };
    
    widget.check_template = function (template, nodisplay) {
	widget = Retina.WidgetInstances.templateValidator[1];

	widget.template_status = [];
	widget.template_warnings = [];
	
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
		    widget.template_warnings.push('template has no label, assuming '+template.name);
		    template.label = template.name;
		}
	    }
	}

	if (! template.hasOwnProperty('description')) {
	    widget.template_warnings.push('template has no description');
	    template.description = "";
	} else if (typeof template.description != 'string') {
	    widget.template_status.push('template description is not a string');
	}
	
	if (! template.hasOwnProperty('cvs') ) {
	    widget.template_warnings.push('template has no cvs');
	    template.cvs = {};
	} else {
	    if (typeof template.cvs != 'object') {
		widget.template_status.push('template cvs is not an object');
	    } else if (typeof template.cvs.length == 'function') {
		widget.template_status.push('template is an array, must be object');
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
	    if (template.hasOwnProperty('fields')) {
		widget.template_warnings.push('template has no groups, assuming default group');
		template.groups = { "default": { "name": "default",
						 "label": "default",
						 "description": "",
						 "fields": [] } };
	    } else {
		widget.template_status.push('template has neither groups nor fields');
	    }
	} else if (typeof template.groups != 'object') {
	    widget.template_status.push('template groups is not an object');
	} else if (typeof template.groups.length == 'function') {
	    widget.template_status.push('template groups is an array, must be object');
	} else {
	    var subgroups = {};
	    for (i in template.groups) {
		if (template.groups.hasOwnProperty(i)) {
		    var group = template.groups[i];
		    if (! group.hasOwnProperty('name')) {
			widget.template_warnings.push('template group '+i+' has no name property, assuming '+i);
			group.name = i;
		    } else if (typeof group.name != 'string') {
			widget.template_status.push('name of group '+i+' is not a string');
		    }
		    if (! group.hasOwnProperty('label')) {
			widget.template_warnings.push('template group '+i+' has no label property, assuming '+group.name);
			group.label = group.name;
		    }
		    if (! group.hasOwnProperty('mandatory')) {
			widget.template_warnings.push('template group '+i+' has no mandatory property, assuming false');
			group.mandatory = false;
		    }
		    if (! group.hasOwnProperty('toplevel')) {
			widget.template_warnings.push('template group '+i+' has no toplevel property, assuming false');
			group.toplevel = false;
		    }
		    if (! group.hasOwnProperty('description')) {
			widget.template_warnings.push('template group '+i+' has no description property');
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
		    } else if (typeof group.fields.length == 'function') {
			widget.template_status.push('group '+i+' fields attribute is an array, must be object');
		    } else {
			for (h in group.fields) {
			    if (group.fields.hasOwnProperty(h)) {
				var field = group.fields[h];
				if (typeof field == 'object') {
				    if (! field.hasOwnProperty('name')) {
					widget.template_warnings.push('field '+h+' in group '+i+' has no name property, assuming '+h);
					field.name = h;
				    } else if (typeof field.name != 'string') {
					widget.template_status.push('the name of field '+h+' in group '+i+' is not a string');
				    }
				    if (! field.hasOwnProperty('label') ) {
					widget.template_warnings.push('field '+h+' in group '+i+' has no label property, assuming '+field.name);
					field.label = field.name;
				    } else if (typeof field.label != 'string') {
					widget.template_status.push('the label of field '+h+' in group '+i+' is not a string');
				    }
				    if (! field.hasOwnProperty('description')) {
					widget.template_warnings.push('field '+h+' in group '+i+' has no name description property');
					field.description = "";
				    } else if (typeof field.description != 'string') {
					widget.template_status.push('the description of field '+h+' in group '+i+' is not a string');
				    }
				    if (field.hasOwnProperty('type')) {
					if (typeof field.type != 'string') {
					    widget.template_status.push('the type of field '+h+' in group '+i+' is not a string');
					}
				    } else {
					widget.template_warnings.push('field '+h+' in group '+i+' has no type property, assuming text');
					field.type = 'text';
				    }
				    if (field.hasOwnProperty('mandatory')) {
					if (field.mandatory && field.mandatory != "0" && field.mandatory != "false") {
					    field.mandatory = true;
					} else {
					    field.mandatory = false;
					}
				    } else {
					widget.template_warnings.push('field '+h+' in group '+i+' has no mandatory property, assuming false');
					field.mandatory = false;
				    }
				    if (! field.hasOwnProperty('default')) {
					widget.template_warnings.push('field '+h+' in group '+i+' has no default property, assuming null');
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
								    widget.template_status.push('the validation type of the field '+h+' in group '+i+' is cv, but the validation value of the field is not a string');
								} else {
								    if (! template.cvs.hasOwnProperty(field.validation.value)) {
									widget.template_status.push('the referenced cv of the validation of field '+h+' in group '+i+' does not exist');
								    }
								}
							    } else if (field.validation.type == 'expression') {
								if (typeof field.validation.value.exec != 'function') {
								    if (typeof field.validation.value == 'string') {
									field.validation.value = new RegExp(field.validation.value);
								    } else {
									widget.template_status.push('the value of the expression validation of field '+h+' in group '+i+' is neither a RegExp or a string');
								    }
								}
							    } else if (field.validation.type == 'function') {
								if (typeof field.validation.value != 'function') {
								    widget.template_status.push('field '+h+' in group '+i+' has the validation type function, but the value attribute of the validation is not a function');
								}
							    } else {
								widget.template_status.push('the validation of field '+h+' in group '+i+' has an invalid type');
							    }
							} else {
							    widget.template_status.push('validation of field '+h+' in group '+i+' has no value');
							}
						    }
						} else {
						    widget.template_status.push('validation type of field '+h+' in group '+i+' is not a string');
						}
					    } else {
						widget.template_status.push('the validation of field '+h+' in group '+i+' has no type');
					    }
					} else {
					    widget.template_status.push('the validation of field '+h+' in group '+i+' is not an object');
					}
				    } else {
					widget.template_warnings.push('field '+h+' in group '+i+' has no validation property, assuming none');
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
					widget.template_warnings.push('subgroup '+h+' in group '+i+' has no type property, assuming list');
					subgroup.type = "list";
				    }
				    
				    if (subgroup.hasOwnProperty('label')) {
					if (typeof subgroup.label != "string") {
					    widget.template_status.push('the label attribute of subgroup '+h+' of group '+i+' is not a string');
					}
				    } else {
					widget.template_warnings.push('subgroup '+h+' in group '+i+' has no label property, assuming '+h);
					subgroup.label = h;
				    }

				    if (subgroup.hasOwnProperty('mandatory')) {
					widget.template_warnings.push('subgroup '+h+' in group '+i+' has no mandatory property, assuming false');
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
	    if (nodisplay) {
		return { template: template, errors: widget.template_status, warnings: widget.template_warnings };
	    } else {
		document.getElementById('resultDiv').innerHTML = '<h4>Errors</h4><pre>'+widget.template_status.join("\n")+'</pre><h4>Warnings</h4><pre>'+widget.template_warnings.join("\n")+'</pre>';
		return false;
	    }
	} else {
	    if (nodisplay) {
		return { template: template, warnings: widget.template_warnings };
	    } else {
		document.getElementById('resultDiv').innerHTML = '<h4>the template is valid</h4>'+(widget.template_warnings.length ? '<h4>Warnings</h4><pre>'+widget.template_warnings.join("\n")+'</pre>' : '')+'<pre>'+JSON.stringify(widget.template,null,2)+'</pre>';
		return true;
	    }
	}
    };
    
    widget.validate_data = function (data, nodisplay) {
	widget = Retina.WidgetInstances.templateValidator[1];

	if (data) {
	    widget.data = data;
	}
	
	data = widget.data;
	
	if (widget.check_template(null, nodisplay)) {
	    
	    widget.data_status = [];
	    widget.data_warnings = [];
	    
	    if (typeof data == 'object') {
		var num = 0;
		for (var i in data) {
		    if (data.hasOwnProperty(i)) {
			num++;
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
		
		if (num == 0) {
		    widget.data_status.push('no data to validate');
		}
	    } else {
		widget.data_status.push('the data is not an object');
	    }
	    
	    if (widget.data_status.length) {
		if (nodisplay) {
		    return { data: data, errors: widget.data_status, warnings: widget.data_warnings };
		} else {
		    document.getElementById('resultDiv').innerHTML = '<h4>Errors</h4><pre>'+widget.data_status.join("\n")+'</pre><h4>Warnings</h4><pre>'+widget.data_warnings.join("\n")+'</pre>';
		    return false;
		}
	    } else {
		if (nodisplay) {
		    return { data: data, warnings: widget.data_warnings };
		} else {
		    document.getElementById('resultDiv').innerHTML = '<h4>the template is valid</h4>'+(widget.data_warnings.length ? '<h4>Warnings</h4><pre>'+widget.data_warnings.join("\n")+'</pre>' : '')+'<pre>'+JSON.stringify(widget.data,null,2)+'</pre>';
		}
	    }
	} else {
	    if (nodisplay) {
		return { template: template, errors: widget.template_status, warnings: widget.template_warnings };
	    }
	}
    };

    widget.check_group = function (item, group) {
	widget = Retina.WidgetInstances.templateValidator[1];

	if (typeof item.length == 'undefined') {
	    for (var h in item) {
		if (item.hasOwnProperty(h)) {
		    if (group.fields.hasOwnProperty(h)) {
			widget.check_field(item[h], h, group);
		    } else if (group.subgroups.hasOwnProperty(h)) {
			widget.check_group(item[h], widget.template.groups[h]);
		    } else {
			widget.data_warnings.push('field '+h+' in does not exist in template');
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
			    if (group.fields.hasOwnProperty(j)) {
				widget.check_field(item[h][j], j, group, h);
			    } else if (group.subgroups.hasOwnProperty(j)) {
				widget.check_group(item[h][j], widget.template.groups[j]);
			    } else {
				widget.data_status.push('field '+j+' in does not exist in template');
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
	widget = Retina.WidgetInstances.templateValidator[1];

	var error = "field "+fieldname;
	if (typeof group == 'string') {
	    error = " of group "+group;
	}
	if (typeof location == 'number') {
	    error += " instance "+location;
	}
	
	if (group.fields.hasOwnProperty(fieldname)) {
	    var field = group.fields[fieldname];
	    if (field.validation.type == 'none') {
		if (field.mandatory) {
		    if (value == null) {
			widget.data_status.push('mandatory field '+fieldname+' missing');
		    }
		}
		return;
	    } else {
		if (field.validation.type == 'cv') {
		    if (! widget.template.cvs[field.validation.value][value]) {
			widget.data_status.push('value "'+value+'" of field '+fieldname+' was not found in the controlled vocabulary.');
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

(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "metadataConverter",
	    title: "Metadata Converter",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
	    },
	},
	exampleData: function () {
	    return {};
        },
	render: function () {
	    renderer = this;

	    return renderer;
	},

	mgrast2data: function (id, callback) {
	    return jQuery.getJSON('http://api.metagenomics.anl.gov/metadata/export/'+id, function (data) {

		var returnData = { "project": { "name"    : data.name,
						"id"      : data.id,
						"samples" : [] } };
		
		// get project fields
		for (i in data.data) {
		    if (data.data.hasOwnProperty(i)) {
			returnData.project[i] = data.data[i].value;
		    }
		}
		
		// iterate over samples
		for (var i=0;i<data.samples.length;i++) {
		    
		    // initialize sample
		    var new_sample = { "name": data.samples[i].name,
				       "id" : data.samples[i].id,
				       "libraries": [] };
		    
		    // add sample data
		    for (var h in data.samples[i].data) {
			if (data.samples[i].data.hasOwnProperty(h)) {
			    new_sample[h] = data.samples[i].data[h].value;
			}
		    }
		    
		    // check if there is an env package
		    if (data.samples[i].hasOwnProperty('envPackage')) {
			
			// initialize env package
			var new_env = { "name": data.samples[i].envPackage.name,
					"type": data.samples[i].envPackage.type,
					"id": data.samples[i].envPackage.id };
			
			// add env package data
			for (var h in data.samples[i].envPackage.data) {
			    if (data.samples[i].envPackage.data.hasOwnProperty(h)) {
				new_env[h] = data.samples[i].envPackage.data[h].value;
			    }
			}
			
			var nested_new_env = {};
			nested_new_env[new_env.type] = new_env;
			
			// add env package to new sample
			new_sample.envPackage = nested_new_env;
		    }
		    
		    // check if we have libraries
		    if (data.samples[i].hasOwnProperty('libraries')) {
			
			// iterate over the samples libraries
			for (var h=0;h<data.samples[i].libraries.length;h++) {
			    
			    // initialize new library
			    var new_lib = { "name": data.samples[i].libraries[h].name,
					    "type": data.samples[i].libraries[h].type,
					    "id": data.samples[i].libraries[h].id };
			    
			    // add library data
			    for (var j in data.samples[i].libraries[h].data) {
				if (data.samples[i].libraries[h].data.hasOwnProperty(j)) {
				    new_lib[j] = data.samples[i].libraries[h].data[j].value;
				}
			    }
			    
			    var nested_new_lib = {};
			    nested_new_lib[new_lib.type] = new_lib;
			    
			    // add library to sample
			    new_sample.libraries.push(nested_new_lib);
			}
		    }
		    
		    returnData.project.samples.push(new_sample);
		}
		
		callback.call(null, returnData);
	    });
	},

	mgrast2template: function (callback) {
	    return jQuery.getJSON('http://api.metagenomics.anl.gov/1/metadata/template', function (data) {
		var returnTemplate = { "name": "mgrast",
				       "label": "MG-RAST",
				       "description": "MG-RAST metagenome submission metadata template",
				       "cvs": {
					   "gender": { "male": true,
						       "female": true }
				       },
				       "groups": {
					   "project": {
					       "name": "project",
					       "label": "project",
					       "toplevel": true,
					       "mandatory": true,
					       "description": "project",
					       "subgroups": { "sample": { "type": "list",
									  "mandatory": true,
									  "label": "samples" },
							    },
					       "fields": { "name": { "description": "project name",
								     "type": "string",
								     "mandatory": 1 },
							   "id": { "description": "project id",
								   "type": "string",
								   "mandatory": 1 }
							 }
					   },
					   "sample": {
					       "name": "sample",
					       "label": "sample",
					       "description": "sample",
					       "subgroups": { "libraries": { "type": "list",
									     "mandatory": true,
									     "label": "libraries" },
							      "envPackage": { "type": "instance",
									      "mandatory": true,
									      "label": "envPackage" }
							    },
					       "fields": { "name": { "description": "sample name",
								     "type": "string",
								     "mandatory": 1 },
							   "id": { "description": "sample id",
								   "type": "string",
								   "mandatory": 1 }
							 }
					   },
					   "libraries": {
					       "name": "libraries",
					       "label": "library",
					       "description": "library",
					       "subgroups": {
						   "mimarks-survey": { "type": "instance",
								       "mandatory": false,
								       "label": "mimarks-survey" },
						   "metagenome": { "type": "instance",
								   "mandatory": false,
								   "label": "metagenome" },
						   "metatranscriptome": { "type": "instance",
									  "mandatory": false,
									  "label": "metatranscriptome" },
					       }
					   },
					   "envPackage": { "name": "envPackage",
							   "label": "envPackage",
							   "description": "envPackage",
							   "subgroups": {}
							 }
				       }
				     };
		
		// get project fields
		for (i in data.project.project) {
		    if (data.project.project.hasOwnProperty(i)) {
			var field = data.project.project[i];
			returnTemplate.groups.project.fields[i] = {
			    "description": field.definition,
			    "type": field.type,
			    "mandatory": field.required == 0 ? false : true
			};
		    }
		}
		
		// get sample fields
		for (i in data.sample.sample) {
		    if (data.sample.sample.hasOwnProperty(i)) {
			var field = data.sample.sample[i];
			returnTemplate.groups.sample.fields[i] = {
			    "description": field.definition,
			    "type": field.type,
			    "mandatory": field.required == 0 ? false : true
			};
		    }
		}
		
		// get library types
		for (i in data.library) {
		    if (data.library.hasOwnProperty(i)) {
			returnTemplate.groups[i] = {
			    "name": i,
			    "label": i,
			    "description": i,
			    "fields": { "name": { "description": "library name",
						  "type": "string",
						  "mandatory": 1 },
					"id": { "description": "library id",
						"type": "string",
						"mandatory": 1 }
				      }
			};
			for (h in data.library[i]) {
			    if (data.library[i].hasOwnProperty(h)) {
				var field = data.library[i][h];
				returnTemplate.groups[i].fields[h] = {
				    "description": field.definition,
				    "type": field.type,
				    "mandatory": field.required == 0 ? false : true
				};
			    }
			}
		    }
		}
		
		// get ep types
		for (i in data.ep) {
		    if (data.ep.hasOwnProperty(i)) {
			returnTemplate.groups.envPackage.subgroups[i] = { "type": "instance",
									  "mandatory": false,
									  "label": i };
			returnTemplate.groups[i] = {
			    "name": i,
			    "label": i,
			    "description": i,
			    "fields": { "name": { "description": "package name",
						  "type": "string",
						  "mandatory": 1 },
					"id": { "description": "package id",
						"type": "string",
						"mandatory": 1 }
				      }
			};
			for (h in data.ep[i]) {
			    if (data.ep[i].hasOwnProperty(h)) {
				var field = data.ep[i][h];
				returnTemplate.groups[i].fields[h] = {
				    "description": field.definition,
				    "type": field.type,
				    "mandatory": field.required == 0 ? false : true
				};
			    }
			}
		    }
		}
		
		callback.call(null, returnTemplate);
	    });
	}
    });
 }).call(this);

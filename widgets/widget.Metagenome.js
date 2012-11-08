(function () {
    widget = Retina.Widget.extend({
        about: function () {
            return {
                title: "Metagenome Widget",
                name: "Metagenome",
                author: "Tobias Paczian",
                requires: [ ]
            };
        }
    });
    
    widget.setup = function () {
	return [ this.loadRenderer('table') ];
    }
    
    widget.display = function (div, args) {
	if (! stm.DataStore['metagenome'] || ! stm.DataStore['metagenome'][args.id]) {
	    stm.get_objects( { "type": "metagenome", "id": args.id, "options": { "verbosity": "full" } } ).then( function () { Retina.Widget.Metagenome.display(div, args); } );
	    return;
	}

	var loaded_displays = {};
	
	var rend_disp;
	var select_disp;
	var select_list;
	
	if (div.selector) {
	    select_disp = div.selector;
	    rend_disp = div.renderer;
	} else {
	    rend_disp = document.createElement("div");
	    select_disp = document.createElement("div");
	    div.appendChild(select_disp);
	    div.appendChild(rend_disp);
	}

	var metagenome = stm.DataStore['metagenome'][args.id];
	if (! metagenome.metadata) {
	    select_disp.innerHTML = '<div class="alert">\
<button type="button" class="close" data-dismiss="alert">×</button>\
<strong>Warning</strong> There is no metadata available for this metagenome.\
</div>';
	    return 0;
	}	 
	var html = '\
<div class="tabbable tabs-left">\
<ul class="nav nav-tabs">\
<li class="active" style="min-width: 180px;">\
<a data-toggle="tab" href="#overview">Overview</a>\
</li>';
	
	if (metagenome.metadata.project) {
	    html += '\
<li>\
<a data-toggle="tab" href="#project">Project</a>\
</li>';
	}
	
	if (metagenome.metadata.env_package) {
	    html += '\
<li>\
<a data-toggle="tab" href="#env_package">Environmental Package</a>\
</li>';
	}
	
	if (metagenome.metadata.library) {
	    html += '\
<li>\
<a data-toggle="tab" href="#library">Library</a>\
</li>';
	}
	
	if (metagenome.metadata.sample) {
	    html += '\
<li>\
<a data-toggle="tab" href="#sample">Sample</a>\
</li>';
	}
	html += '\
</ul>\
<div class="tab-content">\
<div id="overview" class="tab-pane active">\
<h3>Metagenome Overview</h3>\
<table class="table table-condensed">\
<tr><th class="span3">Metagenome Name</th><td>'+metagenome.name+'</td></tr>\
<tr><th class="span3">creation date</th><td>'+metagenome.created+'</td></tr>\
<tr><th class="span3">ID</th><td>'+metagenome.id+'</td></tr>\
</table>\
</div>';
	
	if (metagenome.metadata.env_package) {
	    html += '\
<div id="env_package" class="tab-pane">\
<h3>Environmental Package</h3>\
<table class="table table-condensed">\
<tr><th class="span3">name</th><td>'+metagenome.metadata.env_package.name+'</td></tr>\
<tr><th class="span3">ID</th><td>'+metagenome.metadata.env_package.id+'</td></tr>\
<tr><th class="span3">type</th><td>'+metagenome.metadata.env_package.type+'</td></tr>\
';
	    
	    for (var i in metagenome.metadata.env_package.data) {
		html += '<tr><th class="span3">'+i+'</th><td>'+metagenome.metadata.env_package.data[i]+'</td></tr>';
	    }
	    
	    html += '\
</table>\
</div>\
';
	}
	
	if (metagenome.metadata.project) {
	    html += '\
<div id="project" class="tab-pane">\
<h3>Project</h3>\
<table class="table table-condensed">\
<tr><th class="span3">name</th><td>'+metagenome.metadata.project.name+'</td></tr>\
<tr><th class="span3">ID</th><td>'+metagenome.metadata.project.id+'</td></tr>\
<tr><th class="span3">public</th><td>'+metagenome.metadata.project.public+'</td></tr>\
';
	    
	    for (var i in metagenome.metadata.project.data) {
		html += '<tr><th class="span3">'+i+'</th><td>'+metagenome.metadata.project.data[i]+'</td></tr>';
	    }
	    
	    html += '\
</table>\
</div>\
';
	}
	
	if (metagenome.metadata.library) {
	    html += '\
<div id="library" class="tab-pane">\
<h3>Library</h3>\
<table class="table table-condensed">\
<tr><th class="span3">name</th><td>'+metagenome.metadata.library.name+'</td></tr>\
<tr><th class="span3">ID</th><td>'+metagenome.metadata.library.id+'</td></tr>\
<tr><th class="span3">type</th><td>'+metagenome.metadata.library.type+'</td></tr>\
';
	    
	    for (var i in metagenome.metadata.library.data) {
		html += '<tr><th class="span3">'+i+'</th><td>'+metagenome.metadata.library.data[i]+'</td></tr>';
	    }
	    
	    html += '\
</table>\
</div>\
';
	}
	
	if (metagenome.metadata.sample) {
	    html += '\
<div id="sample" class="tab-pane">\
<h3>Sample</h3>\
<table class="table table-condensed">\
<tr><th class="span3">name</th><td>'+metagenome.metadata.sample.name+'</td></tr>\
<tr><th class="span3">ID</th><td>'+metagenome.metadata.sample.id+'</td></tr>\
';
	    
	    for (var i in metagenome.metadata.sample.data) {
		html += '<tr><th class="span3">'+i+'</th><td>'+metagenome.metadata.sample.data[i]+'</td></tr>';
	    }
	    
	    html += '\
</table>\
</div>\
';
	}
	
	html += '\
</div>\
</div>';
	
	select_disp.innerHTML = html;
    };
    
})();
	
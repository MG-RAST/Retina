(function () {
    var widget = Retina.Widget.extend({
        about: {
            title: "Notebook Dashboard Widget",
            name: "NotebookDashboard",
	        version: 1,
            author: "Travis Harrison",
            requires: [ ]
        }
    });
    
    // ipython notebook server ip
    widget.nb_server = 'http://140.221.92.53:7051';
    
    // shock id of template notebook
    widget.nb_template = '0a191d8d-8582-4377-8038-91a2dce3eb2e';
    
    // current selected notebook [ uuid (notebook), id (shock) ]
    widget.nb_selected = [];
    
    // dict of notebook uuid: [ notebook_objs ]
    // notebook_objs is list of notebooks with same uuid sorted by datetime (lates first)
    widget.sorted_nbs = {};

    widget.template = 'http://140.221.84.122:8888/81a79607-4127-4f13-b844-2badaf2d852b';
    
    // these are listselect renderers for notebooks, versions, and metagenomes
    widget.nb_list  = undefined;
    widget.ver_list = undefined;

    // this will be called by Retina automatically to initialize the widget
    // note that the display function will not be called until this is finished
    // you can add functions that return promises to the return list, i.e.:
    // this.loadRenderer('table')
    // which would make the table renderer available to use before the display function is called
    // you can add multiple comma separated promises
    widget.setup = function () {
	    return [ this.loadRenderer('listselect') ];
    };
    
    // this will be called whenever the widget is displayed
    // the params should at least contain a space in the DOM for the widget to render to
    // if the widget is visual
    widget.display = function (params) {
	widget = this;
	var dash_div = params.target;
	var iframe_div = params.notebook;
    // populate divs with html
	dash_html = '\
                   <button style="width: 150px; width: 150px; position: absolute; top: 60px; right: 55px;" data-toggle="button" onclick="if(this.className==\'btn\'){document.getElementById(\'data_pick\').style.display=\'\';}else{document.getElementById(\'data_pick\').style.display=\'none\';}" type="button" class="btn">Analysis Builder</button>\
                   <button class="btn btn-success" onclick="Retina.WidgetInstances.NotebookDashboard[0].export_visual();" title="show results in new window" style="position: absolute; top: 60px; right: 10px;"><i class="icon-eye-open icon-white"></i></button>\
	        <div id="nb_dash" style="margin-top: 5px; height: 300px; border-bottom: 1px dotted; display: none;">\
	            <div class="row" id="dash_head" style="display: none;">\
	                <div class="span3 offset1"><h4 style="margin-bottom: 5px;">Select Notebook</h4></div>\
	                <div class="span3 offset1"><h4 style="margin-bottom: 5px;">Select Version</h4></div>\
	            </div><div class="row">\
	                <div style="margin-left: 10px;"><div id="nb_div" class="span3"></div></div>\
	                <div id="version_div" class="span3 offset1"></div>\
	                <div class="span2 offset1"><table id="dash_butt" style="display: none;">\
	                    <tr><td><button type="button" class="btn btn-success" style="width: 135px" onclick="Retina.WidgetInstances.NotebookDashboard['+widget.index+'].nb_launch_click();document.getElementById(\'nbdash_off_button\').click();">Launch Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-warning" style="width: 135px" data-toggle="modal" data-target="#new_nb_modal">New Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-danger" style="width: 135px" data-toggle="modal" data-target="#del_nb_modal">Delete Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-primary" style="width: 135px" onclick="Retina.WidgetInstances.NotebookDashboard['+widget.index+'].nb_save();">Save Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-inverse" style="width: 135px" onclick="Retina.WidgetInstances.NotebookDashboard['+widget.index+'].nb_select_refresh();">Refresh Dashboard</button></td></tr>\
	                </table></div>\
	            </div>\
	        </div>\
                <div id="data_pick" style="display: none; height: 315px; margin-top: 5px;">\
	            <div id="data_selector_div"></div>\
	        </div>\
                <div id="visual" style="display: none; height: 850px; margin-top: 5px;border-bottom: 1px dotted; border-top: 1px dotted;">\
	            <div id="result" style="margin-left: 10px;"><h3 style="position: relative; top: 200px; left: 25%;">your analysis currently has no results</h3></div>\
	        </div>\
                <div id="new_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Launch New Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Enter name of new notebook:<input id="new_nb_name" style="margin-left:10px;" type="text" value=""></input></p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                    <button class="btn btn-success" data-dismiss="modal" onclick="Retina.WidgetInstances.NotebookDashboard['+widget.index+'].new_nb_click()">Launch</button>\
                </div>\
            </div><div id="del_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Delete Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Do you wish to delete the selected notebook?</p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">No</button>\
                    <button class="btn btn-success" data-dismiss="modal" onclick="Retina.WidgetInstances.NotebookDashboard['+widget.index+'].del_nb_click()">Yes</button>\
                </div>\
            </div><div id="ver_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Copy Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Enter name for copy of notebook \'<span id=ver_name_old></span>\':<input id="ver_name_new" style="margin-left:10px;" type="text" value=""></input></p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                    <button class="btn btn-success" data-dismiss="modal" onclick="Retina.Widget.NotebookDashboard.ver_launch_click();">Launch</button>\
                </div>\
            </div>';
        iframe_html = '<div class="tabbable" style="margin-top: 15px; margin-left: 15px;" id="ipython_iframe">\
            <ul id="tab_list" class="nav nav-tabs"><li class="show"><a data-toggle="tab" href="#hidden_dash">IPython</a></li></ul>\
            <div id="tab_div" class="tab-content"><div id="hidden_dash" class="tab-pane active"><iframe id="ipython_dash" src="'+widget.nb_server+'" width="95%" height="750"></iframe></div>\
            </div>';
        jQuery('#'+dash_div).html(dash_html);
        jQuery('#'+iframe_div).html(iframe_html);
	
	    Retina.Widget.create('VisualPython', { target: document.getElementById('data_selector_div') });

	    // create empty renderers
	    var index = widget.index;
        widget.nb_list = Retina.Renderer.create('listselect', { "target": document.getElementById('nb_div'),
								"data": [],
								"value": 'uuid',
								"filter": ['name', 'datetime', 'created', 'status'],
								"multiple": false,
								"no_button": true,
								"callback": Retina.WidgetInstances.NotebookDashboard[index].nb_select_change
							      });
	
        widget.ver_list = Retina.Renderer.create('listselect', { "target": document.getElementById('version_div'),
								 "data": [],
								 "value": 'id',
								 "filter": ['datetime', 'name', 'created', 'status'],
								 "multiple": false,
								 "no_button": true,
								 "callback": Retina.WidgetInstances.NotebookDashboard[index].nb_version_change
							       });
	
        // populate nb selects
	    widget.nb_select_refresh();
    };
    
    // populate nb listselect with newest version of each notebook, empty version listselect
    widget.nb_select_refresh = function () {

	var index = widget.index;

    // get notebooks from api        
	stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	    Retina.WidgetInstances.NotebookDashboard[index].nb_selected = [];
	    var snbs = Retina.WidgetInstances.NotebookDashboard[index].nb_sort();
            Retina.WidgetInstances.NotebookDashboard[index].nb_list.settings.data = snbs;
            Retina.WidgetInstances.NotebookDashboard[index].nb_list.render();
            Retina.WidgetInstances.NotebookDashboard[index].ver_list.settings.data = [];
            Retina.WidgetInstances.NotebookDashboard[index].ver_list.render();
            jQuery('#dash_head').css('display','inline');
            jQuery('#dash_butt').css('display','inline');
            Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
        });
    };
    
    // populate listselect with versions of selected notebook and update nb_selected
    widget.nb_select_change = function (uuid) {
        var snbs = widget.sorted_nbs[uuid];
        widget.nb_selected = [uuid, snbs[0].id];
        widget.ver_list.settings.data = snbs;
        widget.ver_list.render();
    };
    
    // update nb_selected with selected version
    widget.nb_version_change = function (id) {
        widget.nb_selected[1] = id;
    };
    
    // launch notebook
    // if latest select use its uuid
    // if older version selected fork it: create new shock node with new uuid
    widget.nb_launch_click = function () {
        var sel_nb = widget.nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        var nb_set = widget.sorted_nbs[sel_nb[0]];    
        console.log([sel_nb[1], nb_set[0].id]);
        if (sel_nb[1] == nb_set[0].id) {
            var has_uuid = jQuery('#'+sel_nb[0]);
            if (has_uuid.length > 0) {
                alert('Notebook '+nb_set[0].name+' ('+sel_nb[0]+') is already open');
                return;
            }
            widget.nb_select_refresh();
            widget.ipy_refresh().then(function () {
                widget.nb_create_tab(sel_nb[0], nb_set[0].name);
            });
            return;
        } else {
            for (var i in nb_set) {
                if (nb_set[i].id == sel_nb[1]) {
                    var new_uuid = Retina.uuidv4();
                    var new_name = nb_set[i].name+'_copy';
                    jQuery('#ver_name_old').html(nb_set[i].name );
                    jQuery('#ver_name_new').val(new_name);
                    jQuery('#ver_nb_modal').modal('show');
                    return;
                }
            }
        }
        alert("Error launching notebook. Please try again.");
        widget.nb_select_refresh();
    };

    widget.ver_launch_click = function () {
        var sel_nb   = widget.nb_selected;
        var new_name = jQuery('#ver_name_new').val();
        var new_uuid = widget.uuidv4();
        if (! new_name) {
            alert("Please enter a new name for notebook copy.");
        } else {
            stm.get_objects({"type": "notebook", "id": sel_nb[1]+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                widget.nb_select_refresh();
                widget.ipy_refresh().then(function () {
                    widget.nb_create_tab(new_uuid, new_name);
                });
            });
        }
	return;
    };
    
    widget.new_nb_click = function () {
        var new_uuid = Retina.uuidv4();
        var new_name = jQuery('#new_nb_name').val();
        if (new_name && widget.nb_template) {
	    var index = widget.index;
            stm.get_objects({"type": "notebook", "id": widget.nb_template+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                Retina.WidgetInstances.NotebookDashboard[index].nb_select_refresh();
                Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh().then(function () {
                    Retina.WidgetInstances.NotebookDashboard[index].nb_create_tab(new_uuid, new_name);
		        });
            });
        } else {
            alert("Error creating notebook. Please try again.");
	        Retina.WidgetInstances.NotebookDashboard[index].nb_select_refresh();
        }
    };
    
    widget.del_nb_click = function () {
        var sel_nb = widget.nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        alert("Currently notebook deletion is not supported.");
        jQuery('#del_nb_modal').modal('hide');
        widget.nb_select_refresh();
        widget.ipy_refresh();
    };
    
    widget.nb_create_tab = function (uuid, name) {
        var url = widget.nb_server+'/'+uuid;
        var li_elem  = '<li class="active"><a data-toggle="tab" href="#'+uuid+'_tab">'+name+'</a></li>';
        var div_elem = '<div id="'+uuid+'_tab" class="tab-pane active"><iframe id="'+uuid+'" src="'+url+'" width="95%" height="750">Your Browser does not support iFrames</iframe></div>';
        jQuery('#tab_list').children('.active').removeClass('active');
        jQuery('#tab_div').children('.active').removeClass('active');
        jQuery('#tab_list').append(li_elem);
        jQuery('#tab_div').append(div_elem);
    };
    
    widget.nb_save = function () {
        var curr_iframe = jQuery('#tab_div').children('.active').children('iframe');
        if (curr_iframe.length > 0) {
            widget.ipy_save(curr_iframe[0].id).then(function() {
                widget.ipy_refresh().then(function() {
                    alert("Notebook "+widget.sorted_nbs[curr_iframe[0].id][0].name+" has been saved.");
                });
            });
        } else {
            alert("No notebook is currently selected.");
        }
    },
    
    widget.ipy_save = function (frame) {
        var promise = jQuery.Deferred();
        stm.send_message(frame, 'ipy.notebook_save();', 'action');
        promise.resolve();
        return promise;
    };
    
    widget.ipy_refresh = function () {
        var promise = jQuery.Deferred();
        stm.send_message('ipython_dash', 'ipy.notebook_refresh();', 'action');
        promise.resolve();
        return promise;
    };

    widget.transfer = function (iframe, cell, data, append) {
        var command  = data.replace(/'/g, '"').replace(/"/g, "!!").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
        var ipy_func = append ? 'append_to_cell' : 'write_cell';
    	var ipy_msg  = 'ipy.'+ipy_func+'('+cell+', \''+command+'\');';
    	stm.send_message(iframe, ipy_msg, 'action');
    };
    
    widget.nb_sort = function () {
        var uuid_nbs = {};
        var all_nbs  = stm.DataStore["notebook"];
	
        // create sorted_nbs: { uuid: [nbs with this uuid] }
        for (var id in all_nbs) {
            if ((id == widget.nb_template) || (! all_nbs[id].name)) {
                continue;
            }
            all_nbs[id]['datetime'] = Retina.date_string(all_nbs[id].created);
            var uuid = all_nbs[id].uuid;
            if (uuid in uuid_nbs) {
                uuid_nbs[uuid].push( all_nbs[id] );
            } else {
                uuid_nbs[uuid] = [ all_nbs[id] ];
            }
        }
	
        // sort nbs of same uuid by timestamp
        for (var u in uuid_nbs) {
            uuid_nbs[u].sort( function(a,b) {
                return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
            });
        }

        // set sorted_nbs
        widget.sorted_nbs = uuid_nbs;
        
	// return sorted list of latest nbs
        var latest_nbs = [];
        for (var u in uuid_nbs) {
            latest_nbs.push(uuid_nbs[u][0]);
        }
        latest_nbs.sort( function(a,b) {
            return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
        });
	
        return latest_nbs;
    };
    
    widget.export_visual = function (tried) {
	if (! tried) {
	    stm.send_message('ipython_dash', 'ipy.createHTML();', 'action');
	    setTimeout("Retina.WidgetInstances.NotebookDashboard[0].export_visual(true)", 1000);
	} else {	
	    if (document.getElementById('result').innerHTML == "") {
		alert("There is no content to show.");
	    } else {
		var w = window.open('', '_blank', '');
		w.document.open();
		w.document.write("<html><head><title>Notebook Analysis Result</title><link rel='stylesheet' type='text/css' href='css/bootstrap.min.css'><style>body div { margin-bottom: 30px; }</style></head><body class='container' style='margin-top: 50px;'></body></html>");
		w.document.body.innerHTML = document.getElementById('result').innerHTML;
		w.document.close();
	    }
	}
    };
})();

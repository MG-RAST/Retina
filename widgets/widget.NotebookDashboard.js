(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Notebook Dashboard Widget",
                name: "NotebookDashboard",
		        version: 1,
                author: "Travis Harrison",
                requires: [ ]
                }
    });

    // ipython notebook server ip
    widget.nb_server = 'http://140.221.84.122:8888';
    // shock id of templatenotebook
    widget.nb_template = '79ef9280-12d0-4cb9-9ae0-55d4a77bfa35';
    // current selected notebook [ uuid (notebook), id (shock) ]
    widget.nb_selected = [];
    // dict of notebook uuid: [ notebook_objs ]
    // notebook_objs is list of notebooks with same uuid sorted by datetime (lates first)
    widget.sorted_nbs = {};
    // these are listselect renderers for notebooks, versions, and metagenomes
    widget.nb_list  = undefined;
    widget.ver_list = undefined;
    widget.mg_list  = undefined;

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
    widget.display = function (dash_div, iframe_div) {
        // populate divs with html
	    dash_html = '\
	        <span style="margin-left:10px;"></span>\
	        <button id="nbdash_toggle_button" onclick="this.style.display=\'none\';document.getElementById(\'nb_dash\').style.display=\'\';" style="display:none;margin-left:20px;" type="button" class="btn btn-info">Notebook Dashboard</button>\
            <button id="dataselect_toggle_button" onclick="this.style.display=\'none\';document.getElementById(\'data_pick\').style.display=\'\';Retina.Widget.NotebookDashboard.mg_select_refresh();" style="margin-left:20px;" type="button" class="btn btn-info">Data Selector</button>\
            </div></div>\
	        <div id="nb_dash" style="margin-top: 1px; height: 300px; border-bottom: 1px dotted; border-top: 1px dotted;">\
                <input type="button" id="nbdash_off_button" onclick="document.getElementById(\'nbdash_toggle_button\').style.display=\'\';document.getElementById(\'nb_dash\').style.display=\'none\';" style="border-radius: 0 0 0 0;position: relative; top: 139px; transform: rotate(-90deg); width: 300px; left: -139px; padding-top: 0px;" value="Notebook Dashboard" class="btn btn-info">\
	            <div class="row" id="dash_head" style="display: none;">\
	                <div class="span3 offset1"><h4 style="margin-bottom: 5px;">Select Notebook</h4></div>\
	                <div class="span3 offset1"><h4 style="margin-bottom: 5px;">Select Version</h4></div>\
	            </div><div class="row">\
	                <div id="nb_div" class="span3 offset1"></div>\
	                <div id="version_div" class="span3 offset1"></div>\
	                <div class="span2 offset1"><table id="dash_butt" style="display: none;">\
	                    <tr><td><button type="button" class="btn btn-success" style="width: 135px" onclick="Retina.Widget.NotebookDashboard.nb_launch_click();document.getElementById(\'nbdash_off_button\').click();">Launch Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-warning" style="width: 135px" data-toggle="modal" data-target="#new_nb_modal">New Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-danger" style="width: 135px" data-toggle="modal" data-target="#del_nb_modal">Delete Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-primary" style="width: 135px" onclick="Retina.Widget.NotebookDashboard.nb_save();">Save Notebook</button></td></tr>\
	                    <tr><td><button type="button" class="btn btn-inverse" style="width: 135px" onclick="Retina.Widget.NotebookDashboard.nb_select_refresh();">Refresh Dashboard</button></td></tr>\
	                </table></div>\
	            </div>\
	        </div>\
            <div id="data_pick" style="display: none; height: 300px; margin-top: 1px;border-bottom: 1px dotted; border-top: 1px dotted;">\
                <input type="button" onclick="document.getElementById(\'dataselect_toggle_button\').style.display=\'\';document.getElementById(\'data_pick\').style.display=\'none\';" style="border-radius: 0 0 0 0;position: relative; top: 139px; transform: rotate(-90deg); width: 300px; left: -139px; padding-top: 0px;" value="Data Selector" class="btn btn-info">\
	            <div class="row"><div id="mg_div" class="span5 offset1">\
                    <div class="alert alert-block alert-info" style="position: relative; top: 10px; height: 110px, width: 400px; left: 100px;">\
                        <button type="button" class="close" data-dismiss="alert">×</button>\
                        <h4>Please wait...</h4><p>The data to be displayed is currently loading</p>\
                    </div>\
                </div></div>\
	        </div><div id="new_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Launch New Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Enter name of new notebook:<input id="new_nb_name" style="margin-left:10px;" type="text" value=""></input></p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                    <button class="btn btn-success" data-dismiss="modal" onclick="Retina.Widget.NotebookDashboard.new_nb_click()">Launch</button>\
                </div>\
            </div><div id="del_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Delete Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Do you wish to delete the selected notebook?</p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">No</button>\
                    <button class="btn btn-success" data-dismiss="modal" onclick="Retina.Widget.NotebookDashboard.del_nb_click()">Yes</button>\
                </div>\
            </div><div id="ver_nb_modal" class="modal hide fade" role="dialog">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Copy Notebook</h3>\
                </div><div class="modal-body">\
                    <p>Enter name for copy of notebook \'<span id=ver_name_old></span>\':<input id="ver_name_new" style="margin-left:10px;" type="text" value=""></input></p>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                    <button class="btn btn-success" data-dismiss="modal" aria-hidden="true">Launch</button>\
                </div>\
            </div>';
        iframe_html = '<div class="tabbable" style="margin-top: 15px; margin-left: 15px;">\
            <ul id="tab_list" class="nav nav-tabs"><li class="hide"><a data-toggle="tab" href="#hidden_dash">Ipython Dashboard</a></li></ul>\
            <div id="tab_div" class="tab-content"><div id="hidden_dash" class="tab-pane hide"><iframe id="ipython_dash" src="'+widget.nb_server+'" width="95%" height="750"></iframe></div>\
            </div>';
        jQuery('#'+dash_div).html(dash_html);
        jQuery('#'+iframe_div).html(iframe_html);
        // create empty renderers
        widget.nb_list =
            Retina.Renderer.create('listselect', { "target": document.getElementById('nb_div'),
                                                   "data": [],
                                                   "value": 'uuid',
                                                   "filter": ['name', 'datetime', 'created', 'status'],
                                                   "multiple": false,
                                                   "no_button": true,
                                                   "callback": widget.nb_select_change
                                                });
        widget.ver_list =
            Retina.Renderer.create('listselect', { "target": document.getElementById('version_div'),
                                                   "data": [],
                                                   "value": 'id',
                                                   "filter": ['datetime', 'name', 'created', 'status'],
                                                   "multiple": false,
                                                   "no_button": true,
                                                   "callback": widget.nb_version_change
                                                });
        widget.mg_list =
            Retina.Renderer.create('listselect', { "target": document.getElementById('mg_div'),
                                                   "data": [],
                                                   "value": 'id',
                                                   "filter": ['name', 'id', 'created', 'status'],
                                                   "multiple": true,
                                                   "sort": true,
                                                   "callback": widget.mg_populate
                                                });
        // populate nb selects
        widget.nb_select_refresh();
    };

    // populate mg listselect if datastore empty
    widget.mg_select_refresh = function () {
        // get mgs from api
        if ((! stm.DataStore["metagenome"]) || (stm.DataStore["metagenome"].length = 0)) {
            stm.get_objects({"type": "metagenome", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
                var mg_data = [];
                for (id in stm.DataStore["metagenome"]) {
                    mg_data.push( stm.DataStore["metagenome"][id] );
                }
                console.log(mg_data.length);
        	    widget.mg_list.settings.data = mg_data;
        	    widget.mg_list.render();
        	});
        }
    };

    // populate nb listselect with newest version of each notebook, empty version listselect
    widget.nb_select_refresh = function () {
        // get notebooks from api        
	    stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	        widget.nb_selected = [];
	        var snbs = widget.nb_sort();
            widget.nb_list.settings.data = snbs;
            widget.nb_list.render();
            widget.ver_list.settings.data = [];
            widget.ver_list.render();
            jQuery('#dash_head').css('display','inline');
            jQuery('#dash_butt').css('display','inline');
            widget.ipy_refresh();
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

    // add selected mgs to open notebook
    widget.mg_populate = function (mgs) {
        console.log(mgs);
        var curr_tab = jQuery('#tab_div').children('.active').children('iframe');
        if (curr_tab.length > 0) {
            var command = "# user selected metagenomes\nmetagenome_ids = ['"+mgs.join("','")+"']";
            widget.transfer(curr_tab[0].id, 'undefined', command, undefined);
        }
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
        if (sel_nb[1] == nb_set[0].id) {
            var has_uuid = jQuery('#'+sel_nb[0]);
            if (has_uuid.length > 0) {
                alert('Notebook '+nb_set[0].name+' ('+sel_nb[0]+') is already open');
                return;
            }
            widget.nb_create_tab(sel_nb[0], nb_set[0].name);
            widget.nb_select_refresh();
            return;
        } else {
            for (var i in nb_set) {
                if (nb_set[i].id == sel_nb[1]) {
                    var new_uuid = widget.uuidv4();
                    var new_name = nb_set[i].name+'_copy';
                    jQuery('#ver_name_old').html(nb_set[i].name );
                    jQuery('#ver_name_new').val(new_name);
                    jQuery('#ver_nb_modal').modal('show');
                    new_name = jQuery('#ver_name_new').val();
                    if (! new_name) {
                        alert("Please enter a new name for notebook copy.");
                        return;
                    } else {
                        stm.get_objects({"type": "notebook", "id": nb_set[i].id+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                            widget.ipy_refresh();
                            widget.nb_create_tab(new_uuid, new_name);
                            widget.nb_select_refresh();
                            return;
                        });
                    }
                }
            }
        }
        alert("Error launching notebook. Please try again.");
        widget.nb_select_refresh();
        return;
    };

    widget.new_nb_click = function () {
        var new_uuid = widget.uuidv4();
        var new_name = jQuery('#new_nb_name').val();
        if (new_name && widget.nb_template) {
            stm.get_objects({"type": "notebook", "id": widget.nb_template+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                widget.ipy_refresh();
                widget.nb_create_tab(new_uuid, new_name);
                widget.nb_select_refresh();
            });
        } else {
            alert("Error creating notebook. Please try again.");
            widget.nb_select_refresh();
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
    };

    widget.nb_create_tab = function (uuid, name) {
        var url = widget.nb_server+'/'+uuid;
        console.log(url);
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
            stm.send_message(curr_iframe[0].id, 'ipy.notebook_save();', 'action');
            widget.ipy_refresh();
            alert("Notebook "+widget.sorted_nbs[curr_iframe[0].id][0].name+" has been saved.");
        } else {
            alert("No notebook is currently selected.")
        }
    };
    
    widget.ipy_refresh = function () {
        stm.send_message('ipython_dash', 'ipy.notebook_refresh();', 'action').then(function () {
            return;
        });
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
            all_nbs[id]['datetime'] = widget.date_string(all_nbs[id].created);
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
    
    // get date string from ISO8601 timestamp
    widget.date_string = function (timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleString();
    };
    
    // awsome code i found to produce RFC4122 complient UUID v4
    widget.uuidv4 = function(a,b) {
        for (b=a=''; a++<36; b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
        return b;
    };

})();

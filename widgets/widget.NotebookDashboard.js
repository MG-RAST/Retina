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
    // list of filterable notebook attributes
    widget.nb_filter = ['name', 'datetime', 'created', 'status'];
    // current selected notebook [ uuid (notebook), id (shock) ]
    widget.nb_selected = [];
    // dict of notebook uuid: [ notebook_objs ]
    // notebook_objs is list of notebooks with same uuid sorted by datetime (lates first)
    widget.sorted_nbs = {};

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
        jQuery('#'+dash_div).html('<div class="alert alert-block alert-info" style="position: relative; top: 50px; width: 400px; left: 100px;">\
        <button type="button" class="close" data-dismiss="alert">×</button>\
        <h4>Please wait...</h4><p>The data to be displayed is currently loading.</p>\
        </div>');
	    stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	        Retina.Widget.NotebookDashboard.nb_selected = [];
	        Retina.Widget.NotebookDashboard.nb_sort();
            // create space for select lists and buttons
	        dash_html = '<div class="row">\
	            <div id="nb_div" class="span3 offset1"></div>\
	            <div id="version_div" class="span3 offset1"></div>\
	            <div class="span2 offset1"><table>\
	                <tr><td><button type="button" class="btn btn-success" onclick="Retina.Widget.NotebookDashboard.nb_launch_click()">Launch Notebook</button></td></tr>\
	                <tr><td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#new_nb_modal">New Notebook</button></td></tr>\
	                <tr><td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#del_nb_modal">Delete Notebook</button></td></tr>\
	            </table></div></div>\
	            <div id="new_nb_modal" class="modal hide fade" role="dialog">\
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
            jQuery('#'+dash_div).html(dash_html);
            // create tabs for iframe
            if (iframe_div) {
                iframe_html = '<div class="tabbable" style="margin-top: 15px; margin-left: 10px;">\
        		        <ul id="tab_list" class="nav nav-tabs"></ul>\
        		        <div id="tab_div" class="tab-content"></div>\
        		        </div>';
                jQuery('#'+iframe_div).html(iframe_html);
            } else {
                jQuery('#'+dash_div).collapse();
            }
            // populate selects
            Retina.Widget.NotebookDashboard.nb_select_init();
        });
    };

    // populate first select list with newest version of each notebook
    widget.nb_select_init = function () {
        var snbs = [];
        for (var uuid in Retina.Widget.NotebookDashboard.sorted_nbs) {
            snbs.push(Retina.Widget.NotebookDashboard.sorted_nbs[uuid][0]);
        }
        snbs.sort( function(a,b) {
            return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
        });
        Retina.Renderer.listselect.render( { "target": document.getElementById('nb_div'),
                                             "data": snbs,
                                             "value": 'uuid',
                                             "label": 'name',
                                             "filter": Retina.Widget.NotebookDashboard.nb_filter,
                                             "multiple": false,
                                             "callback": Retina.Widget.NotebookDashboard.nb_select_change
                                        });
    };

    // populate second select list with versions of selected notebook and update nb_selected
    widget.nb_select_change = function (uuid) {
        var snbs = Retina.Widget.NotebookDashboard.sorted_nbs[uuid];
        Retina.Widget.NotebookDashboard.nb_selected = [uuid, snbs[0].id];
        Retina.Renderer.listselect.render( { "target": document.getElementById('version_div'),
                                             "data": snbs,
                                             "value": 'id',
                                             "label": 'datetime',
                                             "filter": Retina.Widget.NotebookDashboard.nb_filter,
                                             "multiple": false,
                                             "callback": Retina.Widget.NotebookDashboard.nb_version_change
                                        });
        console.log(Retina.Widget.NotebookDashboard.nb_selected);
    };
    
    // update nb_selected with selected version
    widget.nb_version_change = function (id) {
        Retina.Widget.NotebookDashboard.nb_selected[1] = id;
        console.log(Retina.Widget.NotebookDashboard.nb_selected);
    };
    
    // launch notebook
    // if latest select use its uuid
    // if older version selected fork it: create new shock node with new uuid
    widget.nb_launch_click = function () {
        var sel_nb = Retina.Widget.NotebookDashboard.nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        var nb_set = Retina.Widget.NotebookDashboard.sorted_nbs[sel_nb[0]];
        
        if (sel_nb[1] == nb_set[0].id) {
            var has_uuid = jQuery('#'+sel_nb[0]);
            if (has_uuid.length > 0) {
                alert('Notebook '+nb_set[0].name+' ('+sel_nb[0]+') is already open');
                return;
            }
            console.log({"uuid": sel_nb[0], "name": nb_set[0].name});
            Retina.Widget.NotebookDashboard.nb_create_tab(sel_nb[0], nb_set[0].name);
            Retina.Widget.NotebookDashboard.display("nb_dash", null);
            return;
        } else {
            for (var i in nb_set) {
                if (nb_set[i].id == sel_nb[1]) {
                    var new_uuid = Retina.Widget.NotebookDashboard.uuidv4();
                    var new_name = nb_set[i].name+'_copy';
                    jQuery('#ver_name_old').html(nb_set[i].name );
                    jQuery('#ver_name_new').val(new_name);
                    jQuery('#ver_nb_modal').modal('show');
                    new_name = jQuery('#ver_name_new').val();
                    if (! new_name) {
                        alert("Please enter a new name for notebook copy.");
                        return;
                    } else {
                        console.log({"type": "notebook", "id": nb_set[i].id+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}});
                        return;
                        stm.get_objects({"type": "notebook", "id": nb_set[i].id+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                            Retina.Widget.NotebookDashboard.nb_create_tab(new_uuid, new_name);
                            Retina.Widget.NotebookDashboard.display("nb_dash", null);
                            return;
                        });
                    }
                }
            }
        }
        alert("Error launching notebook. Please try again.");
        Retina.Widget.NotebookDashboard.display("nb_dash", null);
        return;
    };

    widget.new_nb_click = function () {
        var new_uuid = Retina.Widget.NotebookDashboard.uuidv4();
        var new_name = jQuery('#new_nb_name').val();
        if (new_name && Retina.Widget.NotebookDashboard.nb_template) {
            stm.get_objects({"type": "notebook", "id": Retina.Widget.NotebookDashboard.nb_template+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                Retina.Widget.NotebookDashboard.nb_create_tab(new_uuid, new_name);
                Retina.Widget.NotebookDashboard.display("nb_dash", null);
            });
        } else {
            alert("Error creating notebook. Please try again.");
            Retina.Widget.NotebookDashboard.display("nb_dash", null);
        }
    };
    
    widget.del_nb_click = function () {
        var sel_nb = Retina.Widget.NotebookDashboard.nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        alert("Currently notebook deletion is not supported.");
    }

    widget.nb_create_tab = function (uuid, name) {
        var url = Retina.Widget.NotebookDashboard.nb_server+'/'+uuid;
        console.log(url);
        var li_elem  = '<li class="active"><a data-toggle="tab" href="#'+uuid+'">'+name+'</a></li>';
        var div_elem = '<div id="'+uuid+'" class="tab-pane active"><iframe id="'+uuid+'_notebook" src="'+url+'" width="935" height="750">Your Browser does not support iFrames</iframe></div>';
        jQuery('#tab_list').children('.active').removeClass('active');
        jQuery('#tab_div').children('.active').removeClass('active');
        jQuery('#tab_list').append(li_elem);
        jQuery('#tab_div').append(div_elem);
    };

    widget.nb_sort = function () {
        var uuid_nbs = {};
        var all_nbs  = stm.DataStore["notebook"];
        for (var id in all_nbs) {
            if (id == Retina.Widget.NotebookDashboard.nb_template) {
                continue;
            }
            all_nbs[id].datetime = Retina.Widget.NotebookDashboard.date_string(all_nbs[id].created);
            var uuid = all_nbs[id].uuid;
            if (uuid in uuid_nbs) {
                uuid_nbs[uuid].push( all_nbs[id] );
            } else {
                uuid_nbs[uuid] = [ all_nbs[id] ];
            }
        }
        for (var u in uuid_nbs) {
            uuid_nbs[u].sort( function(a,b) {
                return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
            });
        }
        Retina.Widget.NotebookDashboard.sorted_nbs = uuid_nbs;
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

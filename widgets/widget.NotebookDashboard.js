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
    widget.nb_template = '';
    // list of filterable notebook attributes
    widget.nb_filter = ['name', 'created', 'public'];
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
	    stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	        Retina.Widget.NotebookDashboard.nb_sort();
            // create space for select lists and buttons
	        dash_html = '<div class="row">\
	            <div id="nb_div" class="span3 offset1"></div>\
	            <div id="version_div" class="span2"></div>\
	            <div class="span4 offset2"><div class="btn-group">\
	                <button type="button" class="btn btn-primary" onclick="Retina.Widget.NotebookDashboard.nb_launch_click()">Launch Notebook</button>\
	                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#new_nb_modal">New Notebook</button>\
	            </div></div></div>\
	            <div id="new_nb_modal" class="modal hide fade" role="dialog">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                        <h3>Launch New Notebook</h3>\
                    </div><div class="modal-body">\
                        <p>Enter name of new notebook:<input id="new_nb_name" style="margin-left:10px;" type="text" value=""></input></p>\
                    </div><div class="modal-footer">\
                        <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                        <button class="btn btn-primary" data-dismiss="modal" onclick="Retina.Widget.NotebookDashboard.new_nb_click()">Launch</button>\
                    </div>\
                </div>';
            jQuery('#'+dash_div).html(dash_html);
            // create tabs for iframe
            if (iframe_div) {
                iframe_html = '<div class="tabbable" style="margin-top: 15px;">\
        		        <ul id="tab_list" class="nav nav-tabs"></ul>\
        		        <div id="tab_div" class="tab-content"></div>\
        		        </div>';
                jQuery('#'+iframe_div).html(iframe_html);
            }
            // populate selects
            Retina.Widget.NotebookDashboard.nb_select_init();
        });
    };

    // populate first select list with newest version of each notebook
    widget.nb_select_init = function () {
        var html = '<select id="nb_select" onchange="Retina.Widget.NotebookDashboard.nb_select_change()"><option value="">Select Notebook ...</option>';
        var snbs = [];
        for (var uuid in Retina.Widget.NotebookDashboard.sorted_nbs) {
            snbs.push(Retina.Widget.NotebookDashboard.sorted_nbs[uuid][0]);
        }
        snbs.sort( function(a,b) {
            return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
        });
        for (var nb in snbs) {
            var date = new Date(snbs[nb].created);
            html += '<option value="'+snbs[nb].uuid+'">'+snbs[nb].name+' ('+date.toLocaleString()+')</option>';
        }
        html += '</select>';
        //jQuery('#nb_div').html(html);
        //jQuery("#nb_select").selectBoxIt({showFirstOption: false});
        
        Retina.Renderer.listselect.render( { "target": document.getElementById('nb_div'),
                                             "data": snbs,
                                             "value": 'id',
                                             "label": 'name',
                                             "filter": Retina.Widget.NotebookDashboard.nb_filter,
                                             "multiple": false,
                                             "callback": Retina.Widget.NotebookDashboard.nb_select_change
                                        });
        
        jQuery('#version_div').html('<select id="version_select"><option value="">Select Version ...</option></select>');
        jQuery("#version_select").selectBoxIt();
    };

    // populate second select list with versions of selected notebook
    widget.nb_select_change = function (uuid) {
        var html = '<select id="version_select"><option value="">Select Version ...</option>';
        var snbs = Retina.Widget.NotebookDashboard.sorted_nbs[uuid];
        for (var nb in snbs) {
            var date = new Date(snbs[nb].created);
            html += '<option value="'+nb+'">'+snbs[nb].name+' ('+date.toLocaleString()+')</option>';
        }
        html += '</select>';
        jQuery('#version_div').html(html);
        jQuery("#version_select").selectBoxIt({showFirstOption: false});
    };

    // launch notebook
    // if latest select use its uuid
    // if older version selected fork it: create new shock node with new uuid
    widget.nb_launch_click = function () {
        var nsel_uuid = jQuery('#nb_select').val();
        var vsel_pos  = jQuery('#version_select').val();
        if (! nsel_uuid) {
            return;
        }
        if (! vsel_pos) {
            vsel_pos = '0';
        }
        var curr_name = Retina.Widget.NotebookDashboard.sorted_nbs[nsel_uuid][vsel_pos].name;
        if (vsel_pos == '0') {
            var has_uuid = jQuery('#'+nsel_uuid);
            if (has_uuid.length > 0) {
                alert('Notebook '+curr_name+' ('+nsel_uuid+') is already open');
                return;
            }
            Retina.Widget.NotebookDashboard.nb_create_tab(nsel_uuid, curr_name);
            Retina.Widget.NotebookDashboard.display("nb_dash", null);
        } else {
            var date = new Date(Retina.Widget.NotebookDashboard.sorted_nbs[nsel_uuid][vsel_pos].created);
            var new_name = curr_name+' ('+date.toLocaleString()+')';
            var old_id   = Retina.Widget.NotebookDashboard.sorted_nbs[nsel_uuid][vsel_pos].id;
            var new_uuid = Retina.Widget.NotebookDashboard.uuidv4();
            stm.get_objects({"type": "notebook", "id": old_id+'/'+new_uuid, "options": {"verbosity": "minimal"}}).then(function () {
                Retina.Widget.NotebookDashboard.nb_create_tab(new_uuid, new_name);
                Retina.Widget.NotebookDashboard.display("nb_dash", null);
            });
        }
    };

    widget.new_nb_click = function () {
        var new_uuid = Retina.Widget.NotebookDashboard.uuidv4();
        var new_name = jQuery('#new_nb_name').val();
        if (new_name && Retina.Widget.NotebookDashboard.nb_template) {
            stm.get_objects({"type": "notebook", "id": Retina.Widget.NotebookDashboard.nb_template+'/'+new_uuid, "options": {"verbosity": "minimal"}}).then(function () {
                Retina.Widget.NotebookDashboard.nb_create_tab(new_uuid, new_name);
                Retina.Widget.NotebookDashboard.display("nb_dash", null);
            });
        }
    };

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
    
    // awsome code i found to produce RFC4122 complient UUID v4
    widget.uuidv4 = function(a,b) {
        for (b=a=''; a++<36; b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
        return b;
    };

})();

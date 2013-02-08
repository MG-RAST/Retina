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
    widget.nb_template = 'ae9f993e-f8d2-4317-9bdd-70e815029668';
    
    // current selected notebook [ uuid (notebook), id (shock) ]
    widget.nb_selected = [];
    
    // dict of notebook uuid: [ notebook_objs ]
    // notebook_objs is list of notebooks with same uuid sorted by datetime (latest first)
    widget.sorted_nbs = {};

    // these are listselect renderers for notebooks, versions, and metagenomes
    widget.nb_primary_list = undefined;
    widget.nb_copy_list = undefined;
    widget.nb_ver_list = undefined;

    // this will be called by Retina automatically to initialize the widget
    // note that the display function will not be called until this is finished
    // you can add functions that return promises to the return list, i.e.:
    // this.loadRenderer('table')
    // which would make the table renderer available to use before the display function is called
    // you can add multiple comma separated promises
    widget.setup = function () {
	window.addEventListener("message", stm.receiveMessage, false);
	return [ Retina.add_renderer({"name": "listselect", "resource": "renderers/", "filename": "renderer.listselect.js"}),
		 this.loadRenderer('listselect') ];
    };
    
    // this will be called whenever the widget is displayed
    // the params should at least contain a space in the DOM for the widget to render to
    // if the widget is visual
    widget.display = function (params) {
	widget = this;
	var index = widget.index;
	var dash_div = params.target;
	var iframe_div = params.notebook;
	var dash_html = '\
	        <button style="width: 150px; width: 150px; position: absolute; top: 60px; right: 55px;" data-toggle="button" onclick="if(this.className==\'btn\'){document.getElementById(\'data_pick\').style.display=\'\';}else{document.getElementById(\'data_pick\').style.display=\'none\';}" type="button" class="btn">Analysis Builder</button>\
            <button class="btn btn-success" onclick="Retina.WidgetInstances.NotebookDashboard['+index+'].export_visual('+index+');" title="show results in new window" style="position: absolute; top: 60px; right: 10px;"><i class="icon-eye-open icon-white"></i></button>\
            <div id="data_pick" style="display: none; height: 395px; margin-top: 5px;">\
	            <div id="data_selector_div"></div>\
	        </div>\
	        <div id="result" style="display: none;"><h3 style="position: relative; top: 200px; left: 25%;">your analysis currently has no results</h3></div>\
\
	        <div id="loginModal" class="modal show fade" tabindex="-1" style="width: 400px;" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">\
	          <div class="modal-header">\
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="jQuery(\'#nb_select_modal\').modal(\'show\');">×</button>\
	            <h3 id="loginModalLabel">Authenticate to KBase</h3>\
	          </div>\
	          <div class="modal-body">\
	            <p>Enter your KBase credentials.</p>\
                    <div id="failure"></div>\
                    <table>\
                      <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">login</th><td><input type="text" id="login"></td></tr>\
                      <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">password</th><td><input type="password" id="password"></td></tr>\
                    </table>\
	          </div>\
	          <div class="modal-footer">\
	            <button class="btn btn-danger pull-left" data-dismiss="modal" aria-hidden="true" onclick="jQuery(\'#nb_select_modal\').modal(\'show\');">cancel</button>\
	            <button class="btn btn-success" onclick="Retina.WidgetInstances.NotebookDashboard[0].perform_login('+index+');">log in</button>\
	          </div>\
	        </div>\
\
	        <div id="msgModal" class="modal hide fade" tabindex="-1" style="width: 400px;" role="dialog" aria-labelledby="msgModalLabel" aria-hidden="true">\
	          <div class="modal-header">\
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="jQuery(\'#nb_select_modal\').modal(\'show\');">×</button>\
	            <h3 id="msgModalLabel">Login Information</h3>\
	          </div>\
	          <div class="modal-body">\
	            <p>You have successfully logged in.</p>\
	          </div>\
	          <div class="modal-footer">\
	            <button class="btn btn-success" aria-hidden="true" data-dismiss="modal" onclick="jQuery(\'#nb_select_modal\').modal(\'show\');">OK</button>\
	          </div>\
	        </div>\
\
	        <div id="nb_select_modal" class="modal show fade" tabindex="-1" role="dialog" style="width: 590px; margin: -250px 0 0 -295px;">\
                <div class="modal-header">\
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                    <h3>Notebook Selector</h3>\
                </div><div class="modal-body">\
                    <div class="tabbable">\
                        <ul class="nav nav-tabs">\
                            <li class="active"><a data-toggle="tab" href="#new_nb_tab">Create New</a></li>\
                            <li><a data-toggle="tab" href="#start_nb_tab">Open Existing</a></li>\
                            <li><a data-toggle="tab" href="#copy_nb_tab">Copy Existing</a></li>\
                        </ul>\
                        <div class="tab-content">\
                            <div id="new_nb_tab" class="tab-pane active">\
                                Enter name of new notebook:\
                                <input id="new_nb_name" style="margin-left:10px;" type="text" value=""></input>\
                                <div style="float:right;"><button class="btn btn-success" onclick="Retina.WidgetInstances.NotebookDashboard['+index+'].new_nb_click('+index+');">Launch</button></div>\
                            </div>\
                            <div id="start_nb_tab" class="tab-pane">\
                                <div class="row">\
                                    <div id="nb_primary_div" class="span2"></div>\
                                    <div id="nb_primary_tbl" class="span3"></div>\
                                </div>\
                                <div style="float:right;"><button class="btn btn-success" style="margin-left:20px;margin-bottom:10px;" onclick="Retina.WidgetInstances.NotebookDashboard['+index+'].nb_launch_click('+index+');">Launch</button></div>\
                            </div>\
                            <div id="copy_nb_tab" class="tab-pane">\
                                <div class="row">\
                                    <div id="nb_copy_div" class="span2"></div>\
                                    <div id="version_div" class="span2"></div>\
                                </div>\
                                <br>Enter name for copy:\
                                <input id="new_copy_name" style="margin-left:10px;" type="text" value=""></input>\
                                <div style="float:right;"><button class="btn btn-success" style="margin-left:20px;margin-bottom:10px;" onclick="Retina.WidgetInstances.NotebookDashboard['+index+'].copy_launch_click('+index+');">Launch</button></div>\
                            </div>\
                        </div>\
                    </div>\
                </div><div class="modal-footer">\
                    <button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cancel</button>\
                </div>\
            </div>';
        var iframe_html = '<div class="tabbable" style="margin-top: 15px; margin-left: 15px;" id="ipython_iframe">\
            <ul id="tab_list" class="nav nav-tabs">\
                <li class="hide"><a data-toggle="tab" href="#hidden_dash">IPython</a></li>\
                <li id="selector_tab" class="show"><a href="#" onclick="Retina.WidgetInstances.NotebookDashboard['+index+'].select_nb_click('+index+');"><i class="icon-plus"></i></a></li>\
            </ul>\
            <div id="tab_div" class="tab-content"><div id="hidden_dash" class="tab-pane hide"><iframe id="ipython_dash" src="'+widget.nb_server+'" width="95%" height="750"></iframe></div>\
            </div>';
        jQuery('#'+dash_div).html(dash_html);
        jQuery('#'+iframe_div).html(iframe_html);
	
	    Retina.Widget.create('VisualPython', { target: document.getElementById('data_selector_div') });
	
	    // create empty renderers
        widget.nb_primary_list = Retina.Renderer.create('listselect', { "target": document.getElementById('nb_primary_div'),
									"data": [],
									"value": 'uuid',
									"filter": ['name', 'datetime', 'created', 'status'],
									"multiple": false,
									"no_button": true,
									"callback": Retina.WidgetInstances.NotebookDashboard[index].display_nb_info
								      });
	
        widget.nb_copy_list = Retina.Renderer.create('listselect', { "target": document.getElementById('nb_copy_div'),
								     "data": [],
								     "value": 'uuid',
								     "filter": ['name', 'datetime', 'created', 'status'],
								     "multiple": false,
								     "no_button": true,
								     "callback": Retina.WidgetInstances.NotebookDashboard[index].nb_select_change
								   });					      
	
        widget.nb_ver_list = Retina.Renderer.create('listselect', { "target": document.getElementById('version_div'),
								    "data": [],
								    "value": 'id',
								    "filter": ['datetime', 'name', 'created', 'status'],
								    "multiple": false,
								    "no_button": true,
								    "callback": Retina.WidgetInstances.NotebookDashboard[index].nb_version_change
								  });
	    // populate nb selects
        widget.nb_select_refresh(index);
        jQuery('#loginModal').modal('show');
    };
    
    // populate nb listselect with newest version of each notebook, empty version listselect
    widget.nb_select_refresh = function (index) {
        // get notebooks from api    
	stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	    Retina.WidgetInstances.NotebookDashboard[index].nb_selected = [];
	    var snbs = Retina.WidgetInstances.NotebookDashboard[index].nb_sort(index);
            Retina.WidgetInstances.NotebookDashboard[index].nb_primary_list.settings.data = snbs;
            Retina.WidgetInstances.NotebookDashboard[index].nb_primary_list.render();
            Retina.WidgetInstances.NotebookDashboard[index].nb_copy_list.settings.data = snbs;
            Retina.WidgetInstances.NotebookDashboard[index].nb_copy_list.render();
            Retina.WidgetInstances.NotebookDashboard[index].nb_ver_list.settings.data = [];
            Retina.WidgetInstances.NotebookDashboard[index].nb_ver_list.render();
            Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
        });
    };
    
    // display notebook metadata
    widget.display_nb_info = function (uuid) {
        var snbs = widget.sorted_nbs[uuid];
        widget.nb_selected = [uuid, snbs[0].id];
        var html = '\
            <table class="table table-striped table-condensed">\
                <tr><td>Name</td><td>'+snbs[0].name+'</td></tr>\
                <tr><td>Last Modified</td><td>'+snbs[0].datetime+'</td></tr>\
                <tr><td>Status</td><td>'+snbs[0].status+'</td></tr>\
                <tr><td>ID</td><td>'+snbs[0].uuid+'</td></tr>\
                <tr><td>Description</td><td>example notebook</td></tr>\
            </table>';
        jQuery('#nb_primary_tbl').html(html);
    };
    
    // populate listselect with versions of selected notebook and update nb_selected
    widget.nb_select_change = function (uuid) {
        var snbs = widget.sorted_nbs[uuid];
        widget.nb_selected = [uuid, snbs[0].id];
        widget.nb_ver_list.settings.data = snbs;
        widget.nb_ver_list.render();
        jQuery('#new_copy_name').val(snbs[0].name+" copy");
    };
    
    // update nb_selected with selected version
    widget.nb_version_change = function (id) {
        widget.nb_selected[1] = id;
    };
    
    widget.select_nb_click = function (index) {
        Retina.WidgetInstances.NotebookDashboard[index].nb_select_refresh(index);
        Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
        jQuery('#nb_select_modal').modal('show');
    };
    
    // launch latest notebook
    widget.nb_launch_click = function (index) {
        var sel_nb = Retina.WidgetInstances.NotebookDashboard[index].nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        var this_nb  = Retina.WidgetInstances.NotebookDashboard[index].sorted_nbs[sel_nb[0]][0];
        var has_uuid = jQuery('#'+this_nb.uuid);
        if (has_uuid.length > 0) {
            alert('Notebook '+this_nb.name+' ('+this_nb.uuid+') is already open');
            return;
        }
        Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
        setTimeout("Retina.WidgetInstances.NotebookDashboard["+index+"].nb_create_tab("+index+",'"+this_nb.uuid+"','"+this_nb.name+"')", 1000);
        jQuery('#nb_select_modal').modal('hide');
    };

    widget.copy_launch_click = function (index) {
        var sel_nb = Retina.WidgetInstances.NotebookDashboard[index].nb_selected;
        if (sel_nb.length == 0) {
            alert("No notebook is selected");
            return;
        }
        var new_name = jQuery('#new_copy_name').val();
        var new_uuid = Retina.uuidv4();
        if (! new_name) {
            alert("Please enter a new name for notebook copy.");
        } else {
            stm.get_objects({"type": "notebook", "id": sel_nb[1]+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
                setTimeout("Retina.WidgetInstances.NotebookDashboard["+index+"].nb_create_tab("+index+",'"+new_uuid+"','"+new_name+"')", 1000);
                jQuery('#nb_select_modal').modal('hide');
            });
        }
    };
    
    widget.new_nb_click = function (index) {
        var new_name = jQuery('#new_nb_name').val();
        var new_uuid = Retina.uuidv4();
        if (! new_name) {
            alert("Please enter a name for new notebook.");
        } else if (! Retina.WidgetInstances.NotebookDashboard[index].nb_template) {
            alert("Error creating notebook. Please try again.");
        } else {
            stm.get_objects({"type": "notebook", "id": Retina.WidgetInstances.NotebookDashboard[index].nb_template+'/'+new_uuid, "options": {"verbosity": "minimal", "name": new_name}}).then(function () {
                Retina.WidgetInstances.NotebookDashboard[index].ipy_refresh();
                setTimeout("Retina.WidgetInstances.NotebookDashboard["+index+"].nb_create_tab("+index+",'"+new_uuid+"','"+new_name+"')", 1000);
                jQuery('#nb_select_modal').modal('hide');
                document.getElementById('data_pick').style.display='';
            });
        }
    };

    widget.nb_create_tab = function (index, uuid, name) {
        // create html
        var url = Retina.WidgetInstances.NotebookDashboard[index].nb_server+'/'+uuid;
        var li_elem  = '<li class="active" id="'+uuid+'_li"><a data-toggle="tab" href="#'+uuid+'_tab">'+name+'<i class="icon-remove" onclick="if(confirm(\'really close this notebook?\')){Retina.WidgetInstances.NotebookDashboard['+index+'].nb_close_tab(\''+uuid+'\');}" style="position: relative; left: 5px; bottom: 4px;"></a></li>';
        var div_elem = '<div id="'+uuid+'_tab" class="tab-pane active"><iframe id="'+uuid+'" src="'+url+'" width="95%" height="750">Your Browser does not support iFrames</iframe></div>';
        // add tab
        jQuery('#tab_list').children('.active').removeClass('active');
        jQuery('#tab_div').children('.active').removeClass('active');
        jQuery('#selector_tab').before(li_elem);
        jQuery('#tab_div').append(div_elem);
        setTimeout("Retina.WidgetInstances.NotebookDashboard["+index+"].nb_init("+index+", '"+uuid+"')", 3000);
    };

    widget.nb_close_tab = function (uuid) {
        stm.send_message(uuid, 'ipy.notebook_terminate();', 'action');
        setTimeout("jQuery('#"+uuid+"_tab').remove();jQuery('#"+uuid+"_li').remove();", 1000);
    };

    widget.nb_init = function (index, iframe_id) {
        stm.send_message(iframe_id, 'IPython.notebook.select(0);IPython.notebook.execute_selected_cell();', 'action');
        Retina.WidgetInstances.NotebookDashboard[index].send_auth(iframe_id, stm.Authorization);
    };

    widget.ipy_refresh = function () {
        stm.send_message('ipython_dash', 'IPython.notebook_list.load_list();', 'action');
    };

    widget.transfer = function (iframe, cell, data, append) {
        var command  = data.replace(/'/g, '"').replace(/"/g, "!!").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
        var ipy_func = append ? 'append_to_cell' : 'write_cell';
    	var ipy_msg  = 'ipy.'+ipy_func+'('+cell+', \''+command+'\');';
    	stm.send_message(iframe, ipy_msg, 'action');
    };

    widget.nb_sort = function (index) {
        var uuid_nbs = {};
        var all_nbs  = stm.DataStore["notebook"];
        // create sorted_nbs: { uuid: [nbs with this uuid] }
        for (var id in all_nbs) {
            if ((id == Retina.WidgetInstances.NotebookDashboard[index].nb_template) || (! all_nbs[id].name)) {
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
        var latest_nbs = [];
        for (var u in uuid_nbs) {
            uuid_nbs[u].sort( function(a,b) {
                return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
            });
            latest_nbs.push(uuid_nbs[u][0]);
        }
        // set sorted_nbs
        Retina.WidgetInstances.NotebookDashboard[index].sorted_nbs = uuid_nbs;
	    // return sorted list of latest nbs
        latest_nbs.sort( function(a,b) {
            return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);
        });
        return latest_nbs;
    };

    widget.export_visual = function (index, tried) {
	if (! tried) {
	    var curr_iframe = jQuery('#tab_div').children('.active').children('iframe');
	    var iframe_id = curr_iframe[0].id;
	    stm.send_message(iframe_id, 'ipy.createHTML();', 'action');
	    setTimeout("Retina.WidgetInstances.NotebookDashboard["+index+"].export_visual("+index+", true)", 1000);
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

    widget.send_auth = function (iframe_id, auth) {
        if (auth) {
            var uname = auth.substr(3, auth.indexOf('|') - 3);
            stm.send_message(iframe_id, 'IPython.notebook.kernel.execute("Ipy.auth=\''+auth+'\'; Ipy.username=\''+uname+'\'", {}, {});' , 'action');
        } else {
            stm.send_message(iframe_id, 'IPython.notebook.kernel.execute("Ipy.auth=None; Ipy.username=None", {}, {});' , 'action');
        }
    };

    widget.perform_login = function (index) {
	    var login = document.getElementById('login').value;
	    var pass = document.getElementById('password').value;
	    var auth_url = "http://api.metagenomics.anl.gov/api2.cgi/?auth=kbgo4711"+Retina.Base64.encode(login+":"+pass);
	    jQuery.get(auth_url, function(data) {
            var d = JSON.parse(data);
	        if (data && d && d.token) {
		        var uname = d.token.substr(3, d.token.indexOf('|') - 3);
		        document.getElementById('login_name_span').style.display = "none";
		        document.getElementById('login_name').innerHTML = uname;
		        document.getElementById('failure').innerHTML = "";
		        stm.Authorization = d.token;
		        jQuery('#loginModal').modal('hide');
		        jQuery('#msgModal').modal('show');
		        jQuery('.tab-pane').children('iframe').each(function() {
		            Retina.WidgetInstances.NotebookDashboard[index].send_auth(this.id, d.token);
                });
	        } else {
		        document.getElementById('failure').innerHTML = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error:</strong> Login failed.</div>';
	        }
	    });
    };

    widget.perform_logout = function () {
	    document.getElementById('login_name_span').style.display = "";
	    document.getElementById('login_name').innerHTML = "";
	    jQuery('.tab-pane').children('iframe').each(function() {
	        Retina.WidgetInstances.NotebookDashboard[0].send_auth(this.id, undefined);
        });
    };

})();

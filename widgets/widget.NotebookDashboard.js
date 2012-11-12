(function () {
    widget = Retina.Widget.extend({
        about: function () {
            return {
                title: "Notebook Dashboard Widget",
                name: "NotebookDashboard",
		        version: 1,
                author: "Travis Harrison",
                requires: [ ]
            };
        }
    });

    // ipython notebook server ip
    widget.nb_server  = 'http://140.221.84.122:8888';
    // dict of notebook uuid: [ notebook_objs ]
    // notebook_objs is list of notebooks with same uuid sorted by datetime (lates first)
    widget.sorted_nbs = {};

    // this will be called by Retina automatically to initialize the widget
    // note that the display function will not be called until this is finished
    // you can add functions that return promises to the return list, i.e.:
    // this.loadRenderer('table')
    // which would make the table renderer available to use before the display function is called
    // you can add multiple comma separated promises
    //widget.setup = function () {
	//    return [ this.loadRenderer('table') ];
    //}
    
    // this will be called whenever the widget is displayed
    // the params should at least contain a space in the DOM for the widget to render to
    // if the widget is visual
    widget.display = function (div, args) {
	    stm.get_objects({"type": "notebook", "options": {"verbosity": "minimal", "limit": 0}}).then(function () {
	        Retina.Widget.NotebookDashboard.nb_sort();
        });

        // create space for two select lists and a button
	    var div.innerHtml = '<div class="row">\
	        <div class="span3 offset1">\
	            <select id="nb_select" class="selectpicker" onchange="Retina.Widget.nb_select_change(this)"></select></div>\
	        <div class="span3 offset1">\
	            <select id="version_select" class="selectpicker"></select></div>\
	        <div class="span2 offset1">\
	            <button id="np_launch" type="button" class="btn" onclick="Retina.Widget.nb_launch_click()">Launch Notebook</button></div></div>';
	    // populate first select list with newest version of each notebook
	    for (var uuid in Retina.Widget.sorted_nbs) {
	        var date = new Date(Retina.Widget.sorted_nbs[uuid][0].created);
	        var desc = Retina.Widget.sorted_nbs[uuid][0].name+' ('+date.toLocaleString()+')';
	        $('#nb_select').append($('<option>', {value: uuid}).text(desc));
        }
    };

    // populate second select list with versions of selected notebook
    widget.nb_select_change = function (sel) {
        var uuid = sel.options[sel.selectedIndex].value;
        for (var nb in Retina.Widget.sorted_nbs[uuid]) {
            var date = new Date(Retina.Widget.sorted_nbs[uuid][nb].created);
	        var desc = Retina.Widget.sorted_nbs[uuid][nb].name+' ('+date.toLocaleString()+')';
	        $('#version_select').append($('<option>', {value: Retina.Widget.sorted_nbs[uuid][nb].id}).text(desc));
        }
    }

    // launch notebook
    // if latest select use its uuid
    // if older version selected fork it: create new shock node with new uuid
    widget.nb_launch_click = function () {
        nb_select_uuid = $('#nb_select').val();
        nb_select_id   = Retina.Widget.sorted_nbs[nb_select_uuid][0].id
        nb_version_id  = $('#version_select').val();
        if (nb_select_id == nb_version_id) {
            window.open(Retina.Widget.nb_server+'/'+nb_select_uuid, '_blank');
        } else {
            var new_uuid = Retina.Widget.uuidv4();
            // somehow fork shock node (nb_version_id)
        }
    }

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
        for (var uuid in uuid_nbs) {
            uuid_nbs[uuid].sort( function(a,b) {
                return (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0);
            });
        }
        Retina.Widget.sorted_nbs = uuid_nbs;
    }
    
    // awsome code i found to produce RFC4122 complient UUID v4
    widget.uuidv4 = function(a,b) {
        for (b=a=''; a++<36; b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');
        return b;
    }

})();

(function () {
    var widget = Retina.Widget.extend({
	about: {
            title: "Session Widget",
            name: "session",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	return [ Retina.load_renderer("stmbrowse") ];
    }
    
    widget.display = function (params) {
	widget = this;
	var index = widget.index;

	widget.stmbrowse = Retina.Renderer.create("stmbrowse", {});

	params.target.innerHTML = "\
<div style='position:relative;top:8px;'>\
  <button type='button' class='btn btn-inverse' data-toggle='dropdown' title='display session information'><i class='icon-folder-open icon-white'></i></button>\
  <ul class='dropdown-menu pull-right' role='menu' aria-labelledby='dropdownMenu'>\
    <li class='disabled'><a tabindex='-1' href='#' style='color: black; font-weight: bold;'>Session Management</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].download();' title='download session to disk'><i class='icon-download' style='margin-right: 5px; position: relative; top: 1px;'></i>download</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].upload("+index+");' title='upload session from file'><i class='icon-upload' style='margin-right: 5px; position: relative; top: 1px;'></i>upload</a></li>\
"+( params.noInfo ? "" : "<li class='divider'></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].sessionInfo("+index+");'><i class='icon-question-sign' style='margin-right: 5px; position: relative; top: 1px;'></i>info</a></li>\
")+"  </ul>\
</div>\
<input type='file' id='sessionUploadButton' style='display: none;'>\
";

	var modal = document.createElement('div');
	modal.innerHTML = "<div id='sessionModal' class='modal hide fade' tabindex='-1' style='width: 800px; margin-left: -400px;' role='dialog' aria-labelledby='sessionModalLabel' aria-hidden='true' data-backdrop='static'>\
      <div class='modal-header'>\
	<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\
	<h3 id='sessionModalLabel'>Session Information</h3>\
      </div>\
      <div class='modal-body' id='sessionModalBody' style='max-height: 600px; height: 600px;'>\
      </div>\
      <div class='modal-footer'>\
	<button class='btn' aria-hidden='true' data-dismiss='modal'>close</button>\
      </div>\
</div>";
	document.body.appendChild(modal);
	
	widget.uploadButton = document.getElementById('sessionUploadButton');
	widget.uploadButton.addEventListener('change', function(e){stm.file_upload(e,widget.sessionUpdatedInfo);});
    };
    
    widget.download = function (index) {
	stm.dump();
    };

    widget.upload = function (index) {
	widget = Retina.WidgetInstances.session[index];
	widget.uploadButton.click();
    };

    widget.sessionInfo = function (index) {
	widget = Retina.WidgetInstances.session[index];

	var html = "";
	var k = Retina.keys(stm.DataStore).sort();
	var has_objects = false;
	for (var i=0;i<k.length;i++) {
	    var l = Retina.keys(stm.DataStore[k[i]]).length;
	    if (l > 0) {
		has_objects = true;
		break;
	    }
	}
	if (has_objects) {
	    widget.stmbrowse.settings.target = document.getElementById('sessionModalBody');
	    widget.stmbrowse.settings.data = stm.DataStore;
	    widget.stmbrowse.settings.active = null;
	    widget.stmbrowse.render();
	} else {
	    document.getElementById('sessionModalBody').innerHTML = "<p>your session is empty</p>";
	}

	jQuery('#sessionModal').modal('show');
    };

    widget.sessionUpdatedInfo = function () {
	var elem = document.createElement('div');
	elem.setAttribute('class', "alert alert-info");
	elem.setAttribute('style', "position: absolute; top: -50px; right: 8px; width: 150px; height: 22px; z-index: 10000;");
	elem.innerHTML = '<b>session updated</b><br>';
	document.body.appendChild(elem);
	jQuery(elem).animate({top: "8px"},{duration: 800}).delay(3000).animate({top: "-50px"},{duration: 800, complete: function(){document.body.removeChild(elem);}});
    };

})();

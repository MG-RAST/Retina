(function () {
    widget = Retina.Widget.extend({
	about: {
            title: "Session Widget",
            name: "session",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	return [ ];
    }
    
    widget.display = function (params) {
	widget = this;
	var index = widget.index;

	params.target.innerHTML = "\
<div style='position:relative;top:8px;'>\
  <button type='button' class='btn' data-toggle='dropdown' title='display session information'><i class='icon-folder-open'></i></button>\
  <ul class='dropdown-menu pull-right' role='menu' aria-labelledby='dropdownMenu'>\
    <li class='disabled'><a tabindex='-1' href='#' style='color: black; font-weight: bold;'>Session Management</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].download();' title='download session to disk'><i class='icon-download' style='margin-right: 5px; position: relative; top: 1px;'></i>download</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].upload("+index+");' title='upload session from file'><i class='icon-upload' style='margin-right: 5px; position: relative; top: 1px;'></i>upload</a></li>\
    <li class='divider'></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.session["+index+"].sessionInfo();'><i class='icon-question-sign' style='margin-right: 5px; position: relative; top: 1px;'></i>info</a></li>\
  </ul>\
</div>\
<input type='file' id='sessionUploadButton' style='display: none;'>\
";

	var modal = document.createElement('div');
	modal.innerHTML = "<div id='sessionModal' class='modal hide fade' tabindex='-1' style='width: 400px;' role='dialog' aria-labelledby='sessionModalLabel' aria-hidden='true'>\
      <div class='modal-header'>\
	<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\
	<h3 id='sessionModalLabel'>Session Information</h3>\
      </div>\
      <div class='modal-body' id='sessionModalBody'>\
      </div>\
      <div class='modal-footer'>\
	<button class='btn btn-success' aria-hidden='true' data-dismiss='modal'>OK</button>\
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
	var html = "<p>Your current session contains the following objects:</p>";
	var k = Retina.keys(stm.DataStore).sort();
	var has_objects = false;
	for (var i=0;i<k.length;i++) {
	    var l = Retina.keys(stm.DataStore[k[i]]).length;
	    if (l > 0) {
		html += "[" + l + "] " + k[i] + "<br>";
		has_objects = true;
	    }
	}
	if (! has_objects) {
	    html = "<p>your session is empty</p>";
	}
	document.getElementById('sessionModalBody').innerHTML = html;
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

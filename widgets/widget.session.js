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
<div class='btn-group' style='position:relative;top:8px;'>\
  <button type='button' class='btn' onclick='Retina.WidgetInstances.session["+index+"].download();' title='download current session'><i class='icon-download'></i></button>\
  <button type='button' class='btn' onclick='Retina.WidgetInstances.session["+index+"].sessionInfo();' title='display session information'><i class='icon-info-sign'></i></button>\
  <button type='button' class='btn' onclick='Retina.WidgetInstances.session["+index+"].upload("+index+");' title='load session from disk'><i class='icon-upload'></i></button>\
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
	widget.uploadButton.addEventListener('change', function(e){stm.file_upload(e,widget.sessionInfo);});
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
	for (var i=0;i<k.length;i++) {
	    html += k[i] + " ("+Retina.keys(stm.DataStore[k[i]]).length+")<br>";
	}
	document.getElementById('sessionModalBody').innerHTML = html;
	jQuery('#sessionModal').modal('show');
    };

})();

(function () {
    var widget = Retina.Widget.extend({
	about: {
            title: "Profile Manager Widget",
            name: "profileManager",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	return [  ];
    }
    
    widget.display = function (params) {
	widget = this;
	var index = widget.index;

	params.target.innerHTML = "\
<div style='position:relative;top:8px;'>\
  <button type='button' class='btn btn-inverse' data-toggle='dropdown' title='manage profiles'><i class='icon-folder-open icon-white'></i></button>\
  <ul class='dropdown-menu pull-right' role='menu' aria-labelledby='dropdownMenu'>\
    <li class='disabled'><a tabindex='-1' href='#' style='color: black; font-weight: bold;'>Profile Management</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.profileManager["+index+"].manage();' title='manage profiles'><img style='height: 16px; position: relative; right: 5px; bottom: 2px;' src='Retina/images/download.png'>manage</a></li>\
    <li><a tabindex='-1' href='#' onclick='Retina.WidgetInstances.profileManager["+index+"].upload("+index+");' title='load profile from file'><img style='height: 16px; position: relative; right: 5px; bottom: 2px;' src='Retina/images/upload.png'>load from disk</a></li>\
  </ul>\
</div>\
<input type='file' id='profileUploadButton' multiple=multiple style='display: none;'>\
";

	var modal = document.createElement('div');
	modal.innerHTML = "<div id='profileModal' class='modal hide fade' tabindex='-1' style='width: 800px; margin-left: -400px;' role='dialog' aria-labelledby='profileModalLabel' aria-hidden='true' data-backdrop='static'>\
      <div class='modal-header'>\
	<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>\
	<h3 id='profileModalLabel'>Profile Information</h3>\
      </div>\
      <div class='modal-body' id='profileModalBody' style='max-height: 600px; height: 600px;'>\
      </div>\
      <div class='modal-footer'>\
	<button class='btn' aria-hidden='true' data-dismiss='modal'>close</button>\
      </div>\
</div>";
	document.body.appendChild(modal);
	
	widget.uploadButton = document.getElementById('profileUploadButton');
	widget.uploadButton.addEventListener('change', function(e){stm.file_upload(e,widget.profileUpdatedInfo);});
    };
    
    widget.manage = function () {
	var widget = this;

	var html = [ '<div style="margin-bottom: 20px;">Below is the list of the metagenomic profiles currently loaded into memory. Data containers using these profiles can be generated instantly. You can store profiles on your local hard drive, using the download button of the according profile.<br>You can load stored profiles into memory using the the profile manager <i>load from disk</i> option.</div><table class="table" style="width: 100%; text-align: left;"><tr><th style="border-top: none;">ID</th><th style="border-top: none;">sources</th><th style="border-top: none;">rows</th><th style="border-top: none;">size</th><th style="border-top: none;"></th></tr>' ];

	var profiles = Retina.keys(stm.DataStore.profile);
	for (var i=0; i<profiles.length; i++) {
	    var profile = stm.DataStore.profile[profiles[i]];
	    var id, type, source;
	    [ id, type, source ] = profiles[i].split(/_/);
	    var name = profile.hasOwnProperty('name') ? profile.name : id;
	    html.push('<tr title="'+name+'"><td>'+profile.id+'</td><td>'+profile.sources.join(", ")+'</td><td>'+profile.row_total.formatString()+'</td><td>'+profile.size.byteSize()+'</td><td><button class="btn btn-mini" title="download profile to disk" onclick="Retina.WidgetInstances.profileManager['+widget.index+'].download(\''+profiles[i]+'\');" style="margin-right: 25px;">download</button><button class="btn btn-mini btn-danger" title="delete profile from memory" onclick="if(confirm(\'Really delete this profile from memory?\')){delete stm.DataStore.profile[\''+profiles[i]+'\'];Retina.WidgetInstances.profileManager['+widget.index+'].manage();}"><i class="icon icon-trash"></i></button></td></tr>')
	}
	html.push('</table>');

	html.push('<button class="btn btn-mini" onclick="this.setAttribute(\'disabled\',\'disabled\');stm.dump(false, \'all_profiles.json\', \'profile\').then(function(){alert(\'session stored\');jQuery(\'#profileModal\').modal(\'hide\');});">download all profiles</button>');

	if (profiles.length == 0) {
	    html = ['<div class="alert alert-info" style="margin-top: 250px; width: 350px; margin-left: auto; margin-right: auto;">You currently do not have any profiles in memory.</div>'];
	}

	document.getElementById('profileModalBody').innerHTML = html.join("");
	
	jQuery("#profileModal").modal('show');
    };

    widget.download = function (id) {
	var widget = this;

	stm.saveAs('{"profile":{"'+id+'":'+JSON.stringify(stm.DataStore.profile[id])+'}}', id+".json");
    };

    widget.upload = function () {
	var widget = this;

	widget.uploadButton.click();
    };

    widget.profileUpdatedInfo = function () {
	var widget = Retina.WidgetInstances.profileManager[1];
	var elem = document.createElement('div');
	elem.setAttribute('class', "alert alert-info");
	elem.setAttribute('style', "position: absolute; top: -50px; right: 8px; width: 150px; height: 22px; z-index: 10000;");
	elem.innerHTML = '<b>profile loaded</b><br>';
	document.body.appendChild(elem);
	jQuery(elem).animate({top: "8px"},{duration: 800}).delay(3000).animate({top: "-50px"},{duration: 800, complete: function(){document.body.removeChild(elem);}});
	if (typeof widget.callback == "function") {
	    widget.callback.call();
	}
    };

})();

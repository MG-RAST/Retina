(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "PNNL Mockup Widget",
                name: "pnnl",
                author: "Tobias Paczian",
                requires: []
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_widget({"name": "shockbrowse", "resource": "widgets/",  "filename": "widget.shockbrowse.js"}),
		 Retina.load_widget("shockbrowse") ];
    };
        
    widget.display = function (wparams) {
        widget = this;

	var container = wparams.target;

	// shock browser
	var html = "<div><h4>Upload Files</h4><div style='margin-bottom: 25px;'><div id='browser'></div></div></div>";

	// submission form
	html += '\
<div>\
  <h4>Perform Submission</h4>\
  <div class="form-horizontal">\
    <div class="control-group">\
      <span style="float: right; width: 450px; margin-right: 50px;">Select the sequence file you want to perform analysis on.</span>\
      <label class="control-label" for="inputSequenceFile">Sequence File</label>\
      <div class="controls">\
        <select id="inputSequenceFile"><option>sequence_a.fq</option><option>sequence_b.fq</option><option>sequence_c.fq</option></select>\
      </div>\
    </div>\
    <div class="control-group">\
      <span style="float: right; width: 450px; margin-right: 50px;">Select the metadata file that describes the data in your sequence file.</span>\
      <label class="control-label" for="inputMetadataFile">Metadata File</label>\
      <div class="controls">\
        <select id="inputMetadataFile"><option>sequence_a_metadata.xlsx</option><option>sequence_b_metadata.xlsx</option><option>sequence_c_metadata.xlsx</option></select>\
      </div>\
    </div>\
    <div class="control-group">\
      <span style="float: right; width: 450px; margin-right: 50px;">This option does something special. It is described in some detail in this text.</span>\
      <label class="control-label" for="inputOption1">Option 1</label>\
      <div class="controls">\
        <input type="text" id="inputOption1" placeholder="option 1">\
      </div>\
    </div>\
    <div class="control-group">\
      <span style="float: right; width: 450px; margin-right: 50px;">This option does something special. It is described in some detail in this text.</span>\
      <label class="control-label" for="inputOption2">Option 2</label>\
      <div class="controls">\
        <select id="inputOption2"><option>pick a</option><option>pick b</option><option>pick c</option></select>\
      </div>\
    </div>\
    <div class="control-group">\
      <span style="float: right; width: 450px; margin-right: 50px;">This option does something special. It is described in some detail in this text.</span>\
      <div class="controls">\
        <label class="checkbox">\
          <input type="checkbox"> perform filtering\
        </label>\
        <button type="button" class="btn" style="margin-top: 10px;">submit</button>\
      </div>\
    </div>\
  </div>\
</div>';

	// pipeline status
	html += "<div><h4>Pipeline Status</h4></div>";

	container.innerHTML = html;

	var browser = Retina.Widget.create("shockbrowse", { "target": document.getElementById("browser"),
							    "width": 900,
							    "height": 350,
							    "showDetailBar": false,
							    "showFilter": false,
							    "showResizer": false,
							    "showStatusBar": false,
							    "showTitleBar": false,
							    "enableDownload": false,
							    "showUploadPreview": false,
							    "presetFilters": { "file_format": "fna" }});

	browser.uploadButton.removeAttribute('disabled');
	browser.resumeButton.removeAttribute('disabled');

	jQuery.getJSON("http://140.221.84.145:8000/job?query&info.user=mgrastprod&recent=5&limit=5", function (data) {
	    console.log(data);
	});
    };

    /*
     * HELPER FUNCTIONS
     */

    // create dots for awe steps
    widget.dots = function (stages) {
	var dots = '<span>';
	if (stages.length > 0) {
	    for (var i=0;i<stages.length;i++) {
		if (stages[i].state == 'completed') {
		    dots += '<span style="color: green;font-size: 19px; cursor: default;" title="completed: '+stages[i].cmd.description+'">&#9679;</span>';
		} else if (stages[i].state == 'in-progress') {
		    dots += '<span style="color: blue;font-size: 19px; cursor: default;" title="in-progress: '+stages[i].cmd.description+'">&#9679;</span>';
		} else if (stages[i].state == 'queued') {
		    dots += '<span style="color: orange;font-size: 19px; cursor: default;" title="queued: '+stages[i].cmd.description+'">&#9679;</span>';
		} else if (stages[i].state == 'error') {
		    dots += '<span style="color: red;font-size: 19px; cursor: default;" title="error: '+stages[i].cmd.description+'">&#9679;</span>';
		} else if (stages[i].state == 'init') {
		    dots += '<span style="color: gray;font-size: 19px; cursor: default;" title="init: '+stages[i].cmd.description+'">&#9679;</span>';
		}
	    }
	}
	
	dots += "</span>";
	
	return dots;
    };

})();

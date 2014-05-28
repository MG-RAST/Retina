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
	html += "<style>.miniicon { height: 16px; margin-right: 5px;}</style><div><h4>Pipeline Status</h4><div id='pipelineStatus'></div></div>";

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
	    Retina.WidgetInstances.pnnl[1].jobTable(data.data);
	});
    };

    /*
     * HELPER FUNCTIONS
     */

    widget.jobTable = function (data) {
	var widget = Retina.WidgetInstances.pnnl[1];

	// start table
	var html = "<table class='table table-hover'>";

	// header row
	html += "<tr><th>job</th><th>stage</th><th>status</th><th></th><th></th></tr>";

	// iterate over data rows
	for (var i=0; i<data.length; i++) {
	    var stage = "complete";
	    if (data[i].remaintasks > 0) {
		stage = data[i].tasks[data[i].tasks.length - data[i].remaintasks].cmd.description;
	    }
	    html += "<tr><td>"+data[i].info.name+"</td><td>"+stage+"</td><td>"+widget.status(data[i].tasks)+"</td><td>"+widget.dots(data[i].tasks)+"</td><td><button type='button' class='btn btn-mini btn-danger'>delete</button></td></tr>";
	}
	html += "</table>";

	document.getElementById('pipelineStatus').innerHTML = html;
    };

    widget.status = function (stages) {
	if (stages.length > 0) {
	    var currentStage = 0;
	    for (var i=0;i<stages.length;i++) {
		if (stages[i].state == 'pending') {
		    currentStage--;
		    break;
		}
		currentStage++;
	    }
	    if (currentStage < 0) {
		currentStage = 0;
	    }
	    if (currentStage == stages.length) {
		currentStage--;
	    }
	    if (stages[currentStage].state == "completed") {
		return '<img class="miniicon" src="images/ok.png"><span class="green">completed</span>';
	    } else if (stages[currentStage].state == "in-progress") {
		return '<img class="miniicon" src="images/settings3.png"><span class="blue">running</span>';
	    } else if (stages[currentStage].state == "queued") {
		return '<img class="miniicon" src="images/clock.png"><span class="orange">queued</span>';
	    } else if (stages[currentStage].state == "pending") {
		return '<img class="miniicon" src="images/clock.png"><span class="gray">pending</span>';
	    } else if (stages[currentStage].state == "error") {
		return '<img class="miniicon" src="images/remove.png"><span class="red">error</span>';
	    } else if (stages[currentStage].state == "suspend") {
		return '<img class="miniicon" src="images/remove.png"><span class="red">suspended</span>';
	    } else {
		console.log("unhandled state: "+stages[currentStage].state);
		return "";
	    }
	}
    };

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

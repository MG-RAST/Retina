/*
  Metadata Renderer

  Exports metadata in Excel format

*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "metadata",
	    title: "Metadata Exporter",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: ["xlsx.js", "jszip.min.js"],
	    defaults: {
		'filename' : 'metadata.xlsx',
	    },
	},
	
	// example data to show the functionality of the tree renderer
	exampleData: function () {
	    return { "name": "testdata" };
	},
	
	render: function () {
	    renderer = this;
	    var index = this.index;

	    if (! renderer.hasOwnProperty("excelWorkbook")) {
		renderer.loadExcelTemplate().then( function () { Retina.RendererInstances.metadata[1].render(); } );
		return renderer;
	    }

	    renderer.exportExcel();
	    
	    return renderer;
	},
	
	loadExcelTemplate: function () {
	    var renderer = this;
	    
	    renderer.excelPromise = jQuery.Deferred();
	    var base_url = "data/MGRAST_MetaData_template_1.7.xlsx";
	    
	    JSZipUtils.getBinaryContent(base_url, function(err, data) {
		if(err) {
		    throw err;
		}
		var zip = new JSZip();
		zip.loadAsync(data).then(function(zip) {
		    xlsx(zip).then(function (workbook) {
			Retina.RendererInstances.metadata[1].excelWorkbook = workbook;
			Retina.RendererInstances.metadata[1].excelPromise.resolve();
		    });
		});
	    });

	    return renderer.excelPromise;
	},

	exportExcel: function () {
	    var renderer = this;

	    var wb = jQuery.extend(true, {}, renderer.excelWorkbook);
	    var data = renderer.settings.data;
	    	    
	    // fill in the project sheet
	    for (var i=0; i<wb.worksheets[1].maxCol; i++) {
		if (data.data.hasOwnProperty(wb.worksheets[1].data[0][i].value)) {
		    wb.setCell(1, i, 2, data.data[wb.worksheets[1].data[0][i].value].value);
		}
	    }
	    for (var i in data.data) {
		if (data.data.hasOwnProperty(i) && i.match(/^misc_param_\d+/)) {
		    wb.setCell(1, wb.worksheets[1].maxCol, 0, i);
		    wb.setCell(1, wb.worksheets[1].maxCol - 1, 2, data.data[i]);
		}
	    }

	    // remember which sheets we need
	    var usedSheets = {};
	    var libRows = { "metagenome": 2, "transcriptome": 2, "mimarks-survey": 2 };
	    var epMiscCol = {};
	    var epRows = {};	
	    // fill in the sample sheet
	    for (var h=0; h<data.sampleNum; h++) {
		var sample = data.samples[h];
		wb.setCell(2,0,h+2,sample.name);
		wb.setCell(2,1,h+2,sample.id);

		var sampMiscCol = 0;
		for (var i=2; i<wb.worksheets[2].maxCol; i++) {
		    if ((sampMiscCol < 1) && wb.worksheets[2].data[0][i].value.match(/^misc_param/)) {
			sampMiscCol = i;
		    }
		    if (sample.data.hasOwnProperty(wb.worksheets[2].data[0][i].value)) {
			wb.setCell(2, i, h + 2, sample.data[wb.worksheets[2].data[0][i].value].value);
		    }
		}
		var numSampMisc = 0;
		for (var i in sample.data) {
		    if (sample.data.hasOwnProperty(i) && i.match(/^misc_param_\d+/)) {
			wb.setCell(2, sampMiscCol, 0, i);
			wb.setCell(2, sampMiscCol, h + 2, sample.data[i].value);
			sampMiscCol++;
		    }
		}

		// fill in the libraries
		for (var i=0; i<sample.libNum; i++) {
		    var lib = sample.libraries[i];
		    var sheet;
		    if (lib.type == "metagenome") {
			sheet = 3;
		    } else if (lib.type == "transcriptome") {
			sheet = 4;
		    } else if (lib.type == "mimarks-survey") {
			sheet = 5;
		    }
		    usedSheets[wb.worksheets[sheet].name] = true;

		    wb.setCell(sheet, 0, libRows[lib.type], sample.name);

		    var libMiscCol = 0;
		    for (var j=1; j<wb.worksheets[sheet].maxCol; j++) {
			if ((libMiscCol<1) && wb.worksheets[sheet].data[0][j].value.match(/^misc_param/)) {
			    libMiscCol = j;
			}
			if (lib.data.hasOwnProperty(wb.worksheets[sheet].data[0][j].value)) {
			    wb.setCell(sheet, j, libRows[lib.type], lib.data[wb.worksheets[sheet].data[0][j].value].value);
			}
		    }
		    
		    for (var j in lib.data) {
			if (lib.data.hasOwnProperty(j) && j.match(/^misc_param_\d+/)) {
			    wb.setCell(sheet, libMiscCol, 0, j);
			    wb.setCell(sheet, libMiscCol, libRows[lib.type], lib.data[j].value);
			    libMiscCol++;
			}
		    }
		    libRows[lib.type]++;
		}

		// fill the env-package
		var ep = sample.envPackage;
		for (var i=0; i<wb.worksheets.length; i++) {
		    if (wb.worksheets[i].name == "ep "+ep.type) {
			if (! epMiscCol.hasOwnProperty(ep.type)) {
			    epRows[ep.type] = 2;
			    for (var j=1; j<wb.worksheets[i].maxCol; j++) {
				if (wb.worksheets[i].data[0][j].value == "misc_param") {
				    epMiscCol[ep.type] = j;
				}
			    }
			}
			usedSheets[wb.worksheets[i].name] = true;
			wb.setCell(i, 0, epRows[ep.type], sample.name);
			for (var j=1; j<wb.worksheets[i].maxCol; j++) {
			    if (ep.data.hasOwnProperty(wb.worksheets[i].data[0][j].value)) {
				wb.setCell(i, j, epRows[ep.type], ep.data[wb.worksheets[i].data[0][j].value].value);
			    }
			}
			var numMisc = 0;    
			for (var j in ep.data) {
			    if (ep.data.hasOwnProperty(j) && j.match(/^misc_param_\d+/)) {
				wb.setCell(i, epMiscCol[ep.type] + numMisc, 0, j);
				wb.setCell(i, epMiscCol[ep.type] + numMisc, epRows[ep.type], ep.data[j].value);
				numMisc++;
			    }
			}
			epRows[ep.type]++;
			break;
		    }
		}
	    }
	    
	    // remove the sheets we do not need
	    for (var i=3; i<wb.worksheets.length; i++) {
	    	if (! usedSheets[wb.worksheets[i].name]) {
	    	    wb.removeWorksheet(i);
	    	    i--;
	    	}
	    }
	    
	    xlsx(wb).then(function(data) {
		var fn = Retina.RendererInstances.metadata[1].settings.filename;
		stm.saveAs(data.base64, fn, true, "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,");
	    });
	}
    });
}).call(this);

(function () {
    var root = this;
    var ipy = root.ipy = {};

    ipy.read_cell = function (index) {
	return IPython.notebook.get_cell(index).get_text();
    }

    ipy.write_cell = function (index, text) {
	IPython.notebook.get_cell(index).set_text(text);
    }

    ipy.append_to_cell = function (index, text) {
	IPython.notebook.get_cell(index).set_text(IPython.notebook.get_cell(index).get_text() + text);
    }

    ipy.createHTML = function () {
	var cells = document.getElementsByClassName('output_subarea');
	var html = "";
	for (i=0;i<cells.length;i++) {
	    html += cells[i].innerHTML;
	}
	stm.send_message(window.parent, { data: html, target: 'result'}, 'html');
    }

    ipy.add_cell = function (index, type) {
	if (type == undefined) {
	    type = 'code';
	}
	IPython.notebook.insert_cell_below(type, index);
    }
    
}).call(this);
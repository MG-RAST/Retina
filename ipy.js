(function () {
    jQuery.noConflict();
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

}).call(this);
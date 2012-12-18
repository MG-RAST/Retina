(function () {
    var root = this;
    var ipy = root.ipy = {};

    ipy.selected_cell_index = function () {
        return IPython.notebook.get_selected_index();
    }

    ipy.read_cell = function (index) {
        if (index == undefined) {
            index = IPython.notebook.get_selected_index();
        }
	    return IPython.notebook.get_cell(index).get_text();
    }

    ipy.write_cell = function (index, text) {
        if (index == undefined) {
            index = IPython.notebook.get_selected_index();
        }
	    IPython.notebook.get_cell(index).set_text(text);
    }

    ipy.append_to_cell = function (index, text) {
        if (index == undefined) {
            index = IPython.notebook.get_selected_index();
        }
	    IPython.notebook.get_cell(index).set_text(IPython.notebook.get_cell(index).get_text()+"\n"+text);
    }

    ipy.createHTML = function () {
	var cells = document.getElementsByClassName('output_subarea');
	var html = "";
	for (i=0;i<cells.length;i++) {
	    html += cells[i].innerHTML;
	}
	stm.send_message(window.parent, { data: html, target: 'result'}, 'html');
    }

    // if index undefined uses selected cells index (default of insert_cell_* functions)
    // default position is below given index or selected
    // return index of added cell
    ipy.add_cell = function (index, type, position) {
	    if (type == undefined) {
	        type = 'code';
	    }
	    var cell = undefined;
        if (position == 'above') {
            cell = IPython.notebook.insert_cell_above(type, index);
        } else if (position == 'bottom') {
            cell = IPython.notebook.insert_cell_at_bottom(type);
        } else if (position == 'top') {
            cell = IPython.notebook.insert_cell_above(type, 0);
        } else {
            cell = IPython.notebook.insert_cell_below(type, index);
        }
        return IPython.notebook.find_cell_index(cell);
    }
    
    ipy.notebook_refresh = function () {
        IPython.notebook_list.load_list();
    }
    
    ipy.notebook_save = function () {
        IPython.notebook_list.save_notebook();
    }
    
}).call(this);
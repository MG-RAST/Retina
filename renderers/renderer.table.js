(function () {
    var schema = {
        properties: {
            target: {
                type: 'object',
                required: true
            },
            data: {
                type: 'object',
                properties: {
                    data: {
                        required: true,
                        type: 'array',
                        items: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    },
                    header: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    };
    var renderer = Retina.Renderer.extend({
      about: {
	name: "table",
	    title: "Table",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		'width': null,
		'height': null,
		'rows_per_page': 10,
		'sortcol': 0,
		'sorted': false,
		'offset': 0,
		'invisible_columns' : { },
		'disable_sort': { },
		'sortdir': 'asc',
		'sorttype': {},
		'filter_autodetect': false,
		'filter_autodetect_select_max': 10,
		'sort_autodetect': false,
		'filter': { },
		'hide_options': false,
		'filter_changed': false,
		'target': 'table_space',
		'data': 'exampleData()'
	    },
            dataFormat: "list of list of 2-tuple of float"
	    },
	  exampleData: function () {
	  return {
	  data: [
		 ["a1", "b1", "c1"],
		 ["a3", "b2", "c2"],
		 ["a4", "b3", "c3"],
		 ["a2", "b4", "c4"],
		 ["a1", "b1", "c1"],
		 ["a3", "b2", "c2"],
		 ["a4", "b3", "c3"],
		 ["a2", "b4", "c4"],
		 ["a1", "b1", "c1"],
		 ["a3", "b2", "c2"],
		 ["a4", "b3", "c3"],
		 ["a2", "b4", "c4"],
		 ["a1", "b3", "c1"],
		 ["a3", "b2", "c2"],
		 ["a4", "b3", "c3"],
		 ["a2", "b4", "c4"],
		 ["a5", "b5", "c5"]
		 ],
	      header: ["column A", "column B", "column C"]
	      };
        },
	  render: function (options) {
	  
	      options.target.innerHTML = "";
	      
	      // check if we have a header, otherwise interpret the first line as the header
	      if (options.data.length) {
		  options.data = { header: options.data[0], data: options.data };
	      }
	      
	      // if a header has already been initialized, don't touch it again
	      var header;
	      if (options.header) {
		  header = options.header;
	      } else {
		  header = options.data.header;
		  if (!options.data.header) {
		      header = options.data.data.shift();
		  }
		  options.header = header;
		  options.data.header = null;
	      }
	      
	      // check if we have already parsed the data
	      var tdata = [];
	      if (options.tdata) {
		  tdata = options.tdata;
	      } else {
		  
		  // the data has not been parsed, do it now
		  for (i=0;i<options.data.data.length; i++) {
		      tdata[tdata.length] = {};
		      for (h=0;h<options.data.data[i].length;h++) {
			  tdata[tdata.length - 1][header[h]] = options.data.data[i][h] || "";
		      }
		  }
		  options.tdata = tdata;
		  options.data.data = null;
	      }
	      
	      // if we are to auto determine sort functions, do so
	      if (options.sort_autodetect) {
		  for (var i=0; i<header.length; i++) {
		      if (!options.sorttype[i]) {
			  if (isNaN(parseFloat(tdata[0][header[i]]))) {
			      options.sorttype[i] = "string";
			  } else {
			      options.sorttype[i] = "number";
			  }
		      }
		  }
	      }
	      
	      // create filter elements
	      var filter = options.filter;
	      var filter_present = false;
	      for (i in filter) {
		  if (typeof(filter[i].searchword) != "undefined" && filter[i].searchword.length > 0) {
		      filter_present = true;
		      break;
		  }
	      }
	      if (filter_present) {
		  var newdata = [];
		  if (options.filter_changed) {
		      options.offset = 0;
		      for (i in filter) {
			  var re;
			  if (filter[i].case_sensitive) {
			      re = new RegExp(filter[i].searchword);
			  } else {
			      re = new RegExp(filter[i].searchword, "i");
			  }
			  filter[i].re = re;
			  if (typeof(filter[i].searchword) != "undefined" && filter[i].searchword.length > 0 &&filter[i].operator && filter[i].operator[filter[i].active_operator] == "><") {
			      filter[i].minmax = filter[i].searchword.split(",");
			      if (filter[i].minmax.length != 2) {
				  alert("'"+filter[i].searchword + "' is not a valid inclusive range.\nRanges must be noted as the minimum\nand the maximum range, separated by ','\ni.e. '-2.1, 5.2'");
				  filter[i].searchword = "";
			      }
			  }
		      }
		      for (h=0; h<tdata.length; h++) {
			  var pass = 1;
			  for (i in filter) {
			      if (typeof(filter[i].searchword) != "undefined" && filter[i].searchword.length > 0) {
				  if (filter[i].operator) {
				      switch (filter[i].operator[filter[i].active_operator]) {
				      case "=":
					  if (tdata[h][header[i]] != filter[i].searchword) {
					      pass = 0;
					  }
					  break;
				      case ">":
					  if (parseFloat(tdata[h][header[i]]) <= parseFloat(filter[i].searchword)) {
					      pass = 0;
					  }
					  break;
				      case "<":
					  if (parseFloat(tdata[h][header[i]]) >= parseFloat(filter[i].searchword)) {
					      pass = 0;
					  }
					  break;				      
				      case "><":
					  if (parseFloat(tdata[h][header[i]]) > parseFloat(filter[i].minmax[1]) || parseFloat(tdata[h][header[i]]) < parseFloat(filter[i].minmax[0])) {
					      pass = 0;
					  }
					  break;
				      }
				  } else {
				      if (! tdata[h][header[i]].match(filter[i].re)) {
					  pass = 0;
				      }
				  }
				  if (pass == 0) {
				      break;
				  }
			      }
			  }
			  if (pass) {
			      newdata.push(tdata[h]);
			  }
		      }
		  } else {
		      newdata = options.filtered_data;
		  }
		  options.filter_changed = false;
		  options.filtered_data = newdata;
		  tdata = newdata;
	      }
	      
	      // initialize the options
	      var offset = options.offset;
	      var rows = options.rows_per_page;
	      var sortcol = options.sortcol;
	      var sortdir = options.sortdir;
	      var sorttype = options.sorttype;
	      var target = options.target;

	      // check for data filtering

	      // check width and height
	      var defined_width = "";
	      if (options.width) {
		  defined_width = "width: " + options.width + "px; ";
	      }
	      var defined_height = "";
	      if (options.height) {
		  defined_height = "height: " + options.height + "px; ";
	      }
	      
	      // create the actual table header
	      var table_element = document.createElement("table");
	      table_element.setAttribute("class", "table table-striped table-bordered table-condensed");
	      table_element.setAttribute("style", "margin-bottom: 2px;");
	      var thead = document.createElement("thead");
	      var tr = document.createElement("tr");
	      for (i=0;i<header.length;i++) {

		  // check if this column is visible
		  if (! options.invisible_columns[i]) {
		      
		      // create sorting elements
		      var asc = document.createElement("i");
		      asc.setAttribute("class", "icon-chevron-down");
		      asc.setAttribute("title", "sort ascending");
		      var desc = document.createElement("i");
		      desc.setAttribute("class", "icon-chevron-up");
		      desc.setAttribute("title", "sort descending");
		      if (i == sortcol) {
			  if (sortdir=='asc') {
			      asc.setAttribute("class", "icon-chevron-down icon-white");
			      asc.setAttribute("title", "current sorting: ascending");
			      desc.setAttribute("style", "cursor: pointer;");
			      desc.i = i;
			      desc.onclick = function () {
				  options.sortcol = this.i;
				  options.sorted = false;
				  options.sortdir = 'desc';
				  renderer.render(options);
			      }
			  } else {
			      desc.setAttribute("class", "icon-chevron-up icon-white");
			      desc.setAttribute("title", "current sorting: descending");
			      asc.setAttribute("style", "cursor: pointer;");
			      asc.i = i;
			      asc.onclick = function () {
				  options.sortcol = this.i;
				  options.sorted = false;
				  options.sortdir = 'asc';
				  renderer.render(options);
			      }
			  }
		      } else {
			  asc.setAttribute("style", "cursor: pointer;");
			  asc.i = i;
			  asc.onclick = function () {
			      options.sortcol = this.i;
			      options.sorted = false;
			      options.sortdir = 'asc';
			      renderer.render(options);
			  }
			  desc.setAttribute("style", "cursor: pointer;");
			  desc.i = i;
			  desc.onclick = function () {
			      options.sortcol = this.i;
			      options.sorted = false;
			      options.sortdir = 'desc';
			      renderer.render(options);
			  }
		      }

		      // check for filter autodetection
		      if (options.filter_autodetect) {
			  if (! options.filter[i]) {
			      options.filter[i] = { type: "text" };
			      if (options.sorttype[i] == "number") {
				  options.filter[i].operator = [ "=", "<", ">", "><" ];
				  options.filter[i].active_operator = 0;
			      }
			      var selopts = [];
			      var numopts = 0;
			      for (h=0;h<tdata.length;h++) {				  
				  if (! selopts[tdata[h][header[i]]]) {
				      numopts++;
				  }
				  selopts[tdata[h][header[i]]] = 1;
			      }
			      if (numopts <= options.filter_autodetect_select_max) {
				  options.filter[i].type = "select";
			      }
			  }
		      }
		      
		      // create filter element
		      if (options.filter[i]) {
			  if (! options.filter[i].searchword) {
			      options.filter[i].searchword = "";
			  }
			  var filter_elem;
			  if (options.filter[i].type == "text") {
			      
			      var filter_text  = document.createElement("input");
			      filter_text.value = filter[i].searchword;
			      filter_text.setAttribute("style", "float: left; width: 100px; display: none;");
			      filter_text.i = i;
			      filter_text.onkeypress = function (e) {
				  e = e || window.event;
				  if (e.keyCode == 13) {
				      options.filter[this.i].searchword = this.value;
				      options.filter_changed = true;
				      renderer.render(options);
				  }
			      };
			      
			      if (options.filter[i].operator) {
				  filter_elem = document.createElement("div");
				  filter_elem.setAttribute("style", "float: left; margin-bottom: 0px; display: none;");
				  filter_elem.className = "input-prepend";
				  var operator_span = document.createElement("span");
				  operator_span.setAttribute("style", "cursor: pointer;");
				  operator_span.i = i;
				  operator_span.onclick = function () {
				      for (var x=0; x< this.childNodes.length; x++) {
					  if (this.childNodes[x].style.display == "") {
					      this.childNodes[x].style.display = "none";
					      if (x == this.childNodes.length - 1) {
						  this.childNodes[0].style.display = "";
						  options.filter[this.i].active_operator = 0;
					      } else {
						  this.childNodes[x + 1].style.display = "";
						  x++;
						  options.filter[this.i].active_operator = x;
					      }
					  }
				      }
				  }
				  operator_span.className = "add-on";
				  for (var h=0; h<options.filter[i].operator.length; h++) {
				      var operator = document.createElement("span");
				      operator.innerHTML = options.filter[i].operator[h];
				      if (h==options.filter[i].active_operator) {
					  operator.setAttribute("style", "font-weight: bold;");
				      } else {
					  operator.setAttribute("style", "display: none; font-weight: bold;");
				      }
				      operator.setAttribute("title", "click to switch filter operator");
				      operator_span.appendChild(operator);
				  }
				  filter_text.setAttribute("style", "position: relative; left: -3px; width: 80px;");
				  filter_elem.appendChild(operator_span);
				  filter_elem.appendChild(filter_text);
			      } else {
				  filter_elem = filter_text;
			      }
			      
			  } else if (options.filter[i].type == "select") {
			      filter_elem = document.createElement("select");
			      filter_elem.setAttribute("style", "float: left; width: 100px; display: none;");
			      filter_elem.add(new Option("-show all-", ""), null);
			      var selopts = [];
			      for (h=0;h<tdata.length;h++) {
				  if (tdata[h][header[i]].length) {
				      selopts[tdata[h][header[i]]] = 1;
				  }
			      }
			      for (h in selopts) {
				  if (h == options.filter[i].searchword) {
				      filter_elem.add(new Option(h,h, true), null);
				  } else {
				      filter_elem.add(new Option(h,h), null);
				  }
			      }
			      filter_elem.i = i;
			      filter_elem.onchange = function () {
				  options.filter[this.i].searchword = this.options[this.selectedIndex].value;
				  options.filter_changed = true;
				  renderer.render(options);
			      }
			  }
		      }
		      
		      // build header cell
		      var caret = document.createElement("table");
		      caret.setAttribute("style", "float: right");
		      var caret_tr1 = document.createElement("tr");
		      var caret_td1 = document.createElement("td");
		      caret_td1.setAttribute("style", "background-color: #CCC; padding: 0px 2px; line-height: 0px; -moz-border-radius: 4px; border-left: none;");
		      var caret_tr2 = document.createElement("tr");
		      var caret_td2 = document.createElement("td");
		      caret_td2.setAttribute("style", "background-color: #CCC; padding: 0px 2px; line-height: 0px; -moz-border-radius: 4px; border-left: none;");
		      caret_td1.appendChild(desc);
		      caret_td2.appendChild(asc);
		      caret_tr1.appendChild(caret_td1);
		      caret_tr2.appendChild(caret_td2);
		      caret.appendChild(caret_tr1);
		      caret.appendChild(caret_tr2);
		      var th = document.createElement("th");
		      th.setAttribute("style", "padding: 0px; padding-left: 4px; min-width: 153px;");
		      var th_div = document.createElement("div");
		      th_div.setAttribute("style", "float: left; position: relative; top: 4px;");
		      th_div.innerHTML = header[i];
		      th.appendChild(th_div);
		      if (options.disable_sort[i]) {
			  th_div.style.top = "-6px";
		      } else {
			  th.appendChild(caret);
		      }
		      if (filter[i]) {
			  var filter_icon = document.createElement("i");
			  filter_icon.className = "icon-search";
			  var is_active = "";
			  if (filter[i].searchword) {
			      is_active = " border: 1px solid blue;";
			      filter_icon.setAttribute("title", "filtered for: '"+filter[i].searchword+"'");
			  }
			  filter_icon.setAttribute("style", "float: right; margin-top: 6px; cursor: pointer; margin-right: 2px;"+is_active);
			  filter_icon.onclick = function () {
			      if (this.nextSibling.style.display == "") {
				  this.nextSibling.style.display = "none";
				  this.previousSibling.previousSibling.style.display = "";
			      } else {
				  this.nextSibling.style.display = "";
				  this.previousSibling.previousSibling.style.display = "none";
			      }
			  }			  
			  th.appendChild(filter_icon);
			  th.appendChild(filter_elem);
		      }
		      tr.appendChild(th);
		  }
	      }
	      thead.appendChild(tr);
	      table_element.appendChild(thead);
	      var tinner_elem = document.createElement("tbody");
	      
	      // check if the data is sorted, otherwise sort now
	      var disp;
	      if (options.sorted) {
		  disp = tdata;
	      } else {
		  disp = tdata.sort(function (a,b) {
		      if (sortdir == 'desc') {
			  var c = a; a=b; b=c;
		      }
		      if (sorttype[sortcol]) {
			  switch (sorttype[sortcol]) {
			  case "number":
			      if (parseFloat(a[header[sortcol]])==parseFloat(b[header[sortcol]])) return 0;
			      if (parseFloat(a[header[sortcol]])<parseFloat(b[header[sortcol]])) return -1;
			      return 1;
			      break;
			  case "string":
			      if (a[header[sortcol]]==b[header[sortcol]]) return 0;
			      if (a[header[sortcol]]<b[header[sortcol]]) return -1;
			      return 1;
			      break;
			  }
		      } else {
			  if (a[header[sortcol]]==b[header[sortcol]]) return 0;
			  if (a[header[sortcol]]<b[header[sortcol]]) return -1;
			  return 1;
		      }
		  });
		  options.sorted = true;
	      }

	      // select the part of the data that will be displayed
	      disp = disp.slice(offset, offset+rows);

	      // create the table rows
	      for (i=0;i<disp.length;i++) {
		  var tinner_row = document.createElement("tr");
		  for (h=0; h<header.length; h++) {
		      if (! options.invisible_columns[h]) {
			  var tinner_cell = document.createElement("td");
			  tinner_cell.innerHTML = disp[i][header[h]];
			  tinner_row.appendChild(tinner_cell);
		      }
		  }
		  tinner_elem.appendChild(tinner_row);
	      }

	      // render the table
	      table_element.appendChild(tinner_elem);

	      // create the navigation
	      // first, previous
	      var prev_td = document.createElement("td");
	      prev_td.setAttribute("style", "text-align: left; width: 45px;");
	      prev_td.innerHTML = "&nbsp;";
	      if (offset > 0) {
		  var first = document.createElement("i");
		  first.setAttribute("class", "icon-fast-backward");
		  first.setAttribute("title", "first");
		  first.setAttribute("style", "cursor: pointer;");
		  first.onclick = function () {
		      options.offset = 0;
		      renderer.render(options);
		  }
		  var prev = document.createElement("i");
		  prev.setAttribute("class", "icon-step-backward");
		  prev.setAttribute("title", "previous");
		  prev.setAttribute("style", "cursor: pointer;");
		  prev.onclick = function () {
		      options.offset -= rows;
		      if (options.offset < 0) {
			  options.offset = 0;
		      }
		      renderer.render(options);
		  }
		  prev_td.appendChild(first);
		  prev_td.appendChild(prev);
	      }

	      // next, last
	      var next_td = document.createElement("td");
	      next_td.setAttribute("style", "text-align: right; width: 45px;");
	      next_td.innerHTML = "&nbsp;";
	      if (offset + rows < tdata.length) {
		  var last = document.createElement("i");
		  last.setAttribute("class", "icon-fast-forward");
		  last.setAttribute("title", "last");
		  last.setAttribute("style", "cursor: pointer;");
		  last.onclick = function () {
		      options.offset = tdata.length - rows;
		      if (options.offset < 0) {
			  options.offset = 0;
		      }
		      renderer.render(options);
		  }
		  var next = document.createElement("i");
		  next.setAttribute("class", "icon-step-forward");
		  next.setAttribute("title", "next");
		  next.setAttribute("style", "cursor: pointer;");
		  next.onclick = function () {
		      options.offset += rows;
		      if (options.offset > tdata.length - 1) {
			  options.offset = tdata.length - rows;
			  if (options.offset < 0) {
			      options.offset = 0;
			  }
		      }
		      renderer.render(options);
		  }
		  next_td.appendChild(next);
		  next_td.appendChild(last);
	      }

	      // display of window offset
	      var showing = document.createElement("td");
	      showing.setAttribute("style", "text-align: center;");	  
	      showing.innerHTML = "showing rows "+ (offset + 1) +"-"+(disp.length + offset)+" of "+tdata.length;

	      // create the table to host navigation
	      var bottom_table = document.createElement("table");
	      bottom_table.setAttribute("style", "width: 100%");
	      var bottom_row = document.createElement("tr");
	      bottom_row.appendChild(prev_td);
	      bottom_row.appendChild(showing);
	      bottom_row.appendChild(next_td);
	      bottom_table.appendChild(bottom_row);


	      // goto
	      var goto_label = document.createElement("span");
	      goto_label.innerHTML = "goto row ";
	      var goto_text = document.createElement("input");
	      goto_text.setAttribute("value", offset + 1);
	      goto_text.setAttribute("class", "span1");
	      goto_text.onkeypress = function (e) {
		  e = e || window.event;
		  if (e.keyCode == 13) {
		      options.offset = parseInt(this.value) - 1;
		      if (options.offset < 0) {
			  options.offset = 0;
		      }
		      if (options.offset > rows) {
			  options.offset = rows;
		      }
		      renderer.render(options);
		  }
	      };

	      // clear filter button
	      var clear_btn = document.createElement("input");
	      clear_btn.setAttribute("type", "button");
	      clear_btn.setAttribute("class", "btn");
	      clear_btn.setAttribute("value", "clear all filters");
	      clear_btn.style.marginLeft = "10px";
	      clear_btn.onclick = function () {
		  for (i in options.filter) {
		      options.filter[i].searchword = "";
		  }
		  options.sorted = false;
		  renderer.render(options);
	      };

	      // rows per page
	      var perpage = document.createElement("input");
	      perpage.setAttribute("type", "text");
	      perpage.setAttribute("value", rows);
	      perpage.setAttribute("style", "width: 30px;");
	      perpage.onkeypress = function (e) {
		  e = e || window.event;
		  if (e.keyCode == 13) {
		      options.offset = 0;
		      options.rows_per_page = parseInt(this.value);
		      renderer.render(options);
		  }
	      };
	      var ppspan1 = document.createElement("span");
	      ppspan1.style.marginLeft = "10px";
	      ppspan1.innerHTML = " show ";
	      var ppspan2 = document.createElement("span");
	      ppspan2.style.marginRight = "10px";
	      ppspan2.innerHTML = " rows at a time";

	      // handle onclick event
	      if (options.onclick) {
		  table_element.onclick = function (e) {
		      e = e || window.event;
		      var ot = e.originalTarget || e.srcElement;
		      if (ot.nodeName == "TD") {
			  var clicked_row = [];
			  var clicked_row_index;
			  var clicked_cell_index;
			  for (var x=0;x<ot.parentNode.children.length;x++) {
			      if (ot.parentNode.children[x] == ot) {
				  clicked_cell_index = x;
			      }
			      clicked_row.push(ot.parentNode.children[x].innerHTML);
			  }
			  for (var y=0;y<ot.parentNode.parentNode.children.length;y++) {
			      if (ot.parentNode.parentNode.children[y] == ot.parentNode) {
				  clicked_row_index = y + offset;
				  break;
			      }
			  }
			  var clicked_cell = ot.innerHTML;
			  options.onclick(clicked_row, clicked_cell, clicked_row_index, clicked_cell_index);
		      }
		  };
	      }

	      var col_sel_span = document.createElement("span");
	      var col_sel_btn = document.createElement("input");
	      col_sel_btn.setAttribute("class", "btn");
	      col_sel_btn.setAttribute("type", "button");
	      col_sel_btn.setAttribute("value", "select columns");
	      var col_sel = document.createElement("div");
	      col_sel.style.position = "absolute";
	      col_sel.style.width = "150px";
	      col_sel.style.height = "150px";
	      col_sel.style.border = "1px solid black";
	      col_sel_span.appendChild(col_sel_btn);
	      col_sel_span.appendChild(col_sel);

	      var options_icon = document.createElement("div");
	      options_icon.innerHTML = "<i class='icon-cog'></i>";
	      options_icon.title ='table options, click to show';
	      options_icon.style.cursor = 'pointer';
	      options_icon.style.position = 'relative';
	      options_icon.className = "btn";
	      options_icon.style.top = '-5px';
	      options_icon.onclick = function () {
		  this.nextSibling.style.display = "";
		  this.style.display = "none";
	      }
	      var options_span = document.createElement("div");
	      options_span.style.display = 'none';
	      options_span.style.position = 'relative';
	      options_span.style.top = "-5px";
	      options_span.innerHTML = "<div title='close options' onclick='this.parentNode.previousSibling.style.display=\"\";this.parentNode.style.display=\"none\";' style='cursor: pointer; margin-right: 5px;' class='btn'><i class='icon-remove'></div>";

	      // append navigation to target element
	      if (options.hide_options == false) {
		  target.appendChild(options_icon);
		  target.appendChild(options_span);
		  options_span.appendChild(goto_label);
		  options_span.appendChild(goto_text);
		  options_span.appendChild(clear_btn);
		  options_span.appendChild(ppspan1);
		  options_span.appendChild(perpage);
		  options_span.appendChild(ppspan2);
		  //options_span.appendChild(col_sel_span);
	      }
	      target.appendChild(table_element);
	      target.appendChild(bottom_table);	  
	      
	      return renderer;
	  }
    });
 }).call(this);

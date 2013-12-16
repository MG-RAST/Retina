(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "stmbrowse",
	    title: "stmbrowse",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: { data: {},
			active: null,
			currItem: {},
			filter: {},
			filterIds: {},
			sortAtt: null,
			sortDir: 'desc' }
	},
	exampleData: function () {
	    return [];
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    var browser = document.createElement('div');
	    browser.setAttribute('class', 'row');
	    var listContainer = document.createElement('div');
	    listContainer.setAttribute('class', 'span3')
	    listContainer.setAttribute('style', 'margin-top: 40px;');
	    var list = document.createElement('ul');
	    list.setAttribute('class', "nav nav-list stm-sidenav affix span3");
	    renderer.list = list;
	    var elems = Retina.keys(renderer.settings.data).sort();
	    for (var i=0;i<elems.length;i++) {
		if (! renderer.settings.filter.hasOwnProperty(elems[i])) {
		    renderer.settings.filter[elems[i]] = [];
		    renderer.settings.filterIds[elems[i]] = Retina.keys(renderer.settings.data[elems[i]]);
		    renderer.settings.currItem[elems[i]] = 0;
		}
		var li = document.createElement('li');
		if (renderer.settings.active == i) {
		    li.setAttribute('class', 'active');
		}
		var elemData = renderer.settings.data[elems[i]][Retina.keys(renderer.settings.data[elems[i]])[0]];
		if (typeof elemData.length == 'function') {
		    elemData = "no filters or sorting available";
		} else {
		    var elemDataAttributes = Retina.keys(elemData).sort();
		    elemData = "<p><b>filter</b> <button class='btn btn-mini' style='float: right;' onclick='Retina.RendererInstances.stmbrowse["+index+"].filterOptions(this,"+index+");' title='add filter'>+</button><select class='span2' style='left: 10px;position: relative;top: 4px; display: none;'>";
		    for (var h=0;h<elemDataAttributes.length;h++) {
			elemData += "<option>"+elemDataAttributes[h]+"</option>";
		    }
		    elemData += "</select></p><div class='input-prepend btn-group' style='display: none;'><a class='add-on btn dropdown-toggle' data-toggle='dropdown' href='#'>&sube;</a><ul class='dropdown-menu'><li><a href='#' onclick='this.parentNode.parentNode.previousSibling.innerHTML=this.innerHTML;' title='contains'>&sube;</a></li><li><a href='#' onclick='this.parentNode.parentNode.previousSibling.innerHTML=this.innerHTML;' title='less or equal'>&le;</a></li><li><a href='#' onclick='this.parentNode.parentNode.previousSibling.innerHTML=this.innerHTML;' title='more or equal'>&ge;</a></li></ul><input type='text' style='width: 146px;' onkeyup='Retina.RendererInstances.stmbrowse["+index+"].filter(event, "+index+");'></div>";
		    elemData += "<p style='margin-top: 5px;'><b>sort by</b></p><div class='input-append btn-group'><select style='width: 159px;' onchange='Retina.RendererInstances.stmbrowse["+index+"].sortObjects(this,"+index+",\""+elems[i]+"\");'>";
		    for (var h=0;h<elemDataAttributes.length;h++) {
			elemData += "<option>"+elemDataAttributes[h]+"</option>";
		    }
		    elemData += "</select><a class='add-on btn' href='#' style='font-size: 8pt;' onclick='Retina.RendererInstances.stmbrowse["+index+"].sortObjects(this,"+index+",\""+elems[i]+"\");'>▼</a></div>";
		    elemData += '<button class="btn" style="width: 186px;" onclick="Retina.RendererInstances.stmbrowse['+index+'].export('+index+');">export selection</button>';
		}
		li.innerHTML = '<a class="accordion-toggle" onclick="Retina.RendererInstances.stmbrowse['+index+'].selectType('+index+', \''+elems[i]+'\', '+i+');"><i class="icon-chevron-right"></i>'+elems[i]+'<span class="stm-badge">'+(Retina.keys(renderer.settings.data[elems[i]]).length)+'</span></a><div class="collapse out">\
      <div class="accordion-inner stm-inner">\
'+elemData+'\
      </div>\
</div>';
		list.appendChild(li);
	    }

	    listContainer.appendChild(list);
	    browser.appendChild(listContainer);
	    var detail = document.createElement('div');
	    detail.setAttribute('class', "span6");
	    detail.setAttribute('style', 'margin-left: 50px;');
	    renderer.detail = detail;
	    browser.appendChild(detail);
	    
	    renderer.settings.target.innerHTML = "";
	    renderer.settings.target.appendChild(browser);

	    return renderer;
	},
	selectType: function (index, type, node) {
	    renderer = Retina.RendererInstances.stmbrowse[index];
	    renderer.settings.activeType = type;
	    if (node != renderer.settings.active) {
		if (renderer.settings.active != null) {
		    renderer.list.childNodes[renderer.settings.active].setAttribute('class', '');
		    renderer.list.childNodes[renderer.settings.active].firstChild.firstChild.className = "icon-chevron-right";
		    jQuery(renderer.list.childNodes[renderer.settings.active].children[1]).collapse('hide');
		}
		
		renderer.settings.active = node;
		renderer.list.childNodes[renderer.settings.active].setAttribute('class', 'active');
		renderer.list.childNodes[renderer.settings.active].firstChild.firstChild.className = "icon-chevron-down";
		jQuery(renderer.list.childNodes[renderer.settings.active].children[1]).collapse('show');
		var rcontrol = '<button id="stm_rnav_'+index+'" class="btn btn-small stm-navi-item" onclick="Retina.RendererInstances.stmbrowse['+index+'].settings.currItem[\''+type+'\']++;Retina.RendererInstances.stmbrowse['+index+'].fillDetail('+index+',\''+type+'\');">&#9658;</button>';
		var lcontrol = '<button id="stm_lnav_'+index+'" class="btn btn-small stm-navi-item" onclick="Retina.RendererInstances.stmbrowse['+index+'].settings.currItem[\''+type+'\']--;Retina.RendererInstances.stmbrowse['+index+'].fillDetail('+index+',\''+type+'\');">&#9668;</button>';
		renderer.detail.innerHTML = '<h4 style="margin-bottom: -10px;">'+type+'</h4>'+rcontrol+lcontrol+'<hr><div id="stmbrowse_detail_'+index+'"></div>';
		renderer.settings.sortAtt = Retina.keys(renderer.settings.data[type][renderer.settings.filterIds[type][0]]).sort()[0]
		renderer.sortObjects({nodeName: ""}, index, type);
	    }
	},
	fillDetail: function (index, type) {
	    renderer = Retina.RendererInstances.stmbrowse[index];

	    var ids = renderer.settings.filterIds[type];
	    var curr = renderer.settings.currItem[type];
	    var item = renderer.settings.data[type][ids[curr]];
	    var num = ids.length;

	    if (curr > 0) {
		document.getElementById('stm_lnav_'+index).style.display = "";
	    } else {
		document.getElementById('stm_lnav_'+index).style.display = "none";
	    }
	    if ((curr + 1) < num) {
		document.getElementById('stm_rnav_'+index).style.display = "";
	    } else {
		document.getElementById('stm_rnav_'+index).style.display = "none";
	    }

	    var html = "<table>";
	    var itemKeys = Retina.keys(item).sort();
	    for (var i=0;i<itemKeys.length;i++) {
		html += "<tr><th style='text-align: left;'>"+itemKeys[i]+"</th><td style='padding-left: 15px;'>"+item[itemKeys[i]]+"</td></tr>";
	    }
	    html += "</table>";
	    document.getElementById('stmbrowse_detail_'+index).innerHTML = html;
	},
	sortObjects: function (elem, index, type) {
	    renderer = Retina.RendererInstances.stmbrowse[index];
	    if (elem.nodeName == 'SELECT') {
		renderer.settings.sortAtt = elem.options[elem.selectedIndex].value;
	    } else if (elem.nodeName == "A") {
		if (elem.innerHTML == "▲") {
		    elem.innerHTML = "▼";
		    renderer.settings.sortDir = 'desc';
		} else {
		    elem.innerHTML = "▲";
		    renderer.settings.sortDir = 'asc';
		}
	    }
	    var objects = [];
	    for (var i=0;i<renderer.settings.filterIds[type].length;i++) {
		objects.push(renderer.settings.data[type][renderer.settings.filterIds[type][i]]);
	    }
	    objects.sort(renderer.objectSort);
	    var ids = [];
	    for (var i=0;i<objects.length;i++) {
		ids.push(objects[i].id);
	    }

	    renderer.settings.filterIds[type] = ids;
	    renderer.settings.currItem[type] = 0;
	    renderer.fillDetail(index, type);
	},
	objectSort: function (a,b) {
	    att = Retina.RendererInstances.stmbrowse[1].settings.sortAtt;
	    dir = (Retina.RendererInstances.stmbrowse[1].settings.sortDir == 'asc') ? 1 : -1;
	    if (a[att] < b[att]) {
		return 1 * dir;
	    }
	    if (a[att] > b[att]) {
		return -1 * dir;
	    }
	    
	    return 0;
	},
	filterOptions: function (elem, index) {
	    renderer = Retina.RendererInstances.stmbrowse[index];
	    elem.style.display = "none";
	    elem.nextSibling.style.display = "";
	    elem.parentNode.nextSibling.style.display = "";
	},
	filter: function (e, index) {
	    renderer = Retina.RendererInstances.stmbrowse[index];

	    if (e.keyCode == 13) {
		var t = e.currentTarget;
		var val = t.value.toLowerCase();
		var comp = t.previousSibling.previousSibling.innerHTML;
		var field = t.parentNode.previousSibling.lastChild;
		field = field.options[field.selectedIndex].value;
		var new_ids = [];
		var old_ids = renderer.settings.filterIds[renderer.settings.activeType];
		var dataType = 'number';
		if (isNaN(renderer.settings.data[renderer.settings.activeType][old_ids[0]][field]) != NaN) {
		    dataType = 'string';
		}
		for (var i=0;i<old_ids.length;i++) {
		    var a = typeof renderer.settings.data[renderer.settings.activeType][old_ids[i]][field].toLowerCase == 'function' ? renderer.settings.data[renderer.settings.activeType][old_ids[i]][field].toLowerCase() : renderer.settings.data[renderer.settings.activeType][old_ids[i]][field];
		    if (comp == "⊆") {
			if (a.indexOf(val) > -1) {
			    new_ids.push(old_ids[i]);
			}
		    } else if (comp == "≤") {
			if (dataType == 'string') {
			    if (a <= val) {
				new_ids.push(old_ids[i]);
			    }
			} else {
			    if (parseFloat(a) <= parseFloat(val)) {
				new_ids.push(old_ids[i]);
			    }
			}
		    } else {
			if (dataType == 'string') {
			    if (a >= val) {
				new_ids.push(old_ids[i]);
			    }
			} else {
			    if (parseFloat(a) >= parseFloat(val)) {
				new_ids.push(old_ids[i]);
			    }
			}
		    }
		}

		t.parentNode.style.display = "none";
		t.parentNode.previousSibling.lastChild.style.display = "none";
		t.parentNode.previousSibling.lastChild.previousSibling.style.display = "";

		var newFilter = document.createElement('div');
		newFilter.innerHTML = "<i class='icon-remove-circle' style='cursor: pointer; float: right; opacity: 0.5;' title='remove filter' onclick='Retina.RendererInstances.stmbrowse["+index+"].removeFilter("+index+", this, "+renderer.settings.filter[renderer.settings.activeType].length+");'></i> "+field+" "+comp+" "+t.value;
		t.parentNode.parentNode.insertBefore(newFilter, t.parentNode.nextSibling);

		t.parentNode.parentNode.parentNode.previousSibling.lastChild.innerHTML = new_ids.length;
		
		renderer.settings.filter[renderer.settings.activeType].push({ "field": field, "comp": comp, "val": t.value });
		renderer.settings.filterIds[renderer.settings.activeType] = new_ids;
		renderer.settings.currItem[renderer.settings.activeType] = 0;
		renderer.fillDetail(index, renderer.settings.activeType);
	    }
	},
	removeFilter: function (index, icon, filterIndex) {
	    renderer = Retina.RendererInstances.stmbrowse[index];
	    delete renderer.settings.filter[renderer.settings.activeType][filterIndex];
	    var new_ids = [];
	    var old_ids = Retina.keys(renderer.settings.data[renderer.settings.activeType]);
	    for (var h=0;h<renderer.settings.filter[renderer.settings.activeType].length;h++) {
		if (renderer.settings.filter[renderer.settings.activeType][h] == undefined) {
		    continue;
		}
		var dataType = 'string';
		var field = renderer.settings.filter[renderer.settings.activeType][h].field;
		var comp = renderer.settings.filter[renderer.settings.activeType][h].comp;
		var val = renderer.settings.filter[renderer.settings.activeType][h].val;
		if (parseFloat(renderer.settings.data[renderer.settings.activeType][old_ids[0]][field]) != NaN) {
		    dataType = 'number';
		} else if (new Date(renderer.settings.data[renderer.settings.activeType][old_ids[0]][field]) != "Invalid Date") {
		    dataType = 'date';
		}
		for (var i=0;i<old_ids.length;i++) {
		    var a = renderer.settings.data[renderer.settings.activeType][old_ids[i]][field].toLowerCase();
		    if (comp == "⊆") {
			if (a.indexOf(val) > -1) {
			    new_ids.push(old_ids[i]);
			}
		    } else if (comp == "≤") {
			if (dataType == 'string') {
			    if (a <= val) {
				new_ids.push(old_ids[i]);
			    }
			} else {
			    if (parseFloat(a) <= parseFloat(val)) {
				new_ids.push(old_ids[i]);
			    }
			}
		    } else {
			if (dataType == 'string') {
			    if (a >= val) {
				new_ids.push(old_ids[i]);
			    }
			} else {
			    if (parseFloat(a) >= parseFloat(val)) {
				new_ids.push(old_ids[i]);
			    }
			}
		    }
		}
		old_ids = new_ids.slice(0);
		new_ids = [];
	    }
	    icon.parentNode.parentNode.parentNode.parentNode.firstChild.lastChild.innerHTML = old_ids.length;
	    renderer.settings.filterIds[renderer.settings.activeType] = old_ids;
	    renderer.settings.currItem[renderer.settings.activeType] = 0;
	    icon.parentNode.parentNode.removeChild(icon.parentNode);
	    renderer.sortObjects({nodeName: ""}, index, renderer.settings.activeType);
	},
	export: function (index) {
	    renderer = Retina.RendererInstances.stmbrowse[index];
	    var exportString = [];
	    for (var i=0;i<renderer.settings.filterIds[renderer.settings.activeType].length;i++) {
		exportString.push(JSON.stringify(renderer.settings.data[renderer.settings.activeType][renderer.settings.filterIds[renderer.settings.activeType][i]], undefined, 2));
	    }
	    stm.saveAs(exportString.join(",\n"), renderer.settings.activeType+"-export.json");
	}
    });
}).call(this);
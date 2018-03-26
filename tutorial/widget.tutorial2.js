(function () {
    var widget = Retina.Widget.extend({
	about: {
            title: "Extended Tutorial Widget",
            name: "tutorial2",
	    version: 1,
            author: "Tobias Paczian",
            requires: [ ]
        }
    });

    widget.setup = function () {
	return [ Retina.load_renderer('table') ];
    }

    widget.author = "Stephen King";
    
    widget.display = function (params) {
	var widget = this;

	widget.params = params || widget.params;
	var target = widget.params.target;

	var authorSelect = document.createElement('div');
	target.appendChild(authorSelect);
	authorSelect.setAttribute('style', 'text-align: center;');
	authorSelect.innerHTML = '<div class="input-append input-prepend"><span class="add-on">author</span><input type="text" id="authorselect" value="'+widget.author+'"><button class="btn" onclick="Retina.WidgetInstances.tutorial2[1].search();">search</button></div>';

	var info = document.createElement('div');
	target.appendChild(info);
	info.setAttribute('style', 'text-align: center;');
	info.innerHTML = '<div id="info" class="alert alert-info" style="display: none;"></div>';
	
	var rendererTarget = document.createElement('div');
	target.appendChild(rendererTarget);
	rendererTarget.innerHTML = '<div style="text-align: center;"><img src="Retina/images/loading.gif"></div>';
	
	widget.table = Retina.Renderer.create('table', { 'target': rendererTarget } );
	
	stm.add_repository({ "url": RetinaConfig.api_url, "name": "books", "data": "docs", "total_count": "numFound", "id": "cover_i" });
	widget.loadData();
	
	return widget;
    };

    widget.search = function () {
	var widget = this;

	widget.author = document.getElementById('authorselect').value;
	widget.loadData();
	
	return widget;
    };

    widget.loadData = function () {
	var widget = this;

	widget.table.settings.target.innerHTML = '<div style="text-align: center;"><img src="Retina/images/loading.gif"></div>';
	stm.DataStore.books = {};
	document.getElementById('info').style.display= 'none';
	stm.get_objects({'type': 'search.json', 'target': 'books', 'options': { 'author': widget.author, 'limit': 100 } }).then(
	    function () {
		var widget = Retina.WidgetInstances.tutorial2[1];
		widget.showTable();
	    }
	);

	return widget;
    };

    widget.showTable = function () {
	var widget = this;

	var data = stm.DataStore.books;

	var header = [ 'title', 'year', 'publisher' ];
	var tdata = [];
	var k = Retina.keys(data);

	if (! k.length) {
	    document.getElementById('info').style.display = '';
	    document.getElementById('info').innerHTML = 'no books found for that author';
	    return;
	} else {
	    document.getElementById('info').style.display = 'none';
	}
	
	for (let i=0; i<k.length; i++) {
	    var row = data[k[i]];
	    tdata.push([row.title ? row.title : "-", row.publish_year && row.publish_year.length ? row.publish_year[0] : "-", row.publisher && row.publisher.length ? row.publisher[0] : "-" ]);
	}
	
	widget.table.settings.target.innerHTML = '';
	widget.table.settings.tdata = null;
	widget.table.settings.data = { "data": tdata, "header": header };
	widget.table.settings.sorttype = { 0: "string", 1: "number", 2: "string" };
	widget.table.settings.filter_autodetect = true;
	
	widget.table.render();
	
	return widget;
    };

})();

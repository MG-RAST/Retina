(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "Metagenome Search Widget",
                name: "metagenome_search",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [ Retina.add_renderer({"name": "table", "resource": "./renderers/",  "filename": "renderer.table.js" }),
  		 Retina.load_renderer("table") ];
    };
    
    widget.query = "";
    widget.sort = "name";
    widget.sortDir = "asc";
    widget.offset = 0;
    widget.limit = 20;

    widget.display = function (params) {
        widget = Retina.WidgetInstances.metagenome_search[1];

	if (params && params.main) {
	    widget.main = params.main;
	    widget.sidebar = params.sidebar;
	}
	var content = widget.main;
	var sidebar = widget.sidebar;

	jQuery.extend(widget, params);
	
	// set the output area
	// search field
	var html = "<div class='input-append' style='float: left;'><input type='text' id='searchtext' style='border-radius: 15px 0 0 15px; margin-left: 10px;' placeholder='enter search term' class='span5'><button class='btn' onclick='Retina.WidgetInstances.metagenome_search[1].queryAPI();' style='border-radius: 0 15px 15px 0;'>search</button></div>";

	// option buttons
	html += "<div style='float: left; position: relative; top: 4px;'><p style='float: left; font-size: 11px; margin-left: 25px; margin-right: 5px; position: relative; top: 1px;'>search in</p><div class='btn-group'><button class='btn btn-mini span1 active' data-toggle='button' id='metadata_button'>metadata</button><button class='btn btn-mini span1' data-toggle='button' id='function_button'>function</button><button class='btn btn-mini span1' data-toggle='button' id='organism_button'>organism</button></div></div>";

	// result text
	html += "<div style='float: left; font-size: 12px; left: 20px; position: relative; top: 5px;' id='result_text'></div>";

	// result section
	html += "<div id='result' style='clear: both; overflow-y: auto; position: absolute; top: 70px; bottom: 0px;'></div>";

	content.innerHTML = html;

	document.getElementById('searchtext').addEventListener('keypress', function (event) {
	    event = event || window.event;
	    
	    if (event.keyCode == 13) {
		Retina.WidgetInstances.metagenome_search[1].queryAPI();
	    }
	});

	// check if a search got passed
	if (Retina.cgiParam("search")) {
	    document.getElementById('searchtext').value = Retina.cgiParam("search");

	    if (Retina.cgiParam("opt_mg")) {
		if (Retina.cgiParam("opt_mg") == "on") {
		    document.getElementById('metadata_button').className = "btn btn-mini span1 active";
		} else {
		    document.getElementById('metadata_button').className = "btn btn-mini span1";
		}
	    }
	    if (Retina.cgiParam("opt_fn")) {
		if (Retina.cgiParam("opt_fn") == "on") {
		    document.getElementById('function_button').className = "btn btn-mini span1 active";
		} else {
		    document.getElementById('function_button').className = "btn btn-mini span1";
		}
	    }
	    if (Retina.cgiParam("opt_og")) {
		if (Retina.cgiParam("opt_og") == "on") {
		    document.getElementById('organism_button').className = "btn btn-mini span1 active";
		} else {
		    document.getElementById('organism_button').className = "btn btn-mini span1";
		}
	    }

	    Retina.WidgetInstances.metagenome_search[1].queryAPI();
	}
    };
    
    widget.resultTable = function (data, total_count) {
	widget = Retina.WidgetInstances.metagenome_search[1];

	var showing = "all matches.";
	var num = 0;
	for (var i in data) {
	    if (data.hasOwnProperty(i)) {
		num++;
	    }
	}
	if (num < total_count) {
	    showing = "the first "+num+" matches.";
	}
	if (total_count == 0) {
	    document.getElementById('result_text').innerHTML = "Your search returned no results.";
	} else {
	    document.getElementById('result_text').innerHTML = "Your search returned "+total_count+" results. Showing "+showing;
	}

	var html = "";
	
	html += "<table class='table' style='font-size: 12px;'><thead><tr>";
	var fields = ["sequence_type", "name", "id", "project_name", "biome", "feature", "material", "country", "location"];
	var fnames = ["Seq&nbsp;Type", "Metagenome", "MG-RAST&nbsp;ID", "Project", "Biome", "Feature", "Material", "Country", "Location"];
	var widths = [ 85, 105, 105, 85, 85, 85, 85, 85, 85 ];
	for (i=0;i<fields.length;i++) {
	    var style_a = "";
	    var style_d = "";
	    if (widget.sort == fields[i]) {
		if (widget.sortDir == 'asc') {
                    style_a = "border: 1px solid #0088CC; border-radius: 7px; padding: 1px 1px 2px;";
		} else {
                    style_b = "border: 1px solid #0088CC; border-radius: 7px; padding: 1px 1px 2px;";
		}
            }
            html += "<th style='min-width: "+widths[i]+"px;'>"+fnames[i]+"&nbsp;<img onclick=\"Retina.WidgetInstances.metagenome_search[1].sortQuery(\'"+fields[i]+"\', \'asc\');\" src=\"images/up-arrow.gif\" style=\"cursor: pointer;"+style_a+"\" />"+
                "<img onclick=\"Retina.WidgetInstances.metagenome_search[1].sortQuery(\'"+fields[i]+"\', \'desc\');\" src=\"images/down-arrow.gif\" style=\"cursor: pointer;"+style_d+"\" />";
	    
            html += "</th>";
	}
	html += "</tr></thead><tbody>";
	
	var rows = [];
	for (var i in data) {
            if (data.hasOwnProperty(i)) {
		rows.push( [ i, data[i].name ] );
            }
	}

	for (i=0;i<rows.length;i++) {
	    
            data[rows[i][0]]["project_id"] = data[rows[i][0]]["project_id"].substr(3);
            data[rows[i][0]]["id"] = data[rows[i][0]]["id"].substr(3);
	    
            html += "<tr>";
            html += "<td>"+data[rows[i][0]]["sequence_type"]+"</td>";
            html += "<td style='max-width: 200px; overflow: hidden;'><a href='?mgpage=overview&metagenome="+data[rows[i][0]]["id"]+"' target=_blank title='"+data[rows[i][0]]["name"]+"'>"+data[rows[i][0]]["name"]+"</a></td>";
            html += "<td>"+data[rows[i][0]]["id"]+"</td>";
            html += "<td><a href='?mgpage=project&project="+data[rows[i][0]]["project_id"]+"' target=_blank>"+data[rows[i][0]]["project_name"]+"</a></td>";
            html += "<td>"+data[rows[i][0]]["biome"]+"</td>";
            html += "<td>"+data[rows[i][0]]["feature"]+"</td>";
            html += "<td>"+data[rows[i][0]]["material"]+"</td>";
            html += "<td>"+data[rows[i][0]]["country"]+"</td>";
            html += "<td>"+data[rows[i][0]]["location"]+"</td>";
            html += "</tr>";
	}
        
	html += "<tbody></table>";

	if (num < total_count) {
	    html += "<div><table width=100% style='text-align: center;'><tr><td><button class='btn btn-mini' onclick='Retina.WidgetInstances.metagenome_search[1].queryAPI(true);'>more</button></td></tr></table></div>";
	}

	return html;
    };

    widget.queryAPI = function (more) {
	widget = Retina.WidgetInstances.metagenome_search[1];
	
	// get params
	widget.query = document.getElementById("searchtext").value;
	
	if (! stm.DataStore.hasOwnProperty('search') ) {
	    stm.DataStore.search = {};
	}
	if (more) {
	    widget.offset += widget.limit;
	} else {
	    stm.DataStore.search = {};
	    widget.offset = 0;
	}

	var api_url = stm.Config.mgrast_api + '/metagenome?verbosity=mixs&';
			
	// metadata function organism
	var type = [];
	var poss = [ 'metadata', 'organism', 'function' ];
	for (var i=0; i<poss.length; i++) {
	    var btn = document.getElementById(poss[i] + '_button');
	    for (var h=0; h<btn.classList.length; h++) {
		if (btn.classList[h] == 'active') {
		    type.push(poss[i]);
		    break;
		}
	    }
	}
	
	if (widget.query === null) {
	    console.log('invalid request, missing query parameter');
	    return;
	}
	
	var query_str = "";
	for (h=0;h<type.length; h++) {
	    if(query_str == "") {
		query_str = type[h] + "=" + widget.query;
	    } else {
		query_str += "&" + type[h] + "=" + widget.query;
	    }
	}
	
	var url = api_url + query_str + "&order=" + widget.sort + "&direction=" + widget.sortDir + "&match=any" + "&limit=" + widget.limit + "&offset=" + widget.offset;
	
	if (stm.Authorization) {
	    url += "&auth=" + stm.Authorization;
	}

	jQuery.getJSON(url, function(data) {
	    for (i=0;i<data.data.length;i++) {
		stm.DataStore.search[data.data[i]["id"]] = data.data[i];
	    }

	    document.getElementById('result').innerHTML = Retina.WidgetInstances.metagenome_search[1].resultTable(stm.DataStore.search, data.total_count);
	});
	
	return;
    }
    
})();
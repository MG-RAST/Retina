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
    
    widget.type = [ "metadata" ];
    widget.query = "";
    widget.sort = "name";
    widget.sortDir = "asc";
    widget.offset = 0;
    widget.limit = 10;

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
	content.innerHTML = "<h3>Search</h3><div class='input-append'><input type='text' id='searchtext' style='border-radius: 15px 0 0 15px; margin-left: 10px;' placeholder='search MG-RAST'><button class='btn' onclick='Retina.WidgetInstances.metagenome_search[1].queryAPI();' style='border-radius: 0 15px 15px 0;'>search</button></div><br><div id='result'></div>";

	document.getElementById('searchtext').addEventListener('keypress', function (event) {
	    event = event || window.event;
	    
	    if (event.keyCode == 13) {
		Retina.WidgetInstances.metagenome_search[1].queryAPI();
	    }
	});
    };
    
    widget.resultTable = function (data) {
	widget = Retina.WidgetInstances.metagenome_search[1];

	var html = "";
	
	html += "<table class='table'><tr>";
	var fields = ["sequence_type", "name", "id", "project_name", "biome", "feature", "material", "country", "location"];
	var fnames = ["Seq&nbsp;Type", "Metagenome", "MG-RAST&nbsp;ID", "Project", "Biome", "Feature", "Material", "Country", "Location"];
	for (i=0;i<fields.length;i++) {
            html += "<th>"+fnames[i]+"<img onclick=\"Retina.WidgetInstances.metagenome_search[1].sortQuery(\'"+fields[i]+"\', \'asc\');\" src=\"images/up-arrow.gif\" style=\"cursor: pointer\" />"+
                "<img onclick=\"Retina.WidgetInstances.metagenome_search[1].sortQuery(\'"+fields[i]+"\', \'desc\');\" src=\"images/down-arrow.gif\" style=\"cursor: pointer\" />";
	    
            if (widget.sort == fields[i]) {
		if (widget.sortDir == 'asc') {
                    html += "<br /><span style=\"font-weight:normal\"><i>(ascending)</i></span>";
		} else {
                    html += "<br /><span style=\"font-weight:normal\"><i>(descending)</i></span>";
		}
        }
            html += "</th>";
	}
	html += "</tr>";
	
	var rows = [];
	for (i in data) {
            if (data.hasOwnProperty(i)) {
		rows.push( [ data[i].id, data[i].name ] );
            }
	}
        
	for (i=0;i<rows.length;i++) {
            data[rows[i][0]]["project_id"] = data[rows[i][0]]["project_id"].substr(3);
            data[rows[i][0]]["id"] = data[rows[i][0]]["id"].substr(3);
	    
            html += "<tr>";
            html += "<td>"+data[rows[i][0]]["sequence_type"]+"</td>";
            html += "<td><a href='?page=MetagenomeOverview&metagenome="+data[rows[i][0]]["id"]+"' target=_blank>"+data[rows[i][0]]["name"]+"</a></td>";
            html += "<td>"+data[rows[i][0]]["id"]+"</td>";
            html += "<td><a href='?page=MetagenomeProject&project="+data[rows[i][0]]["project_id"]+"' target=_blank>"+data[rows[i][0]]["project_name"]+"</a></td>";
            html += "<td>"+data[rows[i][0]]["biome"]+"</td>";
            html += "<td>"+data[rows[i][0]]["feature"]+"</td>";
            html += "<td>"+data[rows[i][0]]["material"]+"</td>";
            html += "<td>"+data[rows[i][0]]["country"]+"</td>";
            html += "<td>"+data[rows[i][0]]["location"]+"</td>";
            html += "</tr>";
	}
        
	html += "</table>";

	return html;
    };

    widget.queryAPI = function () {
	widget = Retina.WidgetInstances.metagenome_search[1];
	
	// get params
	widget.query = document.getElementById("searchtext").value;

	var api_url = stm.Config.mgrast_api + '/metagenome?verbosity=mixs&';
			
	if (typeof widget.type == "string") {
	    widget.type = [ widget.type ];
	}
	
	if (widget.query === null) {
	    console.log('invalid request, missing query parameter');
	    return;
	}
	
	var query_str = "";
	for (h=0;h<widget.type.length; h++) {
	    if(query_str == "") {
		query_str = widget.type[h] + "=" + widget.query;
	    } else {
		query_str += "&" + widget.type[h] + "=" + widget.query;
	    }
	}
	
	var url = api_url + query_str + "&order=" + widget.sort + "&direction=" + widget.sortDir + "&match=any" + "&limit=" + widget.limit + "&offset=" + widget.offset;
	
	if (stm.Authorization) {
	    url += "&auth=" + stm.Authorization;
	}

	jQuery.getJSON(url, function(data) {
	    if (! stm.DataStore.hasOwnProperty('metagenome')) {
		stm.DataStore.metagenome = {};
	    }
	    
	    for (i=0;i<data.data.length;i++) {
		stm.DataStore.metagenome[data.data[i]["id"]] = data.data[i];
	    }

	    document.getElementById('result').innerHTML = Retina.WidgetInstances.metagenome_search[1].resultTable(stm.DataStore.metagenome);
	});
	
	return;
    }
    
})();
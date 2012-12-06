/*
  Paragraph Renderer

  Displays a text structure in an HTML formatted way

  Options

  width (STRING)
      Width of the output.
      Can be either a bootstrap class name specifying a width (span1 .. span12) or a width in pixel.
      Default is span8.

  data (LIST of Objects to render)
      Title string written at the top of the graph
  
  title_color (CSS Color Value)
      Color of title text. Default is black.

  header_color (CSS Color Value)
      Color of header text. Default is black.

  text_color (CSS Color Value)
      Color of text paragraphs. Default is black.

  raw (BOOLEAN)
      If set to true, expects data to be a string of HTML which will be rendered directly.
      Default is false.

  toc (BOOLEAN)
      If set to true will display a table of contents. Default is false.
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "paragraph",
	    title: "Paragraph",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		'width': 'span8',
		'data': '',
		'title_color': 'black',
		'header_color': 'black',
		'text_color': 'black',
		'raw': false,
		'toc': false
	    },
	},
	exampleData: function () {
	    return [ { title: "Hello World" },
		     { header: "About" },
		     { p: "Say hello to the world, it likes being greeted this way. Do not be afraid, everything will be ok. I will end this paragraph now and start another." },
		     { p: "This is the next paragraph, feel free to read it. I hope it is not too long. Next up is a table." },
		     { header: "A simple table" },
		     { table: [ 
			 [ { header: "header cell 1" }, "data cell 1" ],
			 [ { header: "header cell 2" }, "data cell 2" ],
			 [ { header: "header cell 3" }, "data cell 3" ],
			 [ { header: "header cell 4" }, "data cell 4" ] ] } ];
        },
	render: function (options) {
	    var toc = "";
	    if (options.raw) {
		options.target.innerHTML = options.data;
	    } else {
		options.target.innerHTML = "";
		
		var html_string = "<style>\
#para"+renderer.index+" > h2 { color: "+options.title_color+"; }\
#para"+renderer.index+" > h3 { color: "+options.header_color+"; }\
#para"+renderer.index+" > p { color: "+options.text_color+"; }\
</style><div id='para"+renderer.index+"' ";
		if (options.width.match(/^\d+$/)) {
		    html_string += "style='width: "+options.width+"px;'>";
		} else {
		    html_string += "class='"+options.width+"'>";
		}
		for (i=0; i<options.data.length; i++) {
		    if (options.data[i].hasOwnProperty('title')) {
			html_string += "<h2>"+options.data[i].title+"</h2>";
		    } else if (options.data[i].hasOwnProperty('header')) {
			html_string += "<h3>"+options.data[i].header+"</h3>";
		    } else if (options.data[i].hasOwnProperty('p')) {
			html_string += "<p>"+options.data[i].p+"</p>";
		    } else if (options.data[i].hasOwnProperty('table')) {
			html_string += "<table>";
			for (h=0;h<options.data[i].table.length;h++) {
			    html_string += "<tr>";
			    for (j=0;j<options.data[i].table[h].length;j++) {
				if (typeof(options.data[i].table[h][j]) == 'object') {
				    if (options.data[i].table[h][j].hasOwnProperty('header')) {
					html_string += "<th>"+options.data[i].table[h][j].header+"</th>";
				    }
				} else {
				    html_string += "<td>"+options.data[i].table[h][j]+"</td>";
				}
			    }
			    html_string += "</tr>";
			}
			html_string += "</table>";
		    }
		}
		html_string += "</div>";

		options.target.innerHTML = html_string;
	    }
	    return renderer;
	}
    });
 }).call(this);

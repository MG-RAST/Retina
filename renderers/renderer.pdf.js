(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "pdf",
	    title: "PDF",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: [ 'jspdf.all.js' ],
	    defaults: {
		'top_margin' : 40,
		'left_margin': 40,
		'right_margin': 40,
		'header': { 'fontSize': 20,
			    'fontStyle': 'Bold',
			    'fontName': 'Times'
			  },
		'subheader': { 'fontSize': 16,
			       'fontStyle': 'Italic',
			       'fontName': 'Times'
			     },
		'heading': { 'fontSize': 14,
			     'fontStyle': 'Bold',
			     'fontName': 'Times'
		},
		'paragraph': { 'fontSize': 12,
			       'fontStyle': 'Roman',
			       'fontName': 'Times'
			     },
		'image_subtitle': { 'fontSize': 12,
				    'fontStyle': 'Italic',
				    'fontName': 'Times'
				  }
	    },
	},
	fontSize: 16,
	exampleData: function () {
	    return "";
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    renderer.doc = new jsPDF("p", "pt", "letter");
	    renderer.width = 612 - renderer.settings.left_margin - renderer.settings.right_margin;
	    renderer.y = renderer.settings.top_margin;

	    return renderer;
	},
	output: function (filename, index) {
	    var renderer = Retina.RendererInstances.pdf[index || 1];
	    renderer.doc.save(filename ||'output.pdf');
	},
	paragraph: function (text, font, index) {
	    var renderer = Retina.RendererInstances.pdf[index || 1];
	    if (font) {
		renderer.setFont(font);
	    }
	    var text = renderer.doc.splitTextToSize(text, renderer.width);
	    renderer.doc.text(renderer.settings.left_margin, renderer.y, text);
	    renderer.y += 1.15 * (text.length + 1) * renderer.fontSize;
	    
	},
	table: function (columns, data, index) {
	    var renderer = Retina.RendererInstances.pdf[index || 1];
	    renderer.doc.autoTable(columns, data, { margins: { horizontal: 40, top: 20 + renderer.y, bottom: 40, topbase: renderer.settings.top_margin } });
	    renderer.y += (data.length + 1) * 20 + 40 + 50;
	},
	setFont: function (font, index) {
	    var renderer = Retina.RendererInstances.pdf[index || 1];
	    renderer.doc.setFont(renderer.settings[font].fontName, renderer.settings[font].fontStyle);
	    renderer.doc.setFontSize(renderer.settings[font].fontSize);
	    renderer.fontSize = renderer.settings[font].fontSize;
	}
    });
 }).call(this);

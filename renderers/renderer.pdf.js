(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "pdf",
	    title: "PDF",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: [ 'jspdf.all.js', 'canvg.js' ],
	    defaults: {
		'top_margin'   : 40,
		'left_margin'  : 40,
		'right_margin' : 40,
		'bottom_margin': 40,
		'header': { 'fontSize': 14,
			    'fontStyle': 'Bold',
			    'fontName': 'Helvetica'
			  },
		'subheader': { 'fontSize': 11,
			       'fontStyle': 'Oblique',
			       'fontName': 'Helvetica'
			     },
		'heading': { 'fontSize': 12,
			     'fontStyle': 'Bold',
			     'fontName': 'Helvetica'
			   },
		'paragraph': { 'fontSize': 10,
			       'fontStyle': 'Roman',
			       'fontName': 'Times'
			     },
		'image_subtitle': { 'fontSize': 10,
				    'fontStyle': 'Oblique',
				    'fontName': 'Helvetica'
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

	    renderer.doc = new jsPDF({ orientation: "p", unit: "pt", format: "letter" });
	    renderer.height = 792 - renderer.settings.bottom_margin;
	    renderer.width = 612 - renderer.settings.left_margin - renderer.settings.right_margin;
	    renderer.y = renderer.settings.top_margin;

	    return renderer;
	},
	checkPage: function (index, height) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];
	    if (height) {
		if (renderer.y + height > renderer.height) {
		    renderer.y = renderer.settings.top_margin;
		    renderer.doc.addPage();
		}
	    }
	    if (renderer.y > renderer.height) {
		renderer.y = renderer.settings.top_margin;
		renderer.doc.addPage();
	    }
	},
	output: function (filename, index) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];
	    stm.saveAs(renderer.doc.output('datauristring'), filename || 'output.pdf', true);
	},
	paragraph: function (text, font, index) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];
	    if (font) {
		renderer.setFont(font);
	    }
	    var text = renderer.doc.splitTextToSize(text, renderer.width);
	    renderer.doc.text(renderer.settings.left_margin, renderer.y, text);
	    renderer.y += 1.15 * (text.length + 1) * renderer.fontSize;
	    renderer.checkPage(index);
	},
	table: function (columns, data, index) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];
	    renderer.doc.autoTable(columns, data, { margins: { horizontal: 40, top: 20 + renderer.y, bottom: 40, topbase: renderer.settings.top_margin } });
	    renderer.y += (data.length + 1) * 20 + 40 + 50;
	    renderer.checkPage(index);
	},
	svgImage: function (id, width, height, index) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];

	    renderer.checkPage(index, height + 20);

	    var svg = document.querySelector(id || 'svg');
	    var serializer = new XMLSerializer();
	    svg = serializer.serializeToString(svg);

	    var canvas = document.createElement('canvas');
	    canvas.setAttribute("width", width +"px");
	    canvas.setAttribute("height", height +"px");
	    document.body.appendChild(canvas);
	    canvg(canvas, svg);
	    var data = canvas.toDataURL();
	    renderer.doc.addImage(data, "png", renderer.settings.left_margin, renderer.y, width, height);
	    
	    //renderer.doc.addSVG(svg, renderer.settings.left_margin, renderer.y + 20, {scale: 0.4});

	    renderer.y += height + 20;
	    document.body.removeChild(canvas);
	},
	setFont: function (font, index) {
	    index = index || 1;
	    var renderer = Retina.RendererInstances.pdf[index];
	    renderer.doc.setFont(renderer.settings[font].fontName, renderer.settings[font].fontStyle);
	    renderer.doc.setFontSize(renderer.settings[font].fontSize);
	    renderer.fontSize = renderer.settings[font].fontSize;
	}
    });
 }).call(this);

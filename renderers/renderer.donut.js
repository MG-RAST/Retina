/*
  Donut Renderer

  Displays a donut.

  Options

  
*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "donut",
	    title: "Donut",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [ "jquery.svg.js",
			"rgbcolor.js" ],
            defaults: {
		'size': 500,
		'rimWidth': 50,
		'rimPadding': 1,
		'title': "",
		'titleFontSize': 15,
		'showTotal': true },
	    options: [
		{ text:
		  [
		      { name: 'title', type: 'text', description: "title of the donut", title: "title" },
		      { name: 'titleFontSize', type: 'fontsize', description: "title font size", title: "title font size" },
		  ]
		},
		{ layout:
		  [
		      { name: 'size', type: 'int', description: "diameter of the donut", title: "size" },
		      { name: 'rimWidth', type: 'int', description: "width of each rim", title: "rim width" },
		      { name: 'rimPadding', type: 'int', description: "padding between two rims", title: "rim padding" },
		      { name: 'showTotal', type: 'select', description: "sets whether the total number is displayed or not", title: "show total", options: [
			  { value: 0, selected: true, label: "no" },
			  { value: 1, label: "yes" } ] }
		  ]
		}
	    ]
	},
	exampleData: function () {
	    return [
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ],
		[ 1, 2, 3, 4, 5, 2.5, 4, 6 ]
	    ];
        },
	
	render: function () {
	    renderer = this;
	    var index = renderer.index;
	    
	    // get the target div
	    var target = renderer.settings.target;
	    target.innerHTML = '<style>\
.donutslice {\
  opacity: 0.7;\
'+(typeof renderer.settings.onclick == 'function' ? 'cursor: pointer;' : '')+'\
}\
.donutslice:hover {\
  opacity: 1;\
}\
</style>';
	    var svgDiv = document.createElement('div');
	    target.appendChild(svgDiv);
	    svgDiv.setAttribute('style', "width: " + renderer.settings.size + "px; height: " + renderer.settings.size +"px; padding-top: 1px;");
	    var svg = jQuery(svgDiv).svg().svg('get');
	    renderer.svg = svg;

	    if (! renderer.settings.data) {
		renderer.settings.data = renderer.exampleData();
	    }
	    var d = renderer.settings.data;
	    var outerRim = renderer.settings.size;
	    var outerTotal;
	    for (var i=0;i<d.length; i++) {
	    	var startDegree = -90;
	    	var colorArr = GooglePalette(d[i].length);
	    	var total = 0;
	    	for (var h=0; h<d[i].length; h++) {
	    	    total += d[i][h];
	    	}
	    	if (i==0) {
	    	    outerTotal = total;
	    	}
	    	for (var h=0; h<d[i].length; h++) {
                    var s = startDegree;
	    	    var e = 360 * d[i][h]/total + s;
	    	    startDegree = e;

	    	    svg.donutslice({ center: parseInt(renderer.settings.size / 2), inner: outerRim - renderer.settings.rimWidth, outer: outerRim, startAngle: s, endAngle: e, settings: { fill: colorArr[h], strokeWidth: 1, stroke: "white", class: "donutslice", onclick: typeof renderer.settings.onclick == 'function' ? "Retina.RendererInstances.donut["+index+"].settings.onclick({ rendererIndex: "+index+", rim: "+i+", slice: "+h+", data: "+d[i][h]+"})" : "" }});
	    	}
	    	outerRim -= renderer.settings.rimWidth + renderer.settings.rimPadding;
	    	if (outerRim - renderer.settings.rimWidth < 0) {
	    	    break;
	    	}
            }
	    if (renderer.settings.title) {
	    	svg.text(null, parseInt(renderer.settings.size / 2), 5 + parseInt(renderer.settings.size / 2) - (renderer.settings.showTotal ? parseInt(renderer.settings.titleFontSize / 2) : 0), renderer.settings.title, { fill: "black", fontSize: renderer.settings.titleFontSize+"px", textAnchor: "middle" });
	    	if (renderer.settings.showTotal) {
	    	    svg.text(null, parseInt(renderer.settings.size / 2), 5 + parseInt(renderer.settings.size / 2) + parseInt(renderer.settings.titleFontSize / 2), outerTotal.formatString(), { fill: "black", fontSize: renderer.settings.titleFontSize+"px", textAnchor: "middle" });
	    	}
	    }
	}
    });
}).call(this);
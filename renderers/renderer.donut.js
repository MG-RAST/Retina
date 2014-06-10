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
		    svg.path(renderer.arc({ 
			center: parseInt(renderer.settings.size / 2),
			size: outerRim,
			innerSize: outerRim - renderer.settings.rimWidth,
			startAngle: s,
			endAngle: e
		    }), { fill: colorArr[h], strokeWidth: 1, stroke: "white", class: "donutslice", onclick: typeof renderer.settings.onclick == 'function' ? "Retina.RendererInstances.donut["+index+"].settings.onclick({ rim: "+i+", slice: "+h+", data: "+d[i][h]+"})" : "" });
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
	},
	// get the path string for a donut slice
	arc: function (params) {

	    var r1 = ((params.size - 1) / 2);
	    var r2 = ((params.innerSize - 1) / 2);

	    var startAngleRad = Math.PI*params.startAngle/180;
	    var endAngleRad = Math.PI*params.endAngle/180;

	    var x1inner = parseInt(params.center + r2*Math.cos(startAngleRad));
	    var y1inner = parseInt(params.center + r2*Math.sin(startAngleRad));

	    var x2inner = parseInt(params.center + r2*Math.cos(endAngleRad));
	    var y2inner = parseInt(params.center + r2*Math.sin(endAngleRad));

	    var x1outer = parseInt(params.center + r1*Math.cos(startAngleRad));
	    var y1outer = parseInt(params.center + r1*Math.sin(startAngleRad));

	    var x2outer = parseInt(params.center + r1*Math.cos(endAngleRad));
	    var y2outer = parseInt(params.center + r1*Math.sin(endAngleRad));

	    r1 = parseInt(r1);
	    r2 = parseInt(r2);

	    var path = "M"+x1inner+","+y1inner+"  L"+x1outer+","+y1outer+"  A"+r1+","+r1+" 0 0,1 "+x2outer+","+y2outer+" L"+x2inner+","+y2inner+"  A"+r2+","+r2+" 0 0,0 "+x1inner+","+y1inner;

	    return path;
	}
    });
}).call(this);
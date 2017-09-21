(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "arranger",
	    title: "Arranger",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: {
		allowColumns: true,
		allowRows: true,
		highlightColor: '#f5f5f5'
	    },
	},
	exampleData: function () {
	    return [ [ 'X', 'hans', 'berta', 'klaus' ],
		     [ 'bacteria', '123', '234', '345' ],
		     [ 'archaea', '543', '432', '321' ],
		     [ 'eukaryota', '678', '789', '890' ],
		     [ 'virus', '98', '987', '876' ] ];
        },
	render: function () {
	    renderer = this;

	    renderer.matrix = renderer.matrix || renderer.settings.matrix || renderer.exampleData();

	    var matrix = jQuery.extend(true, [], renderer.matrix);
	    
	    var index = { "rows": [], "cols": [] };
	    if (renderer.matrixindex) {
		index = renderer.matrixindex;
	    } else {
		for (var i=1; i<matrix.length; i++) {
		    index.cols.push(i);
		}
		for (var i=1; i<matrix[0].length; i++) {
		    index.rows.push(i);
		}
		renderer.matrixindex = index;
	    }
	    
	    var html = [];
	    
	    html.push('<table class="table table-bordered" id="arranger_table_'+renderer.index+'">');
	    
	    for (var i=0; i<matrix.length; i++) {
		html.push('<tr>');
		for (var h=0; h<matrix[i].length; h++) {
		    var x = 0;
		    if (i>0) {
			x = index.cols[i - 1];
		    }
		    var y = 0;
		    if (h>0) {
			y = index.rows[h - 1];
		    }
		    
		    html.push('<td onmouseover="Retina.RendererInstances.arranger['+renderer.index+'].over(event);" onmouseout="Retina.RendererInstances.arranger['+renderer.index+'].out(event);">'+matrix[x][y]+'</td>');
		}
		html.push('</tr>');
	    }
	    
	    html.push('</table>');
	    
	    renderer.settings.target.innerHTML = html.join('');
	    
	    return renderer;
	},
	over: function (event) {
	    var renderer = this;

	    event = event || window.event;

	    var x = event.target.cellIndex;
	    var y = event.target.parentElement.rowIndex;
	    if (renderer.settings.allowRows) {
		jQuery('#arranger_table_'+renderer.index+' tr:nth-child('+(y+1)+')').css('background-color', renderer.settings.highlightColor);
	    }
	    if (renderer.settings.allowColumns) {
		jQuery('#arranger_table_'+renderer.index+' td:nth-child('+(x+1)+')').css('background-color', renderer.settings.highlightColor);
	    }
	},
	out: function (event) {
	    var renderer = this;

	    event = event || window.event;

	    jQuery('#arranger_table_'+renderer.index+' td').css('background-color', '');
	    jQuery('#arranger_table_'+renderer.index+' tr').css('background-color', '');
	}
    });
 }).call(this);

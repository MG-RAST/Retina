/*
  
  Matrix Renderer

  Renders a matrix of data in a table. The values are highlighted in a colored circle with the relative abundance determining the opacity.

  Options

  target (HTML Container Element)
      Element to render the matrix table in.

  data (ARRAY of ARRAY of NUMBER)
    an object containing { data: array of array of abundances, rows: array of row headers, columns: array of column headers }

  minOpacity (FLOAT)
    minimum opacity of a data cell circle (between 0 and 1), default is 0.1

  callback (FUNCTION)
    function called when a cell is clicked. Will return the following structure: { rendererIndex, rowIndex, colIndex, cellValue, relativeCellValue, colName, rowName, cell, circle }

  circleColor (CSS color value)
    base color of the circles (before opacity is applied), default is 'purple'

  rowColors (HASH of INT -> CSS color value)
    hash of row index pointing to a CSS color value, determining the base color of the circles in that row. Overwrites the default color.

  colColors (HASH of INT -> CSS color value)
    hash of column index pointing to a CSS color value, determining the base color of the circles in that column. Overwrites the default color and row color.

  dataFontSize (CSS font size)
    determines the font size of the values in the cells, default is '10px'

  rowFontSize (CSS font size)
    determines the font size of the row headers, default is 'inherit'

  colFontSize (CSS font size)
    determines the font size of the column headers, default is 'inherit'

  circleSize (INT)
    diameter of the data circles in pixel, default is 30

  colHeaderHeight (INT)
    height of the column header row in pixel, default is 100

*/
(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "matrix",
	    title: "matrix",
            author: "Tobias Paczian",
            version: "1.0",
            requires: [],
            defaults: { minOpacity: 0.1,
			circleColor: 'purple',
			dataFontSize: '10px',
			circleSize: 30,
			colHeaderHeight: 100,
			orientation: 'normal' },
	    options: [
		{ general: 
		  [
		      { name: 'minOpacity', type: 'float', description: "minimum opacity of the data circles", 
			title: "minimum opacity" },
		      { name: 'circleColor', type: 'color', description: "base color of the data circles before opacity applies", 
			title: "circle color" }
		  ]
		},
		{ text:
		  [
		      { name: 'dataFontSize', type: 'fontsize', 
			description: "fontsize of the data circles, must be a valid css font size", title: "data font size" },
		      { name: 'rowFontSize', type: 'fontsize', 
			description: "fontsize of the row titles, must be a valid css font size", title: "row font size" },
		      { name: 'colFontSize', type: 'fontsize', 
			description: "fontsize of the column titles, must be a valid css font size", title: "column font size" }
		  ]
		},
		{ layout: 
		  [
		      { name: 'circleSize', type: 'int', description: "diameter of the data circles in pixel", title: "circle size" },
		      { name: 'colHeaderHeight', type: 'int', description: "height of the column header row in pixel", 
			title: "column header height" },
		      { name: 'orientation', type: 'select', description: "orientation of the plot", title: "orientation", 
			options: [
			    { value: 'normal', selected: true },
			    { value: 'transposed' } ] }
		  ]
		}
	    ]
	},
	exampleData: function () {
	    return { rows: ['metagenome a', 'metagenome b', 'metagenome c'],
		     columns: ['function 1', 'function 2', 'function 3', 'function 4', 'function 5', 'function 6', 'function 7', 'function 8', 'function 9', 'function 10' ],
		     data: [ [1,2,3,4,5,4,3,2,1,0],
			     [5,4,3,2,1,0,1,2,3,4],
			     [0,1,0,4,0,7,0,3,0,2] ] };
        },
	render: function () {
	    var renderer = this;
	    var index = renderer.index;
	    
	    var target = renderer.settings.target;
	    var table = document.createElement('table');
	    
	    renderer.settings.transposedData = renderer.transposeMatrix(renderer.settings.data);

	    var data = renderer.settings.orientation == 'transposed' ? renderer.settings.transposedData : renderer.settings.data;

	    // calculate the relative values
	    var d = data.data;
	    var maxValues = [];
	    for (var i=0;i<d.length;i++) {
		for (var h=0;h<d[i].length;h++) {
		    if (! maxValues[i]) {
			maxValues[i] = 0;
		    }
		    if (maxValues[i] < d[i][h]) {
			maxValues[i] = d[i][h];
		    }
		}
	    }
	    var relativeValues = [];
	    for (var i=0;i<d.length;i++) {
		relativeValues[i] = [];
		for (var h=0;h<d[i].length;h++) {
		    if (d[i][h]) {
			relativeValues[i][h] = d[i][h] / maxValues[i];
		    } else {
			relativeValues[i][h] = 0;
		    }
		}
	    }
	    renderer.settings.relativeValues = relativeValues;
	    
	    var header = document.createElement('tr');
	    header.appendChild(document.createElement('th'));
	    for (var i=0;i<data.columns.length;i++) {
		header.appendChild(renderer.colHeaderCell(index,i));
	    }
	    table.appendChild(header);
	    for (var i=0;i<data.rows.length;i++) {
		var row = document.createElement('tr');
		row.appendChild(renderer.rowHeaderCell(index,i));
		for (var h=0;h<data.data[i].length;h++) {
		    row.appendChild(renderer.dataCell(index,i,h));
		}
		table.appendChild(row);
	    }
	    target.innerHTML = "";
	    target.appendChild(table);
	    
	    return renderer;
	},
	dataCell: function (index, row, col) {
	    var renderer = Retina.RendererInstances.matrix[index];
	    
	    var cell = document.createElement('td');
	    cell.setAttribute('style', 'cursor: pointer;');
	    var div = document.createElement('div');
	    var data = renderer.settings.orientation == 'transposed' ? renderer.settings.transposedData : renderer.settings.data;
	    var val = data.data[row][col];
	    if (val) {
		var bgcolor = renderer.settings.circleColor;
		if (renderer.settings.rowColors && renderer.settings.rowColors[row]) {
		    bgcolor = renderer.settings.rowColors[row];
		}
		if (renderer.settings.colColors && renderer.settings.colColors[col]) {
		    bgcolor = renderer.settings.colColors[col];
		}
		var opacity = renderer.settings.minOpacity;
		if (renderer.settings.relativeValues[row][col] > opacity) {
		    opacity = renderer.settings.relativeValues[row][col];
		}
		div.setAttribute('style', 'opacity: '+opacity+'; background-color: '+bgcolor+'; border-radius: '+renderer.settings.circleSize+'px; color: #FFFFFF; font-size: '+renderer.settings.dataFontSize+'; line-height: '+renderer.settings.circleSize+'px; margin: 5px; vertical-align: middle; text-align: center; width: '+renderer.settings.circleSize+'px;');
		div.innerHTML = val;
	    } else {
		div.setAttribute('style', 'font-size: '+renderer.settings.circleFontSize+'; line-height: '+renderer.settings.circleSize+'px; margin: 5px; vertical-align: middle; text-align: center; width: '+renderer.settings.circleSize+'px;');
		div.innerHTML = '&#8226';
	    }
	    if (typeof renderer.settings.callback == 'function') {
		div.setAttribute('index', index);
		div.setAttribute('row', row);
		div.setAttribute('col', col);
		div.addEventListener('click', function() {
		    var renderer = Retina.RendererInstances.matrix[this.getAttribute('index')];
		    var data = renderer.settings.orientation == 'transposed' ? renderer.settings.transposedData : renderer.settings.data;
		    renderer.settings.callback.call(null, { rendererIndex: this.getAttribute('index'), rowIndex: this.getAttribute('row'), colIndex: this.getAttribute('col'), cellValue: data.data[this.getAttribute('row')][this.getAttribute('col')], relativeCellValue: renderer.settings.relativeValues[this.getAttribute('row')][this.getAttribute('col')], colName: data.columns[this.getAttribute('col')], rowName: data.rows[this.getAttribute('row')], cell: this.parentNode, circle: this });
		});
	    }
	    cell.appendChild(div);

	    return cell;
	},
	rowHeaderCell: function (index, row) {
	    var renderer = Retina.RendererInstances.matrix[index];
	    
	    var data = renderer.settings.orientation == 'transposed' ? renderer.settings.transposedData : renderer.settings.data;
	    var cell = document.createElement('th');
	    cell.innerHTML = data.rows[row];
	    cell.setAttribute('style', 'cursor: pointer; text-align: left; padding-right: 5px; font-weight: normal;'+(renderer.settings.rowFontSize ? "font-size: "+renderer.settings.rowFontSize+";" : ""));
	    if (typeof renderer.settings.callback == 'function') {
		cell.setAttribute('index', index);
		cell.setAttribute('row', row);
		cell.addEventListener('click', function() {
		    var renderer = Retina.RendererInstances.matrix[this.getAttribute('index')];
		    renderer.settings.callback.call(null, { rendererIndex: this.getAttribute('index'), rowIndex: this.getAttribute('row'), colIndex: null, cellValue: data.rows[this.getAttribute('row')], relativeCellValue: null, colName: null, rowName: data.rows[this.getAttribute('row')], cell: this, circle: null });
		});
	    }
	    
	    return cell;
	},
	colHeaderCell: function (index, col) {
	    var renderer = Retina.RendererInstances.matrix[index];
	    
	    var data = renderer.settings.orientation == 'transposed' ? renderer.settings.transposedData : renderer.settings.data;
	    var cell = document.createElement('th');
	    cell.setAttribute('style', 'cursor: pointer; text-align: left; font-weight: normal; vertical-align: bottom; height: '+renderer.settings.colHeaderHeight+'px;'+(renderer.settings.colFontSize ? "font-size: "+renderer.settings.colFontSize+";" : ""));
	    var div = document.createElement('div');
	    div.innerHTML = data.columns[col];
	    div.setAttribute('style', 'width: '+renderer.settings.circleSize+'px; overflow: visible; white-space: nowrap; transform: rotate(-45deg); position: relative; left: '+(parseInt(renderer.settings.circleSize / 2) - 5)+'px; bottom: 10px;');
	    if (typeof renderer.settings.callback == 'function') {
		div.setAttribute('index', index);
		div.setAttribute('col', col);
		div.addEventListener('click', function() {
		    var renderer = Retina.RendererInstances.matrix[this.getAttribute('index')];
		    renderer.settings.callback.call(null, { rendererIndex: this.getAttribute('index'), rowIndex: null, colIndex: this.getAttribute('col'), cellValue: data.columns[this.getAttribute('col')], relativeCellValue: null, colName: data.columns[this.getAttribute('col')], rowName: null, cell: this, circle: null });
		});
	    }
	    cell.appendChild(div);
	    
	    return cell;
	},
	
	transposeMatrix: function (matrix) {
	    var mnew = { rows: matrix.columns,
			 columns: matrix.rows,
			 data: [] };
	    for (var i=0;i<matrix.data.length; i++) {
		for (var h=0;h<matrix.data[i].length;h++) {
		    if (! mnew.data[h]) {
			mnew.data[h] = [];
		    }
		    mnew.data[h][i] = matrix.data[i][h];
		}
	    }
	    
	    return mnew;
	}
    });
}).call(this);

// Login callback function
widget.loginAction = function (data) {
    var widget = Retina.WidgetInstances.$YOURWIDGET[1];
    if (data.user) {
	widget.user = data.user;
	widget.authHeader = { "Auth": data.token };
    } else {
	widget.user = null;
	widget.authHeader = {};
    }
    widget.display();
};

// ajax function
jQuery.ajax(
    { url: $URL,
      method: "GET",
      dataType: "json",
      success: function(data) {
	  var widget = Retina.WidgetInstances.$YOURWIDGET[1];
	  widget.$SOMEFUNCTION(data);
      },
      error: function(jqXHR, error) {
	  console.log(error);
      },
      headers: widget.authHeader
    });

// asynch table
if (! widget.hasOwnProperty($YOURTABLE)) {
    widget.$YOURTABLE = Retina.Renderer.create("table", {
	target: document.getElementById($TABLETARGET),
	rows_per_page: 10,
	filter_autodetect: false,
	filter: { "$COL_A": { "type": "text" },
		  "$COL_C": { "type": "text" } },
	sort_autodetect: true,
	synchronous: false,
	sort: $SORTPROPERTY,
	default_sort: $SORTPROPERTY,
	asynch_column_mapping: { "$COL_B": "metadata.col_b",
				  "$COL_C": "metadata.col_c" },
	invisible_columns: { 3: true },
	data_manipulation: Retina.WidgetInstances.$YOURWIDGET[1].dataManipulation$YOURTABLE,
	minwidths: [150,150,150],
	navigation_url: $API_URL,
	data: { data: [], header: [ "$COL_A", "$COL_B", "$COL_C" ] }
    });
} else {
    widget.result_table.settings.target = document.getElementById($TABLETARGET);
}
widget.result_table.render();
widget.result_table.update({},1);

widget.dataManipulation$YOURTABLE = function (data) {
	
    for (var i=0; i<data.length; i++) {
	data[i].$COL_A = "<a href='mailto:"+data[i].$COL_A+"'>"+data[i].$COL_A+"</a>";
    }
    
    return data;
};
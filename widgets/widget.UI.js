(function () {
    widget = Retina.Widget.extend({
        about: {
                title: "User Interface Widget",
                name: "UI",
                author: "Tobias Paczian",
                requires: [ ]
        }
    });

    widget.contexts = {};
    widget.currentContext = 'home';

    widget.setup = function () {
	return [ ];
    }
    
    widget.display = function (context) {
	switch (context) {
	case 'home':
	    widget.home();
	    break;
	case 'browse':
	    widget.browse();
	    break;
	}
    };

    widget.home = function () {
	var div = document.createElement('div');
	div.className = 'container';

	var cont = document.createElement('div');
	cont.className = 'well';
	cont.setAttribute('style', 'background-color: #111111;');
	cont.setAttribute('id', 'mainContainer');
	var logo = document.createElement('div');
	logo.innerHTML = "<table width=100% id='logo_table'><tr><td style='text-align: center;'><img src='MGRAST_logo.png' style='width: 650px;'></td></tr>\
<tr id='video' style='display: none;'><td align=center><iframe width='420' height='315' src='http://www.youtube.com/embed/pAf19exJo4o?rel=0' frameborder='0' allowfullscreen></iframe>></td></tr>\
<tr id='register' style='display: none;'><td>\
  <form class='form-horizontal well'>\
    <legend>Register a new account</legend>\
    <div class='control-group'>\
      <label class='control-label' for='inputFirstname'>Firstname</label>\
      <div class='controls'>\
        <input type='text' id='inputFirstname' placeholder='firstname' name='firstname'>\
      </div>\
    </div>\
    <div class='control-group'>\
      <label class='control-label' for='inputLastname'>Lastname</label>\
      <div class='controls'>\
        <input type='text' id='inputLastname' placeholder='Lastname' name='lastname'>\
      </div>\
    </div>\
    <div class='control-group'>\
      <label class='control-label' for='inputLogin'>Login</label>\
      <div class='controls'>\
        <input type='text' id='inputLogin' placeholder='login'>\
      </div>\
    </div>\
    <div class='control-group'>\
      <label class='control-label' for='inputEmail'>Email</label>\
      <div class='controls'>\
        <input type='text' id='inputEmail' placeholder='email' name='email'>\
      </div>\
    </div>\
    <div class='control-group'>\
      <div class='controls'>\
        <button type='submit' class='btn'>Register</button>\
      </div>\
    </div>\
  </form>\
</td></tr>\
<tr><td>\
    <div id='news_carousel' class='carousel slide'>\
      <div class='carousel-inner' style='height: 17px; left: 10%; width: 80%;'>\
        <div class='active item'><a href='http://press.igsb.anl.gov/mg-rast/2012/06/19/announcing-drisee-our-new-tool-to-describe-sequencing-error-june-19-2012/' target=_blank style='color: white;'>Announcing DRISEE our new tool to describe sequencing error [June 19, 2012]</a></div>\
        <div class='item'><a href='http://press.igsb.anl.gov/mg-rast/2012/05/31/mg-rast-vs-3-2-released-may-30-2012/' target=_blank style='color: white;'>MG-RAST Version 3.2 released [May 30, 2012]</a></div>\
        <div class='item'><a href='http://press.igsb.anl.gov/mg-rast/2011/11/08/mg-rast-v2-is-being-retired/' target=_blank style='color: white;'>MG-RAST v2 retired [November 21st, 2011]</a></div>\
      </div>\
<br>\
      <a class='carousel-control left' href='#news_carousel' data-slide='prev'>&lsaquo;</a>\
      <a class='carousel-control right' href='#news_carousel' data-slide='next'>&rsaquo;</a>\
    </div>\
</td></tr></table>";

	var navbar = document.createElement('div');
	navbar.className = 'navbar navbar-inverse';
	navbar.innerHTML = '\
<div class="navbar-inner">\
  <ul class="nav">\
    <li><a href="#" onclick="Retina.Widget.UI.switchContext(\'browse\');">Browse</a></li>\
    <li><a href="#" onclick="if(document.getElementById(\'register\').style.display==\'none\'){document.getElementById(\'register\').style.display=\'\';}else{document.getElementById(\'register\').style.display=\'none\'}">Register</a></li>\
    <li><a href="#">Upload</a></li>\
    <li><a href="#">Contact</a></li>\
    <li><a href="#" onclick="if(document.getElementById(\'video\').style.display==\'none\'){document.getElementById(\'video\').style.display=\'\';}else{document.getElementById(\'video\').style.display=\'none\'}">Help</a></li>\
  </ul>\
  <form class="navbar-search pull-right" action="#"><input type="text" class="input-medium search-query" placeholder="search metagenomes"></form>\
    </div>';

	cont.appendChild(navbar);
	cont.appendChild(logo);

	div.appendChild(cont);

	document.body.appendChild(div);
	div.parentNode.setAttribute('style', 'background-color: #555555;');

	var total_height = window.innerHeight || document.body.clientHeight;
	var padding = parseInt(total_height * 0.1);
	var height = (total_height - (2 * padding));
	var theight = height - 50;
	cont.style.height = height.toString() + "px";
	cont.style.marginTop = padding.toString() + "px";
	document.getElementById('logo_table').style.height = theight.toString() + "px";
	jQuery('.carousel').carousel({
	    interval: 8000
	});

	// html2canvas( [ document.getElementById('mainContainer') ], {
	//     onrendered: function( canvas ) {
	// 	var x = document.createElement('img');
	// 	x.setAttribute('src', canvas.toDataURL());
	// 	x.setAttribute('style', 'height: 200px;');
	// 	document.body.appendChild( x );
        //     }
	// });
    }

    widget.browse = function () {
	Retina.load_widget("MGRASTBrowser").then( function () {	    
	    document.body.innerHTML = "";
	    document.body.setAttribute('style', 'background-color: white; padding: 25px; padding-top: 50px;');

	    var progress = document.createElement('div');
	    progress.setAttribute('id', "progressIndicator");
	    progress.setAttribute('class', "alert alert-info");
	    progress.setAttribute('style', "display: none; width: 140px; float: right; margin-right: 20px;");
	    progress.innerHTML = '<b><span id="progressBar"></span></b>';
	    document.body.appendChild(progress);

	    var renderer_space = document.createElement('div');
	    renderer_space.setAttribute('id', 'renderer_space');
	    var selector_space = document.createElement('div');
	    selector_space.setAttribute('id', 'selector_space');
	    var detail_space = document.createElement('div');
	    detail_space.setAttribute('id', 'detail_space');
	    document.body.appendChild(selector_space);
	    document.body.appendChild(renderer_space);
	    document.body.appendChild(detail_space);
	    Retina.Widget.MGRASTBrowser.create( { renderer: renderer_space,
						  selector: selector_space,
						  detail: detail_space } );
	});
    };

    widget.switchContext = function (context) {
	widget.contexts[widget.currentContext] = document.body.innerHTML;
	widget.currentContext = context;
	if (widget.contexts[context]) {
	    document.body.innerHTML = widget.contexts[context];
	} else {
	    widget.display(context);
	}
    };

})();

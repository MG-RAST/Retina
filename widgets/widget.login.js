(function () {
    widget = Retina.Widget.extend({
        about: {
            title: "KBase Login",
            name: "login",
            author: "Tobias Paczian",
            requires: [ ]
        }
    });
    
    widget.setup = function () {
	return [];
    };

    widget.callback = null;
    widget.authResources = { "default": "KBase",
			     "KBase": { "icon": "KBase_favicon.ico",
					"prefix": "kbgo4711" },
			     "MG-RAST": { "icon": "MGRAST_favicon.ico",
					  "prefix": "mggo4711" } };
    
    widget.display = function (wparams) {
	widget = this;
	var index = widget.index;
	
	if (wparams && wparams.hasOwnProperty('authResources')) {
	    widget.authResources = wparams.authResources;
	}

	// append the modals to the body
	var space = document.createElement('div');
	space.innerHTML = widget.modals(index);
	document.body.appendChild(space);

	// put the login thing into the target space
	wparams.target.innerHTML = widget.login_box(index);

	if (wparams.callback && typeof(wparams.callback) == 'function') {
	    widget.callback = wparams.callback;
	}
    };

    widget.modals = function (index) {
	widget = Retina.WidgetInstances.login[index];
	var authResourceSelect = "";
	var loginStyle = "";
	if (Retina.keys(widget.authResources).length > 1) {
	    loginStyle = "class='span3' ";
	    var style = "<style>\
.selector {\
    float: right;\
    border: 1px solid #CCCCCC;\
    border-radius: 4px;\
    padding: 2px;\
    margin-left: 5px;\
    width: 40px;\
}\
.selectImage {\
    width: 21px;\
    margin: 1px;\
    cursor: pointer;\
}\
.hiddenImage {\
    display: none;\
}\
</style>";
	    authResourceSelect = style+"<div class='selector'><i class='icon-chevron-down' style='cursor: pointer;float: right;opacity: 0.2;margin-left: 1px;margin-top: 4px;' onclick=\"if(jQuery('.hiddenImage').css('display')=='none'){jQuery('.hiddenImage').css('display','block');}else{jQuery('.hiddenImage').css('display','none');}\"></i>";
	    for (var i in widget.authResources) {
		if (i=="default") {
		    continue;
		}
		if (i==widget.authResources['default']) {
		    authResourceSelect += "<img class='selectImage' src='images/"+widget.authResources[i].icon+"' onclick=\"Retina.WidgetInstances.login["+index+"].authResources['default']='"+i+"';jQuery('.selectImage').toggleClass('hiddenImage', true);this.className='selectImage';jQuery('.hiddenImage').css('display','none');\">";
		} else {
		    authResourceSelect += "<img class='selectImage hiddenImage' src='images/"+widget.authResources[i].icon+"' onclick=\"Retina.WidgetInstances.login["+index+"].authResources['default']='"+i+"';jQuery('.selectImage').toggleClass('hiddenImage', true);this.className='selectImage';jQuery('.hiddenImage').css('display','none');\">";
		}
	    }
	    authResourceSelect += "</div>";
	    loginStyle = " style='width: 155px;'";
	}
	var html = '\
        <div id="loginModal" class="modal show fade" tabindex="-1" style="width: 400px; display: none;" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">\
      <div class="modal-header">\
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
	<h3 id="loginModalLabel">Authenticate to KBase</h3>\
      </div>\
      <div class="modal-body">\
	<p>Enter your KBase credentials.</p>\
        <div id="failure"></div>\
        <table>\
          <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">login</th><td><input type="text" '+loginStyle+'id="login">'+authResourceSelect+'</td></tr>\
          <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">password</th><td><input type="password" id="password" onkeypress="event = event || window.event;if(event.keyCode == 13) { Retina.WidgetInstances.login['+index+'].perform_login('+index+');}"></td></tr>\
        </table>\
      </div>\
      <div class="modal-footer">\
	<button class="btn btn-danger pull-left" data-dismiss="modal" aria-hidden="true">cancel</button>\
	<button class="btn btn-success" onclick="Retina.WidgetInstances.login['+index+'].perform_login('+index+');">log in</button>\
      </div>\
    </div>\
\
    <div id="msgModal" class="modal hide fade" tabindex="-1" style="width: 400px;" role="dialog" aria-labelledby="msgModalLabel" aria-hidden="true">\
      <div class="modal-header">\
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
	<h3 id="msgModalLabel">Login Information</h3>\
      </div>\
      <div class="modal-body">\
	<p>You have successfully logged in.</p>\
      </div>\
      <div class="modal-footer">\
	<button class="btn btn-success" aria-hidden="true" data-dismiss="modal">OK</button>\
      </div>\
</div>';

	return html;
    };

    widget.login_box = function (index) {
	var html = '\
	<p style="float: right; right:16px; top: 11px; position: relative;cursor: pointer;" onclick="if(document.getElementById(\'login_name\').innerHTML ==\'\'){jQuery(\'#loginModal\').modal(\'show\');}else{if(confirm(\'do you really want to log out?\')){Retina.WidgetInstances.login['+index+'].perform_logout('+index+');}}">\
	        <i class="icon-user icon-white" style="margin-right: 5px;"></i>\
	        <span  id="login_name_span">\
	          <input type="button" class="btn" value="login" style="position:relative; bottom: 2px;" onclick="jQuery(\'#loginModal\').modal(\'show\');">\
	        </span>\
	        <span id="login_name" style="color: white;"></span>\
</p>';
	
	return html;
    }
    
    widget.perform_login = function (index) {
	widget = Retina.WidgetInstances.login[index];
	var login = document.getElementById('login').value;
	var pass = document.getElementById('password').value;
	var auth_url = stm.Config.mgrast_api+'?auth='+widget.authResources[widget.authResources.default].prefix+Retina.Base64.encode(login+":"+pass);
	jQuery.get(auth_url, function(d) {
	    if (d && d.token) {
		var uname = login;
		document.getElementById('login_name_span').style.display = "none";
		document.getElementById('login_name').innerHTML = uname;
		document.getElementById('failure').innerHTML = "";
		stm.Authentication = d.token;
		jQuery('#loginModal').modal('hide');
		jQuery('#msgModal').modal('show');
		if (Retina.WidgetInstances.login[index].callback && typeof(Retina.WidgetInstances.login[index].callback) == 'function') {
		    Retina.WidgetInstances.login[index].callback.call({ 'action': 'login',
									'result': 'success',
									'uname': uname,
									'token': d.token });
		}
	    } else {
		document.getElementById('failure').innerHTML = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error:</strong> Login failed.</div>';
		if (Retina.WidgetInstances.login[index].callback && typeof(Retina.WidgetInstances.login[index].callback) == 'function') {
		    Retina.WidgetInstances.login[index].callback.call({ 'action': 'login',
									'result': 'failed',
									'uname': null,
									'token': null });
		}
	    }
	}).fail(function() {
	    document.getElementById('failure').innerHTML = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error:</strong> Login failed.</div>';
		if (Retina.WidgetInstances.login[index].callback && typeof(Retina.WidgetInstances.login[index].callback) == 'function') {
		    Retina.WidgetInstances.login[index].callback.call({ 'action': 'login',
									'result': 'failed',
									'uname': null,
									'token': null });
		}
	});
    };
    
    widget.perform_logout = function (index) {
	document.getElementById('login_name_span').style.display = "";
	document.getElementById('login_name').innerHTML = "";
	stm.Authentication = null;
	if (Retina.WidgetInstances.login[index].callback && typeof(Retina.WidgetInstances.login[index].callback) == 'function') {
	    Retina.WidgetInstances.login[index].callback.call({ 'action': 'logout'});
	}
    };
    
})();
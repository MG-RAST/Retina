(function () {
    var widget = Retina.Widget.extend({
        about: {
            title: "MG-RAST Login",
            name: "login",
            author: "Tobias Paczian",
            requires: [ 'jquery.cookie.js' ]
        }
    });
    
    widget.setup = function () {
	return [];
    };

    widget.callback = null;
    widget.cookiename = "mgauth";
    widget.authResources = RetinaConfig.authResources;
    widget.registerEnabled = false;
    widget.registerLink = null;
    widget.helpEnabled = false;
    widget.helpLink = null;
    widget.forgotEnabled = false;
    widget.forgotLink = null;
    widget.myDataEnabled = false;
    widget.myDataLink = null;
    
    widget.display = function (wparams) {
	var widget = this;
	var index = widget.index;
	
	if (wparams && wparams.hasOwnProperty('authResources')) {
	    widget.authResources = wparams.authResources;
	}

	// append the modals to the body
	var space = document.createElement('div');
	space.innerHTML = widget.modals();
	document.body.appendChild(space);

	// put the login thing into the target space
	var css = '\
  .userinfo {\
    position: absolute;\
    top: 50px;\
    right: 10px;\
    width: 300px;\
    padding: 10px;\
    background-color: white;\
    color: black;\
    border: 1px solid gray;\
    box-shadow: 4px 4px 4px #666666;\
    border-radius: 6px 6px 6px 6px;\
    z-index: 1000;\
  }\
\
  .userinfo > button {\
    float: right;\
    position: relative;\
    bottom: 0px;\
    margin-left: 10px;\
  }\
\
  .userinfo > img {\
    height: 50px;\
    float: left;\
    margin-right: 10px;\
  }';
	var css_container = document.createElement('style');
	css_container.innerHTML = css;
	document.body.appendChild(css_container);

	widget.target = wparams.target;
	widget.target.innerHTML = widget.login_box();

	if (wparams.callback && typeof(wparams.callback) == 'function') {
	    widget.callback = wparams.callback;
	}

	// check for a cookie
	var udata = jQuery.cookie(widget.cookiename);
	if (udata) {
	    udata = JSON.parse(udata);
	    widget.user = udata.user;
	    if (udata.hasOwnProperty('token') && udata.token != null) {
		widget.user.token = udata.token;
	    }
	    widget.sheep = udata.sheep;
	    if (widget.sheep) {
		udata.user.sheepmode = true;
	    }
	    if (udata.hasOwnProperty('user') && udata.user != null) {
		if (stm.user && stm.user.login == udata.login) {
		    udata.user = stm.user;
		}
		widget.target.innerHTML = widget.login_box(udata.user);
		if (widget.callback && typeof(widget.callback) == 'function') {
		    widget.callback.call(null, { 'action': 'login',
						 'result': 'success',
						 'token' : udata.token,
						 'user'  : udata.user });
		}
	    } else {
		if (widget.callback && typeof(widget.callback) == 'function') {
		    widget.callback.call(null, { 'action': 'login',
						 'result': 'failure' });
		}
	    }
	} else {
	    if (widget.callback && typeof(widget.callback) == 'function') {
		widget.callback.call(null, { 'action': 'login',
					     'result': 'failure' });
	    }
	}

    };

    widget.modals = function () {
	var widget = this;
	var index = widget.index;
	var authResourceSelect = "";
	var loginStyle = "";
	if (Retina.keys(widget.authResources).length > 2) {
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
        <div id="loginModal" class="modal show fade" tabindex="-1" style="width: 400px; display: none; z-index: 10000;" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">\
        <div id="loginModalDisable" style="display: none; position: absolute; width: 400px; height: 275px; background-color: black; opacity: 0.3; z-index: 1;"><img src="Retina/images/waiting.gif" style="margin-top: 100px; margin-left: 40%;"></div>\
      <div class="modal-header">\
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
	<h3 id="loginModalLabel">Authentication</h3>\
      </div>\
      <div class="modal-body">\
        <div id="failure"></div>\
	<p>Enter your credentials.</p>\
        <table>\
          <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">login</th><td><input type="text" '+loginStyle+'id="login">'+authResourceSelect+'</td></tr>\
          <tr><th style="vertical-align: top;padding-top: 5px;width: 100px;text-align: left;">password</th><td><input type="password" id="password" onkeypress="event = event || window.event;if(event.keyCode == 13) { Retina.WidgetInstances.login['+index+'].perform_login();}"></td></tr>\
'+(widget.forgotEnabled ? '<tr><td colspan=2 style="text-align: right;"><a href="'+widget.forgotLink+'" target=_blank>forgot password</a></td></tr>' : '')+'\
        </table>\
      </div>\
      <div class="modal-footer">\
	<button class="btn btn-danger pull-left" data-dismiss="modal" aria-hidden="true">cancel</button>\
	<button class="btn btn-success" onclick="Retina.WidgetInstances.login['+index+'].perform_login();">log in</button>\
      </div>\
    </div>\
\
    <div id="msgModal" class="modal hide fade" tabindex="-1" style="width: 400px; z-index: 10000;" role="dialog" aria-labelledby="msgModalLabel" aria-hidden="true" onkeypress="event = event || window.event;if(event.keyCode == 13) {document.getElementById(\'loginOKButton\').click();}">\
      <div class="modal-header">\
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\
	<h3 id="msgModalLabel">Login Information</h3>\
      </div>\
      <div class="modal-body">\
	<p>You have successfully logged in.</p>\
      </div>\
      <div class="modal-footer">\
	<button class="btn btn-success" aria-hidden="true" data-dismiss="modal" id="loginOKButton">OK</button>\
      </div>\
</div>';

	return html;
    };

    widget.login_box = function (user) {
	var widget = this;
	var index = widget.index;

	var html = "";

	if (user) {
	    html ='\
<div style="float: right; margin-right: 20px; margin-top: 7px; color: gray;">\
   <button class="btn btn-inverse" style="border-radius: 3px 0px 0px 3px; margin-right: -4px;" onclick="if(document.getElementById(\'userinfo\').style.display==\'none\'){document.getElementById(\'userinfo\').style.display=\'\';}else{document.getElementById(\'userinfo\').style.display=\'none\';}">\
      '+(user.sheepmode ? '<img src="Retina/images/sheep.png" style="width: 13px; margin-right: 5px;background-color: white;border-radius: 10px;padding: 2px;">' : '<i class="icon-user icon-white" style="margin-right: 5px;"></i>')+'\
      '+user.firstname+' '+user.lastname+'\
      <span class="caret" style="margin-left: 5px;"></span>\
</button>';
	    if (widget.helpEnabled) {
	    	if (widget.helpMenu) {
		    html += '<button class="btn btn-inverse dropdown-toggle" data-toggle="dropdown" href="#">?</button><ul class="dropdown-menu pull-right">';
		    for (var i=0; i<widget.helpMenu.length; i++) {
			html += '<li><a href="'+widget.helpMenu[i].url+'" target=_blank>'+widget.helpMenu[i].title+'</a></li>';
		    }
		    html += '</ul>'
		} else {
		    html += '<a href="'+widget.helpLink+'" target=_blank class="btn btn-inverse" style="border-radius: 0px 3px 3px 0px;">?</a>';
		}
	    }
	    html += '</div>\
<div class="userinfo" id="userinfo" style="display: none;">\
   <img src="Retina/images/user.png">\
   <h4 style="margin-top: 5px;">'+user.firstname+' '+user.lastname+'</h4>\
<p style="margin-top: -10px;">'+user.email+'</p>\
   '+(user.sheepmode ? '<button class="btn btn-inverse" onclick="document.getElementById(\'userinfo\').style.display=\'none\';Retina.WidgetInstances.login['+index+'].bu();">B U</button>' : '<button class="btn btn-inverse" onclick="document.getElementById(\'userinfo\').style.display=\'none\';Retina.WidgetInstances.login['+index+'].perform_logout();">logout</button>')+'\
'+(widget.myDataEnabled ? '<a href="'+widget.myDataLink+'" class="btn" style="float: left;">myData</a>' : '')+'\
'+(user.admin ? '<div style="clear: both;"><button class="btn btn-mini" onclick="jQuery(\'#loginImpersonateForm\').toggle();" style="width: 100%; margin-top: 10px;"><img src="Retina/images/sheep.png" style="height: 16px;"></i></div><div style="display: none; padding-top: 10px;" id="loginImpersonateForm"><input type="text" placeholder="login"><input type="text" placeholder="email"><input type="text" placeholder="firstname"><input type="text" placeholder="lastname"><button class="btn" style="margin-bottom: 10px; margin-left: 10px;" onclick="Retina.WidgetInstances.login[1].findUser();">find</button><div id="loginImpersonateResult"></div></div></div>' : "")+'\
</div>';
	} else {
	    html ='<div style="float: right; margin-right: 20px; margin-top: 7px; color: gray;" class="btn-group">';
	    if (widget.helpEnabled) {
		if (widget.helpMenu) {
		    html += '<button class="btn btn-inverse dropdown-toggle" data-toggle="dropdown" href="#">?</button><ul class="dropdown-menu">';
		    for (var i=0; i<widget.helpMenu.length; i++) {
			html += '<li><a href="'+widget.helpMenu[i].url+'" target=_blank>'+widget.helpMenu[i].title+'</a></li>';
		    }
		    html += '</ul>'
		} else {
		    html += '<a href="'+widget.helpLink+'" target=_blank class="btn btn-inverse" style="border-radius: 0px 3px 3px 0px;">?</a>';
		}
	    }
	    html += '<button class="btn btn-inverse" style="border-radius: 3px 0px 0px 3px; margin-right: -4px;" onclick="document.getElementById(\'loginModalDisable\').style.display=\'none\';jQuery(\'#loginModal\').modal(\'show\');document.getElementById(\'login\').focus();">\
      Login\
   </button>\
' + (widget.registerEnabled ? '<button onclick="window.open(\''+widget.registerLink+'\')" target=_blank class="btn btn-inverse" style="border-radius: 3px 0px 0px 3px; margin-right: -4px;">\
      Register\
</button>' : '');
	    
	    html += '</div>';
	}
	
	return html;
    };

    widget.bu = function () {
	var widget = this;

	jQuery.cookie(Retina.WidgetInstances.login[1].cookiename, JSON.stringify({ "user": widget.sheep,
										   "token": widget.sheep.token }), { expires: 7 });
	window.location.reload();
    };

    widget.findUser = function () {
	var widget = this;

	var query = [];
	var inputs = document.getElementById('loginImpersonateForm').childNodes;
	var fields = [ 'login', 'email', 'firstname', 'lastname' ];
	for (var i=0; i<fields.length; i++) {
	    if (inputs[i].value.length) {
		query.push(fields[i]+'=*'+inputs[i].value+'*');
	    }
	}
	
	jQuery.ajax({
	    method: "GET",
	    dataType: "json",
	    headers: stm.authHeader,
	    url: RetinaConfig.mgrast_api+'/user?verbosity=minimal&'+query.join("&"),
	    success: function (data) {
		var html = [];
		for (var i=0; i<data.data.length; i++) {
		    html.push('<button class="btn btn-mini" title="'+data.data[i].login+' - '+data.data[i].email+'" onclick="Retina.WidgetInstances.login[1].impersonate(\''+data.data[i].login+'\');">'+data.data[i].firstname+' '+data.data[i].lastname+'</button>');
		}
		document.getElementById('loginImpersonateResult').innerHTML = html.join('');
	    }}).fail(function(xhr, error) {
		alert('no user found');
	    });
	
    };
    
    widget.impersonate = function (login) {
	var widget = this;

	jQuery.ajax({
	    method: "GET",
	    dataType: "json",
	    headers: stm.authHeader,
	    url: RetinaConfig.mgrast_api+'/user/impersonate/'+login,
	    success: function (d) {
		var widget = Retina.WidgetInstances.login[1];
		jQuery.cookie(Retina.WidgetInstances.login[1].cookiename, JSON.stringify({ "user": { firstname: d.firstname,
												     lastname: d.lastname,
												     email: d.email,
												     tos: d.tos,
												     id: d.id,
												     admin: d.admin,
												     login: d.login },
											   "sheep": { firstname: widget.user.firstname,
												      lastname: widget.user.lastname,
												      email: widget.user.email,
												      tos: widget.user.tos,
												      id: widget.user.id,
												      admin: widget.user.admin,
												      login: widget.user.login,
												      token: widget.user.token },
											   "token": d.token }), { expires: 7 });
		window.location.reload();
	    }}).fail(function(xhr, error) {
		alert('impersonation failed');
	    });
    };

    widget.perform_login = function () {
	var widget = this;
	var index = this.index;

	// disable the login field while loading
	document.getElementById('loginModalDisable').style.display = "";

	var login = document.getElementById('login').value;
	var pass = document.getElementById('password').value;
	var questionmark = "?";
	if (widget.authResources[widget.authResources.default].url.match(/\?/)) {
	    questionmark = "&";
	}
	var header = {};
	var auth_url = widget.authResources[widget.authResources.default].url+questionmark+(widget.authResources[widget.authResources.default].keyword || "auth")+'='+(widget.authResources[widget.authResources.default].prefix || "")+Retina.Base64.encode(login+":"+pass);
	if (widget.authResources[widget.authResources.default].useHeader) {
	    auth_url = widget.authResources[widget.authResources.default].url;
	    header[(widget.authResources[widget.authResources.default].keyword || "auth")] = (widget.authResources[widget.authResources.default].prefix || "")+Retina.Base64.encode(login+":"+pass);
	}
	jQuery.ajax({ method: widget.authResources[widget.authResources.default].method || "GET",
		      dataType: "json",
		      url: auth_url,
		      headers: header,
		      error: function (xhr) {
			  var widget = Retina.WidgetInstances.login[index];
			  document.getElementById('loginModalDisable').style.display = "none";
			  var error = "Unknown error";
			  if (xhr.status == 401) {
			      error = "invalid credentials";
			  } else if (xhr.status = 404) {
			      error = "authorization server unavailable";
			  }
			  document.getElementById('failure').innerHTML = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>login failed - '+error+'</div>';
			  if (widget.callback && typeof(widget.callback) == 'function') {
			      widget.callback.call(null, { 'action': 'login',
							   'result': 'failed',
							   'error': error,
							   'token': null,
							   'user': null });
			  }
		      },
		      success: function (d) {
			  var widget = Retina.WidgetInstances.login[index];
			  document.getElementById('loginModalDisable').style.display = "none";
			  if (d && d[widget.authResources[widget.authResources.default].tokenField || "token"]) {
			      if (d.hasOwnProperty('fullname')) {
				  d.firstname = d.fullname.substr(0, d.fullname.lastIndexOf(' '));
				  d.lastname = d.fullname.substr(d.fullname.lastIndexOf(' ') + 1);
			      }
			      var user = d;
			      user.lastname = d.lastname || "";
			      user.firstname = d.firstname || d[widget.authResources[widget.authResources.default].loginField || "login"]
			      user.login = d[widget.authResources[widget.authResources.default].loginField];
			      widget.target.innerHTML = widget.login_box(user);
			      document.getElementById('failure').innerHTML = "";
			      jQuery('#loginModal').modal('hide');
			      jQuery('#msgModal').modal('show');
			      if (stm) {
				  stm.user = jQuery.extend(true, {}, user);
			      }
			      jQuery.cookie(widget.cookiename, JSON.stringify({ "user": { firstname: d.firstname || d[widget.authResources[widget.authResources.default].loginField || "login"],
											  lastname: d.lastname || "",
											  email: d.email || "",
											  login: d[widget.authResources[widget.authResources.default].loginField || "login"],
											  tos: d.hasOwnProperty('tos') ? d.tos : 0,
											  admin: d.admin,
											  id: d.id || null },
										"token": d[widget.authResources[widget.authResources.default].tokenField || "token"] }), { expires: 7 });
			      if (widget.callback && typeof(widget.callback) == 'function') {
				  widget.callback.call(null, { 'action': 'login',
							       'result': 'success',
							       'token' : d[widget.authResources[widget.authResources.default].tokenField || "token"],
							       'user'  : user  });
			      }
			  } else {
			      document.getElementById('failure').innerHTML = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error:</strong> Login failed.</div>';
			      if (widget.callback && typeof(widget.callback) == 'function') {
				  widget.callback.call(null, { 'action': 'login',
							       'result': 'failed',
							       'token' : null,
							       'user'  : null  });
			      }
			  }	  
		      }
		    });
    };
    
    widget.perform_logout = function () {
	var widget = this;
	var index = widget.index;

	widget.target.innerHTML = widget.login_box();
	jQuery.cookie(widget.cookiename, JSON.stringify({ "token": null,
							  "user": null }));
	if (widget.callback && typeof(widget.callback) == 'function') {
	    widget.callback.call(null, { 'action': 'logout' });
	}
    };

    widget.handleAuthFailure = function (xhr) {
	var widget = this;
	var index = widget.index;

	var response = JSON.parse(xhr.responseText);
	if (response && response.hasOwnProperty('ERROR') && response.ERROR == "authentication failed  - webkey expired") {
	    alert('Your session as expired, please log in again');
	    if (stm) {
		stm.user = null;
		stm.authHeader = {};
	    }
	    widget.perform_logout();
	}
    };

    widget.verifyAuthentication = function (url, header) {
	var widget = this;

	jQuery.ajax({ method: widget.authResources[widget.authResources.default].method || "GET",
		      dataType: "json",
		      url: url,
		      headers: header,
		      error: function (xhr) {
			  widget.perform_logout();
		      },
		      success: function (d) {
			  //console.log(d);
		      }
		    });
    };
    
})();

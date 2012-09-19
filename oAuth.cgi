#!/usr/bin/perl
use strict;
use warnings;

use DBI;
use CGI;
use CGI::Cookie;
use Digest::MD5 qw(md5_hex);
use Mail::Mailer;

use OAuthConfig;

my $dbh = dbh();
my $cgi = new CGI();

my $cookie = $cgi->cookie(SESSION_COOKIE_NAME);
my $user = "";
my $uhash = "";
if ($cookie) {
  my $secret;
  ($uhash, $secret) = split(/;/, $cookie);
 
  my $res = $dbh->selectrow_arrayref("SELECT login FROM user WHERE cookie='".$secret."';");
  if ($dbh->err()) {
    warning_message($DBI::errstr);
    exit 0;
  }
  if ($res) {
    if (md5_hex($res->[0]) eq $uhash) {
      $user = $res->[0];
    } else {
      $uhash = "";
    }
  } else {
    $uhash = "";
  }
}
if ($cgi->param('logout')) {
    $cookie = CGI::Cookie->new( -name    => SESSION_COOKIE_NAME,
				-value   => '',
				-expires => "-1d" );
    
    $dbh->disconnect();
    if ($cgi->param('redirect')) {
      print $cgi->header( -redirect => $cgi->param('redirect'), -cookie => $cookie );
    } else { 
      print $cgi->header( -cookie => $cookie );
      print base_template();
      print success_message("You have been logged out.");
      print close_template();
      exit 0;
    }
}

if ($cgi->param('login') && $cgi->param('pass')) {
  my $res = $dbh->selectrow_arrayref("SELECT login FROM user WHERE login='".$cgi->param("login")."' AND password='".md5_hex($cgi->param("pass"))."' AND confirmed='yes';");
  if ($dbh->err()) {
    warning_message($DBI::errstr);
    exit 0;
  }

  if ($res) {
    my $secret = secret();
    $uhash = md5_hex($cgi->param("login"));
    $user = $cgi->param("login");
    $dbh->do("UPDATE user SET cookie='".$secret."' WHERE login='$user';");
    $dbh->commit();
    if ($dbh->err()) {
      warning_message($DBI::errstr);
      exit 0;
    }
    $cookie = CGI::Cookie->new( -name    => SESSION_COOKIE_NAME,
				-value   => $uhash.";".$secret,
				-expires => SESSION_TIMEOUT );
  } else {
    login_screen({ "invalid" => 1 });
    exit 0;
  }
}

unless ($cgi->param('action')) {
  $dbh->disconnect();
  print $cgi->header();
  print base_template();
  print qq~
<div class="well">
  <h3>Register Application</h3>
  <form>
    <input type="hidden" name="action" value="register_application">
    <label>application name</label>
    <input type="text" class="span6" placeholder="enter application name" name="application">
    <span class="help-block">Create a unique identifier for your application. Use alphanumerical characters only.</span>
    <label>application url</label>
    <input type="text" class="span6" placeholder="enter URL" name="url">
    <span class="help-block">Enter the full path to your application script that will handle the authentication.</span>
    <button type="submit" class="btn">register</button>
  </form>
</div>
<div class="well">
  <h3>Register User</h3>
  <form class="form-horizontal">
    <input type="hidden" name="action" value="register_user">
    <fieldset>
      <div class="control-group">
        <label class="control-label" for="user">Full User Name</label>
        <div class="controls">
          <input type="text" class="span3" placeholder="enter full name" name="username" id="user">
          <p class="help-block">Enter your full name as you would like it to be displayed by applications.</p>
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="login">Login</label>
        <div class="controls">
          <input type="text" class="span3" placeholder="enter login" name="login" id="login">
          <p class="help-block">Enter your desired login. Use alphanumerical characters only</p>
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="email">eMail</label>
        <div class="controls">
          <input type="text" class="span3" placeholder="enter email" name="email" id="email">
          <p class="help-block">Enter a valid email address.</p>
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="password">Password</label>
        <div class="controls">
          <input type="password" class="span3" placeholder="enter password" name="password" id="password">
          <p class="help-block">Enter your desired password.</p>
        </div>
      </div>

      <div class="control-group">
        <label class="control-label" for="password_two">Password Validation</label>
        <div class="controls">
          <input type="password" class="span3" placeholder="re-enter password" name="password_two" id="password_two">
          <p class="help-block">Enter your password again for validation</p>
        </div>
      </div>
    </fieldset>
    <button type="submit" class="btn">register</button>
  </form>
</div>~;
  print close_template();
} else {
  if ($cgi->param("action") eq "register_application") {
    if ($cgi->param("application") && $cgi->param("url")) {
      my $res = $dbh->selectrow_arrayref("SELECT application FROM apps WHERE application ='".$cgi->param("application")."';");
      if ($dbh->err()) {
	warning_message($DBI::errstr);
	exit 0;
      }
      if ($res) {
	warning_message("This application is already registered.");
      } else {
	my $secret = secret();
	$dbh->do("INSERT INTO apps (application, url, secret) VALUES ('".$cgi->param("application")."', '".$cgi->param("url")."', '".$secret."');");
	$dbh->commit();
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	success_message("Successfully registered application:<br><table><tr><th>application name</th><td>".$cgi->param("application")."</td></tr><tr><th>application url</th><td>".$cgi->param("url")."</td></tr><tr><th>application secret</th><td>".$secret."</td></tr></table>");
	exit 0;
      }
    } else {
      warning_message("You must supply both an application name and a URL");
      exit 0;
    }
    
  } elsif ($cgi->param("action") eq "register_user") {
    if ($cgi->param("username") && $cgi->param("login") && $cgi->param("password") && $cgi->param("password_two") && $cgi->param("email")) {
      if ($cgi->param("password") eq $cgi->param("password_two")) {
	  my $res = $dbh->selectrow_arrayref("SELECT login FROM user WHERE login='".$cgi->param("login")."';");
	  if ($dbh->err()) {
	    warning_message($DBI::errstr);
	    exit 0;
	  }
	  if ($res) {
	    warning_message("This login is already taken.");
	    exit 0;
	  } else {
	    my $secret = secret();
	    my $pass = md5_hex($cgi->param("password"));
	    $dbh->do("INSERT INTO user (login, name, password, email, confirmed) VALUES ('".$cgi->param("login")."', '".$cgi->param("username")."', '".$pass."', '".$cgi->param("email")."', '".$secret."');");
	    $dbh->commit();
	    if ($dbh->err()) {
	      warning_message($DBI::errstr);
	      exit 0;
	    }
	    my $mailer = Mail::Mailer->new();
	    if ($mailer->open({ From    => ADMIN_EMAIL,
				To      => $cgi->param("email"),
				Subject => "MG-RAST User Account registration",
			      })) {
	      print $mailer "Please click the following link to verify your account\n\n".BASE_URL."/oAuth.cgi?action=verify&login=".$cgi->param("login")."&id=$secret\n\nAccount: ".$cgi->param("username")." (".$cgi->param("login").")";
	      $mailer->close();
	      success_message("Your account is registered. You will receive a confirmation message to the entered email address. Your account will be inactive until you click the verification link in that email.");
	    } else {
	      warning_message("Could not send out verification email: $@");
	      exit 0;
	    }
	  }
	} else {
	  warning_message("Password and password verification do not match.");
	  exit 0;
	}
    } else {
      warning_message("You must fill out all fields to register");
      exit 0;
    }
  } elsif ($cgi->param("action") eq "verify") {
    $cgi->param("login");
    $cgi->param("id");
    my $res = $dbh->selectrow_arrayref("SELECT login FROM user WHERE login='".$cgi->param("login")."' AND confirmed='".$cgi->param('id')."';");
    if ($dbh->err()) {
      warning_message($DBI::errstr);
      exit 0;
    }
    if ($res) {
      $dbh->do("UPDATE user SET confirmed='yes' WHERE login='".$cgi->param('login')."'");
      $dbh->commit();
      if ($dbh->err()) {
	warning_message($DBI::errstr);
	exit 0;
      }
      success_message("Your account is verified.");
    } else {
      warning_message("Invalid id for this login.");
    }
  } elsif ($cgi->param("action") eq "dialog") {
      if ($cgi->param("client_id") && $cgi->param("redirect_url")) {
	my $res = $dbh->selectrow_arrayref("SELECT application FROM apps WHERE application='".$cgi->param("client_id")."' AND url='".$cgi->param('redirect_url')."';");
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	if ($res) {
	  if ($user) {
	    if (defined($cgi->param("accept"))) {
	      my $secret = secret();
	      if ($cgi->param('accept') eq '1') {
		$res = $dbh->do("INSERT INTO accepts (login, application, token) VALUES ('".$user."','".$cgi->param('client_id')."','".$secret."');");
		$dbh->commit();
		if ($dbh->err()) {
		  warning_message($DBI::errstr);
		  exit 0;
		}
	      } else {
		warning_message("You denied the application ".$cgi->param('client_id')." to access your data.");
		exit 0;
	      }	      
	      my $url = $cgi->param("redirect_url");
	      if ($url =~ /\?/) {
		$url .= "&";
	      } else {
		$url .= "?";
	      }
	      print $cgi->redirect( -uri => $url."code=".$secret );
	      exit 0;				
	    } else {
	      auth_client_screen();
	      exit 0;
	    }
	  } else {
	    login_screen();
	    exit 0;
	  }
	} else {
	  $dbh->disconnect();
	  print $cgi->header(-type => 'text/plain',
			     -status => 400,
			     -Access_Control_Allow_Origin => '*' );
	  print "redirect_url does not match client id";
	  exit 0;
	}
      }
    } elsif ($cgi->param("action") eq "token") {
      if ($cgi->param("client_id") && $cgi->param("client_secret") && $cgi->param("code")) {
	my $res = $dbh->selectrow_arrayref("SELECT accepts.login FROM apps, accepts WHERE apps.application='".$cgi->param("client_id")."' AND apps.secret='".$cgi->param('client_secret')."' AND apps.application=accepts.application and accepts.token='".$cgi->param('code')."';");
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	if ($res) {
	  $user = $res->[0];
	  $uhash = md5_hex($user);
	} else {
	  $dbh->disconnect();
	  print $cgi->header(-type => 'text/plain',
			     -status => 400,
			     -Access_Control_Allow_Origin => '*' );
	  print "invalid code";
	  exit 0;
	}
	my $secret = secret();
	$res = $dbh->selectrow_arrayref("SELECT token FROM tokens WHERE token='$secret';");
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	while ($res) {
	  $secret = secret();
	  $res = $dbh->selectrow_arrayref("SELECT token FROM tokens WHERE token='$secret';");
	  if ($dbh->err()) {
	    warning_message($DBI::errstr);
	    exit 0;
	  }
	}
	$dbh->do("INSERT INTO tokens (token, login, created) values ('$secret', '$user', ".time.");");
	$dbh->commit();
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	$dbh->disconnect();
	print $cgi->header(-type => 'text/plain',
			   -status => 200,
			   -Access_Control_Allow_Origin => '*' );
	print "access_token=$secret";
	exit 0;	
      } else {
	$dbh->disconnect();
	print $cgi->header(-type => 'text/plain',
			   -status => 400,
			   -Access_Control_Allow_Origin => '*' );
	print "missing parameter";
	exit 0;
      }
    } elsif ($cgi->param("action") eq "data") {
      if ($cgi->param("access_token")) {
	my $res = $dbh->selectrow_arrayref("SELECT user.login, user.name, user.email, tokens.token FROM user, tokens WHERE tokens.token='".$cgi->param('access_token')."' AND user.login=tokens.login;");
	if ($dbh->err()) {
	  warning_message($DBI::errstr);
	  exit 0;
	}
	if ($res) {
	  if ($cgi->param('refresh')) {
	    my $secret = secret();
	    my $res2 = $dbh->selectrow_arrayref("SELECT token FROM tokens WHERE token='$secret';");
	    if ($dbh->err()) {
	      warning_message($DBI::errstr);
	      exit 0;
	    }
	    while ($res2) {
	      $secret = secret();
	      $res2 = $dbh->selectrow_arrayref("SELECT token FROM tokens WHERE token='$secret';");
	      if ($dbh->err()) {
		warning_message($DBI::errstr);
		exit 0;
	      }
	    }
	    $dbh->do("UPDATE tokens SET token='$secret' WHERE token='".$res->[3]."';");
	    $res->[3] = $secret;
	    $dbh->do("UPDATE tokens SET created=".time." WHERE token='$secret';");
	    $dbh->commit();
	    if ($dbh->err()) {
	      warning_message($DBI::errstr);
	      exit 0;
	    }
	  }
	  $dbh->disconnect();
	  print $cgi->header(-type => 'application/json',
			     -status => 200,
			     -Access_Control_Allow_Origin => '*' );
	  print '{ "login": "'.$res->[0].'", "name": "'.$res->[1].'", "email": "'.$res->[2].'", "token": "'.$res->[3].'" }';
	  exit 0;
	} else {
	  $dbh->disconnect();
	  print $cgi->header(-type => 'text/plain',
			     -status => 400,
			     -Access_Control_Allow_Origin => '*' );
	  print "invalid access token";
	  exit 0;
	}
      } else {
	$dbh->disconnect();
	print $cgi->header(-type => 'text/plain',
			   -status => 400,
			   -Access_Control_Allow_Origin => '*' );
	print "missing access token";
	exit 0;			
      }
    } else {
      warning_message("Authentication page called with an invalid action parameter.");
      exit 0;
    }
}

sub base_template {
    return qq~<!DOCTYPE html>
<html>

  <head>

    <title>MG-RAST Authentication</title>

    <script type="text/javascript" src="~ . JS_DIR . qq~jquery.min.js"></script>
    <script type="text/javascript" src="~ . JS_DIR . qq~bootstrap.min.js"></script>

    <link rel="stylesheet" type="text/css" href="~ . CSS_DIR . qq~bootstrap.css">

  </head>

  <body>
    
    <div class="container">
      <div class="navbar navbar-inverse">
	<div class="navbar-inner">
          <ul class="nav">
            <li>
              <a><img src="~ . IMAGE_DIR . qq~MGRAST_logo.png" style="height: 55px; margin-top: -8px;"></a>
            </li>
            <li>
              <a>User Authentication</a>
            </li>
          </ul>
	</div>
      </div>
~;
}

sub close_template {
    return qq~
    </div>

  </body>
</html>~;
}

sub warning_message {
    my ($message) = @_;

    $dbh->disconnect();
    print $cgi->header();
    print base_template();
    print qq~<div class="alert alert-error">
<button class="close" data-dismiss="alert" type="button">x</button>
<strong>Warning</strong><br>~;
    print $message;
    print qq~<br><a href="oAuth.cgi">return to home</a></div>~;
    print close_template();    
}

sub success_message {
    my ($message) = @_;

    $dbh->disconnect();
    print $cgi->header();
    print base_template();
    print qq~<div class="alert alert-success">
<button class="close" data-dismiss="alert" type="button">x</button>
<strong>Info</strong><br>~;
    print $message;
    print qq~<br><a href="oAuth.cgi">return to home</a></div>~;
    print close_template();
}

sub login_screen {
    my ($params) = @_;

    my $message = "";
    if ($params->{invalid}) {
	$message = qq~<div class="alert alert-error">
<button class="close" data-dismiss="alert" type="button">x</button>
<strong>Warning</strong><br>Your login failed.</div>~;
    }

    my @pa = $cgi->param;
    my $hidden = "";
    foreach my $p (@pa) {
	next if ($p eq "login");
	next if ($p eq "pass");
	$hidden .= "<input type='hidden' name='".$p."' value='".$cgi->param($p)."'>";
    }

    print $cgi->header();
    print base_template();
print qq~
<div class="well">
  <h3>Login to MG-RAST</h3>
  <form method=post>
    $hidden$message
    <label>login</label>
    <input type="text" class="span3" placeholder="enter login" name="login">
    <label>password</label>
    <input type="password" class="span3" placeholder="enter password" name="pass">
    <button type="submit" class="btn">login</button>
  </form>
</div>~;
    print close_template();

    $dbh->disconnect();
}

sub auth_client_screen {
    my @pa = $cgi->param;
    my $hidden = "<input type='hidden' name='accept' id='accept_app'>";
    foreach my $p (@pa) {
	next if ($p eq "login");
	next if ($p eq "pass");
	$hidden .= "<input type='hidden' name='".$p."' value='".$cgi->param($p)."'>";
    }

    my $application = $cgi->param("client_id");
    print $cgi->header(-cookie=>$cookie);
    print base_template();
    print qq~
  <div class="well">
    <h3>MG-RAST application authorization</h3>
    <p>The application $application is requesting to verify your login, name and email address as stored in MG-RAST. Is that OK?</p>
    <form>
      $hidden
      <input type="button" value="deny" class="btn" onclick="document.getElementById('accept_app').value='0';document.forms[0].submit();"><input type="button" class="btn" value="accept" onclick="document.getElementById('accept_app').value='1';document.forms[0].submit();">
    </form>
  </div>~;
    print close_template();

    $dbh->disconnect();
}

sub secret {
    my $generated = "";
    my $possible = 'abcdefghijkmnpqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    while (length($generated) < 32) {
	$generated .= substr($possible, (int(rand(length($possible)))), 1);
    }
    return $generated;
}

sub dbh {
  return DBI->connect("dbi:SQLite:dbname=".USER_DB, "", "", {AutoCommit => 0, PrintError => 1});
}

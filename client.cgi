#!/usr/bin/perl

use strict;
use warnings;

use Data::Dumper;

use CGI;
use JSON;
use LWP::UserAgent;
use URI::Escape;

my $json = new JSON;
my $cgi = new CGI();

my $settings = { app_id => 'MGRAST',
		 app_secret => 'WLmmYvRccHEwM24xm6DKw3jPKvAY2psg',
		 dialog_url => 'http://localhost/oAuth.cgi?action=dialog',
		 token_url => 'http://localhost/oAuth.cgi?action=token',
		 data_url => 'http://localhost/oAuth.cgi?action=data' };

my $app_id = $settings->{app_id};
my $app_secret = $settings->{app_secret};
my $dialog_url = $settings->{dialog_url};
my $token_url = $settings->{token_url};
my $data_url = $settings->{data_url};

my $my_url = "http://localhost/client.cgi";

my $code = $cgi->param('code');

unless (defined($code)) {
    my $call_url = $dialog_url."&client_id=" . $app_id . "&redirect_url=" . uri_escape($my_url);
    print $cgi->redirect( -uri => $call_url );
    exit 0;
}

my $call_url = $token_url . "&client_id=" . $app_id . "&client_secret=" . $app_secret . "&code=" . $code;
my $ua = LWP::UserAgent->new;
my $response = $ua->get($call_url)->content;

print STDERR "response: ".Dumper($response)."\n";
my ($access_token) = $response =~ /access_token=(.*)/;
$call_url = $data_url . "&access_token=" . $access_token;
$response = $ua->get($call_url)->content;
my $data = $json->decode($response);

print $cgi->header();
print "<pre>".Dumper($data)."</pre>";
exit 0;

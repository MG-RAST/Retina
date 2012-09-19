package OAuthConfig;

require Exporter;

use constant SESSION_COOKIE_NAME => 'MGRASTSESSION';
use constant SESSION_TIMEOUT => "+2d";

use constant USER_DB => '/Users/tobiaspaczian/CODE/USERDATA/user.db';

use constant ADMIN_EMAIL => "paczian\@mcs.anl.gov";

use constant BASE_URL => 'localhost';
use constant IMAGE_DIR => '';
use constant JS_DIR => '';
use constant CSS_DIR => '';

@ISA = qw(Exporter);
@EXPORT = qw(SESSION_COOKIE_NAME USER_DB SESSION_TIMEOUT ADMIN_EMAIL BASE_URL IMAGE_DIR JS_DIR CSS_DIR);

1;

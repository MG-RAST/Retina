<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<meta charset="utf-8">
		<title>
			MG-RAST - How to Download Data
		</title>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js" type="text/javascript">
</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js" type="text/javascript">
</script>
		<style type="text/css">
/*!
		*
		* Twitter Bootstrap
		*
		*//*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;font-size:10px;-webkit-tap-highlight-color:transparent}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,optgroup,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0;vertical-align:middle}svg:not(:root){overflow:hidden}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre,textarea{overflow:auto}code,kbd,pre,samp{font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */@media print{*,:after,:before{background:0 0!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:" (" attr(href)")"}abbr[title]:after{content:" (" attr(title)")"}a[href^="javascript:"]:after,a[href^="#"]:after{content:""}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}select{background:#fff!important}.navbar{display:none}.btn>.caret,.dropup>.btn>.caret{border-top-color:#000!important}.label{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #ddd!important}}@font-face{font-family:'Glyphicons Halflings';src:url(../components/bootstrap/fonts/glyphicons-halflings-regular.eot);src:url(../components/bootstrap/fonts/glyphicons-halflings-regular.eot?#iefix)format('embedded-opentype'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.woff2)format('woff2'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.woff)format('woff'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.ttf)format('truetype'),url(../components/bootstrap/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular)format('svg')}.glyphicon{position:relative;top:1px;display:inline-block;font-family:'Glyphicons Halflings';font-style:normal;font-weight:400;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.glyphicon-asterisk:before{content:"\2a"}.glyphicon-plus:before{content:"\2b"}.glyphicon-eur:before,.glyphicon-euro:before{content:"\20ac"}.glyphicon-minus:before{content:"\2212"}.glyphicon-cloud:before{content:"\2601"}.glyphicon-envelope:before{content:"\2709"}.glyphicon-pencil:before{content:"\270f"}.glyphicon-glass:before{content:"\e001"}.glyphicon-music:before{content:"\e002"}.glyphicon-search:before{content:"\e003"}.glyphicon-heart:before{content:"\e005"}.glyphicon-star:before{content:"\e006"}.glyphicon-star-empty:before{content:"\e007"}.glyphicon-user:before{content:"\e008"}.glyphicon-film:before{content:"\e009"}.glyphicon-th-large:before{content:"\e010"}.glyphicon-th:before{content:"\e011"}.glyphicon-th-list:before{content:"\e012"}.glyphicon-ok:before{content:"\e013"}.glyphicon-remove:before{content:"\e014"}.glyphicon-zoom-in:before{content:"\e015"}.glyphicon-zoom-out:before{content:"\e016"}.glyphicon-off:before{content:"\e017"}.glyphicon-signal:before{content:"\e018"}.glyphicon-cog:before{content:"\e019"}.glyphicon-trash:before{content:"\e020"}.glyphicon-home:before{content:"\e021"}.glyphicon-file:before{content:"\e022"}.glyphicon-time:before{content:"\e023"}.glyphicon-road:before{content:"\e024"}.glyphicon-download-alt:before{content:"\e025"}.glyphicon-download:before{content:"\e026"}.glyphicon-upload:before{content:"\e027"}.glyphicon-inbox:before{content:"\e028"}.glyphicon-play-circle:before{content:"\e029"}.glyphicon-repeat:before{content:"\e030"}.glyphicon-refresh:before{content:"\e031"}.glyphicon-list-alt:before{content:"\e032"}.glyphicon-lock:before{content:"\e033"}.glyphicon-flag:before{content:"\e034"}.glyphicon-headphones:before{content:"\e035"}.glyphicon-volume-off:before{content:"\e036"}.glyphicon-volume-down:before{content:"\e037"}.glyphicon-volume-up:before{content:"\e038"}.glyphicon-qrcode:before{content:"\e039"}.glyphicon-barcode:before{content:"\e040"}.glyphicon-tag:before{content:"\e041"}.glyphicon-tags:before{content:"\e042"}.glyphicon-book:before{content:"\e043"}.glyphicon-bookmark:before{content:"\e044"}.glyphicon-print:before{content:"\e045"}.glyphicon-camera:before{content:"\e046"}.glyphicon-font:before{content:"\e047"}.glyphicon-bold:before{content:"\e048"}.glyphicon-italic:before{content:"\e049"}.glyphicon-text-height:before{content:"\e050"}.glyphicon-text-width:before{content:"\e051"}.glyphicon-align-left:before{content:"\e052"}.glyphicon-align-center:before{content:"\e053"}.glyphicon-align-right:before{content:"\e054"}.glyphicon-align-justify:before{content:"\e055"}.glyphicon-list:before{content:"\e056"}.glyphicon-indent-left:before{content:"\e057"}.glyphicon-indent-right:before{content:"\e058"}.glyphicon-facetime-video:before{content:"\e059"}.glyphicon-picture:before{content:"\e060"}.glyphicon-map-marker:before{content:"\e062"}.glyphicon-adjust:before{content:"\e063"}.glyphicon-tint:before{content:"\e064"}.glyphicon-edit:before{content:"\e065"}.glyphicon-share:before{content:"\e066"}.glyphicon-check:before{content:"\e067"}.glyphicon-move:before{content:"\e068"}.glyphicon-step-backward:before{content:"\e069"}.glyphicon-fast-backward:before{content:"\e070"}.glyphicon-backward:before{content:"\e071"}.glyphicon-play:before{content:"\e072"}.glyphicon-pause:before{content:"\e073"}.glyphicon-stop:before{content:"\e074"}.glyphicon-forward:before{content:"\e075"}.glyphicon-fast-forward:before{content:"\e076"}.glyphicon-step-forward:before{content:"\e077"}.glyphicon-eject:before{content:"\e078"}.glyphicon-chevron-left:before{content:"\e079"}.glyphicon-chevron-right:before{content:"\e080"}.glyphicon-plus-sign:before{content:"\e081"}.glyphicon-minus-sign:before{content:"\e082"}.glyphicon-remove-sign:before{content:"\e083"}.glyphicon-ok-sign:before{content:"\e084"}.glyphicon-question-sign:before{content:"\e085"}.glyphicon-info-sign:before{content:"\e086"}.glyphicon-screenshot:before{content:"\e087"}.glyphicon-remove-circle:before{content:"\e088"}.glyphicon-ok-circle:before{content:"\e089"}.glyphicon-ban-circle:before{content:"\e090"}.glyphicon-arrow-left:before{content:"\e091"}.glyphicon-arrow-right:before{content:"\e092"}.glyphicon-arrow-up:before{content:"\e093"}.glyphicon-arrow-down:before{content:"\e094"}.glyphicon-share-alt:before{content:"\e095"}.glyphicon-resize-full:before{content:"\e096"}.glyphicon-resize-small:before{content:"\e097"}.glyphicon-exclamation-sign:before{content:"\e101"}.glyphicon-gift:before{content:"\e102"}.glyphicon-leaf:before{content:"\e103"}.glyphicon-fire:before{content:"\e104"}.glyphicon-eye-open:before{content:"\e105"}.glyphicon-eye-close:before{content:"\e106"}.glyphicon-warning-sign:before{content:"\e107"}.glyphicon-plane:before{content:"\e108"}.glyphicon-calendar:before{content:"\e109"}.glyphicon-random:before{content:"\e110"}.glyphicon-comment:before{content:"\e111"}.glyphicon-magnet:before{content:"\e112"}.glyphicon-chevron-up:before{content:"\e113"}.glyphicon-chevron-down:before{content:"\e114"}.glyphicon-retweet:before{content:"\e115"}.glyphicon-shopping-cart:before{content:"\e116"}.glyphicon-folder-close:before{content:"\e117"}.glyphicon-folder-open:before{content:"\e118"}.glyphicon-resize-vertical:before{content:"\e119"}.glyphicon-resize-horizontal:before{content:"\e120"}.glyphicon-hdd:before{content:"\e121"}.glyphicon-bullhorn:before{content:"\e122"}.glyphicon-bell:before{content:"\e123"}.glyphicon-certificate:before{content:"\e124"}.glyphicon-thumbs-up:before{content:"\e125"}.glyphicon-thumbs-down:before{content:"\e126"}.glyphicon-hand-right:before{content:"\e127"}.glyphicon-hand-left:before{content:"\e128"}.glyphicon-hand-up:before{content:"\e129"}.glyphicon-hand-down:before{content:"\e130"}.glyphicon-circle-arrow-right:before{content:"\e131"}.glyphicon-circle-arrow-left:before{content:"\e132"}.glyphicon-circle-arrow-up:before{content:"\e133"}.glyphicon-circle-arrow-down:before{content:"\e134"}.glyphicon-globe:before{content:"\e135"}.glyphicon-wrench:before{content:"\e136"}.glyphicon-tasks:before{content:"\e137"}.glyphicon-filter:before{content:"\e138"}.glyphicon-briefcase:before{content:"\e139"}.glyphicon-fullscreen:before{content:"\e140"}.glyphicon-dashboard:before{content:"\e141"}.glyphicon-paperclip:before{content:"\e142"}.glyphicon-heart-empty:before{content:"\e143"}.glyphicon-link:before{content:"\e144"}.glyphicon-phone:before{content:"\e145"}.glyphicon-pushpin:before{content:"\e146"}.glyphicon-usd:before{content:"\e148"}.glyphicon-gbp:before{content:"\e149"}.glyphicon-sort:before{content:"\e150"}.glyphicon-sort-by-alphabet:before{content:"\e151"}.glyphicon-sort-by-alphabet-alt:before{content:"\e152"}.glyphicon-sort-by-order:before{content:"\e153"}.glyphicon-sort-by-order-alt:before{content:"\e154"}.glyphicon-sort-by-attributes:before{content:"\e155"}.glyphicon-sort-by-attributes-alt:before{content:"\e156"}.glyphicon-unchecked:before{content:"\e157"}.glyphicon-expand:before{content:"\e158"}.glyphicon-collapse-down:before{content:"\e159"}.glyphicon-collapse-up:before{content:"\e160"}.glyphicon-log-in:before{content:"\e161"}.glyphicon-flash:before{content:"\e162"}.glyphicon-log-out:before{content:"\e163"}.glyphicon-new-window:before{content:"\e164"}.glyphicon-record:before{content:"\e165"}.glyphicon-save:before{content:"\e166"}.glyphicon-open:before{content:"\e167"}.glyphicon-saved:before{content:"\e168"}.glyphicon-import:before{content:"\e169"}.glyphicon-export:before{content:"\e170"}.glyphicon-send:before{content:"\e171"}.glyphicon-floppy-disk:before{content:"\e172"}.glyphicon-floppy-saved:before{content:"\e173"}.glyphicon-floppy-remove:before{content:"\e174"}.glyphicon-floppy-save:before{content:"\e175"}.glyphicon-floppy-open:before{content:"\e176"}.glyphicon-credit-card:before{content:"\e177"}.glyphicon-transfer:before{content:"\e178"}.glyphicon-cutlery:before{content:"\e179"}.glyphicon-header:before{content:"\e180"}.glyphicon-compressed:before{content:"\e181"}.glyphicon-earphone:before{content:"\e182"}.glyphicon-phone-alt:before{content:"\e183"}.glyphicon-tower:before{content:"\e184"}.glyphicon-stats:before{content:"\e185"}.glyphicon-sd-video:before{content:"\e186"}.glyphicon-hd-video:before{content:"\e187"}.glyphicon-subtitles:before{content:"\e188"}.glyphicon-sound-stereo:before{content:"\e189"}.glyphicon-sound-dolby:before{content:"\e190"}.glyphicon-sound-5-1:before{content:"\e191"}.glyphicon-sound-6-1:before{content:"\e192"}.glyphicon-sound-7-1:before{content:"\e193"}.glyphicon-copyright-mark:before{content:"\e194"}.glyphicon-registration-mark:before{content:"\e195"}.glyphicon-cloud-download:before{content:"\e197"}.glyphicon-cloud-upload:before{content:"\e198"}.glyphicon-tree-conifer:before{content:"\e199"}.glyphicon-tree-deciduous:before{content:"\e200"}.glyphicon-cd:before{content:"\e201"}.glyphicon-save-file:before{content:"\e202"}.glyphicon-open-file:before{content:"\e203"}.glyphicon-level-up:before{content:"\e204"}.glyphicon-copy:before{content:"\e205"}.glyphicon-paste:before{content:"\e206"}.glyphicon-alert:before{content:"\e209"}.glyphicon-equalizer:before{content:"\e210"}.glyphicon-king:before{content:"\e211"}.glyphicon-queen:before{content:"\e212"}.glyphicon-pawn:before{content:"\e213"}.glyphicon-bishop:before{content:"\e214"}.glyphicon-knight:before{content:"\e215"}.glyphicon-baby-formula:before{content:"\e216"}.glyphicon-tent:before{content:"\26fa"}.glyphicon-blackboard:before{content:"\e218"}.glyphicon-bed:before{content:"\e219"}.glyphicon-apple:before{content:"\f8ff"}.glyphicon-erase:before{content:"\e221"}.glyphicon-hourglass:before{content:"\231b"}.glyphicon-lamp:before{content:"\e223"}.glyphicon-duplicate:before{content:"\e224"}.glyphicon-piggy-bank:before{content:"\e225"}.glyphicon-scissors:before{content:"\e226"}.glyphicon-bitcoin:before,.glyphicon-btc:before,.glyphicon-xbt:before{content:"\e227"}.glyphicon-jpy:before,.glyphicon-yen:before{content:"\00a5"}.glyphicon-rub:before,.glyphicon-ruble:before{content:"\20bd"}.glyphicon-scale:before{content:"\e230"}.glyphicon-ice-lolly:before{content:"\e231"}.glyphicon-ice-lolly-tasted:before{content:"\e232"}.glyphicon-education:before{content:"\e233"}.glyphicon-option-horizontal:before{content:"\e234"}.glyphicon-option-vertical:before{content:"\e235"}.glyphicon-menu-hamburger:before{content:"\e236"}.glyphicon-modal-window:before{content:"\e237"}.glyphicon-oil:before{content:"\e238"}.glyphicon-grain:before{content:"\e239"}.glyphicon-sunglasses:before{content:"\e240"}.glyphicon-text-size:before{content:"\e241"}.glyphicon-text-color:before{content:"\e242"}.glyphicon-text-background:before{content:"\e243"}.glyphicon-object-align-top:before{content:"\e244"}.glyphicon-object-align-bottom:before{content:"\e245"}.glyphicon-object-align-horizontal:before{content:"\e246"}.glyphicon-object-align-left:before{content:"\e247"}.glyphicon-object-align-vertical:before{content:"\e248"}.glyphicon-object-align-right:before{content:"\e249"}.glyphicon-triangle-right:before{content:"\e250"}.glyphicon-triangle-left:before{content:"\e251"}.glyphicon-triangle-bottom:before{content:"\e252"}.glyphicon-triangle-top:before{content:"\e253"}.glyphicon-console:before{content:"\e254"}.glyphicon-superscript:before{content:"\e255"}.glyphicon-subscript:before{content:"\e256"}.glyphicon-menu-left:before{content:"\e257"}.glyphicon-menu-right:before{content:"\e258"}.glyphicon-menu-down:before{content:"\e259"}.glyphicon-menu-up:before{content:"\e260"}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}body{margin:0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;line-height:1.42857143;color:#000;background-color:#fff}button,input,select,textarea{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#337ab7;text-decoration:none}a:focus,a:hover{color:#23527c;text-decoration:underline}a:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}figure{margin:0}.carousel-inner>.item>a>img,.carousel-inner>.item>img,.img-responsive,.thumbnail a>img,.thumbnail>img{display:block;max-width:100%;height:auto}.img-rounded{border-radius:3px}.img-thumbnail{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}hr{margin-top:18px;margin-bottom:18px;border:0;border-top:1px solid #eee}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}[role=button]{cursor:pointer}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{font-family:inherit;font-weight:500;line-height:1.1;color:inherit}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-weight:400;line-height:1;color:#777}.h1,.h2,.h3,h1,h2,h3{margin-top:18px;margin-bottom:9px}.h1 .small,.h1 small,.h2 .small,.h2 small,.h3 .small,.h3 small,h1 .small,h1 small,h2 .small,h2 small,h3 .small,h3 small{font-size:65%}.h4,.h5,.h6,h4,h5,h6{margin-top:9px;margin-bottom:9px}.h4 .small,.h4 small,.h5 .small,.h5 small,.h6 .small,.h6 small,h4 .small,h4 small,h5 .small,h5 small,h6 .small,h6 small{font-size:75%}.h1,h1{font-size:33px}.h2,h2{font-size:27px}.h3,h3{font-size:23px}.h4,h4{font-size:17px}.h5,h5{font-size:13px}.h6,h6{font-size:12px}p{margin:0 0 9px}.lead{margin-bottom:18px;font-size:14px;font-weight:300;line-height:1.4}@media (min-width:768px){.lead{font-size:19.5px}}.small,small{font-size:92%}.mark,mark{background-color:#fcf8e3;padding:.2em}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-justify{text-align:justify}.text-nowrap{white-space:nowrap}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-muted{color:#777}.text-primary{color:#337ab7}a.text-primary:hover{color:#286090}.text-success{color:#3c763d}a.text-success:hover{color:#2b542c}.text-info{color:#31708f}a.text-info:hover{color:#245269}.text-warning{color:#8a6d3b}a.text-warning:hover{color:#66512c}.text-danger{color:#a94442}a.text-danger:hover{color:#843534}.bg-primary{color:#fff;background-color:#337ab7}a.bg-primary:hover{background-color:#286090}.bg-success{background-color:#dff0d8}a.bg-success:hover{background-color:#c1e2b3}.bg-info{background-color:#d9edf7}a.bg-info:hover{background-color:#afd9ee}.bg-warning{background-color:#fcf8e3}a.bg-warning:hover{background-color:#f7ecb5}.bg-danger{background-color:#f2dede}a.bg-danger:hover{background-color:#e4b9b9}.page-header{padding-bottom:8px;margin:36px 0 18px;border-bottom:1px solid #eee}ol,ul{margin-top:0;margin-bottom:9px}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none;margin-left:-5px}.list-inline>li{display:inline-block;padding-left:5px;padding-right:5px}dl{margin-top:0;margin-bottom:18px}dd,dt{line-height:1.42857143}dt{font-weight:700}dd{margin-left:0}@media (min-width:541px){.dl-horizontal dt{float:left;width:160px;clear:left;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dl-horizontal dd{margin-left:180px}}abbr[data-original-title],abbr[title]{cursor:help;border-bottom:1px dotted #777}.initialism{font-size:90%;text-transform:uppercase}blockquote{padding:9px 18px;margin:0 0 18px;font-size:inherit;border-left:5px solid #eee}blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child{margin-bottom:0}blockquote .small,blockquote footer,blockquote small{display:block;font-size:80%;line-height:1.42857143;color:#777}blockquote .small:before,blockquote footer:before,blockquote small:before{content:'\2014 \00A0'}.blockquote-reverse,blockquote.pull-right{padding-right:15px;padding-left:0;border-right:5px solid #eee;border-left:0;text-align:right}.blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before{content:''}.blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after{content:'\00A0 \2014'}address{margin-bottom:18px;font-style:normal;line-height:1.42857143}code,kbd,pre,samp{font-family:monospace}code{padding:2px 4px;font-size:90%;background-color:#f9f2f4;border-radius:2px}kbd{padding:2px 4px;font-size:90%;color:#fff;background-color:#333;border-radius:1px;box-shadow:inset 0 -1px 0 rgba(0,0,0,.25)}kbd kbd{padding:0;font-size:100%;font-weight:700;box-shadow:none}pre{display:block;padding:8.5px;margin:0 0 9px;word-break:break-all;word-wrap:break-word;color:#333;background-color:#f5f5f5;border:1px solid #ccc;border-radius:2px}pre code{padding:0;font-size:inherit;color:inherit;white-space:pre-wrap;background-color:transparent;border-radius:0}.pre-scrollable{max-height:340px;overflow-y:scroll}.container{margin-right:auto;margin-left:auto;padding-left:0;padding-right:0}@media (min-width:768px){.container{width:768px}}@media (min-width:992px){.container{width:940px}}@media (min-width:1200px){.container{width:1140px}}.container-fluid{margin-right:auto;margin-left:auto;padding-left:0;padding-right:0}.row{margin-left:0;margin-right:0}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-left:0;padding-right:0}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}table{background-color:transparent}caption{padding-top:8px;padding-bottom:8px;color:#777;text-align:left}th{text-align:left}.table{width:100%;max-width:100%;margin-bottom:18px}.table>tbody>tr>td,.table>tbody>tr>th,.table>tfoot>tr>td,.table>tfoot>tr>th,.table>thead>tr>td,.table>thead>tr>th{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table>thead>tr>th{vertical-align:bottom;border-bottom:2px solid #ddd}.table>caption+thead>tr:first-child>td,.table>caption+thead>tr:first-child>th,.table>colgroup+thead>tr:first-child>td,.table>colgroup+thead>tr:first-child>th,.table>thead:first-child>tr:first-child>td,.table>thead:first-child>tr:first-child>th{border-top:0}.table>tbody+tbody{border-top:2px solid #ddd}.table .table{background-color:#fff}.table-condensed>tbody>tr>td,.table-condensed>tbody>tr>th,.table-condensed>tfoot>tr>td,.table-condensed>tfoot>tr>th,.table-condensed>thead>tr>td,.table-condensed>thead>tr>th{padding:5px}.table-bordered,.table-bordered>tbody>tr>td,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>td,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border:1px solid #ddd}.table-bordered>thead>tr>td,.table-bordered>thead>tr>th{border-bottom-width:2px}.table-striped>tbody>tr:nth-of-type(odd){background-color:#f9f9f9}.table-hover>tbody>tr:hover{background-color:#f5f5f5}table col[class*=col-]{position:static;float:none;display:table-column}table td[class*=col-],table th[class*=col-]{position:static;float:none;display:table-cell}.table>tbody>tr.active>td,.table>tbody>tr.active>th,.table>tbody>tr>td.active,.table>tbody>tr>th.active,.table>tfoot>tr.active>td,.table>tfoot>tr.active>th,.table>tfoot>tr>td.active,.table>tfoot>tr>th.active,.table>thead>tr.active>td,.table>thead>tr.active>th,.table>thead>tr>td.active,.table>thead>tr>th.active{background-color:#f5f5f5}.table-hover>tbody>tr.active:hover>td,.table-hover>tbody>tr.active:hover>th,.table-hover>tbody>tr:hover>.active,.table-hover>tbody>tr>td.active:hover,.table-hover>tbody>tr>th.active:hover{background-color:#e8e8e8}.table>tbody>tr.success>td,.table>tbody>tr.success>th,.table>tbody>tr>td.success,.table>tbody>tr>th.success,.table>tfoot>tr.success>td,.table>tfoot>tr.success>th,.table>tfoot>tr>td.success,.table>tfoot>tr>th.success,.table>thead>tr.success>td,.table>thead>tr.success>th,.table>thead>tr>td.success,.table>thead>tr>th.success{background-color:#dff0d8}.table-hover>tbody>tr.success:hover>td,.table-hover>tbody>tr.success:hover>th,.table-hover>tbody>tr:hover>.success,.table-hover>tbody>tr>td.success:hover,.table-hover>tbody>tr>th.success:hover{background-color:#d0e9c6}.table>tbody>tr.info>td,.table>tbody>tr.info>th,.table>tbody>tr>td.info,.table>tbody>tr>th.info,.table>tfoot>tr.info>td,.table>tfoot>tr.info>th,.table>tfoot>tr>td.info,.table>tfoot>tr>th.info,.table>thead>tr.info>td,.table>thead>tr.info>th,.table>thead>tr>td.info,.table>thead>tr>th.info{background-color:#d9edf7}.table-hover>tbody>tr.info:hover>td,.table-hover>tbody>tr.info:hover>th,.table-hover>tbody>tr:hover>.info,.table-hover>tbody>tr>td.info:hover,.table-hover>tbody>tr>th.info:hover{background-color:#c4e3f3}.table>tbody>tr.warning>td,.table>tbody>tr.warning>th,.table>tbody>tr>td.warning,.table>tbody>tr>th.warning,.table>tfoot>tr.warning>td,.table>tfoot>tr.warning>th,.table>tfoot>tr>td.warning,.table>tfoot>tr>th.warning,.table>thead>tr.warning>td,.table>thead>tr.warning>th,.table>thead>tr>td.warning,.table>thead>tr>th.warning{background-color:#fcf8e3}.table-hover>tbody>tr.warning:hover>td,.table-hover>tbody>tr.warning:hover>th,.table-hover>tbody>tr:hover>.warning,.table-hover>tbody>tr>td.warning:hover,.table-hover>tbody>tr>th.warning:hover{background-color:#faf2cc}.table>tbody>tr.danger>td,.table>tbody>tr.danger>th,.table>tbody>tr>td.danger,.table>tbody>tr>th.danger,.table>tfoot>tr.danger>td,.table>tfoot>tr.danger>th,.table>tfoot>tr>td.danger,.table>tfoot>tr>th.danger,.table>thead>tr.danger>td,.table>thead>tr.danger>th,.table>thead>tr>td.danger,.table>thead>tr>th.danger{background-color:#f2dede}.table-hover>tbody>tr.danger:hover>td,.table-hover>tbody>tr.danger:hover>th,.table-hover>tbody>tr:hover>.danger,.table-hover>tbody>tr>td.danger:hover,.table-hover>tbody>tr>th.danger:hover{background-color:#ebcccc}.table-responsive{overflow-x:auto;min-height:.01%}@media screen and (max-width:767px){.table-responsive{width:100%;margin-bottom:13.5px;overflow-y:hidden;-ms-overflow-style:-ms-autohiding-scrollbar;border:1px solid #ddd}.table-responsive>.table{margin-bottom:0}.table-responsive>.table>tbody>tr>td,.table-responsive>.table>tbody>tr>th,.table-responsive>.table>tfoot>tr>td,.table-responsive>.table>tfoot>tr>th,.table-responsive>.table>thead>tr>td,.table-responsive>.table>thead>tr>th{white-space:nowrap}.table-responsive>.table-bordered{border:0}.table-responsive>.table-bordered>tbody>tr>td:first-child,.table-responsive>.table-bordered>tbody>tr>th:first-child,.table-responsive>.table-bordered>tfoot>tr>td:first-child,.table-responsive>.table-bordered>tfoot>tr>th:first-child,.table-responsive>.table-bordered>thead>tr>td:first-child,.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.table-responsive>.table-bordered>tbody>tr>td:last-child,.table-responsive>.table-bordered>tbody>tr>th:last-child,.table-responsive>.table-bordered>tfoot>tr>td:last-child,.table-responsive>.table-bordered>tfoot>tr>th:last-child,.table-responsive>.table-bordered>thead>tr>td:last-child,.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.table-responsive>.table-bordered>tbody>tr:last-child>td,.table-responsive>.table-bordered>tbody>tr:last-child>th,.table-responsive>.table-bordered>tfoot>tr:last-child>td,.table-responsive>.table-bordered>tfoot>tr:last-child>th{border-bottom:0}}fieldset{padding:0;margin:0;border:0;min-width:0}legend{display:block;width:100%;padding:0;margin-bottom:18px;font-size:19.5px;line-height:inherit;color:#333;border:0;border-bottom:1px solid #e5e5e5}label{display:inline-block;max-width:100%;margin-bottom:5px}input[type=search]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none}input[type=checkbox],input[type=radio]{margin:4px 0 0;margin-top:1px \9;line-height:normal}input[type=file]{display:block}input[type=range]{display:block;width:100%}select[multiple],select[size]{height:auto}input[type=file]:focus,input[type=checkbox]:focus,input[type=radio]:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}output{display:block;padding-top:7px;font-size:13px;line-height:1.42857143;color:#555}.form-control{display:block;width:100%;height:32px;padding:6px 12px;font-size:13px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:2px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.form-control:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.form-control::-moz-placeholder{color:#999;opacity:1}.form-control:-ms-input-placeholder{color:#999}.form-control::-webkit-input-placeholder{color:#999}.form-control[disabled],.form-control[readonly],fieldset[disabled] .form-control{background-color:#eee;opacity:1}.form-control[disabled],fieldset[disabled] .form-control{cursor:not-allowed}textarea.form-control{height:auto}@media screen and (-webkit-min-device-pixel-ratio:0){input[type=date],input[type=time],input[type=datetime-local],input[type=month]{line-height:32px}.input-group-sm input[type=date],.input-group-sm input[type=time],.input-group-sm input[type=datetime-local],.input-group-sm input[type=month],input[type=date].input-sm,input[type=time].input-sm,input[type=datetime-local].input-sm,input[type=month].input-sm{line-height:30px}.input-group-lg input[type=date],.input-group-lg input[type=time],.input-group-lg input[type=datetime-local],.input-group-lg input[type=month],input[type=date].input-lg,input[type=time].input-lg,input[type=datetime-local].input-lg,input[type=month].input-lg{line-height:45px}}.form-group{margin-bottom:15px}.checkbox,.radio{position:relative;display:block;margin-top:10px;margin-bottom:10px}.checkbox label,.radio label{min-height:18px;padding-left:20px;margin-bottom:0;font-weight:400;cursor:pointer}.checkbox input[type=checkbox],.checkbox-inline input[type=checkbox],.radio input[type=radio],.radio-inline input[type=radio]{position:absolute;margin-left:-20px;margin-top:4px \9}.checkbox+.checkbox,.radio+.radio{margin-top:-5px}.checkbox-inline,.radio-inline{position:relative;display:inline-block;padding-left:20px;margin-bottom:0;vertical-align:middle;font-weight:400;cursor:pointer}.checkbox-inline+.checkbox-inline,.radio-inline+.radio-inline{margin-top:0;margin-left:10px}.checkbox-inline.disabled,.checkbox.disabled label,.radio-inline.disabled,.radio.disabled label,fieldset[disabled] .checkbox label,fieldset[disabled] .checkbox-inline,fieldset[disabled] .radio label,fieldset[disabled] .radio-inline,fieldset[disabled] input[type=checkbox],fieldset[disabled] input[type=radio],input[type=checkbox].disabled,input[type=checkbox][disabled],input[type=radio].disabled,input[type=radio][disabled]{cursor:not-allowed}.form-control-static{padding-top:7px;padding-bottom:7px;margin-bottom:0;min-height:31px}.form-control-static.input-lg,.form-control-static.input-sm{padding-left:0;padding-right:0}.input-sm{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.input-sm{height:30px;line-height:30px}select[multiple].input-sm,textarea.input-sm{height:auto}.form-group-sm .form-control{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.form-group-sm .form-control{height:30px;line-height:30px}select[multiple].form-group-sm .form-control,textarea.form-group-sm .form-control{height:auto}.form-group-sm .form-control-static{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;min-height:30px}.input-lg{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.input-lg{height:45px;line-height:45px}select[multiple].input-lg,textarea.input-lg{height:auto}.form-group-lg .form-control{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.form-group-lg .form-control{height:45px;line-height:45px}select[multiple].form-group-lg .form-control,textarea.form-group-lg .form-control{height:auto}.form-group-lg .form-control-static{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;min-height:35px}.has-feedback{position:relative}.has-feedback .form-control{padding-right:40px}.form-control-feedback{position:absolute;top:0;right:0;z-index:2;display:block;width:32px;height:32px;line-height:32px;text-align:center;pointer-events:none}.input-lg+.form-control-feedback{width:45px;height:45px;line-height:45px}.input-sm+.form-control-feedback{width:30px;height:30px;line-height:30px}.has-success .checkbox,.has-success .checkbox-inline,.has-success .control-label,.has-success .help-block,.has-success .radio,.has-success .radio-inline,.has-success.checkbox label,.has-success.checkbox-inline label,.has-success.radio label,.has-success.radio-inline label{color:#3c763d}.has-success .form-control{border-color:#3c763d;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-success .form-control:focus{border-color:#2b542c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #67b168}.has-success .input-group-addon{color:#3c763d;border-color:#3c763d;background-color:#dff0d8}.has-success .form-control-feedback{color:#3c763d}.has-warning .checkbox,.has-warning .checkbox-inline,.has-warning .control-label,.has-warning .help-block,.has-warning .radio,.has-warning .radio-inline,.has-warning.checkbox label,.has-warning.checkbox-inline label,.has-warning.radio label,.has-warning.radio-inline label{color:#8a6d3b}.has-warning .form-control{border-color:#8a6d3b;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-warning .form-control:focus{border-color:#66512c;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #c0a16b}.has-warning .input-group-addon{color:#8a6d3b;border-color:#8a6d3b;background-color:#fcf8e3}.has-warning .form-control-feedback{color:#8a6d3b}.has-error .checkbox,.has-error .checkbox-inline,.has-error .control-label,.has-error .help-block,.has-error .radio,.has-error .radio-inline,.has-error.checkbox label,.has-error.checkbox-inline label,.has-error.radio label,.has-error.radio-inline label{color:#a94442}.has-error .form-control{border-color:#a94442;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.has-error .form-control:focus{border-color:#843534;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 6px #ce8483}.has-error .input-group-addon{color:#a94442;border-color:#a94442;background-color:#f2dede}.has-error .form-control-feedback{color:#a94442}.has-feedback label~.form-control-feedback{top:23px}.has-feedback label.sr-only~.form-control-feedback{top:0}.help-block{display:block;margin-top:5px;margin-bottom:10px;color:#404040}.form-horizontal .checkbox,.form-horizontal .checkbox-inline,.form-horizontal .radio,.form-horizontal .radio-inline{margin-top:0;margin-bottom:0;padding-top:7px}.form-horizontal .checkbox,.form-horizontal .radio{min-height:25px}.form-horizontal .form-group{margin-left:0;margin-right:0}.form-horizontal .has-feedback .form-control-feedback{right:0}@media (min-width:768px){.form-inline .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-static{display:inline-block}.form-inline .input-group{display:inline-table;vertical-align:middle}.form-inline .input-group .form-control,.form-inline .input-group .input-group-addon,.form-inline .input-group .input-group-btn{width:auto}.form-inline .input-group>.form-control{width:100%}.form-inline .control-label{margin-bottom:0;vertical-align:middle}.form-inline .checkbox,.form-inline .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.form-inline .checkbox label,.form-inline .radio label{padding-left:0}.form-inline .checkbox input[type=checkbox],.form-inline .radio input[type=radio]{position:relative;margin-left:0}.form-inline .has-feedback .form-control-feedback{top:0}.form-horizontal .control-label{text-align:right;margin-bottom:0;padding-top:7px}.form-horizontal .form-group-lg .control-label{padding-top:14.33px}.form-horizontal .form-group-sm .control-label{padding-top:6px}}.btn{display:inline-block;margin-bottom:0;font-weight:400;text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;padding:6px 12px;font-size:13px;line-height:1.42857143;border-radius:2px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.btn.active.focus,.btn.active:focus,.btn.focus,.btn:active.focus,.btn:active:focus,.btn:focus{outline:dotted thin;outline:-webkit-focus-ring-color auto 5px;outline-offset:-2px}.btn.focus,.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn.active,.btn:active{outline:0;background-image:none;-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn.disabled,.btn[disabled],fieldset[disabled] .btn{cursor:not-allowed;pointer-events:none;opacity:.65;filter:alpha(opacity=65);-webkit-box-shadow:none;box-shadow:none}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn-default.active,.btn-default.focus,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.btn-default.active,.btn-default:active,.open>.dropdown-toggle.btn-default{background-image:none}.btn-default.disabled,.btn-default.disabled.active,.btn-default.disabled.focus,.btn-default.disabled:active,.btn-default.disabled:focus,.btn-default.disabled:hover,.btn-default[disabled],.btn-default[disabled].active,.btn-default[disabled].focus,.btn-default[disabled]:active,.btn-default[disabled]:focus,.btn-default[disabled]:hover,fieldset[disabled] .btn-default,fieldset[disabled] .btn-default.active,fieldset[disabled] .btn-default.focus,fieldset[disabled] .btn-default:active,fieldset[disabled] .btn-default:focus,fieldset[disabled] .btn-default:hover{background-color:#fff;border-color:#ccc}.btn-default .badge{color:#fff;background-color:#333}.btn-primary{color:#fff;background-color:#337ab7;border-color:#2e6da4}.btn-primary.active,.btn-primary.focus,.btn-primary:active,.btn-primary:focus,.btn-primary:hover,.open>.dropdown-toggle.btn-primary{color:#fff;background-color:#286090;border-color:#204d74}.btn-primary.active,.btn-primary:active,.open>.dropdown-toggle.btn-primary{background-image:none}.btn-primary.disabled,.btn-primary.disabled.active,.btn-primary.disabled.focus,.btn-primary.disabled:active,.btn-primary.disabled:focus,.btn-primary.disabled:hover,.btn-primary[disabled],.btn-primary[disabled].active,.btn-primary[disabled].focus,.btn-primary[disabled]:active,.btn-primary[disabled]:focus,.btn-primary[disabled]:hover,fieldset[disabled] .btn-primary,fieldset[disabled] .btn-primary.active,fieldset[disabled] .btn-primary.focus,fieldset[disabled] .btn-primary:active,fieldset[disabled] .btn-primary:focus,fieldset[disabled] .btn-primary:hover{background-color:#337ab7;border-color:#2e6da4}.btn-primary .badge{color:#337ab7;background-color:#fff}.btn-success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.btn-success.active,.btn-success.focus,.btn-success:active,.btn-success:focus,.btn-success:hover,.open>.dropdown-toggle.btn-success{color:#fff;background-color:#449d44;border-color:#398439}.btn-success.active,.btn-success:active,.open>.dropdown-toggle.btn-success{background-image:none}.btn-success.disabled,.btn-success.disabled.active,.btn-success.disabled.focus,.btn-success.disabled:active,.btn-success.disabled:focus,.btn-success.disabled:hover,.btn-success[disabled],.btn-success[disabled].active,.btn-success[disabled].focus,.btn-success[disabled]:active,.btn-success[disabled]:focus,.btn-success[disabled]:hover,fieldset[disabled] .btn-success,fieldset[disabled] .btn-success.active,fieldset[disabled] .btn-success.focus,fieldset[disabled] .btn-success:active,fieldset[disabled] .btn-success:focus,fieldset[disabled] .btn-success:hover{background-color:#5cb85c;border-color:#4cae4c}.btn-success .badge{color:#5cb85c;background-color:#fff}.btn-info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.btn-info.active,.btn-info.focus,.btn-info:active,.btn-info:focus,.btn-info:hover,.open>.dropdown-toggle.btn-info{color:#fff;background-color:#31b0d5;border-color:#269abc}.btn-info.active,.btn-info:active,.open>.dropdown-toggle.btn-info{background-image:none}.btn-info.disabled,.btn-info.disabled.active,.btn-info.disabled.focus,.btn-info.disabled:active,.btn-info.disabled:focus,.btn-info.disabled:hover,.btn-info[disabled],.btn-info[disabled].active,.btn-info[disabled].focus,.btn-info[disabled]:active,.btn-info[disabled]:focus,.btn-info[disabled]:hover,fieldset[disabled] .btn-info,fieldset[disabled] .btn-info.active,fieldset[disabled] .btn-info.focus,fieldset[disabled] .btn-info:active,fieldset[disabled] .btn-info:focus,fieldset[disabled] .btn-info:hover{background-color:#5bc0de;border-color:#46b8da}.btn-info .badge{color:#5bc0de;background-color:#fff}.btn-warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.btn-warning.active,.btn-warning.focus,.btn-warning:active,.btn-warning:focus,.btn-warning:hover,.open>.dropdown-toggle.btn-warning{color:#fff;background-color:#ec971f;border-color:#d58512}.btn-warning.active,.btn-warning:active,.open>.dropdown-toggle.btn-warning{background-image:none}.btn-warning.disabled,.btn-warning.disabled.active,.btn-warning.disabled.focus,.btn-warning.disabled:active,.btn-warning.disabled:focus,.btn-warning.disabled:hover,.btn-warning[disabled],.btn-warning[disabled].active,.btn-warning[disabled].focus,.btn-warning[disabled]:active,.btn-warning[disabled]:focus,.btn-warning[disabled]:hover,fieldset[disabled] .btn-warning,fieldset[disabled] .btn-warning.active,fieldset[disabled] .btn-warning.focus,fieldset[disabled] .btn-warning:active,fieldset[disabled] .btn-warning:focus,fieldset[disabled] .btn-warning:hover{background-color:#f0ad4e;border-color:#eea236}.btn-warning .badge{color:#f0ad4e;background-color:#fff}.btn-danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.btn-danger.active,.btn-danger.focus,.btn-danger:active,.btn-danger:focus,.btn-danger:hover,.open>.dropdown-toggle.btn-danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.btn-danger.active,.btn-danger:active,.open>.dropdown-toggle.btn-danger{background-image:none}.btn-danger.disabled,.btn-danger.disabled.active,.btn-danger.disabled.focus,.btn-danger.disabled:active,.btn-danger.disabled:focus,.btn-danger.disabled:hover,.btn-danger[disabled],.btn-danger[disabled].active,.btn-danger[disabled].focus,.btn-danger[disabled]:active,.btn-danger[disabled]:focus,.btn-danger[disabled]:hover,fieldset[disabled] .btn-danger,fieldset[disabled] .btn-danger.active,fieldset[disabled] .btn-danger.focus,fieldset[disabled] .btn-danger:active,fieldset[disabled] .btn-danger:focus,fieldset[disabled] .btn-danger:hover{background-color:#d9534f;border-color:#d43f3a}.btn-danger .badge{color:#d9534f;background-color:#fff}.btn-link{color:#337ab7;font-weight:400;border-radius:0}.btn-link,.btn-link.active,.btn-link:active,.btn-link[disabled],fieldset[disabled] .btn-link{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.btn-link,.btn-link:active,.btn-link:focus,.btn-link:hover{border-color:transparent}.btn-link:focus,.btn-link:hover{color:#23527c;text-decoration:underline;background-color:transparent}.btn-link[disabled]:focus,.btn-link[disabled]:hover,fieldset[disabled] .btn-link:focus,fieldset[disabled] .btn-link:hover{color:#777;text-decoration:none}.btn-group-lg>.btn,.btn-lg{padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}.btn-group-sm>.btn,.btn-sm{padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}.btn-group-xs>.btn,.btn-xs{padding:1px 5px;font-size:12px;line-height:1.5;border-radius:1px}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:5px}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{opacity:0;-webkit-transition:opacity .15s linear;-o-transition:opacity .15s linear;transition:opacity .15s linear}.fade.in{opacity:1}.collapse{display:none}.collapse.in{display:block}tr.collapse.in{display:table-row}tbody.collapse.in{display:table-row-group}.collapsing{position:relative;height:0;overflow:hidden;-webkit-transition-property:height,visibility;transition-property:height,visibility;-webkit-transition-duration:.35s;transition-duration:.35s;-webkit-transition-timing-function:ease;transition-timing-function:ease}.caret{display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px dashed;border-right:4px solid transparent;border-left:4px solid transparent}.dropdown,.dropup{position:relative}.dropdown-toggle:focus{outline:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:13px;text-align:left;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:2px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.dropdown-menu.pull-right{right:0;left:auto}.dropdown-menu .divider{height:1px;margin:8px 0;overflow:hidden;background-color:#e5e5e5}.dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.dropdown-menu>li>a:focus,.dropdown-menu>li>a:hover{text-decoration:none;color:#262626;background-color:#f5f5f5}.dropdown-menu>.active>a,.dropdown-menu>.active>a:focus,.dropdown-menu>.active>a:hover{color:#fff;text-decoration:none;outline:0;background-color:#337ab7}.dropdown-menu>.disabled>a,.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{color:#777}.dropdown-menu>.disabled>a:focus,.dropdown-menu>.disabled>a:hover{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);cursor:not-allowed}.open>.dropdown-menu{display:block}.open>a{outline:0}.dropdown-menu-right{left:auto;right:0}.dropdown-menu-left{left:0;right:auto}.dropdown-header{display:block;padding:3px 20px;font-size:12px;line-height:1.42857143;color:#777;white-space:nowrap}.dropdown-backdrop{position:fixed;left:0;right:0;bottom:0;top:0;z-index:990}.pull-right>.dropdown-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropdown .caret{border-top:0;border-bottom:4px solid;content:""}.dropup .dropdown-menu,.navbar-fixed-bottom .dropdown .dropdown-menu{top:auto;bottom:100%;margin-bottom:2px}@media (min-width:541px){.navbar-right .dropdown-menu{left:auto;right:0}.navbar-right .dropdown-menu-left{left:0;right:auto}}.btn-group,.btn-group-vertical{position:relative;display:inline-block;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;float:left}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:2}.btn-group .btn+.btn,.btn-group .btn+.btn-group,.btn-group .btn-group+.btn,.btn-group .btn-group+.btn-group{margin-left:-1px}.btn-toolbar{margin-left:-5px}.btn-toolbar .btn-group,.btn-toolbar .input-group{float:left}.btn-toolbar>.btn,.btn-toolbar>.btn-group,.btn-toolbar>.input-group{margin-left:5px}.btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle){border-radius:0}.btn-group>.btn:first-child{margin-left:0}.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn:last-child:not(:first-child),.btn-group>.dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.btn-group>.btn-group{float:left}.btn-group>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-top-right-radius:0}.btn-group>.btn-group:last-child:not(:first-child)>.btn:first-child{border-bottom-left-radius:0;border-top-left-radius:0}.btn-group .dropdown-toggle:active,.btn-group.open .dropdown-toggle{outline:0}.btn-group>.btn+.dropdown-toggle{padding-left:8px;padding-right:8px}.btn-group>.btn-lg+.dropdown-toggle{padding-left:12px;padding-right:12px}.btn-group.open .dropdown-toggle{-webkit-box-shadow:inset 0 3px 5px rgba(0,0,0,.125);box-shadow:inset 0 3px 5px rgba(0,0,0,.125)}.btn-group.open .dropdown-toggle.btn-link{-webkit-box-shadow:none;box-shadow:none}.btn .caret{margin-left:0}.btn-lg .caret{border-width:5px 5px 0}.dropup .btn-lg .caret{border-width:0 5px 5px}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group,.btn-group-vertical>.btn-group>.btn{display:block;float:none;width:100%;max-width:100%}.btn-group-vertical>.btn-group>.btn{float:none}.btn-group-vertical>.btn+.btn,.btn-group-vertical>.btn+.btn-group,.btn-group-vertical>.btn-group+.btn,.btn-group-vertical>.btn-group+.btn-group{margin-top:-1px;margin-left:0}.btn-group-vertical>.btn:not(:first-child):not(:last-child){border-radius:0}.btn-group-vertical>.btn:first-child:not(:last-child){border-top-right-radius:2px;border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:last-child:not(:first-child){border-bottom-left-radius:2px;border-top-right-radius:0;border-top-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child):not(:last-child)>.btn{border-radius:0}.btn-group-vertical>.btn-group:first-child:not(:last-child)>.btn:last-child,.btn-group-vertical>.btn-group:first-child:not(:last-child)>.dropdown-toggle{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:last-child:not(:first-child)>.btn:first-child{border-top-right-radius:0;border-top-left-radius:0}.btn-group-justified{display:table;width:100%;table-layout:fixed;border-collapse:separate}.btn-group-justified>.btn,.btn-group-justified>.btn-group{float:none;display:table-cell;width:1%}.btn-group-justified>.btn-group .btn{width:100%}.btn-group-justified>.btn-group .dropdown-menu{left:auto}[data-toggle=buttons]>.btn input[type=checkbox],[data-toggle=buttons]>.btn input[type=radio],[data-toggle=buttons]>.btn-group>.btn input[type=checkbox],[data-toggle=buttons]>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:table;border-collapse:separate}.input-group[class*=col-]{float:none;padding-left:0;padding-right:0}.input-group .form-control{position:relative;z-index:2;float:left;width:100%;margin-bottom:0}.input-group-lg>.form-control,.input-group-lg>.input-group-addon,.input-group-lg>.input-group-btn>.btn{height:45px;padding:10px 16px;font-size:17px;line-height:1.3333333;border-radius:3px}select.input-group-lg>.form-control,select.input-group-lg>.input-group-addon,select.input-group-lg>.input-group-btn>.btn{height:45px;line-height:45px}select[multiple].input-group-lg>.form-control,select[multiple].input-group-lg>.input-group-addon,select[multiple].input-group-lg>.input-group-btn>.btn,textarea.input-group-lg>.form-control,textarea.input-group-lg>.input-group-addon,textarea.input-group-lg>.input-group-btn>.btn{height:auto}.input-group-sm>.form-control,.input-group-sm>.input-group-addon,.input-group-sm>.input-group-btn>.btn{height:30px;padding:5px 10px;font-size:12px;line-height:1.5;border-radius:1px}select.input-group-sm>.form-control,select.input-group-sm>.input-group-addon,select.input-group-sm>.input-group-btn>.btn{height:30px;line-height:30px}select[multiple].input-group-sm>.form-control,select[multiple].input-group-sm>.input-group-addon,select[multiple].input-group-sm>.input-group-btn>.btn,textarea.input-group-sm>.form-control,textarea.input-group-sm>.input-group-addon,textarea.input-group-sm>.input-group-btn>.btn{height:auto}.input-group .form-control,.input-group-addon,.input-group-btn{display:table-cell}.input-group .form-control:not(:first-child):not(:last-child),.input-group-addon:not(:first-child):not(:last-child),.input-group-btn:not(:first-child):not(:last-child){border-radius:0}.input-group-addon,.input-group-btn{width:1%;white-space:nowrap;vertical-align:middle}.input-group-addon{padding:6px 12px;font-size:13px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:1px solid #ccc;border-radius:2px}.input-group-addon.input-sm{padding:5px 10px;font-size:12px;border-radius:1px}.input-group-addon.input-lg{padding:10px 16px;font-size:17px;border-radius:3px}.input-group-addon input[type=checkbox],.input-group-addon input[type=radio]{margin-top:0}.input-group .form-control:first-child,.input-group-addon:first-child,.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group>.btn,.input-group-btn:first-child>.dropdown-toggle,.input-group-btn:last-child>.btn-group:not(:last-child)>.btn,.input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.input-group-addon:first-child{border-right:0}.input-group .form-control:last-child,.input-group-addon:last-child,.input-group-btn:first-child>.btn-group:not(:first-child)>.btn,.input-group-btn:first-child>.btn:not(:first-child),.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group>.btn,.input-group-btn:last-child>.dropdown-toggle{border-bottom-left-radius:0;border-top-left-radius:0}.input-group-addon:last-child{border-left:0}.input-group-btn{position:relative;font-size:0;white-space:nowrap}.input-group-btn>.btn{position:relative}.input-group-btn>.btn+.btn{margin-left:-1px}.input-group-btn>.btn:active,.input-group-btn>.btn:focus,.input-group-btn>.btn:hover{z-index:2}.input-group-btn:first-child>.btn,.input-group-btn:first-child>.btn-group{margin-right:-1px}.input-group-btn:last-child>.btn,.input-group-btn:last-child>.btn-group{margin-left:-1px}.nav{margin-bottom:0;padding-left:0;list-style:none}.nav>li{position:relative;display:block}.nav>li>a{position:relative;display:block;padding:10px 15px}.nav>li>a:focus,.nav>li>a:hover{text-decoration:none;background-color:#eee}.nav>li.disabled>a{color:#777}.nav>li.disabled>a:focus,.nav>li.disabled>a:hover{color:#777;text-decoration:none;background-color:transparent;cursor:not-allowed}.nav .open>a,.nav .open>a:focus,.nav .open>a:hover{background-color:#eee;border-color:#337ab7}.nav .nav-divider{height:1px;margin:8px 0;overflow:hidden;background-color:#e5e5e5}.nav>li>a>img{max-width:none}.nav-tabs{border-bottom:1px solid #ddd}.nav-tabs>li{float:left;margin-bottom:-1px}.nav-tabs>li>a{margin-right:2px;line-height:1.42857143;border:1px solid transparent;border-radius:2px 2px 0 0}.nav-tabs>li>a:hover{border-color:#eee #eee #ddd}.nav-tabs>li.active>a,.nav-tabs>li.active>a:focus,.nav-tabs>li.active>a:hover{color:#555;background-color:#fff;border:1px solid #ddd;border-bottom-color:transparent;cursor:default}.nav-tabs.nav-justified{width:100%;border-bottom:0}.nav-tabs.nav-justified>li{float:none}.nav-tabs.nav-justified>li>a{text-align:center;margin-bottom:5px;margin-right:0;border-radius:2px}.nav-tabs.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-tabs.nav-justified>li{display:table-cell;width:1%}.nav-tabs.nav-justified>li>a{margin-bottom:0;border-bottom:1px solid #ddd;border-radius:2px 2px 0 0}.nav-tabs.nav-justified>.active>a,.nav-tabs.nav-justified>.active>a:focus,.nav-tabs.nav-justified>.active>a:hover{border-bottom-color:#fff}}.nav-pills>li{float:left}.nav-pills>li>a{border-radius:2px}.nav-pills>li+li{margin-left:2px}.nav-pills>li.active>a,.nav-pills>li.active>a:focus,.nav-pills>li.active>a:hover{color:#fff;background-color:#337ab7}.nav-stacked>li{float:none}.nav-stacked>li+li{margin-top:2px;margin-left:0}.nav-justified{width:100%}.nav-justified>li{float:none}.nav-justified>li>a{text-align:center;margin-bottom:5px}.nav-justified>.dropdown .dropdown-menu{top:auto;left:auto}.nav-tabs-justified{border-bottom:0}.nav-tabs-justified>li>a{margin-right:0;border-radius:2px}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border:1px solid #ddd}@media (min-width:768px){.nav-justified>li{display:table-cell;width:1%}.nav-justified>li>a{margin-bottom:0}.nav-tabs-justified>li>a{border-bottom:1px solid #ddd;border-radius:2px 2px 0 0}.nav-tabs-justified>.active>a,.nav-tabs-justified>.active>a:focus,.nav-tabs-justified>.active>a:hover{border-bottom-color:#fff}}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-right-radius:0;border-top-left-radius:0}.navbar{position:relative;min-height:30px;margin-bottom:18px;border:1px solid transparent}.navbar-collapse{overflow-x:visible;padding-right:0;padding-left:0;border-top:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.1);-webkit-overflow-scrolling:touch}.navbar-collapse.in{overflow-y:auto}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:340px}@media (max-device-width:540px)and (orientation:landscape){.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse{max-height:200px}}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-static-top{z-index:1000;border-width:0 0 1px}.navbar-fixed-bottom,.navbar-fixed-top{position:fixed;right:0;left:0;z-index:1030}@media (min-width:541px){.navbar{border-radius:2px}.navbar-header{float:left}.navbar-collapse{width:auto;border-top:0;box-shadow:none}.navbar-collapse.collapse{display:block!important;height:auto!important;padding-bottom:0;overflow:visible!important}.navbar-collapse.in{overflow-y:visible}.navbar-fixed-bottom .navbar-collapse,.navbar-fixed-top .navbar-collapse,.navbar-static-top .navbar-collapse{padding-left:0;padding-right:0}.container-fluid>.navbar-collapse,.container-fluid>.navbar-header,.container>.navbar-collapse,.container>.navbar-header{margin-right:0;margin-left:0}.navbar-fixed-bottom,.navbar-fixed-top,.navbar-static-top{border-radius:0}}.navbar-fixed-top{top:0;border-width:0 0 1px}.navbar-fixed-bottom{bottom:0;margin-bottom:0;border-width:1px 0 0}.navbar-brand{float:left;padding:6px 0;font-size:17px;line-height:18px;height:30px}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-brand>img{display:block}.navbar-toggle{position:relative;float:right;margin-right:0;padding:9px 10px;margin-top:-2px;margin-bottom:-2px;background-color:transparent;background-image:none;border:1px solid transparent;border-radius:2px}.navbar-toggle:focus{outline:0}.navbar-toggle .icon-bar{display:block;width:22px;height:2px;border-radius:1px}.navbar-toggle .icon-bar+.icon-bar{margin-top:4px}@media (min-width:541px){.navbar>.container .navbar-brand,.navbar>.container-fluid .navbar-brand{margin-left:0}.navbar-toggle{display:none}}.navbar-nav{margin:3px 0}.navbar-nav>li>a{padding-top:10px;padding-bottom:10px;line-height:18px}@media (max-width:540px){.navbar-nav .open .dropdown-menu{position:static;float:none;width:auto;margin-top:0;background-color:transparent;border:0;box-shadow:none}.navbar-nav .open .dropdown-menu .dropdown-header,.navbar-nav .open .dropdown-menu>li>a{padding:5px 15px 5px 25px}.navbar-nav .open .dropdown-menu>li>a{line-height:18px}.navbar-nav .open .dropdown-menu>li>a:focus,.navbar-nav .open .dropdown-menu>li>a:hover{background-image:none}}@media (min-width:541px){.navbar-nav{float:left;margin:0}.navbar-nav>li{float:left}.navbar-nav>li>a{padding-top:6px;padding-bottom:6px}}.navbar-form{padding:10px 0;border-top:1px solid transparent;border-bottom:1px solid transparent;-webkit-box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 1px 0 rgba(255,255,255,.1);margin:-1px 0}@media (min-width:768px){.navbar-form .form-group{display:inline-block;margin-bottom:0;vertical-align:middle}.navbar-form .form-control{display:inline-block;width:auto;vertical-align:middle}.navbar-form .form-control-static{display:inline-block}.navbar-form .input-group{display:inline-table;vertical-align:middle}.navbar-form .input-group .form-control,.navbar-form .input-group .input-group-addon,.navbar-form .input-group .input-group-btn{width:auto}.navbar-form .input-group>.form-control{width:100%}.navbar-form .control-label{margin-bottom:0;vertical-align:middle}.navbar-form .checkbox,.navbar-form .radio{display:inline-block;margin-top:0;margin-bottom:0;vertical-align:middle}.navbar-form .checkbox label,.navbar-form .radio label{padding-left:0}.navbar-form .checkbox input[type=checkbox],.navbar-form .radio input[type=radio]{position:relative;margin-left:0}.navbar-form .has-feedback .form-control-feedback{top:0}}@media (max-width:540px){.navbar-form .form-group{margin-bottom:5px}.navbar-form .form-group:last-child{margin-bottom:0}}.navbar-nav>li>.dropdown-menu{margin-top:0;border-top-right-radius:0;border-top-left-radius:0}.navbar-fixed-bottom .navbar-nav>li>.dropdown-menu{margin-bottom:0;border-radius:2px 2px 0 0}.navbar-btn{margin-top:-1px;margin-bottom:-1px}.navbar-btn.btn-sm{margin-top:0;margin-bottom:0}.navbar-btn.btn-xs{margin-top:4px;margin-bottom:4px}.navbar-text{margin-top:6px;margin-bottom:6px}@media (min-width:541px){.navbar-form{width:auto;border:0;margin-left:0;margin-right:0;padding-top:0;padding-bottom:0;-webkit-box-shadow:none;box-shadow:none}.navbar-text{float:left;margin-left:0;margin-right:0}.navbar-left{float:left!important;float:left}.navbar-right{float:right!important;float:right;margin-right:0}.navbar-right~.navbar-right{margin-right:0}}.navbar-default{background-color:#f8f8f8;border-color:#e7e7e7}.navbar-default .navbar-brand{color:#777}.navbar-default .navbar-brand:focus,.navbar-default .navbar-brand:hover{color:#5e5e5e;background-color:transparent}.navbar-default .navbar-nav>li>a,.navbar-default .navbar-text{color:#777}.navbar-default .navbar-nav>li>a:focus,.navbar-default .navbar-nav>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav>.active>a,.navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav>.disabled>a,.navbar-default .navbar-nav>.disabled>a:focus,.navbar-default .navbar-nav>.disabled>a:hover{color:#ccc;background-color:transparent}.navbar-default .navbar-toggle{border-color:#ddd}.navbar-default .navbar-toggle:focus,.navbar-default .navbar-toggle:hover{background-color:#ddd}.navbar-default .navbar-toggle .icon-bar{background-color:#888}.navbar-default .navbar-collapse,.navbar-default .navbar-form{border-color:#e7e7e7}.navbar-default .navbar-nav>.open>a,.navbar-default .navbar-nav>.open>a:focus,.navbar-default .navbar-nav>.open>a:hover{background-color:#e7e7e7;color:#555}@media (max-width:540px){.navbar-default .navbar-nav .open .dropdown-menu>li>a{color:#777}.navbar-default .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>li>a:hover{color:#333;background-color:transparent}.navbar-default .navbar-nav .open .dropdown-menu>.active>a,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.active>a:hover{color:#555;background-color:#e7e7e7}.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-default .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#ccc;background-color:transparent}}.navbar-default .navbar-link{color:#777}.navbar-default .navbar-link:hover{color:#333}.navbar-default .btn-link{color:#777}.navbar-default .btn-link:focus,.navbar-default .btn-link:hover{color:#333}.navbar-default .btn-link[disabled]:focus,.navbar-default .btn-link[disabled]:hover,fieldset[disabled] .navbar-default .btn-link:focus,fieldset[disabled] .navbar-default .btn-link:hover{color:#ccc}.navbar-inverse{background-color:#222;border-color:#080808}.navbar-inverse .navbar-brand{color:#9d9d9d}.navbar-inverse .navbar-brand:focus,.navbar-inverse .navbar-brand:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>li>a,.navbar-inverse .navbar-text{color:#9d9d9d}.navbar-inverse .navbar-nav>li>a:focus,.navbar-inverse .navbar-nav>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav>.active>a,.navbar-inverse .navbar-nav>.active>a:focus,.navbar-inverse .navbar-nav>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav>.disabled>a,.navbar-inverse .navbar-nav>.disabled>a:focus,.navbar-inverse .navbar-nav>.disabled>a:hover{color:#444;background-color:transparent}.navbar-inverse .navbar-toggle{border-color:#333}.navbar-inverse .navbar-toggle:focus,.navbar-inverse .navbar-toggle:hover{background-color:#333}.navbar-inverse .navbar-toggle .icon-bar{background-color:#fff}.navbar-inverse .navbar-collapse,.navbar-inverse .navbar-form{border-color:#101010}.navbar-inverse .navbar-nav>.open>a,.navbar-inverse .navbar-nav>.open>a:focus,.navbar-inverse .navbar-nav>.open>a:hover{background-color:#080808;color:#fff}@media (max-width:540px){.navbar-inverse .navbar-nav .open .dropdown-menu>.dropdown-header{border-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu .divider{background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a{color:#9d9d9d}.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover{color:#fff;background-color:transparent}.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover{color:#fff;background-color:#080808}.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:focus,.navbar-inverse .navbar-nav .open .dropdown-menu>.disabled>a:hover{color:#444;background-color:transparent}}.navbar-inverse .navbar-link{color:#9d9d9d}.navbar-inverse .navbar-link:hover{color:#fff}.navbar-inverse .btn-link{color:#9d9d9d}.navbar-inverse .btn-link:focus,.navbar-inverse .btn-link:hover{color:#fff}.navbar-inverse .btn-link[disabled]:focus,.navbar-inverse .btn-link[disabled]:hover,fieldset[disabled] .navbar-inverse .btn-link:focus,fieldset[disabled] .navbar-inverse .btn-link:hover{color:#444}.breadcrumb{padding:8px 15px;margin-bottom:18px;list-style:none;background-color:#f5f5f5;border-radius:2px}.breadcrumb>li{display:inline-block}.breadcrumb>li+li:before{content:"/\00a0";padding:0 5px;color:#5e5e5e}.breadcrumb>.active{color:#777}.pagination{display:inline-block;padding-left:0;margin:18px 0;border-radius:2px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;line-height:1.42857143;text-decoration:none;color:#337ab7;background-color:#fff;border:1px solid #ddd;margin-left:-1px}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-bottom-left-radius:2px;border-top-left-radius:2px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-bottom-right-radius:2px;border-top-right-radius:2px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7;cursor:default}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;background-color:#fff;border-color:#ddd;cursor:not-allowed}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:17px}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-bottom-left-radius:1px;border-top-left-radius:1px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-bottom-right-radius:1px;border-top-right-radius:1px}.pager{padding-left:0;margin:18px 0;list-style:none;text-align:center}.pager li{display:inline}.pager li>a,.pager li>span{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee}.pager .next>a,.pager .next>span{float:right}.pager .previous>a,.pager .previous>span{float:left}.pager .disabled>a,.pager .disabled>a:focus,.pager .disabled>a:hover,.pager .disabled>span{color:#777;background-color:#fff;cursor:not-allowed}.label{display:inline;padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em}a.label:focus,a.label:hover{color:#fff;text-decoration:none;cursor:pointer}.label:empty{display:none}.btn .label{position:relative;top:-1px}.label-default{background-color:#777}.label-default[href]:focus,.label-default[href]:hover{background-color:#5e5e5e}.label-primary{background-color:#337ab7}.label-primary[href]:focus,.label-primary[href]:hover{background-color:#286090}.label-success{background-color:#5cb85c}.label-success[href]:focus,.label-success[href]:hover{background-color:#449d44}.label-info{background-color:#5bc0de}.label-info[href]:focus,.label-info[href]:hover{background-color:#31b0d5}.label-warning{background-color:#f0ad4e}.label-warning[href]:focus,.label-warning[href]:hover{background-color:#ec971f}.label-danger{background-color:#d9534f}.label-danger[href]:focus,.label-danger[href]:hover{background-color:#c9302c}.badge{display:inline-block;min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;color:#fff;line-height:1;vertical-align:baseline;white-space:nowrap;text-align:center;background-color:#777;border-radius:10px}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.btn-group-xs>.btn .badge,.btn-xs .badge{top:0;padding:1px 5px}a.badge:focus,a.badge:hover{color:#fff;text-decoration:none;cursor:pointer}.list-group-item.active>.badge,.nav-pills>.active>a>.badge{color:#337ab7;background-color:#fff}.list-group-item>.badge{float:right}.list-group-item>.badge+.badge{margin-right:5px}.nav-pills>li>a>.badge{margin-left:3px}.jumbotron{padding:30px 15px;margin-bottom:30px;color:inherit;background-color:#eee}.jumbotron .h1,.jumbotron h1{color:inherit}.jumbotron p{margin-bottom:15px;font-size:20px;font-weight:200}.jumbotron>hr{border-top-color:#d5d5d5}.container .jumbotron,.container-fluid .jumbotron{border-radius:3px}.jumbotron .container{max-width:100%}@media screen and (min-width:768px){.jumbotron{padding:48px 0}.container .jumbotron,.container-fluid .jumbotron{padding-left:60px;padding-right:60px}.jumbotron .h1,.jumbotron h1{font-size:58.5px}}.thumbnail{display:block;padding:4px;margin-bottom:18px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out}.thumbnail a>img,.thumbnail>img{margin-left:auto;margin-right:auto}a.thumbnail.active,a.thumbnail:focus,a.thumbnail:hover{border-color:#337ab7}.thumbnail .caption{padding:9px;color:#000}.alert{padding:15px;margin-bottom:18px;border:1px solid transparent;border-radius:2px}.alert h4{margin-top:0;color:inherit}.alert .alert-link{font-weight:700}.alert>p,.alert>ul{margin-bottom:0}.alert>p+p{margin-top:5px}.alert-dismissable,.alert-dismissible{padding-right:35px}.alert-dismissable .close,.alert-dismissible .close{position:relative;top:-2px;right:-21px;color:inherit}.alert-success{background-color:#dff0d8;border-color:#d6e9c6;color:#3c763d}.alert-success hr{border-top-color:#c9e2b3}.alert-success .alert-link{color:#2b542c}.alert-info{background-color:#d9edf7;border-color:#bce8f1;color:#31708f}.alert-info hr{border-top-color:#a6e1ec}.alert-info .alert-link{color:#245269}.alert-warning{background-color:#fcf8e3;border-color:#faebcc;color:#8a6d3b}.alert-warning hr{border-top-color:#f7e1b5}.alert-warning .alert-link{color:#66512c}.alert-danger{background-color:#f2dede;border-color:#ebccd1;color:#a94442}.alert-danger hr{border-top-color:#e4b9c0}.alert-danger .alert-link{color:#843534}@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:18px;margin-bottom:18px;background-color:#f5f5f5;border-radius:2px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.1);box-shadow:inset 0 1px 2px rgba(0,0,0,.1)}.progress-bar{float:left;width:0;height:100%;font-size:12px;line-height:18px;color:#fff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);-webkit-transition:width .6s ease;-o-transition:width .6s ease;transition:width .6s ease}.progress-bar-striped,.progress-striped .progress-bar{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:40px 40px}.progress-bar.active,.progress.active .progress-bar{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)}.media{margin-top:15px}.media:first-child{margin-top:0}.media,.media-body{zoom:1;overflow:hidden}.media-body{width:10000px}.media-object{display:block}.media-right,.media>.pull-right{padding-left:10px}.media-left,.media>.pull-left{padding-right:10px}.media-body,.media-left,.media-right{display:table-cell;vertical-align:top}.media-middle{vertical-align:middle}.media-bottom{vertical-align:bottom}.media-heading{margin-top:0;margin-bottom:5px}.media-list{padding-left:0;list-style:none}.list-group{margin-bottom:20px;padding-left:0}.list-group-item{position:relative;display:block;padding:10px 15px;margin-bottom:-1px;background-color:#fff;border:1px solid #ddd}.list-group-item:first-child{border-top-right-radius:2px;border-top-left-radius:2px}.list-group-item:last-child{margin-bottom:0;border-bottom-right-radius:2px;border-bottom-left-radius:2px}a.list-group-item{color:#555}a.list-group-item .list-group-item-heading{color:#333}a.list-group-item:focus,a.list-group-item:hover{text-decoration:none;color:#555;background-color:#f5f5f5}.list-group-item.disabled,.list-group-item.disabled:focus,.list-group-item.disabled:hover{background-color:#eee;color:#777;cursor:not-allowed}.list-group-item.disabled .list-group-item-heading,.list-group-item.disabled:focus .list-group-item-heading,.list-group-item.disabled:hover .list-group-item-heading{color:inherit}.list-group-item.disabled .list-group-item-text,.list-group-item.disabled:focus .list-group-item-text,.list-group-item.disabled:hover .list-group-item-text{color:#777}.list-group-item.active,.list-group-item.active:focus,.list-group-item.active:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7}.list-group-item.active .list-group-item-heading,.list-group-item.active .list-group-item-heading>.small,.list-group-item.active .list-group-item-heading>small,.list-group-item.active:focus .list-group-item-heading,.list-group-item.active:focus .list-group-item-heading>.small,.list-group-item.active:focus .list-group-item-heading>small,.list-group-item.active:hover .list-group-item-heading,.list-group-item.active:hover .list-group-item-heading>.small,.list-group-item.active:hover .list-group-item-heading>small{color:inherit}.list-group-item.active .list-group-item-text,.list-group-item.active:focus .list-group-item-text,.list-group-item.active:hover .list-group-item-text{color:#c7ddef}.list-group-item-success{color:#3c763d;background-color:#dff0d8}a.list-group-item-success{color:#3c763d}a.list-group-item-success .list-group-item-heading{color:inherit}a.list-group-item-success:focus,a.list-group-item-success:hover{color:#3c763d;background-color:#d0e9c6}a.list-group-item-success.active,a.list-group-item-success.active:focus,a.list-group-item-success.active:hover{color:#fff;background-color:#3c763d;border-color:#3c763d}.list-group-item-info{color:#31708f;background-color:#d9edf7}a.list-group-item-info{color:#31708f}a.list-group-item-info .list-group-item-heading{color:inherit}a.list-group-item-info:focus,a.list-group-item-info:hover{color:#31708f;background-color:#c4e3f3}a.list-group-item-info.active,a.list-group-item-info.active:focus,a.list-group-item-info.active:hover{color:#fff;background-color:#31708f;border-color:#31708f}.list-group-item-warning{color:#8a6d3b;background-color:#fcf8e3}a.list-group-item-warning{color:#8a6d3b}a.list-group-item-warning .list-group-item-heading{color:inherit}a.list-group-item-warning:focus,a.list-group-item-warning:hover{color:#8a6d3b;background-color:#faf2cc}a.list-group-item-warning.active,a.list-group-item-warning.active:focus,a.list-group-item-warning.active:hover{color:#fff;background-color:#8a6d3b;border-color:#8a6d3b}.list-group-item-danger{color:#a94442;background-color:#f2dede}a.list-group-item-danger{color:#a94442}a.list-group-item-danger .list-group-item-heading{color:inherit}a.list-group-item-danger:focus,a.list-group-item-danger:hover{color:#a94442;background-color:#ebcccc}a.list-group-item-danger.active,a.list-group-item-danger.active:focus,a.list-group-item-danger.active:hover{color:#fff;background-color:#a94442;border-color:#a94442}.list-group-item-heading{margin-top:0;margin-bottom:5px}.list-group-item-text{margin-bottom:0;line-height:1.3}.panel{margin-bottom:18px;background-color:#fff;border:1px solid transparent;border-radius:2px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.05);box-shadow:0 1px 1px rgba(0,0,0,.05)}.panel-body{padding:15px}.panel-heading{padding:10px 15px;border-bottom:1px solid transparent;border-top-right-radius:1px;border-top-left-radius:1px}.panel-heading>.dropdown .dropdown-toggle{color:inherit}.panel-title{margin-top:0;margin-bottom:0;font-size:15px;color:inherit}.panel-title>.small,.panel-title>.small>a,.panel-title>a,.panel-title>small,.panel-title>small>a{color:inherit}.panel-footer{padding:10px 15px;background-color:#f5f5f5;border-top:1px solid #ddd;border-bottom-right-radius:1px;border-bottom-left-radius:1px}.panel>.list-group,.panel>.panel-collapse>.list-group{margin-bottom:0}.panel>.list-group .list-group-item,.panel>.panel-collapse>.list-group .list-group-item{border-width:1px 0;border-radius:0}.panel>.list-group:first-child .list-group-item:first-child,.panel>.panel-collapse>.list-group:first-child .list-group-item:first-child{border-top:0;border-top-right-radius:1px;border-top-left-radius:1px}.panel>.list-group:last-child .list-group-item:last-child,.panel>.panel-collapse>.list-group:last-child .list-group-item:last-child{border-bottom:0;border-bottom-right-radius:1px;border-bottom-left-radius:1px}.list-group+.panel-footer,.panel-heading+.list-group .list-group-item:first-child{border-top-width:0}.panel>.panel-collapse>.table,.panel>.table,.panel>.table-responsive>.table{margin-bottom:0}.panel>.panel-collapse>.table caption,.panel>.table caption,.panel>.table-responsive>.table caption{padding-left:15px;padding-right:15px}.panel>.table-responsive:first-child>.table:first-child,.panel>.table:first-child{border-top-right-radius:1px;border-top-left-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child,.panel>.table:first-child>thead:first-child>tr:first-child{border-top-left-radius:1px;border-top-right-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:first-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:first-child,.panel>.table:first-child>thead:first-child>tr:first-child td:first-child,.panel>.table:first-child>thead:first-child>tr:first-child th:first-child{border-top-left-radius:1px}.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table-responsive:first-child>.table:first-child>thead:first-child>tr:first-child th:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child td:last-child,.panel>.table:first-child>tbody:first-child>tr:first-child th:last-child,.panel>.table:first-child>thead:first-child>tr:first-child td:last-child,.panel>.table:first-child>thead:first-child>tr:first-child th:last-child{border-top-right-radius:1px}.panel>.table-responsive:last-child>.table:last-child,.panel>.table:last-child{border-bottom-right-radius:1px;border-bottom-left-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child{border-bottom-left-radius:1px;border-bottom-right-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:first-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:first-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:first-child{border-bottom-left-radius:1px}.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table-responsive:last-child>.table:last-child>tfoot:last-child>tr:last-child th:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child td:last-child,.panel>.table:last-child>tbody:last-child>tr:last-child th:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child td:last-child,.panel>.table:last-child>tfoot:last-child>tr:last-child th:last-child{border-bottom-right-radius:1px}.panel>.panel-body+.table,.panel>.panel-body+.table-responsive,.panel>.table+.panel-body,.panel>.table-responsive+.panel-body{border-top:1px solid #ddd}.panel>.table>tbody:first-child>tr:first-child td,.panel>.table>tbody:first-child>tr:first-child th{border-top:0}.panel>.table-bordered,.panel>.table-responsive>.table-bordered{border:0}.panel>.table-bordered>tbody>tr>td:first-child,.panel>.table-bordered>tbody>tr>th:first-child,.panel>.table-bordered>tfoot>tr>td:first-child,.panel>.table-bordered>tfoot>tr>th:first-child,.panel>.table-bordered>thead>tr>td:first-child,.panel>.table-bordered>thead>tr>th:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:first-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:first-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:first-child,.panel>.table-responsive>.table-bordered>thead>tr>td:first-child,.panel>.table-responsive>.table-bordered>thead>tr>th:first-child{border-left:0}.panel>.table-bordered>tbody>tr>td:last-child,.panel>.table-bordered>tbody>tr>th:last-child,.panel>.table-bordered>tfoot>tr>td:last-child,.panel>.table-bordered>tfoot>tr>th:last-child,.panel>.table-bordered>thead>tr>td:last-child,.panel>.table-bordered>thead>tr>th:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>td:last-child,.panel>.table-responsive>.table-bordered>tbody>tr>th:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>td:last-child,.panel>.table-responsive>.table-bordered>tfoot>tr>th:last-child,.panel>.table-responsive>.table-bordered>thead>tr>td:last-child,.panel>.table-responsive>.table-bordered>thead>tr>th:last-child{border-right:0}.panel>.table-bordered>tbody>tr:first-child>td,.panel>.table-bordered>tbody>tr:first-child>th,.panel>.table-bordered>tbody>tr:last-child>td,.panel>.table-bordered>tbody>tr:last-child>th,.panel>.table-bordered>tfoot>tr:last-child>td,.panel>.table-bordered>tfoot>tr:last-child>th,.panel>.table-bordered>thead>tr:first-child>td,.panel>.table-bordered>thead>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:first-child>th,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>td,.panel>.table-responsive>.table-bordered>tbody>tr:last-child>th,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>td,.panel>.table-responsive>.table-bordered>tfoot>tr:last-child>th,.panel>.table-responsive>.table-bordered>thead>tr:first-child>td,.panel>.table-responsive>.table-bordered>thead>tr:first-child>th{border-bottom:0}.panel>.table-responsive{border:0;margin-bottom:0}.panel-group{margin-bottom:18px}.panel-group .panel{margin-bottom:0;border-radius:2px}.panel-group .panel+.panel{margin-top:5px}.panel-group .panel-heading{border-bottom:0}.panel-group .panel-heading+.panel-collapse>.list-group,.panel-group .panel-heading+.panel-collapse>.panel-body{border-top:1px solid #ddd}.panel-group .panel-footer{border-top:0}.panel-group .panel-footer+.panel-collapse .panel-body{border-bottom:1px solid #ddd}.panel-default{border-color:#ddd}.panel-default>.panel-heading{color:#333;background-color:#f5f5f5;border-color:#ddd}.panel-default>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ddd}.panel-default>.panel-heading .badge{color:#f5f5f5;background-color:#333}.panel-default>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ddd}.panel-primary{border-color:#337ab7}.panel-primary>.panel-heading{color:#fff;background-color:#337ab7;border-color:#337ab7}.panel-primary>.panel-heading+.panel-collapse>.panel-body{border-top-color:#337ab7}.panel-primary>.panel-heading .badge{color:#337ab7;background-color:#fff}.panel-primary>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#337ab7}.panel-success{border-color:#d6e9c6}.panel-success>.panel-heading{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.panel-success>.panel-heading+.panel-collapse>.panel-body{border-top-color:#d6e9c6}.panel-success>.panel-heading .badge{color:#dff0d8;background-color:#3c763d}.panel-success>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#d6e9c6}.panel-info{border-color:#bce8f1}.panel-info>.panel-heading{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.panel-info>.panel-heading+.panel-collapse>.panel-body{border-top-color:#bce8f1}.panel-info>.panel-heading .badge{color:#d9edf7;background-color:#31708f}.panel-info>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#bce8f1}.panel-warning{border-color:#faebcc}.panel-warning>.panel-heading{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.panel-warning>.panel-heading+.panel-collapse>.panel-body{border-top-color:#faebcc}.panel-warning>.panel-heading .badge{color:#fcf8e3;background-color:#8a6d3b}.panel-warning>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#faebcc}.panel-danger{border-color:#ebccd1}.panel-danger>.panel-heading{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.panel-danger>.panel-heading+.panel-collapse>.panel-body{border-top-color:#ebccd1}.panel-danger>.panel-heading .badge{color:#f2dede;background-color:#a94442}.panel-danger>.panel-footer+.panel-collapse>.panel-body{border-bottom-color:#ebccd1}.embed-responsive{position:relative;display:block;height:0;padding:0;overflow:hidden}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;left:0;bottom:0;height:100%;width:100%;border:0}.embed-responsive-16by9{padding-bottom:56.25%}.embed-responsive-4by3{padding-bottom:75%}.well{min-height:20px;padding:19px;margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;border-radius:2px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.05)}.well blockquote{border-color:#ddd;border-color:rgba(0,0,0,.15)}.well-lg{padding:24px;border-radius:3px}.well-sm{padding:9px;border-radius:1px}.close{float:right;font-size:19.5px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.2;filter:alpha(opacity=20)}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.5;filter:alpha(opacity=50)}button.close{padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.modal-open{overflow:hidden}.modal{display:none;overflow:hidden;position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;-webkit-overflow-scrolling:touch;outline:0}.modal.fade .modal-dialog{-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal.in .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal-dialog{position:relative;width:auto;margin:10px}.modal-content{position:relative;background-color:#fff;border:1px solid #999;border:1px solid rgba(0,0,0,.2);border-radius:3px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);background-clip:padding-box;outline:0}.modal-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}.modal-backdrop.fade{opacity:0;filter:alpha(opacity=0)}.modal-backdrop.in{opacity:.5;filter:alpha(opacity=50)}.modal-header{padding:15px;border-bottom:1px solid #e5e5e5;min-height:16.43px}.modal-header .close{margin-top:-2px}.modal-title{margin:0;line-height:1.42857143}.modal-body{position:relative;padding:15px}.modal-footer{padding:15px;text-align:right;border-top:1px solid #e5e5e5}.modal-footer .btn+.btn{margin-left:5px;margin-bottom:0}.modal-footer .btn-group .btn+.btn{margin-left:-1px}.modal-footer .btn-block+.btn-block{margin-left:0}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:768px){.modal-dialog{width:600px;margin:30px auto}.modal-content{-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px rgba(0,0,0,.5)}.modal-sm{width:300px}}@media (min-width:992px){.modal-lg{width:900px}}.tooltip{position:absolute;z-index:1070;display:block;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:1.4;opacity:0;filter:alpha(opacity=0)}.tooltip.in{opacity:.9;filter:alpha(opacity=90)}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:200px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;border-radius:2px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{bottom:0;right:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;left:5px;margin-bottom:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;right:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;left:5px;margin-top:-5px;border-width:0 5px 5px;border-bottom-color:#000}.popover{position:absolute;top:0;left:0;z-index:1060;display:none;max-width:276px;padding:1px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;line-height:1.42857143;text-align:left;background-color:#fff;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.2);border-radius:3px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.2);box-shadow:0 5px 10px rgba(0,0,0,.2);white-space:normal}.popover.top{margin-top:-10px}.popover.right{margin-left:10px}.popover.bottom{margin-top:10px}.popover.left{margin-left:-10px}.popover-title{margin:0;padding:8px 14px;font-size:13px;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-radius:2px 2px 0 0}.popover-content{padding:9px 14px}.popover>.arrow,.popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.popover>.arrow{border-width:11px}.popover>.arrow:after{border-width:10px;content:""}.popover.top>.arrow{left:50%;margin-left:-11px;border-bottom-width:0;border-top-color:#999;border-top-color:rgba(0,0,0,.25);bottom:-11px}.popover.top>.arrow:after{content:" ";bottom:1px;margin-left:-10px;border-bottom-width:0;border-top-color:#fff}.popover.right>.arrow{top:50%;left:-11px;margin-top:-11px;border-left-width:0;border-right-color:#999;border-right-color:rgba(0,0,0,.25)}.popover.right>.arrow:after{content:" ";left:1px;bottom:-10px;border-left-width:0;border-right-color:#fff}.popover.bottom>.arrow{left:50%;margin-left:-11px;border-top-width:0;border-bottom-color:#999;border-bottom-color:rgba(0,0,0,.25);top:-11px}.popover.bottom>.arrow:after{content:" ";top:1px;margin-left:-10px;border-top-width:0;border-bottom-color:#fff}.popover.left>.arrow{top:50%;right:-11px;margin-top:-11px;border-right-width:0;border-left-color:#999;border-left-color:rgba(0,0,0,.25)}.popover.left>.arrow:after{content:" ";right:1px;border-right-width:0;border-left-color:#fff;bottom:-10px}.carousel{position:relative}.carousel-inner{position:relative;overflow:hidden;width:100%}.carousel-inner>.item{display:none;position:relative;-webkit-transition:.6s ease-in-out left;-o-transition:.6s ease-in-out left;transition:.6s ease-in-out left}.carousel-inner>.item>a>img,.carousel-inner>.item>img{line-height:1}@media all and (transform-3d),(-webkit-transform-3d){.carousel-inner>.item{-webkit-transition:-webkit-transform .6s ease-in-out;-moz-transition:-moz-transform .6s ease-in-out;-o-transition:-o-transform .6s ease-in-out;transition:transform .6s ease-in-out;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000;-moz-perspective:1000;perspective:1000}.carousel-inner>.item.active.right,.carousel-inner>.item.next{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);left:0}.carousel-inner>.item.active.left,.carousel-inner>.item.prev{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);left:0}.carousel-inner>.item.active,.carousel-inner>.item.next.left,.carousel-inner>.item.prev.right{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);left:0}}.carousel-inner>.active,.carousel-inner>.next,.carousel-inner>.prev{display:block}.carousel-inner>.active{left:0}.carousel-inner>.next,.carousel-inner>.prev{position:absolute;top:0;width:100%}.carousel-inner>.next{left:100%}.carousel-inner>.prev{left:-100%}.carousel-inner>.next.left,.carousel-inner>.prev.right{left:0}.carousel-inner>.active.left{left:-100%}.carousel-inner>.active.right{left:100%}.carousel-control{position:absolute;top:0;left:0;bottom:0;width:15%;opacity:.5;filter:alpha(opacity=50);font-size:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-control.left{background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-image:linear-gradient(to right,rgba(0,0,0,.5) 0,rgba(0,0,0,.0001) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)}.carousel-control.right{left:auto;right:0;background-image:-webkit-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:-o-linear-gradient(left,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-image:linear-gradient(to right,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)}.carousel-control:focus,.carousel-control:hover{outline:0;color:#fff;text-decoration:none;opacity:.9;filter:alpha(opacity=90)}.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{position:absolute;top:50%;z-index:5;display:inline-block}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{left:50%;margin-left:-10px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{right:50%;margin-right:-10px}.carousel-control .icon-next,.carousel-control .icon-prev{width:20px;height:20px;margin-top:-10px;line-height:1;font-family:serif}.carousel-control .icon-prev:before{content:'\2039'}.carousel-control .icon-next:before{content:'\203a'}.carousel-indicators{position:absolute;bottom:10px;left:50%;z-index:15;width:60%;margin-left:-30%;padding-left:0;list-style:none;text-align:center}.carousel-indicators li{display:inline-block;width:10px;height:10px;margin:1px;text-indent:-999px;border:1px solid #fff;border-radius:10px;cursor:pointer;background-color:transparent}.carousel-indicators .active{margin:0;width:12px;height:12px;background-color:#fff}.carousel-caption{position:absolute;left:15%;right:15%;bottom:20px;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center;text-shadow:0 1px 2px rgba(0,0,0,.6)}.carousel-caption .btn{text-shadow:none}@media screen and (min-width:768px){.carousel-control .glyphicon-chevron-left,.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next,.carousel-control .icon-prev{width:30px;height:30px;margin-top:-15px;font-size:30px}.carousel-control .glyphicon-chevron-left,.carousel-control .icon-prev{margin-left:-15px}.carousel-control .glyphicon-chevron-right,.carousel-control .icon-next{margin-right:-15px}.carousel-caption{left:20%;right:20%;padding-bottom:30px}.carousel-indicators{bottom:20px}}.btn-group-vertical>.btn-group:after,.btn-group-vertical>.btn-group:before,.btn-toolbar:after,.btn-toolbar:before,.clearfix:after,.clearfix:before,.container-fluid:after,.container-fluid:before,.container:after,.container:before,.dl-horizontal dd:after,.dl-horizontal dd:before,.form-horizontal .form-group:after,.form-horizontal .form-group:before,.item_buttons:after,.item_buttons:before,.modal-footer:after,.modal-footer:before,.nav:after,.nav:before,.navbar-collapse:after,.navbar-collapse:before,.navbar-header:after,.navbar-header:before,.navbar:after,.navbar:before,.pager:after,.pager:before,.panel-body:after,.panel-body:before,.row:after,.row:before{content:" ";display:table}.btn-group-vertical>.btn-group:after,.btn-toolbar:after,.clearfix:after,.container-fluid:after,.container:after,.dl-horizontal dd:after,.form-horizontal .form-group:after,.item_buttons:after,.modal-footer:after,.nav:after,.navbar-collapse:after,.navbar-header:after,.navbar:after,.pager:after,.panel-body:after,.row:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}.pull-right{float:right!important}.pull-left{float:left!important}.hide{display:none!important}.show{display:block!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.hidden{display:none!important}.affix{position:fixed}@-ms-viewport{width:device-width}.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,.visible-md-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,.visible-xs-inline,.visible-xs-inline-block{display:none!important}@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table}tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}.visible-xs-block{display:block!important}.visible-xs-inline{display:inline!important}.visible-xs-inline-block{display:inline-block!important}}@media (min-width:768px)and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table}tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}.visible-sm-block{display:block!important}.visible-sm-inline{display:inline!important}.visible-sm-inline-block{display:inline-block!important}}@media (min-width:992px)and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table}tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}.visible-md-block{display:block!important}.visible-md-inline{display:inline!important}.visible-md-inline-block{display:inline-block!important}}@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table}tr.visible-lg{display:table-row!important}td.visible-lg,th.visible-lg{display:table-cell!important}.visible-lg-block{display:block!important}.visible-lg-inline{display:inline!important}.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}@media (min-width:768px)and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px)and (max-width:1199px){.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}@media print{.visible-print{display:block!important}table.visible-print{display:table}tr.visible-print{display:table-row!important}td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}@media print{.visible-print-inline-block{display:inline-block!important}.hidden-print{display:none!important}}/*!
		*
		* Font Awesome
		*
		*//*!
		*  Font Awesome 4.2.0 by @davegandy - http://fontawesome.io - @fontawesome
		*  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
		*/@font-face{font-family:'FontAwesome';src:url(../components/font-awesome/fonts/fontawesome-webfont.eot?v=4.2.0);src:url(../components/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.2.0)format('embedded-opentype'),url(../components/font-awesome/fonts/fontawesome-webfont.woff?v=4.2.0)format('woff'),url(../components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.2.0)format('truetype'),url(../components/font-awesome/fonts/fontawesome-webfont.svg?v=4.2.0#fontawesomeregular)format('svg');font-weight:400;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);-webkit-transform:scale(-1,1);-ms-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);-webkit-transform:scale(1,-1);-ms-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\f000"}.fa-music:before{content:"\f001"}.fa-search:before{content:"\f002"}.fa-envelope-o:before{content:"\f003"}.fa-heart:before{content:"\f004"}.fa-star:before{content:"\f005"}.fa-star-o:before{content:"\f006"}.fa-user:before{content:"\f007"}.fa-film:before{content:"\f008"}.fa-th-large:before{content:"\f009"}.fa-th:before{content:"\f00a"}.fa-th-list:before{content:"\f00b"}.fa-check:before{content:"\f00c"}.fa-close:before,.fa-remove:before,.fa-times:before{content:"\f00d"}.fa-search-plus:before{content:"\f00e"}.fa-search-minus:before{content:"\f010"}.fa-power-off:before{content:"\f011"}.fa-signal:before{content:"\f012"}.fa-cog:before,.fa-gear:before{content:"\f013"}.fa-trash-o:before{content:"\f014"}.fa-home:before{content:"\f015"}.fa-file-o:before{content:"\f016"}.fa-clock-o:before{content:"\f017"}.fa-road:before{content:"\f018"}.fa-download:before{content:"\f019"}.fa-arrow-circle-o-down:before{content:"\f01a"}.fa-arrow-circle-o-up:before{content:"\f01b"}.fa-inbox:before{content:"\f01c"}.fa-play-circle-o:before{content:"\f01d"}.fa-repeat:before,.fa-rotate-right:before{content:"\f01e"}.fa-refresh:before{content:"\f021"}.fa-list-alt:before{content:"\f022"}.fa-lock:before{content:"\f023"}.fa-flag:before{content:"\f024"}.fa-headphones:before{content:"\f025"}.fa-volume-off:before{content:"\f026"}.fa-volume-down:before{content:"\f027"}.fa-volume-up:before{content:"\f028"}.fa-qrcode:before{content:"\f029"}.fa-barcode:before{content:"\f02a"}.fa-tag:before{content:"\f02b"}.fa-tags:before{content:"\f02c"}.fa-book:before{content:"\f02d"}.fa-bookmark:before{content:"\f02e"}.fa-print:before{content:"\f02f"}.fa-camera:before{content:"\f030"}.fa-font:before{content:"\f031"}.fa-bold:before{content:"\f032"}.fa-italic:before{content:"\f033"}.fa-text-height:before{content:"\f034"}.fa-text-width:before{content:"\f035"}.fa-align-left:before{content:"\f036"}.fa-align-center:before{content:"\f037"}.fa-align-right:before{content:"\f038"}.fa-align-justify:before{content:"\f039"}.fa-list:before{content:"\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\f03b"}.fa-indent:before{content:"\f03c"}.fa-video-camera:before{content:"\f03d"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:"\f03e"}.fa-pencil:before{content:"\f040"}.fa-map-marker:before{content:"\f041"}.fa-adjust:before{content:"\f042"}.fa-tint:before{content:"\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\f044"}.fa-share-square-o:before{content:"\f045"}.fa-check-square-o:before{content:"\f046"}.fa-arrows:before{content:"\f047"}.fa-step-backward:before{content:"\f048"}.fa-fast-backward:before{content:"\f049"}.fa-backward:before{content:"\f04a"}.fa-play:before{content:"\f04b"}.fa-pause:before{content:"\f04c"}.fa-stop:before{content:"\f04d"}.fa-forward:before{content:"\f04e"}.fa-fast-forward:before{content:"\f050"}.fa-step-forward:before{content:"\f051"}.fa-eject:before{content:"\f052"}.fa-chevron-left:before{content:"\f053"}.fa-chevron-right:before{content:"\f054"}.fa-plus-circle:before{content:"\f055"}.fa-minus-circle:before{content:"\f056"}.fa-times-circle:before{content:"\f057"}.fa-check-circle:before{content:"\f058"}.fa-question-circle:before{content:"\f059"}.fa-info-circle:before{content:"\f05a"}.fa-crosshairs:before{content:"\f05b"}.fa-times-circle-o:before{content:"\f05c"}.fa-check-circle-o:before{content:"\f05d"}.fa-ban:before{content:"\f05e"}.fa-arrow-left:before{content:"\f060"}.fa-arrow-right:before{content:"\f061"}.fa-arrow-up:before{content:"\f062"}.fa-arrow-down:before{content:"\f063"}.fa-mail-forward:before,.fa-share:before{content:"\f064"}.fa-expand:before{content:"\f065"}.fa-compress:before{content:"\f066"}.fa-plus:before{content:"\f067"}.fa-minus:before{content:"\f068"}.fa-asterisk:before{content:"\f069"}.fa-exclamation-circle:before{content:"\f06a"}.fa-gift:before{content:"\f06b"}.fa-leaf:before{content:"\f06c"}.fa-fire:before{content:"\f06d"}.fa-eye:before{content:"\f06e"}.fa-eye-slash:before{content:"\f070"}.fa-exclamation-triangle:before,.fa-warning:before{content:"\f071"}.fa-plane:before{content:"\f072"}.fa-calendar:before{content:"\f073"}.fa-random:before{content:"\f074"}.fa-comment:before{content:"\f075"}.fa-magnet:before{content:"\f076"}.fa-chevron-up:before{content:"\f077"}.fa-chevron-down:before{content:"\f078"}.fa-retweet:before{content:"\f079"}.fa-shopping-cart:before{content:"\f07a"}.fa-folder:before{content:"\f07b"}.fa-folder-open:before{content:"\f07c"}.fa-arrows-v:before{content:"\f07d"}.fa-arrows-h:before{content:"\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\f080"}.fa-twitter-square:before{content:"\f081"}.fa-facebook-square:before{content:"\f082"}.fa-camera-retro:before{content:"\f083"}.fa-key:before{content:"\f084"}.fa-cogs:before,.fa-gears:before{content:"\f085"}.fa-comments:before{content:"\f086"}.fa-thumbs-o-up:before{content:"\f087"}.fa-thumbs-o-down:before{content:"\f088"}.fa-star-half:before{content:"\f089"}.fa-heart-o:before{content:"\f08a"}.fa-sign-out:before{content:"\f08b"}.fa-linkedin-square:before{content:"\f08c"}.fa-thumb-tack:before{content:"\f08d"}.fa-external-link:before{content:"\f08e"}.fa-sign-in:before{content:"\f090"}.fa-trophy:before{content:"\f091"}.fa-github-square:before{content:"\f092"}.fa-upload:before{content:"\f093"}.fa-lemon-o:before{content:"\f094"}.fa-phone:before{content:"\f095"}.fa-square-o:before{content:"\f096"}.fa-bookmark-o:before{content:"\f097"}.fa-phone-square:before{content:"\f098"}.fa-twitter:before{content:"\f099"}.fa-facebook:before{content:"\f09a"}.fa-github:before{content:"\f09b"}.fa-unlock:before{content:"\f09c"}.fa-credit-card:before{content:"\f09d"}.fa-rss:before{content:"\f09e"}.fa-hdd-o:before{content:"\f0a0"}.fa-bullhorn:before{content:"\f0a1"}.fa-bell:before{content:"\f0f3"}.fa-certificate:before{content:"\f0a3"}.fa-hand-o-right:before{content:"\f0a4"}.fa-hand-o-left:before{content:"\f0a5"}.fa-hand-o-up:before{content:"\f0a6"}.fa-hand-o-down:before{content:"\f0a7"}.fa-arrow-circle-left:before{content:"\f0a8"}.fa-arrow-circle-right:before{content:"\f0a9"}.fa-arrow-circle-up:before{content:"\f0aa"}.fa-arrow-circle-down:before{content:"\f0ab"}.fa-globe:before{content:"\f0ac"}.fa-wrench:before{content:"\f0ad"}.fa-tasks:before{content:"\f0ae"}.fa-filter:before{content:"\f0b0"}.fa-briefcase:before{content:"\f0b1"}.fa-arrows-alt:before{content:"\f0b2"}.fa-group:before,.fa-users:before{content:"\f0c0"}.fa-chain:before,.fa-link:before{content:"\f0c1"}.fa-cloud:before{content:"\f0c2"}.fa-flask:before{content:"\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\f0c5"}.fa-paperclip:before{content:"\f0c6"}.fa-floppy-o:before,.fa-save:before{content:"\f0c7"}.fa-square:before{content:"\f0c8"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:"\f0c9"}.fa-list-ul:before{content:"\f0ca"}.fa-list-ol:before{content:"\f0cb"}.fa-strikethrough:before{content:"\f0cc"}.fa-underline:before{content:"\f0cd"}.fa-table:before{content:"\f0ce"}.fa-magic:before{content:"\f0d0"}.fa-truck:before{content:"\f0d1"}.fa-pinterest:before{content:"\f0d2"}.fa-pinterest-square:before{content:"\f0d3"}.fa-google-plus-square:before{content:"\f0d4"}.fa-google-plus:before{content:"\f0d5"}.fa-money:before{content:"\f0d6"}.fa-caret-down:before{content:"\f0d7"}.fa-caret-up:before{content:"\f0d8"}.fa-caret-left:before{content:"\f0d9"}.fa-caret-right:before{content:"\f0da"}.fa-columns:before{content:"\f0db"}.fa-sort:before,.fa-unsorted:before{content:"\f0dc"}.fa-sort-desc:before,.fa-sort-down:before{content:"\f0dd"}.fa-sort-asc:before,.fa-sort-up:before{content:"\f0de"}.fa-envelope:before{content:"\f0e0"}.fa-linkedin:before{content:"\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\f0e2"}.fa-gavel:before,.fa-legal:before{content:"\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\f0e4"}.fa-comment-o:before{content:"\f0e5"}.fa-comments-o:before{content:"\f0e6"}.fa-bolt:before,.fa-flash:before{content:"\f0e7"}.fa-sitemap:before{content:"\f0e8"}.fa-umbrella:before{content:"\f0e9"}.fa-clipboard:before,.fa-paste:before{content:"\f0ea"}.fa-lightbulb-o:before{content:"\f0eb"}.fa-exchange:before{content:"\f0ec"}.fa-cloud-download:before{content:"\f0ed"}.fa-cloud-upload:before{content:"\f0ee"}.fa-user-md:before{content:"\f0f0"}.fa-stethoscope:before{content:"\f0f1"}.fa-suitcase:before{content:"\f0f2"}.fa-bell-o:before{content:"\f0a2"}.fa-coffee:before{content:"\f0f4"}.fa-cutlery:before{content:"\f0f5"}.fa-file-text-o:before{content:"\f0f6"}.fa-building-o:before{content:"\f0f7"}.fa-hospital-o:before{content:"\f0f8"}.fa-ambulance:before{content:"\f0f9"}.fa-medkit:before{content:"\f0fa"}.fa-fighter-jet:before{content:"\f0fb"}.fa-beer:before{content:"\f0fc"}.fa-h-square:before{content:"\f0fd"}.fa-plus-square:before{content:"\f0fe"}.fa-angle-double-left:before{content:"\f100"}.fa-angle-double-right:before{content:"\f101"}.fa-angle-double-up:before{content:"\f102"}.fa-angle-double-down:before{content:"\f103"}.fa-angle-left:before{content:"\f104"}.fa-angle-right:before{content:"\f105"}.fa-angle-up:before{content:"\f106"}.fa-angle-down:before{content:"\f107"}.fa-desktop:before{content:"\f108"}.fa-laptop:before{content:"\f109"}.fa-tablet:before{content:"\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\f10b"}.fa-circle-o:before{content:"\f10c"}.fa-quote-left:before{content:"\f10d"}.fa-quote-right:before{content:"\f10e"}.fa-spinner:before{content:"\f110"}.fa-circle:before{content:"\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\f112"}.fa-github-alt:before{content:"\f113"}.fa-folder-o:before{content:"\f114"}.fa-folder-open-o:before{content:"\f115"}.fa-smile-o:before{content:"\f118"}.fa-frown-o:before{content:"\f119"}.fa-meh-o:before{content:"\f11a"}.fa-gamepad:before{content:"\f11b"}.fa-keyboard-o:before{content:"\f11c"}.fa-flag-o:before{content:"\f11d"}.fa-flag-checkered:before{content:"\f11e"}.fa-terminal:before{content:"\f120"}.fa-code:before{content:"\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\f123"}.fa-location-arrow:before{content:"\f124"}.fa-crop:before{content:"\f125"}.fa-code-fork:before{content:"\f126"}.fa-chain-broken:before,.fa-unlink:before{content:"\f127"}.fa-question:before{content:"\f128"}.fa-info:before{content:"\f129"}.fa-exclamation:before{content:"\f12a"}.fa-superscript:before{content:"\f12b"}.fa-subscript:before{content:"\f12c"}.fa-eraser:before{content:"\f12d"}.fa-puzzle-piece:before{content:"\f12e"}.fa-microphone:before{content:"\f130"}.fa-microphone-slash:before{content:"\f131"}.fa-shield:before{content:"\f132"}.fa-calendar-o:before{content:"\f133"}.fa-fire-extinguisher:before{content:"\f134"}.fa-rocket:before{content:"\f135"}.fa-maxcdn:before{content:"\f136"}.fa-chevron-circle-left:before{content:"\f137"}.fa-chevron-circle-right:before{content:"\f138"}.fa-chevron-circle-up:before{content:"\f139"}.fa-chevron-circle-down:before{content:"\f13a"}.fa-html5:before{content:"\f13b"}.fa-css3:before{content:"\f13c"}.fa-anchor:before{content:"\f13d"}.fa-unlock-alt:before{content:"\f13e"}.fa-bullseye:before{content:"\f140"}.fa-ellipsis-h:before{content:"\f141"}.fa-ellipsis-v:before{content:"\f142"}.fa-rss-square:before{content:"\f143"}.fa-play-circle:before{content:"\f144"}.fa-ticket:before{content:"\f145"}.fa-minus-square:before{content:"\f146"}.fa-minus-square-o:before{content:"\f147"}.fa-level-up:before{content:"\f148"}.fa-level-down:before{content:"\f149"}.fa-check-square:before{content:"\f14a"}.fa-pencil-square:before{content:"\f14b"}.fa-external-link-square:before{content:"\f14c"}.fa-share-square:before{content:"\f14d"}.fa-compass:before{content:"\f14e"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:"\f150"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:"\f151"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:"\f152"}.fa-eur:before,.fa-euro:before{content:"\f153"}.fa-gbp:before{content:"\f154"}.fa-dollar:before,.fa-usd:before{content:"\f155"}.fa-inr:before,.fa-rupee:before{content:"\f156"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:"\f157"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:"\f158"}.fa-krw:before,.fa-won:before{content:"\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\f15a"}.fa-file:before{content:"\f15b"}.fa-file-text:before{content:"\f15c"}.fa-sort-alpha-asc:before{content:"\f15d"}.fa-sort-alpha-desc:before{content:"\f15e"}.fa-sort-amount-asc:before{content:"\f160"}.fa-sort-amount-desc:before{content:"\f161"}.fa-sort-numeric-asc:before{content:"\f162"}.fa-sort-numeric-desc:before{content:"\f163"}.fa-thumbs-up:before{content:"\f164"}.fa-thumbs-down:before{content:"\f165"}.fa-youtube-square:before{content:"\f166"}.fa-youtube:before{content:"\f167"}.fa-xing:before{content:"\f168"}.fa-xing-square:before{content:"\f169"}.fa-youtube-play:before{content:"\f16a"}.fa-dropbox:before{content:"\f16b"}.fa-stack-overflow:before{content:"\f16c"}.fa-instagram:before{content:"\f16d"}.fa-flickr:before{content:"\f16e"}.fa-adn:before{content:"\f170"}.fa-bitbucket:before{content:"\f171"}.fa-bitbucket-square:before{content:"\f172"}.fa-tumblr:before{content:"\f173"}.fa-tumblr-square:before{content:"\f174"}.fa-long-arrow-down:before{content:"\f175"}.fa-long-arrow-up:before{content:"\f176"}.fa-long-arrow-left:before{content:"\f177"}.fa-long-arrow-right:before{content:"\f178"}.fa-apple:before{content:"\f179"}.fa-windows:before{content:"\f17a"}.fa-android:before{content:"\f17b"}.fa-linux:before{content:"\f17c"}.fa-dribbble:before{content:"\f17d"}.fa-skype:before{content:"\f17e"}.fa-foursquare:before{content:"\f180"}.fa-trello:before{content:"\f181"}.fa-female:before{content:"\f182"}.fa-male:before{content:"\f183"}.fa-gittip:before{content:"\f184"}.fa-sun-o:before{content:"\f185"}.fa-moon-o:before{content:"\f186"}.fa-archive:before{content:"\f187"}.fa-bug:before{content:"\f188"}.fa-vk:before{content:"\f189"}.fa-weibo:before{content:"\f18a"}.fa-renren:before{content:"\f18b"}.fa-pagelines:before{content:"\f18c"}.fa-stack-exchange:before{content:"\f18d"}.fa-arrow-circle-o-right:before{content:"\f18e"}.fa-arrow-circle-o-left:before{content:"\f190"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:"\f191"}.fa-dot-circle-o:before{content:"\f192"}.fa-wheelchair:before{content:"\f193"}.fa-vimeo-square:before{content:"\f194"}.fa-try:before,.fa-turkish-lira:before{content:"\f195"}.fa-plus-square-o:before{content:"\f196"}.fa-space-shuttle:before{content:"\f197"}.fa-slack:before{content:"\f198"}.fa-envelope-square:before{content:"\f199"}.fa-wordpress:before{content:"\f19a"}.fa-openid:before{content:"\f19b"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:"\f19c"}.fa-graduation-cap:before,.fa-mortar-board:before{content:"\f19d"}.fa-yahoo:before{content:"\f19e"}.fa-google:before{content:"\f1a0"}.fa-reddit:before{content:"\f1a1"}.fa-reddit-square:before{content:"\f1a2"}.fa-stumbleupon-circle:before{content:"\f1a3"}.fa-stumbleupon:before{content:"\f1a4"}.fa-delicious:before{content:"\f1a5"}.fa-digg:before{content:"\f1a6"}.fa-pied-piper:before{content:"\f1a7"}.fa-pied-piper-alt:before{content:"\f1a8"}.fa-drupal:before{content:"\f1a9"}.fa-joomla:before{content:"\f1aa"}.fa-language:before{content:"\f1ab"}.fa-fax:before{content:"\f1ac"}.fa-building:before{content:"\f1ad"}.fa-child:before{content:"\f1ae"}.fa-paw:before{content:"\f1b0"}.fa-spoon:before{content:"\f1b1"}.fa-cube:before{content:"\f1b2"}.fa-cubes:before{content:"\f1b3"}.fa-behance:before{content:"\f1b4"}.fa-behance-square:before{content:"\f1b5"}.fa-steam:before{content:"\f1b6"}.fa-steam-square:before{content:"\f1b7"}.fa-recycle:before{content:"\f1b8"}.fa-automobile:before,.fa-car:before{content:"\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\f1ba"}.fa-tree:before{content:"\f1bb"}.fa-spotify:before{content:"\f1bc"}.fa-deviantart:before{content:"\f1bd"}.fa-soundcloud:before{content:"\f1be"}.fa-database:before{content:"\f1c0"}.fa-file-pdf-o:before{content:"\f1c1"}.fa-file-word-o:before{content:"\f1c2"}.fa-file-excel-o:before{content:"\f1c3"}.fa-file-powerpoint-o:before{content:"\f1c4"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:"\f1c5"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:"\f1c6"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:"\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\f1c8"}.fa-file-code-o:before{content:"\f1c9"}.fa-vine:before{content:"\f1ca"}.fa-codepen:before{content:"\f1cb"}.fa-jsfiddle:before{content:"\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:"\f1cd"}.fa-circle-o-notch:before{content:"\f1ce"}.fa-ra:before,.fa-rebel:before{content:"\f1d0"}.fa-empire:before,.fa-ge:before{content:"\f1d1"}.fa-git-square:before{content:"\f1d2"}.fa-git:before{content:"\f1d3"}.fa-hacker-news:before{content:"\f1d4"}.fa-tencent-weibo:before{content:"\f1d5"}.fa-qq:before{content:"\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\f1d7"}.fa-paper-plane:before,.fa-send:before{content:"\f1d8"}.fa-paper-plane-o:before,.fa-send-o:before{content:"\f1d9"}.fa-history:before{content:"\f1da"}.fa-circle-thin:before{content:"\f1db"}.fa-header:before{content:"\f1dc"}.fa-paragraph:before{content:"\f1dd"}.fa-sliders:before{content:"\f1de"}.fa-share-alt:before{content:"\f1e0"}.fa-share-alt-square:before{content:"\f1e1"}.fa-bomb:before{content:"\f1e2"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:"\f1e3"}.fa-tty:before{content:"\f1e4"}.fa-binoculars:before{content:"\f1e5"}.fa-plug:before{content:"\f1e6"}.fa-slideshare:before{content:"\f1e7"}.fa-twitch:before{content:"\f1e8"}.fa-yelp:before{content:"\f1e9"}.fa-newspaper-o:before{content:"\f1ea"}.fa-wifi:before{content:"\f1eb"}.fa-calculator:before{content:"\f1ec"}.fa-paypal:before{content:"\f1ed"}.fa-google-wallet:before{content:"\f1ee"}.fa-cc-visa:before{content:"\f1f0"}.fa-cc-mastercard:before{content:"\f1f1"}.fa-cc-discover:before{content:"\f1f2"}.fa-cc-amex:before{content:"\f1f3"}.fa-cc-paypal:before{content:"\f1f4"}.fa-cc-stripe:before{content:"\f1f5"}.fa-bell-slash:before{content:"\f1f6"}.fa-bell-slash-o:before{content:"\f1f7"}.fa-trash:before{content:"\f1f8"}.fa-copyright:before{content:"\f1f9"}.fa-at:before{content:"\f1fa"}.fa-eyedropper:before{content:"\f1fb"}.fa-paint-brush:before{content:"\f1fc"}.fa-birthday-cake:before{content:"\f1fd"}.fa-area-chart:before{content:"\f1fe"}.fa-pie-chart:before{content:"\f200"}.fa-line-chart:before{content:"\f201"}.fa-lastfm:before{content:"\f202"}.fa-lastfm-square:before{content:"\f203"}.fa-toggle-off:before{content:"\f204"}.fa-toggle-on:before{content:"\f205"}.fa-bicycle:before{content:"\f206"}.fa-bus:before{content:"\f207"}.fa-ioxhost:before{content:"\f208"}.fa-angellist:before{content:"\f209"}.fa-cc:before{content:"\f20a"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:"\f20b"}.fa-meanpath:before{content:"\f20c"}/*!
		*
		* IPython base
		*
		*/.modal.fade .modal-dialog{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)}code{color:#000}pre{font-size:inherit;line-height:inherit}label{font-weight:400}.border-box-sizing{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.corner-all{border-radius:2px}.no-padding{padding:0}.hbox{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}.hbox>*{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none}.vbox{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}.vbox>*{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none}.hbox.reverse,.reverse,.vbox.reverse{-webkit-box-direction:reverse;-moz-box-direction:reverse;box-direction:reverse;flex-direction:row-reverse}.box-flex0,.hbox.box-flex0,.vbox.box-flex0{-webkit-box-flex:0;-moz-box-flex:0;box-flex:0;flex:none;width:auto}.box-flex1,.hbox.box-flex1,.vbox.box-flex1{-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}.box-flex,.hbox.box-flex,.vbox.box-flex{-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}.box-flex2,.hbox.box-flex2,.vbox.box-flex2{-webkit-box-flex:2;-moz-box-flex:2;box-flex:2;flex:2}.box-group1{-webkit-box-flex-group:1;-moz-box-flex-group:1;box-flex-group:1}.box-group2{-webkit-box-flex-group:2;-moz-box-flex-group:2;box-flex-group:2}.hbox.start,.start,.vbox.start{-webkit-box-pack:start;-moz-box-pack:start;box-pack:start;justify-content:flex-start}.end,.hbox.end,.vbox.end{-webkit-box-pack:end;-moz-box-pack:end;box-pack:end;justify-content:flex-end}.center,.hbox.center,.vbox.center{-webkit-box-pack:center;-moz-box-pack:center;box-pack:center;justify-content:center}.baseline,.hbox.baseline,.vbox.baseline{-webkit-box-pack:baseline;-moz-box-pack:baseline;box-pack:baseline;justify-content:baseline}.hbox.stretch,.stretch,.vbox.stretch{-webkit-box-pack:stretch;-moz-box-pack:stretch;box-pack:stretch;justify-content:stretch}.align-start,.hbox.align-start,.vbox.align-start{-webkit-box-align:start;-moz-box-align:start;box-align:start;align-items:flex-start}.align-end,.hbox.align-end,.vbox.align-end{-webkit-box-align:end;-moz-box-align:end;box-align:end;align-items:flex-end}.align-center,.hbox.align-center,.vbox.align-center{-webkit-box-align:center;-moz-box-align:center;box-align:center;align-items:center}.align-baseline,.hbox.align-baseline,.vbox.align-baseline{-webkit-box-align:baseline;-moz-box-align:baseline;box-align:baseline;align-items:baseline}.align-stretch,.hbox.align-stretch,.vbox.align-stretch{-webkit-box-align:stretch;-moz-box-align:stretch;box-align:stretch;align-items:stretch}div.error{margin:2em;text-align:center}div.error>h1{font-size:500%;line-height:normal}div.error>p{font-size:200%;line-height:normal}div.traceback-wrapper{text-align:left;max-width:800px;margin:auto}body{position:absolute;left:0;right:0;top:0;bottom:0;overflow:visible}#header{display:none;background-color:#fff;position:relative;z-index:100}#header #header-container{padding-bottom:5px;padding-top:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}#header .header-bar{width:100%;height:1px;background:#e7e7e7;margin-bottom:-1px}#header-spacer{width:100%;visibility:hidden}@media print{#header{display:none!important}#header-spacer{display:none}}#ipython_notebook{padding-left:0;padding-top:1px;padding-bottom:1px}@media (max-width:991px){#ipython_notebook{margin-left:10px}}#noscript{width:auto;padding-top:16px;padding-bottom:16px;text-align:center;font-size:22px;color:red;font-weight:700}#ipython_notebook img{height:28px}#site{width:100%;display:none;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;overflow:auto}@media print{#site{height:auto!important}}.ui-button .ui-button-text{padding:.2em .8em;font-size:77%}input.ui-button{padding:.3em .9em}span#login_widget{float:right}#logout,span#login_widget>.button{color:#333;background-color:#fff;border-color:#ccc}#logout.active,#logout.focus,#logout:active,#logout:focus,#logout:hover,.open>.dropdown-toggle#logout,.open>.dropdown-togglespan#login_widget>.button,span#login_widget>.button.active,span#login_widget>.button.focus,span#login_widget>.button:active,span#login_widget>.button:focus,span#login_widget>.button:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}#logout.active,#logout:active,.open>.dropdown-toggle#logout,.open>.dropdown-togglespan#login_widget>.button,span#login_widget>.button.active,span#login_widget>.button:active{background-image:none}#logout.disabled,#logout.disabled.active,#logout.disabled.focus,#logout.disabled:active,#logout.disabled:focus,#logout.disabled:hover,#logout[disabled],#logout[disabled].active,#logout[disabled].focus,#logout[disabled]:active,#logout[disabled]:focus,#logout[disabled]:hover,fieldset[disabled] #logout,fieldset[disabled] #logout.active,fieldset[disabled] #logout.focus,fieldset[disabled] #logout:active,fieldset[disabled] #logout:focus,fieldset[disabled] #logout:hover,fieldset[disabled] span#login_widget>.button,fieldset[disabled] span#login_widget>.button.active,fieldset[disabled] span#login_widget>.button.focus,fieldset[disabled] span#login_widget>.button:active,fieldset[disabled] span#login_widget>.button:focus,fieldset[disabled] span#login_widget>.button:hover,span#login_widget>.button.disabled,span#login_widget>.button.disabled.active,span#login_widget>.button.disabled.focus,span#login_widget>.button.disabled:active,span#login_widget>.button.disabled:focus,span#login_widget>.button.disabled:hover,span#login_widget>.button[disabled],span#login_widget>.button[disabled].active,span#login_widget>.button[disabled].focus,span#login_widget>.button[disabled]:active,span#login_widget>.button[disabled]:focus,span#login_widget>.button[disabled]:hover{background-color:#fff;border-color:#ccc}#logout .badge,span#login_widget>.button .badge{color:#fff;background-color:#333}.nav-header{text-transform:none}#header>span{margin-top:10px}.modal_stretch .modal-dialog{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;min-height:80vh}.modal_stretch .modal-dialog .modal-body{max-height:calc(100vh - 200px);overflow:auto;flex:1}@media (min-width:768px){.modal .modal-dialog{width:700px}select.form-control{margin-left:12px;margin-right:12px}}/*!
		*
		* IPython auth
		*
		*/.center-nav{display:inline-block;margin-bottom:-4px}/*!
		*
		* IPython tree view
		*
		*/.alternate_upload{background-color:none;display:inline}.alternate_upload.form{padding:0;margin:0}.alternate_upload input.fileinput{text-align:center;vertical-align:middle;display:inline;opacity:0;z-index:2;width:12ex;margin-right:-12ex}.alternate_upload .btn-upload{height:22px}ul#tabs{margin-bottom:4px}ul#tabs a{padding-top:6px;padding-bottom:4px}ul.breadcrumb a:focus,ul.breadcrumb a:hover{text-decoration:none}ul.breadcrumb i.icon-home{font-size:16px;margin-right:4px}ul.breadcrumb span{color:#5e5e5e}.list_toolbar{padding:4px 0;vertical-align:middle}.list_toolbar .tree-buttons{padding-top:1px}.dynamic-buttons{padding-top:3px;display:inline-block}.list_toolbar [class*=span]{min-height:24px}.list_header{font-weight:700;background-color:#eee}.list_placeholder{font-weight:700;padding:4px 7px}.list_container{margin-top:4px;margin-bottom:20px;border:1px solid #ddd;border-radius:2px}.list_container>div{border-bottom:1px solid #ddd}.list_container>div:hover .list-item{background-color:red}.list_container>div:last-child{border:none}.list_item:hover .list_item{background-color:#ddd}.list_item a{text-decoration:none}.list_item:hover{background-color:#fafafa}.action_col{text-align:right}.list_header>div,.list_item>div{line-height:22px;padding:4px 7px}.list_header>div input,.list_item>div input{margin-right:7px;margin-left:14px;vertical-align:baseline;line-height:22px;position:relative;top:-1px}.list_header>div .item_link,.list_item>div .item_link{margin-left:-1px;vertical-align:baseline;line-height:22px}.new-file input[type=checkbox]{visibility:hidden}.item_name{line-height:22px;height:24px}.item_icon{font-size:14px;color:#5e5e5e;margin-right:7px;margin-left:7px;line-height:22px;vertical-align:baseline}.item_buttons{line-height:1em;margin-left:-5px}.item_buttons .btn-group,.item_buttons .input-group{float:left}.item_buttons>.btn,.item_buttons>.btn-group,.item_buttons>.input-group{margin-left:5px}.item_buttons .btn{min-width:13ex}.item_buttons .running-indicator{padding-top:4px;color:#5cb85c}.toolbar_info{height:24px;line-height:24px}input.engine_num_input,input.nbname_input{padding-top:3px;padding-bottom:3px;height:22px;line-height:14px;margin:0}input.engine_num_input{width:60px}.highlight_text{color:#00f}#project_name{display:inline-block;padding-left:7px;margin-left:-2px}#project_name>.breadcrumb{padding:0;margin-bottom:0;background-color:transparent;font-weight:700}#tree-selector{padding-right:0}#button-select-all{min-width:50px}#select-all{margin-left:7px;margin-right:2px}.menu_icon{margin-right:2px}.tab-content .row{margin-left:0;margin-right:0}.folder_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f114"}.folder_icon:before.pull-left{margin-right:.3em}.folder_icon:before.pull-right{margin-left:.3em}.notebook_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f02d";position:relative;top:-1px}.notebook_icon:before.pull-left{margin-right:.3em}.notebook_icon:before.pull-right{margin-left:.3em}.running_notebook_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f02d";position:relative;top:-1px;color:#5cb85c}.running_notebook_icon:before.pull-left{margin-right:.3em}.running_notebook_icon:before.pull-right{margin-left:.3em}.file_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f016";position:relative;top:-2px}.file_icon:before.pull-left{margin-right:.3em}.file_icon:before.pull-right{margin-left:.3em}#notebook_toolbar .pull-right{padding-top:0;margin-right:-1px}ul#new-menu{left:auto;right:0}.kernel-menu-icon{padding-right:12px;width:24px;content:"\f096"}.kernel-menu-icon:before{content:"\f096"}.kernel-menu-icon-current:before{content:"\f00c"}#tab_content{padding-top:20px}#running .panel-group .panel{margin-top:3px;margin-bottom:1em}#running .panel-group .panel .panel-heading{background-color:#eee;line-height:22px;padding:4px 7px}#running .panel-group .panel .panel-heading a:focus,#running .panel-group .panel .panel-heading a:hover{text-decoration:none}#running .panel-group .panel .panel-body{padding:0}#running .panel-group .panel .panel-body .list_container{margin-top:0;margin-bottom:0;border:0;border-radius:0}#running .panel-group .panel .panel-body .list_container .list_item{border-bottom:1px solid #ddd}#running .panel-group .panel .panel-body .list_container .list_item:last-child{border-bottom:0}.delete-button,.duplicate-button,.rename-button,.shutdown-button{display:none}.dynamic-instructions{display:inline-block;padding-top:4px}/*!
		*
		* IPython text editor webapp
		*
		*/.selected-keymap i.fa{padding:0 5px}.selected-keymap i.fa:before{content:"\f00c"}#mode-menu{overflow:auto;max-height:20em}.edit_app #header{-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}.edit_app #menubar .navbar{margin-bottom:-1px}.dirty-indicator{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator.pull-left{margin-right:.3em}.dirty-indicator.pull-right{margin-left:.3em}.dirty-indicator-dirty{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator-dirty.pull-left{margin-right:.3em}.dirty-indicator-dirty.pull-right{margin-left:.3em}.dirty-indicator-clean{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;width:20px}.dirty-indicator-clean.pull-left{margin-right:.3em}.dirty-indicator-clean.pull-right{margin-left:.3em}.dirty-indicator-clean:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f00c"}.dirty-indicator-clean:before.pull-left{margin-right:.3em}.dirty-indicator-clean:before.pull-right{margin-left:.3em}#filename{font-size:16pt;display:table;padding:0 5px}#current-mode{padding-left:5px;padding-right:5px}#texteditor-backdrop{padding-top:20px;padding-bottom:20px}@media not print{#texteditor-backdrop{background-color:#eee}}@media print{#texteditor-backdrop #texteditor-container .CodeMirror-gutter,#texteditor-backdrop #texteditor-container .CodeMirror-gutters{background-color:#fff}}@media not print{#texteditor-backdrop #texteditor-container .CodeMirror-gutter,#texteditor-backdrop #texteditor-container .CodeMirror-gutters{background-color:#fff}#texteditor-backdrop #texteditor-container{padding:0;background-color:#fff;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}}/*!
		*
		* IPython notebook
		*
		*/.ansibold{font-weight:700}.ansiblack{color:#000}.ansired{color:#8b0000}.ansigreen{color:#006400}.ansiyellow{color:#c4a000}.ansiblue{color:#00008b}.ansipurple{color:#9400d3}.ansicyan{color:#4682b4}.ansigray{color:gray}.ansibgblack{background-color:#000}.ansibgred{background-color:red}.ansibggreen{background-color:green}.ansibgyellow{background-color:#ff0}.ansibgblue{background-color:#00f}.ansibgpurple{background-color:#ff00ff}.ansibgcyan{background-color:#0ff}.ansibggray{background-color:gray}div.cell{border:1px solid transparent;display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;border-radius:2px;box-sizing:border-box;-moz-box-sizing:border-box;border-width:thin;border-style:solid;width:100%;padding:5px;margin:0;outline:0}div.cell.selected{border-color:#ababab}@media print{div.cell.selected{border-color:transparent}}.edit_mode div.cell.selected{border-color:green}.prompt{min-width:14ex;padding:.4em;margin:0;font-family:monospace;text-align:right;line-height:1.21429em}div.inner_cell{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}@-moz-document url-prefix(){div.inner_cell{overflow-x:hidden}}div.input_area{border:1px solid #cfcfcf;border-radius:2px;background:#f7f7f7;line-height:1.21429em}div.prompt:empty{padding-top:0;padding-bottom:0}div.unrecognized_cell{padding:5px 5px 5px 0;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}div.unrecognized_cell .inner_cell{border-radius:2px;padding:5px;font-weight:700;color:red;border:1px solid #cfcfcf;background:#eaeaea}div.unrecognized_cell .inner_cell a,div.unrecognized_cell .inner_cell a:hover{color:inherit;text-decoration:none}@media (max-width:540px){.prompt{text-align:left}div.unrecognized_cell>div.prompt{display:none}}div.code_cell{}div.input{page-break-inside:avoid;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}@media (max-width:540px){div.input{-webkit-box-orient:vertical;-moz-box-orient:vertical;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}}div.input_prompt{color:navy;border-top:1px solid transparent}div.input_area>div.highlight{margin:.4em;border:none;padding:0;background-color:transparent}div.input_area>div.highlight>pre{margin:0;border:none;padding:0;background-color:transparent}.CodeMirror{line-height:1.21429em;font-size:14px;height:auto;background:0 0}.CodeMirror-scroll{overflow-y:hidden;overflow-x:auto}.CodeMirror-lines{padding:.4em}.CodeMirror-linenumber{padding:0 8px 0 4px}.CodeMirror-gutters{border-bottom-left-radius:2px;border-top-left-radius:2px}.CodeMirror pre{padding:0;border:0;border-radius:0}.highlight-base,.highlight-variable{color:#000}.highlight-variable-2{color:#1a1a1a}.highlight-variable-3{color:#333}.highlight-string{color:#BA2121}.highlight-comment{color:#408080;font-style:italic}.highlight-number{color:#080}.highlight-atom{color:#88F}.highlight-keyword{color:green;font-weight:700}.highlight-builtin{color:green}.highlight-error{color:red}.highlight-operator{color:#A2F;font-weight:700}.highlight-meta{color:#A2F}.highlight-def{color:#00f}.highlight-string-2{color:#f50}.highlight-qualifier{color:#555}.highlight-bracket{color:#997}.highlight-tag{color:#170}.highlight-attribute{color:#00c}.highlight-header{color:#00f}.highlight-quote{color:#090}.highlight-link{color:#00c}.cm-s-ipython span.cm-keyword{color:green;font-weight:700}.cm-s-ipython span.cm-atom{color:#88F}.cm-s-ipython span.cm-number{color:#080}.cm-s-ipython span.cm-def{color:#00f}.cm-s-ipython span.cm-variable{color:#000}.cm-s-ipython span.cm-operator{color:#A2F;font-weight:700}.cm-s-ipython span.cm-variable-2{color:#1a1a1a}.cm-s-ipython span.cm-variable-3{color:#333}.cm-s-ipython span.cm-comment{color:#408080;font-style:italic}.cm-s-ipython span.cm-string{color:#BA2121}.cm-s-ipython span.cm-string-2{color:#f50}.cm-s-ipython span.cm-meta{color:#A2F}.cm-s-ipython span.cm-qualifier{color:#555}.cm-s-ipython span.cm-builtin{color:green}.cm-s-ipython span.cm-bracket{color:#997}.cm-s-ipython span.cm-tag{color:#170}.cm-s-ipython span.cm-attribute{color:#00c}.cm-s-ipython span.cm-header{color:#00f}.cm-s-ipython span.cm-quote{color:#090}.cm-s-ipython span.cm-link{color:#00c}.cm-s-ipython span.cm-error{color:red}.cm-s-ipython span.cm-tab{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=')right no-repeat}div.output_wrapper{display:-webkit-box;-webkit-box-align:stretch;display:-moz-box;-moz-box-align:stretch;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch;z-index:1}div.output_scroll{height:24em;width:100%;overflow:auto;border-radius:2px;-webkit-box-shadow:inset 0 2px 8px rgba(0,0,0,.8);box-shadow:inset 0 2px 8px rgba(0,0,0,.8);display:block}div.output_collapsed{margin:0;padding:0;display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}div.out_prompt_overlay{height:100%;padding:0 .4em;position:absolute;border-radius:2px}div.out_prompt_overlay:hover{-webkit-box-shadow:inset 0 0 1px #000;box-shadow:inset 0 0 1px #000;background:rgba(240,240,240,.5)}div.output_prompt{color:#8b0000}div.output_area{padding:0;page-break-inside:avoid;display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}div.output_area .MathJax_Display{text-align:left!important}div.output_area .rendered_html img,div.output_area .rendered_html table{margin-left:0;margin-right:0}div.output_area img,div.output_area svg{max-width:100%;height:auto}div.output_area img.unconfined,div.output_area svg.unconfined{max-width:none}.output{display:-webkit-box;-webkit-box-orient:vertical;display:-moz-box;-moz-box-orient:vertical;display:box;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}@media (max-width:540px){div.output_area{-webkit-box-orient:vertical;-moz-box-orient:vertical;box-orient:vertical;box-align:stretch;display:flex;flex-direction:column;align-items:stretch}}div.output_area pre{margin:0;padding:0;border:0;vertical-align:baseline;color:#000;background-color:transparent;border-radius:0}div.output_subarea{overflow-x:auto;padding:.4em;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1;max-width:calc(100% - 14ex)}div.output_text{text-align:left;color:#000;line-height:1.21429em}div.output_stderr{background:#fdd}div.output_latex{text-align:left}div.output_javascript:empty{padding:0}.js-error{color:#8b0000}div.raw_input_container{font-family:monospace;padding-top:5px}span.raw_input_prompt{}input.raw_input{font-family:inherit;font-size:inherit;color:inherit;width:auto;vertical-align:baseline;padding:0 .25em;margin:0 .25em}input.raw_input:focus{box-shadow:none}p.p-space{margin-bottom:10px}div.output_unrecognized{padding:5px;font-weight:700;color:red}div.output_unrecognized a,div.output_unrecognized a:hover{color:inherit;text-decoration:none}.rendered_html{color:#000}.rendered_html em{font-style:italic}.rendered_html strong{font-weight:700}.rendered_html :link,.rendered_html :visited,.rendered_html u{text-decoration:underline}.rendered_html h1{font-size:185.7%;margin:1.08em 0 0;font-weight:700;line-height:1}.rendered_html h2{font-size:157.1%;margin:1.27em 0 0;font-weight:700;line-height:1}.rendered_html h3{font-size:128.6%;margin:1.55em 0 0;font-weight:700;line-height:1}.rendered_html h4{font-size:100%;margin:2em 0 0;font-weight:700;line-height:1}.rendered_html h5,.rendered_html h6{font-size:100%;margin:2em 0 0;font-weight:700;line-height:1;font-style:italic}.rendered_html h1:first-child{margin-top:.538em}.rendered_html h2:first-child{margin-top:.636em}.rendered_html h3:first-child{margin-top:.777em}.rendered_html h4:first-child,.rendered_html h5:first-child,.rendered_html h6:first-child{margin-top:1em}.rendered_html ul{list-style:disc;margin:0 2em;padding-left:0}.rendered_html ul ul{list-style:square;margin:0 2em}.rendered_html ul ul ul{list-style:circle;margin:0 2em}.rendered_html ol{list-style:decimal;margin:0 2em;padding-left:0}.rendered_html ol ol{list-style:upper-alpha;margin:0 2em}.rendered_html ol ol ol{list-style:lower-alpha;margin:0 2em}.rendered_html ol ol ol ol{list-style:lower-roman;margin:0 2em}.rendered_html ol ol ol ol ol{list-style:decimal;margin:0 2em}.rendered_html *+ol,.rendered_html *+ul{margin-top:1em}.rendered_html hr{color:#000;background-color:#000}.rendered_html pre{margin:1em 2em}.rendered_html code,.rendered_html pre{border:0;background-color:#fff;color:#000;font-size:100%;padding:0}.rendered_html blockquote{margin:1em 2em}.rendered_html table{margin-left:auto;margin-right:auto;border:1px solid #000;border-collapse:collapse}.rendered_html td,.rendered_html th,.rendered_html tr{border:1px solid #000;border-collapse:collapse;margin:1em 2em}.rendered_html td,.rendered_html th{text-align:left;vertical-align:middle;padding:4px}.rendered_html th{font-weight:700}.rendered_html *+table{margin-top:1em}.rendered_html p{text-align:left}.rendered_html *+p{margin-top:1em}.rendered_html img{display:block;margin-left:auto;margin-right:auto}.rendered_html *+img{margin-top:1em}.rendered_html img,.rendered_html svg{max-width:100%;height:auto}.rendered_html img.unconfined,.rendered_html svg.unconfined{max-width:none}div.text_cell{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}@media (max-width:540px){div.text_cell>div.prompt{display:none}}div.text_cell_render{outline:0;resize:none;width:inherit;border-style:none;padding:.5em .5em .5em .4em;color:#000;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}a.anchor-link:link{text-decoration:none;padding:0 20px;visibility:hidden}h1:hover .anchor-link,h2:hover .anchor-link,h3:hover .anchor-link,h4:hover .anchor-link,h5:hover .anchor-link,h6:hover .anchor-link{visibility:visible}.text_cell.rendered .input_area{display:none}.text_cell.rendered .rendered_html{overflow-x:auto}.text_cell.unrendered .text_cell_render{display:none}.cm-header-1,.cm-header-2,.cm-header-3,.cm-header-4,.cm-header-5,.cm-header-6{font-weight:700;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}.cm-header-1{font-size:185.7%}.cm-header-2{font-size:157.1%}.cm-header-3{font-size:128.6%}.cm-header-4{font-size:110%}.cm-header-5,.cm-header-6{font-size:100%;font-style:italic}/*!
		*
		* IPython notebook webapp
		*
		*/@media (max-width:767px){.notebook_app{padding-left:0;padding-right:0}}#ipython-main-app{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height:100%}div#notebook_panel{margin:0;padding:0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height:100%}#notebook{font-size:14px;line-height:20px;overflow-y:hidden;overflow-x:auto;width:100%;padding-top:20px;margin:0;outline:0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;min-height:100%}@media not print{#notebook-container{padding:15px;background-color:#fff;min-height:0;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}}div.ui-widget-content{border:1px solid #ababab;outline:0}pre.dialog{background-color:#f7f7f7;border:1px solid #ddd;border-radius:2px;padding:.4em .4em .4em 2em}p.dialog{padding:.2em}code,kbd,pre,samp{white-space:pre-wrap}#fonttest{font-family:monospace}p{margin-bottom:0}.end_space{min-height:100px;transition:height .2s ease}.notebook_app #header{-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}@media not print{.notebook_app{background-color:#eee}}.celltoolbar{border:thin solid #CFCFCF;border-bottom:none;background:#EEE;border-radius:2px 2px 0 0;width:100%;height:29px;padding-right:4px;-webkit-box-orient:horizontal;-moz-box-orient:horizontal;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch;-webkit-box-pack:end;-moz-box-pack:end;box-pack:end;justify-content:flex-end;font-size:87%;padding-top:3px}@media print{.edit_mode div.cell.selected{border-color:transparent}div.code_cell{page-break-inside:avoid}#notebook-container{width:100%}.celltoolbar{display:none}}.ctb_hideshow{display:none;vertical-align:bottom}.ctb_global_show .ctb_show.ctb_hideshow{display:block}.ctb_global_show .ctb_show+.input_area,.ctb_global_show .ctb_show+div.text_cell_input,.ctb_global_show .ctb_show~div.text_cell_render{border-top-right-radius:0;border-top-left-radius:0}.ctb_global_show .ctb_show~div.text_cell_render{border:1px solid #cfcfcf}.celltoolbar select{color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;line-height:1.5;border-radius:1px;width:inherit;font-size:inherit;height:22px;padding:0;display:inline-block}.celltoolbar select:focus{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.celltoolbar select::-moz-placeholder{color:#999;opacity:1}.celltoolbar select:-ms-input-placeholder{color:#999}.celltoolbar select::-webkit-input-placeholder{color:#999}.celltoolbar select[disabled],.celltoolbar select[readonly],fieldset[disabled] .celltoolbar select{background-color:#eee;opacity:1}.celltoolbar select[disabled],fieldset[disabled] .celltoolbar select{cursor:not-allowed}textarea.celltoolbar select{height:auto}select.celltoolbar select{height:30px;line-height:30px}select[multiple].celltoolbar select,textarea.celltoolbar select{height:auto}.celltoolbar label{margin-left:5px;margin-right:5px}.completions{position:absolute;z-index:10;overflow:hidden;border:1px solid #ababab;border-radius:2px;-webkit-box-shadow:0 6px 10px -1px #adadad;box-shadow:0 6px 10px -1px #adadad;line-height:1}.completions select{background:#fff;outline:0;border:none;padding:0;margin:0;overflow:auto;font-family:monospace;font-size:110%;color:#000;width:auto}.completions select option.context{color:#286090}#kernel_logo_widget{float:right!important;float:right}#kernel_logo_widget .current_kernel_logo{display:none;margin-top:-1px;margin-bottom:-1px;width:32px;height:32px}#menubar{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;margin-top:1px}#menubar .navbar{border-top:1px;border-radius:0 0 2px 2px;margin-bottom:0}#menubar .navbar-toggle{float:left;padding-top:7px;padding-bottom:7px;border:none}#menubar .navbar-collapse{clear:left}.nav-wrapper{border-bottom:1px solid #e7e7e7}i.menu-icon{padding-top:4px}ul#help_menu li a{overflow:hidden;padding-right:2.2em}ul#help_menu li a i{margin-right:-1.2em}.dropdown-submenu{position:relative}.dropdown-submenu>.dropdown-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px}.dropdown-submenu:hover>.dropdown-menu{display:block}.dropdown-submenu>a:after{font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:block;content:"\f0da";float:right;color:#333;margin-top:2px;margin-right:-10px}.dropdown-submenu>a:after.pull-left{margin-right:.3em}.dropdown-submenu>a:after.pull-right{margin-left:.3em}.dropdown-submenu:hover>a:after{color:#262626}.dropdown-submenu.pull-left{float:none}.dropdown-submenu.pull-left>.dropdown-menu{left:-100%;margin-left:10px}#notification_area{float:right!important;float:right;z-index:10}.indicator_area{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto}#kernel_indicator{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto;border-left:1px solid}#kernel_indicator .kernel_indicator_name{padding-left:5px;padding-right:5px}#modal_indicator{float:right!important;float:right;color:#777;margin-left:5px;margin-right:5px;z-index:10;text-align:center;width:auto}#readonly-indicator{float:right!important;float:right;color:#777;z-index:10;text-align:center;width:auto;display:none;margin:2px 0 0}.modal_indicator:before{width:1.28571429em;text-align:center}.edit_mode .modal_indicator:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f040"}.edit_mode .modal_indicator:before.pull-left{margin-right:.3em}.edit_mode .modal_indicator:before.pull-right{margin-left:.3em}.command_mode .modal_indicator:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:' '}.command_mode .modal_indicator:before.pull-left{margin-right:.3em}.command_mode .modal_indicator:before.pull-right{margin-left:.3em}.kernel_idle_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f10c"}.kernel_idle_icon:before.pull-left{margin-right:.3em}.kernel_idle_icon:before.pull-right{margin-left:.3em}.kernel_busy_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f111"}.kernel_busy_icon:before.pull-left{margin-right:.3em}.kernel_busy_icon:before.pull-right{margin-left:.3em}.kernel_dead_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f1e2"}.kernel_dead_icon:before.pull-left{margin-right:.3em}.kernel_dead_icon:before.pull-right{margin-left:.3em}.kernel_disconnected_icon:before{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;content:"\f127"}.kernel_disconnected_icon:before.pull-left{margin-right:.3em}.kernel_disconnected_icon:before.pull-right{margin-left:.3em}.notification_widget{z-index:10;background:rgba(240,240,240,.5);margin-right:4px;color:#333;background-color:#fff;border-color:#ccc}.notification_widget.active,.notification_widget.focus,.notification_widget:active,.notification_widget:focus,.notification_widget:hover,.open>.dropdown-toggle.notification_widget{color:#333;background-color:#e6e6e6;border-color:#adadad}.notification_widget.active,.notification_widget:active,.open>.dropdown-toggle.notification_widget{background-image:none}.notification_widget.disabled,.notification_widget.disabled.active,.notification_widget.disabled.focus,.notification_widget.disabled:active,.notification_widget.disabled:focus,.notification_widget.disabled:hover,.notification_widget[disabled],.notification_widget[disabled].active,.notification_widget[disabled].focus,.notification_widget[disabled]:active,.notification_widget[disabled]:focus,.notification_widget[disabled]:hover,fieldset[disabled] .notification_widget,fieldset[disabled] .notification_widget.active,fieldset[disabled] .notification_widget.focus,fieldset[disabled] .notification_widget:active,fieldset[disabled] .notification_widget:focus,fieldset[disabled] .notification_widget:hover{background-color:#fff;border-color:#ccc}.notification_widget .badge{color:#fff;background-color:#333}.notification_widget.warning{color:#fff;background-color:#f0ad4e;border-color:#eea236}.notification_widget.warning.active,.notification_widget.warning.focus,.notification_widget.warning:active,.notification_widget.warning:focus,.notification_widget.warning:hover,.open>.dropdown-toggle.notification_widget.warning{color:#fff;background-color:#ec971f;border-color:#d58512}.notification_widget.warning.active,.notification_widget.warning:active,.open>.dropdown-toggle.notification_widget.warning{background-image:none}.notification_widget.warning.disabled,.notification_widget.warning.disabled.active,.notification_widget.warning.disabled.focus,.notification_widget.warning.disabled:active,.notification_widget.warning.disabled:focus,.notification_widget.warning.disabled:hover,.notification_widget.warning[disabled],.notification_widget.warning[disabled].active,.notification_widget.warning[disabled].focus,.notification_widget.warning[disabled]:active,.notification_widget.warning[disabled]:focus,.notification_widget.warning[disabled]:hover,fieldset[disabled] .notification_widget.warning,fieldset[disabled] .notification_widget.warning.active,fieldset[disabled] .notification_widget.warning.focus,fieldset[disabled] .notification_widget.warning:active,fieldset[disabled] .notification_widget.warning:focus,fieldset[disabled] .notification_widget.warning:hover{background-color:#f0ad4e;border-color:#eea236}.notification_widget.warning .badge{color:#f0ad4e;background-color:#fff}.notification_widget.success{color:#fff;background-color:#5cb85c;border-color:#4cae4c}.notification_widget.success.active,.notification_widget.success.focus,.notification_widget.success:active,.notification_widget.success:focus,.notification_widget.success:hover,.open>.dropdown-toggle.notification_widget.success{color:#fff;background-color:#449d44;border-color:#398439}.notification_widget.success.active,.notification_widget.success:active,.open>.dropdown-toggle.notification_widget.success{background-image:none}.notification_widget.success.disabled,.notification_widget.success.disabled.active,.notification_widget.success.disabled.focus,.notification_widget.success.disabled:active,.notification_widget.success.disabled:focus,.notification_widget.success.disabled:hover,.notification_widget.success[disabled],.notification_widget.success[disabled].active,.notification_widget.success[disabled].focus,.notification_widget.success[disabled]:active,.notification_widget.success[disabled]:focus,.notification_widget.success[disabled]:hover,fieldset[disabled] .notification_widget.success,fieldset[disabled] .notification_widget.success.active,fieldset[disabled] .notification_widget.success.focus,fieldset[disabled] .notification_widget.success:active,fieldset[disabled] .notification_widget.success:focus,fieldset[disabled] .notification_widget.success:hover{background-color:#5cb85c;border-color:#4cae4c}.notification_widget.success .badge{color:#5cb85c;background-color:#fff}.notification_widget.info{color:#fff;background-color:#5bc0de;border-color:#46b8da}.notification_widget.info.active,.notification_widget.info.focus,.notification_widget.info:active,.notification_widget.info:focus,.notification_widget.info:hover,.open>.dropdown-toggle.notification_widget.info{color:#fff;background-color:#31b0d5;border-color:#269abc}.notification_widget.info.active,.notification_widget.info:active,.open>.dropdown-toggle.notification_widget.info{background-image:none}.notification_widget.info.disabled,.notification_widget.info.disabled.active,.notification_widget.info.disabled.focus,.notification_widget.info.disabled:active,.notification_widget.info.disabled:focus,.notification_widget.info.disabled:hover,.notification_widget.info[disabled],.notification_widget.info[disabled].active,.notification_widget.info[disabled].focus,.notification_widget.info[disabled]:active,.notification_widget.info[disabled]:focus,.notification_widget.info[disabled]:hover,fieldset[disabled] .notification_widget.info,fieldset[disabled] .notification_widget.info.active,fieldset[disabled] .notification_widget.info.focus,fieldset[disabled] .notification_widget.info:active,fieldset[disabled] .notification_widget.info:focus,fieldset[disabled] .notification_widget.info:hover{background-color:#5bc0de;border-color:#46b8da}.notification_widget.info .badge{color:#5bc0de;background-color:#fff}.notification_widget.danger{color:#fff;background-color:#d9534f;border-color:#d43f3a}.notification_widget.danger.active,.notification_widget.danger.focus,.notification_widget.danger:active,.notification_widget.danger:focus,.notification_widget.danger:hover,.open>.dropdown-toggle.notification_widget.danger{color:#fff;background-color:#c9302c;border-color:#ac2925}.notification_widget.danger.active,.notification_widget.danger:active,.open>.dropdown-toggle.notification_widget.danger{background-image:none}.notification_widget.danger.disabled,.notification_widget.danger.disabled.active,.notification_widget.danger.disabled.focus,.notification_widget.danger.disabled:active,.notification_widget.danger.disabled:focus,.notification_widget.danger.disabled:hover,.notification_widget.danger[disabled],.notification_widget.danger[disabled].active,.notification_widget.danger[disabled].focus,.notification_widget.danger[disabled]:active,.notification_widget.danger[disabled]:focus,.notification_widget.danger[disabled]:hover,fieldset[disabled] .notification_widget.danger,fieldset[disabled] .notification_widget.danger.active,fieldset[disabled] .notification_widget.danger.focus,fieldset[disabled] .notification_widget.danger:active,fieldset[disabled] .notification_widget.danger:focus,fieldset[disabled] .notification_widget.danger:hover{background-color:#d9534f;border-color:#d43f3a}.notification_widget.danger .badge{color:#d9534f;background-color:#fff}div#pager{background-color:#fff;font-size:14px;line-height:20px;overflow:hidden;display:none;position:fixed;bottom:0;width:100%;max-height:50%;padding-top:8px;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2);z-index:100;top:auto!important}div#pager pre{line-height:1.21429em;color:#000;background-color:#f7f7f7;padding:.4em}div#pager #pager-button-area{position:absolute;top:8px;right:20px}div#pager #pager-contents{position:relative;overflow:auto;width:100%;height:100%}div#pager #pager-contents #pager-container{position:relative;padding:15px 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}div#pager .ui-resizable-handle{top:0;height:8px;background:#f7f7f7;border-top:1px solid #cfcfcf;border-bottom:1px solid #cfcfcf}div#pager .ui-resizable-handle::after{content:'';top:2px;left:50%;height:3px;width:30px;margin-left:-15px;position:absolute;border-top:1px solid #cfcfcf}.quickhelp{display:-webkit-box;-webkit-box-orient:horizontal;display:-moz-box;-moz-box-orient:horizontal;display:box;box-orient:horizontal;box-align:stretch;display:flex;flex-direction:row;align-items:stretch}.shortcut_key{display:inline-block;width:20ex;text-align:right;font-family:monospace}.shortcut_descr{display:inline-block;-webkit-box-flex:1;-moz-box-flex:1;box-flex:1;flex:1}span.save_widget{margin-top:6px}span.save_widget span.filename{height:1em;line-height:1em;padding:3px;margin-left:16px;border:none;font-size:146.5%;border-radius:2px}span.save_widget span.filename:hover{background-color:#e6e6e6}span.autosave_status,span.checkpoint_status{font-size:small}@media (max-width:767px){span.save_widget{font-size:small}span.autosave_status,span.checkpoint_status{display:none}}@media (min-width:768px)and (max-width:991px){span.checkpoint_status{display:none}span.autosave_status{font-size:x-small}}.toolbar{padding:0;margin-left:-5px;margin-top:2px;margin-bottom:5px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.toolbar label,.toolbar select{width:auto;vertical-align:middle;margin-bottom:0;display:inline;font-size:92%;margin-left:.3em;margin-right:.3em;padding:3px 0 0}.toolbar .btn{padding:2px 8px}.toolbar .btn-group{margin-top:0;margin-left:5px}#maintoolbar{margin-bottom:-3px;margin-top:-8px;border:0;min-height:27px;margin-left:0;padding-top:11px;padding-bottom:3px}#maintoolbar .navbar-text{float:none;vertical-align:middle;text-align:right;margin-left:5px;margin-right:0;margin-top:0}.select-xs{height:24px}@-moz-keyframes fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@-moz-keyframes fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}.bigtooltip{overflow:auto;height:200px;-webkit-transition-property:height;-webkit-transition-duration:500ms;-moz-transition-property:height;-moz-transition-duration:500ms;transition-property:height;transition-duration:500ms}.smalltooltip{-webkit-transition-property:height;-webkit-transition-duration:500ms;-moz-transition-property:height;-moz-transition-duration:500ms;transition-property:height;transition-duration:500ms;text-overflow:ellipsis;overflow:hidden;height:80px}.tooltipbuttons{position:absolute;padding-right:15px;top:0;right:0}.tooltiptext{padding-right:30px}.ipython_tooltip{max-width:700px;animation:fadeOut 400ms;-webkit-animation:fadeIn 400ms;-moz-animation:fadeIn 400ms;animation:fadeIn 400ms;vertical-align:middle;background-color:#f7f7f7;overflow:visible;border:1px solid #ababab;outline:0;padding:3px 3px 3px 7px;padding-left:7px;font-family:monospace;min-height:50px;-moz-box-shadow:0 6px 10px -1px #adadad;-webkit-box-shadow:0 6px 10px -1px #adadad;box-shadow:0 6px 10px -1px #adadad;border-radius:2px;position:absolute;z-index:1000}.ipython_tooltip a{float:right}.ipython_tooltip .tooltiptext pre{border:0;border-radius:0;font-size:100%;background-color:#f7f7f7}.pretooltiparrow{left:0;margin:0;top:-16px;width:40px;height:16px;overflow:hidden;position:absolute}.pretooltiparrow:before{background-color:#f7f7f7;border:1px solid #ababab;z-index:11;content:"";position:absolute;left:15px;top:10px;width:25px;height:25px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg)}.terminal-app{background:#eee}.terminal-app #header{background:#fff;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.2);box-shadow:0 0 12px 1px rgba(87,87,87,.2)}.terminal-app .terminal{float:left;font-family:monospace;color:#fff;background:#000;padding:.4em;border-radius:2px;-webkit-box-shadow:0 0 12px 1px rgba(87,87,87,.4);box-shadow:0 0 12px 1px rgba(87,87,87,.4)}.terminal-app .terminal,.terminal-app .terminal dummy-screen{line-height:1em;font-size:14px}.terminal-app .terminal-cursor{color:#000;background:#fff}.terminal-app #terminado-container{margin-top:20px}
		/*# sourceMappingURL=style.min.css.map */
		</style>
		<style type="text/css">
.highlight .hll { background-color: #ffffcc }
		.highlight  { background: #f8f8f8; }
		.highlight .c { color: #408080; font-style: italic } /* Comment */
		.highlight .err { border: 1px solid #FF0000 } /* Error */
		.highlight .k { color: #008000; font-weight: bold } /* Keyword */
		.highlight .o { color: #666666 } /* Operator */
		.highlight .cm { color: #408080; font-style: italic } /* Comment.Multiline */
		.highlight .cp { color: #BC7A00 } /* Comment.Preproc */
		.highlight .c1 { color: #408080; font-style: italic } /* Comment.Single */
		.highlight .cs { color: #408080; font-style: italic } /* Comment.Special */
		.highlight .gd { color: #A00000 } /* Generic.Deleted */
		.highlight .ge { font-style: italic } /* Generic.Emph */
		.highlight .gr { color: #FF0000 } /* Generic.Error */
		.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
		.highlight .gi { color: #00A000 } /* Generic.Inserted */
		.highlight .go { color: #888888 } /* Generic.Output */
		.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
		.highlight .gs { font-weight: bold } /* Generic.Strong */
		.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
		.highlight .gt { color: #0044DD } /* Generic.Traceback */
		.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
		.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
		.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
		.highlight .kp { color: #008000 } /* Keyword.Pseudo */
		.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
		.highlight .kt { color: #B00040 } /* Keyword.Type */
		.highlight .m { color: #666666 } /* Literal.Number */
		.highlight .s { color: #BA2121 } /* Literal.String */
		.highlight .na { color: #7D9029 } /* Name.Attribute */
		.highlight .nb { color: #008000 } /* Name.Builtin */
		.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
		.highlight .no { color: #880000 } /* Name.Constant */
		.highlight .nd { color: #AA22FF } /* Name.Decorator */
		.highlight .ni { color: #999999; font-weight: bold } /* Name.Entity */
		.highlight .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
		.highlight .nf { color: #0000FF } /* Name.Function */
		.highlight .nl { color: #A0A000 } /* Name.Label */
		.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
		.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
		.highlight .nv { color: #19177C } /* Name.Variable */
		.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
		.highlight .w { color: #bbbbbb } /* Text.Whitespace */
		.highlight .mb { color: #666666 } /* Literal.Number.Bin */
		.highlight .mf { color: #666666 } /* Literal.Number.Float */
		.highlight .mh { color: #666666 } /* Literal.Number.Hex */
		.highlight .mi { color: #666666 } /* Literal.Number.Integer */
		.highlight .mo { color: #666666 } /* Literal.Number.Oct */
		.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
		.highlight .sc { color: #BA2121 } /* Literal.String.Char */
		.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
		.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
		.highlight .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
		.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
		.highlight .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
		.highlight .sx { color: #008000 } /* Literal.String.Other */
		.highlight .sr { color: #BB6688 } /* Literal.String.Regex */
		.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
		.highlight .ss { color: #19177C } /* Literal.String.Symbol */
		.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
		.highlight .vc { color: #19177C } /* Name.Variable.Class */
		.highlight .vg { color: #19177C } /* Name.Variable.Global */
		.highlight .vi { color: #19177C } /* Name.Variable.Instance */
		.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
		</style>
		<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
		body {
		overflow: visible;
		padding: 8px;
		}

		div#notebook {
		overflow: visible;
		border-top: none;
		}

		@media print {
		div.cell {
		display: block;
		page-break-inside: avoid;
		} 
		div.output_wrapper { 
		display: block;
		page-break-inside: avoid; 
		}
		div.output { 
		display: block;
		page-break-inside: avoid; 
		}
		}
		</style><!-- Custom stylesheet, it must be in the same directory as the html file -->
		<link rel="stylesheet" href="custom.css" type="text/css"><!-- Loading mathjax macro -->
		<!-- Load mathjax -->

		<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML" type="text/javascript">
</script><!-- MathJax configuration -->

		<script type="text/x-mathjax-config">
MathJax.Hub.Config({
		tex2jax: {
			inlineMath: [ ['$','$'], ["\\(","\\)"] ],
			displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
			processEscapes: true,
			processEnvironments: true
		},
		// Center justify equations in code and markdown cells. Elsewhere
		// we use CSS to left justify single line equations in code cells.
		displayAlign: 'center',
		"HTML-CSS": {
			styles: {'.MathJax_Display': {"margin": 0}},
			linebreaks: { automatic: true }
		}
		});
		</script><!-- End of mathjax configuration -->
	</head>
	<body>
		<div tabindex="-1" id="notebook" class="border-box-sizing">
			<div class="container" id="notebook-container">
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h1 id="Data-Retrieval">
								Data Retrieval<a class="anchor-link" href="#Data-Retrieval">¶</a>
							</h1>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								In this section we are describing how to find and download data products created during computation. Data can be downloaded for an individual metagenome or per project.
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								We destinguish between precomputed and on demand data. Precomputed data available for download are all (intermediate) pipeline products including sequence similarities. On demand date are for example reads annotated with function or organisms for a given name/annotation space (e.g. SEED or RefSeq).
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h5 id="Example-Data">
								Example Data<a class="anchor-link" href="#Example-Data">¶</a>
							</h5>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								We are using data from the MG-RAST project <a href="http://metagenomics.anl.gov/linkin.cgi?project=128">The oral metagenome in health and disease</a> (mgp128). The project includes 8 samples from the oral cavity of humans.
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<table>
								<thead>
									<tr>
										<th>
											MG-RAST ID
										</th>
										<th>
											Metagenome Name
										</th>
										<th>
											bp Count
										</th>
										<th>
											Sequence Count
										</th>
										<th>
											Biome
										</th>
										<th>
											Sequence Type
										</th>
										<th>
											Sequence Method
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											4447943.3
										</td>
										<td>
											CA_04P
										</td>
										<td>
											142,374,233
										</td>
										<td>
											339,503
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447192.3
										</td>
										<td>
											NOCA_01P
										</td>
										<td>
											77,538,485
										</td>
										<td>
											204,218
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447103.3
										</td>
										<td>
											CA1_01P
										</td>
										<td>
											203,711,161
										</td>
										<td>
											464,594
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447102.3
										</td>
										<td>
											NOCA_03P
										</td>
										<td>
											100,125,112
										</td>
										<td>
											244,881
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447101.3
										</td>
										<td>
											CA1_02P
										</td>
										<td>
											129,851,692
										</td>
										<td>
											295,072
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447971.3
										</td>
										<td>
											CA_06_1.6
										</td>
										<td>
											37,519,874
										</td>
										<td>
											97,722
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447970.3
										</td>
										<td>
											CA_05_4.6
										</td>
										<td>
											27,669,924
										</td>
										<td>
											70,503
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
									<tr>
										<td>
											4447903.3
										</td>
										<td>
											CA_06P
										</td>
										<td>
											123,266,763
										</td>
										<td>
											306,740
										</td>
										<td>
											human-associated habitat
										</td>
										<td>
											WGS
										</td>
										<td>
											454
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h3 id="Downloading-input-and-intermediate-data-products">
								Downloading input and intermediate data products<a class="anchor-link" href="#Downloading-input-and-intermediate-data-products">¶</a>
							</h3>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								The MG-RAST pipeline is producing various intermediate results, see MG-RAST Manual or ...<br>
							</p>
							<p>
								The mg-rast download script provides the capability for
							</p>
							<ul>
								<li>listing all data products for a metagenome
								</li>
								<li>download a single data product
								</li>
								<li>download all data for an entire study/project
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[7]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-download.py --help
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
NAME
    mg-download

VERSION
    1

SYNOPSIS
    mg-download [ --help, --user &lt;user&gt;, --passwd &lt;password&gt;, --token &lt;oAuth token&gt;, --project &lt;project id&gt;, --metagenome &lt;metagenome id&gt;, --file &lt;file id&gt; --dir &lt;directory name&gt; --list &lt;list files for given id&gt;]

DESCRIPTION
    Retrieve metadata for a metagenome.

Options:
  -h, --help            show this help message and exit
  --url=URL             communities API url
  --user=USER           OAuth username
  --passwd=PASSWD       OAuth password
  --token=TOKEN         OAuth token
  --project=PROJECT     project ID
  --metagenome=METAGENOME
                        metagenome ID
  --file=FILE           file ID for given project or metagenome
  --dir=DIR             directory to do downloads
  --list                list files and their info for given ID

Output
    List available files (name and size) for given project or metagenome id.
      OR
    Download of file(s) for given project, metagenome, or file id.

EXAMPLES
    mg-download --metagenome mgm4441680.3 --list

SEE ALSO
    -

AUTHORS
    Jared Bischof, Travis Harrison, Folker Meyer, Tobias Paczian, Andreas Wilke
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h4 id="Download-Products-for-a-single-metagenome">
								Download Products for a single metagenome<a class="anchor-link" href="#Download-Products-for-a-single-metagenome">¶</a>
							</h4>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								TEXT?
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[10]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-download.py --metagenome mgm4441680.3 --list
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
| Metagenome   | File Name                                   | File ID | Checksum                         | Byte Size |
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
| mgm4441680.3 | mgm4441680.3.050.upload.fna                 | 050.1   | b5971c881731254ccfeed9b20c205fda |  20119214 |
| mgm4441680.3 | mgm4441680.3.100.preprocess.passed.fna      | 100.1   | None                             |  19194865 |
| mgm4441680.3 | mgm4441680.3.100.preprocess.removed.fna     | 100.2   | None                             |    924348 |
| mgm4441680.3 | mgm4441680.3.150.dereplication.passed.fna   | 150.1   | None                             |  18857673 |
| mgm4441680.3 | mgm4441680.3.150.dereplication.removed.fna  | 150.2   | None                             |    336945 |
| mgm4441680.3 | mgm4441680.3.299.screen.passed.fna          | 299.1   | None                             |  18857374 |
| mgm4441680.3 | mgm4441680.3.350.genecalling.faa            | 350.1   | ae0fdade8a59174de71a6ecdd2351be6 |   8169114 |
| mgm4441680.3 | mgm4441680.3.425.rna.filter.fna             | 425.1   | None                             |   2894827 |
| mgm4441680.3 | mgm4441680.3.440.cluster.rna97.mapping      | 440.1   | c74370eb4430989f057e4c6f0febf998 |     21187 |
| mgm4441680.3 | mgm4441680.3.440.cluster.rna97.fna          | 440.2   | e0bcc912465be357d6ba3a87f1278c9e |   2832331 |
| mgm4441680.3 | mgm4441680.3.450.rna.sims                   | 450.1   | acac9c2164a300255b78f43392c8c53a |    346328 |
| mgm4441680.3 | mgm4441680.3.550.cluster.aa90.mapping       | 550.1   | 79ad6ac4c00aac64eddabed657e2569e |     80898 |
| mgm4441680.3 | mgm4441680.3.550.cluster.aa90.faa           | 550.2   | d303fea89ad38feb046443d38eca07c0 |   8078030 |
| mgm4441680.3 | mgm4441680.3.650.protein.sims               | 650.1   | d8e73f54bbe8edcbff3cb1eb775d5600 |  47819877 |
| mgm4441680.3 | mgm4441680.3.700.annotation.sims.filter.seq | 700.1   | 581f4f7507b0d7bcf12ea2c2dd56578f |  16813807 |
| mgm4441680.3 | mgm4441680.3.999.done                       | 999.1   | 98c73f8046f1a6a6d1f4b7a7640260ef |  12771586 |
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								Downloading the cluster mapping file for mgm4441680.3
							</p>
							<table>
								<thead>
									<tr>
										<th>
											Metagenome
										</th>
										<th>
											File Name
										</th>
										<th>
											File ID
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											mgm4441680.3
										</td>
										<td>
											mgm4441680.3.550.cluster.aa90.mapping
										</td>
										<td>
											550.1
										</td>
									</tr>
								</tbody>
							</table>
							<p>
								Execute <code>mg-download.py --metagenome mgm4441680.3 --file 550.1</code> on the command line. This will create a directory in your current or specified directory (--dir) with the metagenome as name.
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[29]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-download.py --metagenome mgm4441680.3 --file 550.1 
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
Downloading mgm4441680.3.550.cluster.aa90.mapping for mgm4441680.3 ... Done
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								Check content of download directory: <code>ls mgm4441680.3</code>
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[32]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
<span class="n">ls</span> <span class="n">mgm4441680</span><span class="o">.</span><span class="mi">3</span>
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
mgm4441680.3.550.cluster.aa90.mapping
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[23]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
<span class="n">less</span> <span class="n">mgm4441680</span><span class="o">.</span><span class="mi">3</span><span class="o">/</span><span class="n">mgm4441680</span><span class="o">.</span><span class="mf">3.550</span><span class="o">.</span><span class="n">cluster</span><span class="o">.</span><span class="n">aa90</span><span class="o">.</span><span class="n">mapping</span>
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[33]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
<span class="c"># for i in `cut -f3 mgm4441680.3/mgm4441680.3.550.cluster.aa90.mapping` ; do echo $i | sed -e 's/[^,]*//g' | wc -c ; done  | sort | uniq -c</span>
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								Cluster with more than one members:
							</p>
							<p>
								<code>for i in `cut -f3 mgm4441680.3/mgm4441680.3.550.cluster.aa90.mapping` ; do c=`echo $i | sed -e 's/[^,]*//g' | wc -c` ; echo `expr $c + 1` ; done | sort | uniq -c</code>
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[28]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 <span class="k">for</span> i in <span class="sb">`</span>cut -f3 mgm4441680.3/mgm4441680.3.550.cluster.aa90.mapping<span class="sb">`</span> <span class="p">;</span> <span class="k">do</span> <span class="nv">c</span><span class="o">=</span><span class="sb">`</span><span class="nb">echo</span> <span class="nv">$i</span> <span class="p">|</span> sed -e <span class="s1">'s/[^,]*//g'</span> <span class="p">|</span> wc -c<span class="sb">`</span> <span class="p">;</span> <span class="nb">echo</span> <span class="sb">`</span>expr <span class="nv">$c</span> + 1<span class="sb">`</span> <span class="p">;</span> <span class="k">done</span>  <span class="p">|</span> sort <span class="p">|</span> uniq -c
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
1528 2
  44 3
   2 4
   1 5
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h4 id="Download-Products-for-a-Project">
								Download Products for a Project<a class="anchor-link" href="#Download-Products-for-a-Project">¶</a>
							</h4>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[11]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-download.py --project mgp128 --list
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
| Metagenome   | File Name                                   | File ID | Checksum                         | Byte Size |
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
| mgm4447971.3 | mgm4447971.3.050.upload.fna                 | 050.1   | 328834dc94901ba458afc26f47fed41c |  39181148 |
| mgm4447971.3 | mgm4447971.3.100.preprocess.passed.fna      | 100.1   | 328834dc94901ba458afc26f47fed41c |  39181148 |
| mgm4447971.3 | mgm4447971.3.100.preprocess.removed.fna     | 100.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447971.3 | mgm4447971.3.150.dereplication.passed.fna   | 150.1   | 328834dc94901ba458afc26f47fed41c |  39181148 |
| mgm4447971.3 | mgm4447971.3.150.dereplication.removed.fna  | 150.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447971.3 | mgm4447971.3.299.screen.passed.fna          | 299.1   | 328834dc94901ba458afc26f47fed41c |  39181148 |
| mgm4447971.3 | mgm4447971.3.350.genecalling.faa            | 350.1   | 16a99a27218effa78dab152704bd0a42 |  13679093 |
| mgm4447971.3 | mgm4447971.3.425.rna.filter.fna             | 425.1   | None                             |   3539728 |
| mgm4447971.3 | mgm4447971.3.440.cluster.rna97.mapping      | 440.1   | e309a6c9d89957301dfeb910a8a645a1 |     59693 |
| mgm4447971.3 | mgm4447971.3.440.cluster.rna97.fna          | 440.2   | 9f44736c963cb452a755735f4bb5905d |   2990864 |
| mgm4447971.3 | mgm4447971.3.450.rna.sims                   | 450.1   | 34c48276189ee017b0464eee5dd2cfa4 |    735256 |
| mgm4447971.3 | mgm4447971.3.550.cluster.aa90.mapping       | 550.1   | 883c05c2c9589d315614ed132d4e0de3 |    885333 |
| mgm4447971.3 | mgm4447971.3.550.cluster.aa90.faa           | 550.2   | bde55ff3dff4cd58162d8906421be379 |  11272172 |
| mgm4447971.3 | mgm4447971.3.650.protein.sims               | 650.1   | d758dbf3b4961cddf59af56287fefd0c |  89198915 |
| mgm4447971.3 | mgm4447971.3.700.annotation.sims.filter.seq | 700.1   | c5612e2886cae942b94a3c51dd2d0870 |  95594020 |
| mgm4447103.3 | mgm4447103.3.050.upload.fna                 | 050.1   | 52c769cd829e79f6646b0dc308c53c34 | 211609259 |
| mgm4447103.3 | mgm4447103.3.100.preprocess.passed.fna      | 100.1   | None                             | 207196518 |
| mgm4447103.3 | mgm4447103.3.100.preprocess.removed.fna     | 100.2   | None                             |   4412740 |
| mgm4447103.3 | mgm4447103.3.150.dereplication.passed.fna   | 150.1   | None                             | 182768988 |
| mgm4447103.3 | mgm4447103.3.150.dereplication.removed.fna  | 150.2   | None                             |  24426583 |
| mgm4447103.3 | mgm4447103.3.299.screen.passed.fna          | 299.1   | None                             | 182768197 |
| mgm4447103.3 | mgm4447103.3.350.genecalling.faa            | 350.1   | 04ef569985638dd242ad36ecbea43e6f |  63540927 |
| mgm4447103.3 | mgm4447103.3.425.rna.filter.fna             | 425.1   | None                             |  19548758 |
| mgm4447103.3 | mgm4447103.3.440.cluster.rna97.mapping      | 440.1   | c2042f260732ed92565b25497aac9a92 |    362147 |
| mgm4447103.3 | mgm4447103.3.440.cluster.rna97.fna          | 440.2   | a3191c6fb5d59558a3b635a255d7611a |  15325601 |
| mgm4447103.3 | mgm4447103.3.450.rna.sims                   | 450.1   | a18b8f11a5498b42c740a26f70eb719c |   2985480 |
| mgm4447103.3 | mgm4447103.3.550.cluster.aa90.mapping       | 550.1   | 9b5b1d3853c8eb455f64661b240d842f |   6284316 |
| mgm4447103.3 | mgm4447103.3.550.cluster.aa90.faa           | 550.2   | a5b16ae2dbd704c1bb543496809f2e38 |  43947428 |
| mgm4447103.3 | mgm4447103.3.650.protein.sims               | 650.1   | fbd8a106dc35d5143cd7b980419d2de8 | 344954469 |
| mgm4447103.3 | mgm4447103.3.700.annotation.sims.filter.seq | 700.1   | be2ce7b6e695681ad21944a60963707c | 491811570 |
| mgm4447102.3 | mgm4447102.3.050.upload.fna                 | 050.1   | b6d5c72a9c66de929b21378bc7b67695 | 104288089 |
| mgm4447102.3 | mgm4447102.3.100.preprocess.passed.fna      | 100.1   | b6d5c72a9c66de929b21378bc7b67695 | 104288089 |
| mgm4447102.3 | mgm4447102.3.100.preprocess.removed.fna     | 100.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447102.3 | mgm4447102.3.150.dereplication.passed.fna   | 150.1   | b6d5c72a9c66de929b21378bc7b67695 | 104288089 |
| mgm4447102.3 | mgm4447102.3.150.dereplication.removed.fna  | 150.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447102.3 | mgm4447102.3.299.screen.passed.fna          | 299.1   | b6d5c72a9c66de929b21378bc7b67695 | 104288089 |
| mgm4447102.3 | mgm4447102.3.350.genecalling.faa            | 350.1   | 14ad1d52c4a33c61ec7ab8d1c2238e55 |  32169422 |
| mgm4447102.3 | mgm4447102.3.425.rna.filter.fna             | 425.1   | None                             |  11498760 |
| mgm4447102.3 | mgm4447102.3.440.cluster.rna97.mapping      | 440.1   | b0c9d1e55af64aa46da7ead4048537a5 |    144406 |
| mgm4447102.3 | mgm4447102.3.440.cluster.rna97.fna          | 440.2   | 7ed9fb8ea9b649a5edcf12387ce481a2 |  10256377 |
| mgm4447102.3 | mgm4447102.3.450.rna.sims                   | 450.1   | fd6d282cea735f2b4f45a7b231b57472 |   1430888 |
| mgm4447102.3 | mgm4447102.3.550.cluster.aa90.mapping       | 550.1   | 56c7868867a6fa5869716e9f5da12a46 |   2395714 |
| mgm4447102.3 | mgm4447102.3.550.cluster.aa90.faa           | 550.2   | f6665d94301d793da5f156c947a32e35 |  25785623 |
| mgm4447102.3 | mgm4447102.3.650.protein.sims               | 650.1   | 604553a7e77aa588dc19475ce86640e5 | 181295364 |
| mgm4447102.3 | mgm4447102.3.700.annotation.sims.filter.seq | 700.1   | 8af2783b745398640e28cfd8deaf3a8e | 240997116 |
| mgm4447943.3 | mgm4447943.3.050.upload.fna                 | 050.1   | c031de380d7961aa820c108443205220 | 148145784 |
| mgm4447943.3 | mgm4447943.3.100.preprocess.passed.fna      | 100.1   | c031de380d7961aa820c108443205220 | 148145784 |
| mgm4447943.3 | mgm4447943.3.100.preprocess.removed.fna     | 100.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447943.3 | mgm4447943.3.150.dereplication.passed.fna   | 150.1   | c031de380d7961aa820c108443205220 | 148145784 |
| mgm4447943.3 | mgm4447943.3.150.dereplication.removed.fna  | 150.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447943.3 | mgm4447943.3.299.screen.passed.fna          | 299.1   | c031de380d7961aa820c108443205220 | 148145784 |
| mgm4447943.3 | mgm4447943.3.350.genecalling.faa            | 350.1   | 0a433b8edb11108e71356784a20cf786 |  51217959 |
| mgm4447943.3 | mgm4447943.3.425.rna.filter.fna             | 425.1   | None                             |  12239230 |
| mgm4447943.3 | mgm4447943.3.440.cluster.rna97.mapping      | 440.1   | 7504b38aa6bf85e2c0f3177e205a7753 |    260273 |
| mgm4447943.3 | mgm4447943.3.440.cluster.rna97.fna          | 440.2   | e763289610b609aec86d2b1b46e709ba |   9599780 |
| mgm4447943.3 | mgm4447943.3.450.rna.sims                   | 450.1   | 9caaca39ae0aa7de146ae58e565c981e |   2037144 |
| mgm4447943.3 | mgm4447943.3.550.cluster.aa90.mapping       | 550.1   | 0bce6fec6fb2ef21db5de77d33a6b2b9 |   4879531 |
| mgm4447943.3 | mgm4447943.3.550.cluster.aa90.faa           | 550.2   | 2447001cf0edd4fb41a823da3d0dc417 |  36987490 |
| mgm4447943.3 | mgm4447943.3.650.protein.sims               | 650.1   | ac810de23ec7d2ba825b83ba0a11841a | 283185900 |
| mgm4447943.3 | mgm4447943.3.700.annotation.sims.filter.seq | 700.1   | e7496419616d25b55de6e8aa60f846f3 | 379157621 |
| mgm4447192.3 | mgm4447192.3.050.upload.fna                 | 050.1   | 128b0d81eca19a232dfe0332b7676bdf |  81010191 |
| mgm4447192.3 | mgm4447192.3.100.preprocess.passed.fna      | 100.1   | None                             |  79370531 |
| mgm4447192.3 | mgm4447192.3.100.preprocess.removed.fna     | 100.2   | None                             |   1639659 |
| mgm4447192.3 | mgm4447192.3.150.dereplication.passed.fna   | 150.1   | None                             |  71551545 |
| mgm4447192.3 | mgm4447192.3.150.dereplication.removed.fna  | 150.2   | None                             |   7818197 |
| mgm4447192.3 | mgm4447192.3.299.screen.passed.fna          | 299.1   | None                             |  71551545 |
| mgm4447192.3 | mgm4447192.3.350.genecalling.faa            | 350.1   | 736504571395b1bfd6dcdfae18a1e831 |  25498099 |
| mgm4447192.3 | mgm4447192.3.425.rna.filter.fna             | 425.1   | None                             |   5758257 |
| mgm4447192.3 | mgm4447192.3.440.cluster.rna97.mapping      | 440.1   | 2a906d187126f5d159018d4cecd981dd |     77619 |
| mgm4447192.3 | mgm4447192.3.440.cluster.rna97.fna          | 440.2   | 89b11d76aa97e377ccc3d6c70112c553 |   4995104 |
| mgm4447192.3 | mgm4447192.3.450.rna.sims                   | 450.1   | 58446cf736e67b7b4eacf4fdcd98d366 |   1721625 |
| mgm4447192.3 | mgm4447192.3.550.cluster.aa90.mapping       | 550.1   | 8d10e455b8c7098b6d1c61424bfb13c5 |   1066799 |
| mgm4447192.3 | mgm4447192.3.550.cluster.aa90.faa           | 550.2   | 7e5e256923508d527c9cde84541509d3 |  22974474 |
| mgm4447192.3 | mgm4447192.3.650.protein.sims               | 650.1   | cd81a0f73a64b4ff3293e1c4f0aa84dd | 194741519 |
| mgm4447192.3 | mgm4447192.3.700.annotation.sims.filter.seq | 700.1   | 41a42f1623448ec0c5e54ff174aff5b0 | 186148309 |
| mgm4447101.3 | mgm4447101.3.050.upload.fna                 | 050.1   | 20fc92a495cddeac2348b75a3f1f21a3 | 134867916 |
| mgm4447101.3 | mgm4447101.3.100.preprocess.passed.fna      | 100.1   | None                             | 131999374 |
| mgm4447101.3 | mgm4447101.3.100.preprocess.removed.fna     | 100.2   | None                             |   2868541 |
| mgm4447101.3 | mgm4447101.3.150.dereplication.passed.fna   | 150.1   | None                             | 120374323 |
| mgm4447101.3 | mgm4447101.3.150.dereplication.removed.fna  | 150.2   | None                             |  11624094 |
| mgm4447101.3 | mgm4447101.3.299.screen.passed.fna          | 299.1   | None                             | 120374323 |
| mgm4447101.3 | mgm4447101.3.350.genecalling.faa            | 350.1   | ef2ced5be81d4291c8fa04162016404a |  41533283 |
| mgm4447101.3 | mgm4447101.3.425.rna.filter.fna             | 425.1   | None                             |  12193286 |
| mgm4447101.3 | mgm4447101.3.440.cluster.rna97.mapping      | 440.1   | b2a079ee15412feac9a341b7fa85d02f |    145046 |
| mgm4447101.3 | mgm4447101.3.440.cluster.rna97.fna          | 440.2   | f7fe384458ede720db3939c3f3a09615 |  10604625 |
| mgm4447101.3 | mgm4447101.3.450.rna.sims                   | 450.1   | c2cac58371a53954ea463dc3914d5d5f |   2205190 |
| mgm4447101.3 | mgm4447101.3.550.cluster.aa90.mapping       | 550.1   | 6577d28f7c2fb935b93110467c10437f |   2656704 |
| mgm4447101.3 | mgm4447101.3.550.cluster.aa90.faa           | 550.2   | a63a9d9107003630db749a5c95068c6f |  34237053 |
| mgm4447101.3 | mgm4447101.3.650.protein.sims               | 650.1   | b77486df42aa531776d8ed58e15bbd93 | 254746872 |
| mgm4447101.3 | mgm4447101.3.700.annotation.sims.filter.seq | 700.1   | 66bf9d8696fb58cf03c3d776aed981da | 299176129 |
| mgm4447903.3 | mgm4447903.3.050.upload.fna                 | 050.1   | 8cdd634d1a2461da46e5ce2fece96ecc | 128481343 |
| mgm4447903.3 | mgm4447903.3.100.preprocess.passed.fna      | 100.1   | 8cdd634d1a2461da46e5ce2fece96ecc | 128481343 |
| mgm4447903.3 | mgm4447903.3.100.preprocess.removed.fna     | 100.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447903.3 | mgm4447903.3.150.dereplication.passed.fna   | 150.1   | 8cdd634d1a2461da46e5ce2fece96ecc | 128481343 |
| mgm4447903.3 | mgm4447903.3.150.dereplication.removed.fna  | 150.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447903.3 | mgm4447903.3.299.screen.passed.fna          | 299.1   | 8cdd634d1a2461da46e5ce2fece96ecc | 128481343 |
| mgm4447903.3 | mgm4447903.3.350.genecalling.faa            | 350.1   | a3c1eb00589e12127611164ff18e7451 |  44812517 |
| mgm4447903.3 | mgm4447903.3.425.rna.filter.fna             | 425.1   | None                             |  12647219 |
| mgm4447903.3 | mgm4447903.3.440.cluster.rna97.mapping      | 440.1   | 50b6aaa5eca5c89896e7a17f89f41626 |    214276 |
| mgm4447903.3 | mgm4447903.3.440.cluster.rna97.fna          | 440.2   | 4b045f1dc5a7d9250bac47ed12aaaa27 |  10643616 |
| mgm4447903.3 | mgm4447903.3.450.rna.sims                   | 450.1   | d613c69f79e0720db3670608b51677e4 |   2130299 |
| mgm4447903.3 | mgm4447903.3.550.cluster.aa90.mapping       | 550.1   | 56530b1392a189e345c0c98c918a46cf |   3491765 |
| mgm4447903.3 | mgm4447903.3.550.cluster.aa90.faa           | 550.2   | 840f34cf82737eaf67fcf6ea5a74e4bb |  35494944 |
| mgm4447903.3 | mgm4447903.3.650.protein.sims               | 650.1   | 336b1911828ab283e818a9c31cb8509d | 275013579 |
| mgm4447903.3 | mgm4447903.3.700.annotation.sims.filter.seq | 700.1   | a62de5b85699414815dd312d8f6d4190 | 324700253 |
| mgm4447970.3 | mgm4447970.3.050.upload.fna                 | 050.1   | ec704f3775b1e5d7767a69421c8fb3e8 |  28868475 |
| mgm4447970.3 | mgm4447970.3.100.preprocess.passed.fna      | 100.1   | ec704f3775b1e5d7767a69421c8fb3e8 |  28868475 |
| mgm4447970.3 | mgm4447970.3.100.preprocess.removed.fna     | 100.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447970.3 | mgm4447970.3.150.dereplication.passed.fna   | 150.1   | ec704f3775b1e5d7767a69421c8fb3e8 |  28868475 |
| mgm4447970.3 | mgm4447970.3.150.dereplication.removed.fna  | 150.2   | d41d8cd98f00b204e9800998ecf8427e |         0 |
| mgm4447970.3 | mgm4447970.3.299.screen.passed.fna          | 299.1   | ec704f3775b1e5d7767a69421c8fb3e8 |  28868475 |
| mgm4447970.3 | mgm4447970.3.350.genecalling.faa            | 350.1   | 5d479abb01cfb4b7687b3a83ba4df5fc |   9922558 |
| mgm4447970.3 | mgm4447970.3.425.rna.filter.fna             | 425.1   | None                             |   2963838 |
| mgm4447970.3 | mgm4447970.3.440.cluster.rna97.mapping      | 440.1   | ae227d06a8c5b8587f84f075486fb35c |     54374 |
| mgm4447970.3 | mgm4447970.3.440.cluster.rna97.fna          | 440.2   | 97df32e0b74eb1ffd0c7268f2f23258b |   2461827 |
| mgm4447970.3 | mgm4447970.3.450.rna.sims                   | 450.1   | d713b1b78765db0ae7d7da60c5e50dc0 |    440344 |
| mgm4447970.3 | mgm4447970.3.550.cluster.aa90.mapping       | 550.1   | 6e0c03a6e48291ec3846696815b400ff |    758334 |
| mgm4447970.3 | mgm4447970.3.550.cluster.aa90.faa           | 550.2   | 73da67ee9297ddceb66923ce118288a6 |   7757888 |
| mgm4447970.3 | mgm4447970.3.650.protein.sims               | 650.1   | c58ca94dfa61525c193b99a392ed2c51 |  53543996 |
| mgm4447970.3 | mgm4447970.3.700.annotation.sims.filter.seq | 700.1   | c4a55b6957a06a3b498b554872563fe9 |  70098345 |
+--------------+---------------------------------------------+---------+----------------------------------+-----------+
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								This will download the entire study: <code>mg-download.py --project mgp128</code>
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[35]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
  mg-download.py --project mgp128
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
Downloading mgm4447971.3.050.upload.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.100.preprocess.passed.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.100.preprocess.removed.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.150.dereplication.passed.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.150.dereplication.removed.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.299.screen.passed.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.350.genecalling.faa for mgm4447971.3 ... Done
Downloading mgm4447971.3.425.rna.filter.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.440.cluster.rna97.mapping for mgm4447971.3 ... Done
Downloading mgm4447971.3.440.cluster.rna97.fna for mgm4447971.3 ... Done
Downloading mgm4447971.3.450.rna.sims for mgm4447971.3 ... Done
Downloading mgm4447971.3.550.cluster.aa90.mapping for mgm4447971.3 ... Done
Downloading mgm4447971.3.550.cluster.aa90.faa for mgm4447971.3 ... Done
Downloading mgm4447971.3.650.protein.sims for mgm4447971.3 ... Done
Downloading mgm4447971.3.700.annotation.sims.filter.seq for mgm4447971.3 ... Done
Downloading mgm4447103.3.050.upload.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.100.preprocess.passed.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.100.preprocess.removed.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.150.dereplication.passed.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.150.dereplication.removed.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.299.screen.passed.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.350.genecalling.faa for mgm4447103.3 ... Done
Downloading mgm4447103.3.425.rna.filter.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.440.cluster.rna97.mapping for mgm4447103.3 ... Done
Downloading mgm4447103.3.440.cluster.rna97.fna for mgm4447103.3 ... Done
Downloading mgm4447103.3.450.rna.sims for mgm4447103.3 ... Done
Downloading mgm4447103.3.550.cluster.aa90.mapping for mgm4447103.3 ... Done
Downloading mgm4447103.3.550.cluster.aa90.faa for mgm4447103.3 ... Done
Downloading mgm4447103.3.650.protein.sims for mgm4447103.3 ... Done
Downloading mgm4447103.3.700.annotation.sims.filter.seq for mgm4447103.3 ... Done
Downloading mgm4447102.3.050.upload.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.100.preprocess.passed.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.100.preprocess.removed.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.150.dereplication.passed.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.150.dereplication.removed.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.299.screen.passed.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.350.genecalling.faa for mgm4447102.3 ... Done
Downloading mgm4447102.3.425.rna.filter.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.440.cluster.rna97.mapping for mgm4447102.3 ... Done
Downloading mgm4447102.3.440.cluster.rna97.fna for mgm4447102.3 ... Done
Downloading mgm4447102.3.450.rna.sims for mgm4447102.3 ... Done
Downloading mgm4447102.3.550.cluster.aa90.mapping for mgm4447102.3 ... Done
Downloading mgm4447102.3.550.cluster.aa90.faa for mgm4447102.3 ... Done
Downloading mgm4447102.3.650.protein.sims for mgm4447102.3 ... Done
Downloading mgm4447102.3.700.annotation.sims.filter.seq for mgm4447102.3 ... Done
Downloading mgm4447943.3.050.upload.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.100.preprocess.passed.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.100.preprocess.removed.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.150.dereplication.passed.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.150.dereplication.removed.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.299.screen.passed.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.350.genecalling.faa for mgm4447943.3 ... Done
Downloading mgm4447943.3.425.rna.filter.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.440.cluster.rna97.mapping for mgm4447943.3 ... Done
Downloading mgm4447943.3.440.cluster.rna97.fna for mgm4447943.3 ... Done
Downloading mgm4447943.3.450.rna.sims for mgm4447943.3 ... Done
Downloading mgm4447943.3.550.cluster.aa90.mapping for mgm4447943.3 ... Done
Downloading mgm4447943.3.550.cluster.aa90.faa for mgm4447943.3 ... Done
Downloading mgm4447943.3.650.protein.sims for mgm4447943.3 ... Done
Downloading mgm4447943.3.700.annotation.sims.filter.seq for mgm4447943.3 ... Done
Downloading mgm4447192.3.050.upload.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.100.preprocess.passed.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.100.preprocess.removed.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.150.dereplication.passed.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.150.dereplication.removed.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.299.screen.passed.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.350.genecalling.faa for mgm4447192.3 ... Done
Downloading mgm4447192.3.425.rna.filter.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.440.cluster.rna97.mapping for mgm4447192.3 ... Done
Downloading mgm4447192.3.440.cluster.rna97.fna for mgm4447192.3 ... Done
Downloading mgm4447192.3.450.rna.sims for mgm4447192.3 ... Done
Downloading mgm4447192.3.550.cluster.aa90.mapping for mgm4447192.3 ... Done
Downloading mgm4447192.3.550.cluster.aa90.faa for mgm4447192.3 ... Done
Downloading mgm4447192.3.650.protein.sims for mgm4447192.3 ... Done
Downloading mgm4447192.3.700.annotation.sims.filter.seq for mgm4447192.3 ... Done
Downloading mgm4447101.3.050.upload.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.100.preprocess.passed.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.100.preprocess.removed.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.150.dereplication.passed.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.150.dereplication.removed.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.299.screen.passed.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.350.genecalling.faa for mgm4447101.3 ... Done
Downloading mgm4447101.3.425.rna.filter.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.440.cluster.rna97.mapping for mgm4447101.3 ... Done
Downloading mgm4447101.3.440.cluster.rna97.fna for mgm4447101.3 ... Done
Downloading mgm4447101.3.450.rna.sims for mgm4447101.3 ... Done
Downloading mgm4447101.3.550.cluster.aa90.mapping for mgm4447101.3 ... Done
Downloading mgm4447101.3.550.cluster.aa90.faa for mgm4447101.3 ... Done
Downloading mgm4447101.3.650.protein.sims for mgm4447101.3 ... Done
Downloading mgm4447101.3.700.annotation.sims.filter.seq for mgm4447101.3 ... Done
Downloading mgm4447903.3.050.upload.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.100.preprocess.passed.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.100.preprocess.removed.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.150.dereplication.passed.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.150.dereplication.removed.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.299.screen.passed.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.350.genecalling.faa for mgm4447903.3 ... Done
Downloading mgm4447903.3.425.rna.filter.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.440.cluster.rna97.mapping for mgm4447903.3 ... Done
Downloading mgm4447903.3.440.cluster.rna97.fna for mgm4447903.3 ... Done
Downloading mgm4447903.3.450.rna.sims for mgm4447903.3 ... Done
Downloading mgm4447903.3.550.cluster.aa90.mapping for mgm4447903.3 ... Done
Downloading mgm4447903.3.550.cluster.aa90.faa for mgm4447903.3 ... Done
Downloading mgm4447903.3.650.protein.sims for mgm4447903.3 ... Done
Downloading mgm4447903.3.700.annotation.sims.filter.seq for mgm4447903.3 ... Done
Downloading mgm4447970.3.050.upload.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.100.preprocess.passed.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.100.preprocess.removed.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.150.dereplication.passed.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.150.dereplication.removed.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.299.screen.passed.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.350.genecalling.faa for mgm4447970.3 ... Done
Downloading mgm4447970.3.425.rna.filter.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.440.cluster.rna97.mapping for mgm4447970.3 ... Done
Downloading mgm4447970.3.440.cluster.rna97.fna for mgm4447970.3 ... Done
Downloading mgm4447970.3.450.rna.sims for mgm4447970.3 ... Done
Downloading mgm4447970.3.550.cluster.aa90.mapping for mgm4447970.3 ... Done
Downloading mgm4447970.3.550.cluster.aa90.faa for mgm4447970.3 ... Done
Downloading mgm4447970.3.650.protein.sims for mgm4447970.3 ... Done
Downloading mgm4447970.3.700.annotation.sims.filter.seq for mgm4447970.3 ... Done
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<h3 id="Downloading-&quot;annotated&quot;-sequences">
								Downloading "annotated" sequences<a class="anchor-link" href="#Downloading-&quot;annotated&quot;-sequences">¶</a>
							</h3>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								Invoke the mg-get-sequences-for-* scripts with the --help option.
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[2]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-get-sequences-for-function.py --help
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
NAME
    mg-get-sequences-for-function

VERSION
    1

SYNOPSIS
    mg-get-sequences-for-function [ --help, --user &lt;user&gt;, --passwd &lt;password&gt;, --token &lt;oAuth token&gt;, --id &lt;metagenome id&gt;, --name &lt;function name&gt;, --level &lt;function level&gt;, --source &lt;datasource&gt;, --evalue &lt;evalue negative exponent&gt;, --identity &lt;percent identity&gt;, --length &lt;alignment length&gt; ]

DESCRIPTION
    Retrieve function annotated sequences for a metagenome filtered by function containing inputted name.

Options:
  -h, --help           show this help message and exit
  --id=ID              KBase Metagenome ID
  --url=URL            communities API url
  --user=USER          OAuth username
  --passwd=PASSWD      OAuth password
  --token=TOKEN        OAuth token
  --name=NAME          function name to filter by
  --level=LEVEL        function level to filter by
  --source=SOURCE      datasource to filter results by, default is Subsystems
  --evalue=EVALUE      negative exponent value for maximum e-value cutoff, default is 5
  --identity=IDENTITY  percent value for minimum % identity cutoff, default is 60
  --length=LENGTH      value for minimum alignment length cutoff, default is 15

Output
    Tab-delimited list of: m5nr id, dna sequence, semicolon seperated list of annotations, sequence id

EXAMPLES
    mg-get-sequences-for-function --id "mgm4441680.3" --name "Central carbohydrate metabolism" --level level2 --source Subsystems --evalue 10

SEE ALSO
    -

AUTHORS
    Jared Bischof, Travis Harrison, Folker Meyer, Tobias Paczian, Andreas Wilke
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing text_cell rendered">
					<div class="prompt input_prompt"></div>
					<div class="inner_cell">
						<div class="text_cell_render border-box-sizing rendered_html">
							<p>
								We want to retrieve all reads from mgm4447903.3 wich are part of the "Central carbohydrate metabolism" (see SEED Subsystems)
							</p>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[6]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 mg-get-sequences-for-function.py --id <span class="s2">"mgm4447903.3"</span> --name <span class="s2">"Central carbohydrate metabolism"</span> --level level2 --source Subsystems --evalue <span class="m">10</span> 2&gt;&gt;error.log <span class="p">|</span> head -n <span class="m">15</span>  
</pre>
								</div>
							</div>
						</div>
					</div>
					<div class="output_wrapper">
						<div class="output">
							<div class="output_area">
								<div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
									<pre>
sequence id m5nr id (md5sum)    dna sequence    semicolon separated list of annotations
mgm4447903.3|GF8803K02GAMU6 0007c0e8723384b66f266a60ea8a0219    ATTATAGCAGAGGGAGTGTGGAATGTCATGTATGAACTATTTTTCGCGGATAACTTCGATTTTATATCCATCTAAGTCTTTCACGAAGTAGTAGTTAGCAGGATGTCCTGGTAAACCTTTTAATTCTGTAACGTCATAACCTTTAGCAACGTGTTCAGCGTGAAGAGCTTCTAAGTCTTTAGCACTGATGGCGATATGACCATATCCGTCACCGATTTCGTATGGTCCGTGACCATAGTTATATGTTAATTCTAATTCATAGTCATCTCCTTCAAAAGCGAGATAAGCGATTGTGTAATTTATGTTCTGGGAAGTTCTTTTCTTCTTGTTTACTTTAAAACCGATGCTTCTTCGTAGAACCGAATGCTTTCTTCTAGTATTTTCAACACGGACACAAGTATG  SS08191
mgm4447903.3|GF8803K02HY8OA 0007c0e8723384b66f266a60ea8a0219    CAGAACTCATGCGCACACTTAAAAAGTCTCCACAGAGAATCCCCTATCCCTTTTATCTGACACCTTGTGAGTCTCTCTGGACTCCCCTTAAAAGGTTAAATTTGTATTAGTATACTCTTTCAAAGAAAAAAAGTCAAGTAGAAAACGAACATTCTACTTGACTTTACTGGATTATTTTTCACGAATCACTTCGACCTTGTAGCCGTCAGGATCCTTGACAAAGTATAGTTTGGTGGAGTTCCTGGTAGGCCTTTTGGCTCTGTAACCTCATAGCCTTTAGCGCTATGTTCTTGATGTAGGGCCTCAAGGTCAGGTGTACTGAGGGCGATATGGGCAAAACCNTCTCCTACCACGTAAGGGCC  SS08191
mgm4447903.3|GF8803K02G8NLU 008cdccf3934e97819089dd98e4f8aa0    CAAGGAAAAGTCGGAGAGAAGCGGCGGCAAGAACGTGCGACGGAAGACGGCGGCGAAAGCGGCAAAGCAGGAGAACGCAGACAAAGAGCGTACAGCGCCCGCAAAGAGCGCACCGCCGCCCAAGCGCGGCAAGGCGGCGCAGCGTGCACGCCGCGTCGCCAAGAAGCGCACGGGGCGTCCTGCGGCACGCTCCAAGAACGGTACAAAGACGAACGCCGGTAGGCGTTCGCATCTCGGCAAACGGTAGTTTTATTGGAACCTGCGAAAGAGCGATGGCTGGCGATGCCGTTGTTCTTTTCTTTTGGGTGGGAACTTTCTTTCACCTTCTCCTCGTTTGCGGCAGGAAATTCGCTTTTTTGACAGAATAAAGGAAGTATGTTCAATATGAAGCGATAAAATCTATGCGCAAAATGGAAGAGGGGGCTTTTTCATGATTGGAATCAAGAATGTCATTGCCATTATCTGTGGTGGCGGGCCAGCGCCCGGTATCAACAGCGTCATTTCCGCCGTGACCATCGA SS06164;SS06133
mgm4447903.3|GF8803K02G8W2O 008cdccf3934e97819089dd98e4f8aa0    CACGGACACATCCGCTACAGCGAGCTCGACTTCGGCGAGATCATCAAACAGGCGGTGCTCGCCGAGACGAAGAAGCTCGGCATCACCATCAGCGTCATCGACAAGGAAATCGGCTACGAGCTGCGCTGCACGGCGCCGATCGCCTATGATATCGACTACTGCCGCTCGCTCGGCTACTCCGCCGTCAAGTTCCTCATGCAGGGCGACACGGGCGCGATCATCACGATCCAGGACAATCAGGCGGTGCCGATGCGCTTCGACGAGATTCGCGACCCCGAGACGGGCAAGACGAAGGTGCGCAAGGTCAACATCGGCTCCGTCCACTACCGTATCGCGCGCGGTTTCATGATGCGTCTCGAAAAGGGCGACCTCGACGATCCGGGACTTGCGAATGCCTACCGCATGACGCAGGAGGAGTTCAAGGAACGCTACTCCTATCTCTTTGACGGCGACGCCACAGAGTAATTT    SS06164;SS06133
mgm4447903.3|GF8803K02GIF4Y 008cdccf3934e97819089dd98e4f8aa0    TCCCATACGCGCGGAAGGAGGCGGGAAAGACTGTCACAAACCTCGGACGACGCAGCAGAAAACGTCCTTGAATCCGTACCTGCGGAAAACTGTCACCATGAATGACGACCCTATGCGGAACCAAAATTTTTCACAGAGAAGGAAAACATTCCACCTCGTCGAATTTATATAAAGTACAGACAATTCCAAAAAGGAGGCGGATTTCATGATTGGTATCAAGAATGTGATTGCGATTATCTGCGGAGGCGGCCCCGCGCCCGGCATCAACAGTGTTATCTCCGCAGTTACCAGTGAGGCGACGCGCCATGGCTGGGATGTACTCGGCATTTACGACGGATTCTCGCGGCTCGCGCGCGGCGAGAAGACTATGTGCGCCTCGAGACGGCGAACATCAGCCGCATCCATCTGACCGGAGGCTGCATCCTCAAGATGTCGTCGTTTTAATCCGACGAAGAAGGAATCCGATCTCCGTACCGTCGTCGAGACGCTTACGGAACTCGGCGTTACCCATCG   SS06164;SS06133
mgm4447903.3|GF8803K02H1UQ8 008cdccf3934e97819089dd98e4f8aa0    CAAGGAAAGTCGGAGAGAGCGGCGGCAAGAACGTGCGACGGAAGACGGCGGCGAAAGCGGCAAAAGCAGGAGAACGCAGACAAAGAGCGTACAGCGCCCGCAAAGAGCGCACCGCCGCCCAAGCGCGGCAAGGCGGCGCAGCGTGCACGCCGCGTCGCCAAGAAGCGCACGGGGCGTCCTGCGGCACGCTCCAAGAACGGTACAAAGACGAACGCCGGTAGGCGTTCGCATCTCGGCAAACGGTGTTTTATTGGAACCTGCGAAAGAGCGATGGCTGGCGATGCCGTTGTTCTTTTCTTTTGGGTGGGAACTTTCTTTCACCTTCTCCTCGTTTGCGGCAGGAAATTCGCTTTTTTGACAGAATAAAGGAAGTATGTTCAATATGAAGCGATAAAATCTATGCGCAAAATGGAAGAGGGGGCTTTTTCATGATTGGAATCAAGAATGTCATTGCCATTATCTGTGGTGGCGGGCCAGCGCCCGGTATCAACAGCGTCATTTCCGCCGTGACCATCGA   SS06164;SS06133
mgm4447903.3|GF8803K02HJIX9 008cdccf3934e97819089dd98e4f8aa0    AGCCCCGGATCGTCGAGGTCGCCCTTCTCAATGCGCATCATAAAGCCGCGCGCAATGCGGTAGTGTACGGAATCGATGTTGACCTTGCGCACCTTCGTCTTGCCCGTCTCTGGGTCACGGATCTCATCGAACCGCATCGGCACAGCCTGGTTGTCCTGGATGGTGATGATCGCGCCTGAGTCGCCGCTCATCAGGAACTTCACGGCAGAGTAGCCAAGCGAGCGGCAATAGTCAATGTCGTATGCGATCGGAGCCGTGCAGCGCAGTTCGTAGCCGATCTCCTTGTCAATGATGGTGAGGGCAATGCCGAGCTTCTTCGTCTCGGCGAGCACTGCCTGCTTGAGGATCTCGCCGAAGTCCAGCTCGCTGTAACGAATGTGTCCGTGCTCATCGGTAACGACACTGCCGAGCTTTGCGAATCCTCCTCCGCGATCTTTCATGACGCCCTCGGCGACG    SS06164;SS06133
mgm4447903.3|GF8803K02HLG35 008cdccf3934e97819089dd98e4f8aa0    TCCAACACGCCCTCGGCAATAACGGCCACACCAAAGGTACGGCCCATGCGATAGCGCTTCATCACCGAACCGACGATGATGTCCACCACTTCCTGCAAGGCGATCTTCGGCTTATGGAATTCTTCGGGAATGATCGTCAGCACCGCCCCGGAGGAACGGCCGATTCCCAGCGCCAAGTGTCCGGCGGTCCGCCCCATAGCGATGACAAGATACCAACGATTCATCATGGTGCGGGCGTCTTCCACCAGATTCTGCACCTCCACCGCGCCGAACTGCCGCGCCGTCTCAAAGCCAAAGGTAGGAACGCCCTCGGGAAGAGGCAGATCGTTGTCAATGGTCTTCGGCACATGAACGACACGAATCGACCGGCCATGCTCTTTCGCGTACTGGGCCACCGCCGCTGCGCTGTGCGCCGTATCGTCGCCGCCGATGGTGACAAGATGGGTGACGCCCAATTCCAGCAGCGTCTCCACCACGGCCTGTAAATCTTCCGCCTTCTTCGT SS06164;SS06133
mgm4447903.3|GF8803K02HVUTW 008cdccf3934e97819089dd98e4f8aa0    GACAATCAGGCTGTACCCATGCGCTTTGACGAGATCCGCGACCCCGAGACGGGCAAGACGAAGGTGCGCAAGGTCAACATCAACTCCGTGCACTATCAGATTGCGCGCGGCTTCATGATGCGTCTCGAAAAGGGCGACCTTGACGATCCGGGGCTTGCAAATGCCTACCGCATGACGCACGACGAGTTCAAGGAGCGCTATGCCTACCTCTTTGACGGCGACGCCGCCGAATAACATAGAGATGCAACACGATGGAGCAGAAAAATTCTGCTCCATTTTTCTATTTAGGGTATTGACGGGATGTCTCCTTTGTCGTATAATATCGTCTTGTTAGCGCAGTGCGCTTGAGGTTATCGCGGGGTGGAGCAGTCGGTAGCTCGTCGGGCTCATAACCCGAGGTCACAGGTTCAAGTCCTGTCCCCG SS06164;SS06133
mgm4447903.3|GF8803K02FK0JA 0070700424093f33d7a9a54e60a3d29a    AGCACATTGAGGAATTCGTTCGTGNTGGAGCAGATATTATCACAATCCACGTAGAAGCAACTCCTCATATCCATGGTGCTCTCCAACAAATCCGTGCCGCAGGAGTAAAAGCAGGTGTTGTAATCAATCCGGGCACTCCGGTTCAAGCGATTAAGCATGTCTTAGGCTTGGTAGACCAAGTCTTGGTGATGACTGTGAATCCTTGGTTTT  SS09041
mgm4447903.3|GF8803K02IYGAA 0070700424093f33d7a9a54e60a3d29a    TTGTTCTTGTTCCCGAAGGCTCGCTAACTCACTAACTTTAACCAAGGTCTCAGGTAGAAAGGCTTGTCCGCCAAAACCAGGATTCACAGTCATCACCAAGACTTGGTCTACCAAGCCTAAGACATGCTTAATCGCTTGAACCGGAGTGCCCGGATTGATTACAACACCTGCTTTTACTCCTGCGGCACGGATTTGTTGGAGAGCACCATGGATATGAGGAGTTGCTTCTACGTGGATTGTGATAATATCTGCTCCAGCACGAACGAATTCCTCAATGTGCTTTTTCAGGATTTGTAACCATCAGATGACAGTCAAACACTAATTTGCTATGCGGACGCATACTAGACTACAACACCCGCTCCAAAGGTGATATTAGGCAACAAAGGT SS09041
mgm4447903.3|GF8803K02F5F0Z 00868f3c929c8e663d05ac4d2c0bf8b6    AACAGTTGTCCGTGTTGACAAACCGCGCAAGAATGTGATCATTCCTACTTTGGAAGAAGACCTTGACGGACTTGGTTACCTTCAAGGAAAAGACGTTGACTTTGTAAATAAAAAGCGACTGACGGTGTTCTTCTTGCCCACACTGACGGTGATGTACCAAACATGTACGTGACTCTTCCTGAGCAAGATGCCTTCACTCTTGGCTACACTATCTACTTCTTCGAATTGGCCATCGCCCTTTCAGGTTACTTGAATGCCATCAACCCATTTGACCAACCAGGTGTTGAAGCCTACAAACGCAACATGTTTGCCCTTCTTGGAAAACCAGGATTTGAAGAATTGAGCAAAGAGCTTAACGCACGTTTATAATAGAAGAAAAGAGTGGCTTGCCCACTCTTTTTACTCTCTTTATTCGTAGACATTGGACTCAGGCGAGACTTGTGATATAATATAGAAAGCAAAAAGGCAGACGCCTAGAGACTTTATAGGAGGAACTANGTCAAAAGATATCCGCGTACGCTACGCACCAA  SS06144;SS06174
mgm4447903.3|GF8803K02FMFTS 00868f3c929c8e663d05ac4d2c0bf8b6    GGGAAAGACCAAAAAGGTATTTACCCAACTCAGCAAACTTCTCAACTGACTTGCACTCATTGGGTCAATTTATCCAAGAAGGAACTCGTATCATGTTTGAAACAGTTGTCCGTGTTGACAAACCACGTAAGAACGTGATTATCCCTACTTTGGAAGAAGACCTTGATGGACTTGGTTACCTTCAAGGAAAAGACGTTGACTTTGTAAACAAAAAAGCAACTGACGGTGTTCTTCTTGCCCACACTGACGGTGATGTGCCAAACATGTACGTGACTCTTCCAGAGCAAGACGCTTTCACTCTTGGTTACACTATCTACTTCTTCGAATTGGCAATTGCCCTTTCAGGTTACTTGAATGCCATCAACCCATTTGACCAACCAGGTGTTGAAGCCTACAAACGCAACATGTTTGCCCTTCTTGG   SS06144;SS06174
mgm4447903.3|GF8803K02FZ63L 00868f3c929c8e663d05ac4d2c0bf8b6    AGACTTGCACTCACTTGGTCAATTTATCCAAGAAGGAACTCGTATCATGTTTGAAACAGTTGTCCGTGTTGACAAACCACGTAAGAACGTGATTATCCCTAGCTTGGAAGAAGATCTTGACGGACTTGGTTACCTTCAAGGAAAAGACGTTGACTTTGTAAACAAAAAAGCAACTGACGGTGTTCTTCTTGCCCATACAGACGGTGACGTACCAAATATGTATGTGACTCTTCCAGAGCAAGATGCCTTCACTCTTGGCTACACTATCTACTTCTTCGAATTGGCAATCGCCCTTTCAGGTTACTTGAATGCCATCAACCCATTTGACCAACCAGGTGTTGAAGCCTACAAGCGTAACATGTTTGCCCTTCTTGGGAAACCAGGATTTGAAGAATTGAGCAAAGAGCTTAACGCACGTCTATAATAGAAGAAAAGAGTGGCTTGACCACTTCTTTTTACTCTCTTTATTTCTAGACATTGGACTCAGGCGAGACTTGTGATAT SS06144;SS06174
</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cell border-box-sizing code_cell rendered">
					<div class="input">
						<div class="prompt input_prompt">
							In&nbsp;[&nbsp;]:
						</div>
						<div class="inner_cell">
							<div class="input_area">
								<div class=" highlight hl-ipython2">
									<pre>
 
</pre>
								</div>
								
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<h1 id="Comparing-metagenomes">Comparing metagenomes<a class="anchor-link" href="#Comparing-metagenomes">&#182;</a></h1>
								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<ul>
								<li>mg-compare-taxa</li>
								<li>mg-compare-function</li>
								<li>mg-compare-heatmap</li>
								<li>mg-compare-heamap-plot</li>
								<li>mg-biom-merge</li>
								<li>mg-biom2metadata</li>
								</ul>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<h3 id="Abundance-matrix-for-Refseq">Abundance matrix for Refseq<a class="anchor-link" href="#Abundance-matrix-for-Refseq">&#182;</a></h3>
								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Create a taxonomic abundance matrix for 4 metagenomes for RefSeq annotations.</p>
								<p>mg-compare-taxa.py <br>
								--ids "mgm4441679.3,mgm4441680.3,mgm4441681.3,mgm4441682.3" <br>
								--level class <br>
								--source RefSeq <br>
								--format text <br></p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[1]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-taxa.py --ids <span class="s2">&quot;mgm4441679.3,mgm4441680.3,mgm4441681.3,mgm4441682.3&quot;</span> --level class --source RefSeq --format text
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
								<pre>	mgm4441679.3	mgm4441680.3	mgm4441681.3	mgm4441682.3
								-	5	0	0	19
								Actinobacteria (class)	0	5	4	0
								Bacilli	5	0	23	2
								Betaproteobacteria	1	0	0	0
								Chlamydiae (class)	1	0	0	0
								Clostridia	55	3	27	9
								Deltaproteobacteria	1	1	12	0
								Erysipelotrichi	8	1	0	0
								Gammaproteobacteria	2	0	38	0
								Litostomatea	1	0	0	0
								Mollicutes	1	0	2	1
								Negativicutes	16	0	0	0
								Spirochaetes (class)	0	0	3	0
								Synergistia	7	0	0	0
								unclassified (derived from Archaea)	0	0	0	2
								unclassified (derived from Bacteria)	300	227	318	282
								unclassified (derived from Basidiomycota)	0	0	0	1
								unclassified (derived from Cyanobacteria)	0	1	0	0
								unclassified (derived from Eukaryota)	1	0	1	1
								unclassified (derived from Proteobacteria)	0	0	1	0
								unclassified (derived from Streptophyta)	1	6	11	0
								</pre>
								</div>
								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<h3 id="Project-abundance-data-on-Greengenes-and-retrieve-as-biom-file.">Project abundance data on Greengenes and retrieve as biom file.<a class="anchor-link" href="#Project-abundance-data-on-Greengenes-and-retrieve-as-biom-file.">&#182;</a></h3><p>mg-compare-taxa.py 
								--ids "mgm4447943.3,mgm4447192.3,mgm4447102.3,mgm4447103.3" <br>
								--level family <br>
								--source Greengenes <br>
								--format biom &gt; matrix.greengenes.biom</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Create abundance matrix and dump into a file in biom format.</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[2]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-taxa.py --ids <span class="s2">&quot;mgm4447943.3,mgm4447192.3,mgm4447102.3,mgm4447103.3&quot;</span> --level family --source Greengenes --format biom &gt; matrix.greengenes.biom
								</pre></div>

								</div>
								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Transform biom to tsv.m</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[9]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-biom-view.py -i matrix.greengenes.biom --row_end <span class="m">10</span>
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
								<pre>	mgm4447102.3	mgm4447103.3	mgm4447192.3	mgm4447943.3
								-	21448	44128	19063	39004
								Acetobacteraceae	0	12	0	0
								Acholeplasmataceae	4	2	1	11
								Acidaminococcaceae	2	24	5	110
								Acidithiobacillaceae	0	0	0	2
								Acidothermaceae	0	1	0	0
								Actinomycetaceae	24741	5109	5926	18896
								Aerococcaceae	304	247	162	530
								Aeromonadaceae	0	27	4	0
								Alcaligenaceae	3	22	4	6
								</pre>
								</div>
								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>The biom or tsv file can be used for further analysis with R or the command line tools.</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<h3 id="Heatmap-from-the-command-line">Heatmap from the command line<a class="anchor-link" href="#Heatmap-from-the-command-line">&#182;</a></h3>
								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>First create heatmap data and then plot data.</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[18]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-heatmap.py --help <span class="p">|</span> head -n <span class="m">5</span>
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
								<pre>
								NAME
								    mg-compare-heatmap

								VERSION
								</pre>
								</div>
								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[18]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-heatmap.py --input matrix.greengenes.biom --normalize<span class="o">=</span><span class="m">1</span> --output matrix.heatmap
								</pre></div>

								</div>
								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Need R and matR installed.</p>
								<blockquote><p>export KB_PERL_PATH=/Users/Andi/Development/MG-RAST-Repo/MG-RAST-Tools/tools/lib/</p>
								</blockquote>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Plot raw data:</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[5]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="n">rlib</span><span class="o">=</span><span class="s">&quot;/Users/Andi/Development/MG-RAST-Repo/MG-RAST-Tools/tools/lib/&quot;</span>
								</pre></div>

								</div>
								</div>
								</div>

								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[23]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-heatmap-plot.py --input matrix.greengenes.biom --plot myHeatmap --rlib <span class="nv">$rlib</span> --format biom
								</pre></div>

								</div>
								</div>
								</div>

								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[36]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="kn">from</span> <span class="nn">IPython.display</span> <span class="kn">import</span> <span class="n">Image</span>
								<span class="n">Image</span><span class="p">(</span><span class="n">filename</span><span class="o">=</span><span class="s">&#39;myHeatmap.png&#39;</span><span class="p">)</span> 
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt output_prompt">Out[36]:</div>


								<div class="output_png output_subarea output_execute_result">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC7gAAAu4CAYAAABxFfV5AAAD8GlDQ1BJQ0MgUHJvZmlsZQAAOI2N
								Vd1v21QUP4lvXKQWP6Cxjg4Vi69VU1u5GxqtxgZJk6XpQhq5zdgqpMl1bhpT1za2021Vn/YCbwz4
								A4CyBx6QeEIaDMT2su0BtElTQRXVJKQ9dNpAaJP2gqpwrq9Tu13GuJGvfznndz7v0TVAx1ea45hJ
								GWDe8l01n5GPn5iWO1YhCc9BJ/RAp6Z7TrpcLgIuxoVH1sNfIcHeNwfa6/9zdVappwMknkJsVz19
								HvFpgJSpO64PIN5G+fAp30Hc8TziHS4miFhheJbjLMMzHB8POFPqKGKWi6TXtSriJcT9MzH5bAzz
								HIK1I08t6hq6zHpRdu2aYdJYuk9Q/881bzZa8Xrx6fLmJo/iu4/VXnfH1BB/rmu5ScQvI77m+Bkm
								fxXxvcZcJY14L0DymZp7pML5yTcW61PvIN6JuGr4halQvmjNlCa4bXJ5zj6qhpxrujeKPYMXEd+q
								00KR5yNAlWZzrF+Ie+uNsdC/MO4tTOZafhbroyXuR3Df08bLiHsQf+ja6gTPWVimZl7l/oUrjl8O
								cxDWLbNU5D6JRL2gxkDu16fGuC054OMhclsyXTOOFEL+kmMGs4i5kfNuQ62EnBuam8tzP+Q+tSqh
								z9SuqpZlvR1EfBiOJTSgYMMM7jpYsAEyqJCHDL4dcFFTAwNMlFDUUpQYiadhDmXteeWAw3HEmA2s
								15k1RmnP4RHuhBybdBOF7MfnICmSQ2SYjIBM3iRvkcMki9IRcnDTthyLz2Ld2fTzPjTQK+Mdg8y5
								nkZfFO+se9LQr3/09xZr+5GcaSufeAfAww60mAPx+q8u/bAr8rFCLrx7s+vqEkw8qb+p26n11Aru
								q6m1iJH6PbWGv1VIY25mkNE8PkaQhxfLIF7DZXx80HD/A3l2jLclYs061xNpWCfoB6WHJTjbH0mV
								35Q/lRXlC+W8cndbl9t2SfhU+Fb4UfhO+F74GWThknBZ+Em4InwjXIyd1ePnY/Psg3pb1TJNu15T
								MKWMtFt6ScpKL0ivSMXIn9QtDUlj0h7U7N48t3i8eC0GnMC91dX2sTivgloDTgUVeEGHLTizbf5D
								a9JLhkhh29QOs1luMcScmBXTIIt7xRFxSBxnuJWfuAd1I7jntkyd/pgKaIwVr3MgmDo2q8x6IdB5
								QH162mcX7ajtnHGN2bov71OU1+U0fqqoXLD0wX5ZM005UHmySz3qLtDqILDvIL+iH6jB9y2x83ok
								898GOPQX3lk3Itl0A+BrD6D7tUjWh3fis58BXDigN9yF8M5PJH4B8Gr79/F/XRm8m241mw/wvur4
								BGDj42bzn+Vmc+NL9L8GcMn8F1kAcXgSteGGAABAAElEQVR4AezawREAEBRDQfTfM0YT3mE14M8m
								x8x93/AIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMBn
								gfX5f98TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEn
								YOCuCAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBw
								T8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAE
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								hICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICA
								gbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9
								EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQS
								AgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG
								7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dE
								DI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgI
								GLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi4
								6wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMx
								OIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg
								4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCu
								AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8Tg
								CAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICB
								eyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsO
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMj
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								JAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								DNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbu
								iRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4g
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQ
								EDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw
								cNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgn
								YnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBC
								wMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDA
								XQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6I
								wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkB
								A/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3
								HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIG
								RxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM
								3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgc
								QYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgT49wxQAAQABJREFUQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								JAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								DNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbu
								iRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4g
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhICBeyIGRxAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgbsOECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBCwMA9EYMjCBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDAXQcIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICFg4J6IwREECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYOCuAwQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQEDBwT8TgCAIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwcNcBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgnYnAEAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBhICBeyIGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQICAgbsOECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEBCwMA9EYMjCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQMDAXQcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAICFg4J6IwREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgYOCuAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQ
								EDBwT8TgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAw
								cNcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgIGLgn
								YnAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBi46wAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJAQM3BMxOIIA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDNx1gAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQSAgbuiRgcQYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIG7jpAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgkBA/dEDI4gQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQN3HSBAgAABAgQIECBAgAAB
								AgQIECBAgMBh146JAABgIIT5d40NhjjopT9CgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEg
								cF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29w
								BAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBY
								CAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI
								3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfF
								GxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDA
								ffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0G
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMER
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAh
								IHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBw
								twECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3Bdv
								cAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								WAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								CNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3
								xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWA
								wH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDd
								BggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zB
								EQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBg
								ISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAg
								cLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwX
								b3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC
								98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncb
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZH
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGF
								gMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA
								3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8
								wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								YCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								IHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjc
								F29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2A
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxB
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKpXiw0AAEAASURBVBAgQICA
								wN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAhIHBf
								vMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICBwtwEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI3BdvcAQB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxtgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRscQYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								ICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQWAgI
								3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICNxt
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQWAgL3xRsc
								QYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQICdxsgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3xBkcQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQW
								AgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIC
								dxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYWAwH3x
								BkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMDdBggQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBwX7zBEQQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcBAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AEAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQWAgL3xRscQYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQICdxsgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gYWAwH3xBkcQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								gMDdBggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgISBw
								X7zBEQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAgcLcB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEFgICNwXb3AE
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAjcbYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEFgIC98UbHEGAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAncbIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGFgMB98QZHECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIDA3QYIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYCEgcF+8wREECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIHC3AQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBYCAjcF29wBAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgI3G2AAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBYCAvfFGxxBgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgJ3GyBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBhYDAffEGRxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQICAwN0GCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQGAhIHBfvMERBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQICBwtwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQWAgI3BdvcAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQICNxtgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQWAgL32Ll/3kirLA/A9dou/+vCoukGWSACJCQkCJrNkTbiK7DBBJOTjcj3A+ym
								qxVfA21EykaopUXTGzGJEWpYtVBb3W5w2a7y++7uSHNcE4zU43Or+lbdJzsYn1vnPPcmRj+qimsw
								BAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgIuHsDBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCFgIB7FddgCAIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAQcPcGCBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAKAQH3Kq7BEAQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAg4O4NECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAVAgLuVVyDIQgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBAwN0bIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEqBATcq7gGQxAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgLs3QIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJVCAi4V3ENhiBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAXdvgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSqEBBwr+IaDEGAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECAu7eAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhUISDgXsU1GIIAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEBNy9AQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoQkDAvYprMAQBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQICLh7AwQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBQhYCAexXXYAgCBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQEHD3BggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECgCgEB9yquwRAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgIODuDRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIBAFQIC7lVcgyEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAQMDdGyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBKgQE3Ku4BkMQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAgIC7N0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECVQgIuFdxDYYgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQF3b4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIEqhAQcK/iGgxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgLu3gABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIVCEg4F7FNRiCAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBATcvQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQqEJAwL2KazAEAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECAi4ewMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								UIWAgHsV12AIAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EBBw9wYIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoAoB
								AfcqrsEQBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICDg
								7g0QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBUCAu5V
								XIMhCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQEDA3Rsg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSoEBNyruAZD
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgICAuzdAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlUICLhXcQ2GIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEBd2+AAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKoQEHCv4hoMQYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIC7t4AAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFQhIOBexTUYggABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQE3L0BAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhCQMC9imswBAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgIuHsDBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCFgIB7FddgCAIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAQcPcGCBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAKAQH3Kq7BEAQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAg4O4NECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAVAgLuVVyDIQgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBAwN0bIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIEqBATcq7gGQxAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgLs3QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQJVCAi4V3ENhiBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAXdvgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgSqEBBwr+IaDEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECAu7eAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhUISDgXsU1GIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEBNy9AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBCoQkDAvYprMAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQICLh7AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBQhYCAexXXYAgCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQEHD3BggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECgCgEB9yquwRAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgIODuDRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIBAFQIC7lVcgyEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAQMDdGyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBKgQE3Ku4BkMQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAgIC7N0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								VQgIuFdxDYYgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQF3b4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhAQ
								cK/iGgxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgLu
								3gABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIVCEg4F7F
								NRiCAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBATcvQEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEJAwL2KazAE
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAi4ewMECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUIWAgHsV12AIAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEBBw9wYIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoAoBAfcqrsEQBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICDg7g0QIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBUCAu5VXIMhCBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQEDA3RsgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSoEBNyruAZDECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgICAuzdAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlUICLhXcQ2GIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEBd2+AAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKoQEHCv4hoMQYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIC7t4AAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFQhIOBexTUYggABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQE3L0BAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEKhCQMC9imswBAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgIuHsDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIFCFgIB7FddgCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAQcPcGCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQKAKAQH3Kq7BEAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECAg4O4NECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgEAVAgLuVVyDIQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIEBAwN0bIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIEqBATcq7gGQxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQICAgLs3QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQJVCAi4V3ENhiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAXdvgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgSqEBBwr+IaDEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECAu7eAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAhUISDgXsU1GIIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEBNy9AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBCoQkDAvYprMAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQICLh7AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQ
								hYCAexXXYAgCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								EHD3BggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgCgEB
								9yquwRAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgIODu
								DRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAFQIC7lVc
								gyEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAQMDdGyBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBKgQE3Ku4BkMQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwA4CAgQIECBA
								gAABAgQIrJvA9T/9bjR8/6d1G9u8BAgQIEBgYwT+4x+uN2YXixAgQIAAgXUV+MfvfI/Vut6duQkQ
								IEBgMwT+7ff9ZixiCwIECBAgsKYC//yH/1rTyY1NgMDLCAi4v4yS3yFAgAABAgQIECBAoCqBP4fb
								//jfVc1kGAIECBAg0JLA6dG8pXXtSoAAAQIEqhS4/uN2lXMZigABAgQItCLw+H/8z9+t3LU9CRAg
								QIAAAQIEVi/gqx1Wb+4TCRAgQIAAAQIECKy9wNXV1eiLL74Yffnll2u/iwUIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgTqEfAN7vXchUkIECBAgAABAgQIrI3Ap59+Ovrmm2/+PG/f
								96PPP/98bWY3KAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQL0CvsG93rsxGQEC
								BAgQIECAAIFqBU5OTmK2hw8fRq0gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								kBEQcM/o6SVAgAABAgQIECDQqMAHH3wQm3/88cdRKwgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAhkBATcM3p6CRAgQIAAAQIECDQqsL+/H5tvb29HrSBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECCQERBwz+jpJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIFiAjvFTnIQAQIECBAgQIAAAQIECBAgQIAAAQJNCPz+P/1nxSYu
								2pIECBAgQIAAAQIECBAg8DcF/v1f/W38N3H8CwIECBAgsAqBf1nFh/gMAgRelYBvcH9V8j6XAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBP5KQMD9rzj8AwEC
								BAgQIECAAAECLyMwn89f5tf8DgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG/
								S0DA/e/i8ssECBAgQIAAAQIECPy/wLfffhsQX3/9ddQKAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAhkBAfeMnl4CBAgQIECAAAECjQpcXl7G5r/88kvUCgIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIZAQH3jJ5eAgQIECBAgAABAo0KTCaT2Pztt9+OWkGAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgIyDgntHTS4AAAQIECBAgQKBRgWEYGt3c
								2gQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAssUEHBfpq6zCRAgQIAAAQIECGyo
								wNOnT2Ozhw8fRq0gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBEQcM/o6SVA
								gAABAgQIECDQqMDiN7hfXl42qmBtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								0gIC7qVFnUeAAAECBAgQIECgAYHxeBxbHh8fR60gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgkBEQcM/o6SVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACBYgIC7sUoHUSAAAECBAgQIECgHYHr6+tY9uzsLGoFAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgYyAgHtGTy8BAgQIECBAgAABAqP9/X0KBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBIoICLgXYXQIAQIECBAgQIAAgbYE+r6PhX2De1AoCBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEkgIC7klA7QQIECBAgAABAgRaFBiGIdaezWZR
								KwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBATcM3p6CRAgQIAAAQIECBAY
								TadTCgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSKCAi4F2F0CAECBAgQIECA
								AIF2BXZ3d9td3uYECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJFBQTci3I6jAAB
								AgQIECBAgEAbAl3XxaIHBwdRKwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhk
								BATcM3p6CRAgQIAAAQIECDQqMAxDbL5Yxw8VBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBG4hIOB+CzQtBAgQIECAAAECBAjcCFxcXNz8g4oAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIBAQkDAPYGnlQABAgQIECBAgACB0Wh/fx8DAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgSICAu5FGB1CgAABAgQIECBAoC2Bra2bPyXefPPNtpa3LQECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwNIEblIpS/sIBxMgQIAAAQIECBAgsGkCfd/H
								SicnJ1ErCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQEBNwzenoJECBAgAAB
								AgQIEBgtfps7DgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIZAQH3jJ5eAgQI
								ECBAgAABAgRGk8mEAgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEiAgLuRRgd
								QoAAAQIECBAgQKAtga7r2lrYtgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAisR
								EHBfCbMPIUCAAAECBAgQILBZAsMwxEJ930etIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIJAREHDP6OklQIAAAQIECBAgQGD0/PlzCgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgSKCAi4F2F0CAECBAgQIECAAIF2Bbqua3d5mxMgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBQVEHAvyukwAgQIECBAgAABAu0J7OzstLe0jQkQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBJYiIOC+FFaHEiBAgAABAgQIEGhHoO/7dpa1KQECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwFIFBNyXyutwAgQIECBAgAABApsvcHFxsflL2pAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGAlAgLuK2H2IQQIECBAgAABAgQ2V2Bv
								b29zl7MZAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDASgUE3FfK7cMIECBAgAAB
								AgQIbIZA13WxyNHRUdQKAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAhkBAfeM
								nl4CBAgQIECAAAECjQoMwxCbn5+fR60gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgkBEQcM/o6SVAgAABAgQIECBAYCTg7hEQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAiUEhBwLyXpHAIECBAgQIAAAQINCezs7MS2H374YdQKAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAhkBAfeMnl4CBAgQIECAAAECjQq88cYbsfn7778ftYIAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBARkDAPaOnlwABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgSKCQi4F6N0EAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBATcM3p6CRAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKCYgIB7MUoHESBAgAABAgQIEGhH4MWLF7Hs6elp1AoC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECGQEB94yeXgIECBAgQIAAAQKNCkyn
								09j8u+++i1pBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAEC
								BAgQIECAwOj6+poCAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSICAu5FGB1C
								gAABAgQIECBAoF2Bg4ODdpe3OQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFEB
								AfeinA4jQIAAAQIECBAg0IZA13Wx6Hg8jlpBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAICMg4J7R00uAAAECBAgQIECgUYFhGGLz+XwetYIAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIBARkDAPaOnlwABAgQIECBAgACB0dnZGQUCBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECRQQE3IswOoQAAQIECBAgQIBAWwJd18XC9+7di1pBgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAECBAgQIECgUYHxeByb379/P2oF
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAgHtGTy8BAgQIECBAgACBRgX6
								vo/N5/N51AoCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECGQEB94yeXgIECBAg
								QIAAAQKNCiwG3M/OzhpVsDYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBpAQH3
								0qLOI0CAAAECBAgQINCAwO7ubmz53nvvRa0gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgkBEQcM/o6SVAgAABAgSUIvAZAABAAElEQVQIECDQqMBkMonNj4+Po1YQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyAgIuGf09BIgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAMQEB92KUDiJAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgACBjICAe0ZPLwECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgUExBwL0bpIAIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDICAi4Z/T0EiBAgAABAgQIEGhU4Pz8PDY/PT2NWkGA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgIyDgntHTS4AAAQIECBAgQKBRgYuL
								i9j8+++/j1pBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAEC
								BAgQIECgUYGtrZs/JSaTSaMK1iZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECgt
								cJNKKX2y8wgQIECAAAECBAgQ2FiBxYD77u7uxu5pMQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAgdUKCLiv1tunESBAgAABAgQIENgIgdlsFns8e/YsagUBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBjICAe0ZPLwECBAgQIECAAIFGBYZhiM2fPHkStYIAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBARkDAPaOnlwABAgQIECBAgACB0Z07dygQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQKCIg4F6E0SEECBAgQIAAAQIE2hLoui4W
								3t3djVpBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAECBAgQ
								IECgUYFhGGLz+XwetYIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBARkDAPaOn
								lwABAgQIECBAgACB0enpKQUCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECRQQE
								3IswOoQAAQIECBAgQIBAuwLj8bjd5W1OgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBQVEDAvSinwwgQIECAAAECBAi0J7C15c+K9m7dxgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACB5QhIoizH1akECBAgQIAAAQIENlqg67rY7913341aQYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQCAjIOCe0dNLgAABAgQIECBAoFGBnZ2d2HwymUStIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAREHDP6OklQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWICAu7FKB1EgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAhkBAfeMnl4CBAgQIECAAAECjQr0fR+bT6fTqBUE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgIC7hk9vQQIECBAgAABAgQaFRiG
								ITYXcA8KBQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFJAwD0JqJ0AAQIECBAg
								QIBAiwIHBwex9oMHD6JWECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgICLhn
								9PQSIECAAAECBAgQaFRgb28vNp9MJlErCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECGQEBNwzenoJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAoJiAgHsxSgcRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAQEZAwD2jp5cAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEigkIuBejdBABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIZAQE3DN6egkQIECAAAECBAg0KvDixYvY/OTkJGoFAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAgYyAgHtGTy8BAgQIECBAgACBRgXm83ls/vjx46gVBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBDICAu4ZPb0ECBAgQIAAAQIEGhXY3t6Oze/evRu1ggABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBGQMA9o6eXAAECBAgQIECAQKMCXdfF5oth
								9/ihggABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAtBATcb4GmhQABAgQIECBA
								gEDrArPZLAh+/vnnqBUECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMgIC7hk9
								vQQIECBAgAABAgQIjJ49e0aBAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBEB
								AfcijA4hQIAAAQIECBAg0K7A66+/3u7yNidAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECgqIOBelNNhBAgQIECAAAECBNoQ6LouFt3a8mdFYCgIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgRSApIoKT7NBAgQIECAAAECBNoUGIYhFr+8vIxaQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQCAjIOCe0dNLgAABAgQIECBAgMCo73sKBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBIoICLgXYXQIAQIECBAgQIAAgXYFDg8P213e5gQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAkUFBNyLcjqMAAECBAgQIECAQHsCs9msvaVt
								TIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsBQBAfelsDqUAAECBAgQIECAwGYL
								TCaTWPCTTz6JWkGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgIyDgntHTS4AA
								AQIECBAgQKBRgb29vdh8PB5HrSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQ
								ERBwz+jpJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFi
								AgLuxSgdRIAAAQIECBAgQKAdgWEY2lnWpgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAisTEHBfGbUPIkCAAAECBAgQILA5AtPpNJZ58uRJ1AoCBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECGQEB94yeXgIECBAgQIAAAQKNCnRdF5sv1vFDBQECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIFbCAi43wJNCwECBAgQIECAAIHWBT766KMg+Oyzz6JWECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgICLhn9PQSIECAAAECBAgQaFRgMpnE
								5js7O1ErCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQEBNwzenoJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoJiAgHsxSgcRIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQEZAwD2jp5cAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEigkIuBejdBABAgQIECBA
								gACBdgRms1k7y9qUAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgZQIC7iuj9kEE
								CBAgQIAAAQIENkfg0aNHscxXX30VtYIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBARkDAPaOnlwABAgQIECBAgECjAldXV7H506dPo1YQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQyAgIuGf09BIgQIAAAQIECBBoVODOnTux+TvvvBO1ggABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEBGQMA9o6eXAAECBAgQIECAQKMCXdc1urm1CRAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIElikg4L5MXWcTIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwEsLCLi/NJVfJECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFlCgi4L1PX2QQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDw0gIC7i9N5RcJECBAgAABAgQIEPiLQN/3fylH
								wzBErSBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQERBwz+jpJUCAAAECBAgQ
								INCowPPnz2PzR48eRa0gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBEQcM/o
								6SVAgAABAgQIECDQqMDit7ZfXV01qmBtAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACB0gIC7qVFnUeAAAECBAgQIECgAYGdnZ3Y8ujoKGoFAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAgYyAgHtGTy8BAgQIECBAgACBRgUWv8F9sW6Uw9oECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQKFBATcC0E6hgABAgQIECBAgEBLArPZLNY9OTmJWkGAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgIyDgntHTS4AAAQIECBAgQIDAyDe4ewQECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKlBATcS0k6hwABAgQIECBAgEBDAl3Xxbav
								vfZa1AoCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECGQEB94yeXgIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAoJiDgXozSQQQIECBAgAAB
								AgTaERiGIZadTqdRKwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBATcM3p6
								CRAgQIAAAQIECDQq0HVdbL6/vx+1ggABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gEBGQMA9o6eXAAECBAgQIECAQKMCi9/g/uuvvzaqYG0CBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIHSAgLupUWdR4AAAQIECBAgQKAxgcVvc29sdesSIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgUFhBwLwzqOAIECBAgQIAAAQKtCVxdXbW2sn0JECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgSWJCDgviRYxxIgQIAAAQIECBBoRaDv+1ZWtScBAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCSBQTclwzseAIECBAgQIAAAQKbLrC/v7/pK9qP
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgRQIC7iuC9jEECBAgQIAAAQIENlVg
								GIZNXc1eBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECKxYQcF8xuI8jQIAAAQIE
								CBAgsGkCs9ls01ayDwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwCsSEHB/RfA+
								lgABAgQIECBAgMCmCAi4b8pN2oMAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg8OoF
								BNxf/R2YgAABAgQIECBAgMBaC4zH47We3/AECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQL1CAi413MXJiFAgAABAgQIECCwlgK7u7trObehCRAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIE6hMQcK/vTkxEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBJgUE3Ju8dksTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECgPgEB9/ruxEQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBBoUkDAvclrtzQBAgQIECBAgACBcgLDMJQ7zEkECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQJNCwi4N339lidAgAABAgQIECCQFzg/P88f4gQCBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAEC/ycg4O4ZECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEAVAgLuVVyDIQgQIECAAAECBAisr8Dh4eH6Dm9yAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBqgQE3Ku6DsMQIECAAAECBAgQWD+BruvWb2gT
								EyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIVCkg4F7ltRiKAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC7QkIuLd35zYmQIAAAQIECBAgUFRg
								GIai5zmMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgXQEB93bv3uYECBAgQIAA
								AQIEigicn58XOcchBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBATcvQECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEJAwL2KazAEAQIE
								CBAgQIAAgfUV6Pt+fYc3OQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFUCAu5V
								XYdhCBAgQIAAAQIECKyfwHg8Xr+hTUyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IFClgIB7lddiKAIECBAgQIAAAQJ1C3RdFwPev38/agUBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBjICAe0ZPLwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgUExBwL0bpIAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBDICAi4Z/T0EiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEAxAQH3YpQOIkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIGMgIB7Rk8vAQIECBAgQIAAAQKjvu8pECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECgiIOBehNEhBAgQIECAAAECBNoSGIYhFr64uIhaQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQCAjIOCe0dNLgAABAgQIECBAoFGBra2bPyXu3bvXqIK1CRAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIESgvcpFJKn+w8AgQIECBAgAABAgSaEFgM
								uzexsCUJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSWJiDgvjRaBxMgQIAAAQIE
								CBDYXIG+72O5x48fR60gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBEQcM/o
								6SVAgAABAgQIECBAYHR4eEiBAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBEB
								AfcijA4hQIAAAQIECBAg0JZA13Wx8N7eXtQKAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAhkBAfeMnl4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQKCYg4F6M0kEECBAgQIAAAQIE2hS4vr5uc3FbEyBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIFBcQcC9O6kACBAgQIECAAAECmy8wDEMseXl5GbWCAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAQEZAwD2jp5cAAQIECBAgQIBAowLb29ux+VtvvRW1ggABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBGQMA9o6eXAAECBAgQIECAQKMCiwH3w8PD
								RhWsTYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUFpAwL20qPMIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4FYCAu63YtNEgAABAgQIECBA
								oG2BYRgCYLGOHyoIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI3EJAwP0WaFoI
								ECBAgAABAgQItC4wm82C4OTkJGoFAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gYyAgHtGTy8BAgQIECBAgAABAiPf4O4RECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIlBIQcC8l6RwCBAgQIECAAAECDQl0XRfbHhwcRK0gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgkBEQcM/o6SVAgAABAgQIECDQqMDit7bPZrNGFaxNgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBQWkDAvbSo8wgQIECAAAECBAg0ILC9vR1bHh8fR60gQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBEQcM/o6SVAgAABAgQIECDQqMBiwH1/f79R
								BWsTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiUFhBwLy3qPAIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4lYCA+63YNBEgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAaQEB99KiziNAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBWwkIuN+KTRMBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIlBYQcC8t6jwCBAgQIECAAAEC
								DQhcX1/HltPpNGoFAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYyAgHtGTy8B
								AgQIECBAgACBRgWGYYjNLy4uolYQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								yAgIuGf09BIgQIAAAQIECBBoVODOnTux+YMHD6JWECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEMgICLhn9PQSIECAAAECBAgQaFRgb28vNj88PIxaQYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQCAjIOCe0dNLgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAsUEBNyLUTqIAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBDICAu4ZPb0ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgUExAwL0YpYMIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAECBAgQIECgUYGzs7PY/IcffohaQYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAjIOCe0dNLgAABAgQIECBAoFGB+Xwem//0009R
								KwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBATcM3p6CRAgQIAAAQIECDQq
								sLV186fE3bt3G1WwNgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQGmBm1RK6ZOd
								R4AAAQIECBAgQIDAxgosfoP7jz/+uLF7WowAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQGC1AgLuq/X2aQQIECBAgAABAgQ2TmAx7L5xy1mIAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIEBgpQIC7ivl9mEECBAgQIAAAQIENkOg67pY5OjoKGoFAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgYyAgHtGTy8BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIFBMQcC9G6SACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQyAgIuGf09BIgQIAAAQIECBBoVGAYhtj8t99+i1pBgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICMg4J7R00uAAAECBAgQIECAwOjy8pICAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSICAu5FGB1CgAABAgQIECBAoF2B8f+y
								c2+7cRVbG0C7+mB3x0gJCQgh8Q68/+MgIm4Cggg7nT6u/xd7p5wNSbBdtVbXYVyl4nTNmnNM37T0
								KatVv8ObnAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIKuAgHtWTsUIECBAgAAB
								AgQI9CcQQuhvaBMTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiMIiDgPgqrogQI
								ECBAgAABAgT6Edhut/0Ma1ICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFRBQTc
								R+VVnAABAgQIECBAgED7AqfTqf0hTUiAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IDCJgID7JMweIUCAAAECBAgQINCuwHK5bHc4kxEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECEwqIOA+KbfHCBAgQIAAAQIECLQnEEJobygTESBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIXERAwP0i7B4lQIAAAQIECBAg0I7A+XxuZxiTECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIXFRAwP2i/B4nQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgQ8CAu4fJPxJgAABAgQIECBAgMCTBPwP7k9ic4kAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOATAgLun0DxIwIECBAgQIAAAQIEHi4wDMPDP+yTBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBL4gIOD+BRz/RIAAAQIECBAgQIDAvwss
								l8t//5BPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEHiAgID7A5B8hAABAgQI
								ECBAgACBzwuEED7/j/6FAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwCMEBNwf
								geWjBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDCegID7
								eLYqEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAjBATc
								H4HlowQIECBAgAABAgQI/FNgv9//84d+QoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQOAJAgLuT0BzhQABAgQIECBAgACBe4Hz+Xz/FycCBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECCQIC7gl4rhIgQIAAAQIECBAgMJtdXV1hIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIJBFQMA9C6MiBAgQIECAAAECBPoVWK/X/Q5vcgIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgawCAu5ZORUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgacKCLg/Vc49AgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEMgqIOCelVMxAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEHiqgID7U+XcI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIGsAgLuWTkVI0CAAAECBAgQINCfwPv37/sb2sQECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKjCAi4j8KqKAECBAgQIECAAIF+BA6HQz/DmpQA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBUAQH3UXkVJ0CAAAECBAgQINC+wM3N
								TftDmpAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGASAQH3SZg9QoAAAQIECBAg
								QKBdgfnc14p2t2syAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMC0ApIo03p7jQAB
								AgQIECBAgEBzAvv9vrmZDESAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHAZAQH3
								y7h7lQABAgQIECBAgEAzAofDoZlZDEKAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IHBZAQH3y/p7nQABAgQIECBAgED1AsvlsvoZDECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIFCGgIB7GXvQBQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBLoXEHDv/lcAAAECBAgQIECAAIE0gf1+n1bAbQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQL/FRBw96tAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAkUICLgXsQZNECBAgAABAgQIEKhX4Orqqt7mdU6AAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIFCUgIB7UevQDAECBAgQIECAAIH6BEII9TWtYwIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSIFBNyLXIumCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAg0J+AgHt/OzcxAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEihQQcC9yLZoiQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBAfwIC7v3t3MQECBAgQIAAAQIEsgqcz+es9RQjQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDoV0DAvd/dm5wAAQIECBAgQIBAFoHD4ZCljiIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEBNz9DhAgQIAAAQIECBAgkCSwWq2S
								7rtMgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4IOAgPsHCX8SIECAAAECBAgQ
								IPBggRBC/Oy3334bzw4ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEUgQE3FP0
								3CVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAIC7tko
								FSJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBFAEB9xQ9
								dwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgm4CAezZK
								hQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgRUDAPUXP
								XQIECBAgQIAAAQIEZsMwUCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQRUDA
								PQujIgQIECBAgAABAgT6Evg41L7dbvsa3rQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQKjCQi4j0arMAECBAgQIECAAIF2BUIIcbjnz5/HswMBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBFAEB9xQ9dwkQIECAAAECBAh0KrBcLuPkL1++jGcHAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAikCAu4peu4SIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQDYBAfdslAoRIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQIqAgHuKnrsECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgkE1AwD0bpUIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgkCIg4J6i5y4BAgQIECBAgACBTgXO53OcfLfbxbMDAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRQBAfcUPXcJECBAgAABAgQIdCpwOp3i
								5L/88ks8OxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBIERBwT9FzlwABAgQI
								ECBAgECnAiGEOPnV1VU8OxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBIERBw
								T9FzlwABAgQIECBAgACB2XK5pECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAg
								i4CAexZGRQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAg
								VUDAPVXQfQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDI
								IiDgnoVREQIECBAgQIAAAQL9ChwOh36HNzkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgEBWAQH3rJyKESBAgAABAgQIEOhDYBiGOOjt7W08OxAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBBIERBwT9FzlwABAgQIECBAgACB2YsXLygQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQyCIg4J6FURECBAgQIECAAAEC/Qpst9t+hzc5AQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVgEB96ycihEgQIAAAQIECBDoQyCEEAe9vr6OZwcCBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECKQIC7il67hIgQIAAAQIECBAgMFssFhQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIZBEQcM/CqAgBAgQIECBAgACBvgSG
								YYgDv3nzJp4dCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKQICLin6LlLgAAB
								AgQIECBAgMDseDxSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJBFQMA9C6Mi
								BAgQIECAAAECBPoV+Prrr/sd3uQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJZ
								BQTcs3IqRoAAAQIECBAgQKAPgRBCHHSz2cSzAwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIEUAQH3FD13CRAgQIAAAQIECBCYHY9HCgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgSyCAi4Z2FUhAABAgQIECBAgEBfAsMwxIF3u108OxAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBBIERBwT9FzlwABAgQIECBAgECnAovFIk7+3XffxbMDAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRQBAfcUPXcJECBAgAABAgQIdCown99/lbi5
								uelUwdgECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK5Be5TKbkrq0eAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBB4hIOD+CCwfJUCAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHxBATcx7NVmQABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQeISDg/ggsHyVAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB8QQE3MezVZkAAQIE
								CBAgQIBAswKn0ynO9vbt23h2IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAi
								IOCeoucuAQIECBAgQIAAgU4FzudznPy3336LZwcCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECKQIC7il67hIgQIAAAQIECBDoVCCEECffbDbx7ECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIEAgRUDAPUXPXQIECBAgQIAAAQIEZvO5rxV+DQgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBPIISKLkcVSFAAECBAgQIECAQFcCwzDEeW9vb+PZgQABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgECKgIB7ip67BAgQIECAAAECBAjM7u7uKBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIIiDgnoVREQIECBAgQIAAAQL9CqzX
								636HNzkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBWAQH3rJyKESBAgAABAgQI
								EOhPYD73taK/rZuYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDCOgCTKOK6qEiBA
								gAABAgQIEOhG4HQ6dTOrQQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMYVEHAf
								11d1AgQIECBAgAABAs0LCLg3v2IDEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQm
								ExBwn4zaQwQIECBAgAABAgTaFFgsFm0OZioCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIHJBQTcJyf3IAECBAgQIECAAIG2BHa7XVsDmYYAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQOBiAgLuF6P3MAECBAgQIECAAIE2BNbrdRuDmIIAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQODiAgLuF1+BBggQIECAAAECBAjULTCf+1pR9wZ1T4AAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAoR0ASpZxd6IQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQJdCwi4d71+wxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQKAcAQH3cnahEwIECBAgQIAAAQJVChyPxyr71jQBAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEB5AgLu5e1ERwQIECBAgAABAgSqEtjtdlX1q1kC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFyBQTcy92NzggQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINCVgIB7V+s2LAECBAgQIECAAIH8As+e
								PctfVEUCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEuBQTcu1y7oQkQIECAAAEC
								BAjkE5jPfa3Ip6kSAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBvAUmUvvdvegIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBQjIOBezCo0QoAA
								AQIECBAgQKBOgWEY6mxc1wQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAsUJCLgX
								txINESBAgAABAgQIEKhL4O7urq6GdUuAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IFCsgIB7savRGAECBAgQIECAAIE6BPwP7nXsSZcECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgRoEBNxr2JIeCRAgQIAAAQIECBQssFgsCu5OawQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAjUJCLjXtC29EiBAgAABAgQIEChQ4Pr6usCutESAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIFCjgIB7jVvTMwECBAgQIECAAIGCBHa7XUHdaIUAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBmAQH3mrendwIECBAgQIAAAQIFCNzc3BTQhRYIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRaEBBwb2GLZiBAgAABAgQIECAwsUAIIb74
								1VdfxbMDAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRQBAfcUPXcJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIJuAgHs2SoUIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIEVAwD1Fz10CBAgQIECA
								AAECnQoMwxAnf/v2bTw7ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEEgREHBP
								0XOXAAECBAgQIECAAIHZ8XikQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCCL
								gIB7FkZFCBAgQIAAAQIECPQrsFqt+h3e5AQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAlkFBNyzcipGgAABAgQIECBAoD+BEEJ/Q5uYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIEBgFAEB91FYFSVAgAABAgQIECDQj8B2u+1nWJMSIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAiMKiDgPiqv4gQIECBAgAABAgTaF5jPfa1of8smJECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAhMIyCJMo2zVwgQIECAAAECBAg0JRBCiPO8fPkynh0IECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpAgIuKfouUuAAAECBAgQIECAwMz/4O6XgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIJeAgHsuSXUIECBAgAABAgQIdCQwDEOc
								9t27d/HsQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCBFQMA9Rc9dAgQIECBA
								gAABAp0KhBDi5KvVKp4dCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKQICLin
								6LlLgAABAgQIECBAoFOB5XIZJ//hhx/i2YEAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								6Y3nIgAAQABJREFUCBAgQIBAioCAe4qeuwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECCQTUDAPRulQgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECCQIiDgnqLnLgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhkExBwz0apEAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAikCAi4p+i5S4AAAQIECBAgQKBTgWEY4uTn8zmeHQgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAikCAi4p+i5S4AAAQIECBAgQKBTgePxGCd//fp1PDsQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQSBEQcE/Rc5cAAQIECBAgQIAAgZn/
								wd0vAQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQC4BAfdckuoQIECAAAECBAgQ
								6EgghBCnXa/X8exAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIEVAwD1Fz10C
								BAgQIECAAAECBGbDMFAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkEVAwD0L
								oyIECBAgQIAAAQIE+hL4ONT+66+/9jW8aQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBEYTEHAfjVZhAgQIECBAgAABAn0IhBD6GNSUBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECowsIuI9O7AECBAgQIECAAAECbQus1+u2BzQdAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIDAZAIC7pNRe4gAAQIECBAgQIBAmwLDMLQ5mKkIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQmFxBwn5zcgwQIECBAgAABAgTaEtjv920NZBoCBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIGLCQi4X4zewwQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECDwsYCA+8cazgQIECBAgAABAgQIPFpgt9s9+o4LBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBD4lIOD+KRU/I0CAAAECBAgQIEDgwQKb
								zebBn/VBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAl8SEHD/ko5/I0CAAAEC
								BAgQIEDgkwIhhPjzV69exbMDAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRQB
								AfcUPXcJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIJuA
								gHs2SoUIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIEVA
								wD1Fz10CBAgQIECAAAECBGbDMFAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								kEVAwD0LoyIECBAgQIAAAQIE+hL4ONR+d3fX1/CmJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQGE1AwH00WoUJECBAgAABAgQItCsQQojDPX/+PJ4dCBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECKQICLin6LlLgAABAgQIECBAoFOB5XIZJ//mm2/i2YEAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAioCAe4qeuwQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQTUDAPRulQgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQIiDgnqLnLgECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkExBwz0apEAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAikCAi4p+i5S4AAAQIECBAgQKBTgfP5HCff7/fx
								7ECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgRUDAPUXPXQIECBAgQIAAAQKd
								CpxOpzj569ev49mBAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQIqAgHuKnrsE
								CBAgQIAAAQIECMxWqxUFAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlkEBNyz
								MCpCgAABAgQIECBAoC+BEEIc+OrqKp4dCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECKQICLin6LlLgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAtkEBNyzUSpEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAikCAu4peu4SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAQDYBAfdslAoRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAQIqAgHuKnrsECBAgQIAAAQIEOhUYhiFOfjgc4tmBAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQIqAgHuKnrsECBAgQIAAAQIECMx+//13CgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgSyCAi4Z2FUhAABAgQIECBAgEC/Avv9vt/hTU6AAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIJBVQMA9K6diBAgQIECAAAECBPoTWC6X/Q1tYgIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVEEBNxHYVWUAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBB4rIOD+WDGfJ0CAAAECBAgQIEDgfwQOh8P//N1f
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDxVQMD9qXLuESBAgAABAgQIECDw
								l8B87muFXwUCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE8ApIoeRxVIUCAAAEC
								BAgQINCtQAih29kNToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkFdAwD2vp2oE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg8EQBAfcnwrlG
								gAABAgQIECBAgMB/BM7nMwoCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQQE
								3LMwKkKAAAECBAgQIECgX4H53NeKfrdvcgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBAXgFJlLyeqhEgQIAAAQIECBDoTmAYhu5mNjABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgMA4AgLu47iqSoAAAQIECBAgQKAbgfV63c2sBiVAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEBhXQMB9XF/VCRAgQIAAAQIECDQvcDqdmp/RgAQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAtMICLhP4+wVAgQIECBAgAABAs0KzOe+VjS7XIMRIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBCYWkESZGNxzBAgQIECAAAECBFoQCCHEMV69ehXPDgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRSBATcU/TcJUCAAAECBAgQIEBgdjwe
								KRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIIiDgnoVREQIECBAgQIAAAQJ9
								CQzDEAfe7Xbx7ECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgRUDAPUXPXQIE
								CBAgQIAAAQKdCszn918lvv/++04VjE2AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IJBb4D6VkruyegQIECBAgAABAgQINCuwWCzibJvNJp4dCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECKQICLin6LlLgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAtkEBNyzUSpEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAikCAu4peu4SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQDYBAfdslAoRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQIqAgHuKnrsECBAgQIAAAQIEOhU4n89x8u12G88OBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBFIEBNxT9NwlQIAAAQIECBAg0KnAMAxxcgH3SOFAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQKCDgngjoOgECBAgQIECAAIEeBTabTRz7xx9/
								jGcHAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAikCAu4peu4SIECAAAECBAgQ
								6FTg+vo6Tn5zcxPPDgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRSBATcU/Tc
								JUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFsAgLu2SgV
								IkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEUAQH3FD13
								CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCCbgIB7NkqF
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCBFQMA9Rc9d
								AgQIECBAgAABAp0K3N7exsl/+umneHYgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgkCIg4J6i5y4BAgQIECBAgACBTgWOx2Oc/Oeff45nBwIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIpAgLuKXruEiBAgAABAgQIEOhUYD6//yrx4sWLThWMTYAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgkFvgPpWSu7J6BAgQIECAAAECBAg0KxBCiLMtFot4diBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQIiDgnqLnLgECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkExBwz0apEAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAikCAi4p+i5S4AAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLZBATcs1EqRIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIpAgLuKXruEiBAgAABAgQIEOhU4Hg8
								xsnfvHkTzw4ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEUgQE3FP03CVAgAAB
								AgQIECDQqcAwDHHyP//8M54dCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKQI
								CLin6LlLgAABAgQIECBAoFOBEEKc/NmzZ/HsQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQCBFQMA9Rc9dAgQIECBAgAABAgRmH4fdcRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBBIERBwT9FzlwABAgQIECBAgECnAsMwxMn/+OOPeHYgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgkCIg4J6i5y4BAgQIECBAgAABArP9fk+BAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQBYBAfcsjIoQIECAAAECBAgQ6FdgvV73O7zJCRAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsgoIuGflVIwAAQIECBAgQIBAfwIhhP6GNjEB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAoAgLuo7AqSoAAAQIECBAgQKAfgePx
								2M+wJiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEBhVQMB9VF7FCRAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOChAgLuD5XyOQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAYVUDAfVRexQkQIECAAAEC
								BAi0L3A4HNof0oQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKTCAi4T8LsEQIE
								CBAgQIAAAQLtCqzX63aHMxkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCkAgLu
								k3J7jAABAgQIECBAgEB7AiGE9oYyEQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								wEUEBNwvwu5RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EPi7gID730X8nQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQuIiDgfhF2jxIgQIAAAQIECBBoR+B4PLYzjEkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQuKiDgflF+jxMgQIAAAQIECBCoX2C329U/hAkIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgSKEBBwL2INmiBAgAABAgQIECBQr8B87mtFvdvTOQECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECgLAFJlLL2oRsCBAgQIECAAAEC1Qms1+vqetYwAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAmQIC7mXuRVcECBAgQIAAAQIEqhEIIVTTq0YJECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTKFhBwL3s/uiNAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEA3AgLu3azaoAQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEChbQMC97P3ojgABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAt0ICLh3s2qDEiBAgAABAgQIEBhHYLvdjlNY
								VQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAge4EBNy7W7mBCRAgQIAAAQIECOQV
								OB6PeQuqRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0K2AgHu3qzc4AQIECBAg
								QIAAgTwCz549y1NIFQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAge4FBNy7/xUA
								QIAAAQIECBAgQCBNYLFYpBVwmwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMB/
								BQTc/SoQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBEC
								Au5FrEETBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQICDg
								7neAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBIoQEHAv
								Yg2aIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEBd78D
								BAgQIECAAAECBAgkCdzd3SXdd5kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDA
								BwEB9w8S/iRAgAABAgQIECBA4EkCwzA86Z5LBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBP4uIOD+dxF/J0CAAAECBAgQIEDgUQI3NzeP+rwPEyBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEPicgID752T8nAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQmFRBwn5TbYwQIECBAgAABAgTaE7i7u2tvKBMRIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAhcREDA/SLsHiVAgAABAgQIECDQjkAIoZ1hTEKAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHBRAQH3i/J7nAABAgQIECBAgED9Asvlsv4hTECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCEgIB7EWvQBAECBAgQIECAAIF6BYZh
								qLd5nRMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBQlIOBe1Do0Q4AAAQIECBAg
								QKA+gd1uV1/TOiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEChSQMC9yLVoigAB
								AgQIECBAgEA9AiGEeprVKQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQNECAu5F
								r0dzBAgQIECAAAECBMoXuL6+Lr9JHRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CFQhIOBexZo0SYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gfYFBNzb37EJCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								UIWAgHsVa9IkAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								2hcQcG9/xyYkQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBA
								FQIC7lWsSZMECBAgQIAAAQIEyhUYhqHc5nRGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBQlYCAe1Xr0iwBAgQIECBAgACB8gR2u115TemIAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECgSgEB9yrXpmkCBAgQIECAAAEC5QjM575WlLMNnRAgQIAAAQIECBAgQIAAAQIE
								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
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBhwgIuD9EyWcI
								ECBAgAABAgQIEPiswDAMn/03/0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDg
								MQIC7o/R8lkCBAgQIECAAAECBP4hIOD+DxI/IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQeKKAgPsT4VwjQIAAAQIECBAgQOA/AqvVCgUBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBLAIC7lkYFSFAgAABAgQIECDQr8Byuex3eJMTIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhkFRBwz8qpGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAg8VUDA/aly7hEgQIAAAQIECBAg8JfA8XgkQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQCCLgIB7FkZFCBAgQIAAAQIECPQrIODe7+5NToAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDILSDgnltUPQIECBAgQIAAAQKdCSwWi84mNi4BAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMBYAgLuY8mqS4AAAQIECBAgQKATgWEYOpnU
								mAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmMLCLiPLaw+AQIECBAgQIAAgcYF
								BNwbX7DxCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQITCgi4T4jtKQIECBAgQIAA
								AQItClxdXbU4lpkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQuICDgfgF0TxIg
								QIAAAQIECBBoSSCE0NI4ZiFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELiggID7
								BfE9TYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQL3AgLu
								9xZOBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHBBAQH3
								C+J7mgABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTuBQTc
								7y2cCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOCCAgLu
								F8T3NAECBAgQIECAAIEWBM7ncwtjmIEAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QKAAAQH3ApagBQIECBAgQIAAAQI1CwzDUHP7eidAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEChIQMC9oGVohQABAgQIECBAgECNAtfX1zW2rWcCBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIECBQTcC1yKlggQIECAAAECBAjUJPDu3bua2tUrAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIBAwQIC7gUvR2sECBAgQIAAAQIEahCYz32tqGFPeiRAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1CAgiVLDlvRIgAABAgQIECBAoGCB5XJZcHdaI0CA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqElAwL2mbemVAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECDQsIuDe8XKMRIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgJgEB95q2pVcCBAgQIECAAAECBQqcz+cC
								u9ISAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAjQIC7jVuTc8ECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoUEDAvcGlGokAAQIECBAgQIDA
								lAKbzWbK57xFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQsICAe8PLNRoBAgQI
								ECBAgACBKQRCCFM84w0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEOBATcO1iy
								EQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCDgIB7DVvS
								IwECBAgQIECAAIGCBXa7XcHdaY0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAm
								AQH3mralVwIECBAgQIAAAQIFCgi4F7gULREgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEKhUQcK90cdomQIAAAQIECBAgUIrAarUqpRV9ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIVC4g4F75ArVPgAABAgQIECBA4NIC5/P50i14nwABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAoBEBAfdGFmkMAgQIECBAgAABApcSCCFc6mnvEiBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQINCYg4N7YQo1DgAABAgQIECBAYGqBzWYz9ZPeI0CAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQaFRAwL3RxRqLAAECBAgQIECAwFQC/gf3qaS9Q4AA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBoX0DAvf0dm5AAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJVCAi4V7EmTRIgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKB9AQH39ndsQgIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFQhIOBexZo0SYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgfYFBNzb37EJCRAgQIAAAQIECIwqsNvtRq2v
								OAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQD8CAu797NqkBAgQIECAAAECBEYR
								eP/+/Sh1FSVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEOhPQMC9v52bmAABAgQI
								ECBAgEBWgfV6nbWeYgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAv0KCLj3u3uT
								EyBAgAABAgQIEMgiIOCehVERAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB/xcQ
								cPdrQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJFCAi4
								F7EGTRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAgLvf
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAoQkDAvYg1
								aIIAAQIECBAgQIBAvQLDMNTbvM4JECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSK
								EhBwL2odmiFAgAABAgQIECBQn8B2u62vaR0TIECAAAECBAgQIECAAAECBAgQ+D927m23bZwLA2gp
								BW1RFJj3f8i5m2mRg8n/mHaQNI0tkRI3ua6SOBK19/p8Y+CDCRAgQIAAAQIECBAgQIAAAQJdCii4
								dxmLoQgQIECAAAECBAjEEfAN7nGyMikBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								oHcBBffeEzIfAQIECBAgQIAAgc4F1nXtfELjESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIRBFQcI+SlDkJECBAgAABAgQIdCrgG9w7DcZYBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIGAAgruAUMzMgECBAgQIECAAIGeBB4fH3saxywECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQKBBRTcA4dndAIECBAgQIAAAQI9CCyLjxU95GAGAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgMAIApooI6RoBwIECBAgQIAAAQInCnz9+vXEp3s0AQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDASAIK7iOlaRcCBAgQIECAAAECJwiUUk54qkcS
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiMKKDgPmKqdiJAgAABAgQIECBwoMDD
								w8OBT/MoAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBkQUU3EdO124ECBAgQIAA
								AQIEDhD4+PHjAU/xCAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRkEFNxnSNmO
								BAgQIECAAAECBBoK/PHHHw1PdzQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMBM
								AgruM6VtVwIECBAgQIAAAQINBP78888GpzqSAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIEBgRgEF9xlTtzMBAgQIECBAgACBigJPT08VT3MUAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIDAzAIK7jOnb3cCBAgQIECAAAECFQS+fPlS4RRHECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEPjwQcHdu4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEuhBQcO8iBkMQIECAAAECBAgQiCtQSok7vMkJECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgS6ElBw7yoOwxAgQIAAAQIECBCIJ/D333/HG9rEBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECXQoouHcZi6EIECBAgAABAgQIxBFIKcUZ1qQE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJdCyi4dx2P4QgQIECAAAECBAj0L7As
								Plb0n5IJCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIxBDRRYuRkSgIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAwvoOA+fMQWJECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQAwBBfcYOZmSAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECwwsouA8fsQUJECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQQ0DBPUZOpiRAgAABAgQIECDQ
								rUAppdvZDEaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBLQME9Vl6mJUCAAAEC
								BAgQINCdwMPDQ3czGYgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCCmgIJ7zNxM
								TYAAAQIECBAgQKAbgZRSN7MYhAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAILaA
								gnvs/ExPgAABAgQIECBA4HSBy+Vy+gwGIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQGENAwX2MHG1BgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACB8AIK7uEjtAABAgQIECBAgACBcwVSSucO4OkECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQLDCCi4DxOlRQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIBBbQME9dn6mJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAwDACCu7DRGkRAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIxBZQcI+dn+kJECBAgAABAgQInC6Qcz59BgMQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAiMIaDgPkaOtiBAgAABAgQIECBwmkBK6bRnezABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgMBYAgruY+VpGwIECBAgQIAAAQKHC5RSDn+mBxIgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECIwpoOA+Zq62IkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAQDgBBfdwkRmYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECYwoouI+Zq60IECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECAQTkDBPVxkBiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgMCYAgruY+ZqKwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECIQTUHAPF5mBCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgMKaAgvuYudqKAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAEC4QQU3MNFZmACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAiMKaDgPmautiJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgEA4AQX3cJEZmAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAmMKKLiPmautCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgEE5AwT1cZAYmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIDAmAIK7mPmaisCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAiEE1BwDxeZgQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIDCmgIL7mLnaigABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAuEEFNzDRWZgAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIjCmg4D5mrrYiQIAAAQIECBAgcJjAsvhYcRi2BxEgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEBhfQRBk8YOsRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIEAgioCCe5SkzEmAAAECBAgQIECgU4Gcc6eTGYsAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQCCagIJ7tMTMS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgUEFFNwHDdZaBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQiCag4B4tMfMSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIEBgUAEF90GDtRYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgSiCSi4R0vMvAQIECBAgAABAgQ6E1gWHys6i8Q4BAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIGwApooYaMzOAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBMYSUHAfK0/bECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAIKyAgnvY6AxOgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBsQQU3MfK0zYECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAIK6DgHjY6gxMgQIAAAQIECBDoQyDn3McgpiBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEAgvoOAePkILECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYAwBBfcxcrQFAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEwgsouIeP0AIECJpGJIMAAEAASURBVBAgQIAAAQIE
								zhVIKZ07gKcTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgMI6DgPkyUFiFAgAAB
								AgQIECBwjkAp5ZwHeyoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMBwAgruw0Vq
								IQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQUUHCPmZup
								CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMJyAgvtwkVqI
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECMQUU3GPmZmoC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgMJ6DgPlykFiJA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBMAQX3mLmZmgAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAsMJKLgPF6mFCBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEFNAwT1mbqYmQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAcAIK7sNFaiECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEFFBwj5mbqQkQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDCcgIL7cJFaiAABAgQI
								ECBAgMCxAimlYx/oaQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAsMKKLgPG63F
								CBAgQIAAAQIECBwjUEo55kGeQoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMLyA
								gvvwEVuQAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECMQQU
								3GPkZEoCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgML6Dg
								PnzEFiRAgAABAgQIECDQVmBd17YPcDoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gMA0Agru00RtUQIECBAgQIAAAQJtBJbFx4o2sk4lQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECMwnoIkyX+Y2JkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAQJcCCu5dxmIoAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIzCeg4D5f5jYmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIBAlwIK7l3GYigCBAgQIECAAAECcQRyznGGNSkBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEDXAgruXcdjOAIECBAgQIAAAQL9C6SU+h/ShAQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAiEEFNxDxGRIAgQIECBAgAABAv0K3N3d9TucyQgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBEIJKLiHisuwBAgQIECAAAECBPoTWBYfK/pLxUQECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgZgCmigxczM1AQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEhhNQcB8uUgsRIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgpoCCe8zcTE2AAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIHhBBTch4vUQgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEIgpoOAeMzdTEyBAgAABAgQIEOhG4OHhoZtZDEKAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBbQME9dn6mJ0CAAAECBAgQIHC6QCnl9BkM
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMIaAgvsYOdqCAAECBAgQIECAwGkC
								y+JjxWn4HkyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQGExAE2WwQK1DgAABAgQI
								ECBA4GgB3+B+tLjnESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTGFVBwHzdbmxEg
								QIAAAQIECBA4RCDnfMhzPIQAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGB8AQX3
								8TO2IQECBAgQIECAAIGmAimlpuc7nAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								YB4BBfd5srYpAQIECBAgQIAAgSYCnz59anKuQwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBOYTUHCfL3MbEyBAgAABAgQIEKgqUEqpep7DCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIE5hVQcJ83e5sTIECAAAECBAgQqCJwuVyqnOMQAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgru3gMECBAgQIAAAQIECOwSWNd11/1uJkCAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIPAsoOD+LOEnAQIECBAgQIAAAQKbBL58+bLpPjcRIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQeCmg4P5SxN8ECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgcIqAgvsp7B5KgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAi8FFNxfivibAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBE4RUHA/hd1DCRAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOClgIL7SxF/EyBAgAABAgQIECBwk0Ap5abr
								XUyAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgLQEF97dkvE6AAAECBAgQIECA
								wFUC3759u+o6FxEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBB4T0DB/T0h/ydA
								gAABAgQIECBA4LcCvsH9tzz+SYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgcIOA
								gvsNWC4lQIAAAQIECBAgQOC1wLqur1/0CgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIENAgruG9DcQoAAAQIECBAgQIDATwHf4P7Twm8ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQL7BBTc9/m5mwABAgQIECBAgMD0Avf399MbACBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEKgjoOBex9EpBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQILBTQMF9J6DbCRAgQIAAAQIECMwusK7r7AT2J0CAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQqCSg4F4J0jEECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgsE9AwX2fn7sJECBAgAABAgQITC+Qc57eAAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgEAdAQX3Oo5OIUCAAAECBAgQIDCtQEpp2t0tToAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUFdAwb2up9MIECBAgAABAgQITCfgG9yni9zC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFmAgruzWgdTIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK3CCi436LlWgIECBAgQIAAAQIEXgms
								6/rqNS8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ2CKg4L5FzT0ECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUF1Awb06qQMJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYIuAgvsWNfcQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQHUBBffqpA4kQIAAAQIE
								CBAgMJfA5XKZa2HbEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQINBNQcG9G62AC
								BAgQIECAAAECcwjknOdY1JYECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLNBRTc
								mxN7AAECBAgQIECAAIGxBZbFx4qxE7YdAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QOA4AU2U46w9iQABAgQIECBAgMCQAuu6DrmXpQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBI4XUHA/3twTCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQOAXAgruv0DxEgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgcL6Dgfry5JxIgQIAAAQIECBAYSuByuQy1j2UIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgTOE1BwP8/ekwkQIECAAAECBAgMIZBzHmIPSxAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECJwvoOB+fgYmIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIF/Cyi4exsQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAQBcCCu5dxGAIAgQIECBAgAABAnEFUkpxhzc5AQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVwIK7l3FYRgCBAgQIECAAAEC8QSWxceKeKmZmAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDQp4AmSp+5mIoAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLTCSi4Txe5hQkQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINCngIJ7n7mYigABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAtMJKLhPF7mFCRAgQIAAAQIECNQVyDnXPdBpBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC0woouE8bvcUJECBAgAABAgQI1BEopdQ5
								yCkECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLTCyi4T/8WAECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIE+BBTc+8jBFAQIECBAgAABAgTC
								CqzrGnZ2gxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECPQloODeVx6mIUCAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwLQCCu7TRm9xAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI9CWg4N5XHqYhQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAtAIK7tNGb3ECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAj0JaDg3lcepiFAgAABAgQI
								ECAQTiDnHG5mAxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECPQpoODeZy6mIkCA
								AAECBAgQIBBGoJQSZlaDEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI9C2g4N53
								PqYjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDANAIK7tNE
								bVECBAgQIECAAAECbQTWdW1zsFMJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSm
								E1Bwny5yCxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKBP
								AQX3PnMxFQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKYT
								UHCfLnILEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoE8B
								Bfc+czEVAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEphNQ
								cJ8ucgsTIECAAAECBAgQqCtwuVzqHug0AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBaQUU3KeN3uIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBDoS0DBva88TEOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AIFpBRTcp43e4gQIECBAgAABAgTqCKzrWucgpxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECEwvoOA+/VsAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBPoQUHDvIwdTECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAYHoBBffp3wIACBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAg0IeAgnsfOZiCAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAEC0wsouE//FgBAgAABAgQIECBAYJ/A5XLZd4C7CRAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECPxfQMHdW4EAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIEuhBQcO8iBkMQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAgIK79wABAgQIECBAgAABArsE1nXddb+bCRAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECDwLKLg/S/hJgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAqcKKLifyu/hBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIPAsoOD+LOEnAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECJwqoOB+Kr+HEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgMCzgIL7s4SfBAgQIECAAAECBAhsErhcLpvucxMBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBlwIK7i9F/E2AAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECpwgouJ/C7qEECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAg8FJAwf2liL8JECBAgAABAgQIELhJYF3Xm653MQECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIG3BBTc35LxOgECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgcKqDgfii3hxEgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAWwIK7m/JeJ0AAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDhVQcD+U28MIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4C0BBfe3ZLxOgAABAgQIECBAgMBVAqWU
								q65zEQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIH3BBTc3xPyfwIECBAgQIAA
								AQIEfiug4P5bHv8kQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4QUDB/QYslxIg
								QIAAAQIECBAg8FpgXdfXL3qFAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwAYB
								BfcNaG4hQIAAAQIECBAgQOCnwLL4WPFTw28ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQJ7BDRR9ui5lwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgSqCSi4V6N0EAECBAgQIECAAIE5BR4fH+dc3NYECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQLVBRTcq5M6kAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgS2CCi4b1FzDwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAhUF1Bwr07qQAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBDYIqDgvkXNPQQIECBAgAABAgQI/BAopfz43S8ECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIE9ggouO/Rcy8BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIVBNQcK9G6SACBAgQIECAAAECcwqklOZc3NYECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQLVBRTcq5M6kAABAgQIECBAgMBcAqWUuRa2LQECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQDMBBfdmtA4mQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVsEFNxv0XItAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQTUHBvRutgAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIELhFQMH9Fi3XEiBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAzAQX3ZrQOJkCAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFbBBTcb9FyLQECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAg0E1Bwb0brYAIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4RUDB/RYt1xIgQIAAAQIECBAg8EpgXddXr3mB
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwBYBBfctau4hQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgeoCCu7VSR1IgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlsEFNy3qLmHAAECBAgQIECAAIEf
								AqWUH7/7hQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAeAQX3PXruJUCAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFqAgru1SgdRIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJ7BBTc9+i5lwABAgQI
								ECBAgACBD6UUCgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSqCCi4V2F0CAEC
								BAgQIECAAIF5BRTc583e5gQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB2gIK7rVF
								nUeAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECmwQU3Dex
								uYkAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEagsouNcW
								dR4BAgQIECBAgACByQRSSpNtbF0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFW
								AgrurWSdS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQI3
								CSi438TlYgIECBAgQIAAAQIEXgqUUl6+5G8CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECmwQU3DexuYkAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEagsouNcWdR4BAgQIECBAgACByQRSSpNtbF0CBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIFWAgrurWSdS4AAAQIECBAgQGASgVLKJJtakwABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAoLWAgntrYecTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAwFUCCu5XMbmIAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBFoLKLi3FnY+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECFwloOB+FZOLCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQKC1gIJ7a2HnEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgMBVAgruVzG5iAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgRaCyi4txZ2PgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhcJaDgfhWTiwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECgtYCCe2th5xMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIDAVQIK7lcxuYgAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEWgsouLcWdj4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIXCWg4H4Vk4sIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAoLWAgntrYecTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAwFUCCu5XMbmIAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBFoLKLi3FnY+AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECFwloOB+FZOLCBAgQIAAAQIECBB4SyCl9Na/vE6AAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgJgEF95u4XEyAAAECBAgQIECAwEuBu7u7ly/5mwAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAmAQX3TWxuIkCAAAECBAgQIEDgWcA3
								uD9L+EmAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILBXQMF9r6D7CRAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKCKgIJ7FUaHECBAgAABAgQI
								EJhXoJQy7/I2J0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqCqg4F6V02EECBAg
								QIAAAQIE5hPIOc+3tI0JECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSaCCi4N2F1
								KAECBAgQIECAAIF5BO7u7uZZ1qYECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJN
								BRTcm/I6nAABAgQIECBAgMD4Agru42dsQwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIDAUQIK7kdJew4BAgQIECBAgACBQQVyzoNuZi0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIGjBRTcjxb3PAIECBAgQIAAAQKDCdzf3w+2kXUIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgTOElBwP0vecwkQIECAAAECBAgMIrCu6yCbWIMAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQOBsAQX3sxPwfAIECBAgQIAAAQLBBZbFx4rgERqfAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQINCNgCZKN1EYhAABAgQIECBAgEBMgZxzzMFNTYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0J2Agnt3kRiIAAECBAgQIECAQCyBy+USa2DT
								EiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIdCug4N5tNAYjQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAXAIK7nPlbVsCBAgQIECAAAEC1QVS
								StXPdCABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCcAgruc+ZuawIECBAgQIAA
								AQLVBEop1c5yEAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwNwCCu5z5297AgQI
								ECBAgAABArsFcs67z3AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgf8IKLh7
								HxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAFwIK7l3E
								YAgCBAgQIECAAAECcQVSSnGHNzkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBX
								AgruXcVhGAIECBAgQIAAAQLxBEop8YY2MQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAQJcCCu5dxmIoAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIzCeg4D5f5jYmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBAlwIK7l3GYigCBAgQIECAAAECcQRSSnGGNSkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEDXAgruXcdjOAIECBAgQIAAAQL9C9zd3fU/pAkJECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgRCCCi4h4jJkAQIECBAgAABAgT6FVgWHyv6TcdkBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIFYApoosfIyLQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBIYVUHAfNlqLESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAIJaAgnusvExLgAABAgQIECBAoDuBnHN3MxmIAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIEAgpoCCe8zcTE2AAAECBAgQIECgG4FSSjezGIQAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCC2gIJ77PxMT4AAAQIECBAgQOB0gU+fPp0+gwEI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTGEFBwHyNHWxAgQIAAAQIECBA4TWBZ
								fKw4Dd+DCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKDCWiiDBaodQgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBVQME9anLmJkCAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwGACCu6DBWodAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIRBVQcI+anLkJECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwmICC+2CBWocAAQIECBAgQIDA
								0QKPj49HP9LzCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEBhVQcB80WGsRIECA
								AAECBAgQOErg6enpqEd5DgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwOACCu6D
								B2w9AgQIECBAgAABAq0FlsXHitbGzidAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								zCKgiTJL0vYkQIAAAQIECBAg0EggpdToZMcSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAjMJqDgPlvi9iVAgAABAgQIECBQWeDp6anyiY4jQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBCYVUDBfdbk7U2AAAECBAgQIECgkkDOudJJjiFAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEJhdQMF99neA/QkQIECAAAECBAjsFEgp7TzB7QQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgT+J6Dg7p1AgAABAgQIECBAgMAuAQX3XXxuJkCAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ+IeAgvs/MPxKgAABAgQIECBAgMDtAqWU229yBwEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFfCCi4/wLFSwQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwvICC+/HmnkiAAAECBAgQIEBgKIGc
								81D7WIYAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOA8AQX38+w9mQABAgQIECBA
								gMAQAimlIfawBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwPkCCu7nZ2ACAgQI
								ECBAgAABAqEFFNxDx2d4AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBXAgruXcVh
								GAIECBAgQIAAAQLxBBTc42VmYgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBArwIK
								7r0mYy4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhMJqDg
								Plng1iVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgECvAgru
								vSZjLgIECBAgQIAAAQJBBEopQSY1JgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								QO8CCu69J2Q+AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								TCKg4D5J0NYkQIAAAQIECBAg0EpgXddWRzuXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIEBgMgEF98kCty4BAgQIECBAgACB2gI559pHOo8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQGBSAQX3SYO3NgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBHoTUHDvLRHzECBAgAABAgQIEAgm8Pnz52ATG5cAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQKBXAQX3XpMxFwECBAgQIECAAIEgAsviY0WQqIxJgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEOheQBOl+4gMSIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgTkEFNznyNmWBAgQIECAAAECBJoJ3N/fNzvbwQQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAnMJKLjPlbdtCRAgQIAAAQIECFQXyDlXP9OBBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcwoouM+Zu60JECBAgAABAgQIVBNYFh8r
								qmE6iAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwuYAmyuRvAOsTIECAAAECBAgQ
								2CuQUtp7hPsJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI/FdAwd0bgQABAgQI
								ECBAgACBXQJPT0+77nczAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgWcBBfdn
								CT8JECBAgAABAgQIENgk4BvcN7G5iQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								4BcCCu6/QPESAQIECBAgQIAAAQLXC3z+/Pn6i11JgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBA4DcCCu6/wfEvAgQIECBAgAABAgTeFyilvH+RKwgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhcIaDgfgWSSwgQIECAAAECBAgQeFvgcrm8/U//IUCAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIHCDgIL7DVguJUCAAAECBAgQIEDgtcC6rq9f9AoBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBDQIK7hvQ3EKAAAECBAgQIECAwE+Br1+/
								/vzDbwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgR2CCi478BzKwECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUE1Bwr2fpJAIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDYIaDgvgPPrQQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQT0DBvZ6lkwgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgh4CC+w48txIgQIAAAQIE
								CBAg8OFDzhkDAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSoCCu5VGB1CgAAB
								AgQIECBAYF6Bv/76a97lbU6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFBVQMG9
								KqfDCBAgQIAAAQIECMwnUEqZb2kbEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								NBFQcG/C6lACBAgQIECAAAEC8wjc3d3Ns6xNCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEmgoouDfldTgBAgQIECBAgACB8QV8g/v4GduQAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIHCUgIL7UdKeQ4AAAQIECBAgQGBQge/fvw+6mbUIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgSOFlBwP1rc8wgQIECAAAECBAgMJpBSGmwj6xAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECJwloOB+lrznEiBAgAABAgQIEBhEYF3XQTaxBgECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwNkCCu5nJ+D5BAgQIECAAAECBIILlFKCb2B8AgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBXgQU3HtJwhwECBAgQIAAAQIEggrknINO
								bmwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHeBBTce0vEPAQIECBAgAABAgSC
								CazrGmxi4xIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECPQqoODeazLmIkCAAAEC
								BAgQIBBE4OPHj0EmNSYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDvAgruvSdk
								PgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECEwioOA+SdDW
								JECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQO8CCu69J2Q+
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQITCKg4D5J0NYk
								QIAAAQIECBAg0EqglNLqaOcSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhMJqDg
								Plng1iVAgAABAgQIECBQW+Dbt2+1j3QeAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIDApAIK7pMGb20CBAgQIECAAAECtQR8g3stSecQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgouHsPECBAgAABAgQIECCwS2BZfKzYBehmAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBHwKaKD8o/EKAAAECBAgQIECAwBaBlNKW29xDgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBA4JWAgvsrEi8QIECAAAECBAgQIHCLQCnllstdS4AAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOBNAQX3N2n8gwABAgQIECBAgACBawRyztdc5hoCBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC7woouL9L5AICBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOEJAwf0IZc8gQIAAAQIECBAgMLBASmng
								7axGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwpICC+5HankWAAAECBAgQIEBg
								QIFSyoBbWYkAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOAMAQX3f7Fzb71tlF0b
								gDse2wlNGzZqQWIjThC/gv//GxBUAilHSFQFGofUtWe+74XXbt+kbu2ZZ2aezXWUsf1s1rqWTyzd
								yhTq7iRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBewIC
								7vdIvEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECUwgI
								uE+h7k4CBAgQIECAAAECGQlUVZVRN1ohQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBCYUkDAfUp9dxMgQIAAAQIECBDIQKCu6wy60AIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEAMAgLuMUxBDQQIECBAgAABAgQSFhBwT3h4SidAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIRCYg4B6kRfSTAABAAElEQVTZQJRDgAABAgQIECBAIDWB169fp1ayegkQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCIVEHCPdDDKIkCAAAECBAgQIJCKQNu2qZSq
								TgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgcgFBNwjH5DyCBAgQIAAAQIECMQu
								IOAe+4TUR4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBIR0DAPZ1ZqZQAAQIECBAg
								QIBAlAJ1XUdZl6IIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTSExBwT29mKiZA
								gAABAgQIECAQlcBisYiqHsUQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAikKyDg
								nu7sVE6AAAECBAgQIEAgCoH5fB5FHYogQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBBIX0DAPf0Z6oAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQJZCAi4ZzFGTRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QCB9AQH39GeoAwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CGQhIOCexRg1QYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gfQFBNzTn6EOCBAgQIAAAQIECEwqsNlsJr3f5QQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAvkICLjnM0udECBAgAABAgQIEJhEQMB9EnaXEiBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgSyFBBwz3KsmiJAgAABAgQIECAwnkBVVeNd5iYCBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAIGsBQTcsx6v5ggQIECAAAECBAgMLyDgPryxGwgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECpQgIuJcyaX0SIECAAAECBAgQGEigaZqBTnYsAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAaQIC7qVNXL8ECBAgQIAAAQIEAgsIuAcGdRwBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoGABAfeCh691AgQIECBAgAABAiEEzs7OQhzj
								DAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIPBNx9CQgQIECAAAECBAgQ6CVQ
								13Wv/TYTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ2AkIuO8k/CVAgAABAgQI
								ECBAoJNA0zSd9tlEgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA4K6AgPtdEa8J
								ECBAgAABAgQIEDhJYLvdnrTeYgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKH
								BATcD8l4nwABAgQIECBAgACBowQuLi6OWmcRAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgQ8JCLh/SMjnBAgQIECAAAECBAi8V2A+n7/3cx8SIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQOFZAwP1YKesIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAYFABAfdBeR1OgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAscKCLgfK2UdAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECAwqIOA+KK/DCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQOBYAQH3Y6WsI0CAAAECBAgQIEDgnQK3t7fvfN+bBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBE4VEHA/Vcx6AgQIECBAgAABAgT+R0DA/X84vCBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEOghIODeA89WAgQIECBAgAABAgQePFgsFhgI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIBBEQcA/C6BACBAgQIECAAAEC5QpU
								VVVu8zonQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAIKiDgHpTTYQQIECBAgAAB
								AgTKE3j16lV5TeuYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgEAEB90FYHUqA
								AAECBAgQIECgHIHtdltOszolQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAYVEDA
								fVBehxMgQIAAAQIECBDIX6Cu6/yb1CEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gMAoAgLuozC7hAABAgQIECBAgEC+AlVV5duczggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBEYVEHAfldtlBAgQIECAAAECBPITaJomv6Z0RIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgMImAgPsk7C4lQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAgbsCAu53RbwmQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAgUkEBNwnYXcpAQIECBAgQIAAgXwENptNPs3ohAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAYFIBAfdJ+V1OgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAjsBAfedhL8ECBAgQIAAAQIECHQSmM38rOgEZxMBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgMA9AUmUeyTeIECAAAECBAgQIEDgFIGqqk5Zbi0BAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBgwIC7gdpfECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECYwoIuI+p7S4CBAgQIECAAAECGQq0bZth
								V1oiQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYQkDAfQp1dxIgQIAAAQIECBDI
								SKBpmoy60QoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCUAgLuU+q7mwABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgT2AgLuewoPBAgQIECA
								AAECBAh0Eaiqqss2ewgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjcExBwv0fi
								DQIECBAgQIAAAQIEThGYzfysOMXLWgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gcMCkiiHbXxCgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AiMKCLiPiO0qAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EDgsIOB+2MYnBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IDCigID7iNiuIkCAAAECBAgQIJCjQNu2ObalJwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgQkEBNwnQHclAQIECBAgQIAAgZwEBNxzmqZeCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQLTCgi4T+vvdgIECBAgQIAAAQLJC8xmflYkP0QNECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQiEZBEiWQQyiBAgAABAgQIECCQqkDTNKmWrm4CBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIHIBATcIxuIcggQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIFCqgIB7qZPXNwECBAgQIECAAIFAArOZnxWBKB1DgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECheQBKl+K8AAAIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMQhIOAexxxUQYAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgeIFBNyL/woAIECAAAECBAgQINBPoGmafgfYTYAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOC/AgLuvgoECBAgQIAAAQIECPQSaNu2
								136bCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECOwEBNx3Ev4SIECAAAECBAgQ
								INBJoKqqTvtsIkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHBXQMD9rojXBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDCJgID7JOwuJUCA
								AAECBAgQIJCPQNu2+TSjEwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgUkFBNwn
								5Xc5AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECOwEBNx3
								Ev4SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwKQCAu6T
								8rucAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBHYCAu47
								CX8JECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYFIBAfdJ
								+V1OgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAjsBAfed
								hL8ECBAgQIAAAQIECHQSqKqq0z6bCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CNwVEHC/K+I1AQIECBAgQIAAAQInCczn85PWW0yAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIEDgkICA+yEZ7xMgQIAAAQIECBAgcJSA/+B+FJNFBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECRwgIuB+BZAkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIDC8g4D68sRsIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBA4AgBAfcjkCwhQIAAAQIECBAgQOCwQNu2hz/0CQECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIETBATcT8CylAABAgQIECBAgACB+wJN09x/0zsECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEOggIuHdAs4UAAQIECBAgQIAAgTcC/oP7GwtP
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC/QQE3Pv52U2AAAECBAgQIECgeIFH
								jx4VbwCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgjICAexhHpxAgQIAAAQIE
								CBAoVuDs7KzY3jVOgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQVkDAPayn0wgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgo4CAe0c42wgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgrICAe1hPpxEg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBARwEB945wthEg
								QIAAAQIECBAg8K9A0zQoCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECAQREHAP
								wugQAgQIECBAgAABAuUKrFarcpvXOQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								QFABAfegnA4jQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								ga4CAu5d5ewjQIAAAQIECBAgQOAfgbquSRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAIIiDgHoTRIQQIECBAgAABAgTKFWjbttzmdU6AAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIBBUQMA9KKfDCBAgQIAAAQIECJQnsF6vy2taxwQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAoMICLgPwupQAgQIECBAgAABAuUILJfLcprVKQECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAwKACAu6D8jqcAAECBAgQIECAQP4CDx8+zL9JHRIgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECIwiIOA+CrNLCBAgQIAAAQIECOQr0LZtvs3pjAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYFQBAfdRuV1GgAABAgQIECBAID+B9Xqd
								X1M6IkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmERAwH0SdpcSIECAAAECBAgQ
								yEfg4uIin2Z0QoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMKmAgPuk/C4nQIAA
								AQIECBAgkL7A48eP029CBwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlEICLhH
								MQZFECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgICAu+8A
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECEQhIOAexRgU
								QYAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIC7r4DBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBCFgIB7FGNQBAEC
								BAgQIECAAIF0BbbbbbrFq5wAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAqAQH3
								qMahGAIECBAgQIAAAQLpCaxWq/SKVjEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gECUAgLuUY5FUQQIECBAgAABAgTSEfjiiy/SKValBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECUQsIuEc9HsURIECAAAECBAgQiFOgrut9YZ999tn+2QMBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBPgIC7n307CVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBYAIC7sEoHUSAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECfQQE3Pvo2UuAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECwQQE3INROogAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIE+ggIuPfRs5cAAQIECBAgQIBAoQJN0+w7v76+3j97IECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINBHQMC9j569BAgQIECAAAECBAoVaNt23/nV
								1dX+2QMBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBPgIC7n307CVAgAABAgQI
								ECBA4MH5+TkFAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAkEEBNyDMDqEAAEC
								BAgQIECAQLkCi8Wi3OZ1ToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEFRAwD0o
								p8MIECBAgAABAgQIlCdwc3NTXtM6JkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								GERAwH0QVocSIECAAAECBAgQKEfg+fPn5TSrUwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgUEFBNwH5XU4AQIECBAgQIAAgfwFPvroo/yb1CEBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgMAoAgLuozC7hAABAgQIECBAgEC+AovFIt/mdEaAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIDCqgID7qNwuI0CAAAECBAgQIJCfwHa7za8pHREgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECEwiIOA+CbtLCRAgQIAAAQIECOQj8Pr163ya0QkBAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCkAgLuk/K7nAABAgQIECBAgED6Ao8ePUq/
								CR0QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhEISDgHsUYFEGAAAECBAgQIEAg
								XYHr6+t0i1c5AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVAIC7lGNQzEECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAoV0DAvdzZ65wAAQIE
								CBAgQIBAEIHb29sg5ziEAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgIC77wAB
								AgQIECBAgAABAr0Elstlr/02EyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIENgJ
								CLjvJPwlQIAAAQIECBAgQKCTQF3XnfbZRIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQOCugID7XRGvCRAgQIAAAQIECBA4SWCz2Zy03mICBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAEChwQE3A/JeJ8AAQIECBAgQIAAgaME1uv1UessIkCAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIPAhAQH3Dwn5nAABAgQIECBAgACB9wrMZn5WvBfIhwQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAkcLSKIcTWUhAQIECBAgQIAAAQLvEqiq6l1ve48A
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAyQIC7ieT2UCAAAECBAgQIECAwNsC
								TdO8/dIzAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgc4CAu6d6WwkQIAAAQIE
								CBAgQOA/AgLuvgcECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKhBATcQ0k6hwAB
								AgQIECBAgEChAmdnZ4V2rm0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHQAgLu
								oUWdR4AAAQIECBAgQKAwgfl8XljH2iVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EBhKQMB9KFnnEiBAgAABAgQIEChEYLvdFtKpNgkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBIYWEHAfWtj5BAgQIECAAAECBDIXaJom8w61R4AAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgMJaAgPtY0u4hQIAAAQIECBAgkKnAo0ePMu1MWwQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAmMLCLiPLe4+AgQIECBAgAABApkJbDabzDrSDgECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAwFQCAu5TybuXAAECBAgQIECAQCYC6/U6k060QYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMLWAgPvUE3A/AQIECBAgQIAAgcQFvvrqq8Q7
								UD4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAsAgLusUxCHQQIECBAgAABAgQS
								FVgsFolWrmwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHYBATcY5uIeggQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCogIB7oYPXNgECBAgQ
								IECAAIFQAi9evAh1lHMIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQKFxBwL/wL
								oH0CBAgQIECAAAECfQVWq1XfI+wnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								8I+AgLsvAgECBAgQIECAAAECvQTOz8977beZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAwE5AwH0n4S8BAgQIECBAgAABAp0EqqrqtM8mAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAncFBNzvinhNgAABAgQIECBAgMBJAi9fvjxpvcUECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIEDgkIuB+S8T4BAgQIECBAgAABAkcJrNfro9ZZRIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOBDAgLuHxLyOQECBAgQIECAAAEC7xVYLpfv/dyH
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBI4VEHA/Vso6AgQIECBAgAABAgTe
								KTCb+VnxThhvEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQInCwgiXIymQ0ECBAg
								QIAAAQIECLwtsNls3n7pmQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBnAQH3
								znQ2EiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBIAQH3
								kJrOIkCAAAECBAgQIFCgQF3XBXatZQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gSEEBNyHUHUmAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CJwsIOB+MpkNBAgQIECAAAECBAi8LfD111+//dIzAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAgc4CAu6d6WwkQIAAAQIECBAgQOA/ArOZnxW+CQQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAmEEJFHCODqFAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBHoKCLj3BLSdAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBMIICLiHcXQKAQIECBAgQIAAgWIFrq+vi+1d4wQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAmEFBNzDejqNAAECBAgQIECAQHEC8/m8uJ41TIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMIyAgPswrk4lQIAAAQIECBAgUIzA999/X0yvGiVA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEBhWQMB9WF+nEyBAgAABAgQIEMhSoKqq
								fV+zmZ8VewwPBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECvQQkUXrx2UyAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECoQQE3ENJOocAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEegkIuPfis5kAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEQgkIuIeSdA4BAgQI
								ECBAgACBggTati2oW60SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiMJSDgPpa0
								ewgQIECAAAECBAhkKvDTTz9l2pm2CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								xhYQcB9b3H0ECBAgQIAAAQIEMhN49epVZh1phwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAYCoBAfep5N1LgAABAgQIECBAIBOBx48fZ9KJNggQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBKYWEHCfegLuJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIF/BATcfREIECBAgAABAgQIEOglcHV11Wu/zQQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgR2AgLuOwl/CRAgQIAAAQIECBDoJNC2bad9NhEgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBC4KyDgflfEawIECBAgQIAAAQIEThJ4/PjxSestJkCA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIHBIQMD9kIz3CRAgQIAAAQIECBA4SsB/
								cD+KySICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEjBATcj0CyhAABAgQIECBA
								gACBwwK3t7eHP/QJAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRMEBNxPwLKU
								AAECBAgQIECAAIH7AmdnZ/ff9A4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								DgIC7h3QbCFAgAABAgQIECBA4I3A06dP37zwRIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQKCHgIB7DzxbCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQCCcgIB7OEsnESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEAPAQH3Hni2EiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEA4AQH3cJZOIkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIEeAgLuPfBsJUCAAAECBAgQIEDgwYPtdouBAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQBABAfcgjA4hQIAAAQIECBAgUK7Ab7/9Vm7zOidAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEAgqIOAelNNhBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQINBVQMC9q5x9BAgQIECAAAECBAj8I7BcLkkQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQCCIg4B6E0SEECBAgQIAAAQIEyhVomqbc5nVOgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQVEDAPSinwwgQIECAAAECBAiUJ/DixYvymtYx
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAIAIC7oOwOpQAAQIECBAgQIBAOQKb
								zaacZnVKgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwqICA+6C8DidAgAABAgQI
								ECCQv0Bd1/k3qUMCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFRBATcR2F2CQEC
								BAgQIECAAIF8BWYzPyvyna7OCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLjCkii
								jOvtNgIECBAgQIAAAQLZCbRtm11PGiJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EJhGQMB9Gne3EiBAgAABAgQIEMhGoK7rbHrRCAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAwLQCAu7T+rudAAECBAgQIECAQPICy+Uy+R40QIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgEIeAgHscc1AFAQIECBAgQIAAgWQF2rZNtnaFEyBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIxCUg4B7XPFRDgAABAgQIECBAIDmBm5ub5GpWMAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQJwCAu5xzkVVBAgQIECAAAECBJIRqKoqmVoVSoAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgELeAgHvc81EdAQIECBAgQIAAgegF5vN59DUq
								kAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIA0BAfc05qRKAgQIECBAgAABAtEK
								NE0TbW0KI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQSEtAwD2teamWAAECBAgQ
								IECAQHQCm80mupoURIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkKaAgHuac1M1
								AQIECBAgQIAAgWgEqqqKphaFECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g
								4J72/FRPgAABAgQIECBAYHIBAffJR6AAAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gEA2AgLu2YxSIwQIECBAgAABAgSmEWjbdpqL3UqAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIJCdgIB7diPVEAECBAgQIECAAIFxBZqmGfdCtxEgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECGQrIOCe7Wg1RoAAAQIECBAgQGAcgdnMz4pxpN1CgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEMhfQBIl/xnrkAABAgQIECBAgMCgAm3bDnq+wwkQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBMoREHAvZ9Y6JUCAAAECBAgQIDCIwGKxGORchxIgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECJQnIOBe3sx1TIAAAQIECBAgQCCowHa7DXqe
								wwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMoVEHAvd/Y6J0CAAAECBAgQIBBE
								wH9wD8LoEAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgf8XEHD3NSBAgAABAgQI
								ECBAoJfAt99+22u/zQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgR2AgLuOwl/
								CRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBSAQH3Sfld
								ToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQI7AQH3nYS/
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDCpgID7pPwu
								J0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGdgID7TsJf
								AgQIECBAgAABAgQ6CWw2m077bCJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBw
								V0DA/a6I1wQIECBAgAABAgQInCSwWq1OWm8xAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgUMCAu6HZLxPgAABAgQIECBAgMBRAt98881R6ywiQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAg8CEBAfcPCfmcAAECBAgQIECAAIF7ArPZm58Sn3zyyb3PvUGAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgi8CbVEqX3fYQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFAAgLugSAdQ4AAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQL9BATc+/nZTYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKBBATcA0E6hgABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgT6CQi49/OzmwABAgQIECBAgECRAk3T7Pv+
								448/9s8eCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECPQREHDvo2cvAQIECBAg
								QIAAAQIPrq6uKBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAIIiDgHoTRIQQI
								ECBAgAABAgTKFbi4uCi3eZ0TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgEFRBw
								D8rpMAIECBAgQIAAAQLlCczn8/Ka1jEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gMAgAgLug7A6lAABAgQIECBAgEA5AqvVqpxmdUqAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIDCogID7oLwOJ0CAAAECBAgQIJC/wMuXL/NvUocECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQKjCAi4j8LsEgIECBAgQIAAAQL5Cnz//ff5NqczAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBUQUE3EfldhkBAgQIECBAgACBPARmszc/JS4vL/NoShcECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKTC7xJpUxeigIIECBAgAABAgQIEEhFoG3b
								famr1Wr/7IEAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAHwEB9z569hIgQIAA
								AQIECBAoVODtgPvLly8LVdA2AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAaAEB
								99CiziNAgAABAgQIECBQgMB8Pt93+cMPP+yfPRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBDoIyDg3kfPXgIECBAgQIAAAQKFCrwdcP/4448LVdA2AQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIBAaAEB99CiziNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBTgIC7p3YbCJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACB0AIC7qFFnUeAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECnQQE3Dux2USAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECoQUE3EOLOo8AAQIECBAgQIBAAQLr9Xrf5Y8//rh/9kCAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgj4CAex89ewkQIECAAAECBAgUKtA0zb7zn3/+
								ef/sgQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAfAQH3Pnr2EiBAgAABAgQI
								EChUoKqqfedPnz7dP3sgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg0EdAwL2P
								nr0ECBAgQIAAAQIEChV4O+A+n88LVdA2AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBAaAEB99CiziNAgAABAgQIECBQgEDTNPsuf/nll/2zBwIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQJ9BATc++jZS4AAAQIECBAgQIDAg99//50CAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgSACAu5BGB1CgAABAgQIECBAoFyBJ0+elNu8zgkQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBIIKCLgH5XQYAQIECBAgQIAAgfIE6rour2kdEyBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIDCIg4D4Iq0MJECBAgAABAgQIlCNwe3tbTrM6
								JUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQGFRAwH1QXocTIECAAAECBAgQyF9g
								u93m36QOCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIERhEQcB+F2SUECBAgQIAA
								AQIE8hWo6zrf5nRGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwqoCA+6jcLiNA
								gAABAgQIECCQn8Bff/2VX1M6IkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmERA
								wH0SdpcSIECAAAECBAgQyEfgyZMn+TSjEwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgUkFBNwn5Xc5AQIECBAgQIAAgfQFZjM/K9Kfog4IECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAnEISKLEMQdVECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAoHgBAffivwIACBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgEIeAgHscc1AFAQIECBAgQIAAgWQFbm5ukq1d4QQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAnEJCLjHNQ/VECBAgAABAgQIEEhOoKqq5GpWMAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAQJwCAu5xzkVVBAgQIECAAAECBJIR+O6775KpVaEECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJxCwi4xz0f1REgQIAAAQIECBCIXuDZs2fR16hA
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBNAQE3NOYkyoJECBAgAABAgQIRCtw
								fX0dbW0KI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQSEtAwD2teamWAAECBAgQ
								IECAQHQCT548ia4mBREgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKQpIOCe5txU
								TYAAAQIECBAgQCAagdnMz4pohqEQAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDi
								ApIoiQ9Q+QQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhF
								QMA9l0nqgwABAgQIECBAgMBEAs+fP5/oZtcSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAjkJiDgnttE9UOAAAECBAgQIEBgZIHXr1+PfKPrCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIEchUQcM91svoiQIAAAQIECBAgMJLAcrkc6SbXECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQI5C4g4J77hPVHgAABAgQIECBAYGCBqqoGvsHxBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECpQgIuJcyaX0SIECAAAECBAgQGEhgtVoNdLJjCRAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEShMQcC9t4volQIAAAQIECBAgEFjAf3APDOo4
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDBAgLuBQ9f6wQIECBAgAABAgRCCHz5
								5ZchjnEGAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgQcC7r4EBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBCFgIB7FGNQBAECBAgQIECA
								AIF0BVarVbrFq5wAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAqAQH3qMah9Fu9
								SAAAQABJREFUGAIECBAgQIAAAQLpCZydnaVXtIoJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgSiFBBwj3IsiiJAgAABAgQIECCQjsDl5WU6xaqUAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIEAgagEB96jHozgCBAgQIECAAAEC8Qv8+uuv8RepQgIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgSQEBNyTGJMiCRAgQIAAAQIECMQr8Omnn8ZbnMoIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSSEhBwT2pciiVAgAABAgQIECAQn8DZ2Vl8RamI
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgSQEB9yTHpmgCBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjkJyDgnt9MdUSAAAECBAgQIEBgVIGm
								aUa9z2UECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQL5Cgi45ztbnREgQIAAAQIE
								CBAYReDq6mqUe1xCgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQv4CAe/4z1iEB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSSEBBwT2JMiiRA
								gAABAgQIECAQr8D5+Xm8xamMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgKQEB
								96TGpVgCBAgQIECAAAEC8Qm0bRtfUSoiQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBBIUkDAPcmxKZoAAQIECBAgQIBAPALX19fxFKMSAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACBpAUE3JMen+IJECBAgAABAgQITC9QVdX0RaiAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIEAgCwEB9yzGqAkCBAgQIECAAAEC0wksFovpLnczAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIBAVgIC7lmNUzMECBAgQIAAAQIExhdo23b8S91IgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECCQpYCAe5Zj1RQBAgQIECBAgACB8QS22+14l7mJAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgawEB96zHqzkCBAgQIECAAAECwwsIuA9v
								7AYCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCkCAu6lTFqfBAgQIECAAAECBAYS
								aNt2oJMdS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUJqAgHtpE9cvAQIECBAg
								QIAAgcACy+Uy8ImOI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQKFVAwL3Uyeub
								AAECBAgQIECAQCCBhw8fBjrJMQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAqUL
								CLiX/g3QPwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCIR
								EHCPZBDKIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQOkC
								Au6lfwP0T4AAAQIECBAgQKCnQNu2PU+wnQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgMC/AgLuvgkECBAgQIAAAQIECPQSWK/XvfbbTIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQGAnIOC+k/CXAAECBAgQIECAAIFOAg8fPuy0zyYCBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECdwUE3O+KeE2AAAECBAgQIECAwEkCFxcXJ623mAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgMAhAQH3QzLeJ0CAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIFRBQTcR+V2GQECBAgQIECAAIH8BK6vr/NrSkcECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKTCAi4T8LuUgIECBAgQIAAAQL5CKxWq3ya
								0QkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCkAgLuk/K7nAABAgQIECBAgED6
								Aufn5+k3oQMCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEoBATcoxiDIggQIECA
								AAECBAikK1BVVbrFq5wAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAqAQH3qMah
								GAIECBAgQIAAAQLpCazX6/SKVjEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgECU
								AgLuUY5FUQQIECBAgAABAgTSEbi4uEinWJUSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAhELSDgHvV4FEeAAAECBAgQIEAgfgEB9/hnpEICBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAQCoCAu6pTEqdBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQyFxAwD3zAWuPAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECqQgIuKcyKXUSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIEAgcwEB98wHrD0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAikIiDgnsqk1EmAAAECBAgQIEAgUoHtdhtpZcoiQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBBITUDAPbWJqZcAAQIECBAgQIBAZAI3NzeRVaQcAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBVAUE3FOdnLoJECBAgAABAgQIRCLw+eefR1KJMggQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFIXEHBPfYLqJ0CAAAECBAgQIDCxwOXl5cQVuJ4A
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCAXAQH3XCapDwIECBAgQIAAAQITCTRN
								M9HNriVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhNQMA9t4nqhwABAgQIECBA
								gMDIAs+ePRv5RtcRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjkKiDgnutk9UWA
								AAECBAgQIEBgJIG6rke6yTUECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK5Cwi4
								5z5h/REgQIAAAQIECBAYWODy8nLgGxxPgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBQioCAeymT1icBAgQIECBAgACBgQRub28HOtmxBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECpQkIuJc2cf0SIECAAAECBAgQCCzw559/Bj7RcQQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAqUKCLiXOnl9EyBAgAABAgQIEAgksFgsAp3kGAIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgdIFBNxL/wbonwABAgQIECBAgEBPgbque55gOwECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIF/BQTcfRMIECBAgAABAgQIEOgl8OrVq177bSZA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwExBw30n4S4AAAQIECBAgQIBAJ4G/
								//670z6bCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNwVEHC/K+I1AQIECBAg
								QIAAAQInCSwWi5PWW0yAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgkICA+yEZ
								7xMgQIAAAQIECBAgcJTAbOZnxVFQFhEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CHxQQBLlg0QWECBA4P/YuZvXuMr2D+BOZhqnSZvEpIZqC0KhaCkibgRduXAjuHWjf5P/ipvioroW
								EXTjQmkVEZVKXxLatDNpMtPJA/6e5Pkl5GVezn3O/fJZJZOcc9/X93NlU/hSAgQIECBAgMBpAqPR
								6LRf+x0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBsQUU3Mem8iABAgQIECBA
								gAABAscJKLgfp+JnBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC0wgouE+j5h0C
								BAgQIECAAAECBA4Ezp8/f/C9bwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjM
								IqDgPouedwkQIECAAAECBAgQeKnT6VAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgUImAgnsljA4hQIAAAQIECBAgUK7AYDAoN7zkBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAEClQoouFfK6TACBAgQIECAAAEC5Qns7OyUF1piAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBIAIK7kFYHUqAAAECBAgQIECgHIG1tbVywkpKgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECAQVEDBPSivwwkQIECAAAECBAjkLzA/P59/SAkJECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgRqEVBwr4XZJQQIECBAgAABAgTyFdja2so3nGQECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK1Cii418rtMgIECBAgQIAAAQL5CSi457dT
								iQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECTQkouDcl714CBAgQIECAAAECmQis
								rKxkkkQMAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBpgUU3JvegPsJECBAgAAB
								AgQIJC7Q7XYTT2B8AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBWAQU3GPZhDkI
								ECBAgAABAgQIJCrQ7/cTndzYBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECsQko
								uMe2EfMQIECAAAECBAgQSEzg+fPniU1sXAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgVgFFNxj3Yy5CBAgQIAAAQIECCQi8MYbbyQyqTEJECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgRiF1Bwj31D5iNAgAABAgQIECAQuUC32418QuMRIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAikIqDgnsqmzEmAAAECBAgQIEAgUoF+vx/pZMYiQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBBITUDBPbWNmZcAAQIECBAgQIBAZAK7u7uRTWQcAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBVAUU3FPdnLkJECBAgAABAgQIRCLwzjvvRDKJ
								MQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFIXUHBPfYPmJ0CAAAECBAgQINCw
								QLfbbXgC1xMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECOQioOCeyyblIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQOICCu6JL9D4BAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyEVAwT2XTcpBgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBxAUU3BNfoPEJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQi4CCey6blIMAAQIECBAg
								QIBAQwK///57Qze7lgABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIDcBBffcNioP
								AQIECBAgQIAAgZoFHj58WPONriNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhV
								QME9183KRYAAAQIECBAgQKAmgdXV1Zpucg0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgEDuAgruuW9YPgIECBAgQIAAAQKBBebm/LMiMLHjCRAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQLFCGiiFLNqQQkQIECAAAECBAiEEXj06FGYg51KgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBQnICCe3ErF5gAAQIECBAgQIBAtQKDwaDaA51GgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBQrICCe7GrF5wAAQIECBAgQIBANQLvvfdeNQc5hQABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoHgBBffi/wQAECBAgAABAgQIEJhNoN1uz3aA
								twkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAj8V0DB3Z8CAQIECBAgQIAAAQIz
								CTx48GCm971MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYF9AwX1fwlcCBAgQ
								IECAAAECBKYSaLVaU73nJQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJHBRTc
								j4r4TIAAAQIECBAgQIDAmQL/v9T+8ccfn/m8BwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAiMI6DgPo6SZwgQIECAAAECBAgQOCQwN/e/f0q02+1Dv/OBAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAwLQC/2ulTHuC9wgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQAUCCu4VIDqCAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBGYXUHCf3dAJBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIFCBgIJ7BYiOIECAAAECBAgQIFCawGg0Ki2yvAQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAjUIKLjXgOwKAgQIECBAgAABArkJ7O3tHUT6
								+uuvD773DQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFZBBTcZ9HzLgECBAgQ
								IECAAAECL21ublIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUImAgnsljA4h
								QIAAAQIECBAgUK7Aa6+9Vm54yQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCoV
								UHCvlNNhBAgQIECAAAECBMoTaLVa5YWWmAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAIIiAgnsQVocSIECAAAECBAgQKEfghx9+KCespAQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAkEFFNyD8jqcAAECBAgQIECAQP4Cu7u7+YeUkAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAoBYBBfdamF1CgAABAgQIECBAIF+By5cv5xtOMgIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgVoFFNxr5XYZAQIECBAgQIAAgfwE9vb28gslEQECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCMCCu6NsLuUAAECBAgQIECAQD4CW1tb+YSRhAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoFEBBfdG+V1OgAABAgQIECBAIH2BxcXF
								9ENIQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEIWAgnsUazAEAQIECBAgQIAA
								gXQF3nrrrXSHNzkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBUAgruUa3DMAQI
								ECBAgAABAgTSE7h37156Q5uYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgSgEF
								9yjXYigCBAgQIECAAAEC6Qj89ttv6QxrUgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgagFFNyjXo/hCBAgQIAAAQIECMQv0G634x/ShAQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAkkIKLgnsSZDEiBAgAABAgQIEIhXYHV1Nd7hTEaAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIJCUgIJ7UusyLAECBAgQIECAAIH4BEajUXxDmYgAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQCBJAQX3JNdmaAIECBAgQIAAAQLxCDx8+DCeYUxCgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtICCe9LrMzwBAgQIECBAgACB5gX29vaaH8IE
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQgouGexRiEIECBAgAABAgQINCcw
								Pz/f3OVuJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyEpAwT2rdQpDgAABAgQI
								ECBAoH4B/4N7/eZuJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjkKqDgnutm5SJA
								gAABAgQIECBQk8CzZ89qusk1BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECuQso
								uOe+YfkIECBAgAABAgQIBBZ4+eWXA9/geAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgVIEFNxL2bScBAgQIECAAAECBAIJDIfDQCc7lgABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAoDQBBffSNi4vAQIECBAgQIAAgYoFWq1WxSc6jgABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAoFQBBfdSNy83AQIECBAgQIAAgYoE5ub8s6IiSscQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBIoX0EQp/k8AAAECBAgQIECAAIHZBM6fPz/bAd4mQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg8F8BBXd/CgQIECBAgAABAgQIzCSwuro60/te
								JkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQILAvoOC+L+ErAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQqoODeKL/LCRAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGBfQMF9X8JXAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGhUQMG9UX6XEyBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMC+gIL7voSvBAgQIECAAAECBAhM
								JTAajaZ6z0sECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEjgoouB8V8ZkAAQIE
								CBAgQIAAgYkEHj9+PNHzHiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBwkoCC
								+0kyfk6AAAECBAgQIECAwFgCvV5vrOc8RIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQOAsAQX3s4T8ngABAgQIECBAgACBUwXW1tZO/b1fEiBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEBhXQMF9XCnPESBAgAABAgQIECBwrMDFixeP/bkfEiBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEJhUQMF9UjHPEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEAQAQX3IKwOJUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAIFJBRTcJxXzPAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgEEVBwD8LqUAIECBAgQIAAAQLlCOzu7pYTVlICBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGgAgruQXkdToAAAQIECBAgQCB/gQcPHuQfUkIC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFaBBTca2F2CQECBAgQIECAAIF8BTqd
								Tr7hJCNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhVQMG9Vm6XESBAgAABAgQI
								EMhP4Ny5c/mFkogAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKARAQX3RthdSoAA
								AQIECBAgQCAfgRcvXuQTRhICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFGBRTc
								G+V3OQECBAgQIECAAIH0BZ4+fZp+CAkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgSiEFBwj2INhiBAgAABAgQIECCQrsDq6mq6w5ucAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIEAgKgEF96jWYRgCBAgQIECAAAEC6QksLy+nN7SJCRAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIEohRQcI9yLYYiQIAAAQIECBAgkI7AcDhMZ1iTEiBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIRC2g4B71egxHgAABAgQIECBAIH6Bp0+fxj+kCQkQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJIQUHBPYk2GJECAAAECBAgQIBCvQKvVinc4kxEg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCQloOCe1LoMS4AAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgXwFFNzz3a1kBAgQIECAAAECBGoRWF9f
								r+UelxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECOQvoOCe/44lJECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQBICCu5JrMmQBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyF9AwT3/HUtIgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBJAQU3JNYkyEJECBAgAABAgQI
								xCvQ6/XiHc5kBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECSQkouCe1LsMSIECA
								AAECBAgQiE/g4cOH8Q1lIgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSQFFNyT
								XJuhCRAgQIAAAQIECMQj0O124xnGJAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AkkLKLgnvT7DEyBAgAABAgQIEGheoN1uNz+ECQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBLIQUHDPYo1CECBAgAABAgQIEGhOoN/vN3e5mwkQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBLISUHDPap3CECBAgAABAgQIEKhf4NmzZ/Vf6kYCBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIEsBRTcs1yrUAQIECBAgAABAgTqE5ifn6/vMjcRIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAhkLaDgnvV6hSNAgAABAgQIECAQXqDT6YS/xA0ECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJFCCi4F7FmIQkQIECAAAECBAiEE3jx4kW4
								w51MgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQlICCe1HrFpYAAQIECBAgQIBA
								9QIK7tWbOpEAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUKqAgnupm5ebAAECBAgQ
								IECAQEUC3W63opMcQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgULqAgnvpfwHy
								EyBAgAABAgQIEJhRYDAYzHiC1wkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAj8
								n4CCu78EAgQIECBAgAABAgRmErhy5cpM73uZAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAwL6Agvu+hK8ECBAgQIAAAQIECEwl0O12p3rPSwQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgSOCii4HxXxmQABAgQIECBAgACBiQSePHky0fMeJkCAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIHCSgIL7STJ+ToAAAQIECBAgQIDAWAJ7e3tjPechAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmcJKLifJeT3BAgQIECAAAECBAicKnD58uVT
								f++XBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBMYVUHAfV8pzBAgQIECAAAEC
								BAgcK9Dr9Y79uR8SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmFRAwX1SMc8T
								IECAAAECBAgQIHBI4IMPPjj02QcCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								0woouE8r5z0CBAgQIECAAAECBP4VWFhYIEGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECgEgEF90oYHUKAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECswoouM8q6H0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQqERAwb0SRocQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAwKwCCu6zCnqfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBCoRUHCvhNEhBAgQIECAAAECBMoVuHPnTrnhJSdAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEKhUQMG9Uk6HESBAgAABAgQIEChP4I8//igvtMQECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQJBBBTcg7A6lAABAgQIECBAgEA5Auvr6+WElZQAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCCogIJ7UF6HEyBAgAABAgQIEMhfoN1u5x9SQgIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVoEFNxrYXYJAQIECBAgQIAAgXwF/vzzz3zD
								SUaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCrgIJ7rdwuI0CAAAECBAgQIJCf
								wMbGRn6hJCJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGhEQMG9EXaXEiBAgAAB
								AgQIEMhHYH19PZ8wkhAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQqoODeKL/L
								CRAgQIAAAQIECKQvMDfnnxXpb1ECAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAc
								ApoocezBFAQIECBAgAABAgSSFej3+8nObnACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIG4BBTc49qHaQgQIECAAAECBAgkJzAajZKb2cAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQJxCii4x7kXUxEgQIAAAQIECBBIRmBlZSWZWQ1KgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECAQt4CCe9z7MR0BAgQIECBAgACB6AUGg0H0MxqQAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIEAgDQEF9zT2ZEoCBAgQIECAAAEC0Qp8+OGH0c5mMAIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbQEFNzT2pdpCRAgQIAAAQIECEQnMDfnnxXR
								LcVABAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFEBTRREl2csQkQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJCbgIJ7bhuVhwABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAokKKLgnujhjEyBAgAABAgQIEIhF
								4K+//oplFHMQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgkLqDgnvgCjU+AAAEC
								BAgQIECgaYFOp9P0CO4nQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIREDBPZNF
								ikGAAAECBAgQIECgKYFPP/20qavdS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								kJmAgntmCxWHAAECBAgQIECAQN0Cc3P+WVG3ufsIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABArkKaKLkulm5CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgkJiAgntiCzMuAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEchVQcM91s3IRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIEAgMQEF98QWZlwCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAjkKqDgnutm5SJAgAABAgQIECBQk8CtW7dqusk1BAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECuQsouOe+YfkIECBAgAABAgQIBBbY3NwMfIPjCRAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEShFQcC9l03ISIECAAAECBAgQCCRw7dq1QCc7lgABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAoDQBBffSNi4vAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEIhVQcI90McYiQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBAaQIK7qVtXF4CBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAhEKqDgHulijEWAAAECBAgQIEAgFYGffvoplVHNSYAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgELmAgnvkCzIeAQIECBAgQIAAgdgFlpaWYh/R
								fAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAokIKLgnsihjEiBAgAABAgQIEIhV
								4NmzZ7GOZi4CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHEBBTcE1uYcQkQIECA
								AAECBAjEJrCzsxPbSOYhQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBIVEDBPdHF
								GZsAAQIECBAgQIBALALr6+uxjGIOAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								xAUU3BNfoPEJECBAgAABAgQINC0wGo2aHsH9BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECmQgouGeySDEIECBAgAABAgQINCXwyy+/NHW1ewkQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBDITUHDPbKHiECBAgAABAgQIEKhb4NVXX637SvcRIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAhkKqDgnulixSJAgAABAgQIECBQl8BHH31U11XuIUCAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyFxAwT3zBYtHgAABAgQIECBAILTAaDQKfYXzCRAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEChFQcC9k0WISIECAAAECBAgQCCXw888/
								hzrauQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoUJKLgXtnBxCRAgQIAAAQIE
								CFQt8Pbbb1d9pPMIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQKFVBwL3TxYhMg
								QIAAAQIECBCYRaDT6Ry8/vnnnx987xsCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECswgouM+i510CBAgQIECAAAEChQrMzfmnRKGrF5sAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgEFRAKyUor8MJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAYFwBBfdxpTxHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAkEFFNyD8jqcAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBMYVUHAfV8pzBAgQIECAAAECBAgcCIxGo4Pve73ewfe+IUCAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIDCLgIL7LHreJUCAAAECBAgQIFCowHA4PEj+xRdfHHzvGwIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKzCCi4z6LnXQIECBAgQIAAAQIEXlpc
								XKRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBIBBfdKGB1CgAABAgQIECBA
								oCyBVqt1EPjq1asH3/uGAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwCwCCu6z
								6HmXAAECBAgQIECAQKECe3t7B8m3t7cPvvcNAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgVkEFNxn0fMuAQIECBAgQIAAAQIvffnllxQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIVCKg4F4Jo0MIECBAgAABAgQIlCuwsrJSbnjJCRAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIEKhVQcK+U02EECBAgQIAAAQIEyhN4/fXXywstMQECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQBABBfcgrA4lQIAAAQIECBAgUI7AcDgsJ6ykBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECQQUU3IPyOpwAAQIECBAgQIBAfgKDweBQqF9/
								/fXQZx8IECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQITCug4D6tnPcIECBAgAAB
								AgQIFCpwtOB+48aNQiXEJkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqFpAwb1q
								UecRIECAAAECBAgQKEzg5s2bhSUWlwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								IJSAgnsoWecSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								wEQCCu4TcXmYAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BEIJKLiHknUuAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CEwkoOA+EZeHCRAgQIAAAQIECBA4KrC1tXX0Rz4TIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQmEpAwX0qNi8RIECAAAECBAgQILAvcOvWrf1vfSVAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECAwk4CC+0x8XiZAgAABAgQIECBAoN/vQyBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBQiYCCeyWMDiFAgAABAgQIECBQrsDy8nK54SUnQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoVEDBvVJOhxEgQIAAAQIECBAoT6Db7ZYXWmICBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEgAgruQVgdSoAAAQIECBAgQKAcge3t7XLC
								SkqAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBUQME9KK/DCRAgQIAAAQIECOQv
								cO/evfxDSkiAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCLgIJ7LcwuIUCAAAEC
								BAgQIJCvwMLCQr7hJCNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhVQMG9Vm6X
								ESBAgAABAgQIEMhPYH5+Pr9QEhEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDQi
								oODeCLtLCRAgQIAAAQIECOQj8OLFi3zCSEKAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQINCogIJ7o/wuJ0CAAAECBAgQIJC+wM7OTvohJCBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEIhCQME9ijUYggABAgQIECBAgEC6AhcuXEh3eJMTIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAhEJaDgHtU6DEOAAAECBAgQIEAgPYHt7e30hjYxAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBAlAIK7lGuxVAECBAgQIAAAQIE0hG4fv16OsOalAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIGoBBfeo12M4AgQIECBAgAABAvELrK2txT+k
								CQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBJIQUHBPYk2GJECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQP4CCu7571hCAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJCGg4J7EmgxJgAABAgQIECBAIF6B
								fr8f73AmI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQSEpAwT2pdRmWAAECBAgQ
								IECAQHwCm5ub8Q1lIgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSQFFNyTXJuh
								CRAgQIAAAQIECMQj8P7778czjEkIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSS
								FlBwT3p9hidAgAABAgQIECDQvMD6+nrzQ5iAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIEAgCwEF9yzWKAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgTSF1BwT3+HEhAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQCALAQX3LNYoBAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBNIXUHBPf4cSECBAgAABAgQIEGhU4Pbt243e73ICBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIF8BBTc89mlJAQIECBAgAABAgQaEXjy5Ekj97qUAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIEAgPwEF9/x2KhEBAgQIECBAgNMBnXYAAEAASURBVACBWgX6/X6t97mM
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgXwEF93x3KxkBAgQIECBAgACBWgSW
								l5drucclBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC+QsouOe/YwkJECBAgAAB
								AgQIBBXodDpBz3c4AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAOQIK7uXsWlIC
								BAgQIECAAAECQQQePXoU5FyHEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIlCeg
								4F7eziUmQIAAAQIECBAgUKnAxsZGpec5jAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAoFwBBfdydy85AQIECBAgQIAAgUoElpaWKjnHIQQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQU3P0NECBAgAABAgQIECAwk0Cn05npfS8TIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQ2BdQcN+X8JUAAQIECBAgQIAAgakEdnd3p3rPSwQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgSOCii4HxXxmQABAgQIECBAgACBiQSGw+FEz3uYAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwEkCCu4nyfg5AQIECBAgQIAAAQJjCczPz4/1
								nIcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQInCWg4H6WkN8TIECAAAECBAgQ
								IHCqwNOnT0/9vV8SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQGFdAwX1cKc8R
								IECAAAECBAgQIHCswPLy8rE/90MCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								kwoouE8q5nkCBAgQIECAAAECBA4JtNvtQ599IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIDCtgIL7tHLeI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIFKBRTcK+V0GAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAhMK6DgPq2c9wgQIECAAAECBAgQ+FdgZ2eHBAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIFKBBTcK2F0CAECBAgQIECAAIFyBUajUbnhJSdAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEKhUQMG9Uk6HESBAgAABAgQIEChP4OrVq+WFlpgAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCCIgIJ7EFaHEiBAgAABAgQIEChHoNPplBNWUgIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgaACCu5BeR1OgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAuMKKLiPK+U5AgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEAgqoOAelNfhBAgQIECAAAECBPIX2NjYyD+k
								hAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABArUIKLjXwuwSAgQIECBAgAABAvkK
								DAaDfMNJRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUKuAgnut3C4jQIAAAQIE
								CBAgkJ/AyspKfqEkIkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQaERAwb0RdpcS
								IECAAAECBAgQyEdga2srnzCSECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQINCqg
								4N4ov8sJECBAgAABAgQIpC/gf3BPf4cSECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgRiEVBwj2UT5iBAgAABAgQIECCQqECr1Up0cmMTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAjEJqDgHttGzEOAAAECBAgQIEAgMYG///47sYmNS4AAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgEKuAgnusmzEXAQIECBAgQIAAgUQEnj9/nsikxiRAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEIhdQME99g2ZjwABAgQIECBAgEDkAktLS5FPaDwCBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFUBBTcU9mUOQkQIECAAAECBAhEKtBqtSKdzFgE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKpCSi4p7Yx8xIgQIAAAQIECBCITGBj
								YyOyiYxDgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQqoCCe6qbMzcBAgQIECBA
								gACBSATa7XYkkxiDAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgdQEF99Q3aH4C
								BAgQIECAAAECDQucO3eu4QlcT4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkIuA
								gnsum5SDAAECBAgQIECAQEMCnU6noZtdS4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgkJuAgntuG5WHAAECBAgQIECAQM0C169fr/lG1xEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECOQqoOCe62blIkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAQGICCu6JLcy4BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQyFVAwT3XzcpFgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACBxAQU3BNbmHEJECBAgAABAgQIxCawubkZ20jmIUCAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQSFRAwT3RxRmbAAECBAgQIECAQCwCCwsLsYxiDgIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAgcQFFNwTX6DxCRAgQIAAAQIECDQt8O677zY9gvsJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQyEVBwz2SRYhAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCB1AQX31DdofgIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQioOCeySLFIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQOoCCu6pb9D8BAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyERAwT2TRYpBgAABAgQIECBAoCmB0WjU1NXuJUCA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyExAwT2zhYpDgAABAgQIECBAoG6BH3/8
								se4r3UeAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJCpgIJ7posViwABAgQIECBA
								gEBdAsPhsK6r3EOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJC5gIJ75gsWjwAB
								AgQIECBAgEBogZWVldBXOJ8AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAQAQX3
								QhYtJgECBAgQIECAAIFQAqPRKNTRziVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EChMQMG9sIWLS4AAAQIECBAgQKBqgbt371Z9pPMIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQKFVBwL3TxYhMgQIAAAQIECBCoSqDdbld1lHMIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQKF1BwL/wPQHwCBAgQIECAAAECkwp89dVXh165cOHCoc8+ECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJhWQMF9WjnvESBAgAABAgQIEChUYHt7u9DkYhMg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECIQWUHAPLex8AgQIECBAgAABApkJXLp0
								6VCiXq936LMPBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKYVUHCfVs57BAgQ
								IECAAAECBAj8K7C4uEiCAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCUCCu6V
								MDqEAAECBAgQIECAQLkCW1tb5YaXnAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								oFIBBfdKOR1GgAABAgQIECBAoDyBTqdTXmiJCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEgggouAdhdSgBAgQIECBAgACBcgQuXrxYTlhJCRAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIEggoouAfldTgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIjCug4D6ulOcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAIKiAgntQXocTIECAAAECBAgQyF9gNBrlH1JCAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBWgQU3GthdgkBAgQIECBAgACBfAU2NzfzDScZAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIBArQIK7rVyu4wAAQIECBAgQIBAfgI7Ozv5hZKIAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgEQEF90bYXUqAAAECBAgQIEAgH4Hr16/nE0YS
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBRgUU3BvldzkBAgQIECBAgACB9AWu
								XLmSfggJCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEohBQcI9iDYYgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQV3fwMECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEIWAgnsUazAEAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCi4+xsgQIAAAQIECBAgQGAm
								geFwONP7XiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCwL6Dgvi/hKwECBAgQ
								IECAAAECUwncv39/qve8RIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOCogIL7
								URGfCRAgQIAAAQIECBCYSODNN9+c6HkPEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEDhJQMH9JBk/J0CAAAECBAgQIEBgLIFr166N9ZyHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECJwloOB+lpDfEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgEAtAgrutTC7hAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgTOElBwP0vI7wkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECgFgEF91qYXUKAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECZwkouJ8l5PcECBAgQIAAAQIECJwq8Pjx41N/75cECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIExhVQcB9XynMECBAgQIAAAQIECBwr8N133x37cz8kQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMKmAgvukYp4nQIAAAQIECBAgQOCQwNLS
								0qHPPhAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYVkDBfVo57xEgQIAAAQIE
								CBAg8K/A4uIiCQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKVCCi4V8LoEAIE
								CBAgQIAAAQLlCmxtbZUbXnICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFKBRTc
								K+V0GAECBAgQIECAAIHyBO7evVteaIkJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgSCCCi4B2F1KAECBAgQIECAAIFyBJaXl8sJKykBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEBQAQX3oLwOJ0CAAAECBAgQIJC/wPnz5/MPKSEBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgEAtAgrutTC7hAABAgQIECBAgEC+AoPBIN9wkhEgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECNQqoOBeK7fLCBAgQIAAAQIECOQn0Ov18gslEQECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQCMCCu6NsLuUAAECBAgQIECAQD4Ca2tr+YSRhAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoFEBBfdG+V1OgAABAgQIECBAIH2B+/fvpx9C
								AgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgSgEFNyjWIMhCBAgQIAAAQIECKQr
								cOnSpXSHNzkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBUAgruUa3DMAQIECBA
								gAABAgTSE+h2u+kNbWICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEoBRTco1yL
								oQgQIECAAAECBAikI9Dr9dIZ1qQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJR
								Cyi4R70ewxEgQIAAAQIECBCIX+CVV16Jf0gTEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIJCGg4J7EmgxJgAABAgQIECBAIF6BwWAQ73AmI0CAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQSEpAwT2pdRmWAAECBAgQIECAQHwCm5ub8Q1lIgIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgSQFFNyTXJuhCRAgQIAAAQIECMQjsLS0FM8wJiFAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEEhaQME96fUZngABAgQIECBAgEDzAp988knzQ5iAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgCwEF9yzWKAQBAgQIECBAgACB5gQWFxeb
								u9zNBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQkouGe1TmEIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQroCCe7q7MzkBAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyElBwz2qdwhAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCBdAQX3dHdncgIECBAgQIAAAQJR
								CDx48CCKOQxBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQvoCCe/o7lIAAAQIE
								CBAgQIBArQLffPPNofv++eefQ599IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IDCtgIL7tHLeI0CAAAECBAgQIFCowO3btw8l/+yzzw599oEAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIDAtAIK7tPKeY8AAQIECBAgQIBAoQI3btw4lHxlZeXQZx8IECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQITCug4D6tnPcIECBAgAABAgQIFCqwsLBQaHKxCRAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEQgsouIcWdj4BAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIjCWg4D4Wk4cIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAILSAgntoYecTIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwFgCCu5jMXmIAAECBAgQIECAAIGTBL7/
								/vuTfuXnBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCYSUHCfiMvDBAgQIECA
								AAECBAgcFfj222+P/shnAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlMJKLhP
								xeYlAgQIECBAgAABAgT2BW7cuLH/ra8ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEZhJQcJ+Jz8sECBAgQIAAAQIECMzPz0MgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgUImAgnsljA4hQIAAAQIECBAgUK7AnTt3yg0vOQECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQKUCCu6VcjqMAAECBAgQIECAQHkCd+/eLS+0xAQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAkEEFNyDsDqUAAECBAgQIECAQDkCN2/eLCespAQIECBAgACB/7B3
								bzF2VfUfwNc5PS3T0hl6oQUKpRWlLbbNjKZGkItYqBAICNaiQUPVBwJRYtX4QmKiaKJPIiFRMMgD
								2EQINxMERQtoyrXQWGgDYqDcSikDI6UtnV5m5v+f+f+7mdOZM3POPrd99v5MMulaa6+19vp91nlg
								km8OBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOoqIOBeV16bEyBAgAABAgQIEEi/QD7vz4r0
								37IKCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKNEZBEaYyztxAgQIAAAQIECBBI
								rUB3d3dqa1MYAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAYwUE3Bvr7W0ECBAg
								QIAAAQIEUiewb9++1NWkIAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgeYICLg3
								x91bCRAgQIAAAQIECKRG4NOf/nRqalEIAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBAcwUE3Jvr7+0ECBAgQIAAAQIEWl6gt7e35WtQAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAQDIEBNyTcQ9OQYAAAQIECBAgQKBlBc4999yWPbuDEyBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIJEtAwD1Z9+E0BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQyKyAgHtmr17hBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQSJaAgHuy7sNpCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgkFkBAffMXr3CCRAgQIAAAQIECNRG4Pnnn6/NRnYhQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIvICAe+Y/AgAIECBAgAABAgQIVCfQ399f3QZWEyBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEPh/AQF3HwUCBAgQIECAAAECBKoSuPLK
								K6tabzEBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBQwIC7ock/EuAAAECBAgQ
								IECAQCyBCRMmxFpnEQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIHDBQTcDxfR
								J0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGmCAi4N4Xd
								SwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDgcAEB98NF
								9AkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgKQIC7k1h
								91ICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQOFxAwP1w
								EX0CBAgQIECAAAECBCoSuOWWWyqabzIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBUgIC7qVkjBMgQIAAAQIECBAgUJbA1q1by5pnEgECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIHxBATcxxPynAABAgQIECBAgACBMQW6urrGfO4hAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgXIFBNzLlTKPAAECBAgQIECAAIFRBXK53KjjBgkQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAhUKiDgXqmY+QQIECBAgAABAgQyLjAwMFAk8NhjjxX1
								dQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEFRBwjytnHQECBAgQIECAAIGM
								CkyYMKGo8kmTJhX1dQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjEFRBwjytn
								HQECBAgQIECAAIGMCuTzxX9GnHPOORmVUDYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgECtBYqTKbXe3X4ECBAgQIAAAQIECKReYGBgIPU1KpAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQKAxAgLujXH2FgIECBAgQIAAAQKpFXj22WdTW5vCCBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIEGisg4N5Yb28jQIAAAQIECBAgkDqBefPmpa4mBREgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECDRHQMC9Oe7eSoAAAQIECBAgQCAVAhMnTgxr1qxJ
								RS2KIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQaL6AgHvz78AJCBAgQIAAAQIE
								CLSswBFHHNGyZ3dwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB5AkIuCfvTpyI
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECmRQQcM/ktSua
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECyRMQcE/enTgR
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEMikg4J7Ja1c0
								AQIECBAgQIAAgdoI9Pb2hr6+vtpsZhcCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AIHMCwi4Z/4jAIAAAQIECBAgQIBAZQIffvhhtODgwYPhrrvuivoaBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBKoREHCvRs9aAgQIECBAgAABAhkUeOaZZ4qqnjVrVlFfhwABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBcAQH3uHLWESBAgAABAgQIEMigwIsvvhhe
								eeWVosqXL19e1NchQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEFdAwD2unHUE
								CBAgQIAAAQIEMiiwZ8+eDFatZAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgUYJ
								CLg3Stp7CBAgQIAAAQIECKRAYMqUKSmoQgkECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQJJFRBwT+rNOBcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQyJiDgnrELVy4BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgSSKiDgntSbcS4CBAgQIECAAAECLSKwf//+FjmpYxIgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECCRdQMA96TfkfAQIECBAgAABAgQSLnDnnXcm/ISOR4AAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAg0CoCAu6tclPOSYAAAQIECBAgQCChAieddFJCT+ZYBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECrSYg4N5qN+a8BAgQIECAAAECBBIksGLFivC5
								z30uQSdyFAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVYWEHBv5dtzdgIECBAg
								QIAAAQJNFjjmmGOafAKvJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQSJOAgHua
								blMtBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQaGEBAfcW
								vjxHJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQJoEBNzT
								dJtqIUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQAsLCLi3
								8OU5OgECBAgQIECAAIFmC9x3331h586dzT6G9xMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECKREQMA9JRepDAIECBAgQIAAAQLNENi9e3f48Y9/3IxXeycBAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgEAKBQTcU3ipSiJAgAABAgQIECDQSIGZM2c28nXeRYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkGIBAfcUX67SCBAgQIAAAQIECDRCYP78+Y14jXcQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkQEDAPQOXrEQCBAgQIECAAAEC9RTo
								7e2t5/b2JkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyJCAgHuGLlupBAgQIECA
								AAECBOohsHbt2npsa08CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEMCgi4Z/DS
								lUyAAAECBAgQIECglgLz58+v5Xb2IkCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								yLCAgHuGL1/pBAgQIECAAAECBGohMG/evFpsYw8CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECQcDdh4AAAQIECBAgQIAAgaoEent7q1pvMQECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIFDAgLuhyT8S4AAAQIECBAgQIBALIF///vfsdZZRIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQOBwAQH3w0X0CRAgQIAAAQIECBCoSGD58uUVzTeZAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCkBAfdSMsYJECBAgAABAgQIEChLYPfu3WXN
								M4kAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAeAIC7uMJeU6AAAECBAgQIECA
								wJgCixYtGvO5hwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTKFRBwL1fKPAIE
								CBAgQIAAAQIERhXo6OgYddwgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgUoF
								BNwrFTOfAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOoi
								IOBeF1abEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgECl
								AgLulYqZT4AAAQIECBAgQIBAkcD7779f1NchQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgEFdAwD2unHUECBAgQIAAAQIECAwJPP300yQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQI1ERAwL0mjDYhQIAAAQIECBAgkF2BVatWZbd4lRMgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECNRUQMC9ppw2I0CAAAECBAgQIJA9gYULF2avaBUTIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAjURUDAvS6sNiVAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgACBSgUE3CsVM58AAQIECBAgQIBAhgXuuOOODFevdAIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgXoLCLjXW9j+BAgQIECAAAECBFIkcOut
								t6aoGqUQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgkTUDAPWk34jwECBAgQIAA
								AQIEEixw/PHHjzjd3r17R4wZIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBH
								QMA9jpo1BAgQIECAAAECBDIqMGvWrBGVv/nmmyPGDBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBCIIyDgHkfNGgIECBAgQIAAAQIEIoFbb701amsQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQqEZAwL0aPWsJECBAgAABAgQIEAiLFy+mQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQKAmAgLuNWG0CQECBAgQIECAAIHsCsycOTO7xaucAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgpgIC7jXltBkBAgQIECBAgACB7Al0d3dnr2gV
								EyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1EVAwL0urDYlQIAAAQIECBAgkB2B
								v/zlL9kpVqUECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJ1FRBwryuvzQkQIECA
								AAECBAikX2DJkiXpL1KFBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECDREQcG8I
								s5cQIECAAAECBAgQSK/AlClT0lucyggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BBoqIODeUG4vI0CAAAECBAgQIJA+gZ6envQVpSICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAIGmCAi4N4XdSwkQIECAAAECBAikR+DNN99MTzEqIUCAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQaKqAgHtT+b2cAAECBAgQIECAQOsLrFixovWLUAEBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEAiBATcE3ENDkGAAAECBAgQIECgdQXefvvt1j28kxMgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECCRKQMA9UdfhMAQIECBAgAABAgRaT+ALX/hC
								6x3aiQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBBIpIOCeyGtxKAIECBAgQIAA
								AQKtI1AoFFrnsE5KgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQaAEB90Rfj8MR
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgOwIC7tm5a5US
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAg0QIC7om+Hocj
								QIAAAQIECBAgkHyBrVu3Jv+QTkiAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAS
								AgLuLXFNDkmAAAECBAgQIEAguQIvv/xycg/nZAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAi0lIODeUtflsAQIECBAgAABAgSSJZDL5cKaNWuSdSinIUCAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQaFkBAfeWvToHJ0CAAAECBAgQINB8gaOOOipMmzat+QdxAgIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVQICLin4hoVQYAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgdYXEHBv/TtUAQECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFIhIOCeimtUBAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFpfQMC99e9QBQQIECBAgAABAgSaJtDX19e0
								d3sxAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBA+gQE3NN3pyoiQIAAAQIECBAg
								0DCBXbt2hY0bNzbsfV5EgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQbgEB93Tf
								r+oIECBAgAABAgQI1F3gueeeq/s7vIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QCAbAgLu2bhnVRIgQIAAAQIECBCoi8DZZ58dLrvssrrsbVMCBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIHsCRSyV7KKCRAgQIAAAQIECBCohUChUAiPPPJILbayBwECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAIEhAd/g7oNAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAokQEHBPxDU4BAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgIuPsMECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEAiBATcE3ENDkGAAAECBAgQIECg9QT6+/vDxo0bW+/gTkyA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJBYAQH3xF6NgxEgQIAAAQIECBBInkBf
								X190qMGA+7Jly8Ljjz8ejWkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEZA
								wL0aPWsJECBAgAABAgQIZEjg4YcfDm+++WZRxQMDA+GVV14pGtMhQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgEFegEHehdQQIECBAgAABAgQIZEfgF7/4Rbj22muLCu7o6Ajf/va3
								w2WXXVY0rkOAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgroCAe1w56wgQIECA
								AAECBAhkSOCBBx4YUe3cuXPD9ddfP2LcAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIG4Avm4C60jQIAAAQIECBAgQCA7AkuXLh1R7HnnnTdizAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBagQE3KvRs5YAAQIECBAgQIBARgSOPPLIEZVOnz59xJgBAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAtUICLhXo2ctAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRMQMC9ZpQ2IkCAAAECBAgQIJAtgT/+8Y/h
								nnvuyVbRqiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKirgIB7XXltToAAAQIE
								CBAgQCC9Alu2bAkrV64MDz/8cHqLVBkBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gEBDBQTcG8rtZQQIECBAgAABAgTSJ9Dd3Z2+olREgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECDQFAEB96aweykBAgQIECBAgACBdAgceeSRYdWqVekoRhUECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQJNFxBwb/oVOAABAgQIECBAgACB1hVoa2sL+bw/K1r3Bp2cAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAsAUmUZN2H0xAgQIAAAQIECBBoKYGenp6W
								Oq/DEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIJFtAwD3Z9+N0BAgQIECAAAEC
								BBItMDAwkOjzORwBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBrCQi4t9Z9OS0B
								AgQIECBAgACBRAlMnjw5UedxGAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgdYW
								EHBv7ftzegIECBAgQIAAAQJNFfAN7k3l93ICBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAQOoEBNxTd6UKIkCAAAECBAgQINA4gd7e3vDnP/+5cS/0JgIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAgVQLCLin+noVR4AAAQIECBAgQKD+AgcOHKj/S7yBAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIEAgEwIC7pm4ZkUSIECAAAECBAgQqI/ARRddFC655JL6bG5X
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBzAkIuGfuyhVMgAABAgQIECBAoHYC
								559/fu02sxMBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDmBQTcM/8RAECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFkCAi4J+MenIIAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKZFxBwz/xHAAABAgQI
								ECBAgACB+AKvvfZa/MVWEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDhMQMD9
								MBBdAgQIECBAgAABAgTKF1i7dm0YGBgof4GZBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBMYQEHAfA8cjAgQIECBAgAABAgTGFti2bVu49957x57kKQECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIEyBQTcy4QyjQABAgQIECBAgACB0QWmTJky+gOjBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCoUEHCvEMx0AgQIECBAgAABAgQ+Ejj22GPD+eef
								/9GAFgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEqBATcq8CzlAABAgQIECBA
								gEDWBaZOnZp1AvUTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAjUUEDAvYaYtiJA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB+AIC7vHtrCRA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBGgoIuNcQ01YE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgEF9AwD2+nZUE
								CBAgQIAAAQIEMi+wbdu20NfXl3kHAAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								ArUREHCvjaNdCBAgQIAAAQIECGRSYO/eveHnP/95JmtXNAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQO0FBNxrb2pHAgQIECBAgAABApkSyOVymapXsQQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAvUTEHCvn62dCRAgQIAAAQIECGRCYMmSJZmoU5EECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQL1FxBwr7+xNxAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBC2XLqgAABAAElEQVQgQIAAAQIECBAgQIBAGQIC7mUgmUKAAAECBAgQIECA
								QGmBBx54oPRDTwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhUICDgXgGWqQQI
								ECBAgAABAgQIjBSYO3fuyEEjBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBGII
								CLjHQLOEAAECBAgQIECAAIGPBJYuXfpRR4sAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIBAFQIC7lXgWUqAAAECBAgQIECAQAgHDhzAQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQKAmAgLuNWG0CQECBAgQIECAAIHsCjz++OPZLV7lBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECNRUQcK8pp80IECBAgAABAgQIZE/g7LPPzl7RKiZAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEKiLgIB7XVhtSoAAAQIECBAgQCA7Apdeeml2ilUpAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAXQUE3OvKa3MCBAgQIECAAAEC6RbI5/1J
								ke4bVh0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoLEC0iiN9fY2AgQIECBAgAAB
								Ai0vkMvlohpOOOGEqK1BgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoFoBAfdq
								Ba0nQIAAAQIECBAgkGGB4WH3DDMonQABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								oEYCAu41grQNAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CFQnIOBenZ/VBAgQIECAAAECBDInMDAwENXc3d0d9uzZE/U1CBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECFQjIOBejZ61BAgQIECAAAECBDIu8OGHH4Y777wz4wrKJ0CAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqJWAgHutJO1DgAABAgQIECBAIIMC+Xw+fOpTn8pg
								5UomQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoh0ChHpvakwABAgQIECBAgACB
								5AusW7cuTJ48ObS1tY172B07dkRzBkPt/f39Q/3BPbq6uqJnGgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgSqERBwr0bPWgIECBAgQIAAAQItKnDaaaeFJ598MtbpBwYGonVz5syJ
								2hoECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhXIV7uB9QQIECBAgAABAgQI
								tJ7Axo0bYx96eMA99iYWEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEBhFwDe4
								j4JiiAABAgQIECBAgEDaBaZPnx527NgxVGZ7e3uYOHHimCXv2bMn7Nu3b2hOLpcLQu5jcnlIgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQU8A3uMeEs4wAAQIECBAgQIBAKwsceeSR
								0fHvu+++8N577435e80110TzBwPufggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAjUQ0DAvR6q9iRAgAABAgQIECCQYoHh396+evXq8N///jfF1SqNAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECgkQIC7o3U9i4CBAgQIECAAAECKRAYHnB/8sknwz333JOCqpRAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQBAEB9yTcgjMQIECAAAECBAgQaCGBjo6O
								6LTt7e3h9NNPj/oaBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKoRKFSz2FoC
								BAgQIECAAAECBLIn8PWvfz1cfPHFYcaMGWHBggVh2rRp2UNQMQECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAQF0EBNzrwmpTAgQIECBAgAABAukVyOfz4fzzz09vgSojQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBomkC+aW/2YgIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMExAwH0YhiYBAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQINE9AwL159t5MgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAsMEBNyHYWgSIECAAAECBAgQIFCeQFdXV8jlcmH2
								7Nlhx44d5S0yiwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMA4AgLu4wB5TIAA
								AQIECBAgQIBAscDevXvDpk2bhga7u7vDfffdVzxBjwABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEBMAQH3mHCWESBAgAABAgQIEMiqwOA3tw//Of3004d3tQkQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAjEFhBwj01nIQECBAgQIECAAAECgwLz588HQYAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKAmAgLuNWG0CQECBAgQIECAAIHsCOzfvz87xaqU
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgoQIC7g3l9jICBAgQIECAAAECrS/w
								6quvFhVx8ODBor4OAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgbgCAu5x5awj
								QIAAAQIECBAgkFGB9vb2osoLhUJRX4cAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIBAXAEB97hy1hEgQIAAAQIECBDIqEAul8to5comQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBCot4CAe72F7U+AAAECBAgQIEAg5QJvvPFGyitUHgECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAQKMEBNwbJe09BAgQIECAAAECBFIiMDAwUFTJo48+WtTXIUCAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIBBXQMA9rpx1BAgQIECAAAECBDIq8I9//KOo8i99
								6UtFfR0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQUE3OPKWUeAAAECBAgQ
								IEAgowJ79uwpqnzOnDlFfR0CBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECcQUE
								3OPKWUeAAAECBAgQIECAQGhra6NAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								oGYCAu41o7QRAQIECBAgQIAAgewJTJs2LXtFq5gAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQKBuAgLudaO1MQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAhUIiDgXomWuQQIECBAgAABAgQIFAn09/cX9XUIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIVCMg4F6NnrUECBAgQIAAAQIEMi7Q3d0d/vOf/2RcQfkECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK1EhBwr5WkfQgQIECAAAECBAhkUGBgYCD885//zGDl
								SiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKiHgIB7PVTtSYAAAQIECBAgQCAj
								AnPnzg2XXHJJRqpVJgECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQL0FBNzrLWx/
								AgQIECBAgAABAikWePLJJ8PMmTNTXKHSCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIEGikg4N5Ibe8iQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgZICAu4laTwgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAgUYKCLg3Utu7CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQKCkQKHkEw8IECBAgAABAgQIEEiFQE9PT/jpT38aZs+ePfQ7WNTOnTtrUlt3d3eYM2dOTfay
								CQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEBd58BAgQIECBAgAABAikXWLp0
								aXjrrbdKVvnyyy+H5cuXl3w+1oNTTz01bNiwISxZsmSsaZ4RIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQKEsgX9YskwgQIECAAAECBAgQaFmBwW9ZH+tn+/btYz0e81lvb294+umn
								x5zjIQECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFyBQTcy5UyjwABAgQIECBA
								gECLCsyYMSM6+bJly8KKFSvCEUccEY2dccYZUbuSxuAeF198cVi1alUly8wlQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgUFJAwL0kjQcECBAgQIAAAQIE0iEwadKkqJBf/epX4aGH
								HgrHH398NBa3sWjRovCnP/0ptLe3x93COgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQJFAgLuRRw6BAgQIECAAAECBAiUK1CLkHy57zKPAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIEAgGwIC7tm4Z1USIECAAAECBAgQqLnA6aefXvM9bUiAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIJBtAQH3bN+/6gkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIJAYAQH3xFyFgxAgQIAAAQIECBBoLYGNGzeGl156qbUO7bQECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKJFhBwT/T1OBwBAgQIECBAgACB5Arcfffd
								4ZOf/GR45plnkntIJyNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEGgpAQH3lrou
								hyVAgAABAgQIECCQLIG+vr6wZcuWZB3KaQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBFpWQMC9Za/OwQkQIECAAAECBAg0X+DSSy8NX/3qV5t/ECcgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBBIhYCAeyquUREECBAgQIAAAQIEmiPws5/9LLS1tTXn5d5KgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQOgEB99RdqYIIECBAgAABAgQINE5g586djXuZ
								NxEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECKReQMA99VesQAIECBAgQIAAAQLV
								C7z99tujblJqfNTJBgkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAiMIyDgPg6Q
								xwQIECBAgAABAgQIhPD666+PyrBw4cJRxw0SIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQiCMg4B5HzRoCBAgQIECAAAECGRO49tprR634ueeeG3XcIAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIE4AgLucdSsIUCAAAECBAgQIJAxgfPOOy8sXrx4RNWXX355WL9+
								/YhxAwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTiCAi4x1GzhgABAgQIECBA
								gACBSOD111+P2hoECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhEoVLPYWgIE
								CBAgQIAAAQIEsikwY8aMcNxxx4ULL7wwrFq1KpsIqiZAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEKi5gIB7zUltSIAAAQIECBAgQCD9ArfddttQuD39laqQAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECgkQL5Rr7MuwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAQCkBAfdSMsYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAoKECAu4N5fYyAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECglUCj1wDgBAgQIECBAgAABAgSGC/T19UXdO+64I2zatCl0
								dXWFCy64IBrXIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCNgIB7NXrWEiBA
								gAABAgQIEMiQwFtvvRVVe/vtt0fthx56KKxYsSLqaxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBCIK5CPu9A6AgQIECBAgAABAgSyJTBx4sRRC37//fdHHTdIgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAoFIB3+BeqZj5BAgQIECAAAECBDIqcM8994TvfOc7YerU
								qeGkk04KuVwudHZ2hpUrV2ZURNkECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK1
								FhBwr7Wo/QgQIECAAAECBAikVOCss84Kzz//fEqrUxYBAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEASBPJJOIQzECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAXefAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBBIhEAhEadwCAIECBAgQIAAAQIEYgv09PSE7du3hylTpoy6x8GDB0cdN0iAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgaQIC7km7EechQIAAAQIECBAgUIHA2rVrwze+
								8Y2yV+zatavsuYMTr7766rB58+bQ2dkZJk2aNGJtV1dXuOKKK0aMGyBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECAQR0DAPY6aNQQIECBAgAABAgQSInDLLbdUdJINGzaECy64oKw1
								1113XbjpppuG5q5fv77kmunTp4eLLrqo5HMPCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECJQrkC93onkECBAgQIAAAQIECCRPYMGCBUWHyuVy4fDf4RPOOOOM4d0x29u3bx/z+aGH
								AwMDh5r+JUCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFCVgG9wr4rPYgIECBAg
								QIAAAQLNFRj89vRDP1dddVX47W9/e6gb/XviiSeGN954Y6g/adKkaHy8xuLFi6Mp8+fPDxdffHHU
								H2wMBuk7OztHjBdN0iFAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQgYCAewVY
								phIgQIAAAQIECBBIi8DBgwejUq6//vpw5513Rv1Djc2bNx9qho9//OPhhhtuiPoaBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOohIOBeD1V7EiBAgAABAgQIEEi4wDvvvBOd8P77
								74/apRpPP/10qUfGCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRMIF+znWxE
								gAABAgQIECBAgEDLCEydOrWis+bz/nSoCMxkAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgACBWAK+wT0Wm0UECBAgQIAAAQIEWlvg0UcfDT/4wQ/CzJkzw7x580Yt5tlnnw1/+9vfhp59
								9rOfHXWOQQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQK1FBBwr6WmvQgQIECA
								AAECBAi0iMDixYvDX//61zFPe+ONN0YB9y1btoQrrrhixPyurq6wZs2a4BveR9AYIECAAAECBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQiCEg4B4DzRICBAgQIECAAAECWRB47rnnojK3bdsW
								br/99qh/qDE4duKJJ4avfOUrh4b8S4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QCC2QD72SgsJECBAgAABAgQIEEi1wKJFi8qqr6Ojo6x5JhEgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAYT8A3uI8n5DkBAgQIECBAgACBjAr88Ic/DLt27Qr/+te/QmdnZygUiv98
								yOVyQ+Nf/OIXMyqkbAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVoLFCdUar27
								/QgQIECAAAECBAgQaGmBn/zkJy19focnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBBoLYF8ax3XaQkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IEAgrQIC7mm9WXURIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECgxQQE3FvswhyXAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECaRUopLUwdREgQIAAAQIECBAgEF/g/fffD+ecc07o7u4OJ598cpg0adKIzXK5XOjq6grXXXdd
								KBT8aTECyAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDFAlIoFZNZQIAAAQIE
								CBAgQCD9AldffXXYuHHjUKFvvPFGyYIffPDBsGTJknD55ZeXnOMBAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgXIF8uVONI8AAQIECBAgQIAAgewI5PPl/6kwd+7c7MColAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoK4CvsG9rrw2J0CAAAECBAgQINCaAgsWLIgO
								fuqpp4bVq1dH/eGNzs7OcNpppw0f0iZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECAQW0DAPTadhQQIECBAgAABAgTSJ/D9738//OEPfygqbPbs2eGqq64qGtMhQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgUA8BAfd6qNqTAAECBAgQIECAQAsK7Nq1K/z6178ecfLH
								HntsxJgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAvUQyNdjU3sSIECAAAEC
								BAgQINB6AgcOHBj10B0dHaOOGyRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQ
								awEB91qL2o8AAQIECBAgQIBAygTOOuuslFWkHAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgaQKFJJ6MOciQIAAAQIECBAgQCAZAvfff3/4zGc+M+IwuVwudHZ2hhtvvDG0tbWNeG6A
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQKUCAu6ViplPgAABAgQIECBAIGMC
								7733Xhj8He1nw4YN4cwzzwxXXHHFaI+NESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEKhIIF/RbJMJECBAgAABAgQIECAwTGDChAnhlFNOGTaiSYAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQCC+gG9wj29nJQECBAgQIECAAIFUC6xduza89tpr4eSTTy5Z55IlS8Ki
								RYtKPveAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQCUCAu6VaJlLgAABAgQI
								ECBAIEMCF110UWhvb89QxUolQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBBotkC+
								2QfwfgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMCgg
								4O5zQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKJECgk
								4hQOQYAAAQIECBAgQIBA3QT27t0b7f21r30tTJ48OeoPb/T19Q3vahMgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBBouICAe8PJvZAAAQIECBAgQIBAYwV27twZvfCtt96K2uM1Dhw4
								MDRl//79YenSpeHVV18N06dPjwLyuVwudHZ2httuuy20t7ePt53nBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBMYVEHAfl8gEAgQIECBAgAABAq0t8IlPfCK88MILFRcxceLEoTW/
								+c1vwksvvTTU3rFjR9E+W7duDXfddVf41re+VTSuQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQCCOgIB7HDVrCBAgQIAAAQIECLSQwObNm4e+ZX3w29enTp1a8uQffPBB+PKXvzzi
								+YwZM0aMHRpoa2sLy5YtO9T1LwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGq
								BATcq+KzmAABAgQIECBAgEBjBe6+++7wox/9KHR0dIR58+aFLVu2RAfYvXt31B7eyOfz4Zvf/Obw
								oVHbPT09o45PmzYtGj/ppJPC73//+6i/cOHCcNxxx0V9DQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQLVCAi4V6NnLQECBAgQIECAAIEGC6xevTrs2bNn6K2bNm0qevu6deuK+rXq
								bNy4Mdpq165d4eyzz476GgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRqKZCv
								5Wb2IkCAAAECBAgQIECgvgL9/f0lXzB16tSSz6p5cPPNN0fL33333aitQYAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQKDWAgLutRa1HwECBAgQIECAAIE6Chx99NHR7tdcc00455xz
								ov7wdjRYg8bMmTOjXQoF/xOoCEODAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECg
								5gIC7jUntSEBAgQIECBAgACB+gnk8x/9J/zKlSvDsmXL6vey/9/5uOOOi94xffr0qK1BgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoNYCH6Vjar2z/QgQIECAAAECBAgQSIVAf39/
								VEd3d3dob2+Pfs8888zQ09MTPdcgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								UI2AgHs1etYSIECAAAECBAgQyIDABx98EFU5MDAQdu/eHf2uX78+3HvvvdFzDQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLVCBSqWWwtAQIECBAgQIAAAQLpFTj66KNDLpcL+/bt
								K1nktGnTwuC3uPshQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUAsBAfdaKNqD
								AAECBAgQIECAQAoE+vv7i6rYv39/UX+wc8IJJ4QHH3wwGp83b15ob2+P+hoECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIEqhEQcK9Gz1oCBAgQIECAAAECKRIY/Mb22bNnh3feeadk
								VcuWLQtLliwp+dwDAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAtUI5KtZbC0B
								AgQIECBAgAABAukS2L59e3jiiSfCCy+8EF588cWh35UrV0ZFCrdHFBoECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQJ1EPAN7nVAtSUBAgQIECBAgACBVhXI5/Ph1FNPLTr+tGnTivo6
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBOolIOBeL1n7EiBAgAABAgQIEEih
								wMGDB8O+ffuiyo444oiorUGAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECgWoF8
								tRtYT4AAAQIECBAgQIBAugW6u7ujAn/5y1+Gtra26PeUU04J27dvj55rECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEKhGQMC9Gj1rCRAgQIAAAQIECGRAYOvWrSWrfPHFF8MDDzxQ
								8rkHBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCoREHCvRMtcAgQIECBAgAAB
								AhkUuPLKK0tWPWfOnHDuueeWfO4BAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gUoECpVMNpcAAQIECBAgQIAAgewJfPe73w2rV68OO3fuDIVC8Z8Qs2bNChMmTMgeiooJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgTqIlCcTqnLK2xKgAABAgQIECBAgECrC7S3t4fB
								Xz8ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE6imQr+fm9iZAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAuUKCLiXK2UeAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECNRVoFDX3W1OgAABAgQIECBA
								gEBLCezfvz+8/vrrYfLkyWWd+5hjjgmFgj8rysIyiQABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAYFwBSZRxiUwgQIAAAQIECBAgkA2BzZs3h66urtDX11d2wccee2x44oknwvz588te
								YyIBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBUgL5Ug+MEyBAgAABAgQIECCQ
								LYHf/e53FYXbB3XefvvtsG7dumxBqZYAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QKBuAgLudaO1MQECBAgQIECAAIHWEli4cGHFB168eHG48MILK15nAQECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAIHRBAqjDRojQIAAAQIECBAgQCB7AlOmTImK/vznPx/+/ve/R/3R
								GrlcLkyYMGG0R8YIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIxBIQcI/FZhEB
								AgQIECBAgACBdAvk8/lQKPhzId23rDoCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								QPIEJFaSdydORIAAAQIECBAgQKAhAr29veGpp54Ks2bNGnrftm3bGvJeLyFAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBQSkDAvZSMcQIECBAgQIAAAQIpFvjggw/CMcccEwZD7qP9
								vPDCC6MNGyNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQVwEB97ry2pwAAQIE
								CBAgQIDA2AI33HBDWLt2bViwYEGYPn362JP/9+m777477pxyJqxbt65kuH1wfU9Pz4ht9u/fHx55
								5JEwe/bskM/nh55/7GMfCx0dHSPmGiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECAQR0DAPY6aNQQIECBAgAABAgRqILB169awZs2aoZ02bNhQ8Y6bNm2qeM2hBccff/yh5tC/U6ZM
								CQcOHBj6HRyYO3du0fPBzmCwfefOnUXjRx11VHjqqafCwoULi8Z1CBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECMQR+L+vXYyz0hoCBAgQIECAAAECBKoS2LFjR1XrD32LepxNcrlc
								tGzWrFlhz5494eabb47GTjzxxKg92BgM4x8ebh8cHxxbv379YNMPAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAgaoFfIN71YQ2IECAAAECBAgQIBBPoKOjI1pYKBTC9773vahfqnHT
								TTcNhdEHny/9H/buBEqq8kwY8FsNsiibIFH2RUWBYDdHI5jk/JrECS4gaBSNjlFjHE2iE3WiE4WY
								iZ5jxhi3STyj5uToH1RciBmXuCcmjoyIE6IYiIqIiogiSys0svfvrT+WYOhAN1XVdW8995wO91Z9
								9/3e9/k6uYF++6sRI+LNN99samhRX2/fvv0W8ZLckwb72traOOaYY7Z4zwUBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBlgpocG+pnPsIECBAgAABAgQIFFGgXbt28ZOf/GSbEadN
								m1ZocN/m4B0YkOzM/vTTTxcivPvuu4Xz5CS5TnJ2ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECimgAb3YmqKRYAAAQIECBAgQCDFAkuXLi1kP2vWrPjsZz9buHZCgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAoBwCNeWYxBwECBAgQIAAAQIECFS+wNtvv135ScqQ
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAg0wJ2cM/08iqOAAECBAgQIECgmgQW
								LVoUTzzxxHaV/OKLLxbGNTY25s8nTZoUU6dOjXfffTe6du0a7dq1K4zZuHFjLFmypHDthAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEApBDS4l0JVTAIECBAgQIAAAQJlEnj99dcL
								M91///2RfDX3WL58ef6W7t27x1tvvbXV25PX+/TpU3jvd7/7Xey0006x7777bvF6YYATAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAi0Q0ODeAjS3ECBAgAABAgQIEKgUgWXLlu1w
								Kps2bdpmjI92ef9o4OGHH54/bd++fTzzzDNRW1v70Vv+JECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQINBiAQ3uLaZzIwECBAgQIECAAIHWF7j66qvjkEMOiYaGhujZs2e0bbt9/xd/
								7dq1hd3aO3bsuM1CcrncVsckcWbNmqXBfas6XiRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEGiuwPZ1vzQ3qvEECBAgQIAAAQIECJRF4NOf/nQsXbq02XM9++yzceCBB+bv69Sp0zbv
								7927d4wbNy4effTR6NKlS/4raXpPdm4/7rjjtnm/AQQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgS2R0CD+/YoGUOAAAECBAgQIECAQNx3330UCBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECJRUoKak0QUnQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQLbKaDBfTuhDCNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACB0gpocC+tr+gECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgsJ0CbbdznGEECBAgQIAAAQIECGRUYM2aNXHHHXc0u7pcLhcjRoyI
								YcOGNfteNxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDYmoAG962peI0AAQIE
								CBAgQIBAxgUaGhoKFa5cuTK++tWvFq6bc1JTUxNPP/10HHjggc25zVgCBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECWxWo2eqrXiRAgAABAgQIECBAINMCjY2NRalv06ZN8eKLLxYl
								liAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE7ODue4AAAQIECBAgQIBAFQp8
								4QtfiLFjx8ZTTz0VvXr1iq5du7ZIoa6uLo4//vgW3esmAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAp8U0OD+SRHXBAgQIECAAAECBD4h8Oyzz8Z3vvOd6N69ewwcOPAT77b8cvny
								5YWbN27cWDgv18n9999frqnMQ4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGC7
								BDS4bxeTQQQIECBAgAABAtUsMGbMmFixYkVJCdauXVvS+IITIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQSINATRqSlCMBAgQIECBAgACB1hT44IMPWnN6cxMgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBCoGgE7uFfNUiuUAAECBAgQIECgpQK77bZbvPnmm/nbJ06c
								GP37929pqC3uW7p0adxyyy3519q1a7fFey4IECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIVKOABvdqXHU1EyBAgAABAgQINEugbduP/2/zN7/5zTjkkEOadX9Tg+fOnVtocN98jqbG
								t+brmzZtismTJ8fKlStjn332yaeSy+WitrY2Pv/5z7dmauYmQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBDIkMDHnToZKkopBAgQIECAAAECBAgUV+C4446Le+65Z6tBf//738fBBx+8
								1fe8SIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQKA5AjXNGWwsAQIECBAgQIAA
								AQLVKfDSSy81Wfhbb73V5HveIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQINAc
								ATu4N0fLWAIECBAgQIAAAQJVKjBixIiYM2dOvvohQ4ZE8pUcdXV1kezu7iBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBQDAEN7sVQFIMAAQIECBAgQIBAmQQ2bdpUmGnq1KnxzDPP
								FK5LefLyyy8Xwp944onxgx/8oHDthAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gECxBDS4F0tSHAIECBAgQIAAAQJlEFi6dGlhlhtvvLFwXs6Txx57TIN7OcHNRYAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBCoIoGaKqpVqQQIECBAgAABAgRSL9CmTZtWr2HlypWtnoME
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsilgB/dsrquqCBAgQIAAAQIEMipw
								5513xnnnnRfdunWLgQMHlq3KGTNmxBtvvJGfb+zYsWWb10QECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQLVJaDBvbrWW7UECBAgQIAAAQIpFzjiiCMi+Sr38bWvfS2mTJmSn3b69Onx
								b//2b5HL5aK2tjYmTJhQ7nTMR4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkFEB
								De4ZXVhlESBAgAABAgQIECimwJw5cwrh/vCHP0Ty9dHx8MMPx5gxYz669CcBAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBFgtocG8xnRsJECBAgAABAgQqQeChhx6Kiy66KHbbbbfo
								379/SVJasmRJSeKmKejOO+/cZLqrVq1q8j1vECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEGiOgAb35mgZS4AAAQIECBAgUHECX/nKV+KDDz4oW15//OMf45BDDinbfJUy0d133x0T
								J06M1atXx/Dhw6OmpiafWl1dXRxzzDGVkqY8CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEUi6gwT3lCyh9AgQIECBAgEC1C6xfv76sBB07dizrfJUy2R577BFPPvlkpaQjDwIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgYwKaHDP6MIqiwABAgQIECBQLQJdunSJ5cuX
								58v9xje+Eb179y566ddcc02sXLkyH3fYsGFFjy8gAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQL/X0CDu+8EAgQIECBAgACBVAvU1NQU8j/zzDPjgAMOKFwX6+SXv/xlocG9WDHF
								IUCAAAECBAgQIECAAAECBAjsiMCKaNyR291LgAABAgQI7KDArpHbwQhuJ0CAAAECBAgQIECgKYGP
								u4GaGuF1AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBQ
								BgE7uJcB2RQECBAgQIAAAQIEtiWwbt26OPvss7c1rOLer6uri2984xsVl5eECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIE0imgwT2d6yZrAgQIECBAgACBDAi89957hSo2bNgQ119/
								feE6TSc9e/aM8ePHpylluRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFSoQE2F
								5iUtAgQIECBAgAABApkX6NOnTyZqbNOmTSbqUAQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEDrC9jBvfXXQAYECBAgQIAAAQJVKtC/f/+48cYbY8qUKbHvvvtGt27dUidRV1cXY8eO
								TV3eEiZAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhMAQ3ulbkusiJAgAABAgQI
								EKgSgX/6p3+K5MtBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBEDQQCBAgQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIFAJAnZwr4RVkAMB
								AgQIECBAgAABAs0SeD8aY+OHXw4CBAgQIECgdQR2jVzrTGxWAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgACBzAvYwT3zS6xAAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIpEPADu7pWCdZEiBAgAABAgRaJPD666/H2LFjo6GhIYYMGRJt2rRpUZxKvqm+vr7k6a1f
								v74wx6WXXho33HBD4braT+rq6uLCCy+Mmhq/O1vt3wvqJ0CAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgUQ0CDezEUxSBAgAABAgQIVKjASSedFH/+85/z2S1YsKBCsyxeWrNnz44DDjig
								eAH/Gmnp0qWFmE888UTh3EnEnXfeGYMHD46JEyfiIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQILDDArZZ3GFCAQgQIECAAAEClSuQy+UqN7kSZNazZ88SRI3o1q1bSeJmJWiPHj2y
								Uoo6CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEWlnADu6tvACmJ0CAAAECBAiU
								UmDo0KHx1FNP5acYM2ZMHHXUUaWcrlViX3DBBbF69er83L169SpJDjNnzox//dd/jd122y369u1b
								kjnSGrSuri6+9KUvpTV9eRMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECFSYgAb3
								ClsQ6RAgQIAAAQIESiWw//77x7e+9a1ShW+1uD/4wQ8KDe6lSqJ///4xderUUoUXlwABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBvwrUkCBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABApUgYAf3SlgFORAgQIAAAQIECBAg0CyBLpH7cHzy
								5SBAgAABAgRaQ2BBbGqNac1JgAABAgQIbCbQzd+LN9NwSoAAAQIECBAgQIAAAQIECBAgkCUBO7hn
								aTXVQoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgRQL2ME9
								xYsndQIECBAgQIAAgcoVOOaYY2L69OkxYMCA6NKlS+UmuoOZ1dXVxY9+9KPYaaeddjCS2wkQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhEaHD3XUCAAAECBAgQIECgyAL3339//PrX
								v85HXbJkSZGjV1a43/72tzFy5Mg46aSTKisx2RAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECKRSoCaVWUuaAAECBAgQIECAQAULNDY2VnB2xU0tl8vFwIEDixtUNAIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgaoVsIN71S69wgkQIECAAAECBEol0K1bt0Lo7t27x49/
								/OPCdZZOkub2/fbbLw444IAslaUWAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								VhTQ4N6K+KYmQIAAAQIECBDIvkCnTp3i9NNPz36hKiRAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBQBIGaIsQQggABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQI7LCAHdx3mFAAAgQIECBAgACB1hRYt25dYfqvfe1rscsuuxSuW+tkshLbfwAA
								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
								v/zyGDt2bGknFD01AsmO7QsWLMjn+6lPfSo1eUuUAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECpRbQ4F5qYfEJECBAgMCHAv369YsRI0awIJAX6NChQ9kkli9fXpjr3//93+Mn
								P/lJ4doJgR0VyOVyUVdXFw888EDstttuOxrO/QQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgRCg7tvAgIECBAgQIBAhgXmzZtXqG7Tpk2xbt26wrUTAsUQeOaZZ+Lee++N008/vRjh
								xCBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEKhygZoqr1/5BAgQIECAAIFMC/zj
								P/5jputTXOsL9OjRIw4++ODWT0QGBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								mRCwg3smllERBAgQIECAAIGtC1xwwQVx/PHHx7Jly2KXXXbZ+iCvEtgBgX79+kXHjh13IIJbCRAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECHwsoMH9YwtnBAgQIECAAIFMCvTv3z+S
								LwcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQqXaCm0hOUHwECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhUh4Ad3KtjnVVJgAABAgQI
								ECBAIFMC/9t7U6x6f2OmalIMAQIECBBIk8AhC9qkKV25EiBAgACBTAqsiMZM1qUoAgQIECCQFoHX
								engWp2Wt5EmAAAEC2RTomc2yVEWAwF8FNLj7ViBAgACBkgps2LAhGhoaIpfLlXSeSgye1O4gsC2B
								1atXx8qVK7c1zPsEKlIg+d/2Tp06VWRukiJAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEEingAb3dK6brAkQIJAKgdtuuy1OPvnkaGy0e8GSJUtSsWaSLI/AihUrChMde+yxhXMnBNIo
								sOeee8Yf/vCH6NOnTxrTlzMBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgECFCdRU
								WD7SIUCAAIEMCVx33XWa2/+6nknzp4PARwLvvffeR6f+JJB6gfnz58dDDz2U+joUQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgUBkCGtwrYx1kQYAAgUwKDBo0KJN1taSogw8+uCW3
								uSejAhMmTMhoZcqqRoH+/fvHmDFjqrF0NRMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECJRAoG0JYgpJgAABAgTyAp/61KcKEt/+9rfjsssuK1xXw8kRRxwRM2bM+BuLaqhdjX9f4Pbb
								b48bbrghNmzY8PcHepdACgR23XXXyOVyKchUigQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAmkQ0OCehlWSIwECBDIg0KFDh0iaIKvpaNvWY7aa1ru5tXbp0qW5txhPgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBzAvovMv8EiuQAAECBAgQIECAQPYEFu/eGMtX
								NWavMBURIECAAIGUCPzfvj6NKCVLJU0CBAgQyLBA15U+US3Dy6s0AgQIEEiBwICFnsUpWCYpEiBA
								gAABAgQIpFSgJqV5S5sAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIEMiZgB/eMLahyCBAgQIAAAQKJwJo1a+Lll1+Ozp07AyFQMoFcLhe9evWK9u3bl2wOgQkQ
								IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKpLQIN7da23agkQIECAAIEqEJg3b14M
								GzYsNmzYUAXVKrG1BXr27BkzZsyIwYMHt3Yq5idAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEMiAQE0GalACAQIECBAgQIDAZgK//OUvNbdv5uG0tALvvvtuPPHEE6WdRHQCBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGqEbCDe9UstUIJECBAgACBahHYe++9tyg1l8tt
								ce2CQDEF6urqYty4ccUMKRYBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEAVC2hw
								r+LFVzoBAgQIlE/gzTffjDlz5pRvQjNVtUCyo/ZHx4EHHhjPPPPMR5f+JECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAAAECBAgQIECAQEULaHCv6OWRHAECBAikWWDx4sWF9C+66KJIvhwEyi0w
								b968ck9pPgIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLRYQIN7i+ncSIDA
								5gJLly6NmTNnRq9evTZ/2XmVC2y+i3Q1UtTX11dj2WquMIH333+/wjKSDoHiCPR6Jxed38wVJ5go
								BAgQIECAQLMFpo9ubPY9biBAgAABAgSKK/B/pvp7cXFFRSNAgAABAs0TGBQ1zbvBaAIECBAgQIAA
								AQIEtltAg/t2UxlIgEBTAsnuwPvuu29s2rSpqSFeJxDPPfdc1SlceOGFcfHFF+frbt++feRyfuBU
								dd8ErVTw+vXrY926dfnZ99hjj1bKwrQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBBovoAG9+abuYMAgU8ITJs2TXP7J0xc/q3Ayy+//LcvZvyVpME9+XIQKLfAXXfdFccff3x+
								2q5du8azzz5b7hTMV0UCe+65Z3Tv3r2KKlYqAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIBAKQU0uJdSV2wCVSKwzz77FCpt06ZNdOnSpXDtpLoFGhoaCrtIf+5zn6tuDNUTKKNAfX19
								Yba5c+fGgQceWLh2QqDYAp06dYqZM2fG0KFDix1aPAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAgSoU0OBehYuuZALFFmjb9uP/KRk+fHg8//zzxZ5CvJQKnHPOOfGzn/0sn32fPn1S
								WoW0CaRP4O23305f0jJOrcCqVavi6aef1uCe2hWUOAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECgsgQ+7kqtrLxkQ4AAAQIECBAg0EKB888/P2666aZIGt2T3bXbtWvXwkhuI7Btgbq6
								ujjmmGO2PdAIAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAtshoMF9O5AMIUCA
								AAECBAikSSBpan/zzTfTlLJcCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								kBeo4UCAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBCpB
								wA7ulbAKciBAgAABAgQIECBAoFkCnRpy0eb9XLPuMZgAAQIECBAopkBjMYOJRYAAAQIECLRAoL5H
								C25yCwECBAgQIFA0gZ+O2lC0WAIRIECAAAECzRc4r/m3uIMAgRQJ2ME9RYslVQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGRZwA7uWV5dtREgQIAAAQKZEnjk
								kUfitddei/79+2eqLsWkW2DYsGExYMCAdBchewIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAgYoR0OBeMUshEQIECBAgQIBA0wI/+tGP4uKLL256gHcItJJAu3btYsaMGTFy5MhWysC0
								BAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWRKoyVIxaiFAgAABAgQIZFXg4Ycf
								zmpp6kq5wLp16+L5559PeRXSJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqBSB
								VtnBffbs2XHvvffG0KFDo02bNpViIQ8CBFooMHPmzMKdjY2NhXMnBAgQIFA8gREjRsSTTz6ZD7jr
								rrvGHnvsUbzgIhHYAYG6urqYOHHiDkRwKwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAIGPBcre4D5v3rxImmA0wX68CM4IZEkg+e+4g8DWBF5++eX41a9+tbW3vEaAwHYILFy4sDDq
								q1/9alx//fWFaycECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIikDZG9z/
								8Ic/aG7PynePOghsRWDdunVbedVL1SrwyiuvFEq///77I/lyECCw4wJPPfXUjgcRgQABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAhUoUPYG98GDBxcY2rVrF8OHDy9cOyFAIJ0C
								9fX1sWDBgnzyvXv3TmcRsi6JQENDQ0niCkqg2gWWLFlS7QTqJxD7vpeLWFZDggABAgQIEGglgZFT
								PYdbid60BAgQIECAAAECBAgQIFAhAiMf9HfjClkKaRAgQIAAAQIECGRQoOwN7psb9u3bN2bNmrX5
								S84JEEihwH333Rfjx4/PZ969e/cUViDlUgnceOON8eUvfzmSRvf+/ftH27at+tgpVZniEiiLwBtv
								vBHvvvtufq6DDz64LHOahAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAuUW
								0GlYbnHzESBAoIoEhg4dGgsXLqyiipVKoHQCF154YVx55ZX5CZYuXRpTpkwp3WQiE2iGwH777Re1
								tbXNuMNQAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAk0LaHBv2sY7BAgQIECA
								AIGKEZg3b14hl9/+9reRfDkIVIJATU1NPPXUU3HQQQdVQjpyIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQSLlATcrzlz4BAgQIECBAoCoE1q5dWxV1KjJ9Aps2bYr58+enL3EZEyBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIVKSAHdwrclkkRYAAAQIECBDYUuCmm26K
								L33pS1FfXx+DBw+OnXbaacsBrgi0gkAul4va2tqYOHFiK8xuSgIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAgSwKaHDP4qqqiQABAgQIEMicQN++feOll17KXF0KIkCAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwOYCNZtfOCdAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAq0lUPYd3Ddt2lSotaGhoXDuhAABAgQIECBAgAAB
								AgQIECBAgACBdAjUvrAxHYnKkgABAgQIZFjghydnuDilESBAgACBFAhMeK5NCrKUIgECBAgQIECA
								AIF0CpR9B/d58+YVpFasWFE4d0KAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAEC1S1Q9h3c+/XrVxDv2LFj4dwJAQLZEHj33XfjmmuuyUYxqiBAgAABAgS2KVBX
								Vxdf+MIXtjnOAAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQLbI1D2Bvedd965
								kFePHj0K504IEEivwOLFiwvJJ+fnn39+4doJAQIECBAgkH2B3/3ud5rcs7/MKiRAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIlEWgpiyzmIQAgUwLtG/fPtP1KY4AAQIECBD4+wJLliz5
								+wO8S4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQGA7Bcq+g/t25mUYAQIpEjj1
								1FPjwQcfjJkzZ8aQIUOiU6dOKcpeqgQIECBAgEBLBXK5XNTW1saxxx7b0hDuI0CAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQIECAAAECBAgQILCFgAb3LThcECDQUoG77rqrpbe6jwABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBeoIYDAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCoBAE7uFfCKsiBAAECBAgQIECAAAECBAgQ
								IECAQIoEnh/RJkXZSpUAAQIECBAgQIAAAQIECBRfYN/GxuIHFZEAAQIECBDYboFXtnukgQQIpFHA
								Du5pXDU5EyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIIMC
								rbqD+/Lly2PSpEkZZFUSAQIECBAgQIAAgeoQqKuri+OOO646ilUlAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgQIBAyQXK3uD+zjvvFIqqr6+Pyy+/vHDthAABAgQIECBAgACB9Ak8+OCD
								cfjhh6cvcRkTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhUnEBNuTPabbfdyj2l
								+QgQIECAAAECBAgQKKHAmjVrShhdaAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								gWoSKPsO7v/wD/8QF154YTzyyCMxdOjQ6Ny5czV5q5UAAQIECBAgQIBAZgRyuVzU1tbGhAkTMlOT
								QggQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBFpXINf44dG6KZidAAECBAgQIECA
								AAECzRPYUPeZiOdfaN5NRhMgQIAAAQIECBAgQIAAAQIECBAgQIAAgSIJ7KvdpkiSwhAgQIAAgZYJ
								vBJrW3ajuwgQSIVATSqylCQBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIZF7ADu6ZX2IFEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAIB0CdnBPxzrJkgABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABApkX0OCe+SVWIAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBNIhoME9HeskSwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECGReQIN75pdYgQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEEiHgAb3dKyTLAkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIJB5AQ3umV9iBRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQCAdAhrc07FOsiRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEDmBTS4Z36JFUiAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAIF0CGhwT8c6yZIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQKZF9DgnvklViABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgTSIaDBPR3rJEsCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAhkXkCDe+aXWIEECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBBIh4AG93SskywJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECCQeQEN7plfYgUSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIEAgHQIa3NOxTrIkQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIBA5gU0uGd+iRVIgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBdAhocE/HOsmSAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECmRfQ4J75JVYgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIE0iGgwT0d6yRLAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIZF5Ag3vml1iBBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQSIeABvd0rJMsCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgkHkBDe6ZX2IFEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAIB0CGtzTsU6yJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAQOYFNLhnfokVSIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAgXQIaHBPxzrJkgABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABApkX0OCe+SVWIAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBNIhoME9HeskSwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECGReQIN75pdYgQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEEiHgAb3dKyTLAkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIJB5AQ3umV9iBRIgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQCAdAhrc07FOsiRAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgEDmBTS4Z36JFUiAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAIF0CGhwT8c6yZIAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQKZF9DgnvklViABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgTSIaDBPR3rJEsCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAhkXkCDe+aXWIEECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBBIh4AG93SskywJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECCQeQEN7plfYgUSIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIEAgHQIa3NOxTrIkQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIBA5gU0uGd+iRVIgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBdAhocE/HOsmSAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
								IECAAAECBAgQIECAAAECmRfQ4J75JVYgAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAg
								QIAAAQIECBAgQIAAAQIE0iGgwT0d6yRLAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIZF5Ag3vml1iBBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECA
								AAECBAgQIECAAAECBAgQSIeABvd0rJMsCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA
								AQIECBAgQIAAAQIECBAgkHkBDe6ZX2IFEiBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAIB0CGtzTsU6yJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIECAQOYFNLhnfokVSIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIE
								CBAgQIAAAQIECBAgQIAAgXQIaHBPxzrJkgABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABApkX0OCe+SVWIAECBAgQIECAAAECBAgQaH2BtWvXxrPPPhsbN25s/WRk
								QIAAAQIEqlDAs7gKF13JBAgQIFBRAo2NjfGnP/0pVq5cWVF5SYYAAQIECFSTwIIFC+KNN96oppLV
								SoAAAQIEUiugwT21SydxAgQIECBAgAABAgQIECBQuQL19fUxbty4GDZsWPzmN7+JESNGxLnnnhvD
								hw+PWbNmVW7iMiNAgAABAhkR8CzOyEIqgwABAgRSK5A0tH/3u9+NvfbaK6655po48cQT4+tf/3qM
								HDkybr755tTWJXECBAgQIJAmgVtvvTX22WefOOWUU+L666+Pgw8+OI488sj41re+laYy5EqAAAEC
								BKpSQIN7VS67ogkQIECAAAECBAgQIECAQGkFrrjiihgzZkzcfffdcfbZZ8dFF10U06dPj2nTpuV/
								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
								IECAAAECBAgQIECAAIGMCyxdujQeeuihSD72dc2aNdG7d+9IfsA/YMCAjFeuPAIECBAgUBkCnsWV
								sQ6yIECAAIHqFWhoaIhf/epXkXyyynHHHRfdu3ePP/3pT1FXVxe5XK56YVROgAABAgRaQeC1116L
								M888M44++ug466yzWiEDUxIgQIAAAQLNEdDg3hwtYwkQIECAAAECBAgQIECAAAECBAgQIECAAAEC
								BAgQIECAAAECBAgQIEAgFQLJL5rNmzcv/wmj/fr1i0GDBuU/TSUVyUuSAAECBAhUsUBNFdeudAIE
								CBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIoMDUqVNjr732itNOOy0mTJgQ
								l1xySdTW1sbPf/7zDFarJAIECBAgkC2BttkqRzUECBAgQIAAAQIECBAgQIBAJQice+65cf/99281
								lVGjRsXtt9++1fe8SIAAAQIECBRHwLO4OI6iECBAgACBlgokDXWTJ09u8vb58+c3+Z43CBAgQIAA
								gR0XWLNmTVx77bXx2muvxU477RRTpkyJxYsXxx133JFvdh8zZkz0799/xycSgQABAgQIECiJgAb3
								krAKSoAAAQIECBAgQIAAAQIEqlvg0ksvjVmzZkXSXJf8oGDzo02bNptfOidAgAABAgRKIOBZXAJU
								IQkQIECAQDMETjjhhJg5c2bkcrm47LLLmnGnoQQIECBAgEAxBN57773o3r17vrk9ibfnnnvG448/
								Hsm/T3/+85+POXPmaHAvBrQYBAgQIECgRAK5xg+PEsUWlgABAgQIECBAgAABAgQIEKhigWRnnH/+
								53+O++67r4oVlE6AAAECBFpPwLO49ezNTIAAAQIEEoH169fH2LFj49Zbb42ePXtCIUCAAAECBMos
								cNxxx0VNTU2MHDkybrnllrjpppuivr4+Jk2alP9FtI4dO5Y5I9MRIECAAAEC2yugwX17pYwjQIAA
								AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVQIbNy4MX7729/Gc889F1/5ylfy
								u7i/+OKL0a9fv9hll11SUYMkCRAgQIBAtQpocK/WlVc3AQIECBAgQIAAAQIECBAoocCf//zn/Me/
								9u7du4SzCE2AAAECBAg0JeBZ3JSM1wkQIECAQHkEFi9eHEuXLo0RI0aUZ0KzECBAgAABAlsIrFu3
								Lv7nf/4nDjnkkC1ed0GAAAECBAikQ6AmHWnKkgABAgQIECBAgAABAgQIEEiTwA033BC1tbVx1113
								pSltuRIgQIAAgcwIeBZnZikVQoAAAQIpFZg+fXoccMAB8f3vfz82bNiQ0iqkTYAAAQIE0ivw/vvv
								x6GHHhpHH310/pfO0luJzAkQIECAQHUKaHCvznVXNQECBAgQIECAAAECBAgQKLnAFVdcEXfccUd8
								8YtfjHvuuSeSj4N1ECBAgAABAuUT8Cwun7WZCBAgQIDA1gTOOuus/Mt1dXXx05/+NJJGOwcBAgQI
								ECBQPoGRI0fG8ccfH5/73Ofie9/7Xrz++uvlm9xMBAgQIECAwA4JaHDfIT43EyBAgAABAgQIECBA
								gAABAk0J7L777vnG9uQHB7fddlsMHjw4jjnmmPj5z3/e1C1eJ0CAAAECBIoo4FlcREyhCBAgQIBA
								CwTatWsXl112Wdx5553x0ksvxfDhw2PMmDHxL//yLy2I5hYCBAgQIECgJQInnHBCPPXUU9G5c+f8
								ju5Js3vyS2ia3Vui6R4CBAgQIFA+gbblm8pMBAgQIECAAAECBAgQIECAQDUKfPnLX47ka9myZfGn
								P/0pVq9eXY0MaiZAgAABAq0m4FncavQmJkCAAAECeYGksf1nP/tZXHnllfHcc8/F3LlzyRAgQIAA
								AQJlFOjZs2dMmjQpLr744njhhRdizpw50aZNmzJmYCoCBAgQIECguQK5xg+P5t5kPAECBAgQIECA
								AAECBAgQIEDg7wn85je/ib333juGDBny94Z5jwABAgQIECiRgGdxiWCFJUCAAAEC2ymQNLEvXLgw
								v2P7dt5iGAECBAgQIFBEgWSjlSlTpsSZZ55ZxKhCESBAgAABAuUS0OBeLmnzECBAgAABAgQIECBA
								gACBKhd4+umn46CDDqpyBeUTIECAAIHWE/Asbj17MxMgQIAAgUQgaXrv06dPdO3aFQgBAgQIECDQ
								CgKLFy+OtWvXxsCBA1thdlMSIECAAAECzRFo25zBxhIgQIAAAQIECBAgQIAAAQIEtkdg9uzZsWTJ
								ki2Gnn766fGLX/widt1119h///23eM8FAQIECBAgUFwBz+LieopGgAABAgSaK5Ds3v7SSy9tcdtV
								V10VRxxxRAwdOjQOPfTQLd5zQYAAAQIECBRXYNWqVTFjxowtgj7++OOxdOnSOOGEE/L/Rp38W7WD
								AAECBAgQqEwBDe6VuS6yIkCAAAECBAgQIECAAAECqRa477774oc//GEcddRR0aFDh3wt9fX1cfPN
								N+d/kK/BPdXLK3kCBAgQSIGAZ3EKFkmKBAgQIJBpgaS5fdy4cTF69Ojo3bt3vtZ58+bFAw88kG+2
								0+Ce6eVXHAECBAhUgEDS4H7aaadF586dY+TIkfmMFixYEKtXr44PPvgg/6kqGtwrYKGkQIAAAQIE
								mhDINX54NPGelwkQIECAAAECBAgQIECAAAECLRa4995749prr41rrrkm6urqYvjw4TFnzpwWx3Mj
								AQIECBAg0DwBz+LmeRlNgAABAgSKLTB37tw455xz4swzz4yJEydG8slmZ5xxRr7pvdhziUeAAAEC
								BAj8rcCKFSvi7LPPjsGDB8cll1wSd9xxRyxatCi+973v/e1grxAgQIAAAQIVJWAH94paDskQIECA
								AAECBAgQIECAAIHsCIwfPz5GjRoVZ511Vv6H9xs3bsxOcSohQIAAAQIpEPAsTsEiSZEAAQIEMi0w
								bNiweOihh2Ly5Mn5ndsbGhoyXa/iCBAgQIBApQkkO7TfdtttMWXKlDjssMPy/06d7OjuIECAAAEC
								BCpfoKbyU5QhAQIECBAgQIAAAQIECBAgkFaBPfbYI/7rv/4r/zGwNTX+GSKt6yhvAgQIEEivgGdx
								etdO5gQIECCQDYF27drFj3/84/j6178e8+fPj/bt22ejMFUQIECAAIEUCZx88snxi1/8Iv73f/83
								unXrlqLMpUqAAAECBKpXINf44VG95aucAAECBAgQIECAAAECBAgQKJfA008/HQcddFC5pjMPAQIE
								CBAg8AkBz+JPgLgkQIAAAQJlFpg7d2706dMnunbtWuaZTUeAAAECBAgkAosXL461a9fGwIEDgRAg
								QIAAAQIVLtC2wvOTHgECBAgQIECAAAECBAgQIJBCgdmzZ8eSJUu2yPz000/P75KTfCzs/vvvv8V7
								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
								AgQIECBAgAABAgQI1LLAyZMn48yZM61auPPOO6Njx46tHnOHAAECBAgQqI6Atbg6rvZKgAABAgRu
								VKD4TFysx5dvt912W9x+++2XP+Q2AQIECBAgUCWBf/75J44dO9Zq78VZ3C9ecbTVE+4QIECAAAEC
								yQg0JFOJQggQIECAAAECBAgQIECAAIG6E1i+fHkUZ2wfNWpU+VPcLi77WpxN9rvvvqu7fjVEgAAB
								AgRSE7AWpzYR9RAgQIBAbgLffPNNDB48OAYNGhSTJk0qPyMPGTIkhg8fHh9++GFuHPolQIAAAQLt
								LvDHH3/Egw8+GH369IkpU6ZE3759y3X53nvvjVdffTWKALyNAAECBAgQSE9AwD29maiIAAECBAgQ
								IECAAAECBAjUjUARZn///ffj999/j0OHDpWXZX/33Xfjs88+iyVLltRNnxohQIAAAQKpCliLU52M
								uggQIEAgF4EHHnggnn322Th69Gjs2bMndu7cGc8991zs2LEjPvjggzh79mwuFPokQIAAAQL/ikC/
								fv1iwoQJUQTdf/755zhy5Eg8/vjj8dNPP8WpU6di8+bN/0pdDkqAAAECBAhcW0DA/do+niVAgAAB
								AgQIECBAgAABAgRuQWDdunXR2NgYDQ0NUalU4sknn4y1a9eWZ3EvLtNuI0CAAAECBKorYC2urq+9
								EyBAgACB6wls3LixPFtsly5dypfef//9sWXLlujatWuMGDEiDh8+fL1deJ4AAQIECBC4BYEi1H7H
								HXeUV1EpdtOjR4/yfhFwf/TRR2Pfvn23sHdvJUCAAAECBKol0KFaO7ZfAgQIECBAgAABAgQIECBA
								gMDs2bNj3rx58cILL5SXev3444/Ly742NTWVIXdCBAgQIECAQHUFrMXV9bV3AgQIECBwPYGnnnoq
								Zs2aVZ4tdtCgQbFhw4YYO3ZsbN26NXbv3h1333339XbheQIECBAgQOAWBIo/KCtC7m+++WZMmjQp
								tm/fHj/++GN069YtVqxYUa7Nt7B7byVAgAABAgSqJFBpOb9Vad92S4AAAQIECBAgQIAAAQIECBCI
								b7/9Nr744ovyrDhFyG7cuHHlL/InTpwYHTt2JESAAAECBAhUWcBaXGVguydAgAABAtcR+OWXX2LN
								mjVx/PjxmDlzZjzxxBNRnDW2CLx37979Ou/2NAECBAgQIHCrAn/++WesWrWq/OOyxx57rFyPT548
								GadPn4577rnnVnfv/QQIECBAgEAVBATcq4BqlwQIECBAgAABAgQIECBAgMAFgc2bN8cbb7xRXua1
								UqmUDz7yyCOxbt06RAQIECBAgEA7CFiL2wHZIQgQIECAwDUEjhw5Ul7Z7Pvvv4+Ln4uLlx86dOga
								7/IUAQIECBAg0JYCCxcuLE/Ccu7cuUu7Lb6jLr6rthEgQIAAAQJpCnRIsyxVESBAgAABAgQIECBA
								gAABAvUgUFzideXKlTFhwoR6aEcPBAgQIECg5gSsxTU3MgUTIECAQJ0JFOG5GTNmxFdffVVnnWmH
								AAECBAjUhkBzc3McPHgw9u/f3+qPzWqjelUSIECAAIF8BRrybV3nBAgQIECAAAECBAgQIECAQLUF
								Ro4cWZ69vdrHsX8CBAgQIEDg6gLW4qu7eJQAAQIECLSXwIgRI+LAgQPR0tLSXod0HAIECBAgQOAy
								gf79+8eZM2fKn8sedpMAAQIECBBIXKBy/oO0T9KJD0l5BAgQIECAAAECBAgQIECgVgV27doV48eP
								j4EDB0b37t3LNsaNGxdNTU212pK6CRAgQIBATQlYi2tqXIolQIAAgToUOHHiREyePDmOHj1afja+
								2OL27dsv3vQvAQIECBAgUGWB+fPnx9q1a6P4I/BKpVIerfiOuviu2kaAAAECBAikKSDgnuZcVEWA
								AAECBAgQIECAAAECBOpCYM6cOTFlypSYOXNmNDRcuJBcly5dok+fPnXRnyYIECBAgEDqAtbi1Cek
								PgIECBCod4FVq1bFtm3bYsmSJVF8Hr64DRo06OJN/xIgQIAAAQJVFGhubo65c+fG6tWro2fPnpeO
								1Ldv3+jcufOl+24QIECAAAECaQl0SKsc1RAgQIAAAQIECBAgQIAAAQL1JFD8wmDq1KkxePDgempL
								LwQIECBAoGYErMU1MyqFEiBAgECdChRr8ZgxY2LYsGF12qG2CBAgQIBA2gLdunWLIUOGlOtx2pWq
								jgABAgQIELhcQMD9cg23CRAgQIAAAQIECBAgQIAAgTYVmDhxYjQ2Nsb06dOj+EVCsRW/1F+8eHGb
								HsfOCBAgQIAAgasLWIuv7uJRAgQIECDQXgJDhw6NRYsWxaZNm6I4U2ylUikP3dTU1F4lOA4BAgQI
								EMhaoLiCyt69e2PatGnld9MdOlyIyxXfUfsDtKz/a2ieAAECBBIXEHBPfEDKI0CAAAECBAgQIECA
								AAECtSwwevToWLlyZasWevfu3eq+OwQIECBAgED1BKzF1bO1ZwIECBAgcCMCvXr1uuJz8Y28z2sI
								ECBAgACBthHo1KlTLF269IqdFVdZsREgQIAAAQLpClRazm/plqcyAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhFoCGXRvVJgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAgEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIEMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gAABAmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECBAIBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgQIpC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gACBbAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								ECCQtoCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AgSyERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								gEDaAgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								EMhGQMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB
								AmkLCLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBA
								IBsBAfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI
								pC0g4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACB
								bAQE3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQ
								toCAe9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSy
								ERBwz2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDa
								AgLuac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhG
								QMA9m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkL
								CLinPR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsB
								AfdsRq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g
								4J72fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE
								3LMZtUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCA
								e9rzUR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBw
								z2bUGiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLu
								ac9HdQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9
								m1FrlAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLin
								PR/VESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfds
								Rq1RAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72
								fFRHgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZ
								tUYJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rz
								UR0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bU
								GiVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9H
								dQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1Fr
								lAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/V
								ESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1R
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRH
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJ
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0B
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyERBwz2bUGiVAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEDaAgLuac9HdQQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMhGQMA9m1FrlAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmkLCLinPR/VESBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIBsBAfdsRq1RAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIpC0g4J72fFRHgAABAgQI
								ECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBbAQE3LMZtUYJECBAgAAB
								AgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQtoCAe9rzUR0BAgQIECBA
								gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyEfgv9qBtggWO5bwAAAAA
								SUVORK5CYII=
								"
								>
								</div>

								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Compute heatmap data:</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[33]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-heatmap.py --input matrix.greengenes.biom --output test.heatmap --normalize <span class="m">1</span> --format biom
								</pre></div>

								</div>
								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Plot normalized heatmap:</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[35]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="o">!</span> mg-compare-heatmap-plot.py --input test.heatmap --format biom --plot myHeatmap2 --height <span class="m">5</span> --width <span class="m">4</span> --dpi <span class="m">200</span> --rlib<span class="o">=</span><span class="nv">$rlib</span> 
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt"></div>
								<div class="output_subarea output_stream output_stdout output_text">
								<pre>ERROR: input BIOM data not correct format
								</pre>
								</div>
								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing text_cell rendered">
								<div class="prompt input_prompt">
								</div>
								<div class="inner_cell">
								<div class="text_cell_render border-box-sizing rendered_html">
								<p>Display image:</p>

								</div>
								</div>
								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[26]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre><span class="kn">from</span> <span class="nn">IPython.display</span> <span class="kn">import</span> <span class="n">Image</span>
								<span class="n">Image</span><span class="p">(</span><span class="n">filename</span><span class="o">=</span><span class="s">&#39;myHeatmap2.png&#39;</span><span class="p">)</span> 
								</pre></div>

								</div>
								</div>
								</div>

								<div class="output_wrapper">
								<div class="output">


								<div class="output_area"><div class="prompt output_prompt">Out[26]:</div>


								<div class="output_png output_subarea output_execute_result">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAPoCAYAAAAmy5qxAAAD8GlDQ1BJQ0MgUHJvZmlsZQAAOI2N
								Vd1v21QUP4lvXKQWP6Cxjg4Vi69VU1u5GxqtxgZJk6XpQhq5zdgqpMl1bhpT1za2021Vn/YCbwz4
								A4CyBx6QeEIaDMT2su0BtElTQRXVJKQ9dNpAaJP2gqpwrq9Tu13GuJGvfznndz7v0TVAx1ea45hJ
								GWDe8l01n5GPn5iWO1YhCc9BJ/RAp6Z7TrpcLgIuxoVH1sNfIcHeNwfa6/9zdVappwMknkJsVz19
								HvFpgJSpO64PIN5G+fAp30Hc8TziHS4miFhheJbjLMMzHB8POFPqKGKWi6TXtSriJcT9MzH5bAzz
								HIK1I08t6hq6zHpRdu2aYdJYuk9Q/881bzZa8Xrx6fLmJo/iu4/VXnfH1BB/rmu5ScQvI77m+Bkm
								fxXxvcZcJY14L0DymZp7pML5yTcW61PvIN6JuGr4halQvmjNlCa4bXJ5zj6qhpxrujeKPYMXEd+q
								00KR5yNAlWZzrF+Ie+uNsdC/MO4tTOZafhbroyXuR3Df08bLiHsQf+ja6gTPWVimZl7l/oUrjl8O
								cxDWLbNU5D6JRL2gxkDu16fGuC054OMhclsyXTOOFEL+kmMGs4i5kfNuQ62EnBuam8tzP+Q+tSqh
								z9SuqpZlvR1EfBiOJTSgYMMM7jpYsAEyqJCHDL4dcFFTAwNMlFDUUpQYiadhDmXteeWAw3HEmA2s
								15k1RmnP4RHuhBybdBOF7MfnICmSQ2SYjIBM3iRvkcMki9IRcnDTthyLz2Ld2fTzPjTQK+Mdg8y5
								nkZfFO+se9LQr3/09xZr+5GcaSufeAfAww60mAPx+q8u/bAr8rFCLrx7s+vqEkw8qb+p26n11Aru
								q6m1iJH6PbWGv1VIY25mkNE8PkaQhxfLIF7DZXx80HD/A3l2jLclYs061xNpWCfoB6WHJTjbH0mV
								35Q/lRXlC+W8cndbl9t2SfhU+Fb4UfhO+F74GWThknBZ+Em4InwjXIyd1ePnY/Psg3pb1TJNu15T
								MKWMtFt6ScpKL0ivSMXIn9QtDUlj0h7U7N48t3i8eC0GnMC91dX2sTivgloDTgUVeEGHLTizbf5D
								a9JLhkhh29QOs1luMcScmBXTIIt7xRFxSBxnuJWfuAd1I7jntkyd/pgKaIwVr3MgmDo2q8x6IdB5
								QH162mcX7ajtnHGN2bov71OU1+U0fqqoXLD0wX5ZM005UHmySz3qLtDqILDvIL+iH6jB9y2x83ok
								898GOPQX3lk3Itl0A+BrD6D7tUjWh3fis58BXDigN9yF8M5PJH4B8Gr79/F/XRm8m241mw/wvur4
								BGDj42bzn+Vmc+NL9L8GcMn8F1kAcXgSteGGAABAAElEQVR4Ae3dfaze5V0/8Ou0py2lhbZrT8to
								C4FBgeF42n4oixjndNkW3AZuZjWZ0WTRSTLZjJKYGaUxxi38o1GyIGabEjdCMseYRp2CZiDOh5FU
								cBDYaBG6la0th4eu5fTh/Li/s4fePfd9zn3O/f1e3+u+rtdJGu6H7/f6XJ/X5+LhzXkam371I/gg
								QIAAAQIECBAgQIBABIElEWooQYAAAQIECBAgQIAAgUpAAHEQCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogkIINGoFSJAgAABAgQIECBAQABxBggQ
								IECAAAECBAgQiCYggESjVogAAQIECBAgQIAAAQHEGSBAgAABAgQIECBAIJqAABKNWiECBAgQIECA
								AAECBAQQZ4AAAQIECBAgQIAAgWgCAkg0aoUIECBAgAABAgQIEBBAnAECBAgQIECAAAECBKIJCCDR
								qBUiQIAAAQIECBAgQEAAcQYIECBAgAABAgQIEIgmIIBEo1aIAAECBAgQIECAAAEBxBkgQIAAAQIE
								CBAgQCCagAASjVohAgQIECBAgAABAgQEEGeAAAECBAgQIECAAIFoAgJINGqFCBAgQIAAAQIECBAQ
								QJwBAgQIECBAgAABAgSiCQgg0agVIkCAAAECBAgQIEBAAHEGCBAgQIAAAQIECBCIJiCARKNWiAAB
								AgQIECBAgAABAcQZIECAAAECBAgQIEAgmoAAEo1aIQIECBAgQIAAAQIEBBBngAABAgQIECBAgACB
								aAICSDRqhQgQIECAAAECBAgQEECcAQIECBAgQIAAAQIEogmMR6ukEIGCBa479Jbw+PQjBQuk3frG
								+46nvcHCd/e9n/X/ylI+Akv2TKe8veL39sTmqeINAKQn4J/q6c3EjggQIECAAAECBAhkKyCAZDta
								jREgQIAAAQIECBBIT0AASW8mdkSAAAECBAgQIEAgWwEBJNvRaowAAQIECBAgQIBAegICSHozsSMC
								BAgQIECAAAEC2QoIINmOVmMECBAgQIAAAQIE0hMQQNKbiR0RIECAAAECBAgQyFZAAMl2tBojQIAA
								AQIECBAgkJ6AAJLeTOyIAAECBAgQIECAQLYCAki2o9UYAQIECBAgQIAAgfQEBJD0ZmJHBAgQIECA
								AAECBLIVGJ+rs3POOSfs2bMnrFy5MoyNjc11qfcIFC2wbdu28K//+q/htNNOK9pB8wQIECBAgACB
								+QTmDCDPPvtsmJ6eDgcPHpxvHe8TKFpg165dYWpqSgAp+hRongABAgQIEBhEYM4AsmLFinD48OHw
								wAMPhM2bNw+ynmsIFCmwYcOGcMYZZxTZu6YJECBAgAABAgsRmDOAnPiyq61bt4Zzzz13Ieu6lgAB
								AgQIECBAgAABArMEfBP6LBIvECBAgAABAgQIECDQlIAA0pSsdQkQIECAAAECBAgQmCUggMwi8QIB
								AgQIECBAgAABAk0JCCBNyVqXAAECBAgQIECAAIFZAgLILBIvECBAgAABAgQIECDQlIAA0pSsdQkQ
								IECAAAECBAgQmCUggMwi8QIBAgQIECBAgAABAk0JCCBNyVqXAAECBAgQIECAAIFZAgLILBIvECBA
								gAABAgQIECDQlIAA0pSsdQkQIECAAAECBAgQmCUwPusVLxAgULvAPdeMhbDz1T8+EhVYmui+bIvA
								KAj4Z1vSU5pOenc2V6iAz4AUOnhtEyBAgAABAgQIEGhDQABpQ11NAgQIECBAgAABAoUKCCCFDl7b
								BAgQIECAAAECBNoQEEDaUFeTAAECBAgQIECAQKECAkihg9c2AQIECBAgQIAAgTYEBJA21NUkQIAA
								AQIECBAgUKiAAFLo4LVNgAABAgQIECBAoA0BAaQNdTUJECBAgAABAgQIFCoggBQ6eG0TIECAAAEC
								BAgQaENAAGlDXU0CBAgQIECAAAEChQoIIIUOXtsECBAgQIAAAQIE2hAYb6OomgRyEJicnAz/9E//
								FDZv3hy2bt0atmzZkkNbeiBAgAABAgQINCoggDTKa/GcBa688sqwe/fuqsWVK1eGPXv2hHXr1uXc
								st4IECBAgAABAkMLCCBDE1qgVIHx8R/+7bNp06bw5je/OaxevbpUCn0TIECAAAECBAYW8D0gA1O5
								kEC3wNlnn129cNttt4W//du/DcuWLeu+wDMCBAgQIECAAIFZAgLILBIvECBAgAABAgQIECDQlIAA
								0pSsdQkQIECAAAECBAgQmCUggMwi8QIBAgQIECBAgAABAk0JCCBNyVqXAAECBAgQIECAAIFZAgLI
								LBIvECBAgAABAgQIECDQlIAA0pSsdQkQIECAAAECBAgQmCUggMwi8QIBAgQIECBAgAABAk0JCCBN
								yVqXAAECBAgQIECAAIFZAgLILBIvECBAgAABAgQIECDQlIAA0pSsdQkQIECAAAECBAgQmCUggMwi
								8QKB/gJ/9Vd/FVauXBle//rXh4ceeqi68Kmnnup/g3cIECBAgAABAgS6BMa7nnlCgMCcAvfee284
								fPhw2Lt378x1u3btmnnsAQECBAgQIECAwNwCPgMyt493CXQJXHHFFdXz6667Llx22WXV47e//e1d
								13hCgAABAgQIECDQX8BnQPrbeIdAX4FNmzaFF198se/73iBAgAABAgQIEOgt4DMgvV28SoAAAQIE
								CBAgQIBAAwICSAOoliRAgAABAgQIECBAoLeAANLbxasECBAgQIAAAQIECDQgIIA0gGpJAgQIECBA
								gAABAgR6CwggvV28SoAAAQIECBAgQIBAAwICSAOoliRAgAABAgQIECBAoLeAANLbxasECBAgQIAA
								AQIECDQgIIA0gGpJAgQIECBAgAABAgR6CwggvV28SoAAAQIECBAgQIBAAwICSAOolixD4ODBg1Wj
								d999d7jrrrvKaFqXBAgQIECAAIEhBQSQIQHdXq7A7t27q+Y7AWT79u3he9/7XrkYOidAgAABAgQI
								DCgwPuB1LiNA4BSBT37yk+H2228PV155Zbj00kvDxo0bT7nCUwIECBAgQIAAgVMFBJBTRTwnMKDA
								hz/84dD544MAAQIECBAgQGBwAV+CNbiVKwkQIECAAAECBAgQGFJAABkS0O0ECBAgQIAAAQIECAwu
								IIAMbuVKAgQIECBAgAABAgSGFBBAhgR0OwECBAgQIECAAAECgwsIIINbuZIAAQIECBAgQIAAgSEF
								BJAhAd1OgAABAgQIECBAgMDgAgLI4FauJECAAAECBAgQIEBgSAEBZEhAtxMgQIAAAQIECBAgMLiA
								ADK4lSsJECBAgAABAgQIEBhSQAAZEtDtBAgQIECAAAECBAgMLiCADG7lSgIECBAgQIAAAQIEhhQQ
								QIYEdDsBAgQIECBAgAABAoMLCCCDW7mSAAECBAgQIECAAIEhBQSQIQHdToAAAQIECBAgQIDA4AIC
								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
								5qkbAgQIECBAgAABAkkLCCBJj8fmCBAgQIAAAQIECOQlIIDkNU/dECBAgAABAgQIEEhaQABJejw2
								R4AAAQIECBAgQCAvAQEkr3nqhgABAgQIECBAgEDSAgJI0uOxOQIECBAgQIAAAQJ5CQggec1TNwQI
								ECBAgAABAgSSFhhPenc2RyARgdtvvz189atfDQcOHKh2tH///kR2ZhsECBAgQIAAgdESEEBGa152
								25LARz/60XDkyJGZ6g888EC4+eabZ557QIAAAQIECBAgMJiAL8EazMlVhQusXr26Erjkkkuqv77l
								LW8pXET7BAgQIECAAIHFCQggi3NzV2ECp512WtXxT//0T1d/3bJlS2EC2iVAgAABAgQI1CMggNTj
								aBUCBAgQIECAAAECBAYQEEAGQHIJgbkE9u3bF2644Ya5LvEeAQIECBAgQIDA/wkIII4CgSEFJicn
								w5e+9KXwjW98Y8iV3E6AAAECBAgQyF9AAMl/xjpsWGBsbKyqsGbNmoYrWZ4AAQIECBAgMPoCAsjo
								z1AHLQucCCAtb0N5AgQIECBAgMBICAggIzEmmyRAgAABAgQIECCQh4AAksccdUGAAAECBAgQIEBg
								JAQEkJEYk00SIECAAAECBAgQyENAAMljjrogQIAAAQIECBAgMBICAshIjMkmCRAgQIAAAQIECOQh
								IIDkMUddECBAgAABAgQIEBgJAQFkJMZkkwQIECBAgAABAgTyEBBA8pijLggQIECAAAECBAiMhIAA
								MhJjskkCBAgQIECAAAECeQgIIHnMURctCkxPT7dYXWkCBAgQIECAwGgJCCCjNS+7TVDgRAB57LHH
								EtydLREgQIAAAQIE0hIQQNKah92MsMDY2NgI797WCRAgQIAAAQJxBASQOM6qFCCwcuXKArrUIgEC
								BAgQIEBgOAEBZDg/dxMgQIAAAQIECBAgsAABAWQBWC4lQIAAAQIECBAgQGA4AQFkOD93EyBAgAAB
								AgQIECCwAAEBZAFYLiVAgAABAgQIECBAYDgBAWQ4P3cTIECAAAECBAgQILAAAQFkAVguJUCAAAEC
								BAgQIEBgOAEBZDg/dxMgQIAAAQIECBAgsAABAWQBWC4lQIAAAQIECBAgQGA4AQFkOD93EyBAgAAB
								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
								AgQIECBAgAABAokJjCe2H9shkKzAl7/85bB9+/Zw5plnhtWrV3ft86KLLgr33HNPWLZsWdfrnhAg
								QIAAAQIECHQLzBlApqenq6sPHDgQVq1a1X2nZwRGSOD48eND7/bee+8Nhw4dqv4899xzXet95zvf
								CS+//HJYt25d1+ueECBAgAABAgQIdAvMGUCmpqaqq6+66qruuzwjMMIChw8fXtTuL7vssuq+n/mZ
								nwk7duzoWmPr1q3CR5eIJwQIECBAgACB3gJzBpDXve51Yd++fb3v9CqBERUYH5/z2M/b1cTERLjm
								mmvmvc4FBAgQIECAAAECswXm/C+x73//++HEl2HNvtUrBEZHoPMlWCeCx4m/js7u7ZQAAQIECBAg
								kI/AnAGk0+bY2Fg+3eqkWAHnuNjRa5wAAQIECBBITMCP4U1sILZDgAABAgQIECBAIGcBASTn6eqN
								AAEC2mncAgAAGRBJREFUBAgQIECAQGICAkhiA7EdAgQIECBAgAABAjkLCCA5T1dvBAgQIECAAAEC
								BBITEEASG4jtECBAgAABAgQIEMhZQADJebp6I0CAAAECBAgQIJCYgACS2EBshwABAgQIECBAgEDO
								AvP+HpCcm9cbgZMFjh07Fnbs2HHyS12PH3zwwep55xd0+iBAgAABAgQIEFicgACyODd3ZSTwyiuv
								VN10Asgtt9wyb2f//u//Pu81LiBAgAABAgQIEOgtIID0dvFqQQJveMMbwgc+8IEwOTkZLrjggr6d
								P/zww6ETPq644oq+13iDAIH6BdaGsfoXtSIBAgQItCYggLRGr3BKAnffffe82/njP/7jKoBs2bJl
								3mtdQIAAAQIECBAg0FvAN6H3dvEqAQIECBAgQIAAAQINCAggDaBakgABAgQIECBAgACB3gICSG8X
								rxIgQIAAAQIECBAg0ICAANIAqiUJECBAgAABAgQIEOgtIID0dvEqAQIECBAgQIAAAQINCAggDaBa
								kgABAgQIECBAgACB3gICSG8XrxIgQIAAAQIECBAg0ICAANIAqiUJECBAgAABAgQIEOgtIID0dvEq
								AQIECBAgQIAAAQINCPhN6A2gWjJvgZdffjns2rWrq8kNGzaEM844o+s1TwgQIECAAAECBGYLCCCz
								TbxCoKfAY489Vr1+7733hs6fkz/WrVsXdu/eHc4888yTX/aYAAECBAgQIEDgFAFfgnUKiKcE+glc
								c801YcmSJWHFihVh9erVXX/OO++8sHz58n63ep0AAQIECBAgQOD/BMamX/2gQSB3gePHj4elS5dW
								be7bty+sX78+astHr/h/Iex8JGpNxQjkIvB88K+plGe5LoylvL3i9zY+fbh4AwDpCfgMSHozsSMC
								BAgQIECAAAEC2QoIINmOVmMECBAgQIAAAQIE0hMQQNKbiR0RIECAAAECBAgQyFZAAMl2tBojQIAA
								AQIECBAgkJ6AAJLeTOyIAAECBAgQIECAQLYCAki2o9UYAQIECBAgQIAAgfQEBJD0ZmJHBAgQIECA
								AAECBLIVEECyHa3GCBAgQIAAAQIECKQnIICkNxM7IkCAAAECBAgQIJCtgACS7Wg1RoAAAQIECBAg
								QCA9AQEkvZnYEQECBAgQIECAAIFsBcaz7UxjBBISeHzNdDi0/nhCO7KVkwWu3O//xZzs4TEBAgQI
								EGhSwL91m9S1NgECBAgQIECAAAECXQICSBeHJwQIECBAgAABAgQINCkggDSpa20CBAgQIECAAAEC
								BLoEBJAuDk8IECBAgAABAgQIEGhSQABpUtfaBAgQIECAAAECBAh0CQggXRyeECBAgAABAgQIECDQ
								pIAA0qSutQkQIECAAAECBAgQ6BIQQLo4PCFAgAABAgQIECBAoEkBAaRJXWsTIECAAAECBAgQINAl
								IIB0cXhCgAABAgQIECBAgECTAgJIk7rWJkCAAAECBAgQIECgS2C865knBAoQ+NznPhdWr15da6cX
								XHBBePvb317rmhYjQIAAAQIECOQoIIDkOFU9zRIYGxubee03f/M3Zx7X9aCz/nPPPRcmJibqWtI6
								BAgQIECAAIEsBQSQLMeqqVMFOgHhve99b3jyySfDxRdffOrbQz/ftm1b2LBhw9DrWIAAAQIECBAg
								kLuAAJL7hPU3I3DPPffMPPaAAAECBAgQIECgHQHfhN6Ou6oECBAgQIAAAQIEihQQQIocu6YJECBA
								gAABAgQItCMggLTjrioBAgQIECBAgACBIgUEkCLHrmkCBAgQIECAAAEC7QgIIO24q0qAAAECBAgQ
								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
								TkSuQmCC
								"
								>
								</div>

								</div>

								</div>
								</div>

								</div>
								<div class="cell border-box-sizing code_cell rendered">
								<div class="input">
								<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
								<div class="inner_cell">
								    <div class="input_area">
								<div class=" highlight hl-ipython2"><pre> 
								</pre></div>
								
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>


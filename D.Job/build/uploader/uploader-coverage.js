/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/uploader/uploader.js']) {
   __coverage__['build/uploader/uploader.js'] = {"path":"build/uploader/uploader.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0,0,0],"3":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":39}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":53,"column":65}},"2":{"start":{"line":37,"column":0},"end":{"line":37,"column":23}},"3":{"start":{"line":39,"column":0},"end":{"line":50,"column":1}},"4":{"start":{"line":40,"column":4},"end":{"line":40,"column":33}},"5":{"start":{"line":43,"column":5},"end":{"line":50,"column":1}},"6":{"start":{"line":44,"column":4},"end":{"line":44,"column":33}},"7":{"start":{"line":48,"column":4},"end":{"line":48,"column":28}},"8":{"start":{"line":49,"column":4},"end":{"line":49,"column":29}}},"branchMap":{"1":{"line":39,"type":"if","locations":[{"start":{"line":39,"column":0},"end":{"line":39,"column":0}},{"start":{"line":39,"column":0},"end":{"line":39,"column":0}}]},"2":{"line":39,"type":"binary-expr","locations":[{"start":{"line":39,"column":4},"end":{"line":39,"column":7}},{"start":{"line":39,"column":11},"end":{"line":39,"column":19}},{"start":{"line":39,"column":23},"end":{"line":39,"column":35}},{"start":{"line":39,"column":39},"end":{"line":39,"column":57}}]},"3":{"line":43,"type":"if","locations":[{"start":{"line":43,"column":5},"end":{"line":43,"column":5}},{"start":{"line":43,"column":5},"end":{"line":43,"column":5}}]}},"code":["(function () { YUI.add('uploader', function (Y, NAME) {","","/**","* Provides UI for selecting multiple files and functionality for","* uploading multiple files to the server with support for either","* html5 or Flash transport mechanisms, automatic queue management,","* upload progress monitoring, and error events.","* @module uploader","* @main uploader","* @since 3.5.0","*/","","/**","* `Y.Uploader` serves as an alias for either <a href=\"UploaderFlash.html\">`Y.UploaderFlash`</a>","* or <a href=\"UploaderHTML5.html\">`Y.UploaderHTML5`</a>, depending on the feature set available","* in a specific browser. If neither HTML5 nor Flash transport layers are available, `Y.Uploader.TYPE`","* static property is set to `\"none\"`.","*","* @class Uploader","*/","","/**","* The static property reflecting the type of uploader that `Y.Uploader`","* aliases. The possible values are:","* <ul>","* <li><strong>`\"html5\"`</strong>: Y.Uploader is an alias for <a href=\"UploaderHTML5.html\">Y.UploaderHTML5</a></li>","* <li><strong>`\"flash\"`</strong>: Y.Uploader is an alias for <a href=\"UploaderFlash.html\">Y.UploaderFlash</a></li>","* <li><strong>`\"none\"`</strong>: Neither Flash not HTML5 are available, and Y.Uploader does","* not reference an actual implementation.</li>","* </ul>","*","* @property TYPE","* @type {String}","* @static","*/","","var Win = Y.config.win;","","if (Win && Win.File && Win.FormData && Win.XMLHttpRequest) {","    Y.Uploader = Y.UploaderHTML5;","}","","else if (Y.SWFDetect.isFlashVersionAtLeast(10,0,45)) {","    Y.Uploader = Y.UploaderFlash;","}","","else {","    Y.namespace(\"Uploader\");","    Y.Uploader.TYPE = \"none\";","}","","","}, '3.15.0', {\"requires\": [\"uploader-html5\", \"uploader-flash\"]});","","}());"]};
}
var __cov_q1$GA_busDUPabfLq1I6Hw = __coverage__['build/uploader/uploader.js'];
__cov_q1$GA_busDUPabfLq1I6Hw.s['1']++;YUI.add('uploader',function(Y,NAME){__cov_q1$GA_busDUPabfLq1I6Hw.f['1']++;__cov_q1$GA_busDUPabfLq1I6Hw.s['2']++;var Win=Y.config.win;__cov_q1$GA_busDUPabfLq1I6Hw.s['3']++;if((__cov_q1$GA_busDUPabfLq1I6Hw.b['2'][0]++,Win)&&(__cov_q1$GA_busDUPabfLq1I6Hw.b['2'][1]++,Win.File)&&(__cov_q1$GA_busDUPabfLq1I6Hw.b['2'][2]++,Win.FormData)&&(__cov_q1$GA_busDUPabfLq1I6Hw.b['2'][3]++,Win.XMLHttpRequest)){__cov_q1$GA_busDUPabfLq1I6Hw.b['1'][0]++;__cov_q1$GA_busDUPabfLq1I6Hw.s['4']++;Y.Uploader=Y.UploaderHTML5;}else{__cov_q1$GA_busDUPabfLq1I6Hw.b['1'][1]++;__cov_q1$GA_busDUPabfLq1I6Hw.s['5']++;if(Y.SWFDetect.isFlashVersionAtLeast(10,0,45)){__cov_q1$GA_busDUPabfLq1I6Hw.b['3'][0]++;__cov_q1$GA_busDUPabfLq1I6Hw.s['6']++;Y.Uploader=Y.UploaderFlash;}else{__cov_q1$GA_busDUPabfLq1I6Hw.b['3'][1]++;__cov_q1$GA_busDUPabfLq1I6Hw.s['7']++;Y.namespace('Uploader');__cov_q1$GA_busDUPabfLq1I6Hw.s['8']++;Y.Uploader.TYPE='none';}}},'3.15.0',{'requires':['uploader-html5','uploader-flash']});

var accountCtrls = angular.module("SPA_Demo");

accountCtrls.service('loadingService', function() {
    this.StartLoading = function () {
    	//$("#mainDiv").append("<div id='loading' class='modal fade' style='display:block;position:fixed !important;position:absolute;top:0;left:0;height:100%; width:100%; z-index:1000; background:#fff url(/resource/1523254126000/Loading) no-repeat center center; opacity:0.6; filter:alpha(opacity=60);font-size:14px;line-height:20px;'/>");
    	$("#loading").css("display","block");
    }

    this.StopLoading = function () {
        //$("#loading").remove();
        $("#loading").css("display","none");
    }
});
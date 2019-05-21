var accountCtrls = angular.module("SPA_Demo");

accountCtrls.controller('accountNewController',['$scope', function($scope){
	$scope.accName = '';
	$scope.accStatus = '草稿';
	$scope.accPhone = '';
	$scope.accType = 'Prospect';

	//创建客户方法
	$scope.createAccount = function(){
		//开始Loading
		$("#loading").css("display","");
		var entity = {};
		entity.Name = $scope.accName;
		entity.status = $scope.accStatus;
		entity.Phone = $scope.accPhone;
		entity.Type = $scope.accType;

		var remoteObject = new SObjectModel.Account();
		remoteObject.create(entity,function(error,results,event){
			if (error) {
				//结束Loading
				$("#loading").css("display","none");
				alert(error);
				return;
			}
			//结束Loading
			$("#loading").css("display","none");
			//返回列表视图
			window.location="#/";
		});
	};
}])
var accountCtrls = angular.module("SPA_Demo");

accountCtrls.controller('accountListController',['$scope','loadingService', function($scope,loadingService){
	// 变量的初始化
	$scope.accounts = [];
	$scope.query = '';
	$scope.offset = 0;
	$scope.predicate = 'Name';
	$scope.reverse = false;
	$scope.selectedAccount = {};

	//分页用参数
	$scope.total = 0;
	$scope.currentPage = 0;
	$scope.numPerPage = 10;

	//分页初始化
	$scope.repagination = function(){
		SPA_Controller.getAccountConut(function(result, event) {
			//获取记录总条数
			$scope.total = result;
			$scope.loadRecord(Math.ceil($scope.total/$scope.numPerPage));
		});
	};
	//加载数据方法
	$scope.loadRecord = function(currentPage){
		//开始Loading
		loadingService.StartLoading();

		var criteria = {orderby: [{Name : 'ASC'}]};
		criteria.limit = parseInt($scope.numPerPage);
		if ((currentPage - 1) * parseInt($scope.numPerPage) > 0) {
			criteria.offset = (currentPage - 1) * parseInt($scope.numPerPage);
		}
		var remoteObject = new SObjectModel.Account();
		remoteObject.retrieve(criteria, function(error,results,event){
			if (error) {
				//结束Loading
				$("#loading").css("display","none");
				alert(error);
				return;
			}
			$scope.accounts = [];
			results.forEach(function(element,index,array){
				var entity = {};
				entity.Id = element.get('Id');
				entity.Name = element.get('Name');
				entity.status = element.get('status');
				entity.Phone = element.get('Phone');
				entity.Type = element.get('Type');
				$scope.accounts.push(entity);
			});
			//结束Loading
			loadingService.StopLoading();

			//通知Angular遍历元素,刷新值
			$scope.$apply();
		});
	};
	//监听分页变化，改变动画效果（目测是ui-angular-bootstrap原生支持的）
	$scope.$watch('currentPage + numPerPage', function() {
		if ($scope.currentPage == 0) {
			SPA_Controller.getAccountConut(function(result, event) {
				//获取记录总条数
				$scope.total = result;
				$scope.loadRecord(1);
			});
		}else{
			$scope.loadRecord($scope.currentPage);
		}
	});
	//选中客户方法
	$scope.selectAccount = function(id){
		var i = 0;
		var found = false;
		$scope.selectedAccount = false;

		while(!found && i < $scope.accounts.length){
			var account = $scope.accounts[i];

			if (account.Id == id) {
				found = true;
				$scope.selectedAccount = account;
			}else{
				i++;
			}
		}
	};
	//删除客户方法
	$scope.deleteAccount = function(id){
		//开始Loading
		loadingService.StartLoading();

		var remoteObject = new SObjectModel.Account();
		remoteObject.del(id,function(error,ids){
			if (error) {
				//结束Loading
				loadingService.StopLoading();
				alert(error);
				return;
			}
			//结束Loading
			loadingService.StartLoading();


			var i = 0;
			var found = false;
			while(!found && i < $scope.accounts.length){
				var account = $scope.accounts[i];
				if (account.Id == id) {
					found = true;
					$scope.accounts.splice(i,1);
					$scope.total = $scope.total - 1;
					if ($scope.accounts.length == 0) {
						$scope.repagination();
					}else{
						if (!($scope.currentPage * $scope.numPerPage >= $scope.total)) {
							$scope.loadRecord($scope.currentPage);
						}
						$scope.$apply();
					}
				}else{i++;}
			}
		});
	};
	//编辑客户方法
	$scope.editAccount = function(id){
		//开始Loading
		loadingService.StartLoading();
		var remoteObject = new SObjectModel.Account();
		remoteObject.update([id],
			{
				Name: $scope.selectedAccount.Name,
				Field1__c:$scope.selectedAccount.status,
				Phone:$scope.selectedAccount.Phone,
				Type:$scope.selectedAccount.Type
			},
			function(error,ids){
				if (error) {
					//结束Loading
					loadingService.StopLoading();
					alert(error);
				}
				//结束Loading
				loadingService.StopLoading();
			});
	};
}])
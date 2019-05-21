//声明模块，中括号部分代表Angular的模块依赖，Demo页面使用Route模块做浏览器跳转和ui.bootstrap做分页效果
var app = angular.module('SPA_Demo',['ngRoute','ui.bootstrap']);
//声明一个url模版，因为是在Salesforce中使用静态资源的方式所以这样方便一点
app.constant('resourceUrl','/resource/' + Date.now() + '/SPA_Demo');
//配置ngRoute
app.config(['$routeProvider','resourceUrl', function($routeProvider,resourceUrl){
	$routeProvider
		.when('/',{
			templateUrl: resourceUrl + '/SPA_Demo/tamplates/account_List.html'
			,controller: 'accountListController'
		})
		.when('/new',{
			templateUrl: resourceUrl + '/SPA_Demo/tamplates/account_new.html'
			,controller: 'accountNewController'
		})
		.otherwise('/',{
			redirectTo: '/'
		});
}]);
//在Angualr1.6版本之后默认给hash路由添加！,导致跳转错误,通过配置$locationProvider解决
app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix("");
}]);
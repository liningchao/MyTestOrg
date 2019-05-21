({
    init : function(component) {
    	//调用服务器端方法
    	var action = component.get("c.searchOrderProduct");
    	//给后台方法参数传值
        action.setParam("orderId",component.get("v.recordId"));
        //调用回掉函数
        action.setCallback(this, function(response)
        {
            //定义提示信息
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            //判断后台返回状态
            if(state == "SUCCESS")
            {
            	//获取后台返回的参数
                console.log(JSON.stringify(response.getReturnValue()));  
                component.set("v.orderProductList",response.getReturnValue());
                component.set("v.pagesize",5);

                var page = component.get("v.page") || 1;
                var fieldName = component.get("v.selectedTabsoft");
                // 调用初始化产品块的方法
                this.LoadingProduct(component,page,fieldName);

                //设置提示信息;
                // alert("数据初始化完成！")
            	// SFDC 已知问题，尚未解决。
            	/*toastEvent.setParams(
                {
                    "title" : "SUCCESS",
                    "message" : "加载产品完成！",
                    "mode": "sticky",
                    "type" : "SUCCESS"
                });*/
            }
            else
            {
                console.log("=======error======="+response.getError()[0].message);
                //设置错误提示信息 
                toastEvent.setParams(
                {
                    "title" : "初始化数据",
                    "message" : "仓库产品加载失败，查看console.log!",
                    "type" : "Error"
                });
            }
            //将提示信息发出 如果不写这句话 将不会有提示信息 这个事件是系统自带事件，Lightning框架会监听这个事件
            toastEvent.fire();
        });
        //从客户端控制器调用服务器端控制器操作
        $A.enqueueAction(action);
    },
    LoadingProduct : function(component,page,fieldName){
       var action = component.get("c.searchProduct");
        /*
            第一个参数：页数
            第二个参数：每页显示的条数
            第三个参数：搜索关键字(默认为空)
            第四个参数：排序的字段名
            第五个参数：布尔类型 true：asc false desc
        */
        action.setParams({
        
             "pageNumber": page,
             "pagelength" : component.get("v.pagesize"),
             "searchWord": component.get("v.SearchKeyWord"),
             "sortField": fieldName,
             "isAsc": component.get("v.isAsc")
        });
        action.setCallback(this, function(response)
        {
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if(state == "SUCCESS")
            {
              /*  toastEvent.setParams(
                {
                    "title" : "SUCCESS",
                    "message" : "加载产品完成！",
                    "type" : "SUCCESS"
                });*/

                var result = response.getReturnValue();
                component.set("v.ProductList",result.ProductInnerList);
                //给分页参数赋值
                component.set("v.page", result.page);
                component.set("v.total", result.total);
                component.set("v.pages", Math.ceil(result.total / component.get("v.pagesize")));
                component.set("v.IsSpinner",false);
            }
            toastEvent.fire();
        });

        $A.enqueueAction(action); 
          
    },
    //排序方法
    sort: function(component,event,sortFieldName) 
    {  
        var currentDir = component.get("v.arrowDirection");
 
        if(currentDir == 'arrowdown') 
        {
            //修改箭头方向属性
            component.set("v.arrowDirection", 'arrowup');
            //设置排序属性 
            component.set("v.isAsc", true);
        } 
        else 
        {
            component.set("v.arrowDirection", 'arrowdown');
            component.set("v.isAsc", false);
        }

        //重新调用初始化产品方法
        var page = component.get("v.page") || 1;
        this.LoadingProduct(component,page,sortFieldName);
    },	
})
({
    /*
        helper 中可以自己定义参数
    */
	//初始化加载当前仓库有哪些产品
    doInithelper : function(cmp) 
    {
    	//这里的c.代表调用服务器端方法
    	var action = cmp.get("c.searchWarehouseProduct");
    	//给后台方法参数传值
        action.setParam("wpId",cmp.get("v.recordId"));
        //调用回掉函数
        action.setCallback(this, function(response)
        {
            //定义提示信息
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            //判断后台返回状态
            if(state == "SUCCESS")
            {
            	//设置提示信息
            	toastEvent.setParams(
                {
                    "title" : "SUCCESS",
                    "message" : "加载仓库产品完成！",
                    "type" : "SUCCESS"
                });

            	//获取后台返回的参数
                //var result = response.getReturnValue();
                //给本仓库已存在的产品list赋值
                console.log(JSON.stringify(response.getReturnValue()));  
                cmp.set("v.warehouseProductList",response.getReturnValue());
                cmp.set("v.pagesize",5);

                var page = cmp.get("v.page") || 1;
                var fieldName = cmp.get("v.selectedTabsoft");
                this.LoadingProductHelper(cmp,page,fieldName);
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

                //将Loading图标取消
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner,"slds-hide");
            }
            //将提示信息发出 如果不写这句话 将不会有提示信息 这个事件是系统自带事件，Lightning框架会监听这个事件
            toastEvent.fire();
        });
        //从客户端控制器调用服务器端控制器操作
        $A.enqueueAction(action);
    },

    //初始化加载产品
    LoadingProductHelper : function(cmp,page,softFieldName) 
    {
        var action = cmp.get("c.searchProduct");
        /*
            第一个参数：页数
            第二个参数：每页显示的条数
            第三个参数：搜索关键字(默认为空)
            第四个参数：排序的字段名
            第五个参数：布尔类型 true：asc false desc
        */
        action.setParams({
             "pageNumber": page,
             "pagelength" : cmp.get("v.pagesize"),
             "searchWord": cmp.get("v.SearchKeyWord"),
             "sortField": softFieldName,
             "isAsc": cmp.get("v.isAsc")
        });
        action.setCallback(this, function(response)
        {
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if(state == "SUCCESS")
            {
                toastEvent.setParams(
                {
                    "title" : "SUCCESS",
                    "message" : "加载产品完成！",
                    "type" : "SUCCESS"
                });

                var result = response.getReturnValue();
                cmp.set("v.ProductList",result.pilist);
                //给分页参数赋值
                cmp.set("v.page", result.page);
                cmp.set("v.total", result.total);
                cmp.set("v.pages", Math.ceil(result.total / cmp.get("v.pagesize")));

                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner,"slds-hide");
               
            }
            else
            {
                console.log("=======error======="+response.getError()[0].message);
                toastEvent.setParams(
                {
                    "title" : "初始化数据",
                    "message" : "仓库产品加载失败，查看console.log!",
                    "type" : "Error"
                });

                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner,"slds-hide");
            }
            toastEvent.fire();
        });

        $A.enqueueAction(action);
    },

    //搜索产品方法
    SearchProductHelper : function(cmp)
    {
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner,"slds-hide");

        var action = cmp.get("c.searchProduct");
        action.setParams({
            "pageNumber": cmp.get("v.page"),
            "pagelength" : cmp.get("v.pagesize"),
            "searchWord": cmp.get("v.SearchKeyWord"),
            "sortField": cmp.get("v.selectedTabsoft"),
            "isAsc": cmp.get("v.isAsc")
        });

        action.setCallback(this, function (response) 
        {
            console.log('0==={======进入搜索回调函数======>');
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") 
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "搜索成功!",
                    "type":"success"
                });

                var result = response.getReturnValue();
                cmp.set("v.ProductList",result.pilist);
                //给分页参数赋值
                cmp.set("v.page", result.page);
                cmp.set("v.total", result.total);
                cmp.set("v.pages", Math.ceil(result.total / cmp.get("v.pagesize")));
                
                $A.util.toggleClass(spinner, "slds-hide");
            }

            if (cmp.isValid() && state === "ERROR") 
            {
                console.log(response.getError()[0].message);
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "搜索失败,查看console.log!",
                    "type":"error"
                });

                $A.util.toggleClass(spinner, "slds-hide");
            }

            toastEvent.fire();
        })

        $A.enqueueAction(action);
    },

    //排序方法
    sortHelper: function(cmp,event,sortFieldName) 
    {
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner,"slds-hide");

        var currentDir = cmp.get("v.arrowDirection");
 
        if(currentDir == 'arrowdown') 
        {
            //修改箭头方向属性
            cmp.set("v.arrowDirection", 'arrowup');
            //设置排序属性 
            cmp.set("v.isAsc", true);
        } 
        else 
        {
            cmp.set("v.arrowDirection", 'arrowdown');
            cmp.set("v.isAsc", false);
        }

        //重新调用初始化产品方法
        var page = cmp.get("v.page") || 1;
        this.LoadingProductHelper(cmp,page,sortFieldName);
    },

    //保存方法
    saveAllHelper : function(cmp,productlist)
    {
        console.log('0==={====进入helper保存客户======>');
        //调用加载动画
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        /*
            除了基本类型和对象外，其余的类型全部要序列化成json后，往后台传输
            序列化productlist
        */
        var productlistJson = JSON.stringify(productlist);
        //调用服务器端Contoller传json
        var action = cmp.get("c.saveAllController");
        //将值传给APEX后台controller
        action.setParams({
            'wpId': cmp.get("v.recordId"),
            'productjson': productlistJson
        });

        action.setCallback(this, function (response) 
        {
            console.log('0==={======进入保存回调函数======>');
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") 
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "添加成功!",
                    "type":"success"
                });

                cmp.set("v.warehouseProductList",response.getReturnValue());
                
                $A.util.toggleClass(spinner, "slds-hide");
            }

            if (cmp.isValid() && state === "ERROR") 
            {
                console.log(response.getError()[0].message);
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "添加失败,查看console.log!",
                    "type":"error"
                });

                $A.util.toggleClass(spinner, "slds-hide");
            }

            toastEvent.fire();
        })

        $A.enqueueAction(action);
    },

    //删除产品
    delProductHelper : function(cmp,newlist,dellist)
    {
        //调用加载动画
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");

        var action = cmp.get("c.delProductController");
        action.setParam("delId",dellist);

        action.setCallback(this,function(response)
        {
            console.log('0==={======进入删除回调函数======>');
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();

            cmp.set("v.warehouseProductList", newlist);
            
            if (cmp.isValid() && state === "SUCCESS") 
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "删除成功!",
                    "type":"success"
                });
            }

            if (cmp.isValid() && state === "ERROR") 
            {
                console.log("0==={=======response.getError()=======>" + response.getError()[0].message);
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "删除失败,查看console.log!",
                    "type":"error"
                });
            }

            $A.util.toggleClass(spinner, "slds-hide");
            toastEvent.fire();
        })

        $A.enqueueAction(action);
    },

    //更改产品信息
    saveProductHelper : function(cmp)
    {
        //调用加载动画
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");

        var action = cmp.get("c.saveProductController");
        var productlistJson = JSON.stringify(cmp.get("v.ProductList"));
        action.setParams({
            'lstProductJson': productlistJson
        });

        action.setCallback(this,function(response) 
        {
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "更改成功!",
                    "type":"success"
                });

                cmp.set("v.ProductList", response.getReturnValue());
                cmp.set("v.showSaveCancelBtn",false);

                //调用加载动画
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
            }
            else
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "更改失败,查看console.log!",
                    "type":"error"
                });

                //调用加载动画
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
            }
        });

        $A.enqueueAction(action);
    }
})
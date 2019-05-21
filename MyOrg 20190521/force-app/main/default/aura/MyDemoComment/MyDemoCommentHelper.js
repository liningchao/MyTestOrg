({
     init : function(component) {
        var recordID = component.get("v.recordId")
        var action = component.get("c.initProduct");
        action.setParams({ orderId : recordID});
        action.setCallback(this, function(response) {
            //获取请求返回状态
            var state = response.getState();
            //请求成功
            if (state === "SUCCESS") {
                component.set("v.productListAdd",response.getReturnValue());
                component.set("v.pagesize",5);
                component.set("v.page",1);
                component.set("v.pages",1);
                component.set("v.total",0);
                
                // 判断是否展示选中的产品块
                if(component.get("v.productListAdd").length > 0)
                    component.set("v.addListFlag", true);
                else
                    component.set("v.addListFlag", false);
            }
            //请求不完整
            else if (state === "INCOMPLETE") {}
            //请求出现错误
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) console.log("Error message: " + errors[0].message);
                }
                else console.log("Unknown error");
            }
        });
        $A.enqueueAction(action);
    },
    serach : function(component,productName,productID) {
    	var action = component.get("c.searchProducts");
        action.setParams({ productName : productName,
    					   productId : productID
    					 });
        action.setCallback(this, function(response) {
            //获取请求返回状态
            var state = response.getState();
            //请求成功
            if (state === "SUCCESS") {
                // 过滤重复的元素
                component.set("v.productListSerach",response.getReturnValue());
              
            }
            //请求不完整
            else if (state === "INCOMPLETE") {}
            //请求出现错误
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) console.log("Error message: " + errors[0].message);
                }
                else console.log("Unknown error");
            }
        });
        $A.enqueueAction(action);
    },
    saveDate : function(component,addpro){
    	var action = component.get("c.saveProducts");
        action.setParams({ innerList : JSON.stringify(addpro),
    					   orderId : component.get("v.recordId")
    					 });
        action.setCallback(this, function(response) {
            //获取请求返回状态
            var state = response.getState();
            //请求成功
            if (state === "SUCCESS") {
                alert("添加成功！");
				window.location.reload("one.app#/sObject/"+component.get("v.recordId")+"/view");
            }
            //请求不完整
            else if (state === "INCOMPLETE") {}
            //请求出现错误
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) console.log("Error message: " + errors[0].message);
                }
                else console.log("Unknown error");
            }
        });
        $A.enqueueAction(action);
    },
    // 开启waiting
    showSpinner : function(component){
        component.set("v.toggleSpinner", true); 
    },
   	// 关闭waiting
    hideSpinner : function(component){
        component.set("v.toggleSpinner", false);
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
})
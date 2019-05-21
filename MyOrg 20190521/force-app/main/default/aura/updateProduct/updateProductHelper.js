({
    doInithelper : function(cmp) 
    {
    	var action = cmp.get("c.cmpSearchProduct");

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
                cmp.set("v.ProductList",result);
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
            }
            toastEvent.fire();
        });

        $A.enqueueAction(action);
    },

    //更改产品信息
    saveProductHelper : function(cmp)
    {
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

                var cmpEvent = cmp.getEvent("componentEvent");
                cmpEvent.setParams({
                    "ProList" : response.getReturnValue()});
                cmpEvent.fire();
            }
            else
            {
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "更改失败,查看console.log!",
                    "type":"error"
                });
            }
        });

        $A.enqueueAction(action);
    }
})
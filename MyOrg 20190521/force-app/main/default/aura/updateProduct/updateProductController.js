({
    //初始化方法
    doInit : function(component, event, helper) 
    {
    	helper.doInithelper(component);
    },

    fireComponentEvent : function(cmp, event) 
    {
        var cmpEvent = cmp.getEvent("componentEvent");
        cmpEvent.setParams({
            "ProList" : cmp.get("v.ProductList")});
        cmpEvent.fire();
    },

    Save : function(component,event,helper) 
    {
        helper.saveProductHelper(component);
    },
})
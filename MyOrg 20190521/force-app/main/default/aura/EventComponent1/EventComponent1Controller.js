({
    fireComponentEvent : function(cmp, event) 
    {
        var cmpEvent = cmp.getEvent("cmpEvent");
        cmpEvent.setParams({
            "message" : "一个组件事件触发!" });
        cmpEvent.fire();
    }
})
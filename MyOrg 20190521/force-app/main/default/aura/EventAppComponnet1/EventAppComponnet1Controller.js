({
    fireApplicationEvent : function(cmp, event) {
        var appEvent = $A.get("e.c:Event2");
        appEvent.setParams({
            "message" : "一个应用程序事件触发!" });
        appEvent.fire();
    }
})
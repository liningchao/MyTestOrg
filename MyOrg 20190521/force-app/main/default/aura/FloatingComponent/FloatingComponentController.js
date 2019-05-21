({
    fireComponentEvent : function(cmp, event) 
    {
        var cmpEvent = cmp.getEvent("FloatingEvent");
        cmpEvent.setParams({
            "Floatingmessage" : cmp.get("v.DMmessage")});
        cmpEvent.fire();
    }
})
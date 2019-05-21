({
    doInit : function(component, event, helper) 
    {
    	//获取窗口的宽度
        var lWidth = window.innerWidth ;
        //按照指定的周期（以毫秒计）来调用函数或计算表达式。
        window.setInterval($A.getCallback(function()
        { 
            helper.shiftDiv(component,event,lWidth);
        }),100);
    },

    handleFloatingEvent : function(component, event, helper)
    {
    	var message = event.getParam("Floatingmessage");
        component.set("v.DMString", message);
    }
})
({
    shiftDiv: function(component,event,lWidth) 
    {
        var changeposition = component.get("v.intervalId");
        var floatElement = document.getElementById('tofloat');	  
        if(changeposition < lWidth)
        {
            floatElement.style.left = changeposition + 'px';
            changeposition = changeposition + 5;
            component.set("v.intervalId",changeposition);
        }
        //将左侧重置为0
        else
        {
            component.set("v.intervalId",0);
            //floatElement.style.left = "0px";
            //changeposition = component.get("v.intervalId");
            //重新设置以便再次点击if块
        }
    }
})
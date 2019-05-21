({
	//获取选项列表值
    fetchPickListVal: function(component, fieldName, picklistOptsAttributeName) 
    {
        var action = component.get("c.getselectOptions");
        action.setParams({
            "obj": component.get("v.objInfoForPicklistValues"),
            "fld": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) 
        {
            if (response.getState() == "SUCCESS") 
            {
                var allValues = response.getReturnValue();
                if (allValues != undefined && allValues.length > 0) 
                {
                    opts.push({
                        class: "optionClass",
                        label: "--- 请选择 ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) 
                {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.set("v." + picklistOptsAttributeName, opts);
            }
        });
        $A.enqueueAction(action);
    },
})
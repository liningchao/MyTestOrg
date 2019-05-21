({
    
    doInit: function(component, event, helper) 
    {
      	//获取选项列表值的动态方法 
        helper.fetchPickListVal(component, 'Product_Brand__c','picklistOpts');
    },
    
    inlineEditName : function(component,event,helper)
    {   
        //显示名称编辑区域弹出
        component.set("v.nameEditMode", true); 
        //在100毫秒后将焦点设置到输入栏  
        setTimeout(function()
        { 
            component.find("inputId").focus();
        }, 100);
    },
    
    inlineEditProductBrand : function(component,event,helper)
    {   
        //显示产品品牌编辑栏弹出
        component.set("v.productBrandEditMode",true); 
        //将选项列表选项设置为选项列表字段
        component.find("productBrand").set("v.options",component.get("v.picklistOpts"));
        //在100毫秒后将焦点设置到输入栏   
        setTimeout(function()
        { 
            component.find("productBrand").focus();
        }, 100);
    },
    
     onNameChange : function(component,event,helper)
     { 
        /*
			如果编辑栏位值改变且栏位不等于空白，
         	然后通过set属性将显示保存并取消按钮
        */
        if(event.getSource().get("v.value").trim() != '')
        { 
            component.set("v.showSaveCancelBtn",true);
        }
    },
 
    onProductBrandChange : function(component,event,helper)
    { 
        /*
			如果选项列表值发生变化，
         	然后通过set属性将显示保存并取消按钮
        */
        component.set("v.showSaveCancelBtn",true);
    },     
    
    closeNameBox : function (component, event, helper) 
    {
        //失去焦点时，通过设置'nameEditMode'属性关闭输入部分。
        component.set("v.nameEditMode", false); 
      	//检查是否更改名称字段为空，然后将错误类添加到列
        if(event.getSource().get("v.value").trim() == '')
        {
            component.set("v.showErrorClass",true);
        }
        else
        {
            component.set("v.showErrorClass",false);
        }
    }, 
    
    closeProductBrandBox : function (component, event, helper) 
    {
        //失去焦点时，通过设置'nameEditMode'属性关闭输入部分
        component.set("v.productBrandEditMode", false); 
    },
})
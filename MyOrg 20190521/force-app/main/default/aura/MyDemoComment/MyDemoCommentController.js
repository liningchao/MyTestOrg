({
    doInit : function(component, event, helper) {
    	helper.init(component);
    
    },
    doSearch : function(component, event, helper) {
    	console.log("serach function");
    	helper.showSpinner(component);
    	var productName= component.find("Product_Name").get("v.value");
     	var productID = component.find("ProductID").get("v.value");
     	helper.serach(component,productName,productID);
     	helper.hideSpinner(component);
    },
    add : function(component, event, helper) {
    	var prolist = component.get("v.productListSerach");
        var productsAdd = component.get("v.productListAdd");
        //打勾的list
        for(var i = 0 ; i < prolist.length ; i ++ )
        {
        	if(prolist[i].flag)
            {
                prolist[i].flag = false;
                productsAdd.unshift(prolist[i]);
                prolist.splice(i,1);
                i--;
            }

        }
        component.set("v.productListSerach", prolist);
        component.set("v.productListAdd", productsAdd);
        // 判断是否展示选中的产品块
        if(component.get("v.productListAdd").length > 0)
        	component.set("v.addListFlag", true);
   		else
   			component.set("v.addListFlag", false);
    },
    remove : function(component, event, helper)
    {
    	var proserachlist = component.get("v.productListSerach");
        var prolist = component.get("v.productListAdd");
        //打勾的list
        for(var i = 0 ; i < prolist.length ; i ++ )
        {
            //选中移除
            if(prolist[i].flag)
            {
                prolist[i].flag = false;
                proserachlist.unshift(prolist[i]);
                prolist.splice(i,1);
                i--;
            }
        }
        component.set("v.productListSerach", proserachlist);
        component.set("v.productListAdd", prolist); 
         // 判断是否展示选中的产品块
        if(component.get("v.productListAdd").length > 0)
        	component.set("v.addListFlag", true);
   		else
   			component.set("v.addListFlag", false);
    },
    save : function(component, event, helper){
    	// 先对选中的需要添加的产品进行判断
    	var prolist = component.get("v.productListAdd");
    	var flag  = false;
    	var addpro = new Array();
    	for(var i = 0 ; i < prolist.length ; i ++ ){
    		if(prolist[i].flag){
    			flag = true;
				addpro.unshift(prolist[i]);
    		}
    	}
    	if(flag)
    		helper.saveDate(component,addpro);
    	else
    		alert("请选择需要添加的产品");
    },
    cancel : function(component, event, helper){
    	var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    },
    selectAll : function(component, event, helper)
    {
        var flag = event.getSource().get('v.class');
        var info;
        var prolist;
        if(flag == "pro"){
            info = "box";
            prolist = component.get("v.productListSerach");
        }else
        {
        	info = "box1";
            prolist = component.get("v.productListAdd");
        }
        if(prolist.length > 0)
        {
            //获取标题复选框的值
            var selectedHeaderCheck = event.getSource().get("v.value");
            //使用“box ”aura id获取表格上的所有复选框（所有迭代值都具有相同的ID）
            //返回所有复选框元素的列表
            var getAllId = component.find(info);
            //alert(getAllId);
            //如果本地ID是唯一的（在单个记录的情况下），find（）返回组件，不是数组
            if(!Array.isArray(getAllId)){
                if(selectedHeaderCheck == true)
                    component.find(info).set("v.value", true);
                else
                    component.find(info).set("v.value", false);
            }
            else
            {
                //检查是否选择全部（标题复选框）为真，然后是for循环中的所有表格上的复选框
                //并在selectedCount属性中设置所有选中的复选框长度。
                //如果值为false，则在其他部分中将所有复选框设为false，以便循环播放
                //并选择计数为0
                if(selectedHeaderCheck == true)
                {
                    for(var i = 0; i < getAllId.length; i++) {component.find(info)[i].set("v.value", true);}
                }
                else
                {
                    for (var i = 0; i < getAllId.length; i++) {component.find(info)[i].set("v.value", false);}
                }
            }
        }
    },
    HomeLastNavigate : function(component, event, helper){
        // helper.showSpinner(component);
        
        var direction = event.target.innerText;
        var page = direction === "首页" ? 1 : component.get("v.pages");
        component.find("se").set("v.value", false);
        component.set("v.selectedCount",0);

        var fieldName = component.get("v.selectedTabsoft");
        helper.LoadingProductHelper(component, page ,fieldName);
    },
    navigate :  function(component, event, helper){

    }
})
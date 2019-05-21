({
     doInit : function(component, event, helper) {
    	component.set("v.IsSpinner",true);
    	helper.init(component);
    },
     //上一页下一页
    navigate: function(component, event, helper)
    {
    	component.set("v.IsSpinner",true);
        var page = component.get("v.page") || 1;
        var fieldName = component.get("v.selectedTabsoft");
        var direction = event.target.innerText;
        page = direction === "上一页" ? (page - 1) : (page + 1);
        helper.LoadingProduct(component, page, fieldName);
    },

    //首页尾页
    HomeLastNavigate: function(component, event, helper)
    {   
    	component.set("v.IsSpinner",true);     
        var direction = event.target.innerText;
        var page = direction === "首页" ? 1 : component.get("v.pages");
        var fieldName = component.get("v.selectedTabsoft");
        helper.LoadingProduct(component, page ,fieldName);
    },

    //搜索产品
    SearchProduct: function(component, event, helper)
    {
    	var page = component.get("v.page");
    	var fieldName = component.get("v.selectedTabsoft");
    	component.set("v.IsSpinner",true);
        helper.LoadingProduct(component,page,fieldName);
    },
    //排序
    sortProduct: function(component, event, helper) 
    {
       component.set("v.IsSpinner",true);
       //给前台哪个字段排序参数赋值   
       component.set("v.selectedTabsoft",'Core__c');
       //将要给哪个字段排序 传给helper中
       helper.sort(component,event,'Core__c');
    },
     //全选方法
    selectAll : function(component, event, helper)
    {
        var flag = event.getSource().get('v.class');
        var info;
        var Templist;
        if(flag == "pro"){
            info = "productbox";
            Templist = component.get("v.ProductList");
        }else{
            info = "proSelectBox";
            Templist = component.get("v.orderProductList");
        }
        if(Templist.length > 0)
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
                {
                    component.find(info).set("v.value", true);
                    //component.set("v.selectedCount", 1);
                }
                else
                {
                    component.find(info).set("v.value", false);
                    //component.set("v.selectedCount", 0);
                }
            }
            else
            {
                //检查是否选择全部（标题复选框）为真，然后是for循环中的所有表格上的复选框
                //并在selectedCount属性中设置所有选中的复选框长度。
                //如果值为false，则在其他部分中将所有复选框设为false，以便循环播放
                //并选择计数为0
                if(selectedHeaderCheck == true)
                {
                    for(var i = 0; i < getAllId.length; i++)
                    {
                        component.find(info)[i].set("v.value", true);
                        //component.set("v.selectedCount", getAllId.length);
                    }
                }
                else
                {
                    for (var i = 0; i < getAllId.length; i++)
                    {
                        component.find(info)[i].set("v.value", false);
                        //component.set("v.selectedCount", 0);
                    }
                }
            }
        }
    },
    doSave : function(component, event, helper){
    	component.set("v.IsSpinner",true);
    	var prolist = component.get("v.ProductList");
        var productsAdd = component.get("v.orderProductList");
        //打勾的list
        for(var i = 0 ; i < prolist.length ; i ++ )
        {
        	if(prolist[i].flag)
            {
	        	// 判断重复
	        	for(var j = 0 ; j < productsAdd.length ; j ++ )
	        	{
	        	
	        		if( prolist[i].product.Id == productsAdd[j].pro.Id){
	        			alert( prolist[i].product.Name+" 已经存在,请勿重复添加。");
	        			component.set("v.IsSpinner",false);
	        			return;
	        		}
	        	}
	        }
       		if(prolist[i].flag)
            {	
                prolist[i].flag = false;
                 var newProduct = new Object();
				 newProduct.num = 0;
				 newProduct.flag = false;
				 newProduct.price = 0;
                 newProduct.total = 0;
				 newProduct.pro = prolist[i].product;
                productsAdd.unshift(newProduct);
            }
        }
        component.set("v.orderProductList", productsAdd);
        component.set("v.IsSpinner",false);
    },
    doDel : function(component, event, helper){
        component.set("v.IsSpinner",true);
        helper.delete(component);
    },
    dosaveAll : function(component, event, helper){
    	component.set("v.IsSpinner",true);
    	component.set("v.IsRefresh",false);
    	helper.saveAll(component);
    	if(!component.get("v.IsRefresh")){
		 	var sObjectEvent = $A.get("e.force:navigateToSObject");
	        sObjectEvent.setParams({
	            "recordId": component.get("v.recordId")
	        }) 
	        sObjectEvent.fire();
	        window.location.reload();
        }
    },
    // 计算的方法
    calculate : function(component, event, helper){
        var input = event.getSource().get('v.updateOn');
        var value = event.getSource().get('v.value');
        var id = input.split("_")[0];
        var datalist = component.get("v.orderProductList"); 
        for(var i = 0 ; i < datalist.length ; i ++ )
        {
            if(datalist[i].pro.Id == id)
            {
                if(input.indexOf("_Num") != -1)
                {                   
                    datalist[i].total = (value * datalist[i].price).toFixed(4);
                    component.set("v.orderProductList",datalist);
                    helper.doSummary(component);
                    break;
                }else if(input.indexOf("_Price") != -1)
                {
                    datalist[i].total = (value * datalist[i].num).toFixed(4);
                    component.set("v.orderProductList",datalist);
                    helper.doSummary(component);
                    break;
                }
            }
        }
      
    },
    summary : function(component, event, helper){
         helper.doSummary(component);
    }
})
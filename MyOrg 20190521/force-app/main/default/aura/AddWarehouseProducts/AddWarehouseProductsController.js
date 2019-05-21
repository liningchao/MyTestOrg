({
	/*
		注意js.controller中不允许自己定义参数
		只能是 component，event，helper
	*/
	//初始化方法
    doInit : function(component, event, helper) 
    {
    	// $A.util.toggleClass 是一个开关,开是加上,关是移除
        $A.util.toggleClass(component.find("comfirmDialog"), "slds-fade-in-open");
        $A.util.toggleClass(component.find("comfirmDialogBackdrop"), "slds-backdrop--open");

    	helper.doInithelper(component);
    },

    //上一页下一页
    navigate: function(component, event, helper)
    {
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner,"slds-hide");
        
        var page = component.get("v.page") || 1;
        var fieldName = component.get("v.selectedTabsoft");
        var direction = event.target.innerText;
        page = direction === "上一页" ? (page - 1) : (page + 1);
        //注意：如果返回的是一个数组的话 则提示component.find(...).set is not a function错组 
        component.find("productAllbox").set("v.value", false);
        component.set("v.selectedCount",0);

        helper.LoadingProductHelper(component, page, fieldName);
    },

    //首页尾页
    HomeLastNavigate: function(component, event, helper)
    {
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner,"slds-hide");
        
        var direction = event.target.innerText;
        var page = direction === "首页" ? 1 : component.get("v.pages");
        component.find("productAllbox").set("v.value", false);
        component.set("v.selectedCount",0);

        var fieldName = component.get("v.selectedTabsoft");
        helper.LoadingProductHelper(component, page ,fieldName);
    },

    //搜索产品
    SearchProduct: function(component, event, helper)
    {
        helper.SearchProductHelper(component);
    },

    //排序方法
    sortProductPrice: function(component, event, helper) 
    {
       //给前台哪个字段排序参数赋值   
       component.set("v.selectedTabsoft",'Product_Price__c');
       //将要给哪个字段排序 传给helper中
       helper.sortHelper(component,event,'Product_Price__c');
    },

    //单选复选框计算数量
    checkboxSelect: function(component, event, helper) 
    {
        //获取触发事件的组件
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
 
        if (selectedRec == true) 
        {
            getSelectedNumber++;
        } 
        else 
        {
            getSelectedNumber--;
        }
        component.set("v.selectedCount", getSelectedNumber);
    },

    //全选方法
    selectAll : function(component, event, helper)
    {
        var productlist = component.get("v.ProductList");
        console.log('0==={====productlist======>'+productlist.length);
        if(productlist.length > 0)
        {
            //获取触发事件复选框的值
            var selectedHeaderCheck = event.getSource().get("v.value");
            /*
            	返回所有复选框元素的列表
            	aura id 为 “productbox” 获取表格上的所有复选框（所有迭代值都具有相同的ID）			
            */
            var getAllId = component.find("productbox");
            /*
            	如果ID是唯一的（在单个记录的情况下），find返回组件，不是数组
				Array.isArray 判断某个值是否为数组
            */
            if(!Array.isArray(getAllId))
            {
                if(selectedHeaderCheck == true)
                { 
                    component.find("productbox").set("v.value", true);
                    component.set("v.selectedCount", 1);
                }
                else
                {
                    component.find("productbox").set("v.value", false);
                    component.set("v.selectedCount", 0);
                }
            }
            else
            { 
    			/*
					检查是否选择全部（标题复选框）为真，然后是for循环中的所有表格上的复选框
	                并在selectedCount属性中设置所有选中的复选框长度。
	                如果值为false，则在其他部分中将所有复选框设为false，以便循环播放
	                并选择计数为0
    			*/
                if(selectedHeaderCheck == true)
                {
                    for(var i = 0; i < getAllId.length; i++) 
                    {
                        component.find("productbox")[i].set("v.value", true);
                        component.set("v.selectedCount", getAllId.length);
                    }
                } 
                else 
                {
                    for (var i = 0; i < getAllId.length; i++) 
                    {
                        component.find("productbox")[i].set("v.value", false);
                        component.set("v.selectedCount", 0);
                    }
                } 
            }
        }
    },

    //添加行方法
    addRow : function(component, event, helper)
    {
    	//创建一个空的数据插入到list当中
        var newProduct = new Object();
        newProduct.Id = '';
        newProduct.num = 0;
        newProduct.flag = false;

        var productlist = component.get("v.ProductList");
        productlist.push(newProduct);
        //给前台ProductList赋值
        component.set("v.ProductList",productlist);
    },

    //删除行方法
    delRow : function(component, event, helper)
    {
    	console.log('0==={====删除产品======>');
        var productlist = component.get("v.ProductList");
        var newproductlist = new Array();
        for (var index = 0; index <productlist.length ; index++) 
        {
        	//判断复选框为选中的重新 push到新的list当中
            if (!productlist[index].flag)
            {   
                console.log('0==={====flag======>' + productlist[index].flag);
                newproductlist.push(productlist[index]);
            }
        }

        //向前台属性赋值
        component.find("productAllbox").set("v.value", false);
        component.set("v.ProductList",newproductlist);
    },

    //取消弹出框方法
    confirmDel:function(component, event, helper)
    {
        $A.util.toggleClass(component.find("comfirmDialog"), "slds-fade-in-open");
        $A.util.toggleClass(component.find("comfirmDialogBackdrop"), "slds-backdrop--open");
    },

    //保存全部
    saveAll : function(component, event, helper)
    {
        console.log('0==={====保存仓库产品======>');
        var productlist = component.get("v.ProductList");
        //用于存储需要保存的产品list
        var newproductlist = new Array();
        var flag = false;

        for (var i = productlist.length - 1; i >= 0; i--) 
        {
        	//判断复选框选中并且入库数量为0或者空  提示必填
            if(productlist[i].flag == true && (productlist[i].num == 0 || productlist[i].num == null))
            {
                flag = true;
                break;
            }
        }

        if(flag)
        {
            //toast是一个消息弹出框,非模态框,是一个事件,只能在Lighting框加中使用
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                    "title": "必填提示",
                    "message": "入库数量不能为空!",
                    "type":"warning"
            });

            //将事件发出去
            toastEvent.fire();
        }
        else
        {
        	for (var i = productlist.length - 1; i >= 0; i--) 
	        {
	            if(productlist[i].flag == true)
	            {
	                newproductlist.push(productlist[i]);
	            }

                productlist[i].flag = false;
	        }

            component.set("v.ProductList",productlist);
            helper.saveAllHelper(component,newproductlist);   
        }
    },

    //删除客户
    delProduct : function(component, event, helper)
    {
        $A.util.toggleClass(component.find("comfirmDialog"), "slds-fade-in-open");
        $A.util.toggleClass(component.find("comfirmDialogBackdrop"), "slds-backdrop--open");

        var warehouseProductlist = component.get("v.warehouseProductList");
        //前台显示list
        var newwarehouseProductlist = new Array();
        //后台删除list
        var delwarehouseProductlist = new Array();

        for (var i = 0; i < warehouseProductlist.length; i++) 
        {
            //要删除的产品
            if(warehouseProductlist[i].flag)
            {
                delwarehouseProductlist.push(warehouseProductlist[i].wp.Id);
            }
            //没有删除的产品
            if(!warehouseProductlist[i].flag)
            {
                newwarehouseProductlist.push(warehouseProductlist[i]);
            }
        }
        //delwarehouseProductlist.length大于零才去调用后台
        if(delwarehouseProductlist.lenght != 0)
        {
            helper.delProductHelper(component,newwarehouseProductlist,delwarehouseProductlist);
        }   
    },

    Save : function(component,event,helper) 
    {
        var allRecords = component.get("v.ProductList");
        var isValid = false;
        //在所有产品列表中循环并检查名称是否为空   
        for(var i = 0; i < allRecords.length;i++)
        {
            if(allRecords[i].cp.Name == null || allRecords[i].cp.Name.trim() == '')
            {
                isValid = true;
            }  
        }

        if(isValid)
        {
            //toast是一个消息弹出框,非模态框,是一个事件,只能在Lighting框加中使用
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                    "title": "必填提示",
                    "message": "产品名称不能为空!",
                    "type":"Error"
            });

            //将事件发出去
            toastEvent.fire();
        }
        else
        {
            helper.saveProductHelper(component);
        }
    },

    cancel : function(component,event,helper)
    {
        //刷新视图
        $A.get('e.force:refreshView').fire(); 
    },

    handlecomponentEvent : function(component, event, helper)
    {
        var message = event.getParam("ProList");
        component.set("v.ProductList", message);
    }
})
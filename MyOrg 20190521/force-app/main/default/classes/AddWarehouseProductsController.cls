/*************************************************************************************************************************
  * Class Name :AddWarehouseProductsController
  * @作者: Felix
  * @时间: 2018-05-08 
  * @功能: 添加仓库产品后台类
  *
  * @日志:
  *   ----------------------------------------------------------------------------------------------------------------------
  *   开发者                     日期                    备注
  *   ----------------------------------------------------------------------------------------------------------------------
  *   Felix                    2018-05-08                创建
  * 
**************************************************************************************************************************/
public class AddWarehouseProductsController 
{
	/*
		已存在当前仓库的仓库产品内部类
	*/
	public class WarehouseProductInner
	{
		@AuraEnabled
		public Warehouse_Products__c wp{get;set;}
		@AuraEnabled
		public Boolean flag{get;set;}
	}
	
	//产品内部类
	public class ProductInner
	{
		@AuraEnabled
		public Computer_Product__c cp{get;set;}
		@AuraEnabled
		public Boolean flag{get;set;}
		@AuraEnabled
		public Decimal num{get;set;}

		public ProductInner()
		{
			this.num = 0;
		}
	}

	//分页内部类
    public class PagerWrapper 
    {
        @AuraEnabled 
        public Integer pageSize{get;set;}
        @AuraEnabled 
        public Integer page{get;set;}
        @AuraEnabled 
        public Integer total{get;set;}
        @AuraEnabled 
        public List<ProductInner> pilist{get;set;}
    }

	/*
		初始化根据仓库Id查询当前仓库的仓库产品
		第一个参数：仓库Id
	*/
	@AuraEnabled
    public static WarehouseProductInner[] searchWarehouseProduct(String wpId) 
    {
    	WarehouseProductInner[] wplist = new WarehouseProductInner[]{};
		for(Warehouse_Products__c wp : [SELECT Id,
											   Name,
											   Product__c,
											   Product_Name__c,
											   Product_Price__c,
											   Product_Brand__c,
											   Product_Number__c,
											   Stock_Quantity__c 
											   From Warehouse_Products__c
											   Where Warehouse__c =: wpId])
		{
			WarehouseProductInner wpi = new WarehouseProductInner();
    		wpi.wp = wp;
    		wpi.flag = false;

    		wplist.add(wpi);
		}

		return wplist;
    }

    /*
		初始化查询所有产品
		第一个参数当前页数
		第二个参数每页的个数
		第三个参数搜索关键字
		注意这里不能用Integer，接收不到报错，必须使用Decimal
	*/
	@AuraEnabled
	public static PagerWrapper searchProduct(Decimal pageNumber,Decimal pagelength,String searchWord,String sortField,boolean isAsc)
	{
		/*
			pageSize 每页显示多少个
			offset 要跳过多少条数据
		*/
		Integer pageSize = (Integer)pagelength;
        Integer offset = ((Integer)pageNumber - 1) * pageSize;

        PagerWrapper pw =  new PagerWrapper();
        pw.pageSize = pageSize;
        pw.page = (Integer) pageNumber;
        

        /*
			拼接搜索参数字符串
        */
		String searchKeyWord = '%%';
		if(searchWord != null)
			searchKeyWord = '%'+searchWord+'%';

		String sql = 'Select Id,Name,Product_Price__c,Product_Brand__c,Product_Number__c From Computer_Product__c ';
		sql += 'Where Name Like \'' + searchKeyWord + '\'';
		if (sortField != '')
			sql += ' Order By ' + sortField;
		if (isAsc)
            sql += ' asc';
        else 
            sql += ' desc';
        sql += ' LIMIT ' + pageSize;
        sql += ' OFFSET ' + offset;

        system.debug('o==={=======sql========>' + sql);

		ProductInner[] pilist = new ProductInner[]{};
		for(Computer_Product__c cp : Database.query(sql))
		{
			ProductInner pi = new ProductInner();
			pi.cp = cp;
			pi.flag = false;

			pilist.add(pi);
		} 

		//总数
		pw.total = [SELECT count() FROM Computer_Product__c Where Name Like : searchKeyWord];
		pw.pilist = pilist;

		return pw;
	} 

	/*
		创建仓库产品
	*/
	@AuraEnabled
	public static WarehouseProductInner[] saveAllController(String wpId,String productjson)
	{
		try
        {
        	WarehouseProductInner[] pilist = new WarehouseProductInner[]{};
        	Warehouse_Products__c[] insertwplist = new Warehouse_Products__c[]{};
        	Warehouse_Products__c[] updatewplist = new Warehouse_Products__c[]{};
        	//反序列化Json串  注意是数组
	        AddWarehouseProductsController.ProductInner[] jsonApex = (AddWarehouseProductsController.ProductInner[])JSON.deserialize(EncodingUtil.urlDecode(productjson,'utf_8'),AddWarehouseProductsController.ProductInner[].class);
        	System.debug('===================jsonApex=================='+jsonApex);
        	//根据id去匹配已有的数量 去更新
        	Map<String,Warehouse_Products__c> productMap = new Map<String,Warehouse_Products__c>();
	        for(Warehouse_Products__c wp :[SELECT Id,
												  Name,
												  Product__c,
												  Product_Name__c,
												  Product_Price__c,
												  Product_Brand__c,
												  Product_Number__c,
												  Stock_Quantity__c 
												  From Warehouse_Products__c
												  Where Warehouse__c =: wpId])
	        {
	        	productMap.put(wp.Product__c,wp);
	        }

        	for(AddWarehouseProductsController.ProductInner pi : jsonApex)
        	{
        		if(productMap.containsKey(pi.cp.Id))
        		{
        			Warehouse_Products__c updatewp = new Warehouse_Products__c();
        			updatewp.Stock_Quantity__c = productMap.get(pi.cp.Id).Stock_Quantity__c + pi.num;
        			updatewp.Id = productMap.get(pi.cp.Id).Id;

        			updatewplist.add(updatewp);
        		}
        		else
        		{
        			Warehouse_Products__c newwp = new Warehouse_Products__c();
        			newwp.Product__c = pi.cp.Id;
        			newwp.Warehouse__c = wpId;
        			newwp.Stock_Quantity__c = pi.num;

        			insertwplist.add(newwp);
        		}
        	}

	        if(insertwplist.size() > 0)
	        	insert insertwplist;
	        if(updatewplist.size() > 0)
	        	update updatewplist;

	        for(Warehouse_Products__c wp :[SELECT Id,
												  Name,
												  Product__c,
												  Product_Name__c,
												  Product_Price__c,
												  Product_Brand__c,
												  Product_Number__c,
												  Stock_Quantity__c 
												  From Warehouse_Products__c
												  Where Warehouse__c =: wpId])
			{
				WarehouseProductInner wpi = new WarehouseProductInner();
				wpi.wp = wp;
				wpi.flag = false;

				pilist.add(wpi);
			}

	        return pilist;
        }
        catch(Exception e)
        {
        	system.debug('================'+e.getMessage()+'行数'+e.getLineNumber());
        	return null;
        }
	} 

	@AuraEnabled
    public static void delProductController(String[] delId)
    {
    	try
    	{
    		Warehouse_Products__c[] delwp = new Warehouse_Products__c[]{};
    		delwp = [Select Id From Warehouse_Products__c Where Id IN: delId];

    		if(delwp.size() > 0)
    			delete delwp;
    	}
    	catch(Exception e)
    	{
    		system.debug('0=={============>'+e.getMessage());
    	}
    }

    /*
		提取选项列表值的动态方法 
	*/
    @AuraEnabled
    public static List < String > getselectOptions(sObject obj,string fld) 
    {
        system.debug('对象 --->' + obj);
        system.debug('字段 --->' + fld);
        List<String> allOpts = new list<String>();
        //获取SObject的对象类型
        Schema.sObjectType objType = obj.getSObjectType();
        //获取sObject本身的信息.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        //获取SObject的字段映射
        map<String,Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
        //获取该字段的选择列表值列表
        list<Schema.PicklistEntry> values = fieldMap.get(fld).getDescribe().getPickListValues();
        //添加列表值到list当中
        for (Schema.PicklistEntry a: values) 
        {
            allOpts.add(a.getValue());
        }

        system.debug('allOpts ---->' + allOpts);
        //排序
        allOpts.sort();
        return allOpts;
    }

    /*
		更新产品信息
    */
    @AuraEnabled
    public static ProductInner[] saveProductController(String lstProductJson) 
    {
    	AddWarehouseProductsController.ProductInner[] jsonApex = (AddWarehouseProductsController.ProductInner[])JSON.deserialize(EncodingUtil.urlDecode(lstProductJson,'utf_8'),AddWarehouseProductsController.ProductInner[].class);
    	
    	Computer_Product__c[] cplist = new Computer_Product__c[]{};
        for(AddWarehouseProductsController.ProductInner pi : jsonApex)
        {
        	cplist.add(pi.cp);
        }

        if(cplist.size() > 0)
        {
        	update cplist;
        }

        ProductInner[] pilist = new ProductInner[]{};
        for(Computer_Product__c cp : cplist)
        {
        	ProductInner pi = new ProductInner();
        	pi.cp = cp;
			pi.flag = false;

			pilist.add(pi);
        }

        return pilist;
    }

    //com事件
    @AuraEnabled
	public static ProductInner[] cmpSearchProduct()
	{
		String sql = 'Select Id,Name,Product_Price__c,Product_Brand__c,Product_Number__c From Computer_Product__c';
		ProductInner[] pilist = new ProductInner[]{};
		for(Computer_Product__c cp : Database.query(sql))
		{
			ProductInner pi = new ProductInner();
			pi.cp = cp;
			pi.flag = false;

			pilist.add(pi);
		} 

		return pilist;
	}
}
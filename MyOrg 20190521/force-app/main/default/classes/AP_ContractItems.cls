public with sharing class AP_ContractItems {
    // 订单产品 
	public class OrderProductInner
	{
		@AuraEnabled
		public Product__c pro{get;set;}
		@AuraEnabled
		public Boolean flag{get;set;}
		@AuraEnabled
		public Decimal total{get;set;}
		@AuraEnabled
		public Decimal price{get;set;}
		@AuraEnabled
		public Decimal num{get;set;}
		public OrderProductInner()
		{
			this.num = 0;
			this.price = 0;
			this.total = 0;
		}
	}
	//产品内部类
	public class ProductInner
	{
		@AuraEnabled
		public Product__c product{get;set;}
		@AuraEnabled
		public Boolean flag{get;set;}
		@AuraEnabled
		public Decimal price{get;set;}
		@AuraEnabled
		public Decimal num{get;set;}
		
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
        public List<ProductInner> ProductInnerList{get;set;}
    }
    @AuraEnabled
    public static OrderProductInner[] searchOrderProduct(String orderId) 
    {
    	Map<Id,Product__c> proMap = new Map<Id,Product__c>();
    	Set<Id> idSet = new Set<Id>();
    	for(ContractProducts__c orderProduct : [SELECT Id,Name,Product__c,Product__r.Name,Product__r.Product_Model__c,Product__r.Product_Code__c,
											   Product__r.Product_Series__c,Product__r.Core__c 
											   from ContractProducts__c
											   Where Contract__c =: orderId])
    	{
    		idSet.add(orderProduct.Product__c);
    	}
    	for(Product__c pro : [Select Id,Name,Product_Model__c,Product_Code__c,Product_Series__c,Core__c from Product__c Where Id in: idSet]){
    		proMap.put(pro.Id,pro);
    	}
    	OrderProductInner[] orderProductlist = new OrderProductInner[]{};
		for(ContractProducts__c orderProduct : [SELECT Id,Name,Product__c,Product__r.Name,Product__r.Product_Model__c,Product__r.Product_Code__c,
											   Product__r.Product_Series__c,Product__r.Core__c,Amount__c,Price__c  
											   from ContractProducts__c
											   Where Contract__c =: orderId])
		{
			OrderProductInner orderProductIn = new OrderProductInner();
    		orderProductIn.pro = proMap.get(orderProduct.Product__c);
    		orderProductIn.num = orderProduct.Amount__c;
    		orderProductIn.price = orderProduct.Price__c;
    		orderProductIn.total =  orderProduct.Amount__c *  orderProduct.Price__c;
    		orderProductIn.flag = false;

    		orderProductlist.add(orderProductIn);
		}

		return orderProductlist;
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

		String sql = 'Select Id,Name,Product_Model__c,Product_Code__c,Product_Series__c,Core__c From Product__c ';
		sql += 'Where Name Like \'' + searchKeyWord + '\'';
		if (sortField != '')
			sql += ' Order By ' + sortField;
		if (isAsc)
            sql += ' asc';
        else 
            sql += ' desc';
        sql += ' LIMIT ' + pageSize;
        sql += ' OFFSET ' + offset;

        System.debug(LoggingLevel.DEBUG, '*** size: ' + Database.query(sql));

		ProductInner[] pilist = new ProductInner[]{};
		for(Product__c cp : Database.query(sql))
		{
			ProductInner pi = new ProductInner();
			pi.product = cp;
			pi.flag = false;

			pilist.add(pi);
		} 

		//总数
		pw.total = [SELECT count() FROM Product__c Where Name Like : searchKeyWord];
		pw.ProductInnerList = pilist;

		return pw;
	}
	// 保存的方法
	@AuraEnabled
	public static void save(String contractId,String jsonStr)
	{
		List<ContractProducts__c> productInsert = new List<ContractProducts__c>();

		AP_ContractItems.OrderProductInner[] jsonApex = (AP_ContractItems.OrderProductInner[])JSON.deserialize(EncodingUtil.urlDecode(jsonStr,'utf_8'),AP_ContractItems.OrderProductInner[].class);
		for(AP_ContractItems.OrderProductInner orderProduct : jsonApex)
		{
			ContractProducts__c contractProduct = new ContractProducts__c();
			contractProduct.Contract__c = contractId;
			contractProduct.Product__c = orderProduct.pro.Id;
			contractProduct.Amount__c = orderProduct.num;
			contractProduct.Price__c  = orderProduct.price;
			productInsert.add(contractProduct);
		}
		try{
			insert productInsert;
		}catch(Exception e){
			System.debug(LoggingLevel.DEBUG, '*** Exception: ' + e.getMessage());
		}
	}
	
}
/*
    *Author:Alan Li
    *Date:2018-08-10
    *Function:
    *1、添加订单产品
   
*/ 
public with sharing class AP_OrderItems {
    public class ProductInner
   	{
   		@AuraEnabled
   		public Product__c product;
   		@AuraEnabled
   		public Boolean flag;
   		@AuraEnabled
   		public Integer num;//数量
   		@AuraEnabled
   		public Decimal Price;//折后价格
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
        public List<ProductInner> innerlist{get;set;}
    }
   	// 初始化
   	@AuraEnabled
	public static ProductInner[] initProduct(String orderId)
	{
		ProductInner[] innerList = new ProductInner[]{};
		Order__c order  = [Select Id,(select Id,Product__c from Order_Product__r) from Order__c where Id =: orderId];
		if(order.Order_Product__r.size() > 0){
			Map<Id,Product__c> proMap = new Map<Id,Product__c>();
			Set<Id> idSet = new Set<Id>();
			for(OrderProducts__c orderProduct : order.Order_Product__r){
				idSet.add(orderProduct.Product__c);
			}
			for(Product__c pro : [Select Id,Name,Product_Code__c  from Product__c where id in: idSet]){
				proMap.put(pro.Id,pro);
			}
			System.debug('proMap==='+proMap);
			for(OrderProducts__c orderProduct : order.Order_Product__r){
				System.debug('proMap33==='+orderProduct.Product__c);
				System.debug(proMap.get(orderProduct.Product__c));
				ProductInner productInner = new ProductInner();
				productInner.product =proMap.get(orderProduct.Product__c);
				productInner.flag = false;
				productInner.num = 0;
				productInner.Price = 0;
				innerList.add(productInner);
			}
			System.debug('innerList==='+innerList);
		}
		return innerList;
	}
   	// 搜索产品
   	@AuraEnabled
	public static ProductInner[] searchProducts(String productName, String productId)
	{

		List<Product__c> productList = new List<Product__c>();
		String sql = 'SELECT Id,Name,Product_Code__c FROM Product__c where CreatedDate != null ';
		if(productName != null && productName != '')
		{
			sql += 'and Name  like \'%' + productName + '%\'';
		}
		if(productId != null && productId != '')
		{
			sql += 'and Product_Code__c =\'' + productId + '\'';
		}
		
		productList = Database.query(sql);
		ProductInner[] innerList = new ProductInner[]{};
		for(Product__c product : productList)
		{	
			ProductInner productInner = new ProductInner();
			productInner.product = product;
			productInner.flag = false;
			productInner.num = 0;
			productInner.Price = 0;
			innerList.add(productInner);		
		}
		return innerList;
	}
	// 保存
	@AuraEnabled
	public static void saveProducts(String innerList, String orderId)
	{
		Order__c order  = [Select Id from Order__c where Id =: orderId];
		AP_OrderItems.ProductInner[] jsonApex = (AP_OrderItems.ProductInner[])JSON.deserialize(EncodingUtil.urlDecode(innerList,'utf_8'),AP_OrderItems.ProductInner[].class);
		List<OrderProducts__c> orderProductList = new List<OrderProducts__c>();
		for(ProductInner innerPro : jsonApex){
			OrderProducts__c orderProduct = new OrderProducts__c();
			orderProduct.Product__c = innerPro.product.Id;
			orderProduct.Order__c = order.Id;
			orderProductList.add(orderProduct);
		}
		insert orderProductList;
	}
}
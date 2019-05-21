/*
	*Author:Alan Li
	*Date:2016-8-20
	*Function:按钮功能跳转页面功能
*/ 
public with sharing class AddProductController {
    Id orderId = apexpages.currentPage().getParameters().get('id');
    public List<Order__c> orderList {get;set;}
    public String s {get;set;}
    public AddProductController() {
    	orderList = new List<Order__c>();
        orderList = [select Id,Name,Order_Number__c,Is_Condition__c from Order__c];
    }
    public PageReference doSave(){
    	update orderList;
    	return new PageReference('/'+orderId);
    }
    public PageReference doCancel(){
    	return new PageReference('/'+orderId);
    }
}
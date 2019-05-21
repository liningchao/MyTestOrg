public with sharing class jQueryDataTableCtrl 
{
	@AuraEnabled
  	public static list <Computer_Product__c> fetchComputerProduct() 
  	{
     	Return [SELECT Name,Product_Brand__c,Product_Number__c,Product_Price__c FROM Computer_Product__c];   
    }
}
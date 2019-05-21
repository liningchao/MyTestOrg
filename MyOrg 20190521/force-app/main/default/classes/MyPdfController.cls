public with sharing class MyPdfController {
    Id proId = apexpages.currentPage().getParameters().get('id');
    public Product__c pro{get;set;}
    // Public List<Product__c> proList {get;set;}
    public MyPdfController() {
        pro = [Select Id,Name,Product_Code__c from Product__c where Id =:proId][0];
    }
}
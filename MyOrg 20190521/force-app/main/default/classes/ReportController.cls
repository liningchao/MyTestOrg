public with sharing class ReportController {
    public List<Account> accList{get;set;}
    public ReportController() {
      	accList = [select Id,Name,Money__c,AlreadyMoney__c,MoneyRate__c from Account where isSpecialLabel__c = true];
    }
}
public with sharing class AccountList {
    public List<Account> accList{get;set;}
    public AccountList() {
        accList = [Select Id,Name,AccountNumber,CreatedById from Account]; 
    }
}
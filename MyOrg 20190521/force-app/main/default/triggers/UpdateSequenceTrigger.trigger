trigger UpdateSequenceTrigger on Expense_Details__c(after insert) {
    Set<Id> IdSet = new Set<Id>();
    Set<Id> IdSet2 = new Set<Id>();
    for(Expense_Details__c ed : trigger.new){
    	IdSet.add(ed.Id);
    	IdSet2.add(ed.Expense__c);
    }
    List<Expense_Details__c> edList = [Select Id,Money__c from Expense_Details__c where Id in:IdSet];
    List<Expense__c> edList2 = [Select Id,Total_Money__c from Expense__c where Id in:IdSet2];
   	for(Expense_Details__c ed : edList){
   		System.debug('=========='+ed.Money__c);
   	}

  	for(Expense__c e : edList2){
  		System.debug('----------'+e.Total_Money__c);
  	}
}
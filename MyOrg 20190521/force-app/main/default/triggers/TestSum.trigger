trigger TestSum on Expense__c(after update) {
    for(Expense__c expNew : trigger.new){
    	Expense__c expOld = (Expense__c)trigger.oldMap.get(expNew.Id);
    	if(expNew.Total_Money__c != expOld.Total_Money__c && expNew.Total_Money__c != null){
    		System.debug('进入逻辑'+expNew.Total_Money__c +'---'+expOld.Total_Money__c);
    	}

    }
}
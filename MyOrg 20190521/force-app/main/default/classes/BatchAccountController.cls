/*
	Lightning后台数据查询类
*/
public class BatchAccountController 
{
	public class AccountInner
	{
		@AuraEnabled
		public Account acc{get;set;}
		@AuraEnabled
		public Boolean flag{get;set;}
		@AuraEnabled
		public String Name{get;set;}
		@AuraEnabled
		public String Phone{get;set;}
		@AuraEnabled
		public String AccountSource{get;set;}
	}

    @AuraEnabled
    public static AccountInner[] searchAccount() 
    {
    	AccountInner[] alist = new AccountInner[]{};
		for(Account a : [SELECT Id,Name,Phone,AccountSource From Account])
		{
			AccountInner ai = new AccountInner();
    		ai.acc = a;
    		ai.flag = false;

    		alist.add(ai);
		}

		return alist;
    }

    @AuraEnabled
    public static void saveAccount(String accountInners)
    {
        try
        {
        	Account[] alist = new Account[]{};	
	    	//反序列化Json串  注意是数组
	        BatchAccountController.AccountInner[] jsonApex = (BatchAccountController.AccountInner[])JSON.deserialize(EncodingUtil.urlDecode(accountInners,'utf_8'),BatchAccountController.AccountInner[].class);

	        System.debug('===================jsonApex=================='+jsonApex);

	        for(BatchAccountController.AccountInner accinner : jsonApex)
	        {
	        	Account a = new Account();
	        	a.Name = accinner.Name;
	        	a.Phone = accinner.Phone;
	        	a.AccountSource = accinner.AccountSource;

	        	alist.add(a);
	        }	

	        if(alist.size() > 0)
	        	insert alist;
        }
        catch(Exception e)
        {
        	system.debug('0==={===========>'+e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteAccount(String[] delId)
    {
    	try
    	{
    		Account[] delacc = new Account[]{};
    		delacc = [Select Id From Account Where Id IN: delId];

    		if(delacc.size() > 0)
    			delete delacc;
    	}
    	catch(Exception e)
    	{
    		system.debug('0=={============>'+e.getMessage());
    	}
    }
}
public class TestTabDemo 
{
    @AuraEnabled
    public static Account[] SearchAccount(String AccountName) 
    {
        Account[] alist = new Account[]{};

        alist = [Select id,name,phone,type,fax From Account Where name Like : AccountName];

        return alist;
    }
}
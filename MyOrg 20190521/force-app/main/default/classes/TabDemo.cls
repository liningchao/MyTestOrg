public class TabDemo 
{
    @AuraEnabled
    public static void Initlist() 
    {

    }

    @AuraEnabled
    public static Account[] SearchAccount(String AccountName) 
    {
        AccountName = '%' + AccountName + '%';
        Account[] alist = new Account[]{};

        alist = [Select Id,Name,Phone,Fax,Type From Account Where Name like : AccountName];

        return alist;
    }

    @AuraEnabled
    public static Contact[] SearchContact(String AccountName) 
    {
        AccountName = '%' + AccountName + '%';
        Contact[] clist = new Contact[]{};

        clist = [Select Id,Name,Phone,MobilePhone,AccountId,Account.Name From Contact Where Account.Name like : AccountName];

        return clist;
    }
}
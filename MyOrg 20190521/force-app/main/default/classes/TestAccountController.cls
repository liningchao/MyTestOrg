public class TestAccountController 
{
	public Account[] alist{get;set;}
    public TestAccountController() 
    {
        alist = new Account[]{};
        alist = [Select Id,Name,Phone,Type From Account];
    }

    public void save()
    {

    }

    public void cancel()
    {
    	
    }
}
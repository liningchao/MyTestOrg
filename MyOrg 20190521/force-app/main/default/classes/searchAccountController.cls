public with sharing class searchAccountController 
{
	@AuraEnabled
 	public static Account[] fetchAccount(String searchKeyWord) 
 	{
	  	String searchKey = '%' +searchKeyWord + '%';
	  	Account[] returnList = new Account[]{};
	  	Account[] lstOfAccount = [select id,Name,Type,Industry,Phone,Fax from account where Name LIKE: searchKey];
	 
	  	for (Account acc: lstOfAccount) 
	  	{
	   		returnList.add(acc);
	  	}
	  	
	  	return returnList;
 	}
 }
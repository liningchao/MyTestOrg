/**************************************************************************************************
 * Name: MyTest
 * Purpose: Test
 * Author:  Alan.li
 * Create Date: 2019-01-11
 * Modify History:

 **************************************************************************************************/
public without sharing class MyTest {
    public List<WeChatAccount__c> accountList { get; set; }
    public MyTest() {
        accountList = [Select Id,Name,bankno__c,email__c,idnumber__c,phone__c,regbank__c,username__c from WeChatAccount__c];
    }
    public void Save(){
    	update accountList;
    }
  
}
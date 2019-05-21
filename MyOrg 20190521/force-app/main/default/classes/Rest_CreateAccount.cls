/**********************************************************************
 * 
 *
 * @url: /services/apexrest/rest
 * @data:
 *  {
        
    }
https://liningchao-dev-ed.my.salesforce/services/apexrest/Rest_CreateAccount

https://ap4.salesforce.com/services/apexrest/Rest_CreateAccount
https://login.salesforce.com/services/apexrest/Rest_CreateAccount/
*************************************************************************/
@RestResource(urlMapping='/Rest_CreateAccount')
global with sharing class Rest_CreateAccount {
    @HttpPost
    global static Response doPost(RequestClass requestPara) {
        WeChatAccount__c wcAccount = new WeChatAccount__c();
        wcAccount.bankno__c = requestPara.bankno;
        wcAccount.email__c = requestPara.email;
        wcAccount.idnumber__c = requestPara.idnumber;
        wcAccount.phone__c = requestPara.phone;
        wcAccount.regbank__c = requestPara.regbank;
        wcAccount.username__c = requestPara.username;
        upsert wcAccount email__c;
        Response res = new Response();
        res.Success = true;
        res.StringResult = '成功';
        return res;
    }
    global class RequestClass{
        global String username{get;set;} 
        global String phone{get;set;} 
        global String idnumber{get;set;} 
        global String email{get;set;} 
        global String regbank{get;set;} 
        global String bankno{get;set;} 
    }
    global class Response 
    {
        global Boolean Success {get;set;} 
        global String StringResult {get;set;}
        public Response() 
        {
             Success = false;
             StringResult = '';
        }
    }
}
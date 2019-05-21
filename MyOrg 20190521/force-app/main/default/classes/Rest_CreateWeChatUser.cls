/**********************************************************************
 * 
 *
 * @url: /services/apexrest/rest
 * @data:
 *  {
        
    }

https://ap4.salesforce.com/services/apexrest/Rest_CreateWeChatUser
*************************************************************************/
@RestResource(urlMapping='/Rest_CreateWeChatUser')
global with sharing class Rest_CreateWeChatUser {
    @HttpPost
    global static Response doPost(RequestClass requestPara) {
        WeChatUser__c user = new WeChatUser__c();
        user.OpenId__c = requestPara.OpenId;
        user.city__c = requestPara.city;
        user.country__c = requestPara.country;
        user.headimgurl__c = requestPara.headimgurl;
        user.nickname__c = requestPara.nickname;
        user.province__c = requestPara.province;
        user.sex__c = requestPara.sex;
        user.subscribe_time__c = requestPara.subscribe_time;
        upsert user OpenId__c;
        Response res = new Response();
        res.Success = true;
        res.StringResult = '成功';
        return res;
    } 
    global class RequestClass{
        global String city{get;set;} 
        global String country{get;set;}
        global String headimgurl{get;set;} 
        global String nickname{get;set;} 
        global String OpenId{get;set;} 
        global String province{get;set;}
        global String sex{get;set;} 
        global String subscribe_time{get;set;}
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
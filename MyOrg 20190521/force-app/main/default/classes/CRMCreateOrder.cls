//  http://liningchao-developer-edition.ap4.force.com/RestTest/CRMCreateOrder/
@RestResource(urlMapping='/CRMCreateOrder/*')
global with sharing class CRMCreateOrder {
    @HttpPost
    global static Response doPost(RequestClass requestPara) { 
        System.debug('requestPara='+requestPara);
        return new Response();
    }
    global class RequestClass{
        global String str{get;set;}                                        
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
//  http://liningchao-developer-edition.ap4.force.com/RestTest/HttpRequest/
@RestResource(urlMapping='/HttpRequest/*')
global with sharing class HttpRequest {
    @HttpPost
    global static Response doPost(Request.T1ReqJson requestPara) { 
		try{
            
            if(requestPara.name == 'name'){
    			Response res = new Response();
    			res.status = 401;
    			res.message = ErrorCodeHelper.getErrorMes(res).message;
                return res;
		    }
            // 手动异常
            if(requestPara.name == ''){
               Integer i; i++;
            }        
            Response.T1ResJson res = new Response.T1ResJson();
            res.result = '接收处理';
            res.status = 0;
            res.message = ErrorCodeHelper.getErrorMes(res).message;
            return res;
        }catch(Exception e){
            Response res = new Response();
            res.message = e.getMessage();
            res.message = ErrorCodeHelper.getErrorMes(res).message;
            return res;
        }
    }
}
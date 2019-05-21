/*
	*Author:Alan Li
	*Date:2017-02-10
	*Function:测试
*/
global class WebServiceTest{
	//请求
	global class AuthenticationRequest 
	{
		webService String AccountNum {get;set;}
	    public AuthenticationRequest() {
	    	AccountNum = '';
	    }
    }
    //返回结果
    global class WebServiceResponse 
    {
        webService Boolean Success       {get;set;} 
        webService String StringResult   {get;set;}
        public WebServiceResponse() {
        	Success = false;
        	StringResult = '失败';
        } 
    }
    webService Static WebServiceResponse test(AuthenticationRequest request){
    	WebServiceResponse response = new WebServiceResponse();
    	if(request.AccountNum == ''){
    		response.Success = false;
    		response.StringResult = '参数信息为空';
    		return response;
    	}
    	return response;
    }
}
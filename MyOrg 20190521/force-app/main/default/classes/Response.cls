/*
    @Author:Alan
    @Date:2017-12-18
    @Function:响应参数
*/
global virtual class Response {
    global Integer status;
    global String message;
    global Response() {}
    global Response(Integer errcode, String errmsg) 
    {
        this.status = errcode;
        this.message = errmsg;
    }
    global class T1ResJson extends Response 
    {
        global String result;
    }
    global class T2ResJson extends Response 
    {
        global String result;
        global Integer inte;
    }
    
}
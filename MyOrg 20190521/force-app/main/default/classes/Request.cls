/*
    @Author:Alan
    @Date:2017-12-18
    @Function:请求参数
*/
global virtual class Request {
    global class T1ReqJson extends Request 
    {
        global String name;
    }
    global class T2ReqJson extends Request 
    {
        global String name;
        global Integer inte;
    }
}
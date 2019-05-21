/*
   @Author:Alan
   @Date:2017-12-18
   @Function: 错误标识码
*/
global class ErrorCodeHelper 
{  
    private static Map<Integer, String> errMap 
    {
        get
        {
            Map<Integer, String> errorMap = new Map<Integer, String>();
            //SF Status
            errorMap.put(401, '未经授权的'); 
            //系统错误码
            errorMap.put(0, 'SUCCESS');
            errorMap.put(-1, '未知错误');
            errorMap.put(1001, '缺少必须参数');//缺少必须参数
            return errorMap;
        }
    }

    global static Response getErrorMes(Response rspJson)
    {
        if(errMap.containsKey(rspJson.status))
        {
            rspJson.message = errMap.get(rspJson.status);
        }
        else
        {
            rspJson.status = -1;
            rspJson.message  = errMap.get(-1) + rspJson.message;
        }
        return rspJson;
    }
}
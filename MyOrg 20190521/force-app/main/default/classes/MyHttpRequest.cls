public class MyHttpRequest {
    // 获取salesforce的token
    public String getSalesforceToken() {
        //获取token需要的基础信息
        String getTokenUrl = 'https://liningchao-dev-ed.my.salesforce.com/services/oauth2/token';
        String grant_type = 'password';
        String username = 'liningchao@liningchao.com';
        String password = 'p@99w0rd';
        String client_id = '3MVG9YDQS5WtC11rDKm.0QX4PIBdeI7rsvzbZunFqfcxl3NR4mM5tieQ0vmPxHyCOlEKJFhmqj8FJuH.51dK7';
        String client_secret = '5780013869784544475';
        //获取token的链接和请求参数
        String endpoint = getTokenUrl + '?' + 'grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret + '&username=' + username + '&password=' + password;
        System.HttpRequest req = new System.HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        //发送http请求
        Http http = new Http();
        HTTPResponse res = http.send(req);
        String result = res.getBody(); 
        if(String.isNotEmpty(result)) {
            return result;
        }
        return null;
    }
    // 解析token的json字符串
    public SalesforceToken convertJsonToSalesforceToken(String jsonStr) {
        if(String.isNotEmpty(jsonStr)) {
            JSONParser parser = JSON.createParser(jsonStr);
            while (parser.nextToken() != null) {
                if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                    SalesforceToken sfdcToken = (SalesforceToken)parser.readValueAs(SalesforceToken.class);
                    if(sfdcToken != null) {
                        return sfdcToken;
                    }
                }
            }
        }
        return null;
    }

    public String getOrgLimition(SalesforceToken token){
        if(token != null) {
            String endpoint = token.instance_url + '/services/data/v45.0/limits/';
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            req.setHeader('X-PrettyPrint', '1');
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }
    public String getAllObjects(SalesforceToken token){
        if(token != null) {
            String endpoint = token.instance_url + '/services/data/v30.0/sobjects/Account';
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            req.setHeader('X-PrettyPrint', '1');
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }
    // 通过ID获取记录
    public String getObjectValue(SalesforceToken token, String objectName, String id) {
        if(token != null) {
            String endpoint = token.instance_url + '/services/data/v30.0/sobjects/' + objectName + '/' + id;
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }
    // 查询语句查询记录
    public String queryObject(SalesforceToken token) {
        if(token != null) {

            // String endpoint = token.instance_url + '/services/data/v30.0/query/?q=SELECT+name+,+id+from+RecordType+where+SobjectType+=+\'+Account+\'';
            String endpoint = token.instance_url + '/services/data/v30.0/query/?q=SELECT+name+,+id+from+Account';
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }
    // 创建记录
    public String createObject(SalesforceToken token, String objectName, String body) {
        if(token != null) {
            String endpoint = token.instance_url + '/services/data/v30.0/sobjects/' + objectName + '/ ';
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('POST');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            req.setHeader('Content-Type', 'application/json');
            req.setBody(body);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }

    // 更新记录
    public String updateObject(SalesforceToken token, String objectName, String ID, String body) {
        if(token != null) {
            String endpoint = token.instance_url + '/services/data/v30.0/sobjects/' + objectName + '/' + ID + '?_HttpMethod=PATCH';
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('POST');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            req.setHeader('Content-Type', 'application/json');
            req.setBody(body);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            if(String.isNotEmpty(result)) {
                return result;
            }
        }
        return null;
    }

    // 调用自定义REST方法
    public String myTestMethod (SalesforceToken token, String body) {
        if(token != null) {
            System.HttpRequest req = new System.HttpRequest();
            //Set System.HTTPRequest Method
            req.setMethod('POST');
            String authorization = 'Bearer ' + token.access_token;
            req.setHeader('Authorization', authorization);
            //Set System.HTTPRequest header proporties
            req.setHeader('content-type', 'application/json');
            req.setHeader('Accept', 'application/json');
            //Set System.HTTPRequest Endpoint
            req.setEndpoint('https://jacktar-dev-ed.my.salesforce.com/services/apexrest/lww/user_defined_type_example/');
            //Set HTTP Request Body
            req.setBody(body);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            //Helpful debug messages
            System.debug(res.toString());
            System.debug('STATUS:'+res.getStatus());
            System.debug('STATUS_CODE:'+res.getStatusCode());
            System.debug('Content: ' + res.getBody());
            return res.getBody();
        }else {
            return null;
        }


    }

    @future(callout=true)
    public Static void getObjectValueCall(String url, String token,String objectName, String id) {
        if(token != null) {
            String endpoint = url + '/services/data/v30.0/sobjects/' + objectName + '/' + id;
            System.HttpRequest req = new System.HttpRequest();
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            String authorization = 'Bearer ' + token;
            req.setHeader('Authorization', authorization);
            Http http = new Http();
            HTTPResponse res = http.send(req);
            String result = res.getBody();
            system.debug('result  is:~~~~~~~~~~~~~~~~`'+result );
         }
        
    }
}
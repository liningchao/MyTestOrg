/*
	*Author:Alan Li
	*Date:2018-8-02
	*Function: 手动推送消息模板
*/ 
global class WeChat_SendNewMessage {
    WebService static String  method(Id Id)
	{
		WeChatMaterial__c Material = [Select Id,Description__c,fromUser__c,PicUrl__c,Title__c,Url__c, 
												(Select Id,WeChatUser__r.OpenId__c from MaterialSource__r)
												from WeChatMaterial__c where Id =: Id];
		if(Material.MaterialSource__r.size() == 0){
			return '未查询到要推送的微信用户';
		}
		String openIds = '';
		Integer i = 0;
		for(MaterialUser__c user : Material.MaterialSource__r){
			/*if(i == Material.MaterialSource__r.size() -1)
				openIds += openIds+''+user.WeChatUser__r.OpenId__c;
			else
				openIds += openIds+''+user.WeChatUser__r.OpenId__c+'|';
			i++;*/
			String body = '';
			body += '{';
			body += '"openID":"'+user.WeChatUser__r.OpenId__c+'",';
			body += '"title":"'+Material.Title__c+'",';
			body += '"url":"'+(Material.Url__c == null?'':Material.Url__c)+'",';
			body += '"picurl":"'+(Material.PicUrl__c == null?'':Material.PicUrl__c)+'",';
			body += '"description":"'+Material.Description__c+'"';
			body += '}';
			System.debug('body = '+ body);
			String url = 'http://123.206.41.244/WeChatCourse/send';
	        System.debug('here url:'+url);
	        System.HTTPResponse res;
	        System.HttpRequest req = new System.HttpRequest();
	        req.setTimeout(120000);
	        req.setHeader('Content-Type','application/json');
	        req.setEndpoint(url);
	        req.setMethod('POST');
	        req.setBody(body);
	        //发送http请求
	        Http http = new Http();
	        res = http.send(req);
	        System.debug('同步数据返回结果:'+res.getBody());
		}
		
        return'成功';
	}
}
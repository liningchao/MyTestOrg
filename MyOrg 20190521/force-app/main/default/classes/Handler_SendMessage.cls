/*
	作者：Alan
	时间：2018.07.30
	功能：合同审批
*/
public  class Handler_SendMessage implements Triggers.Handler{
    public void handle() {
    	Set<Id> idSet = new Set<Id>();
    	for (contract contractsNew : (List<contract>)Trigger.new) {
            contract contractsOld = (contract)Trigger.oldMap.get(contractsNew.Id);
    		if (contractsOld.StatusProcess__c != '审批通过' && contractsNew.StatusProcess__c=='审批通过') {
                idSet.add(contractsNew.Id);
    		}
    	}
    	if(idSet.size() > 0)
    	{
    		send(idSet);
    	}
    }
    @Future(Callout=true)
    public static void send(Set<Id> idSet){
    	String body = '';
		List<contract> contractList = [Select Id,Name,Account.Name,ContractNumber,StartDate,EndDate,CreatedById from contract where Id in: idSet];
		List<User> userList = [Select Id,Name,OpenId__c from User where Id = '0056F000006PjCr'];
		body += '{"openID":"'+userList[0].OpenId__c+'",';
		body += '"Message":"合同编号：'+contractList[0].ContractNumber+'';
		body += '\\n客户名称：'+contractList[0].Account.Name+'';
		body += '\\n合同开始日期：'+Date.newInstance(contractList[0].StartDate.year(),contractList[0].StartDate.month(),contractList[0].StartDate.day()).format()+'';
		body += '\\n合同结束日期：'+Date.newInstance(contractList[0].EndDate.year(),contractList[0].EndDate.month(),contractList[0].EndDate.day()).format()+'';
		body += '\\n已经审批通过,请及时跟进。';
		body += '"}';
		System.debug('body ==== '+body);
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
}
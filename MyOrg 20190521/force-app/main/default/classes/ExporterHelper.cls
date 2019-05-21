/*
    *Author:Alan Li
    *Date:2018-08-21
    *Function:
    *1、发送报表附加附件。
*/ 
global with sharing class ExporterHelper implements System.Schedulable {
    global void execute(SchedulableContext sc) {
    	String[] toAddresses = new String[] {};
        if(Emails__c.getAll().values().size() > 0){
             for(Emails__c emails :Emails__c.getAll().values()){
                toAddresses.add(emails.Email__c);
             }
        } 
        // 获取报表
        List <Report> reportList = [SELECT Id,DeveloperName FROM Report where
		DeveloperName = 'MyApplication'];
		String reportId = (String)reportList.get(0).get('Id');
		Reports.ReportResults results = Reports.ReportManager.runReport(reportId);
		// 元数据
		Reports.ReportMetadata rm = results.getReportMetadata();
    	// 获取报表
   		ApexPages.PageReference report = new ApexPages.PageReference('/00O6F00000BFm6C?csv=1');
		// 附件
		Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
		attachment.setFileName(rm.getName()+'.csv');
		attachment.setBody(report.getContent());
		attachment.setContentType('text/csv');
		// 邮件
		Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
		message.setFileAttachments(new Messaging.EmailFileAttachment[] { attachment } );
		message.setSubject(rm.getName());
		// message.setPlainTextBody('The report is attached.');
		String str ='您好<br/>'
	                 +'报表统计已经生成,请查收附件。<br/>'
	                 +'祝您工作愉快!<br/>'
	                 +'__________________________________________________<br/>'
	                 +'本邮件由SFDC系统产生，请勿回复。<br/>'
	                 +'如有任何疑问或者要求，请联系系统管理人员。' ;
	         
	    message.setHtmlBody(str);
		// 接收人
		message.setToAddresses(toAddresses);
		// 发送
		Messaging.sendEmail( new Messaging.SingleEmailMessage[] { message } );
    }
 
}
/*
    *Author:Alan Li
    *Date:2016-09-27
    *Function:
    *1,通过模板发送邮件
    *2,不通过模板发送邮件
*/ 
public class SendEmaisUtil {
    public void sendEmailWithoutEmailTemplateToOrgUsers() {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSenderDisplayName('the sender name you want to show');
        email.setPlainTextBody('test email text');
        email.setSubject('test email subject');
        email.setTargetObjectId('0056F000006PjCr');//使用此种方式给org内部User/Contact/Lead发邮件，email limit的count不加1
        email.setSaveAsActivity(false);//如果设置targetObjectId，则必须设置setSaveAsActivity为false
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
    }
    public void sendEmailWithoutEmailTemplateToExtraUser() {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSenderDisplayName('the sender name you want to show');
        email.setHtmlBody('<span color="red">测试html body内容</span>');
        email.setSubject('test email subject use html');
        //addresses which you wanna send to
        List<String> toAddresses = new List<String>();
        toAddresses.add('liningchao@outlook.com');
        email.setToAddresses(toAddresses);
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
    }
    public void sendEmailWithTextTemplateUseMergeField() {
        EmailTemplate temp =  [
            SELECT Id, Name, Subject, HtmlValue, Body, BrandTemplateId
            FROM EmailTemplate
            WHERE DeveloperName = 'MyTestTemplete'
            LIMIT 1
        ];
        Contact con = [SELECT Id FROM Contact where Id = '0036F00002aSCAS'];
        WeChatAccount__c acc = [select Id,email__c from WeChatAccount__c where Name != null limit 1];
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        //set display name,the value will show sender name
        email.setSenderDisplayName('the sender name you want to show');
        //if use template,targetObjectId will be required
        email.setTargetObjectId(con.Id);
        //for default,the email will send to targetObject's email,
        //if you don't want to send target object (user/contact/lead),just setTreatTargetObjectAsRecipient false 
        // email.setTreatTargetObjectAsRecipient(false);
        //if target object id is user or contact,set saveAsActivity false
        email.setSaveAsActivity(false);
        //set merge object id only if target object instanceof contact
        email.setWhatId(acc.Id);
        //set template id
        email.setTemplateId(temp.Id);
        /*List<String> toAddresses = new List<String>{'liningchao@outlook.com'};
        email.setToAddresses(toAddresses);*/
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
    }
}
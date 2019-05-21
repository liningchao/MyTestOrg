/*
 *批量添加活动成员
 */
public class BatchAddActivityMember {
	public Activity_Member__c member{get;set;}
	public Attachment leadAtt{get;set;}
	public  Transient  List<List<String>> List_CSVLead; 
    public Boolean flag{get;set;}
    public BatchAddActivityMember() {
        flag = false;
        leadAtt = new Attachment();
        member = new Activity_Member__c();
    }
    // 保存按钮
    public void AddButton(){
    	if(leadAtt.body == null)
        {
            Apexpages.Message mag=new Apexpages.Message(ApexPages.Severity.Error,'请填写附件相关信息！');
            Apexpages.addMessage(mag);
            return;
        } 
        //验证是否是csv文件
        if(leadAtt.Name!=null && leadAtt.Name.substringAfterLast('.')!='csv')
        {
        	leadAtt = new Attachment();
            Apexpages.Message mag=new Apexpages.Message(ApexPages.Severity.Error,'请上传格式为CSV的文件！');
            Apexpages.addMessage(mag);
            return;
        }
    }

    public void showSection(){
    	flag = true;
    }
}
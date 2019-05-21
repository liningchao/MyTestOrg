public  class processtest 
{
    private final Account mysObject;
    public PickList pickList{get;set;}
    
    public String stage_item{get;set;}
    public String stage_num{get;set;}
    
    class PickList
    {
    	public String stage_item{get;set;}
    	public String stage_num{get;set;}
    }
    
    // 构造
    public processtest(Apexpages.StandardController controller)
    {
    	mysObject = (Account)controller.getRecord();
    	pickList = new PickList();
    	getPickListValues('Account','Field1_c__c',pickList);
    }
    
    // 获取pickList值
    public void getPickListValues(String object_name,String field_name,PickList pickList)
    {
    	pickList.stage_item = '[\'';
    	pickList.stage_num = '[\'';
    	Integer i = 1;
    	List<String> pickvals_list = new List<String>();
    	Schema.SObjectType targetType = Schema.getGlobalDescribe().get(object_name);
    	Schema.DescribeSObjectResult sobject_describe = targetType.getDescribe();
    	Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap();
    	List<Schema.PicklistEntry> pick_list_values = field_map.get(field_name).getDescribe().getPickListValues();
    	
    	for(Schema.PicklistEntry temp:pick_list_values)
    	{
    		pickvals_list.add(temp.getValue());
    	}
    	
    	for(String temp:pickvals_list)
    	{
    		pickList.stage_item += temp + '\', \'';
    		pickList.stage_num += i + '\', \'';
    		i++;
    	}
    	
    	pickList.stage_item = pickList.stage_item.substring(0, pickList.stage_item.length() - 3);
    	pickList.stage_item += ']';
    	pickList.stage_num = pickList.stage_num.substring(0,pickList.stage_num.length() - 3);
    	pickList.stage_num += ']';
    }
}
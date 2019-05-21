global class UseOpp
{
	webService static String  use(Id oppId)
	{
		List<Opportunity> oppList = [select Id from Opportunity where Id=:oppId];
		for(Opportunity opp : oppList){
			opp.isUse__c = true;
		}
		update oppList;
		return '可以做更新操作！';

	}
}
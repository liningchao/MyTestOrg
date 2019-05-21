/**
 *@Author:Sean
 *@Date:2018.4.9
 *@Function:SPA_Demo后台controller
 */
global class SPA_Controller {
	@RemoteAction
    global static Integer getAccountConut(){
    	AggregateResult[] groupedResults = [SELECT Count(Id)c FROM Account];
    	return Integer.valueOf(groupedResults[0].get('c'));
    }
}
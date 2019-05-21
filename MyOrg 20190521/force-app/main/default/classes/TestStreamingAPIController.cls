public with sharing class TestStreamingAPIController {

	@AuraEnabled
    public static String returnSessionID(){
    	return UserInfo.getSessionId();
    }
}
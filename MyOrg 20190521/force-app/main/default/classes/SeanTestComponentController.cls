public class SeanTestComponentController {

    @AuraEnabled
    public static void Test(){
    	System.debug('test server-controller');
    }
}
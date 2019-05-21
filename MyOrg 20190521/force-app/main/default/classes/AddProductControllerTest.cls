/*
    *Author:Alan Li
    *Date:2016-09-19
    *Function:GetRepertory测试类。
 	*Coverage:
*/
@isTest
private class AddProductControllerTest {
    static testMethod void testMethod1() {
        Order__c order = new Order__c();
        order.Name = '测试';
        Insert order;

        Apexpages.CurrentPage().getParameters().put('id',order.id);
        AddProductController add = new AddProductController();

        add.doSave();
        add.doCancel();

    }
}
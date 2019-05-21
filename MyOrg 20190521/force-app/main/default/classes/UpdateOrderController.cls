/*
	*Author:Alan Li
	*Date:2016-8-20
	*Function:按钮功能
*/ 
global class UpdateOrderController {
   webService static String  method(Id OrderId){
   		Boolean flag = true;
   		List<Order__c> orderList = [Select Id,Is_Condition__c from Order__c where Id =:OrderId];
   		for(Order__c order : orderList){
   			if(order.Is_Condition__c == false){
   				order.Is_Condition__c = true;
   			}else{
   				flag = false;
   			}
   		}
   		update orderList;
   		if(flag){
   			return '操作成功';
	   	}else{
			return '操作失败';
	   	}
	   	return null;
   }
}
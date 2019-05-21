/*
	作者：Alan
	时间：2018.07.30
	功能：合同审批
*/

trigger Handler_SendMessage on contract(after update) {
    new Triggers()
       .bind(Triggers.Evt.afterupdate, new Handler_SendMessage())
       .manage();
}
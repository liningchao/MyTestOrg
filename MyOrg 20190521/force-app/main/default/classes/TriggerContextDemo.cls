public class TriggerContextDemo
{
  public Boolean updateContact(Contact[] conList)
  {
     // Will not update contact if method is called in TriggerContext
     if(Trigger.isExecuting)
     {
        // Do Not Update Any contact
        System.debug(' $ $ NOT updating contacts');
     }
     else
     {
       // update contacts
       System.debug(' $ $ updating contacts');
     }
     System.debug(' $ $ return ' + Trigger.isExecuting);
     return Trigger.isExecuting;
  }
}
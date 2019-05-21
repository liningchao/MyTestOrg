({
	editAcc: function(component, event, helper) {
        var selected = event.getParam("actedit");
        component.set("v.acttoedit",selected);
	},

    newAcc: function(component, event, helper) {
        var selected = event.getParam("actnew");
        component.set("v.acttoedit",selected);
    },

    cancel:function(component, event, helper) {
        var mainEvent = $A.get("e.c:mainNavigator");
        mainEvent.fire();
    },

    updateAccount: function(component, event, helper) {
        var saveEvent = $A.get("e.c:saverowEvent");
        var saveacc = component.get("v.acttoedit");
        saveEvent.setParams({ "actsave": saveacc});
        if(saveacc.Id==null){
           saveEvent.setParams({ "isupdate": false});
        }else{
            saveEvent.setParams({ "isupdate": true});
        }
        saveEvent.fire();
    }

})
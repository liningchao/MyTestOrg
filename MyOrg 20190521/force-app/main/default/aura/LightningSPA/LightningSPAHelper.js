({
	getAccounts: function(component) {
       		var action = component.get("c.lstaccounts");
			var self = this;
			action.setCallback(this, function(response) {
			var state = response.getState();
				if (component.isValid() && state === "SUCCESS") {
					component.set("v.lstAccnts", response.getReturnValue());
				}else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors) {
	                    $A.log("Errors", errors);
	                    if (errors[0] && errors[0].message) {
	                    	throw new Error("Error message: " + errors[0].message);
	                    }
	                } else {
	                	throw new Error("Unknown error");
	                }
            }
			});
			$A.enqueueAction(action);
		},

	deleteAccounts: function(component,event) {// Call the Apex controller and update the view in the callback
	    var action = component.get("c.deleteAccount");
	    var self = this;
	    var acctdeleted=event.getParam("deleteacct");
	    action.setParams({
	        "acc": acctdeleted
	    });
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (state === "SUCCESS") {
	            // Remove only the deleted expense from view
	            var lstacct = component.get("v.lstAccnts");
	            var items = [];
	            for (var i = 0; i < lstacct.length; i++) {
	                if(lstacct[i].Id!==acctdeleted.Id) {
	                    items.push(lstacct[i]);
	                }
	            }
	            component.set("v.lstAccnts", items);
	            // Other client-side logic
	            var toggleText = component.find("listview");
				$A.util.removeClass(toggleText,'toggle');
				var toggleText = component.find("detailView");
				$A.util.addClass(toggleText,'toggle');
				this.shownewBtn(component, event);
				component.set("v.messages", []);
	        }else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors) {
	                    if (errors[0] && errors[0].pageErrors) {
	                        $A.createComponents([
							    ["ui:message",{
							        "title" : "操作失败:",
							        "severity" : "error",
							    }],
							    ["ui:outputText",{
							        "value" : errors[0].pageErrors[0].message
							    }]
							    ],
								function(components) {
							        var message = components[0];
									var outputText = components[1];
									// set the body of the ui:message to be the ui:outputText
									message.set("v.body", outputText);
									component.set("v.messages", message);
							        setTimeout(function() {
							        $A.getCallback(function() {
							        	component.set("v.messages", []);
							        });
							    }, 10000)
							    } )
							}
	                } else {
	                	throw new Error("Unknown error");
	                }
            	}
	    	});

	    	$A.enqueueAction(action);
	    },

	upsertAcc: function(component,event) {
	    var action = component.get("c.saveAccount");
		var saveaccount = event.getParam("actsave");
		action.setParams({
			"acc": saveaccount
		});
		action.setCallback(this, function(response) {
	        var state = response.getState();
	        console.log(state);
	        if (state === "SUCCESS") {
	           	var acctsave=response.getReturnValue();
				var lstacct = component.get("v.lstAccnts");
	    		var items = [];
	    		if(!event.getParam("isupdate")){
	     			items.push(acctsave); //Push to item list at top if its new component
	     		}
			    for (var i = 0; i < lstacct.length; i++) {
			        if(lstacct[i].Id==acctsave.Id) {
			            items.push(acctsave);
			        }else{
			        	items.push(lstacct[i]);
			        }
			    }

			    component.set("v.lstAccnts", items);
				var toggleText = component.find("editview");
				$A.util.addClass(toggleText,'toggle');
				var toggleText = component.find("detailView");
				$A.util.addClass(toggleText,'toggle');
				var toggleText = component.find("listview");
				$A.util.removeClass(toggleText,'toggle');
				this.shownewBtn(component, event);
				component.set("v.messages", []);

		        }else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors[0] && errors[0].pageErrors) {
	                        $A.createComponents([
							    ["ui:message",{
							        "title" : "操作失败:",
							        "severity" : "error",
							    }],
							    ["ui:outputText",{
							        "value" : errors[0].pageErrors[0].message
							    }]
							    ],
								function(components) {
							        var message = components[0];
									var outputText = components[1];
									// set the body of the ui:message to be the ui:outputText
									message.set("v.body", outputText);
									component.set("v.messages", message);
							    } )
							} else {
						throw new Error("Unknown error");
	                }
            }
		    });
		    $A.enqueueAction(action);
	},

	hidenewBtn:function(component,event) {
		var toggleBtn= component.find("Newbtn");
		$A.util.removeClass(toggleBtn,'btn btn-primary btn-lg btn-block');
		$A.util.addClass(toggleBtn,'toggle');
	},

	shownewBtn:function(component,event) {
		var toggleBtn= component.find("Newbtn");
		$A.util.removeClass(toggleBtn,'toggle');
		$A.util.addClass(toggleBtn,'btn btn-primary btn-lg btn-block');
	}

})
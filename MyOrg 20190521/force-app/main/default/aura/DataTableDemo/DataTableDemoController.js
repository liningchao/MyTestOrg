({
    scriptsLoaded : function(component, event, helper) 
    {
        console.log('Script loaded..'); 
    },
    
    doInit : function(component,event,helper)
    {
        var action = component.get('c.fetchComputerProduct');
        action.setCallback(this, function(response) 
        {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                component.set('v.lstProduct', response.getReturnValue());
                //当响应成功从服务器返回时，在500毫秒后应用jQuery数据表
                setTimeout(function()
                { 
                    $('#tableId').DataTable({ 
	                    "bStateSave": false,   //开关，是否打开客户端状态记录功能。这个数据是记录在cookies中的，打开了这个记录后，即使刷新一次页面，或重新打开浏览器，之前的状态都是保存下来的- ------当值为true时aoColumnDefs不能隐藏列
	                    "bLengthChange": true, //开关，是否显示每页大小的下拉框
	                    "bAutoWidth": false,   //自适应宽度
	                    "lengthMenu": [10,30,50],  //每页显示的记录数下拉列表
	                    "sPaginationType": "full_numbers",
	                  	//"sScrollY": "800px",   //是否开启垂直滚动，以及指定滚动区域大小,可设值：'disabled','2000px'
	                  	//"bSort": true,         //开关，是否启用各列具有按列排序的功能
	                    "oAria": 
	                    {
				            "sSortAscending": ": 升序排列",
				            "sSortDescending": ": 降序排列"
				        },
	                    "oLanguage": 
	                    {
	                        "sProcessing": "正在加载中......",
	                        "sLengthMenu": "显示 _MENU_ 项结果",
	                        "sZeroRecords": "对不起，查询不到相关数据！",
	                        "sEmptyTable": "未查询到相关数据!",
	                        "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
	                        "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
	                        "sSearch": "搜索",
	                        "oPaginate": 
	                        {
	                            "sFirst": "首页",
	                            "sPrevious": "上一页",
	                            "sNext": "下一页",
	                            "sLast": "末页"
	                        }
	                    }
	                });
                    $('div.dataTables_filter input').addClass('slds-input');
                    $('div.dataTables_filter input').css("marginBottom","10px");
                }, 500);          
            }
        });
        $A.enqueueAction(action); 
    },
})
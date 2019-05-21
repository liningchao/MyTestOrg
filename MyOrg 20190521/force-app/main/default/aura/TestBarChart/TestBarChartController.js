({
    scriptsLoaded : function(component, event, helper) {
    	var ctx = component.find("chart").getElement();
        component.chart = new Chart(ctx,{
            type: 'horizontalBar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: "",
                        data: [],
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                //提示设置
                tooltips:{
                    enabled:true,
                    callbacks:{
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            label += " : " + tooltipItem.xLabel + "%";
                            return label;
                        }
                    }
                },
                //对于坐标轴设置
				scales: {
                    //Y轴设置
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepSize:2
                        }
                    }],
                    //X轴设置
                    xAxes: [{
                        ticks: {
                            callback: function(label, index, labels) {
                                return label+'%';
                            }
                        }
                    }]
                },
                //图标标签设置
                title: {
                    display: true,
                    text: 'Custom Chart Title'
                },
                //图例设置
                legend: {
                    display:false
                },
                //为柱状图添加onclick事件
                onClick: function(event) {
                    var elements = component.chart.getElementAtEvent(event);
                    if (elements.length === 1) {
                        component.set("v.selectedLabel",labels[elements[0]._index]);
                    }
                }
            }
        });

        var labels = ['A基金基金基金基金','B基金基金基金基金','C基金基金基金基金','D基金基金基金基金','E基金基金基金基金','F基金基金基金基金','G基金基金基金基金','H基金基金基金基金','I基金基金基金基金','J基金基金基金基金','K基金基金基金基金','L基金基金基金基金','M基金基金基金基金','N基金基金基金基金','O基金基金基金基金','P基金基金基金基金','Q基金基金基金基金','R基金基金基金基金'];
        var values = ['18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1'];

        component.chart.data.labels = labels;//x轴值
		component.chart.data.datasets[0].label = '数量';//图例
		component.chart.data.datasets[0].data = values;//y轴值
		component.chart.data.datasets[0].backgroundColor = 'rgba(62, 159, 222, 1)';//数据集颜色
        component.chart.update();
    }
})
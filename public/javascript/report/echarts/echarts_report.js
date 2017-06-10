require.config({
	paths:{     
		echarts: '/javascript/report/echarts/source'
	}
});
jQuery.report_graphic = {
	showScatter:function(main_scatter, contents) {
		var content = new Array();
		var legend_title = new Array();
		var series = {};
		for (var i in contents.data) {
			var data = new Array();
			for (var j in contents.data[i]) {
				if (j == 0) {
					continue;
				}
				data.push(contents.data[i][j]);
			}
			series = {
				'name': contents.data[i][0],
				'type':'scatter',
				'data':data,
				itemStyle:{
				}

			};
			if (contents.params != null && contents.params.colors != undefined) {
				series.itemStyle.normal = {
					color: function(params) {
						console.log(params);
						return contents.params.colors[params.seriesIndex];
					}
				}
			}
			if (contents.params != null && contents.params.shape != undefined) {
				series.symbol = contents.params.shape[i];
			}
			content.push(series);
			legend_title.push(contents.data[i][0]);
		}
		require(
			[
				'echarts',
				'echarts/chart/scatter',
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(main_scatter));
				option = {
					tooltip : {
						trigger: 'axis',
						showDelay : 0,
						axisPointer:{
							type : 'cross',
							lineStyle: {
								type : 'dashed',
								width : 1
							}
						}
					},
					legend: {
						data:legend_title,
						orient:'vertical',
						x:'right',
						padding:[40,0,0,0],
						show:contents.params.show_legend
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataZoom : {show: true},
							dataView : {show: true, readOnly: false},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					xAxis : [
						{
							type : 'value',
							scale:true,
							axisLabel : {
								//formatter: '{value}'
							}
						}
					],
					yAxis : [
						{
							type : 'value',
							scale:true,
							axisLabel : {
								//formatter: '{value}'
							}
						}
					],
					series : content
				};
				myChart.setOption(option);
			}
		);
	},
	showBarAndPie:function(bar, pie, contents) {
		var graphic_title = new Array();
		var graphic_x = new Array();
		var content = new Array();

		var pieContent = new Array();
		var title   = contents.infos.shift();
		for (var i in contents.infos) {
			graphic_title.push(contents.infos[i][0]);
			var number = 0;
			for (var j in contents.infos[i]) {
				if (!isNaN(parseInt(contents.infos[i][j]))) {
					number += parseFloat(contents.infos[i][j]);
				}
			}

			pieContent.push({'name' : contents.infos[i][0], 'value': number});
		}

		for (var i in title) {
			if (i == 0 ) {
				continue;
			}

			graphic_x.push(title[i]);
		}

		for (var i in contents.infos) {
			var data = new Array();
			for (var j in contents.infos[i]) {
				if (j == 0) {
					continue;
				}
				data.push(contents.infos[i][j]);
			}
			content.push({
				'name': contents.infos[i][0],
				'type':'bar',
				'stack': '总量',
				'symbol': 'none',
				//'barWidth': 40,
				'data':data,

			});
		}
		require(
			[
				'echarts',
				'echarts/chart/bar',
				'echarts/chart/line',
				'echarts/chart/pie',
			],
			function (ec) {
				var barChart = ec.init(document.getElementById(bar));
				var pieChart = ec.init(document.getElementById(pie));
				option_pie = {
					title : {
						text: '数据报告',
						subtext: '',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {
								show: true, 
								type: ['pie', 'funnel'],
								option: {
									funnel: {
										x: '25%',
										width: '50%',
										funnelAlign: 'left',
										max: 1548
									}
								}
							},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					legend: {
						orient : 'vertical',
						x : 'left',
						data:contents.params.grid_y
					},
					calculable : true,
					series : [
						{
							name:'比例',
							type:'pie',
							radius : '55%',
							center: ['50%', 225],
							data:pieContent
						}
					]
				};
				var option_bar = {
					tooltip : {
						trigger: 'axis',
						axisPointer : {
							type: 'shadow'
						}
					},
					legend: {
								data:graphic_title,
								itemGap:20,
								orient:contents.params.orient,
								padding:30,
							},
					toolbox: {
						show : true,
						orient:'vertical',
						y : 'center',
						feature : {
							mark : {show: true},
							magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data : graphic_x
						}
					],
					yAxis : [
						{
							type : 'value',
							splitArea : {show : true}
						}
					],
					grid: {
						y:contents.params.grid_y,
					},
					series : content
				};
				barChart.setOption(option_bar);
				pieChart.setOption(option_pie);

				barChart.connect(pieChart);
				pieChart.connect(barChart);
			}
		);
	},
	showBar:function(main_bar, contents) {
		console.log(contents);
		var content = new Array();
		var legend_title = new Array();
		var series_obj = {};
		for (var i in contents.data) {
			var data = new Array();
			for (var j in contents.data[i]) {
				if (j == 0) {
					continue;
				}
				data.push(contents.data[i][j]);
			}
			series_obj = {
				'name': contents.data[i][0],
				'type':'bar',
				'symbol': 'none',
				'barWidth': 10,
				barCategoryGap:'30',
				//barGap:'50%',
				'data':data,
				
				itemStyle: {
				}
			};
		
			if(contents.params != null && typeof(contents.params.colors) != 'undefined'){
				series_obj.itemStyle = {
		                normal: {
		                    color: function(params) {
		                    	
		                    	if(contents.params != null && typeof(contents.params.colors) != 'undefined'){
		                    		var colorList = contents.params.colors;
		                    		return colorList[params.dataIndex];
		                    	}else{
		                    		return '#F0805A';
		                    	}
		                    }
		                }
					}
			} else {
				
			}
			
			if (contents.params != null && typeof(contents.params.stack) != 'undefined') {
				series_obj.stack='总量';
			}
			content.push(series_obj);

			legend_title.push(contents.data[i][0]);
		}

		zoom = {};
		if (contents.categories.length > 10) {
			zoom = {
				show : true,
				realtime: true,
				start : 50,
				end : 100
			}
		}

		var xAxis = new Array();
		var yAxis = new Array();

		var rotation = {};
		if (contents.params != null && typeof(contents.params.rotation) != 'undefined') {
			rotation.rotate = contents.params.rotation;
		} else {
			rotation.rotate = 0;
		}
		
		if (contents.params != null && typeof(contents.params.horizontal) != 'undefined') {
			yAxis.push(
				{
					type : 'category',
					data:contents.categories,
					axisLabel:rotation,
					name:contents.params.x_label,
				}
			);
			xAxis.push({
				type : 'value',
				splitArea : {show : true},
				name:contents.params.y_label,
				max:contents.params.max_value,
				min:contents.params.min_value,
				
			});
		} else {
			xAxis.push(
				{
					type : 'category',
					data:contents.categories,
					axisLabel:rotation,
					name: contents.params.x_label,
				}
			);
			yAxis.push({
				type : 'value',
				splitArea : {show : true},
				name:contents.params.y_label,
				max:contents.params.max_value,
				min:contents.params.min_value,
			});
		}

		require(
			[
				'echarts',
				'echarts/chart/bar',
				'echarts/chart/line'
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(main_bar));
				var option = {
					title : {
						text: contents.params.title,
						subtext: contents.params.sub_title,
						x:'center',
					},
					tooltip : {
						show: true,
						trigger: 'item',
						formatter: function (params,ticket,callback) {
							console.log(params);
							var res = 'serial name : ' + params.seriesName;
							res += '<br />name: '+params.name+'<br />data: '+params.data;
							setTimeout(function (){
								callback(ticket, res);
							}, 1000)
							return 'loading';
						}
					},
					legend: {
						data:legend_title,
						//itemGap:90,
						//orient:'horiental',
						padding:[40,0,0,10],
						orient:'vertical',
						x:'right',
						show:contents.params.show_legend
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					dataZoom:zoom,
					grid: {
						x2:contents.params.grid_x2
						//width:450,	
					},
					calculable : false,
					xAxis : xAxis,
					yAxis : yAxis,
					series : content
				};
				myChart.setOption(option);
			}
		);
	},
	showCurve:function(curve, contents)
	{
		var content = new Array();
		var legend_title = new Array();
		var series = {};
		for (var i in contents.data) {
			var data = new Array();
			for (var j in contents.data[i]) {
				if (j == 0) {
					continue;
				}
				data.push(contents.data[i][j]);
			}

			series = {
				'name': contents.data[i][0],
				'type': 'line',
				smooth: true,
				symbol : 'none',
				'data': data,
				itemStyle:{},

			};
			
			if (contents.params != null && contents.params.colors != undefined) {
				series.itemStyle.normal = {
					color: function(params) {
						console.log(params);
						return contents.params.colors[params.seriesIndex];
					}
				}
			}

			content.push(series);
			legend_title.push(contents.data[i][0]);
		}
		require(
			[
				'echarts',
				'echarts/chart/bar',
				'echarts/chart/line'
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(curve));
				var option = {
				   title : {
						text: contents.params.title,
						subtext: contents.params.sub_title,
						x:'center',
				   },
				   tooltip: {
					   trigger: "item",
					   formatter: "{a} <br/>{b} : {c}"
				   },
				   legend: {
					   orient : 'vertical',
				       x : 'right',
					   padding:[30,10,0,0], 
					   data: legend_title,
					   show:contents.params.show_legend
					   
				   },
				   xAxis: [
					   {
						   type: "category",
						   name: "x测试",
						   splitLine: {show: false},
						   data: contents.categories
					   }
				   ],
				   yAxis: [
					   {
						   type: "value",
						   name: "y",
						   axisLabel:{
							   formatter:function(params) {
									console.log(params);
									if (typeof(contents.params.calculate_type) != 'undefined') {
										if (contents.params.calculate_type == 'log') {
											return Math.pow(10, params);
										}
									} else {
										return params;
									}
							   }
						   }
					   }
				   ],
					toolbox: {
					   show: true,
					   feature: {
						   mark: {
							   show: true
						   },
						   dataView: {
							   show: true,
							   readOnly: true
						   },
						   restore: {
							   show: true
						   },
						   saveAsImage: {
							   show: true
						   }
					   }
				   },
				   calculable: true,
				   series: content
				};
				myChart.setOption(option);
			}
		);
	},
	showPie:function(pie, contents)
	{
		require(
			[
				'echarts',
				'echarts/chart/pie',
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(pie));
				var option = {
				   
					title : {
						text: contents.title.text,
						subtext: contents.title.subtext,
					    x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
				   legend: {
						orient : 'vertical',
						x : 'left',
						data:{}
					},
					toolbox: {
					   show: true,
					   feature: {
						   mark: {
							   show: true
						   },
						   dataView: {
							   show: true,
							   readOnly: true
						   },
						   restore: {
							   show: true
						   },
						   saveAsImage: {
							   show: true
						   }
					   }
				   },
				   calculable: false,
				   series: [
						{
							name:'占比情况',
							type:'pie',
							radius:'30%',
							center: ['50%', '60%'],
							data:contents.data,
							itemStyle: {
								normal:{
									textStyle:{
										fontSize:120
									}
								}
							}
						}
					]
				};
				myChart.setOption(option);
			}
		);
	},
	showRelation:function(relation, contents)
	{
		var categories = new Array();
		categories.push({'name':'测试'});
		var label = {};
		for (var i in contents.title) {
			categories.push({'name': contents.title[i],'itemStyle': {
                    normal: {
                        width: 1.5,
                        color: 'blue'
                    }}})
		}
		console.log(content.params);
		if (contents.params.show_label != null) {
			label = {
				show: true,
				textStyle: {
					color: '#333'
				}
			}
		}
		require(
			[
				'echarts',
				'echarts/chart/force',
				'echarts/chart/chord'
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(relation));
				var option = {
					title : {
						text: contents.params.text,
						subtext: contents.params.sub_text,
						x:'center',
						y:'top'
					},
					tooltip : {
						trigger: 'item',
						formatter: function (params,ticket,callback) {
							var res = '';
							if (typeof(params[2]) == 'object') {
								var res = params[1]+":"+params[2].value;
							} else if (params[2] != null){
								var res = params[1]+":"+params[2];
							}
							setTimeout(function (){
								// 仅为了模拟异步回调
								callback(ticket, res);
							}, 1000)
							return 'loading';
						}
					},
					toolbox: {
						show : true,
						feature : {
							restore : {show: true},
							magicType: {show: true, type: ['force', 'chord']},
							saveAsImage : {show: true}
						},
						
					},
					legend: {
						x: 'right',
						data:contents.title,
						padding:[30,0,0,0],
						
					},
					series : [
						{
							type:'force',
							name : "关系",
							ribbonType: false,
							categories : categories,
							itemStyle: {
								normal: {
									label: label,
									nodeStyle : {
										brushType : 'both',
										borderColor : 'rgba(255,215,0,0.4)',
										borderWidth : 1
									}
								},
							},
							minRadius : 15,
							maxRadius : 25,
							gravity: 1.1,
							scaling: 1.2,
							draggable: false,
							linkSymbol: 'none',
							steps: 10,
							coolDown: 0.9,
							//preventOverlap: true,
							nodes:contents.nodes,
							links : contents.links,
						}
					]
				};;
				myChart.setOption(option);
			}
		);
	},
	showVenn:function(venn, contents)
	{
		require(
			[
				'echarts',
				'echarts/chart/venn'
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(venn));
				var option = {
					title : {
						text: contents.title.text,
						subtext: contents.title.subtext
					},
					tooltip : {
						trigger: 'item',
						formatter: "{b}: {c}"
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : false,
					series : [
						{
							name:'韦恩图',
							type:'venn',
							itemStyle: {
								normal: {
									label: {
										show: true,
										textStyle: {
											fontFamily: 'Arial, Verdana, sans-serif',
											fontSize: 16,
											fontStyle: 'italic',
											fontWeight: 'bolder'
										}
									},
									labelLine: {
										show: false,
										length: 10,
										lineStyle: {
											// color: 各异,
											width: 1,
											type: 'solid'
										}
									}
								},
								emphasis: {
									color: '#cc99cc',
									borderWidth: 3,
									borderColor: '#996699'
								}
							},
							data:contents.data
						}
					]
				};
				myChart.setOption(option);
			}
		);
	},
}; 
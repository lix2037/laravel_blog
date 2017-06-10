require.config({
	paths:{     
		echarts: '/javascript/echarts/source'
	}
});
jQuery.report_graphic = {
	showScatter:function(main_scatter, contents) {          
        var column = contents.title;
        var content = contents.infos;
        var param   = contents.param;
		console.log(content);
        var text    = 'X轴:'+column[param.show_x-1]+' Y轴:'+column[param.show_y-1];
		require(
			[
				'echarts',
				'echarts/chart/scatter',
			],
			function (ec) {
				var myChart = ec.init(document.getElementById(main_scatter));
				option = {
					title : {
						text: text,
						subtext: '',
					},
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
						data:[text]
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
					series : [
						{
							name:text,
							type:'scatter',
							tooltip : {
								trigger: 'item',
								formatter : function (params,ticket, callback) {
									if (params.value.length > 1) {
										return params.seriesName + ' :<br />'
										   + 'x:'+params.value[0]+'<br />' 
										   + 'y:'+params.value[1]+'<br />'
										   + 'title:'+contents.row[params.dataIndex];
									}
									else {
										return params.seriesName + ' :<br/>'
										   + params.name + ' : '
										   + params.value + '';
									}
								}
							},
							data: content,			
							markLine : {
								data : [
									{type : 'average', name: '平均值'}
								]
							},
							itemStyle:{
								color:function(v){
									console.log(v);
								}	
							}
						}
					]
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
		var graphic_title = new Array();
		var graphic_x = new Array();
		var content = new Array();

		var title   = contents.infos.shift();
		console.log(contents.infos);
		for (var i in contents.infos) {
			graphic_title.push(contents.infos[i][0]);
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
				'barWidth': 40,
				'data':data,

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
					tooltip : {
						show: true,
						trigger: 'item'
					},
					legend: {
						data:graphic_title,
						itemGap:20,
						orient:contents.params.orient,
						padding:30,
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					grid: {
						y:contents.params.grid_y,
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data:graphic_x
						}
					],
					yAxis : [
						{
							type : 'value',
							splitArea : {show : true}
						}
					],
					series : content
				};
				myChart.setOption(option);
			}
		);
	},
	showTestBar:function(main_bar, contents) {
		var graphic_title = new Array();
		var graphic_x = new Array();
		var content = new Array();
		for (var i in contents.infos) {
			var data = new Array();
			graphic_title.push(i);
			for (var j in contents.infos[i]) {
				if (j == 0) {
					continue;
				}
				data.push(contents.infos[i][j]);
			}
			content.push({
				'name': i,
				'type':'bar',
				'stack': '总量',
				'symbol': 'none',
				'barWidth': 40,
				'data':data,

			});
		}
		for (var i in contents.title) {
			graphic_x.push(contents.title[i]);
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
					tooltip : {
						show: true,
						trigger: 'item'
					},
					legend: {
						data:graphic_title,
						itemGap:20,
						orient:'horizontal',
						padding:30,
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					grid: {
						y:0,
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							data:graphic_x
						}
					],
					yAxis : [
						{
							type : 'value',
							splitArea : {show : true}
						}
					],
					series : content
				};
				myChart.setOption(option);
			}
		);
	},
	showCurve:function(curve, contents)
	{	
		var curve_contents = new Array();
		var tip_contents = {};

		for(var i in contents.infos) {
			var content = new Array();
			var content_tip = new Array();
			for (var j in contents.infos[i]) {
				content.push (isNaN(parseFloat(contents.infos[i][j][0])) ? 0 : parseFloat(contents.infos[i][j][0]));
			}

			curve_contents.push({
				'name': contents.column[i],
				'type': 'line',
				smooth: true,
				symbol : 'none',
				'data': content
			});
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
					tooltip : {
						trigger: 'axis',
						formatter:function(params, ticket, callback){
							var res = 'Function formatter : <br/>' + params[0].name;
							for (var i = 0, l = params.length; i < l; i++) {
								var min_number = isNaN(contents.tip_contents[params[i].seriesName][params[0].name][1]) ? 'null' : contents.tip_contents[params[i].seriesName][params[0].name][1];
								var max_number = isNaN(contents.tip_contents[params[i].seriesName][params[0].name][2]) ? 'null' : contents.tip_contents[params[i].seriesName][params[0].name][2];
								res += '<br />' +params[i].seriesName+'中间值:'+contents.tip_contents[params[i].seriesName][params[0].name][0]+'最小值:'+min_number+'最大值:'+max_number;
							}
							return res;
						}
					},
					legend: {
						data:contents.column
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : true,
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : contents.row
						}
					],
					yAxis : [
						{
							type : 'value',
							formatter:'{a}}{b}|{c}'
						}
					],
					series : curve_contents
				};
				myChart.setOption(option);
			}
		);
	}
}; 
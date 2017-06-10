Highcharts.setOptions({
	lang:{
	   contextButtonTitle:"图表导出菜单",
	   decimalPoint:".",
	   downloadJPEG:"下载JPEG图片",
	   downloadPDF:"下载PDF文件",
	   downloadPNG:"下载PNG文件",
	   downloadSVG:"下载SVG文件",
	   drillUpText:"返回 {series.name}",
	   loading:"加载中",
	   months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	   noData:"没有数据",
	   numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
	   printChart:"打印图表",
	   resetZoom:"恢复缩放",
	   resetZoomTitle:"恢复图表",
	   shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
	   thousandsSep:",",
	   weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"]
	}
}); 
jQuery.highcharts_report = {
	scatter3d:function(main_scatter, contents) 
	{
        // Give the points a 3D feel by adding a radial gradient
        Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.4,
                    cy: 0.3,
                    r: 0.5
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
                ]
            };
        });

        // Set up the chart
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: main_scatter,
                margin: 100,
                type: 'scatter',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 30,
                    depth: 250,
                    viewDistance: 5,

                    frame: {
                        bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                        back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                        side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                    }
                }
            },
            title: {
                text: 'Draggable box'
            },
            subtitle: {
                text: 'Click and drag the plot area to rotate in space'
            },
            plotOptions: {
                scatter: {
                    width: 10,
                    height: 10,
                    depth: 10
                }
            },
            yAxis: {
                //min: contents.mins.y,
                //max: contents.maxs.y,
                title: null
            },
            xAxis: {
                //min: contents.mins.x,
                //max: contents.maxs.x,
                gridLineWidth: 1
            },
            zAxis: {
                //min: contents.mins.z,
                //max: contents.maxs.z
            },
            legend: {
                enabled: true
            },
            series: [{
                //name: ['reading', 'write', 'rerwewr'],
                colorByPoint: true,
                data: contents.infos
            }]
        });


        // Add mouse events for rotation
        $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
            e = chart.pointer.normalize(e);

            var posX = e.pageX,
                posY = e.pageY,
                alpha = chart.options.chart.options3d.alpha,
                beta = chart.options.chart.options3d.beta,
                newAlpha,
                newBeta,
                sensitivity = 5; // lower is more sensitive

            $(document).bind({
                'mousemove.hc touchdrag.hc': function (e) {
                    // Run beta
                    newBeta = beta + (posX - e.pageX) / sensitivity;
                    newBeta = Math.min(100, Math.max(-100, newBeta));
                    chart.options.chart.options3d.beta = newBeta;

                    // Run alpha
                    newAlpha = alpha + (e.pageY - posY) / sensitivity;
                    newAlpha = Math.min(100, Math.max(-100, newAlpha));
                    chart.options.chart.options3d.alpha = newAlpha;

                    chart.redraw(false);
                },
                'mouseup touchend': function () {
                    $(document).unbind('.hc');
                }
            });
        });
	},
	showHeatMap:function(heat, contents)
	{
		var stops = new Array();
		if (contents.params.center_color == null) {
			stops.push([0, contents.params.min_color]);
			stops.push([0.9, contents.params.max_color]);
		} else {
			stops.push([0, contents.params.min_color]);
			stops.push([0.5, contents.params.center_color]);
			stops.push([0.9, contents.params.max_color]);
		}
		$('#'+heat).highcharts({

        chart: {
            type: 'heatmap',
            //marginTop: 40,
            //marginBottom: 40
        },
		credits: {
		   enabled: false
		},

        title: {
            text: contents.params.text
        },

        xAxis: {
            categories: contents.categories_x,
			title: {
                text: contents.params.x_label,
            },
        },

        yAxis: {
            categories: contents.categories_y,
            title: {
                text: contents.params.y_label,
            },
        },

        colorAxis: {
            min: 0,
            //max : contents.max,
            //minColor: contents.params.min_color,
            //maxColor: contents.params.max_color,
			stops:stops
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 10,
            symbolHeight: 520
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> <br><b>' +
                    this.point.value + '</b> <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: '',
            borderWidth: 0,
            data: contents.data,
            dataLabels: {
                enabled: contents.params.data_label_enable,
                color: contents.params.data_label_color,
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            },
			turboThreshold: 1000000,
        }]

		});
	},
	showScatterMark:function(scatter, contents)
	{
		var series = new Array();
		var one_series = {};
		for (var i in contents.data) {
			one_series = {
				name: contents.categories[i],
				data: contents.data[i],
			};
			if (contents.params.colors != null) {
				one_series.color = contents.params.colors[i];
			}
			
			if (contents.params.shape != null) {
				one_series.marker = {symbol:contents.params.shape[i]};
			}
			series.push(one_series);
		}
		console.log(series);
		$('#'+scatter).highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy',
        },
		credits: {
		   enabled: false
		},
        title: {
            text: contents.params.text
        },
        subtitle: {
            text: contents.params.subtext,
        },
        xAxis: {
            title: {
                enabled: true,
                text: contents.params.x_label
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
			plotLines: [{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
				color: '#000',
				dashStyle: 'solid', //Dash,Dot,Solid,默认Solid
				width: 1.5,
				value: 0,  //y轴显示位置
				zIndex: 5
			}]
        },
        yAxis: {
            title: {
                text: contents.params.y_label
            },
			plotLines: [{   //一条延伸到整个绘图区的线，标志着轴中一个特定值。
				color: '#000',
				dashStyle: 'solid', //Dash,Dot,Solid,默认Solid
				width: 1.5,
				value: 0,  //y轴显示位置
				zIndex: 5
			}]
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1,
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        },
        series: series
    });
	},
	showBoxPlot:function(box, contents)
	{
		var series = new Array();
		series.push({
            name: '',
            data: contents.data,
			color:'#0000ff',

            tooltip: {
                headerFormat: '<em>{point.key}</em><br/>'
            },
        });
		
		if (contents.scatter_data != null) {
			series.push({
				name: 'Outlier',
				color: Highcharts.getOptions().colors[0],
				type: 'scatter',
				data:contents.scatter_data,
				marker: {
					fillColor: 'white',
					lineWidth: 1,
					lineColor: Highcharts.getOptions().colors[0]
				},
				tooltip: {
					pointFormatter:function()
					{
						return "奇异值："+this.y;
						
					}
				}
			});
		}
		console.log(series);
		$('#'+box).highcharts({

        chart: {
            type: 'boxplot',
            //marginTop: 40,
            //marginBottom: 40
        },
		credits: {
		   enabled: false
		},

		legend:{
			align: 'right',
            layout: 'vertical',
			enabled:false,
		},
        title: {
            text: contents.params.title
        },

        xAxis: {
            categories: contents.categories,
            title: {
                text: contents.params.x_label,
            },
        },

        yAxis: {
            title: {
                text: contents.params.y_label,
            },
        },

		tooltip: {
			backgroundColor: '#FCFFC5',   // 背景颜色
			borderColor: 'black',         // 边框颜色
			borderRadius: 10,             // 边框圆角
			borderWidth: 3,               // 边框宽度
			shadow: true,                 // 是否显示阴影
			animation: true,               // 是否启用动画效果
			style: {                      // 文字内容相关样式
				color: "#ff0000",
				fontSize: "12px",
				fontWeight: "blod",
				fontFamily: "Courir new"
			},
			pointFormatter:function()
			{
				console.log(this);
				return "最小值："+this.low+"<br>上四分位: "+this.q1+"<br>中位数："+this.median+"<br>下四分位: "+this.q3+"<br>最大值："+this.high;
				
			}
		},
        series: series

		});
	},
	showBarError:function(bar, contents)
	{
		var content = new Array();
		var series         = {};
		var series_error   = {};
		var series_scatter = {};
		var y_labels = {};
		var type = contents.params.orient == 1 ? 'column' : 'bar';
		for (var i in contents.data) {
			series = {
				name: contents.title[i],
				type: type,
				data: contents.data[i],
			};
			content.push(series);
			if (contents.error_data != null) {			
				series_error = {
					name: contents.title[i]+ ' mark',
					type: 'errorbar',
					data: contents.error_data[i],
					tooltip: {
						pointFormat: '(error range: {point.low}-{point.high} mm)<br/>'
					},
				}
				content.push(series_error);
			}
			
		}
		if (contents.scatter_data != null) {		
			for (var i in contents.scatter_data) {

				series_scatter = {
					name: contents.title[i],
					type: 'scatter',
					data: contents.scatter_data[i],
				};

				content.push(series_scatter);
			}
		}

		y_labels = {
			format:'{value}',
			style: {
				color: Highcharts.getOptions().colors[0]
			}
		};
		$('#'+bar).highcharts({
        chart: {
            zoomType: 'xy'
        },
		credits: {
		   enabled: false
		},
        title: {
            text: contents.params.text,
        },
        xAxis: [{
            categories: contents.categories,
			title:{text:contents.params.x_label},
        }],
        yAxis: [{ // Secondary yAxis
            title: {
                text: contents.params.y_label,
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                formatter:function() {

					return this.value;
				},
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            //opposite: true
        }],

        tooltip: {
            //shared: true
        },

        series: content
    });

	},
	showVenn:function(venn, contents)
	{
		$('#'+venn).highcharts({
		  title: {
			  text: 'Account Comparision'
		  },
		  tooltip: { enabled: true },
		  plotOptions: {
			  series: {
				showInLegend: false,
				point: {
				  events: {
					mouseOver: function(){
					  this.graphic.element.setAttribute('stroke-width', 2);
					  this.graphic.element.setAttribute('stroke', '#00f');
					},
					mouseOut: function () {
					  this.graphic.element.setAttribute('stroke-width', 0);
					}
				  }
				}
			  }
		  },
		  series: [{
			  type: 'venn',
			  data: [
				  ['A', +50],
				  ['B', +60],
				  ['C', +70],
				  ['A - B', +10],
				  ['B - C', +10],
				  ['A - C', +10]
			  ]
		  }]
		}).trigger('change');
		return false;
	}
}; 
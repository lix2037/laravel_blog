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
		$('#'+heat).highcharts({

        chart: {
            type: 'heatmap',
            //marginTop: 40,
            //marginBottom: 40
        },


        title: {
            text: ''
        },

        xAxis: {
            categories: contents.column
        },

        yAxis: {
            categories: contents.row
            //title: null
        },

        colorAxis: {
            min: 0,
            max : contents.max,
            minColor: '#ff0000'
            //maxColor: Highcharts.getOptions().colors[0]
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
            data: contents.infos,
            dataLabels: {
                enabled: false,
                color: 'black',
                style: {
                    textShadow: 'none',
                    HcTextStroke: null
                }
            }
        }]

    });
	}
}; 
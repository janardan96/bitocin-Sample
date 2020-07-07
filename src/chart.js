import React from "react";
import { Line, Chart } from "react-chartjs-2";

const DisplayChart = props => {
    const { label, data, high, low } = props

    const chartData = {
        labels: label,
        datasets: [
            {
                type: "line",
                label: "BTC-USD",
                borderColor: '#1e88e5',
                borderWidth: "2",
                lineTension: 0.45,
                data: data
            },
        ]
    }

    const setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 100, 600, 500);
        return gradient
    }


    Chart.plugins.register({
        afterDatasetsDraw: function (chart, e) {
            var ctx;
            var y_axis;
            var x_axis;
            var x;
            var y;
            var topY;
            var bottomY;
            var leftX;
            var rightX;
            if (chart.tooltip._active && chart.tooltip._active.length) {
                var activePoint = chart.tooltip._active[0],
                    ctx = chart.ctx,
                    y_axis = chart.scales['y-axis-0'],
                    x_axis = chart.scales['x-axis-0'],

                    x = activePoint.tooltipPosition().x,
                    y = activePoint.tooltipPosition().y,

                    topY = y_axis.top;
                bottomY = y_axis.bottom;
                leftX = x_axis.left;
                rightX = x_axis.right;
                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.moveTo(rightX, y);
                ctx.lineTo(leftX, y);
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = 'rgb(137, 137, 137)';
                ctx.stroke();
                ctx.restore();
            }
        }
    });

    const getChartData = canvas => {
        const data = chartData
        if (data.datasets) {
            let colors = ['rgba(53, 155, 245, 0.2)']
            data.datasets.forEach((set, i) => {
                set.backgroundColor = colors[i];
            })
        }

        return data
    }

    return (<Line
        data={getChartData}
        options={{
            elements: {
                point: {
                    radius: 2
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }
                ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'BTC-USD',
                        fontSize: "14"
                    },
                    ticks: {
                        // beginAtZero: true,
                        // stepSize: 5000,
                        callback: function (value, index) {
                            return `$ ${new Intl.NumberFormat('en-IN').format(value)}`
                        }
                    }
                }]
            },
            tooltips: {
                intersect: false,
                callbacks: {
                    enabled: true,
                    label: function (t, d) {
                        var xLabel = d.datasets[t.datasetIndex].label;
                        var yLabel = t.yLabel;

                        if (t.datasetIndex === 0) return xLabel + ': ' + yLabel;
                    },
                    labelTextColor: function (tooltipItem, chart) {
                        return '#fff';
                    },
                    title: function (tooltipItem, data) {
                        return (" Time:" + tooltipItem[0].xLabel);
                    }
                },


            }
        }} />)
}

export default DisplayChart;
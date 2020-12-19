<template>
    <ApexChart type="radialBar" :options="chartOptions" :series="chartSeries" />
</template>

<script>
    export default {
        name: 'GoalsGraph',
        computed: {
            chartSeries() {
                return Object.values(this.$auth.user.goals).map(({ amount }) => {
                    if (this.$auth.user.net_worth > amount) {
                        return 100
                    } else {
                        return Math.round(100 / amount * this.$auth.user.net_worth)
                    }
                })
            },
            chartOptions() {
                return {
                    chart: {
                        type: 'radial',
                    },
                    labels: Object.values(this.$auth.user.goals).map(({ name }) => name),
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        radialBar: {
                            offsetY: 0,
                            startAngle: 0,
                            endAngle: 270,
                            hollow: {
                                margin: 5,
                                size: '30%',
                                background: 'transparent',
                                image: undefined,
                            },
                            dataLabels: {
                                name: {
                                    show: false,
                                },
                                value: {
                                    show: false,
                                }
                            }
                        }
                    },
                    legend: {
                        show: true,
                        floating: true,
                        fontSize: '16px',
                        position: 'left',
                        offsetX: 0,
                        offsetY: 0,
                        labels: {
                            useSeriesColors: true,
                        },
                        markers: {
                            size: 0
                        },
                        formatter: function(seriesName, opts) {
                            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
                        },
                        itemMargin: {
                            vertical: 3
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            legend: {
                                show: false
                            }
                        }
                    }]
                }
            }
        },
        mounted() {
            console.log(Object.values(this.$auth.user.monthly_expenses).map((value) => {
                return value['name']
            }))
        }
    }
</script>

<style scoped>

</style>

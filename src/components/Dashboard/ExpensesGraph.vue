<template>
    <ApexChart type="donut" :options="chartOptions" :series="chartSeries" />
</template>

<script>
    export default {
        name: 'ExpensesGraph',
        computed: {
            chartSeries() {
                return Object.values(this.$auth.user.monthly_expenses).map(({ cost }) => cost)
            },
            chartOptions() {
                return {
                    chart: {
                        type: 'donut',
                    },
                    labels: Object.values(this.$auth.user.monthly_expenses).map(({ name }) => name),
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>

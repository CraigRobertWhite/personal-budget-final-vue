<template>
    <LaCartesian :data="accounts" autoresize>
        <LaLine prop="uv" label="uv" :width="2" animated dot curve :color="randomColor()" />
        <LaLine prop="pv" label="pv" :width="2" animated dot curve :color="randomColor()" />
        <LaLine prop="amt" label="amt" :width="2" animated dot curve :color="randomColor()" />
        <LaXAxis prop="name" display="none"></LaXAxis>
        <LaTooltip>
            <div class="la-tooltip shadow" slot-scope="props">
                <div class="la-tooltip-title text-center">{{ props.label }}</div>
                <div class="d-flex flex-row">
                    <div v-for="item in props.actived"
                         :key="item.label"
                         :style="{ borderTop: '3px solid ' + item.color }">
                        <div class="d-flex flex-column p-3 pe-5">
                            <span class="la-tooltip-label">{{ item.label }}</span>
                            <span class="la-tooltip-value">{{ item.value }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </LaTooltip>
    </LaCartesian>
</template>

<script>
import { Cartesian, Line, Tooltip, XAxis } from 'laue';

export default {
    name: 'AccountBalanceGraph',
    components: {
        LaCartesian: Cartesian,
        LaLine: Line,
        LaTooltip: Tooltip,
        LaXAxis: XAxis
    },
    props: {
        selectedAccount: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            accounts: [
                { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
                { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
                { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
                { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
                { name: 'Page E', uv: 1890, pv: 4800, amt: 1700 },
                { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
                { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
            ]
        }
    },
    methods: {
        randomColor() {
            return '#' + Math.floor((Math.random() * 16777215) | 0).toString(16);
        }
    }
}
</script>

<style scoped>
.la-tooltip {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
}

.la-tooltip-title {
    padding: 10px;
    color: #FFFFFF;
}

.la-tooltip-label {
    color: #FFFFFF;
    font-weight: 600;
}

.la-tooltip-value {
    color: #FFFFFF;
}
</style>
<template>
    <LaCartesian :data="transactions" autoresize>
        <LaLine v-for="account in $auth.user.accounts" :key="account.id" :prop="account.name" :label="account.name"
                :width="2" animated dot curve :color="randomColor()" />
        <LaXAxisInverse prop="date" display="none" />
        <LaXAxis prop="date"  display="none" />
        <LaTooltip>
            <div class="la-tooltip shadow" slot-scope="props">
                <div class="la-tooltip-title text-center">{{ props.label }}</div>
                <div class="row g-0">
                    <div v-for="item in props.actived"
                         :key="item.label"
                         :style="{ borderTop: '3px solid ' + item.color }"
                         class="col-3">
                        <div class="d-flex flex-column p-2 pe-4">
                            <span class="la-tooltip-label">{{ item.label }}</span>
                            <span class="la-tooltip-value">{{ item.value | formatCents }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </LaTooltip>
    </LaCartesian>
</template>

<script>
import { Cartesian, Line, Tooltip, XAxis, XAxisInverse } from 'laue';
import { formatDate } from '@/filters';

export default {
    name: 'AccountBalanceGraph',
    components: {
        LaCartesian: Cartesian,
        LaLine: Line,
        LaTooltip: Tooltip,
        LaXAxis: XAxis,
        LaXAxisInverse: XAxisInverse
    },
    props: {
        selectedAccount: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            transactions: [],
            date_buffer: [],
            date_amounts_buffer: {}
        }
    },
    mounted() {
        // I'm so sorry
        this.$auth.user.accounts.forEach(account => {
            account.transactions.forEach(transaction => {
                let date = transaction.created.split('T')[0];
                if (!this.date_buffer.includes(date)) {
                    this.date_buffer.push(date)
                }
            })
        });

        this.date_buffer.sort((date1, date2) => {
            return (date1 < date2) ? -1 : ((date1 > date2) ? 1 : 0);
        });

        let first_date = this.date_buffer[0];
        this.date_buffer.unshift(first_date.substr(0, first_date.length - 1) + (first_date.substr(first_date.length - 1) - 1 ));

        for (let i = 0; i < this.date_buffer.length; i++) {
            this.date_amounts_buffer[this.date_buffer[i]] = {};
            this.$auth.user.accounts.forEach(account => {
                let transactions_on_date = account.transactions.filter(transaction => {
                    let transaction_date = transaction.created.split('T')[0];
                    if (transaction_date === this.date_buffer[i]) {
                        return transaction;
                    }
                })

                let amount = 0;
                if (transactions_on_date.length) {
                    // Get the last transaction on the date
                    transactions_on_date.sort((t1, t2) => {
                        return (t1.created > t2.created) ? -1 : ((t1.created < t2.created) ? 1 : 0);
                    });
                    amount = transactions_on_date[0].amount
                }

                if (amount) {
                    this.date_amounts_buffer[this.date_buffer[i]][account.name] = amount;
                } else {
                    let previous_date = this.date_amounts_buffer[this.date_buffer[i - 1]];
                    if (previous_date) {
                        this.date_amounts_buffer[this.date_buffer[i]][account.name] = previous_date[account.name];
                    } else {
                        this.date_amounts_buffer[this.date_buffer[i]][account.name] = 0;
                    }
                }
            });
        }
        this.date_buffer.forEach(date => {
            this.transactions.push({
                date: formatDate(date, 'yyyy-MM-dd', 'MMMM d, YYY'),
                ...this.date_amounts_buffer[date]
            })
        });

        console.log(this.transactions)
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
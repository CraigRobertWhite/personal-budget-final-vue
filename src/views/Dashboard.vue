<template>
    <div class="row">
        <div class="col-md-9">
            <h1>Hello {{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h1>
            <AccountBalanceGraph :selected-account="selectedAccount" />
        </div>
        <AccountList v-model="selectedAccount" class="col-3 d-none d-md-block" />
    </div>
</template>

<script>
import AccountBalanceGraph from '@/components/Dashboard/AccountBalanceGraph';
import AccountList from '@/components/Dashboard/AccountList';

export default {
    name: 'Dashboard',
    components: {
        AccountBalanceGraph,
        AccountList
    },
    data() {
        return {
            selectedAccount: {}
        }
    }
}
</script>
<template>
    <main class="row">
        <section class="col-md-9">
            <h1>Hello {{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h1>
            <AccountBalanceGraph v-if="$auth.user.accounts.length" :selected-account="selectedAccount" />
            <div v-else>
                <h4 />
            </div>
        </section>
        <AccountList v-model="selectedAccount" class="col-3 d-none d-md-block" />
    </main>
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

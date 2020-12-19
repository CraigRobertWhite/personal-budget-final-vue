<template>
    <main>
        <header>
            <h1>Hello {{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h1>
        </header>
        <section class="row mb-5">
            <div class="col-md-9">
                <AccountBalanceGraph v-if="$auth.user.accounts.length" :selected-account="selectedAccount" />
                <div v-else>
                    Thank you for checking out my app. I hope you have a good visit.
                    - Craig White
                </div>
            </div>
            <AccountList v-model="selectedAccount" class="col-3 d-none d-md-block" />
        </section>
        <section class="row">
            <div v-if="$auth.user.monthly_expenses.length" class="col-md-6">
                <div class="d-flex align-items-center">
                    <h3 class="m-0 me-3">Budget</h3>
                    <router-link :to="{ name: 'budget' }">
                        <FontAwesomeIcon icon="plus" size="lg" />
                    </router-link>
                </div>
                <ExpensesGraph />
            </div>
            <div v-if="$auth.user.goals.length" class="col-md-6">
                <div class="d-flex align-items-center">
                    <h3 class="m-0 me-3">Goals</h3>
                    <router-link :to="{ name: 'goals' }">
                        <FontAwesomeIcon icon="plus" size="lg" />
                    </router-link>
                </div>
                <GoalsGraph />
            </div>
        </section>
    </main>
</template>

<script>
    import AccountBalanceGraph from '@/components/Dashboard/AccountBalanceGraph';
    import AccountList from '@/components/Dashboard/AccountList';
    import ExpensesGraph from '@/components/Dashboard/ExpensesGraph';
    import GoalsGraph from '@/components/Dashboard/GoalsGraph';

    export default {
        name: 'Dashboard',
        components: {
            AccountBalanceGraph,
            AccountList,
            ExpensesGraph,
            GoalsGraph
        },
        data() {
            return {
                selectedAccount: {}
            }
        }
    }
</script>

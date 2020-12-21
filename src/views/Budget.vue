<template>
    <div>
        <div class="d-flex align-items-center mb-4">
            <img :src="$auth.user.picture"
                 :alt="`${$auth.user.first_name} ${$auth.user.last_name}`"
                 class="rounded-circle me-3"
                 width="75">
            <h2>{{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h2>
        </div>
        <h4 class="mb-3">Budget</h4>
        <ul class="list-group">
            <transition-group name="fade" mode="out-in">
                <li v-for="expense in $auth.user.monthly_expenses" :key="expense.id" class="list-group-item d-flex p-4">
                    <h5 class="m-0">{{ expense.name }}</h5>
                    <span class="ms-auto">{{ expense.cost | formatCents }}</span>
                </li>
                <li :key="0" class="list-group-item pt-3 border-0">
                    <div v-if="creatingMonthlyExpense">
                        <form @submit.prevent="submit()" class="d-flex flex-column">
                            <fieldset class="row" :disabled="submitting">
                                <div class="form-group col-md-6 mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input v-model="expense.name"
                                           id="name"
                                           type="text"
                                           placeholder="Rent"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="form-group col-md-6 mb-3">
                                    <label for="balance" class="form-label">Cost</label>
                                    <input v-model="expense.cost"
                                           id="balance"
                                           type="number"
                                           min="0.00"
                                           max="1000000"
                                           step="0.01"
                                           placeholder="0.00"
                                           class="form-control"
                                           required>
                                </div>
                            </fieldset>
                            <button class="mt-2 ms-auto btn btn-sm btn-outline-dark" type="submit">
                                <span v-if="submitting"
                                      class="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true" />
                                Submit
                            </button>
                        </form>
                    </div>
                    <div v-else-if="$auth.user.accounts.length" @click="creatingMonthlyExpense = true">
                        <a role="button">Add New Expense</a>
                    </div>
                    <div v-else>
                        Before adding an expense to your budget, please
                        <router-link :to="{ name: 'account' }">add an account</router-link>.
                    </div>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import { createMonthlyExpense } from '@/services/ExpenseService';

    export default {
        name: 'Budget',
        data() {
            return {
                expense: {
                    name: null,
                    cost: null
                },
                submitting: false,
                creatingMonthlyExpense: false
            }
        },
        methods: {
            async submit() {
                this.submitting = true;
                try {
                    const newMonthlyExpense = { ...this.expense };
                    newMonthlyExpense['cost'] = newMonthlyExpense['cost'] * 100;
                    const { data: monthly_expense } = await createMonthlyExpense(newMonthlyExpense);
                    this.$auth.user.monthly_expenses.push(monthly_expense);
                } catch (error) {
                    console.log(error);
                } finally {
                    this.submitting = false;
                }
            }
        }
    }
</script>

<style scoped>
</style>

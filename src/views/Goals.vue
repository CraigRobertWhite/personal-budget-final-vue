<template>
    <div>
        <div class="d-flex align-items-center mb-4">
            <img :src="$auth.user.picture"
                 :alt="`${$auth.user.first_name} ${$auth.user.last_name}`"
                 class="rounded-circle me-3"
                 width="75">
            <h2>{{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h2>
        </div>
        <h4 class="mb-3">Goals</h4>
        <ul class="list-group">
            <transition-group name="fade" mode="out-in">
                <li v-for="goal in $auth.user.goals" :key="goal.id" class="list-group-item d-flex p-4">
                    <h5 class="m-0">{{ goal.name }}</h5>
                    <span class="ms-auto">{{ goal.amount | formatCents }}</span>
                </li>
                <li :key="0" class="list-group-item pt-3 border-0">
                    <div v-if="creatingGoal">
                        <form @submit.prevent="submit()" class="d-flex flex-column">
                            <fieldset class="row" :disabled="submitting">
                                <div class="form-group col-md-6 mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input v-model="goal.name"
                                           id="name"
                                           type="text"
                                           placeholder="New Car"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="form-group col-md-6 mb-3">
                                    <label for="balance" class="form-label">Amount</label>
                                    <input v-model="goal.amount"
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
                    <div v-else @click="creatingGoal = true">
                        <a role="button">Add New Goal</a>
                    </div>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import { createGoal } from '@/services/GoalService';

    export default {
        name: 'Budget',
        data() {
            return {
                goal: {
                    name: null,
                    amount: null
                },
                submitting: false,
                creatingGoal: false
            }
        },
        methods: {
            async submit() {
                this.submitting = true;
                try {
                    const newGoal = { ...this.goal };
                    newGoal['cost'] = newGoal['cost'] * 100;
                    const { data: goal } = await createGoal(newGoal);
                    this.$auth.user.goals.push(goal);
                } catch (error) {
                    console.log('An error occurred');
                } finally {
                    this.submitting = false;
                }
            }
        }
    }
</script>

<style scoped>
</style>

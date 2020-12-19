<template>
    <div>
        <div class="d-flex align-items-center mb-4">
            <img :src="$auth.user.picture"
                 :alt="`${$auth.user.first_name} ${$auth.user.last_name}`"
                 class="rounded-circle me-3"
                 width="75">
            <h2>{{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h2>
        </div>
        <h4 class="mb-3">Linked Accounts</h4>
        <div v-if="!$auth.user.accounts.length" class="mb-3">
            You don't have any account configured yet, let's fix that :)
        </div>
        <ul class="list-group">
            <transition-group name="fade" mode="out-in">
                <li v-for="account in $auth.user.accounts" :key="account.id" class="list-group-item d-flex p-4">
                    <h5 class="m-0">{{ account.name }}</h5>
                    <span class="ms-auto">{{ account.balance | formatCents }}</span>
                </li>
                <li :key="0" class="list-group-item pt-3 border-0">
                    <div v-if="addingNewAccount">
                        <form @submit.prevent="submit()" class="d-flex flex-column">
                            <fieldset class="row" :disabled="submitting">
                                <div class="form-group col-md-6 mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input v-model="account.name"
                                           id="name"
                                           type="text"
                                           placeholder="Bank of America"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="form-group col-md-6 mb-3">
                                    <label for="balance" class="form-label">Balance</label>
                                    <input v-model="account.amount"
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
                    <div v-else @click="addingNewAccount = true">
                        <a role="button">Add New Account</a>
                    </div>
                </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import { createAccount } from '@/services/AccountService';

    export default {
        name: 'Account',
        data() {
            return {
                account: {
                    name: null,
                    amount: null
                },
                submitting: false,
                addingNewAccount: false
            }
        },
        methods: {
            async submit() {
                this.submitting = true;
                try {
                    const newAccount = { ...this.account };
                    newAccount['amount'] = newAccount['amount'] * 100;
                    const { data: account } = await createAccount(newAccount);
                    this.$auth.user.accounts.push(account);
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

<template>
    <div>
        <div class="d-flex align-items-center mb-4">
            <img :src="$auth.user.picture"
                 :alt="`${$auth.user.first_name} ${$auth.user.last_name}`"
                 class="rounded-circle me-3" width="75">
            <h2>{{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h2>
        </div>
        <form @submit.prevent="submit()" class="d-flex flex-column">
            <h4>Linked Accounts</h4>
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
            submitting: false
        }
    },
    methods: {
        async submit() {
            this.submitting = true;
            try {
                console.log(this.account)
                const { data: account } = await createAccount(this.account);
                console.log(account)
            } catch (error) {
                console.log(error.response)
            } finally {
                this.submitting = false;
            }
        }
    }
}
</script>

<style scoped>
</style>
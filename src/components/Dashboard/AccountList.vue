<template>
    <div>
        <div class="card shadow">
            <div class="card-body vh-50 p-0">
                <div class="d-flex align-items-center p-3">
                    <h6 class="m-0">Accounts</h6>
                    <router-link :to="{ name: 'account' }"
                                 class="ms-auto">
                        <FontAwesomeIcon icon="plus" />
                    </router-link>
                </div>
                <hr class="m-0">
                <div class="d-flex flex-column h-75">
                    <div v-if="$auth.user.accounts.length">
                        <div v-for="account in $auth.user.accounts"
                             :key="account.id"
                             @mouseover="setSelectedAccount(account)"
                             class="d-flex flex-row p-3 account">
                            <strong>{{ account.name }}</strong>
                            <span class="ms-auto">{{ account.balance | formatCents }}</span>
                        </div>
                    </div>
                    <div v-else class="d-flex h-100 align-items-center justify-content-center">
                        <div>
                            Try adding an account :)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccountList',
        props: {
            value: {
                type: Object,
                required: true,
            }
        },
        methods: {
            setSelectedAccount(account) {
                if (this.value.id !== account.id) {
                    this.$emit('input', { ...account });
                }
            }
        }
    }
</script>

<style scoped>
.account {
    cursor: pointer;
    transition: 0.1s;
}
</style>

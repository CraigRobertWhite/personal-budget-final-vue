<template>
    <div class="welcome">
        <div class="modal fade" ref="welcome-modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-body">
                        <form @submit.prevent="updateCurrentUser()" class="d-flex flex-column">
                            <h5>Welcome {{ name }}!</h5>
                            <p>
                                Because you probably don't want to be called "User" for the remainder of your visit, please
                                enter your information below:
                            </p>
                            <fieldset class="row" :disabled="submitting">
                                <div class="form-group col-md-6 mb-3">
                                    <label for="first-name" class="form-label">First Name</label>
                                    <input v-model="user.first_name"
                                           id="first-name"
                                           type="text"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="form-group col-md-6 mb-3">
                                    <label for="last-name" class="form-label">Last Name</label>
                                    <input v-model="user.last_name"
                                           id="last-name"
                                           type="text"
                                           class="form-control"
                                           required>
                                </div>
                                <div class="form-group col mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input :value="user.email"
                                           id="email"
                                           type="text"
                                           class="form-control"
                                           disabled
                                           required>
                                </div>
                            </fieldset>
                            <button class="mt-3 ms-auto btn btn-outline-dark" type="submit">
                                <span v-if="submitting"
                                      class="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true" />
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { updateCurrentUser } from '@/services/UserService';

export default {
    name: 'Welcome',
    data() {
        return {
            modal: null,
            user: {
                first_name: '',
                last_name: '',
                email: this.$auth.user.name
            },
            submitting: false
        }
    },
    computed: {
        name() {
            if (this.user.first_name || this.user.last_name) {
                return `${this.user.first_name} ${this.user.last_name}`.trim();
            } else {
                return 'User';
            }
        }
    },
    mounted() {
        this.modal = new window.bootstrap.Modal(this.$refs['welcome-modal'], {
            keyboard: false,
            backdrop: false
        });
        this.modal.show();
    },
    methods: {
        async updateCurrentUser() {
            this.submitting = true;
            try {
                const { data: user } = await updateCurrentUser(this.user);
                this.$auth.user = {...this.$auth.user, ...user}
                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                console.log(error)
            } finally {
                this.submitting = false;
            }
        }
    }
}
</script>

<style scoped>
.welcome {
    min-height: 100vh;
}

.flex-fill {
    flex: 1;
}
</style>
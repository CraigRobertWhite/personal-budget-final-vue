<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white">
        <div class="container">
            <router-link :to="{ name: 'dashboard' }" class="nav-item navbar-brand">
                <FontAwesomeIcon icon="coins" />
            </router-link>
            <span class="nav-item ms-auto me-4">Goals</span>
            <span class="nav-item me-4">Expenses</span>
            <div class="dropdown py-1">
                <span class="nav-item"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                    Account
                </span>
                <div class="dropdown-menu dropdown-menu-end">
                    <router-link :to="{ name: 'account' }"
                                 class="dropdown-item">
                        <FontAwesomeIcon icon="briefcase" class="me-2" />
                        Account
                    </router-link>
                    <router-link :to="{ name: 'account' }"
                                 class="dropdown-item">
                        <FontAwesomeIcon icon="university" class="me-2" />
                        Banking
                    </router-link>
                    <div><hr class="dropdown-divider"></div>
                    <div @click="$auth.logout()" class="dropdown-item">
                        <FontAwesomeIcon icon="sign-out-alt" class="me-2" />
                        Log Out
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style scoped>
.nav-item {
    cursor: pointer;
    transition: 0.1s;
}

.nav-item:hover {
    color: #00c805;
}

.dropdown-item {
    cursor: pointer;
}
</style>
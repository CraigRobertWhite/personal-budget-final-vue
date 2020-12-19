<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white">
        <div class="container">
            <router-link :to="{ name: 'dashboard' }" class="nav-item navbar-brand">
                <FontAwesomeIcon icon="coins" />
            </router-link>
            <router-link class="nav-item ms-auto me-4" :to="{ name: 'goals' }">
                Goals
            </router-link>
            <router-link class="nav-item me-4" :to="{ name: 'budget' }">
                Budget
            </router-link>
            <div class="dropdown py-1">
                <span class="nav-item"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                    Account
                </span>
                <div class="dropdown-menu dropdown-menu-end">
                    <router-link :to="{ name: 'account' }"
                                 class="dropdown-item nav-item">
                        <FontAwesomeIcon icon="university" class="me-2" />
                        Banking
                    </router-link>
                    <div><hr class="dropdown-divider"></div>
                    <div @click="$auth.logout()" class="dropdown-item nav-item">
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
    color: #000000;
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

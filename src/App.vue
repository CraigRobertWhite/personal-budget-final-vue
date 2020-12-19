<template>
    <div id="app">
        <LoadingSpinner v-if="$auth.loading" />
        <div v-else-if="$auth.isAuthenticated">
            <Navbar v-if="displayNavbar" />
            <LoadingSpinner v-if="$root.loading" />
            <div v-else class="container" :style="{'padding-top': displayNavbar ? '70px' : '0'}">
                <div class="content">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import LoadingSpinner from '@/components/LoadingSpinner';

    export default {
        components: {
            Navbar,
            LoadingSpinner
        },
        computed: {
            displayNavbar() {
                return this.$route.matched.length && !(this.$route.meta.navbar === false)
            }
        }
    }
</script>

<style>
.content {
    min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.25s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.vh-100 {
    height: 100vh
}

.vh-75 {
    height: 75vh
}

.vh-50 {
    height: 50vh
}

.vh-25 {
    height: 25vh
}

.cursor-pointer {
    cursor: pointer;
}

a {
    color: #00c805!important;
    text-decoration: none;
    transition: 0.1s;
}

a:hover {
    color: #000000!important;
}
</style>

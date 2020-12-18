<template>
    <div>
        <div class="d-flex align-items-center">
            <img :src="$auth.user.picture"
                 :alt="`${$auth.user.first_name} ${$auth.user.last_name}`"
                 class="rounded-circle me-3" width="75">
            <h2>{{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Account'
}
</script>

<style scoped>
</style>
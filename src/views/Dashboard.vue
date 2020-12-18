<template>
    <div class="dashboard">
        <h1>Hello {{ `${$auth.user.first_name} ${$auth.user.last_name}` }}</h1>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
}
</script>
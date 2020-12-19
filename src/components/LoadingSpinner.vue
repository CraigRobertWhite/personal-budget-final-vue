<template>
    <div class="loading-spinner-wrapper d-flex align-items-center justify-content-center">
        <div class="spinner-border" role="status" />
    </div>
</template>

<script>
    export default {
        name: 'LoadingSpinner'
    }
</script>

<style scoped>
.loading-spinner-wrapper {
    height: 100vh;
    width: 100vw;
}

.spinner-border {
    width: 5rem;
    height: 5rem;
}
</style>

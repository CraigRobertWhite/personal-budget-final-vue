<template>
    <div class="toast-container p-3 position-fixed bottom-0 end-0">
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Bootstrap</strong>
                <small class="text-muted">just now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" />
            </div>
            <div class="toast-body">
                See? Just like this.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ToastContainer',
        data() {
            return {
                toasts: []
            }
        },
        mounted() {
            const toastElList = [].slice.call(document.querySelectorAll('.toast'))

            const toastList = toastElList.map(function(toastEl) {
                return new window.bootstrap.Toast(toastEl)
            })

            toastList.forEach(toast => toast.show());
            console.log(toastList);
        }
    }
</script>

<style scoped>

</style>

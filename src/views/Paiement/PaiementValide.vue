<template>
    <div>
        
        
    </div>
</template>

<script>
export default {
    name: 'PaiementValide',
    created() {
        debugger
        this.$r.confirmationPaiement(this.$route.query.session_id)
    }

}
</script>
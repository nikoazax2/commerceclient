<template>
    <div>Paiement validé</div>
</template>

<script>
export default {
    name: 'PaiementValide',
    created() {
        this.$r.confirmationPaiement(this.$route.query.session_id)
    }

}
</script>
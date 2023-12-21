<template>
    <div>
        <Panier class="panier"/>
    </div>
</template>

<script>
import Panier from '@/components/Header/Panier.vue'
export default {
    components: {
        Panier
    },
    
}
</script>
<style lang="scss" scoped>
.panier{
    margin: 0 15%;
}
</style>
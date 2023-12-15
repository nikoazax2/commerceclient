<template>
    <div>
        <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="'pk_test_51NboKUBTmmLQabfnwQKPey7xyIrmAhFXWhRhcrhnrlylOrlvZdT4R5xsa4XDvRLNhFnOI9UadFgaLMoeaNQvcXex00SvCHyjK7'"
            :line-items="lineItems"
            :customerEmail="user?.email"  
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)" />
        <button ref="buttonpaie" @click="submit" />
    </div>
</template>

<script>
import axios from 'axios'
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
    components: {
        StripeCheckout
    },
    created() {
        this.$r.productsOfCart(this.$r.cart, this.$r.products).forEach((element) => {
            this.lineItems.push({
                price: element.idapistripe,
                quantity: element.quantity
            })
        })
    },
    async mounted() {
        this.user = await this.$r.getProfileConnected() 
        this.$refs.buttonpaie.click()
    },
    data() {
        return {
            user: null,
            loading: false,
            lineItems: [],
            successUrl: 'http://localhost:3000',
            cancelUrl: 'http://localhost:3000'
        }
    },
    methods: {
        submit() {
            this.$refs.checkoutRef.redirectToCheckout(this.lineItems)
        }
    }
}
</script>
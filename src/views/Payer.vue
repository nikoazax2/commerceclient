<template>
    <div>
        <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="'pk_test_51NboKUBTmmLQabfnwQKPey7xyIrmAhFXWhRhcrhnrlylOrlvZdT4R5xsa4XDvRLNhFnOI9UadFgaLMoeaNQvcXex00SvCHyjK7'"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="(v) => (loading = v)" />
        <button @click="submit">Pay now!</button>
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
    components: {
        StripeCheckout
    },
    created() {
        console.log(this.$r.productsOfCart(this.$r.cart, this.$r.products))
    },
    data() {
        return {
            loading: false,
            lineItems: [
                {
                    price: 'price_1OAFEUBTmmLQabfn3cTgCKsb', // replace with your price ID
                    quantity: 2
                }
            ],
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
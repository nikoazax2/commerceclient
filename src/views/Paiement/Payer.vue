<template>
    <div>
        <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            :pk="stripeAPIKEY"
            :line-items="lineItems"
            :customerEmail="user?.email"
            :metadata="$r.productsOfCart()"
            :successUrl="getUrls().successUrl"
            :cancel-url="getUrls().cancelUrl"
            :shippingAddressCollection="{
                allowedCountries: ['FR']
            }"
            @loading="(v) => (loading = v)" />
        <button ref="buttonpaie" @click="submit" />
    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'
export default {
    components: {
        StripeCheckout
    },

    created() {
        this.$r.getProfile()
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
            successUrl: '/paiement-valide',
            cancelUrl: '',
            stripeAPIKEY:
                'pk_test_51NboKUBTmmLQabfnwQKPey7xyIrmAhFXWhRhcrhnrlylOrlvZdT4R5xsa4XDvRLNhFnOI9UadFgaLMoeaNQvcXex00SvCHyjK7'
        }
    },
    methods: {
        getUrls() {
            return {
                successUrl: document.location.origin + '/paiement-valide?session_id={CHECKOUT_SESSION_ID}',
                cancelUrl: document.location.origin
            }
        },
        submit() {
            this.$refs.checkoutRef.redirectToCheckout(this.lineItems)
        }
    }
}
</script>
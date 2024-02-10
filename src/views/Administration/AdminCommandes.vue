<template>
    <div class="ma-16 mt-4">
        <h3 class="mb-4">Commandes</h3>
        <div class="commandes-container">
            <div class="filtres"></div>
            <div class="commandes">
                <div class="commande mb-4" v-for="commande of $r.commandes">
                    <v-card>
                        <v-card-title>
                            <v-row>
                                <v-col cols="6">
                                    <div class="date">{{ $r.dateFormat(commande?.date, 'DD/MM/YYYY') }}</div>
                                </v-col>
                                <v-col cols="6" class="d-flex jce">
                                    <div class="etat">
                                        <v-autocomplete
                                            :color="$r.etats.find((e) => e.value === commande.etat)?.color"
                                            :bg-color="
                                                $r.etats.find((e) => e.value === commande.etat)?.color + '-lighten-4'
                                            "
                                            variant=""
                                            v-if="commande.etat"
                                            v-model="commande.etat"
                                            :items="$r.etats"
                                            density="dense"
                                            @update:modelValue="$r.editCommande(commande)"
                                            item-title="text"
                                            item-value="value" />
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <div class="nom">{{ commande.shippingAddress.name }}</div>
                                    <div class="adresse">
                                        {{ commande.shippingAddress.address.line1 }}<br />
                                        {{ commande.shippingAddress.address.postal_code }}
                                        {{ commande.shippingAddress.address.city }}
                                    </div>
                                    <div class="email">{{ commande?.user?.email }}</div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="produits">
                                        <div class="produit" v-for="(produit, index) of commande.products">
                                            <div class="d-flex jcsb">
                                                <div class="nom">{{ produit.quantity }} {{ produit.name }}</div>
                                                <div class="total">
                                                    {{ produit.quantity }} x {{ produit.prix }} =
                                                    {{ produit.quantity * produit.prix }} €
                                                </div>
                                            </div>
                                            <hr />
                                            <div
                                                v-if="index == commande.products.length - 1"
                                                class="total-commande d-flex jce">
                                                Total : {{ getTotal(commande.products) }} €
                                            </div>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AdminCommandes', 
    async created() {
        await this.$r.getProfile()
        await this.$r.getCommandes()
    },
    methods: {
        getTotal(products) {
            return products.reduce((acc, p) => acc + p.quantity * p.prix, 0)
        }
    }
}
</script>
<style lang="scss" scoped>
.etat {
    width: 200px;
    right: 0;
}
</style>


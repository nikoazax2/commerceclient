<template>
    <div class="ma-16 mt-4">
        <h3 class="">Commandes</h3>
        <div class="commandes-container">
            <div class="filtres"></div>
            <div class="commandes">
                <div class="commande mb-4" v-for="commande of $r.commandes">
                    <v-card>
                        <v-card-title>
                            <v-row>
                                <v-col cols="6">
                                    <div class="date">{{ $r.dateFormat(commande?.date,'DD/MM/YYYY')  }}</div>
                                </v-col>
                                <v-col cols="6">
                                    <div class="etat">
                                        {{ etats.find((etat) => etat.value === commande.etat)?.text }}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <div class="nom">{{ commande.shippingAddress.name }}</div> 
                            <div class="adresse">
                                {{ commande.shippingAddress.address.line1 }}<br />
                                {{ commande.shippingAddress.address.postal_code }} {{ commande.shippingAddress.address.city }}
                            </div>
                            <div class="email">{{ commande?.user?.email }}</div>
                            <div class="produits">
                                <div class="produit" v-for="produit of commande.products">
                                    <div class="nom">{{ produit.name }}</div>
                                    <div class="quantite">{{ produit.quantity }}</div>
                                </div>
                            </div>
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
    data() {
        return {
            etats: [
                { value: 1, text: 'En attente' },
                { value: 2, text: 'En cours' },
                { value: 3, text: 'Terminée' },
                { value: 4, text: 'Annulée' }
            ]
        }
    },
    async created() {
        await this.$r.getProfile() 
        await this.$r.getCommandes() 
    }
}
</script>


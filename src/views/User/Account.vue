<template>
    <div>
        <div class="millieu-container">
            <div>
                <div class="millieu">
                    <h2>Vos informations</h2>
                    <div class="formulaire mt-6">
                        <div>
                            <div class="titre">Nom, prénom</div>
                            <v-text-field
                                v-model="user.username"
                                class="mb-2"
                                variant="outlined"
                                density="compact"
                                hide-details="true"
                                label="" />
                        </div>
                        <div>
                            <div class="titre">E-mail</div>
                            <v-text-field
                                v-model="user.email"
                                class="mb-2"
                                readonly
                                variant="outlined"
                                density="compact"
                                hide-details="true"
                                label="" />
                        </div>
                        <div>
                            <div class="titre">Adresse</div>
                            <v-text-field
                                v-model="user.adress"
                                class="mb-2"
                                variant="outlined"
                                density="compact"
                                hide-details="true"
                                label="" />
                        </div>
                        <div class="link" @click="$r.goto('user/new-password')">Modifier le mot de passe</div>

                        <div class="jcc mt-6">
                            <v-btn class="jcc" color="blue" variant="tonal"> Modifier </v-btn>
                        </div>
                        <div class="jcc mt-8">
                            <v-btn class="jcc" color="red" size="x-small" @click="$r.deleteAccount()" variant="text"> Supprimer le compte</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account',
    data() {
        return {
            user: null
        }
    },
    created() {
        this.user = this.$r.getProfileConnected()
        if (!this.user) this.$r.goto('user/login')
    },
    methods: {}
}
</script>

<style lang="scss" scoped></style>

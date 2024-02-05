<template>
    <div class="millieu-container">
        <div>
            <div class="millieu">
                <h2>Inscription</h2>
                <div class="formulaire mt-6">
                    <div>
                        <div class="titre">E-mail</div>
                        <v-text-field
                            v-model="user.email"
                            class="mb-2"
                            variant="outlined"
                            density="compact"
                            hide-details="true"
                            label="" />
                    </div>
                    <div>
                        <div class="titre d-flex jcsb">
                            <div>Mot de passe</div>
                        </div>
                        <v-text-field
                            v-model="user.password"
                            class="mb-2"
                            variant="outlined"
                            density="compact"
                            hide-details="true"
                            type="password"
                            label="" />
                    </div>

                    <div class="d-flex mt-8">
                        <v-btn @click="sendCode()" width="100%" color="primary" elevation="0"> Continuer </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                adress: ''
            }
        }
    },
    methods: {
        async sendCode() {
            if (this.user.email && this.user.password) {
                let user = await this.$r.createUser(this.user)
                await this.$r.sendCode(this.user.email)
                this.$r.goto(`user/mail-verif?email=${this.user.email}`)
            }
        }
    }
}
</script> 

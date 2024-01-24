<template>
    <div class="login-container">
        <div>
            <div class="login">
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

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    padding: 50px;
    .login {
        border-radius: 5px;
        max-width: 700px;
        min-width: 500px;
        padding: 40px;
        box-shadow: 0 15px 35px 0 rgba(60, 66, 87, 0.08), 0 5px 15px 0 rgba(0, 0, 0, 0.12);
    }
    .titre {
        font-size: 14px;
    }
    .link {
        color: #5e72d7;
        cursor: pointer;
    }
}
</style>

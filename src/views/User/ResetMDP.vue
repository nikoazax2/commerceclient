<template>
    <div class="login-container">
        <div>
            <div class="login">
                <h2>
                    Réinitialisation du mot de <br />
                    passe
                </h2>
                <div class="formulaire mt-6">
                    <p class="text-caption mb-4">
                        Saisissez l'adresse e-mail associée à votre compte et nous vous enverrons un lien pour
                        réinitialiser votre mot de passe.
                    </p>

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

                    <div class="d-flex mt-8">
                        <v-btn width="100%" color="primary" elevation="0" @click="sendCode(user.email)">
                            Continuer
                        </v-btn>
                    </div>
                    <div @click="$r.goto('user/login')" class="link d-flex jcc mt-4 text-caption font-weight-bold">
                        Revenir à la page de connexion
                    </div>
                </div>
            </div>
            <div class="mt-4 d-flex">
                Vous n'avez pas de compte ?
                <div class="link ml-4" @click="$r.goto('user/register')">S'inscrire</div>
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
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async sendCode() {
            await this.$r.sendCode(this.user.email)
            this.$r.goto(`user/mail-verif?email=${this.user.email}`)
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
        max-width: 500px;
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

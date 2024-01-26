<template>
    <div class="millieu-container">
        <div>
            <div class="millieu">
                <h2>
                    Connectez-vous à votre <br />
                    compte
                </h2>
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
                            <div class="link" @click="$r.goto('user/reset-password')">Mot de passe oublié ?</div>
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
                        <v-btn width="100%" color="primary" elevation="0" @click="$r.login(user.email, user.password)">
                            Se connecter
                        </v-btn>
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
    }
}
</script>
 
<template>
    <div class="millieu-container">
        <div>
            <div class="millieu">
                <h2>Vérification de votre email</h2>
                <div class="formulaire mt-6">
                    <p class="text-caption mb-4">
                        Nous avons envoyé un code de vérification à votre adresse e-mail. Veuillez saisir le code
                        ci-dessous pour continuer.
                    </p>

                    <div>
                        <div class="titre">Code</div>
                        <v-text-field
                            v-model="user.code"
                            class="mb-2"
                            variant="outlined"
                            density="compact"
                            hide-details="true"
                            label="" />
                    </div>

                    <div class="d-flex mt-8">
                        <v-btn
                            width="100%"
                            color="primary"
                            elevation="0"
                            @click="$r.verifMailCode($route.query.email, user.code)">
                            Continuer
                        </v-btn>
                    </div>
                    <div @click="$r.goto('user/register')" class="link d-flex jcc mt-4 text-caption font-weight-bold">
                        Revenir à la page d'inscription
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
                password: '',
                code: ''
            }
        }
    }
}
</script> 
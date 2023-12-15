<template>
    <div class="containers" :class="{ isphone: $r.isPhone }">
        <div
            v-for="bloc in blocs"
            class="container-img-text pb-4"
            :style="`width:${$r.isPhone ? 100 : 100 / blocs.length}%`"> 
            <img
                @click="$r.goto('/')"
                :src="require(`@/assets/imgachanger/${bloc.image}`)"
                class="logo-website"
                alt="logo" />
            <div class="titre-img-encart">
                <h2 class="mb-4">{{ bloc.titre }}</h2>
                <v-btn v-if="bloc.bouton" elevation="0" color="white"
                    ><v-icon>mdi-chevron-right</v-icon>{{ bloc.bouton }}</v-btn
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        blocs: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
.containers.isphone {
    display: block;
    img {
        width: 100vw;
    }
}
.containers {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .container-img-text {
        height: 50%;
        position: relative;
        text-align: center;
        color: white;
        .titre-img-encart {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            h2{
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
        }
        img { 
            width: 100%;
        }
    }
}
</style>
<template>
    <div class="container">
        <div v-if="active == false" class="button-activate">
            <div class="line" /> 
            <v-icon @click="active = true" color="#2196f3">mdi-plus-circle-outline</v-icon>
            <div class="line" />
        </div>

        <div v-else-if="$r.blocs" class="blocs mb-4">
            <div class="bloc-container">
                <div v-for="bloc in $r.blocs" class="bloc" @click="$r.insertBloc(bloc, index, page), (active = false)">
                    <v-icon>{{ bloc.logo }}</v-icon>
                    <div class="title">{{ bloc.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        index: {
            type: Number,
            default: null
        },
        page: {
            type: String,
            default: null
        },
        setBlocEdition: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            active: false
        }
    }
}
</script>
<style lang="scss" scoped>
.button-activate {
    &:hover {
        opacity: 1;
        transition: 0.3s ease-in-out;
    }
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    .line {
        padding: 0 10px;
        width: calc(50% - 30px);
        height: 1px;
        border-bottom: 1px dashed #2196f3;
    }
}
</style>
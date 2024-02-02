<template>
    <div class="container">
        <div v-if="active == false" class="button-activate">
            <div class="line" />
            <v-btn
                @click=";(active = true), $r.getBlocs()"
                elevation="0"
                size="x-small"
                variant="outlined"
                color="blue">
                <v-icon>mdi-plus</v-icon>
                Insérer un bloc
            </v-btn>
            <div class="line" />
        </div>

        <div v-else-if="$r.blocs" class="blocs">
            <div class="bloc-container">
                <div
                    v-for="bloc in $r.blocs"
                    class="bloc"
                    @click="$r.insertBloc(bloc, index, page), (active = false)">
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
.container {
}
.button-activate {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .line {
        padding: 0 10px;
        width: calc(50% - 80px);
        height: 1px;
        border-bottom: 1px dashed #2196f3;
    }
}
.blocs { 
    background-color: #cccccc6e;  
    .bloc-container {
        overflow-x: auto;
        white-space: nowrap;
        display: inline-flex;
        justify-content: center;
        width: 100%;
        .bloc {
            margin: 10px;
            height: 150px;
            width: 150px;
            white-space: nowrap;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 0px #00000041;
            background-color: white;
            &:hover {
                cursor: pointer;
                background-color: #cccccc6e;
            }
            .title {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 21px;
                font-weight: 500;
                transform: translateY(-20px);
            }
            i {
                font-size: 150px;
                opacity: 0.08;
                position: relative;
                height: 0;
                transform: translateY(62px);
            }
        }
    }
}
</style>
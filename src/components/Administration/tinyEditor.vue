<template>
    <div>
        <v-textarea :id="`tiny-editor-${index}`" v-model="model[keyModel]"> </v-textarea>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components: {
        Editor
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        keyModel: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    created() {
        if (!this.model[this.keyModel]) {
            this.model[this.keyModel] = ''
        }
    },
    mounted() {
        this.setTinyEditor()
    },
    methods: {
        setTinyEditor() {
            tinymce.init({
                selector: `#tiny-editor-${this.index}`,
                width: '100%',
                toolbar:
                    'undo redo | bold italic underline strikethrough | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | superscript subscript | removeformat'
            })
        }
    }
}
</script>

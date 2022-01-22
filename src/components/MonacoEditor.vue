<template>
  <q-card style="width: 540px; height: 450px;">
    <pre>{{code}}</pre>
  </q-card>
</template>

<script>
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
export default {
  name: 'MonacoEditor',
  props: {
    code: { type: String, default: '// code \n' }
  },
  data () {
    return {
      options: {
        language: 'javascript',
        theme: 'vs',
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        readOnly: true
      },
      monacoInstanceEditor: null
    }
  },
  mounted () {
    if (!this.monacoInstanceEditor) {
      //   this.monacoInstanceEditor = monaco.editor.create(this.$refs.editor, this.options)
      //   this.monacoInstanceEditor.setValue(this.code)
    }
  },
  destroyed () {
    if (this.monacoInstanceEditor) {
      //   this.monacoInstanceEditor.dispose()
    }
  }
}
</script>

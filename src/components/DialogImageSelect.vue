<template>
  <div>
    <q-dialog
      ref="dialog"
      persistent
    >
      <q-card
        class="my-dialog"
        :style="`min-width:860px;`"
      >
        <q-toolbar>
          <q-toolbar-title>选择图片</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />
        </q-toolbar>
        <q-separator />
        <q-card-section class="scroll q-mt-none">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-card
                flat
                bordered
              >
                <q-list
                  class="scroll"
                  style="height: 460px;"
                >

                </q-list>
              </q-card>
            </div>
            <div class="col-12 col-sm-9">
              <q-card
                flat
                bordered
              >
                <q-list
                  class="scroll"
                  style="height: 460px;"
                >

                </q-list>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            @click="onOk"
          />
          <q-btn :label="$q.lang.label.clear" />
          <q-btn
            :label="$q.lang.label.cancel"
            v-close-popup
          />
        </q-card-actions>
        <q-inner-loading :showing="loading">
          <q-spinner-hourglass
            size="sm"
            color="primary"
          />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogImageSelect',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onOk (value) {
      this.$emit('ok', value)
      this.hide()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

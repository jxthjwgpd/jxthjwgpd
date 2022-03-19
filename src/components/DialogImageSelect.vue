<template>
  <div>
    <q-dialog v-model="fixed">
      <q-card
        class="my-dialog"
        :style="`min-width:800px;`"
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
        <div
          class="row"
          style="height: 42vh;"
        >
        </div>
        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.clear"
            v-close-popup
          />
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
      fixed: true,
      loading: false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

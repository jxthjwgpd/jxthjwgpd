<template>
  <div class="q-role">
    <div class="row q-col-gutter-xs">
      <div
        :class="col"
        v-for="item in data"
        :key="item.id"
      >
        <q-item
          tag="label"
          v-ripple
          class="q-pa-none q-role-item"
        >
          <q-item-section
            side
            top
            class="q-role-item-checkbox"
          >
            <q-checkbox
              dense
              v-model="selected"
              :val="item.id"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.roleName}}</q-item-label>
            <q-item-label caption>
              {{item.remark||'--'}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-hourglass
        size="sm"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserRoleList',
  data () {
    return {
      loading: false,
      data: [],
      selected: []
    }
  },
  props: {
    col: {
      default: 'col-6'
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    onRefresh () {
      this.onRequest({})
    },
    async onRequest () {
      this.loading = true
      await axios.get('/admin/roles', { params: { current: 1, size: 1000 } }).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.data = data.records
        }
      }).catch(error => {
        console.error(error)
      })
      this.selected = this.value
      setTimeout(() => {
        this.loading = false
      }, 200)
    }
  },
  watch: {
    'selected' () {
      this.$emit('input', this.selected)
    }
  }
}
</script>
<style lang="sass" scoped>
.q-role
  &-item
    padding: 5px
    border: 1px solid $grey
    &:hover
      border-color: $primary
    &-checkbox
      padding-right: 10px
</style>

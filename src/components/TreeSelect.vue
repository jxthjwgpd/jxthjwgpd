<template>
  <q-dialog v-model="fixed">
    <q-card
      class="my-dialog"
      style="min-width:320px;"
    >
      <q-toolbar>
        <q-toolbar-title>{{title}}</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>
      <q-separator />
      <q-card-section style="height: 36vh;">
        <q-scroll-area class="fit">
          <q-tree
            :nodes="treeData"
            node-key="id"
            label-key="name"
            selected-color="primary"
            :selected.sync="selected"
          />
        </q-scroll-area>
      </q-card-section>
      <q-separator />

      <q-card-actions
        align="right"
        class="q-dialog-footer"
      >
        <q-btn
          :label="$q.lang.label.ok"
          color="primary"
          type="submit"
          @click="getNode(selected)"
          v-close-popup
        />
        <q-btn
          :label="$q.lang.label.clear"
          @click="clearNode()"
          v-close-popup
        />
        <q-btn
          :label="$q.lang.label.cancel"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TreeSelect',
  data () {
    return {
      fixed: false,
      selected: null,
      node: null,
      parentNode: null
    }
  },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: '选择'
    },
    pNodeId: {
      type: String
    },
    pNodeName: {
      type: String
    },
    nodeId: {
      type: String
    },
    treeData: {
      type: Array
    }
  },
  watch: {
    'value' () {
      this.fixed = this.value
    },
    'fixed' () {
      this.$emit('input', this.fixed)
    },
    'nodeId' () {
      this.selected = this.pNodeId
      this.getNode(this.pNodeId)
    }
  },
  methods: {
    getNode (id) {
      if (!id) return
      this.node = null
      const { node } = this.getParent(this.treeData, id)
      if (node) {
        this.$emit('update:pNodeId', node.id)
        this.$emit('update:pNodeName', node.name)
      }
    },
    clearNode () {
      this.node = null
      this.selected = null
      this.$emit('update:pNodeId', '0')
      this.$emit('update:pNodeName', null)
    },
    getParent (list, id) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (this.node) {
            break
          }
          let item = list[i]
          if (!item || !item.id) {
            continue
          }
          if (item.id === id) {
            this.node = item
            break
          } else {
            if (item.children && item.children.length > 0) {
              this.parentNode = item
              this.getParent(item.children, id)
            } else {
              continue
            }
          }
        }
      }
      if (!this.node) {
        this.parentNode = null
      }
      return {
        parentNode: this.parentNode,
        node: this.node
      }
    }
  }
}
</script>

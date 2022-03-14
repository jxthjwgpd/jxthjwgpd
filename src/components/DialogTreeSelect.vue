<template>
  <div @click="fixed=true">
    <q-input
      outlined
      dense
      no-error-icon
      v-model.trim="resultNameDataCop"
      :placeholder="`请选择${title}`"
      class="q-mt-sm"
    >
      <template v-slot:append>
        <q-icon
          name="low_priority"
          @click="fixed=!fixed"
        />
      </template>
    </q-input>

    <q-dialog v-model="fixed">
      <q-card
        class="my-dialog"
        :style="`min-width:${levelCop}px;`"
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
        <div
          class="row"
          style="height: 36vh;"
        >
          <q-card-section class="col">
            <q-scroll-area class="fit">
              <q-list
                dense
                padding
                class="rounded-borders"
              >
                <q-item
                  tag="label"
                  clickable
                  v-ripple
                  v-for="(item, index) in treeData"
                  :key="index"
                >
                  <q-item-section side>
                    <q-radio
                      dense
                      v-model="resultData[0]"
                      :val="item.id"
                      color="primary"
                      @input="onInputData"
                    />
                  </q-item-section>
                  <q-item-section>
                    {{item.name}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col">
            <q-scroll-area class="fit">
              <q-list
                dense
                padding
                class="rounded-borders"
              >
                <q-item
                  tag="label"
                  clickable
                  v-ripple
                  v-for="(item, index) in showData[0]"
                  :key="index"
                >
                  <q-item-section side>
                    <q-radio
                      dense
                      v-model="resultData[1]"
                      :val="item.id"
                      color="primary"
                      @input="onInputData"
                    />
                  </q-item-section>
                  <q-item-section>
                    {{item.name}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col">
            <q-scroll-area class="fit">
              <q-list
                dense
                padding
                class="rounded-borders"
              >
                <q-item
                  tag="label"
                  clickable
                  v-ripple
                  v-for="(item, index) in showData[1]"
                  :key="index"
                >
                  <q-item-section side>
                    <q-radio
                      dense
                      v-model="resultData[2]"
                      :val="item.id"
                      color="primary"
                      @input="onInputData"
                    />
                  </q-item-section>
                  <q-item-section>
                    {{item.name}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </div>
        <q-separator />

        <q-card-actions
          align="right"
          class="q-dialog-footer"
        >
          {{resultNameDataCop}}
          <q-space />
          <q-btn
            :label="$q.lang.label.ok"
            color="primary"
            type="submit"
            @click="onOk"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.clear"
            @click="onClear"
            v-close-popup
          />
          <q-btn
            :label="$q.lang.label.cancel"
            @click="onClose"
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
import axios from 'axios'
export default {
  name: 'DialogTreeSelect',
  data () {
    return {
      loading: false,
      fixed: false,
      resultData: [],
      resultNameData: [],
      showNode: {},
      showData: [],
      treeData: []
    }
  },
  props: {
    value: {
      required: false
    },
    url: {
      required: false
    },
    title: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 3
    }
  },
  computed: {
    levelCop () {
      return this.level * 260
    },
    resultNameDataCop () {
      return this.resultNameData.join('/')
    }
  },
  watch: {
    showNode () {
      if (this.showNode) {
        let vs = (this.showNode.pids + this.showNode.id).split(',')
        this.resultData = vs.splice(1, vs.length)
        for (var i = 0; i < this.resultData.length; i++) {
          this.getChildrens(this.treeData, this.resultData[i], false)
        }
      }
    },
    resultData () {
      this.resultNameData = []
      for (var i = 0; i < this.resultData.length; i++) {
        this.getNode(this.treeData, this.resultData[i])
      }
    },
    fixed () {
      if (this.fixed) {
        this.onRequest()
      }
    }
  },
  mounted () {
    this.onRequest()
  },
  methods: {
    async onRequest () {
      this.loading = true
      await axios.get(this.url, {}).then(response => {
        const { code, data } = response.data
        if (code === '200' && data) {
          this.treeData = data
          this.getChildrens(this.treeData, this.value, true)
        }
      }).catch(error => {
        console.error(error)
      })
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    onInputData (value) {
      this.getChildren(this.treeData, value)
    },
    getChildren (list, id) {
      if (!id) return
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          let index = item.pids.split(',').length
          if (id === item.id) {
            this.showNode = item
            this.showData[index - 2] = item.children
            this.showData[index - 1] = []
            this.resultData.splice(index - 1, 2)
          } else {
            if (item.children && item.children.length > 0) {
              this.getChildren(item.children, id)
            }
          }
        }
      }
    },
    getChildrens (list, id, isNode) {
      if (!id) return
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          let index = item.pids.split(',').length
          if (id === item.id) {
            this.showData[index - 2] = item.children
            if (isNode) {
              this.showNode = item
            }
          } else {
            if (item.children && item.children.length > 0) {
              this.getChildrens(item.children, id, isNode)
            }
          }
        }
      }
    },
    getNode (list, id) {
      if (!id) return
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          if (id === item.id) {
            this.resultNameData.push(item.name)
          } else {
            if (item.children && item.children.length > 0) {
              this.getNode(item.children, id)
            }
          }
        }
      }
    },
    onOk () {
      if (this.showNode) {
        this.$emit('input', this.showNode.id)
      }
    },
    onClear () {
      this.showNode = null
      this.showData = []
      this.resultData = []
      this.$emit('input', null)
    },
    onClose () {
      // this.getChildrens(this.treeData, this.value, true)
    }
  }
}
</script>

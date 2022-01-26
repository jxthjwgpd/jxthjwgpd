<template>
  <div class="row q-col-gutter-md">
    <div class="col col-md-6">
      <!-- <q-markup-table
          flat
          bordered
          class="q-table__card-f"
        >
          <thead>
            <tr>
              <th class="text-left">角色组名称/描述 <span class="text-primary">可选（{{roleList.length}}）</span></th>
            </tr>
          </thead>
          <tbody> -->
      <q-card
        flat
        bordered
      >
        <q-card-section>
          角色组名称/描述 <span class="text-primary">可选（{{roleList.length}}）</span>
        </q-card-section>
        <q-separator />
        <q-list
          class="scroll"
          style="height: 260px;"
        >
          <q-item
            tag="label"
            v-ripple
            v-for="item in roleList"
            :key="item.id"
          >
            <q-item-section
              side
              top
            >
              <q-checkbox
                dense
                v-model="selected"
                :val="item.id"
              />
            </q-item-section>
            <q-item-section>
              {{item.roleName}}
              <q-item-label caption>{{item.remark||'--'}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <!-- </tbody>
        </q-markup-table> -->
    </div>
    <div class="col col-md-6">
      <!-- <q-markup-table
          flat
          bordered
          class="q-table__card-f"
        >
          <thead>
            <tr>
              <th class="text-left th-pos">角色组名称/描述 <span class="text-primary">已选（{{selectedRoleList.length}}）</span>

                <span class="th-action">操作</span>
              </th>
            </tr>
          </thead>
          <tbody> -->
      <q-card
        flat
        bordered
      >
        <q-card-section>
          角色组名称/描述 <span class="text-primary">已选（{{selectedRoleList.length}}）</span>
        </q-card-section>
        <q-separator />
        <q-list
          class="scroll"
          style="height: 260px;"
        >
          <div
            v-for="item in selectedRoleList"
            :key="item.id"
          >
            <q-item
              tag="label"
              v-ripple
            >
              <q-item-section>
                {{item.roleName}}
                <q-item-label caption>{{item.remark||'--'}}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="clear"
                  size="14px"
                  color="primary"
                  @click="clearSelected(item.id)"
                />
              </q-item-section>
            </q-item>
          </div>
          <div
            v-if="selectedRoleList.length==0"
            style="line-height:45px; text-align:center;"
          >
            暂无数据
          </div>
        </q-list>
      </q-card>
      <!-- </tbody>
        </q-markup-table> -->
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
import { mapGetters } from 'vuex'
export default {
  name: 'UserRoleList',
  data () {
    return {
      loading: false,
      selected: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      roleList: 'system/RoleList'
    }),
    selectedRoleList () {
      return this.roleList.filter(e => this.selected.find(a => a === e.id))
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
      await this.$store.dispatch('system/RoleList', { roleName: null })
      this.selected = this.value
      setTimeout(() => {
        this.loading = false
      }, 200)
    },
    clearSelected (id) {
      this.selected.splice(this.selected.indexOf(id), 1)
    }
  },
  watch: {
    'selected' () {
      this.$emit('input', this.selected)
    }
  }
}
</script>

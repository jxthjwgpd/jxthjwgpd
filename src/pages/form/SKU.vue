<template>
  <q-page class="my-page basic-form">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to=""
          />
          <q-breadcrumbs-el
            label="表单页"
            to=""
          />
          <q-breadcrumbs-el label="SKU" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">规格演示</div>
        <div class="q-mt-sm">适用于商品规格。</div>
      </div>
    </div>
    <div class="my-page-body">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <div class="q-mt-sm">
              {{specData}}
              <q-markup-table>
                <thead>
                  <tr>
                    <th class="text-left wd-200">规格名称</th>
                    <th class="text-center wd-200">类型</th>
                    <th class="text-left">属性选项</th>
                    <th class="text-left wd-150">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in specData"
                    :key="index"
                  >
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.specName"
                        placeholder="请输入属性名称"
                        class="wd-150"
                      />
                    </td>
                    <td>
                      <q-btn-toggle
                        v-model="item.specType"
                        toggle-color="primary"
                        flat
                        :options="specTypeOptions"
                      />
                    </td>
                    <td>
                      <!-- <div v-if="item.specType===0"> -->
                      <div>
                        <q-chip
                          square
                          removable
                          v-for="(iem,ii) in item.itemValues"
                          :key="ii"
                          @remove="item.itemValues.splice(ii,1)"
                        >
                          <q-avatar
                            :style="`background:${iem.value||'#000'}`"
                            v-if="item.specType===1"
                          >
                            <q-popup-proxy>
                              <q-color v-model="iem.value" />
                            </q-popup-proxy>
                          </q-avatar>
                          <q-icon
                            v-if="item.specType===2"
                            :name="iem.value||'image'"
                          />
                          <input
                            type="text"
                            style="border:0; width:100px; background:initial;"
                            v-model="iem.label"
                          />
                        </q-chip>
                        <q-chip
                          square
                          color="primary"
                          text-color="white"
                          clickable
                          @click="item.itemValues.push({ value: '' })"
                        >
                          新增
                        </q-chip>
                      </div>
                    </td>
                    <td class="q-gutter-xs action">
                      <a
                        class="text-primary"
                        href="javascript:;"
                      >下移</a>
                      <a
                        class="text-primary"
                        href="javascript:;"
                      >上移</a>
                      <a
                        class="text-primary"
                        href="javascript:;"
                        @click="specData.splice(index, 1)"
                      >删除</a>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-btn
                label="新增一行"
                color="primary"
                class="q-mt-md q-mb-md"
                @click="onAddRow"
              />
              <q-btn
                label="同步一下"
                color="primary"
                class="q-ma-md"
                @click="onOpecDataSyn"
              />
              <q-markup-table separator="cell">
                <thead>
                  <tr>
                    <th
                      class="text-center"
                      :colspan="specData.length"
                    >商品规格</th>
                    <th
                      class="text-center wd-150"
                      rowspan="2"
                    >销售价格</th>
                    <th
                      class="text-center wd-150"
                      rowspan="2"
                    >市场价格</th>
                    <th
                      class="text-center wd-150"
                      rowspan="2"
                    > 库存</th>
                    <th
                      class="text-center wd-150"
                      rowspan="2"
                    >体积</th>
                    <th
                      class="text-center wd-150"
                      rowspan="2"
                    >重量</th>
                  </tr>
                  <tr>
                    <td
                      v-for="(item,index) in specData"
                      :key="index"
                      class="text-center"
                    >
                      {{item.specName}}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in specValueData"
                    :key="index"
                  >
                    <td
                      v-for="(ff,dd) in item.split(',')"
                      :key="dd"
                    >
                      {{ff}}
                    </td>
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.sort"
                        type="number"
                      />
                    </td>
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.sort"
                        type="number"
                      />
                    </td>
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.sort"
                        type="number"
                      />
                    </td>
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.sort"
                        type="number"
                      />
                    </td>
                    <td>
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model.trim="item.sort"
                        type="number"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{specValueData}}
  </q-page>
</template>

<script>
export default {
  name: 'BasicForm',
  data () {
    return {
      loading: false,
      specTypeOptions: [
        { label: '文本', value: 0 },
        { label: '颜色', value: 1 },
        { label: '图片', value: 2 }
      ],
      specData: [],
      specValueData: []
    }
  },
  mounted () {
    if (this.specData) {
      this.onAddRow()
    }
  },
  methods: {
    onAddRow () {
      this.specData.push({ id: null, specName: null, specId: this.$route.params.id, specType: 0, itemValues: [], sort: '0' })
    },
    onSubmit (evt) {

    },
    onOpecDataSyn () {
      let tempArrays = []
      this.specData.map((item, index) => {
        let tas = []
        item.itemValues.map(e => {
          if (e) {
            console.log(e)
            tas.push(e.value)
          }
        })
        tempArrays.push(tas)
      })
      console.log(tempArrays)
      this.specValueData = this.doExchange(tempArrays)
    },
    doExchange (doubleArrays) {
      var len = doubleArrays.length
      if (len >= 2) {
        var len1 = doubleArrays[0].length
        var len2 = doubleArrays[1].length
        var newlen = len1 * len2
        var temp = new Array(newlen)
        var index = 0
        for (var i = 0; i < len1; i++) {
          for (var j = 0; j < len2; j++) {
            temp[index] = doubleArrays[0][i] + ',' + doubleArrays[1][j]
            index++
          }
        }
        var newArray = new Array(len - 1)
        for (var ik = 2; ik < len; ik++) {
          newArray[ik - 1] = doubleArrays[ik]
        }
        newArray[0] = temp
        return this.doExchange(newArray)
      } else if (len === 1) {
        return doubleArrays[0]
      } else {
        return doubleArrays
      }
    }
  }
}
</script>

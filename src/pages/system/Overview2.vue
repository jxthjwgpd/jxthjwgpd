<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="仪表盘"
            to="/"
          />
          <q-breadcrumbs-el label="概览" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">中枢分析数据概览</div>
      </div>
    </div>
    <div class="my-page-body row">
      <div class="col-md-8 col-12">
        <q-card flat>
          <q-card-section class="text-subitle2 row q-pa-none">
            <q-parallax :height="400">
              <template v-slot:media>
                <img src="statics/index.jpg">
              </template>

              <h1 class="text-white">Docks</h1>
            </q-parallax>
          </q-card-section>

          <q-card-actions>
            <q-btn
              flat
              color="dark"
              label="快捷访问入口"
            />
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2 row">
                <div class="col-4">
                  <q-item
                    clickable
                    v-ripple
                    class="q-pl-sm q-mr-sm"
                  >
                    <q-item-section>新建用户组</q-item-section>
                  </q-item>
                </div>
                <div class="col-4">
                  <q-item
                    clickable
                    v-ripple
                    class="q-pl-sm q-mr-sm"
                  >
                    <q-item-section>新建用户</q-item-section>
                  </q-item>
                </div>
                <div class="col-4">
                  <q-item
                    clickable
                    v-ripple
                    class="q-pl-sm q-mr-sm"
                  >
                    <q-item-section>添加权限</q-item-section>
                  </q-item>
                </div>
                <div class="col-4 q-mt-sm">
                  <q-item
                    clickable
                    v-ripple
                    class="q-pl-sm q-mr-sm"
                  >
                    <q-item-section>自定义策略</q-item-section>
                  </q-item>
                </div>
                <div class="col-4 q-mt-sm">
                  <q-item
                    clickable
                    v-ripple
                    class="q-pl-sm q-mr-sm"
                  >
                    <q-item-section>用户安全设置</q-item-section>
                  </q-item>
                </div>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
      <div :class="`col-md-4 col-12 ${$q.screen.gt.sm?'q-pl-md':'q-mt-md'}`">
        <q-card flat>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-subtitle2 ellipsis">安全消息</div>
              <div class="col-auto text-red text-caption row no-wrap items-center">3</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-list>
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label
                    caption
                    lines="2"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-icon
                    name="star"
                    color="yellow"
                  />
                </q-item-section>
              </q-item>

              <q-separator spaced />

              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <q-item-label caption>Voted!</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced />

              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section
                  side
                  top
                >
                  <q-badge
                    color="teal"
                    label="10k"
                  />
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <!-- </template>

    </q-splitter>
  </q-page>-->
</template>

<script>
export default {
  data () {
    return {
      expanded: true,
      value: 85
    }
  }
}
</script>
<style lang="sass" scoped>
</style>

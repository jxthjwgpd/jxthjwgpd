<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="系统管理"
            to="/system"
          />
          <q-breadcrumbs-el label="概览" />
        </q-breadcrumbs>
        <div
          class="text-h6 q-mt-xs"
          v-if="$q.screen.gt.sm"
        >系统管理数据状况概览</div>
      </div>
    </div>
    <q-banner
      dense
      class="bg-grey-3 q-mb-md"
    >
      喜欢的话，鼓励一下给个star，谢谢！
      <template v-slot:action>
        <q-btn
          flat
          type="a"
          color="red-7"
          href='https://gitee.com/ruyangit/quasar-element-pro/stargazers'
        >
          <img
            src='https://gitee.com/ruyangit/tangdao/badge/star.svg?theme=white'
            alt='star'
          /></q-btn>
      </template>
    </q-banner>
    <div class="row">
      <div class="col-md-8 col-12">
        <q-card flat>
          <q-card-section class="text-subitle2 row q-pa-none">
            <q-parallax
              :height="200"
              :speed="0.5"
            >
              <template v-slot:media>
                <img src="https://cdn.quasar.dev/img/parallax1.jpg">
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

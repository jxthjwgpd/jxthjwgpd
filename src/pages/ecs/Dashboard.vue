<template>
  <q-page class="ccl-dashboard">
      <q-splitter
      v-model="splitterModel"
      :limits="[splitterModel, Infinity]"
      unit="px"
      class="full-height"
    >

      <template v-slot:before v-if="$q.screen.gt.xs">
        <div class="view-nav-menu fit">
          <div class="text-h6 q-pa-md">云服务控制台</div>
          <q-separator />
          <div class="view-nav-menu-content">
            <q-scroll-area class="fit">
            <q-app-menu />
          </q-scroll-area>
          </div>
      </div>
      </template>
        <template v-slot:separator v-if="$q.screen.gt.sm">
        <q-avatar color="primary" text-color="white" size="20px" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <q-page class="q-pa-lg">
          <div class="row items-center justify-between q-mb-md">
            <div>
              <q-breadcrumbs align="left">
                <q-breadcrumbs-el label="首页" />
                <q-breadcrumbs-el label="控制台总览" />
              </q-breadcrumbs>
              <div class="text-h6 q-mt-xs" v-if="$q.screen.gt.sm">普通展示，列表页面效果</div>
            </div>
            <div class="q-gutter-sm" v-if="$q.screen.gt.sm">
              <q-btn label="申请访问" icon="mail"/>
              <q-btn-dropdown color="primary" label="更多">
                <q-list>
                  <q-item clickable v-close-popup >
                    <q-item-section>
                      <q-item-label>开通</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup >
                    <q-item-section>
                      <q-item-label>关闭服务</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup >
                    <q-item-section>
                      <q-item-label>服务状态</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
          <q-banner dense class="bg-grey-3 q-mb-md">
            云服务器ECS主机管理，精简效果上线，邀请你参与问卷调查。
            <template v-slot:action>
              <q-btn flat label="不参与" />
              <q-btn flat label="前往填写" color="red-7"/>
            </template>
          </q-banner>
          <div class="row">
            <div class="col-md-8 col-12">
              <q-card flat>
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      安全概览
                    </div>
                    <div class="col-auto text-grey text-caption row no-wrap items-center">
                      <q-icon name="place" />
                      250 ft
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    $・Italian, Cafe
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

              </q-card>

              <q-card flat class="q-mt-md">
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      我的资源
                    </div>
                    <div class="col-auto text-grey text-caption row no-wrap items-center">
                      5 条
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    $・Italian, Cafe
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-card-actions>
                  <q-btn flat color="dark" label="Share" />
                  <q-btn flat color="primary" label="Book" />

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
                    <q-card-section class="text-subitle2">
                      <div class="q-gutter-md">
                        <q-btn style="width: 30%;" color="primary"  align="left" :label="`button xs-${n}`" v-for="n in 7" :key="`xs-${n}`" />
                      </div>
                    </q-card-section>
                  </div>
                </q-slide-transition>
              </q-card>
              <q-card flat class="q-mt-md">
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      严选推荐
                    </div>
                    <div class="col-auto text-grey text-caption row no-wrap items-center">
                      20-02-01
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-list >
                    <q-item>
                      <q-item-section avatar top>
                        <q-icon name="account_tree" color="black" size="34px" />
                      </q-item-section>

                      <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm">GitHub</q-item-label>
                      </q-item-section>

                      <q-item-section top>
                        <q-item-label lines="1">
                          <span class="text-weight-medium">[quasarframework/quasar]</span>
                          <span class="text-grey-8"> - GitHub repository</span>
                        </q-item-label>
                        <q-item-label caption lines="1">
                          @rstoenescu in #3: > Generic type parameter for props
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                          <span class="cursor-pointer">Open in GitHub</span>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                          <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                          <q-btn size="12px" flat dense round icon="more_vert" />
                        </div>
                      </q-item-section>
                    </q-item>

                    <q-separator spaced />

                    <q-item>
                      <q-item-section avatar top>
                        <q-icon name="account_tree" color="black" size="34px" />
                      </q-item-section>

                      <q-item-section top class="col-2 gt-sm">
                        <q-item-label class="q-mt-sm">GitHub</q-item-label>
                      </q-item-section>

                      <q-item-section top>
                        <q-item-label lines="1">
                          <span class="text-weight-medium">[quasarframework/quasar]</span>
                          <span class="text-grey-8"> - GitHub repository</span>
                        </q-item-label>
                        <q-item-label caption lines="1">
                          @rstoenescu in #1: > The build system
                        </q-item-label>
                        <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                          <span class="cursor-pointer">Open in GitHub</span>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                          <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                          <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                          <q-btn size="12px" flat dense round icon="more_vert" />
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>

              </q-card>

            </div>
            <div :class="`col-md-4 col-12 ${$q.screen.gt.sm?'q-pl-md':'q-mt-md'}`">
              <q-card flat>
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      账户信息
                    </div>
                    <div class="col-auto text-primary text-caption row no-wrap items-center">
                      费用中心
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    $・Italian, Cafe
                  </div>
                  <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                  <q-btn flat round icon="event" />
                  <q-btn flat color="primary">
                    Reserve
                  </q-btn>
                </q-card-actions>
              </q-card>
              <q-card flat class="q-mt-md">
                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-subtitle2 ellipsis">
                      推广
                    </div>
                    <div class="col-auto text-primary text-caption row no-wrap items-center">
                      更多
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-carousel
                    v-model="slide"
                    transition-prev="scale"
                    transition-next="scale"
                    swipeable
                    animated
                    control-color="white"
                    padding
                    height="150px"
                    class="bg-primary text-white shadow-1 rounded-borders"
                  >
                    <q-carousel-slide name="style" class="column no-wrap flex-center">
                      <q-icon name="style" size="23px" />
                      <div class="q-mt-md text-center">
                        {{ lorem }}
                      </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="tv" class="column no-wrap flex-center">
                      <q-icon name="live_tv" size="23px" />
                      <div class="q-mt-md text-center">
                        {{ lorem }}
                      </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="layers" class="column no-wrap flex-center">
                      <q-icon name="layers" size="23px" />
                      <div class="q-mt-md text-center">
                        {{ lorem }}
                      </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="map" class="column no-wrap flex-center">
                      <q-icon name="terrain" size="23px" />
                      <div class="q-mt-md text-center">
                        {{ lorem }}
                      </div>
                    </q-carousel-slide>
                  </q-carousel>

                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      splitterModel: 243,
      expanded: true,
      slide: 'style',
      lorem: 'Lorem ipsum dolor. '
    }
  },
  created () {
    this.splitterWatch(this.$q.screen.gt.sm)
  },
  watch: {
    '$q.screen.gt.sm' (val) {
      this.splitterWatch(val)
    }
  },
  methods: {
    splitterWatch (val) {
      this.splitterModel = val ? 243 : 0
    }
  }
}
</script>

<style lang="sass">
.ccl-dashboard
  & .q-splitter__before
    background-color: #fff;
  & .view-nav-menu
    position: absolute;
    top: 0;
    bottom: 0;
    &-content
      position: absolute;
      top: 65px;
      left: 0;
      right: 0;
      bottom: 0;
@media (max-width: $breakpoint-sm-max)
  .q-splitter--vertical > .q-splitter__separator
    width: 0px;
</style>

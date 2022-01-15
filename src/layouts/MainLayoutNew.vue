<template>
  <q-layout view="hHh LpR lfr">
    <q-app-header :menuData="menuData" />
    <q-page-container class="main-page-container">
      <div
        class="main-page-sidebar full-height"
        ref="pageSidebar"
        v-show="sidebarVisibility"
        :style="`width: ${!$q.screen.gt.xs ? 0 : !sidebarLeftOpen ? sidebarMinimize : sidebar }px`"
      >
        <div
          class="sidebar-body"
          v-if="sidebarMenuData.length>0"
        >
          <q-scroll-area class="fit">
            <q-app-menu-new
              :menuData="sidebarMenuData"
              v-model="sidebarLeftOpen"
            />
          </q-scroll-area>
        </div>
        <div
          class="sidebar-footer row items-center"
          v-if="$q.screen.gt.xs"
        >
          <q-btn
            flat
            dense
            round
            @click="sidebarLeftOpen = !sidebarLeftOpen"
            :icon="`${sidebarLeftOpen?'format_indent_decrease':'format_indent_increase'}`"
            aria-label="Menu"
            color="blue-6"
            size="sm"
          />
        </div>
      </div>
      <div
        class="main-page-body"
        ref="pageBody"
        :style="`left: ${!$q.screen.gt.xs || !sidebarVisibility ? 0 : !sidebarLeftOpen ? sidebarMinimize : sidebar }px`"
      >
        <div class="full-height scroll">
          <router-view />
        </div>
      </div>
      <q-page-sticky
        position="bottom-right"
        :offset="[18, 18]"
        v-if="!$q.screen.gt.xs"
      >
        <q-btn
          round
          color="primary"
          icon="menu"
          @click="left=!left"
        />
      </q-page-sticky>
      <q-drawer
        v-model="left"
        side="left"
        overlay
        bordered
        :width="240"
      >
        <q-app-menu-new
          :menuData="menuData"
          :minimize="true"
          v-model="left"
        />
      </q-drawer>
    </q-page-container>
    <q-inner-loading :showing="loading">
      <q-spinner-radio
        size="50px"
        color="primary"
      />
      <span class="text-primary text-overline">welcome</span>
    </q-inner-loading>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      left: false,
      sidebar: 240,
      sidebarMinimize: 55,
      sidebarVisibility: false,
      sidebarLeftOpen: true,
      sidebarMenuData: [],
      // menuData: menuData,
      persistent: false
    }
  },
  computed: {
    ...mapGetters({
      loading: 'session/globalLoading',
      menuData: 'session/globalMenuList'
    })
  },
  mounted () {
    this.onRequest()
    if (this.sidebarVisibility && this.$q.screen.gt.xs) {
      this.sidebarLeftOpen = false
    }
    if (this.sidebarVisibility && this.$q.screen.gt.sm) {
      this.sidebarLeftOpen = true
    }
  },
  watch: {
    $route: 'SidebarMenuDataMethod',
    'sidebarLeftOpen' (val) {
      if (this.sidebarVisibility) {
        this.$refs.pageSidebar.setAttribute('style', 'width: ' + (val ? this.sidebar : this.sidebarMinimize) + 'px')
        this.$refs.pageBody.setAttribute('style', 'left: ' + (val ? this.sidebar : this.sidebarMinimize) + 'px')
      }
    },
    '$q.screen.gt.sm' (val) {
      if (this.sidebarVisibility) {
        this.sidebarLeftOpen = val
      }
    },
    '$q.screen.gt.xs' () {
      if (this.sidebarVisibility) {
        this.sidebarLeftOpen = false
      }
    },
    menuData () {
      this.SidebarMenuDataMethod(this.$route)
    }
  },
  methods: {
    SidebarMenuDataMethod (route) {
      this.sidebarVisibility = route.meta.sidebar
      if (this.sidebarVisibility) {
        const { path } = route.matched[1]
        this.sidebarMenuData = this.menuData.filter(item => item.children && item.path === path)
      }
    },
    async onRequest () {
      await this.$store.dispatch('session/navs')
    }
  }
}
</script>
<style lang="sass" scoped>
.main-page-container
  position: absolute
  left: 0
  top: 50px
  right: 0
  bottom: 0
  overflow: hidden
  padding-top: 0px !important
.main-page-sidebar
  position: absolute
  border-right: 1px solid #eaebec
  background-color: #fff
  & .sidebar-body
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 45px
  & .sidebar-footer
    position: absolute
    left: 0
    right: 0
    bottom: 0
    height: 45px
    padding-left: 13.5px
.main-page-body
  position: absolute
  top: 0
  right: 0
  bottom: 0
  overflow-y: auto
  overflow-x: hidden
</style>

<template>
  <q-layout view="hHh LpR lfr">

    <q-app-header>
      <q-tabs dense narrow-indicator align="left">
        <!-- <q-route-tab :ripple="false" label="总览" to="dashboard"/> -->
        <q-route-tab :ripple="false" v-for="item in menuData" :key="`${item.name}-${item.path}`" :label="item.name" :to="item.path"/>
      </q-tabs>
    </q-app-header>

    <q-page-container class="main-page-container">
      <div class="main-page-sidebar full-height" ref="pageSidebar" v-show="sidebarVisibility" :style="`width: ${!$q.screen.gt.xs ? 0 : !sidebarLeftOpen ? sidebarMinimize : sidebar }px`">
        <div class="sidebar-body" v-if="menuData.length>0">
          <q-scroll-area class="fit">
            <q-app-menu-new :menuData="menuData" v-model="sidebarLeftOpen"/>
            <!-- <q-app-menu-new :menuData="menuData" v-show="false"/> -->
          </q-scroll-area>
        </div>
        <div class="sidebar-footer row items-center" v-if="$q.screen.gt.xs">
            <q-btn
              flat
              dense
              round
              @click="sidebarLeftOpen = !sidebarLeftOpen"
              :icon="`${sidebarLeftOpen?'menu':'close'}`"
              aria-label="Menu"
              color="blue-6"
            />
        </div>
      </div>
      <div class="main-page-body"  ref="pageBody" :style="`left: ${!$q.screen.gt.xs || !sidebarVisibility ? 0 : !sidebarLeftOpen ? sidebarMinimize : sidebar }px`">
        <div class="full-height scroll"><router-view /></div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import menuData from '../assets/menu.js'
export default {
  data () {
    return {
      sidebar: 200,
      sidebarMinimize: 55,
      sidebarVisibility: true,
      sidebarLeftOpen: true,
      menuData: menuData
    }
  },
  mounted () {
    this.menuData.map(
      item => {
      }
    )
    if (this.$q.screen.gt.xs) {
      this.sidebarLeftOpen = false
    }
    if (this.$q.screen.gt.sm) {
      this.sidebarLeftOpen = true
    }
    // this.sidebarLeftOpen = this.$q.screen.gt.sm
  },
  watch: {
    'sidebarLeftOpen' (val) {
      this.$refs.pageSidebar.setAttribute('style', 'width: ' + (val ? this.sidebar : this.sidebarMinimize) + 'px')
      this.$refs.pageBody.setAttribute('style', 'left: ' + (val ? this.sidebar : this.sidebarMinimize) + 'px')
    },
    '$q.screen.gt.sm' (val) {
      this.sidebarLeftOpen = val
    },
    '$q.screen.gt.xs' () {
      this.sidebarLeftOpen = false
    }
  }
}
</script>
<style lang="sass" scoped>
.main-page-container
  position: absolute;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding-top: 0px !important;
.main-page-sidebar
  position: absolute;
  border-right: 1px solid #eaebec;
  background-color: #fff;
  & .sidebar-body
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 45px;
  & .sidebar-footer
     position: absolute;
     left: 0;
     right: 0;
     bottom: 0;
     height: 45px;
     padding-left: 10px;
.main-page-body
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
</style>

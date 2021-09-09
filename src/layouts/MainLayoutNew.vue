<template>
  <q-layout view="hHh LpR lfr">

    <q-app-header />

    <q-page-container class="main-page-container">
      <div class="main-page-sidebar full-height" v-show="sidebarVisibility" :style="`width: ${!$q.screen.gt.xs ? 0 : !$q.screen.gt.sm ? sidebarMinimize : sidebar}px`">
        <div class="sidebar-body">
          <q-scroll-area class="fit" >
            <q-app-menu-new :menuData="menuData"/>
          </q-scroll-area>
          </div>
      </div>
      <div class="main-page-body" :style="`left: ${!$q.screen.gt.xs || !sidebarVisibility ? 0 : !$q.screen.gt.sm ? sidebarMinimize : sidebar}px`">
        <div class="full-height"><router-view /></div>
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
      sidebarVisibility: false,
      menuData: menuData
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
  & .sidebar-body
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 45px;
     background-color: #ffffff;
.main-page-body
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
</style>

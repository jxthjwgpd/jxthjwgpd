<template>
  <q-layout view="hHh LpR lfr">

    <q-app-header />

    <!-- <q-drawer show-if-above v-model="left" :mini="!left || miniState" side="left" :width="256" :mini-width="56" bordered> -->
    <!-- <q-app-menu /> -->
    <!-- <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-for="i in 20" :key="`item-cr-${i}`">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area> -->
    <!-- </q-drawer> -->
    <q-page-container class="main-page-container">
      <div class="main-page-sidebar full-height" :style="`width: ${!$q.screen.gt.xs ? 0 : !$q.screen.gt.sm ? 56 : 256}px`">
        <div class="sidebar-body">
          <q-scroll-area class="fit" >
            <!-- <q-list padding>
              <q-item clickable v-ripple v-for="i in 20" :key="`item-cr-${i}`">
                <q-item-section avatar>
                  <q-icon name="send" />
                </q-item-section>

                <q-item-section v-show="$q.screen.gt.sm">
                  Send
                </q-item-section>
              </q-item>
            </q-list> -->
            <q-app-menu-new />
          </q-scroll-area>
          </div>
      </div>
      <!-- <q-drawer class="main-page-sidebar" v-model="left" :mini="!left || miniState" side="left" :width="200" :mini-width="56" bordered>
        <q-scroll-area fit class="sidebar-body">
          <q-list padding>
          <q-item clickable v-ripple v-for="i in 20" :key="`item-cr-${i}`">
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>
          </q-list>
        </q-scroll-area>
        <q-toolbar class="absolute-bottom-left">
          <q-btn
          flat
          dense
          round
          @click="miniState = !miniState"
          :icon="`${!miniState?'menu':'close'}`"
          aria-label="Menu"
        />
        </q-toolbar>
      </q-drawer> -->
      <!-- <div class="main-page-body" :style="`left: ${$q.screen.gt.sm ? $q.screen.gt.xs ? 0: 60: 200}px`"> -->
      <div class="main-page-body" :style="`left: ${!$q.screen.gt.xs ? 0 : !$q.screen.gt.sm ? 56 : 256}px`">
        <div class="full-height"><router-view /></div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true
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

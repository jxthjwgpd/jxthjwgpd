<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated>
      <q-toolbar class="MAIN__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          :icon="`${leftDrawerOpen?'menu':'menu'}`"
          aria-label="Menu"
        />

        <!-- <q-toolbar-title shrink class="row items-center no-wrap" > -->
          <!-- <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg"> -->
          <!-- <span class="q-ml-sm" v-if="$q.screen.gt.sm">Quasar Admin</span> -->
        <!-- </q-toolbar-title> -->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap q-mr-sm">
          <q-btn round dense flat icon="apps" v-if="$q.screen.gt.xs">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat icon="notifications" v-if="$q.screen.gt.xs">
            <q-badge color="red" text-color="white" floating>
              8
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
        </div>
        <div class="self-stretch row no-wrap">
          <q-btn-dropdown flat no-caps stretch auto-close >
            <template v-slot:label>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column" style="min-width: 200px;">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                  @click="logout"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="256"
      content-class="MAIN__left-drawer"
    >
      <div class="absolute-top layout-drawer-toolbar bg-primary">
        <q-toolbar-title shrink class="q-toolbar row no-wrap items-center" >
          <img class="q-ml-xs" style="height: 38px;" src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          <span class="q-ml-sm text-white text-bold">Quasar Admin UIPro</span>
        </q-toolbar-title>
        <div class="layout-drawer-toolbar__shadow absolute-full overflow-hidden no-pointer-events"></div>
      </div>
      <q-scroll-area style="height: calc(100% - 50px); margin-top: 50px">
      <div class="row justify-center q-my-lg">
        <q-btn
          type="a"
          href="https://donate.quasar.dev"
          target="_blank"
          rel="noopener"
          size="13px"
          color="primary"
          label="Quasar Admin Gitee"
        />
      </div>
        <q-app-menu/>
      </q-scroll-area>

    </q-drawer>
    <q-page-container class="MAIN__page">
      <!-- <div class="MAIN__page-view-nav" v-if="$q.screen.gt.xs">
        <q-scroll-area class="fit">
          <div class="column">
            <q-btn dense flat color="grey-8" no-caps size="26px" class="MAIN__side-btn" to="/">
              <q-icon size="22px" name="photo" />
              <q-tooltip anchor="center right" self="center left" transition-show="fade">Photo</q-tooltip>
            </q-btn>

            <q-btn dense flat color="grey-8" no-caps size="26px" class="MAIN__side-btn" to="/ecs/dashboard">
              <q-icon size="22px" name="collections_bookmark" />
              <q-tooltip anchor="center right" self="center left" transition-show="fade">云服务器ECS</q-tooltip>
            </q-btn>

            <q-btn dense flat color="grey-8" no-caps size="26px" class="MAIN__side-btn">
              <q-icon size="22px" name="assistant" />
              <q-tooltip anchor="center right" self="center left" transition-show="fade">Assistant</q-tooltip>
            </q-btn>

            <q-btn dense flat color="grey-8" no-caps size="26px" class="MAIN__side-btn">
              <q-icon size="22px" name="group" />
              <q-tooltip anchor="center right" self="center left" transition-show="fade">Group</q-tooltip>
            </q-btn>

            <q-btn dense flat color="grey-8" no-caps size="26px" class="MAIN__side-btn" to="/events">
              <q-icon size="22px" name="import_contacts" />
              <q-tooltip anchor="center right" self="center left" transition-show="fade">列表页面</q-tooltip>
            </q-btn>
          </div>
        </q-scroll-area>
      </div> -->
      <div class="MAIN__page-content">
        <div class="MAIN__page-container">
          <router-view class="router-view"/>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  // components: {
  //   EssentialLink
  // },
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      storage: 0.26,
      mobileData: false,
      bluetooth: true,
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('session/logout').then(() => {
        // const params = { redirect: this.$route.query.redirect || '/' }
        // this.$router.push({ path: params.redirect })
        this.$router.push({ name: 'user-login' })
      })
    }
  }
}
</script>
<style lang="sass">
.MAIN
  &__toolbar
    height: 50px
  &__side-btn
    border-radius: 0
    &__label
      font-size: 12px
      line-height: 18px
      letter-spacing: .01785714em
      font-weight: 500
  &__left-drawer
    overflow: inherit !important;
  &__page
    flex: auto 1 1;
    height: 100%;
    display: flex;
    overflow: hidden;
    &-view-nav
      background: #fff;
      border-right: 1px solid rgba(black, 0.1);
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      width: 56px;
    &-content
      flex: auto 1 1;
      width: 0;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    &-container
      height: 100%;
.router-view
  flex: 1;
  height: 0;
.layout-drawer-toolbar
  height: 50px;
  margin-right: -1px
  &__shadow
    bottom: -10px
    &:after
      content: ''
      position: absolute
      top: 0
      right: 0
      bottom: 10px
      left: 0
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2), 0 0px 10px rgba(0, 0, 0, 0.24)
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="MAIN__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title shrink class="row items-center no-wrap" >
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">
          <span class="q-ml-sm" v-if="$q.screen.gt.sm">Quasar Element Pro</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat icon="notifications" v-if="$q.screen.gt.sm">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container class="MAIN__page">
      <div class="MAIN__page-view-nav">
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
      </div>
      <div class="MAIN__page-content">
        <div class="MAIN__page-container">
          <router-view class="router-view"/>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      storage: 0.26,
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
  }
}
</script>
<style lang="sass" scoped>
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
</style>

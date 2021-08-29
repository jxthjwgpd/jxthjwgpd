<template>
  <q-layout view="hHh LpR lfr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->

        <q-toolbar-title shrink class="row items-center no-wrap">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <span class="q-ml-sm" v-if="$q.screen.gt.sm">Quasar Admin</span>
        </q-toolbar-title>

        <q-tabs inline-label align="left">
          <q-route-tab label="总览" to="dashboard"/>
          <q-route-tab label="短信" to="lists"/>
          <q-route-tab label="安全设置" to="events"/>
        </q-tabs>
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
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="left" side="left" width="256" mini-width="56" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
      <q-settings />
    </q-drawer>

    <q-page-container>
      <router-view class="router-view"/>
    </q-page-container>

    <q-footer elevated v-if="false">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="md">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('session/logout').then(() => {
        this.$router.push({ name: 'user-login' })
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.router-view
  flex: 1;
  height: 0;
</style>

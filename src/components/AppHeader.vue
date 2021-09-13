<template>
<div>
<q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
    <q-btn dense flat round icon="menu"  v-if="!$q.screen.gt.xs"/>

    <q-toolbar-title shrink class="row items-center no-wrap" v-if="$q.screen.gt.xs">
        <q-avatar>
        <img src="statics/icons/favicon-96x96.png">
        </q-avatar>
        <span class="q-ml-sm" v-if="$q.screen.gt.sm"><span class="text-weight-bold">Quasar</span> Admin</span>
    </q-toolbar-title>
    <slot />
    <q-space />
    <div class="q-gutter-sm row items-center no-wrap q-mr-sm">
        <q-btn round dense flat icon="emoji_food_beverage" v-if="$q.screen.gt.xs" @click="toolbar=!toolbar">
        <q-tooltip>喝杯茶吧</q-tooltip>
        </q-btn>
        <q-btn round dense flat icon="notifications" v-if="$q.screen.gt.xs" >
        <q-badge color="red" text-color="white" floating>
            8
        </q-badge>
        <q-tooltip>Notifications</q-tooltip>
        </q-btn>
        <!-- <q-btn round dense flat :icon="$q.dark.isActive ? 'brightness_4' : 'brightness_5'" v-if="$q.screen.gt.xs" @click="$q.dark.toggle()">
        <q-tooltip>Notifications</q-tooltip>
        </q-btn> -->
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
    <q-btn dense flat round :icon="`${!right?'menu':'close'}`" @click="right = !right" v-if="$q.screen.gt.xs"/>
    </q-toolbar>

</q-header>
<q-drawer v-model="right" side="right" overlay bordered>
    <!-- drawer content -->
    <q-settings />
</q-drawer>

<q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="statics/icons/favicon-96x96.png">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Quasar</span> Admin</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="flex column items-center">
        <img src="statics/pay/wechat-pay1.jpeg" height="200"/>
        <div class="q-pa-md text-blue">谢谢鼓励！</div>
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      toolbar: false,
      right: false,
      mobileData: false,
      bluetooth: true
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
</style>

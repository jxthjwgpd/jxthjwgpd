<template>
  <q-header
    elevated
    class="bg-primary text-white my-header"
    height-hint="98"
  >
    <q-toolbar>
      <!-- <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
          v-if="!$q.screen.gt.xs"
        /> -->
      <q-avatar class="q-logo">
        <img src="~assets/logo.svg" />
      </q-avatar>
      <q-toolbar-title
        shrink
        class="text-bold logo-text-primary"
      >
        大唐西市
        <span
          class="q-ml-xs"
          style="letter-spacing: 0.1em;font-size:12px;font-weight:500;"
        >CLOUD PRO5</span>
      </q-toolbar-title>
      <q-tabs
        dense
        narrow-indicator
        shrink
        align="left"
        v-if="$q.screen.gt.xs"
      >
        <q-route-tab
          :ripple="false"
          v-for="item in menuData"
          :key="item.id"
          :label="item.name"
          :to="item.path"
        />
      </q-tabs>
      <q-space />
      <!-- <div class="q-gutter-sm row items-center no-wrap q-mr-sm"> -->
      <q-tabs
        align="right"
        indicator-color="transparent"
      >
        <q-tab
          name="notifications"
          icon="notifications"
          v-if="$q.screen.gt.sm"
        >
          <q-badge
            color="red"
            floating
          >{{itemsMenu.length}}</q-badge>
          <q-tooltip class="bg-blue">通知</q-tooltip>
          <q-menu
            fit
            anchor="bottom left"
            self="top middle"
            :offset="[93, 0]"
            @show="scrollTarget = $refs.scrollTargetRef"
          >
            <q-item-label header>
              我的消息
            </q-item-label>
            <q-list
              ref="scrollTargetRef"
              class="scroll"
              style="max-height: 250px; width:300px;"
            >
              <q-infinite-scroll
                @load="onLoadMenu"
                :offset="250"
                :scroll-target="scrollTarget"
              >

                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in itemsMenu"
                  :key="index"
                >
                  <!-- <q-item-section>
                      <q-item-label>Content filtering {{ index + 1 }}</q-item-label>
                      <q-item-label caption>
                        Set the content filtering level to restrict
                        apps that can be downloaded
                      </q-item-label>
                    </q-item-section> -->
                  <q-item-section avatar>
                    <q-avatar
                      color="primary"
                      text-color="white"
                    >
                      R{{ index + 1 }}
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Ruddy Jedrzej {{ index + 1 }}</q-item-label>
                    <q-item-label
                      caption
                      lines="1"
                    >rjedrzej0@discuz{{ index + 1 }}.net</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-icon
                      name="chat_bubble"
                      color="green"
                    />
                  </q-item-section>
                </q-item>

                <template v-slot:loading>
                  <div class="text-center q-my-md">
                    <q-spinner-dots
                      color="primary"
                      size="40px"
                    />
                  </div>
                </template>
              </q-infinite-scroll>
            </q-list>
          </q-menu>

        </q-tab>
        <!-- <q-tab
          name="emoji_food_beverage"
          icon="emoji_food_beverage"
          v-if="$q.screen.gt.xs"
          @click="toolbar=!toolbar"
        >
        </q-tab> -->
        <q-btn-dropdown
          flat
          no-caps
          stretch
          auto-close
        >
          <template v-slot:label>
            <q-avatar size="26px">
              <img src="statics/user1.jpg">
            </q-avatar>
          </template>
          <div class="row no-wrap q-pa-md">
            <div
              class="column"
              style="min-width: 200px;"
            >
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle
                dense
                v-model="mobileData"
                label="Use Mobile Data"
              />
              <q-toggle
                dense
                v-model="bluetooth"
                label="Bluetooth"
                class="q-mt-md"
              />
              <div class="q-mt-md">
                <q-brand-color />
              </div>
            </div>

            <q-separator
              vertical
              inset
              class="q-mx-lg"
            />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="statics/user1.jpg">
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{this.$q.sessionStorage.getItem('username')||'John Doe'}}</div>

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
        <!-- <q-tab
          name="menu"
          :icon="`${!right?'menu':'close'}`"
          v-if="$q.screen.gt.xs"
          @click="right = !right"
        >
        </q-tab> -->
      </q-tabs>
    </q-toolbar>

    <!-- <q-drawer
      v-model="right"
      side="right"
      overlay
      bordered
    >
      <q-settings />
    </q-drawer> -->
    <!-- <q-dialog v-model="toolbar">
      <q-card class="wd-500">
        <img src="statics/index.jpg">

        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon
                color="primary"
                name="local_bar"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>Bar XYZ</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon
                color="red"
                name="local_gas_station"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>Gas Station</q-item-label>
              <q-item-label caption>Fill your gas tank.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon
                color="amber"
                name="local_movies"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>Cinema XYZ</q-item-label>
              <q-item-label caption>Watch a movie.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog> -->
  </q-header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    menuData: {
      default: () => { }, type: Array
    }
  },
  data () {
    return {
      toolbar: false,
      right: false,
      mobileData: false,
      bluetooth: true,
      scrollTarget: void 0,
      itemsMenu: [{}, {}, {}, {}, {}, {}, {}]
    }
  },
  mounted () {
    // const { setBrand } = colors
    // setBrand('primary', this.)
  },
  methods: {
    onLoadMenu (index, done) {
      if (index > 1) {
        setTimeout(() => {
          if (this.itemsMenu) {
            this.itemsMenu.push({}, {}, {}, {}, {}, {}, {})
            done()
          }
        }, 2000)
      } else {
        setTimeout(() => {
          done()
        }, 200)
      }
    },
    logout () {
      this.$store.dispatch('session/logout').then(() => {
        this.$router.push({ name: 'user-login' })
      })
    }
  }
}
</script>

<style lang="sass">
.my-header
  // background: linear-gradient(145deg,$primary 11%,$primary 75%) !important
.q-logo
  img
    transform: rotate(0deg)
    transition: transform .8s ease-in-out
  &:hover img
    transform: rotate(-360deg)
.q-tab__content
  min-width: auto !important
</style>

<template>
  <q-layout class="layout-user-container">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      class="flex items-center justify-between footer"
      v-if="$q.screen.gt.xs"
    >
      <div>
        <span>© 2020 Quasar v{{$q.version}}.</span>
        <span class="q-ml-sm">Created by <a href="https://gitee.com/ruyangit/dashboard">ruyangit</a></span>
      </div>
      <div class="flex q-gutter-xs q-mt-none text-primary">
        <span class="text-bold">中文</span>
        <q-separator vertical />
        <span>英文</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'UserLayout'
}
</script>

<style lang="sass" scoped>
.layout-user-container
  background-image: url("../statics/index.svg");
  background-repeat: no-repeat;
  background-position: center 0px;
  background-size: 100%;
.footer
  font-size: 10px;
  letter-spacing: .3px;
  padding: 15px 25px;
  background-color: #fafbfc;
  color: #637388;
  text-transform: uppercase;
</style>

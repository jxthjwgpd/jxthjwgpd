<template>
  <q-layout>
    <q-page-container><router-view></router-view></q-page-container>
    <q-footer class="flex items-center justify-between footer" v-if="$q.screen.gt.sm">
      <div>
        <span>© 2020 Quasar v{{$q.version}}.</span>
        <span class="q-ml-sm">Created by <a href="https://gitee.com/ruyangit/dashboard">RuYang</a></span>
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
.footer
  font-size: 10px;
  letter-spacing: .3px;
  padding: 15px 25px;
  background-color: #fafbfc;
  color: #637388;
  text-transform: uppercase;
</style>

<template>
  <q-page>
      <q-splitter
      v-model="splitterModel"
      unit="px"
      style="height: 100%"
    >

      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>
        <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="20px" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>
        </div>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      splitterModel: 240
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

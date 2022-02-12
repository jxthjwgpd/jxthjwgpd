<template>
  <q-tr :props="lists">
    <q-td
      key="title"
      :props="lists"
    >
      <q-icon
        color="primary"
        :name="lists.expand ? 'expand_more' : 'chevron_right'"
        @click="lists.expand = !lists.expand"
        class="q-mr-xs"
      />
      {{ lists.row.title|| '-' }}
    </q-td>
    <q-td
      key="requestUri"
      :props="lists"
      class="text--line2-f"
    >{{ lists.row.requestUri }}</q-td>
    <q-td
      key="operation"
      :props="lists"
      class="text--line2-f"
    >{{ lists.row.operation }}</q-td>
    <q-td
      key="createByName"
      :props="lists"
      class="text--line2-f"
    >{{ lists.row.createByName }}</q-td>
    <q-td
      key="isException"
      :props="lists"
      class="text--line2-f"
    >{{ lists.row.isException }}</q-td>
    <q-td
      key="created"
      :props="lists"
    >{{ lists.row.created }}</q-td>
    <q-td
      key="remoteAddr"
      :props="lists"
    >
      {{ lists.row.remoteAddr }}</q-td>
    <q-td
      key="deviceName"
      :props="lists"
    >{{ lists.row.deviceName }}</q-td>
    <q-td
      key="browserName"
      :props="lists"
    >{{ lists.row.browserName }}</q-td>
    <q-td
      key="executeTime"
      :props="lists"
    >{{ lists.row.executeTime || 0 }}</q-td>
  </q-tr>
  <!-- <q-tr
      v-show="lists.expand"
      :props="lists"
    >
      <q-td colspan="100%">
        <div class="text-left">This is expand slot for row above: {{ lists.row.name }}.</div>
      </q-td>
    </q-tr> -->
</template>

<script>
export default {
  name: 'MenuTreeItem',
  props: {
    lists: {}
  }
}
</script>

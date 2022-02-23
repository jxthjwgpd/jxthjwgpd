<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header q-pb-none">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el
            label="系统设置"
            to="/system"
          />
          <q-breadcrumbs-el label="监控指标信息" />
        </q-breadcrumbs>
      </div>
    </div>

    <div class="my-page-body q-pa-sm">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
            <Health />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <CpuCount />
            <q-separator />
            <CpuUsage />

          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <StartTime />
            <q-separator />
            <Uptime />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <JvmMoneyUsed />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <Tangdao />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Health from '../metrics/Health'
import CpuCount from '../metrics/CpuCount'
import CpuUsage from '../metrics/CpuUsage'
import StartTime from '../metrics/StartTime'
import Uptime from '../metrics/Uptime'
import JvmMoneyUsed from '../metrics/JvmMoneyUsed'
import Tangdao from '../metrics/Tangdao'

export default {
  name: 'Metrics',
  components: {
    Health,
    CpuCount,
    CpuUsage,
    StartTime,
    Uptime,
    JvmMoneyUsed,
    Tangdao
  }
}
</script>

<style lang="sass" scoped>

</style>

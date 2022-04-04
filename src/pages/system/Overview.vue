<template>
  <q-page class="my-page">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el label="数据概览" />
        </q-breadcrumbs>
      </div>
    </div>
    <div class="my-page-body q-pa-sm">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card flat>
              <q-card-section>
                <div class="text-h6 row no-wrap items-center">
                  <div class="ellipsis text-capitalize">用户环比</div>
                  <q-space />
                  2020人
                </div>
              </q-card-section>
              <q-card-section>
                <q-linear-progress
                  size="14px"
                  :value="0.25"
                  color="accent"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="accent"
                      :label="(0.25 * 100).toFixed(2) + '%'"
                    />
                  </div>
                </q-linear-progress>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
</style>

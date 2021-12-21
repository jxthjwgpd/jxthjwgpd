<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/fail.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      style="width:200px;"
      label="Go back"
      @click="$router.go(-1)"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

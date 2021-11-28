<template>
  <div class="my-desc-item">
    <p>
      {{title}}
    </p>
    <slot />
  </div>

</template>

<script>
export default {
  name: 'DescItem',
  props: {
    title: String
  }
}
</script>

<style lang="sass" scoped>
.my-desc-item
  color: rgba(0, 0, 0, 0.65)
  p
    margin-right: 8px
    min-width: 100px
    display: inline-block
    color: rgba(0, 0, 0, 0.85)
</style>

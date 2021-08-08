<template>
  <q-page class="row items-center justify-center">
      <div class="login-wrapper">
        <q-form
      @submit="onSubmit"
      @reset="onReset"
      style="min-width: 350px;"
    >
      <q-input
        stack-label :dense="dense"
        v-model="name"
        label="Your name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        stack-label :dense="dense"
        v-model="age"
        label="Your age"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />
      <div class="q-mt-md">
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      name: null,
      age: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

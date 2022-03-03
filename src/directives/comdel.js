import Vue from 'vue'
import axios from 'axios'
export default {
  name: 'comdel',

  bind (el, { value }, vnode) {
    const ctx = {
      handler (evt) {
        if (vnode.context.form) {
          const url = value
          console.log(vnode)
          const form = vnode.context.form
          console.log(form)
          const router = vnode.context.$router
          const _that = Vue.prototype
          _that.$q.dialog({
            // title: _that.$t('dialog.delete.title'),
            // message: _that.$t('dialog.delete.message'),
            cancel: true
          }).onOk(() => {
            // vnode.context.loading = true
            axios.post(url, form).then(response => {
              const { code, message, data } = response.data
              if (code === '200' && data) {
                _that.$q.notify({
                  type: 'positive',
                  message: '删除成功！'
                })
                router.go(-1)
              } else {
                _that.$q.notify({
                  message
                })
              }
            }).catch(error => {
              console.log(error)
            })
          })
          // vnode.context.loading = false
          // console.log(Vue.prototype.$q.dialog({ message: 'test' }))
        }
      }
    }

    if (el.__qcomdelclick !== void 0) {
      el.__qcomdelclick_old = el.__qcomdelclick
    }

    el.__qcomdelclick = ctx

    el.addEventListener('click', ctx.handler)
  },

  update (el, { value, oldValue }) {

  },

  unbind (el) {
    const ctx = el.__qcomdelclick_old || el.__qcomdelclick
    if (ctx !== void 0) {
      el.removeEventListener('click', ctx.handler)
      delete el[el.__qclosepopup_old ? '__qcomdelclick_old' : '__qcomdelclick']
    }
  }
}

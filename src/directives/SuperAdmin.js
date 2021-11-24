export default {
  name: 'super-admin',

  bind (el, { value }, vnode) {
    // if (modifiers.remove) {
    // } else if (modifiers.disable) {
    //   el.style = (value === '1') ? null : null
    // }
    // const ctx = {
    //   depth: getDepth(value),

    //   handler (evt) {
    //     // allow @click to be emitted
    //     ctx.depth !== 0 && setTimeout(() => {
    //       closePortals(vnode.componentInstance || vnode.context, evt, ctx.depth)
    //     })
    //   },

    //   handlerKey (evt) {
    //     isKeyCode(evt, 13) === true && ctx.handler(evt)
    //   }
    // }

    // if (el.__qclosepopup !== void 0) {
    //   el.__qclosepopup_old = el.__qclosepopup
    // }

    // el.__qclosepopup = ctx

    // el.addEventListener('click', ctx.handler)
    // el.addEventListener('keyup', ctx.handlerKey)
  },

  update (el, { value, oldValue }) {
    if (value === '1' && el && el.parentNode) {
      el.parentNode.removeChild(el)
    }

    // if (el.__qclosepopup !== void 0 && value !== oldValue) {
    //   el.__qclosepopup.depth = getDepth(value)
    // }
  },

  unbind (el) {
    // const ctx = el.__qclosepopup_old || el.__qclosepopup
    // if (ctx !== void 0) {
    //   el.removeEventListener('click', ctx.handler)
    //   el.removeEventListener('keyup', ctx.handlerKey)
    //   delete el[el.__qclosepopup_old ? '__qclosepopup_old' : '__qclosepopup']
    // }
  }
}

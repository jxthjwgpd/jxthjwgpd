/**
 * We register all the components so future cli-ui plugins
 * could use them directly
 */

import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context('../components', true, /[a-z0-9]+\.(jsx?|vue)$/i)

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .substr(fileName.lastIndexOf('/') + 1)
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
  // Globally register the component
  Vue.component('Q' + componentName, componentConfig.default || componentConfig)
})

// Vue.directive('super-admin', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el, { value }) {
//     // 聚焦元素

//     el.style = value === '1' ? 'pointer-events：none' : null
//   }
// })

const requireDirective = require.context('../directives', true, /[a-z0-9]+\.(js)$/i)
requireDirective.keys().forEach(fileName => {
  const directiveConfig = requireDirective(fileName)
  // const directiveName = fileName
  //   .substr(fileName.lastIndexOf('/') + 1)
  //   // Remove the file extension from the end
  //   .replace(/\.\w+$/, '')
  // Globally register the directive
  // Vue.component('v' + directiveName, directiveConfig.default || directiveConfig)
  const d = directiveConfig.default || directiveConfig
  // console.log(directiveConfig)
  if (d.name !== undefined && d.unbind !== void 0) {
    Vue.directive(d.name, d)
  }
})

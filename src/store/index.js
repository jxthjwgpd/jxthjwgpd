import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import session from './session'
Vue.use(Vuex)

const modules = {
  session
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  // Automatically run the `init` action if available for every module.
  for (const moduleName of Object.keys(modules)) {
    if (modules[moduleName].actions.init) {
      Store.dispatch(`${moduleName}/init`)
    }
  }

  return Store
}

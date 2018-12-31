import Vue from 'vue'
import VueApollo from 'vue-apollo'

import {apolloClient} from './apolloClient'

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

import base from './base.module';
import user from './user.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    base,
    user
  }
})

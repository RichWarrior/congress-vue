import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import ApiService from '@/common/api.service';
import { setupComponents } from './store/setup.component';
import { CHECK_USER } from './store/action.type';

Vue.config.productionTip = false

ApiService.init();
setupComponents(Vue);

router.beforeEach((to, from, next) => {
  store.dispatch(CHECK_USER);
  const isAuthenticated = store.getters.isAuthenticated;
  const user = store.getters.getUser;
  if (user.profileStatus == 1) {
    if(to.path!=='/Profile'){
      next(false)
      router.push({path:'/Profile'})
    }else{
      next();
    }
  } else {
    if (isAuthenticated) {
      if (to.path === '/') {
        next(false);
      }
      else {
        if(user.profileStatus === 1){
          if(to.path!=='/Profile'){
            next(false);
            router.push({path:'/Profile'})
          }else{
            next();
          }
        }else{
          next();
        }        
      }
    }
    if (!isAuthenticated) {
      if (to.path != '/' &&
        to.path != '/Register' &&
        to.path != '/ForgotPassword' &&
        to.path != '/Home' &&
        to.name != '/ViewEventDetail' &&
        to.name != '/ActivationAccount'
      ) {
        next(false)
      } else {
        next();
      }

    }
  }

})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

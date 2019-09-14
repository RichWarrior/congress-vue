import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme:{
    themes:{
      light:{
        primary:'#DD4B39',
        secondary:'#333333',
      }
    }
  }
});

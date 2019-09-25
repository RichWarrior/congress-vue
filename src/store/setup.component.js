import footer from '@/components/footer';
import sidebar from '@/components/sidebar';
import toolbar from '@/components/toolbar';
import VueSweetAlert2 from 'vue-sweetalert2'
import moment from 'moment';

function setupComponents(Vue){
    Vue.component('cg-footer',footer);
    Vue.component('cg-sidebar',sidebar);
    Vue.component('cg-toolbar',toolbar);
    Vue.use(VueSweetAlert2)
    Vue.use(require('vue-moment'));
    Vue.prototype.moment = moment    
    moment.locale('tr')
}

export{
    setupComponents
}
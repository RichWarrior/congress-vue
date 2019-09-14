import footer from '@/components/footer';
import sidebar from '@/components/sidebar';
import toolbar from '@/components/toolbar';
import VueSweetAlert2 from 'vue-sweetalert2'

function setupComponents(Vue){
    Vue.component('cg-footer',footer);
    Vue.component('cg-sidebar',sidebar);
    Vue.component('cg-toolbar',toolbar);
    Vue.use(VueSweetAlert2)
}

export{
    setupComponents
}
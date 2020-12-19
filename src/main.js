import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './filters'
import VueApexCharts from 'vue-apexcharts'
import '@/util/AxiosInterceptor'

import { Auth0 } from '@/auth/Auth0';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Laue } from 'laue';

Vue.config.productionTip = false;
Vue.prototype.$auth = Auth0();

library.add(fas)
Vue.use(filters);
Vue.use(Laue);
Vue.use(VueApexCharts)
Vue.component('ApexChart', VueApexCharts)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

export const app = new Vue({
    router,
    data() {
        return {
            loading: false,
        }
    },
    render: h => h(App)
}).$mount('#app')

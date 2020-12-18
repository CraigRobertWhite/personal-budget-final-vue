import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/util/AxiosInterceptor'

import { Auth0 } from '@/auth/Auth0';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

library.add(fas)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.prototype.$auth = Auth0();

export const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
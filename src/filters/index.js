import { formatCents, formatDollars } from './currency';

export { formatDollars, formatCents };

export default {
    install(Vue) {
        Vue.filter('formatCents', formatCents);
        Vue.filter('formatDollars', formatDollars);
    }
};

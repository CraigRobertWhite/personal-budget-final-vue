import { formatCents, formatDollars } from './currency';
import { formatISODate, formatDate } from './date'

export { formatDollars, formatCents, formatISODate, formatDate };

export default {
    install(Vue) {
        Vue.filter('formatCents', formatCents);
        Vue.filter('formatDollars', formatDollars);
        Vue.filter('formatISODate', formatISODate);
        Vue.filter('formatDate', formatDate);
    }
};

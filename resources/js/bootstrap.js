import axios from 'axios';
import { Ziggy } from './ziggy';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configurar Ziggy globalmente
window.route = (name, params, absolute, config) => {
    return Ziggy.route(name, params, absolute, config);
};

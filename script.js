import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { timeMachine } from './components.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.3.0/+esm'

const App = createApp({
    setup() {
        return {

        }
    }
})
App.component("timeMachine", timeMachine);
App.mount("#vue_app")
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { timeMachine } from './components.js';
console.log(timeMachine)

const App = createApp({
    setup() {
        return {

        }
    }
})
App.component("timeMachine", timeMachine);
App.mount("#vue_app")
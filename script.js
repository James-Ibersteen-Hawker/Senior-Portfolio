import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { timeMachine, project } from './components.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.3.0/+esm'

const App = createApp({
    async setup() {
        const json = await (await fetch("./projects.json")).json()
        return {
            json
        }
    }
})
App.component("timeMachine", timeMachine);
App.component("project", project);

App.mount("#vue_app")
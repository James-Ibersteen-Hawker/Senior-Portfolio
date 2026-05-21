import { createApp, ref, computed, reactive } from './central.js'
import { timeMachine, project } from './components.js';
import { Fuse } from './central.js'

const App = createApp({
    setup() {
        const data = reactive({ json: null })
        fetch("./projects.json")
            .then(data => data.json())
            .then(json => data.json = json)
            .catch(e => {
                throw new Error(e)
            })
        return {
            data
        }
    }
})
App.component("timeMachine", timeMachine);
App.component("project", project);

App.mount("#vue_app")
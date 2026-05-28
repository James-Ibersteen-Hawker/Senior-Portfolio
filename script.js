import { createApp, ref, computed, reactive } from './central.js'
import { timeMachine, project } from './components.js';
import { Fuse } from './central.js'

function resizeMap() {
    const container = document.querySelector("#controller404");
    const image = document.querySelector("#img404");
    const { innerWidth: Width, innerHeight: Height }  = window;
    const wFactor = Width / image.offsetWidth;
    const hFactor = Height / image.offsetHeight;
    const xTransform = 1 * wFactor;
    const yTransform = 1 * hFactor;
    container.setAttribute("style", `transform: scaleX(${xTransform}) scaleY(${yTransform})`)
}
const App = createApp({
    setup() {
        const data = reactive({ json: null })
        fetch("./projects.json")
            .then(data => data.json())
            .then(json => data.json = json.sort((a, b) => {
                const [aM, aD, aY] = a.creationdate;
                const [bM, bD, bY] = b.creationdate;
                const aDate = new Date(aY, aM - 1, aD);
                const bDate = new Date(bY, bM - 1, bD);
                return aDate - bDate;
            }))
            .catch(e => {
                throw new Error(e)
            })
        if (window.location.href.includes("404.html")) {
            window.addEventListener("DOMContentLoaded", resizeMap);
            window.addEventListener("resize", resizeMap);
        }
        return {
            data
        }
    }
})
App.component("timeMachine", timeMachine);
App.component("project", project);

App.mount("#vue_app")
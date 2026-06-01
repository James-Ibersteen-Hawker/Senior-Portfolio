import { createApp, ref, computed, reactive, watch } from './central.js'
import { timeMachine, project } from './components.js';
import { Fuse } from './central.js'

function resizeMap() {
    const container = document.querySelector("#controller404");
    const image = document.querySelector("#img404");
    const { innerWidth: Width, innerHeight: Height } = window;
    const wFactor = Width / image.offsetWidth;
    const hFactor = Height / image.offsetHeight;
    const xTransform = 1 * wFactor;
    const yTransform = 1 * hFactor;
    container.setAttribute("style", `transform: scaleX(${xTransform}) scaleY(${yTransform})`)
}
const App = createApp({
    setup() {
        let fuse;
        const current = reactive({
            item: null,
            featured: false,
        })
        const original = ref([-1, 9, 7, 2023, 8, 24])
        const goTime = ref([]);
        const today = new Date();
        const day = today.getUTCDate();
        const month = today.getUTCMonth();
        const year = today.getUTCFullYear();
        const hour = today.getHours();
        const minutes = today.getMinutes();
        const now = ref([1, month + 1, day, year, hour, minutes]);
        const data = reactive({ json: null })
        const query = ref("");
        const list = ref([]);
        fetch("./projects.json")
            .then(data => data.json())
            .then(json => {
                data.json = json.sort((a, b) => {
                    const [aM, aD, aY] = a.creationdate;
                    const [bM, bD, bY] = b.creationdate;
                    const aDate = new Date(aY, aM - 1, aD);
                    const bDate = new Date(bY, bM - 1, bD);
                    return aDate - bDate;
                })
                list.value = data.json;
                fuse = new Fuse(json, {
                    keys: ["name", "description"],
                    threshold: 0.4,
                    ignoreLocation: true,
                    ignoreDiacritics: true
                })
            })
            .catch(e => {
                throw new Error(e)
            })
        if (window.location.href.includes("404.html")) {
            window.addEventListener("DOMContentLoaded", resizeMap);
            window.addEventListener("resize", resizeMap);
        }
        watch(query, (newval, oldval) => {
            if (!fuse || !query) {
                list.value = data.json;
            }
            const results = fuse.search(newval);
            list.value = results.map(e => e.item);
        })
        function select(i) {
            const projectModal = new bootstrap.Modal(document.querySelector("#projectModal"));
            const video = document.querySelector("#timewarp")
            const selected = list.value[i];
            current.item = selected;
            current.featured = false;
            if (selected.featuredDesc && selected.featuredDesc !== "") current.featured = true;
            const overlay = document.querySelector(".timeMachineOverlay");
            overlay.classList.add("fadein");
            const [mm, dd, yyyy] = current.item.creationdate;
            goTime.value = [1, mm, dd, yyyy, 12, 0]
            setTimeout(() => {
                video.classList.add("videoActivate");
                video.play();
            }, 1000);
            setTimeout(() => {
                projectModal.show();
            }, 2000);
            setTimeout(() => {
                video.pause();
                video.classList.remove("videoActivate")
                video.currentTime = 0;
                overlay.classList.remove("fadein");
            }, 4100)
        }
        return {
            data, query, list, select, goTime, now, original, current
        }
    }
})
App.component("timeMachine", timeMachine);
App.component("project", project);

App.mount("#vue_app")
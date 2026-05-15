import { computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
export const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
]
export const hours = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "120",
]
const circuits = {
    props: {
        section: {type: String, default: "been"},
        mm: {type: Number, default: 0},
        dd: {type: String, default: "01"},
        yyyy: {type: String, default: "0000"},
        hr: {type: Number, default: 0},
        min: {type: Number, default: 0},
    },
    emits: [],
    setup(props, {emit}) {
        const numbers = (l) => `${"8".repeat(l)}`
        const label = (time) => ["Destination Time", "Arrival Time", "Last Time Departed"].at(time)
        const zero = (length, num) => {
            if (num === 0) return '00';
            if (num.toString().length < length) return `${"0".repeat(length - num.toString().length)}${num}`
            else return num.toString();
        }
        const mm = computed(() => months[props.mm]);
        const dd = computed(() => props.dd.toString());
        const yyyy = computed(() => props.yyyy.toString());
        const hr = computed(() => zero(2, props.hr % 24));
        const min = computed(() => zero(2, props.min % 60));
        const ampm = computed(() => props.hr >= 12 ? true : false);
        return { mm, dd, yyyy, hr, min, section: props.section, ampm, numbers, label }
    },
    template: `
    <div class="circuit" :class="{'going': section === 1, 'are': section === 0, 'been': section === -1}">
        <div class="boxes">
          <div id="month" class="box" style="--name: 'month';">
            <span :style="{'--value':  ' + mm + '}">{{numbers(mm.length)}}</span>
          </div>
          <div id="day" class="box" style="--name: 'day';">
            <span :style="{'--value': ' + dd + '}">{{numbers(dd.length)}}</span>
          </div>
          <div id="year" class="box" style="--name: 'year';">
            <span :style="{'--value': ' + yyyy + '}">{{numbers(yyyy.length)}}</span>
          </div>
          <div class="ampm">
            <div class="am" style="--label: 'am'" :class="{'on': !ampm}"></div>
            <div class="pm" style="--label: 'pm'" :class="{'on': ampm}"></div>
          </div>
          <div id="hour" class="box" style="--name: 'hour';">
            <span :style="{'--value':  ' + hr + '}">{{numbers(hr.length)}}</span>
          </div>
          <div class="dots"></div>
          <div id="min" class="box" style="--name: 'min';">
            <span :style="{'--value':  ' + min + '}">{{numbers(min.length)}}</span>
          </div>
        </div>
        <div class="label">
          {{label(section)}}
        </div>
      </div>
    `
}
export const timeMachine = {
    props: {},
    emits: [],
    setup(props, {emit}) {
    },
    template: `#time_machine_template`,
    components: {
      'circuit': circuits
    }
}

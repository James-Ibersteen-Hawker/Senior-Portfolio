import { computed, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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
function zero(length, num) {
  if (num === 0) return '00';
  if (num.toString().length < length) return `${"0".repeat(length - num.toString().length)}${num}`
  else return num.toString();
}
const circuits = {
  props: {
    section: { type: String, default: "been" },
    mm: { type: Number, default: 0 },
    dd: { type: Number, default: "1" },
    yyyy: { type: String, default: "0000" },
    hr: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
  },
  emits: [],
  setup(props, { emit }) {
    const numbers = (l) => `${"8".repeat(l)}`
    const label = (time) => ["Destination Time", "Arrival Time", "Last Time Departed"].at(time)
    const mm = computed(() => `'${months[props.mm - 1]}'`);
    const dd = computed(() => `'${zero(2, props.dd)}'`);
    const yyyy = computed(() => `'${props.yyyy.toString()}'`);
    const hr = computed(() => `'${zero(2, props.hr % 24)}'`);
    const min = computed(() => `'${zero(2, props.min % 60)}'`);
    const ampm = computed(() => props.hr >= 12 ? true : false);
    return { mm, dd, yyyy, hr, min, section: props.section, ampm, numbers, label }
  },
  template: `
    <div class="circuit" :class="{'going': section === 1, 'are': section === 0, 'been': section === -1}">
        <div class="boxes">
          <div id="month" class="box" style="--name: 'month';">
            <span :style="{'--value': mm}">{{numbers(mm.length - 2)}}</span>
          </div>
          <div id="day" class="box" style="--name: 'day';">
            <span :style="{'--value': dd}">{{numbers(dd.length - 2)}}</span>
          </div>
          <div id="year" class="box" style="--name: 'year';">
            <span :style="{'--value': yyyy}">{{numbers(yyyy.length - 2)}}</span>
          </div>
          <div class="ampm">
            <div class="am" style="--label: 'am'" :class="{'on': !ampm}"></div>
            <div class="pm" style="--label: 'pm'" :class="{'on': ampm}"></div>
          </div>
          <div id="hour" class="box" style="--name: 'hour';">
            <span :style="{'--value':  hr}">{{numbers(hr.length - 2)}}</span>
          </div>
          <div class="dots"></div>
          <div id="min" class="box" style="--name: 'min';">
            <span :style="{'--value':  min}">{{numbers(min.length - 2)}}</span>
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
  setup(props, { emit }) {
    const num = ref(0);
    let upInterval;
    const speed = computed(() => `${zero(2, num.value)}`)
    function up() {
      upInterval = setInterval(() => {
        if (num.value < 88) num.value++;
        else clearInterval(upInterval);
      }, 100);
    }
    return { up, speed: speed, num }
  },
  template: document.getElementById('time_machine_template').innerHTML,
  components: {
    'circuit': circuits
  }
}

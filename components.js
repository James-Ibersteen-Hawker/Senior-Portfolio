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
        return {
            mm: months[props.mm],
            dd: props.dd.toString(),
            yyyy: props.yyyy.toString(),
            hr: zero(2, props.hr % 24),
            min: zero(2, props.min % 60),
            section: props.section,
            ampm: props.hr >= 12 ? true : false,
            numbers,
            label,
        }
    },
    template: `#circuit_template`
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

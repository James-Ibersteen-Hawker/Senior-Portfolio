const circuits = {
    props: {},
    emits: [],
    setup(props, {emit}) {
        return {
            mm: "OCT",
            dd: "26",
            yyyy: "1985",
            hr: "01",
            min: "21",
            name: "Destination Time"
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

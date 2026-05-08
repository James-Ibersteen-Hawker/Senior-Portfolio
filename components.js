const circuits = {
    props: {},
    emits: [],
    setup(props, {emit}) {
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
      // Local registration: key is the tag name, value is the component object
      'circuit': circuits
    }
}

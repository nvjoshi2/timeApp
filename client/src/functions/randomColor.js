
const randomColor = () => {
    const colors = [
        // '#cf4444',
        // '#3b79e3',
        // '#3be3dd',
        // '#3be389',
        // '#43e33b',
        // '#e3e33b',
        // '#e38f3b',

        '#fa9bf4',
        '#e62222',
        '#0cf5ca',
        '#f3ff47'

    ]
    var randColor = colors[Math.floor(Math.random() * colors.length)]
    return randColor;
}

export default randomColor;
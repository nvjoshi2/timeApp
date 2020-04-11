const convertMsToString = (ms) => {
    // 1- Convert to s:
    var s = ms / 1000;
    // 2- Extract h:
    var h = parseInt( s / 3600 ); // 3,600 s in 1 hour
    s = s % 3600; // s remaining after extracting h
    // 3- Extract m:
    var m = parseInt( s / 60 ); // 60 s in 1 minute
    // 4- Keep only s not extracted to m:
    s = parseInt(s % 60);
    // const h = String(parseInt( ms / (3600 * 1000) ))

    // ms = ms % (3600 * 1000)

    // const m = String(parseInt( ms / (60 * 1000) ))

    // ms = ms % (60 * 1000);
    if (h < 10) {
        h = `0${h}:`;
    }
    if (m < 10) {
        m = `0${m}`;
    }
    if (s < 10) {
        s = `0${s}`;
    }

    return `${h}${m}:${s}`;
}

export default convertMsToString;
module.exports = (exclude_file) => {

    const excludes = ['Caller.js', exclude_file]

    const s = (new Error ('?')).stack
        .split (/[\n\r]+/)
        .slice (1)
        .find (line => !excludes.some(f => line.includes(f)))

    if (!s) return

    const i1_open  = s.indexOf('(')
    const i1_close = s.indexOf(')')
    const i2_open  = s.lastIndexOf('(')
    const i2_close = s.lastIndexOf(')')

    if (i1_open !== -1 && i1_close > i1_open && i1_open === i2_open && i1_close === i2_close) {
        return s.slice(i1_open + 1, i1_close)
    }

}
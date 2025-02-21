{

	const off = (new Date ()).getTimezoneOffset (), lag = off * 60000

	const TZ_HH_MM =
		(off > 0 ? '-' : '+') +
		(new Date (2000, 1, 1, 0, -2 * off, 0))
			.toJSON ()      // 2000-02-01T03:00:00.000Z in MSK
			.slice (11, 16)	// 03:00

	Date.prototype.toISOZString = Date.prototype.toISOString

	Date.prototype.toISOString = function () {
	
		return (new Date (this.getTime () - lag)) // Greenwich date with time like local one

			.toISOZString ().substr (0, 23)       // YYYY-MM-DDThh:mm:ss.iii

			+ TZ_HH_MM                            // with our TZ suffix appended

	}

}

{

	const console_log = console.log

	console.log = function () {

		let a = [new Date ().toISOString ()]

		for (let i of arguments)
			if (a.length == 1 && typeof i == 'string' && i.indexOf ('%s') > -1)
				a [0] += ' ' + i; else a.push (i)

		console_log.apply (console, a)

	}

}

global.clone = (o) => {
	if (typeof o != 'object') return o
    return JSON.parse (JSON.stringify (o))
}

global.darn = (o) => {
    console.log (o)
    return (o)
}

global.suicide = (x) => {
    darn ('[ERROR] ' + x)
    process.exit (1)
}

global.not_off = (i) => !i.off

global.dt_iso = (dt) => {
	let ymd = dt.substr (0, 10).split (/\D/)
	if (ymd [0].length == 2) ymd.reverse ()
	return ymd.join ('-')
}

global.ZERO_UUID = '00000000-0000-0000-0000-000000000000'

const CH_MINUS = '-'.charCodeAt (0)

const CH_0     = '0'.charCodeAt (0)
const CH_9     = '9'.charCodeAt (0)

const CH_AU    = 'A'.charCodeAt (0)
const CH_FU    = 'F'.charCodeAt (0)

const CH_AL    = 'a'.charCodeAt (0)
const CH_FL    = 'f'.charCodeAt (0)

const UUID_LEN = 36

global.is_uuid = s => {

	if (typeof s !== 'string' || s.length !== UUID_LEN) return false
	
	for (let i = 0; i < UUID_LEN; i ++) {

		const c = s.charCodeAt (i); switch (i) {
			case 8:
			case 13:
			case 18:
			case 23:
				if (c === CH_MINUS) break
				return false
			default:
				if (c <  CH_0) return false
				if (c <= CH_9) break
				if (c <  CH_AU) return false
				if (c <= CH_FU) break
				if (c <  CH_AL) return false
				if (c <= CH_FL) break
				return false
		}

	}

	return true

}
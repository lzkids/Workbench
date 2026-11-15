// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-gcode.min.js
Prism.languages.gcode = {
	comment: /;.*|\B\(.*?\)\B/,
	string: {
		pattern: /"(?:""|[^"])*"/,
		greedy: !0
	},
	keyword: /\b[GM]\d+(?:\.\d+)?\b/,
	property: /\b[A-Z]/,
	checksum: {
		pattern: /(\*)\d+/,
		lookbehind: !0,
		alias: "number"
	},
	punctuation: /[:*]/
};

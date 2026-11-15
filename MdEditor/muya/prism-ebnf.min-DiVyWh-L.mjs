// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-ebnf.min.js
Prism.languages.ebnf = {
	comment: /\(\*[\s\S]*?\*\)/,
	string: {
		pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
		greedy: !0
	},
	special: {
		pattern: /\?[^?\r\n]*\?/,
		greedy: !0,
		alias: "class-name"
	},
	definition: {
		pattern: /^([\t ]*)[a-z]\w*(?:[ \t]+[a-z]\w*)*(?=\s*=)/im,
		lookbehind: !0,
		alias: ["rule", "keyword"]
	},
	rule: /\b[a-z]\w*(?:[ \t]+[a-z]\w*)*\b/i,
	punctuation: /\([:/]|[:/]\)|[.,;()[\]{}]/,
	operator: /[-=|*/!]/
};

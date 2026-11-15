// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-arff.min.js
Prism.languages.arff = {
	comment: /%.*/,
	string: {
		pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	keyword: /@(?:attribute|data|end|relation)\b/i,
	number: /\b\d+(?:\.\d+)?\b/,
	punctuation: /[{},]/
};

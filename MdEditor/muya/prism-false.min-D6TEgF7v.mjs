// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-false.min.js
(function(e) {
	e.languages.false = {
		comment: { pattern: /\{[^}]*\}/ },
		string: {
			pattern: /"[^"]*"/,
			greedy: !0
		},
		"character-code": {
			pattern: /'(?:[^\r]|\r\n?)/,
			alias: "number"
		},
		"assembler-code": {
			pattern: /\d+`/,
			alias: "important"
		},
		number: /\d+/,
		operator: /[-!#$%&'*+,./:;=>?@\\^_`|~ßø]/,
		punctuation: /\[|\]/,
		variable: /[a-z]/,
		"non-standard": {
			pattern: /[()<BDO®]/,
			alias: "bold"
		}
	};
})(Prism);

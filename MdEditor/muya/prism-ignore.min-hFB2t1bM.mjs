// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-ignore.min.js
(function(e) {
	e.languages.ignore = {
		comment: /^#.*/m,
		entry: {
			pattern: /\S(?:.*(?:(?:\\ )|\S))?/,
			alias: "string",
			inside: {
				operator: /^!|\*\*?|\?/,
				regex: {
					pattern: /(^|[^\\])\[[^\[\]]*\]/,
					lookbehind: !0
				},
				punctuation: /\//
			}
		}
	}, e.languages.gitignore = e.languages.ignore, e.languages.hgignore = e.languages.ignore, e.languages.npmignore = e.languages.ignore;
})(Prism);

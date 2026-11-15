// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-bnf.min.js
Prism.languages.bnf = {
	string: { pattern: /"[^\r\n"]*"|'[^\r\n']*'/ },
	definition: {
		pattern: /<[^<>\r\n\t]+>(?=\s*::=)/,
		alias: ["rule", "keyword"],
		inside: { punctuation: /^<|>$/ }
	},
	rule: {
		pattern: /<[^<>\r\n\t]+>/,
		inside: { punctuation: /^<|>$/ }
	},
	operator: /::=|[|()[\]{}*+?]|\.{3}/
}, Prism.languages.rbnf = Prism.languages.bnf;

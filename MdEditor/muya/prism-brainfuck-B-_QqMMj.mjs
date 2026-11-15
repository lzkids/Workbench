// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-brainfuck.js
Prism.languages.brainfuck = {
	pointer: {
		pattern: /<|>/,
		alias: "keyword"
	},
	increment: {
		pattern: /\+/,
		alias: "inserted"
	},
	decrement: {
		pattern: /-/,
		alias: "deleted"
	},
	branching: {
		pattern: /\[|\]/,
		alias: "important"
	},
	operator: /[.,]/,
	comment: /\S+/
};

// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-yang.min.js
Prism.languages.yang = {
	comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
	string: {
		pattern: /"(?:[^\\"]|\\.)*"|'[^']*'/,
		greedy: !0
	},
	keyword: {
		pattern: /(^|[{};\r\n][ \t]*)[a-z_][\w.-]*/i,
		lookbehind: !0
	},
	namespace: {
		pattern: /(\s)[a-z_][\w.-]*(?=:)/i,
		lookbehind: !0
	},
	boolean: /\b(?:false|true)\b/,
	operator: /\+/,
	punctuation: /[{};:]/
};

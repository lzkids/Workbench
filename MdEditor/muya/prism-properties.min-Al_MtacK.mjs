// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-properties.min.js
Prism.languages.properties = {
	comment: /^[ \t]*[#!].*$/m,
	value: {
		pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
		lookbehind: !0,
		alias: "attr-value"
	},
	key: {
		pattern: /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?= *[=:]| )/m,
		alias: "attr-name"
	},
	punctuation: /[=:]/
};

// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-less.min.js
Prism.languages.less = Prism.languages.extend("css", {
	comment: [/\/\*[\s\S]*?\*\//, {
		pattern: /(^|[^\\])\/\/.*/,
		lookbehind: !0
	}],
	atrule: {
		pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
		inside: { punctuation: /[:()]/ }
	},
	selector: {
		pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
		inside: { variable: /@+[\w-]+/ }
	},
	property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
	operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "property", {
	variable: [{
		pattern: /@[\w-]+\s*:/,
		inside: { punctuation: /:/ }
	}, /@@?[\w-]+/],
	"mixin-usage": {
		pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
		lookbehind: !0,
		alias: "function"
	}
});

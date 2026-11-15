// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-bbcode.min.js
Prism.languages.bbcode = { tag: {
	pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))*\s*\]/,
	inside: {
		tag: {
			pattern: /^\[\/?[^\s=\]]+/,
			inside: { punctuation: /^\[\/?/ }
		},
		"attr-value": {
			pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/,
			inside: { punctuation: [/^=/, {
				pattern: /^(\s*)["']|["']$/,
				lookbehind: !0
			}] }
		},
		punctuation: /\]/,
		"attr-name": /[^\s=\]]+/
	}
} }, Prism.languages.shortcode = Prism.languages.bbcode;

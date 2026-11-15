// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-racket.min.js
Prism.languages.racket = Prism.languages.extend("scheme", { "lambda-parameter": {
	pattern: /([(\[]lambda\s+[(\[])[^()\[\]'\s]+/,
	lookbehind: !0
} }), Prism.languages.insertBefore("racket", "string", { lang: {
	pattern: /^#lang.+/m,
	greedy: !0,
	alias: "keyword"
} }), Prism.languages.rkt = Prism.languages.racket;

// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-etlua.min.js
(function(e) {
	e.languages.etlua = {
		delimiter: {
			pattern: /^<%[-=]?|-?%>$/,
			alias: "punctuation"
		},
		"language-lua": {
			pattern: /[\s\S]+/,
			inside: e.languages.lua
		}
	}, e.hooks.add("before-tokenize", (function(t) {
		e.languages["markup-templating"].buildPlaceholders(t, "etlua", /<%[\s\S]+?%>/g);
	})), e.hooks.add("after-tokenize", (function(t) {
		e.languages["markup-templating"].tokenizePlaceholders(t, "etlua");
	}));
})(Prism);

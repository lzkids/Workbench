// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-dot.min.js
(function(e) {
	var t = { markup: {
		pattern: /(^<)[\s\S]+(?=>$)/,
		lookbehind: !0,
		alias: [
			"language-markup",
			"language-html",
			"language-xml"
		],
		inside: e.languages.markup
	} };
	function n(e, t) {
		return RegExp(e.replace(/<ID>/g, (function() {
			return "(?:[a-zA-Z_\\x80-\\uFFFF][\\w\\x80-\\uFFFF]*|-?(?:\\.\\d+|\\d+(?:\\.\\d*)?)|\"[^\"\\\\]*(?:\\\\[^][^\"\\\\]*)*\"|<(?:[^<>]|(?!<!--)<(?:[^<>\"']|\"[^\"]*\"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>)";
		})), t);
	}
	e.languages.dot = {
		comment: {
			pattern: /\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m,
			greedy: !0
		},
		"graph-name": {
			pattern: n("(\\b(?:digraph|graph|subgraph)[ 	\r\n]+)<ID>", "i"),
			lookbehind: !0,
			greedy: !0,
			alias: "class-name",
			inside: t
		},
		"attr-value": {
			pattern: n("(=[ 	\r\n]*)<ID>"),
			lookbehind: !0,
			greedy: !0,
			inside: t
		},
		"attr-name": {
			pattern: n("([\\[;, 	\r\n])<ID>(?=[ 	\r\n]*=)"),
			lookbehind: !0,
			greedy: !0,
			inside: t
		},
		keyword: /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
		"compass-point": {
			pattern: /(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,
			lookbehind: !0,
			alias: "builtin"
		},
		node: {
			pattern: n("(^|[^-.\\w\\x80-\\uFFFF\\\\])<ID>"),
			lookbehind: !0,
			greedy: !0,
			inside: t
		},
		operator: /[=:]|-[->]/,
		punctuation: /[\[\]{};,]/
	}, e.languages.gv = e.languages.dot;
})(Prism);

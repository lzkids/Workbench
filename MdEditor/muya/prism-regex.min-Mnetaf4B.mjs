// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-regex.min.js
(function(e) {
	var t = {
		pattern: /\\[\\(){}[\]^$+*?|.]/,
		alias: "escape"
	}, n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/, r = "(?:[^\\\\-]|" + n.source + ")", i = RegExp(r + "-" + r), a = {
		pattern: /(<|')[^<>']+(?=[>']$)/,
		lookbehind: !0,
		alias: "variable"
	};
	e.languages.regex = {
		"char-class": {
			pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
			lookbehind: !0,
			inside: {
				"char-class-negation": {
					pattern: /(^\[)\^/,
					lookbehind: !0,
					alias: "operator"
				},
				"char-class-punctuation": {
					pattern: /^\[|\]$/,
					alias: "punctuation"
				},
				range: {
					pattern: i,
					inside: {
						escape: n,
						"range-punctuation": {
							pattern: /-/,
							alias: "operator"
						}
					}
				},
				"special-escape": t,
				"char-set": {
					pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
					alias: "class-name"
				},
				escape: n
			}
		},
		"special-escape": t,
		"char-set": {
			pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
			alias: "class-name"
		},
		backreference: [{
			pattern: /\\(?![123][0-7]{2})[1-9]/,
			alias: "keyword"
		}, {
			pattern: /\\k<[^<>']+>/,
			alias: "keyword",
			inside: { "group-name": a }
		}],
		anchor: {
			pattern: /[$^]|\\[ABbGZz]/,
			alias: "function"
		},
		escape: n,
		group: [{
			pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
			alias: "punctuation",
			inside: { "group-name": a }
		}, {
			pattern: /\)/,
			alias: "punctuation"
		}],
		quantifier: {
			pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
			alias: "number"
		},
		alternation: {
			pattern: /\|/,
			alias: "keyword"
		}
	};
})(Prism);

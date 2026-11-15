// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-naniscript.min.js
(function(e) {
	var t = /\{[^\r\n\[\]{}]*\}/, n = {
		"quoted-string": {
			pattern: /"(?:[^"\\]|\\.)*"/,
			alias: "operator"
		},
		"command-param-id": {
			pattern: /(\s)\w+:/,
			lookbehind: !0,
			alias: "property"
		},
		"command-param-value": [
			{
				pattern: t,
				alias: "selector"
			},
			{
				pattern: /([\t ])\S+/,
				lookbehind: !0,
				greedy: !0,
				alias: "operator"
			},
			{
				pattern: /\S(?:.*\S)?/,
				alias: "operator"
			}
		]
	};
	function r(e) {
		return typeof e == "string" ? e : Array.isArray(e) ? e.map(r).join("") : r(e.content);
	}
	e.languages.naniscript = {
		comment: {
			pattern: /^([\t ]*);.*/m,
			lookbehind: !0
		},
		define: {
			pattern: /^>.+/m,
			alias: "tag",
			inside: {
				value: {
					pattern: /(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/,
					lookbehind: !0,
					alias: "operator"
				},
				key: {
					pattern: /(^>)\w+/,
					lookbehind: !0
				}
			}
		},
		label: {
			pattern: /^([\t ]*)#[\t ]*\w+[\t ]*$/m,
			lookbehind: !0,
			alias: "regex"
		},
		command: {
			pattern: /^([\t ]*)@\w+(?=[\t ]|$).*/m,
			lookbehind: !0,
			alias: "function",
			inside: {
				"command-name": /^@\w+/,
				expression: {
					pattern: t,
					greedy: !0,
					alias: "selector"
				},
				"command-params": {
					pattern: /\s*\S[\s\S]*/,
					inside: n
				}
			}
		},
		"generic-text": {
			pattern: /(^[ \t]*)[^#@>;\s].*/m,
			lookbehind: !0,
			alias: "punctuation",
			inside: {
				"escaped-char": /\\[{}\[\]"]/,
				expression: {
					pattern: t,
					greedy: !0,
					alias: "selector"
				},
				"inline-command": {
					pattern: /\[[\t ]*\w[^\r\n\[\]]*\]/,
					greedy: !0,
					alias: "function",
					inside: {
						"command-params": {
							pattern: /(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/,
							lookbehind: !0,
							inside: n
						},
						"command-param-name": {
							pattern: /^(\[[\t ]*)\w+/,
							lookbehind: !0,
							alias: "name"
						},
						"start-stop-char": /[\[\]]/
					}
				}
			}
		}
	}, e.languages.nani = e.languages.naniscript, e.hooks.add("after-tokenize", (function(e) {
		e.tokens.forEach((function(e) {
			if (typeof e != "string" && e.type === "generic-text") {
				var t = r(e);
				(function(e) {
					for (var t = [], n = 0; n < e.length; n++) {
						var r = e[n], i = "[]{}".indexOf(r);
						if (i !== -1) {
							if (i % 2 == 0) t.push(i + 1);
							else if (t.pop() !== i) return !1;
						}
					}
					return t.length === 0;
				})(t) || (e.type = "bad-line", e.content = t);
			}
		}));
	}));
})(Prism);

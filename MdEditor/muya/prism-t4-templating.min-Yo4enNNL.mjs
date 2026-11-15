// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-t4-templating.min.js
(function(e) {
	function t(e, t, n) {
		return {
			pattern: RegExp("<#" + e + "[\\s\\S]*?#>"),
			alias: "block",
			inside: {
				delimiter: {
					pattern: RegExp("^<#" + e + "|#>$"),
					alias: "important"
				},
				content: {
					pattern: /[\s\S]+/,
					inside: t,
					alias: n
				}
			}
		};
	}
	e.languages["t4-templating"] = Object.defineProperty({}, "createT4", { value: function(n) {
		var r = e.languages[n], i = "language-" + n;
		return { block: {
			pattern: /<#[\s\S]+?#>/,
			inside: {
				directive: t("@", {
					"attr-value": {
						pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,
						inside: { punctuation: /^=|^["']|["']$/ }
					},
					keyword: /\b\w+(?=\s)/,
					"attr-name": /\b\w+/
				}),
				expression: t("=", r, i),
				"class-feature": t("\\+", r, i),
				standard: t("", r, i)
			}
		} };
	} });
})(Prism);

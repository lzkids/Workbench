// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-jsdoc.js
(function(e) {
	var t = e.languages.javascript, n = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})+\\}", r = "(@(?:arg|argument|param|property)\\s+(?:" + n + "\\s+)?)";
	e.languages.jsdoc = e.languages.extend("javadoclike", { parameter: {
		pattern: RegExp(r + "(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)"),
		lookbehind: !0,
		inside: { punctuation: /\./ }
	} }), e.languages.insertBefore("jsdoc", "keyword", {
		"optional-parameter": {
			pattern: RegExp(r + "\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)"),
			lookbehind: !0,
			inside: {
				parameter: {
					pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
					lookbehind: !0,
					inside: { punctuation: /\./ }
				},
				code: {
					pattern: /(=)[\s\S]*(?=\]$)/,
					lookbehind: !0,
					inside: t,
					alias: "language-javascript"
				},
				punctuation: /[=[\]]/
			}
		},
		"class-name": [{
			pattern: RegExp("(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*".replace(/<TYPE>/g, function() {
				return n;
			})),
			lookbehind: !0,
			inside: { punctuation: /\./ }
		}, {
			pattern: RegExp("(@[a-z]+\\s+)" + n),
			lookbehind: !0,
			inside: {
				string: t.string,
				number: t.number,
				boolean: t.boolean,
				keyword: e.languages.typescript.keyword,
				operator: /=>|\.\.\.|[&|?:*]/,
				punctuation: /[.,;=<>{}()[\]]/
			}
		}],
		example: {
			pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
			lookbehind: !0,
			inside: { code: {
				pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m,
				lookbehind: !0,
				inside: t,
				alias: "language-javascript"
			} }
		}
	}), e.languages.javadoclike.addSupport("javascript", e.languages.jsdoc);
})(Prism);

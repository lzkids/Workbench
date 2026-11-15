// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-lilypond.min.js
(function(e) {
	for (var t = "\\((?:[^();\"#\\\\]|\\\\[^]|;.*(?!.)|\"(?:[^\"\\\\]|\\\\.)*\"|#(?:\\{(?:(?!#\\})[^])*#\\}|[^{])|<expr>)*\\)", n = 0; n < 5; n++) t = t.replace(/<expr>/g, (function() {
		return t;
	}));
	t = t.replace(/<expr>/g, "[^\\s\\S]");
	var r = e.languages.lilypond = {
		comment: /%(?:(?!\{).*|\{[\s\S]*?%\})/,
		"embedded-scheme": {
			pattern: RegExp("(^|[=\\s])#(?:\"(?:[^\"\\\\]|\\\\.)*\"|[^\\s()\"]*(?:[^\\s()]|<expr>))".replace(/<expr>/g, (function() {
				return t;
			})), "m"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				scheme: {
					pattern: /^(#)[\s\S]+$/,
					lookbehind: !0,
					alias: "language-scheme",
					inside: {
						"embedded-lilypond": {
							pattern: /#\{[\s\S]*?#\}/,
							greedy: !0,
							inside: {
								punctuation: /^#\{|#\}$/,
								lilypond: {
									pattern: /[\s\S]+/,
									alias: "language-lilypond",
									inside: null
								}
							}
						},
						rest: e.languages.scheme
					}
				},
				punctuation: /#/
			}
		},
		string: {
			pattern: /"(?:[^"\\]|\\.)*"/,
			greedy: !0
		},
		"class-name": {
			pattern: /(\\new\s+)[\w-]+/,
			lookbehind: !0
		},
		keyword: {
			pattern: /\\[a-z][-\w]*/i,
			inside: { punctuation: /^\\/ }
		},
		operator: /[=|]|<<|>>/,
		punctuation: {
			pattern: /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[-+^!>._]|(?=\d))|[_^]\.?|[.!])|[{}()[\]<>^~]|\\[()[\]<>\\!]|--|__/,
			lookbehind: !0
		},
		number: /\b\d+(?:\/\d+)?\b/
	};
	r["embedded-scheme"].inside.scheme.inside["embedded-lilypond"].inside.lilypond.inside = r, e.languages.ly = r;
})(Prism);

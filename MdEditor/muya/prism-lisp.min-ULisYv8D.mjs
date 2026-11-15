// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-lisp.min.js
(function(e) {
	function t(e) {
		return RegExp("(\\()(?:" + e + ")(?=[\\s\\)])");
	}
	function n(e) {
		return RegExp("([\\s([])(?:" + e + ")(?=[\\s)])");
	}
	var r = "(?!\\d)[-+*/~!@$%^=<>{}\\w]+", i = "(\\()", a = "(?:[^()]|\\((?:[^()]|\\((?:[^()]|\\((?:[^()]|\\((?:[^()]|\\([^()]*\\))*\\))*\\))*\\))*\\))*", o = {
		heading: {
			pattern: /;;;.*/,
			alias: ["comment", "title"]
		},
		comment: /;.*/,
		string: {
			pattern: /"(?:[^"\\]|\\.)*"/,
			greedy: !0,
			inside: {
				argument: /[-A-Z]+(?=[.,\s])/,
				symbol: RegExp("`" + r + "'")
			}
		},
		"quoted-symbol": {
			pattern: RegExp("#?'" + r),
			alias: ["variable", "symbol"]
		},
		"lisp-property": {
			pattern: RegExp(":" + r),
			alias: "property"
		},
		splice: {
			pattern: RegExp(",@?" + r),
			alias: ["symbol", "variable"]
		},
		keyword: [{
			pattern: RegExp("(\\()(?:and|(?:cl-)?letf|cl-loop|cond|cons|error|if|(?:lexical-)?let\\*?|message|not|null|or|provide|require|setq|unless|use-package|when|while)(?=\\s)"),
			lookbehind: !0
		}, {
			pattern: RegExp("(\\()(?:append|by|collect|concat|do|finally|for|in|return)(?=\\s)"),
			lookbehind: !0
		}],
		declare: {
			pattern: t("declare"),
			lookbehind: !0,
			alias: "keyword"
		},
		interactive: {
			pattern: t("interactive"),
			lookbehind: !0,
			alias: "keyword"
		},
		boolean: {
			pattern: n("nil|t"),
			lookbehind: !0
		},
		number: {
			pattern: n("[-+]?\\d+(?:\\.\\d*)?"),
			lookbehind: !0
		},
		defvar: {
			pattern: RegExp("(\\()def(?:const|custom|group|var)\\s+" + r),
			lookbehind: !0,
			inside: {
				keyword: /^def[a-z]+/,
				variable: RegExp(r)
			}
		},
		defun: {
			pattern: RegExp("(\\()(?:cl-)?(?:defmacro|defun\\*?)\\s+" + r + "\\s+\\(" + a + "\\)"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				keyword: /^(?:cl-)?def\S+/,
				arguments: null,
				function: {
					pattern: RegExp("(^\\s)" + r),
					lookbehind: !0
				},
				punctuation: /[()]/
			}
		},
		lambda: {
			pattern: RegExp("(\\()lambda\\s+\\(\\s*(?:&?" + r + "(?:\\s+&?" + r + ")*\\s*)?\\)"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				keyword: /^lambda/,
				arguments: null,
				punctuation: /[()]/
			}
		},
		car: {
			pattern: RegExp(i + r),
			lookbehind: !0
		},
		punctuation: [/(?:['`,]?\(|[)\[\]])/, {
			pattern: /(\s)\.(?=\s)/,
			lookbehind: !0
		}]
	}, s = {
		"lisp-marker": RegExp("&(?!\\d)[-+*/~!@$%^=<>{}\\w]+"),
		varform: {
			pattern: RegExp("\\(" + r + "\\s+(?=\\S)" + a + "\\)"),
			inside: o
		},
		argument: {
			pattern: RegExp("(^|[\\s(])" + r),
			lookbehind: !0,
			alias: "variable"
		},
		rest: o
	}, c = "\\S+(?:\\s+\\S+)*", l = {
		pattern: RegExp(i + a + "(?=\\))"),
		lookbehind: !0,
		inside: {
			"rest-vars": {
				pattern: RegExp("&(?:body|rest)\\s+" + c),
				inside: s
			},
			"other-marker-vars": {
				pattern: RegExp("&(?:aux|optional)\\s+" + c),
				inside: s
			},
			keys: {
				pattern: RegExp("&key\\s+" + c + "(?:\\s+&allow-other-keys)?"),
				inside: s
			},
			argument: {
				pattern: RegExp(r),
				alias: "variable"
			},
			punctuation: /[()]/
		}
	};
	o.lambda.inside.arguments = l, o.defun.inside.arguments = e.util.clone(l), o.defun.inside.arguments.inside.sublist = l, e.languages.lisp = o, e.languages.elisp = o, e.languages.emacs = o, e.languages["emacs-lisp"] = o;
})(Prism);

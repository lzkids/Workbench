// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-qsharp.min.js
(function(e) {
	function t(e, t) {
		return e.replace(/<<(\d+)>>/g, (function(e, n) {
			return "(?:" + t[+n] + ")";
		}));
	}
	function n(e, n, r) {
		return RegExp(t(e, n), r || "");
	}
	var r = RegExp("\\b(?:" + "Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within".replace(/ /g, "|") + ")\\b"), i = t("<<0>>(?:\\s*\\.\\s*<<0>>)*", ["\\b[A-Za-z_]\\w*\\b"]), a = {
		keyword: r,
		punctuation: /[<>()?,.:[\]]/
	}, o = "\"(?:\\\\.|[^\\\\\"])*\"";
	e.languages.qsharp = e.languages.extend("clike", {
		comment: /\/\/.*/,
		string: [{
			pattern: n("(^|[^$\\\\])<<0>>", [o]),
			lookbehind: !0,
			greedy: !0
		}],
		"class-name": [{
			pattern: n("(\\b(?:as|open)\\s+)<<0>>(?=\\s*(?:;|as\\b))", [i]),
			lookbehind: !0,
			inside: a
		}, {
			pattern: n("(\\bnamespace\\s+)<<0>>(?=\\s*\\{)", [i]),
			lookbehind: !0,
			inside: a
		}],
		keyword: r,
		number: /(?:\b0(?:x[\da-f]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[-+]?\d+)?)l?\b/i,
		operator: /\band=|\bor=|\band\b|\bnot\b|\bor\b|<[-=]|[-=]>|>>>=?|<<<=?|\^\^\^=?|\|\|\|=?|&&&=?|w\/=?|~~~|[*\/+\-^=!%]=?/,
		punctuation: /::|[{}[\];(),.:]/
	}), e.languages.insertBefore("qsharp", "number", { range: {
		pattern: /\.\./,
		alias: "operator"
	} });
	var s = function(e, t) {
		for (var n = 0; n < 2; n++) e = e.replace(/<<self>>/g, (function() {
			return "(?:" + e + ")";
		}));
		return e.replace(/<<self>>/g, "[^\\s\\S]");
	}(t("\\{(?:[^\"{}]|<<0>>|<<self>>)*\\}", [o]));
	e.languages.insertBefore("qsharp", "string", { "interpolation-string": {
		pattern: n("\\$\"(?:\\\\.|<<0>>|[^\\\\\"{])*\"", [s]),
		greedy: !0,
		inside: {
			interpolation: {
				pattern: n("((?:^|[^\\\\])(?:\\\\\\\\)*)<<0>>", [s]),
				lookbehind: !0,
				inside: {
					punctuation: /^\{|\}$/,
					expression: {
						pattern: /[\s\S]+/,
						alias: "language-qsharp",
						inside: e.languages.qsharp
					}
				}
			},
			string: /[\s\S]+/
		}
	} });
})(Prism), Prism.languages.qs = Prism.languages.qsharp;

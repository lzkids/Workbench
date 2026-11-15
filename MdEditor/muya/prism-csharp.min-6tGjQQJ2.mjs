// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-csharp.min.js
(function(e) {
	function t(e, t) {
		return e.replace(/<<(\d+)>>/g, (function(e, n) {
			return "(?:" + t[+n] + ")";
		}));
	}
	function n(e, n, r) {
		return RegExp(t(e, n), r || "");
	}
	function r(e, t) {
		for (var n = 0; n < t; n++) e = e.replace(/<<self>>/g, (function() {
			return "(?:" + e + ")";
		}));
		return e.replace(/<<self>>/g, "[^\\s\\S]");
	}
	var i = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void", a = "class enum interface record struct", o = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)", s = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
	function c(e) {
		return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b";
	}
	var l = c(a), u = RegExp(c(i + " " + a + " " + o + " " + s)), d = c(a + " " + o + " " + s), f = c(i + " " + a + " " + s), p = r("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2), m = r("\\((?:[^()]|<<self>>)*\\)", 2), h = "@?\\b[A-Za-z_]\\w*\\b", g = t("<<0>>(?:\\s*<<1>>)?", [h, p]), _ = t("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [d, g]), v = "\\[\\s*(?:,\\s*)*\\]", y = t("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [_, v]), b = t("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [
		t("\\(<<0>>+(?:,<<0>>+)+\\)", [t("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [
			p,
			m,
			v
		])]),
		_,
		v
	]), x = {
		keyword: u,
		punctuation: /[<>()?,.:[\]]/
	}, S = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'", C = "\"(?:\\\\.|[^\\\\\"\r\n])*\"";
	e.languages.csharp = e.languages.extend("clike", {
		string: [{
			pattern: n("(^|[^$\\\\])<<0>>", ["@\"(?:\"\"|\\\\[^]|[^\\\\\"])*\"(?!\")"]),
			lookbehind: !0,
			greedy: !0
		}, {
			pattern: n("(^|[^@$\\\\])<<0>>", [C]),
			lookbehind: !0,
			greedy: !0
		}],
		"class-name": [
			{
				pattern: n("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [_]),
				lookbehind: !0,
				inside: x
			},
			{
				pattern: n("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, b]),
				lookbehind: !0,
				inside: x
			},
			{
				pattern: n("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
				lookbehind: !0
			},
			{
				pattern: n("(\\b<<0>>\\s+)<<1>>", [l, g]),
				lookbehind: !0,
				inside: x
			},
			{
				pattern: n("(\\bcatch\\s*\\(\\s*)<<0>>", [_]),
				lookbehind: !0,
				inside: x
			},
			{
				pattern: n("(\\bwhere\\s+)<<0>>", [h]),
				lookbehind: !0
			},
			{
				pattern: n("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
				lookbehind: !0,
				inside: x
			},
			{
				pattern: n("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [
					b,
					f,
					h
				]),
				inside: x
			}
		],
		keyword: u,
		number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
		operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
		punctuation: /\?\.?|::|[{}[\];(),.:]/
	}), e.languages.insertBefore("csharp", "number", { range: {
		pattern: /\.\./,
		alias: "operator"
	} }), e.languages.insertBefore("csharp", "punctuation", { "named-parameter": {
		pattern: n("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
		lookbehind: !0,
		alias: "punctuation"
	} }), e.languages.insertBefore("csharp", "class-name", {
		namespace: {
			pattern: n("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
			lookbehind: !0,
			inside: { punctuation: /\./ }
		},
		"type-expression": {
			pattern: n("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [m]),
			lookbehind: !0,
			alias: "class-name",
			inside: x
		},
		"return-type": {
			pattern: n("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [b, _]),
			inside: x,
			alias: "class-name"
		},
		"constructor-invocation": {
			pattern: n("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [b]),
			lookbehind: !0,
			inside: x,
			alias: "class-name"
		},
		"generic-method": {
			pattern: n("<<0>>\\s*<<1>>(?=\\s*\\()", [h, p]),
			inside: {
				function: n("^<<0>>", [h]),
				generic: {
					pattern: RegExp(p),
					alias: "class-name",
					inside: x
				}
			}
		},
		"type-list": {
			pattern: n("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [
				l,
				g,
				h,
				b,
				u.source,
				m,
				"\\bnew\\s*\\(\\s*\\)"
			]),
			lookbehind: !0,
			inside: {
				"record-arguments": {
					pattern: n("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [g, m]),
					lookbehind: !0,
					greedy: !0,
					inside: e.languages.csharp
				},
				keyword: u,
				"class-name": {
					pattern: RegExp(b),
					greedy: !0,
					inside: x
				},
				punctuation: /[,()]/
			}
		},
		preprocessor: {
			pattern: /(^[\t ]*)#.*/m,
			lookbehind: !0,
			alias: "property",
			inside: { directive: {
				pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
				lookbehind: !0,
				alias: "keyword"
			} }
		}
	});
	var w = C + "|" + S, T = t("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [w]), E = r(t("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [T]), 2), D = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b", O = t("<<0>>(?:\\s*\\(<<1>>*\\))?", [_, E]);
	e.languages.insertBefore("csharp", "class-name", { attribute: {
		pattern: n("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [D, O]),
		lookbehind: !0,
		greedy: !0,
		inside: {
			target: {
				pattern: n("^<<0>>(?=\\s*:)", [D]),
				alias: "keyword"
			},
			"attribute-arguments": {
				pattern: n("\\(<<0>>*\\)", [E]),
				inside: e.languages.csharp
			},
			"class-name": {
				pattern: RegExp(_),
				inside: { punctuation: /\./ }
			},
			punctuation: /[:,]/
		}
	} });
	var k = ":[^}\r\n]+", A = r(t("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [T]), 2), j = t("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [A, k]), M = r(t("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [w]), 2), N = t("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [M, k]);
	function P(t, r) {
		return {
			interpolation: {
				pattern: n("((?:^|[^{])(?:\\{\\{)*)<<0>>", [t]),
				lookbehind: !0,
				inside: {
					"format-string": {
						pattern: n("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [r, k]),
						lookbehind: !0,
						inside: { punctuation: /^:/ }
					},
					punctuation: /^\{|\}$/,
					expression: {
						pattern: /[\s\S]+/,
						alias: "language-csharp",
						inside: e.languages.csharp
					}
				}
			},
			string: /[\s\S]+/
		};
	}
	e.languages.insertBefore("csharp", "string", {
		"interpolation-string": [{
			pattern: n("(^|[^\\\\])(?:\\$@|@\\$)\"(?:\"\"|\\\\[^]|\\{\\{|<<0>>|[^\\\\{\"])*\"", [j]),
			lookbehind: !0,
			greedy: !0,
			inside: P(j, A)
		}, {
			pattern: n("(^|[^@\\\\])\\$\"(?:\\\\.|\\{\\{|<<0>>|[^\\\\\"{])*\"", [N]),
			lookbehind: !0,
			greedy: !0,
			inside: P(N, M)
		}],
		char: {
			pattern: RegExp(S),
			greedy: !0
		}
	}), e.languages.dotnet = e.languages.cs = e.languages.csharp;
})(Prism);

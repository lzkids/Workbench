// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-graphql.min.js
Prism.languages.graphql = {
	comment: /#.*/,
	description: {
		pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
		greedy: !0,
		alias: "string",
		inside: { "language-markdown": {
			pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
			lookbehind: !0,
			inside: Prism.languages.markdown
		} }
	},
	string: {
		pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
		greedy: !0
	},
	number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	boolean: /\b(?:false|true)\b/,
	variable: /\$[a-z_]\w*/i,
	directive: {
		pattern: /@[a-z_]\w*/i,
		alias: "function"
	},
	"attr-name": {
		pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
		greedy: !0
	},
	"atom-input": {
		pattern: /\b[A-Z]\w*Input\b/,
		alias: "class-name"
	},
	scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
	constant: /\b[A-Z][A-Z_\d]*\b/,
	"class-name": {
		pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
		lookbehind: !0
	},
	fragment: {
		pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: "function"
	},
	"definition-mutation": {
		pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: "function"
	},
	"definition-query": {
		pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
		lookbehind: !0,
		alias: "function"
	},
	keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
	operator: /[!=|&]|\.{3}/,
	"property-query": /\w+(?=\s*\()/,
	object: /\w+(?=\s*\{)/,
	punctuation: /[!(){}\[\]:=,]/,
	property: /\w+/
}, Prism.hooks.add("after-tokenize", (function(e) {
	if (e.language === "graphql") for (var t = e.tokens.filter((function(e) {
		return typeof e != "string" && e.type !== "comment" && e.type !== "scalar";
	})), n = 0; n < t.length;) {
		var r = t[n++];
		if (r.type === "keyword" && r.content === "mutation") {
			var i = [];
			if (d(["definition-mutation", "punctuation"]) && u(1).content === "(") {
				n += 2;
				var a = f(/^\($/, /^\)$/);
				if (a === -1) continue;
				for (; n < a; n++) {
					var o = u(0);
					o.type === "variable" && (p(o, "variable-input"), i.push(o.content));
				}
				n = a + 1;
			}
			if (d(["punctuation", "property-query"]) && u(0).content === "{" && (n++, p(u(0), "property-mutation"), i.length > 0)) {
				var s = f(/^\{$/, /^\}$/);
				if (s === -1) continue;
				for (var c = n; c < s; c++) {
					var l = t[c];
					l.type === "variable" && i.indexOf(l.content) >= 0 && p(l, "variable-input");
				}
			}
		}
	}
	function u(e) {
		return t[n + e];
	}
	function d(e, t) {
		t ||= 0;
		for (var n = 0; n < e.length; n++) {
			var r = u(n + t);
			if (!r || r.type !== e[n]) return !1;
		}
		return !0;
	}
	function f(e, r) {
		for (var i = 1, a = n; a < t.length; a++) {
			var o = t[a], s = o.content;
			if (o.type === "punctuation" && typeof s == "string") {
				if (e.test(s)) i++;
				else if (r.test(s) && --i == 0) return a;
			}
		}
		return -1;
	}
	function p(e, t) {
		var n = e.alias;
		n ? Array.isArray(n) || (e.alias = n = [n]) : e.alias = n = [], n.push(t);
	}
}));

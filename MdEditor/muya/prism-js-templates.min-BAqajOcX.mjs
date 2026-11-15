// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-js-templates.min.js
(function(e) {
	var t = e.languages.javascript["template-string"], n = t.pattern.source, r = t.inside.interpolation, i = r.inside["interpolation-punctuation"], a = r.pattern.source;
	function o(t, r) {
		if (e.languages[t]) return {
			pattern: RegExp("((?:" + r + ")\\s*)" + n),
			lookbehind: !0,
			greedy: !0,
			inside: {
				"template-punctuation": {
					pattern: /^`|`$/,
					alias: "string"
				},
				"embedded-code": {
					pattern: /[\s\S]+/,
					alias: t
				}
			}
		};
	}
	function s(e, t) {
		return "___" + t.toUpperCase() + "_" + e + "___";
	}
	function c(t, n, r) {
		var i = {
			code: t,
			grammar: n,
			language: r
		};
		return e.hooks.run("before-tokenize", i), i.tokens = e.tokenize(i.code, i.grammar), e.hooks.run("after-tokenize", i), i.tokens;
	}
	function l(t) {
		var n = {};
		n["interpolation-punctuation"] = i;
		var a = e.tokenize(t, n);
		if (a.length === 3) {
			var o = [1, 1];
			o.push.apply(o, c(a[1], e.languages.javascript, "javascript")), a.splice.apply(a, o);
		}
		return new e.Token("interpolation", a, r.alias, t);
	}
	function u(t, n, r) {
		var i = e.tokenize(t, { interpolation: {
			pattern: RegExp(a),
			lookbehind: !0
		} }), o = 0, u = {}, d = c(i.map((function(e) {
			if (typeof e == "string") return e;
			for (var n, i = e.content; t.indexOf(n = s(o++, r)) !== -1;);
			return u[n] = i, n;
		})).join(""), n, r), f = Object.keys(u);
		return o = 0, function e(t) {
			for (var n = 0; n < t.length; n++) {
				if (o >= f.length) return;
				var r = t[n];
				if (typeof r == "string" || typeof r.content == "string") {
					var i = f[o], a = typeof r == "string" ? r : r.content, s = a.indexOf(i);
					if (s !== -1) {
						++o;
						var c = a.substring(0, s), d = l(u[i]), p = a.substring(s + i.length), m = [];
						if (c && m.push(c), m.push(d), p) {
							var h = [p];
							e(h), m.push.apply(m, h);
						}
						typeof r == "string" ? (t.splice.apply(t, [n, 1].concat(m)), n += m.length - 1) : r.content = m;
					}
				} else {
					var g = r.content;
					e(Array.isArray(g) ? g : [g]);
				}
			}
		}(d), new e.Token(r, d, "language-" + r, t);
	}
	e.languages.javascript["template-string"] = [
		o("css", "\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)"),
		o("html", "\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?="),
		o("svg", "\\bsvg"),
		o("markdown", "\\b(?:markdown|md)"),
		o("graphql", "\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)"),
		o("sql", "\\bsql"),
		t
	].filter(Boolean);
	var d = {
		javascript: !0,
		js: !0,
		typescript: !0,
		ts: !0,
		jsx: !0,
		tsx: !0
	};
	function f(e) {
		return typeof e == "string" ? e : Array.isArray(e) ? e.map(f).join("") : f(e.content);
	}
	e.hooks.add("after-tokenize", (function(t) {
		t.language in d && function t(n) {
			for (var r = 0, i = n.length; r < i; r++) {
				var a = n[r];
				if (typeof a != "string") {
					var o = a.content;
					if (Array.isArray(o)) {
						if (a.type === "template-string") {
							var s = o[1];
							if (o.length === 3 && typeof s != "string" && s.type === "embedded-code") {
								var c = f(s), l = s.alias, d = Array.isArray(l) ? l[0] : l, p = e.languages[d];
								if (!p) continue;
								o[1] = u(c, p, d);
							}
						} else t(o);
					} else typeof o != "string" && t([o]);
				}
			}
		}(t.tokens);
	}));
})(Prism);

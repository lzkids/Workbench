// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-javadoclike.min.js
(function(e) {
	var t = e.languages.javadoclike = {
		parameter: {
			pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
			lookbehind: !0
		},
		keyword: {
			pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
			lookbehind: !0
		},
		punctuation: /[{}]/
	};
	Object.defineProperty(t, "addSupport", { value: function(t, n) {
		typeof t == "string" && (t = [t]), t.forEach((function(t) {
			(function(t, n) {
				var r = "doc-comment", i = e.languages[t];
				if (i) {
					var a = i[r];
					if (a ||= (i = e.languages.insertBefore(t, "comment", { "doc-comment": {
						pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
						lookbehind: !0,
						alias: "comment"
					} }))[r], a instanceof RegExp && (a = i[r] = { pattern: a }), Array.isArray(a)) for (var o = 0, s = a.length; o < s; o++) a[o] instanceof RegExp && (a[o] = { pattern: a[o] }), n(a[o]);
					else n(a);
				}
			})(t, (function(e) {
				e.inside ||= {}, e.inside.rest = n;
			}));
		}));
	} }), t.addSupport([
		"java",
		"javascript",
		"php"
	], t);
})(Prism);

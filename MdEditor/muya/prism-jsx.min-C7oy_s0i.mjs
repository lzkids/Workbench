// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-jsx.min.js
(function(e) {
	var t = e.util.clone(e.languages.javascript), n = "(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";
	function r(e, t) {
		return e = e.replace(/<S>/g, (function() {
			return "(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)";
		})).replace(/<BRACES>/g, (function() {
			return "(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})";
		})).replace(/<SPREAD>/g, (function() {
			return n;
		})), RegExp(e, t);
	}
	n = r(n).source, e.languages.jsx = e.languages.extend("markup", t), e.languages.jsx.tag.pattern = r("</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:\"(?:\\\\[^]|[^\\\\\"])*\"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'\"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>"), e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, e.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/, e.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, e.languages.jsx.tag.inside.comment = t.comment, e.languages.insertBefore("inside", "attr-name", { spread: {
		pattern: r("<SPREAD>"),
		inside: e.languages.jsx
	} }, e.languages.jsx.tag), e.languages.insertBefore("inside", "special-attr", { script: {
		pattern: r("=<BRACES>"),
		alias: "language-javascript",
		inside: {
			"script-punctuation": {
				pattern: /^=(?=\{)/,
				alias: "punctuation"
			},
			rest: e.languages.jsx
		}
	} }, e.languages.jsx.tag);
	var i = function(e) {
		return e ? typeof e == "string" ? e : typeof e.content == "string" ? e.content : e.content.map(i).join("") : "";
	}, a = function(t) {
		for (var n = [], r = 0; r < t.length; r++) {
			var o = t[r], s = !1;
			if (typeof o != "string" && (o.type === "tag" && o.content[0] && o.content[0].type === "tag" ? o.content[0].content[0].content === "</" ? n.length > 0 && n[n.length - 1].tagName === i(o.content[0].content[1]) && n.pop() : o.content[o.content.length - 1].content === "/>" || n.push({
				tagName: i(o.content[0].content[1]),
				openedBraces: 0
			}) : n.length > 0 && o.type === "punctuation" && o.content === "{" ? n[n.length - 1].openedBraces++ : n.length > 0 && n[n.length - 1].openedBraces > 0 && o.type === "punctuation" && o.content === "}" ? n[n.length - 1].openedBraces-- : s = !0), (s || typeof o == "string") && n.length > 0 && n[n.length - 1].openedBraces === 0) {
				var c = i(o);
				r < t.length - 1 && (typeof t[r + 1] == "string" || t[r + 1].type === "plain-text") && (c += i(t[r + 1]), t.splice(r + 1, 1)), r > 0 && (typeof t[r - 1] == "string" || t[r - 1].type === "plain-text") && (c = i(t[r - 1]) + c, t.splice(r - 1, 1), r--), t[r] = new e.Token("plain-text", c, null, c);
			}
			o.content && typeof o.content != "string" && a(o.content);
		}
	};
	e.hooks.add("after-tokenize", (function(e) {
		e.language !== "jsx" && e.language !== "tsx" || a(e.tokens);
	}));
})(Prism);

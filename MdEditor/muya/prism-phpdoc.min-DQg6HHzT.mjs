// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-phpdoc.min.js
(function(e) {
	var t = "(?:\\b[a-zA-Z]\\w*|[|\\\\[\\]])+";
	e.languages.phpdoc = e.languages.extend("javadoclike", { parameter: {
		pattern: RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + t + "\\s+)?)\\$\\w+"),
		lookbehind: !0
	} }), e.languages.insertBefore("phpdoc", "keyword", { "class-name": [{
		pattern: RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + t),
		lookbehind: !0,
		inside: {
			keyword: /\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/,
			punctuation: /[|\\[\]()]/
		}
	}] }), e.languages.javadoclike.addSupport("php", e.languages.phpdoc);
})(Prism);

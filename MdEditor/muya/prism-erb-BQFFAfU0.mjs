// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-erb.js
(function(e) {
	e.languages.erb = {
		delimiter: {
			pattern: /^(\s*)<%=?|%>(?=\s*$)/,
			lookbehind: !0,
			alias: "punctuation"
		},
		ruby: {
			pattern: /\s*\S[\s\S]*/,
			alias: "language-ruby",
			inside: e.languages.ruby
		}
	}, e.hooks.add("before-tokenize", function(t) {
		e.languages["markup-templating"].buildPlaceholders(t, "erb", /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g);
	}), e.hooks.add("after-tokenize", function(t) {
		e.languages["markup-templating"].tokenizePlaceholders(t, "erb");
	});
})(Prism);

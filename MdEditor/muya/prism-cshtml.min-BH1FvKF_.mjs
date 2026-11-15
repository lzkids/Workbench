// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-cshtml.min.js
(function(e) {
	function t(e, t) {
		for (var n = 0; n < t; n++) e = e.replace(/<self>/g, (function() {
			return "(?:" + e + ")";
		}));
		return e.replace(/<self>/g, "[^\\s\\S]").replace(/<str>/g, "(?:@(?!\")|\"(?:[^\r\n\\\\\"]|\\\\.)*\"|@\"(?:[^\\\\\"]|\"\"|\\\\[^])*\"(?!\")|'(?:(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'|(?=[^\\\\](?!'))))").replace(/<comment>/g, "(?:/(?![/*])|//.*[\r\n]|/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/)");
	}
	var n = t("\\((?:[^()'\"@/]|<str>|<comment>|<self>)*\\)", 2), r = t("\\[(?:[^\\[\\]'\"@/]|<str>|<comment>|<self>)*\\]", 1), i = t("\\{(?:[^{}'\"@/]|<str>|<comment>|<self>)*\\}", 2), a = "@(?:await\\b\\s*)?(?:(?!await\\b)\\w+\\b|" + n + ")(?:[?!]?\\.\\w+\\b|(?:" + t("<(?:[^<>'\"@/]|<comment>|<self>)*>", 1) + ")?" + n + "|" + r + ")*(?![?!\\.(\\[]|<(?!/))", o = "(?:\"[^\"@]*\"|'[^'@]*'|[^\\s'\"@>=]+(?=[\\s>])|[\"'][^\"'@]*(?:(?:@(?![\\w()])|" + a + ")[^\"'@]*)+[\"'])", s = "(?:\\s(?:\\s*[^\\s>/=]+(?:\\s*=\\s*<tagAttrValue>|(?=[\\s/>])))+)?".replace(/<tagAttrValue>/, o), c = "(?!\\d)[^\\s>/=$<%]+" + s + "\\s*/?>", l = "\\B@?(?:<([a-zA-Z][\\w:]*)" + s + "\\s*>(?:[^<]|</?(?!\\1\\b)" + c + "|" + t("<\\1" + s + "\\s*>(?:[^<]|</?(?!\\1\\b)" + c + "|<self>)*</\\1\\s*>", 2) + ")*</\\1\\s*>|<" + c + ")";
	e.languages.cshtml = e.languages.extend("markup", {});
	var u = {
		pattern: /\S[\s\S]*/,
		alias: "language-csharp",
		inside: e.languages.insertBefore("csharp", "string", { html: {
			pattern: RegExp(l),
			greedy: !0,
			inside: e.languages.cshtml
		} }, { csharp: e.languages.extend("csharp", {}) })
	}, d = {
		pattern: RegExp("(^|[^@])" + a),
		lookbehind: !0,
		greedy: !0,
		alias: "variable",
		inside: {
			keyword: /^@/,
			csharp: u
		}
	};
	e.languages.cshtml.tag.pattern = RegExp("</?" + c), e.languages.cshtml.tag.inside["attr-value"].pattern = RegExp("=\\s*" + o), e.languages.insertBefore("inside", "punctuation", { value: d }, e.languages.cshtml.tag.inside["attr-value"]), e.languages.insertBefore("cshtml", "prolog", {
		"razor-comment": {
			pattern: /@\*[\s\S]*?\*@/,
			greedy: !0,
			alias: "comment"
		},
		block: {
			pattern: RegExp("(^|[^@])@(?:" + [
				i,
				"(?:code|functions)\\s*" + i,
				"(?:for|foreach|lock|switch|using|while)\\s*" + n + "\\s*" + i,
				"do\\s*" + i + "\\s*while\\s*" + n + "(?:\\s*;)?",
				"try\\s*" + i + "\\s*catch\\s*" + n + "\\s*" + i + "\\s*finally\\s*" + i,
				"if\\s*" + n + "\\s*" + i + "(?:\\s*else(?:\\s+if\\s*" + n + ")?\\s*" + i + ")*",
				"helper\\s+\\w+\\s*" + n + "\\s*" + i
			].join("|") + ")"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				keyword: /^@\w*/,
				csharp: u
			}
		},
		directive: {
			pattern: /^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,
			lookbehind: !0,
			greedy: !0,
			inside: {
				keyword: /^@\w+/,
				csharp: u
			}
		},
		value: d,
		"delegate-operator": {
			pattern: /(^|[^@])@(?=<)/,
			lookbehind: !0,
			alias: "operator"
		}
	}), e.languages.razor = e.languages.cshtml;
})(Prism);

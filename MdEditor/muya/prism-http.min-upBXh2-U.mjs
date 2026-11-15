// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-http.min.js
(function(e) {
	function t(e) {
		return RegExp("(^(?:" + e + "):[ 	]*(?![ 	]))[^]+", "i");
	}
	e.languages.http = {
		"request-line": {
			pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,
			inside: {
				method: {
					pattern: /^[A-Z]+\b/,
					alias: "property"
				},
				"request-target": {
					pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
					lookbehind: !0,
					alias: "url",
					inside: e.languages.uri
				},
				"http-version": {
					pattern: /^(\s)HTTP\/[\d.]+/,
					lookbehind: !0,
					alias: "property"
				}
			}
		},
		"response-status": {
			pattern: /^HTTP\/[\d.]+ \d+ .+/m,
			inside: {
				"http-version": {
					pattern: /^HTTP\/[\d.]+/,
					alias: "property"
				},
				"status-code": {
					pattern: /^(\s)\d+(?=\s)/,
					lookbehind: !0,
					alias: "number"
				},
				"reason-phrase": {
					pattern: /^(\s).+/,
					lookbehind: !0,
					alias: "string"
				}
			}
		},
		header: {
			pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,
			inside: {
				"header-value": [
					{
						pattern: t("Content-Security-Policy"),
						lookbehind: !0,
						alias: ["csp", "languages-csp"],
						inside: e.languages.csp
					},
					{
						pattern: t("Public-Key-Pins(?:-Report-Only)?"),
						lookbehind: !0,
						alias: ["hpkp", "languages-hpkp"],
						inside: e.languages.hpkp
					},
					{
						pattern: t("Strict-Transport-Security"),
						lookbehind: !0,
						alias: ["hsts", "languages-hsts"],
						inside: e.languages.hsts
					},
					{
						pattern: t("[^:]+"),
						lookbehind: !0
					}
				],
				"header-name": {
					pattern: /^[^:]+/,
					alias: "keyword"
				},
				punctuation: /^:/
			}
		}
	};
	var n, r = e.languages, i = {
		"application/javascript": r.javascript,
		"application/json": r.json || r.javascript,
		"application/xml": r.xml,
		"text/xml": r.xml,
		"text/html": r.html,
		"text/css": r.css,
		"text/plain": r.plain
	}, a = {
		"application/json": !0,
		"application/xml": !0
	};
	function o(e) {
		var t = e.replace(/^[a-z]+\//, "");
		return "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + t + "(?![+\\w.-]))";
	}
	for (var s in i) if (i[s]) {
		n ||= {};
		var c = a[s] ? o(s) : s;
		n[s.replace(/\//g, "-")] = {
			pattern: RegExp("(content-type:\\s*" + c + "(?:(?:\r\n?|\n)[\\w-].*)*(?:\r(?:\n|(?!\n))|\n))[^ 	\\w-][^]*", "i"),
			lookbehind: !0,
			inside: i[s]
		};
	}
	n && e.languages.insertBefore("http", "header", n);
})(Prism);

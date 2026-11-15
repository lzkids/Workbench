// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-shell-session.js
(function(e) {
	e.languages["shell-session"] = {
		command: {
			pattern: RegExp("^(?:[^\\s@:$#%*!/\\\\]+@[^\\r\\n@:$#%*!/\\\\]+(?::[^\\0-\\x1F$#%*?\"<>:;|]+)?|[/~.][^\\0-\\x1F$#%*?\"<>@:;|]*)?[$#%](?=\\s)" + "(?:[^\\\\\\r\\n \\t'\"<$]|[ \\t](?:(?!#)|#.*$)|\\\\(?:[^\\r]|\\r\\n?)|\\$(?!')|<(?!<)|<<str>>)+".replace(/<<str>>/g, function() {
				return "\"(?:\\\\[\\s\\S]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|[^\"\\\\`$])*\"|'[^']*'|\\$'(?:[^'\\\\]|\\\\[\\s\\S])*'|<<-?\\s*([\"']?)(\\w+)\\1\\s[\\s\\S]*?[\\r\\n]\\2";
			}), "m"),
			greedy: !0,
			inside: {
				info: {
					pattern: /^[^#$%]+/,
					alias: "punctuation",
					inside: {
						user: /^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,
						punctuation: /:/,
						path: /[\s\S]+/
					}
				},
				bash: {
					pattern: /(^[$#%]\s*)\S[\s\S]*/,
					lookbehind: !0,
					alias: "language-bash",
					inside: e.languages.bash
				},
				"shell-symbol": {
					pattern: /^[$#%]/,
					alias: "important"
				}
			}
		},
		output: /.(?:.*(?:[\r\n]|.$))*/
	}, e.languages["sh-session"] = e.languages.shellsession = e.languages["shell-session"];
})(Prism);

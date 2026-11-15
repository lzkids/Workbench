// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-tap.min.js
Prism.languages.tap = {
	fail: /not ok[^#{\n\r]*/,
	pass: /ok[^#{\n\r]*/,
	pragma: /pragma [+-][a-z]+/,
	bailout: /bail out!.*/i,
	version: /TAP version \d+/i,
	plan: /\b\d+\.\.\d+(?: +#.*)?/,
	subtest: {
		pattern: /# Subtest(?:: .*)?/,
		greedy: !0
	},
	punctuation: /[{}]/,
	directive: /#.*/,
	yamlish: {
		pattern: /(^[ \t]*)---[\s\S]*?[\r\n][ \t]*\.\.\.$/m,
		lookbehind: !0,
		inside: Prism.languages.yaml,
		alias: "language-yaml"
	}
};

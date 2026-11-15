// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-hpkp.js
Prism.languages.hpkp = {
	directive: {
		pattern: /\b(?:includeSubDomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?=[\s;=]|$)/i,
		alias: "property"
	},
	operator: /=/,
	punctuation: /;/
};

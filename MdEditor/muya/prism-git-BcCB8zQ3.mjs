// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-git.js
Prism.languages.git = {
	comment: /^#.*/m,
	deleted: /^[-–].*/m,
	inserted: /^\+.*/m,
	string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
	command: {
		pattern: /^.*\$ git .*$/m,
		inside: { parameter: /\s--?\w+/ }
	},
	coord: /^@@.*@@$/m,
	"commit-sha1": /^commit \w{40}$/m
};

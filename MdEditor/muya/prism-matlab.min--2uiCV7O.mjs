// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-matlab.min.js
Prism.languages.matlab = {
	comment: [/%\{[\s\S]*?\}%/, /%.+/],
	string: {
		pattern: /\B'(?:''|[^'\r\n])*'/,
		greedy: !0
	},
	number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
	keyword: /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
	function: /\b(?!\d)\w+(?=\s*\()/,
	operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
	punctuation: /\.{3}|[.,;\[\](){}!]/
};

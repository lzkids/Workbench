// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/components/prism-tsx.min.js
(function(e) {
	var t = e.util.clone(e.languages.typescript);
	e.languages.tsx = e.languages.extend("jsx", t), delete e.languages.tsx.parameter, delete e.languages.tsx["literal-property"];
	var n = e.languages.tsx.tag;
	n.pattern = RegExp("(^|[^\\w$]|(?=</))(?:" + n.pattern.source + ")", n.pattern.flags), n.lookbehind = !0;
})(Prism);

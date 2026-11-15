import { f as e, t } from "./mermaid-parser.core-Dx8m9gkF.mjs";
import { n } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n as r } from "./src-mUhzjhMv.mjs";
import "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { n as i, r as a, t as o } from "./chunk-2E7WHVMD-DPJ9M-PM.mjs";
import { t as s } from "./chunk-JWPE2WC7-M__Yc12Z.mjs";
import "./mermaid.core-B-BR1H6V.mjs";
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/ebnfDiagram-V4P3TTPT.mjs
var c = e().RailroadEbnf.parser.LangiumParser, l = /* @__PURE__ */ n((e) => {
	let t = e.alternatives.map(u);
	return t.length === 1 ? t[0] : {
		type: "choice",
		alternatives: t
	};
}, "transformChoice"), u = /* @__PURE__ */ n((e) => {
	let t = e.elements.map(p);
	return t.length === 1 ? t[0] : {
		type: "sequence",
		elements: t
	};
}, "transformSequence"), d = /* @__PURE__ */ n((e) => {
	switch (e.$type) {
		case "EbnfTerminal": return {
			type: "terminal",
			value: e.value
		};
		case "EbnfNonTerminal": return {
			type: "nonterminal",
			name: e.name
		};
		case "EbnfSpecial": return {
			type: "special",
			text: e.text
		};
		case "EbnfGroup": return l(e.element);
		case "EbnfOptional": return {
			type: "optional",
			element: l(e.element)
		};
		case "EbnfRepetition": return {
			type: "repetition",
			element: l(e.element),
			min: 0,
			max: Infinity
		};
		default: throw Error(`Unsupported EBNF primary node: ${e.$type}`);
	}
}, "transformPrimary"), f = /* @__PURE__ */ n((e, t) => {
	switch (t.$type) {
		case "EbnfOptionalPostfix": return {
			type: "optional",
			element: e
		};
		case "EbnfZeroOrMorePostfix": return {
			type: "repetition",
			element: e,
			min: 0,
			max: Infinity
		};
		case "EbnfOneOrMorePostfix": return {
			type: "repetition",
			element: e,
			min: 1,
			max: Infinity
		};
		case "EbnfExceptionPostfix": return {
			type: "sequence",
			elements: [
				e,
				{
					type: "terminal",
					value: "-"
				},
				d(t.except)
			]
		};
		default: throw Error(`Unsupported EBNF postfix node: ${t.$type}`);
	}
}, "transformPostfix"), p = /* @__PURE__ */ n((e) => e.postfixes.reduce((e, t) => f(e, t), d(e.base)), "transformTerm"), m = /* @__PURE__ */ n((e) => ({
	name: e.name,
	definition: l(e.definition)
}), "transformRule"), h = /* @__PURE__ */ n((e) => {
	s(e, o), e.title && o.setTitle(e.title), e.rules.map((e) => o.addRule(m(e)));
}, "populateDb"), g = {
	parser: {
		parse: /* @__PURE__ */ n((e) => {
			o.clear(), r.debug("[EBNF Parser] Starting Langium parse");
			let n = c.parse(e);
			if (n.lexerErrors.length > 0 || n.parserErrors.length > 0) throw new t(n);
			let i = n.value;
			r.debug("[EBNF Parser] Parsed rules:", i.rules.length), h(i), r.debug("[EBNF Parser] Parse complete");
		}, "parse"),
		parser: { yy: o }
	},
	db: o,
	renderer: a,
	styles: i
};
export { g as diagram };

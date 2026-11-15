import { g as e, t } from "./mermaid-parser.core-Dx8m9gkF.mjs";
import { n } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n as r } from "./src-mUhzjhMv.mjs";
import "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { n as i, r as a, t as o } from "./chunk-2E7WHVMD-DPJ9M-PM.mjs";
import { t as s } from "./chunk-JWPE2WC7-M__Yc12Z.mjs";
import "./mermaid.core-B-BR1H6V.mjs";
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/railroadDiagram-Y72NRBL7.mjs
var c = e().Railroad.parser.LangiumParser, l = /* @__PURE__ */ n((e) => {
	switch (e.$type) {
		case "RailroadTerminalExpr": return {
			type: "terminal",
			value: e.value
		};
		case "RailroadNonTerminalExpr": return {
			type: "nonterminal",
			name: e.name
		};
		case "RailroadSpecialExpr": return {
			type: "special",
			text: e.text
		};
		case "RailroadSequenceExpr": {
			let t = e.elements.map(l);
			return t.length === 1 ? t[0] : {
				type: "sequence",
				elements: t
			};
		}
		case "RailroadChoiceExpr": {
			let t = e.alternatives.map(l);
			return t.length === 1 ? t[0] : {
				type: "choice",
				alternatives: t
			};
		}
		case "RailroadOptionalExpr": return {
			type: "optional",
			element: l(e.element)
		};
		case "RailroadOneOrMoreExpr": return {
			type: "repetition",
			element: l(e.element),
			min: 1,
			max: Infinity
		};
		case "RailroadZeroOrMoreExpr": return {
			type: "repetition",
			element: l(e.element),
			min: 0,
			max: Infinity
		};
		default: throw Error(`Unsupported railroad expression: ${e.$type}`);
	}
}, "transformExpression"), u = /* @__PURE__ */ n((e) => ({
	name: e.name,
	definition: l(e.definition)
}), "transformRule"), d = /* @__PURE__ */ n((e) => {
	s(e, o), e.title && o.setTitle(e.title), e.rules.map((e) => o.addRule(u(e)));
}, "populateDb"), f = {
	parser: {
		parse: /* @__PURE__ */ n((e) => {
			o.clear(), r.debug("[Railroad Parser] Starting Langium parse");
			let n = c.parse(e);
			if (n.lexerErrors.length > 0 || n.parserErrors.length > 0) throw new t(n);
			let i = n.value;
			r.debug("[Railroad Parser] Parsed rules:", i.rules.length), d(i), r.debug("[Railroad Parser] Parse complete");
		}, "parse"),
		parser: { yy: o }
	},
	db: o,
	renderer: a,
	styles: i
};
export { f as diagram };

import { m as e, t } from "./mermaid-parser.core-Dx8m9gkF.mjs";
import { n } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n as r } from "./src-mUhzjhMv.mjs";
import "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { n as i, r as a, t as o } from "./chunk-2E7WHVMD-DPJ9M-PM.mjs";
import { t as s } from "./chunk-JWPE2WC7-M__Yc12Z.mjs";
import "./mermaid.core-B-BR1H6V.mjs";
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/abnfDiagram-WEYOIA3C.mjs
var c = e().RailroadAbnf.parser.LangiumParser, l = /* @__PURE__ */ n((e) => {
	let t = e.alternatives.map(u);
	return t.length === 1 ? t[0] : {
		type: "choice",
		alternatives: t
	};
}, "transformAlternation"), u = /* @__PURE__ */ n((e) => {
	let t = e.elements.map(f);
	return t.length === 1 ? t[0] : {
		type: "sequence",
		elements: t
	};
}, "transformConcatenation"), d = /* @__PURE__ */ n((e) => {
	if (e.includes("*")) {
		let [t, n] = e.split("*");
		return {
			min: t ? parseInt(t, 10) : 0,
			max: n ? parseInt(n, 10) : Infinity
		};
	}
	let t = parseInt(e, 10);
	return {
		min: t,
		max: t
	};
}, "parseRepeat"), f = /* @__PURE__ */ n((e) => {
	let t = p(e.primary);
	if (!e.repeat) return t;
	let { min: n, max: r } = d(e.repeat);
	return n === 0 && r === 1 ? {
		type: "optional",
		element: t
	} : {
		type: "repetition",
		element: t,
		min: n,
		max: r
	};
}, "transformElement"), p = /* @__PURE__ */ n((e) => {
	switch (e.$type) {
		case "AbnfStringLiteral": return {
			type: "terminal",
			value: e.value
		};
		case "AbnfNumVal": return {
			type: "terminal",
			value: e.value
		};
		case "AbnfRuleName": return {
			type: "nonterminal",
			name: e.name
		};
		case "AbnfGroup": return l(e.element);
		case "AbnfOptionalGroup": return {
			type: "optional",
			element: l(e.element)
		};
		default: throw Error(`Unsupported ABNF primary node: ${e.$type}`);
	}
}, "transformPrimary"), m = /* @__PURE__ */ n((e) => ({
	name: e.name,
	definition: l(e.definition)
}), "transformRule"), h = /* @__PURE__ */ n((e) => {
	s(e, o), e.title && o.setTitle(e.title), e.rules.map((e) => o.addRule(m(e)));
}, "populateDb"), g = {
	parser: {
		parse: /* @__PURE__ */ n((e) => {
			o.clear(), r.debug("[ABNF Parser] Starting Langium parse");
			let n = c.parse(e);
			if (n.lexerErrors.length > 0 || n.parserErrors.length > 0) throw new t(n);
			let i = n.value;
			r.debug("[ABNF Parser] Parsed rules:", i.rules.length), h(i), r.debug("[ABNF Parser] Parse complete");
		}, "parse"),
		parser: { yy: o }
	},
	db: o,
	renderer: a,
	styles: i
};
export { g as diagram };

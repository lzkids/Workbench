import { n as e } from "./mermaid-parser.core-Dx8m9gkF.mjs";
import { n as t } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n } from "./src-mUhzjhMv.mjs";
import { c as r } from "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { o as i } from "./mermaid.core-B-BR1H6V.mjs";
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-MVDRKAX5.mjs
var a = { parse: /* @__PURE__ */ t(async (t) => {
	let r = await e("info", t);
	n.debug(r);
}, "parse") }, o = { version: "12.2.0" }, s = {
	parser: a,
	db: { getVersion: /* @__PURE__ */ t(() => o.version, "getVersion") },
	renderer: { draw: /* @__PURE__ */ t((e, t, a) => {
		n.debug("rendering info diagram\n" + e);
		let o = i(t);
		r(o, 100, 400, !0), o.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${a}`);
	}, "draw") }
};
export { s as diagram };

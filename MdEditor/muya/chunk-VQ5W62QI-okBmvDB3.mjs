import { n as e } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n as t } from "./src-mUhzjhMv.mjs";
import { c as n } from "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-VQ5W62QI.mjs
var r = /* @__PURE__ */ e((e, r, o, s) => {
	e.attr("class", o);
	let { width: c, height: l, x: u, y: d } = i(e, r);
	n(e, l, c, s);
	let f = a(u, d, c, l, r);
	e.attr("viewBox", f), t.debug(`viewBox configured: ${f} with padding: ${r}`);
}, "setupViewPortForSVG"), i = /* @__PURE__ */ e((e, t) => {
	let n = e.node()?.getBBox() || {
		width: 0,
		height: 0,
		x: 0,
		y: 0
	};
	return {
		width: n.width + t * 2,
		height: n.height + t * 2,
		x: n.x,
		y: n.y
	};
}, "calculateDimensionsWithPadding"), a = /* @__PURE__ */ e((e, t, n, r, i) => `${e - i} ${t - i} ${n} ${r}`, "createViewBox");
export { r as t };

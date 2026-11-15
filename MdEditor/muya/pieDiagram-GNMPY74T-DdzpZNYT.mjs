import { n as e } from "./mermaid-parser.core-Dx8m9gkF.mjs";
import { n as t } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n } from "./src-mUhzjhMv.mjs";
import { C as r, H as i, U as a, _ as o, a as s, b as c, c as l, f as u, q as d, v as f } from "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { n as p } from "./ordinal-BDux7ojd.mjs";
import { I as m, L as h, S as g } from "./step-yaYNpUbH.mjs";
import { t as _ } from "./arc-CCgByJL-.mjs";
import { i as v, m as y } from "./chunk-7S6XSTFO-tSIKfKFA.mjs";
import { t as b } from "./chunk-JWPE2WC7-M__Yc12Z.mjs";
import { o as x } from "./mermaid.core-B-BR1H6V.mjs";
// ../../marktext/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/descending.js
function S(e, t) {
	return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
// ../../marktext/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/identity.js
function C(e) {
	return e;
}
// ../../marktext/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/pie.js
function w() {
	var e = C, t = S, n = null, r = h(0), i = h(m), a = h(0);
	function o(o) {
		var s, c = (o = g(o)).length, l, u, d = 0, f = Array(c), p = Array(c), h = +r.apply(this, arguments), _ = Math.min(m, Math.max(-m, i.apply(this, arguments) - h)), v, y = Math.min(Math.abs(_) / c, a.apply(this, arguments)), b = y * (_ < 0 ? -1 : 1), x;
		for (s = 0; s < c; ++s) (x = p[f[s] = s] = +e(o[s], s, o)) > 0 && (d += x);
		for (t == null ? n != null && f.sort(function(e, t) {
			return n(o[e], o[t]);
		}) : f.sort(function(e, n) {
			return t(p[e], p[n]);
		}), s = 0, u = d ? (_ - c * b) / d : 0; s < c; ++s, h = v) l = f[s], x = p[l], v = h + (x > 0 ? x * u : 0) + b, p[l] = {
			data: o[l],
			index: s,
			value: x,
			startAngle: h,
			endAngle: v,
			padAngle: y
		};
		return p;
	}
	return o.value = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : h(+t), o) : e;
	}, o.sortValues = function(e) {
		return arguments.length ? (t = e, n = null, o) : t;
	}, o.sort = function(e) {
		return arguments.length ? (n = e, t = null, o) : n;
	}, o.startAngle = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : h(+e), o) : r;
	}, o.endAngle = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : h(+e), o) : i;
	}, o.padAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : h(+e), o) : a;
	}, o;
}
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/pieDiagram-GNMPY74T.mjs
var T = u.pie, E = {
	sections: /* @__PURE__ */ new Map(),
	showData: !1,
	config: T
}, D = E.sections, O = E.showData, k = structuredClone(T), A = {
	getConfig: /* @__PURE__ */ t(() => structuredClone(k), "getConfig"),
	clear: /* @__PURE__ */ t(() => {
		D = /* @__PURE__ */ new Map(), O = E.showData, s();
	}, "clear"),
	setDiagramTitle: d,
	getDiagramTitle: r,
	setAccTitle: a,
	getAccTitle: f,
	setAccDescription: i,
	getAccDescription: o,
	addSection: /* @__PURE__ */ t(({ label: e, value: t }) => {
		if (t < 0) throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);
		D.has(e) || (D.set(e, t), n.debug(`added new section: ${e}, with value: ${t}`));
	}, "addSection"),
	getSections: /* @__PURE__ */ t(() => D, "getSections"),
	setShowData: /* @__PURE__ */ t((e) => {
		O = e;
	}, "setShowData"),
	getShowData: /* @__PURE__ */ t(() => O, "getShowData")
}, j = /* @__PURE__ */ t((e, t) => {
	b(e, t), t.setShowData(e.showData), e.sections.map(t.addSection);
}, "populateDb"), M = { parse: /* @__PURE__ */ t(async (t) => {
	let r = await e("pie", t);
	n.debug(r), j(r, A);
}, "parse") }, N = /* @__PURE__ */ t((e) => `
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`, "getStyles"), P = /* @__PURE__ */ t((e) => {
	let t = [...e.values()].reduce((e, t) => e + t, 0), n = [...e.entries()].map(([e, t]) => ({
		label: e,
		value: t
	})).filter((e) => e.value / t * 100 >= 1);
	return w().value((e) => e.value).sort(null)(n);
}, "createPieArcs"), F = {
	parser: M,
	db: A,
	renderer: { draw: /* @__PURE__ */ t((e, t, r, i) => {
		n.debug("rendering pie chart\n" + e);
		let a = i.db, o = c(), s = v(a.getConfig(), o.pie), u = x(t), d = u.append("g");
		d.attr("transform", "translate(225,225)");
		let { themeVariables: f } = o, [m] = y(f.pieOuterStrokeWidth);
		m ??= 2;
		let h = s.legendPosition, g = s.textPosition, b = s.donutHole > 0 && s.donutHole <= .9 ? s.donutHole : 0, S = _().innerRadius(b * 185).outerRadius(185), C = _().innerRadius(185 * g).outerRadius(185 * g), w = d.append("g");
		w.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 185 + m / 2).attr("class", "pieOuterCircle");
		let T = a.getSections(), E = P(T), D = [
			f.pie1,
			f.pie2,
			f.pie3,
			f.pie4,
			f.pie5,
			f.pie6,
			f.pie7,
			f.pie8,
			f.pie9,
			f.pie10,
			f.pie11,
			f.pie12
		], O = 0;
		T.forEach((e) => {
			O += e;
		});
		let k = E.filter((e) => (e.data.value / O * 100).toFixed(0) !== "0"), A = p(D).domain([...T.keys()]);
		w.selectAll("mySlices").data(k).enter().append("path").attr("d", S).attr("fill", (e) => A(e.data.label)).attr("class", (e) => {
			let t = "pieCircle";
			return s.highlightSlice === "hover" ? t += " highlightedOnHover" : s.highlightSlice === e.data.label && (t += " highlighted"), t;
		}), w.selectAll("mySlices").data(k).enter().append("text").text((e) => (e.data.value / O * 100).toFixed(0) + "%").attr("transform", (e) => "translate(" + C.centroid(e) + ")").style("text-anchor", "middle").attr("class", "slice");
		let j = d.append("text").text(a.getDiagramTitle()).attr("x", 0).attr("y", -200).attr("class", "pieTitleText"), M = [...T.entries()].map(([e, t]) => ({
			label: e,
			value: t
		})), N = d.selectAll(".legend").data(M).enter().append("g").attr("class", "legend");
		N.append("rect").attr("width", 18).attr("height", 18).style("fill", (e) => A(e.label)).style("stroke", (e) => A(e.label)), N.append("text").attr("x", 22).attr("y", 14).text((e) => a.getShowData() ? `${e.label} [${e.value}]` : e.label);
		let F = Math.max(...N.selectAll("text").nodes().map((e) => e?.getBoundingClientRect().width ?? 0)), I = 450, L = 490, R = M.length * 22;
		switch (h) {
			case "center":
				N.attr("transform", (e, t) => {
					let n = 22 * M.length / 2, r = -F / 2 - 22, i = t * 22 - n;
					return "translate(" + r + "," + i + ")";
				});
				break;
			case "top":
				I += R, N.attr("transform", (e, t) => `translate(${-F / 2 - 22}, ${t * 22 - 185})`), w.attr("transform", () => `translate(0, ${R + 22})`);
				break;
			case "bottom":
				I += R, N.attr("transform", (e, t) => {
					let n = -F / 2 - 22, r = t * 22 - -207;
					return "translate(" + n + "," + r + ")";
				});
				break;
			case "left":
				L += 22 + F, N.attr("transform", (e, t) => {
					let n = 22 * M.length / 2;
					return "translate(-207," + (t * 22 - n) + ")";
				}), w.attr("transform", () => `translate(${F + 18 + 4}, 0)`);
				break;
			default: L += 22 + F, N.attr("transform", (e, t) => {
				let n = 22 * M.length / 2;
				return "translate(216," + (t * 22 - n) + ")";
			});
		}
		let z = j.node()?.getBoundingClientRect().width ?? 0, B = 225 - z / 2, V = 225 + z / 2, H = Math.min(0, B), U = Math.max(L, V) - H;
		u.attr("viewBox", `${H} 0 ${U} ${I}`), l(u, I, U, s.useMaxWidth);
	}, "draw") },
	styles: N
};
export { F as diagram };

import { n as e } from "./chunk-Y2CYZVJY-C5D8ORSv.mjs";
import { n as t, t as n } from "./src-mUhzjhMv.mjs";
import { R as r, h as i, p as a, r as o, s } from "./chunk-DSNLSHJZ-Bkq7f0Fy.mjs";
import { _ as c, a as l, c as u, d, f, g as ee, h as te, i as ne, l as re, m as ie, n as ae, o as oe, p as se, r as ce, s as le, t as ue, u as de, x as fe } from "./step-yaYNpUbH.mjs";
import { t as pe } from "./dist-DHQZ4SQy.mjs";
// ../../marktext/node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bump.js
var p = class {
	constructor(e, t) {
		this._context = e, this._x = t;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	}
	point(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
		}
		this._x0 = e, this._y0 = t;
	}
};
function m(e) {
	return new p(e, !0);
}
function h(e) {
	return new p(e, !1);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isPlainObject.mjs
function g(e) {
	if (typeof e != "object" || !e) return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	if (Object.prototype.toString.call(e) !== "[object Object]") {
		let t = e[Symbol.toStringTag];
		return t == null || !Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)?.writable ? !1 : e.toString() === `[object ${t}]`;
	}
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/function/noop.mjs
function me() {}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function _(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function v(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var y = "[object RegExp]", b = "[object String]", x = "[object Number]", S = "[object Boolean]", C = "[object Arguments]", w = "[object Symbol]", T = "[object Date]", E = "[object Map]", D = "[object Set]", O = "[object Array]", k = "[object ArrayBuffer]", he = "[object Object]", ge = "[object DataView]", _e = "[object Uint8Array]", ve = "[object Uint8ClampedArray]", ye = "[object Uint16Array]", be = "[object Uint32Array]", xe = "[object Int8Array]", Se = "[object Int16Array]", Ce = "[object Int32Array]", we = "[object Float32Array]", Te = "[object Float64Array]", Ee = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || (function() {
	return this;
})();
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function A(e) {
	return Ee.Buffer !== void 0 && Ee.Buffer.isBuffer(e);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/predicate/isLength.mjs
function De(e) {
	return Number.isSafeInteger(e) && e >= 0;
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function j(e) {
	return e != null && typeof e != "function" && De(e.length);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function Oe(e) {
	return e === "__proto__";
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function M(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function N(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function ke(e, t) {
	return P(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function P(e, t, n, r = /* @__PURE__ */ new Map(), i = void 0) {
	let a = i?.(e, t, n, r);
	if (a !== void 0) return a;
	if (M(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = P(e[a], a, n, r, i);
		return Object.hasOwn(e, "index") && (t.index = e.index), Object.hasOwn(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		r.set(e, t);
		for (let [a, o] of e) t.set(a, P(o, a, n, r, i));
		return t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		r.set(e, t);
		for (let a of e) t.add(P(a, void 0, n, r, i));
		return t;
	}
	if (A(e)) return e.subarray();
	if (N(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = P(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (typeof Blob < "u" && e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (e instanceof Error) {
		let t = structuredClone(e);
		return r.set(e, t), t.message = e.message, t.name = e.name, t.stack = e.stack, t.cause = e.cause, t.constructor = e.constructor, F(t, e, n, r, i), t;
	}
	if (e instanceof Boolean) {
		let t = new Boolean(e.valueOf());
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (e instanceof Number) {
		let t = new Number(e.valueOf());
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (e instanceof String) {
		let t = new String(e.valueOf());
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	if (typeof e == "object" && Ae(e)) {
		let t = Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), F(t, e, n, r, i), t;
	}
	return e;
}
function F(e, t, n = e, r, i) {
	let a = [...Object.keys(t), ..._(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = P(t[s], s, n, r, i));
	}
}
function Ae(e) {
	switch (v(e)) {
		case C:
		case O:
		case k:
		case ge:
		case S:
		case T:
		case we:
		case Te:
		case xe:
		case Se:
		case Ce:
		case E:
		case x:
		case he:
		case y:
		case D:
		case b:
		case w:
		case _e:
		case ve:
		case ye:
		case be: return !0;
		default: return !1;
	}
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function je(e, t) {
	return ke(e, (n, r, i, a) => {
		let o = t?.(n, r, i, a);
		if (o !== void 0) return o;
		if (typeof e == "object") {
			if (v(e) === "[object Object]" && typeof e.constructor != "function") {
				let t = {};
				return a.set(e, t), F(t, e, i, a), t;
			}
			switch (Object.prototype.toString.call(e)) {
				case x:
				case b:
				case S: {
					let t = new e.constructor(e?.valueOf());
					return F(t, e), t;
				}
				case C: {
					let t = {};
					return F(t, e), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
				}
				default: return;
			}
		}
	});
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function I(e) {
	return je(e);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function L(e) {
	return typeof e == "object" && !!e && v(e) === "[object Arguments]";
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isObjectLike.mjs
function R(e) {
	return typeof e == "object" && !!e;
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isArrayLikeObject.mjs
function Me(e) {
	return R(e) && j(e);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/function/memoize.mjs
function z(e, t) {
	if (typeof e != "function" || t != null && typeof t != "function") throw TypeError("Expected a function");
	let n = function(...r) {
		let i = t ? t.apply(this, r) : r[0], a = n.cache;
		if (a.has(i)) return a.get(i);
		let o = e.apply(this, r);
		return n.cache = a.set(i, o) || a, o;
	};
	return n.cache = new (z.Cache || Map)(), n;
}
z.Cache = Map;
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/predicate/isTypedArray.mjs
function B(e) {
	return N(e);
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/object/clone.mjs
function Ne(e) {
	if (M(e)) return e;
	if (Array.isArray(e) || N(e) || e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	let t = Object.getPrototypeOf(e);
	if (t == null) return Object.assign(Object.create(t), e);
	let n = t.constructor;
	if (e instanceof Date || e instanceof Map || e instanceof Set) return new n(e);
	if (e instanceof RegExp) {
		let t = new n(e);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof DataView) return new n(e.buffer.slice(0));
	if (e instanceof Error) {
		let t;
		return t = e instanceof AggregateError ? new n(e.errors, e.message, { cause: e.cause }) : new n(e.message, { cause: e.cause }), t.stack = e.stack, Object.assign(t, e), t;
	}
	return typeof File < "u" && e instanceof File ? new n([e], e.name, {
		type: e.type,
		lastModified: e.lastModified
	}) : typeof e == "object" ? Object.assign(Object.create(t), e) : e;
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/object/mergeWith.mjs
function Pe(e, ...t) {
	let n = t.slice(0, -1), r = t[t.length - 1], i = e;
	for (let e = 0; e < n.length; e++) {
		let t = n[e];
		i = V(i, t, r, /* @__PURE__ */ new Map());
	}
	return i;
}
function V(e, t, n, r) {
	if (M(e) && (e = Object(e)), typeof t != "object" || !t) return e;
	if (r.has(t)) return Ne(r.get(t));
	if (r.set(t, e), Array.isArray(t)) {
		t = t.slice();
		for (let e = 0; e < t.length; e++) t[e] = t[e] ?? void 0;
	}
	let i = [...Object.keys(t), ..._(t)];
	for (let a = 0; a < i.length; a++) {
		let o = i[a];
		if (Oe(o)) continue;
		let s = t[o], c = e[o];
		if (L(s) && (s = { ...s }), L(c) && (c = { ...c }), A(s) && (s = I(s)), Array.isArray(s)) {
			if (Array.isArray(c)) {
				let e = [], t = Reflect.ownKeys(c);
				for (let n = 0; n < t.length; n++) {
					let r = t[n];
					e[r] = c[r];
				}
				c = e;
			} else if (Me(c)) {
				let e = [];
				for (let t = 0; t < c.length; t++) e[t] = c[t];
				c = e;
			} else c = [];
		}
		let l = n(c, s, o, e, t, r);
		l === void 0 ? Array.isArray(s) || R(c) && R(s) && (g(c) || g(s) || B(c) || B(s)) ? e[o] = V(c, s, n, r) : c == null && g(s) ? e[o] = V({}, s, n, r) : c == null && B(s) ? e[o] = I(s) : (c === void 0 || s !== void 0) && (e[o] = s) : e[o] = l;
	}
	return e;
}
// ../../marktext/node_modules/.pnpm/es-toolkit@1.47.1/node_modules/es-toolkit/dist/compat/object/merge.mjs
function Fe(e, ...t) {
	return Pe(e, ...t, me);
}
// ../../marktext/node_modules/.pnpm/mermaid@12.2.0/node_modules/mermaid/dist/chunks/mermaid.core/chunk-7S6XSTFO.mjs
var Ie = pe(), Le = {
	curveBasis: c,
	curveBasisClosed: ee,
	curveBasisOpen: te,
	curveBumpX: m,
	curveBumpY: h,
	curveBundle: ie,
	curveCardinalClosed: f,
	curveCardinalOpen: d,
	curveCardinal: se,
	curveCatmullRomClosed: re,
	curveCatmullRomOpen: u,
	curveCatmullRom: de,
	curveLinear: fe,
	curveLinearClosed: le,
	curveMonotoneX: l,
	curveMonotoneY: oe,
	curveNatural: ne,
	curveStep: ce,
	curveStepAfter: ue,
	curveStepBefore: ae
}, Re = /\s*(?:(\w+)(?=:):|(\w+))\s*(?:(\w+)|((?:(?!}%{2}).|\r?\n)*))?\s*(?:}%{2})?/gi, ze = /* @__PURE__ */ e(function(e, t) {
	let n = H(e, /(?:init\b)|(?:initialize\b)/), i = {};
	if (Array.isArray(n)) {
		let e = n.map((e) => e.args);
		r(e), i = o(i, [...e]);
	} else i = n.args;
	if (!i) return;
	let s = a(e, t), c = "config";
	return i[c] !== void 0 && (s === "flowchart-v2" && (s = "flowchart"), i[s] = i[c], delete i[c]), i;
}, "detectInit"), H = /* @__PURE__ */ e(function(e, n = null) {
	try {
		let r = RegExp(`[%]{2}(?![{]${Re.source})(?=[}][%]{2}).*
`, "ig");
		e = e.trim().replace(r, "").replace(/'/gm, "\""), t.debug(`Detecting diagram directive${n === null ? "" : " type:" + n} based on the text:${e}`);
		let a, o = [];
		for (; (a = i.exec(e)) !== null;) if (a.index === i.lastIndex && i.lastIndex++, a && !n || n && a[1]?.match(n) || n && a[2]?.match(n)) {
			let e = a[1] ? a[1] : a[2], t = a[3] ? a[3].trim() : a[4] ? JSON.parse(a[4].trim()) : null;
			o.push({
				type: e,
				args: t
			});
		}
		return o.length === 0 ? {
			type: e,
			args: null
		} : o.length === 1 ? o[0] : o;
	} catch (r) {
		return t.error(`ERROR: ${r.message} - Unable to parse directive type: '${n}' based on the text: '${e}'`), {
			type: void 0,
			args: null
		};
	}
}, "detectDirective"), Be = /* @__PURE__ */ e(function(e) {
	return e.replace(i, "");
}, "removeDirectives"), Ve = /* @__PURE__ */ e(function(e, t) {
	for (let [n, r] of t.entries()) if (r.match(e)) return n;
	return -1;
}, "isSubstringInArray");
function U(e, t) {
	return e ? Le[`curve${e.charAt(0).toUpperCase() + e.slice(1)}`] ?? t : t;
}
e(U, "interpolateToCurve");
function He(e, t) {
	let n = e.trim();
	if (n) return t.securityLevel === "loose" ? n : (0, Ie.sanitizeUrl)(n);
}
e(He, "formatUrl");
var Ue = /* @__PURE__ */ e((e, ...n) => {
	let r = e.split("."), i = r.length - 1, a = r[i], o = window;
	for (let n = 0; n < i; n++) if (o = o[r[n]], !o) {
		t.error(`Function name: ${e} not found in window`);
		return;
	}
	o[a](...n);
}, "runFunc");
function W(e, t) {
	return !e || !t ? 0 : Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
e(W, "distance");
function We(e) {
	let t, n = 0;
	return e.forEach((e) => {
		n += W(e, t), t = e;
	}), G(e, n / 2);
}
e(We, "traverseEdge");
function Ge(e) {
	return e.length === 1 ? e[0] : We(e);
}
e(Ge, "calcLabelPosition");
var Ke = /* @__PURE__ */ e((e, t = 2) => {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}, "roundNumber"), G = /* @__PURE__ */ e((e, t) => {
	let n, r = t;
	for (let t of e) {
		if (n) {
			let e = W(t, n);
			if (e === 0) return n;
			if (e < r) r -= e;
			else {
				let i = r / e;
				if (i <= 0) return n;
				if (i >= 1) return {
					x: t.x,
					y: t.y
				};
				if (i > 0 && i < 1) return {
					x: Ke((1 - i) * n.x + i * t.x, 5),
					y: Ke((1 - i) * n.y + i * t.y, 5)
				};
			}
		}
		n = t;
	}
	throw Error("Could not find a suitable point for the given distance");
}, "calculatePoint"), qe = /* @__PURE__ */ e((e, n, r) => {
	t.info(`our points ${JSON.stringify(n)}`), n[0] !== r && (n = n.reverse());
	let i = G(n, 25), a = e ? 10 : 5, o = Math.atan2(n[0].y - i.y, n[0].x - i.x), s = {
		x: 0,
		y: 0
	};
	return s.x = Math.sin(o) * a + (n[0].x + i.x) / 2, s.y = -Math.cos(o) * a + (n[0].y + i.y) / 2, s;
}, "calcCardinalityPosition");
function Je(e, n, r) {
	let i = structuredClone(r);
	t.info("our points", i), n !== "start_left" && n !== "start_right" && i.reverse();
	let a = G(i, 25 + e), o = 10 + e * .5, s = Math.atan2(i[0].y - a.y, i[0].x - a.x), c = {
		x: 0,
		y: 0
	};
	return n === "start_left" ? (c.x = Math.sin(s + Math.PI) * o + (i[0].x + a.x) / 2, c.y = -Math.cos(s + Math.PI) * o + (i[0].y + a.y) / 2) : n === "end_right" ? (c.x = Math.sin(s - Math.PI) * o + (i[0].x + a.x) / 2, c.y = -Math.cos(s - Math.PI) * o + (i[0].y + a.y) / 2) : (c.x = Math.sin(s) * o + (i[0].x + a.x) / 2, c.y = -Math.cos(s) * o + (i[0].y + a.y) / 2), c;
}
e(Je, "calcTerminalLabelPosition");
function K(e) {
	let t = "", n = "";
	for (let r of e) r !== void 0 && (r.startsWith("color:") || r.startsWith("text-align:") ? n = n + r + ";" : t = t + r + ";");
	return {
		style: t,
		labelStyle: n
	};
}
e(K, "getStylesFromArray");
var Ye = 0, Xe = /* @__PURE__ */ e(() => (Ye++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + Ye), "generateId");
function Ze(e) {
	let t = "";
	for (let n = 0; n < e; n++) t += "0123456789abcdef".charAt(Math.floor(Math.random() * 16));
	return t;
}
e(Ze, "makeRandomHex");
var Qe = /* @__PURE__ */ e((e) => Ze(e.length), "random"), $e = /* @__PURE__ */ e(function() {
	return {
		x: 0,
		y: 0,
		fill: void 0,
		anchor: "start",
		style: "#666",
		width: 100,
		height: 100,
		textMargin: 0,
		rx: 0,
		ry: 0,
		valign: void 0,
		text: ""
	};
}, "getTextObj"), et = /* @__PURE__ */ e(function(e, t) {
	let n = t.text.replace(s.lineBreakRegex, " "), [, r] = Q(t.fontSize), i = e.append("text");
	i.attr("x", t.x), i.attr("y", t.y), i.style("text-anchor", t.anchor), i.style("font-family", t.fontFamily), i.style("font-size", r), i.style("font-weight", t.fontWeight), i.attr("fill", t.fill), t.class !== void 0 && i.attr("class", t.class);
	let a = i.append("tspan");
	return a.attr("x", t.x + t.textMargin * 2), a.attr("fill", t.fill), a.text(n), i;
}, "drawSimpleText"), q = z((e, t, n) => {
	if (!e || (n = Object.assign({
		fontSize: 12,
		fontWeight: 400,
		fontFamily: "Arial",
		joinWith: "<br/>"
	}, n), s.hasBreaks(e))) return e;
	let r = e.split(" ").filter(Boolean), i = [], a = "";
	return r.forEach((e, o) => {
		let s = Y(`${e} `, n), c = Y(a, n);
		if (s > t) {
			let { hyphenatedStrings: r, remainingWord: o } = tt(e, t, "-", n);
			i.push(a, ...r), a = o;
		} else c + s >= t ? (i.push(a), a = e) : a = [a, e].filter(Boolean).join(" ");
		o + 1 === r.length && i.push(a);
	}), i.filter((e) => e !== "").join(n.joinWith);
}, (e, t, n) => `${e}${t}${n.fontSize}${n.fontWeight}${n.fontFamily}${n.joinWith}`), tt = z((e, t, n = "-", r) => {
	r = Object.assign({
		fontSize: 12,
		fontWeight: 400,
		fontFamily: "Arial",
		margin: 0
	}, r);
	let i = [...e], a = [], o = "";
	return i.forEach((e, s) => {
		let c = `${o}${e}`;
		if (Y(c, r) >= t) {
			let e = s + 1, t = i.length === e, r = `${c}${n}`;
			a.push(t ? c : r), o = "";
		} else o = c;
	}), {
		hyphenatedStrings: a,
		remainingWord: o
	};
}, (e, t, n = "-", r) => `${e}${t}${n}${r.fontSize}${r.fontWeight}${r.fontFamily}`);
function J(e, t) {
	return X(e, t).height;
}
e(J, "calculateTextHeight");
function Y(e, t) {
	return X(e, t).width;
}
e(Y, "calculateTextWidth");
var X = z((e, t) => {
	let { fontSize: r = 12, fontFamily: i = "Arial", fontWeight: a = 400 } = t;
	if (!e) return {
		width: 0,
		height: 0
	};
	let [, o] = Q(r), c = ["sans-serif", i], l = e.split(s.lineBreakRegex), u = [], d = n("body");
	if (!d.remove) return {
		width: 0,
		height: 0,
		lineHeight: 0
	};
	let f = d.append("svg");
	for (let e of c) {
		let t = 0, n = {
			width: 0,
			height: 0,
			lineHeight: 0
		};
		for (let r of l) {
			let i = $e();
			i.text = r || "​";
			let s = et(f, i).style("font-size", o).style("font-weight", a).style("font-family", e), c = (s._groups || s)[0][0].getBBox();
			if (c.width === 0 && c.height === 0) throw Error("svg element not in render tree");
			n.width = Math.round(Math.max(n.width, c.width)), t = Math.round(c.height), n.height += t, n.lineHeight = Math.round(Math.max(n.lineHeight, t));
		}
		u.push(n);
	}
	return f.remove(), u[isNaN(u[1].height) || isNaN(u[1].width) || isNaN(u[1].lineHeight) || u[0].height > u[1].height && u[0].width > u[1].width && u[0].lineHeight > u[1].lineHeight ? 0 : 1];
}, (e, t) => `${e}${t.fontSize}${t.fontWeight}${t.fontFamily}`), nt = class {
	constructor(e = !1, t) {
		this.count = 0, this.count = t ? t.length : 0, this.next = e ? () => this.count++ : () => Date.now();
	}
	static {
		e(this, "InitIDGenerator");
	}
}, Z, rt = /* @__PURE__ */ e(function(e) {
	return Z ||= document.createElement("div"), e = escape(e).replace(/%26/g, "&").replace(/%23/g, "#").replace(/%3B/g, ";"), Z.innerHTML = e, unescape(Z.textContent);
}, "entityDecode");
function it(e) {
	return "str" in e;
}
e(it, "isDetailedError");
function at(e) {
	return e instanceof Error ? e.message : String(e);
}
e(at, "getErrorMessage");
var ot = /* @__PURE__ */ e((e, t, n, r) => {
	if (!r) return;
	let i = e.node()?.getBBox();
	i && e.append("text").text(r).attr("text-anchor", "middle").attr("x", i.x + i.width / 2).attr("y", -n).attr("class", t);
}, "insertTitle"), Q = /* @__PURE__ */ e((e) => {
	if (typeof e == "number") return [e, e + "px"];
	let t = parseInt(e ?? "", 10);
	return Number.isNaN(t) ? [void 0, void 0] : e === String(t) ? [t, e + "px"] : [t, e];
}, "parseFontSize");
function $(e, t) {
	return Fe({}, e, t);
}
e($, "cleanAndMerge");
var st = {
	assignWithDepth: o,
	wrapLabel: q,
	calculateTextHeight: J,
	calculateTextWidth: Y,
	calculateTextDimensions: X,
	cleanAndMerge: $,
	detectInit: ze,
	detectDirective: H,
	isSubstringInArray: Ve,
	interpolateToCurve: U,
	calcLabelPosition: Ge,
	calcCardinalityPosition: qe,
	calcTerminalLabelPosition: Je,
	formatUrl: He,
	getStylesFromArray: K,
	generateId: Xe,
	random: Qe,
	runFunc: Ue,
	entityDecode: rt,
	insertTitle: ot,
	isLabelCoordinateInPath: ft,
	parseFontSize: Q,
	InitIDGenerator: nt
}, ct = /* @__PURE__ */ e(function(e) {
	let t = e;
	return t = t.replace(/style.*:\S*#.*;/g, function(e) {
		return e.substring(0, e.length - 1);
	}), t = t.replace(/classDef.*:\S*#.*;/g, function(e) {
		return e.substring(0, e.length - 1);
	}), t = t.replace(/#\w+;/g, function(e) {
		let t = e.substring(1, e.length - 1);
		return /^\+?\d+$/.test(t) ? "ﬂ°°" + t + "¶ß" : "ﬂ°" + t + "¶ß";
	}), t;
}, "encodeEntities"), lt = /* @__PURE__ */ e(function(e) {
	return e.replace(/ﬂ°°/g, "&#").replace(/ﬂ°/g, "&").replace(/¶ß/g, ";");
}, "decodeEntities"), ut = /* @__PURE__ */ e((e, t, { counter: n = 0, prefix: r, suffix: i }, a) => a || `${r ? `${r}_` : ""}${e}_${t}_${n}${i ? `_${i}` : ""}`, "getEdgeId");
function dt(e) {
	return e ?? null;
}
e(dt, "handleUndefinedAttr");
function ft(e, t) {
	let n = Math.round(e.x), r = Math.round(e.y), i = t.replace(/(\d+\.\d+)/g, (e) => Math.round(parseFloat(e)).toString());
	return i.includes(n.toString()) || i.includes(r.toString());
}
e(ft, "isLabelCoordinateInPath");
export { we as A, b as B, A as C, S as D, O as E, E as F, ve as G, ye as H, x as I, h as J, v as K, he as L, Se as M, Ce as N, ge as O, xe as P, y as R, j as S, k as T, be as U, w as V, _e as W, st as _, lt as a, L as b, ut as c, dt as d, U as f, Be as g, Qe as h, $ as i, Te as j, T as k, at as l, Q as m, J as n, ct as o, it as p, m as q, Y as r, Xe as s, X as t, K as u, q as v, C as w, M as x, B as y, D as z };

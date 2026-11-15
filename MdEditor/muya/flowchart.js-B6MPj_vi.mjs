import { t as e } from "./rolldown-runtime-CwxnZyOB.mjs";
// ../../marktext/node_modules/.pnpm/flowchart.js@1.18.1/node_modules/flowchart.js/src/flowchart.shim.js
var t = /* @__PURE__ */ e((() => {
	Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
		if (this === null) throw TypeError();
		var t = Object(this), n = t.length >>> 0;
		if (n === 0) return -1;
		var r = 0;
		if (arguments.length > 0 && (r = Number(arguments[1]), r == r ? r !== 0 && r != Infinity && r != -Infinity && (r = (r > 0 || -1) * Math.floor(Math.abs(r))) : r = 0), r >= n) return -1;
		for (var i = r >= 0 ? r : Math.max(n - Math.abs(r), 0); i < n; i++) if (i in t && t[i] === e) return i;
		return -1;
	}), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
		if (this === null) throw TypeError();
		var t = Object(this), n = t.length >>> 0;
		if (n === 0) return -1;
		var r = n;
		arguments.length > 1 && (r = Number(arguments[1]), r == r ? r !== 0 && r != 1 / 0 && r != -Infinity && (r = (r > 0 || -1) * Math.floor(Math.abs(r))) : r = 0);
		for (var i = r >= 0 ? Math.min(r, n - 1) : n - Math.abs(r); i >= 0; i--) if (i in t && t[i] === e) return i;
		return -1;
	}), String.prototype.trim || (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	});
})), n = /* @__PURE__ */ e(((e, t) => {
	(function(n, r) {
		typeof e == "object" && typeof t == "object" ? t.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof e == "object" ? e.Raphael = r() : n.Raphael = r();
	})(window, function() {
		return function(e) {
			var t = {};
			function n(r) {
				if (t[r]) return t[r].exports;
				var i = t[r] = {
					i: r,
					l: !1,
					exports: {}
				};
				return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
			}
			return n.m = e, n.c = t, n.d = function(e, t, r) {
				n.o(e, t) || Object.defineProperty(e, t, {
					enumerable: !0,
					get: r
				});
			}, n.r = function(e) {
				typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
			}, n.t = function(e, t) {
				if (1 & t && (e = n(e)), 8 & t || 4 & t && typeof e == "object" && e && e.__esModule) return e;
				var r = Object.create(null);
				if (n.r(r), Object.defineProperty(r, "default", {
					enumerable: !0,
					value: e
				}), 2 & t && typeof e != "string") for (var i in e) n.d(r, i, function(t) {
					return e[t];
				}.bind(null, i));
				return r;
			}, n.n = function(e) {
				var t = e && e.__esModule ? function() {
					return e.default;
				} : function() {
					return e;
				};
				return n.d(t, "a", t), t;
			}, n.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}, n.p = "", n(n.s = 1);
		}([
			function(e, t, n) {
				var r = [n(2)], i;
				(i = function(e) {
					function t(r) {
						if (t.is(r, "function")) return n ? r() : e.on("raphael.DOMload", r);
						if (t.is(r, O)) return t._engine.create[d](t, r.splice(0, 3 + t.is(r[0], D))).add(r);
						var i = Array.prototype.slice.call(arguments, 0);
						if (t.is(i[i.length - 1], "function")) {
							var a = i.pop();
							return n ? a.call(t._engine.create[d](t, i)) : e.on("raphael.DOMload", function() {
								a.call(t._engine.create[d](t, i));
							});
						}
						return t._engine.create[d](t, arguments);
					}
					t.version = "2.3.0", t.eve = e;
					var n, r, i = /[, ]+/, a = {
						circle: 1,
						rect: 1,
						path: 1,
						ellipse: 1,
						text: 1,
						image: 1
					}, o = /\{(\d+)\}/g, s = "hasOwnProperty", c = {
						doc: document,
						win: window
					}, l = {
						was: Object.prototype[s].call(c.win, "Raphael"),
						is: c.win.Raphael
					}, u = function() {
						this.ca = this.customAttributes = {};
					}, d = "apply", f = "concat", p = "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, m = "", h = " ", g = String, _ = "split", v = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[_](h), y = {
						mousedown: "touchstart",
						mousemove: "touchmove",
						mouseup: "touchend"
					}, b = g.prototype.toLowerCase, x = Math, S = x.max, C = x.min, w = x.abs, T = x.pow, E = x.PI, D = "number", O = "array", k = Object.prototype.toString, A = (t._ISURL = /^url\(['"]?(.+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), j = {
						NaN: 1,
						Infinity: 1,
						"-Infinity": 1
					}, M = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, N = x.round, P = parseFloat, F = parseInt, I = g.prototype.toUpperCase, L = t._availableAttrs = {
						"arrow-end": "none",
						"arrow-start": "none",
						blur: 0,
						"clip-rect": "0 0 1e9 1e9",
						cursor: "default",
						cx: 0,
						cy: 0,
						fill: "#fff",
						"fill-opacity": 1,
						font: "10px \"Arial\"",
						"font-family": "\"Arial\"",
						"font-size": "10",
						"font-style": "normal",
						"font-weight": 400,
						gradient: 0,
						height: 0,
						href: "http://raphaeljs.com/",
						"letter-spacing": 0,
						opacity: 1,
						path: "M0,0",
						r: 0,
						rx: 0,
						ry: 0,
						src: "",
						stroke: "#000",
						"stroke-dasharray": "",
						"stroke-linecap": "butt",
						"stroke-linejoin": "butt",
						"stroke-miterlimit": 0,
						"stroke-opacity": 1,
						"stroke-width": 1,
						target: "_blank",
						"text-anchor": "middle",
						title: "Raphael",
						transform: "",
						width: 0,
						x: 0,
						y: 0,
						class: ""
					}, R = t._availableAnimAttrs = {
						blur: D,
						"clip-rect": "csv",
						cx: D,
						cy: D,
						fill: "colour",
						"fill-opacity": D,
						"font-size": D,
						height: D,
						opacity: D,
						path: "path",
						r: D,
						rx: D,
						ry: D,
						stroke: "colour",
						"stroke-opacity": D,
						"stroke-width": D,
						transform: "transform",
						width: D,
						x: D,
						y: D
					}, z = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, B = {
						hs: 1,
						rg: 1
					}, V = /,?([achlmqrstvxz]),?/gi, H = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, U = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, W = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, G = (t._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), K = function(e, t) {
						return P(e) - P(t);
					}, q = function(e) {
						return e;
					}, J = t._rectPath = function(e, t, n, r, i) {
						return i ? [
							[
								"M",
								e + i,
								t
							],
							[
								"l",
								n - 2 * i,
								0
							],
							[
								"a",
								i,
								i,
								0,
								0,
								1,
								i,
								i
							],
							[
								"l",
								0,
								r - 2 * i
							],
							[
								"a",
								i,
								i,
								0,
								0,
								1,
								-i,
								i
							],
							[
								"l",
								2 * i - n,
								0
							],
							[
								"a",
								i,
								i,
								0,
								0,
								1,
								-i,
								-i
							],
							[
								"l",
								0,
								2 * i - r
							],
							[
								"a",
								i,
								i,
								0,
								0,
								1,
								i,
								-i
							],
							["z"]
						] : [
							[
								"M",
								e,
								t
							],
							[
								"l",
								n,
								0
							],
							[
								"l",
								0,
								r
							],
							[
								"l",
								-n,
								0
							],
							["z"]
						];
					}, ee = function(e, t, n, r) {
						return r ??= n, [
							[
								"M",
								e,
								t
							],
							[
								"m",
								0,
								-r
							],
							[
								"a",
								n,
								r,
								0,
								1,
								1,
								0,
								2 * r
							],
							[
								"a",
								n,
								r,
								0,
								1,
								1,
								0,
								-2 * r
							],
							["z"]
						];
					}, te = t._getPath = {
						path: function(e) {
							return e.attr("path");
						},
						circle: function(e) {
							var t = e.attrs;
							return ee(t.cx, t.cy, t.r);
						},
						ellipse: function(e) {
							var t = e.attrs;
							return ee(t.cx, t.cy, t.rx, t.ry);
						},
						rect: function(e) {
							var t = e.attrs;
							return J(t.x, t.y, t.width, t.height, t.r);
						},
						image: function(e) {
							var t = e.attrs;
							return J(t.x, t.y, t.width, t.height);
						},
						text: function(e) {
							var t = e._getBBox();
							return J(t.x, t.y, t.width, t.height);
						},
						set: function(e) {
							var t = e._getBBox();
							return J(t.x, t.y, t.width, t.height);
						}
					}, ne = t.mapPath = function(e, t) {
						if (!t) return e;
						for (var n, r, i = 0, a, o = (e = je(e)).length, s, c; i < o; i++) for (a = 1, s = (c = e[i]).length; a < s; a += 2) n = t.x(c[a], c[a + 1]), r = t.y(c[a], c[a + 1]), c[a] = n, c[a + 1] = r;
						return e;
					};
					if (t._g = c, t.type = c.win.SVGAngle || c.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", t.type == "VML") {
						var re, ie = c.doc.createElement("div");
						if (ie.innerHTML = "<v:shape adj=\"1\"/>", (re = ie.firstChild).style.behavior = "url(#default#VML)", !re || typeof re.adj != "object") return t.type = m;
						ie = null;
					}
					function ae(e) {
						if (typeof e == "function" || Object(e) !== e) return e;
						var t = new e.constructor();
						for (var n in e) e[s](n) && (t[n] = ae(e[n]));
						return t;
					}
					t.svg = !(t.vml = t.type == "VML"), t._Paper = u, t.fn = r = u.prototype = t.prototype, t._id = 0, t.is = function(e, t) {
						return (t = b.call(t)) == "finite" ? !j[s](+e) : t == "array" ? e instanceof Array : t == "null" && e === null || t == typeof e && e !== null || t == "object" && e === Object(e) || t == "array" && Array.isArray && Array.isArray(e) || k.call(e).slice(8, -1).toLowerCase() == t;
					}, t.angle = function(e, n, r, i, a, o) {
						if (a == null) {
							var s = e - r, c = n - i;
							return s || c ? (180 + 180 * x.atan2(-c, -s) / E + 360) % 360 : 0;
						}
						return t.angle(e, n, a, o) - t.angle(r, i, a, o);
					}, t.rad = function(e) {
						return e % 360 * E / 180;
					}, t.deg = function(e) {
						return Math.round(180 * e / E % 360 * 1e3) / 1e3;
					}, t.snapTo = function(e, n, r) {
						if (r = t.is(r, "finite") ? r : 10, t.is(e, O)) {
							for (var i = e.length; i--;) if (w(e[i] - n) <= r) return e[i];
						} else {
							var a = n % (e = +e);
							if (a < r) return n - a;
							if (a > e - r) return n - a + e;
						}
						return n;
					};
					var oe, se;
					t.createUUID = (oe = /[xy]/g, se = function(e) {
						var t = 16 * x.random() | 0;
						return (e == "x" ? t : 3 & t | 8).toString(16);
					}, function() {
						return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(oe, se).toUpperCase();
					}), t.setWindow = function(n) {
						e("raphael.setWindow", t, c.win, n), c.win = n, c.doc = c.win.document, t._engine.initWin && t._engine.initWin(c.win);
					};
					var ce = function(e) {
						if (t.vml) {
							var n, r = /^\s+|\s+$/g;
							try {
								var i = new ActiveXObject("htmlfile");
								i.write("<body>"), i.close(), n = i.body;
							} catch {
								n = createPopup().document.body;
							}
							var a = n.createTextRange();
							ce = Y(function(e) {
								try {
									n.style.color = g(e).replace(r, m);
									var t = a.queryCommandValue("ForeColor");
									return "#" + ("000000" + (t = (255 & t) << 16 | 65280 & t | (16711680 & t) >>> 16).toString(16)).slice(-6);
								} catch {
									return "none";
								}
							});
						} else {
							var o = c.doc.createElement("i");
							o.title = "Raphaël Colour Picker", o.style.display = "none", c.doc.body.appendChild(o), ce = Y(function(e) {
								return o.style.color = e, c.doc.defaultView.getComputedStyle(o, m).getPropertyValue("color");
							});
						}
						return ce(e);
					}, le = function() {
						return "hsb(" + [
							this.h,
							this.s,
							this.b
						] + ")";
					}, ue = function() {
						return "hsl(" + [
							this.h,
							this.s,
							this.l
						] + ")";
					}, de = function() {
						return this.hex;
					}, fe = function(e, n, r) {
						if (n == null && t.is(e, "object") && "r" in e && "g" in e && "b" in e && (r = e.b, n = e.g, e = e.r), n == null && t.is(e, "string")) {
							var i = t.getRGB(e);
							e = i.r, n = i.g, r = i.b;
						}
						return (e > 1 || n > 1 || r > 1) && (e /= 255, n /= 255, r /= 255), [
							e,
							n,
							r
						];
					}, pe = function(e, n, r, i) {
						var a = {
							r: e *= 255,
							g: n *= 255,
							b: r *= 255,
							hex: t.rgb(e, n, r),
							toString: de
						};
						return t.is(i, "finite") && (a.opacity = i), a;
					};
					function Y(e, t, n) {
						return function r() {
							var i = Array.prototype.slice.call(arguments, 0), a = i.join("␀"), o = r.cache = r.cache || {}, c = r.count = r.count || [];
							return o[s](a) ? (function(e, t) {
								for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return e.push(e.splice(n, 1)[0]);
							}(c, a), n ? n(o[a]) : o[a]) : (c.length >= 1e3 && delete o[c.shift()], c.push(a), o[a] = e[d](t, i), n ? n(o[a]) : o[a]);
						};
					}
					t.color = function(e) {
						var n;
						return t.is(e, "object") && "h" in e && "s" in e && "b" in e ? (n = t.hsb2rgb(e), e.r = n.r, e.g = n.g, e.b = n.b, e.hex = n.hex) : t.is(e, "object") && "h" in e && "s" in e && "l" in e ? (n = t.hsl2rgb(e), e.r = n.r, e.g = n.g, e.b = n.b, e.hex = n.hex) : (t.is(e, "string") && (e = t.getRGB(e)), t.is(e, "object") && "r" in e && "g" in e && "b" in e ? (n = t.rgb2hsl(e), e.h = n.h, e.s = n.s, e.l = n.l, n = t.rgb2hsb(e), e.v = n.b) : (e = { hex: "none" }).r = e.g = e.b = e.h = e.s = e.v = e.l = -1), e.toString = de, e;
					}, t.hsb2rgb = function(e, t, n, r) {
						var i, a, o, s, c;
						return this.is(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b, t = e.s, r = e.o, e = e.h), s = (c = n * t) * (1 - w((e = (e *= 360) % 360 / 60) % 2 - 1)), i = a = o = n - c, pe(i += [
							c,
							s,
							0,
							0,
							s,
							c
						][e = ~~e], a += [
							s,
							c,
							c,
							s,
							0,
							0
						][e], o += [
							0,
							0,
							s,
							c,
							c,
							s
						][e], r);
					}, t.hsl2rgb = function(e, t, n, r) {
						var i, a, o, s, c;
						return this.is(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), s = (c = 2 * t * (n < .5 ? n : 1 - n)) * (1 - w((e = (e *= 360) % 360 / 60) % 2 - 1)), i = a = o = n - c / 2, pe(i += [
							c,
							s,
							0,
							0,
							s,
							c
						][e = ~~e], a += [
							s,
							c,
							c,
							s,
							0,
							0
						][e], o += [
							0,
							0,
							s,
							c,
							c,
							s
						][e], r);
					}, t.rgb2hsb = function(e, t, n) {
						var r, i;
						return e = (n = fe(e, t, n))[0], t = n[1], n = n[2], {
							h: (((i = (r = S(e, t, n)) - C(e, t, n)) == 0 ? null : r == e ? (t - n) / i : r == t ? (n - e) / i + 2 : (e - t) / i + 4) + 360) % 6 * 60 / 360,
							s: i == 0 ? 0 : i / r,
							b: r,
							toString: le
						};
					}, t.rgb2hsl = function(e, t, n) {
						var r, i, a, o;
						return e = (n = fe(e, t, n))[0], t = n[1], n = n[2], r = ((i = S(e, t, n)) + (a = C(e, t, n))) / 2, {
							h: (((o = i - a) == 0 ? null : i == e ? (t - n) / o : i == t ? (n - e) / o + 2 : (e - t) / o + 4) + 360) % 6 * 60 / 360,
							s: o == 0 ? 0 : r < .5 ? o / (2 * r) : o / (2 - 2 * r),
							l: r,
							toString: ue
						};
					}, t._path2string = function() {
						return this.join(",").replace(V, "$1");
					}, t._preload = function(e, t) {
						var n = c.doc.createElement("img");
						n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function() {
							t.call(this), this.onload = null, c.doc.body.removeChild(this);
						}, n.onerror = function() {
							c.doc.body.removeChild(this);
						}, c.doc.body.appendChild(n), n.src = e;
					};
					function me() {
						return this.hex;
					}
					function he(e, t) {
						for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
							var a = [
								{
									x: +e[r - 2],
									y: +e[r - 1]
								},
								{
									x: +e[r],
									y: +e[r + 1]
								},
								{
									x: +e[r + 2],
									y: +e[r + 3]
								},
								{
									x: +e[r + 4],
									y: +e[r + 5]
								}
							];
							t ? r ? i - 4 == r ? a[3] = {
								x: +e[0],
								y: +e[1]
							} : i - 2 == r && (a[2] = {
								x: +e[0],
								y: +e[1]
							}, a[3] = {
								x: +e[2],
								y: +e[3]
							}) : a[0] = {
								x: +e[i - 2],
								y: +e[i - 1]
							} : i - 4 == r ? a[3] = a[2] : r || (a[0] = {
								x: +e[r],
								y: +e[r + 1]
							}), n.push([
								"C",
								(-a[0].x + 6 * a[1].x + a[2].x) / 6,
								(-a[0].y + 6 * a[1].y + a[2].y) / 6,
								(a[1].x + 6 * a[2].x - a[3].x) / 6,
								(a[1].y + 6 * a[2].y - a[3].y) / 6,
								a[2].x,
								a[2].y
							]);
						}
						return n;
					}
					t.getRGB = Y(function(e) {
						if (!e || (e = g(e)).indexOf("-") + 1) return {
							r: -1,
							g: -1,
							b: -1,
							hex: "none",
							error: 1,
							toString: me
						};
						if (e == "none") return {
							r: -1,
							g: -1,
							b: -1,
							hex: "none",
							toString: me
						};
						!B[s](e.toLowerCase().substring(0, 2)) && e.charAt() != "#" && (e = ce(e));
						var n, r, i, a, o, c, l = e.match(A);
						return l ? (l[2] && (i = F(l[2].substring(5), 16), r = F(l[2].substring(3, 5), 16), n = F(l[2].substring(1, 3), 16)), l[3] && (i = F((o = l[3].charAt(3)) + o, 16), r = F((o = l[3].charAt(2)) + o, 16), n = F((o = l[3].charAt(1)) + o, 16)), l[4] && (c = l[4][_](z), n = P(c[0]), c[0].slice(-1) == "%" && (n *= 2.55), r = P(c[1]), c[1].slice(-1) == "%" && (r *= 2.55), i = P(c[2]), c[2].slice(-1) == "%" && (i *= 2.55), l[1].toLowerCase().slice(0, 4) == "rgba" && (a = P(c[3])), c[3] && c[3].slice(-1) == "%" && (a /= 100)), l[5] ? (c = l[5][_](z), n = P(c[0]), c[0].slice(-1) == "%" && (n *= 2.55), r = P(c[1]), c[1].slice(-1) == "%" && (r *= 2.55), i = P(c[2]), c[2].slice(-1) == "%" && (i *= 2.55), (c[0].slice(-3) == "deg" || c[0].slice(-1) == "°") && (n /= 360), l[1].toLowerCase().slice(0, 4) == "hsba" && (a = P(c[3])), c[3] && c[3].slice(-1) == "%" && (a /= 100), t.hsb2rgb(n, r, i, a)) : l[6] ? (c = l[6][_](z), n = P(c[0]), c[0].slice(-1) == "%" && (n *= 2.55), r = P(c[1]), c[1].slice(-1) == "%" && (r *= 2.55), i = P(c[2]), c[2].slice(-1) == "%" && (i *= 2.55), (c[0].slice(-3) == "deg" || c[0].slice(-1) == "°") && (n /= 360), l[1].toLowerCase().slice(0, 4) == "hsla" && (a = P(c[3])), c[3] && c[3].slice(-1) == "%" && (a /= 100), t.hsl2rgb(n, r, i, a)) : ((l = {
							r: n,
							g: r,
							b: i,
							toString: me
						}).hex = "#" + (16777216 | i | r << 8 | n << 16).toString(16).slice(1), t.is(a, "finite") && (l.opacity = a), l)) : {
							r: -1,
							g: -1,
							b: -1,
							hex: "none",
							error: 1,
							toString: me
						};
					}, t), t.hsb = Y(function(e, n, r) {
						return t.hsb2rgb(e, n, r).hex;
					}), t.hsl = Y(function(e, n, r) {
						return t.hsl2rgb(e, n, r).hex;
					}), t.rgb = Y(function(e, t, n) {
						function r(e) {
							return e + .5 | 0;
						}
						return "#" + (16777216 | r(n) | r(t) << 8 | r(e) << 16).toString(16).slice(1);
					}), t.getColor = function(e) {
						var t = this.getColor.start = this.getColor.start || {
							h: 0,
							s: 1,
							b: e || .75
						}, n = this.hsb2rgb(t.h, t.s, t.b);
						return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {
							h: 0,
							s: 1,
							b: t.b
						})), n.hex;
					}, t.getColor.reset = function() {
						delete this.start;
					}, t.parsePathString = function(e) {
						if (!e) return null;
						var n = ge(e);
						if (n.arr) return Ce(n.arr);
						var r = {
							a: 7,
							c: 6,
							h: 1,
							l: 2,
							m: 2,
							r: 4,
							q: 4,
							s: 4,
							t: 2,
							v: 1,
							z: 0
						}, i = [];
						return t.is(e, O) && t.is(e[0], O) && (i = Ce(e)), i.length || g(e).replace(H, function(e, t, n) {
							var a = [], o = t.toLowerCase();
							if (n.replace(W, function(e, t) {
								t && a.push(+t);
							}), o == "m" && a.length > 2 && (i.push([t][f](a.splice(0, 2))), o = "l", t = t == "m" ? "l" : "L"), o == "r") i.push([t][f](a));
							else for (; a.length >= r[o] && (i.push([t][f](a.splice(0, r[o]))), r[o]););
						}), i.toString = t._path2string, n.arr = Ce(i), i;
					}, t.parseTransformString = Y(function(e) {
						if (!e) return null;
						var n = [];
						return t.is(e, O) && t.is(e[0], O) && (n = Ce(e)), n.length || g(e).replace(U, function(e, t, r) {
							var i = [];
							b.call(t), r.replace(W, function(e, t) {
								t && i.push(+t);
							}), n.push([t][f](i));
						}), n.toString = t._path2string, n;
					}, this, function(e) {
						if (!e) return e;
						for (var t = [], n = 0; n < e.length; n++) {
							for (var r = [], i = 0; i < e[n].length; i++) r.push(e[n][i]);
							t.push(r);
						}
						return t;
					});
					var ge = function(e) {
						var t = ge.ps = ge.ps || {};
						return t[e] ? t[e].sleep = 100 : t[e] = { sleep: 100 }, setTimeout(function() {
							for (var n in t) t[s](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n]);
						}), t[e];
					};
					function _e(e, t, n, r, i) {
						return e * (e * (-3 * t + 9 * n - 9 * r + 3 * i) + 6 * t - 12 * n + 6 * r) - 3 * t + 3 * n;
					}
					function ve(e, t, n, r, i, a, o, s, c) {
						c ??= 1;
						for (var l = (c = c > 1 ? 1 : c < 0 ? 0 : c) / 2, u = [
							-.1252,
							.1252,
							-.3678,
							.3678,
							-.5873,
							.5873,
							-.7699,
							.7699,
							-.9041,
							.9041,
							-.9816,
							.9816
						], d = [
							.2491,
							.2491,
							.2335,
							.2335,
							.2032,
							.2032,
							.1601,
							.1601,
							.1069,
							.1069,
							.0472,
							.0472
						], f = 0, p = 0; p < 12; p++) {
							var m = l * u[p] + l, h = _e(m, e, n, i, o), g = _e(m, t, r, a, s), _ = h * h + g * g;
							f += d[p] * x.sqrt(_);
						}
						return l * f;
					}
					function ye(e, t, n, r, i, a, o, s) {
						if (!(S(e, n) < C(i, o) || C(e, n) > S(i, o) || S(t, r) < C(a, s) || C(t, r) > S(a, s))) {
							var c = (e - n) * (a - s) - (t - r) * (i - o);
							if (c) {
								var l = ((e * r - t * n) * (i - o) - (e - n) * (i * s - a * o)) / c, u = ((e * r - t * n) * (a - s) - (t - r) * (i * s - a * o)) / c, d = +l.toFixed(2), f = +u.toFixed(2);
								if (!(d < +C(e, n).toFixed(2) || d > +S(e, n).toFixed(2) || d < +C(i, o).toFixed(2) || d > +S(i, o).toFixed(2) || f < +C(t, r).toFixed(2) || f > +S(t, r).toFixed(2) || f < +C(a, s).toFixed(2) || f > +S(a, s).toFixed(2))) return {
									x: l,
									y: u
								};
							}
						}
					}
					function be(e, n, r) {
						var i = t.bezierBBox(e), a = t.bezierBBox(n);
						if (!t.isBBoxIntersect(i, a)) return r ? 0 : [];
						for (var o = ve.apply(0, e), s = ve.apply(0, n), c = S(~~(o / 5), 1), l = S(~~(s / 5), 1), u = [], d = [], f = {}, p = r ? 0 : [], m = 0; m < c + 1; m++) {
							var h = t.findDotsAtSegment.apply(t, e.concat(m / c));
							u.push({
								x: h.x,
								y: h.y,
								t: m / c
							});
						}
						for (m = 0; m < l + 1; m++) h = t.findDotsAtSegment.apply(t, n.concat(m / l)), d.push({
							x: h.x,
							y: h.y,
							t: m / l
						});
						for (m = 0; m < c; m++) for (var g = 0; g < l; g++) {
							var _ = u[m], v = u[m + 1], y = d[g], b = d[g + 1], x = w(v.x - _.x) < .001 ? "y" : "x", T = w(b.x - y.x) < .001 ? "y" : "x", E = ye(_.x, _.y, v.x, v.y, y.x, y.y, b.x, b.y);
							if (E) {
								if (f[E.x.toFixed(4)] == E.y.toFixed(4)) continue;
								f[E.x.toFixed(4)] = E.y.toFixed(4);
								var D = _.t + w((E[x] - _[x]) / (v[x] - _[x])) * (v.t - _.t), O = y.t + w((E[T] - y[T]) / (b[T] - y[T])) * (b.t - y.t);
								D >= 0 && D <= 1.001 && O >= 0 && O <= 1.001 && (r ? p++ : p.push({
									x: E.x,
									y: E.y,
									t1: C(D, 1),
									t2: C(O, 1)
								}));
							}
						}
						return p;
					}
					function xe(e, n, r) {
						e = t._path2curve(e), n = t._path2curve(n);
						for (var i, a, o, s, c, l, u, d, f, p, m = r ? 0 : [], h = 0, g = e.length; h < g; h++) {
							var _ = e[h];
							if (_[0] == "M") i = c = _[1], a = l = _[2];
							else {
								_[0] == "C" ? (f = [i, a].concat(_.slice(1)), i = f[6], a = f[7]) : (f = [
									i,
									a,
									i,
									a,
									c,
									l,
									c,
									l
								], i = c, a = l);
								for (var v = 0, y = n.length; v < y; v++) {
									var b = n[v];
									if (b[0] == "M") o = u = b[1], s = d = b[2];
									else {
										b[0] == "C" ? (p = [o, s].concat(b.slice(1)), o = p[6], s = p[7]) : (p = [
											o,
											s,
											o,
											s,
											u,
											d,
											u,
											d
										], o = u, s = d);
										var x = be(f, p, r);
										if (r) m += x;
										else {
											for (var S = 0, C = x.length; S < C; S++) x[S].segment1 = h, x[S].segment2 = v, x[S].bez1 = f, x[S].bez2 = p;
											m = m.concat(x);
										}
									}
								}
							}
						}
						return m;
					}
					t.findDotsAtSegment = function(e, t, n, r, i, a, o, s, c) {
						var l = 1 - c, u = T(l, 3), d = T(l, 2), f = c * c, p = f * c, m = u * e + 3 * d * c * n + 3 * l * c * c * i + p * o, h = u * t + 3 * d * c * r + 3 * l * c * c * a + p * s, g = e + 2 * c * (n - e) + f * (i - 2 * n + e), _ = t + 2 * c * (r - t) + f * (a - 2 * r + t), v = n + 2 * c * (i - n) + f * (o - 2 * i + n), y = r + 2 * c * (a - r) + f * (s - 2 * a + r), b = l * e + c * n, S = l * t + c * r, C = l * i + c * o, w = l * a + c * s, D = 90 - 180 * x.atan2(g - v, _ - y) / E;
						return (g > v || _ < y) && (D += 180), {
							x: m,
							y: h,
							m: {
								x: g,
								y: _
							},
							n: {
								x: v,
								y
							},
							start: {
								x: b,
								y: S
							},
							end: {
								x: C,
								y: w
							},
							alpha: D
						};
					}, t.bezierBBox = function(e, n, r, i, a, o, s, c) {
						t.is(e, "array") || (e = [
							e,
							n,
							r,
							i,
							a,
							o,
							s,
							c
						]);
						var l = Ae.apply(null, e);
						return {
							x: l.min.x,
							y: l.min.y,
							x2: l.max.x,
							y2: l.max.y,
							width: l.max.x - l.min.x,
							height: l.max.y - l.min.y
						};
					}, t.isPointInsideBBox = function(e, t, n) {
						return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2;
					}, t.isBBoxIntersect = function(e, n) {
						var r = t.isPointInsideBBox;
						return r(n, e.x, e.y) || r(n, e.x2, e.y) || r(n, e.x, e.y2) || r(n, e.x2, e.y2) || r(e, n.x, n.y) || r(e, n.x2, n.y) || r(e, n.x, n.y2) || r(e, n.x2, n.y2) || (e.x < n.x2 && e.x > n.x || n.x < e.x2 && n.x > e.x) && (e.y < n.y2 && e.y > n.y || n.y < e.y2 && n.y > e.y);
					}, t.pathIntersection = function(e, t) {
						return xe(e, t);
					}, t.pathIntersectionNumber = function(e, t) {
						return xe(e, t, 1);
					}, t.isPointInsidePath = function(e, n, r) {
						var i = t.pathBBox(e);
						return t.isPointInsideBBox(i, n, r) && xe(e, [[
							"M",
							n,
							r
						], ["H", i.x2 + 10]], 1) % 2 == 1;
					}, t._removedFactory = function(t) {
						return function() {
							e("raphael.log", null, "Raphaël: you are calling to method “" + t + "” of removed object", t);
						};
					};
					var Se = t.pathBBox = function(e) {
						var t = ge(e);
						if (t.bbox) return ae(t.bbox);
						if (!e) return {
							x: 0,
							y: 0,
							width: 0,
							height: 0,
							x2: 0,
							y2: 0
						};
						for (var n, r = 0, i = 0, a = [], o = [], s = 0, c = (e = je(e)).length; s < c; s++) if ((n = e[s])[0] == "M") r = n[1], i = n[2], a.push(r), o.push(i);
						else {
							var l = Ae(r, i, n[1], n[2], n[3], n[4], n[5], n[6]);
							a = a[f](l.min.x, l.max.x), o = o[f](l.min.y, l.max.y), r = n[5], i = n[6];
						}
						var u = C[d](0, a), p = C[d](0, o), m = S[d](0, a), h = S[d](0, o), g = m - u, _ = h - p, v = {
							x: u,
							y: p,
							x2: m,
							y2: h,
							width: g,
							height: _,
							cx: u + g / 2,
							cy: p + _ / 2
						};
						return t.bbox = ae(v), v;
					}, Ce = function(e) {
						var n = ae(e);
						return n.toString = t._path2string, n;
					}, we = t._pathToRelative = function(e) {
						var n = ge(e);
						if (n.rel) return Ce(n.rel);
						t.is(e, O) && t.is(e && e[0], O) || (e = t.parsePathString(e));
						var r = [], i = 0, a = 0, o = 0, s = 0, c = 0;
						e[0][0] == "M" && (o = i = e[0][1], s = a = e[0][2], c++, r.push([
							"M",
							i,
							a
						]));
						for (var l = c, u = e.length; l < u; l++) {
							var d = r[l] = [], f = e[l];
							if (f[0] != b.call(f[0])) switch (d[0] = b.call(f[0]), d[0]) {
								case "a":
									d[1] = f[1], d[2] = f[2], d[3] = f[3], d[4] = f[4], d[5] = f[5], d[6] = +(f[6] - i).toFixed(3), d[7] = +(f[7] - a).toFixed(3);
									break;
								case "v":
									d[1] = +(f[1] - a).toFixed(3);
									break;
								case "m": o = f[1], s = f[2];
								default: for (var p = 1, m = f.length; p < m; p++) d[p] = +(f[p] - (p % 2 ? i : a)).toFixed(3);
							}
							else {
								d = r[l] = [], f[0] == "m" && (o = f[1] + i, s = f[2] + a);
								for (var h = 0, g = f.length; h < g; h++) r[l][h] = f[h];
							}
							var _ = r[l].length;
							switch (r[l][0]) {
								case "z":
									i = o, a = s;
									break;
								case "h":
									i += +r[l][_ - 1];
									break;
								case "v":
									a += +r[l][_ - 1];
									break;
								default: i += +r[l][_ - 2], a += +r[l][_ - 1];
							}
						}
						return r.toString = t._path2string, n.rel = Ce(r), r;
					}, Te = t._pathToAbsolute = function(e) {
						var n = ge(e);
						if (n.abs) return Ce(n.abs);
						if (t.is(e, O) && t.is(e && e[0], O) || (e = t.parsePathString(e)), !e || !e.length) return [[
							"M",
							0,
							0
						]];
						var r = [], i = 0, a = 0, o = 0, s = 0, c = 0;
						e[0][0] == "M" && (o = i = +e[0][1], s = a = +e[0][2], c++, r[0] = [
							"M",
							i,
							a
						]);
						for (var l, u, d = e.length == 3 && e[0][0] == "M" && e[1][0].toUpperCase() == "R" && e[2][0].toUpperCase() == "Z", p = c, m = e.length; p < m; p++) {
							if (r.push(l = []), (u = e[p])[0] != I.call(u[0])) switch (l[0] = I.call(u[0]), l[0]) {
								case "A":
									l[1] = u[1], l[2] = u[2], l[3] = u[3], l[4] = u[4], l[5] = u[5], l[6] = +(u[6] + i), l[7] = +(u[7] + a);
									break;
								case "V":
									l[1] = +u[1] + a;
									break;
								case "H":
									l[1] = +u[1] + i;
									break;
								case "R":
									for (var h = [i, a][f](u.slice(1)), g = 2, _ = h.length; g < _; g++) h[g] = +h[g] + i, h[++g] = +h[g] + a;
									r.pop(), r = r[f](he(h, d));
									break;
								case "M": o = +u[1] + i, s = +u[2] + a;
								default: for (g = 1, _ = u.length; g < _; g++) l[g] = +u[g] + (g % 2 ? i : a);
							}
							else if (u[0] == "R") h = [i, a][f](u.slice(1)), r.pop(), r = r[f](he(h, d)), l = ["R"][f](u.slice(-2));
							else for (var v = 0, y = u.length; v < y; v++) l[v] = u[v];
							switch (l[0]) {
								case "Z":
									i = o, a = s;
									break;
								case "H":
									i = l[1];
									break;
								case "V":
									a = l[1];
									break;
								case "M": o = l[l.length - 2], s = l[l.length - 1];
								default: i = l[l.length - 2], a = l[l.length - 1];
							}
						}
						return r.toString = t._path2string, n.abs = Ce(r), r;
					}, Ee = function(e, t, n, r) {
						return [
							e,
							t,
							n,
							r,
							n,
							r
						];
					}, De = function(e, t, n, r, i, a) {
						return [
							1 / 3 * e + 2 / 3 * n,
							1 / 3 * t + 2 / 3 * r,
							1 / 3 * i + 2 / 3 * n,
							1 / 3 * a + 2 / 3 * r,
							i,
							a
						];
					}, Oe = function(e, t, n, r, i, a, o, s, c, l) {
						var u, d = 120 * E / 180, p = E / 180 * (+i || 0), m = [], h = Y(function(e, t, n) {
							return {
								x: e * x.cos(n) - t * x.sin(n),
								y: e * x.sin(n) + t * x.cos(n)
							};
						});
						if (l) O = l[0], k = l[1], T = l[2], D = l[3];
						else {
							e = (u = h(e, t, -p)).x, t = u.y, s = (u = h(s, c, -p)).x, c = u.y, x.cos(E / 180 * i), x.sin(E / 180 * i);
							var g = (e - s) / 2, v = (t - c) / 2, y = g * g / (n * n) + v * v / (r * r);
							y > 1 && (n *= y = x.sqrt(y), r *= y);
							var b = n * n, S = r * r, C = (a == o ? -1 : 1) * x.sqrt(w((b * S - b * v * v - S * g * g) / (b * v * v + S * g * g))), T = C * n * v / r + (e + s) / 2, D = C * -r * g / n + (t + c) / 2, O = x.asin(((t - D) / r).toFixed(9)), k = x.asin(((c - D) / r).toFixed(9));
							(O = e < T ? E - O : O) < 0 && (O = 2 * E + O), (k = s < T ? E - k : k) < 0 && (k = 2 * E + k), o && O > k && (O -= 2 * E), !o && k > O && (k -= 2 * E);
						}
						var A = k - O;
						if (w(A) > d) {
							var j = k, M = s, N = c;
							k = O + d * (o && k > O ? 1 : -1), s = T + n * x.cos(k), c = D + r * x.sin(k), m = Oe(s, c, n, r, i, 0, o, M, N, [
								k,
								j,
								T,
								D
							]);
						}
						A = k - O;
						var P = x.cos(O), F = x.sin(O), I = x.cos(k), L = x.sin(k), R = x.tan(A / 4), z = 4 / 3 * n * R, B = 4 / 3 * r * R, V = [e, t], H = [e + z * F, t - B * P], U = [s + z * L, c - B * I], W = [s, c];
						if (H[0] = 2 * V[0] - H[0], H[1] = 2 * V[1] - H[1], l) return [
							H,
							U,
							W
						][f](m);
						for (var G = [], K = 0, q = (m = [
							H,
							U,
							W
						][f](m).join()[_](",")).length; K < q; K++) G[K] = K % 2 ? h(m[K - 1], m[K], p).y : h(m[K], m[K + 1], p).x;
						return G;
					}, ke = function(e, t, n, r, i, a, o, s, c) {
						var l = 1 - c;
						return {
							x: T(l, 3) * e + 3 * T(l, 2) * c * n + 3 * l * c * c * i + T(c, 3) * o,
							y: T(l, 3) * t + 3 * T(l, 2) * c * r + 3 * l * c * c * a + T(c, 3) * s
						};
					}, Ae = Y(function(e, t, n, r, i, a, o, s) {
						var c, l = i - 2 * n + e - (o - 2 * i + n), u = 2 * (n - e) - 2 * (i - n), f = e - n, p = (-u + x.sqrt(u * u - 4 * l * f)) / 2 / l, m = (-u - x.sqrt(u * u - 4 * l * f)) / 2 / l, h = [t, s], g = [e, o];
						return w(p) > "1e12" && (p = .5), w(m) > "1e12" && (m = .5), p > 0 && p < 1 && (c = ke(e, t, n, r, i, a, o, s, p), g.push(c.x), h.push(c.y)), m > 0 && m < 1 && (c = ke(e, t, n, r, i, a, o, s, m), g.push(c.x), h.push(c.y)), l = a - 2 * r + t - (s - 2 * a + r), f = t - r, p = (-(u = 2 * (r - t) - 2 * (a - r)) + x.sqrt(u * u - 4 * l * f)) / 2 / l, m = (-u - x.sqrt(u * u - 4 * l * f)) / 2 / l, w(p) > "1e12" && (p = .5), w(m) > "1e12" && (m = .5), p > 0 && p < 1 && (c = ke(e, t, n, r, i, a, o, s, p), g.push(c.x), h.push(c.y)), m > 0 && m < 1 && (c = ke(e, t, n, r, i, a, o, s, m), g.push(c.x), h.push(c.y)), {
							min: {
								x: C[d](0, g),
								y: C[d](0, h)
							},
							max: {
								x: S[d](0, g),
								y: S[d](0, h)
							}
						};
					}), je = t._path2curve = Y(function(e, t) {
						var n = !t && ge(e);
						if (!t && n.curve) return Ce(n.curve);
						for (var r = Te(e), i = t && Te(t), a = {
							x: 0,
							y: 0,
							bx: 0,
							by: 0,
							X: 0,
							Y: 0,
							qx: null,
							qy: null
						}, o = {
							x: 0,
							y: 0,
							bx: 0,
							by: 0,
							X: 0,
							Y: 0,
							qx: null,
							qy: null
						}, s = function(e, t, n) {
							var r, i;
							if (!e) return [
								"C",
								t.x,
								t.y,
								t.x,
								t.y,
								t.x,
								t.y
							];
							switch (!(e[0] in {
								T: 1,
								Q: 1
							}) && (t.qx = t.qy = null), e[0]) {
								case "M":
									t.X = e[1], t.Y = e[2];
									break;
								case "A":
									e = ["C"][f](Oe[d](0, [t.x, t.y][f](e.slice(1))));
									break;
								case "S":
									n == "C" || n == "S" ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), e = [
										"C",
										r,
										i
									][f](e.slice(1));
									break;
								case "T":
									n == "Q" || n == "T" ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"][f](De(t.x, t.y, t.qx, t.qy, e[1], e[2]));
									break;
								case "Q":
									t.qx = e[1], t.qy = e[2], e = ["C"][f](De(t.x, t.y, e[1], e[2], e[3], e[4]));
									break;
								case "L":
									e = ["C"][f](Ee(t.x, t.y, e[1], e[2]));
									break;
								case "H":
									e = ["C"][f](Ee(t.x, t.y, e[1], t.y));
									break;
								case "V":
									e = ["C"][f](Ee(t.x, t.y, t.x, e[1]));
									break;
								case "Z": e = ["C"][f](Ee(t.x, t.y, t.X, t.Y));
							}
							return e;
						}, c = function(e, t) {
							if (e[t].length > 7) {
								e[t].shift();
								for (var n = e[t]; n.length;) u[t] = "A", i && (p[t] = "A"), e.splice(t++, 0, ["C"][f](n.splice(0, 6)));
								e.splice(t, 1), _ = S(r.length, i && i.length || 0);
							}
						}, l = function(e, t, n, a, o) {
							e && t && e[o][0] == "M" && t[o][0] != "M" && (t.splice(o, 0, [
								"M",
								a.x,
								a.y
							]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], _ = S(r.length, i && i.length || 0));
						}, u = [], p = [], m = "", h = "", g = 0, _ = S(r.length, i && i.length || 0); g < _; g++) {
							r[g] && (m = r[g][0]), m != "C" && (u[g] = m, g && (h = u[g - 1])), r[g] = s(r[g], a, h), u[g] != "A" && m == "C" && (u[g] = "C"), c(r, g), i && (i[g] && (m = i[g][0]), m != "C" && (p[g] = m, g && (h = p[g - 1])), i[g] = s(i[g], o, h), p[g] != "A" && m == "C" && (p[g] = "C"), c(i, g)), l(r, i, a, o, g), l(i, r, o, a, g);
							var v = r[g], y = i && i[g], b = v.length, x = i && y.length;
							a.x = v[b - 2], a.y = v[b - 1], a.bx = P(v[b - 4]) || a.x, a.by = P(v[b - 3]) || a.y, o.bx = i && (P(y[x - 4]) || o.x), o.by = i && (P(y[x - 3]) || o.y), o.x = i && y[x - 2], o.y = i && y[x - 1];
						}
						return i || (n.curve = Ce(r)), i ? [r, i] : r;
					}, null, Ce), Me = (t._parseDots = Y(function(e) {
						for (var n = [], r = 0, i = e.length; r < i; r++) {
							var a = {}, o = e[r].match(/^([^:]*):?([\d\.]*)/);
							if (a.color = t.getRGB(o[1]), a.color.error) return null;
							a.opacity = a.color.opacity, a.color = a.color.hex, o[2] && (a.offset = o[2] + "%"), n.push(a);
						}
						for (r = 1, i = n.length - 1; r < i; r++) if (!n[r].offset) {
							for (var s = P(n[r - 1].offset || 0), c = 0, l = r + 1; l < i; l++) if (n[l].offset) {
								c = n[l].offset;
								break;
							}
							c || (c = 100, l = i);
							for (var u = ((c = P(c)) - s) / (l - r + 1); r < l; r++) s += u, n[r].offset = s + "%";
						}
						return n;
					}), t._tear = function(e, t) {
						e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next);
					}), Ne = (t._tofront = function(e, t) {
						t.top !== e && (Me(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e);
					}, t._toback = function(e, t) {
						t.bottom !== e && (Me(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e);
					}, t._insertafter = function(e, t, n) {
						Me(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e;
					}, t._insertbefore = function(e, t, n) {
						Me(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t;
					}, t.toMatrix = function(e, t) {
						var n = Se(e), r = {
							_: { transform: m },
							getBBox: function() {
								return n;
							}
						};
						return Pe(r, t), r.matrix;
					}), Pe = (t.transformPath = function(e, t) {
						return ne(e, Ne(e, t));
					}, t._extractTransform = function(e, n) {
						if (n == null) return e._.transform;
						n = g(n).replace(/\.{3}|\u2026/g, e._.transform || m);
						var r, i, a = t.parseTransformString(n), o = 0, s = 1, c = 1, l = e._, u = new Le();
						if (l.transform = a || [], a) for (var d = 0, f = a.length; d < f; d++) {
							var p, h, _, v, y, b = a[d], x = b.length, S = g(b[0]).toLowerCase(), C = b[0] != S, w = C ? u.invert() : 0;
							S == "t" && x == 3 ? C ? (p = w.x(0, 0), h = w.y(0, 0), _ = w.x(b[1], b[2]), v = w.y(b[1], b[2]), u.translate(_ - p, v - h)) : u.translate(b[1], b[2]) : S == "r" ? x == 2 ? (y ||= e.getBBox(1), u.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), o += b[1]) : x == 4 && (C ? (_ = w.x(b[2], b[3]), v = w.y(b[2], b[3]), u.rotate(b[1], _, v)) : u.rotate(b[1], b[2], b[3]), o += b[1]) : S == "s" ? x == 2 || x == 3 ? (y ||= e.getBBox(1), u.scale(b[1], b[x - 1], y.x + y.width / 2, y.y + y.height / 2), s *= b[1], c *= b[x - 1]) : x == 5 && (C ? (_ = w.x(b[3], b[4]), v = w.y(b[3], b[4]), u.scale(b[1], b[2], _, v)) : u.scale(b[1], b[2], b[3], b[4]), s *= b[1], c *= b[2]) : S == "m" && x == 7 && u.add(b[1], b[2], b[3], b[4], b[5], b[6]), l.dirtyT = 1, e.matrix = u;
						}
						e.matrix = u, l.sx = s, l.sy = c, l.deg = o, l.dx = r = u.e, l.dy = i = u.f, s == 1 && c == 1 && !o && l.bbox ? (l.bbox.x += +r, l.bbox.y += +i) : l.dirtyT = 1;
					}), Fe = function(e) {
						var t = e[0];
						switch (t.toLowerCase()) {
							case "t": return [
								t,
								0,
								0
							];
							case "m": return [
								t,
								1,
								0,
								0,
								1,
								0,
								0
							];
							case "r": return e.length == 4 ? [
								t,
								0,
								e[2],
								e[3]
							] : [t, 0];
							case "s": return e.length == 5 ? [
								t,
								1,
								1,
								e[3],
								e[4]
							] : e.length == 3 ? [
								t,
								1,
								1
							] : [t, 1];
						}
					}, Ie = t._equaliseTransform = function(e, n) {
						n = g(n).replace(/\.{3}|\u2026/g, e), e = t.parseTransformString(e) || [], n = t.parseTransformString(n) || [];
						for (var r, i, a, o, s = S(e.length, n.length), c = [], l = [], u = 0; u < s; u++) {
							if (a = e[u] || Fe(n[u]), o = n[u] || Fe(a), a[0] != o[0] || a[0].toLowerCase() == "r" && (a[2] != o[2] || a[3] != o[3]) || a[0].toLowerCase() == "s" && (a[3] != o[3] || a[4] != o[4])) return;
							for (c[u] = [], l[u] = [], r = 0, i = S(a.length, o.length); r < i; r++) r in a && (c[u][r] = a[r]), r in o && (l[u][r] = o[r]);
						}
						return {
							from: c,
							to: l
						};
					};
					function Le(e, t, n, r, i, a) {
						e == null ? (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0) : (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +a);
					}
					t._getContainer = function(e, n, r, i) {
						var a;
						if ((a = i != null || t.is(e, "object") ? e : c.doc.getElementById(e)) != null) return a.tagName ? n == null ? {
							container: a,
							width: a.style.pixelWidth || a.offsetWidth,
							height: a.style.pixelHeight || a.offsetHeight
						} : {
							container: a,
							width: n,
							height: r
						} : {
							container: 1,
							x: e,
							y: n,
							width: r,
							height: i
						};
					}, t.pathToRelative = we, t._engine = {}, t.path2curve = je, t.matrix = function(e, t, n, r, i, a) {
						return new Le(e, t, n, r, i, a);
					}, function(e) {
						function n(e) {
							return e[0] * e[0] + e[1] * e[1];
						}
						function r(e) {
							var t = x.sqrt(n(e));
							e[0] && (e[0] /= t), e[1] && (e[1] /= t);
						}
						e.add = function(e, t, n, r, i, a) {
							var o, s, c, l, u = [
								[],
								[],
								[]
							], d = [
								[
									this.a,
									this.c,
									this.e
								],
								[
									this.b,
									this.d,
									this.f
								],
								[
									0,
									0,
									1
								]
							], f = [
								[
									e,
									n,
									i
								],
								[
									t,
									r,
									a
								],
								[
									0,
									0,
									1
								]
							];
							for (e && e instanceof Le && (f = [
								[
									e.a,
									e.c,
									e.e
								],
								[
									e.b,
									e.d,
									e.f
								],
								[
									0,
									0,
									1
								]
							]), o = 0; o < 3; o++) for (s = 0; s < 3; s++) {
								for (l = 0, c = 0; c < 3; c++) l += d[o][c] * f[c][s];
								u[o][s] = l;
							}
							this.a = u[0][0], this.b = u[1][0], this.c = u[0][1], this.d = u[1][1], this.e = u[0][2], this.f = u[1][2];
						}, e.invert = function() {
							var e = this, t = e.a * e.d - e.b * e.c;
							return new Le(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t);
						}, e.clone = function() {
							return new Le(this.a, this.b, this.c, this.d, this.e, this.f);
						}, e.translate = function(e, t) {
							this.add(1, 0, 0, 1, e, t);
						}, e.scale = function(e, t, n, r) {
							t ??= e, (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r);
						}, e.rotate = function(e, n, r) {
							e = t.rad(e), n ||= 0, r ||= 0;
							var i = +x.cos(e).toFixed(9), a = +x.sin(e).toFixed(9);
							this.add(i, a, -a, i, n, r), this.add(1, 0, 0, 1, -n, -r);
						}, e.x = function(e, t) {
							return e * this.a + t * this.c + this.e;
						}, e.y = function(e, t) {
							return e * this.b + t * this.d + this.f;
						}, e.get = function(e) {
							return +this[g.fromCharCode(97 + e)].toFixed(4);
						}, e.toString = function() {
							return t.svg ? "matrix(" + [
								this.get(0),
								this.get(1),
								this.get(2),
								this.get(3),
								this.get(4),
								this.get(5)
							].join() + ")" : [
								this.get(0),
								this.get(2),
								this.get(1),
								this.get(3),
								0,
								0
							].join();
						}, e.toFilter = function() {
							return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
						}, e.offset = function() {
							return [this.e.toFixed(4), this.f.toFixed(4)];
						}, e.split = function() {
							var e = {};
							e.dx = this.e, e.dy = this.f;
							var i = [[this.a, this.c], [this.b, this.d]];
							e.scalex = x.sqrt(n(i[0])), r(i[0]), e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear], e.scaley = x.sqrt(n(i[1])), r(i[1]), e.shear /= e.scaley;
							var a = -i[0][1], o = i[1][1];
							return o < 0 ? (e.rotate = t.deg(x.acos(o)), a < 0 && (e.rotate = 360 - e.rotate)) : e.rotate = t.deg(x.asin(a)), e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e;
						}, e.toTransformString = function(e) {
							var t = e || this[_]();
							return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [t.dx, t.dy] : m) + (t.scalex != 1 || t.scaley != 1 ? "s" + [
								t.scalex,
								t.scaley,
								0,
								0
							] : m) + (t.rotate ? "r" + [
								t.rotate,
								0,
								0
							] : m)) : "m" + [
								this.get(0),
								this.get(1),
								this.get(2),
								this.get(3),
								this.get(4),
								this.get(5)
							];
						};
					}(Le.prototype);
					for (var Re = function() {
						this.returnValue = !1;
					}, ze = function() {
						return this.originalEvent.preventDefault();
					}, Be = function() {
						this.cancelBubble = !0;
					}, Ve = function() {
						return this.originalEvent.stopPropagation();
					}, He = function(e) {
						var t = c.doc.documentElement.scrollTop || c.doc.body.scrollTop, n = c.doc.documentElement.scrollLeft || c.doc.body.scrollLeft;
						return {
							x: e.clientX + n,
							y: e.clientY + t
						};
					}, Ue = c.doc.addEventListener ? function(e, t, n, r) {
						var i = function(e) {
							var t = He(e);
							return n.call(r, e, t.x, t.y);
						};
						if (e.addEventListener(t, i, !1), p && y[t]) {
							var a = function(t) {
								for (var i = He(t), a = t, o = 0, s = t.targetTouches && t.targetTouches.length; o < s; o++) if (t.targetTouches[o].target == e) {
									(t = t.targetTouches[o]).originalEvent = a, t.preventDefault = ze, t.stopPropagation = Ve;
									break;
								}
								return n.call(r, t, i.x, i.y);
							};
							e.addEventListener(y[t], a, !1);
						}
						return function() {
							return e.removeEventListener(t, i, !1), p && y[t] && e.removeEventListener(y[t], a, !1), !0;
						};
					} : c.doc.attachEvent ? function(e, t, n, r) {
						var i = function(e) {
							e ||= c.win.event;
							var t = c.doc.documentElement.scrollTop || c.doc.body.scrollTop, i = c.doc.documentElement.scrollLeft || c.doc.body.scrollLeft, a = e.clientX + i, o = e.clientY + t;
							return e.preventDefault = e.preventDefault || Re, e.stopPropagation = e.stopPropagation || Be, n.call(r, e, a, o);
						};
						return e.attachEvent("on" + t, i), function() {
							return e.detachEvent("on" + t, i), !0;
						};
					} : void 0, We = [], Ge = function(t) {
						for (var n, r = t.clientX, i = t.clientY, a = c.doc.documentElement.scrollTop || c.doc.body.scrollTop, o = c.doc.documentElement.scrollLeft || c.doc.body.scrollLeft, s = We.length; s--;) {
							if (n = We[s], p && t.touches) {
								for (var l, u = t.touches.length; u--;) if ((l = t.touches[u]).identifier == n.el._drag.id) {
									r = l.clientX, i = l.clientY, (t.originalEvent ? t.originalEvent : t).preventDefault();
									break;
								}
							} else t.preventDefault();
							var d, f = n.el.node, m = f.nextSibling, h = f.parentNode, g = f.style.display;
							c.win.opera && h.removeChild(f), f.style.display = "none", d = n.el.paper.getElementByPoint(r, i), f.style.display = g, c.win.opera && (m ? h.insertBefore(f, m) : h.appendChild(f)), d && e("raphael.drag.over." + n.el.id, n.el, d), r += o, i += a, e("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, t);
						}
					}, Ke = function(n) {
						t.unmousemove(Ge).unmouseup(Ke);
						for (var r, i = We.length; i--;) (r = We[i]).el._drag = {}, e("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, n);
						We = [];
					}, X = t.el = {}, qe = v.length; qe--;) (function(e) {
						t[e] = X[e] = function(n, r) {
							return t.is(n, "function") && (this.events = this.events || [], this.events.push({
								name: e,
								f: n,
								unbind: Ue(this.shape || this.node || c.doc, e, n, r || this)
							})), this;
						}, t["un" + e] = X["un" + e] = function(n) {
							for (var r = this.events || [], i = r.length; i--;) r[i].name != e || !t.is(n, "undefined") && r[i].f != n || (r[i].unbind(), r.splice(i, 1), !r.length && delete this.events);
							return this;
						};
					})(v[qe]);
					X.data = function(n, r) {
						var i = G[this.id] = G[this.id] || {};
						if (arguments.length == 0) return i;
						if (arguments.length == 1) {
							if (t.is(n, "object")) {
								for (var a in n) n[s](a) && this.data(a, n[a]);
								return this;
							}
							return e("raphael.data.get." + this.id, this, i[n], n), i[n];
						}
						return i[n] = r, e("raphael.data.set." + this.id, this, r, n), this;
					}, X.removeData = function(e) {
						return e == null ? delete G[this.id] : G[this.id] && delete G[this.id][e], this;
					}, X.getData = function() {
						return ae(G[this.id] || {});
					}, X.hover = function(e, t, n, r) {
						return this.mouseover(e, n).mouseout(t, r || n);
					}, X.unhover = function(e, t) {
						return this.unmouseover(e).unmouseout(t);
					};
					var Je = [];
					X.drag = function(n, r, i, a, o, s) {
						function l(l) {
							(l.originalEvent || l).preventDefault();
							var u = l.clientX, d = l.clientY, f = c.doc.documentElement.scrollTop || c.doc.body.scrollTop, m = c.doc.documentElement.scrollLeft || c.doc.body.scrollLeft;
							if (this._drag.id = l.identifier, p && l.touches) {
								for (var h, g = l.touches.length; g--;) if (h = l.touches[g], this._drag.id = h.identifier, h.identifier == this._drag.id) {
									u = h.clientX, d = h.clientY;
									break;
								}
							}
							this._drag.x = u + m, this._drag.y = d + f, !We.length && t.mousemove(Ge).mouseup(Ke), We.push({
								el: this,
								move_scope: a,
								start_scope: o,
								end_scope: s
							}), r && e.on("raphael.drag.start." + this.id, r), n && e.on("raphael.drag.move." + this.id, n), i && e.on("raphael.drag.end." + this.id, i), e("raphael.drag.start." + this.id, o || a || this, this._drag.x, this._drag.y, l);
						}
						return this._drag = {}, Je.push({
							el: this,
							start: l
						}), this.mousedown(l), this;
					}, X.onDragOver = function(t) {
						t ? e.on("raphael.drag.over." + this.id, t) : e.unbind("raphael.drag.over." + this.id);
					}, X.undrag = function() {
						for (var n = Je.length; n--;) Je[n].el == this && (this.unmousedown(Je[n].start), Je.splice(n, 1), e.unbind("raphael.drag.*." + this.id));
						!Je.length && t.unmousemove(Ge).unmouseup(Ke), We = [];
					}, r.circle = function(e, n, r) {
						var i = t._engine.circle(this, e || 0, n || 0, r || 0);
						return this.__set__ && this.__set__.push(i), i;
					}, r.rect = function(e, n, r, i, a) {
						var o = t._engine.rect(this, e || 0, n || 0, r || 0, i || 0, a || 0);
						return this.__set__ && this.__set__.push(o), o;
					}, r.ellipse = function(e, n, r, i) {
						var a = t._engine.ellipse(this, e || 0, n || 0, r || 0, i || 0);
						return this.__set__ && this.__set__.push(a), a;
					}, r.path = function(e) {
						e && !t.is(e, "string") && !t.is(e[0], O) && (e += m);
						var n = t._engine.path(t.format[d](t, arguments), this);
						return this.__set__ && this.__set__.push(n), n;
					}, r.image = function(e, n, r, i, a) {
						var o = t._engine.image(this, e || "about:blank", n || 0, r || 0, i || 0, a || 0);
						return this.__set__ && this.__set__.push(o), o;
					}, r.text = function(e, n, r) {
						var i = t._engine.text(this, e || 0, n || 0, g(r));
						return this.__set__ && this.__set__.push(i), i;
					}, r.set = function(e) {
						!t.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
						var n = new ft(e);
						return this.__set__ && this.__set__.push(n), n.paper = this, n.type = "set", n;
					}, r.setStart = function(e) {
						this.__set__ = e || this.set();
					}, r.setFinish = function(e) {
						var t = this.__set__;
						return delete this.__set__, t;
					}, r.getSize = function() {
						var e = this.canvas.parentNode;
						return {
							width: e.offsetWidth,
							height: e.offsetHeight
						};
					}, r.setSize = function(e, n) {
						return t._engine.setSize.call(this, e, n);
					}, r.setViewBox = function(e, n, r, i, a) {
						return t._engine.setViewBox.call(this, e, n, r, i, a);
					}, r.top = r.bottom = null, r.raphael = t;
					function Ye() {
						return this.x + h + this.y + h + this.width + " × " + this.height;
					}
					r.getElementByPoint = function(e, t) {
						var n, r, i, a, o, s, l, u = this.canvas, d = c.doc.elementFromPoint(e, t);
						if (c.win.opera && d.tagName == "svg") {
							var f = (r = (n = u).getBoundingClientRect(), i = n.ownerDocument, a = i.body, o = i.documentElement, s = o.clientTop || a.clientTop || 0, l = o.clientLeft || a.clientLeft || 0, {
								y: r.top + (c.win.pageYOffset || o.scrollTop || a.scrollTop) - s,
								x: r.left + (c.win.pageXOffset || o.scrollLeft || a.scrollLeft) - l
							}), p = u.createSVGRect();
							p.x = e - f.x, p.y = t - f.y, p.width = p.height = 1;
							var m = u.getIntersectionList(p, null);
							m.length && (d = m[m.length - 1]);
						}
						if (!d) return null;
						for (; d.parentNode && d != u.parentNode && !d.raphael;) d = d.parentNode;
						return d == this.canvas.parentNode && (d = u), d = d && d.raphael ? this.getById(d.raphaelid) : null;
					}, r.getElementsByBBox = function(e) {
						var n = this.set();
						return this.forEach(function(r) {
							t.isBBoxIntersect(r.getBBox(), e) && n.push(r);
						}), n;
					}, r.getById = function(e) {
						for (var t = this.bottom; t;) {
							if (t.id == e) return t;
							t = t.next;
						}
						return null;
					}, r.forEach = function(e, t) {
						for (var n = this.bottom; n;) {
							if (!1 === e.call(t, n)) return this;
							n = n.next;
						}
						return this;
					}, r.getElementsByPoint = function(e, t) {
						var n = this.set();
						return this.forEach(function(r) {
							r.isPointInside(e, t) && n.push(r);
						}), n;
					}, X.isPointInside = function(e, n) {
						var r = this.realPath = te[this.type](this);
						return this.attr("transform") && this.attr("transform").length && (r = t.transformPath(r, this.attr("transform"))), t.isPointInsidePath(r, e, n);
					}, X.getBBox = function(e) {
						if (this.removed) return {};
						var t = this._;
						return e ? (!t.dirty && t.bboxwt || (this.realPath = te[this.type](this), t.bboxwt = Se(this.realPath), t.bboxwt.toString = Ye, t.dirty = 0), t.bboxwt) : ((t.dirty || t.dirtyT || !t.bbox) && (!t.dirty && this.realPath || (t.bboxwt = 0, this.realPath = te[this.type](this)), t.bbox = Se(ne(this.realPath, this.matrix)), t.bbox.toString = Ye, t.dirty = t.dirtyT = 0), t.bbox);
					}, X.clone = function() {
						if (this.removed) return null;
						var e = this.paper[this.type]().attr(this.attr());
						return this.__set__ && this.__set__.push(e), e;
					}, X.glow = function(e) {
						if (this.type == "text") return null;
						var t = {
							width: ((e ||= {}).width || 10) + (+this.attr("stroke-width") || 1),
							fill: e.fill || !1,
							opacity: e.opacity == null ? .5 : e.opacity,
							offsetx: e.offsetx || 0,
							offsety: e.offsety || 0,
							color: e.color || "#000"
						}, n = t.width / 2, r = this.paper, i = r.set(), a = this.realPath || te[this.type](this);
						a = this.matrix ? ne(a, this.matrix) : a;
						for (var o = 1; o < n + 1; o++) i.push(r.path(a).attr({
							stroke: t.color,
							fill: t.fill ? t.color : "none",
							"stroke-linejoin": "round",
							"stroke-linecap": "round",
							"stroke-width": +(t.width / n * o).toFixed(3),
							opacity: +(t.opacity / n).toFixed(3)
						}));
						return i.insertBefore(this).translate(t.offsetx, t.offsety);
					};
					var Xe = function(e, n, r, i, a, o, s, c, l) {
						return l == null ? ve(e, n, r, i, a, o, s, c) : t.findDotsAtSegment(e, n, r, i, a, o, s, c, function(e, t, n, r, i, a, o, s, c) {
							if (!(c < 0 || ve(e, t, n, r, i, a, o, s) < c)) {
								var l, u = .5, d = 1 - u;
								for (l = ve(e, t, n, r, i, a, o, s, d); w(l - c) > .01;) l = ve(e, t, n, r, i, a, o, s, d += (l < c ? 1 : -1) * (u /= 2));
								return d;
							}
						}(e, n, r, i, a, o, s, c, l));
					}, Ze = function(e, n) {
						return function(r, i, a) {
							for (var o, s, c, l, u, d = "", f = {}, p = 0, m = 0, h = (r = je(r)).length; m < h; m++) {
								if ((c = r[m])[0] == "M") o = +c[1], s = +c[2];
								else {
									if (p + (l = Xe(o, s, c[1], c[2], c[3], c[4], c[5], c[6])) > i) {
										if (n && !f.start) {
											if (d += [
												"C" + (u = Xe(o, s, c[1], c[2], c[3], c[4], c[5], c[6], i - p)).start.x,
												u.start.y,
												u.m.x,
												u.m.y,
												u.x,
												u.y
											], a) return d;
											f.start = d, d = [
												"M" + u.x,
												u.y + "C" + u.n.x,
												u.n.y,
												u.end.x,
												u.end.y,
												c[5],
												c[6]
											].join(), p += l, o = +c[5], s = +c[6];
											continue;
										}
										if (!e && !n) return {
											x: (u = Xe(o, s, c[1], c[2], c[3], c[4], c[5], c[6], i - p)).x,
											y: u.y,
											alpha: u.alpha
										};
									}
									p += l, o = +c[5], s = +c[6];
								}
								d += c.shift() + c;
							}
							return f.end = d, (u = e ? p : n ? f : t.findDotsAtSegment(o, s, c[0], c[1], c[2], c[3], c[4], c[5], 1)).alpha && (u = {
								x: u.x,
								y: u.y,
								alpha: u.alpha
							}), u;
						};
					}, Qe = Ze(1), $e = Ze(), et = Ze(0, 1);
					t.getTotalLength = Qe, t.getPointAtLength = $e, t.getSubpath = function(e, t, n) {
						if (this.getTotalLength(e) - n < 1e-6) return et(e, t).end;
						var r = et(e, n, 1);
						return t ? et(r, t).end : r;
					}, X.getTotalLength = function() {
						var e = this.getPath();
						if (e) return this.node.getTotalLength ? this.node.getTotalLength() : Qe(e);
					}, X.getPointAtLength = function(e) {
						var t = this.getPath();
						if (t) return $e(t, e);
					}, X.getPath = function() {
						var e, n = t._getPath[this.type];
						if (this.type != "text" && this.type != "set") return n && (e = n(this)), e;
					}, X.getSubpath = function(e, n) {
						var r = this.getPath();
						if (r) return t.getSubpath(r, e, n);
					};
					var Z = t.easing_formulas = {
						linear: function(e) {
							return e;
						},
						"<": function(e) {
							return T(e, 1.7);
						},
						">": function(e) {
							return T(e, .48);
						},
						"<>": function(e) {
							var t = .48 - e / 1.04, n = x.sqrt(.1734 + t * t), r = n - t, i = -n - t, a = T(w(r), 1 / 3) * (r < 0 ? -1 : 1) + T(w(i), 1 / 3) * (i < 0 ? -1 : 1) + .5;
							return 3 * (1 - a) * a * a + a * a * a;
						},
						backIn: function(e) {
							var t = 1.70158;
							return e * e * ((t + 1) * e - t);
						},
						backOut: function(e) {
							var t = 1.70158;
							return --e * e * ((t + 1) * e + t) + 1;
						},
						elastic: function(e) {
							return e == !!e ? e : T(2, -10 * e) * x.sin(2 * E * (e - .075) / .3) + 1;
						},
						bounce: function(e) {
							var t = 7.5625, n = 2.75;
							return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + .75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + .9375 : t * (e -= 2.625 / n) * e + .984375;
						}
					};
					Z.easeIn = Z["ease-in"] = Z["<"], Z.easeOut = Z["ease-out"] = Z[">"], Z.easeInOut = Z["ease-in-out"] = Z["<>"], Z["back-in"] = Z.backIn, Z["back-out"] = Z.backOut;
					var Q = [], tt = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
						setTimeout(e, 16);
					}, nt = function() {
						for (var n = +/* @__PURE__ */ new Date(), r = 0; r < Q.length; r++) {
							var i = Q[r];
							if (!i.el.removed && !i.paused) {
								var a, o, c = n - i.start, l = i.ms, u = i.easing, d = i.from, p = i.diff, m = i.to, g = (i.t, i.el), _ = {}, v = {};
								if (i.initstatus ? (c = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * l, i.status = i.initstatus, delete i.initstatus, i.stop && Q.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (c / l)) / i.anim.top, !(c < 0)) {
									if (c < l) {
										var y = u(c / l);
										for (var b in d) if (d[s](b)) {
											switch (R[b]) {
												case D:
													a = +d[b] + y * l * p[b];
													break;
												case "colour":
													a = "rgb(" + [
														rt(N(d[b].r + y * l * p[b].r)),
														rt(N(d[b].g + y * l * p[b].g)),
														rt(N(d[b].b + y * l * p[b].b))
													].join(",") + ")";
													break;
												case "path":
													a = [];
													for (var x = 0, S = d[b].length; x < S; x++) {
														a[x] = [d[b][x][0]];
														for (var C = 1, w = d[b][x].length; C < w; C++) a[x][C] = +d[b][x][C] + y * l * p[b][x][C];
														a[x] = a[x].join(h);
													}
													a = a.join(h);
													break;
												case "transform":
													if (p[b].real) for (a = [], x = 0, S = d[b].length; x < S; x++) for (a[x] = [d[b][x][0]], C = 1, w = d[b][x].length; C < w; C++) a[x][C] = d[b][x][C] + y * l * p[b][x][C];
													else {
														var T = function(e) {
															return +d[b][e] + y * l * p[b][e];
														};
														a = [[
															"m",
															T(0),
															T(1),
															T(2),
															T(3),
															T(4),
															T(5)
														]];
													}
													break;
												case "csv":
													if (b == "clip-rect") for (a = [], x = 4; x--;) a[x] = +d[b][x] + y * l * p[b][x];
													break;
												default:
													var E = [][f](d[b]);
													for (a = [], x = g.paper.customAttributes[b].length; x--;) a[x] = +E[x] + y * l * p[b][x];
											}
											_[b] = a;
										}
										g.attr(_), function(t, n, r) {
											setTimeout(function() {
												e("raphael.anim.frame." + t, n, r);
											});
										}(g.id, g, i.anim);
									} else {
										if (function(n, r, i) {
											setTimeout(function() {
												e("raphael.anim.frame." + r.id, r, i), e("raphael.anim.finish." + r.id, r, i), t.is(n, "function") && n.call(r);
											});
										}(i.callback, g, i.anim), g.attr(m), Q.splice(r--, 1), i.repeat > 1 && !i.next) {
											for (o in m) m[s](o) && (v[o] = i.totalOrigin[o]);
											i.el.attr(v), ot(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1);
										}
										i.next && !i.stop && ot(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat);
									}
								}
							}
						}
						Q.length && tt(nt);
					}, rt = function(e) {
						return e > 255 ? 255 : e < 0 ? 0 : e;
					};
					function it(e, t, n, r, i, a) {
						var o = 3 * t, s = 3 * (r - t) - o, c = 1 - o - s, l = 3 * n, u = 3 * (i - n) - l, d = 1 - l - u;
						function f(e) {
							return ((c * e + s) * e + o) * e;
						}
						return function(e, t) {
							var n = function(e, t) {
								for (var n, r, i = e, a, l, u = 0; u < 8; u++) {
									if (a = f(i) - e, w(a) < t) return i;
									if (w(l = (3 * c * i + 2 * s) * i + o) < 1e-6) break;
									i -= a / l;
								}
								if (r = 1, (i = e) < (n = 0)) return n;
								if (i > r) return r;
								for (; n < r;) {
									if (a = f(i), w(a - e) < t) return i;
									e > a ? n = i : r = i, i = (r - n) / 2 + n;
								}
								return i;
							}(e, t);
							return ((d * n + u) * n + l) * n;
						}(e, 1 / (200 * a));
					}
					function at(e, t) {
						var n = [], r = {};
						if (this.ms = t, this.times = 1, e) {
							for (var i in e) e[s](i) && (r[P(i)] = e[i], n.push(P(i)));
							n.sort(K);
						}
						this.anim = r, this.top = n[n.length - 1], this.percents = n;
					}
					function ot(n, r, a, o, c, l) {
						a = P(a);
						var u, d, p, m, h, v, y = n.ms, b = {}, x = {}, S = {};
						if (o) for (w = 0, T = Q.length; w < T; w++) {
							var C = Q[w];
							if (C.el.id == r.id && C.anim == n) {
								C.percent == a ? d = C : (Q.splice(w, 1), p = 1), r.attr(C.totalOrigin);
								break;
							}
						}
						else o = +x;
						for (var w = 0, T = n.percents.length; w < T; w++) {
							if (n.percents[w] == a || n.percents[w] > o * n.top) {
								a = n.percents[w], h = n.percents[w - 1] || 0, y = y / n.top * (a - h), m = n.percents[w + 1], u = n.anim[a];
								break;
							}
							o && r.attr(n.anim[n.percents[w]]);
						}
						if (u) {
							if (d) d.initstatus = o, d.start = /* @__PURE__ */ new Date() - d.ms * o;
							else {
								for (var E in u) if (u[s](E) && (R[s](E) || r.paper.customAttributes[s](E))) switch (b[E] = r.attr(E), b[E] ?? (b[E] = L[E]), x[E] = u[E], R[E]) {
									case D:
										S[E] = (x[E] - b[E]) / y;
										break;
									case "colour":
										b[E] = t.getRGB(b[E]);
										var O = t.getRGB(x[E]);
										S[E] = {
											r: (O.r - b[E].r) / y,
											g: (O.g - b[E].g) / y,
											b: (O.b - b[E].b) / y
										};
										break;
									case "path":
										var k = je(b[E], x[E]), A = k[1];
										for (b[E] = k[0], S[E] = [], w = 0, T = b[E].length; w < T; w++) {
											S[E][w] = [0];
											for (var j = 1, N = b[E][w].length; j < N; j++) S[E][w][j] = (A[w][j] - b[E][w][j]) / y;
										}
										break;
									case "transform":
										var F = r._, I = Ie(F[E], x[E]);
										if (I) for (b[E] = I.from, x[E] = I.to, S[E] = [], S[E].real = !0, w = 0, T = b[E].length; w < T; w++) for (S[E][w] = [b[E][w][0]], j = 1, N = b[E][w].length; j < N; j++) S[E][w][j] = (x[E][w][j] - b[E][w][j]) / y;
										else {
											var z = r.matrix || new Le(), B = {
												_: { transform: F.transform },
												getBBox: function() {
													return r.getBBox(1);
												}
											};
											b[E] = [
												z.a,
												z.b,
												z.c,
												z.d,
												z.e,
												z.f
											], Pe(B, x[E]), x[E] = B._.transform, S[E] = [
												(B.matrix.a - z.a) / y,
												(B.matrix.b - z.b) / y,
												(B.matrix.c - z.c) / y,
												(B.matrix.d - z.d) / y,
												(B.matrix.e - z.e) / y,
												(B.matrix.f - z.f) / y
											];
										}
										break;
									case "csv":
										var V = g(u[E])[_](i), H = g(b[E])[_](i);
										if (E == "clip-rect") for (b[E] = H, S[E] = [], w = H.length; w--;) S[E][w] = (V[w] - b[E][w]) / y;
										x[E] = V;
										break;
									default: for (V = [][f](u[E]), H = [][f](b[E]), S[E] = [], w = r.paper.customAttributes[E].length; w--;) S[E][w] = ((V[w] || 0) - (H[w] || 0)) / y;
								}
								var U = u.easing, W = t.easing_formulas[U];
								if (!W) {
									if ((W = g(U).match(M)) && W.length == 5) {
										var G = W;
										W = function(e) {
											return it(e, +G[1], +G[2], +G[3], +G[4], y);
										};
									} else W = q;
								}
								if (C = {
									anim: n,
									percent: a,
									timestamp: v = u.start || n.start || +/* @__PURE__ */ new Date(),
									start: v + (n.del || 0),
									status: 0,
									initstatus: o || 0,
									stop: !1,
									ms: y,
									easing: W,
									from: b,
									diff: S,
									to: x,
									el: r,
									callback: u.callback,
									prev: h,
									next: m,
									repeat: l || n.times,
									origin: r.attr(),
									totalOrigin: c
								}, Q.push(C), o && !d && !p && (C.stop = !0, C.start = /* @__PURE__ */ new Date() - y * o, Q.length == 1)) return nt();
								p && (C.start = /* @__PURE__ */ new Date() - C.ms * o), Q.length == 1 && tt(nt);
							}
							e("raphael.anim.start." + r.id, r, n);
						}
					}
					function st(e) {
						for (var t = 0; t < Q.length; t++) Q[t].el.paper == e && Q.splice(t--, 1);
					}
					X.animateWith = function(e, n, r, i, a, o) {
						if (this.removed) return o && o.call(this), this;
						var s = r instanceof at ? r : t.animation(r, i, a, o);
						ot(s, this, s.percents[0], null, this.attr());
						for (var c = 0, l = Q.length; c < l; c++) if (Q[c].anim == n && Q[c].el == e) {
							Q[l - 1].start = Q[c].start;
							break;
						}
						return this;
					}, X.onAnimation = function(t) {
						return t ? e.on("raphael.anim.frame." + this.id, t) : e.unbind("raphael.anim.frame." + this.id), this;
					}, at.prototype.delay = function(e) {
						var t = new at(this.anim, this.ms);
						return t.times = this.times, t.del = +e || 0, t;
					}, at.prototype.repeat = function(e) {
						var t = new at(this.anim, this.ms);
						return t.del = this.del, t.times = x.floor(S(e, 0)) || 1, t;
					}, t.animation = function(e, n, r, i) {
						if (e instanceof at) return e;
						!t.is(r, "function") && r || (i = i || r || null, r = null), e = Object(e), n = +n || 0;
						var a, o, c = {};
						for (o in e) e[s](o) && P(o) != o && P(o) + "%" != o && (a = !0, c[o] = e[o]);
						if (a) return r && (c.easing = r), i && (c.callback = i), new at({ 100: c }, n);
						if (i) {
							var l = 0;
							for (var u in e) {
								var d = F(u);
								e[s](u) && d > l && (l = d);
							}
							!e[l += "%"].callback && (e[l].callback = i);
						}
						return new at(e, n);
					}, X.animate = function(e, n, r, i) {
						if (this.removed) return i && i.call(this), this;
						var a = e instanceof at ? e : t.animation(e, n, r, i);
						return ot(a, this, a.percents[0], null, this.attr()), this;
					}, X.setTime = function(e, t) {
						return e && t != null && this.status(e, C(t, e.ms) / e.ms), this;
					}, X.status = function(e, t) {
						var n, r, i = [], a = 0;
						if (t != null) return ot(e, this, -1, C(t, 1)), this;
						for (n = Q.length; a < n; a++) if ((r = Q[a]).el.id == this.id && (!e || r.anim == e)) {
							if (e) return r.status;
							i.push({
								anim: r.anim,
								status: r.status
							});
						}
						return e ? 0 : i;
					}, X.pause = function(t) {
						for (var n = 0; n < Q.length; n++) Q[n].el.id != this.id || t && Q[n].anim != t || !1 !== e("raphael.anim.pause." + this.id, this, Q[n].anim) && (Q[n].paused = !0);
						return this;
					}, X.resume = function(t) {
						for (var n = 0; n < Q.length; n++) if (Q[n].el.id == this.id && (!t || Q[n].anim == t)) {
							var r = Q[n];
							!1 !== e("raphael.anim.resume." + this.id, this, r.anim) && (delete r.paused, this.status(r.anim, r.status));
						}
						return this;
					}, X.stop = function(t) {
						for (var n = 0; n < Q.length; n++) Q[n].el.id != this.id || t && Q[n].anim != t || !1 !== e("raphael.anim.stop." + this.id, this, Q[n].anim) && Q.splice(n--, 1);
						return this;
					}, e.on("raphael.remove", st), e.on("raphael.clear", st), X.toString = function() {
						return "Raphaël’s object";
					};
					var ct, lt, ut, dt, ft = function(e) {
						if (this.items = [], this.length = 0, this.type = "set", e) for (var t = 0, n = e.length; t < n; t++) !e[t] || e[t].constructor != X.constructor && e[t].constructor != ft || (this[this.items.length] = this.items[this.items.length] = e[t], this.length++);
					}, $ = ft.prototype;
					for (var pt in $.push = function() {
						for (var e, t, n = 0, r = arguments.length; n < r; n++) !(e = arguments[n]) || e.constructor != X.constructor && e.constructor != ft || (this[t = this.items.length] = this.items[t] = e, this.length++);
						return this;
					}, $.pop = function() {
						return this.length && delete this[this.length--], this.items.pop();
					}, $.forEach = function(e, t) {
						for (var n = 0, r = this.items.length; n < r; n++) if (!1 === e.call(t, this.items[n], n)) return this;
						return this;
					}, X) X[s](pt) && ($[pt] = function(e) {
						return function() {
							var t = arguments;
							return this.forEach(function(n) {
								n[e][d](n, t);
							});
						};
					}(pt));
					return $.attr = function(e, n) {
						if (e && t.is(e, O) && t.is(e[0], "object")) for (var r = 0, i = e.length; r < i; r++) this.items[r].attr(e[r]);
						else for (var a = 0, o = this.items.length; a < o; a++) this.items[a].attr(e, n);
						return this;
					}, $.clear = function() {
						for (; this.length;) this.pop();
					}, $.splice = function(e, t, n) {
						e = e < 0 ? S(this.length + e, 0) : e, t = S(0, C(this.length - e, t));
						var r, i = [], a = [], o = [];
						for (r = 2; r < arguments.length; r++) o.push(arguments[r]);
						for (r = 0; r < t; r++) a.push(this[e + r]);
						for (; r < this.length - e; r++) i.push(this[e + r]);
						var s = o.length;
						for (r = 0; r < s + i.length; r++) this.items[e + r] = this[e + r] = r < s ? o[r] : i[r - s];
						for (r = this.items.length = this.length -= t - s; this[r];) delete this[r++];
						return new ft(a);
					}, $.exclude = function(e) {
						for (var t = 0, n = this.length; t < n; t++) if (this[t] == e) return this.splice(t, 1), !0;
					}, $.animate = function(e, n, r, i) {
						(t.is(r, "function") || !r) && (i = r || null);
						var a, o, s = this.items.length, c = s, l = this;
						if (!s) return this;
						i && (o = function() {
							!--s && i.call(l);
						}), r = t.is(r, "string") ? r : o;
						var u = t.animation(e, n, r, o);
						for (a = this.items[--c].animate(u); c--;) this.items[c] && !this.items[c].removed && this.items[c].animateWith(a, u, u), this.items[c] && !this.items[c].removed || s--;
						return this;
					}, $.insertAfter = function(e) {
						for (var t = this.items.length; t--;) this.items[t].insertAfter(e);
						return this;
					}, $.getBBox = function() {
						for (var e = [], t = [], n = [], r = [], i = this.items.length; i--;) if (!this.items[i].removed) {
							var a = this.items[i].getBBox();
							e.push(a.x), t.push(a.y), n.push(a.x + a.width), r.push(a.y + a.height);
						}
						return {
							x: e = C[d](0, e),
							y: t = C[d](0, t),
							x2: n = S[d](0, n),
							y2: r = S[d](0, r),
							width: n - e,
							height: r - t
						};
					}, $.clone = function(e) {
						e = this.paper.set();
						for (var t = 0, n = this.items.length; t < n; t++) e.push(this.items[t].clone());
						return e;
					}, $.toString = function() {
						return "Raphaël‘s set";
					}, $.glow = function(e) {
						var t = this.paper.set();
						return this.forEach(function(n, r) {
							n.glow(e)?.forEach(function(e, n) {
								t.push(e);
							});
						}), t;
					}, $.isPointInside = function(e, t) {
						var n = !1;
						return this.forEach(function(r) {
							if (r.isPointInside(e, t)) return n = !0, !1;
						}), n;
					}, t.registerFont = function(e) {
						if (!e.face) return e;
						this.fonts = this.fonts || {};
						var t = {
							w: e.w,
							face: {},
							glyphs: {}
						}, n = e.face["font-family"];
						for (var r in e.face) e.face[s](r) && (t.face[r] = e.face[r]);
						if (this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [t], !e.svg) {
							for (var i in t.face["units-per-em"] = F(e.face["units-per-em"], 10), e.glyphs) if (e.glyphs[s](i)) {
								var a = e.glyphs[i];
								if (t.glyphs[i] = {
									w: a.w,
									k: {},
									d: a.d && "M" + a.d.replace(/[mlcxtrv]/g, function(e) {
										return {
											l: "L",
											c: "C",
											x: "z",
											t: "m",
											r: "l",
											v: "c"
										}[e] || "M";
									}) + "z"
								}, a.k) for (var o in a.k) a[s](o) && (t.glyphs[i].k[o] = a.k[o]);
							}
						}
						return e;
					}, r.getFont = function(e, n, r, i) {
						if (i ||= "normal", r ||= "normal", n = +n || {
							normal: 400,
							bold: 700,
							lighter: 300,
							bolder: 800
						}[n] || 400, t.fonts) {
							var a, o = t.fonts[e];
							if (!o) {
								var c = RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, m) + "(\\s|$)", "i");
								for (var l in t.fonts) if (t.fonts[s](l) && c.test(l)) {
									o = t.fonts[l];
									break;
								}
							}
							if (o) for (var u = 0, d = o.length; u < d && ((a = o[u]).face["font-weight"] != n || a.face["font-style"] != r && a.face["font-style"] || a.face["font-stretch"] != i); u++);
							return a;
						}
					}, r.print = function(e, n, r, a, o, s, c, l) {
						s ||= "middle", c = S(C(c || 0, 1), -1), l = S(C(l || 1, 3), 1);
						var u, d = g(r)[_](m), f = 0, p = 0, h = m;
						if (t.is(a, "string") && (a = this.getFont(a)), a) {
							u = (o || 16) / a.face["units-per-em"];
							for (var v = a.face.bbox[_](i), y = +v[0], b = v[3] - v[1], x = 0, w = +v[1] + (s == "baseline" ? b + +a.face.descent : b / 2), T = 0, E = d.length; T < E; T++) {
								if (d[T] == "\n") f = 0, O = 0, p = 0, x += b * l;
								else {
									var D = p && a.glyphs[d[T - 1]] || {}, O = a.glyphs[d[T]];
									f += p ? (D.w || a.w) + (D.k && D.k[d[T]] || 0) + a.w * c : 0, p = 1;
								}
								O && O.d && (h += t.transformPath(O.d, [
									"t",
									f * u,
									x * u,
									"s",
									u,
									u,
									y,
									w,
									"t",
									(e - y) / u,
									(n - w) / u
								]));
							}
						}
						return this.path(h).attr({
							fill: "#000",
							stroke: "none"
						});
					}, r.add = function(e) {
						if (t.is(e, "array")) for (var n, r = this.set(), i = 0, o = e.length; i < o; i++) n = e[i] || {}, a[s](n.type) && r.push(this[n.type]().attr(n));
						return r;
					}, t.format = function(e, n) {
						var r = t.is(n, O) ? [0][f](n) : arguments;
						return e && t.is(e, "string") && r.length - 1 && (e = e.replace(o, function(e, t) {
							return r[++t] == null ? m : r[t];
						})), e || m;
					}, t.fullfill = (ct = /\{([^\}]+)\}/g, lt = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, function(e, t) {
						return String(e).replace(ct, function(e, n) {
							return function(e, t, n) {
								var r = n;
								return t.replace(lt, function(e, t, n, i, a) {
									t ||= i, r && (t in r && (r = r[t]), typeof r == "function" && a && (r = r()));
								}), r = (r == null || r == n ? e : r) + "";
							}(e, n, t);
						});
					}), t.ninja = function() {
						if (l.was) c.win.Raphael = l.is;
						else {
							window.Raphael = void 0;
							try {
								delete window.Raphael;
							} catch {}
						}
						return t;
					}, t.st = $, e.on("raphael.DOMload", function() {
						n = !0;
					}), (ut = document).readyState == null && ut.addEventListener && (ut.addEventListener("DOMContentLoaded", dt = function() {
						ut.removeEventListener("DOMContentLoaded", dt, !1), ut.readyState = "complete";
					}, !1), ut.readyState = "loading"), function e() {
						/in/.test(ut.readyState) ? setTimeout(e, 9) : t.eve("raphael.DOMload");
					}(), t;
				}.apply(t, r)) === void 0 || (e.exports = i);
			},
			function(e, t, n) {
				var r = [
					n(0),
					n(3),
					n(4)
				], i;
				(i = function(e) {
					return e;
				}.apply(t, r)) === void 0 || (e.exports = i);
			},
			function(e, t, n) {
				var r, i, a, o = "hasOwnProperty", s = /[\.\/]/, c = /\s*,\s*/, l = function(e, t) {
					return e - t;
				}, u = { n: {} }, d = function() {
					for (var e = 0, t = this.length; e < t; e++) if (this[e] !== void 0) return this[e];
				}, f = function() {
					for (var e = this.length; --e;) if (this[e] !== void 0) return this[e];
				}, p = Object.prototype.toString, m = String, h = Array.isArray || function(e) {
					return e instanceof Array || p.call(e) == "[object Array]";
				}, g;
				(g = function(e, t) {
					var n, r = a, o = Array.prototype.slice.call(arguments, 2), s = g.listeners(e), c = 0, u = [], p = {}, m = [], h = i;
					m.firstDefined = d, m.lastDefined = f, i = e, a = 0;
					for (var _ = 0, v = s.length; _ < v; _++) "zIndex" in s[_] && (u.push(s[_].zIndex), s[_].zIndex < 0 && (p[s[_].zIndex] = s[_]));
					for (u.sort(l); u[c] < 0;) if (n = p[u[c++]], m.push(n.apply(t, o)), a) return a = r, m;
					for (_ = 0; _ < v; _++) if ("zIndex" in (n = s[_])) {
						if (n.zIndex == u[c]) {
							if (m.push(n.apply(t, o)), a) break;
							do
								if ((n = p[u[++c]]) && m.push(n.apply(t, o)), a) break;
							while (n);
						} else p[n.zIndex] = n;
					} else if (m.push(n.apply(t, o)), a) break;
					return a = r, i = h, m;
				})._events = u, g.listeners = function(e) {
					var t, n, r, i, a, o, c, l, d = h(e) ? e : e.split(s), f = u, p = [f], m = [];
					for (i = 0, a = d.length; i < a; i++) {
						for (l = [], o = 0, c = p.length; o < c; o++) for (n = [(f = p[o].n)[d[i]], f["*"]], r = 2; r--;) (t = n[r]) && (l.push(t), m = m.concat(t.f || []));
						p = l;
					}
					return m;
				}, g.separator = function(e) {
					e ? (e = "[" + (e = m(e).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]", s = new RegExp(e)) : s = /[\.\/]/;
				}, g.on = function(e, t) {
					if (typeof t != "function") return function() {};
					for (var n = h(e) ? h(e[0]) ? e : [e] : m(e).split(c), r = 0, i = n.length; r < i; r++) (function(e) {
						for (var n, r = h(e) ? e : m(e).split(s), i = u, a = 0, o = r.length; a < o; a++) i = (i = i.n).hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = { n: {} });
						for (i.f = i.f || [], a = 0, o = i.f.length; a < o; a++) if (i.f[a] == t) {
							n = !0;
							break;
						}
						!n && i.f.push(t);
					})(n[r]);
					return function(e) {
						+e == +e && (t.zIndex = +e);
					};
				}, g.f = function(e) {
					var t = [].slice.call(arguments, 1);
					return function() {
						g.apply(null, [e, null].concat(t, [].slice.call(arguments, 0)));
					};
				}, g.stop = function() {
					a = 1;
				}, g.nt = function(e) {
					var t = h(i) ? i.join(".") : i;
					return e ? RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(t) : t;
				}, g.nts = function() {
					return h(i) ? i : i.split(s);
				}, g.off = g.unbind = function(e, t) {
					if (e) {
						var n = h(e) ? h(e[0]) ? e : [e] : m(e).split(c);
						if (n.length > 1) for (var r = 0, i = n.length; r < i; r++) g.off(n[r], t);
						else {
							n = h(e) ? e : m(e).split(s);
							var a, l, d, f, p, _ = [u];
							for (r = 0, i = n.length; r < i; r++) for (f = 0; f < _.length; f += d.length - 2) {
								if (d = [f, 1], a = _[f].n, n[r] != "*") a[n[r]] && d.push(a[n[r]]);
								else for (l in a) a[o](l) && d.push(a[l]);
								_.splice.apply(_, d);
							}
							for (r = 0, i = _.length; r < i; r++) for (a = _[r]; a.n;) {
								if (t) {
									if (a.f) {
										for (f = 0, p = a.f.length; f < p; f++) if (a.f[f] == t) {
											a.f.splice(f, 1);
											break;
										}
										!a.f.length && delete a.f;
									}
									for (l in a.n) if (a.n[o](l) && a.n[l].f) {
										var v = a.n[l].f;
										for (f = 0, p = v.length; f < p; f++) if (v[f] == t) {
											v.splice(f, 1);
											break;
										}
										!v.length && delete a.n[l].f;
									}
								} else for (l in delete a.f, a.n) a.n[o](l) && a.n[l].f && delete a.n[l].f;
								a = a.n;
							}
						}
					} else g._events = u = { n: {} };
				}, g.once = function(e, t) {
					var n = function() {
						return g.off(e, n), t.apply(this, arguments);
					};
					return g.on(e, n);
				}, g.version = "0.5.0", g.toString = function() {
					return "You are running Eve 0.5.0";
				}, e.exports ? e.exports = g : (r = function() {
					return g;
				}.apply(t, [])) === void 0 || (e.exports = r);
			},
			function(e, t, n) {
				var r = [n(0)], i;
				(i = function(e) {
					if (!e || e.svg) {
						var t = "hasOwnProperty", n = String, r = parseFloat, i = parseInt, a = Math, o = a.max, s = a.abs, c = a.pow, l = /[, ]+/, u = e.eve, d = "", f = " ", p = "http://www.w3.org/1999/xlink", m = {
							block: "M5,0 0,2.5 5,5z",
							classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
							diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
							open: "M6,1 1,3.5 6,6",
							oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
						}, h = {};
						e.toString = function() {
							return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
						};
						var g = function(r, i) {
							if (i) for (var a in typeof r == "string" && (r = g(r)), i) i[t](a) && (a.substring(0, 6) == "xlink:" ? r.setAttributeNS(p, a.substring(6), n(i[a])) : r.setAttribute(a, n(i[a])));
							else (r = e._g.doc.createElementNS("http://www.w3.org/2000/svg", r)).style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
							return r;
						}, _ = function(t, i) {
							var l = "linear", u = t.id + i, f = .5, p = .5, m = t.node, h = t.paper, _ = m.style, y = e._g.doc.getElementById(u);
							if (!y) {
								if (i = (i = n(i).replace(e._radial_gradient, function(e, t, n) {
									if (l = "radial", t && n) {
										f = r(t);
										var i = 2 * ((p = r(n)) > .5) - 1;
										c(f - .5, 2) + c(p - .5, 2) > .25 && (p = a.sqrt(.25 - c(f - .5, 2)) * i + .5) && p != .5 && (p = p.toFixed(5) - 1e-5 * i);
									}
									return d;
								})).split(/\s*\-\s*/), l == "linear") {
									var b = i.shift();
									if (b = -r(b), isNaN(b)) return null;
									var x = [
										0,
										0,
										a.cos(e.rad(b)),
										a.sin(e.rad(b))
									], S = 1 / (o(s(x[2]), s(x[3])) || 1);
									x[2] *= S, x[3] *= S, x[2] < 0 && (x[0] = -x[2], x[2] = 0), x[3] < 0 && (x[1] = -x[3], x[3] = 0);
								}
								var C = e._parseDots(i);
								if (!C) return null;
								if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), t.gradient && u != t.gradient.id && (h.defs.removeChild(t.gradient), delete t.gradient), !t.gradient) {
									y = g(l + "Gradient", { id: u }), t.gradient = y, g(y, l == "radial" ? {
										fx: f,
										fy: p
									} : {
										x1: x[0],
										y1: x[1],
										x2: x[2],
										y2: x[3],
										gradientTransform: t.matrix.invert()
									}), h.defs.appendChild(y);
									for (var w = 0, T = C.length; w < T; w++) y.appendChild(g("stop", {
										offset: C[w].offset ? C[w].offset : w ? "100%" : "0%",
										"stop-color": C[w].color || "#fff",
										"stop-opacity": isFinite(C[w].opacity) ? C[w].opacity : 1
									}));
								}
							}
							return g(m, {
								fill: v(u),
								opacity: 1,
								"fill-opacity": 1
							}), _.fill = d, _.opacity = 1, _.fillOpacity = 1, 1;
						}, v = function(e) {
							if ((t = document.documentMode) && (t === 9 || t === 10)) return "url('#" + e + "')";
							var t, n = document.location;
							return "url('" + (n.protocol + "//" + n.host + n.pathname + n.search) + "#" + e + "')";
						}, y = function(e) {
							var t = e.getBBox(1);
							g(e.pattern, { patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")" });
						}, b = function(r, i, a) {
							if (r.type == "path") {
								for (var o, s, c, l, u, f = n(i).toLowerCase().split("-"), p = r.paper, _ = a ? "end" : "start", v = r.node, y = r.attrs, b = y["stroke-width"], x = f.length, S = "classic", C = 3, w = 3, T = 5; x--;) switch (f[x]) {
									case "block":
									case "classic":
									case "oval":
									case "diamond":
									case "open":
									case "none":
										S = f[x];
										break;
									case "wide":
										w = 5;
										break;
									case "narrow":
										w = 2;
										break;
									case "long":
										C = 5;
										break;
									case "short": C = 2;
								}
								if (S == "open" ? (C += 2, w += 2, T += 2, c = 1, l = a ? 4 : 1, u = {
									fill: "none",
									stroke: y.stroke
								}) : (l = c = C / 2, u = {
									fill: y.stroke,
									stroke: "none"
								}), r._.arrows ? a ? (r._.arrows.endPath && h[r._.arrows.endPath]--, r._.arrows.endMarker && h[r._.arrows.endMarker]--) : (r._.arrows.startPath && h[r._.arrows.startPath]--, r._.arrows.startMarker && h[r._.arrows.startMarker]--) : r._.arrows = {}, S != "none") {
									var E = "raphael-marker-" + S, D = "raphael-marker-" + _ + S + C + w + "-obj" + r.id;
									e._g.doc.getElementById(E) ? h[E]++ : (p.defs.appendChild(g(g("path"), {
										"stroke-linecap": "round",
										d: m[S],
										id: E
									})), h[E] = 1);
									var O, k = e._g.doc.getElementById(D);
									k ? (h[D]++, O = k.getElementsByTagName("use")[0]) : (k = g(g("marker"), {
										id: D,
										markerHeight: w,
										markerWidth: C,
										orient: "auto",
										refX: l,
										refY: w / 2
									}), O = g(g("use"), {
										"xlink:href": "#" + E,
										transform: (a ? "rotate(180 " + C / 2 + " " + w / 2 + ") " : d) + "scale(" + C / T + "," + w / T + ")",
										"stroke-width": (1 / ((C / T + w / T) / 2)).toFixed(4)
									}), k.appendChild(O), p.defs.appendChild(k), h[D] = 1), g(O, u);
									var A = c * (S != "diamond" && S != "oval");
									a ? (o = r._.arrows.startdx * b || 0, s = e.getTotalLength(y.path) - A * b) : (o = A * b, s = e.getTotalLength(y.path) - (r._.arrows.enddx * b || 0)), (u = {})["marker-" + _] = "url(#" + D + ")", (s || o) && (u.d = e.getSubpath(y.path, o, s)), g(v, u), r._.arrows[_ + "Path"] = E, r._.arrows[_ + "Marker"] = D, r._.arrows[_ + "dx"] = A, r._.arrows[_ + "Type"] = S, r._.arrows[_ + "String"] = i;
								} else a ? (o = r._.arrows.startdx * b || 0, s = e.getTotalLength(y.path) - o) : (o = 0, s = e.getTotalLength(y.path) - (r._.arrows.enddx * b || 0)), r._.arrows[_ + "Path"] && g(v, { d: e.getSubpath(y.path, o, s) }), delete r._.arrows[_ + "Path"], delete r._.arrows[_ + "Marker"], delete r._.arrows[_ + "dx"], delete r._.arrows[_ + "Type"], delete r._.arrows[_ + "String"];
								for (u in h) if (h[t](u) && !h[u]) {
									var j = e._g.doc.getElementById(u);
									j && j.parentNode.removeChild(j);
								}
							}
						}, x = {
							"-": [3, 1],
							".": [1, 1],
							"-.": [
								3,
								1,
								1,
								1
							],
							"-..": [
								3,
								1,
								1,
								1,
								1,
								1
							],
							". ": [1, 3],
							"- ": [4, 3],
							"--": [8, 3],
							"- .": [
								4,
								3,
								1,
								3
							],
							"--.": [
								8,
								3,
								1,
								3
							],
							"--..": [
								8,
								3,
								1,
								3,
								1,
								3
							]
						}, S = function(e, t, r) {
							if (t = x[n(t).toLowerCase()]) {
								for (var i = e.attrs["stroke-width"] || "1", a = {
									round: i,
									square: i,
									butt: 0
								}[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], s = t.length; s--;) o[s] = t[s] * i + (s % 2 ? 1 : -1) * a;
								g(e.node, { "stroke-dasharray": o.join(",") });
							} else g(e.node, { "stroke-dasharray": "none" });
						}, C = function(r, a) {
							var c = r.node, u = r.attrs, f = c.style.visibility;
							for (var m in c.style.visibility = "hidden", a) if (a[t](m)) {
								if (!e._availableAttrs[t](m)) continue;
								var h = a[m];
								switch (u[m] = h, m) {
									case "blur":
										r.blur(h);
										break;
									case "title":
										var v = c.getElementsByTagName("title");
										if (v.length && (v = v[0])) v.firstChild.nodeValue = h;
										else {
											v = g("title");
											var x = e._g.doc.createTextNode(h);
											v.appendChild(x), c.appendChild(v);
										}
										break;
									case "href":
									case "target":
										var C = c.parentNode;
										if (C.tagName.toLowerCase() != "a") {
											var T = g("a");
											C.insertBefore(T, c), T.appendChild(c), C = T;
										}
										m == "target" ? C.setAttributeNS(p, "show", h == "blank" ? "new" : h) : C.setAttributeNS(p, m, h);
										break;
									case "cursor":
										c.style.cursor = h;
										break;
									case "transform":
										r.transform(h);
										break;
									case "arrow-start":
										b(r, h);
										break;
									case "arrow-end":
										b(r, h, 1);
										break;
									case "clip-rect":
										var E = n(h).split(l);
										if (E.length == 4) {
											r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
											var D = g("clipPath"), O = g("rect");
											D.id = e.createUUID(), g(O, {
												x: E[0],
												y: E[1],
												width: E[2],
												height: E[3]
											}), D.appendChild(O), r.paper.defs.appendChild(D), g(c, { "clip-path": "url(#" + D.id + ")" }), r.clip = O;
										}
										if (!h) {
											var k = c.getAttribute("clip-path");
											if (k) {
												var A = e._g.doc.getElementById(k.replace(/(^url\(#|\)$)/g, d));
												A && A.parentNode.removeChild(A), g(c, { "clip-path": d }), delete r.clip;
											}
										}
										break;
									case "path":
										r.type == "path" && (g(c, { d: h ? u.path = e._pathToAbsolute(h) : "M0,0" }), r._.dirty = 1, r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1)));
										break;
									case "width":
										if (c.setAttribute(m, h), r._.dirty = 1, !u.fx) break;
										m = "x", h = u.x;
									case "x": u.fx && (h = -u.x - (u.width || 0));
									case "rx": if (m == "rx" && r.type == "rect") break;
									case "cx":
										c.setAttribute(m, h), r.pattern && y(r), r._.dirty = 1;
										break;
									case "height":
										if (c.setAttribute(m, h), r._.dirty = 1, !u.fy) break;
										m = "y", h = u.y;
									case "y": u.fy && (h = -u.y - (u.height || 0));
									case "ry": if (m == "ry" && r.type == "rect") break;
									case "cy":
										c.setAttribute(m, h), r.pattern && y(r), r._.dirty = 1;
										break;
									case "r":
										r.type == "rect" ? g(c, {
											rx: h,
											ry: h
										}) : c.setAttribute(m, h), r._.dirty = 1;
										break;
									case "src":
										r.type == "image" && c.setAttributeNS(p, "href", h);
										break;
									case "stroke-width":
										r._.sx == 1 && r._.sy == 1 || (h /= o(s(r._.sx), s(r._.sy)) || 1), c.setAttribute(m, h), u["stroke-dasharray"] && S(r, u["stroke-dasharray"], a), r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
										break;
									case "stroke-dasharray":
										S(r, h, a);
										break;
									case "fill":
										var j = n(h).match(e._ISURL);
										if (j) {
											D = g("pattern");
											var M = g("image");
											D.id = e.createUUID(), g(D, {
												x: 0,
												y: 0,
												patternUnits: "userSpaceOnUse",
												height: 1,
												width: 1
											}), g(M, {
												x: 0,
												y: 0,
												"xlink:href": j[1]
											}), D.appendChild(M), function(t) {
												e._preload(j[1], function() {
													var e = this.offsetWidth, n = this.offsetHeight;
													g(t, {
														width: e,
														height: n
													}), g(M, {
														width: e,
														height: n
													});
												});
											}(D), r.paper.defs.appendChild(D), g(c, { fill: "url(#" + D.id + ")" }), r.pattern = D, r.pattern && y(r);
											break;
										}
										var N = e.getRGB(h);
										if (N.error) {
											if ((r.type == "circle" || r.type == "ellipse" || n(h).charAt() != "r") && _(r, h)) {
												if ("opacity" in u || "fill-opacity" in u) {
													var P = e._g.doc.getElementById(c.getAttribute("fill").replace(/^url\(#|\)$/g, d));
													if (P) {
														var F = P.getElementsByTagName("stop");
														g(F[F.length - 1], { "stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1) });
													}
												}
												u.gradient = h, u.fill = "none";
												break;
											}
										} else delete a.gradient, delete u.gradient, !e.is(u.opacity, "undefined") && e.is(a.opacity, "undefined") && g(c, { opacity: u.opacity }), !e.is(u["fill-opacity"], "undefined") && e.is(a["fill-opacity"], "undefined") && g(c, { "fill-opacity": u["fill-opacity"] });
										N[t]("opacity") && g(c, { "fill-opacity": N.opacity > 1 ? N.opacity / 100 : N.opacity });
									case "stroke":
										N = e.getRGB(h), c.setAttribute(m, N.hex), m == "stroke" && N[t]("opacity") && g(c, { "stroke-opacity": N.opacity > 1 ? N.opacity / 100 : N.opacity }), m == "stroke" && r._.arrows && ("startString" in r._.arrows && b(r, r._.arrows.startString), "endString" in r._.arrows && b(r, r._.arrows.endString, 1));
										break;
									case "gradient":
										(r.type == "circle" || r.type == "ellipse" || n(h).charAt() != "r") && _(r, h);
										break;
									case "opacity": u.gradient && !u[t]("stroke-opacity") && g(c, { "stroke-opacity": h > 1 ? h / 100 : h });
									case "fill-opacity": if (u.gradient) {
										(P = e._g.doc.getElementById(c.getAttribute("fill").replace(/^url\(#|\)$/g, d))) && (F = P.getElementsByTagName("stop"), g(F[F.length - 1], { "stop-opacity": h }));
										break;
									}
									default:
										m == "font-size" && (h = i(h, 10) + "px");
										var I = m.replace(/(\-.)/g, function(e) {
											return e.substring(1).toUpperCase();
										});
										c.style[I] = h, r._.dirty = 1, c.setAttribute(m, h);
								}
							}
							w(r, a), c.style.visibility = f;
						}, w = function(r, a) {
							if (r.type == "text" && (a[t]("text") || a[t]("font") || a[t]("font-size") || a[t]("x") || a[t]("y"))) {
								var o = r.attrs, s = r.node, c = s.firstChild ? i(e._g.doc.defaultView.getComputedStyle(s.firstChild, d).getPropertyValue("font-size"), 10) : 10;
								if (a[t]("text")) {
									for (o.text = a.text; s.firstChild;) s.removeChild(s.firstChild);
									for (var l, u = n(a.text).split("\n"), f = [], p = 0, m = u.length; p < m; p++) l = g("tspan"), p && g(l, {
										dy: 1.2 * c,
										x: o.x
									}), l.appendChild(e._g.doc.createTextNode(u[p])), s.appendChild(l), f[p] = l;
								} else for (p = 0, m = (f = s.getElementsByTagName("tspan")).length; p < m; p++) p ? g(f[p], {
									dy: 1.2 * c,
									x: o.x
								}) : g(f[0], { dy: 0 });
								g(s, {
									x: o.x,
									y: o.y
								}), r._.dirty = 1;
								var h = r._getBBox(), _ = o.y - (h.y + h.height / 2);
								_ && e.is(_, "finite") && g(f[0], { dy: _ });
							}
						}, T = function(e) {
							return e.parentNode && e.parentNode.tagName.toLowerCase() === "a" ? e.parentNode : e;
						}, E = function(t, n) {
							this[0] = this.node = t, t.raphael = !0, this.id = ("0000" + (Math.random() * 36 ** 5 | 0).toString(36)).slice(-5), t.raphaelid = this.id, this.matrix = e.matrix(), this.realPath = null, this.paper = n, this.attrs = this.attrs || {}, this._ = {
								transform: [],
								sx: 1,
								sy: 1,
								deg: 0,
								dx: 0,
								dy: 0,
								dirty: 1
							}, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null;
						}, D = e.el;
						E.prototype = D, D.constructor = E, e._engine.path = function(e, t) {
							var n = g("path");
							t.canvas && t.canvas.appendChild(n);
							var r = new E(n, t);
							return r.type = "path", C(r, {
								fill: "none",
								stroke: "#000",
								path: e
							}), r;
						}, D.rotate = function(e, t, i) {
							if (this.removed) return this;
							if ((e = n(e).split(l)).length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i ?? (t = i), t == null || i == null) {
								var a = this.getBBox(1);
								t = a.x + a.width / 2, i = a.y + a.height / 2;
							}
							return this.transform(this._.transform.concat([[
								"r",
								e,
								t,
								i
							]])), this;
						}, D.scale = function(e, t, i, a) {
							if (this.removed) return this;
							if ((e = n(e).split(l)).length - 1 && (t = r(e[1]), i = r(e[2]), a = r(e[3])), e = r(e[0]), t ??= e, a ?? (i = a), i == null || a == null) var o = this.getBBox(1);
							return i ??= o.x + o.width / 2, a ??= o.y + o.height / 2, this.transform(this._.transform.concat([[
								"s",
								e,
								t,
								i,
								a
							]])), this;
						}, D.translate = function(e, t) {
							return this.removed || ((e = n(e).split(l)).length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this.transform(this._.transform.concat([[
								"t",
								e,
								t
							]]))), this;
						}, D.transform = function(n) {
							var r = this._;
							if (n == null) return r.transform;
							if (e._extractTransform(this, n), this.clip && g(this.clip, { transform: this.matrix.invert() }), this.pattern && y(this), this.node && g(this.node, { transform: this.matrix }), r.sx != 1 || r.sy != 1) {
								var i = this.attrs[t]("stroke-width") ? this.attrs["stroke-width"] : 1;
								this.attr({ "stroke-width": i });
							}
							return this;
						}, D.hide = function() {
							return this.removed || (this.node.style.display = "none"), this;
						}, D.show = function() {
							return this.removed || (this.node.style.display = ""), this;
						}, D.remove = function() {
							var t = T(this.node);
							if (!this.removed && t.parentNode) {
								var n = this.paper;
								for (var r in n.__set__ && n.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && n.defs.removeChild(this.gradient), e._tear(this, n), t.parentNode.removeChild(t), this.removeData(), this) this[r] = typeof this[r] == "function" ? e._removedFactory(r) : null;
								this.removed = !0;
							}
						}, D._getBBox = function() {
							if (this.node.style.display == "none") {
								this.show();
								var e = !0;
							}
							var t, n = !1;
							this.paper.canvas.parentElement ? t = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (t = this.paper.canvas.parentNode.style), t && t.display == "none" && (n = !0, t.display = "");
							var r = {};
							try {
								r = this.node.getBBox();
							} catch {
								r = {
									x: this.node.clientLeft,
									y: this.node.clientTop,
									width: this.node.clientWidth,
									height: this.node.clientHeight
								};
							} finally {
								r ||= {}, n && (t.display = "none");
							}
							return e && this.hide(), r;
						}, D.attr = function(n, r) {
							if (this.removed) return this;
							if (n == null) {
								var i = {};
								for (var a in this.attrs) this.attrs[t](a) && (i[a] = this.attrs[a]);
								return i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i;
							}
							if (r == null && e.is(n, "string")) {
								if (n == "fill" && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
								if (n == "transform") return this._.transform;
								for (var o = n.split(l), s = {}, c = 0, d = o.length; c < d; c++) (n = o[c]) in this.attrs ? s[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? s[n] = this.paper.customAttributes[n].def : s[n] = e._availableAttrs[n];
								return d - 1 ? s : s[o[0]];
							}
							if (r == null && e.is(n, "array")) {
								for (s = {}, c = 0, d = n.length; c < d; c++) s[n[c]] = this.attr(n[c]);
								return s;
							}
							if (r != null) {
								var f = {};
								f[n] = r;
							} else n != null && e.is(n, "object") && (f = n);
							for (var p in f) u("raphael.attr." + p + "." + this.id, this, f[p]);
							for (p in this.paper.customAttributes) if (this.paper.customAttributes[t](p) && f[t](p) && e.is(this.paper.customAttributes[p], "function")) {
								var m = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
								for (var h in this.attrs[p] = f[p], m) m[t](h) && (f[h] = m[h]);
							}
							return C(this, f), this;
						}, D.toFront = function() {
							if (this.removed) return this;
							var t = T(this.node);
							t.parentNode.appendChild(t);
							var n = this.paper;
							return n.top != this && e._tofront(this, n), this;
						}, D.toBack = function() {
							if (this.removed) return this;
							var t = T(this.node), n = t.parentNode;
							return n.insertBefore(t, n.firstChild), e._toback(this, this.paper), this.paper, this;
						}, D.insertAfter = function(t) {
							if (this.removed || !t) return this;
							var n = T(this.node), r = T(t.node || t[t.length - 1].node);
							return r.nextSibling ? r.parentNode.insertBefore(n, r.nextSibling) : r.parentNode.appendChild(n), e._insertafter(this, t, this.paper), this;
						}, D.insertBefore = function(t) {
							if (this.removed || !t) return this;
							var n = T(this.node), r = T(t.node || t[0].node);
							return r.parentNode.insertBefore(n, r), e._insertbefore(this, t, this.paper), this;
						}, D.blur = function(t) {
							var n = this;
							if (+t != 0) {
								var r = g("filter"), i = g("feGaussianBlur");
								n.attrs.blur = t, r.id = e.createUUID(), g(i, { stdDeviation: +t || 1.5 }), r.appendChild(i), n.paper.defs.appendChild(r), n._blur = r, g(n.node, { filter: "url(#" + r.id + ")" });
							} else n._blur && (n._blur.parentNode.removeChild(n._blur), delete n._blur, delete n.attrs.blur), n.node.removeAttribute("filter");
							return n;
						}, e._engine.circle = function(e, t, n, r) {
							var i = g("circle");
							e.canvas && e.canvas.appendChild(i);
							var a = new E(i, e);
							return a.attrs = {
								cx: t,
								cy: n,
								r,
								fill: "none",
								stroke: "#000"
							}, a.type = "circle", g(i, a.attrs), a;
						}, e._engine.rect = function(e, t, n, r, i, a) {
							var o = g("rect");
							e.canvas && e.canvas.appendChild(o);
							var s = new E(o, e);
							return s.attrs = {
								x: t,
								y: n,
								width: r,
								height: i,
								rx: a || 0,
								ry: a || 0,
								fill: "none",
								stroke: "#000"
							}, s.type = "rect", g(o, s.attrs), s;
						}, e._engine.ellipse = function(e, t, n, r, i) {
							var a = g("ellipse");
							e.canvas && e.canvas.appendChild(a);
							var o = new E(a, e);
							return o.attrs = {
								cx: t,
								cy: n,
								rx: r,
								ry: i,
								fill: "none",
								stroke: "#000"
							}, o.type = "ellipse", g(a, o.attrs), o;
						}, e._engine.image = function(e, t, n, r, i, a) {
							var o = g("image");
							g(o, {
								x: n,
								y: r,
								width: i,
								height: a,
								preserveAspectRatio: "none"
							}), o.setAttributeNS(p, "href", t), e.canvas && e.canvas.appendChild(o);
							var s = new E(o, e);
							return s.attrs = {
								x: n,
								y: r,
								width: i,
								height: a,
								src: t
							}, s.type = "image", s;
						}, e._engine.text = function(t, n, r, i) {
							var a = g("text");
							t.canvas && t.canvas.appendChild(a);
							var o = new E(a, t);
							return o.attrs = {
								x: n,
								y: r,
								"text-anchor": "middle",
								text: i,
								"font-family": e._availableAttrs["font-family"],
								"font-size": e._availableAttrs["font-size"],
								stroke: "none",
								fill: "#000"
							}, o.type = "text", C(o, o.attrs), o;
						}, e._engine.setSize = function(e, t) {
							return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this;
						}, e._engine.create = function() {
							var t = e._getContainer.apply(0, arguments), n = t && t.container;
							if (!n) throw Error("SVG container not found.");
							var r, i = t.x, a = t.y, o = t.width, s = t.height, c = g("svg"), l = "overflow:hidden;";
							return i ||= 0, a ||= 0, g(c, {
								height: s ||= 342,
								version: 1.1,
								width: o ||= 512,
								xmlns: "http://www.w3.org/2000/svg",
								"xmlns:xlink": "http://www.w3.org/1999/xlink"
							}), n == 1 ? (c.style.cssText = l + "position:absolute;left:" + i + "px;top:" + a + "px", e._g.doc.body.appendChild(c), r = 1) : (c.style.cssText = l + "position:relative", n.firstChild ? n.insertBefore(c, n.firstChild) : n.appendChild(c)), (n = new e._Paper()).width = o, n.height = s, n.canvas = c, n.clear(), n._left = n._top = 0, r && (n.renderfix = function() {}), n.renderfix(), n;
						}, e._engine.setViewBox = function(e, t, n, r, i) {
							u("raphael.setViewBox", this, this._viewBox, [
								e,
								t,
								n,
								r,
								i
							]);
							var a, s, c = this.getSize(), l = o(n / c.width, r / c.height), d = this.top, p = i ? "xMidYMid meet" : "xMinYMin";
							for (e == null ? (this._vbSize && (l = 1), delete this._vbSize, a = "0 0 " + this.width + f + this.height) : (this._vbSize = l, a = e + f + t + f + n + f + r), g(this.canvas, {
								viewBox: a,
								preserveAspectRatio: p
							}); l && d;) s = "stroke-width" in d.attrs ? d.attrs["stroke-width"] : 1, d.attr({ "stroke-width": s }), d._.dirty = 1, d._.dirtyT = 1, d = d.prev;
							return this._viewBox = [
								e,
								t,
								n,
								r,
								!!i
							], this;
						}, e.prototype.renderfix = function() {
							var e, t = this.canvas, n = t.style;
							try {
								e = t.getScreenCTM() || t.createSVGMatrix();
							} catch {
								e = t.createSVGMatrix();
							}
							var r = -e.e % 1, i = -e.f % 1;
							(r || i) && (r && (this._left = (this._left + r) % 1, n.left = this._left + "px"), i && (this._top = (this._top + i) % 1, n.top = this._top + "px"));
						}, e.prototype.clear = function() {
							e.eve("raphael.clear", this);
							for (var t = this.canvas; t.firstChild;) t.removeChild(t.firstChild);
							this.bottom = this.top = null, (this.desc = g("desc")).appendChild(e._g.doc.createTextNode("Created with Raphaël " + e.version)), t.appendChild(this.desc), t.appendChild(this.defs = g("defs"));
						}, e.prototype.remove = function() {
							for (var t in u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
						};
						var O = e.st;
						for (var k in D) D[t](k) && !O[t](k) && (O[k] = function(e) {
							return function() {
								var t = arguments;
								return this.forEach(function(n) {
									n[e].apply(n, t);
								});
							};
						}(k));
					}
				}.apply(t, r)) === void 0 || (e.exports = i);
			},
			function(e, t, n) {
				var r = [n(0)], i;
				(i = function(e) {
					if (!e || e.vml) {
						var t = "hasOwnProperty", n = String, r = parseFloat, i = Math, a = i.round, o = i.max, s = i.min, c = i.abs, l = /[, ]+/, u = e.eve, d = " ", f = "", p = {
							M: "m",
							L: "l",
							C: "c",
							Z: "x",
							m: "t",
							l: "r",
							c: "v",
							z: "x"
						}, m = /([clmz]),?([^clmz]*)/gi, h = / progid:\S+Blur\([^\)]+\)/g, g = /-?[^,\s-]+/g, _ = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)", v = 21600, y = {
							path: 1,
							rect: 1,
							image: 1
						}, b = {
							circle: 1,
							ellipse: 1
						}, x = function(t, n, r) {
							var i = e.matrix();
							return i.rotate(-t, .5, .5), {
								dx: i.x(n, r),
								dy: i.y(n, r)
							};
						}, S = function(e, t, n, r, i, a) {
							var o = e._, s = e.matrix, l = o.fillpos, u = e.node, f = u.style, p = 1, m = "", h = v / t, g = v / n;
							if (f.visibility = "hidden", t && n) {
								if (u.coordsize = c(h) + d + c(g), f.rotation = a * (t * n < 0 ? -1 : 1), a) {
									var _ = x(a, r, i);
									r = _.dx, i = _.dy;
								}
								if (t < 0 && (m += "x"), n < 0 && (m += " y") && (p = -1), f.flip = m, u.coordorigin = r * -h + d + i * -g, l || o.fillsize) {
									var y = u.getElementsByTagName("fill");
									y &&= y[0], u.removeChild(y), l && (_ = x(a, s.x(l[0], l[1]), s.y(l[0], l[1])), y.position = _.dx * p + d + _.dy * p), o.fillsize && (y.size = o.fillsize[0] * c(t) + d + o.fillsize[1] * c(n)), u.appendChild(y);
								}
								f.visibility = "visible";
							}
						};
						e.toString = function() {
							return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
						};
						var C, w = function(e, t, r) {
							for (var i = n(t).toLowerCase().split("-"), a = r ? "end" : "start", o = i.length, s = "classic", c = "medium", l = "medium"; o--;) switch (i[o]) {
								case "block":
								case "classic":
								case "oval":
								case "diamond":
								case "open":
								case "none":
									s = i[o];
									break;
								case "wide":
								case "narrow":
									l = i[o];
									break;
								case "long":
								case "short": c = i[o];
							}
							var u = e.node.getElementsByTagName("stroke")[0];
							u[a + "arrow"] = s, u[a + "arrowlength"] = c, u[a + "arrowwidth"] = l;
						}, T = function(i, c) {
							i.attrs = i.attrs || {};
							var u = i.node, h = i.attrs, _ = u.style, x = y[i.type] && (c.x != h.x || c.y != h.y || c.width != h.width || c.height != h.height || c.cx != h.cx || c.cy != h.cy || c.rx != h.rx || c.ry != h.ry || c.r != h.r), T = b[i.type] && (h.cx != c.cx || h.cy != c.cy || h.r != c.r || h.rx != c.rx || h.ry != c.ry), D = i;
							for (var O in c) c[t](O) && (h[O] = c[O]);
							if (x && (h.path = e._getPath[i.type](i), i._.dirty = 1), c.href && (u.href = c.href), c.title && (u.title = c.title), c.target && (u.target = c.target), c.cursor && (_.cursor = c.cursor), "blur" in c && i.blur(c.blur), (c.path && i.type == "path" || x) && (u.path = function(t) {
								var r = /[ahqstv]/gi, i = e._pathToAbsolute;
								if (n(t).match(r) && (i = e._path2curve), r = /[clmz]/g, i == e._pathToAbsolute && !n(t).match(r)) {
									var o = n(t).replace(m, function(e, t, n) {
										var r = [], i = t.toLowerCase() == "m", o = p[t];
										return n.replace(g, function(e) {
											i && r.length == 2 && (o += r + p[t == "m" ? "l" : "L"], r = []), r.push(a(e * v));
										}), o + r;
									});
									return o;
								}
								var s, c, l = i(t);
								o = [];
								for (var u = 0, h = l.length; u < h; u++) {
									s = l[u], (c = l[u][0].toLowerCase()) == "z" && (c = "x");
									for (var _ = 1, y = s.length; _ < y; _++) c += a(s[_] * v) + (_ == y - 1 ? f : ",");
									o.push(c);
								}
								return o.join(d);
							}(~n(h.path).toLowerCase().indexOf("r") ? e._pathToAbsolute(h.path) : h.path), i._.dirty = 1, i.type == "image" && (i._.fillpos = [h.x, h.y], i._.fillsize = [h.width, h.height], S(i, 1, 1, 0, 0, 0))), "transform" in c && i.transform(c.transform), T) {
								var k = +h.cx, A = +h.cy, j = +h.rx || +h.r || 0, M = +h.ry || +h.r || 0;
								u.path = e.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a((k - j) * v), a((A - M) * v), a((k + j) * v), a((A + M) * v), a(k * v)), i._.dirty = 1;
							}
							if ("clip-rect" in c) {
								var N = n(c["clip-rect"]).split(l);
								if (N.length == 4) {
									N[2] = +N[2] + +N[0], N[3] = +N[3] + +N[1];
									var P = u.clipRect || e._g.doc.createElement("div"), F = P.style;
									F.clip = e.format("rect({1}px {2}px {3}px {0}px)", N), u.clipRect ||= (F.position = "absolute", F.top = 0, F.left = 0, F.width = i.paper.width + "px", F.height = i.paper.height + "px", u.parentNode.insertBefore(P, u), P.appendChild(u), P);
								}
								c["clip-rect"] || u.clipRect && (u.clipRect.style.clip = "auto");
							}
							if (i.textpath) {
								var I = i.textpath.style;
								c.font && (I.font = c.font), c["font-family"] && (I.fontFamily = "\"" + c["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f) + "\""), c["font-size"] && (I.fontSize = c["font-size"]), c["font-weight"] && (I.fontWeight = c["font-weight"]), c["font-style"] && (I.fontStyle = c["font-style"]);
							}
							if ("arrow-start" in c && w(D, c["arrow-start"]), "arrow-end" in c && w(D, c["arrow-end"], 1), c.opacity != null || c.fill != null || c.src != null || c.stroke != null || c["stroke-width"] != null || c["stroke-opacity"] != null || c["fill-opacity"] != null || c["stroke-dasharray"] != null || c["stroke-miterlimit"] != null || c["stroke-linejoin"] != null || c["stroke-linecap"] != null) {
								var L = u.getElementsByTagName("fill");
								if (!(L &&= L[0]) && (L = C("fill")), i.type == "image" && c.src && (L.src = c.src), c.fill && (L.on = !0), L.on != null && c.fill != "none" && c.fill !== null || (L.on = !1), L.on && c.fill) {
									var R = n(c.fill).match(e._ISURL);
									if (R) {
										L.parentNode == u && u.removeChild(L), L.rotate = !0, L.src = R[1], L.type = "tile";
										var z = i.getBBox(1);
										L.position = z.x + d + z.y, i._.fillpos = [z.x, z.y], e._preload(R[1], function() {
											i._.fillsize = [this.offsetWidth, this.offsetHeight];
										});
									} else L.color = e.getRGB(c.fill).hex, L.src = f, L.type = "solid", e.getRGB(c.fill).error && (D.type in {
										circle: 1,
										ellipse: 1
									} || n(c.fill).charAt() != "r") && E(D, c.fill, L) && (h.fill = "none", h.gradient = c.fill, L.rotate = !1);
								}
								if ("fill-opacity" in c || "opacity" in c) {
									var B = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+e.getRGB(c.fill).o + 1 || 2) - 1);
									B = s(o(B, 0), 1), L.opacity = B, L.src && (L.color = "none");
								}
								u.appendChild(L);
								var V = u.getElementsByTagName("stroke") && u.getElementsByTagName("stroke")[0], H = !1;
								!V && (H = V = C("stroke")), (c.stroke && c.stroke != "none" || c["stroke-width"] || c["stroke-opacity"] != null || c["stroke-dasharray"] || c["stroke-miterlimit"] || c["stroke-linejoin"] || c["stroke-linecap"]) && (V.on = !0), (c.stroke == "none" || c.stroke === null || V.on == null || c.stroke == 0 || c["stroke-width"] == 0) && (V.on = !1);
								var U = e.getRGB(c.stroke);
								V.on && c.stroke && (V.color = U.hex), B = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+U.o + 1 || 2) - 1);
								var W = .75 * (r(c["stroke-width"]) || 1);
								if (B = s(o(B, 0), 1), c["stroke-width"] ?? (W = h["stroke-width"]), c["stroke-width"] && (V.weight = W), W && W < 1 && (B *= W) && (V.weight = 1), V.opacity = B, c["stroke-linejoin"] && (V.joinstyle = c["stroke-linejoin"] || "miter"), V.miterlimit = c["stroke-miterlimit"] || 8, c["stroke-linecap"] && (V.endcap = c["stroke-linecap"] == "butt" ? "flat" : c["stroke-linecap"] == "square" ? "square" : "round"), "stroke-dasharray" in c) {
									var G = {
										"-": "shortdash",
										".": "shortdot",
										"-.": "shortdashdot",
										"-..": "shortdashdotdot",
										". ": "dot",
										"- ": "dash",
										"--": "longdash",
										"- .": "dashdot",
										"--.": "longdashdot",
										"--..": "longdashdotdot"
									};
									V.dashstyle = G[t](c["stroke-dasharray"]) ? G[c["stroke-dasharray"]] : f;
								}
								H && u.appendChild(V);
							}
							if (D.type == "text") {
								D.paper.canvas.style.display = f;
								var K = D.paper.span, q = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
								_ = K.style, h.font && (_.font = h.font), h["font-family"] && (_.fontFamily = h["font-family"]), h["font-weight"] && (_.fontWeight = h["font-weight"]), h["font-style"] && (_.fontStyle = h["font-style"]), q = r(h["font-size"] || q && q[0]) || 10, _.fontSize = 100 * q + "px", D.textpath.string && (K.innerHTML = n(D.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
								var J = K.getBoundingClientRect();
								D.W = h.w = (J.right - J.left) / 100, D.H = h.h = (J.bottom - J.top) / 100, D.X = h.x, D.Y = h.y + D.H / 2, ("x" in c || "y" in c) && (D.path.v = e.format("m{0},{1}l{2},{1}", a(h.x * v), a(h.y * v), a(h.x * v) + 1));
								for (var ee = [
									"x",
									"y",
									"text",
									"font",
									"font-family",
									"font-weight",
									"font-style",
									"font-size"
								], te = 0, ne = ee.length; te < ne; te++) if (ee[te] in c) {
									D._.dirty = 1;
									break;
								}
								switch (h["text-anchor"]) {
									case "start":
										D.textpath.style["v-text-align"] = "left", D.bbx = D.W / 2;
										break;
									case "end":
										D.textpath.style["v-text-align"] = "right", D.bbx = -D.W / 2;
										break;
									default: D.textpath.style["v-text-align"] = "center", D.bbx = 0;
								}
								D.textpath.style["v-text-kern"] = !0;
							}
						}, E = function(t, a, o) {
							t.attrs = t.attrs || {}, t.attrs;
							var s = Math.pow, c = "linear", l = ".5 .5";
							if (t.attrs.gradient = a, a = (a = n(a).replace(e._radial_gradient, function(e, t, n) {
								return c = "radial", t && n && (t = r(t), n = r(n), s(t - .5, 2) + s(n - .5, 2) > .25 && (n = i.sqrt(.25 - s(t - .5, 2)) * (2 * (n > .5) - 1) + .5), l = t + d + n), f;
							})).split(/\s*\-\s*/), c == "linear") {
								var u = a.shift();
								if (u = -r(u), isNaN(u)) return null;
							}
							var p = e._parseDots(a);
							if (!p) return null;
							if (t = t.shape || t.node, p.length) {
								t.removeChild(o), o.on = !0, o.method = "none", o.color = p[0].color, o.color2 = p[p.length - 1].color;
								for (var m = [], h = 0, g = p.length; h < g; h++) p[h].offset && m.push(p[h].offset + d + p[h].color);
								o.colors = m.length ? m.join() : "0% " + o.color, c == "radial" ? (o.type = "gradientTitle", o.focus = "100%", o.focussize = "0 0", o.focusposition = l, o.angle = 0) : (o.type = "gradient", o.angle = (270 - u) % 360), t.appendChild(o);
							}
							return 1;
						}, D = function(t, n) {
							this[0] = this.node = t, t.raphael = !0, this.id = e._oid++, t.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = n, this.matrix = e.matrix(), this._ = {
								transform: [],
								sx: 1,
								sy: 1,
								dx: 0,
								dy: 0,
								deg: 0,
								dirty: 1,
								dirtyT: 1
							}, !n.bottom && (n.bottom = this), this.prev = n.top, n.top && (n.top.next = this), n.top = this, this.next = null;
						}, O = e.el;
						D.prototype = O, O.constructor = D, O.transform = function(t) {
							if (t == null) return this._.transform;
							var r, i = this.paper._viewBoxShift, a = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : f;
							i && (r = t = n(t).replace(/\.{3}|\u2026/g, this._.transform || f)), e._extractTransform(this, a + t);
							var o, s = this.matrix.clone(), c = this.skew, l = this.node, u = ~n(this.attrs.fill).indexOf("-"), p = !n(this.attrs.fill).indexOf("url(");
							if (s.translate(1, 1), p || u || this.type == "image") {
								if (c.matrix = "1 0 0 1", c.offset = "0 0", o = s.split(), u && o.noRotation || !o.isSimple) {
									l.style.filter = s.toFilter();
									var m = this.getBBox(), h = this.getBBox(1), g = m.x - h.x, _ = m.y - h.y;
									l.coordorigin = g * -v + d + _ * -v, S(this, 1, 1, g, _, 0);
								} else l.style.filter = f, S(this, o.scalex, o.scaley, o.dx, o.dy, o.rotate);
							} else l.style.filter = f, c.matrix = n(s), c.offset = s.offset();
							return r !== null && (this._.transform = r, e._extractTransform(this, r)), this;
						}, O.rotate = function(e, t, i) {
							if (this.removed) return this;
							if (e != null) {
								if ((e = n(e).split(l)).length - 1 && (t = r(e[1]), i = r(e[2])), e = r(e[0]), i ?? (t = i), t == null || i == null) {
									var a = this.getBBox(1);
									t = a.x + a.width / 2, i = a.y + a.height / 2;
								}
								return this._.dirtyT = 1, this.transform(this._.transform.concat([[
									"r",
									e,
									t,
									i
								]])), this;
							}
						}, O.translate = function(e, t) {
							return this.removed || ((e = n(e).split(l)).length - 1 && (t = r(e[1])), e = r(e[0]) || 0, t = +t || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += t), this.transform(this._.transform.concat([[
								"t",
								e,
								t
							]]))), this;
						}, O.scale = function(e, t, i, a) {
							if (this.removed) return this;
							if ((e = n(e).split(l)).length - 1 && (t = r(e[1]), i = r(e[2]), a = r(e[3]), isNaN(i) && (i = null), isNaN(a) && (a = null)), e = r(e[0]), t ??= e, a ?? (i = a), i == null || a == null) var o = this.getBBox(1);
							return i ??= o.x + o.width / 2, a ??= o.y + o.height / 2, this.transform(this._.transform.concat([[
								"s",
								e,
								t,
								i,
								a
							]])), this._.dirtyT = 1, this;
						}, O.hide = function() {
							return !this.removed && (this.node.style.display = "none"), this;
						}, O.show = function() {
							return !this.removed && (this.node.style.display = f), this;
						}, O.auxGetBBox = e.el.getBBox, O.getBBox = function() {
							var e = this.auxGetBBox();
							if (this.paper && this.paper._viewBoxShift) {
								var t = {}, n = 1 / this.paper._viewBoxShift.scale;
								return t.x = e.x - this.paper._viewBoxShift.dx, t.x *= n, t.y = e.y - this.paper._viewBoxShift.dy, t.y *= n, t.width = e.width * n, t.height = e.height * n, t.x2 = t.x + t.width, t.y2 = t.y + t.height, t;
							}
							return e;
						}, O._getBBox = function() {
							return this.removed ? {} : {
								x: this.X + (this.bbx || 0) - this.W / 2,
								y: this.Y - this.H,
								width: this.W,
								height: this.H
							};
						}, O.remove = function() {
							if (!this.removed && this.node.parentNode) {
								for (var t in this.paper.__set__ && this.paper.__set__.exclude(this), e.eve.unbind("raphael.*.*." + this.id), e._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape), this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
								this.removed = !0;
							}
						}, O.attr = function(n, r) {
							if (this.removed) return this;
							if (n == null) {
								var i = {};
								for (var a in this.attrs) this.attrs[t](a) && (i[a] = this.attrs[a]);
								return i.gradient && i.fill == "none" && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i;
							}
							if (r == null && e.is(n, "string")) {
								if (n == "fill" && this.attrs.fill == "none" && this.attrs.gradient) return this.attrs.gradient;
								for (var o = n.split(l), s = {}, c = 0, d = o.length; c < d; c++) (n = o[c]) in this.attrs ? s[n] = this.attrs[n] : e.is(this.paper.customAttributes[n], "function") ? s[n] = this.paper.customAttributes[n].def : s[n] = e._availableAttrs[n];
								return d - 1 ? s : s[o[0]];
							}
							if (this.attrs && r == null && e.is(n, "array")) {
								for (s = {}, c = 0, d = n.length; c < d; c++) s[n[c]] = this.attr(n[c]);
								return s;
							}
							var f;
							for (var p in r != null && ((f = {})[n] = r), r == null && e.is(n, "object") && (f = n), f) u("raphael.attr." + p + "." + this.id, this, f[p]);
							if (f) {
								for (p in this.paper.customAttributes) if (this.paper.customAttributes[t](p) && f[t](p) && e.is(this.paper.customAttributes[p], "function")) {
									var m = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
									for (var h in this.attrs[p] = f[p], m) m[t](h) && (f[h] = m[h]);
								}
								f.text && this.type == "text" && (this.textpath.string = f.text), T(this, f);
							}
							return this;
						}, O.toFront = function() {
							return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && e._tofront(this, this.paper), this;
						}, O.toBack = function() {
							return this.removed || this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), e._toback(this, this.paper)), this;
						}, O.insertAfter = function(t) {
							return this.removed || (t.constructor == e.st.constructor && (t = t[t.length - 1]), t.node.nextSibling ? t.node.parentNode.insertBefore(this.node, t.node.nextSibling) : t.node.parentNode.appendChild(this.node), e._insertafter(this, t, this.paper)), this;
						}, O.insertBefore = function(t) {
							return this.removed || (t.constructor == e.st.constructor && (t = t[0]), t.node.parentNode.insertBefore(this.node, t.node), e._insertbefore(this, t, this.paper)), this;
						}, O.blur = function(t) {
							var n = this.node.runtimeStyle, r = n.filter;
							return r = r.replace(h, f), +t == 0 ? (n.filter = r, n.margin = 0, delete this.attrs.blur) : (this.attrs.blur = t, n.filter = r + d + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+t || 1.5) + ")", n.margin = e.format("-{0}px 0 0 -{0}px", a(+t || 1.5))), this;
						}, e._engine.path = function(e, t) {
							var n = C("shape");
							n.style.cssText = _, n.coordsize = v + d + v, n.coordorigin = t.coordorigin;
							var r = new D(n, t), i = {
								fill: "none",
								stroke: "#000"
							};
							e && (i.path = e), r.type = "path", r.path = [], r.Path = f, T(r, i), t.canvas && t.canvas.appendChild(n);
							var a = C("skew");
							return a.on = !0, n.appendChild(a), r.skew = a, r.transform(f), r;
						}, e._engine.rect = function(t, n, r, i, a, o) {
							var s = e._rectPath(n, r, i, a, o), c = t.path(s), l = c.attrs;
							return c.X = l.x = n, c.Y = l.y = r, c.W = l.width = i, c.H = l.height = a, l.r = o, l.path = s, c.type = "rect", c;
						}, e._engine.ellipse = function(e, t, n, r, i) {
							var a = e.path();
							return a.attrs, a.X = t - r, a.Y = n - i, a.W = 2 * r, a.H = 2 * i, a.type = "ellipse", T(a, {
								cx: t,
								cy: n,
								rx: r,
								ry: i
							}), a;
						}, e._engine.circle = function(e, t, n, r) {
							var i = e.path();
							return i.attrs, i.X = t - r, i.Y = n - r, i.W = i.H = 2 * r, i.type = "circle", T(i, {
								cx: t,
								cy: n,
								r
							}), i;
						}, e._engine.image = function(t, n, r, i, a, o) {
							var s = e._rectPath(r, i, a, o), c = t.path(s).attr({ stroke: "none" }), l = c.attrs, u = c.node, d = u.getElementsByTagName("fill")[0];
							return l.src = n, c.X = l.x = r, c.Y = l.y = i, c.W = l.width = a, c.H = l.height = o, l.path = s, c.type = "image", d.parentNode == u && u.removeChild(d), d.rotate = !0, d.src = n, d.type = "tile", c._.fillpos = [r, i], c._.fillsize = [a, o], u.appendChild(d), S(c, 1, 1, 0, 0, 0), c;
						}, e._engine.text = function(t, r, i, o) {
							var s = C("shape"), c = C("path"), l = C("textpath");
							r ||= 0, i ||= 0, o ||= "", c.v = e.format("m{0},{1}l{2},{1}", a(r * v), a(i * v), a(r * v) + 1), c.textpathok = !0, l.string = n(o), l.on = !0, s.style.cssText = _, s.coordsize = v + d + v, s.coordorigin = "0 0";
							var u = new D(s, t), p = {
								fill: "#000",
								stroke: "none",
								font: e._availableAttrs.font,
								text: o
							};
							u.shape = s, u.path = c, u.textpath = l, u.type = "text", u.attrs.text = n(o), u.attrs.x = r, u.attrs.y = i, u.attrs.w = 1, u.attrs.h = 1, T(u, p), s.appendChild(l), s.appendChild(c), t.canvas.appendChild(s);
							var m = C("skew");
							return m.on = !0, s.appendChild(m), u.skew = m, u.transform(f), u;
						}, e._engine.setSize = function(t, n) {
							var r = this.canvas.style;
							return this.width = t, this.height = n, t == +t && (t += "px"), n == +n && (n += "px"), r.width = t, r.height = n, r.clip = "rect(0 " + t + " " + n + " 0)", this._viewBox && e._engine.setViewBox.apply(this, this._viewBox), this;
						}, e._engine.setViewBox = function(t, n, r, i, a) {
							e.eve("raphael.setViewBox", this, this._viewBox, [
								t,
								n,
								r,
								i,
								a
							]);
							var o, s, c = this.getSize(), l = c.width, u = c.height;
							return a && (r * (o = u / i) < l && (t -= (l - r * o) / 2 / o), i * (s = l / r) < u && (n -= (u - i * s) / 2 / s)), this._viewBox = [
								t,
								n,
								r,
								i,
								!!a
							], this._viewBoxShift = {
								dx: -t,
								dy: -n,
								scale: c
							}, this.forEach(function(e) {
								e.transform("...");
							}), this;
						}, e._engine.initWin = function(e) {
							var t = e.document;
							t.styleSheets.length < 31 ? t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : t.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
							try {
								!t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), C = function(e) {
									return t.createElement("<rvml:" + e + " class=\"rvml\">");
								};
							} catch {
								C = function(e) {
									return t.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"rvml\">");
								};
							}
						}, e._engine.initWin(e._g.win), e._engine.create = function() {
							var t = e._getContainer.apply(0, arguments), n = t.container, r = t.height, i = t.width, a = t.x, o = t.y;
							if (!n) throw Error("VML container not found.");
							var s = new e._Paper(), c = s.canvas = e._g.doc.createElement("div"), l = c.style;
							return a ||= 0, o ||= 0, i ||= 512, r ||= 342, s.width = i, s.height = r, i == +i && (i += "px"), r == +r && (r += "px"), s.coordsize = 216e5 + d + 216e5, s.coordorigin = "0 0", s.span = e._g.doc.createElement("span"), s.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", c.appendChild(s.span), l.cssText = e.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", i, r), n == 1 ? (e._g.doc.body.appendChild(c), l.left = a + "px", l.top = o + "px", l.position = "absolute") : n.firstChild ? n.insertBefore(c, n.firstChild) : n.appendChild(c), s.renderfix = function() {}, s;
						}, e.prototype.clear = function() {
							e.eve("raphael.clear", this), this.canvas.innerHTML = f, this.span = e._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
						}, e.prototype.remove = function() {
							for (var t in e.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas), this) this[t] = typeof this[t] == "function" ? e._removedFactory(t) : null;
							return !0;
						};
						var k = e.st;
						for (var A in O) O[t](A) && !k[t](A) && (k[A] = function(e) {
							return function() {
								var t = arguments;
								return this.forEach(function(n) {
									n[e].apply(n, t);
								});
							};
						}(A));
					}
				}.apply(t, r)) === void 0 || (e.exports = i);
			}
		]);
	});
})), r = /* @__PURE__ */ e(((e, t) => {
	function n(e, t) {
		if (!e || typeof e == "function") return t;
		var r = {};
		for (var i in t) r[i] = t[i];
		for (i in e) e[i] && (typeof r[i] == "object" ? r[i] = n(r[i], e[i]) : r[i] = e[i]);
		return r;
	}
	function r(e, t) {
		if (typeof Object.create == "function") e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} });
		else {
			e.super_ = t;
			var n = function() {};
			n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
		}
	}
	t.exports = {
		defaults: n,
		inherits: r
	};
})), i = /* @__PURE__ */ e(((e, t) => {
	t.exports = {
		x: 0,
		y: 0,
		"line-width": 3,
		"line-length": 50,
		"text-margin": 10,
		"font-size": 14,
		"font-color": "black",
		"line-color": "black",
		"element-color": "black",
		fill: "white",
		"yes-text": "yes",
		"no-text": "no",
		"arrow-end": "block",
		class: "flowchart",
		scale: 1,
		symbols: {
			start: {},
			end: {},
			condition: {},
			inputoutput: {},
			input: {},
			output: {},
			operation: {},
			subroutine: {},
			parallel: {}
		}
	};
})), a = /* @__PURE__ */ e(((e, t) => {
	function n(e, t, n) {
		var r, i, a = "M{0},{1}";
		for (r = 2, i = 2 * n.length + 2; r < i; r += 2) a += " L{" + r + "},{" + (r + 1) + "}";
		var o = [t.x, t.y];
		for (r = 0, i = n.length; r < i; r++) o.push(n[r].x), o.push(n[r].y);
		var s = e.paper.path(a, o);
		s.attr("stroke", e.options["element-color"]), s.attr("stroke-width", e.options["line-width"]);
		var c = e.options.font, l = e.options["font-family"], u = e.options["font-weight"];
		return c && s.attr({ font: c }), l && s.attr({ "font-family": l }), u && s.attr({ "font-weight": u }), s;
	}
	function r(e, t, n, r) {
		var i, a;
		Object.prototype.toString.call(n) !== "[object Array]" && (n = [n]);
		var o = "M{0},{1}";
		for (i = 2, a = 2 * n.length + 2; i < a; i += 2) o += " L{" + i + "},{" + (i + 1) + "}";
		var s = [t.x, t.y];
		for (i = 0, a = n.length; i < a; i++) s.push(n[i].x), s.push(n[i].y);
		var c = e.paper.path(o, s);
		c.attr({
			stroke: e.options["line-color"],
			"stroke-width": e.options["line-width"],
			"arrow-end": e.options["arrow-end"]
		});
		var l = e.options.font, u = e.options["font-family"], d = e.options["font-weight"];
		if (l && c.attr({ font: l }), u && c.attr({ "font-family": u }), d && c.attr({ "font-weight": d }), r) {
			var f = e.paper.text(0, 0, r), p = "start", m = !1, h = n[0];
			t.y === h.y && (m = !0);
			var g = 0, _ = 0;
			g = t.x, _ = t.y, m ? (t.x > h.x ? (g -= e.options["text-margin"] / 2, p = "end") : g += e.options["text-margin"] / 2, _ -= e.options["text-margin"]) : (g += e.options["text-margin"] / 2, _ += e.options["text-margin"], t.y > h.y && (_ -= e.options["text-margin"] * 2)), f.attr({
				"text-anchor": p,
				"font-size": e.options["font-size"],
				fill: e.options["font-color"],
				x: g,
				y: _
			}), l && f.attr({ font: l }), u && f.attr({ "font-family": u }), d && f.attr({ "font-weight": d });
		}
		return c;
	}
	function i(e, t, n, r, i, a, o, s) {
		var c, l, u, d, f, p = {
			x: null,
			y: null,
			onLine1: !1,
			onLine2: !1
		};
		return c = (s - a) * (n - e) - (o - i) * (r - t), c === 0 || (l = t - a, u = e - i, d = (o - i) * l - (s - a) * u, f = (n - e) * l - (r - t) * u, l = d / c, u = f / c, p.x = e + l * (n - e), p.y = t + l * (r - t), l > 0 && l < 1 && (p.onLine1 = !0), u > 0 && u < 1 && (p.onLine2 = !0)), p;
	}
	t.exports = {
		drawPath: n,
		drawLine: r,
		checkLineIntersection: i
	};
})), o = /* @__PURE__ */ e(((e, t) => {
	var n = a(), r = n.drawLine, i = n.checkLineIntersection;
	function o(e, t, n) {
		this.chart = e, this.group = this.chart.paper.set(), this.symbol = n, this.connectedTo = [], this.symbolType = t.symbolType, this.flowstate = t.flowstate || "future", this.lineStyle = t.lineStyle || {}, this.key = t.key || "", this.leftLines = [], this.rightLines = [], this.topLines = [], this.bottomLines = [], this.params = t.params, this.next_direction = t.next && t.direction_next ? t.direction_next : void 0, this.text = this.chart.paper.text(0, 0, t.text), t.key && (this.text.node.id = t.key + "t"), this.text.node.setAttribute("class", this.getAttr("class") + "t"), this.text.attr({
			"text-anchor": "start",
			x: this.getAttr("text-margin"),
			fill: this.getAttr("font-color"),
			"font-size": this.getAttr("font-size")
		});
		var r = this.getAttr("font"), i = this.getAttr("font-family"), a = this.getAttr("font-weight");
		r && this.text.attr({ font: r }), i && this.text.attr({ "font-family": i }), a && this.text.attr({ "font-weight": a }), t.link && this.text.attr("href", t.link), t.function && (this.text.attr({ cursor: "pointer" }), this.text.node.addEventListener("click", function(e) {
			window[t.function](e, t);
		}, !1)), t.target && this.text.attr("target", t.target);
		var o = this.getAttr("maxWidth");
		if (o) {
			for (var s = t.text.split(" "), c = "", l = 0, u = s.length; l < u; l++) {
				var d = s[l];
				this.text.attr("text", c + " " + d), this.text.getBBox().width > o ? c += "\n" + d : c += " " + d;
			}
			this.text.attr("text", c.substring(1));
		}
		if (this.group.push(this.text), n) {
			var f = this.getAttr("text-margin");
			n.attr({
				fill: this.getAttr("fill"),
				stroke: this.getAttr("element-color"),
				"stroke-width": this.getAttr("line-width"),
				width: this.text.getBBox().width + 2 * f,
				height: this.text.getBBox().height + 2 * f
			}), n.node.setAttribute("class", this.getAttr("class"));
			var p = this.getAttr("roundness");
			isNaN(p) || (n.node.setAttribute("ry", p), n.node.setAttribute("rx", p)), t.link && n.attr("href", t.link), t.target && n.attr("target", t.target), t.function && (n.node.addEventListener("click", function(e) {
				window[t.function](e, t);
			}, !1), n.attr({ cursor: "pointer" })), t.key && (n.node.id = t.key), this.group.push(n), n.insertBefore(this.text), this.text.attr({ y: n.getBBox().height / 2 }), this.initialize();
		}
	}
	o.prototype.getAttr = function(e) {
		if (this.chart) {
			var t = this.chart.options ? this.chart.options[e] : void 0, n = this.chart.options.symbols ? this.chart.options.symbols[this.symbolType][e] : void 0, r;
			return this.chart.options.flowstate && this.chart.options.flowstate[this.flowstate] && (r = this.chart.options.flowstate[this.flowstate][e]), r || n || t;
		}
	}, o.prototype.initialize = function() {
		this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width")), this.width = this.group.getBBox().width, this.height = this.group.getBBox().height;
	}, o.prototype.getCenter = function() {
		return {
			x: this.getX() + this.width / 2,
			y: this.getY() + this.height / 2
		};
	}, o.prototype.getX = function() {
		return this.group.getBBox().x;
	}, o.prototype.getY = function() {
		return this.group.getBBox().y;
	}, o.prototype.shiftX = function(e) {
		this.group.transform("t" + (this.getX() + e) + "," + this.getY());
	}, o.prototype.setX = function(e) {
		this.group.transform("t" + e + "," + this.getY());
	}, o.prototype.shiftY = function(e) {
		this.group.transform("t" + this.getX() + "," + (this.getY() + e));
	}, o.prototype.setY = function(e) {
		this.group.transform("t" + this.getX() + "," + e);
	}, o.prototype.getTop = function() {
		var e = this.getY();
		return {
			x: this.getX() + this.width / 2,
			y: e
		};
	}, o.prototype.getBottom = function() {
		var e = this.getY() + this.height;
		return {
			x: this.getX() + this.width / 2,
			y: e
		};
	}, o.prototype.getLeft = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX(),
			y: e
		};
	}, o.prototype.getRight = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.group.getBBox().width,
			y: e
		};
	}, o.prototype.render = function() {
		if (this.next) {
			var e = this, t = this.getAttr("line-length");
			if (this.next_direction === "right") {
				var n = this.getRight();
				this.next.isPositioned || (this.next.setY(n.y - this.next.height / 2), this.next.shiftX(this.group.getBBox().x + this.width + t), (function n() {
					for (var r = !1, i, a = 0, o = e.chart.symbols.length; a < o; a++) {
						i = e.chart.symbols[a];
						var s = Math.abs(i.getCenter().x - e.next.getCenter().x);
						if (i.getCenter().y > e.next.getCenter().y && s <= e.next.width / 2) {
							r = !0;
							break;
						}
					}
					if (r) {
						if (e.next.symbolType === "end") return;
						e.next.setX(i.getX() + i.width + t), n();
					}
				})(), this.next.isPositioned = !0, this.next.render());
			} else if (this.next_direction === "left") {
				var r = this.getLeft();
				this.next.isPositioned || (this.next.setY(r.y - this.next.height / 2), this.next.shiftX(-(this.group.getBBox().x + this.width + t)), (function n() {
					for (var r = !1, i, a = 0, o = e.chart.symbols.length; a < o; a++) {
						i = e.chart.symbols[a];
						var s = Math.abs(i.getCenter().x - e.next.getCenter().x);
						if (i.getCenter().y > e.next.getCenter().y && s <= e.next.width / 2) {
							r = !0;
							break;
						}
					}
					if (r) {
						if (e.next.symbolType === "end") return;
						e.next.setX(i.getX() + i.width + t), n();
					}
				})(), this.next.isPositioned = !0, this.next.render());
			} else {
				var i = this.getBottom();
				this.next.isPositioned || (this.next.shiftY(this.getY() + this.height + t), this.next.setX(i.x - this.next.width / 2), this.next.isPositioned = !0, this.next.render());
			}
		}
	}, o.prototype.renderLines = function() {
		this.next && (this.next_direction ? this.drawLineTo(this.next, this.getAttr("arrow-text") || "", this.next_direction) : this.drawLineTo(this.next, this.getAttr("arrow-text") || ""));
	}, o.prototype.drawLineTo = function(e, t, n) {
		this.connectedTo.indexOf(e) < 0 && this.connectedTo.push(e);
		var a = this.getCenter().x, o = this.getCenter().y, s = this.getRight(), c = this.getBottom(), l = this.getTop(), u = this.getLeft(), d = e.getCenter().x, f = e.getCenter().y, p = e.getTop(), m = e.getRight(), h = e.getLeft(), g = a === d, _ = o === f, v = o < f, y = o > f || this === e, b = a > d, x = a < d, S = 0, C, w, T = this.getAttr("line-length"), E = this.getAttr("line-width");
		if ((!n || n === "bottom") && g && v) e.topLines.length === 0 && this.bottomLines.length === 0 ? C = r(this.chart, c, p, t) : (w = Math.max(e.topLines.length, this.bottomLines.length) * 10, C = r(this.chart, c, [{
			x: p.x,
			y: p.y - w
		}, {
			x: p.x,
			y: p.y
		}], t)), this.bottomLines.push(C), e.topLines.push(C), this.bottomStart = !0, e.topEnd = !0, S = c.x;
		else if ((!n || n === "right") && _ && x) e.leftLines.length === 0 && this.rightLines.length === 0 ? C = r(this.chart, s, h, t) : (w = Math.max(e.leftLines.length, this.rightLines.length) * 10, C = r(this.chart, s, [
			{
				x: s.x,
				y: s.y - w
			},
			{
				x: s.x,
				y: h.y - w
			},
			{
				x: h.x,
				y: h.y - w
			},
			{
				x: h.x,
				y: h.y
			}
		], t)), this.rightLines.push(C), e.leftLines.push(C), this.rightStart = !0, e.leftEnd = !0, S = h.x;
		else if ((!n || n === "left") && _ && b) e.rightLines.length === 0 && this.leftLines.length === 0 ? C = r(this.chart, u, m, t) : (w = Math.max(e.rightLines.length, this.leftLines.length) * 10, C = r(this.chart, s, [
			{
				x: s.x,
				y: s.y - w
			},
			{
				x: s.x,
				y: m.y - w
			},
			{
				x: m.x,
				y: m.y - w
			},
			{
				x: m.x,
				y: m.y
			}
		], t)), this.leftLines.push(C), e.rightLines.push(C), this.leftStart = !0, e.rightEnd = !0, S = m.x;
		else if ((!n || n === "right") && g && y) w = Math.max(e.topLines.length, this.rightLines.length) * 10, C = r(this.chart, s, [
			{
				x: s.x + T / 2,
				y: s.y - w
			},
			{
				x: s.x + T / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.rightLines.push(C), e.topLines.push(C), this.rightStart = !0, e.topEnd = !0, S = s.x + T / 2;
		else if ((!n || n === "right") && g && v) w = Math.max(e.topLines.length, this.rightLines.length) * 10, C = r(this.chart, s, [
			{
				x: s.x + T / 2,
				y: s.y - w
			},
			{
				x: s.x + T / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.rightLines.push(C), e.topLines.push(C), this.rightStart = !0, e.topEnd = !0, S = s.x + T / 2;
		else if ((!n || n === "bottom") && b) w = Math.max(e.topLines.length, this.bottomLines.length) * 10, C = this.leftEnd && y ? r(this.chart, c, [
			{
				x: c.x,
				y: c.y + T / 2 - w
			},
			{
				x: c.x + (c.x - p.x) / 2,
				y: c.y + T / 2 - w
			},
			{
				x: c.x + (c.x - p.x) / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t) : r(this.chart, c, [
			{
				x: c.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.bottomLines.push(C), e.topLines.push(C), this.bottomStart = !0, e.topEnd = !0, S = c.x + (c.x - p.x) / 2;
		else if ((!n || n === "bottom") && x && v) w = Math.max(e.topLines.length, this.bottomLines.length) * 10, C = r(this.chart, c, [
			{
				x: c.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.bottomLines.push(C), e.topLines.push(C), this.bottomStart = !0, e.topEnd = !0, S = c.x, p.x > S && (S = p.x);
		else if ((!n || n === "bottom") && x) w = Math.max(e.topLines.length, this.bottomLines.length) * 10, C = r(this.chart, c, [
			{
				x: c.x,
				y: c.y + T / 2 - w
			},
			{
				x: c.x + (c.x - p.x) / 2,
				y: c.y + T / 2 - w
			},
			{
				x: c.x + (c.x - p.x) / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.bottomLines.push(C), e.topLines.push(C), this.bottomStart = !0, e.topEnd = !0, S = c.x + (c.x - p.x) / 2;
		else if (n && n === "right" && b) w = Math.max(e.topLines.length, this.rightLines.length) * 10, C = r(this.chart, s, [
			{
				x: s.x + T / 2,
				y: s.y
			},
			{
				x: s.x + T / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.rightLines.push(C), e.topLines.push(C), this.rightStart = !0, e.topEnd = !0, S = s.x + T / 2;
		else if (n && n === "right" && x) w = Math.max(e.topLines.length, this.rightLines.length) * 10, C = r(this.chart, s, [{
			x: p.x,
			y: s.y - w
		}, {
			x: p.x,
			y: p.y - w
		}], t), this.rightLines.push(C), e.topLines.push(C), this.rightStart = !0, e.topEnd = !0, S = s.x + T / 2;
		else if (n && n === "bottom" && g && y) w = Math.max(e.topLines.length, this.bottomLines.length) * 10, C = r(this.chart, c, [
			{
				x: c.x,
				y: c.y + T / 2 - w
			},
			{
				x: s.x + T / 2,
				y: c.y + T / 2 - w
			},
			{
				x: s.x + T / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.bottomLines.push(C), e.topLines.push(C), this.bottomStart = !0, e.topEnd = !0, S = c.x + T / 2;
		else if (n === "left" && g && y) {
			var D = u.x - T / 2;
			h.x < u.x && (D = h.x - T / 2), w = Math.max(e.topLines.length, this.leftLines.length) * 10, C = r(this.chart, u, [
				{
					x: D,
					y: u.y - w
				},
				{
					x: D,
					y: p.y - T / 2 - w
				},
				{
					x: p.x,
					y: p.y - T / 2 - w
				},
				{
					x: p.x,
					y: p.y
				}
			], t), this.leftLines.push(C), e.topLines.push(C), this.leftStart = !0, e.topEnd = !0, S = u.x;
		} else n === "left" ? (w = Math.max(e.topLines.length, this.leftLines.length) * 10, C = r(this.chart, u, [
			{
				x: p.x + (u.x - p.x) / 2,
				y: u.y
			},
			{
				x: p.x + (u.x - p.x) / 2,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.leftLines.push(C), e.topLines.push(C), this.leftStart = !0, e.topEnd = !0, S = u.x) : n === "top" && (w = Math.max(e.topLines.length, this.topLines.length) * 10, C = r(this.chart, l, [
			{
				x: l.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y - T / 2 - w
			},
			{
				x: p.x,
				y: p.y
			}
		], t), this.topLines.push(C), e.topLines.push(C), this.topStart = !0, e.topEnd = !0, S = l.x);
		if (this.lineStyle[e.key] && C && C.attr(this.lineStyle[e.key]), C) {
			for (var O = 0, k = this.chart.lines.length; O < k; O++) for (var A = this.chart.lines[O].attr("path"), j = C.attr("path"), M = 0, N = A.length - 1; M < N; M++) {
				var P = [];
				P.push([
					"M",
					A[M][1],
					A[M][2]
				]), P.push([
					"L",
					A[M + 1][1],
					A[M + 1][2]
				]);
				for (var F = P[0][1], I = P[0][2], L = P[1][1], R = P[1][2], z = 0, B = j.length - 1; z < B; z++) {
					var V = [];
					V.push([
						"M",
						j[z][1],
						j[z][2]
					]), V.push([
						"L",
						j[z + 1][1],
						j[z + 1][2]
					]);
					var H = V[0][1], U = V[0][2], W = V[1][1], G = V[1][2], K = i(F, I, L, R, H, U, W, G);
					if (K.onLine1 && K.onLine2) {
						var q;
						U === G ? H > W ? (q = [
							"L",
							K.x + E * 2,
							U
						], j.splice(z + 1, 0, q), q = [
							"C",
							K.x + E * 2,
							U,
							K.x,
							U - E * 4,
							K.x - E * 2,
							U
						], j.splice(z + 2, 0, q), C.attr("path", j)) : (q = [
							"L",
							K.x - E * 2,
							U
						], j.splice(z + 1, 0, q), q = [
							"C",
							K.x - E * 2,
							U,
							K.x,
							U - E * 4,
							K.x + E * 2,
							U
						], j.splice(z + 2, 0, q), C.attr("path", j)) : U > G ? (q = [
							"L",
							H,
							K.y + E * 2
						], j.splice(z + 1, 0, q), q = [
							"C",
							H,
							K.y + E * 2,
							H + E * 4,
							K.y,
							H,
							K.y - E * 2
						], j.splice(z + 2, 0, q), C.attr("path", j)) : (q = [
							"L",
							H,
							K.y - E * 2
						], j.splice(z + 1, 0, q), q = [
							"C",
							H,
							K.y - E * 2,
							H + E * 4,
							K.y,
							H,
							K.y + E * 2
						], j.splice(z + 2, 0, q), C.attr("path", j)), z += 2;
					}
				}
			}
			this.chart.lines.push(C), (this.chart.minXFromSymbols === void 0 || this.chart.minXFromSymbols > u.x) && (this.chart.minXFromSymbols = u.x);
		}
		(!this.chart.maxXFromLine || this.chart.maxXFromLine && S > this.chart.maxXFromLine) && (this.chart.maxXFromLine = S);
	}, t.exports = o;
})), s = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits, s = a().drawPath;
	function c(e, t) {
		t ||= {}, n.call(this, e, t), this.yes_annotation = t.yes_annotation, this.no_annotation = t.no_annotation, this.textMargin = this.getAttr("text-margin"), this.yes_direction = t.direction_yes, this.no_direction = t.direction_no, !this.no_direction && this.yes_direction === "right" ? this.no_direction = "bottom" : !this.yes_direction && this.no_direction === "bottom" && (this.yes_direction = "right"), this.yes_direction = this.yes_direction || "bottom", this.no_direction = this.no_direction || "right", this.text.attr({ x: this.textMargin * 2 });
		var r = this.text.getBBox().width + 3 * this.textMargin;
		r += r / 2;
		var i = this.text.getBBox().height + 2 * this.textMargin;
		i += i / 2, i = Math.max(r * .5, i);
		var a = r / 4, o = i / 4;
		this.text.attr({ x: a + this.textMargin / 2 });
		var c = s(e, {
			x: a,
			y: o
		}, [
			{
				x: a - r / 4,
				y: o + i / 4
			},
			{
				x: a - r / 4 + r / 2,
				y: o + i / 4 + i / 2
			},
			{
				x: a - r / 4 + r,
				y: o + i / 4
			},
			{
				x: a - r / 4 + r / 2,
				y: o + i / 4 - i / 2
			},
			{
				x: a - r / 4,
				y: o + i / 4
			}
		]);
		c.attr({
			stroke: this.getAttr("element-color"),
			"stroke-width": this.getAttr("line-width"),
			fill: this.getAttr("fill")
		}), t.link && c.attr("href", t.link), t.target && c.attr("target", t.target), t.key && (c.node.id = t.key), c.node.setAttribute("class", this.getAttr("class")), this.text.attr({ y: c.getBBox().height / 2 }), this.group.push(c), c.insertBefore(this.text), this.symbol = c, this.initialize();
	}
	i(c, n), c.prototype.render = function() {
		var e = this;
		this.yes_direction && (this[this.yes_direction + "_symbol"] = this.yes_symbol), this.no_direction && (this[this.no_direction + "_symbol"] = this.no_symbol);
		var t = this.getAttr("line-length");
		if (this.bottom_symbol) {
			var n = this.getBottom();
			this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + t), this.bottom_symbol.setX(n.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, this.bottom_symbol.render());
		}
		if (this.right_symbol) {
			var r = this.getRight();
			this.right_symbol.isPositioned || (this.right_symbol.setY(r.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + t), (function n() {
				for (var r = !1, i, a = 0, o = e.chart.symbols.length; a < o; a++) if (i = e.chart.symbols[a], !e.params["align-next"] || e.params["align-next"] !== "no") {
					var s = Math.abs(i.getCenter().x - e.right_symbol.getCenter().x);
					if (i.getCenter().y > e.right_symbol.getCenter().y && s <= e.right_symbol.width / 2) {
						r = !0;
						break;
					}
				}
				if (r) {
					if (e.right_symbol.symbolType === "end") return;
					e.right_symbol.setX(i.getX() + i.width + t), n();
				}
			})(), this.right_symbol.isPositioned = !0, this.right_symbol.render());
		}
		if (this.left_symbol) {
			var i = this.getLeft();
			this.left_symbol.isPositioned || (this.left_symbol.setY(i.y - this.left_symbol.height / 2), this.left_symbol.shiftX(-(this.group.getBBox().x + this.width + t)), (function n() {
				for (var r = !1, i, a = 0, o = e.chart.symbols.length; a < o; a++) if (i = e.chart.symbols[a], !e.params["align-next"] || e.params["align-next"] !== "no") {
					var s = Math.abs(i.getCenter().x - e.left_symbol.getCenter().x);
					if (i.getCenter().y > e.left_symbol.getCenter().y && s <= e.left_symbol.width / 2) {
						r = !0;
						break;
					}
				}
				if (r) {
					if (e.left_symbol.symbolType === "end") return;
					e.left_symbol.setX(i.getX() + i.width + t), n();
				}
			})(), this.left_symbol.isPositioned = !0, this.left_symbol.render());
		}
	}, c.prototype.renderLines = function() {
		this.yes_symbol && this.drawLineTo(this.yes_symbol, this.yes_annotation ? this.yes_annotation : this.getAttr("yes-text"), this.yes_direction), this.no_symbol && this.drawLineTo(this.no_symbol, this.no_annotation ? this.no_annotation : this.getAttr("no-text"), this.no_direction);
	}, t.exports = c;
})), c = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits;
	function a(e, t) {
		var r = e.paper.rect(0, 0, 0, 0);
		t ||= {}, n.call(this, e, t, r), this.path1_annotation = t.path1_annotation || "", this.path2_annotation = t.path2_annotation || "", this.path3_annotation = t.path3_annotation || "", this.textMargin = this.getAttr("text-margin"), this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "top", this.params = t.params, t.direction_next === "path1" && !t[t.direction_next] && t.next && (t[t.direction_next] = t.next), t.direction_next === "path2" && !t[t.direction_next] && t.next && (t[t.direction_next] = t.next), t.direction_next === "path3" && !t[t.direction_next] && t.next && (t[t.direction_next] = t.next), t.path1 && t.direction_path1 && t.path2 && !t.direction_path2 && t.path3 && !t.direction_path3 ? t.direction_path1 === "right" ? (this.path2_direction = "bottom", this.path1_direction = "right", this.path3_direction = "top") : t.direction_path1 === "top" ? (this.path2_direction = "right", this.path1_direction = "top", this.path3_direction = "bottom") : t.direction_path1 === "left" ? (this.path2_direction = "right", this.path1_direction = "left", this.path3_direction = "bottom") : (this.path2_direction = "right", this.path1_direction = "bottom", this.path3_direction = "top") : t.path1 && !t.direction_path1 && t.path2 && t.direction_path2 && t.path3 && !t.direction_path3 ? t.direction_path2 === "right" ? (this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "top") : t.direction_path2 === "left" ? (this.path1_direction = "bottom", this.path2_direction = "left", this.path3_direction = "right") : t.direction_path2 === "top" ? (this.path1_direction = "bottom", this.path2_direction = "top", this.path3_direction = "right") : (this.path1_direction = "right", this.path2_direction = "bottom", this.path3_direction = "top") : t.path1 && !t.direction_path1 && t.path2 && !t.direction_path2 && t.path3 && t.direction_path3 ? t.direction_path3 === "right" ? (this.path1_direction = "bottom", this.path2_direction = "top", this.path3_direction = "right") : t.direction_path3 === "left" ? (this.path1_direction = "bottom", this.path2_direction = "right", this.path3_direction = "left") : t.direction_path3 === "bottom" ? (this.path1_direction = "top", this.path2_direction = "right", this.path3_direction = "bottom") : (this.path1_direction = "right", this.path2_direction = "bottom", this.path3_direction = "top") : (this.path1_direction = t.direction_path1, this.path2_direction = t.direction_path2, this.path3_direction = t.direction_path3), this.path1_direction = this.path1_direction || "bottom", this.path2_direction = this.path2_direction || "right", this.path3_direction = this.path3_direction || "top", this.initialize();
	}
	i(a, n), a.prototype.render = function() {
		this.path1_direction && (this[this.path1_direction + "_symbol"] = this.path1_symbol), this.path2_direction && (this[this.path2_direction + "_symbol"] = this.path2_symbol), this.path3_direction && (this[this.path3_direction + "_symbol"] = this.path3_symbol);
		var e = this.getAttr("line-length");
		if (this.bottom_symbol) {
			var t = this.getBottom();
			this.bottom_symbol.isPositioned || (this.bottom_symbol.shiftY(this.getY() + this.height + e), this.bottom_symbol.setX(t.x - this.bottom_symbol.width / 2), this.bottom_symbol.isPositioned = !0, this.bottom_symbol.render());
		}
		if (this.top_symbol) {
			var n = this.getTop();
			this.top_symbol.isPositioned || (this.top_symbol.shiftY(this.getY() - this.top_symbol.height - e), this.top_symbol.setX(n.x + this.top_symbol.width), this.top_symbol.isPositioned = !0, this.top_symbol.render());
		}
		var r = this;
		if (this.left_symbol) {
			var i = this.getLeft();
			this.left_symbol.isPositioned || (this.left_symbol.setY(i.y - this.left_symbol.height / 2), this.left_symbol.shiftX(-(this.group.getBBox().x + this.width + e)), (function t() {
				for (var n = !1, i, a = 0, o = r.chart.symbols.length; a < o; a++) if (i = r.chart.symbols[a], !r.params["align-next"] || r.params["align-next"] !== "no") {
					var s = Math.abs(i.getCenter().x - r.left_symbol.getCenter().x);
					if (i.getCenter().y > r.left_symbol.getCenter().y && s <= r.left_symbol.width / 2) {
						n = !0;
						break;
					}
				}
				if (n) {
					if (r.left_symbol.symbolType === "end") return;
					r.left_symbol.setX(i.getX() + i.width + e), t();
				}
			})(), this.left_symbol.isPositioned = !0, this.left_symbol.render());
		}
		if (this.right_symbol) {
			var a = this.getRight();
			this.right_symbol.isPositioned || (this.right_symbol.setY(a.y - this.right_symbol.height / 2), this.right_symbol.shiftX(this.group.getBBox().x + this.width + e), (function t() {
				for (var n = !1, i, a = 0, o = r.chart.symbols.length; a < o; a++) if (i = r.chart.symbols[a], !r.params["align-next"] || r.params["align-next"] !== "no") {
					var s = Math.abs(i.getCenter().x - r.right_symbol.getCenter().x);
					if (i.getCenter().y > r.right_symbol.getCenter().y && s <= r.right_symbol.width / 2) {
						n = !0;
						break;
					}
				}
				if (n) {
					if (r.right_symbol.symbolType === "end") return;
					r.right_symbol.setX(i.getX() + i.width + e), t();
				}
			})(), this.right_symbol.isPositioned = !0, this.right_symbol.render());
		}
	}, a.prototype.renderLines = function() {
		this.path1_symbol && this.drawLineTo(this.path1_symbol, this.path1_annotation, this.path1_direction), this.path2_symbol && this.drawLineTo(this.path2_symbol, this.path2_annotation, this.path2_direction), this.path3_symbol && this.drawLineTo(this.path3_symbol, this.path3_annotation, this.path3_direction);
	}, t.exports = a;
})), l = /* @__PURE__ */ e(((e, t) => {
	var a = n(), o = r().defaults, l = i(), u = s(), d = c();
	function f(e, t) {
		t ||= {}, this.paper = new a(e), this.options = o(t, l), this.symbols = [], this.lines = [], this.start = null;
	}
	f.prototype.handle = function(e) {
		this.symbols.indexOf(e) <= -1 && this.symbols.push(e);
		var t = this;
		return e instanceof u ? (e.yes = function(n) {
			return e.yes_symbol = n, e.no_symbol && (e.pathOk = !0), t.handle(n);
		}, e.no = function(n) {
			return e.no_symbol = n, e.yes_symbol && (e.pathOk = !0), t.handle(n);
		}) : e instanceof d ? (e.path1 = function(n) {
			return e.path1_symbol = n, e.path2_symbol && (e.pathOk = !0), t.handle(n);
		}, e.path2 = function(n) {
			return e.path2_symbol = n, e.path3_symbol && (e.pathOk = !0), t.handle(n);
		}, e.path3 = function(n) {
			return e.path3_symbol = n, e.path1_symbol && (e.pathOk = !0), t.handle(n);
		}) : e.then = function(n) {
			return e.next = n, e.pathOk = !0, t.handle(n);
		}, e;
	}, f.prototype.startWith = function(e) {
		return this.start = e, this.handle(e);
	}, f.prototype.render = function() {
		var e = 0, t = 0, n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c, l;
		for (n = 0, r = this.symbols.length; n < r; n++) c = this.symbols[n], c.width > e && (e = c.width), c.height > t && (t = c.height);
		for (n = 0, r = this.symbols.length; n < r; n++) c = this.symbols[n], c.shiftX(this.options.x + (e - c.width) / 2 + this.options["line-width"]), c.shiftY(this.options.y + (t - c.height) / 2 + this.options["line-width"]);
		for (this.start.render(), n = 0, r = this.symbols.length; n < r; n++) c = this.symbols[n], c.renderLines();
		i = this.maxXFromLine;
		var u, d;
		for (n = 0, r = this.symbols.length; n < r; n++) {
			c = this.symbols[n];
			var f = c.getX();
			u = f + c.width, d = c.getY() + c.height, f < o && (o = f), u > i && (i = u), d > a && (a = d);
		}
		for (n = 0, r = this.lines.length; n < r; n++) {
			l = this.lines[n].getBBox(), u = l.x, d = l.y;
			var p = l.x2, m = l.y2;
			u < o && (o = u), d < s && (s = d), p > i && (i = p), m > a && (a = m);
		}
		var h = this.options.scale, g = this.options["line-width"];
		this.minXFromSymbols < o && (o = this.minXFromSymbols), o < 0 && (o -= g), s < 0 && (s -= g);
		var _ = i + g - o, v = a + g - s;
		this.paper.setSize(_ * h, v * h), this.paper.setViewBox(o, s, _, v, !0);
	}, f.prototype.clean = function() {
		if (this.paper) {
			var e = this.paper.canvas;
			e.parentNode && e.parentNode.removeChild(e);
		}
	}, t.exports = f;
})), u = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits;
	function a(e, t) {
		var r = e.paper.rect(0, 0, 0, 0, 20);
		t ||= {}, t.text = t.text || "Start", n.call(this, e, t, r);
	}
	i(a, n), t.exports = a;
})), d = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits;
	function a(e, t) {
		var r = e.paper.rect(0, 0, 0, 0, 20);
		t ||= {}, t.text = t.text || "End", n.call(this, e, t, r);
	}
	i(a, n), t.exports = a;
})), f = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits;
	function a(e, t) {
		var r = e.paper.rect(0, 0, 0, 0);
		t ||= {}, n.call(this, e, t, r);
	}
	i(a, n), t.exports = a;
})), p = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits, s = a().drawPath;
	function c(e, t) {
		t ||= {}, n.call(this, e, t), this.textMargin = this.getAttr("text-margin"), this.text.attr({ x: this.textMargin * 3 });
		var r = this.text.getBBox().width + 4 * this.textMargin, i = this.text.getBBox().height + 2 * this.textMargin, a = this.textMargin, o = i / 2, c = s(e, {
			x: a,
			y: o
		}, [
			{
				x: a - this.textMargin,
				y: i
			},
			{
				x: a - this.textMargin + r,
				y: i
			},
			{
				x: a - this.textMargin + r + 2 * this.textMargin,
				y: 0
			},
			{
				x: a - this.textMargin + 2 * this.textMargin,
				y: 0
			},
			{
				x: a,
				y: o
			}
		]);
		c.attr({
			stroke: this.getAttr("element-color"),
			"stroke-width": this.getAttr("line-width"),
			fill: this.getAttr("fill")
		}), t.link && c.attr("href", t.link), t.target && c.attr("target", t.target), t.key && (c.node.id = t.key), c.node.setAttribute("class", this.getAttr("class")), this.text.attr({ y: c.getBBox().height / 2 }), this.group.push(c), c.insertBefore(this.text), this.symbol = c, this.initialize();
	}
	i(c, n), c.prototype.getLeft = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.textMargin,
			y: e
		};
	}, c.prototype.getRight = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.group.getBBox().width - this.textMargin,
			y: e
		};
	}, t.exports = c;
})), m = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits, s = a().drawPath;
	function c(e, t) {
		t ||= {}, n.call(this, e, t), this.textMargin = this.getAttr("text-margin"), this.text.attr({ x: this.textMargin * 3 });
		var r = this.text.getBBox().width + 4 * this.textMargin, i = this.text.getBBox().height + 2 * this.textMargin, a = this.textMargin, o = i / 2, c = s(e, {
			x: a,
			y: o
		}, [
			{
				x: a - this.textMargin + 2 * this.textMargin,
				y: i
			},
			{
				x: a - this.textMargin + r,
				y: i
			},
			{
				x: a - this.textMargin + r + 2 * this.textMargin,
				y: 0
			},
			{
				x: a - this.textMargin,
				y: 0
			},
			{
				x: a,
				y: o
			}
		]);
		c.attr({
			stroke: this.getAttr("element-color"),
			"stroke-width": this.getAttr("line-width"),
			fill: this.getAttr("fill")
		}), t.link && c.attr("href", t.link), t.target && c.attr("target", t.target), t.key && (c.node.id = t.key), c.node.setAttribute("class", this.getAttr("class")), this.text.attr({ y: c.getBBox().height / 2 }), this.group.push(c), c.insertBefore(this.text), this.symbol = c, this.initialize();
	}
	i(c, n), c.prototype.getLeft = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.textMargin,
			y: e
		};
	}, c.prototype.getRight = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.group.getBBox().width - this.textMargin,
			y: e
		};
	}, t.exports = c;
})), h = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits, s = a().drawPath;
	function c(e, t) {
		t ||= {}, n.call(this, e, t), this.textMargin = this.getAttr("text-margin"), this.text.attr({ x: this.textMargin * 3 });
		var r = this.text.getBBox().width + 4 * this.textMargin, i = this.text.getBBox().height + 2 * this.textMargin, a = this.textMargin, o = i / 2, c = s(e, {
			x: a,
			y: o
		}, [
			{
				x: a - this.textMargin,
				y: i
			},
			{
				x: a - this.textMargin + r + 2 * this.textMargin,
				y: i
			},
			{
				x: a - this.textMargin + r,
				y: 0
			},
			{
				x: a - this.textMargin + 2 * this.textMargin,
				y: 0
			},
			{
				x: a,
				y: o
			}
		]);
		c.attr({
			stroke: this.getAttr("element-color"),
			"stroke-width": this.getAttr("line-width"),
			fill: this.getAttr("fill")
		}), t.link && c.attr("href", t.link), t.target && c.attr("target", t.target), t.key && (c.node.id = t.key), c.node.setAttribute("class", this.getAttr("class")), this.text.attr({ y: c.getBBox().height / 2 }), this.group.push(c), c.insertBefore(this.text), this.symbol = c, this.initialize();
	}
	i(c, n), c.prototype.getLeft = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.textMargin,
			y: e
		};
	}, c.prototype.getRight = function() {
		var e = this.getY() + this.group.getBBox().height / 2;
		return {
			x: this.getX() + this.group.getBBox().width - this.textMargin,
			y: e
		};
	}, t.exports = c;
})), g = /* @__PURE__ */ e(((e, t) => {
	var n = o(), i = r().inherits;
	function a(e, t) {
		var r = e.paper.rect(0, 0, 0, 0);
		t ||= {}, n.call(this, e, t, r), r.attr({ width: this.text.getBBox().width + 4 * this.getAttr("text-margin") }), this.text.attr({ x: 2 * this.getAttr("text-margin") });
		var i = e.paper.rect(0, 0, 0, 0);
		i.attr({
			x: this.getAttr("text-margin"),
			stroke: this.getAttr("element-color"),
			"stroke-width": this.getAttr("line-width"),
			width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
			height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
			fill: this.getAttr("fill")
		}), t.key && (i.node.id = t.key + "i");
		var a = this.getAttr("font"), o = this.getAttr("font-family"), s = this.getAttr("font-weight");
		a && i.attr({ font: a }), o && i.attr({ "font-family": o }), s && i.attr({ "font-weight": s }), t.link && i.attr("href", t.link), t.target && i.attr("target", t.target), this.group.push(i), i.insertBefore(this.text), this.initialize();
	}
	i(a, n), t.exports = a;
})), _ = /* @__PURE__ */ e(((e, t) => {
	var n = l(), r = u(), i = d(), a = f(), o = p(), _ = m(), v = h(), y = g(), b = s(), x = c();
	function S(e) {
		e ||= "", e = e.trim();
		for (var t = {
			symbols: {},
			start: null,
			drawSVG: function(e, t) {
				var s = this;
				this.diagram && this.diagram.clean();
				var c = new n(e, t);
				this.diagram = c;
				var l = {};
				function u(e) {
					if (l[e.key]) return l[e.key];
					switch (e.symbolType) {
						case "start":
							l[e.key] = new r(c, e);
							break;
						case "end":
							l[e.key] = new i(c, e);
							break;
						case "operation":
							l[e.key] = new a(c, e);
							break;
						case "inputoutput":
							l[e.key] = new o(c, e);
							break;
						case "input":
							l[e.key] = new _(c, e);
							break;
						case "output":
							l[e.key] = new v(c, e);
							break;
						case "subroutine":
							l[e.key] = new y(c, e);
							break;
						case "condition":
							l[e.key] = new b(c, e);
							break;
						case "parallel":
							l[e.key] = new x(c, e);
							break;
						default: return /* @__PURE__ */ Error("Wrong symbol type!");
					}
					return l[e.key];
				}
				(function e(t, n, r) {
					var i = u(t);
					return s.start === t ? c.startWith(i) : n && r && !n.pathOk && (n instanceof b ? (r.yes === t && n.yes(i), r.no === t && n.no(i)) : n instanceof x ? (r.path1 === t && n.path1(i), r.path2 === t && n.path2(i), r.path3 === t && n.path3(i)) : n.then(i)), i.pathOk || (i instanceof b ? (t.yes && e(t.yes, i, t), t.no && e(t.no, i, t)) : i instanceof x ? (t.path1 && e(t.path1, i, t), t.path2 && e(t.path2, i, t), t.path3 && e(t.path3, i, t)) : t.next && e(t.next, i, t)), i;
				})(this.start), c.render();
			},
			clean: function() {
				this.diagram.clean();
			},
			options: function() {
				return this.diagram.options;
			}
		}, s = [], c = 0, l = 1, u = e.length; l < u; l++) if (e[l] === "\n" && e[l - 1] !== "\\") {
			var d = e.substring(c, l);
			c = l + 1, s.push(d.replace(/\\\n/g, "\n"));
		}
		c < e.length && s.push(e.substr(c));
		for (var f = 1, p = s.length; f < p;) {
			var m = s[f];
			m.indexOf("->") < 0 && m.indexOf("=>") < 0 && m.indexOf("@>") < 0 ? (s[f - 1] += "\n" + m, s.splice(f, 1), p--) : f++;
		}
		function h(e) {
			var t = e.indexOf("(") + 1, n = e.indexOf(")");
			return t >= 0 && n >= 0 ? e.substring(t, n) : "{}";
		}
		function g(e) {
			var t = e.indexOf("(") + 1, n = e.indexOf(")");
			return t >= 0 && n >= 0 ? e.substring(t, n) : "";
		}
		function S(e) {
			var n = e.indexOf("(") + 1, r = e.indexOf(")");
			return n >= 0 && r >= 0 ? t.symbols[e.substring(0, n - 1)] : t.symbols[e];
		}
		function C(e) {
			var t = "next", n = e.indexOf("(") + 1, r = e.indexOf(")");
			return n >= 0 && r >= 0 && (t = B.substring(n, r), t.indexOf(",") < 0 && t !== "yes" && t !== "no" && (t = "next, " + t)), t;
		}
		function w(e) {
			var t = e.indexOf("(") + 1, n = e.indexOf(")"), r = e.substring(t, n);
			r.indexOf(",") > 0 && (r = r.substring(0, r.indexOf(",")));
			var i = r.split("@");
			if (i.length > 1) return t >= 0 && n >= 0 ? i[1] : "";
		}
		for (; s.length > 0;) {
			var T = s.splice(0, 1)[0].trim();
			if (T.indexOf("=>") >= 0) {
				var E = T.split("=>"), D = {
					key: E[0].replace(/\(.*\)/, ""),
					symbolType: E[1],
					text: null,
					link: null,
					target: null,
					flowstate: null,
					function: null,
					lineStyle: {},
					params: {}
				}, O = E[0].match(/\((.*)\)/);
				if (O && O.length > 1) for (var k = O[1].split(","), A = 0; A < k.length; A++) {
					var j = k[A].split("=");
					j.length == 2 && (D.params[j[0]] = j[1]);
				}
				var M;
				if (D.symbolType.indexOf(": ") >= 0 && (M = D.symbolType.split(": "), D.symbolType = M.shift(), D.text = M.join(": ")), D.text && D.text.indexOf(":$") >= 0 ? (M = D.text.split(":$"), D.text = M.shift(), D.function = M.join(":$")) : D.symbolType.indexOf(":$") >= 0 ? (M = D.symbolType.split(":$"), D.symbolType = M.shift(), D.function = M.join(":$")) : D.text && D.text.indexOf(":>") >= 0 ? (M = D.text.split(":>"), D.text = M.shift(), D.link = M.join(":>")) : D.symbolType.indexOf(":>") >= 0 && (M = D.symbolType.split(":>"), D.symbolType = M.shift(), D.link = M.join(":>")), D.symbolType.indexOf("\n") >= 0 && (D.symbolType = D.symbolType.split("\n")[0]), D.link) {
					var N = D.link.indexOf("[") + 1, P = D.link.indexOf("]");
					N >= 0 && P >= 0 && (D.target = D.link.substring(N, P), D.link = D.link.substring(0, N - 1));
				}
				if (D.text && D.text.indexOf("|") >= 0) {
					var F = D.text.split("|");
					D.flowstate = F.pop().trim(), D.text = F.join("|");
				}
				t.symbols[D.key] = D;
			} else if (T.indexOf("->") >= 0) {
				var I = w(T);
				I && (T = T.replace("@" + I, ""));
				for (var L = T.split("->"), R = 0, z = L.length; R < z; R++) {
					var B = L[R], V = g(B);
					(V === "true" || V === "false") && (B = B.replace("true", "yes"), B = B.replace("false", "no"));
					var H = C(B), U = S(B), W = null;
					if (H.indexOf(",") >= 0) {
						var G = H.split(",");
						H = G[0], W = G[1].trim();
					}
					if (I &&= (U.symbolType === "condition" ? H === "yes" || H === "true" ? U.yes_annotation = I : U.no_annotation = I : U.symbolType === "parallel" && (H === "path1" ? U.path1_annotation = I : H === "path2" ? U.path2_annotation = I : H === "path3" && (U.path3_annotation = I)), null), t.start ||= U, R + 1 < z) {
						var K = L[R + 1];
						U[H] = S(K), U["direction_" + H] = W, W = null;
					}
				}
			} else if (T.indexOf("@>") >= 0) {
				for (var q = T.split("@>"), J = 0, ee = q.length; J < ee; J++) if (J + 1 !== ee) {
					var te = S(q[J]), ne = S(q[J + 1]);
					te.lineStyle[ne.key] = JSON.parse(h(q[J + 1]));
				}
			}
		}
		return t;
	}
	t.exports = S;
})), v = /* @__PURE__ */ e((() => {
	if (typeof jQuery < "u") {
		var e = _();
		(function(t) {
			function n(e, t) {
				return e == t || Array.isArray(t) && (t.includes(e) || t.includes(Number(e)));
			}
			var r = {
				init: function(n) {
					return this.each(function() {
						var r = t(this);
						this.chart = e(r.text()), r.html(""), this.chart.drawSVG(this, n);
					});
				},
				setFlowStateByParam: function(e, t, r) {
					return this.each(function() {
						var i = this.chart, a = [
							"next",
							"yes",
							"no",
							"path1",
							"path2",
							"path3"
						];
						for (var o in i.symbols) if (i.symbols.hasOwnProperty(o)) {
							var s = i.symbols[o], c = s.params[e];
							if (n(c, t)) {
								s.flowstate = r;
								for (var l = 0; l < a.length; l++) {
									var u = a[l];
									s[u] && s[u].params && s[u].params[e] && n(s[u].params[e], t) && (s.lineStyle[s[u].key] = { stroke: i.options().flowstate[r].fill });
								}
							}
						}
						i.clean(), i.drawSVG(this);
					});
				},
				clearFlowState: function() {
					return this.each(function() {
						var e = this.chart;
						for (var t in e.symbols) if (e.symbols.hasOwnProperty(t)) {
							var n = e.symbols[t];
							n.flowstate = "";
						}
						e.clean(), e.drawSVG(this);
					});
				}
			};
			t.fn.flowChart = function(e) {
				if (r[e]) return r[e].apply(this, Array.prototype.slice.call(arguments, 1));
				if (typeof e == "object" || !e) return r.init.apply(this, arguments);
				t.error("Method " + e + " does not exist on jQuery.flowChart");
			};
		})(jQuery);
	}
})), y = /* @__PURE__ */ e(((e, n) => {
	t();
	var r = _();
	v();
	var i = { parse: r };
	typeof window < "u" && (window.flowchart = i), n.exports = i;
}));
export default y();

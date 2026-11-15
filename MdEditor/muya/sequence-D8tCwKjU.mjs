import { i as e, n as t, t as n } from "./rolldown-runtime-CwxnZyOB.mjs";
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_setup.js
var r = "1.13.8", i = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, a = Array.prototype, o = Object.prototype, s = typeof Symbol < "u" ? Symbol.prototype : null, c = a.push, l = a.slice, u = o.toString, d = o.hasOwnProperty, f = typeof ArrayBuffer < "u", p = typeof DataView < "u", m = Array.isArray, h = Object.keys, _ = Object.create, v = f && ArrayBuffer.isView, y = isNaN, b = isFinite, x = !{ toString: null }.propertyIsEnumerable("toString"), S = [
	"valueOf",
	"isPrototypeOf",
	"toString",
	"propertyIsEnumerable",
	"hasOwnProperty",
	"toLocaleString"
], C = 2 ** 53 - 1;
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/restArguments.js
function w(e, t) {
	return t = t == null ? e.length - 1 : +t, function() {
		for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; i < n; i++) r[i] = arguments[i + t];
		switch (t) {
			case 0: return e.call(this, r);
			case 1: return e.call(this, arguments[0], r);
			case 2: return e.call(this, arguments[0], arguments[1], r);
		}
		var a = Array(t + 1);
		for (i = 0; i < t; i++) a[i] = arguments[i];
		return a[t] = r, e.apply(this, a);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isObject.js
function T(e) {
	var t = typeof e;
	return t === "function" || t === "object" && !!e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isNull.js
function E(e) {
	return e === null;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isUndefined.js
function D(e) {
	return e === void 0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isBoolean.js
function O(e) {
	return e === !0 || e === !1 || u.call(e) === "[object Boolean]";
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isElement.js
function k(e) {
	return !!(e && e.nodeType === 1);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_tagTester.js
function A(e) {
	var t = "[object " + e + "]";
	return function(e) {
		return u.call(e) === t;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isString.js
var j = A("String"), ee = A("Number"), M = A("Date"), te = A("RegExp"), N = A("Error"), ne = A("Symbol"), re = A("ArrayBuffer"), P = A("Function"), F = i.document && i.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof F != "function" && (P = function(e) {
	return typeof e == "function" || !1;
});
var I = P, L = A("Object"), R = p && (!/\[native code\]/.test(String(DataView)) || L(/* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8)))), ie = typeof Map < "u" && L(/* @__PURE__ */ new Map()), ae = A("DataView");
function z(e) {
	return e != null && I(e.getInt8) && re(e.buffer);
}
var B = R ? z : ae, V = m || A("Array");
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_has.js
function H(e, t) {
	return e != null && d.call(e, t);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isArguments.js
var U = A("Arguments");
(function() {
	U(arguments) || (U = function(e) {
		return H(e, "callee");
	});
})();
var W = U;
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isFinite.js
function G(e) {
	return !ne(e) && b(e) && !isNaN(parseFloat(e));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isNaN.js
function K(e) {
	return ee(e) && y(e);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/constant.js
function oe(e) {
	return function() {
		return e;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createSizePropertyCheck.js
function se(e) {
	return function(t) {
		var n = e(t);
		return typeof n == "number" && n >= 0 && n <= C;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_shallowProperty.js
function ce(e) {
	return function(t) {
		return t?.[e];
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_getByteLength.js
var le = ce("byteLength"), ue = se(le), de = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function fe(e) {
	return v ? v(e) && !B(e) : ue(e) && de.test(u.call(e));
}
var pe = f ? fe : oe(!1), q = ce("length");
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_collectNonEnumProps.js
function me(e) {
	for (var t = {}, n = e.length, r = 0; r < n; ++r) t[e[r]] = !0;
	return {
		contains: function(e) {
			return t[e] === !0;
		},
		push: function(n) {
			return t[n] = !0, e.push(n);
		}
	};
}
function he(e, t) {
	t = me(t);
	var n = S.length, r = e.constructor, i = I(r) && r.prototype || o, a = "constructor";
	for (H(e, a) && !t.contains(a) && t.push(a); n--;) a = S[n], a in e && e[a] !== i[a] && !t.contains(a) && t.push(a);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/keys.js
function J(e) {
	if (!T(e)) return [];
	if (h) return h(e);
	var t = [];
	for (var n in e) H(e, n) && t.push(n);
	return x && he(e, t), t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isEmpty.js
function ge(e) {
	if (e == null) return !0;
	var t = q(e);
	return typeof t == "number" && (V(e) || j(e) || W(e)) ? t === 0 : q(J(e)) === 0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isMatch.js
function _e(e, t) {
	var n = J(t), r = n.length;
	if (e == null) return !r;
	for (var i = Object(e), a = 0; a < r; a++) {
		var o = n[a];
		if (t[o] !== i[o] || !(o in i)) return !1;
	}
	return !0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/underscore.js
function Y(e) {
	if (e instanceof Y) return e;
	if (!(this instanceof Y)) return new Y(e);
	this._wrapped = e;
}
Y.VERSION = r, Y.prototype.value = function() {
	return this._wrapped;
}, Y.prototype.valueOf = Y.prototype.toJSON = Y.prototype.value, Y.prototype.toString = function() {
	return String(this._wrapped);
};
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_toBufferView.js
function ve(e) {
	return new Uint8Array(e.buffer || e, e.byteOffset || 0, le(e));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/isEqual.js
var ye = "[object DataView]";
function be(e, t) {
	for (var n = [{
		a: e,
		b: t
	}], r = [], i = []; n.length;) {
		var a = n.pop();
		if (a === !0) r.pop(), i.pop();
		else {
			if (e = a.a, t = a.b, e === t) {
				if (e !== 0 || 1 / e == 1 / t) continue;
				return !1;
			}
			if (e == null || t == null) return !1;
			if (e !== e) {
				if (t !== t) continue;
				return !1;
			}
			var o = typeof e;
			if (o !== "function" && o !== "object" && typeof t != "object") return !1;
			e instanceof Y && (e = e._wrapped), t instanceof Y && (t = t._wrapped);
			var c = u.call(e);
			if (c !== u.call(t)) return !1;
			if (R && c == "[object Object]" && B(e)) {
				if (!B(t)) return !1;
				c = ye;
			}
			switch (c) {
				case "[object RegExp]":
				case "[object String]":
					if ("" + e == "" + t) continue;
					return !1;
				case "[object Number]":
					n.push({
						a: +e,
						b: +t
					});
					continue;
				case "[object Date]":
				case "[object Boolean]":
					if (+e == +t) continue;
					return !1;
				case "[object Symbol]":
					if (s.valueOf.call(e) === s.valueOf.call(t)) continue;
					return !1;
				case "[object ArrayBuffer]":
				case ye:
					n.push({
						a: ve(e),
						b: ve(t)
					});
					continue;
			}
			var l = c === "[object Array]";
			if (!l && pe(e)) {
				if (le(e) !== le(t)) return !1;
				if (e.buffer === t.buffer && e.byteOffset === t.byteOffset) continue;
				l = !0;
			}
			if (!l) {
				if (typeof e != "object" || typeof t != "object") return !1;
				var d = e.constructor, f = t.constructor;
				if (d !== f && !(I(d) && d instanceof d && I(f) && f instanceof f) && "constructor" in e && "constructor" in t) return !1;
			}
			for (var p = r.length; p--;) if (r[p] === e) {
				if (i[p] === t) break;
				return !1;
			}
			if (!(p >= 0)) {
				if (r.push(e), i.push(t), n.push(!0), l) {
					if (p = e.length, p !== t.length) return !1;
					for (; p--;) n.push({
						a: e[p],
						b: t[p]
					});
				} else {
					var m = J(e), h;
					if (p = m.length, J(t).length !== p) return !1;
					for (; p--;) {
						if (h = m[p], !H(t, h)) return !1;
						n.push({
							a: e[h],
							b: t[h]
						});
					}
				}
			}
		}
	}
	return !0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/allKeys.js
function xe(e) {
	if (!T(e)) return [];
	var t = [];
	for (var n in e) t.push(n);
	return x && he(e, t), t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_methodFingerprint.js
function Se(e) {
	var t = q(e);
	return function(n) {
		if (n == null || q(xe(n))) return !1;
		for (var r = 0; r < t; r++) if (!I(n[e[r]])) return !1;
		return e !== Oe || !I(n[Ce]);
	};
}
var Ce = "forEach", we = "has", Te = ["clear", "delete"], Ee = [
	"get",
	we,
	"set"
], De = Te.concat(Ce, Ee), Oe = Te.concat(Ee), ke = ["add"].concat(Te, Ce, we), Ae = ie ? Se(De) : A("Map"), je = ie ? Se(Oe) : A("WeakMap"), Me = ie ? Se(ke) : A("Set"), Ne = A("WeakSet");
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/values.js
function Pe(e) {
	for (var t = J(e), n = t.length, r = Array(n), i = 0; i < n; i++) r[i] = e[t[i]];
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/pairs.js
function Fe(e) {
	for (var t = J(e), n = t.length, r = Array(n), i = 0; i < n; i++) r[i] = [t[i], e[t[i]]];
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/invert.js
function Ie(e) {
	for (var t = {}, n = J(e), r = 0, i = n.length; r < i; r++) t[e[n[r]]] = n[r];
	return t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/functions.js
function Le(e) {
	var t = [];
	for (var n in e) I(e[n]) && t.push(n);
	return t.sort();
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createAssigner.js
function Re(e, t) {
	return function(n) {
		var r = arguments.length;
		if (t && (n = Object(n)), r < 2 || n == null) return n;
		for (var i = 1; i < r; i++) for (var a = arguments[i], o = e(a), s = o.length, c = 0; c < s; c++) {
			var l = o[c];
			t && n[l] !== void 0 || (n[l] = a[l]);
		}
		return n;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/extend.js
var ze = Re(xe), Be = Re(J), Ve = Re(xe, !0);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_baseCreate.js
function He() {
	return function() {};
}
function Ue(e) {
	if (!T(e)) return {};
	if (_) return _(e);
	var t = He();
	t.prototype = e;
	var n = new t();
	return t.prototype = null, n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/create.js
function We(e, t) {
	var n = Ue(e);
	return t && Be(n, t), n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/clone.js
function Ge(e) {
	return T(e) ? V(e) ? e.slice() : ze({}, e) : e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/tap.js
function Ke(e, t) {
	return t(e), e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/toPath.js
function qe(e) {
	return V(e) ? e : [e];
}
Y.toPath = qe;
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_toPath.js
function Je(e) {
	return Y.toPath(e);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_deepGet.js
function Ye(e, t) {
	for (var n = t.length, r = 0; r < n; r++) {
		if (e == null) return;
		e = e[t[r]];
	}
	return n ? e : void 0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/get.js
function Xe(e, t, n) {
	var r = Ye(e, Je(t));
	return D(r) ? n : r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/has.js
function Ze(e, t) {
	t = Je(t);
	for (var n = t.length, r = 0; r < n; r++) {
		var i = t[r];
		if (!H(e, i)) return !1;
		e = e[i];
	}
	return !!n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/identity.js
function Qe(e) {
	return e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/matcher.js
function $e(e) {
	return e = Be({}, e), function(t) {
		return _e(t, e);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/property.js
function et(e) {
	return e = Je(e), function(t) {
		return Ye(t, e);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_optimizeCb.js
function tt(e, t, n) {
	if (t === void 0) return e;
	switch (n ?? 3) {
		case 1: return function(n) {
			return e.call(t, n);
		};
		case 3: return function(n, r, i) {
			return e.call(t, n, r, i);
		};
		case 4: return function(n, r, i, a) {
			return e.call(t, n, r, i, a);
		};
	}
	return function() {
		return e.apply(t, arguments);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_baseIteratee.js
function nt(e, t, n) {
	return e == null ? Qe : I(e) ? tt(e, t, n) : T(e) && !V(e) ? $e(e) : et(e);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/iteratee.js
function rt(e, t) {
	return nt(e, t, Infinity);
}
Y.iteratee = rt;
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_cb.js
function X(e, t, n) {
	return Y.iteratee === rt ? nt(e, t, n) : Y.iteratee(e, t);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/mapObject.js
function it(e, t, n) {
	t = X(t, n);
	for (var r = J(e), i = r.length, a = {}, o = 0; o < i; o++) {
		var s = r[o];
		a[s] = t(e[s], s, e);
	}
	return a;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/noop.js
function at() {}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/propertyOf.js
function ot(e) {
	return e == null ? at : function(t) {
		return Xe(e, t);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/times.js
function st(e, t, n) {
	var r = Array(Math.max(0, e));
	t = tt(t, n, 1);
	for (var i = 0; i < e; i++) r[i] = t(i);
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/random.js
function ct(e, t) {
	return t ?? (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/now.js
var lt = Date.now || function() {
	return (/* @__PURE__ */ new Date()).getTime();
};
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createEscaper.js
function ut(e) {
	var t = function(t) {
		return e[t];
	}, n = "(?:" + J(e).join("|") + ")", r = RegExp(n), i = RegExp(n, "g");
	return function(e) {
		return e = e == null ? "" : "" + e, r.test(e) ? e.replace(i, t) : e;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_escapeMap.js
var dt = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#x27;",
	"`": "&#x60;"
}, ft = ut(dt), pt = ut(Ie(dt)), mt = Y.templateSettings = {
	evaluate: /<%([\s\S]+?)%>/g,
	interpolate: /<%=([\s\S]+?)%>/g,
	escape: /<%-([\s\S]+?)%>/g
}, ht = /(.)^/, gt = {
	"'": "'",
	"\\": "\\",
	"\r": "r",
	"\n": "n",
	"\u2028": "u2028",
	"\u2029": "u2029"
}, _t = /\\|'|\r|\n|\u2028|\u2029/g;
function vt(e) {
	return "\\" + gt[e];
}
var yt = /^\s*(\w|\$)+\s*$/;
function bt(e, t, n) {
	!t && n && (t = n), t = Ve({}, t, Y.templateSettings);
	var r = RegExp([
		(t.escape || ht).source,
		(t.interpolate || ht).source,
		(t.evaluate || ht).source
	].join("|") + "|$", "g"), i = 0, a = "__p+='";
	e.replace(r, function(t, n, r, o, s) {
		return a += e.slice(i, s).replace(_t, vt), i = s + t.length, n ? a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : o && (a += "';\n" + o + "\n__p+='"), t;
	}), a += "';\n";
	var o = t.variable;
	if (o) {
		if (!yt.test(o)) throw Error("variable is not a bare identifier: " + o);
	} else a = "with(obj||{}){\n" + a + "}\n", o = "obj";
	a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
	var s;
	try {
		s = Function(o, "_", a);
	} catch (e) {
		throw e.source = a, e;
	}
	var c = function(e) {
		return s.call(this, e, Y);
	};
	return c.source = "function(" + o + "){\n" + a + "}", c;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/result.js
function xt(e, t, n) {
	t = Je(t);
	var r = t.length;
	if (!r) return I(n) ? n.call(e) : n;
	for (var i = 0; i < r; i++) {
		var a = e?.[t[i]];
		a === void 0 && (a = n, i = r), e = I(a) ? a.call(e) : a;
	}
	return e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/uniqueId.js
var St = 0;
function Ct(e) {
	var t = ++St + "";
	return e ? e + t : t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/chain.js
function wt(e) {
	var t = Y(e);
	return t._chain = !0, t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_executeBound.js
function Tt(e, t, n, r, i) {
	if (!(r instanceof t)) return e.apply(n, i);
	var a = Ue(e.prototype), o = e.apply(a, i);
	return T(o) ? o : a;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/partial.js
var Et = w(function(e, t) {
	var n = Et.placeholder, r = function() {
		for (var i = 0, a = t.length, o = Array(a), s = 0; s < a; s++) o[s] = t[s] === n ? arguments[i++] : t[s];
		for (; i < arguments.length;) o.push(arguments[i++]);
		return Tt(e, r, this, this, o);
	};
	return r;
});
Et.placeholder = Y;
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/bind.js
var Dt = w(function(e, t, n) {
	if (!I(e)) throw TypeError("Bind must be called on a function");
	var r = w(function(i) {
		return Tt(e, r, t, this, n.concat(i));
	});
	return r;
}), Z = se(q);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_flatten.js
function Ot(e, t, n) {
	!t && t !== 0 && (t = Infinity);
	for (var r = [], i = 0, a = 0, o = q(e) || 0, s = [];;) if (a >= o) {
		if (!s.length) break;
		var c = s.pop();
		a = c.i, e = c.v, o = q(e);
	} else {
		var l = e[a++];
		s.length >= t ? r[i++] = l : Z(l) && (V(l) || W(l)) ? (s.push({
			i: a,
			v: e
		}), a = 0, e = l, o = q(e)) : n || (r[i++] = l);
	}
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/bindAll.js
var kt = w(function(e, t) {
	t = Ot(t, !1, !1);
	var n = t.length;
	if (n < 1) throw Error("bindAll must be passed function names");
	for (; n--;) {
		var r = t[n];
		e[r] = Dt(e[r], e);
	}
	return e;
});
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/memoize.js
function At(e, t) {
	var n = function(r) {
		var i = n.cache, a = "" + (t ? t.apply(this, arguments) : r);
		return H(i, a) || (i[a] = e.apply(this, arguments)), i[a];
	};
	return n.cache = {}, n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/delay.js
var jt = w(function(e, t, n) {
	return setTimeout(function() {
		return e.apply(null, n);
	}, t);
}), Mt = Et(jt, Y, 1);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/throttle.js
function Nt(e, t, n) {
	var r, i, a, o, s = 0;
	n ||= {};
	var c = function() {
		s = n.leading === !1 ? 0 : lt(), r = null, o = e.apply(i, a), r || (i = a = null);
	}, l = function() {
		var l = lt();
		!s && n.leading === !1 && (s = l);
		var u = t - (l - s);
		return i = this, a = arguments, u <= 0 || u > t ? (r &&= (clearTimeout(r), null), s = l, o = e.apply(i, a), r || (i = a = null)) : !r && n.trailing !== !1 && (r = setTimeout(c, u)), o;
	};
	return l.cancel = function() {
		clearTimeout(r), s = 0, r = i = a = null;
	}, l;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/debounce.js
function Pt(e, t, n) {
	var r, i, a, o, s, c = function() {
		var l = lt() - i;
		t > l ? r = setTimeout(c, t - l) : (r = null, n || (o = e.apply(s, a)), r || (a = s = null));
	}, l = w(function(l) {
		return s = this, a = l, i = lt(), r || (r = setTimeout(c, t), n && (o = e.apply(s, a))), o;
	});
	return l.cancel = function() {
		clearTimeout(r), r = a = s = null;
	}, l;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/wrap.js
function Ft(e, t) {
	return Et(t, e);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/negate.js
function It(e) {
	return function() {
		return !e.apply(this, arguments);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/compose.js
function Lt() {
	var e = arguments, t = e.length - 1;
	return function() {
		for (var n = t, r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
		return r;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/after.js
function Rt(e, t) {
	return function() {
		if (--e < 1) return t.apply(this, arguments);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/before.js
function zt(e, t) {
	var n;
	return function() {
		return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = null), n;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/once.js
var Bt = Et(zt, 2);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/findKey.js
function Vt(e, t, n) {
	t = X(t, n);
	for (var r = J(e), i, a = 0, o = r.length; a < o; a++) if (i = r[a], t(e[i], i, e)) return i;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createPredicateIndexFinder.js
function Ht(e) {
	return function(t, n, r) {
		n = X(n, r);
		for (var i = q(t), a = e > 0 ? 0 : i - 1; a >= 0 && a < i; a += e) if (n(t[a], a, t)) return a;
		return -1;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/findIndex.js
var Ut = Ht(1), Wt = Ht(-1);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/sortedIndex.js
function Gt(e, t, n, r) {
	n = X(n, r, 1);
	for (var i = n(t), a = 0, o = q(e); a < o;) {
		var s = Math.floor((a + o) / 2);
		n(e[s]) < i ? a = s + 1 : o = s;
	}
	return a;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createIndexFinder.js
function Kt(e, t, n) {
	return function(r, i, a) {
		var o = 0, s = q(r);
		if (typeof a == "number") e > 0 ? o = a >= 0 ? a : Math.max(a + s, o) : s = a >= 0 ? Math.min(a + 1, s) : a + s + 1;
		else if (n && a && s) return a = n(r, i), r[a] === i ? a : -1;
		if (i !== i) return a = t(l.call(r, o, s), K), a >= 0 ? a + o : -1;
		for (a = e > 0 ? o : s - 1; a >= 0 && a < s; a += e) if (r[a] === i) return a;
		return -1;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/indexOf.js
var qt = Kt(1, Ut, Gt), Jt = Kt(-1, Wt);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/find.js
function Yt(e, t, n) {
	var r = (Z(e) ? Ut : Vt)(e, t, n);
	if (r !== void 0 && r !== -1) return e[r];
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/findWhere.js
function Xt(e, t) {
	return Yt(e, $e(t));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/each.js
function Zt(e, t, n) {
	t = tt(t, n);
	var r, i;
	if (Z(e)) for (r = 0, i = e.length; r < i; r++) t(e[r], r, e);
	else {
		var a = J(e);
		for (r = 0, i = a.length; r < i; r++) t(e[a[r]], a[r], e);
	}
	return e;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/map.js
function Qt(e, t, n) {
	t = X(t, n);
	for (var r = !Z(e) && J(e), i = (r || e).length, a = Array(i), o = 0; o < i; o++) {
		var s = r ? r[o] : o;
		a[o] = t(e[s], s, e);
	}
	return a;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_createReduce.js
function $t(e) {
	var t = function(t, n, r, i) {
		var a = !Z(t) && J(t), o = (a || t).length, s = e > 0 ? 0 : o - 1;
		for (i || (r = t[a ? a[s] : s], s += e); s >= 0 && s < o; s += e) {
			var c = a ? a[s] : s;
			r = n(r, t[c], c, t);
		}
		return r;
	};
	return function(e, n, r, i) {
		var a = arguments.length >= 3;
		return t(e, tt(n, i, 4), r, a);
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/reduce.js
var en = $t(1), tn = $t(-1);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/filter.js
function nn(e, t, n) {
	var r = [];
	return t = X(t, n), Zt(e, function(e, n, i) {
		t(e, n, i) && r.push(e);
	}), r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/reject.js
function rn(e, t, n) {
	return nn(e, It(X(t)), n);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/every.js
function an(e, t, n) {
	t = X(t, n);
	for (var r = !Z(e) && J(e), i = (r || e).length, a = 0; a < i; a++) {
		var o = r ? r[a] : a;
		if (!t(e[o], o, e)) return !1;
	}
	return !0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/some.js
function on(e, t, n) {
	t = X(t, n);
	for (var r = !Z(e) && J(e), i = (r || e).length, a = 0; a < i; a++) {
		var o = r ? r[a] : a;
		if (t(e[o], o, e)) return !0;
	}
	return !1;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/contains.js
function sn(e, t, n, r) {
	return Z(e) || (e = Pe(e)), (typeof n != "number" || r) && (n = 0), qt(e, t, n) >= 0;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/invoke.js
var cn = w(function(e, t, n) {
	var r, i;
	return I(t) ? i = t : (t = Je(t), r = t.slice(0, -1), t = t[t.length - 1]), Qt(e, function(e) {
		var a = i;
		if (!a) {
			if (r && r.length && (e = Ye(e, r)), e == null) return;
			a = e[t];
		}
		return a == null ? a : a.apply(e, n);
	});
});
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/pluck.js
function ln(e, t) {
	return Qt(e, et(t));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/where.js
function un(e, t) {
	return nn(e, $e(t));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/max.js
function dn(e, t, n) {
	var r = -Infinity, i = -Infinity, a, o;
	if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
		e = Z(e) ? e : Pe(e);
		for (var s = 0, c = e.length; s < c; s++) a = e[s], a != null && a > r && (r = a);
	} else t = X(t, n), Zt(e, function(e, n, a) {
		o = t(e, n, a), (o > i || o === -Infinity && r === -Infinity) && (r = e, i = o);
	});
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/min.js
function fn(e, t, n) {
	var r = Infinity, i = Infinity, a, o;
	if (t == null || typeof t == "number" && typeof e[0] != "object" && e != null) {
		e = Z(e) ? e : Pe(e);
		for (var s = 0, c = e.length; s < c; s++) a = e[s], a != null && a < r && (r = a);
	} else t = X(t, n), Zt(e, function(e, n, a) {
		o = t(e, n, a), (o < i || o === Infinity && r === Infinity) && (r = e, i = o);
	});
	return r;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/toArray.js
var pn = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function mn(e) {
	return e ? V(e) ? l.call(e) : j(e) ? e.match(pn) : Z(e) ? Qt(e, Qe) : Pe(e) : [];
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/sample.js
function hn(e, t, n) {
	if (t == null || n) return Z(e) || (e = Pe(e)), e[ct(e.length - 1)];
	var r = mn(e), i = q(r);
	t = Math.max(Math.min(t, i), 0);
	for (var a = i - 1, o = 0; o < t; o++) {
		var s = ct(o, a), c = r[o];
		r[o] = r[s], r[s] = c;
	}
	return r.slice(0, t);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/shuffle.js
function gn(e) {
	return hn(e, Infinity);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/sortBy.js
function _n(e, t, n) {
	var r = 0;
	return t = X(t, n), ln(Qt(e, function(e, n, i) {
		return {
			value: e,
			index: r++,
			criteria: t(e, n, i)
		};
	}).sort(function(e, t) {
		var n = e.criteria, r = t.criteria;
		if (n !== r) {
			if (n > r || n === void 0) return 1;
			if (n < r || r === void 0) return -1;
		}
		return e.index - t.index;
	}), "value");
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_group.js
function vn(e, t) {
	return function(n, r, i) {
		var a = t ? [[], []] : {};
		return r = X(r, i), Zt(n, function(t, i) {
			e(a, t, r(t, i, n));
		}), a;
	};
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/groupBy.js
var yn = vn(function(e, t, n) {
	H(e, n) ? e[n].push(t) : e[n] = [t];
}), bn = vn(function(e, t, n) {
	e[n] = t;
}), xn = vn(function(e, t, n) {
	H(e, n) ? e[n]++ : e[n] = 1;
}), Sn = vn(function(e, t, n) {
	e[+!n].push(t);
}, !0);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/size.js
function Cn(e) {
	return e == null ? 0 : Z(e) ? e.length : J(e).length;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_keyInObj.js
function wn(e, t, n) {
	return t in n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/pick.js
var Tn = w(function(e, t) {
	var n = {}, r = t[0];
	if (e == null) return n;
	I(r) ? (t.length > 1 && (r = tt(r, t[1])), t = xe(e)) : (r = wn, t = Ot(t, !1, !1), e = Object(e));
	for (var i = 0, a = t.length; i < a; i++) {
		var o = t[i], s = e[o];
		r(s, o, e) && (n[o] = s);
	}
	return n;
}), En = w(function(e, t) {
	var n = t[0], r;
	return I(n) ? (n = It(n), t.length > 1 && (r = t[1])) : (t = Qt(Ot(t, !1, !1), String), n = function(e, n) {
		return !sn(t, n);
	}), Tn(e, n, r);
});
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/initial.js
function Dn(e, t, n) {
	return l.call(e, 0, Math.max(0, e.length - (t == null || n ? 1 : t)));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/first.js
function On(e, t, n) {
	return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[0] : Dn(e, e.length - t);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/rest.js
function kn(e, t, n) {
	return l.call(e, t == null || n ? 1 : t);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/last.js
function An(e, t, n) {
	return e == null || e.length < 1 ? t == null || n ? void 0 : [] : t == null || n ? e[e.length - 1] : kn(e, Math.max(0, e.length - t));
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/compact.js
function jn(e) {
	return nn(e, Boolean);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/flatten.js
function Mn(e, t) {
	return Ot(e, t, !1);
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/difference.js
var Nn = w(function(e, t) {
	return t = Ot(t, !0, !0), nn(e, function(e) {
		return !sn(t, e);
	});
}), Pn = w(function(e, t) {
	return Nn(e, t);
});
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/uniq.js
function Fn(e, t, n, r) {
	O(t) || (r = n, n = t, t = !1), n != null && (n = X(n, r));
	for (var i = [], a = [], o = 0, s = q(e); o < s; o++) {
		var c = e[o], l = n ? n(c, o, e) : c;
		t && !n ? (o && a === l || i.push(c), a = l) : n ? sn(a, l) || (a.push(l), i.push(c)) : sn(i, c) || i.push(c);
	}
	return i;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/union.js
var In = w(function(e) {
	return Fn(Ot(e, !0, !0));
});
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/intersection.js
function Ln(e) {
	for (var t = [], n = arguments.length, r = 0, i = q(e); r < i; r++) {
		var a = e[r];
		if (!sn(t, a)) {
			for (var o = 1; o < n && sn(arguments[o], a); o++);
			o === n && t.push(a);
		}
	}
	return t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/unzip.js
function Rn(e) {
	for (var t = e && dn(e, q).length || 0, n = Array(t), r = 0; r < t; r++) n[r] = ln(e, r);
	return n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/zip.js
var zn = w(Rn);
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/object.js
function Bn(e, t) {
	for (var n = {}, r = 0, i = q(e); r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
	return n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/range.js
function Vn(e, t, n) {
	t ?? (t = e || 0, e = 0), n ||= t < e ? -1 : 1;
	for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), a = 0; a < r; a++, e += n) i[a] = e;
	return i;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/chunk.js
function Hn(e, t) {
	if (t == null || t < 1) return [];
	for (var n = [], r = 0, i = e.length; r < i;) n.push(l.call(e, r, r += t));
	return n;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/_chainResult.js
function Un(e, t) {
	return e._chain ? Y(t).chain() : t;
}
// ../../marktext/node_modules/.pnpm/underscore@1.13.8/node_modules/underscore/modules/mixin.js
function Wn(e) {
	return Zt(Le(e), function(t) {
		var n = Y[t] = e[t];
		Y.prototype[t] = function() {
			var e = [this._wrapped];
			return c.apply(e, arguments), Un(this, n.apply(Y, e));
		};
	}), Y;
}
Zt([
	"pop",
	"push",
	"reverse",
	"shift",
	"sort",
	"splice",
	"unshift"
], function(e) {
	var t = a[e];
	Y.prototype[e] = function() {
		var n = this._wrapped;
		return n != null && (t.apply(n, arguments), (e === "shift" || e === "splice") && n.length === 0 && delete n[0]), Un(this, n);
	};
}), Zt([
	"concat",
	"join",
	"slice"
], function(e) {
	var t = a[e];
	Y.prototype[e] = function() {
		var e = this._wrapped;
		return e != null && (e = t.apply(e, arguments)), Un(this, e);
	};
});
var Gn = Y, Q = Wn(/* @__PURE__ */ t({
	VERSION: () => r,
	after: () => Rt,
	all: () => an,
	allKeys: () => xe,
	any: () => on,
	assign: () => Be,
	before: () => zt,
	bind: () => Dt,
	bindAll: () => kt,
	chain: () => wt,
	chunk: () => Hn,
	clone: () => Ge,
	collect: () => Qt,
	compact: () => jn,
	compose: () => Lt,
	constant: () => oe,
	contains: () => sn,
	countBy: () => xn,
	create: () => We,
	debounce: () => Pt,
	default: () => Gn,
	defaults: () => Ve,
	defer: () => Mt,
	delay: () => jt,
	detect: () => Yt,
	difference: () => Nn,
	drop: () => kn,
	each: () => Zt,
	escape: () => ft,
	every: () => an,
	extend: () => ze,
	extendOwn: () => Be,
	filter: () => nn,
	find: () => Yt,
	findIndex: () => Ut,
	findKey: () => Vt,
	findLastIndex: () => Wt,
	findWhere: () => Xt,
	first: () => On,
	flatten: () => Mn,
	foldl: () => en,
	foldr: () => tn,
	forEach: () => Zt,
	functions: () => Le,
	get: () => Xe,
	groupBy: () => yn,
	has: () => Ze,
	head: () => On,
	identity: () => Qe,
	include: () => sn,
	includes: () => sn,
	indexBy: () => bn,
	indexOf: () => qt,
	initial: () => Dn,
	inject: () => en,
	intersection: () => Ln,
	invert: () => Ie,
	invoke: () => cn,
	isArguments: () => W,
	isArray: () => V,
	isArrayBuffer: () => re,
	isBoolean: () => O,
	isDataView: () => B,
	isDate: () => M,
	isElement: () => k,
	isEmpty: () => ge,
	isEqual: () => be,
	isError: () => N,
	isFinite: () => G,
	isFunction: () => I,
	isMap: () => Ae,
	isMatch: () => _e,
	isNaN: () => K,
	isNull: () => E,
	isNumber: () => ee,
	isObject: () => T,
	isRegExp: () => te,
	isSet: () => Me,
	isString: () => j,
	isSymbol: () => ne,
	isTypedArray: () => pe,
	isUndefined: () => D,
	isWeakMap: () => je,
	isWeakSet: () => Ne,
	iteratee: () => rt,
	keys: () => J,
	last: () => An,
	lastIndexOf: () => Jt,
	map: () => Qt,
	mapObject: () => it,
	matcher: () => $e,
	matches: () => $e,
	max: () => dn,
	memoize: () => At,
	methods: () => Le,
	min: () => fn,
	mixin: () => Wn,
	negate: () => It,
	noop: () => at,
	now: () => lt,
	object: () => Bn,
	omit: () => En,
	once: () => Bt,
	pairs: () => Fe,
	partial: () => Et,
	partition: () => Sn,
	pick: () => Tn,
	pluck: () => ln,
	property: () => et,
	propertyOf: () => ot,
	random: () => ct,
	range: () => Vn,
	reduce: () => en,
	reduceRight: () => tn,
	reject: () => rn,
	rest: () => kn,
	restArguments: () => w,
	result: () => xt,
	sample: () => hn,
	select: () => nn,
	shuffle: () => gn,
	size: () => Cn,
	some: () => on,
	sortBy: () => _n,
	sortedIndex: () => Gt,
	tail: () => kn,
	take: () => On,
	tap: () => Ke,
	template: () => bt,
	templateSettings: () => mt,
	throttle: () => Nt,
	times: () => st,
	toArray: () => mn,
	toPath: () => qe,
	transpose: () => Rn,
	unescape: () => pt,
	union: () => In,
	uniq: () => Fn,
	unique: () => Fn,
	uniqueId: () => Ct,
	unzip: () => Rn,
	values: () => Pe,
	where: () => un,
	without: () => Pn,
	wrap: () => Ft,
	zip: () => zn
}));
Q._ = Q;
// ../../marktext/node_modules/.pnpm/eve@0.5.4/node_modules/eve/eve.js
var Kn = /* @__PURE__ */ n(((e, t, n) => {
	(function(e) {
		var n = "0.5.4", r = "hasOwnProperty", i = /[\.\/]/, a = /\s*,\s*/, o = function(e, t) {
			return e - t;
		}, s, c, l = { n: {} }, u = function() {
			for (var e = 0, t = this.length; e < t; e++) if (this[e] !== void 0) return this[e];
		}, d = function() {
			for (var e = this.length; --e;) if (this[e] !== void 0) return this[e];
		}, f = Object.prototype.toString, p = String, m = Array.isArray || function(e) {
			return e instanceof Array || f.call(e) == "[object Array]";
		}, h = function(e, t) {
			var n = c, r = Array.prototype.slice.call(arguments, 2), i = h.listeners(e), a = 0, l, f = [], p = {}, m = [], _ = s;
			m.firstDefined = u, m.lastDefined = d, s = e, c = 0;
			for (var v = 0, y = i.length; v < y; v++) "zIndex" in i[v] && (f.push(i[v].zIndex), i[v].zIndex < 0 && (p[i[v].zIndex] = i[v]));
			for (f.sort(o); f[a] < 0;) if (l = p[f[a++]], m.push(l.apply(t, r)), c) return c = n, m;
			for (v = 0; v < y; v++) if (l = i[v], "zIndex" in l) {
				if (l.zIndex == f[a]) {
					if (m.push(l.apply(t, r)), c) break;
					do
						if (a++, l = p[f[a]], l && m.push(l.apply(t, r)), c) break;
					while (l);
				} else p[l.zIndex] = l;
			} else if (m.push(l.apply(t, r)), c) break;
			return c = n, s = _, m;
		};
		h._events = l, h.listeners = function(e) {
			var t = m(e) ? e : e.split(i), n = l, r, a, o, s, c, u, d, f, p = [n], h = [];
			for (s = 0, c = t.length; s < c; s++) {
				for (f = [], u = 0, d = p.length; u < d; u++) for (n = p[u].n, a = [n[t[s]], n["*"]], o = 2; o--;) r = a[o], r && (f.push(r), h = h.concat(r.f || []));
				p = f;
			}
			return h;
		}, h.separator = function(e) {
			e ? (e = p(e).replace(/(?=[\.\^\]\[\-])/g, "\\"), e = "[" + e + "]", i = new RegExp(e)) : i = /[\.\/]/;
		}, h.on = function(e, t) {
			if (typeof t != "function") return function() {};
			for (var n = m(e) ? m(e[0]) ? e : [e] : p(e).split(a), r = 0, o = n.length; r < o; r++) (function(e) {
				for (var n = m(e) ? e : p(e).split(i), r = l, a, o = 0, s = n.length; o < s; o++) r = r.n, r = r.hasOwnProperty(n[o]) && r[n[o]] || (r[n[o]] = { n: {} });
				for (r.f = r.f || [], o = 0, s = r.f.length; o < s; o++) if (r.f[o] == t) {
					a = !0;
					break;
				}
				!a && r.f.push(t);
			})(n[r]);
			return function(e) {
				+e == +e && (t.zIndex = +e);
			};
		}, h.f = function(e) {
			var t = [].slice.call(arguments, 1);
			return function() {
				h.apply(null, [e, null].concat(t, [].slice.call(arguments, 0)));
			};
		}, h.stop = function() {
			c = 1;
		}, h.nt = function(e) {
			var t = m(s) ? s.join(".") : s;
			return e ? RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(t) : t;
		}, h.nts = function() {
			return m(s) ? s : s.split(i);
		}, h.off = h.unbind = function(e, t) {
			if (!e) h._events = l = { n: {} };
			else {
				var n = m(e) ? m(e[0]) ? e : [e] : p(e).split(a);
				if (n.length > 1) for (var o = 0, s = n.length; o < s; o++) h.off(n[o], t);
				else {
					n = m(e) ? e : p(e).split(i);
					var c, u, d, o, s, f, _, v = [l], y = [];
					for (o = 0, s = n.length; o < s; o++) for (f = 0; f < v.length; f += d.length - 2) {
						if (d = [f, 1], c = v[f].n, n[o] != "*") c[n[o]] && (d.push(c[n[o]]), y.unshift({
							n: c,
							name: n[o]
						}));
						else for (u in c) c[r](u) && (d.push(c[u]), y.unshift({
							n: c,
							name: u
						}));
						v.splice.apply(v, d);
					}
					for (o = 0, s = v.length; o < s; o++) for (c = v[o]; c.n;) {
						if (t) {
							if (c.f) {
								for (f = 0, _ = c.f.length; f < _; f++) if (c.f[f] == t) {
									c.f.splice(f, 1);
									break;
								}
								!c.f.length && delete c.f;
							}
							for (u in c.n) if (c.n[r](u) && c.n[u].f) {
								var b = c.n[u].f;
								for (f = 0, _ = b.length; f < _; f++) if (b[f] == t) {
									b.splice(f, 1);
									break;
								}
								!b.length && delete c.n[u].f;
							}
						} else for (u in delete c.f, c.n) c.n[r](u) && c.n[u].f && delete c.n[u].f;
						c = c.n;
					}
					prune: for (o = 0, s = y.length; o < s; o++) {
						for (u in c = y[o], c.n[c.name].f) continue prune;
						for (u in c.n[c.name].n) continue prune;
						delete c.n[c.name];
					}
				}
			}
		}, h.once = function(e, t) {
			var n = function() {
				return h.off(e, n), t.apply(this, arguments);
			};
			return h.on(e, n);
		}, h.version = n, h.toString = function() {
			return "You are running Eve " + n;
		}, e.eve = h, t !== void 0 && t.exports ? t.exports = h : typeof define == "function" && define.amd ? define("eve", [], function() {
			return h;
		}) : e.eve = h;
	})(typeof window < "u" ? window : n);
})), qn = /* @__PURE__ */ n(((e, t, n) => {
	window.eve = Kn();
	var r = (function(e) {
		var t = {}, n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
			return setTimeout(e, 16, (/* @__PURE__ */ new Date()).getTime()), !0;
		}, r, i = Array.isArray || function(e) {
			return e instanceof Array || Object.prototype.toString.call(e) == "[object Array]";
		}, a = 0, o = "M" + (+/* @__PURE__ */ new Date()).toString(36), s = function() {
			return o + (a++).toString(36);
		}, c = Date.now || function() {
			return +/* @__PURE__ */ new Date();
		}, l = function(e) {
			var t = this;
			if (e == null) return t.s;
			var n = t.s - e;
			t.b += t.dur * n, t.B += t.dur * n, t.s = e;
		}, u = function(e) {
			var t = this;
			if (e == null) return t.spd;
			t.spd = e;
		}, d = function(e) {
			var t = this;
			if (e == null) return t.dur;
			t.s = t.s * e / t.dur, t.dur = e;
		}, f = function() {
			var n = this;
			delete t[n.id], n.update(), e("mina.stop." + n.id, n);
		}, p = function() {
			var e = this;
			e.pdif ||= (delete t[e.id], e.update(), e.get() - e.b);
		}, m = function() {
			var e = this;
			e.pdif && (e.b = e.get() - e.pdif, delete e.pdif, t[e.id] = e, _());
		}, h = function() {
			var e = this, t;
			if (i(e.start)) {
				t = [];
				for (var n = 0, r = e.start.length; n < r; n++) t[n] = +e.start[n] + (e.end[n] - e.start[n]) * e.easing(e.s);
			} else t = +e.start + (e.end - e.start) * e.easing(e.s);
			e.set(t);
		}, _ = function(i) {
			if (!i) r ||= n(_);
			else {
				var a = 0;
				for (var o in t) if (t.hasOwnProperty(o)) {
					var s = t[o], c = s.get();
					a++, s.s = (c - s.b) / (s.dur / s.spd), s.s >= 1 && (delete t[o], s.s = 1, a--, (function(t) {
						setTimeout(function() {
							e("mina.finish." + t.id, t);
						});
					})(s)), s.update();
				}
				r = a ? n(_) : !1;
			}
		}, v = function(e, n, r, i, a, o, c) {
			var y = {
				id: s(),
				start: e,
				end: n,
				b: r,
				s: 0,
				dur: i - r,
				spd: 1,
				get: a,
				set: o,
				easing: c || v.linear,
				status: l,
				speed: u,
				duration: d,
				stop: f,
				pause: p,
				resume: m,
				update: h
			};
			t[y.id] = y;
			var b = 0, x;
			for (x in t) if (t.hasOwnProperty(x) && (b++, b == 2)) break;
			return b == 1 && _(), y;
		};
		return v.time = c, v.getById = function(e) {
			return t[e] || null;
		}, v.linear = function(e) {
			return e;
		}, v.easeout = function(e) {
			return e ** 1.7;
		}, v.easein = function(e) {
			return e ** .48;
		}, v.easeinout = function(e) {
			if (e == 1) return 1;
			if (e == 0) return 0;
			var t = .48 - e / 1.04, n = Math.sqrt(.1734 + t * t), r = n - t, i = Math.abs(r) ** (1 / 3) * (r < 0 ? -1 : 1), a = -n - t, o = i + Math.abs(a) ** (1 / 3) * (a < 0 ? -1 : 1) + .5;
			return (1 - o) * 3 * o * o + o * o * o;
		}, v.backin = function(e) {
			if (e == 1) return 1;
			var t = 1.70158;
			return e * e * ((t + 1) * e - t);
		}, v.backout = function(e) {
			if (e == 0) return 0;
			--e;
			var t = 1.70158;
			return e * e * ((t + 1) * e + t) + 1;
		}, v.elastic = function(e) {
			return e == !!e ? e : 2 ** (-10 * e) * Math.sin((e - .075) * (2 * Math.PI) / .3) + 1;
		}, v.bounce = function(e) {
			var t = 7.5625, n = 2.75, r;
			return e < 1 / n ? r = t * e * e : e < 2 / n ? (e -= 1.5 / n, r = t * e * e + .75) : e < 2.5 / n ? (e -= 2.25 / n, r = t * e * e + .9375) : (e -= 2.625 / n, r = t * e * e + .984375), r;
		}, window.mina = v, v;
	})(typeof eve > "u" ? function() {} : eve), i = function(e) {
		t.version = "0.5.1";
		function t(e, r) {
			if (e) {
				if (e.nodeType) return K(e);
				if (O(e, "array") && t.set) return t.set.apply(t, e);
				if (e instanceof H) return e;
				if (r == null) try {
					return e = n.doc.querySelector(String(e)), K(e);
				} catch {
					return null;
				}
			}
			return e ??= "100%", r ??= "100%", new G(e, r);
		}
		t.toString = function() {
			return "Snap v" + this.version;
		}, t._ = {};
		var n = {
			win: e.window,
			doc: e.window.document
		};
		t._.glob = n;
		var r = "hasOwnProperty", i = String, a = parseFloat, o = parseInt, s = Math, c = s.max, l = s.min, u = s.abs;
		s.pow;
		var d = s.PI;
		s.round;
		var f = "", p = Object.prototype.toString, m = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i;
		t._.separator = /[,\s]+/;
		var h = /[\s]*,[\s]*/, _ = {
			hs: 1,
			rg: 1
		}, v = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, y = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/gi, b = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/gi, x = 0, S = "S" + (+/* @__PURE__ */ new Date()).toString(36), C = function(e) {
			return (e && e.type ? e.type : f) + S + (x++).toString(36);
		}, w = "http://www.w3.org/1999/xlink", T = "http://www.w3.org/2000/svg", E = {};
		t.url = function(e) {
			return "url('#" + e + "')";
		};
		function D(e, t) {
			if (t) {
				if (e == "#text" && (e = n.doc.createTextNode(t.text || t["#text"] || "")), e == "#comment" && (e = n.doc.createComment(t.text || t["#text"] || "")), typeof e == "string" && (e = D(e)), typeof t == "string") return e.nodeType == 1 ? t.substring(0, 6) == "xlink:" ? e.getAttributeNS(w, t.substring(6)) : t.substring(0, 4) == "xml:" ? e.getAttributeNS(T, t.substring(4)) : e.getAttribute(t) : t == "text" ? e.nodeValue : null;
				if (e.nodeType == 1) {
					for (var a in t) if (t[r](a)) {
						var o = i(t[a]);
						o ? a.substring(0, 6) == "xlink:" ? e.setAttributeNS(w, a.substring(6), o) : a.substring(0, 4) == "xml:" ? e.setAttributeNS(T, a.substring(4), o) : e.setAttribute(a, o) : e.removeAttribute(a);
					}
				} else "text" in t && (e.nodeValue = t.text);
			} else e = n.doc.createElementNS(T, e);
			return e;
		}
		t._.$ = D, t._.id = C;
		function O(e, t) {
			return t = i.prototype.toLowerCase.call(t), t == "finite" ? isFinite(e) : t == "array" && (e instanceof Array || Array.isArray && Array.isArray(e)) ? !0 : t == "null" && e === null || t == typeof e && e !== null || t == "object" && e === Object(e) || p.call(e).slice(8, -1).toLowerCase() == t;
		}
		t.format = (function() {
			var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function(e, n, r) {
				var i = r;
				return n.replace(t, function(e, t, n, r, a) {
					t ||= r, i && (t in i && (i = i[t]), typeof i == "function" && a && (i = i()));
				}), i = (i == null || i == r ? e : i) + "", i;
			};
			return function(t, r) {
				return i(t).replace(e, function(e, t) {
					return n(e, t, r);
				});
			};
		})();
		function k(e) {
			if (typeof e == "function" || Object(e) !== e) return e;
			var t = new e.constructor();
			for (var n in e) e[r](n) && (t[n] = k(e[n]));
			return t;
		}
		t._.clone = k;
		function A(e, t) {
			for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return e.push(e.splice(n, 1)[0]);
		}
		function j(e, t, n) {
			function i() {
				var a = Array.prototype.slice.call(arguments, 0), o = a.join("␀"), s = i.cache = i.cache || {}, c = i.count = i.count || [];
				return s[r](o) ? (A(c, o), n ? n(s[o]) : s[o]) : (c.length >= 1e3 && delete s[c.shift()], c.push(o), s[o] = e.apply(t, a), n ? n(s[o]) : s[o]);
			}
			return i;
		}
		t._.cacher = j;
		function ee(e, t, n, r, i, a) {
			if (i == null) {
				var o = e - n, c = t - r;
				return !o && !c ? 0 : (180 + s.atan2(-c, -o) * 180 / d + 360) % 360;
			}
			return ee(e, t, i, a) - ee(n, r, i, a);
		}
		function M(e) {
			return e % 360 * d / 180;
		}
		function te(e) {
			return e * 180 / d % 360;
		}
		t.rad = M, t.deg = te, t.sin = function(e) {
			return s.sin(t.rad(e));
		}, t.tan = function(e) {
			return s.tan(t.rad(e));
		}, t.cos = function(e) {
			return s.cos(t.rad(e));
		}, t.asin = function(e) {
			return t.deg(s.asin(e));
		}, t.acos = function(e) {
			return t.deg(s.acos(e));
		}, t.atan = function(e) {
			return t.deg(s.atan(e));
		}, t.atan2 = function(e) {
			return t.deg(s.atan2(e));
		}, t.angle = ee, t.len = function(e, n, r, i) {
			return Math.sqrt(t.len2(e, n, r, i));
		}, t.len2 = function(e, t, n, r) {
			return (e - n) * (e - n) + (t - r) * (t - r);
		}, t.closestPoint = function(e, t, n) {
			function r(e) {
				var r = e.x - t, i = e.y - n;
				return r * r + i * i;
			}
			for (var i = e.node, a = i.getTotalLength(), o = a / i.pathSegList.numberOfItems * .125, s, c, l = Infinity, u, d = 0, f; d <= a; d += o) (f = r(u = i.getPointAtLength(d))) < l && (s = u, c = d, l = f);
			for (o *= .5; o > .5;) {
				var p, m, h, _, v, y;
				(h = c - o) >= 0 && (v = r(p = i.getPointAtLength(h))) < l ? (s = p, c = h, l = v) : (_ = c + o) <= a && (y = r(m = i.getPointAtLength(_))) < l ? (s = m, c = _, l = y) : o *= .5;
			}
			return s = {
				x: s.x,
				y: s.y,
				length: c,
				distance: Math.sqrt(l)
			}, s;
		}, t.is = O, t.snapTo = function(e, t, n) {
			if (n = O(n, "finite") ? n : 10, O(e, "array")) {
				for (var r = e.length; r--;) if (u(e[r] - t) <= n) return e[r];
			} else {
				e = +e;
				var i = t % e;
				if (i < n) return t - i;
				if (i > e - n) return t - i + e;
			}
			return t;
		}, t.getRGB = j(function(e) {
			if (!e || (e = i(e)).indexOf("-") + 1) return {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				error: 1,
				toString: P
			};
			if (e == "none") return {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				toString: P
			};
			if (!(_[r](e.toLowerCase().substring(0, 2)) || e.charAt() == "#") && (e = N(e)), !e) return {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				error: 1,
				toString: P
			};
			var n, u, d, f, p, v, y = e.match(m);
			return y ? (y[2] && (d = o(y[2].substring(5), 16), u = o(y[2].substring(3, 5), 16), n = o(y[2].substring(1, 3), 16)), y[3] && (d = o((p = y[3].charAt(3)) + p, 16), u = o((p = y[3].charAt(2)) + p, 16), n = o((p = y[3].charAt(1)) + p, 16)), y[4] && (v = y[4].split(h), n = a(v[0]), v[0].slice(-1) == "%" && (n *= 2.55), u = a(v[1]), v[1].slice(-1) == "%" && (u *= 2.55), d = a(v[2]), v[2].slice(-1) == "%" && (d *= 2.55), y[1].toLowerCase().slice(0, 4) == "rgba" && (f = a(v[3])), v[3] && v[3].slice(-1) == "%" && (f /= 100)), y[5] ? (v = y[5].split(h), n = a(v[0]), v[0].slice(-1) == "%" && (n /= 100), u = a(v[1]), v[1].slice(-1) == "%" && (u /= 100), d = a(v[2]), v[2].slice(-1) == "%" && (d /= 100), (v[0].slice(-3) == "deg" || v[0].slice(-1) == "°") && (n /= 360), y[1].toLowerCase().slice(0, 4) == "hsba" && (f = a(v[3])), v[3] && v[3].slice(-1) == "%" && (f /= 100), t.hsb2rgb(n, u, d, f)) : y[6] ? (v = y[6].split(h), n = a(v[0]), v[0].slice(-1) == "%" && (n /= 100), u = a(v[1]), v[1].slice(-1) == "%" && (u /= 100), d = a(v[2]), v[2].slice(-1) == "%" && (d /= 100), (v[0].slice(-3) == "deg" || v[0].slice(-1) == "°") && (n /= 360), y[1].toLowerCase().slice(0, 4) == "hsla" && (f = a(v[3])), v[3] && v[3].slice(-1) == "%" && (f /= 100), t.hsl2rgb(n, u, d, f)) : (n = l(s.round(n), 255), u = l(s.round(u), 255), d = l(s.round(d), 255), f = l(c(f, 0), 1), y = {
				r: n,
				g: u,
				b: d,
				toString: P
			}, y.hex = "#" + (16777216 | d | u << 8 | n << 16).toString(16).slice(1), y.opacity = O(f, "finite") ? f : 1, y)) : {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				error: 1,
				toString: P
			};
		}, t), t.hsb = j(function(e, n, r) {
			return t.hsb2rgb(e, n, r).hex;
		}), t.hsl = j(function(e, n, r) {
			return t.hsl2rgb(e, n, r).hex;
		}), t.rgb = j(function(e, t, n, r) {
			if (O(r, "finite")) {
				var i = s.round;
				return "rgba(" + [
					i(e),
					i(t),
					i(n),
					+r.toFixed(2)
				] + ")";
			}
			return "#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1);
		});
		var N = function(e) {
			var t = n.doc.getElementsByTagName("head")[0] || n.doc.getElementsByTagName("svg")[0], r = "rgb(255, 0, 0)";
			return N = j(function(e) {
				if (e.toLowerCase() == "red") return r;
				t.style.color = r, t.style.color = e;
				var i = n.doc.defaultView.getComputedStyle(t, f).getPropertyValue("color");
				return i == r ? null : i;
			}), N(e);
		}, ne = function() {
			return "hsb(" + [
				this.h,
				this.s,
				this.b
			] + ")";
		}, re = function() {
			return "hsl(" + [
				this.h,
				this.s,
				this.l
			] + ")";
		}, P = function() {
			return this.opacity == 1 || this.opacity == null ? this.hex : "rgba(" + [
				this.r,
				this.g,
				this.b,
				this.opacity
			] + ")";
		}, F = function(e, n, r) {
			if (n == null && O(e, "object") && "r" in e && "g" in e && "b" in e && (r = e.b, n = e.g, e = e.r), n == null && O(e, string)) {
				var i = t.getRGB(e);
				e = i.r, n = i.g, r = i.b;
			}
			return (e > 1 || n > 1 || r > 1) && (e /= 255, n /= 255, r /= 255), [
				e,
				n,
				r
			];
		}, I = function(e, n, r, i) {
			e = s.round(e * 255), n = s.round(n * 255), r = s.round(r * 255);
			var a = {
				r: e,
				g: n,
				b: r,
				opacity: O(i, "finite") ? i : 1,
				hex: t.rgb(e, n, r),
				toString: P
			};
			return O(i, "finite") && (a.opacity = i), a;
		};
		t.color = function(e) {
			var n;
			return O(e, "object") && "h" in e && "s" in e && "b" in e ? (n = t.hsb2rgb(e), e.r = n.r, e.g = n.g, e.b = n.b, e.opacity = 1, e.hex = n.hex) : O(e, "object") && "h" in e && "s" in e && "l" in e ? (n = t.hsl2rgb(e), e.r = n.r, e.g = n.g, e.b = n.b, e.opacity = 1, e.hex = n.hex) : (O(e, "string") && (e = t.getRGB(e)), O(e, "object") && "r" in e && "g" in e && "b" in e && !("error" in e) ? (n = t.rgb2hsl(e), e.h = n.h, e.s = n.s, e.l = n.l, n = t.rgb2hsb(e), e.v = n.b) : (e = { hex: "none" }, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1, e.error = 1)), e.toString = P, e;
		}, t.hsb2rgb = function(e, t, n, r) {
			O(e, "object") && "h" in e && "s" in e && "b" in e && (n = e.b, t = e.s, r = e.o, e = e.h), e *= 360;
			var i, a, o, s, c;
			return e = e % 360 / 60, c = n * t, s = c * (1 - u(e % 2 - 1)), i = a = o = n - c, e = ~~e, i += [
				c,
				s,
				0,
				0,
				s,
				c
			][e], a += [
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
			][e], I(i, a, o, r);
		}, t.hsl2rgb = function(e, t, n, r) {
			O(e, "object") && "h" in e && "s" in e && "l" in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
			var i, a, o, s, c;
			return e = e % 360 / 60, c = 2 * t * (n < .5 ? n : 1 - n), s = c * (1 - u(e % 2 - 1)), i = a = o = n - c / 2, e = ~~e, i += [
				c,
				s,
				0,
				0,
				s,
				c
			][e], a += [
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
			][e], I(i, a, o, r);
		}, t.rgb2hsb = function(e, t, n) {
			n = F(e, t, n), e = n[0], t = n[1], n = n[2];
			var r, i, a = c(e, t, n), o = a - l(e, t, n);
			return r = o == 0 ? null : a == e ? (t - n) / o : a == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = o == 0 ? 0 : o / a, {
				h: r,
				s: i,
				b: a,
				toString: ne
			};
		}, t.rgb2hsl = function(e, t, n) {
			n = F(e, t, n), e = n[0], t = n[1], n = n[2];
			var r, i, a, o = c(e, t, n), s = l(e, t, n), u = o - s;
			return r = u == 0 ? null : o == e ? (t - n) / u : o == t ? (n - e) / u + 2 : (e - t) / u + 4, r = (r + 360) % 6 * 60 / 360, a = (o + s) / 2, i = u == 0 ? 0 : a < .5 ? u / (2 * a) : u / (2 - 2 * a), {
				h: r,
				s: i,
				l: a,
				toString: re
			};
		}, t.parsePathString = function(e) {
			if (!e) return null;
			var n = t.path(e);
			if (n.arr) return t.path.clone(n.arr);
			var r = {
				a: 7,
				c: 6,
				o: 2,
				h: 1,
				l: 2,
				m: 2,
				r: 4,
				q: 4,
				s: 4,
				t: 2,
				v: 1,
				u: 3,
				z: 0
			}, a = [];
			return O(e, "array") && O(e[0], "array") && (a = t.path.clone(e)), a.length || i(e).replace(v, function(e, t, n) {
				var i = [], o = t.toLowerCase();
				if (n.replace(b, function(e, t) {
					t && i.push(+t);
				}), o == "m" && i.length > 2 && (a.push([t].concat(i.splice(0, 2))), o = "l", t = t == "m" ? "l" : "L"), o == "o" && i.length == 1 && a.push([t, i[0]]), o == "r") a.push([t].concat(i));
				else for (; i.length >= r[o] && (a.push([t].concat(i.splice(0, r[o]))), r[o]););
			}), a.toString = t.path.toString, n.arr = t.path.clone(a), a;
		};
		var L = t.parseTransformString = function(e) {
			if (!e) return null;
			var n = [];
			return O(e, "array") && O(e[0], "array") && (n = t.path.clone(e)), n.length || i(e).replace(y, function(e, t, r) {
				var i = [];
				t.toLowerCase(), r.replace(b, function(e, t) {
					t && i.push(+t);
				}), n.push([t].concat(i));
			}), n.toString = t.path.toString, n;
		};
		function R(e) {
			var t = [];
			return e = e.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(e, n, r) {
				return r = r.split(/\s*,\s*|\s+/), n == "rotate" && r.length == 1 && r.push(0, 0), n == "scale" && (r.length > 2 ? r = r.slice(0, 2) : r.length == 2 && r.push(0, 0), r.length == 1 && r.push(r[0], 0, 0)), n == "skewX" ? t.push([
					"m",
					1,
					0,
					s.tan(M(r[0])),
					1,
					0,
					0
				]) : n == "skewY" ? t.push([
					"m",
					1,
					s.tan(M(r[0])),
					0,
					1,
					0,
					0
				]) : t.push([n.charAt(0)].concat(r)), e;
			}), t;
		}
		t._.svgTransform2string = R, t._.rgTransform = /^[a-z][\s]*-?\.?\d/i;
		function ie(e, n) {
			var r = L(e), a = new t.Matrix();
			if (r) for (var o = 0, s = r.length; o < s; o++) {
				var c = r[o], l = c.length, u = i(c[0]).toLowerCase(), d = c[0] != u, f = d ? a.invert() : 0, p, m, h, _, v;
				u == "t" && l == 2 ? a.translate(c[1], 0) : u == "t" && l == 3 ? d ? (p = f.x(0, 0), m = f.y(0, 0), h = f.x(c[1], c[2]), _ = f.y(c[1], c[2]), a.translate(h - p, _ - m)) : a.translate(c[1], c[2]) : u == "r" ? l == 2 ? (v ||= n, a.rotate(c[1], v.x + v.width / 2, v.y + v.height / 2)) : l == 4 && (d ? (h = f.x(c[2], c[3]), _ = f.y(c[2], c[3]), a.rotate(c[1], h, _)) : a.rotate(c[1], c[2], c[3])) : u == "s" ? l == 2 || l == 3 ? (v ||= n, a.scale(c[1], c[l - 1], v.x + v.width / 2, v.y + v.height / 2)) : l == 4 ? d ? (h = f.x(c[2], c[3]), _ = f.y(c[2], c[3]), a.scale(c[1], c[1], h, _)) : a.scale(c[1], c[1], c[2], c[3]) : l == 5 && (d ? (h = f.x(c[3], c[4]), _ = f.y(c[3], c[4]), a.scale(c[1], c[2], h, _)) : a.scale(c[1], c[2], c[3], c[4])) : u == "m" && l == 7 && a.add(c[1], c[2], c[3], c[4], c[5], c[6]);
			}
			return a;
		}
		t._.transform2matrix = ie, t._unit2px = B, n.doc.contains || n.doc.compareDocumentPosition;
		function ae(e) {
			var n = e.node.ownerSVGElement && K(e.node.ownerSVGElement) || e.node.parentNode && K(e.node.parentNode) || t.select("svg") || t(0, 0), r = n.select("defs"), i = r != null && r.node;
			return i ||= W("defs", n.node).node, i;
		}
		function z(e) {
			return e.node.ownerSVGElement && K(e.node.ownerSVGElement) || t.select("svg");
		}
		t._.getSomeDefs = ae, t._.getSomeSVG = z;
		function B(e, t, n) {
			var r = z(e).node, i = {}, a = r.querySelector(".svg---mgr");
			a || (a = D("rect"), D(a, {
				x: -9e9,
				y: -9e9,
				width: 10,
				height: 10,
				class: "svg---mgr",
				fill: "none"
			}), r.appendChild(a));
			function o(e) {
				if (e == null) return f;
				if (e == +e) return e;
				D(a, { width: e });
				try {
					return a.getBBox().width;
				} catch {
					return 0;
				}
			}
			function s(e) {
				if (e == null) return f;
				if (e == +e) return e;
				D(a, { height: e });
				try {
					return a.getBBox().height;
				} catch {
					return 0;
				}
			}
			function c(r, a) {
				t == null ? i[r] = a(e.attr(r) || 0) : r == t && (i = a(n ?? (e.attr(r) || 0)));
			}
			switch (e.type) {
				case "rect": c("rx", o), c("ry", s);
				case "image": c("width", o), c("height", s);
				case "text":
					c("x", o), c("y", s);
					break;
				case "circle":
					c("cx", o), c("cy", s), c("r", o);
					break;
				case "ellipse":
					c("cx", o), c("cy", s), c("rx", o), c("ry", s);
					break;
				case "line":
					c("x1", o), c("x2", o), c("y1", s), c("y2", s);
					break;
				case "marker":
					c("refX", o), c("markerWidth", o), c("refY", s), c("markerHeight", s);
					break;
				case "radialGradient":
					c("fx", o), c("fy", s);
					break;
				case "tspan":
					c("dx", o), c("dy", s);
					break;
				default: c(t, o);
			}
			return r.removeChild(a), i;
		}
		t.select = function(e) {
			return e = i(e).replace(/([^\\]):/g, "$1\\:"), K(n.doc.querySelector(e));
		}, t.selectAll = function(e) {
			for (var r = n.doc.querySelectorAll(e), i = (t.set || Array)(), a = 0; a < r.length; a++) i.push(K(r[a]));
			return i;
		};
		function V(e) {
			O(e, "array") || (e = Array.prototype.slice.call(arguments, 0));
			for (var t = 0, n = 0, r = this.node; this[t];) delete this[t++];
			for (t = 0; t < e.length; t++) e[t].type == "set" ? e[t].forEach(function(e) {
				r.appendChild(e.node);
			}) : r.appendChild(e[t].node);
			var i = r.childNodes;
			for (t = 0; t < i.length; t++) this[n++] = K(i[t]);
			return this;
		}
		setInterval(function() {
			for (var e in E) if (E[r](e)) {
				var t = E[e], n = t.node;
				(t.type != "svg" && !n.ownerSVGElement || t.type == "svg" && (!n.parentNode || "ownerSVGElement" in n.parentNode && !n.ownerSVGElement)) && delete E[e];
			}
		}, 1e4);
		function H(e) {
			if (e.snap in E) return E[e.snap];
			var t;
			try {
				t = e.ownerSVGElement;
			} catch {}
			this.node = e, t && (this.paper = new G(t)), this.type = e.tagName || e.nodeName;
			var n = this.id = C(this);
			if (this.anims = {}, this._ = { transform: [] }, e.snap = n, E[n] = this, this.type == "g" && (this.add = V), this.type in {
				g: 1,
				mask: 1,
				pattern: 1,
				symbol: 1
			}) for (var i in G.prototype) G.prototype[r](i) && (this[i] = G.prototype[i]);
		}
		H.prototype.attr = function(e, t) {
			var n = this, i = n.node;
			if (!e) {
				if (i.nodeType != 1) return { text: i.nodeValue };
				for (var a = i.attributes, o = {}, s = 0, c = a.length; s < c; s++) o[a[s].nodeName] = a[s].nodeValue;
				return o;
			}
			if (O(e, "string")) {
				if (arguments.length > 1) {
					var l = {};
					l[e] = t, e = l;
				} else return eve("snap.util.getattr." + e, n).firstDefined();
			}
			for (var u in e) e[r](u) && eve("snap.util.attr." + u, n, e[u]);
			return n;
		}, t.parse = function(e) {
			var t = n.doc.createDocumentFragment(), r = !0, a = n.doc.createElement("div");
			if (e = i(e), e.match(/^\s*<\s*svg(?:\s|>)/) || (e = "<svg>" + e + "</svg>", r = !1), a.innerHTML = e, e = a.getElementsByTagName("svg")[0], e) {
				if (r) t = e;
				else for (; e.firstChild;) t.appendChild(e.firstChild);
			}
			return new U(t);
		};
		function U(e) {
			this.node = e;
		}
		t.fragment = function() {
			for (var e = Array.prototype.slice.call(arguments, 0), r = n.doc.createDocumentFragment(), i = 0, a = e.length; i < a; i++) {
				var o = e[i];
				o.node && o.node.nodeType && r.appendChild(o.node), o.nodeType && r.appendChild(o), typeof o == "string" && r.appendChild(t.parse(o).node);
			}
			return new U(r);
		};
		function W(e, t) {
			var n = D(e);
			return t.appendChild(n), K(n);
		}
		function G(e, t) {
			var i, a, o, s = G.prototype;
			if (e && e.tagName && e.tagName.toLowerCase() == "svg") {
				if (e.snap in E) return E[e.snap];
				var c = e.ownerDocument;
				for (var l in i = new H(e), a = e.getElementsByTagName("desc")[0], o = e.getElementsByTagName("defs")[0], a || (a = D("desc"), a.appendChild(c.createTextNode("Created with Snap")), i.node.appendChild(a)), o || (o = D("defs"), i.node.appendChild(o)), i.defs = o, s) s[r](l) && (i[l] = s[l]);
				i.paper = i.root = i;
			} else i = W("svg", n.doc.body), D(i.node, {
				height: t,
				version: 1.1,
				width: e,
				xmlns: T
			});
			return i;
		}
		function K(e) {
			return !e || e instanceof H || e instanceof U ? e : e.tagName && e.tagName.toLowerCase() == "svg" ? new G(e) : e.tagName && e.tagName.toLowerCase() == "object" && e.type == "image/svg+xml" ? new G(e.contentDocument.getElementsByTagName("svg")[0]) : new H(e);
		}
		t._.make = W, t._.wrap = K, G.prototype.el = function(e, t) {
			var n = W(e, this.node);
			return t && n.attr(t), n;
		}, H.prototype.children = function() {
			for (var e = [], n = this.node.childNodes, r = 0, i = n.length; r < i; r++) e[r] = t(n[r]);
			return e;
		};
		function oe(e, t) {
			for (var n = 0, r = e.length; n < r; n++) {
				var i = {
					type: e[n].type,
					attr: e[n].attr()
				}, a = e[n].children();
				t.push(i), a.length && oe(a, i.childNodes = []);
			}
		}
		H.prototype.toJSON = function() {
			var e = [];
			return oe([this], e), e[0];
		}, eve.on("snap.util.getattr", function() {
			var e = eve.nt();
			e = e.substring(e.lastIndexOf(".") + 1);
			var t = e.replace(/[A-Z]/g, function(e) {
				return "-" + e.toLowerCase();
			});
			return se[r](t) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(t) : D(this.node, e);
		});
		var se = {
			"alignment-baseline": 0,
			"baseline-shift": 0,
			clip: 0,
			"clip-path": 0,
			"clip-rule": 0,
			color: 0,
			"color-interpolation": 0,
			"color-interpolation-filters": 0,
			"color-profile": 0,
			"color-rendering": 0,
			cursor: 0,
			direction: 0,
			display: 0,
			"dominant-baseline": 0,
			"enable-background": 0,
			fill: 0,
			"fill-opacity": 0,
			"fill-rule": 0,
			filter: 0,
			"flood-color": 0,
			"flood-opacity": 0,
			font: 0,
			"font-family": 0,
			"font-size": 0,
			"font-size-adjust": 0,
			"font-stretch": 0,
			"font-style": 0,
			"font-variant": 0,
			"font-weight": 0,
			"glyph-orientation-horizontal": 0,
			"glyph-orientation-vertical": 0,
			"image-rendering": 0,
			kerning: 0,
			"letter-spacing": 0,
			"lighting-color": 0,
			marker: 0,
			"marker-end": 0,
			"marker-mid": 0,
			"marker-start": 0,
			mask: 0,
			opacity: 0,
			overflow: 0,
			"pointer-events": 0,
			"shape-rendering": 0,
			"stop-color": 0,
			"stop-opacity": 0,
			stroke: 0,
			"stroke-dasharray": 0,
			"stroke-dashoffset": 0,
			"stroke-linecap": 0,
			"stroke-linejoin": 0,
			"stroke-miterlimit": 0,
			"stroke-opacity": 0,
			"stroke-width": 0,
			"text-anchor": 0,
			"text-decoration": 0,
			"text-rendering": 0,
			"unicode-bidi": 0,
			visibility: 0,
			"word-spacing": 0,
			"writing-mode": 0
		};
		eve.on("snap.util.attr", function(e) {
			var t = eve.nt(), n = {};
			t = t.substring(t.lastIndexOf(".") + 1), n[t] = e;
			var i = t.replace(/-(\w)/gi, function(e, t) {
				return t.toUpperCase();
			}), a = t.replace(/[A-Z]/g, function(e) {
				return "-" + e.toLowerCase();
			});
			se[r](a) ? this.node.style[i] = e ?? f : D(this.node, n);
		}), G.prototype, t.ajax = function(e, t, n, r) {
			var i = new XMLHttpRequest(), a = C();
			if (i) {
				if (O(t, "function")) r = n, n = t, t = null;
				else if (O(t, "object")) {
					var o = [];
					for (var s in t) t.hasOwnProperty(s) && o.push(encodeURIComponent(s) + "=" + encodeURIComponent(t[s]));
					t = o.join("&");
				}
				return i.open(t ? "POST" : "GET", e, !0), t && (i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), n && (eve.once("snap.ajax." + a + ".0", n), eve.once("snap.ajax." + a + ".200", n), eve.once("snap.ajax." + a + ".304", n)), i.onreadystatechange = function() {
					i.readyState == 4 && eve("snap.ajax." + a + "." + i.status, r, i);
				}, i.readyState == 4 || i.send(t), i;
			}
		}, t.load = function(e, n, r) {
			t.ajax(e, function(e) {
				var i = t.parse(e.responseText);
				r ? n.call(r, i) : n(i);
			});
		};
		var ce = function(e) {
			var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, a = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0;
			return {
				y: t.top + (g.win.pageYOffset || i.scrollTop || r.scrollTop) - a,
				x: t.left + (g.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o
			};
		};
		return t.getElementByPoint = function(e, t) {
			this.canvas;
			var r = n.doc.elementFromPoint(e, t);
			if (n.win.opera && r.tagName == "svg") {
				var i = ce(r), a = r.createSVGRect();
				a.x = e - i.x, a.y = t - i.y, a.width = a.height = 1;
				var o = r.getIntersectionList(a, null);
				o.length && (r = o[o.length - 1]);
			}
			return r ? K(r) : null;
		}, t.plugin = function(e) {
			e(t, H, G, n, U);
		}, n.win.Snap = t, t;
	}(window || n);
	i.plugin(function(e, t, n, r, i) {
		var a = t.prototype, o = e.is, s = String, c = e._unit2px, l = e._.$, u = e._.make, d = e._.getSomeDefs, f = "hasOwnProperty", p = e._.wrap;
		a.getBBox = function(t) {
			if (this.type == "tspan") return e._.box(this.node.getClientRects().item(0));
			if (!e.Matrix || !e.path) return this.node.getBBox();
			var n = this, r = new e.Matrix();
			if (n.removed) return e._.box();
			for (; n.type == "use";) if (t || (r = r.add(n.transform().localMatrix.translate(n.attr("x") || 0, n.attr("y") || 0))), n.original) n = n.original;
			else {
				var i = n.attr("xlink:href");
				n = n.original = n.node.ownerDocument.getElementById(i.substring(i.indexOf("#") + 1));
			}
			var a = n._, o = e.path.get[n.type] || e.path.get.deflt;
			try {
				return t ? (a.bboxwt = o ? e.path.getBBox(n.realPath = o(n)) : e._.box(n.node.getBBox()), e._.box(a.bboxwt)) : (n.realPath = o(n), n.matrix = n.transform().localMatrix, a.bbox = e.path.getBBox(e.path.map(n.realPath, r.add(n.matrix))), e._.box(a.bbox));
			} catch {
				return e._.box();
			}
		};
		var m = function() {
			return this.string;
		};
		function h(t, n) {
			if (n == null) {
				var r = !0;
				if (n = t.type == "linearGradient" || t.type == "radialGradient" ? t.node.getAttribute("gradientTransform") : t.type == "pattern" ? t.node.getAttribute("patternTransform") : t.node.getAttribute("transform"), !n) return new e.Matrix();
				n = e._.svgTransform2string(n);
			} else n = e._.rgTransform.test(n) ? s(n).replace(/\.{3}|\u2026/g, t._.transform || "") : e._.svgTransform2string(n), o(n, "array") && (n = e.path ? e.path.toString.call(n) : s(n)), t._.transform = n;
			var i = e._.transform2matrix(n, t.getBBox(1));
			if (r) return i;
			t.matrix = i;
		}
		a.transform = function(t) {
			var n = this._;
			if (t == null) {
				for (var r = this, i = new e.Matrix(this.node.getCTM()), a = h(this), o = [a], c = new e.Matrix(), u, d = a.toTransformString(), f = s(a) == s(this.matrix) ? s(n.transform) : d; r.type != "svg" && (r = r.parent());) o.push(h(r));
				for (u = o.length; u--;) c.add(o[u]);
				return {
					string: f,
					globalMatrix: i,
					totalMatrix: c,
					localMatrix: a,
					diffMatrix: i.clone().add(a.invert()),
					global: i.toTransformString(),
					total: c.toTransformString(),
					local: d,
					toString: m
				};
			}
			return t instanceof e.Matrix ? (this.matrix = t, this._.transform = t.toTransformString()) : h(this, t), this.node && (this.type == "linearGradient" || this.type == "radialGradient" ? l(this.node, { gradientTransform: this.matrix }) : this.type == "pattern" ? l(this.node, { patternTransform: this.matrix }) : l(this.node, { transform: this.matrix })), this;
		}, a.parent = function() {
			return p(this.node.parentNode);
		}, a.append = a.add = function(e) {
			if (e) {
				if (e.type == "set") {
					var t = this;
					return e.forEach(function(e) {
						t.add(e);
					}), this;
				}
				e = p(e), this.node.appendChild(e.node), e.paper = this.paper;
			}
			return this;
		}, a.appendTo = function(e) {
			return e && (e = p(e), e.append(this)), this;
		}, a.prepend = function(e) {
			if (e) {
				if (e.type == "set") {
					var t = this, n;
					return e.forEach(function(e) {
						n ? n.after(e) : t.prepend(e), n = e;
					}), this;
				}
				e = p(e);
				var r = e.parent();
				this.node.insertBefore(e.node, this.node.firstChild), this.add && this.add(), e.paper = this.paper, this.parent() && this.parent().add(), r && r.add();
			}
			return this;
		}, a.prependTo = function(e) {
			return e = p(e), e.prepend(this), this;
		}, a.before = function(e) {
			if (e.type == "set") {
				var t = this;
				return e.forEach(function(e) {
					var n = e.parent();
					t.node.parentNode.insertBefore(e.node, t.node), n && n.add();
				}), this.parent().add(), this;
			}
			e = p(e);
			var n = e.parent();
			return this.node.parentNode.insertBefore(e.node, this.node), this.parent() && this.parent().add(), n && n.add(), e.paper = this.paper, this;
		}, a.after = function(e) {
			e = p(e);
			var t = e.parent();
			return this.node.nextSibling ? this.node.parentNode.insertBefore(e.node, this.node.nextSibling) : this.node.parentNode.appendChild(e.node), this.parent() && this.parent().add(), t && t.add(), e.paper = this.paper, this;
		}, a.insertBefore = function(e) {
			e = p(e);
			var t = this.parent();
			return e.node.parentNode.insertBefore(this.node, e.node), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this;
		}, a.insertAfter = function(e) {
			e = p(e);
			var t = this.parent();
			return e.node.parentNode.insertBefore(this.node, e.node.nextSibling), this.paper = e.paper, t && t.add(), e.parent() && e.parent().add(), this;
		}, a.remove = function() {
			var e = this.parent();
			return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, e && e.add(), this;
		}, a.select = function(e) {
			return p(this.node.querySelector(e));
		}, a.selectAll = function(t) {
			for (var n = this.node.querySelectorAll(t), r = (e.set || Array)(), i = 0; i < n.length; i++) r.push(p(n[i]));
			return r;
		}, a.asPX = function(e, t) {
			return t ??= this.attr(e), +c(this, e, t);
		}, a.use = function() {
			var e, t = this.node.id;
			return t || (t = this.id, l(this.node, { id: t })), e = this.type == "linearGradient" || this.type == "radialGradient" || this.type == "pattern" ? u(this.type, this.node.parentNode) : u("use", this.node.parentNode), l(e.node, { "xlink:href": "#" + t }), e.original = this, e;
		};
		function _(t) {
			var n = t.selectAll("*"), r, i = /^\s*url\(("|'|)(.*)\1\)\s*$/, a = [], o = {};
			function s(t, n) {
				var r = l(t.node, n);
				if (r &&= r.match(i), r &&= r[2], r && r.charAt() == "#") r = r.substring(1);
				else return;
				r && (o[r] = (o[r] || []).concat(function(r) {
					var i = {};
					i[n] = e.url(r), l(t.node, i);
				}));
			}
			function c(e) {
				var t = l(e.node, "xlink:href");
				if (t && t.charAt() == "#") t = t.substring(1);
				else return;
				t && (o[t] = (o[t] || []).concat(function(t) {
					e.attr("xlink:href", "#" + t);
				}));
			}
			for (var u = 0, d = n.length; u < d; u++) {
				r = n[u], s(r, "fill"), s(r, "stroke"), s(r, "filter"), s(r, "mask"), s(r, "clip-path"), c(r);
				var f = l(r.node, "id");
				f && (l(r.node, { id: r.id }), a.push({
					old: f,
					id: r.id
				}));
			}
			for (u = 0, d = a.length; u < d; u++) {
				var p = o[a[u].old];
				if (p) for (var m = 0, h = p.length; m < h; m++) p[m](a[u].id);
			}
		}
		a.clone = function() {
			var e = p(this.node.cloneNode(!0));
			return l(e.node, "id") && l(e.node, { id: e.id }), _(e), e.insertAfter(this), e;
		}, a.toDefs = function() {
			return d(this).appendChild(this.node), this;
		}, a.pattern = a.toPattern = function(e, t, n, r) {
			var i = u("pattern", d(this));
			return e ??= this.getBBox(), o(e, "object") && "x" in e && (t = e.y, n = e.width, r = e.height, e = e.x), l(i.node, {
				x: e,
				y: t,
				width: n,
				height: r,
				patternUnits: "userSpaceOnUse",
				id: i.id,
				viewBox: [
					e,
					t,
					n,
					r
				].join(" ")
			}), i.node.appendChild(this.node), i;
		}, a.marker = function(e, t, n, r, i, a) {
			var s = u("marker", d(this));
			return e ??= this.getBBox(), o(e, "object") && "x" in e && (t = e.y, n = e.width, r = e.height, i = e.refX || e.cx, a = e.refY || e.cy, e = e.x), l(s.node, {
				viewBox: [
					e,
					t,
					n,
					r
				].join(" "),
				markerWidth: n,
				markerHeight: r,
				orient: "auto",
				refX: i || 0,
				refY: a || 0,
				id: s.id
			}), s.node.appendChild(this.node), s;
		};
		var v = {};
		a.data = function(t, n) {
			var r = v[this.id] = v[this.id] || {};
			if (arguments.length == 0) return eve("snap.data.get." + this.id, this, r, null), r;
			if (arguments.length == 1) {
				if (e.is(t, "object")) {
					for (var i in t) t[f](i) && this.data(i, t[i]);
					return this;
				}
				return eve("snap.data.get." + this.id, this, r[t], t), r[t];
			}
			return r[t] = n, eve("snap.data.set." + this.id, this, n, t), this;
		}, a.removeData = function(e) {
			return e == null ? v[this.id] = {} : v[this.id] && delete v[this.id][e], this;
		}, a.outerSVG = a.toString = y(1), a.innerSVG = y();
		function y(e) {
			return function() {
				var t = e ? "<" + this.type : "", n = this.node.attributes, r = this.node.childNodes;
				if (e) for (var i = 0, a = n.length; i < a; i++) t += " " + n[i].name + "=\"" + n[i].value.replace(/"/g, "\\\"") + "\"";
				if (r.length) {
					for (e && (t += ">"), i = 0, a = r.length; i < a; i++) r[i].nodeType == 3 ? t += r[i].nodeValue : r[i].nodeType == 1 && (t += p(r[i]).toString());
					e && (t += "</" + this.type + ">");
				} else e && (t += "/>");
				return t;
			};
		}
		a.toDataURL = function() {
			if (window && window.btoa) {
				var t = this.getBBox(), n = e.format("<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"{width}\" height=\"{height}\" viewBox=\"{x} {y} {width} {height}\">{contents}</svg>", {
					x: +t.x.toFixed(3),
					y: +t.y.toFixed(3),
					width: +t.width.toFixed(3),
					height: +t.height.toFixed(3),
					contents: this.outerSVG()
				});
				return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(n)));
			}
		}, i.prototype.select = a.select, i.prototype.selectAll = a.selectAll;
	}), i.plugin(function(e, t, n, r, i) {
		var a = Object.prototype.toString, o = String, s = Math, c = "";
		function l(e, t, n, r, i, o) {
			t == null && a.call(e) == "[object SVGMatrix]" ? (this.a = e.a, this.b = e.b, this.c = e.c, this.d = e.d, this.e = e.e, this.f = e.f) : e == null ? (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0) : (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +o);
		}
		(function(t) {
			t.add = function(e, t, n, r, i, a) {
				if (e && e instanceof l) return this.add(e.a, e.b, e.c, e.d, e.e, e.f);
				var o = e * this.a + t * this.c, s = e * this.b + t * this.d;
				return this.e += i * this.a + a * this.c, this.f += i * this.b + a * this.d, this.c = n * this.a + r * this.c, this.d = n * this.b + r * this.d, this.a = o, this.b = s, this;
			}, l.prototype.multLeft = function(e, t, n, r, i, a) {
				if (e && e instanceof l) return this.multLeft(e.a, e.b, e.c, e.d, e.e, e.f);
				var o = e * this.a + n * this.b, s = e * this.c + n * this.d, c = e * this.e + n * this.f + i;
				return this.b = t * this.a + r * this.b, this.d = t * this.c + r * this.d, this.f = t * this.e + r * this.f + a, this.a = o, this.c = s, this.e = c, this;
			}, t.invert = function() {
				var e = this, t = e.a * e.d - e.b * e.c;
				return new l(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t);
			}, t.clone = function() {
				return new l(this.a, this.b, this.c, this.d, this.e, this.f);
			}, t.translate = function(e, t) {
				return this.e += e * this.a + t * this.c, this.f += e * this.b + t * this.d, this;
			}, t.scale = function(e, t, n, r) {
				return t ??= e, (n || r) && this.translate(n, r), this.a *= e, this.b *= e, this.c *= t, this.d *= t, (n || r) && this.translate(-n, -r), this;
			}, t.rotate = function(t, n, r) {
				t = e.rad(t), n ||= 0, r ||= 0;
				var i = +s.cos(t).toFixed(9), a = +s.sin(t).toFixed(9);
				return this.add(i, a, -a, i, n, r), this.add(1, 0, 0, 1, -n, -r);
			}, t.skewX = function(e) {
				return this.skew(e, 0);
			}, t.skewY = function(e) {
				return this.skew(0, e);
			}, t.skew = function(t, n) {
				t ||= 0, n ||= 0, t = e.rad(t), n = e.rad(n);
				var r = s.tan(t).toFixed(9), i = s.tan(n).toFixed(9);
				return this.add(1, i, r, 1, 0, 0);
			}, t.x = function(e, t) {
				return e * this.a + t * this.c + this.e;
			}, t.y = function(e, t) {
				return e * this.b + t * this.d + this.f;
			}, t.get = function(e) {
				return +this[o.fromCharCode(97 + e)].toFixed(4);
			}, t.toString = function() {
				return "matrix(" + [
					this.get(0),
					this.get(1),
					this.get(2),
					this.get(3),
					this.get(4),
					this.get(5)
				].join() + ")";
			}, t.offset = function() {
				return [this.e.toFixed(4), this.f.toFixed(4)];
			};
			function n(e) {
				return e[0] * e[0] + e[1] * e[1];
			}
			function r(e) {
				var t = s.sqrt(n(e));
				e[0] && (e[0] /= t), e[1] && (e[1] /= t);
			}
			t.determinant = function() {
				return this.a * this.d - this.b * this.c;
			}, t.split = function() {
				var t = {};
				t.dx = this.e, t.dy = this.f;
				var i = [[this.a, this.b], [this.c, this.d]];
				t.scalex = s.sqrt(n(i[0])), r(i[0]), t.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * t.shear, i[1][1] - i[0][1] * t.shear], t.scaley = s.sqrt(n(i[1])), r(i[1]), t.shear /= t.scaley, this.determinant() < 0 && (t.scalex = -t.scalex);
				var a = i[0][1], o = i[1][1];
				return o < 0 ? (t.rotate = e.deg(s.acos(o)), a < 0 && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(s.asin(a)), t.isSimple = !+t.shear.toFixed(9) && (t.scalex.toFixed(9) == t.scaley.toFixed(9) || !t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t;
			}, t.toTransformString = function(e) {
				var t = e || this.split();
				return +t.shear.toFixed(9) ? "m" + [
					this.get(0),
					this.get(1),
					this.get(2),
					this.get(3),
					this.get(4),
					this.get(5)
				] : (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [+t.dx.toFixed(4), +t.dy.toFixed(4)] : c) + (t.rotate ? "r" + [
					+t.rotate.toFixed(4),
					0,
					0
				] : c) + (t.scalex != 1 || t.scaley != 1 ? "s" + [
					t.scalex,
					t.scaley,
					0,
					0
				] : c));
			};
		})(l.prototype), e.Matrix = l, e.matrix = function(e, t, n, r, i, a) {
			return new l(e, t, n, r, i, a);
		};
	}), i.plugin(function(e, t, n, r, i) {
		var a = e._.make, o = e._.wrap, s = e.is, c = e._.getSomeDefs, l = /^url\((['"]?)([^)]+)\1\)$/, u = e._.$, d = e.url, f = String, p = e._.separator, m = "";
		e.deurl = function(e) {
			var t = String(e).match(l);
			return t ? t[2] : e;
		}, eve.on("snap.util.attr.mask", function(e) {
			if (e instanceof t || e instanceof i) {
				if (eve.stop(), e instanceof i && e.node.childNodes.length == 1 && (e = e.node.firstChild, c(this).appendChild(e), e = o(e)), e.type == "mask") var n = e;
				else n = a("mask", c(this)), n.node.appendChild(e.node);
				!n.node.id && u(n.node, { id: n.id }), u(this.node, { mask: d(n.id) });
			}
		}), (function(e) {
			eve.on("snap.util.attr.clip", e), eve.on("snap.util.attr.clip-path", e), eve.on("snap.util.attr.clipPath", e);
		})(function(e) {
			if (e instanceof t || e instanceof i) {
				eve.stop();
				for (var n, r = e.node; r;) {
					if (r.nodeName === "clipPath") {
						n = new t(r);
						break;
					}
					if (r.nodeName === "svg") {
						n = void 0;
						break;
					}
					r = r.parentNode;
				}
				n || (n = a("clipPath", c(this)), n.node.appendChild(e.node), !n.node.id && u(n.node, { id: n.id })), u(this.node, { "clip-path": d(n.node.id || n.id) });
			}
		});
		function h(n) {
			return function(r) {
				if (eve.stop(), r instanceof i && r.node.childNodes.length == 1 && (r.node.firstChild.tagName == "radialGradient" || r.node.firstChild.tagName == "linearGradient" || r.node.firstChild.tagName == "pattern") && (r = r.node.firstChild, c(this).appendChild(r), r = o(r)), r instanceof t) {
					if (r.type == "radialGradient" || r.type == "linearGradient" || r.type == "pattern") {
						r.node.id || u(r.node, { id: r.id });
						var a = d(r.node.id);
					} else a = r.attr(n);
				} else if (a = e.color(r), a.error) {
					var s = e(c(this).ownerSVGElement).gradient(r);
					s ? (s.node.id || u(s.node, { id: s.id }), a = d(s.node.id)) : a = r;
				} else a = f(a);
				var l = {};
				l[n] = a, u(this.node, l), this.node.style[n] = m;
			};
		}
		eve.on("snap.util.attr.fill", h("fill")), eve.on("snap.util.attr.stroke", h("stroke"));
		var _ = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
		eve.on("snap.util.grad.parse", function(e) {
			e = f(e);
			var t = e.match(_);
			if (!t) return null;
			var n = t[1], r = t[2], i = t[3];
			r = r.split(/\s*,\s*/).map(function(e) {
				return +e == e ? +e : e;
			}), r.length == 1 && r[0] == 0 && (r = []), i = i.split("-"), i = i.map(function(e) {
				e = e.split(":");
				var t = { color: e[0] };
				return e[1] && (t.offset = parseFloat(e[1])), t;
			});
			var a = i.length, o = 0, s = 0;
			function c(e, t) {
				for (var n = (t - o) / (e - s), r = s; r < e; r++) i[r].offset = +(+o + n * (r - s)).toFixed(2);
				s = e, o = t;
			}
			a--;
			for (var l = 0; l < a; l++) "offset" in i[l] && c(l, i[l].offset);
			return i[a].offset = i[a].offset || 100, c(a, i[a].offset), {
				type: n,
				params: r,
				stops: i
			};
		}), eve.on("snap.util.attr.d", function(t) {
			eve.stop(), s(t, "array") && s(t[0], "array") && (t = e.path.toString.call(t)), t = f(t), t.match(/[ruo]/i) && (t = e.path.toAbsolute(t)), u(this.node, { d: t });
		})(-1), eve.on("snap.util.attr.#text", function(e) {
			eve.stop(), e = f(e);
			for (var t = r.doc.createTextNode(e); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
			this.node.appendChild(t);
		})(-1), eve.on("snap.util.attr.path", function(e) {
			eve.stop(), this.attr({ d: e });
		})(-1), eve.on("snap.util.attr.class", function(e) {
			eve.stop(), this.node.className.baseVal = e;
		})(-1), eve.on("snap.util.attr.viewBox", function(e) {
			var t = s(e, "object") && "x" in e ? [
				e.x,
				e.y,
				e.width,
				e.height
			].join(" ") : s(e, "array") ? e.join(" ") : e;
			u(this.node, { viewBox: t }), eve.stop();
		})(-1), eve.on("snap.util.attr.transform", function(e) {
			this.transform(e), eve.stop();
		})(-1), eve.on("snap.util.attr.r", function(e) {
			this.type == "rect" && (eve.stop(), u(this.node, {
				rx: e,
				ry: e
			}));
		})(-1), eve.on("snap.util.attr.textpath", function(e) {
			if (eve.stop(), this.type == "text") {
				var n, r, i;
				if (!e && this.textPath) {
					for (r = this.textPath; r.node.firstChild;) this.node.appendChild(r.node.firstChild);
					r.remove(), delete this.textPath;
					return;
				}
				if (s(e, "string")) {
					var a = c(this), l = o(a.parentNode).path(e);
					a.appendChild(l.node), n = l.id, l.attr({ id: n });
				} else e = o(e), e instanceof t && (n = e.attr("id"), n || (n = e.id, e.attr({ id: n })));
				if (n) {
					if (r = this.textPath, i = this.node, r) r.attr({ "xlink:href": "#" + n });
					else {
						for (r = u("textPath", { "xlink:href": "#" + n }); i.firstChild;) r.appendChild(i.firstChild);
						i.appendChild(r), this.textPath = o(r);
					}
				}
			}
		})(-1), eve.on("snap.util.attr.text", function(e) {
			if (this.type == "text") {
				for (var t = this.node, n = function(e) {
					var t = u("tspan");
					if (s(e, "array")) for (var i = 0; i < e.length; i++) t.appendChild(n(e[i]));
					else t.appendChild(r.doc.createTextNode(e));
					return t.normalize && t.normalize(), t;
				}; t.firstChild;) t.removeChild(t.firstChild);
				for (var i = n(e); i.firstChild;) t.appendChild(i.firstChild);
			}
			eve.stop();
		})(-1);
		function v(e) {
			eve.stop(), e == +e && (e += "px"), this.node.style.fontSize = e;
		}
		eve.on("snap.util.attr.fontSize", v)(-1), eve.on("snap.util.attr.font-size", v)(-1), eve.on("snap.util.getattr.transform", function() {
			return eve.stop(), this.transform();
		})(-1), eve.on("snap.util.getattr.textpath", function() {
			return eve.stop(), this.textPath;
		})(-1), (function() {
			function t(t) {
				return function() {
					eve.stop();
					var n = r.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + t);
					return n == "none" ? n : e(r.doc.getElementById(n.match(l)[1]));
				};
			}
			function n(e) {
				return function(t) {
					eve.stop();
					var n = "marker" + e.charAt(0).toUpperCase() + e.substring(1);
					if (t == "" || !t) this.node.style[n] = "none";
					else if (t.type == "marker") {
						var r = t.node.id;
						r || u(t.node, { id: t.id }), this.node.style[n] = d(r);
					}
				};
			}
			eve.on("snap.util.getattr.marker-end", t("end"))(-1), eve.on("snap.util.getattr.markerEnd", t("end"))(-1), eve.on("snap.util.getattr.marker-start", t("start"))(-1), eve.on("snap.util.getattr.markerStart", t("start"))(-1), eve.on("snap.util.getattr.marker-mid", t("mid"))(-1), eve.on("snap.util.getattr.markerMid", t("mid"))(-1), eve.on("snap.util.attr.marker-end", n("end"))(-1), eve.on("snap.util.attr.markerEnd", n("end"))(-1), eve.on("snap.util.attr.marker-start", n("start"))(-1), eve.on("snap.util.attr.markerStart", n("start"))(-1), eve.on("snap.util.attr.marker-mid", n("mid"))(-1), eve.on("snap.util.attr.markerMid", n("mid"))(-1);
		})(), eve.on("snap.util.getattr.r", function() {
			if (this.type == "rect" && u(this.node, "rx") == u(this.node, "ry")) return eve.stop(), u(this.node, "rx");
		})(-1);
		function y(e) {
			for (var t = [], n = e.childNodes, r = 0, i = n.length; r < i; r++) {
				var a = n[r];
				a.nodeType == 3 && t.push(a.nodeValue), a.tagName == "tspan" && (a.childNodes.length == 1 && a.firstChild.nodeType == 3 ? t.push(a.firstChild.nodeValue) : t.push(y(a)));
			}
			return t;
		}
		eve.on("snap.util.getattr.text", function() {
			if (this.type == "text" || this.type == "tspan") {
				eve.stop();
				var e = y(this.node);
				return e.length == 1 ? e[0] : e;
			}
		})(-1), eve.on("snap.util.getattr.#text", function() {
			return this.node.textContent;
		})(-1), eve.on("snap.util.getattr.fill", function(t) {
			if (!t) {
				eve.stop();
				var n = eve("snap.util.getattr.fill", this, !0).firstDefined();
				return e(e.deurl(n)) || n;
			}
		})(-1), eve.on("snap.util.getattr.stroke", function(t) {
			if (!t) {
				eve.stop();
				var n = eve("snap.util.getattr.stroke", this, !0).firstDefined();
				return e(e.deurl(n)) || n;
			}
		})(-1), eve.on("snap.util.getattr.viewBox", function() {
			eve.stop();
			var t = u(this.node, "viewBox");
			if (t) return t = t.split(p), e._.box(+t[0], +t[1], +t[2], +t[3]);
		})(-1), eve.on("snap.util.getattr.points", function() {
			var e = u(this.node, "points");
			if (eve.stop(), e) return e.split(p);
		})(-1), eve.on("snap.util.getattr.path", function() {
			var e = u(this.node, "d");
			return eve.stop(), e;
		})(-1), eve.on("snap.util.getattr.class", function() {
			return this.node.className.baseVal;
		})(-1);
		function b() {
			return eve.stop(), this.node.style.fontSize;
		}
		eve.on("snap.util.getattr.fontSize", b)(-1), eve.on("snap.util.getattr.font-size", b)(-1);
	}), i.plugin(function(e, t, n, r, i) {
		var a = /\S+/g, o = String, s = t.prototype;
		s.addClass = function(e) {
			var t = o(e || "").match(a) || [], n = this.node, r = n.className.baseVal, i = r.match(a) || [], s, c, l, u;
			if (t.length) {
				for (s = 0; l = t[s++];) c = i.indexOf(l), ~c || i.push(l);
				u = i.join(" "), r != u && (n.className.baseVal = u);
			}
			return this;
		}, s.removeClass = function(e) {
			var t = o(e || "").match(a) || [], n = this.node, r = n.className.baseVal, i = r.match(a) || [], s, c, l, u;
			if (i.length) {
				for (s = 0; l = t[s++];) c = i.indexOf(l), ~c && i.splice(c, 1);
				u = i.join(" "), r != u && (n.className.baseVal = u);
			}
			return this;
		}, s.hasClass = function(e) {
			return !!~(this.node.className.baseVal.match(a) || []).indexOf(e);
		}, s.toggleClass = function(e, t) {
			if (t != null) return t ? this.addClass(e) : this.removeClass(e);
			for (var n = (e || "").match(a) || [], r = this.node, i = r.className.baseVal, o = i.match(a) || [], s = 0, c, l, u; l = n[s++];) c = o.indexOf(l), ~c ? o.splice(c, 1) : o.push(l);
			return u = o.join(" "), i != u && (r.className.baseVal = u), this;
		};
	}), i.plugin(function(e, t, n, r, i) {
		var a = {
			"+": function(e, t) {
				return e + t;
			},
			"-": function(e, t) {
				return e - t;
			},
			"/": function(e, t) {
				return e / t;
			},
			"*": function(e, t) {
				return e * t;
			}
		}, o = String, s = /[a-z]+$/i, c = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
		function l(e) {
			return e;
		}
		function u(e) {
			return function(t) {
				return +t.toFixed(3) + e;
			};
		}
		eve.on("snap.util.attr", function(e) {
			var t = o(e).match(c);
			if (t) {
				var n = eve.nt(), r = n.substring(n.lastIndexOf(".") + 1), i = this.attr(r), l = {};
				eve.stop();
				var u = t[3] || "", d = i.match(s), f = a[t[1]];
				if (d && d == u ? e = f(parseFloat(i), +t[2]) : (i = this.asPX(r), e = f(this.asPX(r), this.asPX(r, t[2] + u))), isNaN(i) || isNaN(e)) return;
				l[r] = e, this.attr(l);
			}
		})(-10), eve.on("snap.util.equal", function(e, t) {
			var n = o(this.attr(e) || ""), r = o(t).match(c);
			if (r) {
				eve.stop();
				var i = r[3] || "", d = n.match(s), f = a[r[1]];
				return d && d == i ? {
					from: parseFloat(n),
					to: f(parseFloat(n), +r[2]),
					f: u(d)
				} : (n = this.asPX(e), {
					from: n,
					to: f(n, this.asPX(e, r[2] + i)),
					f: l
				});
			}
		})(-10);
	}), i.plugin(function(e, t, n, r, i) {
		var a = n.prototype, o = e.is;
		a.rect = function(e, t, n, r, i, a) {
			var s;
			return a ??= i, o(e, "object") && e == "[object Object]" ? s = e : e != null && (s = {
				x: e,
				y: t,
				width: n,
				height: r
			}, i != null && (s.rx = i, s.ry = a)), this.el("rect", s);
		}, a.circle = function(e, t, n) {
			var r;
			return o(e, "object") && e == "[object Object]" ? r = e : e != null && (r = {
				cx: e,
				cy: t,
				r: n
			}), this.el("circle", r);
		};
		var s = function() {
			function e() {
				this.parentNode.removeChild(this);
			}
			return function(t, n) {
				var i = r.doc.createElement("img"), a = r.doc.body;
				i.style.cssText = "position:absolute;left:-9999em;top:-9999em", i.onload = function() {
					n.call(i), i.onload = i.onerror = null, a.removeChild(i);
				}, i.onerror = e, a.appendChild(i), i.src = t;
			};
		}();
		a.image = function(t, n, r, i, a) {
			var c = this.el("image");
			if (o(t, "object") && "src" in t) c.attr(t);
			else if (t != null) {
				var l = {
					"xlink:href": t,
					preserveAspectRatio: "none"
				};
				n != null && r != null && (l.x = n, l.y = r), i != null && a != null ? (l.width = i, l.height = a) : s(t, function() {
					e._.$(c.node, {
						width: this.offsetWidth,
						height: this.offsetHeight
					});
				}), e._.$(c.node, l);
			}
			return c;
		}, a.ellipse = function(e, t, n, r) {
			var i;
			return o(e, "object") && e == "[object Object]" ? i = e : e != null && (i = {
				cx: e,
				cy: t,
				rx: n,
				ry: r
			}), this.el("ellipse", i);
		}, a.path = function(e) {
			var t;
			return o(e, "object") && !o(e, "array") ? t = e : e && (t = { d: e }), this.el("path", t);
		}, a.group = a.g = function(e) {
			var t = this.el("g");
			return arguments.length == 1 && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t;
		}, a.svg = function(e, t, n, r, i, a, s, c) {
			var l = {};
			return o(e, "object") && t == null ? l = e : (e != null && (l.x = e), t != null && (l.y = t), n != null && (l.width = n), r != null && (l.height = r), i != null && a != null && s != null && c != null && (l.viewBox = [
				i,
				a,
				s,
				c
			])), this.el("svg", l);
		}, a.mask = function(e) {
			var t = this.el("mask");
			return arguments.length == 1 && e && !e.type ? t.attr(e) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t;
		}, a.ptrn = function(e, t, n, r, i, a, s, c) {
			if (o(e, "object")) var l = e;
			else l = { patternUnits: "userSpaceOnUse" }, e && (l.x = e), t && (l.y = t), n != null && (l.width = n), r != null && (l.height = r), i != null && a != null && s != null && c != null ? l.viewBox = [
				i,
				a,
				s,
				c
			] : l.viewBox = [
				e || 0,
				t || 0,
				n || 0,
				r || 0
			];
			return this.el("pattern", l);
		}, a.use = function(n) {
			return n == null ? t.prototype.use.call(this) : (n instanceof t && (n.attr("id") || n.attr({ id: e._.id(n) }), n = n.attr("id")), String(n).charAt() == "#" && (n = n.substring(1)), this.el("use", { "xlink:href": "#" + n }));
		}, a.symbol = function(e, t, n, r) {
			var i = {};
			return e != null && t != null && n != null && r != null && (i.viewBox = [
				e,
				t,
				n,
				r
			]), this.el("symbol", i);
		}, a.text = function(e, t, n) {
			var r = {};
			return o(e, "object") ? r = e : e != null && (r = {
				x: e,
				y: t,
				text: n || ""
			}), this.el("text", r);
		}, a.line = function(e, t, n, r) {
			var i = {};
			return o(e, "object") ? i = e : e != null && (i = {
				x1: e,
				x2: n,
				y1: t,
				y2: r
			}), this.el("line", i);
		}, a.polyline = function(e) {
			arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
			var t = {};
			return o(e, "object") && !o(e, "array") ? t = e : e != null && (t = { points: e }), this.el("polyline", t);
		}, a.polygon = function(e) {
			arguments.length > 1 && (e = Array.prototype.slice.call(arguments, 0));
			var t = {};
			return o(e, "object") && !o(e, "array") ? t = e : e != null && (t = { points: e }), this.el("polygon", t);
		}, (function() {
			var t = e._.$;
			function n() {
				return this.selectAll("stop");
			}
			function r(n, r) {
				var i = t("stop"), a = { offset: +r + "%" };
				n = e.color(n), a["stop-color"] = n.hex, n.opacity < 1 && (a["stop-opacity"] = n.opacity), t(i, a);
				for (var o = this.stops(), s, c = 0; c < o.length; c++) if (parseFloat(o[c].attr("offset")) > r) {
					this.node.insertBefore(i, o[c].node), s = !0;
					break;
				}
				return s || this.node.appendChild(i), this;
			}
			function i() {
				if (this.type == "linearGradient") {
					var n = t(this.node, "x1") || 0, r = t(this.node, "x2") || 1, i = t(this.node, "y1") || 0, a = t(this.node, "y2") || 0;
					return e._.box(n, i, math.abs(r - n), math.abs(a - i));
				}
				var o = this.node.cx || .5, s = this.node.cy || .5, c = this.node.r || 0;
				return e._.box(o - c, s - c, c * 2, c * 2);
			}
			function o(t) {
				var n = t, r = this.stops();
				if (typeof t == "string" && (n = eve("snap.util.grad.parse", null, "l(0,0,0,1)" + t).firstDefined().stops), e.is(n, "array")) {
					for (var i = 0; i < r.length; i++) if (n[i]) {
						var a = e.color(n[i].color), o = { offset: n[i].offset + "%" };
						o["stop-color"] = a.hex, a.opacity < 1 && (o["stop-opacity"] = a.opacity), r[i].attr(o);
					} else r[i].remove();
					for (i = r.length; i < n.length; i++) this.addStop(n[i].color, n[i].offset);
					return this;
				}
			}
			function s(e, n) {
				var r = eve("snap.util.grad.parse", null, n).firstDefined(), i;
				if (!r) return null;
				r.params.unshift(e), i = r.type.toLowerCase() == "l" ? c.apply(0, r.params) : l.apply(0, r.params), r.type != r.type.toLowerCase() && t(i.node, { gradientUnits: "userSpaceOnUse" });
				for (var a = r.stops, o = a.length, s = 0; s < o; s++) {
					var u = a[s];
					i.addStop(u.color, u.offset);
				}
				return i;
			}
			function c(a, s, c, l, u) {
				var d = e._.make("linearGradient", a);
				return d.stops = n, d.addStop = r, d.getBBox = i, d.setStops = o, s != null && t(d.node, {
					x1: s,
					y1: c,
					x2: l,
					y2: u
				}), d;
			}
			function l(a, o, s, c, l, u) {
				var d = e._.make("radialGradient", a);
				return d.stops = n, d.addStop = r, d.getBBox = i, o != null && t(d.node, {
					cx: o,
					cy: s,
					r: c
				}), l != null && u != null && t(d.node, {
					fx: l,
					fy: u
				}), d;
			}
			a.gradient = function(e) {
				return s(this.defs, e);
			}, a.gradientLinear = function(e, t, n, r) {
				return c(this.defs, e, t, n, r);
			}, a.gradientRadial = function(e, t, n, r, i) {
				return l(this.defs, e, t, n, r, i);
			}, a.toString = function() {
				var t = this.node.ownerDocument, n = t.createDocumentFragment(), r = t.createElement("div"), i = this.node.cloneNode(!0), a;
				return n.appendChild(r), r.appendChild(i), e._.$(i, { xmlns: "http://www.w3.org/2000/svg" }), a = r.innerHTML, n.removeChild(n.firstChild), a;
			}, a.toDataURL = function() {
				if (window && window.btoa) return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)));
			}, a.clear = function() {
				for (var e = this.node.firstChild, t; e;) t = e.nextSibling, e.tagName == "defs" ? a.clear.call({ node: e }) : e.parentNode.removeChild(e), e = t;
			};
		})();
	}), i.plugin(function(e, t, n, r) {
		var i = t.prototype, a = e.is, o = e._.clone, s = "hasOwnProperty", c = /,?([a-z]),?/gi, l = parseFloat, u = Math, d = u.PI, f = u.min, p = u.max, m = u.pow, h = u.abs;
		function _(e) {
			var t = _.ps = _.ps || {};
			return t[e] ? t[e].sleep = 100 : t[e] = { sleep: 100 }, setTimeout(function() {
				for (var n in t) t[s](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n]);
			}), t[e];
		}
		function v(e, t, n, r) {
			return e ??= t = n = r = 0, t ?? (t = e.y, n = e.width, r = e.height, e = e.x), {
				x: e,
				y: t,
				width: n,
				w: n,
				height: r,
				h: r,
				x2: e + n,
				y2: t + r,
				cx: e + n / 2,
				cy: t + r / 2,
				r1: u.min(n, r) / 2,
				r2: u.max(n, r) / 2,
				r0: u.sqrt(n * n + r * r) / 2,
				path: I(e, t, n, r),
				vb: [
					e,
					t,
					n,
					r
				].join(" ")
			};
		}
		function y() {
			return this.join(",").replace(c, "$1");
		}
		function b(e) {
			var t = o(e);
			return t.toString = y, t;
		}
		function x(e, t, n, r, i, a, o, s, c) {
			return c == null ? j(e, t, n, r, i, a, o, s) : E(e, t, n, r, i, a, o, s, ee(e, t, n, r, i, a, o, s, c));
		}
		function S(n, r) {
			function i(e) {
				return +(+e).toFixed(3);
			}
			return e._.cacher(function(e, a, o) {
				e instanceof t && (e = e.attr("d")), e = W(e);
				for (var s, c, l, u, d = "", f = {}, p, m = 0, h = 0, _ = e.length; h < _; h++) {
					if (l = e[h], l[0] == "M") s = +l[1], c = +l[2];
					else {
						if (u = x(s, c, l[1], l[2], l[3], l[4], l[5], l[6]), m + u > a) {
							if (r && !f.start) {
								if (p = x(s, c, l[1], l[2], l[3], l[4], l[5], l[6], a - m), d += [
									"C" + i(p.start.x),
									i(p.start.y),
									i(p.m.x),
									i(p.m.y),
									i(p.x),
									i(p.y)
								], o) return d;
								f.start = d, d = [
									"M" + i(p.x),
									i(p.y) + "C" + i(p.n.x),
									i(p.n.y),
									i(p.end.x),
									i(p.end.y),
									i(l[5]),
									i(l[6])
								].join(), m += u, s = +l[5], c = +l[6];
								continue;
							}
							if (!n && !r) return p = x(s, c, l[1], l[2], l[3], l[4], l[5], l[6], a - m), p;
						}
						m += u, s = +l[5], c = +l[6];
					}
					d += l.shift() + l;
				}
				return f.end = d, p = n ? m : r ? f : E(s, c, l[0], l[1], l[2], l[3], l[4], l[5], 1), p;
			}, null, e._.clone);
		}
		var C = S(1), w = S(), T = S(0, 1);
		function E(e, t, n, r, i, a, o, s, c) {
			var l = 1 - c, f = m(l, 3), p = m(l, 2), h = c * c, _ = h * c, v = f * e + p * 3 * c * n + l * 3 * c * c * i + _ * o, y = f * t + p * 3 * c * r + l * 3 * c * c * a + _ * s, b = e + 2 * c * (n - e) + h * (i - 2 * n + e), x = t + 2 * c * (r - t) + h * (a - 2 * r + t), S = n + 2 * c * (i - n) + h * (o - 2 * i + n), C = r + 2 * c * (a - r) + h * (s - 2 * a + r), w = l * e + c * n, T = l * t + c * r, E = l * i + c * o, D = l * a + c * s, O = 90 - u.atan2(b - S, x - C) * 180 / d;
			return {
				x: v,
				y,
				m: {
					x: b,
					y: x
				},
				n: {
					x: S,
					y: C
				},
				start: {
					x: w,
					y: T
				},
				end: {
					x: E,
					y: D
				},
				alpha: O
			};
		}
		function D(t, n, r, i, a, o, s, c) {
			e.is(t, "array") || (t = [
				t,
				n,
				r,
				i,
				a,
				o,
				s,
				c
			]);
			var l = U.apply(null, t);
			return v(l.min.x, l.min.y, l.max.x - l.min.x, l.max.y - l.min.y);
		}
		function O(e, t, n) {
			return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height;
		}
		function k(e, t) {
			return e = v(e), t = v(t), O(t, e.x, e.y) || O(t, e.x2, e.y) || O(t, e.x, e.y2) || O(t, e.x2, e.y2) || O(e, t.x, t.y) || O(e, t.x2, t.y) || O(e, t.x, t.y2) || O(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y);
		}
		function A(e, t, n, r, i) {
			return e * (e * (-3 * t + 9 * n - 9 * r + 3 * i) + 6 * t - 12 * n + 6 * r) - 3 * t + 3 * n;
		}
		function j(e, t, n, r, i, a, o, s, c) {
			c ??= 1, c = c > 1 ? 1 : c < 0 ? 0 : c;
			for (var l = c / 2, d = 12, f = [
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
			], p = [
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
			], m = 0, h = 0; h < d; h++) {
				var _ = l * f[h] + l, v = A(_, e, n, i, o), y = A(_, t, r, a, s), b = v * v + y * y;
				m += p[h] * u.sqrt(b);
			}
			return l * m;
		}
		function ee(e, t, n, r, i, a, o, s, c) {
			if (!(c < 0 || j(e, t, n, r, i, a, o, s) < c)) {
				var l = 1, u = l / 2, d = l - u, f, p = .01;
				for (f = j(e, t, n, r, i, a, o, s, d); h(f - c) > p;) u /= 2, d += (f < c ? 1 : -1) * u, f = j(e, t, n, r, i, a, o, s, d);
				return d;
			}
		}
		function M(e, t, n, r, i, a, o, s) {
			if (!(p(e, n) < f(i, o) || f(e, n) > p(i, o) || p(t, r) < f(a, s) || f(t, r) > p(a, s))) {
				var c = (e * r - t * n) * (i - o) - (e - n) * (i * s - a * o), l = (e * r - t * n) * (a - s) - (t - r) * (i * s - a * o), u = (e - n) * (a - s) - (t - r) * (i - o);
				if (u) {
					var d = c / u, m = l / u, h = +d.toFixed(2), _ = +m.toFixed(2);
					if (!(h < +f(e, n).toFixed(2) || h > +p(e, n).toFixed(2) || h < +f(i, o).toFixed(2) || h > +p(i, o).toFixed(2) || _ < +f(t, r).toFixed(2) || _ > +p(t, r).toFixed(2) || _ < +f(a, s).toFixed(2) || _ > +p(a, s).toFixed(2))) return {
						x: d,
						y: m
					};
				}
			}
		}
		function te(e, t, n) {
			if (!k(D(e), D(t))) return n ? 0 : [];
			for (var r = j.apply(0, e), i = j.apply(0, t), a = ~~(r / 8), o = ~~(i / 8), s = [], c = [], l = {}, u = n ? 0 : [], d = 0; d < a + 1; d++) {
				var f = E.apply(0, e.concat(d / a));
				s.push({
					x: f.x,
					y: f.y,
					t: d / a
				});
			}
			for (d = 0; d < o + 1; d++) f = E.apply(0, t.concat(d / o)), c.push({
				x: f.x,
				y: f.y,
				t: d / o
			});
			for (d = 0; d < a; d++) for (var p = 0; p < o; p++) {
				var m = s[d], _ = s[d + 1], v = c[p], y = c[p + 1], b = h(_.x - m.x) < .001 ? "y" : "x", x = h(y.x - v.x) < .001 ? "y" : "x", S = M(m.x, m.y, _.x, _.y, v.x, v.y, y.x, y.y);
				if (S) {
					if (l[S.x.toFixed(4)] == S.y.toFixed(4)) continue;
					l[S.x.toFixed(4)] = S.y.toFixed(4);
					var C = m.t + h((S[b] - m[b]) / (_[b] - m[b])) * (_.t - m.t), w = v.t + h((S[x] - v[x]) / (y[x] - v[x])) * (y.t - v.t);
					C >= 0 && C <= 1 && w >= 0 && w <= 1 && (n ? u++ : u.push({
						x: S.x,
						y: S.y,
						t1: C,
						t2: w
					}));
				}
			}
			return u;
		}
		function N(e, t) {
			return re(e, t);
		}
		function ne(e, t) {
			return re(e, t, 1);
		}
		function re(e, t, n) {
			e = W(e), t = W(t);
			for (var r, i, a, o, s, c, l, u, d, f, p = n ? 0 : [], m = 0, h = e.length; m < h; m++) {
				var _ = e[m];
				if (_[0] == "M") r = s = _[1], i = c = _[2];
				else {
					_[0] == "C" ? (d = [r, i].concat(_.slice(1)), r = d[6], i = d[7]) : (d = [
						r,
						i,
						r,
						i,
						s,
						c,
						s,
						c
					], r = s, i = c);
					for (var v = 0, y = t.length; v < y; v++) {
						var b = t[v];
						if (b[0] == "M") a = l = b[1], o = u = b[2];
						else {
							b[0] == "C" ? (f = [a, o].concat(b.slice(1)), a = f[6], o = f[7]) : (f = [
								a,
								o,
								a,
								o,
								l,
								u,
								l,
								u
							], a = l, o = u);
							var x = te(d, f, n);
							if (n) p += x;
							else {
								for (var S = 0, C = x.length; S < C; S++) x[S].segment1 = m, x[S].segment2 = v, x[S].bez1 = d, x[S].bez2 = f;
								p = p.concat(x);
							}
						}
					}
				}
			}
			return p;
		}
		function P(e, t, n) {
			var r = F(e);
			return O(r, t, n) && re(e, [[
				"M",
				t,
				n
			], ["H", r.x2 + 10]], 1) % 2 == 1;
		}
		function F(e) {
			var t = _(e);
			if (t.bbox) return o(t.bbox);
			if (!e) return v();
			e = W(e);
			for (var n = 0, r = 0, i = [], a = [], s, c = 0, l = e.length; c < l; c++) if (s = e[c], s[0] == "M") n = s[1], r = s[2], i.push(n), a.push(r);
			else {
				var u = U(n, r, s[1], s[2], s[3], s[4], s[5], s[6]);
				i = i.concat(u.min.x, u.max.x), a = a.concat(u.min.y, u.max.y), n = s[5], r = s[6];
			}
			var d = f.apply(0, i), m = f.apply(0, a), h = p.apply(0, i), y = p.apply(0, a), b = v(d, m, h - d, y - m);
			return t.bbox = o(b), b;
		}
		function I(e, t, n, r, i) {
			if (i) return [
				[
					"M",
					+e + +i,
					t
				],
				[
					"l",
					n - i * 2,
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
					r - i * 2
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
					i * 2 - n,
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
					i * 2 - r
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
			];
			var a = [
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
			return a.toString = y, a;
		}
		function L(e, t, n, r, i) {
			if (i == null && r == null && (r = n), e = +e, t = +t, n = +n, r = +r, i != null) var a = Math.PI / 180, o = e + n * Math.cos(-r * a), s = e + n * Math.cos(-i * a), c = t + n * Math.sin(-r * a), l = t + n * Math.sin(-i * a), u = [[
				"M",
				o,
				c
			], [
				"A",
				n,
				n,
				0,
				+(i - r > 180),
				0,
				s,
				l
			]];
			else u = [
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
			return u.toString = y, u;
		}
		var R = e._unit2px, ie = {
			path: function(e) {
				return e.attr("path");
			},
			circle: function(e) {
				var t = R(e);
				return L(t.cx, t.cy, t.r);
			},
			ellipse: function(e) {
				var t = R(e);
				return L(t.cx || 0, t.cy || 0, t.rx, t.ry);
			},
			rect: function(e) {
				var t = R(e);
				return I(t.x || 0, t.y || 0, t.width, t.height, t.rx, t.ry);
			},
			image: function(e) {
				var t = R(e);
				return I(t.x || 0, t.y || 0, t.width, t.height);
			},
			line: function(e) {
				return "M" + [
					e.attr("x1") || 0,
					e.attr("y1") || 0,
					e.attr("x2"),
					e.attr("y2")
				];
			},
			polyline: function(e) {
				return "M" + e.attr("points");
			},
			polygon: function(e) {
				return "M" + e.attr("points") + "z";
			},
			deflt: function(e) {
				var t = e.node.getBBox();
				return I(t.x, t.y, t.width, t.height);
			}
		};
		function ae(t) {
			var n = _(t), r = String.prototype.toLowerCase;
			if (n.rel) return b(n.rel);
			e.is(t, "array") && e.is(t && t[0], "array") || (t = e.parsePathString(t));
			var i = [], a = 0, o = 0, s = 0, c = 0, l = 0;
			t[0][0] == "M" && (a = t[0][1], o = t[0][2], s = a, c = o, l++, i.push([
				"M",
				a,
				o
			]));
			for (var u = l, d = t.length; u < d; u++) {
				var f = i[u] = [], p = t[u];
				if (p[0] != r.call(p[0])) switch (f[0] = r.call(p[0]), f[0]) {
					case "a":
						f[1] = p[1], f[2] = p[2], f[3] = p[3], f[4] = p[4], f[5] = p[5], f[6] = +(p[6] - a).toFixed(3), f[7] = +(p[7] - o).toFixed(3);
						break;
					case "v":
						f[1] = +(p[1] - o).toFixed(3);
						break;
					case "m": s = p[1], c = p[2];
					default: for (var m = 1, h = p.length; m < h; m++) f[m] = +(p[m] - (m % 2 ? a : o)).toFixed(3);
				}
				else {
					f = i[u] = [], p[0] == "m" && (s = p[1] + a, c = p[2] + o);
					for (var v = 0, x = p.length; v < x; v++) i[u][v] = p[v];
				}
				var S = i[u].length;
				switch (i[u][0]) {
					case "z":
						a = s, o = c;
						break;
					case "h":
						a += +i[u][S - 1];
						break;
					case "v":
						o += +i[u][S - 1];
						break;
					default: a += +i[u][S - 2], o += +i[u][S - 1];
				}
			}
			return i.toString = y, n.rel = b(i), i;
		}
		function z(t) {
			var n = _(t);
			if (n.abs) return b(n.abs);
			if (a(t, "array") && a(t && t[0], "array") || (t = e.parsePathString(t)), !t || !t.length) return [[
				"M",
				0,
				0
			]];
			var r = [], i = 0, o = 0, s = 0, c = 0, l = 0, u;
			t[0][0] == "M" && (i = +t[0][1], o = +t[0][2], s = i, c = o, l++, r[0] = [
				"M",
				i,
				o
			]);
			for (var d = t.length == 3 && t[0][0] == "M" && t[1][0].toUpperCase() == "R" && t[2][0].toUpperCase() == "Z", f, p, m = l, h = t.length; m < h; m++) {
				if (r.push(f = []), p = t[m], u = p[0], u != u.toUpperCase()) switch (f[0] = u.toUpperCase(), f[0]) {
					case "A":
						f[1] = p[1], f[2] = p[2], f[3] = p[3], f[4] = p[4], f[5] = p[5], f[6] = +p[6] + i, f[7] = +p[7] + o;
						break;
					case "V":
						f[1] = +p[1] + o;
						break;
					case "H":
						f[1] = +p[1] + i;
						break;
					case "R":
						for (var v = [i, o].concat(p.slice(1)), x = 2, S = v.length; x < S; x++) v[x] = +v[x] + i, v[++x] = +v[x] + o;
						r.pop(), r = r.concat(K(v, d));
						break;
					case "O":
						r.pop(), v = L(i, o, p[1], p[2]), v.push(v[0]), r = r.concat(v);
						break;
					case "U":
						r.pop(), r = r.concat(L(i, o, p[1], p[2], p[3])), f = ["U"].concat(r[r.length - 1].slice(-2));
						break;
					case "M": s = +p[1] + i, c = +p[2] + o;
					default: for (x = 1, S = p.length; x < S; x++) f[x] = +p[x] + (x % 2 ? i : o);
				}
				else if (u == "R") v = [i, o].concat(p.slice(1)), r.pop(), r = r.concat(K(v, d)), f = ["R"].concat(p.slice(-2));
				else if (u == "O") r.pop(), v = L(i, o, p[1], p[2]), v.push(v[0]), r = r.concat(v);
				else if (u == "U") r.pop(), r = r.concat(L(i, o, p[1], p[2], p[3])), f = ["U"].concat(r[r.length - 1].slice(-2));
				else for (var C = 0, w = p.length; C < w; C++) f[C] = p[C];
				if (u = u.toUpperCase(), u != "O") switch (f[0]) {
					case "Z":
						i = +s, o = +c;
						break;
					case "H":
						i = f[1];
						break;
					case "V":
						o = f[1];
						break;
					case "M": s = f[f.length - 2], c = f[f.length - 1];
					default: i = f[f.length - 2], o = f[f.length - 1];
				}
			}
			return r.toString = y, n.abs = b(r), r;
		}
		function B(e, t, n, r) {
			return [
				e,
				t,
				n,
				r,
				n,
				r
			];
		}
		function V(e, t, n, r, i, a) {
			var o = 1 / 3, s = 2 / 3;
			return [
				o * e + s * n,
				o * t + s * r,
				o * i + s * n,
				o * a + s * r,
				i,
				a
			];
		}
		function H(t, n, r, i, a, o, s, c, l, f) {
			var p = d * 120 / 180, m = d / 180 * (+a || 0), _ = [], v, y = e._.cacher(function(e, t, n) {
				return {
					x: e * u.cos(n) - t * u.sin(n),
					y: e * u.sin(n) + t * u.cos(n)
				};
			});
			if (!r || !i) return [
				t,
				n,
				c,
				l,
				c,
				l
			];
			if (f) O = f[0], k = f[1], E = f[2], D = f[3];
			else {
				v = y(t, n, -m), t = v.x, n = v.y, v = y(c, l, -m), c = v.x, l = v.y, u.cos(d / 180 * a), u.sin(d / 180 * a);
				var b = (t - c) / 2, x = (n - l) / 2, S = b * b / (r * r) + x * x / (i * i);
				S > 1 && (S = u.sqrt(S), r = S * r, i = S * i);
				var C = r * r, w = i * i, T = (o == s ? -1 : 1) * u.sqrt(h((C * w - C * x * x - w * b * b) / (C * x * x + w * b * b))), E = T * r * x / i + (t + c) / 2, D = T * -i * b / r + (n + l) / 2, O = u.asin(((n - D) / i).toFixed(9)), k = u.asin(((l - D) / i).toFixed(9));
				O = t < E ? d - O : O, k = c < E ? d - k : k, O < 0 && (O = d * 2 + O), k < 0 && (k = d * 2 + k), s && O > k && (O -= d * 2), !s && k > O && (k -= d * 2);
			}
			var A = k - O;
			if (h(A) > p) {
				var j = k, ee = c, M = l;
				k = O + p * (s && k > O ? 1 : -1), c = E + r * u.cos(k), l = D + i * u.sin(k), _ = H(c, l, r, i, a, 0, s, ee, M, [
					k,
					j,
					E,
					D
				]);
			}
			A = k - O;
			var te = u.cos(O), N = u.sin(O), ne = u.cos(k), re = u.sin(k), P = u.tan(A / 4), F = 4 / 3 * r * P, I = 4 / 3 * i * P, L = [t, n], R = [t + F * N, n - I * te], ie = [c + F * re, l - I * ne], ae = [c, l];
			if (R[0] = 2 * L[0] - R[0], R[1] = 2 * L[1] - R[1], f) return [
				R,
				ie,
				ae
			].concat(_);
			_ = [
				R,
				ie,
				ae
			].concat(_).join().split(",");
			for (var z = [], B = 0, V = _.length; B < V; B++) z[B] = B % 2 ? y(_[B - 1], _[B], m).y : y(_[B], _[B + 1], m).x;
			return z;
		}
		function U(e, t, n, r, i, a, o, s) {
			for (var c = [], l = [[], []], d, m, _, v, y, b, x, S, C = 0; C < 2; ++C) if (C == 0 ? (m = 6 * e - 12 * n + 6 * i, d = -3 * e + 9 * n - 9 * i + 3 * o, _ = 3 * n - 3 * e) : (m = 6 * t - 12 * r + 6 * a, d = -3 * t + 9 * r - 9 * a + 3 * s, _ = 3 * r - 3 * t), h(d) < 1e-12) {
				if (h(m) < 1e-12) continue;
				v = -_ / m, 0 < v && v < 1 && c.push(v);
			} else x = m * m - 4 * _ * d, S = u.sqrt(x), !(x < 0) && (y = (-m + S) / (2 * d), 0 < y && y < 1 && c.push(y), b = (-m - S) / (2 * d), 0 < b && b < 1 && c.push(b));
			for (var w = c.length, T = w, E; w--;) v = c[w], E = 1 - v, l[0][w] = E * E * E * e + 3 * E * E * v * n + 3 * E * v * v * i + v * v * v * o, l[1][w] = E * E * E * t + 3 * E * E * v * r + 3 * E * v * v * a + v * v * v * s;
			return l[0][T] = e, l[1][T] = t, l[0][T + 1] = o, l[1][T + 1] = s, l[0].length = l[1].length = T + 2, {
				min: {
					x: f.apply(0, l[0]),
					y: f.apply(0, l[1])
				},
				max: {
					x: p.apply(0, l[0]),
					y: p.apply(0, l[1])
				}
			};
		}
		function W(e, t) {
			var n = !t && _(e);
			if (!t && n.curve) return b(n.curve);
			for (var r = z(e), i = t && z(t), a = {
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
						e = ["C"].concat(H.apply(0, [t.x, t.y].concat(e.slice(1))));
						break;
					case "S":
						n == "C" || n == "S" ? (r = t.x * 2 - t.bx, i = t.y * 2 - t.by) : (r = t.x, i = t.y), e = [
							"C",
							r,
							i
						].concat(e.slice(1));
						break;
					case "T":
						n == "Q" || n == "T" ? (t.qx = t.x * 2 - t.qx, t.qy = t.y * 2 - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"].concat(V(t.x, t.y, t.qx, t.qy, e[1], e[2]));
						break;
					case "Q":
						t.qx = e[1], t.qy = e[2], e = ["C"].concat(V(t.x, t.y, e[1], e[2], e[3], e[4]));
						break;
					case "L":
						e = ["C"].concat(B(t.x, t.y, e[1], e[2]));
						break;
					case "H":
						e = ["C"].concat(B(t.x, t.y, e[1], t.y));
						break;
					case "V":
						e = ["C"].concat(B(t.x, t.y, t.x, e[1]));
						break;
					case "Z": e = ["C"].concat(B(t.x, t.y, t.X, t.Y));
				}
				return e;
			}, c = function(e, t) {
				if (e[t].length > 7) {
					e[t].shift();
					for (var n = e[t]; n.length;) d[t] = "A", i && (f[t] = "A"), e.splice(t++, 0, ["C"].concat(n.splice(0, 6)));
					e.splice(t, 1), y = p(r.length, i && i.length || 0);
				}
			}, u = function(e, t, n, a, o) {
				e && t && e[o][0] == "M" && t[o][0] != "M" && (t.splice(o, 0, [
					"M",
					a.x,
					a.y
				]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], y = p(r.length, i && i.length || 0));
			}, d = [], f = [], m = "", h = "", v = 0, y = p(r.length, i && i.length || 0); v < y; v++) {
				r[v] && (m = r[v][0]), m != "C" && (d[v] = m, v && (h = d[v - 1])), r[v] = s(r[v], a, h), d[v] != "A" && m == "C" && (d[v] = "C"), c(r, v), i && (i[v] && (m = i[v][0]), m != "C" && (f[v] = m, v && (h = f[v - 1])), i[v] = s(i[v], o, h), f[v] != "A" && m == "C" && (f[v] = "C"), c(i, v)), u(r, i, a, o, v), u(i, r, o, a, v);
				var x = r[v], S = i && i[v], C = x.length, w = i && S.length;
				a.x = x[C - 2], a.y = x[C - 1], a.bx = l(x[C - 4]) || a.x, a.by = l(x[C - 3]) || a.y, o.bx = i && (l(S[w - 4]) || o.x), o.by = i && (l(S[w - 3]) || o.y), o.x = i && S[w - 2], o.y = i && S[w - 1];
			}
			return i || (n.curve = b(r)), i ? [r, i] : r;
		}
		function G(e, t) {
			if (!t) return e;
			var n, r, i, a, o, s, c;
			for (e = W(e), i = 0, o = e.length; i < o; i++) for (c = e[i], a = 1, s = c.length; a < s; a += 2) n = t.x(c[a], c[a + 1]), r = t.y(c[a], c[a + 1]), c[a] = n, c[a + 1] = r;
			return e;
		}
		function K(e, t) {
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
		e.path = _, e.path.getTotalLength = C, e.path.getPointAtLength = w, e.path.getSubpath = function(e, t, n) {
			if (this.getTotalLength(e) - n < 1e-6) return T(e, t).end;
			var r = T(e, n, 1);
			return t ? T(r, t).end : r;
		}, i.getTotalLength = function() {
			if (this.node.getTotalLength) return this.node.getTotalLength();
		}, i.getPointAtLength = function(e) {
			return w(this.attr("d"), e);
		}, i.getSubpath = function(t, n) {
			return e.path.getSubpath(this.attr("d"), t, n);
		}, e._.box = v, e.path.findDotsAtSegment = E, e.path.bezierBBox = D, e.path.isPointInsideBBox = O, e.closest = function(t, n, r, i) {
			for (var a = 100, o = v(t - a / 2, n - a / 2, a, a), s = [], c = r[0].hasOwnProperty("x") ? function(e) {
				return {
					x: r[e].x,
					y: r[e].y
				};
			} : function(e) {
				return {
					x: r[e],
					y: i[e]
				};
			}, l = 0; a <= 1e6 && !l;) {
				for (var u = 0, d = r.length; u < d; u++) {
					var f = c(u);
					if (O(o, f.x, f.y)) {
						l++, s.push(f);
						break;
					}
				}
				l || (a *= 2, o = v(t - a / 2, n - a / 2, a, a));
			}
			if (a != 1e6) {
				var p = Infinity, m;
				for (u = 0, d = s.length; u < d; u++) {
					var h = e.len(t, n, s[u].x, s[u].y);
					p > h && (p = h, s[u].len = h, m = s[u]);
				}
				return m;
			}
		}, e.path.isBBoxIntersect = k, e.path.intersection = N, e.path.intersectionNumber = ne, e.path.isPointInside = P, e.path.getBBox = F, e.path.get = ie, e.path.toRelative = ae, e.path.toAbsolute = z, e.path.toCubic = W, e.path.map = G, e.path.toString = y, e.path.clone = b;
	}), i.plugin(function(e, t, n, i) {
		var a = Math.max, o = Math.min, s = function(e) {
			if (this.items = [], this.bindings = {}, this.length = 0, this.type = "set", e) for (var t = 0, n = e.length; t < n; t++) e[t] && (this[this.items.length] = this.items[this.items.length] = e[t], this.length++);
		}, c = s.prototype;
		c.push = function() {
			for (var e, t, n = 0, r = arguments.length; n < r; n++) e = arguments[n], e && (t = this.items.length, this[t] = this.items[t] = e, this.length++);
			return this;
		}, c.pop = function() {
			return this.length && delete this[this.length--], this.items.pop();
		}, c.forEach = function(e, t) {
			for (var n = 0, r = this.items.length; n < r; n++) if (e.call(t, this.items[n], n) === !1) return this;
			return this;
		}, c.animate = function(t, n, i, a) {
			typeof i == "function" && !i.length && (a = i, i = r.linear), t instanceof e._.Animation && (a = t.callback, i = t.easing, n = i.dur, t = t.attr);
			var o = arguments;
			if (e.is(t, "array") && e.is(o[o.length - 1], "array")) var s = !0;
			var c, l = function() {
				c ? this.b = c : c = this.b;
			}, u = 0, d = this, f = a && function() {
				++u == d.length && a.call(this);
			};
			return this.forEach(function(e, r) {
				eve.once("snap.animcreated." + e.id, l), s ? o[r] && e.animate.apply(e, o[r]) : e.animate(t, n, i, f);
			});
		}, c.remove = function() {
			for (; this.length;) this.pop().remove();
			return this;
		}, c.bind = function(e, t, n) {
			var r = {};
			if (typeof t == "function") this.bindings[e] = t;
			else {
				var i = n || e;
				this.bindings[e] = function(e) {
					r[i] = e, t.attr(r);
				};
			}
			return this;
		}, c.attr = function(e) {
			var t = {};
			for (var n in e) this.bindings[n] ? this.bindings[n](e[n]) : t[n] = e[n];
			for (var r = 0, i = this.items.length; r < i; r++) this.items[r].attr(t);
			return this;
		}, c.clear = function() {
			for (; this.length;) this.pop();
		}, c.splice = function(e, t, n) {
			e = e < 0 ? a(this.length + e, 0) : e, t = a(0, o(this.length - e, t));
			for (var r = [], i = [], c = [], l = 2; l < arguments.length; l++) c.push(arguments[l]);
			for (l = 0; l < t; l++) i.push(this[e + l]);
			for (; l < this.length - e; l++) r.push(this[e + l]);
			var u = c.length;
			for (l = 0; l < u + r.length; l++) this.items[e + l] = this[e + l] = l < u ? c[l] : r[l - u];
			for (l = this.items.length = this.length -= t - u; this[l];) delete this[l++];
			return new s(i);
		}, c.exclude = function(e) {
			for (var t = 0, n = this.length; t < n; t++) if (this[t] == e) return this.splice(t, 1), !0;
			return !1;
		}, c.insertAfter = function(e) {
			for (var t = this.items.length; t--;) this.items[t].insertAfter(e);
			return this;
		}, c.getBBox = function() {
			for (var e = [], t = [], n = [], r = [], i = this.items.length; i--;) if (!this.items[i].removed) {
				var s = this.items[i].getBBox();
				e.push(s.x), t.push(s.y), n.push(s.x + s.width), r.push(s.y + s.height);
			}
			return e = o.apply(0, e), t = o.apply(0, t), n = a.apply(0, n), r = a.apply(0, r), {
				x: e,
				y: t,
				x2: n,
				y2: r,
				width: n - e,
				height: r - t,
				cx: e + (n - e) / 2,
				cy: t + (r - t) / 2
			};
		}, c.clone = function(e) {
			e = new s();
			for (var t = 0, n = this.items.length; t < n; t++) e.push(this.items[t].clone());
			return e;
		}, c.toString = function() {
			return "Snap‘s set";
		}, c.type = "set", e.Set = s, e.set = function() {
			var e = new s();
			return arguments.length && e.push.apply(e, Array.prototype.slice.call(arguments, 0)), e;
		};
	}), i.plugin(function(e, t, n, r) {
		var i = {}, a = /[%a-z]+$/i, o = String;
		i.stroke = i.fill = "colour";
		function s(e) {
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
		}
		function c(t, n, r) {
			t ||= new e.Matrix(), n ||= new e.Matrix(), t = e.parseTransformString(t.toTransformString()) || [], n = e.parseTransformString(n.toTransformString()) || [];
			for (var i = Math.max(t.length, n.length), a = [], o = [], c = 0, l, u, d, f; c < i; c++) {
				if (d = t[c] || s(n[c]), f = n[c] || s(d), d[0] != f[0] || d[0].toLowerCase() == "r" && (d[2] != f[2] || d[3] != f[3]) || d[0].toLowerCase() == "s" && (d[3] != f[3] || d[4] != f[4])) {
					t = e._.transform2matrix(t, r()), n = e._.transform2matrix(n, r()), a = [[
						"m",
						t.a,
						t.b,
						t.c,
						t.d,
						t.e,
						t.f
					]], o = [[
						"m",
						n.a,
						n.b,
						n.c,
						n.d,
						n.e,
						n.f
					]];
					break;
				}
				for (a[c] = [], o[c] = [], l = 0, u = Math.max(d.length, f.length); l < u; l++) l in d && (a[c][l] = d[l]), l in f && (o[c][l] = f[l]);
			}
			return {
				from: m(a),
				to: m(o),
				f: p(a)
			};
		}
		function l(e) {
			return e;
		}
		function u(e) {
			return function(t) {
				return +t.toFixed(3) + e;
			};
		}
		function d(e) {
			return e.join(" ");
		}
		function f(t) {
			return e.rgb(t[0], t[1], t[2], t[3]);
		}
		function p(e) {
			var t = 0, n, r, i, a, o, s, c = [];
			for (n = 0, r = e.length; n < r; n++) {
				for (o = "[", s = ["\"" + e[n][0] + "\""], i = 1, a = e[n].length; i < a; i++) s[i] = "val[" + t++ + "]";
				o += s + "]", c[n] = o;
			}
			return Function("val", "return Snap.path.toString.call([" + c + "])");
		}
		function m(e) {
			for (var t = [], n = 0, r = e.length; n < r; n++) for (var i = 1, a = e[n].length; i < a; i++) t.push(e[n][i]);
			return t;
		}
		function h(e) {
			return isFinite(e);
		}
		function _(t, n) {
			return !e.is(t, "array") || !e.is(n, "array") ? !1 : t.toString() == n.toString();
		}
		t.prototype.equal = function(e, t) {
			return eve("snap.util.equal", this, e, t).firstDefined();
		}, eve.on("snap.util.equal", function(t, n) {
			var r, s, v = o(this.attr(t) || ""), y = this;
			if (i[t] == "colour") return r = e.color(v), s = e.color(n), {
				from: [
					r.r,
					r.g,
					r.b,
					r.opacity
				],
				to: [
					s.r,
					s.g,
					s.b,
					s.opacity
				],
				f
			};
			if (t == "viewBox") return r = this.attr(t).vb.split(" ").map(Number), s = n.split(" ").map(Number), {
				from: r,
				to: s,
				f: d
			};
			if (t == "transform" || t == "gradientTransform" || t == "patternTransform") return typeof n == "string" && (n = o(n).replace(/\.{3}|\u2026/g, v)), v = this.matrix, n = e._.rgTransform.test(n) ? e._.transform2matrix(n, this.getBBox()) : e._.transform2matrix(e._.svgTransform2string(n), this.getBBox()), c(v, n, function() {
				return y.getBBox(1);
			});
			if (t == "d" || t == "path") return r = e.path.toCubic(v, n), {
				from: m(r[0]),
				to: m(r[1]),
				f: p(r[0])
			};
			if (t == "points") return r = o(v).split(e._.separator), s = o(n).split(e._.separator), {
				from: r,
				to: s,
				f: function(e) {
					return e;
				}
			};
			if (h(v) && h(n)) return {
				from: parseFloat(v),
				to: parseFloat(n),
				f: l
			};
			var b = v.match(a), x = o(n).match(a);
			return b && _(b, x) ? {
				from: parseFloat(v),
				to: parseFloat(n),
				f: u(b)
			} : {
				from: this.asPX(t),
				to: this.asPX(t, n),
				f: l
			};
		});
	}), i.plugin(function(e, t, n, r) {
		for (var i = t.prototype, a = "hasOwnProperty", o = ("createTouch" in r.doc), s = [
			"click",
			"dblclick",
			"mousedown",
			"mousemove",
			"mouseout",
			"mouseover",
			"mouseup",
			"touchstart",
			"touchmove",
			"touchend",
			"touchcancel"
		], c = {
			mousedown: "touchstart",
			mousemove: "touchmove",
			mouseup: "touchend"
		}, l = function(e, t) {
			var n = e == "y" ? "scrollTop" : "scrollLeft", i = t && t.node ? t.node.ownerDocument : r.doc;
			return i[n in i.documentElement ? "documentElement" : "body"][n];
		}, u = function() {
			return this.originalEvent.preventDefault();
		}, d = function() {
			return this.originalEvent.stopPropagation();
		}, f = function(e, t, n, r) {
			var i = o && c[t] ? c[t] : t, s = function(i) {
				var s = l("y", r), f = l("x", r);
				if (o && c[a](t)) {
					for (var p = 0, m = i.targetTouches && i.targetTouches.length; p < m; p++) if (i.targetTouches[p].target == e || e.contains(i.targetTouches[p].target)) {
						var h = i;
						i = i.targetTouches[p], i.originalEvent = h, i.preventDefault = u, i.stopPropagation = d;
						break;
					}
				}
				var _ = i.clientX + f, v = i.clientY + s;
				return n.call(r, i, _, v);
			};
			return t !== i && e.addEventListener(t, s, !1), e.addEventListener(i, s, !1), function() {
				return t !== i && e.removeEventListener(t, s, !1), e.removeEventListener(i, s, !1), !0;
			};
		}, p = [], m = function(e) {
			for (var t = e.clientX, n = e.clientY, r = l("y"), i = l("x"), a, s = p.length; s--;) {
				if (a = p[s], o) {
					for (var c = e.touches && e.touches.length, u; c--;) if (u = e.touches[c], u.identifier == a.el._drag.id || a.el.node.contains(u.target)) {
						t = u.clientX, n = u.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
						break;
					}
				} else e.preventDefault();
				var d = a.el.node;
				d.nextSibling, d.parentNode, d.style.display, t += i, n += r, eve("snap.drag.move." + a.el.id, a.move_scope || a.el, t - a.el._drag.x, n - a.el._drag.y, t, n, e);
			}
		}, h = function(t) {
			e.unmousemove(m).unmouseup(h);
			for (var n = p.length, r; n--;) r = p[n], r.el._drag = {}, eve("snap.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, t), eve.off("snap.drag.*." + r.el.id);
			p = [];
		}, _ = s.length; _--;) (function(t) {
			e[t] = i[t] = function(n, r) {
				if (e.is(n, "function")) this.events = this.events || [], this.events.push({
					name: t,
					f: n,
					unbind: f(this.node || document, t, n, r || this)
				});
				else for (var i = 0, a = this.events.length; i < a; i++) if (this.events[i].name == t) try {
					this.events[i].f.call(this);
				} catch {}
				return this;
			}, e["un" + t] = i["un" + t] = function(e) {
				for (var n = this.events || [], r = n.length; r--;) if (n[r].name == t && (n[r].f == e || !e)) return n[r].unbind(), n.splice(r, 1), !n.length && delete this.events, this;
				return this;
			};
		})(s[_]);
		i.hover = function(e, t, n, r) {
			return this.mouseover(e, n).mouseout(t, r || n);
		}, i.unhover = function(e, t) {
			return this.unmouseover(e).unmouseout(t);
		};
		var v = [];
		i.drag = function(t, n, r, i, a, o) {
			var s = this;
			if (!arguments.length) {
				var c;
				return s.drag(function(e, t) {
					this.attr({ transform: c + (c ? "T" : "t") + [e, t] });
				}, function() {
					c = this.transform().local;
				});
			}
			function l(c, l, u) {
				(c.originalEvent || c).preventDefault(), s._drag.x = l, s._drag.y = u, s._drag.id = c.identifier, !p.length && e.mousemove(m).mouseup(h), p.push({
					el: s,
					move_scope: i,
					start_scope: a,
					end_scope: o
				}), n && eve.on("snap.drag.start." + s.id, n), t && eve.on("snap.drag.move." + s.id, t), r && eve.on("snap.drag.end." + s.id, r), eve("snap.drag.start." + s.id, a || i || s, l, u, c);
			}
			function u(e, t, n) {
				eve("snap.draginit." + s.id, s, e, t, n);
			}
			return eve.on("snap.draginit." + s.id, l), s._drag = {}, v.push({
				el: s,
				start: l,
				init: u
			}), s.mousedown(u), s;
		}, i.undrag = function() {
			for (var t = v.length; t--;) v[t].el == this && (this.unmousedown(v[t].init), v.splice(t, 1), eve.unbind("snap.drag.*." + this.id), eve.unbind("snap.draginit." + this.id));
			return !v.length && e.unmousemove(m).unmouseup(h), this;
		};
	}), i.plugin(function(e, t, n, r) {
		t.prototype;
		var i = n.prototype, a = /^\s*url\((.+)\)/, o = String, s = e._.$;
		e.filter = {}, i.filter = function(n) {
			var r = this;
			r.type != "svg" && (r = r.paper);
			var i = e.parse(o(n)), a = e._.id();
			r.node.offsetWidth, r.node.offsetHeight;
			var c = s("filter");
			return s(c, {
				id: a,
				filterUnits: "userSpaceOnUse"
			}), c.appendChild(i.node), r.defs.appendChild(c), new t(c);
		}, eve.on("snap.util.getattr.filter", function() {
			eve.stop();
			var t = s(this.node, "filter");
			if (t) {
				var n = o(t).match(a);
				return n && e.select(n[1]);
			}
		}), eve.on("snap.util.attr.filter", function(n) {
			if (n instanceof t && n.type == "filter") {
				eve.stop();
				var r = n.node.id;
				r ||= (s(n.node, { id: n.id }), n.id), s(this.node, { filter: e.url(r) });
			}
			n && n != "none" || (eve.stop(), this.node.removeAttribute("filter"));
		}), e.filter.blur = function(t, n) {
			t ??= 2;
			var r = n == null ? t : [t, n];
			return e.format("<feGaussianBlur stdDeviation=\"{def}\"/>", { def: r });
		}, e.filter.blur.toString = function() {
			return this();
		}, e.filter.shadow = function(t, n, r, i, a) {
			return a ?? (i == null ? (a = r, r = 4, i = "#000") : (a = i, i = r, r = 4)), r ??= 4, a ??= 1, t ?? (t = 0, n = 2), n ??= t, i = e.color(i), e.format("<feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"{blur}\"/><feOffset dx=\"{dx}\" dy=\"{dy}\" result=\"offsetblur\"/><feFlood flood-color=\"{color}\"/><feComposite in2=\"offsetblur\" operator=\"in\"/><feComponentTransfer><feFuncA type=\"linear\" slope=\"{opacity}\"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in=\"SourceGraphic\"/></feMerge>", {
				color: i,
				dx: t,
				dy: n,
				blur: r,
				opacity: a
			});
		}, e.filter.shadow.toString = function() {
			return this();
		}, e.filter.grayscale = function(t) {
			return t ??= 1, e.format("<feColorMatrix type=\"matrix\" values=\"{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0\"/>", {
				a: .2126 + .7874 * (1 - t),
				b: .7152 - .7152 * (1 - t),
				c: .0722 - .0722 * (1 - t),
				d: .2126 - .2126 * (1 - t),
				e: .7152 + .2848 * (1 - t),
				f: .0722 - .0722 * (1 - t),
				g: .2126 - .2126 * (1 - t),
				h: .0722 + .9278 * (1 - t)
			});
		}, e.filter.grayscale.toString = function() {
			return this();
		}, e.filter.sepia = function(t) {
			return t ??= 1, e.format("<feColorMatrix type=\"matrix\" values=\"{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0\"/>", {
				a: .393 + .607 * (1 - t),
				b: .769 - .769 * (1 - t),
				c: .189 - .189 * (1 - t),
				d: .349 - .349 * (1 - t),
				e: .686 + .314 * (1 - t),
				f: .168 - .168 * (1 - t),
				g: .272 - .272 * (1 - t),
				h: .534 - .534 * (1 - t),
				i: .131 + .869 * (1 - t)
			});
		}, e.filter.sepia.toString = function() {
			return this();
		}, e.filter.saturate = function(t) {
			return t ??= 1, e.format("<feColorMatrix type=\"saturate\" values=\"{amount}\"/>", { amount: 1 - t });
		}, e.filter.saturate.toString = function() {
			return this();
		}, e.filter.hueRotate = function(t) {
			return t ||= 0, e.format("<feColorMatrix type=\"hueRotate\" values=\"{angle}\"/>", { angle: t });
		}, e.filter.hueRotate.toString = function() {
			return this();
		}, e.filter.invert = function(t) {
			return t ??= 1, e.format("<feComponentTransfer><feFuncR type=\"table\" tableValues=\"{amount} {amount2}\"/><feFuncG type=\"table\" tableValues=\"{amount} {amount2}\"/><feFuncB type=\"table\" tableValues=\"{amount} {amount2}\"/></feComponentTransfer>", {
				amount: t,
				amount2: 1 - t
			});
		}, e.filter.invert.toString = function() {
			return this();
		}, e.filter.brightness = function(t) {
			return t ??= 1, e.format("<feComponentTransfer><feFuncR type=\"linear\" slope=\"{amount}\"/><feFuncG type=\"linear\" slope=\"{amount}\"/><feFuncB type=\"linear\" slope=\"{amount}\"/></feComponentTransfer>", { amount: t });
		}, e.filter.brightness.toString = function() {
			return this();
		}, e.filter.contrast = function(t) {
			return t ??= 1, e.format("<feComponentTransfer><feFuncR type=\"linear\" slope=\"{amount}\" intercept=\"{amount2}\"/><feFuncG type=\"linear\" slope=\"{amount}\" intercept=\"{amount2}\"/><feFuncB type=\"linear\" slope=\"{amount}\" intercept=\"{amount2}\"/></feComponentTransfer>", {
				amount: t,
				amount2: .5 - t / 2
			});
		}, e.filter.contrast.toString = function() {
			return this();
		};
	}), i.plugin(function(e, t, n, r, i) {
		var a = e._.box, o = e.is, s = /^[^a-z]*([tbmlrc])/i, c = function() {
			return "T" + this.dx + "," + this.dy;
		};
		t.prototype.getAlign = function(e, t) {
			t == null && o(e, "string") && (t = e, e = null), e ||= this.paper;
			var n = e.getBBox ? e.getBBox() : a(e), r = this.getBBox(), i = {};
			switch (t &&= t.match(s), t = t ? t[1].toLowerCase() : "c", t) {
				case "t":
					i.dx = 0, i.dy = n.y - r.y;
					break;
				case "b":
					i.dx = 0, i.dy = n.y2 - r.y2;
					break;
				case "m":
					i.dx = 0, i.dy = n.cy - r.cy;
					break;
				case "l":
					i.dx = n.x - r.x, i.dy = 0;
					break;
				case "r":
					i.dx = n.x2 - r.x2, i.dy = 0;
					break;
				default: i.dx = n.cx - r.cx, i.dy = 0;
			}
			return i.toString = c, i;
		}, t.prototype.align = function(e, t) {
			return this.transform("..." + this.getAlign(e, t));
		};
	}), i.plugin(function(e, t, n, i, a) {
		var o = t.prototype, s = e.is, c = String, l = "hasOwnProperty";
		function u(e, t, n) {
			return function(r) {
				var i = r.slice(e, t);
				return i.length == 1 && (i = i[0]), n ? n(i) : i;
			};
		}
		var d = function(e, t, n, i) {
			typeof n == "function" && !n.length && (i = n, n = r.linear), this.attr = e, this.dur = t, n && (this.easing = n), i && (this.callback = i);
		};
		e._.Animation = d, e.animation = function(e, t, n, r) {
			return new d(e, t, n, r);
		}, o.inAnim = function() {
			var e = this, t = [];
			for (var n in e.anims) e.anims[l](n) && (function(e) {
				t.push({
					anim: new d(e._attrs, e.dur, e.easing, e._callback),
					mina: e,
					curStatus: e.status(),
					status: function(t) {
						return e.status(t);
					},
					stop: function() {
						e.stop();
					}
				});
			})(e.anims[n]);
			return t;
		}, e.animate = function(e, t, n, i, a, o) {
			typeof a == "function" && !a.length && (o = a, a = r.linear);
			var s = r.time(), c = r(e, t, s, s + i, r.time, n, a);
			return o && eve.once("mina.finish." + c.id, o), c;
		}, o.stop = function() {
			for (var e = this.inAnim(), t = 0, n = e.length; t < n; t++) e[t].stop();
			return this;
		}, o.animate = function(e, t, n, i) {
			typeof n == "function" && !n.length && (i = n, n = r.linear), e instanceof d && (i = e.callback, n = e.easing, t = e.dur, e = e.attr);
			var a = [], o = [], f = {}, p, m, h, _, v = this;
			for (var y in e) if (e[l](y)) {
				v.equal ? (_ = v.equal(y, c(e[y])), p = _.from, m = _.to, h = _.f) : (p = +v.attr(y), m = +e[y]);
				var b = s(p, "array") ? p.length : 1;
				f[y] = u(a.length, a.length + b, h), a = a.concat(p), o = o.concat(m);
			}
			var x = r.time(), S = r(a, o, x, x + t, r.time, function(e) {
				var t = {};
				for (var n in f) f[l](n) && (t[n] = f[n](e));
				v.attr(t);
			}, n);
			return v.anims[S.id] = S, S._attrs = e, S._callback = i, eve("snap.animcreated." + v.id, S), eve.once("mina.finish." + S.id, function() {
				eve.off("mina.*." + S.id), delete v.anims[S.id], i && i.call(v);
			}), eve.once("mina.stop." + S.id, function() {
				eve.off("mina.*." + S.id), delete v.anims[S.id];
			}), v;
		};
	}), i.plugin(function(e, t, n, r) {
		var i = "#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000", a = "#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162", o = "#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF", s = "#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA", c = "#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE", l = "#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF", u = "#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA", d = "#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4", f = "#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5", p = "#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853", m = "#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17", h = "#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00", _ = "#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600", v = "#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00", y = "#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00", b = "#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00", x = "#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723", S = "#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121", C = "#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238";
		e.mui = {}, e.flat = {};
		function w(e) {
			e = e.split(/(?=#)/);
			var t = new String(e[5]);
			return t[50] = e[0], t[100] = e[1], t[200] = e[2], t[300] = e[3], t[400] = e[4], t[500] = e[5], t[600] = e[6], t[700] = e[7], t[800] = e[8], t[900] = e[9], e[10] && (t.A100 = e[10], t.A200 = e[11], t.A400 = e[12], t.A700 = e[13]), t;
		}
		e.mui.red = w(i), e.mui.pink = w(a), e.mui.purple = w(o), e.mui.deeppurple = w(s), e.mui.indigo = w(c), e.mui.blue = w(l), e.mui.lightblue = w(u), e.mui.cyan = w(d), e.mui.teal = w(f), e.mui.green = w(p), e.mui.lightgreen = w(m), e.mui.lime = w(h), e.mui.yellow = w(_), e.mui.amber = w(v), e.mui.orange = w(y), e.mui.deeporange = w(b), e.mui.brown = w(x), e.mui.grey = w(S), e.mui.bluegrey = w(C), e.flat.turquoise = "#1abc9c", e.flat.greensea = "#16a085", e.flat.sunflower = "#f1c40f", e.flat.orange = "#f39c12", e.flat.emerland = "#2ecc71", e.flat.nephritis = "#27ae60", e.flat.carrot = "#e67e22", e.flat.pumpkin = "#d35400", e.flat.peterriver = "#3498db", e.flat.belizehole = "#2980b9", e.flat.alizarin = "#e74c3c", e.flat.pomegranate = "#c0392b", e.flat.amethyst = "#9b59b6", e.flat.wisteria = "#8e44ad", e.flat.clouds = "#ecf0f1", e.flat.silver = "#bdc3c7", e.flat.wetasphalt = "#34495e", e.flat.midnightblue = "#2c3e50", e.flat.concrete = "#95a5a6", e.flat.asbestos = "#7f8c8d", e.importMUIColors = function() {
			for (var t in e.mui) e.mui.hasOwnProperty(t) && (window[t] = e.mui[t]);
		};
	}), t.exports = i;
})), Jn = /* @__PURE__ */ n(((e, t) => {
	(function() {
		function e(e, t, n) {
			return e.call.apply(e.bind, arguments);
		}
		function n(e, t, n) {
			if (!e) throw Error();
			if (2 < arguments.length) {
				var r = Array.prototype.slice.call(arguments, 2);
				return function() {
					var n = Array.prototype.slice.call(arguments);
					return Array.prototype.unshift.apply(n, r), e.apply(t, n);
				};
			}
			return function() {
				return e.apply(t, arguments);
			};
		}
		function r(t, i, a) {
			return r = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, r.apply(null, arguments);
		}
		var i = Date.now || function() {
			return +/* @__PURE__ */ new Date();
		};
		function a(e, t) {
			this.a = e, this.o = t || e, this.c = this.o.document;
		}
		var o = !!window.FontFace;
		function s(e, t, n, r) {
			if (t = e.c.createElement(t), n) for (var i in n) n.hasOwnProperty(i) && (i == "style" ? t.style.cssText = n[i] : t.setAttribute(i, n[i]));
			return r && t.appendChild(e.c.createTextNode(r)), t;
		}
		function c(e, t, n) {
			e = e.c.getElementsByTagName(t)[0], e ||= document.documentElement, e.insertBefore(n, e.lastChild);
		}
		function l(e) {
			e.parentNode && e.parentNode.removeChild(e);
		}
		function u(e, t, n) {
			t ||= [], n ||= [];
			for (var r = e.className.split(/\s+/), i = 0; i < t.length; i += 1) {
				for (var a = !1, o = 0; o < r.length; o += 1) if (t[i] === r[o]) {
					a = !0;
					break;
				}
				a || r.push(t[i]);
			}
			for (t = [], i = 0; i < r.length; i += 1) {
				for (a = !1, o = 0; o < n.length; o += 1) if (r[i] === n[o]) {
					a = !0;
					break;
				}
				a || t.push(r[i]);
			}
			e.className = t.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
		}
		function d(e, t) {
			for (var n = e.className.split(/\s+/), r = 0, i = n.length; r < i; r++) if (n[r] == t) return !0;
			return !1;
		}
		function f(e) {
			return e.o.location.hostname || e.a.location.hostname;
		}
		function p(e, t, n) {
			function r() {
				u && i && a && (u(l), u = null);
			}
			t = s(e, "link", {
				rel: "stylesheet",
				href: t,
				media: "all"
			});
			var i = !1, a = !0, l = null, u = n || null;
			o ? (t.onload = function() {
				i = !0, r();
			}, t.onerror = function() {
				i = !0, l = Error("Stylesheet failed to load"), r();
			}) : setTimeout(function() {
				i = !0, r();
			}, 0), c(e, "head", t);
		}
		function m(e, t, n, r) {
			var i = e.c.getElementsByTagName("head")[0];
			if (i) {
				var a = s(e, "script", { src: t }), o = !1;
				return a.onload = a.onreadystatechange = function() {
					o || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (o = !0, n && n(null), a.onload = a.onreadystatechange = null, a.parentNode.tagName == "HEAD" && i.removeChild(a));
				}, i.appendChild(a), setTimeout(function() {
					o || (o = !0, n && n(Error("Script load timeout")));
				}, r || 5e3), a;
			}
			return null;
		}
		function h() {
			this.a = 0, this.c = null;
		}
		function _(e) {
			return e.a++, function() {
				e.a--, y(e);
			};
		}
		function v(e, t) {
			e.c = t, y(e);
		}
		function y(e) {
			e.a == 0 && e.c && (e.c(), e.c = null);
		}
		function b(e) {
			this.a = e || "-";
		}
		b.prototype.c = function(e) {
			for (var t = [], n = 0; n < arguments.length; n++) t.push(arguments[n].replace(/[\W_]+/g, "").toLowerCase());
			return t.join(this.a);
		};
		function x(e, t) {
			this.c = e, this.f = 4, this.a = "n";
			var n = (t || "n4").match(/^([nio])([1-9])$/i);
			n && (this.a = n[1], this.f = parseInt(n[2], 10));
		}
		function S(e) {
			return T(e) + " " + (e.f + "00") + " 300px " + C(e.c);
		}
		function C(e) {
			var t = [];
			e = e.split(/,\s*/);
			for (var n = 0; n < e.length; n++) {
				var r = e[n].replace(/['"]/g, "");
				r.indexOf(" ") != -1 || /^\d/.test(r) ? t.push("'" + r + "'") : t.push(r);
			}
			return t.join(",");
		}
		function w(e) {
			return e.a + e.f;
		}
		function T(e) {
			var t = "normal";
			return e.a === "o" ? t = "oblique" : e.a === "i" && (t = "italic"), t;
		}
		function E(e) {
			var t = 4, n = "n", r = null;
			return e && ((r = e.match(/(normal|oblique|italic)/i)) && r[1] && (n = r[1].substr(0, 1).toLowerCase()), (r = e.match(/([1-9]00|normal|bold)/i)) && r[1] && (/bold/i.test(r[1]) ? t = 7 : /[1-9]00/.test(r[1]) && (t = parseInt(r[1].substr(0, 1), 10)))), n + t;
		}
		function D(e, t) {
			this.c = e, this.f = e.o.document.documentElement, this.h = t, this.a = new b("-"), this.j = !1 !== t.events, this.g = !1 !== t.classes;
		}
		function O(e) {
			e.g && u(e.f, [e.a.c("wf", "loading")]), A(e, "loading");
		}
		function k(e) {
			if (e.g) {
				var t = d(e.f, e.a.c("wf", "active")), n = [], r = [e.a.c("wf", "loading")];
				t || n.push(e.a.c("wf", "inactive")), u(e.f, n, r);
			}
			A(e, "inactive");
		}
		function A(e, t, n) {
			e.j && e.h[t] && (n ? e.h[t](n.c, w(n)) : e.h[t]());
		}
		function j() {
			this.c = {};
		}
		function ee(e, t, n) {
			var r = [], i;
			for (i in t) if (t.hasOwnProperty(i)) {
				var a = e.c[i];
				a && r.push(a(t[i], n));
			}
			return r;
		}
		function M(e, t) {
			this.c = e, this.f = t, this.a = s(this.c, "span", { "aria-hidden": "true" }, this.f);
		}
		function te(e) {
			c(e.c, "body", e.a);
		}
		function N(e) {
			return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + C(e.c) + ";" + ("font-style:" + T(e) + ";font-weight:" + (e.f + "00") + ";");
		}
		function ne(e, t, n, r, i, a) {
			this.g = e, this.j = t, this.a = r, this.c = n, this.f = i || 3e3, this.h = a || void 0;
		}
		ne.prototype.start = function() {
			var e = this.c.o.document, t = this, n = i(), r = new Promise(function(r, a) {
				function o() {
					i() - n >= t.f ? a() : e.fonts.load(S(t.a), t.h).then(function(e) {
						1 <= e.length ? r() : setTimeout(o, 25);
					}, function() {
						a();
					});
				}
				o();
			}), a = null, o = new Promise(function(e, n) {
				a = setTimeout(n, t.f);
			});
			Promise.race([o, r]).then(function() {
				a &&= (clearTimeout(a), null), t.g(t.a);
			}, function() {
				t.j(t.a);
			});
		};
		function re(e, t, n, r, i, a, o) {
			this.v = e, this.B = t, this.c = n, this.a = r, this.s = o || "BESbswy", this.f = {}, this.w = i || 3e3, this.u = a || null, this.m = this.j = this.h = this.g = null, this.g = new M(this.c, this.s), this.h = new M(this.c, this.s), this.j = new M(this.c, this.s), this.m = new M(this.c, this.s), e = new x(this.a.c + ",serif", w(this.a)), e = N(e), this.g.a.style.cssText = e, e = new x(this.a.c + ",sans-serif", w(this.a)), e = N(e), this.h.a.style.cssText = e, e = new x("serif", w(this.a)), e = N(e), this.j.a.style.cssText = e, e = new x("sans-serif", w(this.a)), e = N(e), this.m.a.style.cssText = e, te(this.g), te(this.h), te(this.j), te(this.m);
		}
		var P = {
			D: "serif",
			C: "sans-serif"
		}, F = null;
		function I() {
			if (F === null) {
				var e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
				F = !!e && (536 > parseInt(e[1], 10) || parseInt(e[1], 10) === 536 && 11 >= parseInt(e[2], 10));
			}
			return F;
		}
		re.prototype.start = function() {
			this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = i(), R(this);
		};
		function L(e, t, n) {
			for (var r in P) if (P.hasOwnProperty(r) && t === e.f[P[r]] && n === e.f[P[r]]) return !0;
			return !1;
		}
		function R(e) {
			var t = e.g.a.offsetWidth, n = e.h.a.offsetWidth, r;
			(r = t === e.f.serif && n === e.f["sans-serif"]) || (r = I() && L(e, t, n)), r ? i() - e.A >= e.w ? I() && L(e, t, n) && (e.u === null || e.u.hasOwnProperty(e.a.c)) ? ae(e, e.v) : ae(e, e.B) : ie(e) : ae(e, e.v);
		}
		function ie(e) {
			setTimeout(r(function() {
				R(this);
			}, e), 50);
		}
		function ae(e, t) {
			setTimeout(r(function() {
				l(this.g.a), l(this.h.a), l(this.j.a), l(this.m.a), t(this.a);
			}, e), 0);
		}
		function z(e, t, n) {
			this.c = e, this.a = t, this.f = 0, this.m = this.j = !1, this.s = n;
		}
		var B = null;
		z.prototype.g = function(e) {
			var t = this.a;
			t.g && u(t.f, [t.a.c("wf", e.c, w(e).toString(), "active")], [t.a.c("wf", e.c, w(e).toString(), "loading"), t.a.c("wf", e.c, w(e).toString(), "inactive")]), A(t, "fontactive", e), this.m = !0, V(this);
		}, z.prototype.h = function(e) {
			var t = this.a;
			if (t.g) {
				var n = d(t.f, t.a.c("wf", e.c, w(e).toString(), "active")), r = [], i = [t.a.c("wf", e.c, w(e).toString(), "loading")];
				n || r.push(t.a.c("wf", e.c, w(e).toString(), "inactive")), u(t.f, r, i);
			}
			A(t, "fontinactive", e), V(this);
		};
		function V(e) {
			--e.f == 0 && e.j && (e.m ? (e = e.a, e.g && u(e.f, [e.a.c("wf", "active")], [e.a.c("wf", "loading"), e.a.c("wf", "inactive")]), A(e, "active")) : k(e.a));
		}
		function H(e) {
			this.j = e, this.a = new j(), this.h = 0, this.f = this.g = !0;
		}
		H.prototype.load = function(e) {
			this.c = new a(this.j, e.context || this.j), this.g = !1 !== e.events, this.f = !1 !== e.classes, W(this, new D(this.c, e), e);
		};
		function U(e, t, n, i, a) {
			var o = --e.h == 0;
			(e.f || e.g) && setTimeout(function() {
				var e = a || null, s = i || {};
				if (n.length === 0 && o) k(t.a);
				else {
					t.f += n.length, o && (t.j = o);
					var c, l = [];
					for (c = 0; c < n.length; c++) {
						var d = n[c], f = s[d.c], p = t.a, m = d;
						if (p.g && u(p.f, [p.a.c("wf", m.c, w(m).toString(), "loading")]), A(p, "fontloading", m), p = null, B === null) {
							if (window.FontFace) {
								var m = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), h = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
								B = m ? 42 < parseInt(m[1], 10) : !h;
							} else B = !1;
						}
						p = B ? new ne(r(t.g, t), r(t.h, t), t.c, d, t.s, f) : new re(r(t.g, t), r(t.h, t), t.c, d, t.s, e, f), l.push(p);
					}
					for (c = 0; c < l.length; c++) l[c].start();
				}
			}, 0);
		}
		function W(e, t, n) {
			var r = [], i = n.timeout;
			O(t);
			var r = ee(e.a, n, e.c), a = new z(e.c, t, i);
			for (e.h = r.length, t = 0, n = r.length; t < n; t++) r[t].load(function(t, n, r) {
				U(e, a, t, n, r);
			});
		}
		function G(e, t) {
			this.c = e, this.a = t;
		}
		G.prototype.load = function(e) {
			function t() {
				if (a["__mti_fntLst" + r]) {
					var n = a["__mti_fntLst" + r](), i = [], o;
					if (n) for (var s = 0; s < n.length; s++) {
						var c = n[s].fontfamily;
						n[s].fontStyle != null && n[s].fontWeight != null ? (o = n[s].fontStyle + n[s].fontWeight, i.push(new x(c, o))) : i.push(new x(c));
					}
					e(i);
				} else setTimeout(function() {
					t();
				}, 50);
			}
			var n = this, r = n.a.projectId, i = n.a.version;
			if (r) {
				var a = n.c.o;
				m(this.c, (n.a.api || "https://fast.fonts.net/jsapi") + "/" + r + ".js" + (i ? "?v=" + i : ""), function(i) {
					i ? e([]) : (a["__MonotypeConfiguration__" + r] = function() {
						return n.a;
					}, t());
				}).id = "__MonotypeAPIScript__" + r;
			} else e([]);
		};
		function K(e, t) {
			this.c = e, this.a = t;
		}
		K.prototype.load = function(e) {
			var t, n, r = this.a.urls || [], i = this.a.families || [], a = this.a.testStrings || {}, o = new h();
			for (t = 0, n = r.length; t < n; t++) p(this.c, r[t], _(o));
			var s = [];
			for (t = 0, n = i.length; t < n; t++) if (r = i[t].split(":"), r[1]) for (var c = r[1].split(","), l = 0; l < c.length; l += 1) s.push(new x(r[0], c[l]));
			else s.push(new x(r[0]));
			v(o, function() {
				e(s, a);
			});
		};
		function oe(e, t) {
			this.c = e || se, this.a = [], this.f = [], this.g = t || "";
		}
		var se = "https://fonts.googleapis.com/css";
		function ce(e, t) {
			for (var n = t.length, r = 0; r < n; r++) {
				var i = t[r].split(":");
				i.length == 3 && e.f.push(i.pop());
				var a = "";
				i.length == 2 && i[1] != "" && (a = ":"), e.a.push(i.join(a));
			}
		}
		function le(e) {
			if (e.a.length == 0) throw Error("No fonts to load!");
			if (e.c.indexOf("kit=") != -1) return e.c;
			for (var t = e.a.length, n = [], r = 0; r < t; r++) n.push(e.a[r].replace(/ /g, "+"));
			return t = e.c + "?family=" + n.join("%7C"), 0 < e.f.length && (t += "&subset=" + e.f.join(",")), 0 < e.g.length && (t += "&text=" + encodeURIComponent(e.g)), t;
		}
		function ue(e) {
			this.f = e, this.a = [], this.c = {};
		}
		var de = {
			latin: "BESbswy",
			"latin-ext": "çöüğş",
			cyrillic: "йяЖ",
			greek: "αβΣ",
			khmer: "កខគ",
			Hanuman: "កខគ"
		}, fe = {
			thin: "1",
			extralight: "2",
			"extra-light": "2",
			ultralight: "2",
			"ultra-light": "2",
			light: "3",
			regular: "4",
			book: "4",
			medium: "5",
			"semi-bold": "6",
			semibold: "6",
			"demi-bold": "6",
			demibold: "6",
			bold: "7",
			"extra-bold": "8",
			extrabold: "8",
			"ultra-bold": "8",
			ultrabold: "8",
			black: "9",
			heavy: "9",
			l: "3",
			r: "4",
			b: "7"
		}, pe = {
			i: "i",
			italic: "i",
			n: "n",
			normal: "n"
		}, q = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
		function me(e) {
			for (var t = e.f.length, n = 0; n < t; n++) {
				var r = e.f[n].split(":"), i = r[0].replace(/\+/g, " "), a = ["n4"];
				if (2 <= r.length) {
					var o, s = r[1];
					if (o = [], s) for (var s = s.split(","), c = s.length, l = 0; l < c; l++) {
						var u = s[l];
						if (u.match(/^[\w-]+$/)) {
							var d = q.exec(u.toLowerCase());
							if (d == null) u = "";
							else {
								if (u = d[2], u = u == null || u == "" ? "n" : pe[u], d = d[1], d == null || d == "") d = "4";
								else var f = fe[d], d = f || (isNaN(d) ? "4" : d.substr(0, 1));
								u = [u, d].join("");
							}
						} else u = "";
						u && o.push(u);
					}
					0 < o.length && (a = o), r.length == 3 && (r = r[2], o = [], r = r ? r.split(",") : o, 0 < r.length && (r = de[r[0]]) && (e.c[i] = r));
				}
				for (e.c[i] || (r = de[i]) && (e.c[i] = r), r = 0; r < a.length; r += 1) e.a.push(new x(i, a[r]));
			}
		}
		function he(e, t) {
			this.c = e, this.a = t;
		}
		var J = {
			Arimo: !0,
			Cousine: !0,
			Tinos: !0
		};
		he.prototype.load = function(e) {
			var t = new h(), n = this.c, r = new oe(this.a.api, this.a.text), i = this.a.families;
			ce(r, i);
			var a = new ue(i);
			me(a), p(n, le(r), _(t)), v(t, function() {
				e(a.a, a.c, J);
			});
		};
		function ge(e, t) {
			this.c = e, this.a = t;
		}
		ge.prototype.load = function(e) {
			var t = this.a.id, n = this.c.o;
			t ? m(this.c, (this.a.api || "https://use.typekit.net") + "/" + t + ".js", function(t) {
				if (t) e([]);
				else if (n.Typekit && n.Typekit.config && n.Typekit.config.fn) {
					t = n.Typekit.config.fn;
					for (var r = [], i = 0; i < t.length; i += 2) for (var a = t[i], o = t[i + 1], s = 0; s < o.length; s++) r.push(new x(a, o[s]));
					try {
						n.Typekit.load({
							events: !1,
							classes: !1,
							async: !0
						});
					} catch {}
					e(r);
				}
			}, 2e3) : e([]);
		};
		function _e(e, t) {
			this.c = e, this.f = t, this.a = [];
		}
		_e.prototype.load = function(e) {
			var t = this.f.id, n = this.c.o, r = this;
			t ? (n.__webfontfontdeckmodule__ ||= {}, n.__webfontfontdeckmodule__[t] = function(t, n) {
				for (var i = 0, a = n.fonts.length; i < a; ++i) {
					var o = n.fonts[i];
					r.a.push(new x(o.name, E("font-weight:" + o.weight + ";font-style:" + o.style)));
				}
				e(r.a);
			}, m(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + f(this.c) + "/" + t + ".js", function(t) {
				t && e([]);
			})) : e([]);
		};
		var Y = new H(window);
		Y.a.c.custom = function(e, t) {
			return new K(t, e);
		}, Y.a.c.fontdeck = function(e, t) {
			return new _e(t, e);
		}, Y.a.c.monotype = function(e, t) {
			return new G(t, e);
		}, Y.a.c.typekit = function(e, t) {
			return new ge(t, e);
		}, Y.a.c.google = function(e, t) {
			return new he(t, e);
		};
		var ve = { load: r(Y.load, Y) };
		typeof define == "function" && define.amd ? define(function() {
			return ve;
		}) : t !== void 0 && t.exports ? t.exports = ve : (window.WebFont = ve, window.WebFontConfig && Y.load(window.WebFontConfig));
	})();
})), Yn = /* @__PURE__ */ e(qn()), Xn = /* @__PURE__ */ e(Jn());
function $() {
	this.title = void 0, this.actors = [], this.signals = [];
}
$.prototype.getActor = function(e, t) {
	e = e.trim();
	var n, r = this.actors;
	for (n in r) if (r[n].alias == e) return r[n];
	return n = r.push(new $.Actor(e, t || e, r.length)), r[n - 1];
}, $.prototype.getActorWithAlias = function(e) {
	e = e.trim();
	var t = /([\s\S]+) as (\S+)$/im.exec(e), n, r;
	return t ? (r = t[1].trim(), n = t[2].trim()) : r = n = e, this.getActor(n, r);
}, $.prototype.setTitle = function(e) {
	this.title = e;
}, $.prototype.addSignal = function(e) {
	this.signals.push(e);
}, $.Actor = function(e, t, n) {
	this.alias = e, this.name = t, this.index = n;
}, $.Signal = function(e, t, n, r) {
	this.type = "Signal", this.actorA = e, this.actorB = n, this.linetype = t & 3, this.arrowtype = t >> 2 & 3, this.message = r;
}, $.Signal.prototype.isSelf = function() {
	return this.actorA.index == this.actorB.index;
}, $.Note = function(e, t, n) {
	if (this.type = "Note", this.actor = e, this.placement = t, this.message = n, this.hasManyActors() && e[0] == e[1]) throw Error("Note should be over two different actors");
}, $.Note.prototype.hasManyActors = function() {
	return Q.isArray(this.actor);
}, $.unescape = function(e) {
	return e.trim().replace(/^"(.*)"$/m, "$1").replace(/\\n/gm, "\n");
}, $.LINETYPE = {
	SOLID: 0,
	DOTTED: 1
}, $.ARROWTYPE = {
	FILLED: 0,
	OPEN: 1
}, $.PLACEMENT = {
	LEFTOF: 0,
	RIGHTOF: 1,
	OVER: 2
}, typeof Object.getPrototypeOf != "function" && (typeof "test".__proto__ == "object" ? Object.getPrototypeOf = function(e) {
	return e.__proto__;
} : Object.getPrototypeOf = function(e) {
	return e.constructor.prototype;
});
var Zn = (function() {
	function e() {
		this.yy = {};
	}
	var t = function(e, t, n, r) {
		for (n ||= {}, r = e.length; r--; n[e[r]] = t);
		return n;
	}, n = [
		5,
		8,
		9,
		13,
		15,
		24
	], r = [1, 13], i = [1, 17], a = [
		24,
		29,
		30
	], o = {
		trace: function() {},
		yy: {},
		symbols_: {
			error: 2,
			start: 3,
			document: 4,
			EOF: 5,
			line: 6,
			statement: 7,
			NL: 8,
			participant: 9,
			actor_alias: 10,
			signal: 11,
			note_statement: 12,
			title: 13,
			message: 14,
			note: 15,
			placement: 16,
			actor: 17,
			over: 18,
			actor_pair: 19,
			",": 20,
			left_of: 21,
			right_of: 22,
			signaltype: 23,
			ACTOR: 24,
			linetype: 25,
			arrowtype: 26,
			LINE: 27,
			DOTLINE: 28,
			ARROW: 29,
			OPENARROW: 30,
			MESSAGE: 31,
			$accept: 0,
			$end: 1
		},
		terminals_: {
			2: "error",
			5: "EOF",
			8: "NL",
			9: "participant",
			13: "title",
			15: "note",
			18: "over",
			20: ",",
			21: "left_of",
			22: "right_of",
			24: "ACTOR",
			27: "LINE",
			28: "DOTLINE",
			29: "ARROW",
			30: "OPENARROW",
			31: "MESSAGE"
		},
		productions_: [
			0,
			[3, 2],
			[4, 0],
			[4, 2],
			[6, 1],
			[6, 1],
			[7, 2],
			[7, 1],
			[7, 1],
			[7, 2],
			[12, 4],
			[12, 4],
			[19, 1],
			[19, 3],
			[16, 1],
			[16, 1],
			[11, 4],
			[17, 1],
			[10, 1],
			[23, 2],
			[23, 1],
			[25, 1],
			[25, 1],
			[26, 1],
			[26, 1],
			[14, 1]
		],
		performAction: function(e, t, n, r, i, a, o) {
			var s = a.length - 1;
			switch (i) {
				case 1: return r.parser.yy;
				case 4: break;
				case 6:
					a[s];
					break;
				case 7:
				case 8:
					r.parser.yy.addSignal(a[s]);
					break;
				case 9:
					r.parser.yy.setTitle(a[s]);
					break;
				case 10:
					this.$ = new $.Note(a[s - 1], a[s - 2], a[s]);
					break;
				case 11:
					this.$ = new $.Note(a[s - 1], $.PLACEMENT.OVER, a[s]);
					break;
				case 12:
				case 20:
					this.$ = a[s];
					break;
				case 13:
					this.$ = [a[s - 2], a[s]];
					break;
				case 14:
					this.$ = $.PLACEMENT.LEFTOF;
					break;
				case 15:
					this.$ = $.PLACEMENT.RIGHTOF;
					break;
				case 16:
					this.$ = new $.Signal(a[s - 3], a[s - 2], a[s - 1], a[s]);
					break;
				case 17:
					this.$ = r.parser.yy.getActor($.unescape(a[s]));
					break;
				case 18:
					this.$ = r.parser.yy.getActorWithAlias($.unescape(a[s]));
					break;
				case 19:
					this.$ = a[s - 1] | a[s] << 2;
					break;
				case 21:
					this.$ = $.LINETYPE.SOLID;
					break;
				case 22:
					this.$ = $.LINETYPE.DOTTED;
					break;
				case 23:
					this.$ = $.ARROWTYPE.FILLED;
					break;
				case 24:
					this.$ = $.ARROWTYPE.OPEN;
					break;
				case 25: this.$ = $.unescape(a[s].substring(1));
			}
		},
		table: [
			t(n, [2, 2], {
				3: 1,
				4: 2
			}),
			{ 1: [3] },
			{
				5: [1, 3],
				6: 4,
				7: 5,
				8: [1, 6],
				9: [1, 7],
				11: 8,
				12: 9,
				13: [1, 10],
				15: [1, 12],
				17: 11,
				24: r
			},
			{ 1: [2, 1] },
			t(n, [2, 3]),
			t(n, [2, 4]),
			t(n, [2, 5]),
			{
				10: 14,
				24: [1, 15]
			},
			t(n, [2, 7]),
			t(n, [2, 8]),
			{
				14: 16,
				31: i
			},
			{
				23: 18,
				25: 19,
				27: [1, 20],
				28: [1, 21]
			},
			{
				16: 22,
				18: [1, 23],
				21: [1, 24],
				22: [1, 25]
			},
			t([
				20,
				27,
				28,
				31
			], [2, 17]),
			t(n, [2, 6]),
			t(n, [2, 18]),
			t(n, [2, 9]),
			t(n, [2, 25]),
			{
				17: 26,
				24: r
			},
			{
				24: [2, 20],
				26: 27,
				29: [1, 28],
				30: [1, 29]
			},
			t(a, [2, 21]),
			t(a, [2, 22]),
			{
				17: 30,
				24: r
			},
			{
				17: 32,
				19: 31,
				24: r
			},
			{ 24: [2, 14] },
			{ 24: [2, 15] },
			{
				14: 33,
				31: i
			},
			{ 24: [2, 19] },
			{ 24: [2, 23] },
			{ 24: [2, 24] },
			{
				14: 34,
				31: i
			},
			{
				14: 35,
				31: i
			},
			{
				20: [1, 36],
				31: [2, 12]
			},
			t(n, [2, 16]),
			t(n, [2, 10]),
			t(n, [2, 11]),
			{
				17: 37,
				24: r
			},
			{ 31: [2, 13] }
		],
		defaultActions: {
			3: [2, 1],
			24: [2, 14],
			25: [2, 15],
			27: [2, 19],
			28: [2, 23],
			29: [2, 24],
			37: [2, 13]
		},
		parseError: function(e, t) {
			if (!t.recoverable) throw Error(e);
			this.trace(e);
		},
		parse: function(e) {
			function t() {
				var e = m.lex() || f;
				return typeof e != "number" && (e = n.symbols_[e] || e), e;
			}
			var n = this, r = [0], i = [null], a = [], o = this.table, s = "", c = 0, l = 0, u = 0, d = 2, f = 1, p = a.slice.call(arguments, 1), m = Object.create(this.lexer), h = { yy: {} };
			for (var _ in this.yy) Object.prototype.hasOwnProperty.call(this.yy, _) && (h.yy[_] = this.yy[_]);
			m.setInput(e, h.yy), h.yy.lexer = m, h.yy.parser = this, m.yylloc === void 0 && (m.yylloc = {});
			var v = m.yylloc;
			a.push(v);
			var y = m.options && m.options.ranges;
			this.parseError = typeof h.yy.parseError == "function" ? h.yy.parseError : Object.getPrototypeOf(this).parseError;
			for (var b, x, S, C, w, T, E, D, O, k = {};;) {
				if (S = r[r.length - 1], this.defaultActions[S] ? C = this.defaultActions[S] : (b ??= t(), C = o[S] && o[S][b]), C === void 0 || !C.length || !C[0]) {
					var A = "";
					for (T in O = [], o[S]) this.terminals_[T] && T > d && O.push("'" + this.terminals_[T] + "'");
					A = m.showPosition ? "Parse error on line " + (c + 1) + ":\n" + m.showPosition() + "\nExpecting " + O.join(", ") + ", got '" + (this.terminals_[b] || b) + "'" : "Parse error on line " + (c + 1) + ": Unexpected " + (b == f ? "end of input" : "'" + (this.terminals_[b] || b) + "'"), this.parseError(A, {
						text: m.match,
						token: this.terminals_[b] || b,
						line: m.yylineno,
						loc: v,
						expected: O
					});
				}
				if (C[0] instanceof Array && C.length > 1) throw Error("Parse Error: multiple actions possible at state: " + S + ", token: " + b);
				switch (C[0]) {
					case 1:
						r.push(b), i.push(m.yytext), a.push(m.yylloc), r.push(C[1]), b = null, x ? (b = x, x = null) : (l = m.yyleng, s = m.yytext, c = m.yylineno, v = m.yylloc, u > 0 && u--);
						break;
					case 2:
						if (E = this.productions_[C[1]][1], k.$ = i[i.length - E], k._$ = {
							first_line: a[a.length - (E || 1)].first_line,
							last_line: a[a.length - 1].last_line,
							first_column: a[a.length - (E || 1)].first_column,
							last_column: a[a.length - 1].last_column
						}, y && (k._$.range = [a[a.length - (E || 1)].range[0], a[a.length - 1].range[1]]), w = this.performAction.apply(k, [
							s,
							l,
							c,
							h.yy,
							C[1],
							i,
							a
						].concat(p)), w !== void 0) return w;
						E && (r = r.slice(0, -1 * E * 2), i = i.slice(0, -1 * E), a = a.slice(0, -1 * E)), r.push(this.productions_[C[1]][0]), i.push(k.$), a.push(k._$), D = o[r[r.length - 2]][r[r.length - 1]], r.push(D);
						break;
					case 3: return !0;
				}
			}
			return !0;
		}
	};
	return o.lexer = (function() {
		return {
			EOF: 1,
			parseError: function(e, t) {
				if (!this.yy.parser) throw Error(e);
				this.yy.parser.parseError(e, t);
			},
			setInput: function(e, t) {
				return this.yy = t || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
					first_line: 1,
					first_column: 0,
					last_line: 1,
					last_column: 0
				}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
			},
			input: function() {
				var e = this._input[0];
				return this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e, e.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e;
			},
			unput: function(e) {
				var t = e.length, n = e.split(/(?:\r\n?|\n)/g);
				this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t), this.offset -= t;
				var r = this.match.split(/(?:\r\n?|\n)/g);
				this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
				var i = this.yylloc.range;
				return this.yylloc = {
					first_line: this.yylloc.first_line,
					last_line: this.yylineno + 1,
					first_column: this.yylloc.first_column,
					last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
				}, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this.yyleng = this.yytext.length, this;
			},
			more: function() {
				return this._more = !0, this;
			},
			reject: function() {
				return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
					text: "",
					token: null,
					line: this.yylineno
				});
			},
			less: function(e) {
				this.unput(this.match.slice(e));
			},
			pastInput: function() {
				var e = this.matched.substr(0, this.matched.length - this.match.length);
				return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "");
			},
			upcomingInput: function() {
				var e = this.match;
				return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "");
			},
			showPosition: function() {
				var e = this.pastInput(), t = Array(e.length + 1).join("-");
				return e + this.upcomingInput() + "\n" + t + "^";
			},
			test_match: function(e, t) {
				var n, r, i;
				if (this.options.backtrack_lexer && (i = {
					yylineno: this.yylineno,
					yylloc: {
						first_line: this.yylloc.first_line,
						last_line: this.last_line,
						first_column: this.yylloc.first_column,
						last_column: this.yylloc.last_column
					},
					yytext: this.yytext,
					match: this.match,
					matches: this.matches,
					matched: this.matched,
					yyleng: this.yyleng,
					offset: this.offset,
					_more: this._more,
					_input: this._input,
					yy: this.yy,
					conditionStack: this.conditionStack.slice(0),
					done: this.done
				}, this.options.ranges && (i.yylloc.range = this.yylloc.range.slice(0))), r = e[0].match(/(?:\r\n?|\n).*/g), r && (this.yylineno += r.length), this.yylloc = {
					first_line: this.yylloc.last_line,
					last_line: this.yylineno + 1,
					first_column: this.yylloc.last_column,
					last_column: r ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
				}, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], n = this.performAction.call(this, this.yy, this, t, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;
				if (this._backtrack) {
					for (var a in i) this[a] = i[a];
					return !1;
				}
				return !1;
			},
			next: function() {
				if (this.done) return this.EOF;
				this._input || (this.done = !0);
				var e, t, n, r;
				this._more || (this.yytext = "", this.match = "");
				for (var i = this._currentRules(), a = 0; a < i.length; a++) if (n = this._input.match(this.rules[i[a]]), n && (!t || n[0].length > t[0].length)) {
					if (t = n, r = a, this.options.backtrack_lexer) {
						if (e = this.test_match(n, i[a]), e !== !1) return e;
						if (this._backtrack) {
							t = !1;
							continue;
						}
						return !1;
					}
					if (!this.options.flex) break;
				}
				return t ? (e = this.test_match(t, i[r]), e !== !1 && e) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
					text: "",
					token: null,
					line: this.yylineno
				});
			},
			lex: function() {
				return this.next() || this.lex();
			},
			begin: function(e) {
				this.conditionStack.push(e);
			},
			popState: function() {
				return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0];
			},
			_currentRules: function() {
				return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
			},
			topState: function(e) {
				return e = this.conditionStack.length - 1 - Math.abs(e || 0), e >= 0 ? this.conditionStack[e] : "INITIAL";
			},
			pushState: function(e) {
				this.begin(e);
			},
			stateStackSize: function() {
				return this.conditionStack.length;
			},
			options: { "case-insensitive": !0 },
			performAction: function(e, t, n, r) {
				switch (n) {
					case 0: return 8;
					case 1: break;
					case 2: break;
					case 3: return 9;
					case 4: return 21;
					case 5: return 22;
					case 6: return 18;
					case 7: return 15;
					case 8: return 13;
					case 9: return 20;
					case 10: return 24;
					case 11: return 24;
					case 12: return 28;
					case 13: return 27;
					case 14: return 30;
					case 15: return 29;
					case 16: return 31;
					case 17: return 5;
					case 18: return "INVALID";
				}
			},
			rules: [
				/^(?:[\r\n]+)/i,
				/^(?:\s+)/i,
				/^(?:#[^\r\n]*)/i,
				/^(?:participant\b)/i,
				/^(?:left of\b)/i,
				/^(?:right of\b)/i,
				/^(?:over\b)/i,
				/^(?:note\b)/i,
				/^(?:title\b)/i,
				/^(?:,)/i,
				/^(?:[^\->:,\r\n"]+)/i,
				/^(?:"[^"]+")/i,
				/^(?:--)/i,
				/^(?:-)/i,
				/^(?:>>)/i,
				/^(?:>)/i,
				/^(?:[^\r\n]+)/i,
				/^(?:$)/i,
				/^(?:.)/i
			],
			conditions: { INITIAL: {
				rules: [
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17,
					18
				],
				inclusive: !0
			} }
		};
	})(), e.prototype = o, o.Parser = e, new e();
})();
function Qn(e, t) {
	Q.extend(this, t), this.name = "ParseError", this.message = e || "";
}
Qn.prototype = /* @__PURE__ */ Error(), $.ParseError = Qn, $.parse = function(e) {
	Zn.yy = new $(), Zn.yy.parseError = function(e, t) {
		throw new Qn(e, t);
	};
	var t = Zn.parse(e);
	return delete t.parseError, t;
};
var $n = 10, er = 10, tr = 10, nr = 5, rr = 5, ir = 10, ar = 5, or = 15, sr = 0, cr = 5, lr = 20, ur = $.PLACEMENT, dr = $.LINETYPE, fr = $.ARROWTYPE, pr = 0, mr = 1;
function hr(e) {
	this.message = e;
}
hr.prototype.toString = function() {
	return "AssertException: " + this.message;
};
function gr(e, t) {
	if (!e) throw new hr(t);
}
String.prototype.trim || (String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
}), $.themes = {};
function _r(e, t) {
	$.themes[e] = t;
}
function vr(e) {
	return e.x + e.width / 2;
}
function yr(e) {
	return e.y + e.height / 2;
}
function br(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function xr(e, t, n, r) {
	gr(Q.all([
		e,
		n,
		t,
		r
	], Q.isFinite), "x1,x2,y1,y2 must be numeric");
	var i = Math.sqrt((n - e) * (n - e) + (r - t) * (r - t)) / 25, a = br(Math.random(), .2, .8), o = br(Math.random(), .2, .8), s = Math.random() > .5 ? i : -i, c = Math.random() > .5 ? i : -i, l = {
		x: (n - e) * a + e + s,
		y: (r - t) * a + t + c
	}, u = {
		x: (n - e) * o + e - s,
		y: (r - t) * o + t - c
	};
	return "C" + l.x.toFixed(1) + "," + l.y.toFixed(1) + " " + u.x.toFixed(1) + "," + u.y.toFixed(1) + " " + n.toFixed(1) + "," + r.toFixed(1);
}
function Sr(e, t, n, r) {
	return gr(Q.all([
		e,
		t,
		n,
		r
	], Q.isFinite), "x, y, w, h must be numeric"), "M" + e + "," + t + xr(e, t, e + n, t) + xr(e + n, t, e + n, t + r) + xr(e + n, t + r, e, t + r) + xr(e, t + r, e, t);
}
function Cr(e, t, n, r) {
	return gr(Q.all([
		e,
		n,
		t,
		r
	], Q.isFinite), "x1,x2,y1,y2 must be numeric"), "M" + e.toFixed(1) + "," + t.toFixed(1) + xr(e, t, n, r);
}
var wr = function(e, t) {
	this.init(e, t);
};
if (Q.extend(wr.prototype, {
	init: function(e, t) {
		this.diagram = e, this.actorsHeight_ = 0, this.signalsHeight_ = 0, this.title_ = void 0;
	},
	setupPaper: function(e) {},
	draw: function(e) {
		this.setupPaper(e), this.layout();
		var t = $n + (this.title_ ? this.title_.height : 0);
		this.drawTitle(), this.drawActors(t), this.drawSignals(t + this.actorsHeight_);
	},
	layout: function() {
		var e = this.diagram, t = this.font_, n = e.actors, r = e.signals;
		if (e.width = 0, e.height = 0, e.title) {
			var i = this.title_ = {}, a = this.textBBox(e.title, t);
			i.textBB = a, i.message = e.title, i.width = a.width + (cr + sr) * 2, i.height = a.height + (cr + sr) * 2, i.x = $n, i.y = $n, e.width += i.width, e.height += i.height;
		}
		Q.each(n, function(e) {
			var n = this.textBBox(e.name, t);
			e.textBB = n, e.x = 0, e.y = 0, e.width = n.width + (tr + er) * 2, e.height = n.height + (tr + er) * 2, e.distances = [], e.paddingRight = 0, this.actorsHeight_ = Math.max(e.height, this.actorsHeight_);
		}, this);
		function o(e, t, r) {
			gr(e < t, "a must be less than or equal to b"), e < 0 ? (t = n[t], t.x = Math.max(r - t.width / 2, t.x)) : t >= n.length ? (e = n[e], e.paddingRight = Math.max(r, e.paddingRight)) : (e = n[e], e.distances[t] = Math.max(r, e.distances[t] ? e.distances[t] : 0));
		}
		Q.each(r, function(e) {
			var n, r, i = this.textBBox(e.message, t);
			e.textBB = i, e.width = i.width, e.height = i.height;
			var a = 0;
			if (e.type == "Signal") e.width += (nr + rr) * 2, e.height += (nr + rr) * 2, e.isSelf() ? (n = e.actorA.index, r = n + 1, e.width += lr) : (n = Math.min(e.actorA.index, e.actorB.index), r = Math.max(e.actorA.index, e.actorB.index));
			else if (e.type == "Note") {
				if (e.width += (ir + ar) * 2, e.height += (ir + ar) * 2, a = 2 * er, e.placement == ur.LEFTOF) r = e.actor.index, n = r - 1;
				else if (e.placement == ur.RIGHTOF) n = e.actor.index, r = n + 1;
				else if (e.placement == ur.OVER && e.hasManyActors()) n = Math.min(e.actor[0].index, e.actor[1].index), r = Math.max(e.actor[0].index, e.actor[1].index), a = -(ar * 2 + or * 2);
				else if (e.placement == ur.OVER) {
					n = e.actor.index, o(n - 1, n, e.width / 2), o(n, n + 1, e.width / 2), this.signalsHeight_ += e.height;
					return;
				}
			} else throw Error("Unhandled signal type:" + e.type);
			o(n, r, e.width + a), this.signalsHeight_ += e.height;
		}, this);
		var s = 0;
		return Q.each(n, function(e) {
			e.x = Math.max(s, e.x), Q.each(e.distances, function(t, r) {
				t !== void 0 && (r = n[r], t = Math.max(t, e.width / 2, r.width / 2), r.x = Math.max(r.x, e.x + e.width / 2 + t - r.width / 2));
			}), s = e.x + e.width + e.paddingRight;
		}, this), e.width = Math.max(s, e.width), e.width += 2 * $n, e.height += 2 * $n + 2 * this.actorsHeight_ + this.signalsHeight_, this;
	},
	textBBox: function(e, t) {},
	drawTitle: function() {
		var e = this.title_;
		e && this.drawTextBox(e, e.message, sr, cr, this.font_, pr);
	},
	drawActors: function(e) {
		var t = e;
		Q.each(this.diagram.actors, function(e) {
			this.drawActor(e, t, this.actorsHeight_), this.drawActor(e, t + this.actorsHeight_ + this.signalsHeight_, this.actorsHeight_);
			var n = vr(e);
			this.drawLine(n, t + this.actorsHeight_ - er, n, t + this.actorsHeight_ + er + this.signalsHeight_);
		}, this);
	},
	drawActor: function(e, t, n) {
		e.y = t, e.height = n, this.drawTextBox(e, e.name, er, tr, this.font_, mr);
	},
	drawSignals: function(e) {
		var t = e;
		Q.each(this.diagram.signals, function(e) {
			e.type == "Signal" ? e.isSelf() ? this.drawSelfSignal(e, t) : this.drawSignal(e, t) : e.type == "Note" && this.drawNote(e, t), t += e.height;
		}, this);
	},
	drawSelfSignal: function(e, t) {
		gr(e.isSelf(), "signal must be a self signal");
		var n = e.textBB, r = vr(e.actorA), i = r + lr + rr, a = t + rr + e.height / 2 + n.y;
		this.drawText(i, a, e.message, this.font_, pr);
		var o = t + nr + rr, s = o + e.height - 2 * nr - rr;
		this.drawLine(r, o, r + lr, o, e.linetype), this.drawLine(r + lr, o, r + lr, s, e.linetype), this.drawLine(r + lr, s, r, s, e.linetype, e.arrowtype);
	},
	drawSignal: function(e, t) {
		var n = vr(e.actorA), r = vr(e.actorB), i = (r - n) / 2 + n, a = t + nr + 2 * rr;
		this.drawText(i, a, e.message, this.font_, mr), a = t + e.height - nr - rr, this.drawLine(n, a, r, a, e.linetype, e.arrowtype);
	},
	drawNote: function(e, t) {
		e.y = t;
		var n = vr(e.hasManyActors() ? e.actor[0] : e.actor);
		switch (e.placement) {
			case ur.RIGHTOF:
				e.x = n + er;
				break;
			case ur.LEFTOF:
				e.x = n - er - e.width;
				break;
			case ur.OVER:
				if (e.hasManyActors()) {
					var r = vr(e.actor[1]), i = or + ar;
					e.x = Math.min(n, r) - i, e.width = Math.max(n, r) + i - e.x;
				} else e.x = n - e.width / 2;
				break;
			default: throw Error("Unhandled note placement: " + e.placement);
		}
		return this.drawTextBox(e, e.message, ir, ar, this.font_, pr);
	},
	drawTextBox: function(e, t, n, r, i, a) {
		var o = e.x + n, s = e.y + n, c = e.width - 2 * n, l = e.height - 2 * n;
		return this.drawRect(o, s, c, l), a == mr ? (o = vr(e), s = yr(e)) : (o += r, s += r), this.drawText(o, s, t, i, a);
	}
}), Yn.default !== void 0) {
	var Tr = "http://www.w3.org/2000/svg", Er = {
		stroke: "#000000",
		"stroke-width": 2,
		fill: "none"
	}, Dr = {
		stroke: "#000000",
		"stroke-width": 2,
		fill: "#fff"
	}, Or = {}, kr = function(e, t, n) {
		Q.defaults(t, {
			"css-class": "simple",
			"font-size": 16,
			"font-family": "Andale Mono, monospace"
		}), this.init(e, t, n);
	};
	Q.extend(kr.prototype, wr.prototype, {
		init: function(e, t, n) {
			wr.prototype.init.call(this, e), this.paper_ = void 0, this.cssClass_ = t["css-class"] || void 0, this.font_ = {
				"font-size": t["font-size"],
				"font-family": t["font-family"]
			};
			var r = this.arrowTypes_ = {};
			r[fr.FILLED] = "Block", r[fr.OPEN] = "Open";
			var i = this.lineTypes_ = {};
			i[dr.SOLID] = "", i[dr.DOTTED] = "6,2";
			var a = this;
			this.waitForFont(function() {
				n(a);
			});
		},
		waitForFont: function(e) {
			var t = this.font_["font-family"];
			if (Xn.default === void 0) throw Error("WebFont is required (https://github.com/typekit/webfontloader).");
			Or[t] ? e() : Xn.default.load({
				custom: { families: [t] },
				classes: !1,
				active: function() {
					Or[t] = !0, e();
				},
				inactive: function() {
					Or[t] = !0, e();
				}
			});
		},
		addDescription: function(e, t) {
			var n = document.createElementNS(Tr, "desc");
			n.appendChild(document.createTextNode(t)), e.appendChild(n);
		},
		setupPaper: function(e) {
			var t = document.createElementNS(Tr, "svg");
			e.appendChild(t), this.addDescription(t, this.diagram.title || ""), this.paper_ = (0, Yn.default)(t), this.paper_.addClass("sequence"), this.cssClass_ && this.paper_.addClass(this.cssClass_), this.beginGroup();
			var n = this.arrowMarkers_ = {}, r = this.paper_.path("M 0 0 L 5 2.5 L 0 5 z");
			n[fr.FILLED] = r.marker(0, 0, 5, 5, 5, 2.5), r = this.paper_.path("M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"), n[fr.OPEN] = r.marker(0, 0, 9.6, 16, 9.6, 8).attr({ markerWidth: "4" });
		},
		layout: function() {
			wr.prototype.layout.call(this), this.paper_.attr({
				width: this.diagram.width + "px",
				height: this.diagram.height + "px"
			});
		},
		textBBox: function(e, t) {
			var n = this.createText(e, t), r = n.getBBox();
			return n.remove(), r;
		},
		pushToStack: function(e) {
			return this._stack.push(e), e;
		},
		beginGroup: function() {
			this._stack = [];
		},
		finishGroup: function() {
			var e = this.paper_.group.apply(this.paper_, this._stack);
			return this.beginGroup(), e;
		},
		createText: function(e, t) {
			e = Q.invoke(e.split("\n"), "trim");
			var n = this.paper_.text(0, 0, e);
			return n.attr(t || {}), e.length > 1 && n.selectAll("tspan:nth-child(n+2)").attr({
				dy: "1.2em",
				x: 0
			}), n;
		},
		drawLine: function(e, t, n, r, i, a) {
			var o = this.paper_.line(e, t, n, r).attr(Er);
			return i !== void 0 && o.attr("strokeDasharray", this.lineTypes_[i]), a !== void 0 && o.attr("markerEnd", this.arrowMarkers_[a]), this.pushToStack(o);
		},
		drawRect: function(e, t, n, r) {
			var i = this.paper_.rect(e, t, n, r).attr(Dr);
			return this.pushToStack(i);
		},
		drawText: function(e, t, n, r, i) {
			var a = this.createText(n, r), o = a.getBBox();
			return i == mr && (e -= o.width / 2, t -= o.height / 2), a.attr({
				x: e - o.x,
				y: t - o.y
			}), a.selectAll("tspan").attr({ x: e }), this.pushToStack(a), a;
		},
		drawTitle: function() {
			return this.beginGroup(), wr.prototype.drawTitle.call(this), this.finishGroup().addClass("title");
		},
		drawActor: function(e, t, n) {
			return this.beginGroup(), wr.prototype.drawActor.call(this, e, t, n), this.finishGroup().addClass("actor");
		},
		drawSignal: function(e, t) {
			return this.beginGroup(), wr.prototype.drawSignal.call(this, e, t), this.finishGroup().addClass("signal");
		},
		drawSelfSignal: function(e, t) {
			return this.beginGroup(), wr.prototype.drawSelfSignal.call(this, e, t), this.finishGroup().addClass("signal");
		},
		drawNote: function(e, t) {
			return this.beginGroup(), wr.prototype.drawNote.call(this, e, t), this.finishGroup().addClass("note");
		}
	});
	var Ar = function(e, t, n) {
		Q.defaults(t, {
			"css-class": "hand",
			"font-size": 16,
			"font-family": "danielbd"
		}), this.init(e, t, n);
	};
	Q.extend(Ar.prototype, kr.prototype, {
		drawLine: function(e, t, n, r, i, a) {
			var o = this.paper_.path(Cr(e, t, n, r)).attr(Er);
			return i !== void 0 && o.attr("strokeDasharray", this.lineTypes_[i]), a !== void 0 && o.attr("markerEnd", this.arrowMarkers_[a]), this.pushToStack(o);
		},
		drawRect: function(e, t, n, r) {
			var i = this.paper_.path(Sr(e, t, n, r)).attr(Dr);
			return this.pushToStack(i);
		}
	}), _r("snapSimple", kr), _r("snapHand", Ar);
}
if (typeof Raphael > "u" && Yn.default === void 0) throw Error("Raphael or Snap.svg is required to be included.");
if (Q.isEmpty($.themes)) throw Error("No themes were registered. Please call registerTheme(...).");
$.themes.hand = $.themes.snapHand || $.themes.raphaelHand, $.themes.simple = $.themes.snapSimple || $.themes.raphaelSimple, $.prototype.drawSVG = function(e, t) {
	if (t = Q.defaults(t || {}, { theme: "hand" }), !(t.theme in $.themes)) throw Error("Unsupported theme: " + t.theme);
	var n = Q.isString(e) ? document.getElementById(e) : e;
	if (n === null || !n.tagName) throw Error("Invalid container: " + e);
	var r = $.themes[t.theme];
	new r(this, t, function(e) {
		e.draw(n);
	});
};
// ../../marktext/packages/muya/src/utils/diagram/sequence/index.ts
var jr = $;
export { jr as default };

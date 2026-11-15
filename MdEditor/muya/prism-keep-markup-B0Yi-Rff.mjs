// ../../marktext/node_modules/.pnpm/prismjs@1.30.0/node_modules/prismjs/plugins/keep-markup/prism-keep-markup.js
(function() {
	typeof Prism < "u" && typeof document < "u" && document.createRange && (Prism.plugins.KeepMarkup = !0, Prism.hooks.add("before-highlight", function(e) {
		if (!e.element.children.length || !Prism.util.isActive(e.element, "keep-markup", !0)) return;
		var t = Prism.util.isActive(e.element, "drop-tokens", !1);
		function n(e) {
			return !(t && e.nodeName.toLowerCase() === "span" && e.classList.contains("token"));
		}
		var r = 0, i = [];
		function a(e) {
			if (!n(e)) o(e);
			else {
				var t = {
					element: e,
					posOpen: r
				};
				i.push(t), o(e), t.posClose = r;
			}
		}
		function o(e) {
			for (var t = 0, n = e.childNodes.length; t < n; t++) {
				var i = e.childNodes[t];
				i.nodeType === 1 ? a(i) : i.nodeType === 3 && (r += i.data.length);
			}
		}
		o(e.element), i.length && (e.keepMarkup = i);
	}), Prism.hooks.add("after-highlight", function(e) {
		if (e.keepMarkup && e.keepMarkup.length) {
			var t = function(e, n) {
				for (var r = 0, i = e.childNodes.length; r < i; r++) {
					var a = e.childNodes[r];
					if (a.nodeType === 1) {
						if (!t(a, n)) return !1;
					} else a.nodeType === 3 && (!n.nodeStart && n.pos + a.data.length > n.node.posOpen && (n.nodeStart = a, n.nodeStartPos = n.node.posOpen - n.pos), n.nodeStart && n.pos + a.data.length >= n.node.posClose && (n.nodeEnd = a, n.nodeEndPos = n.node.posClose - n.pos), n.pos += a.data.length);
					if (n.nodeStart && n.nodeEnd) {
						var o = document.createRange();
						return o.setStart(n.nodeStart, n.nodeStartPos), o.setEnd(n.nodeEnd, n.nodeEndPos), n.node.element.innerHTML = "", n.node.element.appendChild(o.extractContents()), o.insertNode(n.node.element), o.detach(), !1;
					}
				}
				return !0;
			};
			e.keepMarkup.forEach(function(n) {
				t(e.element, {
					node: n,
					pos: 0
				});
			}), e.highlightedCode = e.element.innerHTML;
		}
	}));
})();

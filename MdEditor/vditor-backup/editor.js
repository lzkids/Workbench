(function () {
  var vd = null; var muted = false; var dark = false; var cur = '';
  var useToolbar = false;
  function post(m) { try { window.chrome.webview.postMessage(m); } catch (e) { } }

  // 常用语法工具栏(MD 文档窗用;便签小窗 init 不带 toolbar=true → 保持纯打字面)
  var MD_TOOLBAR = [
    'headings', 'bold', 'italic', 'strike', '|',
    'list', 'ordered-list', 'check', 'quote', '|',
    'code', 'inline-code', 'link', 'table', '|',
    'undo', 'redo'
  ];

  // 外链统一走宿主系统浏览器:Vditor 不再 window.open(消除 NewWindowRequested 弹窗面)
  function openExternal(el) {
    var href = null;
    try {
      if (typeof el === 'string') href = el;
      else if (el) {
        var a = el.closest ? (el.closest('a') || el) : el;
        href = (a.getAttribute && a.getAttribute('href')) || (el.dataset && el.dataset.href) || null;
      }
    } catch (e) { }
    if (href) post({ type: 'openlink', url: href });
  }

  // 重建式换肤:Vditor 不支持运行时切主题,内容从 cur 恢复(cur 在 input 里持续跟踪,是 JS 侧真值)
  function build(value) {
    var el = document.getElementById('ed');
    if (vd) { try { vd.destroy(); } catch (e) { } vd = null; }
    document.body.classList.toggle('no-toolbar', !useToolbar);
    vd = new Vditor(el, {
      mode: 'ir',                      // 即时渲染 = Typora 式:输入语法后自动渲染,光标回入显示原文
      lang: 'zh_CN',
      cdn: '.',                        // 资产全部本地(虚拟域名根),禁 CDN
      theme: dark ? 'dark' : 'light',
      value: value || '',
      toolbar: useToolbar ? MD_TOOLBAR : [],
      cache: { enable: false },
      counter: { enable: false },
      height: '100%',
      resize: { enable: false },
      link: { isOpen: false, click: function (el) { openExternal(el); } }, // 外链交宿主系统浏览器,不 window.open
      preview: { theme: { current: dark ? 'dark' : 'light', path: 'dist/css/content-theme/' } },
      input: function (v) { cur = v; if (!muted) post({ type: 'input', value: v }); },
      blur: function () { post({ type: 'blur' }); },
      after: function () {
        post({ type: 'ready' });
        // 视口诊断:宿主可见宽度 vs 实际排版宽度(排查 h-scroll 错配)
        var el2 = document.getElementById('ed');
        var rs = el2.querySelector('.vditor-reset');
        setTimeout(function () {
          post({
            type: 'metrics',
            innerW: window.innerWidth, innerH: window.innerHeight,
            edW: el2.offsetWidth, edH: el2.offsetHeight,
            resetW: rs ? rs.getBoundingClientRect().width : -1,
            scrollW: document.documentElement.scrollWidth,
            bodyScrollW: document.body.scrollWidth
          });
        }, 300);
      }
    });
  }

  window.chrome.webview.addEventListener('message', function (e) {
    var m = e.data || {};
    if (m.type === 'init') {
      dark = !!m.dark;
      useToolbar = !!m.toolbar; // MD 文档窗开语法工具栏,便签小窗不带此字段=纯打字面
      document.documentElement.style.setProperty('--nb', m.bg || '#FEF3A2');
      document.documentElement.style.setProperty('--nfg', m.fg || '#3D3617');
      document.documentElement.style.setProperty('--nac', m.accent || '#8A7B2E');
      var ct = document.getElementById('ct');
      if (ct) ct.href = dark ? 'dist/css/content-theme/dark.css' : 'dist/css/content-theme/light.css';
      cur = m.content || '';
      build(cur);
    } else if (m.type === 'content') {   // 外部改了内容(如卡片同步),整段替换
      cur = m.value || '';
      if (vd) { muted = true; try { vd.setValue(cur); } catch (e2) { } muted = false; }
    } else if (m.type === 'theme') {     // 深浅主题切换(MD 文档窗还会带新配色,便签小窗沿用卡片色)
      dark = !!m.dark;
      if (m.bg) document.documentElement.style.setProperty('--nb', m.bg);
      if (m.fg) document.documentElement.style.setProperty('--nfg', m.fg);
      if (m.accent) document.documentElement.style.setProperty('--nac', m.accent);
      var ct = document.getElementById('ct');
      if (ct) ct.href = dark ? 'dist/css/content-theme/dark.css' : 'dist/css/content-theme/light.css';
      build(cur);
    }
  });

  post({ type: 'boot' });

  // 无 WebView2 宿主(浏览器直开调试)时自演示,600ms 内宿主没来就算浏览器态
  setTimeout(function () {
    if (!vd && dark === false && cur === '') {
      cur = '# 会议纪要模板\n\n**要点** 加粗、*斜体*、~~删除线~~、`行内代码`\n\n- [x] 已完成项\n- [ ] 待办项\n1. 编号列表\n\n> 引用一行提示\n\n[链接](https://example.com)';
      build(cur);
    }
  }, 600);
})();

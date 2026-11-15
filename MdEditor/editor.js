// MD 编辑页胶水层 v2:内核 Vditor → Muya(MarkText 同款 @muyajs/core,ES module 本地加载)。
// 桥协议与 Vditor 版完全一致,宿主侧零改动:
//   JS→C#: boot | ready | input{value} | blur | metrics{...} | openlink{url}
//   C#→JS: init{content,dark,bg,fg,accent,toolbar?} | content{value} | theme{dark[,bg,fg,accent]}
// 回滚:换回 vditor-backup/ 里两个文件(dist/ 仍原样保留)。

import { Muya, zhCN, LinkTools, InlineFormatToolbar, ParagraphFrontButton, ParagraphFrontMenu,
  ParagraphQuickInsertMenu, CodeBlockLanguageSelector, TableDragBar, TableColumnToolbar,
  TableRowColumMenu, TableChessboard, EmojiSelector, FootnoteTool, PreviewToolBar }
  from './muya/index.js';

var muya = null; var muted = false; var dark = false; var cur = '';
var useToolbar = false; var _raf = 0; var pluginsOn = false;
var pixelFont = null; // 像素风主题时宿主下发像素字体(经 --mu-font-family 生效)
var DEFAULT_FONT = "'Open Sans', 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', sans-serif";
// WebView2 宿主桥(浏览器直开调试时为 null,走演示兜底)
var host = (window.chrome && window.chrome.webview) ? window.chrome.webview : null;

function post(m) { try { if (host) host.postMessage(m); } catch (e) { } }

function applyVars(m) {
  if (m.bg) document.documentElement.style.setProperty('--nb', m.bg);
  if (m.fg) document.documentElement.style.setProperty('--nfg', m.fg);
  if (m.accent) document.documentElement.style.setProperty('--nac', m.accent);
}

function applyDark(d) {
  dark = !!d;
  document.documentElement.classList.toggle('dark', dark);
}

// 悬浮工具插件(MD 文档窗);便签小窗 init 不带 toolbar=true → 纯打字面。
// 图片工具不接(Workbench 无本地图片管线,图片语法文本仍可用);注册须在 init() 前,故收在 build 里。
function registerPlugins(full) {
  if (pluginsOn) return;
  Muya.use(LinkTools, { jumpClick: function (li) { if (li && li.href) post({ type: 'openlink', url: li.href }); } });
  if (full) {
    [InlineFormatToolbar, ParagraphFrontButton, ParagraphFrontMenu, ParagraphQuickInsertMenu,
     CodeBlockLanguageSelector, TableDragBar, TableColumnToolbar, TableRowColumMenu,
     TableChessboard, EmojiSelector, FootnoteTool, PreviewToolBar].forEach(function (p) { Muya.use(p); });
  }
  pluginsOn = true;
}

// 视口诊断:宿主可见宽度 vs 实际排版宽度(字段与 Vditor 版 metrics 一致)
function metrics() {
  var ed = document.querySelector('.mu-editor');
  var cont = document.querySelector('.mu-container');
  post({
    type: 'metrics',
    innerW: window.innerWidth, innerH: window.innerHeight,
    edW: ed ? ed.offsetWidth : -1, edH: ed ? ed.offsetHeight : -1,
    resetW: cont ? cont.getBoundingClientRect().width : -1,
    scrollW: document.documentElement.scrollWidth,
    bodyScrollW: document.body.scrollWidth
  });
}

// Muya 主题走 CSS 变量实时换肤(muya-theme.css 把宿主 --nb/--nfg/--nac 映射进编辑器变量),无需重建实例
function build(value) {
  var el = document.getElementById('ed');
  if (muya) { try { muya.destroy(); } catch (e) { } muya = null; }
  document.body.classList.toggle('no-toolbar', !useToolbar);
  // getContainer 会替换传入元素 → 每次都挂一个新内层节点,外层 #ed 只保高度
  var inner = document.createElement('div');
  el.replaceChildren(inner);
  registerPlugins(useToolbar);
  muya = new Muya(inner, {
    markdown: value || '',
    fontSize: 16,
    lineHeight: 1.6,
    editorFontFamily: pixelFont || DEFAULT_FONT,
    autoPairBracket: true,
    autoPairMarkdownSyntax: true,
    codeBlockLineNumbers: false,
    mermaidTheme: dark ? 'dark' : 'default',
    vegaTheme: dark ? 'dark' : 'latimes'
  });
  muya.locale(zhCN);
  // 输入 → 整文 markdown 发宿主;json-change 逐键触发,rAF 合并避免大文档逐键序列化
  muya.on('json-change', function () {
    if (_raf) return;
    _raf = requestAnimationFrame(function () {
      _raf = 0;
      if (!muya) return;
      if (muted) { muted = false; return; }  // 外部回灌的那次变更不回发
      cur = muya.getMarkdown();
      post({ type: 'input', value: cur });
    });
  });
  muya.on('blur', function () { post({ type: 'blur' }); });
  muya.init();
  post({ type: 'ready' });
  setTimeout(metrics, 300);
}

if (host) host.addEventListener('message', function (e) {
  var m = e.data || {};
  if (m.type === 'init') {
    applyDark(m.dark);
    useToolbar = !!m.toolbar;   // MD 文档窗开悬浮工具,便签小窗不带此字段=纯打字面
    pixelFont = m.font || null; // 像素风字体在 build() 前就位
    applyVars(m);
    cur = m.content || '';
    build(cur);
  } else if (m.type === 'content') {   // 外部改了内容(如卡片同步),整段替换
    cur = m.value || '';
    if (muya) { muted = true; try { muya.setContent(cur); } catch (e2) { } }
  } else if (m.type === 'theme') {     // 深浅主题切换:只刷变量+dark 类,实例不重建(Muya 支持实时换肤)
    applyDark(m.dark);
    applyVars(m);
    if ('font' in m) pixelFont = m.font || null;
    if (muya) { try { muya.setOptions({ editorFontFamily: pixelFont || DEFAULT_FONT, mermaidTheme: dark ? 'dark' : 'default', vegaTheme: dark ? 'dark' : 'latimes' }); } catch (e2) { } }
  }
});

post({ type: 'boot' });

// 无 WebView2 宿主(浏览器直开调试)时自演示,600ms 内宿主没来就算浏览器态
setTimeout(function () {
  if (!muya && dark === false && cur === '') {
    cur = '# 会议纪要模板\n\n**要点** 加粗、*斜体*、~~删除线~~、`行内代码`\n\n- [x] 已完成项\n- [ ] 待办项\n1. 编号列表\n\n> 引用一行提示\n\n[链接](https://example.com)';
    build(cur);
  }
}, 600);

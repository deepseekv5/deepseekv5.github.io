(function () {
  'use strict';

  /* ===================== 风格切换（正常 / 猫娘 / 搞笑） ===================== */
  var MODES = {
    neko: {
      title: '你好喵，我是 deepseekv5', subtitle: '学生 · 写代码的 · 一个人的工作室喵',
      lede1: '我是中国的中学生喵。放学后写代码，主要做三件事：把麻烦的操作变成小工具、在浏览器里搭 3D 场景、用脚本给别人的编辑器加功能喵。',
      lede2: '这些都放在 GitHub 上，全部开源喵。就咱一个人做，所以更新快不快，要看作业多不多喵。',
      aside1: '这里是咱的个人主页，放作品索引和一些零碎想法喵。这一页只讲咱自己，工作室的事在工作室官网喵。',
      aside2: '如果是来找某个项目的，直接跳到「作品」那节更快喵。',
      pull: '「与其做漂亮的半成品，不如做一个能跑的丑东西喵。」',
      cite: '—— 咱判断要不要发布的标准，到现在没变过喵',
      s1: '关于咱自己', s2: '在做什么喵', s3: '做过的东西', s4: '咱用的工具',
      s5: '一些想法', s6: '都干了啥', s7: '来找咱',
      n1: '尽量说实话，不包装喵。',
      n2: '三条主线，外加一个还在打磨的东西喵。',
      n3: '全部开源喵，点进去就能看代码。',
      n4: '配置清单喵，仅供参考。',
      n5: '零散的想法，以后可能会变喵。',
      n6: '从最近往前排，只写发生过的喵。',
      e1: '给积木编辑器换一套深色皮肤喵。', e2: '在浏览器里走进别人搭的方块地图喵。',
      e3: '在 Mac 上跑 Windows 程序，不用装虚拟机喵。', e4: '会干活的智能体，不是聊天框喵。',
      u1: '桌面小工具', u2: '网页和图形', u3: '自动化脚本',
      i1: '工具好不好用，看最短那步', i2: '报错信息最容易被忽略', i3: '本地优先不只是情怀喵',
      contact1: '想聊项目、报 Bug、或者只是打招呼，来 GitHub 找咱最快喵。咱每条 Issue 都会看，回复可能会慢一点喵。',
      foot: '本站纯静态 · 没有统计 · 安心看喵'
    },
    funny: {
      title: '你好，我是 deepseekv5（真人）', subtitle: '学生 / 开发者 / 一个人干完所有活',
      lede1: '我是一名中学生，课余时间写代码。主要做三件事：写工具、修 Bug、以及向别人解释这些工具为什么存在。',
      lede2: '全部开源在 GitHub。一个人做，所以更新节奏取决于考试周什么时候来。',
      aside1: '这是我的个人主页，放作品和想法。工作室官网那边比较正经，这一页比较像我。',
      aside2: '赶时间的话直接跳到「作品」，其他都是我自言自语。',
      pull: '「先让它跑起来。丑不丑的，反正也没人夸我好看。」',
      cite: '—— 我唯一一条始终坚持的开发原则',
      s1: '自我介绍（真人版）', s2: '最近在忙什么', s3: '作品（按完成度排序）',
      s4: '我的装备', s5: '胡思乱想', s6: '流水账', s7: '找我',
      n1: '尽量说实话，包装太累。',
      n2: '四条线，其中一条还在保密（其实也没什么好保密的）。',
      n3: '全部开源。代码不好看，但确实是开源的。',
      n4: '我的装备清单。不构成推荐，因为我也不知道什么好。',
      n5: '一些想法，随时可能反悔。',
      n6: '倒序，只记发生的事（不记 flag）。',
      e1: '给编辑器换皮肤，省眼睛。', e2: '在网页里走进别人搭的地图。',
      e3: '在 Mac 上跑 exe，不装虚拟机。', e4: '会干活的智能体，不是另一个聊天框。',
      u1: '桌面工具（双击就能用）', u2: '网页与图形（不用装）', u3: '自动化（懒人福音）',
      i1: '工具的价值 = 最短使用路径', i2: '报错信息是最被低估的细节', i3: '本地优先，主要是为了省心',
      contact1: '想聊项目、报 Bug 或打个招呼，走 GitHub。我看每一条 Issue，回复速度取决于我作业写完没有。',
      foot: '本站纯静态 · 没有追踪 · 想看多久看多久'
    }
  };

  var MODE_KEY = 'd5-mode';
  var vEls = [].slice.call(document.querySelectorAll('[data-v]'));
  vEls.forEach(function (el) { el.setAttribute('data-orig', el.textContent); });

  function applyMode(m) {
    if (!m || m === 'normal') m = 'normal';
    document.documentElement.dataset.mode = m;
    vEls.forEach(function (el) {
      var k = el.getAttribute('data-v');
      var pack = MODES[m] || {};
      el.textContent = pack[k] || el.getAttribute('data-orig');
    });
    var btns = document.querySelectorAll('.mode-switch button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('on', btns[i].getAttribute('data-mode') === m);
    }
    try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
    if (window.__onMode) window.__onMode(m);
  }

  var sw = document.getElementById('modeSwitch');
  if (sw) {
    sw.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (b) applyMode(b.getAttribute('data-mode'));
    });
  }
  var savedMode = null;
  try { savedMode = localStorage.getItem(MODE_KEY); } catch (e) {}
  if (savedMode && MODES[savedMode]) applyMode(savedMode);

  var root = document.documentElement;
  var key = 'd5-paper-theme';

  var saved = null;
  try { saved = localStorage.getItem(key); } catch (e) { saved = null; }
  if (saved) root.dataset.theme = saved;

  var btn = document.getElementById('themeBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(key, next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#1b1916' : '#f7f4ee');
    });
  }

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  var links = [].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = -1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].offsetTop <= pos) current = i;
    }
    links.forEach(function (a, i) { a.classList.toggle('on', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

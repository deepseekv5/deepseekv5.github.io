/* ============================================================
   个人主页交互脚本
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'd5-paper-theme';
  var MODE_KEY = 'd5-mode';

  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (saved) root.dataset.theme = saved;

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });

  /* ---------- 风格切换 ---------- */
  var MODES = {
    neko: {
      title: '你好喵，我是 deepseekv5', subtitle: '学生 · 写代码的 · 一个人的工作室喵',
      lede: '我是中国的中学生喵。放学后写代码，主要做三件事：把麻烦的操作变成小工具、在浏览器里搭 3D 场景、用脚本给别人的编辑器加功能喵。',
      foot: '本站纯静态 · 没有统计 · 安心看喵'
    },
    funny: {
      title: '你好，我是 deepseekv5（真人）', subtitle: '学生 / 开发者 / 一个人干完所有活',
      lede: '我是一名中学生，课余时间写代码。主要做三件事：写工具、修 Bug、以及向别人解释这些工具为什么存在。',
      foot: '本站纯静态 · 没有追踪 · 想看多久看多久'
    },
    terminal: {
      title: 'deepseekv5@macbook ~ %', subtitle: 'whoami → student, developer',
      lede: '# 课余时间写代码。全部开源，更新看作业多不多。',
      foot: '-- end of file --'
    },
    paper: {
      title: 'deepseekv5', subtitle: '个人主页 · 二〇二六年',
      lede: '本站记录一名中学生课余时间的开发工作，涉及桌面工具、网页图形与自动化。',
      foot: '本站无广告 · 无追踪'
    },
    blueprint: {
      title: 'deepseekv5', subtitle: 'PROFILE SHEET / REV. 2026',
      lede: '身份：学生 / 独立开发者。所在地：中国。',
      foot: 'DRAFT'
    },
    note: {
      title: 'deepseekv5', subtitle: '我的小本子',
      lede: '放学后写的代码，都记在这里。还有一些想到哪写到哪的想法。',
      foot: '写完了，谢谢你看'
    },
    pixel: {
      title: 'DEEPSEEKV5', subtitle: 'PLAYER 1 READY',
      lede: '职业：学生 / 开发者。装备：一台 Mac。已解锁三个开源项目。',
      foot: 'THANKS FOR PLAYING'
    }
  };

  var vEls = [].slice.call(document.querySelectorAll('[data-v]'));
  vEls.forEach(function (el) { el.setAttribute('data-orig', el.textContent); });

  function applyMode(m) {
    if (!m || m === 'normal') m = 'normal';
    root.dataset.mode = m;
    vEls.forEach(function (el) {
      var pack = MODES[m] || {};
      el.textContent = pack[el.getAttribute('data-v')] || el.getAttribute('data-orig');
    });
    var sel = document.getElementById('modeSelect');
    if (sel) sel.value = m;
    try { localStorage.setItem(MODE_KEY, m); } catch (e) {}
  }

  var selBox = document.getElementById('modeSelect');
  if (selBox) selBox.addEventListener('change', function () { applyMode(selBox.value); });

  var savedMode = null;
  try { savedMode = localStorage.getItem(MODE_KEY); } catch (e) {}
  if (savedMode && MODES[savedMode]) applyMode(savedMode);

  /* ---------- 移动菜单 ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('navLinks');
  if (burger && nav) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  /* ---------- 滚动渐显 ---------- */
  var revealed = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 导航高亮 ---------- */
  var links = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    var pos = window.scrollY + 140;
    var cur = -1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].offsetTop <= pos) cur = i;
    }
    links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ===================== 1024 程序员节 ===================== */
(function () {
  var fest = document.getElementById('fest');
  var cd = document.getElementById('festCd');
  if (!fest) return;

  var now = new Date();
  var y = now.getFullYear();
  var start = new Date(y, 9, 23, 20, 0, 0);
  var end = new Date(y, 9, 24, 23, 59, 59);
  var zero = new Date(y, 9, 24, 0, 0, 0);

  if (now < start || now > end) { fest.hidden = true; return; }
  fest.hidden = false;

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var d = zero.getTime() - Date.now();
    if (d > 0) {
      var s = Math.floor(d / 1000);
      cd.textContent = '距 10 月 24 日 0 点还有 ' + Math.floor(s / 3600) + ' 时 ' + pad(Math.floor(s % 3600 / 60)) + ' 分 ' + pad(s % 60) + ' 秒';
    } else {
      var left = end.getTime() - Date.now();
      if (left <= 0) { fest.hidden = true; clearInterval(timer); return; }
      cd.textContent = '节日进行中 · 1024 · Happy Coding';
    }
  }
  tick();
  var timer = setInterval(tick, 1000);
})();

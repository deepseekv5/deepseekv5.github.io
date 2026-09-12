/* ============================================================
   deepseekv5 · 个人主页 · 交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 作品数据（新增直接往数组里加即可） ---------- */
  var PROJECTS = [
    {
      name: 'KittenN Cyberpunk Editor',
      sub: 'EDITOR THEME / PLAYWRIGHT',
      icon: 'brush',
      desc: '一键把编程猫 KittenN 积木编辑器改造成深色液态玻璃风格。不是油猴插件，用 Playwright 驱动本机 Chrome 注入主题。',
      tags: ['JavaScript', 'Playwright', 'MIT'],
      lang: 'JavaScript',
      star: 2,
      updated: '2026-08-28',
      url: 'https://github.com/deepseekv5/kittenN-cyberpunk-editor'
    },
    {
      name: 'Arcadia Base 网页运行器',
      sub: '3D WEB RUNNER / THREE.JS',
      icon: 'cube',
      desc: '在浏览器里加载并 3D 漫游 Dao3 / Box3 地图：384 种真实方块贴图、13 种流体、三套相机模式。',
      tags: ['TypeScript', 'Next.js', 'Three.js', 'Docker'],
      lang: 'TypeScript',
      star: 1,
      updated: '2026-08-29',
      url: 'https://github.com/deepseekv5/arcadia-base'
    },
    {
      name: 'WineAppRunner',
      sub: 'MACOS NATIVE TOOL / WINE',
      icon: 'window',
      desc: '在 macOS 上通过 Wine 兼容层原生运行 Windows exe，不需要虚拟机，不需要折腾命令行。',
      tags: ['Python', 'Wine', 'macOS'],
      lang: 'Python',
      star: 0,
      updated: '2026-08-28',
      url: 'https://github.com/deepseekv5/WineAppRunner'
    }
  ];

  var ICONS = {
    brush: '<path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.5 6.5l4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    cube: '<path d="M12 2.6l8 4.6v9.6l-8 4.6-8-4.6V7.2l8-4.6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 7.2l8 4.6 8-4.6M12 21.4v-9.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
    window: '<rect x="3" y="4" width="18" height="16" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    agent: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
  };

  var STUDIO = 'https://deepseekv5.github.io/jutian-studio/';
  var AGENT = 'https://deepseekv5.github.io/jutian-agent/';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var arrow = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ===================== 作品卡片 ===================== */
  var grid = document.getElementById('projectGrid');
  if (grid) {
    var html = PROJECTS.map(function (p, i) {
      var tags = p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('');
      return '' +
        '<article class="card reveal" style="transition-delay:' + (i * 80) + 'ms">' +
          '<div class="card-top">' +
            '<div class="card-icon"><svg viewBox="0 0 24 24" width="22" height="22">' + (ICONS[p.icon] || ICONS.cube) + '</svg></div>' +
            '<div class="card-meta"><span class="star">' + p.star + ' stars</span><span>' + esc(p.lang) + '</span><span>' + esc(p.updated) + '</span></div>' +
          '</div>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<div class="card-sub">' + esc(p.sub) + '</div>' +
          '<p class="card-desc">' + esc(p.desc) + '</p>' +
          '<ul class="tag-list">' + tags + '</ul>' +
          '<div class="card-foot"><a class="link-btn" href="' + p.url + '" target="_blank" rel="noopener">查看仓库' + arrow + '</a></div>' +
        '</article>';
    }).join('');

    html += '' +
      '<article class="card card-soon reveal" style="transition-delay:240ms">' +
        '<div class="card-top">' +
          '<div class="card-icon"><svg viewBox="0 0 24 24" width="22" height="22">' + ICONS.agent + '</svg></div>' +
          '<div class="card-meta"><span class="star">PREVIEW</span><span>Agent</span><span>预览版官网已上线</span></div>' +
        '</div>' +
        '<h3>巨天 Agent</h3>' +
        '<div class="card-sub">DESKTOP AI AGENT</div>' +
        '<p class="card-desc">运行在桌面上的 AI 智能体：操作终端、管理文件、编写代码、生成 PPT、语音对话，五档思考程度由你定。</p>' +
        '<ul class="tag-list"><li>Electron</li><li>本地记忆</li><li>语音对话</li></ul>' +
        '<div class="card-foot"><a class="link-btn" href="' + AGENT + '" target="_blank" rel="noopener">访问官网' + arrow + '</a></div>' +
      '</article>';

    grid.innerHTML = html;

    grid.addEventListener('mousemove', function (e) {
      var card = e.target.closest ? e.target.closest('.card') : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ===================== 头像加载失败兜底 ===================== */
  document.querySelectorAll('.avatar-sm img, .avatar-lg img').forEach(function (img) {
    img.addEventListener('error', function () {
      var box = img.parentNode;
      img.remove();
      box.classList.add('fallback');
    });
  });

  /* ===================== 主题切换 ===================== */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('d5-theme'); } catch (err) { saved = null; }
  if (saved) root.dataset.theme = saved;

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('d5-theme', next); } catch (err) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#06080f' : '#f7f8fc');
    });
  }

  /* ===================== 移动端菜单 ===================== */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' || e.target.tagName === 'I') {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===================== 导航 / 进度条 ===================== */
  var nav = document.getElementById('nav');
  var bar = document.querySelector('#progress span');
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var links = [].slice.call(document.querySelectorAll('.nav-links a'));

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    var pos = y + 140;
    var current = sections.length ? sections[0].id : '';
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= pos) current = sections[i].id;
    }
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ===================== 滚动显现 ===================== */
  var revealed = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  /* ===================== 数字滚动 ===================== */
  function runCounter(el) {
    var n = parseFloat(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = n + suffix; return; }
    var dur = 1400, t0 = 0;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ===================== 磁吸 / 光标光晕 ===================== */
  var glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches && !reduced) {
    window.addEventListener('mousemove', function (e) {
      if (glow) {
        glow.classList.add('on');
        glow.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      }
    }, { passive: true });

    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        el.style.transform = 'translate(' + (x * 5).toFixed(2) + 'px,' + (y * 3.5).toFixed(2) + 'px) translateY(-2px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ===================== 年份 ===================== */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ===================== 背景粒子 ===================== */
  var canvas = document.getElementById('net');
  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var dots = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(70, Math.round((w * h) / 22000));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.4 + 0.6
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      var light = root.dataset.theme === 'light';
      var dotC = light ? 'rgba(20,40,80,.28)' : 'rgba(150,195,255,.5)';
      var lineC = light ? 'rgba(20,40,80,' : 'rgba(140,195,255,';
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = dotC; ctx.fill();
        for (var j = i + 1; j < dots.length; j++) {
          var o = dots[j];
          var dx = d.x - o.x, dy = d.y - o.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 138) {
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = lineC + (0.15 * (1 - dist / 138)).toFixed(3) + ')';
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  }
})();

/**
 * LNPRJ Shared Navigation
 * Usage: LNPRJ.init({ current: N, basePath: '../' })
 */
(function () {
  const PROJECTS = [
    { id: 1, zh: '日語文法解析', en: 'Japanese Grammar Analyzer', href: 'jpgrammer/index.html' },
    { id: 2, zh: '趕魚',         en: 'Pond · Fish · Simulation',  href: 'ganyu/index.html' },
    { id: 3, zh: '工作流整合',   en: 'AI Workflow Hub',            href: 'infographic/index.html' },
    { id: 4, zh: 'AI 第二大腦',  en: 'AI Second Brain',            href: '2ndbrian/lnprj04-preview.html' },
    { id: 5, zh: '星空互動',     en: 'Starfield Interaction',      href: 'lnprj05/index.html' },
    { id: 6, zh: '台股財報分析', en: 'Stock Report Analyzer',      href: 'lnprj06/public/index.html' },
    { id: 7, zh: '半導體供應鏈圖', en: 'Semiconductor Supply Chain', href: 'lnprj07/public/index.html' },
  ];

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lnprj-trigger {
        position: fixed;
        top: 1.2rem;
        left: 1.2rem;
        z-index: 9998;
        background: transparent;
        border: .5px solid rgba(229,225,216,.18);
        color: currentColor;
        font-family: 'Space Mono', 'Courier New', monospace;
        font-size: 10px;
        letter-spacing: .18em;
        padding: .45rem .8rem;
        cursor: pointer;
        border-radius: 2px;
        transition: border-color .2s, background .2s;
        line-height: 1;
      }
      .lnprj-trigger:hover {
        border-color: rgba(229,225,216,.45);
        background: rgba(229,225,216,.05);
      }
      .lnprj-trigger.lnprj-hidden {
        display: none;
      }

      .lnprj-overlay {
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,.45);
        opacity: 0;
        transition: opacity .28s;
        pointer-events: none;
      }
      .lnprj-overlay.lnprj-open {
        opacity: 1;
        pointer-events: auto;
      }

      .lnprj-panel {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 260px;
        z-index: 9999;
        background: #0a0a0a;
        border-right: .5px solid rgba(229,225,216,.09);
        display: flex;
        flex-direction: column;
        transform: translateX(-100%);
        transition: transform .28s cubic-bezier(.22,.7,.35,1);
        font-family: 'Space Mono', 'Courier New', monospace;
      }
      .lnprj-panel.lnprj-open {
        transform: translateX(0);
      }

      .lnprj-panel-head {
        padding: 2rem 1.6rem 1.4rem;
        border-bottom: .5px solid rgba(229,225,216,.09);
      }
      .lnprj-wordmark {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .26em;
        color: #e5e1d8;
        text-decoration: none;
        display: inline-block;
      }
      .lnprj-wordmark:hover {
        color: #fff;
      }

      .lnprj-panel-list {
        flex: 1;
        overflow-y: auto;
        padding: .8rem 0;
      }

      .lnprj-item {
        display: grid;
        grid-template-columns: 36px 1fr;
        align-items: center;
        gap: .5rem;
        padding: .75rem 1.6rem;
        text-decoration: none;
        color: #7a7870;
        font-size: 10px;
        letter-spacing: .05em;
        transition: background .18s, color .18s;
        border-left: 2px solid transparent;
      }
      .lnprj-item:hover {
        background: rgba(229,225,216,.04);
        color: #e5e1d8;
      }
      .lnprj-item.lnprj-current {
        border-left-color: rgba(229,225,216,.4);
        color: #e5e1d8;
        background: rgba(229,225,216,.03);
      }

      .lnprj-num {
        font-size: 9px;
        color: #3d3c38;
        letter-spacing: .1em;
      }
      .lnprj-item.lnprj-current .lnprj-num {
        color: #52504a;
      }

      .lnprj-zh {
        font-size: 11.5px;
        display: block;
        color: inherit;
        margin-bottom: .1rem;
      }
      .lnprj-en {
        font-size: 8.5px;
        color: #3d3c38;
        letter-spacing: .08em;
        display: block;
      }
      .lnprj-item.lnprj-current .lnprj-en,
      .lnprj-item:hover .lnprj-en {
        color: #52504a;
      }

      .lnprj-panel-foot {
        padding: 1rem 1.6rem;
        border-top: .5px solid rgba(229,225,216,.06);
        font-size: 8px;
        color: #28261f;
        letter-spacing: .12em;
      }
    `;
    document.head.appendChild(style);
  }

  function buildPanel(current, basePath) {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'lnprj-overlay';

    // Panel
    const panel = document.createElement('div');
    panel.className = 'lnprj-panel';

    // Head
    const head = document.createElement('div');
    head.className = 'lnprj-panel-head';
    const wordmark = document.createElement('a');
    wordmark.className = 'lnprj-wordmark';
    wordmark.href = basePath + 'index/index.html';
    wordmark.textContent = 'LNPRJ';
    head.appendChild(wordmark);

    // List
    const list = document.createElement('div');
    list.className = 'lnprj-panel-list';

    PROJECTS.forEach(p => {
      const a = document.createElement('a');
      a.className = 'lnprj-item' + (p.id === current ? ' lnprj-current' : '');
      a.href = basePath + p.href;

      const num = document.createElement('span');
      num.className = 'lnprj-num';
      num.textContent = String(p.id).padStart(2, '0');

      const info = document.createElement('span');
      const zh = document.createElement('span');
      zh.className = 'lnprj-zh';
      zh.textContent = p.zh;
      const en = document.createElement('span');
      en.className = 'lnprj-en';
      en.textContent = p.en;
      info.appendChild(zh);
      info.appendChild(en);

      a.appendChild(num);
      a.appendChild(info);
      list.appendChild(a);
    });

    // Footer
    const foot = document.createElement('div');
    foot.className = 'lnprj-panel-foot';
    foot.textContent = 'works in progress — neillin lct';

    panel.appendChild(head);
    panel.appendChild(list);
    panel.appendChild(foot);

    return { panel, overlay };
  }

  function open(panel, overlay) {
    panel.classList.add('lnprj-open');
    overlay.classList.add('lnprj-open');
  }

  function close(panel, overlay) {
    panel.classList.remove('lnprj-open');
    overlay.classList.remove('lnprj-open');
  }

  const LNPRJ = {
    PROJECTS,
    init({ current = 0, basePath = '../', hideButton = false } = {}) {
      injectStyles();

      const trigger = document.createElement('button');
      trigger.className = 'lnprj-trigger' + (hideButton ? ' lnprj-hidden' : '');
      trigger.setAttribute('aria-label', 'Open navigation');
      trigger.textContent = 'LNPRJ ☰';

      const { panel, overlay } = buildPanel(current, basePath);

      document.body.appendChild(trigger);
      document.body.appendChild(overlay);
      document.body.appendChild(panel);

      trigger.addEventListener('click', () => open(panel, overlay));
      overlay.addEventListener('click', () => close(panel, overlay));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close(panel, overlay);
      });
    },
  };

  window.LNPRJ = LNPRJ;
})();

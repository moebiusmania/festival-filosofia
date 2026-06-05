import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="it" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('ff-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');})();` }} />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="ff2026" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css"
        />
        <title>festivalfilosofia 2026 · caos</title>
      </head>
      <body>
        <Component />
        <script dangerouslySetInnerHTML={{ __html: `(function(){function sync(){var btn=document.getElementById('ff-theme-btn');if(!btn)return;var dark=document.documentElement.getAttribute('data-theme')==='dark';var i=btn.querySelector('i');if(i)i.className='ti '+(dark?'ti-sun':'ti-moon');btn.setAttribute('aria-label',dark?'Passa al tema chiaro':'Passa al tema scuro');}sync();var btn=document.getElementById('ff-theme-btn');if(btn)btn.addEventListener('click',function(){var dark=document.documentElement.getAttribute('data-theme')==='dark';var next=dark?'light':'dark';document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('ff-theme',next);}catch(e){}sync();});})();` }} />
      </body>
    </html>
  );
});

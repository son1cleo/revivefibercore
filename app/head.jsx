export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      {/* Initial theme script: defaults to light unless user previously chose dark */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){try{var k='revive-fiber-theme';var s=localStorage.getItem(k);if(s==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){} })();` }} />
    </>
  );
}

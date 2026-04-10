function openStudentInfo() {
  var width  = 600;
  var height = 400;
  var left   = (screen.width  - width)  / 2;
  var top    = (screen.height - height) / 2;

  var studentWindow = window.open(
    "",
    "StudentInfo",
    "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left + ",resizable=no,scrollbars=no"
  );

  var html = '<!DOCTYPE html>' +
    '<html lang="vi">' +
    '<head>' +
      '<meta charset="UTF-8"/>' +
      '<title>Thong Tin Sinh Vien</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>' +
      '<style>' +
        '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
        ':root{--bg:#0d0d10;--surface:#1a1a22;--accent:#e8c97e;--accent2:#7eb8e8;--text:#f0ece2;--muted:#7a7a8a;--border:#2a2a35}' +
        'body{background:var(--bg);width:600px;height:400px;overflow:hidden;font-family:"DM Sans",sans-serif;color:var(--text);display:flex;flex-direction:column}' +
        '.top-bar{height:4px;background:linear-gradient(90deg,var(--accent),var(--accent2));flex-shrink:0}' +
        '.card{flex:1;display:flex;overflow:hidden}' +
        '.left{width:190px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 16px;flex-shrink:0;position:relative}' +
        '.left::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(232,201,126,.06),transparent 70%);pointer-events:none}' +
        '.avatar-ring{width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:0 0 0 4px var(--bg),0 0 0 6px var(--border)}' +
        '.avatar-ring svg{width:44px;height:44px}' +
        '.left-name{font-family:"Playfair Display",serif;font-size:15px;text-align:center;color:var(--text);line-height:1.3;margin-bottom:6px}' +
        '.mssv-badge{font-family:"Space Mono",monospace;font-size:10px;color:var(--accent);background:rgba(232,201,126,.1);border:1px solid rgba(232,201,126,.25);padding:3px 10px;border-radius:2px;letter-spacing:.1em}' +
        '.right{flex:1;padding:28px 28px 20px;display:flex;flex-direction:column;overflow:hidden}' +
        '.section-label{font-family:"Space Mono",monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}' +
        '.info-grid{display:flex;flex-direction:column;gap:10px;flex:1}' +
        '.info-row{display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--border);animation:rowIn .4s ease both}' +
        '.info-row:last-child{border-bottom:none}' +
        '@keyframes rowIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}' +
        '.info-row:nth-child(1){animation-delay:.05s}.info-row:nth-child(2){animation-delay:.10s}.info-row:nth-child(3){animation-delay:.15s}.info-row:nth-child(4){animation-delay:.20s}.info-row:nth-child(5){animation-delay:.25s}' +
        '.row-icon{width:28px;height:28px;background:rgba(232,201,126,.08);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}' +
        '.row-icon svg{width:13px;height:13px;color:var(--accent)}' +
        '.row-content{flex:1}' +
        '.row-label{font-size:10px;color:var(--muted);font-family:"Space Mono",monospace;letter-spacing:.05em;margin-bottom:1px}' +
        '.row-value{font-size:14px;color:var(--text);font-weight:500}' +
        '.footer{margin-top:14px;padding-top:12px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}' +
        '.footer-mono{font-family:"Space Mono",monospace;font-size:9px;color:var(--muted);letter-spacing:.1em}' +
        '.status-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 6px #4ade80;display:inline-block;margin-right:6px}' +
      '</style>' +
    '</head>' +
    '<body>' +
      '<div class="top-bar"></div>' +
      '<div class="card">' +
        '<div class="left">' +
          '<div class="avatar-ring">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="#0d0d10" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
              '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>' +
            '</svg>' +
          '</div>' +
          '<div class="left-name">Nguyen Van An</div>' +
          '<div class="mssv-badge">SV2100001</div>' +
        '</div>' +
        '<div class="right">' +
          '<div class="section-label">Ho so sinh vien</div>' +
          '<div class="info-grid">' +

            '<div class="info-row">' +
              '<div class="row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>' +
              '<div class="row-content"><div class="row-label">MSSV</div><div class="row-value">SV2100001</div></div>' +
            '</div>' +

            '<div class="info-row">' +
              '<div class="row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>' +
              '<div class="row-content"><div class="row-label">Ho va Ten</div><div class="row-value">Nguyen Van An</div></div>' +
            '</div>' +

            '<div class="info-row">' +
              '<div class="row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4"/><rect x="2" y="10" width="20" height="12" rx="2"/></svg></div>' +
              '<div class="row-content"><div class="row-label">Nganh Hoc</div><div class="row-value">Cong nghe thong tin</div></div>' +
            '</div>' +

            '<div class="info-row">' +
              '<div class="row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>' +
              '<div class="row-content"><div class="row-label">Lop Hoc</div><div class="row-value">CNTT-K21A</div></div>' +
            '</div>' +

            '<div class="info-row">' +
              '<div class="row-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>' +
              '<div class="row-content"><div class="row-label">Truong</div><div class="row-value">Dai hoc Bach Khoa</div></div>' +
            '</div>' +

          '</div>' +
          '<div class="footer">' +
            '<span class="footer-mono"><span class="status-dot"></span>Dang hoc</span>' +
            '<span class="footer-mono">Nam hoc 2024 - 2025</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</body></html>';

  studentWindow.document.write(html);
  studentWindow.document.close();
}
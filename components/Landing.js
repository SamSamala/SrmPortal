// Landing component — redesigned with visual feature previews
import { useState } from 'react';

function getLandCSS(dark) {
  const d = dark;
  return `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:    ${d?'#04060d':'#f5f0e8'};
  --bg2:   ${d?'#070c18':'#ede8dc'};
  --surf:  ${d?'#0c1120':'#ffffff'};
  --surf2: ${d?'#101829':'#f0ebe0'};
  --border:${d?'rgba(255,255,255,.07)':'rgba(0,0,0,.09)'};
  --border2:${d?'rgba(255,255,255,.12)':'rgba(0,0,0,.14)'};
  --text:  ${d?'#eef2ff':'#1a1510'};
  --text2: ${d?'#8896b3':'#6b6155'};
  --text3: ${d?'#4a5568':'#a09585'};
  --accent:${d?'#4f8dff':'#2563eb'};
  --accent2:${d?'#7c5cfc':'#7c3aed'};
  --green: ${d?'#22d17a':'#059669'};
  --red:   ${d?'#ff5c5c':'#dc2626'};
  --yellow:${d?'#ffd166':'#d97706'};
  --glow:  ${d?'rgba(79,141,255,.18)':'rgba(37,99,235,.09)'};
  --glow2: ${d?'rgba(124,92,252,.14)':'rgba(124,58,237,.07)'};
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes grad{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.2);opacity:0}}
@keyframes slideR{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
@keyframes slideL{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:none}}

.bg-orb1{position:fixed;width:700px;height:700px;border-radius:50%;top:-200px;left:-150px;
  background:radial-gradient(circle,${d?'rgba(79,141,255,.22)':'rgba(37,99,235,.15)'},transparent 65%);filter:blur(80px);z-index:0;pointer-events:none;}
.bg-orb2{position:fixed;width:600px;height:600px;border-radius:50%;bottom:-150px;right:-100px;
  background:radial-gradient(circle,${d?'rgba(124,92,252,.2)':'rgba(124,58,237,.12)'},transparent 65%);filter:blur(80px);z-index:0;pointer-events:none;}
.bg-grid{position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(${d?'rgba(255,255,255,.028)':'rgba(0,0,0,.04)'} 1px,transparent 1px),linear-gradient(90deg,${d?'rgba(255,255,255,.028)':'rgba(0,0,0,.04)'} 1px,transparent 1px);
  background-size:52px 52px;mask-image:radial-gradient(ellipse 90% 80% at 50% 0%,black 30%,transparent 80%);}

/* NAV */
nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(16px,5vw,64px);height:58px;
  background:${d?'rgba(4,6,13,.85)':'rgba(245,240,232,.92)'};backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;}
.logo-mark{width:28px;height:28px;border-radius:7px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;
  color:#fff;font-family:'Playfair Display',serif;box-shadow:0 0 18px var(--glow);}
.logo-name{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;letter-spacing:-.2px;}
.nav-links{display:flex;gap:2px;}
.nav-link{padding:6px 13px;font-size:13px;font-weight:500;color:var(--text2);border-radius:7px;cursor:pointer;transition:all .15s;border:none;background:transparent;}
.nav-link:hover{color:var(--text);background:rgba(255,255,255,.05);}
.nav-right{display:flex;align-items:center;gap:8px;}
.btn-ghost{padding:7px 16px;background:transparent;border:1px solid var(--border2);border-radius:8px;color:var(--text);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn-primary{padding:8px 18px;background:var(--accent);border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;box-shadow:0 0 20px rgba(79,141,255,.3);}
.btn-primary:hover{opacity:.88;box-shadow:0 0 30px rgba(79,141,255,.45);}
.btn-large{padding:13px 32px;font-size:15px;border-radius:10px;}
.btn-outline-large{padding:12px 28px;font-size:15px;border-radius:10px;background:transparent;border:1px solid var(--border2);color:var(--text);cursor:pointer;transition:all .2s;font-weight:500;}
.btn-outline-large:hover{border-color:var(--accent);color:var(--accent);}

/* HERO */
.hero{position:relative;z-index:5;text-align:center;padding:clamp(60px,10vh,100px) clamp(16px,5vw,32px) clamp(40px,6vh,70px);}
.hero-badge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);padding:5px 14px;border:1px solid rgba(79,141,255,.28);background:rgba(79,141,255,.07);border-radius:100px;margin-bottom:24px;animation:fadeUp .5s ease both;}
.badge-ping{width:6px;height:6px;border-radius:50%;background:var(--green);position:relative;flex-shrink:0;}
.badge-ping::after{content:'';position:absolute;inset:-3px;border-radius:50%;background:var(--green);animation:ping 1.5s ease-out infinite;}
.hero-h1{font-family:'Playfair Display',serif;font-size:clamp(36px,7vw,78px);font-weight:800;line-height:1.04;letter-spacing:-2px;margin-bottom:20px;animation:fadeUp .5s .1s ease both;}
.hero-h1 .line1{color:var(--text);}
.hero-h1 .line2{background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 50%,var(--green) 100%);background-size:200% 200%;animation:fadeUp .5s .1s ease both, grad 4s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hero-sub{font-size:clamp(15px,2vw,18px);color:var(--text2);max-width:560px;margin:0 auto 36px;line-height:1.7;animation:fadeUp .5s .2s ease both;}
.hero-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:48px;animation:fadeUp .5s .3s ease both;}
.hero-trust{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;animation:fadeUp .5s .4s ease both;}
.trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text3);}
.trust-dot{width:5px;height:5px;border-radius:50%;background:var(--green);}

/* MAIN MOCKUP */
.mockup-wrap{position:relative;z-index:5;max-width:900px;margin:0 auto 80px;padding:0 clamp(16px,4vw,32px);animation:fadeUp .6s .5s ease both;}
.mockup-shell{background:var(--surf);border:1px solid var(--border2);border-radius:16px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.6),0 0 0 1px var(--border),inset 0 1px 0 rgba(255,255,255,.06);}
.mockup-bar{background:var(--surf2);border-bottom:1px solid var(--border);padding:10px 16px;display:flex;align-items:center;gap:8px;}
.mockup-dots{display:flex;gap:5px;}
.mockup-dot{width:10px;height:10px;border-radius:50%;}
.mockup-url{flex:1;background:rgba(255,255,255,.05);border-radius:5px;padding:4px 12px;font-size:11px;color:var(--text3);}
.mockup-tabs{display:flex;border-bottom:1px solid var(--border);background:var(--surf);}
.mtab{padding:10px 18px;font-size:11px;font-weight:600;color:var(--text3);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;}
.mtab.active{color:var(--accent);border-bottom-color:var(--accent);}
.mockup-body{padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;}

/* MOCK CARDS */
.mc{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;}
.mc-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:8px;}
.mc-val{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;}
.mc-sub{font-size:10px;color:var(--text3);margin-top:3px;}
.mc-bar-wrap{height:5px;background:rgba(255,255,255,.06);border-radius:3px;margin-top:8px;overflow:hidden;}
.mc-bar-fill{height:5px;border-radius:3px;transition:width .5s;}
.mc-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);}
.mc-row:last-child{border-bottom:none;}
.mc-name{font-size:10px;font-weight:500;}
.mc-pct{font-size:10px;font-weight:700;font-family:monospace;}
.mc-pill{font-size:9px;padding:2px 7px;border-radius:20px;font-weight:700;}
.mc-3{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}
.mc-3-item{background:var(--surf);border-radius:7px;padding:8px;text-align:center;border:1px solid var(--border);}
.mc-3-n{font-size:14px;font-weight:800;font-family:'Playfair Display',serif;}
.mc-3-l{font-size:8px;color:var(--text3);margin-top:2px;}
.mc-chip{display:inline-flex;align-items:center;gap:4px;font-size:9px;padding:3px 8px;border-radius:5px;font-weight:600;}

/* SECTIONS */
.section{position:relative;z-index:5;padding:clamp(48px,7vw,90px) clamp(16px,5vw,64px);}
.section-inner{max-width:1040px;margin:0 auto;}
.eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:10px;text-align:center;}
.sec-h2{font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,40px);font-weight:800;letter-spacing:-1px;text-align:center;margin-bottom:12px;}
.sec-sub{font-size:clamp(13px,1.6vw,15px);color:var(--text2);text-align:center;max-width:500px;margin:0 auto 48px;line-height:1.7;}

/* FEATURE SHOWCASES */
.showcase{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,60px);align-items:center;max-width:1040px;margin:0 auto 72px;}
.showcase.rev{direction:rtl;}
.showcase.rev>*{direction:ltr;}
.showcase-text{display:flex;flex-direction:column;gap:14px;}
.sc-tag{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);padding:4px 12px;border:1px solid rgba(79,141,255,.25);background:rgba(79,141,255,.07);border-radius:20px;width:fit-content;}
.showcase-text h3{font-family:'Playfair Display',serif;font-size:clamp(20px,3vw,28px);font-weight:800;letter-spacing:-.5px;line-height:1.2;}
.showcase-text p{font-size:14px;color:var(--text2);line-height:1.75;}
.sc-bullets{display:flex;flex-direction:column;gap:8px;margin-top:4px;}
.sc-bullet{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text2);}
.sc-bullet-dot{width:18px;height:18px;border-radius:5px;background:rgba(34,209,122,.15);border:1px solid rgba(34,209,122,.3);display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--green);font-weight:700;flex-shrink:0;margin-top:1px;}
.preview-frame{background:var(--surf);border:1px solid var(--border2);border-radius:14px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.5);}
.preview-bar{background:var(--surf2);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;align-items:center;gap:7px;}
.preview-dots{display:flex;gap:4px;}
.preview-dot{width:8px;height:8px;border-radius:50%;}
.preview-title{font-size:10px;color:var(--text3);font-weight:500;}
.preview-body{padding:14px;}

/* PROBLEM GRID */
.pain-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;}
.pain-card{background:var(--surf);border:1px solid var(--border);border-radius:14px;padding:22px 20px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s;}
.pain-card:hover{border-color:rgba(255,92,92,.3);transform:translateY(-3px);}
.pain-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,92,92,.05),transparent);pointer-events:none;}
.pain-ico{font-size:24px;margin-bottom:12px;}
.pain-card h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;margin-bottom:6px;letter-spacing:-.2px;}
.pain-card p{font-size:12px;color:var(--text2);line-height:1.6;}

/* COMPARE */
.compare-table{background:var(--surf);border:1px solid var(--border);border-radius:16px;overflow:hidden;max-width:680px;margin:0 auto;}
.compare-head{display:grid;grid-template-columns:1fr 1fr 1fr;background:var(--surf2);border-bottom:1px solid var(--border);}
.compare-head div{padding:14px 20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);}
.compare-row{display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid var(--border);transition:background .15s;}
.compare-row:last-child{border-bottom:none;}
.compare-row:hover{background:var(--surf2);}
.compare-row div{padding:12px 20px;font-size:13px;display:flex;align-items:center;gap:6px;}
.compare-row div:first-child{color:var(--text2);}
.bad{color:var(--red);}
.good{color:var(--green);font-weight:600;}

/* HOW IT WORKS */
.steps-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;position:relative;}
.steps-row::before{content:'';position:absolute;top:28px;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--border2),var(--border2),transparent);z-index:0;}
.step-item{text-align:center;padding:20px;position:relative;z-index:1;}
.step-num{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#fff;margin:0 auto 16px;box-shadow:0 0 24px var(--glow);}
.step-item h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;margin-bottom:6px;}
.step-item p{font-size:12px;color:var(--text2);line-height:1.65;}

/* SOCIAL PROOF */
.proof-band{background:var(--surf);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:24px clamp(16px,5vw,64px);display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;}
.proof-stat{text-align:center;}
.proof-n{font-family:'Playfair Display',serif;font-size:26px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--green));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.proof-l{font-size:11px;color:var(--text3);margin-top:2px;}

/* TRUST */
.trust-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
.trust-card{background:var(--surf);border:1px solid var(--border);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:10px;transition:border-color .2s;}
.trust-card:hover{border-color:var(--green);}
.trust-ico{font-size:22px;}
.trust-card h3{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;}
.trust-card p{font-size:12px;color:var(--text2);line-height:1.6;}

/* FAQ */
.faq-list{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:8px;}
.faq-item{background:var(--surf);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s;}
.faq-item.open{border-color:var(--border2);}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;cursor:pointer;font-size:14px;font-weight:600;gap:12px;-webkit-tap-highlight-color:transparent;font-family:'Playfair Display',serif;}
.faq-arrow{font-size:18px;color:var(--text2);transition:transform .25s;flex-shrink:0;line-height:1;}
.faq-arrow.open{transform:rotate(180deg);}
.faq-a{font-size:13px;color:var(--text2);line-height:1.7;padding:0 18px 16px;border-top:1px solid var(--border);}

/* FINAL CTA */
.cta-section{position:relative;z-index:5;padding:clamp(48px,7vw,90px) clamp(16px,5vw,64px);}
.cta-box{max-width:700px;margin:0 auto;text-align:center;background:var(--surf);border:1px solid var(--border2);border-radius:22px;padding:clamp(36px,5vw,60px) clamp(24px,5vw,56px);position:relative;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.4);}
.cta-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(79,141,255,.12),transparent);pointer-events:none;}
.cta-box h2{font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,38px);font-weight:800;letter-spacing:-1px;margin-bottom:12px;position:relative;z-index:1;}
.cta-box p{font-size:15px;color:var(--text2);margin-bottom:28px;line-height:1.6;position:relative;z-index:1;}
.cta-chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:20px;position:relative;z-index:1;}
.cta-chip{font-size:11px;font-weight:600;padding:5px 13px;border-radius:7px;border:1px solid var(--border2);color:var(--text2);}
.cta-chip.g{border-color:rgba(34,209,122,.3);color:var(--green);background:rgba(34,209,122,.07);}

/* FOOTER */
footer{position:relative;z-index:5;border-top:1px solid var(--border);padding:28px clamp(16px,5vw,64px);}
.footer-inner{max-width:1040px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-logo{display:flex;align-items:center;gap:8px;}
.footer-links{display:flex;gap:18px;}
.footer-link{font-size:12px;color:var(--text3);cursor:pointer;transition:color .15s;}
.footer-link:hover{color:var(--text2);}
.footer-note{font-size:11px;color:var(--text3);}

/* RESPONSIVE */
@media(max-width:767px){
  nav{padding:0 16px;}
  .nav-links{display:none;}
  .mockup-body{grid-template-columns:1fr;}
  .steps-row::before{display:none;}
  .compare-table{font-size:12px;}
  .compare-head div,.compare-row div{padding:10px 12px;}
  .showcase,.showcase.rev{grid-template-columns:1fr;direction:ltr;}
  .footer-links{display:none;}
}
@media(min-width:768px) and (max-width:1023px){
  .showcase{gap:28px;}
}
`;
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open?' open':''}`}>
      <div className="faq-q" onClick={()=>setOpen(o=>!o)}>
        <span>{q}</span>
        <span className={`faq-arrow${open?' open':''}`}>›</span>
      </div>
      {open&&<div className="faq-a">{a}</div>}
    </div>
  );
}

// ── Mockup: Hero (attendance + schedule overview) ──────────────────────────
function HeroMockup() {
  const courses = [
    {n:'Molecular Biology',p:78.6,c:'#22d17a'},
    {n:'Bioprocess Engg',p:85.2,c:'#22d17a'},
    {n:'Chem Engg Principles',p:70.4,c:'#ff5c5c'},
    {n:'Artificial Intelligence',p:84.6,c:'#22d17a'},
  ];
  return (
    <div className="mockup-shell">
      <div className="mockup-bar">
        <div className="mockup-dots">
          <div className="mockup-dot" style={{background:'#ff5f57'}}/>
          <div className="mockup-dot" style={{background:'#febc2e'}}/>
          <div className="mockup-dot" style={{background:'#28c840'}}/>
        </div>
        <div className="mockup-url" style={{fontFamily:'monospace',fontSize:11}}>campushub.app — Dashboard</div>
      </div>
      <div className="mockup-tabs">
        {['Attendance','Timetable','Marks','Calendar'].map((t,i)=>(
          <div key={t} className={`mtab${i===0?' active':''}`}>{t}</div>
        ))}
      </div>
      <div className="mockup-body">
        <div>
          <div className="mc" style={{marginBottom:10}}>
            <div className="mc-lbl">Overall Attendance</div>
            <div className="mc-val" style={{color:'#22d17a'}}>79.8%</div>
            <div className="mc-sub">216 classes conducted this semester</div>
            <div className="mc-bar-wrap"><div className="mc-bar-fill" style={{width:'79.8%',background:'linear-gradient(90deg,#22d17a,#4f8dff)'}}/></div>
            <div style={{display:'flex',gap:6,marginTop:8}}>
              <span className="mc-chip" style={{background:'rgba(34,209,122,.1)',color:'#22d17a',border:'1px solid rgba(34,209,122,.3)'}}>✓ 6 classes safe</span>
              <span className="mc-chip" style={{background:'rgba(255,92,92,.1)',color:'#ff5c5c',border:'1px solid rgba(255,92,92,.3)'}}>⚠ 2 at risk</span>
            </div>
          </div>
          <div className="mc">
            <div className="mc-lbl">Subject Breakdown</div>
            {courses.map((c,i)=>(
              <div key={i} className="mc-row">
                <span className="mc-name" style={{color:'var(--text)'}}>{c.n}</span>
                <span className="mc-pct" style={{color:c.c}}>{c.p}%</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mc" style={{marginBottom:10}}>
            <div className="mc-lbl">Today — Day 4 (Thursday)</div>
            <div className="mc-3">
              <div className="mc-3-item"><div className="mc-3-n" style={{color:'#4f8dff'}}>3</div><div className="mc-3-l">At Risk</div></div>
              <div className="mc-3-item"><div className="mc-3-n" style={{color:'#22d17a'}}>4</div><div className="mc-3-l">Safe</div></div>
              <div className="mc-3-item"><div className="mc-3-n" style={{color:'#ff5c5c'}}>2</div><div className="mc-3-l">Absent</div></div>
            </div>
          </div>
          <div className="mc">
            <div className="mc-lbl">Today's Schedule</div>
            {[
              {n:'Molecular Biology',t:'08:00',r:'B-103',c:'#4f8dff'},
              {n:'Bioprocess Engg',t:'08:50',r:'B-103',c:'#22d17a'},
              {n:'Lab: Mol Bio Lab',t:'11:00',r:'Lab-4',c:'#ffd166'},
              {n:'Diseases Models',t:'02:10',r:'B-403',c:'#4f8dff'},
            ].map((c,i)=>(
              <div key={i} className="mc-row" style={{alignItems:'flex-start'}}>
                <div>
                  <div className="mc-name" style={{color:'var(--text)'}}>{c.n}</div>
                  <div style={{fontSize:9,color:'var(--text3)',marginTop:2}}>{c.r}</div>
                </div>
                <span style={{fontSize:9,fontFamily:'monospace',color:c.c,fontWeight:700,marginTop:2}}>{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Attendance detail ──────────────────────────────────────────────
function AttendanceMockup() {
  const subjects = [
    {n:'Molecular Biology',att:78.6,tot:42,pres:33,skip:3,col:'#22d17a'},
    {n:'Bioprocess Engg',att:85.2,tot:35,pres:30,skip:6,col:'#22d17a'},
    {n:'Chem Engg Principles',att:70.4,tot:27,pres:19,skip:-2,col:'#ff5c5c'},
    {n:'AI & Machine Learning',att:84.6,tot:39,pres:33,skip:4,col:'#22d17a'},
    {n:'Diseases & Mechanisms',att:62.5,tot:32,pres:20,skip:-4,col:'#ff5c5c'},
  ];
  return (
    <div className="preview-frame">
      <div className="preview-bar">
        <div className="preview-dots">
          <div className="preview-dot" style={{background:'#ff5f57'}}/>
          <div className="preview-dot" style={{background:'#febc2e'}}/>
          <div className="preview-dot" style={{background:'#28c840'}}/>
        </div>
        <span className="preview-title">Attendance Tracker</span>
      </div>
      <div className="preview-body">
        <div style={{display:'flex',gap:8,marginBottom:10}}>
          <div style={{flex:1,background:'rgba(34,209,122,.1)',border:'1px solid rgba(34,209,122,.3)',borderRadius:8,padding:'8px 12px',textAlign:'center'}}>
            <div style={{fontSize:18,fontWeight:800,fontFamily:'Playfair Display,serif',color:'#22d17a'}}>79.8%</div>
            <div style={{fontSize:9,color:'var(--text3)',marginTop:2}}>Overall</div>
          </div>
          <div style={{flex:1,background:'rgba(79,141,255,.1)',border:'1px solid rgba(79,141,255,.3)',borderRadius:8,padding:'8px 12px',textAlign:'center'}}>
            <div style={{fontSize:18,fontWeight:800,fontFamily:'Playfair Display,serif',color:'#4f8dff'}}>175</div>
            <div style={{fontSize:9,color:'var(--text3)',marginTop:2}}>Present</div>
          </div>
          <div style={{flex:1,background:'rgba(255,209,102,.1)',border:'1px solid rgba(255,209,102,.3)',borderRadius:8,padding:'8px 12px',textAlign:'center'}}>
            <div style={{fontSize:18,fontWeight:800,fontFamily:'Playfair Display,serif',color:'#ffd166'}}>6</div>
            <div style={{fontSize:9,color:'var(--text3)',marginTop:2}}>Can skip</div>
          </div>
        </div>
        {subjects.map((s,i)=>(
          <div key={i} style={{marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
              <span style={{fontSize:10,fontWeight:600,color:'var(--text)'}}>{s.n}</span>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontSize:10,fontWeight:800,color:s.col,fontFamily:'monospace'}}>{s.att}%</span>
                <span style={{fontSize:9,padding:'1px 6px',borderRadius:4,background:s.skip>=0?'rgba(34,209,122,.12)':'rgba(255,92,92,.12)',color:s.skip>=0?'#22d17a':'#ff5c5c',fontWeight:700}}>
                  {s.skip>=0?`skip ${s.skip}`:`need ${Math.abs(s.skip)}`}
                </span>
              </div>
            </div>
            <div style={{height:4,background:'rgba(255,255,255,.06)',borderRadius:2,overflow:'hidden'}}>
              <div style={{height:4,width:s.att+'%',background:s.col,borderRadius:2}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mockup: Timetable ─────────────────────────────────────────────────────
function TimetableMockup() {
  const days = ['Mon','Tue','Wed','Thu','Fri'];
  const grid = [
    ['Mol Bio','Bioprocess','Lab','Free','AI'],
    ['Lab','AI','Mol Bio','Bioprocess','Diseases'],
    ['Bioprocess','Diseases','AI','Mol Bio','Lab'],
    ['AI','Free','Diseases','Lab','Bioprocess'],
    ['Diseases','Mol Bio','Bioprocess','AI','Free'],
  ];
  const colors = {'Mol Bio':'#4f8dff','Bioprocess':'#22d17a','AI':'#7c5cfc','Lab':'#ffd166','Diseases':'#ff5c5c','Free':'transparent'};
  return (
    <div className="preview-frame">
      <div className="preview-bar">
        <div className="preview-dots">
          <div className="preview-dot" style={{background:'#ff5f57'}}/>
          <div className="preview-dot" style={{background:'#febc2e'}}/>
          <div className="preview-dot" style={{background:'#28c840'}}/>
        </div>
        <span className="preview-title">Day-wise Timetable</span>
      </div>
      <div className="preview-body" style={{padding:12}}>
        <div style={{display:'flex',gap:4,marginBottom:8,alignItems:'center'}}>
          <div style={{width:28,fontSize:9,color:'var(--text3)'}}>Slot</div>
          {days.map(d=>(
            <div key={d} style={{flex:1,textAlign:'center',fontSize:9,fontWeight:700,color:d==='Thu'?'var(--accent)':'var(--text3)',padding:'3px 0',background:d==='Thu'?'rgba(79,141,255,.1)':'transparent',borderRadius:5}}>{d}</div>
          ))}
        </div>
        {['1','2','3','4','5'].map((slot,si)=>(
          <div key={slot} style={{display:'flex',gap:4,marginBottom:4}}>
            <div style={{width:28,fontSize:9,color:'var(--text3)',display:'flex',alignItems:'center',justifyContent:'center'}}>{slot}</div>
            {grid[si].map((subj,di)=>(
              <div key={di} style={{flex:1,padding:'4px 2px',borderRadius:5,textAlign:'center',fontSize:8,fontWeight:600,
                background:subj==='Free'?'transparent':`${colors[subj] || '#4f8dff'}18`,
                color:subj==='Free'?'var(--text3)':colors[subj]||'#4f8dff',
                border:`1px solid ${subj==='Free'?'transparent':`${colors[subj]||'#4f8dff'}35`}`,
                outline:di===3&&subj!=='Free'?`2px solid ${colors[subj]||'#4f8dff'}55`:'none',
              }}>{subj==='Free'?'—':subj}</div>
            ))}
          </div>
        ))}
        <div style={{marginTop:10,padding:'8px 10px',background:'rgba(79,141,255,.08)',border:'1px solid rgba(79,141,255,.2)',borderRadius:8}}>
          <div style={{fontSize:9,color:'var(--accent)',fontWeight:700,marginBottom:4}}>TODAY — Day 4 (Thursday)</div>
          {['Mol Bio · 08:00 · B-103','Lab · 11:00 · Lab-4','Bioprocess · 01:25 · B-103'].map(c=>(
            <div key={c} style={{fontSize:9,color:'var(--text2)',padding:'2px 0',borderBottom:'1px solid rgba(255,255,255,.05)'}}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Marks ─────────────────────────────────────────────────────────
function MarksMockup() {
  const subjects = [
    {n:'Molecular Biology',tests:[18,22,null],max:[25,25,25]},
    {n:'Bioprocess Engg',tests:[21,19,null],max:[25,25,25]},
    {n:'Chem Engg',tests:[16,null,null],max:[25,25,25]},
    {n:'AI',tests:[23,24,null],max:[25,25,25]},
  ];
  return (
    <div className="preview-frame">
      <div className="preview-bar">
        <div className="preview-dots">
          <div className="preview-dot" style={{background:'#ff5f57'}}/>
          <div className="preview-dot" style={{background:'#febc2e'}}/>
          <div className="preview-dot" style={{background:'#28c840'}}/>
        </div>
        <span className="preview-title">Internal Marks</span>
      </div>
      <div className="preview-body" style={{padding:12}}>
        <div style={{display:'flex',gap:4,marginBottom:8}}>
          <div style={{flex:2,fontSize:9,color:'var(--text3)',fontWeight:700}}>Subject</div>
          {['CT1','CT2','CT3'].map(t=>(
            <div key={t} style={{flex:1,textAlign:'center',fontSize:9,color:'var(--text3)',fontWeight:700}}>{t}</div>
          ))}
          <div style={{flex:1,textAlign:'center',fontSize:9,color:'var(--text3)',fontWeight:700}}>Total</div>
        </div>
        {subjects.map((s,i)=>{
          const scored = s.tests.reduce((a,v)=>a+(v||0),0);
          const avail = s.tests.filter(v=>v!==null).length * 25;
          const pct = avail>0?Math.round(scored/avail*100):0;
          return (
            <div key={i} style={{display:'flex',gap:4,alignItems:'center',marginBottom:6,padding:'6px 6px',borderRadius:7,background:'var(--bg2)',border:'1px solid var(--border)'}}>
              <div style={{flex:2,fontSize:9,fontWeight:600,color:'var(--text)'}}>{s.n}</div>
              {s.tests.map((t,ti)=>(
                <div key={ti} style={{flex:1,textAlign:'center',fontSize:10,fontWeight:t!==null?700:400,
                  color:t===null?'var(--text3)':t>=20?'#22d17a':t>=15?'#ffd166':'#ff5c5c'}}>
                  {t!==null?t:'—'}
                </div>
              ))}
              <div style={{flex:1,textAlign:'center'}}>
                <span style={{fontSize:9,fontWeight:700,padding:'2px 5px',borderRadius:4,
                  background:pct>=75?'rgba(34,209,122,.12)':pct>=50?'rgba(255,209,102,.12)':'rgba(255,92,92,.12)',
                  color:pct>=75?'#22d17a':pct>=50?'#ffd166':'#ff5c5c'}}>
                  {scored}/{avail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Mockup: Calendar ──────────────────────────────────────────────────────
function CalendarMockup() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const grid = [
    [null,null,null,1,2,3,4],
    [5,6,7,8,9,10,11],
    [12,13,14,15,16,17,18],
    [19,20,21,22,23,24,25],
    [26,27,28,29,30,31,null],
  ];
  const dayOrders = {6:2,7:3,8:4,9:5,10:1,13:2,14:3,15:4,16:5,17:1,20:2,21:3,22:4,23:5,24:1,27:2,28:3,29:4,30:5,31:1};
  const events = {9:'Holiday',16:'CT2 Begins',23:'Workshop'};
  return (
    <div className="preview-frame">
      <div className="preview-bar">
        <div className="preview-dots">
          <div className="preview-dot" style={{background:'#ff5f57'}}/>
          <div className="preview-dot" style={{background:'#febc2e'}}/>
          <div className="preview-dot" style={{background:'#28c840'}}/>
        </div>
        <span className="preview-title">Academic Calendar — March 2026</span>
      </div>
      <div className="preview-body" style={{padding:'10px 12px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:4}}>
          {days.map(d=>(
            <div key={d} style={{textAlign:'center',fontSize:8,color:'var(--text3)',fontWeight:700,padding:'3px 0'}}>{d}</div>
          ))}
        </div>
        {grid.map((week,wi)=>(
          <div key={wi} style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:2,marginBottom:2}}>
            {week.map((day,di)=>{
              const do_ = day?dayOrders[day]:null;
              const ev = day?events[day]:null;
              const isToday = day===26;
              return (
                <div key={di} style={{minHeight:28,borderRadius:5,padding:'2px 3px',
                  background:isToday?'rgba(79,141,255,.2)':ev?'rgba(255,209,102,.08)':day&&do_?'var(--bg2)':'transparent',
                  border:isToday?'1px solid rgba(79,141,255,.5)':ev?'1px solid rgba(255,209,102,.3)':'1px solid transparent',
                  cursor:day?'pointer':'default'}}>
                  {day&&<>
                    <div style={{fontSize:8,fontWeight:isToday?800:500,color:isToday?'#4f8dff':'var(--text)',lineHeight:1}}>{day}</div>
                    {do_&&<div style={{fontSize:7,color:'var(--text3)',lineHeight:1,marginTop:1}}>D{do_}</div>}
                    {ev&&<div style={{fontSize:6,color:'#ffd166',lineHeight:1,marginTop:1,fontWeight:700,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{ev}</div>}
                  </>}
                </div>
              );
            })}
          </div>
        ))}
        <div style={{marginTop:8,display:'flex',gap:6,flexWrap:'wrap'}}>
          {[['D1-D5','Day order','rgba(79,141,255,.15)','#4f8dff'],['Holiday','Exam/Event','rgba(255,209,102,.15)','#ffd166']].map(([l,t,bg,c])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:4,fontSize:8,color:'var(--text3)'}}>
              <div style={{width:8,height:8,borderRadius:2,background:bg,border:`1px solid ${c}55`}}/>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing({ onLogin, dark, setDark }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{getLandCSS(dark)}</style>
      <div style={{position:'relative',minHeight:'100vh'}}>
        <div className="bg-orb1"/><div className="bg-orb2"/>
        <div className="bg-grid"/>

        {/* NAV */}
        <nav>
          <div className="nav-logo">
            <div className="logo-mark">C</div>
            <span className="logo-name">CampusHub</span>
          </div>
          <div className="nav-links">
            {[['Features','features'],['Preview','preview'],['How it Works','how'],['FAQ','faq']].map(([l,id])=>(
              <button key={id} className="nav-link" onClick={()=>scrollTo(id)}>{l}</button>
            ))}
          </div>
          <div className="nav-right">
            <button onClick={()=>setDark(d=>!d)} style={{width:34,height:34,background:'transparent',border:'1px solid var(--border2)',borderRadius:8,cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text2)'}}>{dark?'☀':'☾'}</button>
            <button className="btn-ghost" onClick={onLogin}>Sign in</button>
            <button className="btn-primary" onClick={onLogin}>Get Started →</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-badge"><div className="badge-ping"/>SRM KTR · Free for all students</div>
          <h1 className="hero-h1">
            <div className="line1">Your SRM academics,</div>
            <div className="line2">finally clear.</div>
          </h1>
          <p className="hero-sub">
            Attendance percentages, day-wise timetable, internal marks, and academic calendar — all in one fast, clean dashboard. Built for SRM KTR students.
          </p>
          <div className="hero-cta">
            <button className="btn-primary btn-large" onClick={onLogin}>Login with SRM ID →</button>
            <button className="btn-outline-large" onClick={()=>scrollTo('preview')}>See Screenshots</button>
          </div>
          <div className="hero-trust">
            {['Free forever','No data stored','All departments','Works on mobile'].map(t=>(
              <div key={t} className="trust-item"><div className="trust-dot"/><span>{t}</span></div>
            ))}
          </div>
        </div>

        {/* MAIN MOCKUP */}
        <div className="mockup-wrap"><HeroMockup/></div>

        {/* SOCIAL PROOF BAND */}
        <div className="proof-band">
          {[['75%','Min. attendance target'],['5','Day orders supported'],['Instant','After first login'],['Free','No hidden costs'],['All Depts','SRM KTR']].map(([n,l])=>(
            <div key={l} className="proof-stat">
              <div className="proof-n">{n}</div>
              <div className="proof-l">{l}</div>
            </div>
          ))}
        </div>

        {/* PROBLEM */}
        <div className="section">
          <div className="section-inner">
            <p className="eyebrow">The Problem</p>
            <h2 className="sec-h2">Tired of the official academia portal?</h2>
            <p className="sec-sub">Every SRM student knows the pain. CampusHub fixes exactly these things.</p>
            <div className="pain-grid">
              {[
                {i:'🐌',t:'Painfully slow',d:'The official portal takes 30-60 seconds to load. Sometimes it just fails. You refresh. It fails again. CampusHub loads your data instantly after first login.'},
                {i:'🤯',t:'Way too many clicks',d:'Three pages just to check attendance. Five more to see marks. CampusHub puts everything on one dashboard — one click from anywhere.'},
                {i:'📉',t:'No clear overview',d:'No dashboard, no summary. You manually calculate if you can skip class. CampusHub shows exactly how many classes you can miss — or need to attend.'},
                {i:'📱',t:'Broken on mobile',d:'Zoomed-out tables that require horizontal scrolling. CampusHub is fully responsive — looks perfect on your phone.'},
              ].map(p=>(
                <div key={p.t} className="pain-card">
                  <div className="pain-ico">{p.i}</div>
                  <h3>{p.t}</h3><p>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPARE */}
        <div className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <div className="compare-table">
              <div className="compare-head">
                <div>Feature</div>
                <div style={{color:'var(--red)'}}>Official Portal</div>
                <div style={{color:'var(--green)'}}>CampusHub</div>
              </div>
              {[
                ['Load time','30–60s','Instant*'],
                ['Attendance margin','Manual math','Auto-calculated'],
                ['Mobile support','Broken tables','Fully responsive'],
                ['Day-order calendar','Not available','Built-in'],
                ['Marks overview','Scattered pages','One clear table'],
                ['Dark mode','No','Yes'],
                ['Price','Free','Free'],
              ].map(([f,b,g])=>(
                <div key={f} className="compare-row">
                  <div>{f}</div>
                  <div className="bad">✗ {b}</div>
                  <div className="good">✓ {g}</div>
                </div>
              ))}
            </div>
            <p style={{textAlign:'center',fontSize:11,color:'var(--text3)',marginTop:10}}>*After first login. First login goes through the official portal so it inherits its speed.</p>
          </div>
        </div>

        {/* FEATURE PREVIEWS */}
        <div id="preview" className="section">
          <div className="section-inner">
            <p className="eyebrow">Feature Previews</p>
            <h2 className="sec-h2">See exactly what you get</h2>
            <p className="sec-sub">Real screenshots of every section — attendance, timetable, marks, and calendar — all built to be clear at a glance.</p>
          </div>

          {/* Attendance */}
          <div className="showcase" style={{maxWidth:1040,margin:'0 auto 72px'}}>
            <div className="showcase-text">
              <div className="sc-tag">📊 Attendance</div>
              <h3>Know your attendance margin instantly</h3>
              <p>See your attendance percentage for every subject. CampusHub calculates exactly how many classes you can still skip — or how many you need to attend — to stay above 75%.</p>
              <div className="sc-bullets">
                {['Overall % and per-subject breakdown','Classes you can safely skip shown directly','Color-coded: green = safe, red = at risk','Attendance count: present vs total conducted'].map(b=>(
                  <div key={b} className="sc-bullet"><div className="sc-bullet-dot">✓</div><span>{b}</span></div>
                ))}
              </div>
            </div>
            <AttendanceMockup/>
          </div>

          {/* Timetable */}
          <div className="showcase rev" style={{maxWidth:1040,margin:'0 auto 72px'}}>
            <div className="showcase-text">
              <div className="sc-tag">📅 Timetable</div>
              <h3>Today's classes at a glance</h3>
              <p>See your day-wise timetable based on the current day order. Shows subject names, room numbers, and timings — exactly what's happening today, without hunting through the portal.</p>
              <div className="sc-bullets">
                {['Full 5-day grid with day orders (D1–D5)','Today highlighted with room numbers','Lab slots correctly mapped','Click any date in calendar to see that day'].map(b=>(
                  <div key={b} className="sc-bullet"><div className="sc-bullet-dot">✓</div><span>{b}</span></div>
                ))}
              </div>
            </div>
            <TimetableMockup/>
          </div>

          {/* Marks */}
          <div className="showcase" style={{maxWidth:1040,margin:'0 auto 72px'}}>
            <div className="showcase-text">
              <div className="sc-tag">📈 Internal Marks</div>
              <h3>All your cycle test scores in one view</h3>
              <p>No more hunting through tabs. Every cycle test score for every subject is shown in a clean table. See your total score, percentage, and how you're tracking overall.</p>
              <div className="sc-bullets">
                {['CT1, CT2, CT3 scores side by side','Total and percentage calculated automatically','Color-coded by performance level','Missing scores shown clearly as pending'].map(b=>(
                  <div key={b} className="sc-bullet"><div className="sc-bullet-dot">✓</div><span>{b}</span></div>
                ))}
              </div>
            </div>
            <MarksMockup/>
          </div>

          {/* Calendar */}
          <div className="showcase rev" style={{maxWidth:1040,margin:'0 auto 0'}}>
            <div className="showcase-text">
              <div className="sc-tag">🗓️ Academic Calendar</div>
              <h3>Monthly calendar with day orders mapped</h3>
              <p>A full month-view calendar showing which day order falls on which date, with holidays and exam events highlighted. No more guessing what "Day 3" means on any given day.</p>
              <div className="sc-bullets">
                {['Day orders (D1–D5) shown on every working day','Holidays and exam events from SRM planner','Click any day to see its timetable','Works correctly across semester breaks'].map(b=>(
                  <div key={b} className="sc-bullet"><div className="sc-bullet-dot">✓</div><span>{b}</span></div>
                ))}
              </div>
            </div>
            <CalendarMockup/>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how" className="section">
          <div className="section-inner">
            <p className="eyebrow">How it works</p>
            <h2 className="sec-h2">Four steps, done</h2>
            <p className="sec-sub">No app to install. No new account. Just your existing SRM credentials.</p>
            <div className="steps-row">
              {[
                {n:1,t:'Sign in with SRM ID',d:'Enter your academia.srmist.edu.in email and password. We use them only to log you in — same as you would yourself.'},
                {n:2,t:'We fetch your data',d:'CampusHub securely logs into academia on your behalf and fetches attendance, marks, timetable, and planner data.'},
                {n:3,t:'See your dashboard',d:'Everything displays in a clean dashboard — attendance %, skip margins, marks, day-order timetable, and monthly calendar.'},
                {n:4,t:'Come back anytime',d:'Save your login and sessions are remembered. Next visits are instant — no re-entering credentials. Data refreshes automatically daily.'},
              ].map(s=>(
                <div key={s.n} className="step-item">
                  <div className="step-num">{s.n}</div>
                  <h3>{s.t}</h3><p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div id="features" className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <p className="eyebrow">Everything included</p>
            <h2 className="sec-h2">Built around what students need</h2>
            <p className="sec-sub">Not what looks good on a product page — what you actually open the portal to check.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:1,background:'var(--border)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
              {[
                {i:'📊',t:'Attendance Tracker',d:'Per-subject percentage, classes attended vs total, margin to 75%, color-coded status.'},
                {i:'📅',t:'Day-wise Timetable',d:'Full 5-day grid with today highlighted. Room numbers, lab slots, day order mapped correctly.'},
                {i:'📈',t:'Internal Marks',d:'All cycle test scores per subject. Total and percentage auto-calculated in one clean table.'},
                {i:'🗓️',t:'Academic Calendar',d:'Month view with day orders and SRM events. Click any date to see that day\'s timetable.'},
                {i:'⚡',t:'Save Login',d:'Check "Save Login" once and you\'re never asked again. Sessions restore automatically.'},
                {i:'🌗',t:'Dark & Light Mode',d:'Toggle anytime. Dark by default because that\'s what everyone uses anyway.'},
              ].map(f=>(
                <div key={f.t} style={{background:'var(--surf)',padding:'28px 26px',transition:'background .2s',cursor:'default',position:'relative',overflow:'hidden'}}
                  onMouseOver={e=>e.currentTarget.style.background='var(--surf2)'}
                  onMouseOut={e=>e.currentTarget.style.background='var(--surf)'}>
                  <div style={{width:40,height:40,borderRadius:10,background:'var(--surf2)',border:'1px solid var(--border2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,marginBottom:14}}>{f.i}</div>
                  <h3 style={{fontFamily:'Playfair Display,serif',fontSize:14,fontWeight:700,marginBottom:6}}>{f.t}</h3>
                  <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.65}}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRIVACY */}
        <div className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <p className="eyebrow">Privacy & Security</p>
            <h2 className="sec-h2">Your data, handled carefully</h2>
            <p className="sec-sub">We know you're sharing login credentials. Here's exactly what we do and don't do.</p>
            <div className="trust-grid">
              {[
                {i:'🔒',t:'Password never stored',d:'Your password is used only to log into academia during that session. It is never saved to any database, file, or server.'},
                {i:'🍪',t:'Only session cookies saved',d:'After login, only the session cookies (like your browser saves) are kept temporarily. Nothing more.'},
                {i:'⏰',t:'Sessions expire automatically',d:'Saved sessions refresh daily via a background job. If something breaks, just log in again — your data is always re-fetchable.'},
                {i:'🎓',t:'Student-built',d:'Built by an SRM KTR student who uses it themselves. Not a company. Not collecting your data for ads or any other purpose.'},
                {i:'🚫',t:'Not affiliated with SRMIST',d:'This is an independent student project. Not endorsed by or officially connected to SRM Institute of Science and Technology.'},
                {i:'💸',t:'Free — no monetisation',d:'No ads, no mandatory paid plan, no data selling. Free for all SRM KTR students.'},
              ].map(t=>(
                <div key={t.t} className="trust-card">
                  <div className="trust-ico">{t.i}</div>
                  <h3>{t.t}</h3><p>{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <p className="eyebrow">FAQ</p>
            <h2 className="sec-h2">Common questions</h2>
            <p className="sec-sub">Everything you might want to know before signing in.</p>
            <div className="faq-list">
              {[
                {q:'Is my password stored anywhere?',a:'No. Your password is only used to log into academia.srmist.edu.in on your behalf during that session. It is never saved to any database or file. If you enable Save Login, only an encrypted token is stored — not your actual password.'},
                {q:'Is it completely free?',a:'Yes. Completely free. No premium tier, no ads, no subscriptions. Free forever for all SRM KTR students.'},
                {q:'Do I need to install an app?',a:'No. CampusHub is a web app — just open it in your browser on phone, tablet, or laptop. No install required.'},
                {q:'Why does the first login take time?',a:'The first login fetches fresh data from academia.srmist.edu.in, which is slow on their end. After that, your data is cached and subsequent visits are nearly instant.'},
                {q:'Does it work for all departments?',a:'Yes. Works for all departments and batches at SRM KTR as long as your attendance, marks, and timetable are visible on academia.srmist.edu.in.'},
                {q:'What is "Save Login"?',a:'When you click "Yes, keep me logged in" after first login, your credentials are securely encrypted and stored on the server. This lets CampusHub automatically re-login for you so you never see the login page again.'},
                {q:'What if my data looks wrong?',a:'Data is pulled directly from academia — if something looks off, the source data on academia is the cause. Force-refresh (the circular arrow on your dashboard) to fetch the latest version.'},
              ].map((f,i)=><FaqItem key={i} q={f.q} a={f.a}/>)}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="cta-section">
          <div className="cta-box">
            <h2>Start using CampusHub now</h2>
            <p>Check attendance, marks, and timetable in one clean dashboard. Free. No install. Just your SRM ID.</p>
            <button className="btn-primary btn-large" onClick={onLogin} style={{position:'relative',zIndex:1}}>Login with SRM ID →</button>
            <div className="cta-chips">
              <span className="cta-chip g">✓ Free forever</span>
              <span className="cta-chip">✓ No install</span>
              <span className="cta-chip">✓ All departments</span>
              <span className="cta-chip">✓ Password never stored</span>
              <span className="cta-chip">✓ Works on mobile</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div className="footer-logo">
              <div className="logo-mark">C</div>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:14,fontWeight:700}}>CampusHub</span>
            </div>
            <div className="footer-links">
              {[['Features','features'],['How it Works','how'],['FAQ','faq']].map(([l,id])=>(
                <span key={l} className="footer-link" onClick={()=>scrollTo(id)}>{l}</span>
              ))}
            </div>
            <div className="footer-note">Built for SRM KTR students · Not affiliated with SRMIST</div>
          </div>
        </footer>

      </div>
    </>
  );
}

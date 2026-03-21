// Landing component — login form with captcha flow and theme support
import { useState, useEffect, useRef } from 'react';

function getLandCSS(dark) {
  const d=dark;
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
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes grad{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes ping{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.2);opacity:0}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
@keyframes countUp{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}

/* BG */
.bg-layer{position:fixed;inset:0;pointer-events:none;z-index:0;}
.bg-orb1{position:fixed;width:700px;height:700px;border-radius:50%;top:-200px;left:-150px;
  background:radial-gradient(circle,${d?'rgba(79,141,255,.22)':'rgba(37,99,235,.15)'},transparent 65%);filter:blur(80px);z-index:0;}
.bg-orb2{position:fixed;width:600px;height:600px;border-radius:50%;bottom:-150px;right:-100px;
  background:radial-gradient(circle,${d?'rgba(124,92,252,.2)':'rgba(124,58,237,.12)'},transparent 65%);filter:blur(80px);z-index:0;}
.bg-orb3{position:fixed;width:400px;height:400px;border-radius:50%;top:40%;left:40%;
  background:radial-gradient(circle,${d?'rgba(34,209,122,.1)':'rgba(5,150,105,.07)'},transparent 65%);filter:blur(70px);z-index:0;}
.bg-grid{position:fixed;inset:0;z-index:0;
  background-image:linear-gradient(${d?'rgba(255,255,255,.028)':'rgba(0,0,0,.04)'} 1px,transparent 1px),linear-gradient(90deg,${d?'rgba(255,255,255,.028)':'rgba(0,0,0,.04)'} 1px,transparent 1px);
  background-size:52px 52px;mask-image:radial-gradient(ellipse 90% 80% at 50% 0%,black 30%,transparent 80%);}
.bg-noise{position:fixed;inset:0;z-index:0;opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px;}

/* NAV */
nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(16px,5vw,64px);height:58px;
  background:${d?'rgba(4,6,13,.8)':'rgba(245,240,232,.88)'};backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;text-decoration:none;}
.logo-mark{width:28px;height:28px;border-radius:7px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;
  color:#fff;font-family:'Playfair Display',serif;box-shadow:0 0 18px var(--glow);}
.logo-name{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;letter-spacing:-.2px;}
.nav-links{display:flex;gap:2px;}
.nav-link{padding:6px 13px;font-size:13px;font-weight:500;color:var(--text2);border-radius:7px;
  cursor:pointer;transition:all .15s;border:none;background:transparent;}
.nav-link:hover{color:var(--text);background:rgba(255,255,255,.05);}
.nav-right{display:flex;align-items:center;gap:8px;}
.btn-ghost{padding:7px 16px;background:transparent;border:1px solid var(--border2);
  border-radius:8px;color:var(--text);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn-primary{padding:8px 18px;background:var(--accent);border:none;border-radius:8px;
  color:#fff;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;
  box-shadow:0 0 20px rgba(79,141,255,.3);}
.btn-primary:hover{opacity:.88;box-shadow:0 0 30px rgba(79,141,255,.45);}
.btn-primary:active{transform:scale(.97);}
.btn-large{padding:13px 32px;font-size:15px;border-radius:10px;}
.btn-outline-large{padding:12px 28px;font-size:15px;border-radius:10px;
  background:transparent;border:1px solid var(--border2);color:var(--text);cursor:pointer;
  transition:all .2s;font-weight:500;}
.btn-outline-large:hover{border-color:var(--accent);color:var(--accent);}

/* HERO */
.hero{position:relative;z-index:5;text-align:center;padding:clamp(60px,10vh,110px) clamp(16px,5vw,32px) clamp(50px,8vh,90px);}
.hero-badge{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;color:var(--accent);
  padding:5px 14px;border:1px solid rgba(79,141,255,.28);
  background:rgba(79,141,255,.07);border-radius:100px;margin-bottom:24px;
  animation:fadeUp .5s ease both;}
.badge-ping{width:6px;height:6px;border-radius:50%;background:var(--green);position:relative;flex-shrink:0;}
.badge-ping::after{content:'';position:absolute;inset:-3px;border-radius:50%;
  background:var(--green);animation:ping 1.5s ease-out infinite;}
.hero-h1{font-family:'Playfair Display',serif;font-size:clamp(36px,7vw,78px);font-weight:800;
  line-height:1.04;letter-spacing:-2px;margin-bottom:20px;
  animation:fadeUp .5s .1s ease both;}
.hero-h1 .line1{color:var(--text);}
.hero-h1 .line2{
  background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 50%,var(--green) 100%);
  background-size:200% 200%;animation:fadeUp .5s .1s ease both, grad 4s ease infinite;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.hero-sub{font-size:clamp(15px,2vw,18px);color:var(--text2);max-width:560px;
  margin:0 auto 36px;line-height:1.7;animation:fadeUp .5s .2s ease both;}
.hero-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:56px;
  animation:fadeUp .5s .3s ease both;}
.hero-trust{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;
  animation:fadeUp .5s .4s ease both;}
.trust-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text3);}
.trust-dot{width:5px;height:5px;border-radius:50%;background:var(--green);}

/* MOCKUP */
.mockup-wrap{position:relative;z-index:5;max-width:860px;margin:0 auto 80px;
  padding:0 clamp(16px,4vw,32px);animation:fadeUp .6s .5s ease both;}
.mockup-shell{background:var(--surf);border:1px solid var(--border2);border-radius:16px;
  overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.6),0 0 0 1px var(--border),inset 0 1px 0 rgba(255,255,255,.06);}
.mockup-bar{background:var(--surf2);border-bottom:1px solid var(--border);padding:10px 16px;
  display:flex;align-items:center;gap:8px;}
.mockup-dots{display:flex;gap:5px;}
.mockup-dot{width:10px;height:10px;border-radius:50%;}
.mockup-url{flex:1;background:rgba(255,255,255,.05);border-radius:5px;padding:4px 12px;
  font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace;}
.mockup-inner{padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.mock-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;}
.mock-label{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:8px;}
.mock-val{font-family:'Playfair Display',serif;font-size:22px;font-weight:800;}
.mock-sub{font-size:10px;color:var(--text3);margin-top:3px;}
.mock-bar-wrap{height:4px;background:rgba(255,255,255,.05);border-radius:2px;margin-top:8px;}
.mock-bar-fill{height:4px;border-radius:2px;}
.mock-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;
  border-bottom:1px solid var(--border);}
.mock-row:last-child{border-bottom:none;}
.mock-name{font-size:11px;font-weight:500;}
.mock-pct{font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace;}
.mock-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}
.mock-stat{background:var(--bg2);border-radius:7px;padding:8px;text-align:center;}
.mock-stat-n{font-size:14px;font-weight:800;font-family:'Playfair Display',serif;}
.mock-stat-l{font-size:8px;color:var(--text3);margin-top:2px;}

/* SECTIONS */
.section{position:relative;z-index:5;padding:clamp(48px,7vw,90px) clamp(16px,5vw,64px);}
.section-inner{max-width:1040px;margin:0 auto;}
.eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);margin-bottom:10px;text-align:center;}
.sec-h2{font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,40px);font-weight:800;
  letter-spacing:-1px;text-align:center;margin-bottom:12px;}
.sec-sub{font-size:clamp(13px,1.6vw,15px);color:var(--text2);text-align:center;
  max-width:500px;margin:0 auto 48px;line-height:1.7;}

/* PROBLEM */
.pain-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;}
.pain-card{background:var(--surf);border:1px solid var(--border);border-radius:14px;padding:22px 20px;
  position:relative;overflow:hidden;transition:border-color .2s,transform .2s;}
.pain-card:hover{border-color:rgba(255,92,92,.3);transform:translateY(-3px);}
.pain-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,92,92,.05),transparent);pointer-events:none;}
.pain-ico{font-size:24px;margin-bottom:12px;}
.pain-card h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;margin-bottom:6px;letter-spacing:-.2px;}
.pain-card p{font-size:12px;color:var(--text2);line-height:1.6;}

/* FEATURES */
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1px;
  background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden;}
.feat-cell{background:var(--surf);padding:28px 26px;transition:background .2s;position:relative;overflow:hidden;}
.feat-cell:hover{background:var(--surf2);}
.feat-cell::after{content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,var(--glow),transparent);opacity:0;transition:opacity .3s;}
.feat-cell:hover::after{opacity:1;}
.feat-ico{width:40px;height:40px;border-radius:10px;background:var(--surf2);
  border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;
  font-size:18px;margin-bottom:14px;position:relative;z-index:1;}
.feat-cell h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;margin-bottom:6px;position:relative;z-index:1;}
.feat-cell p{font-size:12px;color:var(--text2);line-height:1.65;position:relative;z-index:1;}

/* HOW IT WORKS */
.steps-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;
  position:relative;}
.steps-row::before{content:'';position:absolute;top:28px;left:10%;right:10%;height:1px;
  background:linear-gradient(90deg,transparent,var(--border2),var(--border2),transparent);
  z-index:0;}
.step-item{text-align:center;padding:20px;position:relative;z-index:1;}
.step-num{width:56px;height:56px;border-radius:50%;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  display:flex;align-items:center;justify-content:center;
  font-family:'Playfair Display',serif;font-size:18px;font-weight:800;color:#fff;
  margin:0 auto 16px;box-shadow:0 0 24px var(--glow);}
.step-item h3{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;margin-bottom:6px;}
.step-item p{font-size:12px;color:var(--text2);line-height:1.65;}

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

/* TRUST */
.trust-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
.trust-card{background:var(--surf);border:1px solid var(--border);border-radius:14px;padding:22px;
  display:flex;flex-direction:column;gap:10px;transition:border-color .2s;}
.trust-card:hover{border-color:var(--green);}
.trust-ico{font-size:22px;}
.trust-card h3{font-family:'Playfair Display',serif;font-size:13px;font-weight:700;}
.trust-card p{font-size:12px;color:var(--text2);line-height:1.6;}

/* SOCIAL PROOF */
.proof-band{background:var(--surf);border-top:1px solid var(--border);border-bottom:1px solid var(--border);
  padding:24px clamp(16px,5vw,64px);display:flex;align-items:center;justify-content:center;
  gap:40px;flex-wrap:wrap;}
.proof-stat{text-align:center;}
.proof-n{font-family:'Playfair Display',serif;font-size:26px;font-weight:800;
  background:linear-gradient(135deg,var(--accent),var(--green));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.proof-l{font-size:11px;color:var(--text3);margin-top:2px;}

/* FAQ */
.faq-list{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:8px;}
.faq-item{background:var(--surf);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s;}
.faq-item.open{border-color:var(--border2);}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;
  cursor:pointer;font-size:14px;font-weight:600;gap:12px;-webkit-tap-highlight-color:transparent;
  font-family:'Playfair Display',serif;}
.faq-arrow{font-size:18px;color:var(--text2);transition:transform .25s;flex-shrink:0;line-height:1;}
.faq-arrow.open{transform:rotate(180deg);}
.faq-a{font-size:13px;color:var(--text2);line-height:1.7;padding:0 18px 16px;
  border-top:1px solid var(--border);}

/* FINAL CTA */
.cta-section{position:relative;z-index:5;padding:clamp(48px,7vw,90px) clamp(16px,5vw,64px);}
.cta-box{max-width:700px;margin:0 auto;text-align:center;
  background:var(--surf);border:1px solid var(--border2);border-radius:22px;
  padding:clamp(36px,5vw,60px) clamp(24px,5vw,56px);
  position:relative;overflow:hidden;
  box-shadow:0 40px 100px rgba(0,0,0,.4);}
.cta-box::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(79,141,255,.12),transparent);
  pointer-events:none;}
.cta-box h2{font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,38px);font-weight:800;
  letter-spacing:-1px;margin-bottom:12px;position:relative;z-index:1;}
.cta-box p{font-size:15px;color:var(--text2);margin-bottom:28px;line-height:1.6;position:relative;z-index:1;}
.cta-chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:20px;position:relative;z-index:1;}
.cta-chip{font-size:11px;font-weight:600;padding:5px 13px;border-radius:7px;
  border:1px solid var(--border2);color:var(--text2);}
.cta-chip.g{border-color:rgba(34,209,122,.3);color:var(--green);background:rgba(34,209,122,.07);}

/* FOOTER */
footer{position:relative;z-index:5;border-top:1px solid var(--border);
  padding:28px clamp(16px,5vw,64px);}
.footer-inner{max-width:1040px;margin:0 auto;display:flex;align-items:center;
  justify-content:space-between;flex-wrap:wrap;gap:12px;}
.footer-logo{display:flex;align-items:center;gap:8px;}
.footer-links{display:flex;gap:18px;}
.footer-link{font-size:12px;color:var(--text3);cursor:pointer;transition:color .15s;}
.footer-link:hover{color:var(--text2);}
.footer-note{font-size:11px;color:var(--text3);}

/* RESPONSIVE */
@media(max-width:767px){
  nav{padding:0 16px;}
  .nav-links{display:none;}
  .mockup-inner{grid-template-columns:1fr;}
  .steps-row::before{display:none;}
  .compare-table{font-size:12px;}
  .compare-head div,.compare-row div{padding:10px 12px;}
  .about-grid{grid-template-columns:1fr;}
  .footer-links{display:none;}
}
@media(min-width:768px) and (max-width:1023px){
  .feat-grid{grid-template-columns:repeat(2,1fr);}
}
`;
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open?' open':''}`}>
      <div className="faq-q" onClick={()=>setOpen(o=>!o)}>
        <span>{q}</span>
        <span className={`faq-arrow${open?' open':''}`}></span>
      </div>
      {open&&<div className="faq-a">{a}</div>}
    </div>
  );
}

function MockupCard() {
  const courses = [
    {n:'Molecular Biology',p:78.6,col:'#22d17a'},
    {n:'Bioprocess Engg',p:85.2,col:'#22d17a'},
    {n:'Chem Engg Principles',p:70.4,col:'#ff5c5c'},
    {n:'Artificial Intelligence',p:84.6,col:'#22d17a'},
    {n:'Diseases Models',p:62.5,col:'#ff5c5c'},
  ];
  return (
    <div className="mockup-shell">
      <div className="mockup-bar">
        <div className="mockup-dots">
          <div className="mockup-dot" style={{background:'#ff5f57'}}/>
          <div className="mockup-dot" style={{background:'#febc2e'}}/>
          <div className="mockup-dot" style={{background:'#28c840'}}/>
        </div>
        <div className="mockup-url">academia.srmist.edu.in → CampusHub</div>
      </div>
      <div className="mockup-inner">
        <div>
          <div className="mock-card" style={{marginBottom:10}}>
            <div className="mock-label">Overall Attendance</div>
            <div className="mock-val" style={{color:'#22d17a'}}>79.8%</div>
            <div className="mock-sub">216 classes conducted</div>
            <div className="mock-bar-wrap"><div className="mock-bar-fill" style={{width:'79.8%',background:'#22d17a'}}/></div>
          </div>
          <div className="mock-card">
            <div className="mock-label">Attendance by Subject</div>
            {courses.map((c,i)=>(
              <div key={i} className="mock-row">
                <span className="mock-name" style={{color:i<3?'#eef2ff':'#8896b3',fontSize:10}}>{c.n}</span>
                <span className="mock-pct" style={{color:c.col}}>{c.p}%</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mock-card" style={{marginBottom:10}}>
            <div className="mock-label">Today -- Day 4</div>
            <div className="mock-stat-grid">
              <div className="mock-stat"><div className="mock-stat-n" style={{color:'#4f8dff'}}>3</div><div className="mock-stat-l">At Risk</div></div>
              <div className="mock-stat"><div className="mock-stat-n" style={{color:'#22d17a'}}>3</div><div className="mock-stat-l">Safe</div></div>
              <div className="mock-stat"><div className="mock-stat-n" style={{color:'#ff5c5c'}}>9</div><div className="mock-stat-l">Absent</div></div>
            </div>
          </div>
          <div className="mock-card">
            <div className="mock-label">Today's Classes</div>
            {[
              {n:'Molecular Biology',t:'08:00',r:'B103'},
              {n:'Bioprocess Engg',t:'08:50',r:'B103'},
              {n:'Diseases Models',t:'12:30',r:'B403'},
              {n:'Free Period',t:'01:25',r:'--'},
            ].map((c,i)=>(
              <div key={i} className="mock-row">
                <span className="mock-name" style={{fontSize:10,color:i===3?'#4a5568':'#eef2ff'}}>{c.n}</span>
                <span style={{fontSize:9,color:'#4a5568',fontFamily:'monospace'}}>{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing({ onLogin, dark, setDark }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  };

  return (
    <>
      <style>{getLandCSS(dark)}</style>
      <div style={{position:'relative',minHeight:'100vh'}}>
        <div className="bg-orb1"/><div className="bg-orb2"/><div className="bg-orb3"/>
        <div className="bg-grid"/><div className="bg-noise"/>

        {/* NAV */}
        <nav>
          <div className="nav-logo">
            <div className="logo-mark">C</div>
            <span className="logo-name">CampusHub</span>
          </div>
          <div className="nav-links">
            {[['Features','features'],['How it Works','how'],['About','about'],['FAQ','faq']].map(([l,id])=>(
              <button key={id} className="nav-link" onClick={()=>scrollTo(id)}>{l}</button>
            ))}
          </div>
          <div className="nav-right">
            <button onClick={()=>setDark(d=>!d)} style={{
              width:34,height:34,background:'transparent',
              border:'1px solid var(--border2)',borderRadius:8,
              cursor:'pointer',fontSize:15,display:'flex',alignItems:'center',
              justifyContent:'center',color:'var(--text2)'
            }}>{dark?'☀':'☾'}</button>
            <button className="btn-ghost" onClick={onLogin}>Sign in</button>
            <button className="btn-primary" onClick={onLogin}>Get Started →</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-badge"><div className="badge-ping"/>SRM KTR · Free for all students</div>
          <h1 className="hero-h1">
            <div className="line1">CampusHub,</div>
            <div className="line2">but actually usable.</div>
          </h1>
          <p className="hero-sub">
            Check attendance, timetable, and internal marks in seconds -- no lag, no confusion, no refreshing 10 times.
          </p>
          <div className="hero-cta">
            <button className="btn-primary btn-large" onClick={onLogin}>Login with SRM ID →</button>
            <button className="btn-outline-large" onClick={()=>scrollTo('features')}>See Features</button>
          </div>
          <div className="hero-trust">
            {['Free Forever','No data stored','All departments','Works on mobile'].map(t=>(
              <div key={t} className="trust-item"><div className="trust-dot"/><span>{t}</span></div>
            ))}
          </div>
        </div>

        {/* MOCKUP */}
        <div className="mockup-wrap">
          <MockupCard/>
        </div>

        {/* PROBLEM */}
        <div className="section">
          <div className="section-inner">
            <p className="eyebrow">The Problem</p>
            <h2 className="sec-h2">Tired of the official portal?</h2>
            <p className="sec-sub">Every SRM student knows the pain. We built this to fix exactly that.</p>
            <div className="pain-grid">
              {[
                {i:'🐌',t:'It\'s painfully slow',d:'Portal takes forever to load. Sometimes it just fails. You try again. It fails again.'},
                {i:'🤯',t:'Too many clicks',d:'Three pages just to find your attendance. Another five to check your marks. Why?'},
                {i:'📉',t:'No clear overview',d:'No dashboard, no summary. You have to manually calculate if you can skip class.'},
                {i:'📱',t:'Not mobile-friendly',d:'Zoomed-out tables on mobile. Horizontal scrolling everywhere. Practically unusable on phone.'},
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
                <div>Feature</div><div style={{color:'var(--red)'}}>Official Portal</div><div style={{color:'var(--green)'}}>CampusHub</div>
              </div>
              {[
                ['Load time','30-60s','Instant*'],
                ['UI clarity','Confusing','Clean & simple'],
                ['Mobile support','Broken','Fully responsive'],
                ['Attendance margin','Manual math','Auto-calculated'],
                ['Day-order calendar','Not available','Built-in'],
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
            <p style={{textAlign:'center',fontSize:11,color:'var(--text3)',marginTop:10}}>*After first login. First login uses the official portal so it inherits its speed.</p>
          </div>
        </div>

        {/* FEATURES */}
        <div id="features" className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <p className="eyebrow">Features</p>
            <h2 className="sec-h2">Everything, in one place</h2>
            <p className="sec-sub">Built around what SRM students actually need -- not what looks good on a product page.</p>
            <div className="feat-grid">
              {[
                {i:'📊',t:'Attendance Tracker',d:'See exact % per subject. Know your margin (classes you can skip) or how many you need to attend to hit 75%.'},
                {i:'📅',t:'Day-wise Timetable',d:'See today\'s classes by day order -- with room numbers. Click any calendar date to see that day\'s schedule.'},
                {i:'📈',t:'Internal Marks',d:'All cycle test scores in one view, per subject. See your total marks scored vs maximum at a glance.'},
                {i:'🗓️',t:'Academic Calendar',d:'Full month view with day orders mapped automatically. Sundays and holidays handled correctly.'},
                {i:'⚡',t:'Session Memory',d:'Log in once -- your session is saved. Next visit loads your data instantly without re-entering credentials.'},
                {i:'🌗',t:'Dark & Light Mode',d:'Switch themes anytime. Dark by default because that\'s what you wanted.'},
              ].map(f=>(
                <div key={f.t} className="feat-cell">
                  <div className="feat-ico">{f.i}</div>
                  <h3>{f.t}</h3><p>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how" className="section" style={{paddingTop:0}}>
          <div className="section-inner">
            <p className="eyebrow">How it works</p>
            <h2 className="sec-h2">Three steps, done</h2>
            <p className="sec-sub">No app to install. No account to create. Just use your existing SRM credentials.</p>
            <div className="steps-row">
              {[
                {n:1,t:'Sign in',d:'Enter your SRM academia email and password. Same credentials you use on the official portal.'},
                {n:2,t:'We fetch your data',d:'We securely log into academia.srmist.edu.in on your behalf and pull your attendance, marks, and timetable.'},
                {n:3,t:'View your dashboard',d:'Everything is shown clearly -- attendance %, margins, marks, timetable, and day-order calendar.'},
                {n:4,t:'Come back anytime',d:'Your session is saved for 24 hours. Return visits are instant -- no re-login needed.'},
              ].map(s=>(
                <div key={s.n} className="step-item">
                  <div className="step-num">{s.n}</div>
                  <h3>{s.t}</h3><p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="proof-band">
          {[['75%','Minimum attendance'],['5','Day orders'],['Free','Always, no catch'],['Fast','After first login'],['SRM KTR','Students only']].map(([n,l])=>(
            <div key={l} className="proof-stat">
              <div className="proof-n">{n}</div>
              <div className="proof-l">{l}</div>
            </div>
          ))}
        </div>

        {/* TRUST / SECURITY */}
        <div id="about" className="section">
          <div className="section-inner">
            <p className="eyebrow">Privacy & Security</p>
            <h2 className="sec-h2">Your data is safe</h2>
            <p className="sec-sub">We know you're handing over login credentials. Here's exactly what we do and don't do.</p>
            <div className="trust-grid">
              {[
                {i:'🔒',t:'Password never stored',d:'Your password is used only to log in during that session. It is never saved to any database or server anywhere.'},
                {i:'🍪',t:'Only cookies saved',d:'After login, only the session cookies are saved locally -- the same thing your browser does for any website.'},
                {i:'',t:'24-hour expiry',d:'Saved sessions automatically expire after 24 hours. You\'ll need to log in again after that.'},
                {i:'🎓',t:'Student-built',d:'Built by an SRM KTR student who uses it themselves. Not a company. Not collecting your data for ads.'},
                {i:'🚫',t:'Not affiliated with SRMIST',d:'This is an independent project. Not endorsed by or connected to SRM Institute in any official capacity.'},
                {i:'💸',t:'No monetisation',d:'No ads, no paid plans, no selling data. Free and open for all SRM KTR students.'},
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
                {q:'Is my password stored anywhere?',a:'Absolutely not. Your password is only used to log into academia.srmist.edu.in on your behalf during that session. It is never saved anywhere.'},
                {q:'Is it free?',a:'Yes. Completely free. No premium plan, no ads, no subscriptions. Free forever.'},
                {q:'Do I need to install anything?',a:'No. It\'s a web app -- just open it in your browser. Works on phone, tablet, and laptop.'},
                {q:'Why does the first login take long?',a:'The first login uses a real browser to log into academia on your behalf, which is slow because academia itself is slow. After that, sessions are saved and it loads instantly.'},
                {q:'Does it work for all departments?',a:'Yes. Works for all departments and batches at SRM KTR as long as your data is visible on academia.srmist.edu.in.'},
                {q:'What if my data looks wrong?',a:'Data is pulled directly from academia -- if something looks off, the source data on academia is the cause. Try logging in again.'},
                {q:'Is this safe to use?',a:'Yes. Your credentials are used only to fetch your data from the official portal. Nothing else is done with them. Sessions expire in 24 hours.'},
              ].map((f,i)=><FaqItem key={i} q={f.q} a={f.a}/>)}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="cta-section">
          <div className="cta-box">
            <h2>Start using CampusHub now</h2>
            <p>Check your attendance, marks, and timetable in one clean dashboard. Free forever.</p>
            <button className="btn-primary btn-large" onClick={onLogin}>Login with SRM ID →</button>
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
              <span style={{fontSize:13,fontWeight:600}}>CampusHub</span>
            </div>
            <div className="footer-links">
              {[['Features','features'],['How it Works','how'],['About','about'],['FAQ','faq']].map(([l,id])=>(
                <span key={id} className="footer-link" onClick={()=>scrollTo(id)}>{l}</span>
              ))}
            </div>
            <span className="footer-note">Not affiliated with SRMIST · Built by students for students</span>
          </div>
        </footer>
      </div>
    </>
  );
}
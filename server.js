const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 3000;
const redis = createClient({ url: process.env.REDIS_URL });

redis.on('error', err => console.error('Redis error', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function page(content, title='SOLARYN Survey') {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<style>
:root{--bg:#f6f8fb;--card:#fff;--text:#172033;--muted:#667085;--line:#dfe4ea;--accent:#0f6b5f;--accent2:#0b564d}
*{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:780px;margin:0 auto;padding:24px 16px 56px}.hero,.card{background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 5px 20px rgba(16,24,40,.05)}
.hero{padding:26px;margin-bottom:16px}.brand{font-weight:800;letter-spacing:.08em;color:var(--accent);font-size:13px}.hero h1{font-size:30px;line-height:1.15;margin:8px 0 10px}.hero p{color:var(--muted);line-height:1.55;margin:0}.time{display:inline-block;margin-top:14px;padding:8px 12px;background:#eef7f5;border-radius:999px;color:var(--accent2);font-weight:700;font-size:14px}
.card{padding:22px;margin:14px 0}.q{font-weight:750;font-size:17px;margin:0 0 14px}.sub{font-size:14px;color:var(--muted);margin:-6px 0 12px}.opt{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #f0f2f5}.opt:last-child{border-bottom:0}.opt input{margin-top:3px;transform:scale(1.18)}
input[type=text],input[type=email],textarea{width:100%;padding:12px 13px;border:1px solid #cfd6df;border-radius:10px;font:inherit;background:#fff}textarea{min-height:110px;resize:vertical}
.scale{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.scale label{border:1px solid #d7dde5;border-radius:12px;padding:12px 6px;text-align:center}.scale input{display:block;margin:0 auto 6px}
button{width:100%;border:0;border-radius:12px;padding:15px 18px;background:var(--accent);color:#fff;font-size:17px;font-weight:800;cursor:pointer}button:hover{background:var(--accent2)}
.req{color:#b42318}.foot{color:var(--muted);font-size:13px;text-align:center;margin-top:18px}.success{text-align:center;padding:42px 26px}.success h2{font-size:28px;margin:0 0 10px}.success p{color:var(--muted)}
table{width:100%;border-collapse:collapse;font-size:13px;background:white}th,td{border:1px solid #e5e7eb;padding:8px;vertical-align:top;text-align:left}th{background:#f8fafc;position:sticky;top:0}.tablewrap{overflow:auto;max-height:75vh}
.adminbar{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}.adminbar a{display:inline-block;padding:9px 12px;background:#eef7f5;color:var(--accent2);text-decoration:none;border-radius:9px;font-weight:700}
@media(max-width:520px){.hero h1{font-size:25px}.card{padding:18px}.scale{gap:5px}.scale label{padding:10px 2px;font-size:13px}}
</style>
</head><body><div class="wrap">${content}</div></body></html>`;
}

app.get('/', (req,res) => {
  res.send(page(`
    <section class="hero">
      <div class="brand">SOLARYN · CUSTOMER DISCOVERY</div>
      <h1>PV Technology Selection – Industry Survey</h1>
      <p>We are conducting early market research on how photovoltaic technologies and modules are selected for solar projects. The purpose is to understand current industry practices, decision criteria, challenges, and opportunities for improving technology selection.</p>
      <div class="time">Approximately 2–3 minutes</div>
    </section>
    <form method="post" action="/submit">
      <section class="card"><p class="q">1. What best describes your role? <span class="req">*</span></p>
      ${['PV / Solar Engineer','EPC / Project Engineer','Project Developer','Procurement','Asset Owner / IPP','Technical Consultant / Independent Engineer','Researcher','Investor / Financial Analyst','Other'].map(x=>`<label class="opt"><input required type="radio" name="role" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">2. What influences PV technology/module selection?</p><p class="sub">Select all that apply.</p>
      ${['Module price / €/W','Supplier availability','Manufacturer bankability','Module efficiency','Energy-yield simulation','Temperature coefficient','Climate / environmental conditions','Degradation expectations','Reliability / warranty','Previous project experience','LCOE / project economics','EPC or client preference','Other'].map(x=>`<label class="opt"><input type="checkbox" name="influences" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">3. How important are site-specific climate conditions when selecting PV technology? <span class="req">*</span></p>
      <div class="scale">${[1,2,3,4,5].map(n=>`<label><input required type="radio" name="climate_importance" value="${n}"><strong>${n}</strong><br><span style="font-size:11px;color:#667085">${n===1?'Not important':n===5?'Extremely important':''}</span></label>`).join('')}</div></section>

      <section class="card"><p class="q">4. Do you currently compare how different PV technologies may perform over the lifetime of the project? <span class="req">*</span></p>
      ${['Yes, systematically','Sometimes','Rarely','No',"I don't know"].map(x=>`<label class="opt"><input required type="radio" name="lifetime_comparison" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">5. Which aspects are the most difficult to evaluate when comparing PV technologies?</p><p class="sub">Select up to 3.</p>
      ${['Climate-specific performance','Energy yield','Temperature behaviour','Degradation','Reliability','Soiling / environmental stress','Technology comparison','Lifetime performance','Module price vs long-term value','LCOE / NPV / IRR impact','Data availability','Other'].map(x=>`<label class="opt"><input type="checkbox" class="max3" name="difficult_aspects" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">6. Would a tool that connects the full decision chain be useful in your current process? <span class="req">*</span></p>
      <p class="sub"><strong>Site & Project → Climate → Technology Behaviour → Lifetime Performance → Economics → Technology Decision</strong></p>
      ${['Very useful','Useful','Possibly useful','Not very useful','Not useful'].map(x=>`<label class="opt"><input required type="radio" name="workflow_usefulness" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">7. At which stage would such a tool create the most value? <span class="req">*</span></p>
      ${['Early project development','Feasibility study','Engineering / design','Module technology selection','Procurement','Investment / due diligence','Portfolio planning','It would not add significant value','Other'].map(x=>`<label class="opt"><input required type="radio" name="value_stage" value="${esc(x)}"><span>${esc(x)}</span></label>`).join('')}</section>

      <section class="card"><p class="q">8. What is currently missing or difficult in the PV technology-selection process?</p>
      <textarea name="missing_text" placeholder="Optional"></textarea></section>

      <section class="card"><p class="q">Would you be willing to test an early prototype or provide further feedback?</p>
      ${['Yes','Maybe','No'].map(x=>`<label class="opt"><input type="radio" name="prototype_interest" value="${x}"><span>${x}</span></label>`).join('')}
      <p class="q" style="margin-top:18px">Email address</p><input type="email" name="email" placeholder="Optional"></section>

      <button type="submit">Submit survey</button><div class="foot">Thank you for contributing to this early industry research.</div>
    </form>
    <script>
      const boxes=[...document.querySelectorAll('.max3')];
      boxes.forEach(b=>b.addEventListener('change',()=>{const checked=boxes.filter(x=>x.checked);boxes.filter(x=>!x.checked).forEach(x=>x.disabled=checked.length>=3);}));
    </script>
  `));
});

app.post('/submit', async (req,res) => {
  try {
    const influences = Array.isArray(req.body.influences) ? req.body.influences : (req.body.influences ? [req.body.influences] : []);
    const difficult = Array.isArray(req.body.difficult_aspects) ? req.body.difficult_aspects : (req.body.difficult_aspects ? [req.body.difficult_aspects] : []);
    const record = {
      created_at: new Date().toISOString(),
      role: req.body.role,
      influences,
      climate_importance: Number(req.body.climate_importance),
      lifetime_comparison: req.body.lifetime_comparison,
      difficult_aspects: difficult,
      workflow_usefulness: req.body.workflow_usefulness,
      value_stage: req.body.value_stage,
      missing_text: req.body.missing_text || '',
      prototype_interest: req.body.prototype_interest || '',
      email: req.body.email || ''
    };
    await redis.lPush('solaryn:survey:responses', JSON.stringify(record));
    res.send(page(`<section class="hero success"><div class="brand">SOLARYN</div><h2>Thank you.</h2><p>Your response has been recorded successfully.</p></section>`, 'Thank you'));
  } catch (e) {
    console.error(e);
    res.status(500).send(page(`<section class="hero success"><h2>Submission error</h2><p>Please try again in a moment.</p></section>`,'Submission error'));
  }
});

function authorized(req){ return req.query.key && req.query.key === process.env.ADMIN_KEY; }

async function getRows() {
  const raw = await redis.lRange('solaryn:survey:responses', 0, -1);
  return raw.map(x => JSON.parse(x));
}

app.get('/results', async (req,res) => {
  if (!authorized(req)) return res.status(401).send('Unauthorized');
  const rows = await getRows();
  const body = `
  <section class="hero"><div class="brand">SOLARYN · RESULTS</div><h1>${rows.length} response${rows.length===1?'':'s'}</h1>
  <div class="adminbar"><a href="/results.csv?key=${encodeURIComponent(req.query.key)}">Download CSV</a><a href="/">Open survey</a></div></section>
  <div class="tablewrap"><table><thead><tr><th>Date</th><th>Role</th><th>Influences</th><th>Climate</th><th>Lifetime comparison</th><th>Difficult aspects</th><th>Workflow usefulness</th><th>Value stage</th><th>Missing / difficult</th><th>Prototype</th><th>Email</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><td>${esc(r.created_at)}</td><td>${esc(r.role)}</td><td>${esc((r.influences||[]).join('; '))}</td><td>${esc(r.climate_importance)}</td><td>${esc(r.lifetime_comparison)}</td><td>${esc((r.difficult_aspects||[]).join('; '))}</td><td>${esc(r.workflow_usefulness)}</td><td>${esc(r.value_stage)}</td><td>${esc(r.missing_text||'')}</td><td>${esc(r.prototype_interest||'')}</td><td>${esc(r.email||'')}</td></tr>`).join('')}</tbody></table></div>`;
  res.send(page(body,'SOLARYN Survey Results'));
});

app.get('/results.csv', async (req,res) => {
  if (!authorized(req)) return res.status(401).send('Unauthorized');
  const rows = await getRows();
  const headers=['created_at','role','influences','climate_importance','lifetime_comparison','difficult_aspects','workflow_usefulness','value_stage','missing_text','prototype_interest','email'];
  const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const csv=[headers.join(',')];
  for(const r of rows){csv.push(headers.map(h=>q(Array.isArray(r[h])?r[h].join('; '):r[h])).join(','));}
  res.setHeader('Content-Type','text/csv');
  res.setHeader('Content-Disposition','attachment; filename="solaryn-survey-responses.csv"');
  res.send(csv.join('\n'));
});

redis.connect()
  .then(()=>app.listen(port,()=>console.log('SOLARYN survey running on',port)))
  .catch(err=>{console.error('Redis connection failed',err);process.exit(1);});

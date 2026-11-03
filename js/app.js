/* Fish Encyclopedia — client app. Data: data/species.json (edit it, no build step). */
let DB = [], META = {};
let lang = localStorage.getItem('fe_lang') || 'bn';

const STR = {
  bn: {home:'হোম', browse:'প্রজাতি', hill:'পাহাড়ি মাছ', prio:'অগ্রাধিকার', dist:'জেলা', about:'সম্পর্কে',
    search:'খুঁজুন (বৈজ্ঞানিক / বাংলা / English নাম, family)…', all:'সব', rarity:'বিরলতা', breeding:'ব্রিডিং',
    priority:'অগ্রাধিকার', origin:'উৎস', native:'দেশীয়', exotic:'Exotic', hillOnly:'শুধু পাহাড়ি', photoOnly:'শুধু ছবিসহ',
    species:'প্রজাতি', showing:'টি দেখানো হচ্ছে', noPhoto:'ছবি নেই — field photography প্রয়োজন',
    facts:'মূল তথ্য', genus:'গণ (Genus)', maxSize:'সর্বোচ্চ আকার', evidence:'প্রমাণ', synonyms:'প্রতিশব্দ',
    refs:'তথ্যসূত্র', hillNotes:'পাহাড়ি নোট', morphs:'নথিভুক্ত morph', colours:'প্রাকৃতিক রঙ',
    photoBy:'ছবি', license:'লাইসেন্স', source:'উৎস পৃষ্ঠা', prev:'← আগের', next:'পরের →',
    topA:'শীর্ষ অগ্রাধিকার A', consP:'সংরক্ষণ অগ্রাধিকার (জাতীয় CR/EN — বাণিজ্য নিষেধ)',
    distIndex:'জেলা-ভিত্তিক সূচক', recorded:'টি রেকর্ডকৃত প্রজাতি',
    brand:'বাংলাদেশের ছোট ও শোভাবর্ধক মাছ', sub:'সচিত্র বৈজ্ঞানিক বিশ্বকোষ — কিউরেটেড সংগ্রহে ১৪৭টি প্রজাতি-প্রোফাইল',
    verifiedN:'যাচাইকৃত', bdConf:'বাংলাদেশে নিশ্চিত', distConf:'জেলা-রেকর্ড নিশ্চিত', photoMiss:'ছবি নেই',
    evidenceT:'প্রমাণ ও উৎস', verTax:'শ্রেণিবিন্যাস', verBd:'বাংলাদেশে উপস্থিতি', verDist:'জেলা-রেকর্ড',
    verHab:'আবাস-শ্রেণি', verPhoto:'আলোকচিত্র', verCons:'সংরক্ষণ অবস্থা',
    compare:'তুলনা', compareT:'প্রজাতি তুলনা', comparePick:'তুলনা করতে ২–৪টি প্রজাতি বেছে নিন',
    hillCat1:'নিশ্চিত পাহাড়ি বিশেষজ্ঞ', hillCat2:'পাহাড়ি-সংশ্লিষ্ট', hillCat3:'পাহাড়ি অঞ্চলের সাধারণ মাছ', hillCat4:'যাচাই প্রয়োজন', hillPending:'শ্রেণিবিন্যাস চলমান',
    family:'Family', habitat:'আবাস', verFilter:'যাচাই অবস্থা',
    lastRev:'সর্বশেষ পর্যালোচনা', collNote:'প্রতিটি দাবির পেছনে উৎস — নিচে প্রমাণ দেখুন',
    explore:'ঘুরে দেখুন', hillDesc:'খাগড়াছড়ি, বান্দরবান, রাঙ্গামাটি ও সিলেটের ঝিরি-ছড়ার বিরল মাছ',
    aboutT:'গবেষণা পদ্ধতি', fallback:'(বাংলা অনুবাদ নেই — English পাঠ দেখানো হচ্ছে)',
    photos:'ছবিসহ প্রজাতি'},
  en: {home:'Home', browse:'Species', hill:'Hill-stream', prio:'Priority', dist:'Districts', about:'About',
    search:'Search (scientific / Bengali / common name, family)…', all:'All', rarity:'Rarity', breeding:'Breeding',
    priority:'Priority', origin:'Origin', native:'Native', exotic:'Exotic', hillOnly:'Hill-stream only', photoOnly:'With photo',
    species:'species', showing:'shown', noPhoto:'No photo — field photography needed',
    facts:'Key facts', genus:'Genus', maxSize:'Max size', evidence:'Evidence', synonyms:'Synonyms',
    refs:'References', hillNotes:'Hill-stream notes', morphs:'Documented morphs', colours:'Natural colours',
    photoBy:'Photo', license:'License', source:'Source page', prev:'← Prev', next:'Next →',
    topA:'Top Priority A', consP:'Conservation priority (national CR/EN — no commercial use)',
    distIndex:'District index', recorded:'recorded species',
    brand:'Small & Ornamental Fishes of Bangladesh', sub:'Illustrated scientific encyclopedia · 147 species profiles in the curated collection',
    verifiedN:'Verified', bdConf:'BD occurrence confirmed', distConf:'District records confirmed', photoMiss:'No photo',
    evidenceT:'Evidence & Sources', verTax:'Taxonomy', verBd:'Bangladesh occurrence', verDist:'District records',
    verHab:'Habitat classification', verPhoto:'Photograph', verCons:'Conservation status',
    compare:'Compare', compareT:'Species comparison', comparePick:'Pick 2–4 species to compare',
    hillCat1:'Confirmed hill-stream specialists', hillCat2:'Hill-stream-associated', hillCat3:'General freshwater in hill regions', hillCat4:'Needs verification', hillPending:'Classification pending',
    family:'Family', habitat:'Habitat', verFilter:'Verification',
    lastRev:'Last reviewed', collNote:'Every claim carries its source — see Evidence below',
    explore:'Explore', hillDesc:'Rare fishes of the hill streams of Khagrachari, Bandarban, Rangamati & Sylhet',
    aboutT:'Research methodology', fallback:'',
    photos:'Species with photos'},
};
const SEC_BN = {identification:'শনাক্তকরণ', physical_characteristics:'দৈহিক বৈশিষ্ট্য',
  male_vs_female:'পুরুষ ও স্ত্রী', natural_habitat:'আবাসস্থল', bangladesh_distribution:'বাংলাদেশে বিস্তৃতি',
  south_asian_distribution:'দক্ষিণ এশিয়ায় বিস্তৃতি', environmental_requirements:'পানির পরামিতি (বন্য / অ্যাকুরিয়াম)',
  feeding_and_behaviour:'খাদ্য ও আচরণ', breeding_and_reproduction:'প্রজনন', lifespan_and_growth:'আয়ু ও বৃদ্ধি',
  conservation_status:'সংরক্ষণ অবস্থা', captive_care_notes:'অ্যাকুরিয়াম উপযোগিতা', research_gaps:'গবেষণা ঘাটতি'};
const HILL_BN = {stream_current_preference:'স্রোত', oxygen_demand:'অক্সিজেন', rock_gravel_substrate_use:'তলদেশ',
  flowing_water_adaptations:'স্রোত-অভিযোজন', adhesive_structures_or_special_morphology:'আঠালো গঠন',
  seasonal_habitat_changes:'মৌসুমি পরিবর্তন', monsoon_breeding_pattern:'বর্ষা প্রজনন',
  flash_flood_vulnerability:'আকস্মিক বন্যা ঝুঁকি', captive_environment_requirements:'captive পরিবেশ',
  specialized_aquarium_setup:'বিশেষ aquarium সেটআপ', captive_breeding_challenges:'captive breeding চ্যালেঞ্জ'};
const ORDER = ['identification','physical_characteristics','male_vs_female','natural_habitat',
  'bangladesh_distribution','south_asian_distribution','environmental_requirements','feeding_and_behaviour',
  'breeding_and_reproduction','lifespan_and_growth','conservation_status','captive_care_notes','research_gaps'];

const esc = s => String(s||'').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T = k => STR[lang][k];
const app = document.getElementById('app');

function badges(sp){
  let h = `<span class="badge b-${sp.rarity}">${sp.rarity}</span>`;
  if(sp.breeding_potential) h += ` <span class="badge" style="background:#5b7fa6">${lang==='bn'?'ব্রিডিং':'Breeding'}: ${esc(sp.breeding_potential)}</span>`;
  if(sp.priority) h += ` <span class="badge ${sp.priority==='IE'?'b-IE':'b-'+sp.priority}">${lang==='bn'?'অগ্রাধিকার':'Priority'} ${sp.priority}</span>`;
  if(sp.native_status!=='Native') h += ` <span class="badge b-E">EXOTIC</span>`;
  return `<div class="badges">${h}</div>`;
}
function altText(sp){
  return sp.image.alt || `${sp.scientific_name}${sp.english_common_name?` (${sp.english_common_name})`:''} — photograph`;
}
function thumb(sp){
  if(sp.image.thumb) return `<img src="${sp.image.thumb}" alt="${esc(altText(sp))}" loading="lazy" onerror="this.outerHTML='<div class=&quot;nophoto&quot;>${T('noPhoto')}</div>'">`;
  return `<div class="nophoto">${T('noPhoto')}</div>`;
}
function card(sp){
  return `<a class="card" href="#/species/${sp.serial}">
    ${thumb(sp)}
    <div class="body"><div class="t"><span class="sci">${esc(sp.scientific_name)}</span></div>
    <div class="bn">${esc(sp.bengali_name||sp.english_common_name||'')}</div>${badges(sp)}</div></a>`;
}
function secLabel(f){ return lang==='bn' ? (SEC_BN[f]||f) : f.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()); }

/* ---------- views ---------- */
function vHome(){
  const hill = DB.filter(s=>s.hill_stream);
  const v = d => DB.filter(s=>s.verification && s.verification[d] && ['verified','confirmed','checked'].includes(s.verification[d].status)).length;
  app.innerHTML = `<h1>${T('brand')}</h1><p>${T('sub')}</p>
  <div class="statgrid">
    <div class="stat"><div class="n">${META.total}</div><div class="l">${T('species')}</div></div>
    <div class="stat"><div class="n">${v('taxonomy')}</div><div class="l">${T('verTax')} ✓</div></div>
    <div class="stat"><div class="n">${v('bangladesh_occurrence')}</div><div class="l">${T('bdConf')}</div></div>
    <div class="stat"><div class="n">${v('district_occurrence')}</div><div class="l">${T('distConf')}</div></div>
    <div class="stat"><div class="n">${DB.filter(s=>s.verification&&s.verification.photograph.status==='missing').length}</div><div class="l">${T('photoMiss')}</div></div>
    <div class="stat"><div class="n">${META.families.length}</div><div class="l">Family</div></div>
  </div>
  <p style="font-size:13px;color:var(--grey)">${T('lastRev')}: 3 November 2026 · ${T('collNote')}</p>
  <h2>⭐ ${T('topA')}</h2>
  <div class="grid">${DB.filter(s=>s.priority==='A').sort((a,b)=>(b.score||0)-(a.score||0)).slice(0,8).map(card).join('')}</div>
  <h2>⛰️ ${T('hill')}</h2><p>${T('hillDesc')}</p>
  <div class="grid">${hill.slice(0,4).map(card).join('')}</div>
  <p><a href="#/hillstream">${T('explore')} →</a></p>`;
}
let F = {q:'', rarity:'', breeding:'', priority:'', origin:'', family:'', habitat:'', ver:'', hill:false, photo:false};
function habitatGroup(s){
  const t = ((s.en.natural_habitat&&s.en.natural_habitat.text)||'').toLowerCase();
  if(/hill stream|hill-stream|torrential|rapids|riffle|fast-flow/.test(t)) return 'hill';
  if(/estuar|mangrove|tidal|brackish|marine|coast|lagoon/.test(t)) return 'estuary';
  if(/pond|ditch|paddy|beel|haor|wetland|floodplain|swamp|marsh|baor|jheel/.test(t)) return 'wetland';
  if(/river|stream|canal/.test(t)) return 'river';
  return 'other';
}
function vBrowse(){
  const rar = [...new Set(DB.map(s=>s.rarity))].sort();
  const br = [...new Set(DB.map(s=>s.breeding_potential).filter(Boolean))].sort();
  const fams = [...new Set(DB.map(s=>s.family))].sort();
  app.innerHTML = `<h1>🔍 ${T('browse')}</h1>
  <div class="toolbar">
    <input type="search" id="fq" placeholder="${T('search')}" value="${esc(F.q)}">
    <select id="fr"><option value="">${T('rarity')}: ${T('all')}</option>${rar.map(r=>`<option ${F.rarity===r?'selected':''}>${r}</option>`).join('')}</select>
    <select id="fb"><option value="">${T('breeding')}: ${T('all')}</option>${br.map(r=>`<option ${F.breeding===r?'selected':''}>${r}</option>`).join('')}</select>
    <select id="fp"><option value="">${T('priority')}: ${T('all')}</option>${['A','B','C','IE'].map(r=>`<option ${F.priority===r?'selected':''}>${r}</option>`).join('')}</select>
    <select id="fo"><option value="">${T('origin')}: ${T('all')}</option>
      <option value="N" ${F.origin==='N'?'selected':''}>${T('native')}</option>
      <option value="E" ${F.origin==='E'?'selected':''}>${T('exotic')}</option></select>
    <select id="ffam"><option value="">${T('family')}: ${T('all')}</option>${fams.map(r=>`<option ${F.family===r?'selected':''}>${r}</option>`).join('')}</select>
    <select id="fhb"><option value="">${T('habitat')}: ${T('all')}</option>
      ${['hill','river','wetland','estuary','other'].map(r=>`<option value="${r}" ${F.habitat===r?'selected':''}>${r}</option>`).join('')}</select>
    <select id="fv"><option value="">${T('verFilter')}: ${T('all')}</option>
      <option value="bd" ${F.ver==='bd'?'selected':''}>${T('bdConf')}</option>
      <option value="dist" ${F.ver==='dist'?'selected':''}>${T('distConf')}</option>
      <option value="nophoto" ${F.ver==='nophoto'?'selected':''}>${T('photoMiss')}</option></select>
    <label><input type="checkbox" id="fh" ${F.hill?'checked':''}> ${T('hillOnly')}</label>
    <label><input type="checkbox" id="fph" ${F.photo?'checked':''}> ${T('photoOnly')}</label>
  </div>
  <p class="count" id="fcount"></p><div class="grid" id="fgrid"></div>`;
  const upd = ()=>{
    F = {q: fq.value, rarity: fr.value, breeding: fb.value, priority: fp.value, origin: fo.value,
         family: ffam.value, habitat: fhb.value, ver: fv.value, hill: fh.checked, photo: fph.checked};
    const q = F.q.toLowerCase();
    const list = DB.filter(s =>
      (!q || (s.scientific_name+' '+(s.bengali_name||'')+' '+(s.english_common_name||'')+' '+s.family+' '+s.genus).toLowerCase().includes(q)) &&
      (!F.rarity || s.rarity===F.rarity) && (!F.breeding || s.breeding_potential===F.breeding) &&
      (!F.priority || s.priority===F.priority) &&
      (!F.origin || (F.origin==='N' ? s.native_status==='Native' : s.native_status!=='Native')) &&
      (!F.family || s.family===F.family) && (!F.habitat || habitatGroup(s)===F.habitat) &&
      (!F.ver || (F.ver==='bd' ? s.verification.bangladesh_occurrence.status==='confirmed'
                : F.ver==='dist' ? s.verification.district_occurrence.status==='confirmed'
                : s.verification.photograph.status==='missing')) &&
      (!F.hill || s.hill_stream) && (!F.photo || s.image.thumb || s.image.url));
    fcount.textContent = `${list.length} ${T('showing')}`;
    fgrid.innerHTML = list.map(card).join('') || `<p>${T('noPhoto')}</p>`;
  };
  for(const id of ['fq','fr','fb','fp','fo','ffam','fhb','fv','fh','fph']) document.getElementById(id).addEventListener('input', upd);
  upd();
}
function vHill(){
  const cats = [[1,'hillCat1','⛰️'],[2,'hillCat2','🏞️'],[3,'hillCat3','🐟'],[4,'hillCat4','❓']];
  let h = `<h1>⛰️ ${T('hill')}</h1><p>${T('hillDesc')}</p>`;
  const hillSpp = DB.filter(s=>s.hill_stream || s.hill_category);
  for(const [c,key,emo] of cats){
    const list = hillSpp.filter(s=>s.hill_category===c);
    if(!list.length) continue;
    h += `<h2>${emo} ${T(key)} (${list.length})</h2><div class="grid">${list.map(card).join('')}</div>`;
  }
  const pend = hillSpp.filter(s=>!s.hill_category);
  if(pend.length) h += `<h2>⏳ ${T('hillPending')} (${pend.length})</h2><div class="grid">${pend.map(card).join('')}</div>`;
  app.innerHTML = h;
}
function fieldRows(sp){
  let h = '';
  for(const f of ORDER){
    let txt = '', fb = false;
    if(lang==='bn' && sp.bn[f]) txt = sp.bn[f];
    else if(sp.en[f] && sp.en[f].text){ txt = sp.en[f].text; fb = lang==='bn'; }
    if(!txt || txt.toLowerCase()==='unknown') continue;
    const conf = sp.en[f] && sp.en[f].confidence ? ` <span class="conf">[${esc(sp.en[f].confidence)}]</span>` : '';
    h += `<tr><td>${secLabel(f)}</td><td>${esc(txt)}${conf}${fb?` <span class="conf">${T('fallback')}</span>`:''}</td></tr>`;
  }
  return h ? `<table class="fields">${h}</table>` : '';
}
function evidenceSection(sp){
  if(!sp.verification) return '';
  const dims = [['taxonomy',T('verTax')],['bangladesh_occurrence',T('verBd')],['district_occurrence',T('verDist')],
                ['habitat_classification',T('verHab')],['photograph',T('verPhoto')],['conservation',T('verCons')]];
  const col = st => ['verified','confirmed','checked','confirmed_specialist'].includes(st) ? '#1a7a3c'
    : ['disputed','insufficient','missing'].includes(st) ? '#b00020' : '#9a7b00';
  let h = `<h3>🔬 ${T('evidenceT')}</h3><table class="fields">`;
  for(const [k,label] of dims){
    const d = sp.verification[k]; if(!d) continue;
    h += `<tr><td>${label}</td><td><span class="badge" style="background:${col(d.status)}">${esc(d.status.replace(/_/g,' '))}</span> <span style="font-size:13px;color:var(--grey)">${esc(d.note||'')}</span></td></tr>`;
  }
  h += `</table>`;
  return h;
}
function galleryHTML(sp){
  if(!sp.gallery || !sp.gallery.length) return '';
  const items = sp.gallery.map(g=>`
    <a class="gitem" href="${esc(g.url||g.thumb||'#')}" target="_blank" rel="noopener">
      ${g.thumb?`<img src="${g.thumb}" alt="${esc(g.alt||g.view||'')}" loading="lazy" onerror="this.outerHTML='<div class=&quot;nophoto sm&quot;>${T('noPhoto')}</div>'">`:`<div class="nophoto sm">${esc(g.view||'')}</div>`}
      <div class="gcap"><b>${esc(g.view||'')}</b>${g.id_confidence?` <span class="conf">[${esc(g.id_confidence)}]</span>`:''}<br><span class="gsrc">${g.is_illustration?'🎨':'📷'} ${esc(g.photographer||'n/a')}${g.license?` · ${esc(g.license)}`:''}</span></div>
    </a>`).join('');
  return `<h3>🖼️ ${lang==='bn'?'ছবি গ্যালারি':'Image gallery'} (${sp.gallery.length})</h3><div class="gallery">${items}</div>`;
}
function vSpecies(sn){
  const sp = DB.find(s=>s.serial===sn);
  if(!sp){ app.innerHTML = '<p>Not found</p>'; return; }
  const prev = DB.find(s=>s.serial===sn-1), next = DB.find(s=>s.serial===sn+1);
  let h = `<h1><span class="sci">${esc(sp.scientific_name)}</span>${sp.bengali_name?` <span style="font-size:18px">(${esc(sp.bengali_name)})</span>`:''}</h1>
  <p style="color:var(--grey)">${esc(sp.english_common_name||'')} · ${esc(sp.family)} · ${esc(sp.order)}</p>
  ${badges(sp)}
  <div class="detail"><div>
    <div class="photoBox">${sp.image.thumb?`<img src="${sp.image.thumb}" alt="${esc(altText(sp))}" onerror="this.outerHTML='<div class=&quot;nophoto&quot;>${T('noPhoto')}</div>'">`:sp.image.url?`<p><a href="${esc(sp.image.url)}" target="_blank" rel="noopener">${T('source')} ↗</a></p>`:`<div class="nophoto">${T('noPhoto')}</div>`}</div>
    <div class="credit">${T('photoBy')}: ${esc(sp.image.photographer||'n/a')} · ${T('license')}: ${esc(sp.image.license||'—')}${sp.image.page_url?` · <a href="${esc(sp.image.page_url)}" target="_blank" rel="noopener">${T('source')}</a>`:''}</div>
    ${galleryHTML(sp)}
    <div class="facts"><b>${T('facts')}</b>
      <div><b>${T('genus')}:</b> <span class="sci">${esc(sp.genus)}</span></div>
      <div><b>${T('maxSize')}:</b> ${sp.max_size_cm?esc(sp.max_size_cm)+' cm':'—'}</div>
      <div><b>${T('evidence')}:</b> ${esc(sp.evidence_level)}</div>
      ${sp.synonyms?`<div><b>${T('synonyms')}:</b> <span class="sci">${esc(sp.synonyms)}</span></div>`:''}
      ${sp.regional_names?`<div><b>${lang==='bn'?'আঞ্চলিক নাম':'Regional names'}:</b> ${esc(sp.regional_names)}</div>`:''}
      ${sp.natural_colours.length?`<div><b>${T('colours')}:</b> ${esc(sp.natural_colours.join(', '))}</div>`:''}
      ${sp.captive_morphs.length?`<div><b>${T('morphs')}:</b> ${esc(sp.captive_morphs.join('; '))}</div>`:''}
    </div></div>
    <div>${fieldRows(sp)}`;
  if(sp.hill_stream && Object.keys(sp.en_hill).length){
    h += `<div class="hillbox"><b>⛰️ ${T('hillNotes')}.</b><br>`;
    for(const [k,v] of Object.entries(sp.en_hill)){
      const txt = (lang==='bn' && sp.bn_hill[k]) ? sp.bn_hill[k] : v.text;
      h += `<b>${lang==='bn'?(HILL_BN[k]||k):k.replace(/_/g,' ')}:</b> ${esc(txt)}<br>`;
    }
    h += `</div>`;
  }
  const refs = [...new Set(ORDER.flatMap(f=>sp.en[f]?sp.en[f].references:[]))].slice(0,8);
  if(refs.length) h += `<h3>${T('refs')}</h3><p style="font-size:13px">${refs.map(r=>{const m=r.match(/https?:\/\/\S+/);return m?`<a href="${m[0]}" target="_blank" rel="noopener">${esc(r.slice(0,90))}</a>`:esc(r.slice(0,120));}).join('<br>')}</p>`;
  h += evidenceSection(sp);
  h += `</div></div><div class="pager"><span>${prev?`<a href="#/species/${prev.serial}">${T('prev')}: <span class="sci">${esc(prev.scientific_name)}</span></a>`:''}</span><span>${next?`<a href="#/species/${next.serial}"><span class="sci">${esc(next.scientific_name)}</span> :${T('next')}</a>`:''}</span></div>`;
  app.innerHTML = h;
  window.scrollTo(0,0);
}
function vPriority(){
  const mk = p => DB.filter(s=>s.priority===p).sort((a,b)=>(b.score||0)-(a.score||0));
  const row = s => `<tr><td>${s.serial}</td><td><a href="#/species/${s.serial}"><span class="sci">${esc(s.scientific_name)}</span></a></td><td>${esc(s.bengali_name||'')}</td><td>${s.score??'—'}</td><td>${s.rarity}</td></tr>`;
  const ie = mk('IE');
  app.innerHTML = `<h1>⭐ ${T('prio')}</h1>
  <h2><span class="badge b-A">A</span> — ${mk('A').length}</h2><table class="list"><tr><th>#</th><th>Species</th><th>বাংলা</th><th>Score</th><th>R</th></tr>${mk('A').map(row).join('')}</table>
  <h2><span class="badge b-B">B</span> — ${mk('B').length}</h2><table class="list"><tr><th>#</th><th>Species</th><th>বাংলা</th><th>Score</th><th>R</th></tr>${mk('B').map(row).join('')}</table>
  <h2><span class="badge b-P">C</span> — ${T('consP')} (${mk('C').length})</h2><table class="list"><tr><th>#</th><th>Species</th><th>বাংলা</th><th>Score</th><th>R</th></tr>${mk('C').map(row).join('')}</table>
  ${ie.length?`<h2><span class="badge b-IE">IE</span> — ${lang==='bn'?'অপর্যাপ্ত প্রমাণ (Insufficient Evidence)':'Insufficient Evidence'} (${ie.length})</h2><table class="list"><tr><th>#</th><th>Species</th><th>বাংলা</th><th>Score</th><th>R</th></tr>${ie.map(row).join('')}</table>`:''}`;
}
let CMP = [];
function vCompare(){
  app.innerHTML = `<h1>⚖️ ${T('compareT')}</h1><p>${T('comparePick')}</p>
  <div class="toolbar"><input type="search" id="cq" placeholder="${T('search')}"></div>
  <div class="grid" id="cres"></div><div id="ctab"></div>`;
  const short = (sp,f,n) => { const t = sp.en[f]&&sp.en[f].text||''; return esc(t.length>n?t.slice(0,n)+'…':t); };
  const render = ()=>{
    if(!CMP.length){ ctab.innerHTML=''; return; }
    const rows = [
      [lang==='bn'?'ছবি':'Photo', sp=>sp.image.thumb?`<img src="${sp.image.thumb}" alt="${esc(altText(sp))}" style="max-width:150px" onerror="this.remove()">`:'—'],
      [lang==='bn'?'বাংলা নাম':'Bengali name', sp=>esc(sp.bengali_name||'—')],
      ['Family', sp=>esc(sp.family)],
      [T('maxSize'), sp=>sp.max_size_cm?esc(sp.max_size_cm)+' cm':'—'],
      [T('rarity'), sp=>sp.rarity],
      [T('priority'), sp=>sp.priority||'—'],
      [T('breeding'), sp=>esc(sp.breeding_potential||'—')],
      [secLabel('natural_habitat'), sp=>short(sp,'natural_habitat',220)],
      [secLabel('bangladesh_distribution'), sp=>short(sp,'bangladesh_distribution',220)],
      [secLabel('captive_care_notes'), sp=>short(sp,'captive_care_notes',220)],
      [secLabel('conservation_status'), sp=>short(sp,'conservation_status',220)],
    ];
    ctab.innerHTML = `<table class="list cmp"><tr><th></th>${CMP.map(sp=>`<th><a href="#/species/${sp.serial}"><span class="sci">${esc(sp.scientific_name)}</span></a><br><button data-rm="${sp.serial}">✕</button></th>`).join('')}</tr>` +
      rows.map(([l,fn])=>`<tr><td><b>${l}</b></td>${CMP.map(sp=>`<td>${fn(sp)}</td>`).join('')}</tr>`).join('') + `</table>`;
    ctab.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{CMP=CMP.filter(s=>s.serial!==+b.dataset.rm);render();});
  };
  cq.addEventListener('input', ()=>{
    const q = cq.value.toLowerCase().trim();
    if(q.length<2){ cres.innerHTML=''; return; }
    const list = DB.filter(s=>(s.scientific_name+' '+(s.bengali_name||'')+' '+(s.english_common_name||'')).toLowerCase().includes(q))
      .filter(s=>!CMP.includes(s)).slice(0,6);
    cres.innerHTML = list.map(s=>`<div class="card" style="cursor:pointer" data-add="${s.serial}"><div class="body"><div class="t"><span class="sci">${esc(s.scientific_name)}</span></div><div class="bn">${esc(s.bengali_name||'')}</div></div></div>`).join('');
    cres.querySelectorAll('[data-add]').forEach(el=>el.onclick=()=>{
      if(CMP.length<4){ CMP.push(DB.find(s=>s.serial===+el.dataset.add)); cq.value=''; cres.innerHTML=''; render(); }
    });
  });
  render();
}
const DIST = ["Khagrachari","Bandarban","Rangamati","Sylhet","Moulvibazar","Habiganj","Chattogram","Cox's Bazar","Noakhali","Cumilla","Feni","Lakshmipur","Dhaka"];
function vDistricts(){
  app.innerHTML = `<h1>📍 ${T('distIndex')}</h1><div class="distgrid">${DIST.map(d=>`<a href="#/district/${encodeURIComponent(d)}">${d}</a>`).join('')}</div>`;
}
function vDistrict(name){
  const list = DB.filter(s=>(s.districts||'').toLowerCase().includes(name.toLowerCase()));
  app.innerHTML = `<h1>📍 ${esc(name)} <span style="color:var(--grey);font-size:16px">(${list.length} ${T('recorded')})</span></h1><div class="grid">${list.map(card).join('')}</div>`;
}
function vAbout(){
  app.innerHTML = `<h1>ℹ️ ${T('aboutT')}</h1>
  <p>${lang==='bn'
    ? '৪টি ধাপে ১৪৭টি যাচাইকৃত প্রজাতির তথ্য সংকলিত: (১) Master Species Discovery — ১৫৬ প্রার্থী থেকে ডুপ্লিকেট বাদে ১৪৭; (২) ১৭-বিভাগের বৈজ্ঞানিক প্রোফাইল, প্রতিটি তথ্যে confidence ট্যাগ; (৩) বাস্তব আলোকচিত্র (উৎস/লাইসেন্সসহ), colour morph ও breeding গবেষণা; (৪) ৭-মানদণ্ডের weighted scoring — অগ্রাধিকার A/B/C। R1/R2 পাহাড়ি প্রজাতি কখনো বাণিজ্যিক A পায় না।'
    : 'Compiled in 4 stages for 147 verified species: (1) Master Species Discovery — 156 candidates deduplicated to 147; (2) 17-section scientific profiles with confidence tags; (3) real photographs (sourced/licensed), colour morph & breeding research; (4) 7-criterion weighted scoring → Priority A/B/C. R1/R2 hill-stream species never receive commercial Priority A.'}</p>
  <h2>Data</h2>
  <p>${lang==='bn'?'সব তথ্য <code>data/species.json</code>-এ — সরাসরি এডিট করা যায়, কোনো build ধাপ নেই। প্রতিটি প্রজাতির দ্বিভাষিক markdown <code>md/</code> ফোল্ডারে।':'All data lives in <code>data/species.json</code> — edit directly, no build step. Bilingual markdown per species in <code>md/</code>.'}</p>
  <h2>Image Credits</h2>
  <p>${lang==='bn'?'ছবির উৎস ও লাইসেন্স প্রতিটি প্রজাতি-পৃষ্ঠায় দেওয়া আছে। পুনঃব্যবহারের আগে উৎস-পৃষ্ঠায় লাইসেন্স যাচাই করুন।':'Photo source & license on each species page. Verify the license on the source page before reuse.'}</p>`;
}

/* ---------- router ---------- */
function route(){
  document.querySelectorAll('[data-nav]').forEach(a=>a.classList.remove('on'));
  const h = location.hash || '#/';
  const [,page,arg] = h.split('/');
  const nav = {undefined:'home','browse':'browse','hillstream':'hillstream','priority':'priority','compare':'compare','districts':'districts','district':'districts','about':'about'}[page]||'home';
  const el = document.querySelector(`[data-nav="${nav}"]`); if(el) el.classList.add('on');
  try{
    if(page==='browse') vBrowse();
    else if(page==='hillstream') vHill();
    else if(page==='species') vSpecies(+arg);
    else if(page==='priority') vPriority();
    else if(page==='compare') vCompare();
    else if(page==='districts') vDistricts();
    else if(page==='district') vDistrict(decodeURIComponent(arg||''));
    else if(page==='about') vAbout();
    else vHome();
  }catch(e){ app.innerHTML = `<div class="err">Error: ${esc(e.message)}</div>`; }
}
function setLang(l){ lang=l; localStorage.setItem('fe_lang',l);
  document.documentElement.lang = l==='bn'?'bn':'en';
  document.getElementById('langBn').classList.toggle('on',l==='bn');
  document.getElementById('langEn').classList.toggle('on',l==='en');
  document.getElementById('brandTitle').textContent = T('brand'); route(); }

async function init(){
  document.documentElement.lang = lang==='bn'?'bn':'en';
  document.getElementById('langBn').onclick = ()=>setLang('bn');
  document.getElementById('langEn').onclick = ()=>setLang('en');
  document.getElementById('langBn').classList.toggle('on',lang==='bn');
  document.getElementById('langEn').classList.toggle('on',lang==='en');
  document.getElementById('brandTitle').textContent = T('brand');
  try{
    const [s,m] = await Promise.all([
      fetch('data/species.json').then(r=>{if(!r.ok)throw new Error('species.json');return r.json();}),
      fetch('data/meta.json').then(r=>{if(!r.ok)throw new Error('meta.json');return r.json();})]);
    DB = s; META = m;
  }catch(e){
    app.innerHTML = `<div class="err"><b>Data load failed.</b><br>
      ${lang==='bn'?'এই পেজটি সরাসরি ফাইল হিসেবে খুললে ডেটা লোড হয় না। টার্মিনালে প্রজেক্ট ফোল্ডারে গিয়ে চালান:':'If you opened this file directly, data cannot load. In a terminal, go to the project folder and run:'}
      <pre>cd fish-encyclopedia-web\npython3 -m http.server 8000</pre>
      ${lang==='bn'?'তারপর ব্রাউজারে খুলুন:':'Then open:'} <code>http://localhost:8000</code></div>`;
    return;
  }
  window.addEventListener('hashchange', route);
  route();
}
init();

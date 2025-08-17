/* ===== Typewriter (only if element exists) ===== */
(function(){
  const el = document.getElementById('typewriter');
  if(!el) return;
  const lines = JSON.parse(el.getAttribute('data-lines') || '[]');
  let li=0, ci=0, deleting=false;

  function loop(){
    const current = lines[li] || '';
    el.textContent = current.substring(0,ci);
    if(!deleting && ci < current.length){ ci++; }
    else if(deleting && ci > 0){ ci--; }
    else{
      if(!deleting){ setTimeout(()=> deleting=true, 900); }
      else{ deleting=false; li=(li+1)%lines.length; }
    }
    setTimeout(loop, deleting?40:60);
  }
  loop();
})();

/* ===== Particles background ===== */
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener('resize', resize); resize();
  const dots = Array.from({length: 70}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+0.6,
    vx: (Math.random()-.5)*0.3,
    vy: (Math.random()-.5)*0.3
  }));
  function step(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,240,255,0.7)';
    for(const d of dots){
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0||d.x>canvas.width) d.vx*=-1;
      if(d.y<0||d.y>canvas.height) d.vy*=-1;
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
    }
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const a=dots[i], b=dots[j];
        const dx=a.x-b.x, dy=a.y-b.y; const dist=Math.hypot(dx,dy);
        if(dist<120){
          ctx.strokeStyle = 'rgba(255,61,240,'+(1-dist/120)*0.25+')';
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

/* ===== Reveal on scroll + skill fill ===== */
(function(){
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('show');
        e.target.querySelectorAll?.('.fill').forEach(f=>{
          const pct = f.dataset.fill || 0; f.style.width = pct + '%';
        });
      }
    });
  },{threshold:.15});
  revealEls.forEach(el=> io.observe(el));
})();

/* ===== Tilt cards ===== */
(function(){
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach(card=>{
    let rect;
    card.addEventListener('mouseenter', ()=> rect = card.getBoundingClientRect());
    card.addEventListener('mousemove', (e)=>{
      const x = (e.clientX - rect.left)/rect.width - .5;
      const y = (e.clientY - rect.top)/rect.height - .5;
      card.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });
})();

/* ===== Subtle parallax on hero gradient ===== */
(function(){
  const p = document.querySelector('.parallax');
  if(!p) return;
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX/innerWidth - .5)*6;
    const y = (e.clientY/innerHeight - .5)*6;
    p.style.transform = `translate(${x}px,${y}px)`;
  });
})();

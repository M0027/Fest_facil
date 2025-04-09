// Configuração do Firebase (substitua pelos seus dados reais!)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  databaseURL: "https://SEU_DOMINIO.firebaseio.com",
  projectId: "SEU_ID_DO_PROJETO",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SUA_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("interestForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const tipo = document.getElementById("tipo").value;

  db.ref("interessados").push({
    nome,
    email,
    whatsapp,
    tipo
  }).then(() => {
    msg.innerText = "Cadastro realizado com sucesso!";
    form.reset();
  }).catch((error) => {
    msg.innerText = "Erro ao enviar. Tente novamente.";
    console.error(error);
  });
});
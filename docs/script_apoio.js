// Copie a mesma config do script.js:
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

const form = document.getElementById("apoioForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;
  const comprovativo = document.getElementById("comprovativo").files[0];

  if (!comprovativo) {
    msg.innerText = "Selecione uma imagem.";
    return;
  }

  const storageRef = firebase.storage().ref("comprovativos/" + comprovativo.name);
  const uploadTask = storageRef.put(comprovativo);

  uploadTask.on("state_changed", null, (error) => {
    msg.innerText = "Erro no upload.";
    console.error(error);
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      firebase.database().ref("apoios").push({
        nome,
        celular,
        comprovativoURL: downloadURL
      }).then(() => {
        msg.innerText = "Agradecemos seu apoio!";
        form.reset();
      }).catch((err) => {
        msg.innerText = "Erro ao salvar no banco.";
        console.error(err);
      });
    });
  });
});
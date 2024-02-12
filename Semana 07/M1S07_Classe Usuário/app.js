import Usuario from "./Usuario.js";

const loginForm = document.getElementById("login");
const campoEmail = document.getElementById("campoEmail");
const campoSenha = document.getElementById("campoSenha");
const mensagem = document.getElementById("acesso");

const usuarios = [
  new Usuario("Maria", "maria@gmail.com", "devinhouse123"),
  new Usuario("Pedro", "pedro@gmail.com", "devinhouse321"),
];

console.log(usuarios);

function login(evento) {
  evento.preventDefault();

  const email = campoEmail.value;
  const senha = campoSenha.value;

  const usuario = usuarios.find((usuario) => {
    return usuario.email === email;
  });

  if (usuario && usuario.autenticar(email, senha)) {
    mensagem.innerHTML = `Credencial válida: Seja bem vindo (a), ${usuario.nome}!`;
    campoEmail.value = "";
    campoSenha.value = "";
  } else {
    mensagem.innerHTML = "Credenciais inválidas!";
  }
}

loginForm.addEventListener("submit", login);
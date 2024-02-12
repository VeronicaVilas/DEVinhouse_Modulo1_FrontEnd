const usuarios = [
  {
    email: "joao@gmail.com",
    nome: "João Silva",
    senha: "123456"
  },
  {
    email: "maria@hotmail.com",
    nome: "Maria Souza",
    senha: "senha123"
  },
  {
    email: "pedro@yahoo.com",
    nome: "Pedro Oliveira",
    senha: "abc123"
  },
  {
    email: "laura@gmail.com",
    nome: "Laura Santos",
    senha: "qwerty"
  },
  {
    email: "gabriel@yahoo.com",
    nome: "Gabriel Costa",
    senha: "senha12345"
  }
]

document.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  if (!email || !senha) {
      alert("Os campos são obrigatórios")
  } else {
      const usuarioEncontrado = usuarios.find(
          usuario =>
              usuario.email === email && usuario.senha === senha
      )

      if(usuarioEncontrado) {  
           window.location.href = "home.html"
      } else {
          alert("Usuário e/ou senha inválidos!")
      }
  }
})


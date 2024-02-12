let dadosReserva = []

document.getElementById('logout').addEventListener('click', () => {
  window.location.href = "login.html"
})

function gerarTabela(filteredData) {

  const currentData = dadosReserva

  currentData.map((reserva) => {
    const tr = document.createElement('tr')
    tr.setAttribute('id', reserva.id)

    const tdNumeroQuarto = document.createElement('td')
    tdNumeroQuarto.innerHTML = reserva.numero_quarto

    const tdNomeCliente = document.createElement('td')
    tdNomeCliente.innerHTML = reserva.nome_cliente

    const tdCpfCliente = document.createElement('td')
    tdCpfCliente.innerHTML = reserva.cpf

    const tdData = document.createElement('td')
    tdData.innerHTML = 'De ' + reserva.data_entrada + ' até ' + reserva.data_saida

    const tdAcoes = document.createElement('td')

    const botaoDeletar = document.createElement('button')
    botaoDeletar.innerText = 'Deletar'

    botaoDeletar.addEventListener('click', () => deletarItem(reserva.id))

    tr.appendChild(tdNumeroQuarto)
    tr.appendChild(tdNomeCliente)
    tr.appendChild(tdCpfCliente)
    tr.appendChild(tdData)
    tdAcoes.appendChild(botaoDeletar)
    tr.appendChild(tdAcoes)

    document.getElementById('corpo-tabela').appendChild(tr)
  })
}

function deletarItem(id) {

  fetch(`http://localhost:3000/reservas/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    alert("Reserva deletada com sucesso!")
    document.getElementById('corpo-tabela').innerHTML = ''
    ListaReservas()
  })
  .catch(() => alert("Erro ao deletar a reserva"))
}

function ListaReservas() {
  fetch("http://localhost:3000/reservas")
    .then((response) => {
      if (response.ok === false) {
        throw new Error()
      }
      return response.json()
    })
    .then((dados) => {
      dadosReserva = dados
      gerarTabela()
    })
    .catch((error) => {
      console.log(error)
      alert("Falha ao tentar listar as reservas")
    }
  )
}

window.onload = ListaReservas

document.getElementById('cadastrar').addEventListener('click', () => {
  window.location.href = "cadastro.html"
})

let final_transcript = "";

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = 'pt-BR'

speechRecognition.onresult = (event) => {
  let interim_transcript = "";

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }

  if (interim_transcript === 'resetar') {
    document.getElementById('corpo-tabela').innerHTML = ''
    gerarLinhasTabela(dadosReserva)
  } else {
    let filteredData = dadosReserva.filter(item => item.numero_quarto.toString() === interim_transcript)
    if (filteredData.length > 0) {
      document.getElementById('corpo-tabela').innerHTML = ''
      gerarLinhasTabela(filteredData)
    }
    interim_transcript = ""
  }
};

let espacoPressionado = false;
let espacoIntervalo;

function segurarEspaco() {
  if (espacoPressionado) {
    speechRecognition.start();
  }
  console.log("Segurando a tecla Espaço...");
}

function keyDownHandler(event) {
  if (event.keyCode === 32) {
    if (!espacoPressionado) {
      espacoPressionado = true;
      segurarEspaco();
    }
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 32) {
    if (espacoPressionado) {
      espacoPressionado = false;
      speechRecognition.stop();
      clearInterval(espacoIntervalo);
    }
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
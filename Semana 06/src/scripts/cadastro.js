const NumeroQuarto = document.getElementById('n-quarto')
const NomeCliente = document.getElementById('nome')
const CpfCliente = document.getElementById('cpf')
const DataEntrada = document.getElementById('check-in')
const DataSaida = document.getElementById('check-out')

document.getElementById('form-add').addEventListener('submit', cadastrarReserva)

function cadastrarReserva(event) {
  event.preventDefault()

  const numero = NumeroQuarto.value
  const nome = NomeCliente.value
  const cpf = CpfCliente.value
  const dataEntrada = DataEntrada.value
  const dataSaida = DataSaida.value

  if (!numero || !nome || !cpf || !dataEntrada || !dataSaida) {
    alert("Para confirmar sua reserva é preciso preencher todos os campos")
  } else {
    fetch('http://localhost:3000/reservas', {
      method: 'POST',
      body: JSON.stringify({
        numero_quarto: numero,
        nome_cliente: nome,
        cpf: cpf,
        data_entrada: dataEntrada,
        data_saida: dataSaida
      }),
      headers: {
        'Accept': 'applicantion/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok === false) {
        throw new Error()
      }
      return response.json()
    })
    .then(() => {
    alert('Cadastrado de reserva realizado com sucesso')
      NumeroQuarto.value = ""
      NomeCliente.value = ""
      CpfCliente.value = ""
      DataEntrada.value = ""
      DataSaida.value = ""

     window.location.href = "./home.html"
    })
    .catch((error) => {
      console.log(error)
      alert("Falha ao tentar cadastrar a reserva")
    })
  }
}

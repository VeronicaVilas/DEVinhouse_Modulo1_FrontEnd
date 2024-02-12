export default class Fatura {
    id;
    descricao;
    quantia;
    preco;
  
    constructor(id, descricao, quantia, preco) {
      this.id = id;
      this.descricao = descricao;
      this.quantia = quantia > 0 ? quantia : 0;
      if (preco > 0) {
        this.preco = preco;
      } else {
        this.preco = 0;
      }
    }
  
    get valorTotal() {
      return this.quantia * this.preco;
    }
  
    obterValorTotal() {
      return this.quantia * this.preco;
    }
  }
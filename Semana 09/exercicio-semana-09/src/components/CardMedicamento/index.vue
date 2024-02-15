<template>
  <div class="card">
    <button @click="$emit('favoritar', id)">Favoritar</button>
    <span v-if="favorito">Favorito</span>
    <img :width="120" src="https://dmvfarma.vtexassets.com/arquivos/ids/196865/caixa-medicamento-2021.png?v=637695586068000000" alt="Imagem do medicamento" />
    <span>Nome: {{ nome }}</span>
    <span>Laboratório: {{ laboratorio }}</span>
    <span>Preço: {{ preco }}</span>
  </div>
</template>
<script>
export default {
  props: ['nome', 'laboratorio', 'preco', 'favorito', 'id']
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: calc(100%/4 - 2em);
  margin: 1em;
  background-color: #E7E6E6;
}
</style>
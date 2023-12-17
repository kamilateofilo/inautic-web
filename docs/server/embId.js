function recuperarEmbarcacoesDoCliente(clienteID) {
  const dadosParaInserir = { clienteID: clienteID };

  fetch("https://nodered.brenopereira.com.br/api/embarcacoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosParaInserir),
  })
    .then((response) => response.json())
    .then((data) => {
      // Faça algo com a resposta do Node-RED, se necessário
      console.log("Resposta do Node-RED:", data);
    })
    .catch((error) => {
      console.error("Erro na solicitação para o Node-RED:", error);
    });
}
//  recuperarEmbarcacoesDoCliente(1);

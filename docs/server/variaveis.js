function embarcacaoVariaveis() {
  fetch("https://nodered.brenopereira.com.br/api/1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(teste);
    })
    .catch((error) => {
      console.error("Erro na solicitação para o Node-RED:", error);
    });
}

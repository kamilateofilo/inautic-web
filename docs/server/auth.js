function autenticarUsuario(usuario, senha) {
  const dadosParaInserir = { usuario: usuario, senha: senha };

  fetch("https://nodered.brenopereira.com.br/api/autentica", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosParaInserir),
  })
    .then((response) => response.json())
    .then((data) => {
      // Faça algo com a resposta do Node-RED, se necessário
    })
    .catch((error) => {
      console.error("Erro na solicitação para o Node-RED:", error);
    });
}
//  autenticarUsuario();

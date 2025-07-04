const endpoint = "https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros";
const container = document.getElementById("parceiros");
const inputFiltro = document.getElementById("filtroBusca");
const btnFiltrar = document.getElementById("btnFiltrar");

let listaParceiros = [];

function getAvatar(tipo) {
  switch (tipo.toUpperCase()) {
    case "ECO":
      return "images/eco.png";
    case "COO":
      return "images/coop.png";
    case "PEV":
      return "images/pev.png";
    default:
      return "images/default.png";
  }
}

function criarCard(parceiro) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
  <div class="avatar">
    <img src="${getAvatar(parceiro.tipoParceiro)}" alt="${parceiro.tipoParceiro}" />
  </div>
  <h3>${parceiro.nomeParceiro}</h3>
  <p><strong>Bairro:</strong> ${parceiro.bairro}</p>
  <p><strong>Data de Registro:</strong> ${new Date(parceiro.dataCriacao).toLocaleDateString()}</p>
`;
  card.addEventListener("click", () => {
    window.location.href = `detalhes.html?id=${parceiro.id}`;
  });
  return card;
}

function renderizarCards(lista) {
  container.innerHTML = "";

if (lista.length === 0) {
  container.innerHTML = `
    <div class="mensagem-vazia">
      <img src="images/notfound.png" alt="Nenhum resultado encontrado" />
      <p>Nenhum parceiro encontrado para a busca.</p>
    </div>
  `;
  return;
}

  lista.forEach(parceiro => {
    const card = criarCard(parceiro);
    container.appendChild(card);
  });
}

function filtrarLista(valor) {
  const texto = valor.toLowerCase();
  const filtrados = listaParceiros.filter(p =>
    p.nomeParceiro.toLowerCase().includes(texto) ||
    p.bairro.toLowerCase().includes(texto)
  );
  renderizarCards(filtrados);
}

btnFiltrar.addEventListener("click", () => {
  filtrarLista(inputFiltro.value);
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const resposta = await fetch(endpoint);
    listaParceiros = await resposta.json();
    renderizarCards(listaParceiros);
  } catch (erro) {
    container.innerHTML = "<p>Erro ao carregar os parceiros. Tente novamente mais tarde.</p>";
    console.error("Erro ao buscar parceiros:", erro);
  }
});

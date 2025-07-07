const formuCadastro = document.getElementById("cadastrar");
const btnForm = document.querySelector(".action-item-btn");
const btnFormClose = document.getElementById("cadastrar-btn");
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

btnForm.addEventListener("click", () => {
  formuCadastro.style.removeProperty("display");
  formuCadastro.style.display = "block";
});

btnFormClose.addEventListener("click", () => {
  formuCadastro.style.removeProperty("display");
  formuCadastro.style.display = "none";
});

/* cadastro de parceiros*/
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const responsavel = document.getElementById("responsavel").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;

    const papel = document.getElementById("papel").checked;
    const plastico = document.getElementById("plastico").checked;
    const vidro = document.getElementById("vidro").checked;
    const metal = document.getElementById("metal").checked;
    const oleoCozinha = document.getElementById("oleoCozinha").checked;
    const pilhasBaterias = document.getElementById("pilhasBaterias").checked;
    const eletronico = document.getElementById("eletronico").checked;
    const roupa = document.getElementById("roupa").checked;
    const outros = document.getElementById("outros").checked;

    const dados = {
      nomeParceiro: nome,
      tipoParceiro: tipo,
      responsavelParceiro: responsavel,
      telResponsavel: telefone,
      emailResponsavel: email,
      rua: rua,
      numero: numero,
      bairro: bairro,

      papel: papel,
      plastico: plastico,
      vidro: vidro,
      metal: metal,
      oleoCozinha: oleoCozinha,
      pilhaBateria: pilhasBaterias,
      eletronico: eletronico,
      roupa: roupa,
      outros: outros,
    };

    const apiUrl =
      "https://6860899b8e74864084437167.mockapi.io/jmt-futurodev/api/parceiros";

    try {
      const resposta = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        alert("Parceiro cadastrado com sucesso!");
        form.reset();
      } else {
        console.error(
          "Erro ao cadastrar parceiro",
          resposta.status,
          resposta.statusText
        );
      }
    } catch (error) {
      alert("Erro ao cadastrar parceiro");
      console.error("Erro ao cadastrar parceiro", error);
    }
  });
});

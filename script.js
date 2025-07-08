window.addEventListener("load", () => {
  const MAX_ERROS = 6;
  let quantidade_erros = 0;

  // ESCOLHA DA PALAVRA ---------------
  const TEMAS_PERMITIDOS = [
    "Poluição da água",
    "Poluição do solo",
    "Poluição do ar",
  ];

  const PALAVRAS_PERMITIDAS = {
    "Poluição da água": [
      {
        palavra: "Contaminaçao",
        texto_dica:
          "Ocorre quando substâncias nocivas entram em contato com o meio ambiente, afetando a qualidade do solo, da água ou do ar, trazendo consequências negativas para os seres vivos.",
      },
      {
        palavra: "Esgoto",
        texto_dica:
          "Sistmema invisível, mas essencial, que percorre subterrâneos e carrega águas sujas e restos indesejados. Sem mim, o caos e a poluição tomariam conta das ruas, garantindo a limpeza e o equilíbrio urbano.",
      },
    ],
    "Poluição do solo": [
      {
        palavra: "Uranio",
        texto_dica:
          "É um metal pesado, radioativo e prateado, que ocorre naturalmente em pequenas quantidades na crosta terrestre, especialmente em rochas, solos e águas.",
      },
      {
        palavra: "Chorume",
        texto_dica:
          "É o líquido resultante da decomposição de materiais orgânicos, especialmente em ambientes de aterros sanitários. Esse líquido também possui um cheiro bastante desagradável.",
      },
      {
        palavra: "Desmatamento",
        texto_dica:
          "Ação que remove o verde da paisagem, deixando o solo exposto e desabrigando animais. Causo desequilíbrios ambientais, mas ainda assim, continuo a ocorrer.",
      },
    ],
    "Poluição do ar": [
      {
        palavra: "Gases",
        texto_dica:
          "São um estado da matéria onde as moléculas estão distantes e se movem livremente, sem forma ou volume definidos.",
      },
      {
        palavra: "Atmosfera",
        texto_dica:
          "É a camada de gases que envolve a Terra, essencial para a vida. Qualquer contaminação ou mudança na sua composição pode afetar a qualidade do ar que respiramos e o clima global.",
      },
      {
        palavra: "Queimada",
        texto_dica:
          "Fogo em florestas que libera muita fumaça no ar. São focos de incêndio que ocorrem de maneira controlada ou descontrolada em áreas de vegetação, como florestas, campos e fazendas.",
      },
    ],
  };

  // {palavra: "", texto_dica: "", imagem_dica: ""} exemplo

  //
  let ind_tema_da_vez = Math.round(
    Math.random() * (TEMAS_PERMITIDOS.length - 1)
  );

  let tema_da_vez = TEMAS_PERMITIDOS[ind_tema_da_vez];

  let ind_palavra_certa = Math.round(
    Math.random() * (PALAVRAS_PERMITIDAS[tema_da_vez].length - 1)
  );
  let palavra_certa =
    PALAVRAS_PERMITIDAS[tema_da_vez][ind_palavra_certa].palavra.toLowerCase();

  const dica = document.querySelector("#cabecalho h3");
  dica.innerText = `O tema é: ${tema_da_vez}`;

  const linha_da_forca = document.querySelector("#container #wrapper #linha");

  for (let index = 0; index < palavra_certa.length; index++) {
    const campo = document.createElement("div");

    linha_da_forca.appendChild(campo);
  }
  // ----------------------------------------

  // TECLADO DIGITAL -------------------------------

  const teclado_linhas = document.querySelectorAll("#teclado .linha");

  const TECLADO_TECLAS = {
    0: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    1: ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"],
    2: ["Z", "X", "C", "V", "B", "N", "M"],
  };

  teclado_linhas.forEach((linha, ind) => {
    TECLADO_TECLAS[ind].forEach((letra) => {
      const tecla = document.createElement("button");
      tecla.innerText = letra;
      tecla.classList = "tecla";

      tecla.addEventListener("click", (e) => {
        if (
          quantidade_erros < MAX_ERROS &&
          Array.from(linha_da_forca.children)
            .reduce((a, b) => a + b.innerText, "")
            .toLowerCase() != palavra_certa
        ) {
          if (palavra_certa.includes(e.target.innerText.toLowerCase())) {
            e.target.classList = "tecla tecla_certa";

            for (
              let posicao = 0;
              posicao < linha_da_forca.childNodes.length;
              posicao++
            ) {
              if (palavra_certa[posicao] == e.target.innerText.toLowerCase()) {
                linha_da_forca.children.item(posicao).innerText =
                  e.target.innerText.toUpperCase();
              }
            }
          }

          if (
            !palavra_certa.includes(e.target.innerText.toLowerCase()) &&
            e.target.classList != "tecla tecla_errada"
          ) {
            e.target.classList = "tecla tecla_errada";

            const forca = document.querySelector("#container img");

            quantidade_erros++;

            forca.setAttribute(
              "src",
              "./assets/erro" + quantidade_erros + ".png"
            );
          }
        }

        if (
          palavra_certa ==
          Array.from(linha_da_forca.children)
            .reduce((a, b) => a + b.innerText, "")
            .toLowerCase()
        ) {
          document.querySelector("#final h1").innerText = "Você ganhou!";
          document.querySelector("#final").style.display = "block";
          document.querySelector("#fundoescuro").style.display = "flex";
        }

        if (MAX_ERROS == quantidade_erros) {
          document.querySelector("#final h1").innerText = "Você perdeu!";
          document.querySelector("#final").style.display = "block";
          document.querySelector("#fundoescuro").style.display = "flex";
        }
      });

      linha.appendChild(tecla);
    });
  });
  // ---------------------------------------
  const teclas = document.querySelectorAll("#teclado .linha .tecla");

  // TECLADO MANUAL ------------------------
  const regex_teclas = /\b[a-zÀ-ÿ]\b/;

  window.addEventListener("keypress", (e) => {
    const tecla_manual = e.key.toLowerCase();

    if (regex_teclas.test(tecla_manual) || tecla_manual == "ç") {
      if (
        quantidade_erros < MAX_ERROS &&
        Array.from(linha_da_forca.children)
          .reduce((a, b) => a + b.innerText, "")
          .toLowerCase() != palavra_certa &&
        document.querySelector("#dica").style.display != "flex"
      ) {
        linha_da_forca.childNodes.forEach((campo, ind) => {
          if (palavra_certa[ind] == tecla_manual) {
            campo.textContent = tecla_manual.toUpperCase();
          }
        });

        if (palavra_certa.includes(tecla_manual)) {
          teclas.forEach((tecla) => {
            if (
              tecla.textContent.toLowerCase() == tecla_manual &&
              tecla.classList != "tecla tecla_certa"
            ) {
              tecla.classList = "tecla tecla_certa";
            }
          });
        } else {
          teclas.forEach((tecla) => {
            if (
              tecla.innerText.toLowerCase() == tecla_manual &&
              tecla.classList != "tecla tecla_errada"
            ) {
              tecla.classList = "tecla tecla_errada";
            }
          });

          const forca = document.querySelector("#container img");

          quantidade_erros++;

          forca.setAttribute(
            "src",
            "./assets/erro" + quantidade_erros + ".png"
          );
        }
      }

      if (
        palavra_certa ==
          Array.from(linha_da_forca.children)
            .reduce((a, b) => a + b.innerText, "")
            .toLowerCase() &&
        document.querySelector("#dica").style.display != "flex"
      ) {
        document.querySelector("#final h1").innerText = "Você ganhou!";
        document.querySelector("#final").style.display = "block";
        document.querySelector("#fundoescuro").style.display = "flex";
      }

      if (
        MAX_ERROS == quantidade_erros &&
        document.querySelector("#dica").style.display != "flex"
      ) {
        document.querySelector("#final h1").innerText = "Você Perdeu!";
        document.querySelector("#final").style.display = "block";
        document.querySelector("#fundoescuro").style.display = "flex";
      }
    }
  });
  // -------------------------------------

  // DICA --------------------------------

  document.querySelector("#dica #texto_dica").innerText =
    PALAVRAS_PERMITIDAS[tema_da_vez][ind_palavra_certa].texto_dica;

  document.querySelector("#btn_dica").addEventListener("click", () => {
    document.querySelector("#dica").style.display = "flex";
    document.querySelector("#fundoescuro").style.display = "flex";
  });

  document.querySelector("#dica .fechar_btn").addEventListener("click", () => {
    document.querySelector("#dica").style.display = "none";
    document.querySelector("#fundoescuro").style.display = "none";
  });

  document.querySelector("#final .fechar_btn").addEventListener("click", () => {
    document.querySelector("#final").style.display = "none";
    document.querySelector("#fundoescuro").style.display = "none";
  });

  // --------------------------------------
});

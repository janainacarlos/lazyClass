/* script.js
   Interações:
   - infográfico: clique nas caixas mostra dica
   - quiz: perguntas sobre Lazy Class (sem dependências)
*/

document.addEventListener("DOMContentLoaded", () => {
  setupInfographic();
  setupQuiz();
});

/* ---------------- infographic ---------------- */
function setupInfographic() {
  const boxes = document.querySelectorAll(".infografico .info-box");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const title = box.querySelector("h3")?.innerText ?? "Info";
      const para = box.querySelector("p")?.innerText ?? "";
      alert(`${title}\n\n${para}`);
    });
  });
}

/* ---------------- quiz ---------------- */
function setupQuiz() {
  const quizData = [
    {
      q: "O que caracteriza uma Lazy Class?",
      choices: [
        "Classe com muitos métodos complexos",
        "Classe com pouca responsabilidade, normalmente apenas dados",
        "Classe que possui várias dependências",
        "Classe que implementa todos os padrões de projeto"
      ],
      a: 1
    },
    {
      q: "Qual refatoração é indicada para eliminar uma Lazy Class?",
      choices: [
        "Extract Method",
        "Inline Class (mesclar a classe com outra)",
        "Introduce Parameter Object",
        "Replace Inheritance with Delegation"
      ],
      a: 1
    },
    {
      q: "Uma consequência de manter muitas Lazy Classes no projeto é:",
      choices: [
        "Menor número de arquivos no projeto",
        "Melhor performance garantida",
        "Aumento de complexidade e dificuldade de manutenção",
        "Redução do acoplamento automaticamente"
      ],
      a: 2
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const nextBtn = document.getElementById("next");
  const resultEl = document.getElementById("result");

  renderQuestion();

  nextBtn.addEventListener("click", () => {
    if (!answered) return;
    current++;
    if (current < quizData.length) {
      renderQuestion();
    } else {
      showFinal();
    }
  });

  function renderQuestion() {
    answered = false;
    nextBtn.disabled = true;
    resultEl.classList.add("hidden");
    const item = quizData[current];
    questionEl.textContent = `Q${current + 1}. ${item.q}`;
    choicesEl.innerHTML = "";
    item.choices.forEach((choiceText, idx) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choiceText;
      btn.type = "button";
      btn.addEventListener("click", () => selectChoice(idx, btn, item.a));
      li.appendChild(btn);
      choicesEl.appendChild(li);
    });
  }

  function selectChoice(idx, btn, correctIdx) {
    if (answered) return;
    answered = true;
    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    nextBtn.disabled = false;
    if (idx === correctIdx) {
      score++;
      resultEl.classList.remove("hidden");
      resultEl.textContent = "Resposta correta!";
      resultEl.style.background = "#ecfdf5";
    } else {
      resultEl.classList.remove("hidden");
      resultEl.textContent = `Resposta incorreta. Resposta certa: "${quizData[current].choices[quizData[current].a]}"`;
      resultEl.style.background = "#fff1f2";
    }
  }

  function showFinal() {
    questionEl.textContent = "Quiz finalizado!";
    choicesEl.innerHTML = `<p>Você acertou ${score} de ${quizData.length}.</p>`;
    nextBtn.disabled = true;
    resultEl.classList.remove("hidden");
  }
}

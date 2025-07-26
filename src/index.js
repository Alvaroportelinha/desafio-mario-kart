// Lista de personagens disponíveis
const characters = [
  {
    nome: "Mario 🍄",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
  },
  {
    nome: "Luigi 🧢",
    velocidade: 4,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
  },
  {
    nome: "Peach 👑",
    velocidade: 3,
    manobrabilidade: 5,
    poder: 2,
    pontos: 0,
  },
  {
    nome: "Bowser 🐢",
    velocidade: 3,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
  },
  {
    nome: "Yoshi 🦖",
    velocidade: 5,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
  },
  {
    nome: "Toad 🍄",
    velocidade: 5,
    manobrabilidade: 5,
    poder: 1,
    pontos: 0,
  },
  {
    nome: "Donkey Kong 🦍",
    velocidade: 3,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
  },
  {
    nome: "Wario 😈",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 4,
    pontos: 0,
  },
];

// Escolher 2 personagens aleatoriamente (sem repetir)
function escolherPersonagens() {
  const sorteio = [...characters];
  const escolhido1 = sorteio.splice(Math.floor(Math.random() * sorteio.length), 1)[0];
  const escolhido2 = sorteio[Math.floor(Math.random() * sorteio.length)];
  return [escolhido1, escolhido2];
}

async function logRollResult(charactername, block, diceResult, attribute) {
  console.log(
    `🎲 ${charactername} rolou um dado de ${block} e teve ${diceResult} com + ${attribute} de atributo = ${diceResult + attribute}`
  );
}

async function playRaceEngine(character1, character2) {
  for (let i = 1; i <= 5; i++) {
    console.log(`\n🏁 Rodada ${i}`);
    let block = await getBlock();
    console.log(`🧱 Bloco sorteado: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let testSkill1 = 0;
    let testSkill2 = 0;

    if (block === "RETA") {
      testSkill1 = diceResult1 + character1.velocidade;
      testSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(character1.nome, "🚀 velocidade", diceResult1, character1.velocidade);
      await logRollResult(character2.nome, "🚀 velocidade", diceResult2, character2.velocidade);
    } else if (block === "CURVA") {
      testSkill1 = diceResult1 + character1.manobrabilidade;
      testSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(character1.nome, "🌀 manobrabilidade", diceResult1, character1.manobrabilidade);
      await logRollResult(character2.nome, "🌀 manobrabilidade", diceResult2, character2.manobrabilidade);
    } else if (block === "BATALHA") {
      testSkill1 = diceResult1 + character1.poder;
      testSkill2 = diceResult2 + character2.poder;

      await logRollResult(character1.nome, "💥 poder", diceResult1, character1.poder);
      await logRollResult(character2.nome, "💥 poder", diceResult2, character2.poder);

      const item = await randomItem();

      if (testSkill1 > testSkill2) {
        console.log(`🏆 ${character1.nome} venceu a batalha e marcou 1 ponto!`);
        character1.pontos++;
        applyItem(character1, character2, item);
      } else if (testSkill2 > testSkill1) {
        console.log(`🏆 ${character2.nome} venceu a batalha e marcou 1 ponto!`);
        character2.pontos++;
        applyItem(character2, character1, item);
      } else {
        console.log("🤝 Empate na batalha! Ninguém marcou ponto.");
      }

      console.log(`📊 Placar: ${character1.nome} ${character1.pontos} x ${character2.pontos} ${character2.nome}`);
      console.log("--------------------------------------------------");
      continue;
    }

    // RETA ou CURVA – pontuação simples
    if (testSkill1 > testSkill2) {
      console.log(`🥇 ${character1.nome} marcou um ponto!`);
      character1.pontos++;
    } else if (testSkill2 > testSkill1) {
      console.log(`🥇 ${character2.nome} marcou um ponto!`);
      character2.pontos++;
    } else {
      console.log("⚖️ Empate! Nenhum ponto foi marcado nesta rodada.");
    }

    // Penalidade (sem pontos negativos)
    
    

    console.log(`📊 Placar: ${character1.nome} ${character1.pontos} x ${character2.pontos} ${character2.nome}`);
    console.log("--------------------------------------------------");
  }

  console.log("\n🏁 A corrida terminou!");
  console.log(`📊 Placar final: ${character1.nome} ${character1.pontos} x ${character2.pontos} ${character2.nome}`);

  if (character1.pontos > character2.pontos) {
    console.log(`🏆 ${character1.nome} é o grande vencedor!`);
  } else if (character2.pontos > character1.pontos) {
    console.log(`🏆 ${character2.nome} é o grande vencedor!`);
  } else {
    console.log("🤝 A corrida terminou empatada!");
  }
}

function applyItem(player, opponent, item) {
  console.log(`🎁 ${player.nome} usou o item: ${item}`);

  if (item === "Casco de tartaruga 🐢") {
    player.pontos += 2;
    console.log(`➕ ${player.nome} ganhou +2 pontos!`);
  } else if (item === "Banana 🍌" || item === "Cogumelo 🍄") {
    player.pontos++;
    console.log(`➕ ${player.nome} ganhou +1 ponto!`);
  } else if (item === "Estrela ⭐") {
    player.pontos += 3;
    console.log(`🌟 ${player.nome} usou uma estrela brilhante! Ganhou +3 pontos!`);
  } else if (item === "Bomb 💣") {
    const pontosPerdidos = Math.min(2, opponent.pontos);
    opponent.pontos -= pontosPerdidos;
    console.log(`💣 ${player.nome} lançou uma bomba! ${opponent.nome} perdeu ${pontosPerdidos} pontos!`);
  }
}

async function getBlock() {
  let random = Math.random();
  if (random <= 0.33) return "RETA";
  else if (random < 0.66) return "CURVA";
  else return "BATALHA";
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function randomItem() {
  let items = [
    "Casco de tartaruga 🐢",
    "Banana 🍌",
    "Cogumelo 🍄",
    "Estrela ⭐",
    "Bomb 💣"
  ];
  return items[Math.floor(Math.random() * items.length)];
}

// 🚀 Iniciar
(async function main() {
  const [player1, player2] = escolherPersonagens();

  console.log(`🏁 A corrida vai começar!`);
  console.log(`👤 Jogador 1: ${player1.nome}`);
  console.log(`👤 Jogador 2: ${player2.nome}\n`);

  await playRaceEngine(player1, player2);
})();

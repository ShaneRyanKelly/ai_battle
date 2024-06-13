class PlayerCharacter {
  constructor(data) {
    this.name = data.name || '';
    this.age = data.age || 0;
    this.birthday = data.birthday || '';
    this.sign = data.sign || '';
    this.maxHP = data.maxHP || 0;
    this.hp = data.maxHP || 0;
    this.maxMP = data.maxMP || 0;
    this.mp = data.maxMP || 0;
    this.strength = data.strength || 0;
    this.dexterity = data.dexterity || 0;
    this.constitution = data.constitution || 0;
    this.intelligence = data.intelligence || 0;
    this.wisdom = data.wisdom || 0;
    this.agility = data.agility || 0;
    this.speed = data.speed || 0;
    this.attack = data.attack || 0;
    this.defense = data.defense || 0;
  }
}

function calculateTurnNumber(player) {
  const randomValue = Math.random() * 255;
  const agilityModifier = player.agility - (player.agility / 4);
  return player.agility - (randomValue * agilityModifier) / 256;
}

function performAttack(attacker, defender) {
  const baseDamage = attacker.attack - (defender.defense / 2);
  const randomModifier = ((baseDamage + 1) * Math.random()) / 256;
  const damage = Math.floor((baseDamage + randomModifier) / 4);
  defender.hp -= damage;

  // Output battle log message
  const outputDiv = document.getElementById("battleOutput");
  outputDiv.innerHTML += `${attacker.name} attacks ${defender.name} for ${damage} damage!<br>`;
  updateStats();
}

function updateStats() {
  const heroStatsDiv = document.getElementById("heroStats");
  const enemyStatsDiv = document.getElementById("enemyStats");
  heroStatsDiv.innerHTML = `Hero HP: ${hero.hp} / ${hero.maxHP} MP: ${hero.mp} / ${hero.maxMP}`;
  enemyStatsDiv.innerHTML = `Enemy HP: ${enemy.hp} / ${enemy.maxHP} MP: ${enemy.mp} / ${enemy.maxMP}`;
}

let enemyStatsMultiplier = 1.1; // Multiplier for enemy stats increase
let enemyStatsVariance = 0.1; // Variance for enemy stats increase

function increaseEnemyStats() {
  enemy.maxHP = Math.round(enemy.maxHP * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.maxMP = Math.round(enemy.maxMP * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.strength = Math.round(enemy.strength * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.dexterity = Math.round(enemy.dexterity * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.constitution = Math.round(enemy.constitution * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.intelligence = Math.round(enemy.intelligence * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.wisdom = Math.round(enemy.wisdom * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.agility = Math.round(enemy.agility * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.speed = Math.round(enemy.speed * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.attack = Math.round(enemy.attack * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
  enemy.defense = Math.round(enemy.defense * (enemyStatsMultiplier + (Math.random() * enemyStatsVariance)));
}

function startBattle() {
  const outputDiv = document.getElementById("battleOutput");
  outputDiv.innerHTML = ""; // Clear previous battle log

  // Create hero and enemy (replace with actual character data)
  hero = new PlayerCharacter({
    name: "Hero",
    age: 25,
    birthday: "January 1st",
    sign: "Capricorn",
    maxHP: 100,
    maxMP: 50,
    strength: 30,
    dexterity: 10,
    constitution: 12,
    intelligence: 8,
    wisdom: 14,
    agility: 16,
    speed: 12,
    attack: 75,
    defense: 15
  });
  enemy = new PlayerCharacter({
    name: "Enemy",
    age: 30,
    birthday: "June 15th",
    sign: "Gemini",
    maxHP: 60,
    maxMP: 40,
    strength: 24,
    dexterity: 14,
    constitution: 10,
    intelligence: 10,
    wisdom: 12,
    agility: 14,
    speed: 10,
    attack: 70,
    defense: 12
  });

  continueBattle();
}

document.getElementById("confirmButton").onclick = function() {
  document.getElementById("battleOutput").innerHTML = "";
  document.getElementById("attackButton").style.display = "block";
  document.getElementById("confirmButton").style.display = "none";
};

function continueBattle() {
  // Increase enemy stats
  increaseEnemyStats();
  enemy.hp = Math.round(enemy.maxHP); // Restore enemy HP and round to nearest whole number
  hero.hp = hero.maxHP; // Restore player HP

  // Show battle menu
  document.getElementById("battleMenu").style.display = "block";

  // Determine who goes first
  const heroTurnNumber = calculateTurnNumber(hero);
  const enemyTurnNumber = calculateTurnNumber(enemy);

  let currentTurn = heroTurnNumber >= enemyTurnNumber ? hero : enemy;

  // Attack button event listener
  const attackButton = document.getElementById("attackButton");
  attackButton.onclick = function attackButtonClickListener() {
    if (currentTurn === hero) {
      performAttack(hero, enemy);
      currentTurn = enemy;
    } else {
      performAttack(enemy, hero);
      currentTurn = hero;
    }
    checkVictory(hero, enemy);
  };

  const magicButton = document.getElementById("magicButton");
  magicButton.onclick = function magicButtonClickListener() {
    const magicMenu = document.getElementById("magicMenu");
    if (magicMenu.style.display === "block") {
      magicMenu.style.display = "none";
    } else {
      magicMenu.style.display = "block";
    }
  };

  const outputDiv = document.getElementById("battleOutput");
  outputDiv.innerHTML += `The battle begins! ${currentTurn.name} goes first.<br>`;
  updateStats();
}

function restartBattle() {
  // Clear the battle output
  document.getElementById('battleOutput').innerHTML = '';

  // Remove the event listener for the attack button
  const attackButton = document.getElementById("attackButton");
  attackButton.onclick = null;

  // Reset the battle
  startBattle();
  // Switch back to start page
  document.getElementById("startPage").style.display = "block";
  document.getElementById("battlePage").style.display = "none";
  // Hide the attack button
  attackButton.style.display = "none";
}

function checkVictory(hero, enemy) {
  const outputDiv = document.getElementById("battleOutput");

  if (hero.hp <= 0) {
    outputDiv.innerHTML += "You have been defeated!<br>";
    // Reset the game
    restartBattle();
  } else if (enemy.hp <= 0) {
    outputDiv.innerHTML += "You are victorious!<br>";
    outputDiv.innerHTML = outputDiv.innerHTML.split('<br>').slice(-1).join('<br>');
    document.getElementById("battleMenu").style.display = "none";
    document.getElementById("confirmButton").style.display = "block";
    // Continue to the next battle
    continueBattle();
  }
}

function startGame() {
  // Switch from start page to battle page
  document.getElementById("startPage").style.display = "none";
  document.getElementById("battlePage").style.display = "block";
  // Show the attack button
  document.getElementById("attackButton").style.display = "block";

  // Start the actual battle
  startBattle();
}

let hero;
let enemy;
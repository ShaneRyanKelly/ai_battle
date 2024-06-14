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
    this.magicDefense = data.magicDefense || 0;
    this.inventory = [];
  }
}

function calculateTurnNumber(player) {
  const randomValue = Math.random() * 255;
  const agilityModifier = player.agility - (player.agility / 4);
  return player.agility - (randomValue * agilityModifier) / 256;
}

function performAttack(attacker, defender) {
  const baseDamage = attacker.attack - (defender.defense / 2);
  const hitChance = Math.random();
  const critChance = Math.random();

  if (hitChance <= 0.2) { // 20% chance to miss
    const outputDiv = document.getElementById("battleOutput");
    outputDiv.innerHTML += `${attacker.name} misses ${defender.name}!<br>`;
  } else {
    let damage = Math.floor((baseDamage + (Math.random() * baseDamage / 2)) / 4);
    if (critChance <= 0.1) { // 10% chance to crit
      damage *= 2;
      const outputDiv = document.getElementById("battleOutput");
      outputDiv.innerHTML += `${attacker.name} critically hits ${defender.name} for ${damage} damage!<br>`;
    } else {
      const outputDiv = document.getElementById("battleOutput");
      outputDiv.innerHTML += `${attacker.name} hits ${defender.name} for ${damage} damage!<br>`;
    }
    defender.hp -= damage;
  }

  updateStats();
}

function performMagicSpell(attacker, defender, spellType) {
  const baseEffect = attacker.attack * 1.5;
  const magicDefense = defender.magicDefense;
  const hitChance = Math.random();
  const critChance = Math.random();

  if (hitChance <= 0.2) { // 20% chance to miss
    const outputDiv = document.getElementById("battleOutput");
    outputDiv.innerHTML += `${attacker.name} misses ${defender.name} with their magic!<br>`;
  } else {
    let effect = Math.floor((baseEffect + (Math.random() * baseEffect / 2)) / 4);
    if (critChance <= 0.1) { // 10% chance to crit
      effect *= 2;
    }

    if (spellType === "magic") {
      defender.hp -= effect;
      const outputDiv = document.getElementById("battleOutput");
      outputDiv.innerHTML += `${attacker.name} hits ${defender.name} with their magic for ${effect} damage!<br>`;
    } else if (spellType === "cure") {
      attacker.hp += effect;
      if (attacker.hp > attacker.maxHP) {
        attacker.hp = attacker.maxHP;
      }
      const outputDiv = document.getElementById("battleOutput");
      outputDiv.innerHTML += `${attacker.name} uses Cure and regains ${effect} HP!<br>`;
    }

    attacker.mp -= 7; // Reduce attacker's MP
  }
}

function calculateCureAmount(character) {
  const baseCure = 20;
  const intelligenceModifier = character.intelligence / 10;
  return Math.floor(baseCure + (Math.random() * intelligenceModifier));
}

function performTurn(hero, enemy, heroAction) {
  const heroTurnNumber = calculateTurnNumber(hero);
  const enemyTurnNumber = calculateTurnNumber(enemy);

  let firstTurn, secondTurn;
  if (heroTurnNumber >= enemyTurnNumber) {
    firstTurn = hero;
    secondTurn = enemy;
  } else {
    firstTurn = enemy;
    secondTurn = hero;
  }

  if (firstTurn === hero) {
    if (heroAction === "attack") {
      performAttack(hero, enemy);
    } else if (heroAction === "magic") {
      performMagicSpell(hero, enemy, "magic");
    } else if (heroAction === "cure") {
      performMagicSpell(hero, enemy, "cure");
    }
    if (enemy.hp > 0) {
      performAttack(enemy, hero);
    }
  } else {
    performAttack(enemy, hero);
    if (hero.hp > 0) {
      if (heroAction === "attack") {
        performAttack(hero, enemy);
      } else if (heroAction === "magic") {
        performMagicAttack(hero, enemy);
      } else if (heroAction === "cure") {
        const cureAmount = calculateCureAmount(hero);
        hero.hp += cureAmount;
        if (hero.hp > hero.maxHP) {
          hero.hp = hero.maxHP;
        }
        const outputDiv = document.getElementById("battleOutput");
        outputDiv.innerHTML += `Hero uses Cure and regains ${cureAmount} HP!<br>`;
      }
    }
  }

  updateStats();
  checkVictory(hero, enemy);
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

function initBattle() {
  // Increase enemy stats
  increaseEnemyStats();
  enemy.hp = Math.round(enemy.maxHP); // Restore enemy HP and round to nearest whole number
  hero.hp = hero.maxHP; // Restore player HP
  hero.mp = Math.floor(hero.maxMP * 0.3); // Restore 30% of hero's MP

  // Show battle menu
  document.getElementById("battleMenu").style.display = "block";

  // Determine who goes first
  const heroTurnNumber = calculateTurnNumber(hero);
  const enemyTurnNumber = calculateTurnNumber(enemy);

  let currentTurn = heroTurnNumber >= enemyTurnNumber ? hero : enemy;

  // Attack button event listener
  const attackButton = document.getElementById("attackButton");
  attackButton.onclick = function attackButtonClickListener() {
    performTurn(hero, enemy, "attack");
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

  const cureButton = document.getElementById("cureButton");
  cureButton.onclick = function() {
    performTurn(hero, enemy, "cure");
  };

  const fireButton = document.getElementById("fireButton");
  fireButton.onclick = function() {
    performTurn(hero, enemy, "magic");
  };

  const itemsButton = document.getElementById("itemsButton");
  itemsButton.onclick = function itemsButtonClickListener() {
    const inventoryMenu = document.getElementById("inventoryMenu");
    if (inventoryMenu.style.display === "block") {
      inventoryMenu.style.display = "none";
    } else {
      inventoryMenu.style.display = "block";
    }
  };

  const outputDiv = document.getElementById("battleOutput");
  outputDiv.innerHTML += `The battle begins! ${currentTurn.name} goes first.<br>`;
  updateStats();
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
    defense: 15,
    magicDefense: 10 // Add magicDefense to hero
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
    defense: 12,
    magicDefense: 8 // Add magicDefense to enemy
  });
  hero.inventory.push({ name: "Potion", quantity: 1 });
  initBattle();
}

document.getElementById("confirmButton").onclick = function() {
  document.getElementById("battleOutput").innerHTML = "";
  document.getElementById("battleMenu").style.display = "block";
  document.getElementById("confirmButton").style.display = "none";
  continueBattle(); // Call continueBattle() here
};

function continueBattle() {
  // Increase enemy stats
  increaseEnemyStats();
  enemy.hp = Math.round(enemy.maxHP); // Restore enemy HP and round to nearest whole number
  hero.hp = hero.maxHP; // Restore player HP

  initBattle(); // Call initBattle() here
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
    outputDiv.innerHTML += "You are victorious! Congratulations!<br>";
    document.getElementById("battleMenu").style.display = "none";
    document.getElementById("confirmButton").style.display = "block";
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
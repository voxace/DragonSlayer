new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    dragonHealth: 100,
    gameIsRunning: false,
    turns: [],
    specialAttackCount: 3,
    healCount: 1
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.dragonHealth = 100;
      this.specialAttackCount = 3;
      this.healCount = 1;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3,10);
      this.dragonHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits dragon for ' + damage
      });
      if(this.checkWin()) {
        return;
      }
      this.dragonAttacks();
    },
    specialAttack: function() {
      this.specialAttackCount--;
      var damage = this.calculateDamage(10,20);
      this.dragonHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits dragon hard for ' + damage
      });
      if(this.checkWin()) {
        return;
      }
      this.dragonAttacks();
    },
    heal: function() {
      this.healCount--;
      if(this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals self'
      });
      this.dragonAttacks;
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min,max) {
      return Math.max(Math.floor(Math.random() * max), min);
    },
    checkWin: function() {
      if(this.dragonHealth <= 0) {
        alert("You Win!");
        this.gameIsRunning = false;
        return true;
      } else if(this.playerHealth <= 0) {
        alert("You Lost!");
        this.gameIsRunning = false;
        return true;
      }
      return false;
    },
    dragonAttacks: function() {
      var damage = this.calculateDamage(5,14);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: 'Dragon hits player for ' + damage
      });
      this.checkWin();
    }
  }
})

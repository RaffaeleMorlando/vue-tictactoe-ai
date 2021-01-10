//[] add AI (min/max alghoritm)

const app = new Vue(
{
  el: '#app',
  data: {
    gameboard: [0,1,2,3,4,5,6,7,8],
    winCombinations: [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ],
    player1: {
      name: '',
      choices: [],
      turn: true,
      winCombinations: [],
    },
    player2: {
      name: '',
      choices: [],
      turn: false,
      winCombinations: [],
    },
    totalMoves: 0,
    gamestart: false,
    result:''
  },
  methods: {
    startGame: function() {
      this.gamestart = true;
      this.$forceUpdate()
    },
    addChoice: function(number,index) {
      //Player One
      if(this.player1.turn) {
        this.totalMoves++
        this.player1.choices.push(number);
        console.log('Player 1 prev moves',this.player1.choices);
        this.gameboard[index] = 'X';
        this.$forceUpdate();
        if(this.player1.choices.length >= 3) {
          let choicesP1 = this.player1.choices;
          this.checkChoices(choicesP1);
        }
        this.player1.turn = false;
        this.player2.turn = true;

      //Player One
      } else if(this.player2.turn){
        this.totalMoves++
        this.player2.choices.push(number);
        console.log('Player 2 prev moves',this.player2.choices);
        this.gameboard[index] = 'O';
        this.$forceUpdate();
        if(this.player2.choices.length >= 3) {
          let choicesP2 = this.player2.choices;
          this.checkChoices(choicesP2);
        }
        this.player2.turn = false;
        this.player1.turn = true;
      }
    },
    checkChoices: function(arr) {
      console.log(arr);
      this.winCombinations.forEach(
        (wc) => {
          const wcArray = wc;
          let op = wcArray.every(element => arr.indexOf(element) > -1);
          if (op && this.player1.turn) {
            this.result = `${this.player1.name} Win`
          } else if(op && this.player2.turn) {
            this.result = `${this.player2.name} Win`
          } else if(this.totalMoves == 9 && op === false) {
            this.result = `Draw`
          }
      });
    },
    restartGame: function() {
      this.gamestart = false;
      this.gameboard = [0,1,2,3,4,5,6,7,8]
      this.player1 = {
        name: '',
        choices: [],
        turn: true,
        winCombinations: []
      };
      this.player2 = {
        name: '',
        choices: [],
        turn: false,
        winCombinations: []
      };
      this.totalMoves = 0;
      this.result = '';
    }
  }
}
);
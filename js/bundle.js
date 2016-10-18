/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__ (1);
	const HanoiView = __webpack_require__ (2)

	$( () => {
	  const game = new HanoiGame();
	  new HanoiView(game, $(".towers"));
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.board = $el;
	    this.fromTower=undefined;
	    this.toTower = undefined;
	    this.bindEvents();
	    this.render();
	  }

	  bindEvents() {
	    this.board.on("click", "ul", event => {
	      if (this.fromTower === undefined) {
	        const fromTower = event.currentTarget;
	        const $fromTower = $(fromTower);
	        $fromTower.addClass("clicked");
	        this.fromTower = $fromTower;
	      } else {
	          const toTower = event.currentTarget;
	          const $toTower = $(toTower);
	          this.toTower = $toTower;
	      };

	      if (this.fromTower !== undefined && this.toTower !== undefined) {
	        this.makeMove(this.fromTower, this.toTower);
	        this.fromTower = undefined;
	        this.toTower = undefined;
	      }
	    });
	  }

	  makeMove($fromTower, $toTower) {
	    console.log($fromTower.data("index"),$toTower.data("index"));
	    this.game.move($fromTower.data("index"), $toTower.data("index"));
	    this.render();

	    if (this.game.isWon()) {
	      $("h2").append(`You win!`);
	      $("h2").removeClass("hidden");
	}
	  }

	  setupTowers(){
	    for (var i = 0; i < 3; i++) {
	      let $ul = $("<ul></ul>");
	      for (var j = 0; j < 3; j++) {
	        let $li = $("<li></li>");
	        $li.data({"x": i, "y": j})
	        $ul.append($li);
	      }
	      $(this.board).append($ul)
	    }
	  }

	  render() {
	    $(this.board).empty();
	    this.game.towers.forEach((tower,index) => {
	      let $ul = $("<ul></ul>").data("index", index);

	        for (let i=2;i>=0;i--) {
	          let $li = $("<li></li>");
	          $li.addClass("empty");

	          if (tower[i]===1) {
	            $li.addClass("disc3");
	            $li.removeClass("empty");
	          }
	          if (tower[i]===2) {
	            $li.addClass("disc2");
	            $li.removeClass("empty");
	          }
	          if (tower[i]===3) {
	            $li.addClass("disc1");
	            $li.removeClass("empty");
	          }
	          $ul.append($li);
	        }

	      $(this.board).append($ul);
	    });
	  }

	}

	module.exports = View;


/***/ }
/******/ ]);
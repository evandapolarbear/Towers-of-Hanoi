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

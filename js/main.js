const HanoiGame = require ("./towers/game");
const HanoiView = require ("./hanoi-view")

$( () => {
  const game = new HanoiGame();
  new HanoiView(game, $(".towers"));
});

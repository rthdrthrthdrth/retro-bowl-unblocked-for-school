const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: '#1e7f2b',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let qb, receiver, ball;
let isThrowing = false;

function preload() {
  this.load.image('player', 'assets/players.png');
  this.load.image('ball', 'assets/ball.png');
}

function create() {
  qb = this.physics.add.sprite(100, 225, 'player');
  receiver = this.physics.add.sprite(400, 225, 'player');
  ball = this.physics.add.sprite(qb.x, qb.y, 'ball');
  ball.setVisible(false);

  this.input.on('pointerdown', () => {
    isThrowing = true;
  });

  this.input.on('pointerup', (pointer) => {
    if (!isThrowing) return;

    isThrowing = false;
    ball.setVisible(true);
    ball.setPosition(qb.x, qb.y);

    const dx = pointer.x - qb.x;
    const dy = pointer.y - qb.y;

    ball.setVelocity(dx * 2, dy * 2);
  });
}

function update() {
  if (!ball.visible) {
    ball.setPosition(qb.x, qb.y);
  }

  // Catch detection
  if (Phaser.Math.Distance.Between(
    ball.x, ball.y,
    receiver.x, receiver.y
  ) < 20) {
    ball.setVelocity(0, 0);
    ball.setVisible(false);
    console.log('Caught!');
  }
}


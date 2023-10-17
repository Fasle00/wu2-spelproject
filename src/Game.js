import InputHandler from "./Inputhandler"
import Player from "./Player"
import UserInterface from "./UserInterface"
import Pumpkin from "./Pumpkin";
import Platform from "./Platform";

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []

    this.gameOver = false
    this.gameTime = 0
    this.gravity = 1
    this.debug = false

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.platforms = [
      new Platform(this, 0, 0, this.width, 10),
      new Platform(this, 0, this.height - 10, this.width, 10),
      new Platform(this, this.width / 2, this.height - 100, 100, 10),
      new Platform(this, this.width / 2 + 50, this.height - 150, 100, 10),
    ]
    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }
    this.gameTime += deltaTime
    this.player.update(deltaTime)
    let colitions = 0
    this.platforms.forEach((platform) => {
      if (this.checkCollisions(this.player, platform)) {
        console.log(platform)
        this.player.speedY = 0
        if (this.player.grounded) {
          if ((this.player.x < platform.x)) {
            this.player.speedX = 0
            this.player.x = platform.x - this.player.width
          } else if ((this.player.x + this.player.width > platform.x + platform.width)) {
            this.player.x = platform.x + platform.width
            this.player.speedX = 0
          }
        } else if (this.player.y + this.player.height / 3 < platform.y) {
          this.player.grounded = true
          this.player.y = platform.y - this.player.height
        } else {
          this.player.grounded = false
          this.player.y = platform.y + platform.height
        }
        colitions++
      } else console.log('not colliding')
      if (colitions === 0) this.player.grounded = false
      /*if (this.checkPlatform(this.player, platform)) {
        console.log('hit platform')
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height
        this.player.grounded = true
      }*/
      this.enemies.forEach((enemy) => {
        if (this.checkPlatformCollision(enemy, platform)) {
          enemy.speedY = 0
          enemy.y = platform.y - enemy.height
          enemy.grounded = true
        }
      })
    })

    this.addEnemy(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollisions(this.player, enemy)) {
        enemy.lives--
      }
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  checkCollisions(object1, object2) {
    return object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
  }

  draw(context) {
    this.player.draw(context)
    this.ui.draw(context)
    this.enemies.forEach(enemy => enemy.draw(context))
    this.platforms.forEach(platform => platform.draw(context))
  }

  addEnemy(deltaTime) {
    if (this.enemyTimer > this.enemyInterval && this.enemies.length < 4) {
      this.enemies.push(new Pumpkin(this))
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
  }

  checkPlatformCollision(object, platform) {
    if (
      object.y + object.height >= platform.y &&
      object.y < platform.y + platform.height &&
      object.x + object.width >= platform.x &&
      object.x <= platform.x + platform.width
    ) {
      if (object.grounded && object.y + object.height > platform.y) {
        object.speedY = 0
        object.y = platform.y - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        object.grounded = false
      }
      return false
    }
  }

  checkPlatform(player, platform) {
    let tw = player.width;
    let th = player.height;
    let rw = platform.width;
    let rh = platform.height;
    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
      return false;
    }
    let tx = player.x;
    let ty = player.y;
    let rx = platform.x;
    let ry = platform.y;
    rw += rx;
    rh += ry;
    tw += tx;
    th += ty;
    //      overflow || intersect
    return ((rw < rx || rw > tx) &&
      (rh < ry || rh > ty) &&
      (tw < tx || tw > rx) &&
      (th < ty || th > ry));
  }
}

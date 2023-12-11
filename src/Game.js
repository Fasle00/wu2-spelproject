import InputHandler from "./Inputhandler"
import Player from "./Player"
import UserInterface from "./UserInterface"
import Pumpkin from "./Pumpkin";
import Platform from "./Platform";
import GroundPlatform from "./GroundPlatform";
import Background from "./Background";
import Camera from "./Camera";
import Level1 from './levels/Level1';

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.background = new Background(this)
    this.keys = []

    this.gameOver = false
    this.gameTime = 0
    this.gravity = 1
    this.debug = false

    this.level = new Level1(this)

    // enemies
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000

    this.platforms = [
      //new Platform(this, 0, 0, this.width, 10),
      //new GroundPlatform(this, this.height - 30),
      //new Platform(this, 16, this.height - 156, 57, 5),
      //new Platform(this, 116, this.height - 156 + 30, 57, 5),
      //new Platform(this, 226, this.height - 156 + 15, 57, 5),
      //new Platform(this, 336, this.height - 156 + 55, 57, 5),
      //new Platform(this, 650, this.height - 156 + 8,  57, 5),
      //new Platform(this, 740, this.height - 156 + 48, 57, 5),
      //new Platform(this, 860, this.height - 156 + 11, 57, 5),
      //new Platform(this, 960, this.height - 156 + 55,  57, 5),
      //new Platform(this, this.width / 2 + 50, this.height - 105, 50, 100),
      //new Platform(this, this.width / 2 - 250, this.height - 80, 50, 10),
      //new Platform(this, this.width / 2 + 100, this.height - 155, 100, 150),
      //new Platform(this, this.width / 2 + 150, this.height - 205, 100, 10),
    ]
    this.player = new Player(this)
    this.camera = new Camera(this, this.player.x, this.player.y, 0, 100)

    this.score = 0
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }
    if (this.gameTime >= 30000) this.gameOver = true
    this.gameTime += deltaTime
    this.background.update()
    this.player.update(deltaTime)
    let colitions = 0
    this.level.platforms.forEach((platform) => {
      if (this.checkCollisions(this.player, platform)) {
        colitions++
        this.player.speedY = 0
        if (this.player.grounded) {
          if ((this.player.x < platform.x)) {
            this.player.speedX = 0
            this.player.x = platform.x - this.player.width
          } else if ((this.player.x + this.player.width > platform.x + platform.width)) {
            this.player.x = platform.x + platform.width
            this.player.speedX = 0
          }
          this.player.grounded = true
        } else if (this.player.y + this.player.height / 3 < platform.y) {
          this.player.grounded = true
          this.player.y = platform.y - this.player.height
        } else {
          if ((this.player.x < platform.x)) {
            this.player.speedX = 0
            this.player.x = platform.x - this.player.width
          } else if ((this.player.x + this.player.width > platform.x + platform.width)) {
            this.player.x = platform.x + platform.width
            this.player.speedX = 0
          }
        }

          /* else if (this.player.y + this.player.speedY > platform.y + platform.height){
          this.player.grounded = false
          this.player.y = platform.y + platform.height
        }*/
      }
      if (colitions === 0) this.player.grounded = false
      /*if (this.checkPlatform(this.player, platform)) {
        console.log('hit platform')
        this.player.speedY = 0
        this.player.y = platform.y - this.player.height
        this.player.grounded = true
      }*/
      
      
      this.enemies.forEach((enemy) => {
        if (this.checkCollisions(enemy, platform)) {
          enemy.speedY = 0
          if (enemy.grounded) {
            if ((enemy.x < platform.x)) {
              enemy.x = platform.x - enemy.width
            } else if ((enemy.x + enemy.width > platform.x + platform.width)) {
              enemy.x = platform.x + platform.width
            }
            enemy.speedX *= -1
          } else if (enemy.y + enemy.height / 3 < platform.y) {
            enemy.grounded = true
            enemy.y = platform.y - enemy.height
          } else {
            enemy.grounded = false
            enemy.y = platform.y + platform.height
          }
          colitions++
        }
        if (colitions === 0) enemy.grounded = false
      })
    })

    this.camera.update(this.player)

    this.addEnemy(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (enemy.lives <= 0) {
        this.score++
      }
      if (this.checkCollisions(this.player, enemy)) {
        enemy.lives--
      }
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  checkCollisions(object1, object2) {
    return object1.x < object2.x + object2.width &&
      object1.x + object1.width >= object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y >= object2.y
  }

  draw(context) {
    this.camera.apply(context)
    this.background.draw(context)
    //this.platforms.forEach((platform) => { platform.draw(context) })
    this.level.draw(context)
    this.player.draw(context)
    this.enemies.forEach(enemy => enemy.draw(context))
    //context.drawImage(this.background, 0, 0)
    //context.drawImage(this.midGND, 0, 0)
    //context.drawImage(this.forGND, 0, this.height - this.forGND.height)
    this.camera.reset(context)
    this.ui.draw(context)
    
  }

  addEnemy(deltaTime) {
    if (this.enemyTimer > this.enemyInterval && this.enemies.length < 5) {
      let enemy = new Pumpkin(this)
      enemy.enemyType = Math.ceil(Math.random() * 2)
      this.enemies.push(enemy)
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
        // object.speedY = 0
        // object.y = platform.y - object.height
        // object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.y + object.height < platform.y) {
        // object.grounded = false
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

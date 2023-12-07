import Level from '../Map'

export default class level extends Level {
    constructor(game) {
        super(game)

        this.addPlatform(0, 0, 1024, 5)
        this.addGroundPlatform(320 - 30)
        //this.addPlatform(16, 320 - 156, 57, 5)
        this.addPlatform(116, 320 - 156 + 30, 57, 5)
        this.addPlatform(226, 320 - 156 + 15, 57, 5)
        this.addPlatform(336, 320 - 156 + 55, 57, 5)
        this.addPlatform(650, 320 - 156 + 8, 57, 5)
        this.addPlatform(740, 320 - 156 + 48, 57, 5)
        this.addPlatform(860, 320 - 156 + 11, 57, 5)
        this.addPlatform(960, 320 - 156 + 55, 57, 5)
    }
}
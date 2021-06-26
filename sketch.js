var aladdin, carpet, aladdinIMG, carpetIMG;
var aladdin1, carpet1;
var edges; 
var invisble_ground;
var rock, rockIMG, rockGroup;
var coin, coinIMG, coinGroup;
var gameState = "START"
var playButton, playButtonIMG;
var score = 0;
var resetIMG, resetBTN;

function preload(){
    aladdinIMG = loadImage("images/Aladdin.png")
    carpetIMG = loadImage("images/Carpet.png")
    rockIMG = loadImage("images/Rock.png")
    coinIMG = loadImage("images/Coin.png")
    resetIMG = loadImage("images/Reset.png")
    playButtonIMG = loadImage("images/Play.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    edges = createEdgeSprites()

    

    rockGroup = new Group()
    coinGroup = new Group()

    set_START();
    Level_1()
    }

function draw(){
    background("black");
    drawSprites()

    if(gameState === "START"){
        startState()
    }

    if(gameState === "LEVEL 1"){
        play_level_1()
        aladdin1.destroy()
        playButton.destroy()
        carpet1.destroy()
    }

    if(gameState === "END"){
        end_state()
    }

    invisble_ground = createSprite(width/2, height-30, width, 30)
}

function rocks(){
    if (frameCount%150===0){
        rock = createSprite(width, Math.round(random(50, height-350)), 20, 20)
        rock.velocityX = -5
        rock.addImage(rockIMG)
        rock.scale = 0.2
        rockGroup.add(rock)
    }
}

function coins(){
    if (frameCount%150===0){
        coin = createSprite(Math.round(random(50, width-100)), -50, 20, 20)
        coin.velocityY = 5
        coin.addImage(coinIMG)
        coin.scale = 0.1
        coinGroup.add(coin)
    }
}

function startState(){
    fill("white")
    textSize(50)
    text("Help Aladdin get all his coins so he can help the poor! \nUse the arrow keys \n'LEFT' \n'RIGHT \n'UP' \nUse the Up arrow to jump and the left and right", width/2-100, height/2-500)
    playButton.visible = true
    aladdin1.visible = true
    carpet1.visible = true
    if(mousePressedOver(playButton)){
        gameState = "LEVEL 1"
    }
}

function set_START(){
    playButton = createSprite(windowWidth/2, height/2)
    playButton.addImage(playButtonIMG)
    playButton.scale = 0.4
    playButton.visible = false

    aladdin1 = createSprite(windowWidth/2-150, height-300)
    aladdin1.addImage(aladdinIMG)
    aladdin1.visible = false;
    aladdin1.scale = 0.7

    carpet1 = createSprite(windowWidth/2-150, height-50)
    carpet1.addImage(carpetIMG)
    carpet1.visible = false;
    carpet1.scale = 0.5
}

function Level_1(){
    aladdin = createSprite(windowWidth/2-250, height-195)
    aladdin.addImage(aladdinIMG)
    aladdin.scale = 0.5
    aladdin.visible = false

    carpet = createSprite(windowWidth/2-250, height-150)
    carpet.addImage(carpetIMG)
    carpet.scale = 0.6
    carpet.debug = true;
    carpet.setCollider("rectangle", 0, -30, carpet.width-100, carpet.height-300)
    carpet.visible = false

}

function play_level_1(){

    fill("white")
    textSize(50)
    text("Score:"+score, 800, 200)

    aladdin.collide(carpet)
    carpet.collide(edges)
    //aladdin.collide(edges)

    aladdin.visible = true
    carpet.visible = true

    if(keyDown(UP_ARROW)){ 
        aladdin.velocityY = -10; 
        //carpet.velocityY = -10;
    }
    aladdin.velocityY += 0.8
    if(keyDown(LEFT_ARROW)){ 
        aladdin.x -= 5; 
        carpet.x -= 5;
    }
    if(keyDown(RIGHT_ARROW)){ 
        aladdin.x += 5; 
        carpet.x += 5;
    }

    for (var i = 0; i < coinGroup.length; i++){
        if(coinGroup.get(i).isTouching(aladdin)){
            score = score + 100
            coinGroup.get(i).remove()
        }
    }

    if(rockGroup.isTouching(aladdin)){
        gameState = "END"
        //rockGroup.get(i).remove()
    }

    coins()
    rocks()
}

function end_state(){
    rockGroup.destroyEach()
    coinGroup.destroyEach()

    resetBTN = createSprite(200, 200, 10, 10)
    resetBTN.addImage(resetIMG)

    resetBTN.scale = 0.3

    if(mousePressedOver(resetBTN)){
        gameState = "LEVEL 1"
        resetBTN.visible = false
        location.reload();
    }

    fill("red")
    textSize(200)
    text("GAME OVER!!!", 400, 400)

    aladdin.setVelocity(0, 0)
}
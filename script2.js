function arrayToStr(array) {
    //[1,1,0,0] ===> "1100"
    let element ="";
    for (let index = 0; index < array.length; index++) {
      element += array[index];
    }
  
    return element;
  
  }
  function shuffle(array) {
    for (var i=0; i<array.length-1; i++) {
       var j = Math.floor(Math.random()*(array.length-i))+i;
  
       var tmp = array[i];
       array[i] = array[j];
       array[j] = tmp;
    }
    return array;
  }
  
  class Tile{
    constructor(x, y, image, monster)
    {
        this.x  = x 
        this.y  = y 
        this.image = image
        this.monster = monster
        this.fieldArray = [0,0,0,0]
  
  
        switch (image) {
          case '0011.png':
            this.fieldArray = [0,0,1,1]
            break
          case '1100.png':
              this.fieldArray = [1,1,0,0]
              break
          case '0110.png':
            this.fieldArray = [0,1,1,0]
            break
          case '1110.png':
            this.fieldArray = [1,1,1,0]
            break
          case '1101.png':
            this.fieldArray = [1,1,0,1]
            break
          case '1001.png':
            this.fieldArray = [1,0,0,1]
            break
          case '1010.png':
            this.fieldArray = [1,0,1,0]
            break
          case '0101.png':
            this.fieldArray = [0,1,0,1]
            break
          case '1011.png':
            this.fieldArray = [1,0,1,1]
            break
          case '0111.png':
            this.fieldArray = [0,1,1,1]
            break
          case 'start0011.png':
            this.fieldArray = [0,0,1,1]
            break
          case 'start1100.png':
              this.fieldArray = [1,1,0,0]
              break
          case 'start0110.png':
            this.fieldArray = [0,1,1,0]
            break
          case 'start1001.png':
            this.fieldArray = [1,0,0,1]
            break
          default:
            break
        }
        
      }
  
  }
  
  class Player {
    constructor(number, X, Y, cardsNum, mymonsterCards)
    {
        this.number = number
        this.X = X
        this.Y = Y

        this.monstersToCatch = mymonsterCards;
  
        this.currentMonster = this.monstersToCatch[0];
  
        this.name = "";
        this.startTile = [0,0];
      
        switch (number) {
          case 1:
            this.name = "Shaggy"
            this.startTile = [0,0];
            break
          case 2:
            this.name = "Fred"
            this.startTile = [0,6];
              break
          case 3:
                this.name = "Daphne"
                this.startTile = [6,0];
                break
          case 4:
                this.name = "Velma"
                this.startTile = [6,6];
                  break
          default: 
            this.name = "idonnomyname";
            break
        }
  
        
    }
  }
  
  //SZÖRNYKÁRTYÁK
  
  let canvas = document.querySelector("#canvas")
  let ctx = canvas.getContext("2d")
  ctx.fillStyle = "gray"
  ctx.fillRect(0,0, 700, 700)
  
  let wrapperDiv = document.querySelector("#wrapperDiv")
  
  const startGameButton = document.querySelector("#startGameButton")
  let numberOfPlayersInput = document.querySelector("#numberOfPlayers")
  
  let numberOfMonstersPerPlayer = 24
  
  
  let currentPlayer = 0
  let gameOver
  let canMove = false;
  
  let img = new Image()
  let monsterimg = new Image()
  
  let gameTable = new Array(7).fill().map(() => new Array(7).fill())
  let monstersOnTable = new Array(7).fill().map(() => new Array(7).fill(""))
  let playersArray = []
  
  let extraTile = new Tile(-1,-1, "none.png","none.png");
  let allMonsters = ["blackknight", "catcreature", "charlie", "dracula", "futuremonster", "ghostclown", "ghostofeliaskingston", "headlesshorseman", "mantis", "zombie","miner", "mummy", "nofacezombie", "phantomracer", "phantomshadow","phantomvirus", "pterodactylghost", "ramblingghost", "redbears", "swampmonster","tarmonster", "voltghost", "witch", "witchdoctor"]
  
  let gameStatTable = document.querySelector("#gameStatsTable")
  let extraTileImage = document.querySelector("#plusTileImg")
  let buttonsAroundTheCanvas = document.querySelector("#wrapperDiv")
  
  window.onload = function something(){
    numberOfPlayers = 2
    NewGame();
  }

  extraTileImage.addEventListener("click", () => {
    extraTileRotate();
  })
  startGameButton.addEventListener("click", ()=>{
      
    numberOfPlayers = numberOfPlayersInput.value
    numberOfMonstersPerPlayer = 24 / numberOfPlayers
  
    NewGame()
  })

  buttonsAroundTheCanvas.addEventListener("click", (e)=>{
      
    btnNum = e.target.value
    if (btnNum <70) {
      theTileSlides(parseInt(btnNum));
    }
    

  })

function theTileSlides(where){
  if (!gameOver) {
    canMove = true;
    
  
      let coordinate = [];
      coordinate = decodeTheButtons(where)
      
//fennt
      if (coordinate[0]==1) {

          let tmp = extraTile
          console.log("tmp.monster  -  "+tmp.monster);
          extraTile = gameTable[coordinate[1]][6]
          extraTile.x = -1;
          extraTile.y = -1;

          for (let index = 5; index >= 0; index--) {
              gameTable[coordinate[1]][index+1] = gameTable[coordinate[1]][index]
              gameTable[coordinate[1]][index+1].y = gameTable[coordinate[1]][index+1].y-1;
          }
          gameTable[coordinate[1]][0] = tmp;
          gameTable[coordinate[1]][0].y =  gameTable[coordinate[1]][0].y-1 ;

          //na de mi a helyzet a playerrel?
/*
          for (let index = 0; index < playersArray.length; index++) {
            if (playersArray[index].X == coordinate[1] && playersArray[index].X != 6) {
              
              playersArray[index].X = playersArray[index].X+1;

            } else if (playersArray[index].X == 6) {
              playersArray[index].X = 0;
            }
            
          }
          */



      } 
// lennt
      else if (coordinate[0]==3) {

        let tmp = extraTile

        extraTile = gameTable[coordinate[1]][0]
        extraTile.x = -1;
        extraTile.y = -1;

        for (let index = 1; index < 6; index++) {
            gameTable[coordinate[1]][index-1] = gameTable[coordinate[1]][index]
            gameTable[coordinate[1]][index-1].y = gameTable[coordinate[1]][index].y-1;
        }
        gameTable[coordinate[1]][6] = tmp;
        gameTable[coordinate[1]][6].y =  gameTable[coordinate[1]][0].y-1 ;
      }
// jobbra
      else if (coordinate[0]==2) {

        let tmp = extraTile
        extraTile = gameTable[0][coordinate[1]]
        extraTile.x = -1;
        extraTile.y = -1;

        for (let index = 0; index < 6; index++) {
            gameTable[index][coordinate[1]] = gameTable[index+1][coordinate[1]]
            gameTable[index][coordinate[1]].y = gameTable[index+1][coordinate[1]].y-1;
        }
        gameTable[6][coordinate[1]] = tmp;
        gameTable[6][coordinate[1]].y =  gameTable[6][coordinate[1]].y-1 ;
        console.log("tmp.monster  -  "+tmp.monster);
      }
// balra
      else if (coordinate[0]==4) {
        let tmp = extraTile
        console.log("tmp.monster  -  "+tmp.monster);
        extraTile = gameTable[6][coordinate[1]]
        extraTile.x = -1;
        extraTile.y = -1;

        for (let index = 5; index >=0 ; index--) {
            gameTable[index+1][coordinate[1]] = gameTable[index][coordinate[1]]
            gameTable[index+1][coordinate[1]].y = gameTable[index][coordinate[1]].y-1;
        }
        gameTable[0][coordinate[1]] = tmp;
        gameTable[0][coordinate[1]].y =  gameTable[0][coordinate[1]].y-1 ;
        console.log("tmp.monster  -  "+tmp.monster);
      }



      extraTileImage.src = `scoobylabirintus/utkartyak/${extraTile.image}`
      //extraTileImage.src = `scoobylabirintus/utkartyak/${extraTile.monster}`
      drawCanvas();

      whereCanTheCurrentPlayerGo();

    }

  }
function decodeTheButtons(num){
      let arr = []
        if (num < 20) {
            arr.push(1)
        } else if(num < 30){
            arr.push(2)
        }
        else if(num < 40){
            arr.push(3)
        }
        else if(num < 50){
            arr.push(4)
        }

        j = num - (arr[0]*10);
        arr.push(j);

        return arr;
      
  }
let canGo = []
function whereCanTheCurrentPlayerGo() {

   let cordX =playersArray[currentPlayer].Y;
   let cordY =playersArray[currentPlayer].X;
   let doorarray = gameTable[cordY][cordX].fieldArray;

  console.log("PLAYER l  "+cordX +" - "+ cordY);
    
  console.log("itt vagyok  - "+(cordX) + "-"+(cordY)+" : "+gameTable[cordX][cordY].fieldArray);

   canGo = [];

//jobbra
   if (doorarray[1] == 1 && cordY < 6) {

    console.log("vizsgálat jobbra - "+(cordX) + "-"+(cordY+1)+" : "+gameTable[cordY+1][cordX].fieldArray);
    
    if (gameTable[cordY+1][cordX].fieldArray[3] == 1) { 
      canGo.push([cordX,cordY+1]);
    }
     }
//balra
if (doorarray[3] == 1 && cordY > 0) {

  console.log("vizsgálat balra - "+(cordX) + "-"+(cordY-1)+" : "+gameTable[cordY-1][cordX].fieldArray);
  
  if (gameTable[cordY-1][cordX].fieldArray[1] == 1) { 
    canGo.push([cordX,cordY-1]);
  }
   }
//fel
if (doorarray[0] == 1 && cordX > 0) {

  console.log("vizsgálat fel - "+(cordX-1) + "-"+(cordY)+" : "+gameTable[cordY][cordX-1].fieldArray);
  
  if (gameTable[cordY][cordX-1].fieldArray[2] == 1) { 
    canGo.push([cordX-1,cordY]);
  }
   }

//le
if (doorarray[2] == 1 && cordX < 6) {

  console.log("vizsgálat fel - "+(cordX+1) + "-"+(cordY)+" : "+gameTable[cordY][cordX+1].fieldArray);
  
  if (gameTable[cordY][cordX+1].fieldArray[0] == 1) { 
    canGo.push([cordX+1,cordY]);
  }
   }

   //findAllOpenDoor(cordX, cordY);

    drawFreeWays();
}
function drawFreeWays() {
  console.log("drawFreeWays "+canGo);

  for (let index = 0; index < canGo.length; index++) {
    ctx.fillRect((canGo[index][1]*100)+40,(canGo[index][0]*100)+40,20,20); 
  }
}

  function playersTableFill() {

    gameStatTable.innerHTML = ""
    gameStatTable.innerHTML = playersArray.map(x => `<tr>
        <td style="color: white">${x.name}</td>
        <td><img src= "scoobylabirintus/players/player${x.number}${( (currentPlayer + 1 == x.number) ? "" : "bw" )}.png" width="100" height="100"></td>
        <td style="color: white">${parseInt(numberOfMonstersPerPlayer - x.monstersToCatch.length) +  "/" + parseInt(numberOfMonstersPerPlayer)}</td>
        <td><img src="scoobylabirintus/cards/${( (x.monstersToCatch.length == 0) ? "none" : x.currentMonster )}.png" width="130" height="170"></td>
         </tr>`).join("")

         
  }
  
  function giveHomeToOurLittleMonsters(){
      let tmparr = allMonsters;
  
        for (let index = 0; index < 21; index++) {
          tmparr.push("none");
        }
  
  
    tmparr = shuffle(tmparr);
    tmparr = shuffle(tmparr);

    // belerendezni egy tombbe
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i == 0 && (j == 0 || j == 6) || (i == 6 && (j == 0 || j == 6))) {
          monstersOnTable[i][j] = "none";
        } else{
          monstersOnTable[i][j] = tmparr.shift(); // ez elvileg leveszi az eslso elemet
        } 
        
      }
      
    }
    
  }
  
  function makeingARandomTileArray() {
  
  
    let count1 = 13;  //13
    let count2 = 15; // 15
    let count3 = 6; // 6
  
    let tmp1 = [[0,1,0,1],[1,0,1,0]];
    let tmp2 = [[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1]];
    let tmp3 = [[1,1,1,0],[0,1,1,1],[1,0,1,1],[1,1,0,1]];
  
  
    let random
    let tileArray = [];
  
    for (let index = 0; index < count1; index++) {
      random = Math.floor(Math.random() * 2)
  
      tileArray.push(tmp1[random]);
      
    }
    for (let index = 0; index < count2; index++) {
      random = Math.floor(Math.random() * 4)
  
      tileArray.push(tmp2[random]);
      
    }
    for (let index = 0; index < count3; index++) {
      random = Math.floor(Math.random() * 4)
  
      tileArray.push(tmp3[random]);
      
    }
  
    tileArray = shuffle(tileArray);
    return tileArray;
    
  }
  
  function makeingThePlayers(numberOfPlayers) {
  
    let monsterCards = ["blackknight", "catcreature", "charlie", "dracula", "futuremonster", "ghostclown", "ghostofeliaskingston", "headlesshorseman", "mantis", "zombie","miner", "mummy", "nofacezombie", "phantomracer", "phantomshadow","phantomvirus", "pterodactylghost", "ramblingghost", "redbears", "swampmonster","tarmonster", "voltghost", "witch", "witchdoctor"]
    monsterCards = shuffle(monsterCards);
  
    for (let i = 0; i < numberOfPlayers; i++) {
                        
      let player
      let mymonsterCards = []
  
      for(let ind = (i * numberOfMonstersPerPlayer); ind < ((i+1)*numberOfMonstersPerPlayer); ind++)
      {
        mymonsterCards.push(monsterCards[ind]);
      }
  
      switch(i) {
          case 0 :
            player = new Player(1, 0,0,numberOfMonstersPerPlayer, mymonsterCards )
              break;
          case 1:
              player = new Player(2, 0,6, numberOfMonstersPerPlayer, mymonsterCards)
              break;
          case 2:
              player = new Player(3, 6,0, numberOfMonstersPerPlayer, mymonsterCards)
              break;
          case 3:
              player = new Player(4, 6,6, numberOfMonstersPerPlayer, mymonsterCards)
              break;
      }
      playersArray.push(player);
  }
      return playersArray;
    
  }
  
  function makeExtraTile(tileArray) {
    let extraTileint = tileArray.shift();
    let extraTilestr = arrayToStr(extraTileint);
    extraTile = new Tile(-1,-1,`${extraTilestr}.png`,"none.png");
    extraTileImage.src = `scoobylabirintus/utkartyak/${extraTilestr}.png`
   
  }
  
  function extraTileRotate() {
    if (!gameOver) {
      let monsttmp = extraTile.monster;
      let tmparr = extraTile.fieldArray[0];
      extraTile.fieldArray[0] = extraTile.fieldArray[1];
      extraTile.fieldArray[1] = extraTile.fieldArray[2];
      extraTile.fieldArray[2] = extraTile.fieldArray[3];
      extraTile.fieldArray[3] = tmparr;
    
    
      extraTilestr = arrayToStr(extraTile.fieldArray);
      extraTile = new Tile(-1,-1,`${extraTilestr}.png`,`${monsttmp}`);
      extraTileImage.src = `scoobylabirintus/utkartyak/${extraTilestr}.png`
    }

  
  }
  
  function NewGame() {
    gameOver = false;
    
    //Kezdőértékek beállítása
    currentPlayer = 0
    shouldMoveField = true

    allMonsters = ["blackknight", "catcreature", "charlie", "dracula", "futuremonster", "ghostclown", "ghostofeliaskingston", "headlesshorseman", "mantis", "zombie","miner", "mummy", "nofacezombie", "phantomracer", "phantomshadow","phantomvirus", "pterodactylghost", "ramblingghost", "redbears", "swampmonster","tarmonster", "voltghost", "witch", "witchdoctor"]
    numberOfMonstersPerPlayer = 24 / numberOfPlayers
    //Canvas újra írása
    ctx.fillStyle = 'rgb(170, 104, 19)';
    ctx.fillRect(0,0, 700, 700)
  
    //Kezdőértékek újrainicializálása
    gameTable = new Array(7).fill().map(() => new Array(7).fill())
    fixPositions = new Array(4).fill().map(() => new Array(7).fill())
    img = new Image()
    
    monsterimg = new Image()
    monstersOnTable = new Array(7).fill().map(() => new Array(7).fill(""))
  
    monsterCards = shuffle(allMonsters);
  
    //szörnyik kiosztása
    giveHomeToOurLittleMonsters();
  
    //játékostömb nullázása
    playersArray = [];
      playersArray = makeingThePlayers(numberOfPlayers);           
      playersTableFill()
    // MOZGATHATÓ ELEMEK SORBARAKÁSA              
      let tileArray = makeingARandomTileArray();
      
    extraTile = new Tile(-1,-1,`none.png`,"none.png");
  makeExtraTile(tileArray);
                
  let tmpcounter = 0;

//gametable létrehozása
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {


//sarkak a jatekosokkal

if(i == 0 && (j == 0 || j == 6) || (i == 6 && (j == 0 || j == 6)))
{
         
   if(i == 0 && j == 0)
   {
       gameTable[i][j] = new Tile(i, j, `start0110.png`, `${monstersOnTable[i][j]}.png`)
   }
   
   else if(i == 0 && j == 6 )
   {
     if (numberOfPlayers>1) {
       gameTable[i][j] = new Tile(i, j, `start1100.png`, `${monstersOnTable[i][j]}.png`)
     } else{
       gameTable[i][j] = new Tile(i, j, `1100.png`, `${monstersOnTable[i][j]}.png`)
     }
     
   }
   
   else if(i == 6 && j == 0)
   {
     if (numberOfPlayers>2) {
       gameTable[i][j] = new Tile(i, j, `start0011.png`, `${monstersOnTable[i][j]}.png`)
     }else{
       gameTable[i][j] = new Tile(i, j, `0011.png`, `${monstersOnTable[i][j]}.png`)
     }
   }
   
   else if(i == 6 && j == 6)
   {
     if (numberOfPlayers >3) {
     gameTable[i][j] = new Tile(i, j, `start1001.png`, `${monstersOnTable[i][j]}.png`)
   }  else {
     gameTable[i][j] = new Tile(i, j, `1001.png`, `${monstersOnTable[i][j]}.png`)
   }  
 }
}
//fix elemek
  else if((j == 0 && (i == 2 || i == 4)) ||  (j == 2 && i == 4))
 {
     gameTable[i][j] = new Tile(i, j, `0111.png`, `${monstersOnTable[i][j]}.png`)
 }
 else if((j == 2 && (i == 0 || i == 2)) || j == 4 && i == 0)
 {
   gameTable[i][j] = new Tile(i, j, `1110.png`, `${monstersOnTable[i][j]}.png`)
 }
 else if((j == 4 && (i == 4 || i == 6)) || j == 2 && i == 6)
 {
   gameTable[i][j] = new Tile(i, j, `1011.png`, `${monstersOnTable[i][j]}.png`)
 }
 else if((j == 6 && (i == 2 || i == 4)) || (j == 4 && i == 2))
 {
   gameTable[i][j] = new Tile(i, j, `1101.png`, `${monstersOnTable[i][j]}.png`)
 }
// mozgathato elemek
else
{
  gameTable[i][j] = new Tile(i, j, `${arrayToStr(tileArray[tmpcounter])}.png`, `${monstersOnTable[i][j]}.png`)
  tmpcounter = tmpcounter+1;
}  
}
}

  drawCanvas();     
}

function drawCanvas(){

    for (let i = 0; i < 7; i++) {
       for (let j = 0; j < 7; j++) {
//kártyák
        img.src = `scoobylabirintus/utkartyak/${gameTable[i][j].image}`
        ctx.drawImage(img, i*100, j*100, 100, 100)
//szornyek        
       monsterimg.src = `scoobylabirintus/monsters/${gameTable[i][j].monster}`
       ctx.drawImage(monsterimg, i*100 + 20, j*100 + 20, 50, 70);
       }}
//jatekosok
       for (let index = 0; index < playersArray.length; index++) {
        monsterimg.src = `scoobylabirintus/players/player${index+1}.png`
        ctx.drawImage(monsterimg, (playersArray[index].X)*100 + 13, (playersArray[index].Y)*100 + 13, 74, 74);
       }

}

function checkGameOver()
  {    
      if(playersArray[currentPlayer].monstersToCatch.length == 0  //elfogytak a kárták
        && playersArray[currentPlayer].X == playersArray[currentPlayer].startTile[0]  //visszaért a helyére
        && playersArray[currentPlayer].Y == playersArray[currentPlayer].startTile[1])
      {

        console.log("VÉGEEEEE aJÁTÉKNAAAk  "+playersArray[currentPlayer].name);
          gameOver = true;
          document.querySelector("#winnerName").innerHTML = `${playersArray[currentPlayer].name} won the game😎!`
      }
  }
  
function didWeFindOurMonstie()
  {
  
      if(gameTable[playersArray[currentPlayer].X][playersArray[currentPlayer].Y].monster.split(".")[0] == playersArray[currentPlayer].currentMonster)
      {
          let tmp = playersArray[currentPlayer].monstersToCatch.shift();
          playersArray[currentPlayer].currentMonster = playersArray[currentPlayer].monstersToCatch[0];
          playersTableFill();
      }
  
  }

  canvas.addEventListener("keydown", function(e) {
if (!gameOver && canMove) {


  whereCanTheCurrentPlayerGo();


    console.log("player  X : "+playersArray[currentPlayer].X+" Y : "+playersArray[currentPlayer].Y);
    for (let index = 0; index < canGo.length; index++) {
      console.log("A cango indexén: "+index+"  Ez van   "+" - "+canGo[index]); 
    }

    //console.log("jobbr menésnél ezt vizsgálom - "+(playersArray[currentPlayer].X-1) +","+playersArray[currentPlayer].Y );
    //console.log("benne van e feltétel "+canGo.includes([(playersArray[currentPlayer].X+1)*,playersArray[currentPlayer].Y]));

    //console.log("itt állok mozgas elott : "+playersArray[currentPlayer].X+","+playersArray[currentPlayer].Y);

    if(e.keyCode == 37 ) 
    {
      if (isItAllowed(playersArray[currentPlayer].X -1,playersArray[currentPlayer].Y)) {

        playersArray[currentPlayer].X = playersArray[currentPlayer].X -1;
        drawCanvas();
      }

    }

    if(e.keyCode == 38 ) 
    {
      if (isItAllowed(playersArray[currentPlayer].X ,playersArray[currentPlayer].Y-1)) {

        playersArray[currentPlayer].Y = playersArray[currentPlayer].Y-1;
        drawCanvas();
      }
    }

    if(e.keyCode == 39 ) 
    {
      if (isItAllowed(playersArray[currentPlayer].X+1 ,playersArray[currentPlayer].Y)) {

        playersArray[currentPlayer].X = playersArray[currentPlayer].X + 1;
        
        drawCanvas();
      }
    }
    if(e.keyCode == 40 ) 
    {
      if (isItAllowed(playersArray[currentPlayer].X ,playersArray[currentPlayer].Y+1)) {

        playersArray[currentPlayer].Y = playersArray[currentPlayer].Y + 1;
        
        drawCanvas();
      }
    }

    //console.log("move utan itt vagyok: "+(playersArray[currentPlayer].X) +"-"+playersArray[currentPlayer].Y );
    //


    if(e.keyCode == 13 ) //enter 
    {
      didWeFindOurMonstie();
      checkGameOver();

      if (currentPlayer+1 == playersArray.length) {
        currentPlayer = 0;
      } else {
        currentPlayer += 1;
      }
      playersTableFill();
      canMove = false;
    }





}
    
})

function isItAllowed(wherex,wherey) {
  
let found = false;
let i = 0;
while (!found && canGo.length > i) {
  if(canGo[i][1] == wherex && canGo[i][0] == wherey){
    found = true;
  }
  i++;
}

return found;

}
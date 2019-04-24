const boardArea = document.querySelector('.container');
let compChoice = "";

//gamePlay()函数模块

function gamePlay() {
//列举所有赢的组合方式    
    const winStyles =    [[0,1,2],
                          [0,3,6],
                          [0,4,8],
                          [2,5,8],
                          [2,4,6],
                          [6,7,8],
                          [3,4,5],
                          [1,4,7]];
    
    //遍历每行中的每个元素，传递给innerarrValue
    function checkWinStyle() {
        let playerPointCount = 0;
        let computerPointCount = 0;
        for (let i = 0; i < winStyles.length; i++){
            playerPointCount = 0;
            computerPointCount = 0;

            let eachStyle = winStyles[i];
            for(let j = 0; j < eachStyle.length; j++) {
                let innerarrValue = eachStyle[j];
    //调用gameBoardHandler()函数下的getGameBoard()函数，取得【0-8】数列到gameArr
                let gameArr = gameBoardHandler.getGameBoard();
                if(gameArr[innerarrValue] == playerHandler.getPlayerChoice()) {
                    playerPointCount++;
                } else if (gameArr[innerarrValue] == computerHandler().getCompChoice()){
                    computerPointCount++;
                } else {
                    playerPointCount = 0;
                    computerPointCount = 0;
                }
                if(playerPointCount == 3 || computerPointCount === 3) {
                    if(playerPointCount == 3) {
                        playerPointCount = 0;
                        winner(true, eachArr);
                    }
                }
                else {
                    computerPointerCount = 0;
                    winner(false, eachArr)
                }
            }

        }
    }


}

function turnComplete() {
    checkWinStyle();
    if(gameBoardHandler.getAvailableMoves() == 0) {
        gameOver();
    } else {
        playerHandler.swapPlayerTurn();
    }
}

//高亮赢时的那一阵列
function winner (winner, eachArr) {
    highlight(eachArr, winner);
    gameOver();
}

function gameOver() {
    playerHandler.resetPlayer();
    playerHandler.swapPlayerTurn();
}

//如何实现高亮，遍历高亮阵列中每个元素，并添加高亮的类
function highlightWin(eachArr, win) {

    //Assign class to winning positions
    for(let i = 0; i < eachArr.length; i++) {
      let winningSpot = [eachArr[i]];
      let eachSpot = document.querySelector(`.spot${winningSpot}`);
      eachSpot.className += " winning-color";
      if(win){
        eachSpot.className += " color-win"
      } else {
        eachSpot.className += " color-lose"

      }
    }
  

  return  {turnComplete};
}


const gameBoardHandler = (() => {
    let gameBoard = [0,1,2,3,4,5,6,7,8];
    let availableMoves = 9;
    let reset = false;
    let resetBtn = document.querySelector(".game-reset");

    function renderBoard() {
        for(let i = 0; i < 9; i++) {
            if(reset) {
                let eachItem = document.querySelector(`.item${i}`);
                eachItem.classList.remove("winning-color");
                eachItem.classList.remove("color-win");
                eachItem.classList.remove("color-lose");
            
            //清空eachItem 引用元素的内容？
            while (eachItem.firstChild) {
                 eachItem.removeChild(eachItem.firstChild);
            }    
            //游戏板ui输出
            if(gameBoard[i] == "x") {
                let xItem = document.querySelector(`.item${i}`);
                xItem.innerHTML = "x";
            } else if (gameBoard[i] == "O") {
                let oItem = document.querySelector(`.item${i}`);
                oItem.innerHTML = "O";
            }
               
            }
        }
    }

     //使用侦听器（或处理程序）预定事件click,
     const addListeners = (() => {
        for (let i = 0; i < gameBoard.length; i++) {
            let itemReference = document.querySelector(`.item${i}`);
            itemReference.addEventListener("click",function(){
                alert("d");
                checkItem(gameBoard[i],i);
            });
        }

        resetBtn.addEventListener("click",function(){
            resetBoard();
        });

        disableRestart();
        
    });

    function checkItem (item, index) {
        if(item !== "X" && item !== "O"){
            if(playerHandler.getPlayerChoice() !== ""){
               setItem(index); 
            }
           return false; 
        }
      return true;  
    }
    
    function setItem (index) {
        if(playerHandler.isPlayerTurn()) {
            gameBoard[index] = playerHandler.getPlayerChoice();
        } else {
            gameBoard[index] = computerHandler().getComputerChoice();
        }
        renderBoard();
        availableMoves--;
        completeTurn();
    };

    function completeTurn() {
        gamePlay().turnComplete();
    }
    
    function disableRestart() {
        resetBtn.style.display = "none";
    }

    function enableRestart () {
        resetBtn.style.display = "block";
    }

    function getGameBoard() {
        return gameBoard;
    }

    function resetBoard() {
        availableMoves = 9;
        gameBoard = [0,1,2,3,4,5,6,7,8];
        playerHandler.resetPlayer();
        playerHandler.enableBtn();
        disableRestart();
        reset = true;
        for(let i = 0; i < 9 ;i ++) {
            renderBoard();
        }
    }
    return {
        getGameBoard,
        checkSpot,
        getAvailableMoves,
        resetBoard,
        enableRestart
    };
}) ();

//用户点击按钮，决定用户和电脑角色分配，之后禁用按钮
const playerHandler = (() => {
    let playerChoice = "";
    let playerTurn = true;
    let selectBtns = document.querySelector(".btn-container");

    const playerBtnListener = (() =>{
        let xButton = document.querySelector("#x-btn");
        let oButton = document.querySelector("#o-btn");

        xButton.addEventListener("click", function () {
            setPlayer("X");
            computerHandler().setCompChoice("O");
            disableBtn();
            playerturn = true;
        })

        oButton.addEventListener("click",function() {
            setPlayer("O");
            computerHandler().setCompChoice("X");
            disableBtn();
        })
    })();


    function disableBtn() {
        selectBtns.style.display = "none";
//展示restart按钮
        gameBoardHandler.enableRestart();
    }

    function enableBtn () {
        selectBtns.style.display = "block";
    }

    function setPlayer(choice) {
        playerChoice = choice;
    }

    function getPlayerChoice() {
        return playerChoice;
    }

    function resetPlayer() {
        playerChoice = "";
        playerTurn = true;
    }

    function swapPlayerTurn() {
        if(playerTurn) {
            playerTurn = false;
            setTimeout(function() {
                computerHandler().compTurn;},200);}
                else {
                    playTurn = true;
                }
    }

    function isPlayerTurn() {
        return playerTurn;
    }

    return {
        getPlayerChoice,
        enableBtn,
        swapPlayerTurn,
        isPlayerTurn,
        resetPlayer,
        playerTurn
    }
})();

function computerHandler() {
    let continueTurn = true;

    function setComputerChoice(choice) {
        computerChoice = choice;
    }

    function getComputerChoice() {
        return computerChoice;
    }

    function computerTurn() {
        if(gameBoardHandler.getAvailableMoves() !== 0) {
            while(comtinueTurn) {
                let computerStyle = Math.floor(Math.random() * 9);
                let gameArr = gameBoardHandler.getGameBoard();
                continieTurn = gameBoardHandler.checkItem(gameArr[computerStyle], computerStyle);

            }
        }
    }

    function swapContinueTurn () { 
        if(continueTurn) {
            continieTurn = fales;
        }else {
            continueTurn = true;
        }
    }

    return {
        computerTurn,
        getCompChoice,
        setComChoice,
        swapContinieTurn
    }

}




































































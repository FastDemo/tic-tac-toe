var turn = 0;
var globalSeconds = 0;

var runOne = true;


function startGame(event) {
    event.target.classList.add('invisible');
    const turnElement = document.querySelector('.turn');
    turnElement.classList.remove('invisible');

    turnElement.innerText = turn == 0? 'Current Turn: X' : 'Current Turn: O';

    function isWin(classList, temp) {
        for (let i = 1; i < classList.length; i++) {
            let count = 0;
            const cells = document.querySelectorAll(`.${classList[i]}`)
            for (let j = 0; j < cells.length; j++) {
                if(cells[j].innerText === temp) {
                    count++;
                }
            }
            if (count === 5) {
                return true;
            }
        }
        return false;
    }

    function addSymbol(event) {
        if (turn === 0) {
            event.target.innerText = 'X';
            turn = 1;
        } else {
            event.target.innerText = 'O';
            turn = 0;
        }
        turnElement.innerText = turn == 0? 'Current Turn: X' : 'Current Turn: O';
        event.target.disabled = true;

        if(isWin(event.target.classList, event.target.innerText)) {
            console.log('Win');
            const victory = document.querySelector('.turn');
            victory.innerText = 'Victory!'
            clearInterval(timerInterval);
        }
     }
    
    function callBackFn(node) {
        node.onclick = addSymbol;
    }
    
    const cells = document.querySelectorAll(".cell");
    
    cells.forEach(callBackFn);
       
    const timer = document.querySelector('.timer');
    
    function handler() {
        globalSeconds++;
        let minutes = Math.floor(globalSeconds / 60).toString();
        let seconds = (globalSeconds % 60).toString();
    
        minutes = minutes.length == 2? minutes : ('0' + minutes);
        seconds = seconds.length == 2? seconds : ('0' + seconds);
    
        timer.innerText = `${minutes}:${seconds}`;
    }
    
    if (runOne) {
        var timerInterval = setInterval(handler, 1000);
        runOne = false;
    }
}

const start = document.querySelector('.start');

start.onclick = startGame;


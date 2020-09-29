const board = [...document.querySelectorAll('.board-element')];
const Player = document.querySelector('#P');
const Comp = document.querySelector('#C');
const tie = document.querySelector('#draw');
const newgame = document.querySelector('#ng');
const pTurn = document.querySelector('#p_turn');
const cTurn = document.querySelector('#c_turn');
const start = document.querySelector('#sg');
const x = document.querySelector('#X');
const o = document.querySelector('#O');

let marker;
let game = true;
let origBoard = new Array(1,2,3,4,5,6,7,8,9);

let p = 'X';
let c = 'O';
let turn;
let random;

start.addEventListener('click', () => {
    game = true;
    chooseTurn();
    start.style.display = 'none';
    if(turn == 'Comp')
    {
        compTurn();
    }
});

newgame.addEventListener('click', () => {
    game = true;
    Player.classList.remove('show');
    Comp.classList.remove('show');
    tie.classList.remove('show');
    board.forEach(element => {
        element.innerHTML = '';
    });
    newgame.style.display = 'none';
    origBoard = Array(1,2,3,4,5,6,7,8,9);
    chooseTurn();
    if(turn == 'Comp')
    {
        compTurn();
    }
});

const removeMsg = () => {
    pTurn.classList.remove('show');
    cTurn.classList.remove('show'); 
    x.style.display = 'none';
    o.style.display = 'none';
}

const chooseTurn = () => {
    removeMsg();
    random = Math.round(Math.random())+1;
    if(random == 1)
    {
        turn = `Player`;
        pTurn.classList.add('show');
    } else {
        turn = `Comp`
        cTurn.classList.add('show');
    }
}

const gameOver = () => {
    game = false;
    newgame.style.display = 'block';
}

const winGame = mark => {
    if(mark == origBoard[0] && origBoard[0] == origBoard[1] && origBoard[1] == origBoard[2])
    {
        return true;
    } else if (mark == origBoard[3] && origBoard[3] == origBoard[4] && origBoard[4] == origBoard[5]){
        return true;
    } else if (mark == origBoard[6] && origBoard[6] == origBoard[7] && origBoard[7] == origBoard[8]){
        return true;
    } else if (mark == origBoard[0] && origBoard[0] == origBoard[4] && origBoard[4] == origBoard[8]){
        return true;
    } else if (mark == origBoard[2] && origBoard[2] == origBoard[4] && origBoard[4] == origBoard[6]){
        return true;
    } else if (mark == origBoard[0] && origBoard[0] == origBoard[3] && origBoard[3] == origBoard[6]){
        return true;
    } else if (mark == origBoard[1] && origBoard[1] == origBoard[4] && origBoard[4] == origBoard[7]){
        return true;
    } else if (mark == origBoard[2] && origBoard[2] == origBoard[5] && origBoard[5] == origBoard[8]){
        return true;
    } else {
        return false;
    }
}

const fullBoard = (origBoard) => {
    let x = 1;
    origBoard.forEach(element => {
        if(typeof element == 'number')
        {
            x = 0;
            return false;
        }
    });
    if(x==1)
    {
        return true;
    }
}

const availSpaces = (board) => {
    const empty = [];
    board.forEach(element => {
        if(typeof element == 'number')
        {
            empty.push(parseInt(element));
        }
    });
    empty.sort();
    return empty;
}

board.forEach(element => {
        element.addEventListener('click', () => {
            if(game && element.innerHTML == '' && turn == 'Player')
            {  
                removeMsg();
                marker = `<span class="${p}">${p}</span>`;
                element.insertAdjacentHTML('afterbegin', marker);
                origBoard[parseInt(element.id)-1] = p;
                if(winGame(p))
                {  
                    Player.classList.add('show');
                    gameOver();
                } else if(fullBoard(origBoard)) {
                    gameOver();
                    tie.classList.add('show');
                } else {
                    compTurn();
                }
            }
        });
});

const compTurn = () => {
    let realPos;
    marker = `<span class="${c}">${c}</span>`;
    let pos = minmax(origBoard, 'Comp');
    if(pos.index == 3){
        realPos = 0;
    } else if (pos.index == 1){
        realPos = 2;
    } else if(pos.index == 6){
        realPos = 3;
    } else if(pos.index == 4){
        realPos = 5;
    } else if(pos.index == 9){
        realPos = 6;
    } else if(pos.index == 7){
        realPos = 8;
    } else {
        realPos = pos.index-1;
    }
    board[realPos].insertAdjacentHTML('afterbegin', marker);
    origBoard[pos.index-1] = c;
    if(winGame(c))
    {  
        Comp.classList.add('show');
        gameOver();
    } else if(fullBoard(origBoard)) {
        gameOver();
        tie.classList.add('show');
    } else {
        turn = 'Player';
    }
}

const minmax = (origBoard, player) => {
    let emptySpots = availSpaces(origBoard);

    if(winGame(p)){
        return {score: -10};
    } else if(winGame(c)) {
        return {score: 20};
    } else if(fullBoard(origBoard)){
        return {score: 0};
    }

    let moves = [];
    emptySpots.forEach(element => {
        let move = {};
        move.index = origBoard[element-1];
        if(player == 'Player')
        {
            origBoard[element-1] = 'X';
            let result = minmax(origBoard, 'Comp');
            move.score = result.score;
        } else if (player == 'Comp') {
            origBoard[element-1] = 'O';
            let result = minmax(origBoard, 'Player');
            move.score = result.score;
        }

        origBoard[element-1] = move.index;
        moves.push(move); 
    });

    let bestMove;
    if(player == 'Comp')
    {
        let bestScore = -999;
        moves.forEach(element => {
            if(element.score > bestScore)
            {
                bestScore = element.score;
                bestMove = element;
            }
        });
    } else {
        let bestScore = 999;
        moves.forEach(element => {
            if(element.score < bestScore)
            {
                bestScore = element.score;
                bestMove = element;
            }
        });
    }
    return bestMove;
}

const boardel_1 = document.querySelector('#el1');
const boardel_2 = document.querySelector('#el2');
const boardel_3 = document.querySelector('#el3');
const boardel_4 = document.querySelector('#el4');
const boardel_5 = document.querySelector('#el5');
const boardel_6 = document.querySelector('#el6');
const boardel_7 = document.querySelector('#el7');
const boardel_8 = document.querySelector('#el8');
const boardel_9 = document.querySelector('#el9');
const Pl1 = document.querySelector('#P1');
const Pl2 = document.querySelector('#P2');
const tie = document.querySelector('#draw');
const newgame = document.querySelector('#ng');
const p1Turn = document.querySelector('#p1_turn');
const p2Turn = document.querySelector('#p2_turn');
const start = document.querySelector('#sg');
const x = document.querySelector('#X');
const o = document.querySelector('#O');

let marker;
let game = true;
const board = new Array(boardel_1, boardel_2, boardel_3, boardel_4, boardel_5, boardel_6, boardel_7, boardel_8, boardel_9);

let p1 = 'X';
let p2 = 'O';
let turn;
let random;

const removeMsg = () => {
    p1Turn.classList.remove('show');
    p2Turn.classList.remove('show'); 
    x.style.display = 'none';
    o.style.display = 'none';
}

const chooseTurn = () => {
    removeMsg();
    random = Math.round(Math.random())+1;
    turn = `Player ${random}`;
    if(random == 1)
    {
        p1Turn.classList.add('show');
    } else {
        p2Turn.classList.add('show');
    }
}

const gameOver = () => {
    game = false;
    newgame.style.display = 'block';
}

start.addEventListener('click', () => {
    chooseTurn();
    start.style.display = 'none';
});

board.forEach(element => {
        element.addEventListener('click', () => {
            if(game && element.innerHTML == '')
            {  
                removeMsg();
                if(turn == 'Player 1')
                {
                    marker = `<span class="${p1}">${p1}</span>`;
                    element.insertAdjacentHTML('afterbegin', marker);
                    if(winGame(p1))
                    {
                        
                        Pl1.classList.add('show');
                        gameOver();
                    } else if(fullBoard()) {
                        gameOver();
                        tie.classList.add('show');
                    } else {
                        turn = 'Player 2';
                    }
                } else if (turn == 'Player 2') {
                    marker = `<span class="${p2}">${p2}</span>`;
                    element.insertAdjacentHTML('afterbegin', marker);
                    if(winGame(p2))
                    {
                        Pl2.classList.add('show');
                        gameOver();
                    } else if(fullBoard()) {
                        gameOver();
                        tie.classList.add('show');
                    } else {
                        turn = 'Player 1'
                    }
                }
            }
        });
});

const winGame = mark => {
    if(mark == boardel_1.textContent && boardel_1.textContent == boardel_2.textContent && boardel_2.textContent == boardel_3.textContent)
    {
        return true;
    } else if (mark == boardel_4.textContent && boardel_4.textContent == boardel_5.textContent && boardel_5.textContent == boardel_6.textContent){
        return true;
    } else if (mark == boardel_7.textContent && boardel_7.textContent == boardel_8.textContent && boardel_8.textContent == boardel_9.textContent){
        return true;
    } else if (mark == boardel_1.textContent && boardel_1.textContent == boardel_5.textContent && boardel_5.textContent == boardel_9.textContent){
        return true;
    } else if (mark == boardel_3.textContent && boardel_3.textContent == boardel_5.textContent && boardel_5.textContent == boardel_7.textContent){
        return true;
    } else if (mark == boardel_1.textContent && boardel_1.textContent == boardel_4.textContent && boardel_4.textContent == boardel_7.textContent){
        return true;
    } else if (mark == boardel_2.textContent && boardel_2.textContent == boardel_5.textContent && boardel_5.textContent == boardel_8.textContent){
        return true;
    } else if (mark == boardel_3.textContent && boardel_3.textContent == boardel_6.textContent && boardel_6.textContent == boardel_9.textContent){
        return true;
    } else {
        return false;
    }
}

newgame.addEventListener('click', () => {
    game = true;
    Pl1.classList.remove('show');
    Pl2.classList.remove('show');
    tie.classList.remove('show');
    board.forEach(element => {
        element.innerHTML = '';
    });
    newgame.style.display = 'none';
    chooseTurn();
});

const fullBoard = () => {
    let x = 1;
    board.forEach(element => {
        if(element.textContent == '')
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


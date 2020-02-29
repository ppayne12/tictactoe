'use strict';
const X = true;
const O = false;


const gameBoard = (() => {
    'use strict';
    let _gameBoard = ['', '', '', '', '', '', '', '', ''];


    function reset() {
        _gameBoard = ['', '', '', '', '', '', '', '', ''];
    }

    function addMove(player, position) {
        _gameBoard[position] = player;
    }

    function getBoard() {
        return _gameBoard;
    }

    return {
        reset,
        addMove,
        getBoard
    };
})();

const game = (() => {
    'use strict';
    let _playerTurn;
    let _playing;
    let _player1Score = 0;
    let _player2Score = 0;
    let _singlePlayer;


    function _checkStatus() {
        let game = gameBoard.getBoard();
        let checkPiece = game[0];
        if (checkPiece !== '') {

            //3 checks
            if (checkPiece === game[1] && checkPiece === game[2]) {
                displayController.drawWinLine(0);
                return (checkPiece ? 'X' : 'O');
            }
            if (checkPiece === game[3] && checkPiece === game[6]) {
                displayController.drawWinLine(1);
                return (checkPiece ? 'X' : 'O');
            }
            if (checkPiece === game[4] && checkPiece === game[8]) {
                displayController.drawWinLine(2);
                return (checkPiece ? 'X' : 'O');
            }

        }
        checkPiece = game[1];

        if (checkPiece !== '') {
            //1 check

            if (checkPiece === game[4] && checkPiece === game[7]) {
                displayController.drawWinLine(3);
                return (checkPiece ? 'X' : 'O');
            }
        }

        checkPiece = game[2];

        if (checkPiece !== '') {
            //2 checks
            if (checkPiece === game[4] && checkPiece === game[6]) {
                displayController.drawWinLine(4);
                return (checkPiece ? 'X' : 'O');
            }
            if (checkPiece === game[5] && checkPiece === game[8]) {
                displayController.drawWinLine(5);
                return (checkPiece ? 'X' : 'O');
            }
        }

        checkPiece = game[3];

        if (checkPiece !== '') {
            //1 checks
            if (checkPiece === game[4] && checkPiece === game[5]) {
                displayController.drawWinLine(6);
                return (checkPiece ? 'X' : 'O');
            }
        }

        checkPiece = game[6];

        if (checkPiece !== '') {
            //1 checks
            if (checkPiece === game[7] && checkPiece === game[8]) {
                displayController.drawWinLine(7);

                return (checkPiece ? 'X' : 'O');
            }
        }

        for (let i = 0; i < 9; i++) {
            if (game[i] === '') {
                return false;
            }
        }

        return 'T';


    }

    function turn() {
        if (!getIsPlaying()) {
            return;
        }

        if ((gameBoard.getBoard()[+this.id] !== '') && !(getPlayMode() && getPlayersTurn() === O)) {
            return;
        }

        if (getPlayMode() && getPlayersTurn() === O) {
            gameBoard.addMove(getPlayersTurn(), +computerTurn())
        } else {
            gameBoard.addMove(getPlayersTurn(), +this.id);
        }
        setPlayersTurn(!getPlayersTurn());
        displayController.updateBoard();
        let result = _checkStatus();
        if (result) {
            setIsPlaying(false);
            if (result === "X") {
                displayController.updateScore(1, ++_player1Score);

            } else if (result === "O") {
                displayController.updateScore(2, ++_player2Score);
            } else {
                console.log('Its a tie');

            }
        }

        if (getPlayMode() && getPlayersTurn() === O) {
            turn.call(this);
        }
    }

    function getPlayersTurn() {
        return _playerTurn;
    }

    function setPlayersTurn(turn) {
        let player1 = document.querySelector(".left");
        let player2 = document.querySelector(".right");

        if (turn == X) {
            player2.classList.remove("glowing");
            player1.classList.add("glowing");
        } else {
            player1.classList.remove("glowing");
            player2.classList.add("glowing");
        }
        _playerTurn = turn;

    }

    function setIsPlaying(play) {
        _playing = play;
    }

    function getIsPlaying() {
        return _playing;
    }

    function computerTurn() {
        let board = gameBoard.getBoard();
        let count = board.reduce((total, piece) => {
            return total + (piece === '' ? 0 : 1);
        }, 0);
        let ran = Math.floor(Math.random() * (9 - count));
        let pos = 0;
        let i;
        //find random free spot in array
        for (i = 0; i < 9; i++) {
            if (board[i] !== '') {
                continue;
            }

            if (pos === ran) {
                break;
            }

            pos++;

        }

        return i;
    }

    function getPlayMode() {
        return _singlePlayer;
    }

    function resetScore() {
        _player1Score = 0;
        _player2Score = 0;
    }

    function setPlayMode(mode) {
        _singlePlayer = mode;
    }

    return {
        setIsPlaying,
        getIsPlaying,
        getPlayersTurn,
        setPlayersTurn,
        getPlayMode,
        setPlayMode,
        resetScore,
        turn,
        computerTurn
    };
})();


const displayController = (() => {
    'use strict';

    function togglePlayers() {
        const player2 = document.querySelector("#player2");
        //const diff = document.querySelector("#diff");
        if (this.value === "option2") {
            player2.style.display = "block";
            //  diff.style.display = "none";
        } else {
            player2.style.display = "none";
            //   diff.style.display = "block";
        }
    }

    function drawWinLine(line) {
        //0 = top hor
        //1 = left vert
        //2 = diag 1
        //3 = mid vert
        //4 = diag 2
        //5 = right vert
        //6 = mid hor
        //7 = bottom hor
        switch (line) {
            case 0:
                document.querySelector(".hor1").style.display = 'block';
                break;
            case 1:
                document.querySelector(".vert1").style.display = 'block';
                break;
            case 2:
                document.querySelector(".diag1").style.display = 'block';
                break;
            case 3:
                document.querySelector(".vert2").style.display = 'block';
                break;
            case 4:
                document.querySelector(".diag2").style.display = 'block';
                break;
            case 5:
                document.querySelector(".vert3").style.display = 'block';
                break;
            case 6:
                document.querySelector(".hor2").style.display = 'block';
                break;
            case 7:
                document.querySelector(".hor3").style.display = 'block';
                break;
        }
    }

    function updateScore(player, score) {
        if (player === 1) {
            document.querySelector("#playerScore").innerText = score;
        } else {
            document.querySelector("#computerScore").innerText = score;
        }
    }

    function addEvents() {
        const toggleTwoPlayer = document.querySelector("#double");
        const onePlayerToggle = document.querySelector("#single");
        const play = document.querySelector("#play");
        const restart = document.querySelector("#restart");
        const td = document.querySelectorAll('td');

        td.forEach(element => {
            element.addEventListener('click', game.turn);
        });
        toggleTwoPlayer.addEventListener('change', displayController.togglePlayers);
        onePlayerToggle.addEventListener('change', displayController.togglePlayers);
        play.addEventListener('click', displayController.startGame);
        restart.addEventListener('click', displayController.restart);


    }

    function startGame() {
        const playerOne = document.querySelector("#player-one-name");
        const singlePlayerMode = document.querySelector("#single");
        //   const difficulty = document.querySelector("#difficulty");
        const playerTwo = document.querySelector("#player-two-name");
        const restart = document.querySelector("#restart");
        //add some error checking for populated fields
        gameBoard.reset();
        game.resetScore();
        displayController.updateScore(1, 0);
        displayController.updateScore(2, 0);
        displayController.restart();

        if (singlePlayerMode.checked) {
            document.querySelector("#playerOneName").innerText = playerOne.value;
            document.querySelector("#playerTwoName").innerText = "Computer";
            game.setPlayMode(true);

            //do something single player related
        } else {
            document.querySelector("#playerOneName").innerText = playerOne.value;
            document.querySelector("#playerTwoName").innerText = playerTwo.value;

            game.setPlayMode(false);
            //do something two player related
        }

        playerOne.value = '';
        playerTwo.value = '';
        //difficulty.value = '';
        //singlePlayerMode.checked = true;
        restart.disabled = false;


        $('#newGameModal').modal('hide');
    }



    function restart() {
        gameBoard.reset();
        game.setIsPlaying(true);
        let lines = document.querySelectorAll("line");
        lines.forEach(l => l.style.display = 'none')
        game.setPlayersTurn(Boolean(Math.round(Math.random())));
        updateBoard();
    }

    function updateBoard() {
        let board = gameBoard.getBoard();
        let boardPiece;
        for (let i = 0; i < 9; i++) {
            boardPiece = document.getElementById(`${i}`);
            boardPiece.innerText = '';
            if (board[i] !== '') {
                if (board[i] === X) {
                    boardPiece.innerText = "X";
                } else {
                    boardPiece.innerText = "O";
                }
            }
        }
    }

    return {
        togglePlayers,
        drawWinLine,
        addEvents,
        restart,
        updateScore,
        startGame,
        updateBoard
    };
})();

const Player = (name) => {
    let score = 0;


    const getScore = () => score;
    const getName = () => name;
    const incrementScore = () => ++score;


    return { getScore, getName, incrementScore }
};


displayController.addEvents();





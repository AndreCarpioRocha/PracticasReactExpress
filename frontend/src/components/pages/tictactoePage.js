import { useState } from "react"
import { Header } from "../header/header"
import { Board } from "../tictactoe/board"
import { Square } from "../tictactoe/square"
import { MainTitle } from "../titles/mainTitle"
import "./tictactoePage.css"
import { CurrentTurnDisplay } from "../tictactoe/currentTurnDisplay"
import { ResulBanner } from "../tictactoe/resultBanner"

const TURNS = {
    x: "⭐",
    o: "⚪"
}

export const TictactoePage = () => {

    const [boardState, setBoardState] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.x)
    const [gameFinished, setGameFinished] = useState(false);
    const [visibleBanner, setVisibleBanner] = useState(false)

    const checkSquare = (index) => {
        if (gameFinished) return;
        if (boardState[index] != null) return;

        setBoardState(prevElement => {
            let newBoard = structuredClone(prevElement);
            newBoard[index] = turn;
            if (checkWinner(newBoard)) {
                setGameFinished(true)
                document.querySelector(".resultBanner .title").textContent = "GANADOR";
                document.querySelector(".resultBanner .simbol").textContent = turn;
                setVisibleBanner(true)
            }
            return newBoard;
        })

        

        setTurn(prevElement => {
            return prevElement === TURNS.x ? TURNS.o : TURNS.x
        })

    }

    const checkWinner = (board) => {
        let WinnerPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let index = 0; index < WinnerPositions.length; index++) {
            const element = WinnerPositions[index];
            if (board[element[0]] != null && board[element[0]] === board[element[1]] && board[element[0]] === board[element[2]]) {
                return true;
            }
        }
        return false;
    }

    const resetGame = () => {
        setBoardState(Array(9).fill(null))
        setTurn(TURNS.x)
        setGameFinished(false)
    }




    return (
        <>
            <Header></Header>
            <MainTitle title="Tic Tac Toe"></MainTitle>
            <CurrentTurnDisplay turn={turn}></CurrentTurnDisplay>
            <div className="gameContainer">
                <Board>
                    {
                        boardState.map((element, index) => {
                            return (
                                <Square key={index} simbolo={element} checkSquare={() => { checkSquare(index) }} ></Square>
                            )
                        })
                    }
                </Board>
            </div>
            <button onClick={resetGame}>Reset Game</button>

            <ResulBanner gameFinished = {gameFinished}  visibleBanner = {visibleBanner} setVisibleBanner = {setVisibleBanner}></ResulBanner>

        </>
    )
}
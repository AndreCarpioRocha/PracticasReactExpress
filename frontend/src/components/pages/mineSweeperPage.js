import { useEffect, useRef, useState } from "react"
import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"


import "./mineSweeperPage.css"
import { Footer } from "../footer/footer"
import { ResulBanner } from "../tictactoe/resultBanner"

export const MineSweeperPage = () => {

    const MARKS = {
        HIDE: "H",
        REVEAL: "R",
        MINE: "M"
    }

    const DIFFICULTY = { // [rows x columns] % percent
        EASY: 0.10,
        INTERMEDIATE: 0.25,
        HARD: 0.35
    }

    var boardAux = useRef(null)
    const gameFinished = useRef(false);

    const [difficultySelected, setDifficultySelected] = useState(DIFFICULTY.EASY)
    const [rows, setRows] = useState(10)
    const [columns, setColumns] = useState(10)
    const [minesCount, setMinesCount] = useState(Math.floor(rows * columns * difficultySelected))
    const [board, setBoard] = useState(null)
    const [availableFlags, setAvailableFlags] = useState(0);

    const [bannerResult, setBannerResult] = useState(false)
    const [bannerResultTitle, setBannerResultTitle] = useState("")
    const [bannerResultSimbol, setBannerResultSimbol] = useState("")

    const availableSquares = (board) => {
        let res = []
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[0].length; column++) {
                if (board[row][column].content !== MARKS.MINE) {
                    res.push({ row: row, column: column })
                }
            }
        }
        return res
    }

    const placeMines = () => {
        let newBoard = new Array(rows).fill(null).map(() => {
            return new Array(columns).fill(null).map(element => {
                return {
                    status: MARKS.HIDE,
                    content: "",
                    flag: false,
                    explode: false
                }
            })
        })
        let minesLaid = 0;
        for (let i = 0; i < minesCount; i++) {
            let availablePositions = availableSquares(newBoard);
            if (availablePositions.length > 0) {
                let pos = availablePositions[Math.floor(Math.random() * availablePositions.length)]
                newBoard[pos.row][pos.column].content = MARKS.MINE;
                minesLaid++;
            } else {
                console.log(`${minesLaid} mines laid in a board of ${rows}x${columns} (${rows * columns})`)
                setMinesCount(minesLaid)
            }
        }
        setAvailableFlags(minesLaid)
        setBoard(newBoard)
    }

    useEffect(() => {
        placeMines()
    }, [])

    const getClassNameSquare = (square) => {
        if (square.status === MARKS.HIDE) {
            if (square.flag) {
                return "hideSquare flag"
            }
            return "hideSquare"
        }

        if (square.status === MARKS.REVEAL) {
            if (!isNaN(parseInt(square.content))) {
                return `revealSquare N${square.content}`
            }
            if (square.content === MARKS.MINE) {
                if (square.explode) {
                    return "revealSquare mine explode"
                }
                return "revealSquare mine"
            }
        }
        return "";
    }




    const revealSquare = ({ row, column }) => {
        if (boardAux.current[row][column].status !== MARKS.HIDE) {
            // console.log("The square is alredy reveal")
            return
        }

        if (boardAux.current[row][column].flag) {
            console.log("The square has a flag")
            return
        }

        boardAux.current[row][column].status = MARKS.REVEAL;

        if (boardAux.current[row][column].content === MARKS.MINE) {

            for (let i = 0; i < boardAux.current.length; i++) {
                for (let j = 0; j < boardAux.current[0].length; j++) {
                    if (boardAux.current[i][j].content === MARKS.MINE && !boardAux.current[i][j].flag) {
                        boardAux.current[i][j].status = MARKS.REVEAL;
                    }
                }
            }

            boardAux.current[row][column].explode = true;
            gameFinished.current = true;
            setBannerResult(true)
            setBannerResultTitle("GAME OVER")
            setBannerResultSimbol("😟")
            return
        }

        let borderSquaresResult = borderSquares({ row, column });

        let borderMines = 0;

        for (let i = 0; i < borderSquaresResult.length; i++) {
            const element = borderSquaresResult[i];
            if (boardAux.current[element.row][element.column].content === MARKS.MINE) {
                borderMines++;
            }
        }

        boardAux.current[row][column].content = borderMines;

        if (borderMines > 0) {
            return
        }

        for (let i = 0; i < borderSquaresResult.length; i++) {
            const element = borderSquaresResult[i];
            revealSquare({ row: element.row, column: element.column })
        }

    }

    const pressSquare = (indexRow, indexColumn) => {
        if (gameFinished.current) { return }
        boardAux.current = structuredClone(board);
        revealSquare({ row: indexRow, column: indexColumn });
        setBoard(boardAux.current);
        if (!gameFinished.current) {
            if (verifyVictory(boardAux.current)) {
                setBannerResult(true)
                setBannerResultSimbol("🥳")
                gameFinished.current = true;
                setBannerResultTitle("VICTORY !!!")
            }
        }
    }

    const borderSquares = ({ row, column }) => {
        let squares = [];
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
            for (let j = Math.max(0, column - 1); j <= Math.min(column + 1, columns - 1); j++) {
                if (!(j === column && i === row)) { // Evita incluir la posición central
                    squares.push({ row: i, column: j });
                }
            }
        }
        return squares;
    };

    const layFlag = (indexRow, indexColumn) => {
        if (gameFinished.current) { return }
        if (board[indexRow][indexColumn].status === MARKS.HIDE) {
            let newBoard = structuredClone(board)
            let auxFlag = newBoard[indexRow][indexColumn].flag ? 1 : -1;
            newBoard[indexRow][indexColumn].flag = !newBoard[indexRow][indexColumn].flag
            setBoard(newBoard)
            setAvailableFlags(availableFlags + auxFlag);
        }
    }

    const verifyVictory = (board) => {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c].status === MARKS.HIDE && board[r][c].content !== MARKS.MINE) {
                    return false;
                }
            }
        }
        return true;
    }

    const resetGame = () => {
        console.log("reset!!!!!!!!!")
        boardAux.current = null
        gameFinished.current = false
        setMinesCount(Math.floor(rows * columns * difficultySelected))
        setBoard(null)
        setAvailableFlags(0)
        setBannerResult(false)
        setBannerResultTitle("")
        setBannerResultSimbol("")
        placeMines()
    }


    return (
        <>
            <Header>

            </Header>

            <MainTitle title="MineSweeper Game"></MainTitle>

            <p>Mines: {minesCount} </p>
            <p>Board: [{rows} - {columns} ] ({rows * columns})</p>
            <p>Difficulty: {difficultySelected * 100}% mines</p>




            <div className="boardContainer">
                <div className="headerBoard">
                    <div className="flagsSign">
                        <p>{availableFlags}</p>
                    </div>

                    <div className="faceSign" onClick={resetGame}>
                        <p >😎</p>
                    </div>

                    <div className="timer">
                        <p>
                            00:00
                        </p>
                    </div>
                </div>
                <div className="boardMineSweeper">
                    {
                        board ? board.map((elementRow, indexRow) => {
                            return (
                                <div key={`row-${indexRow}`} className="row">
                                    {
                                        elementRow.map((elementColumn, indexColumn) => {
                                            return (
                                                <div
                                                    key={`row-${indexRow}-column-${indexColumn}`}
                                                    className={"square " + getClassNameSquare(elementColumn)}
                                                    onClick={() => { pressSquare(indexRow, indexColumn) }}
                                                    onContextMenu={(e) => { e.preventDefault(); layFlag(indexRow, indexColumn); }}
                                                >
                                                    <p>{elementColumn.status === MARKS.REVEAL ? elementColumn.content : ""}</p>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>

            <ResulBanner title={bannerResultTitle} simbol={bannerResultSimbol} visibleBanner={bannerResult} setVisibleBanner={setBannerResult} ></ResulBanner>

            <Footer></Footer>
        </>
    )

}
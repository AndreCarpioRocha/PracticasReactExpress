import { useEffect, useRef, useState } from "react"
import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"
import HIDE_SQUARE from "../../images/imagesMineSweeper/hideSquare.png";
import N0 from "../../images/imagesMineSweeper/void.png"
import N1 from "../../images/imagesMineSweeper/N1.png"
import N2 from "../../images/imagesMineSweeper/N2.png"
import N3 from "../../images/imagesMineSweeper/N3.png"
import N4 from "../../images/imagesMineSweeper/N4.png"
import N5 from "../../images/imagesMineSweeper/N5.png"
import N6 from "../../images/imagesMineSweeper/N6.png"
import N7 from "../../images/imagesMineSweeper/N7.png"
import N8 from "../../images/imagesMineSweeper/N8.png"

import "./mineSweeperPage.css"

export const MineSweeperPage = () => {
    console.log("VOLVIENDO A CARGAR COMPONENTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    const MARKS = {
        HIDE: "H",
        REVEAL: "R",
        MINE: "M"
    }

    const IMAGES = {
        N0: N0,
        N1: N1,
        N2: N2,
        N3: N3,
        N4: N4,
        N5: N5,
        N6: N6,
        N7: N7,
        N8: N8,
        HIDE: HIDE_SQUARE,
        VOID: "",
        FLAG: "",
        EXPLOTE: "",
        FLAG_MINE: "",
    }

    var boardAux = useRef(null);
    const [rows, setRows] = useState(40)
    const [columns, setColumns] = useState(40)
    const [minesCount, setMinesCount] = useState(300)
    const [mines, setMines] = useState([])
    //let flags = {}
    const [board, setBoard] = useState(
        new Array(rows).fill(null).map(() => {
            return new Array(columns).fill(null).map(element => {
                return {
                    status: MARKS.HIDE,
                    content: "",
                    flag: false
                }
            })
        })
    )

    useEffect(() => {
        let newBoard = structuredClone(board)
        for (let i = 0; i < minesCount; i++) {
            let column = (Math.floor(Math.random() * columns))
            let row = (Math.floor(Math.random() * rows))
            mines.push({
                column: column, row: row
            })
            newBoard[row][column].content = MARKS.MINE
            // agregar logica si es que dos salen en la misma posicion
        }
        setBoard(newBoard)
    }, [])

    const printBoar = () => {
        let aux = ""
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                aux = aux + (board[row][column].content === "" ? " " : board[row][column].content) + "|";
            }
            aux = aux + "\n"
        }
        console.log(aux)
    }

    printBoar()

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
            console.log("Mine pressed , Game over")
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


    return (
        <>
            <Header>

            </Header>

            <MainTitle title="MineSweeper Game"></MainTitle>

            <div className="boardMineSweeper">
                {
                    board.map((elementRow, indexRow) => {
                        return (
                            <div key={`row-${indexRow}`} className="row">
                                {
                                    elementRow.map((elementColumn, indexColumn) => {
                                        return (
                                            <div style={{ backgroundImage: elementColumn.status === MARKS.HIDE ? `url(${IMAGES.HIDE})` : `url(${IMAGES?.["N"+elementColumn.content]})` }} key={`row-${indexRow}-column-${indexColumn}`} className="square" onClick={() => { boardAux.current = structuredClone(board); revealSquare({ row: indexRow, column: indexColumn }); setBoard(boardAux.current); printBoar(); }}>
                                               
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>





        </>
    )

}
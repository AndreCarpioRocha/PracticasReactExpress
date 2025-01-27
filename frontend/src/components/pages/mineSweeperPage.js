import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"

export const MineSweeperPage = () => {

    const MARKS = {
        HIDE: "H",
        REVEAL: "R"
    }

    let rows = 10;
    let columns = 5
    let minesCount = 100;
    let mines = [];
    let flas = {}


    let board = new Array(rows).fill(null).map(() => {
        return new Array(columns).fill(MARKS.HIDE)
    });

    for (let i = 0; i < minesCount; i++) {
        let column = (Math.floor(Math.random() * columns))
        let row = (Math.floor(Math.random() * rows))
        mines.push({
            column: column, row: row
        })
        // agregar logica si es que dos salen en la misma posicion
    }

    const revealSquare = (row, column) => {
        if (board[row][column] !== MARKS.HIDE) {
            return
        }

        for (let i = 0; i < mines.length; i++) {
            const element = mines[i];

            if (element.row = row && element.column == column) {
                console.log("game over")
                return
            }
        }

        board[row][column] = MARKS.REVEAL;

        
    }

    const borderSquares = (row, column) => {
        
    }



    return (
        <>
            <Header>

            </Header>

            <MainTitle title="MineSweeper Game"></MainTitle>
        </>
    )

}
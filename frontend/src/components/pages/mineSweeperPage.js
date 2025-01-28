import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"

export const MineSweeperPage = () => {
    console.log("VOLVIENDO A CARGAR COMPONENTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    const MARKS = {
        HIDE: "H",
        REVEAL: "R",
        MINE: "M"
    }

    let rows = 10;
    let columns = 10
    let minesCount = 20;
    let mines = [];
    //let flags = {}

    


    let board = new Array(rows).fill(null).map(() => {
        return new Array(columns).fill(null).map(element => {
            return {
                status: MARKS.HIDE,
                content: "",
                flag: false
            }
        })
    });

    for (let i = 0; i < minesCount; i++) {
        let column = (Math.floor(Math.random() * columns))
        let row = (Math.floor(Math.random() * rows))
        mines.push({
            column: column, row: row
        })
        board[row][column].content = MARKS.MINE
        // agregar logica si es que dos salen en la misma posicion
    }

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
        console.log(`EJECUTANDO METODO  row ${row}  column : ${column} !!!!!!!!`)
        if (board[row][column].status !== MARKS.HIDE) {
            console.log("The square is alredy reveal")
            return
        }

        if (board[row][column].flag) {
            console.log("The square has a flag")
            return
        }

        board[row][column].status = MARKS.REVEAL;

        if (board[row][column].content === MARKS.MINE) {
            console.log("Mine pressed , Game over")
            return
        }

        let borderSquaresResult = borderSquares({ row, column });

        let borderMines = 0;

        for (let i = 0; i < borderSquaresResult.length; i++) {
            const element = borderSquaresResult[i];
            if (board[element.row][element.column].content === MARKS.MINE) {
                borderMines++;
            }
        }

        board[row][column].content = borderMines;

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
        console.log(squares);
        return squares;
    };
    

    revealSquare({ row: 0, column: 0 })

    printBoar()
    

    return (
        <>
            <Header>

            </Header>

            <MainTitle title="MineSweeper Game"></MainTitle>
        </>
    )

}
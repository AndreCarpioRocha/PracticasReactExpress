import "./toDoListPage.css"
import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"
import { ContainerTaskCards } from "../todolist/containerTaskCards"
import { TaskCard } from "../todolist/taskCard"
import { ButtonAddCard } from "../todolist/buttonAddCard"

export const ToDoListPage = () => {
    return (
        <>
            <Header></Header>
            <MainTitle title="To Do List"></MainTitle>
            <ContainerTaskCards>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <TaskCard></TaskCard>
                <ButtonAddCard></ButtonAddCard>
            </ContainerTaskCards>
        </>
    )

}
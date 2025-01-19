import "./toDoListPage.css"
import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"
import { ContainerTaskCards } from "../todolist/containerTaskCards"
import { TaskCard } from "../todolist/taskCard"
import { ButtonAddCard } from "../todolist/buttonAddCard"
import { FormNewTask } from "../todolist/formNewTask"
import { useState } from "react"

export const ToDoListPage = () => {

    const [formNewTaskVisibility, setFormNewTaskVisibility] = useState(false)

    const changeVisibilityFormTask = () =>{
        setFormNewTaskVisibility(!formNewTaskVisibility);
    }

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
                <ButtonAddCard changeVisibilityFormTask = {changeVisibilityFormTask}></ButtonAddCard>
            </ContainerTaskCards>

            {
                formNewTaskVisibility ?
                    <FormNewTask changeVisibilityFormTask = {changeVisibilityFormTask}></FormNewTask> : ""
            }

        </>
    )

}
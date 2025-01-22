import "./toDoListPage.css"
import { Header } from "../header/header"
import { MainTitle } from "../titles/mainTitle"
import { ContainerTaskCards } from "../todolist/containerTaskCards"
import { TaskCard } from "../todolist/taskCard"
import { ButtonAddCard } from "../todolist/buttonAddCard"
import { FormNewTask } from "../todolist/formNewTask"
import { useEffect, useState } from "react"

export const ToDoListPage = () => {

    const [formNewTaskVisibility, setFormNewTaskVisibility] = useState(false)
    const [taskFetch, setTaskFetch] = useState([])

    const changeVisibilityFormTask = () => {
        setFormNewTaskVisibility(!formNewTaskVisibility);
    }

    const addTask = (task) => {
        setTaskFetch(prevElements => [...prevElements, task]);
    };

    const deleteTask = (id) => {
        try {
            fetch(`http://localhost:4000/task/${id}`, {
                method: "DELETE"
            }).then(res => res.json()).then(res => {
                if (res.response == "Task deleted") {
                    setTaskFetch(taskFetch.filter(element => {
                        return element._id != id
                    }))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch("http://localhost:4000/taskList").then(res => res.json()).then(res => {
            setTaskFetch(res)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <Header></Header>
            <MainTitle title="To Do List"></MainTitle>
            <ContainerTaskCards>
                <ButtonAddCard changeVisibilityFormTask={changeVisibilityFormTask}></ButtonAddCard>
                {taskFetch.map(element => {
                    return (
                        <TaskCard key={element._id} title={element.title} content={element.content} color={element.color} deleteTask={() => { deleteTask(element._id) }} ></TaskCard>
                    )
                })}

            </ContainerTaskCards>

            {
                formNewTaskVisibility ?
                    <FormNewTask changeVisibilityFormTask={changeVisibilityFormTask} addTask={addTask}></FormNewTask> : ""
            }

        </>
    )

}
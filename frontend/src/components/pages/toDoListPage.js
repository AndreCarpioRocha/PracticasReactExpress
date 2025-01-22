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
    const [formEditTaskVisibility, setFormEditTaskVisibility] = useState(false)
    const [taskFetch, setTaskFetch] = useState([])

    const changeVisibilityFormNewTask = () => {
        setFormNewTaskVisibility(!formNewTaskVisibility);
    }

    const changeVisibilityFormEditTask = () => {
        setFormEditTaskVisibility(!formEditTaskVisibility);
    }

    const createTask = (formData) => {
        return new Promise((resolve, reject) => {
            try {
                fetch("http://localhost:4000/task", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: formData.get("titleTask"),
                        color: formData.get("colorTask"),
                        content: formData.get("contenTask")
                    })
                }).then(res => res.json()).then(res => {
                    if (res.task) {
                        setTaskFetch(prevElements => [...prevElements, res.task]);
                    }
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    resolve("Promise execute")
                })
            } catch (error) {
                reject("Fail excution")
            }
        })
    }


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

    const editTask = ({ id, title, content }) => {

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
                <ButtonAddCard changeVisibilityFormNewTask={changeVisibilityFormNewTask}></ButtonAddCard>
                {taskFetch.map(element => {
                    return (
                        <TaskCard key={element._id} title={element.title} content={element.content} color={element.color} deleteTask={() => { deleteTask(element._id) }} editTask={() => {
                            changeVisibilityFormEditTask()
                        }} ></TaskCard>
                    )
                })}

            </ContainerTaskCards>

            {
                formNewTaskVisibility ?
                    <FormNewTask changeVisibilityForm={changeVisibilityFormNewTask} operation={createTask} titleForm={"Create New Task"} buttonFormText={"Create"}></FormNewTask> : ""
            }

            {
                formEditTaskVisibility ?
                    <FormNewTask changeVisibilityForm={changeVisibilityFormEditTask} operation={editTask} titleForm={"Edit Task"} buttonFormText={"Edit"}></FormNewTask> : ""
            }

        </>
    )

}
import { useState } from "react";
import "./formNewTask.css"

export const FormNewTask = ({ changeVisibilityFormTask, addTask }) => {
    const cardColors = [
        "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9",
        "#BBDEFB", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#C8E6C9",
        "#DCEDC8", "#F0F4C3", "#FFECB3", "#FFE0B2", "#FFCCBC",
        "#D7CCC8", "#CFD8DC"
    ];

    const [loadingVisible, setLoadingVisible] = useState(false)


    const handleColorChange = (event) => {
        event.target.style.backgroundColor = event.target.value;
    };

    const handleForm = async (event) => {
        event.preventDefault();
        setLoadingVisible(true)
        try {
            let form = new FormData(event.target)
            fetch("http://localhost:4000/task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: form.get("titleTask"),
                    color: form.get("colorTask"),
                    content: form.get("contenTask")
                })
            }).then(res => res.json()).then(res => {
                if (res.task) { addTask(res.task) }
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                setLoadingVisible(false)
            })
        } catch (error) {
            console.log(error)
            setLoadingVisible(false)
        }
    }



    return (
        <form className="formNewTask" onSubmit={handleForm}>
            <h1>Create New Task</h1>
            <label >Title</label>
            <input type="text" name="titleTask" required />
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", margin: "0px" }}>
                <label>Task Color</label>
                <select name="colorTask" onChange={handleColorChange}
                    style={{ width: "70px", height: "23px", margin: "0px", backgroundColor: cardColors[0] }}>
                    {cardColors.map(element => {
                        return (
                            <option key={element} value={element} style={{ backgroundColor: element }} >

                            </option>
                        )
                    })}
                </select>
            </div>

            <label >Content</label>
            <textarea name="contenTask" required></textarea>
            <button type="button" className="closeFormNewTask" onClick={changeVisibilityFormTask}>✘</button>
            <button className="buttonCreateTask" disabled={loadingVisible}> {loadingVisible ?
                <div className="loadingFormNewTask">
                    <div className="spinner">

                    </div>
                </div>
                : ""} <p>Create</p></button>
        </form>
    )
}
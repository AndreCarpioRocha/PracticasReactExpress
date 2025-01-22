import { useState } from "react";
import "./formNewTask.css"

export const FormNewTask = ({ changeVisibilityForm, operation, titleForm, buttonFormText }) => {
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
        console.log("aaaaaa")
        event.preventDefault()
        setLoadingVisible(true)
        try {
            let form = new FormData(event.target)
            await operation(form)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingVisible(false)
        }
    }

    return (
        <form className="formNewTask" onSubmit={handleForm}>
            <h1> {titleForm} </h1>
            <label >Title</label>
            <input type="text" name="titleTask"  required />
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
            <button type="button" className="closeFormNewTask" onClick={changeVisibilityForm}>✘</button>
            <button className="buttonCreateTask" disabled={loadingVisible}> {loadingVisible ?
                <div className="loadingFormNewTask">
                    <div className="spinner">

                    </div>
                </div>
                : ""} <p> {buttonFormText}</p></button>
        </form>
    )
}
import "./formNewTask.css"

export const FormNewTask = ( {changeVisibilityFormTask}) =>{
    return(
        <div className="formNewTask">
            <h1>Create New Task</h1>
            <label>Title</label>
            <input type="text" />
            <label >Content</label>
            <textarea></textarea>
            <button>Crear</button>
            <button className="closeFormNewTask" onClick={changeVisibilityFormTask}>✘</button>
        </div>
    )
}
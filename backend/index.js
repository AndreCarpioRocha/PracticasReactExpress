import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app = express();
const puerto = process.env.PORT;
const uri = process.env.MONGO_URI
app.use(cors());
app.use(express.json());

async function run() {
    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        //await mongoose.disconnect();
    }
}
run().catch(console.dir);

const taskSchema = new mongoose.Schema({
    title: String,
    content: String,
    color: String
})

const Task = mongoose.model("tasks", taskSchema);


app.get("/taskList", (req, res) => {
    Task.find().limit(50)
        .then(tasks => {
            return res.status(200).json(tasks);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send("Error al obtener la lista de tareas.");
        });
})

app.post("/task", async (req, res) => {
    try {
        let { title, content, color } = req.body;

        if (!title) {
            return res.status(400).json({ response: "Title field is required" })
        }

        if (!content) {
            return res.status(400).json({ response: "Content field is required" })
        }

        if (!color) {
            return res.status(400).json({ response: "Color field is required" })
        }


        let task = new Task({ title, content, color })

        let taskResponse = await task.save()

        return res.type("application/json").status(200).json({ response: "Task created successfully", task: taskResponse });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ response: "Server Error" })
    }
})

app.delete("/task/:_id", (req, res) => {
    try {
        const { _id } = req.params;
        Task.deleteOne({ _id: _id })
            .then(deleteRes => {
                if (deleteRes.deletedCount == 1) {
                    return res.status(200).json({ response: "Task deleted" })
                }
                return res.status(404).json({ response: "Task not found" })
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({ response: "Server Error" })
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: "Server Error" })
    }
})

app.put("/task/:_id", async (req, res) => {
    try {

        const { _id } = req.params
        const { title, content, color } = req.body
        if (!_id) {
            return res.status(400).json({ response: "_Id filed no found" })
        }
        if (!title) {
            return res.status(400).json({ response: "title filed no found" })
        }
        if (!content) {
            return res.status(400).json({ response: "content filed no found" })
        }
        if (!color) {
            return res.status(400).json({ response: "color filed no found" })
        }

        const t = await Task.findById(_id);

        if (t) {
            t.title = title
            t.content = content
            t.color = color
        } else {
            return res.status(400).json({ response: "task no found" })
        }

        const resultUpdate = await t.save()

        if (resultUpdate) {
            return res.status(200).json({ response: "Task updated successfully", task: resultUpdate });
        }

        return res.status(500).json({ response: "Server Error updating" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ response: "Server Error" })
    }
})

app.get("/", (req, res) => {
    return res.status(200)
        .set("content-type", "text/html")
        .send("<h1> Funcionando </h1>");
});

app.listen(puerto, () => {
    console.log(`Servidor levantado en el puerto ${puerto}`)
});
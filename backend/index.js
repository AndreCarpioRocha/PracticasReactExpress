import express from "express";
import cors from "cors";

const app = express();
const puerto  = 4000;

app.get("/", (req, res) => {
    res.status(200)
        .set("content-type", "text/html")
        .send("<h1> Funcionando </h1>");
});

app.listen(puerto , () =>{
    console.log(`Servidor levantado en el puerto ${puerto}`)
});
const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.listen(3000, () => {
    console.log("¡Servidor encendido!")
});
app.use(express.json());
app.use(cors());

app.get("/canciones", (req, res) => {   
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(canciones)
});

app.get("/canciones/:id", (req, res) => {  
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex((c) => c.id == id);
    const cancion = canciones[index]
    res.json(cancion)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("¡Canción agregada con éxito!");
});

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex(c => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("¡Canción eliminada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    const index = canciones.findIndex((c) => c.id == id);
    canciones[index] = cancion;
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.send("¡Canción modificada con éxito!");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
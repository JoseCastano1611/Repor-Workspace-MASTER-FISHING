import express from "express";
import rutas from "./src/routes/rutas.js";

const app = express();
const PUERTO = 4000;

// ==========================================
// CONFIGURACIÓN DE EJS
// ==========================================

app.set("view engine", "ejs");

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// RUTAS
// ==========================================

app.use("/", rutas);

// ==========================================
// SERVIDOR
// ==========================================

app.listen(PUERTO, () => {
    console.log(`MASTER FISHING funciona en http://localhost:${PUERTO}`);
});
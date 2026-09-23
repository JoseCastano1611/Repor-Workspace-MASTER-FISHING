import { Router } from "express";

const router = Router();

// ==========================================
// BASE DE DATOS TEMPORAL DE USUARIOS
// ==========================================

const usuarios = [];


// ==========================================
// PÁGINA PRINCIPAL
// ==========================================

router.get("/", (req, res) => {

    res.render("index", {

        titulo: "MASTER FISHING",

        mensaje: "Tu aventura comienza aquí."

    });

});


// ==========================================
// PÁGINA DE PRODUCTOS
// ==========================================

router.get("/productos", (req, res) => {

    const productos = [

        {
            nombre: "Okuma Llanos 5.7 ft CASTING",
            categoria: "Cañas Casting",
            precio: 180000,
            descripcion: "Referencia L-C-572H: Longitud 5'7'' (170 cm), Poder Heavy, Piezas 2, Peso lanzado 25-70 gr, Línea 15-30 libras, Guías 8+Tip, Acción Fast, Peso caña 113 gramos."
        },

        {
            nombre: "Carrete Shimano Sienna FG4",
            categoria: "Carretes de spinning",
            precio: 150000,
            descripcion: "Referencia SN4000FG: Capacidad de línea Mono 8/240, 10/200, 12/160; capacidad de línea trenzada 15/230, 30/180, 50/120; peso 320 g, relación de engranaje 5.2:1, recuperación por vuelta 80 cm y arrastre máximo de 19 lb."
        },

        {
            nombre: "Señuelo Marine Sports Hammer",
            categoria: "Señuelos",
            precio: 35000,
            descripcion: "El señuelo Marine Sports Hammer es un cebo artificial de superficie tipo paseante (zara) diseñado para provocar ataques explosivos de peces depredadores. Referencia Hammer 85: mide 8.5 cm de largo y pesa 11.5 g (13/32 oz)."
        },

        {
            nombre: "Línea Trenzada Yo-zuri Superbraid",
            categoria: "Líneas",
            precio: 74000,
            descripcion: "Línea resistente para mejorar el rendimiento de tu equipo. Referencia YZ SB 30LB DG 300YD Dark Green 30lb 0.28mm 0.011 in."
        },

        {
            nombre: "Anzuelo VMC DDW Drop Dead Weighted PAQx4",
            categoria: "Anzuelos",
            precio: 22000,
            descripcion: "Referencia DDW1/8#5/0BNPP 5/0 x4 1/8oz."
        },

        {
            nombre: "Caja organizadora",
            categoria: "Accesorios",
            precio: 45000,
            descripcion: "Caja práctica para organizar tus accesorios de pesca."
        }

    ];


    console.log(productos);


    res.render("productos", {

        productos: productos

    });

});


// ==========================================
// PÁGINA NOSOTROS
// ==========================================

router.get("/nosotros", (req, res) => {

    res.render("nosotros");

});

// ==========================================
// PÁGINA DE CONTACTO
// ==========================================

router.get("/contacto", (req, res) => {
    res.render("contacto");
});

// ==========================================
// PÁGINA DE REGISTRO
// ==========================================

router.get("/registro", (req, res) => {
    res.render("registro");
});

// ==========================================
// REGISTRO DE USUARIO
// ==========================================

router.post("/registro", (req, res) => {

    const {
        nombre,
        cedula,
        fechaNacimiento,
        correo,
        password,
        confirmarPassword
    } = req.body;


    // ==========================================
    // COMPROBAR CONTRASEÑAS
    // ==========================================

    if (password !== confirmarPassword) {

        return res.send("Las contraseñas no coinciden.");

    }


    // ==========================================
    // COMPROBAR CORREO EXISTENTE
    // ==========================================

    const usuarioExistente = usuarios.find(
        usuario => usuario.correo === correo
    );

    if (usuarioExistente) {

        return res.send("El correo electrónico ya está registrado.");

    }


    // ==========================================
    // CREAR USUARIO
    // ==========================================

    const nuevoUsuario = {

        nombre,
        cedula,
        fechaNacimiento,
        correo,
        password

    };


    // ==========================================
    // GUARDAR USUARIO
    // ==========================================

    usuarios.push(nuevoUsuario);


    console.log("====================================");
    console.log("USUARIO REGISTRADO");
    console.log(nuevoUsuario);
    console.log("TOTAL DE USUARIOS:", usuarios.length);
    console.log("====================================");


    res.send("Usuario registrado correctamente");

});

// ==========================================
// PÁGINA DE INICIO DE SESIÓN
// ==========================================

router.get("/login", (req, res) => {

    res.render("login", {
        mensaje: null,
        tipoMensaje: null
    });

});


// ==========================================
// INICIO DE SESIÓN
// ==========================================

router.post("/login", (req, res) => {

    const {
        correo,
        password
    } = req.body;


    // ==========================================
    // BUSCAR USUARIO
    // ==========================================

    const usuario = usuarios.find(
        usuario => usuario.correo === correo
    );


    // ==========================================
    // COMPROBAR SI EXISTE EL USUARIO
    // ==========================================

    if (!usuario) {

        return res.render("login", {

            mensaje: "El correo electrónico no está registrado.",

            tipoMensaje: "danger"

        });

    }


    // ==========================================
    // COMPROBAR CONTRASEÑA
    // ==========================================

    if (usuario.password !== password) {

        return res.render("login", {

            mensaje: "La contraseña es incorrecta.",

            tipoMensaje: "danger"

        });

    }


    // ==========================================
    // LOGIN CORRECTO
    // ==========================================

    console.log("====================================");
    console.log("INICIO DE SESIÓN CORRECTO");
    console.log("USUARIO:", usuario.nombre);
    console.log("CORREO:", usuario.correo);
    console.log("====================================");


    res.render("inicio", {

        usuario: usuario

    });

});


// ==========================================
// EXPORTAR RUTAS
// ==========================================

export default router;
const express = require("express");
const path = require("path");
// const { create } = require("express-handlebars");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");

// Initializations
const app = express();
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// const exphbs = create({
//   defaultLayout: "main",
//   layoutsDir: path.join(app.get("views"), "layouts"),
//   partialsDir: path.join(app.get("views"), "partials"),
//   extname: ".hbs",
// });

// app.engine(".hbs", exphbs.engine);

app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

// Middlewares

// Middleware de express para recibir datos del formulario (False para recibir unicamente datos y no imagenes)
app.use(express.urlencoded({ extended: false }));
// Middleware de express para metodos de formularios adicionales a GET y POST (PUT, DELETE, etc)
app.use(methodOverride("_method"));
// Middleeare de express para almacenar datos dentro de una sesion para el usuario
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);

// Global Variables

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Server is Listening
app.listen(app.get("port"), () => {
  console.log("listening on port ", app.get("port"));
});

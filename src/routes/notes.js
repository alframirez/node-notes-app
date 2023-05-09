const router = require("express").Router();

// Requerimos dentro de la constante Note el modelo de mongoose Note.js
const Note = require("../models/Note");

router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

// Agregar nueva Nota
router.post("/notes/new-note", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    // Guardamos la informacion pasada al modelo en la base de datos
    await newNote.save();
    req.flash("success_msg", "Note Added successfully");
    res.redirect("/notes");
  }
});

// Consultar todas las notas existentes

router.get("/notes", async (req, res) => {
  // Usamos .find() en el modelo para encontrar todos los documentos dentro de el
  // .lean para devolver un objeto simple con solo datos
  // .sort para ordenar por Date el arreglo obtenido
  const notes = await Note.find().lean().sort({ date: "desc" });
  res.render("notes/all-notes", { notes });
});

// Consultar la informacion de una nota existente para editarla
router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  res.render("notes/edit-note", { note });
});

// Editar una nota existente
router.put("/notes/edit-note/:id", async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
});

// Eliminar una nota exisente
router.delete("/notes/delete/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted successfully");
  res.redirect("/notes");
});
module.exports = router;

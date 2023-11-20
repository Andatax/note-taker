const router = require("express").Router();

const notesRouter = require("./note-routes");

router.use("/notes", notesRouter);

module.exports = router;

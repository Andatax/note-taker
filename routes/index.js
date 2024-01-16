const router = require("express").Router();

const apiRouter = require("./api");
const htmlRouter = require("./html-routes.js");

router.use("/api", apiRouter);
router.use("/", htmlRouter);

module.exports = router;

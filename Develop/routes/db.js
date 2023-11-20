const notes = require("express").Router();
const fs = require("fs");
const path = require("path");

notes.get("/", (req, res) => {
	const filePath = path.join(__dirname, "../db/db.json");
	console.info(`${req.method} request received for notes`);
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
			return;
		} else {
			res.json(JSON.parse(data));
		}
	});
});

notes.post("/", (req, res) => {
	console.info(`${req.method} request received to add a tip`);
	console.log(req.body);
	const filePath = path.join(__dirname, "../db/db.json");

	const { title, text } = req.body;

	if (req.body) {
		const newNote = {
			title,
			text,
		};

		fs.appendFile(filePath, JSON.stringify(newNote) + "\n", err => {
			if (err) {
				console.error(err);
				res.status(500).json({ error: err.message });
				return;
			} else {
				res.json(`Note added successfully`);
			}
		});
	} else {
		res.error("Error in adding note");
	}
});

module.exports = notes;

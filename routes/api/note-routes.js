const notes = require("express").Router();
const fs = require("node:fs");
const path = require("node:path");

notes.get("/", (req, res) => {
	const filePath = path.join(__dirname, "../../db/db.json");
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
	const filePath = path.join(__dirname, "../../db/db.json");

	if (!req.body) {
		return res.error("Error in adding note");
	}

	const newNote = {
		title: req.body.title,
		text: req.body.text,
	};
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			return res.error(err);
		}
		// console.log(JSON.parse(data));
		const notesDb = JSON.parse(data);
		notesDb.push(newNote);

		fs.writeFile(filePath, JSON.stringify(notesDb), err => {
			if (err) {
				console.error(err);
				res.status(500).json({ error: err.message });
				return;
			} else {
				res.json(`Note added successfully`);
			}
		});
	});
});

module.exports = notes;

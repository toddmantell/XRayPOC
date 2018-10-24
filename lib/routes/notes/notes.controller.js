const express = require('express');
const notesController = express.Router();
const Note = require('./note');
const uuidv1 = require('uuid/v1');

notesController.get('/', async (req, res) => {
	try {
		const notes = await Note.scan().exec();
		res.status(200).send(notes);
	} catch (error) {
		console.error(error.stack || error);
	}
});

notesController.post('/', async (req, res) => {
	const newNote = new Note({id: uuidv1(), title: req.body.title, description: req.body.description })
	newNote.save(function (err) {
		if (err) { return console.log(err); }
		console.log(`New Note ${JSON.stringify(newNote)} saved!`);
	});
	res.status(200).send(newNote);
});

notesController
  .get('/:id', async (req, res, next) => {
    const note = await Note.get(req.params.id)
    res.status(200).send(note)
});

notesController.put('/:id', async (req, res) => {
	const noteToUpdate = new Note({id: req.params.id, ...req.body });
	noteToUpdate.save(function (err) {
		if (err) { return console.log(err); }
		console.log(`Note ${JSON.stringify(noteToUpdate)} updated!`);
	});
	res.status(200).send(noteToUpdate);
});

notesController
  .delete('/:id', (req, res, next) => {
    Note.delete({ id: req.params.id }, (error) => {
			if (error) return console.log(error);
			console.log("Note deleted...");
		})
    res.status(200).send("Note deleted.")
});

module.exports = notesController

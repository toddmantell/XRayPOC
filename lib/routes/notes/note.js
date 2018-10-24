const dynamoose = require('dynamoose');

const NoteSchema = new dynamoose.Schema({
	id: String,
	title: String,
	description: String
});

module.exports = dynamoose.model('XRayPOC-Note', NoteSchema);
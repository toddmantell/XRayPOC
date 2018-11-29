// require('dotenv').load();
const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
AWSXRay.captureAWS(require('aws-sdk'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// app.use(AWSXRay.express.openSegment('XRAYPOC:segment-todd'));

require('./db');
const routes = require('./routes');
app.use('/api', routes);

// Note that this won't have a valid trace_id because it is considered part of the cold start/bootstrap phase 
console.log('Segment Document: ', AWSXRay.getSegment() + ' : ' +  new Date().toUTCString());

// app.use(AWSXRay.express.closeSegment());

module.exports = app;

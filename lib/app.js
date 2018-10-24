const app = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const AWSXRay = require('aws-xray-sdk');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(AWSXRay.express.openSegment('XRAYPOC'));

require('./db');
const routes = require('./routes');
app.use('/api', routes);

app.use(AWSXRay.express.closeSegment());

module.exports = app;

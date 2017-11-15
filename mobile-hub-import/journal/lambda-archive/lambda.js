const aws_express = require('aws-serverless-express')
const app = require('./app')

const server = aws_express.createServer(app)

exports.handler = (event, context) => {
    console.log("EVENT: " + JSON.stringify(event));
    aws_express.proxy(server, event, context)
}

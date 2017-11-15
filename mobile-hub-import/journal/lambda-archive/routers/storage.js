var express = require('express'),
    router = express.Router();

var dynamo_provider = require('../providers/dynamo.js');

var Response = require('../models/response.js');

const storage_table_name = process.env.STORAGE_TABLE_NAME;

const no_root_resource = {
    greetings: 'Hello from Storage'
};

router.get('/', function(req, res) {
    dynamo_provider.find(storage_table_name, '__resources__')
        .then(data => Response.OK(res, data? data : no_root_resource))
        .catch(err => Response.ServerError(res, err));
});

router.post('/', function(req, res) {
    // create, generate id if not present, return the result object
});

router.get('/:id', function(req, res) {
    const id = req.params.id;
    dynamo_provider.find(storage_table_name, id)
        .then(data => res.json(Response.OK(data)))
        .catch(err => res.json(Response.Error(err)));
});

router.put('/:id', function(req, res) {
    // update, return the result object
});

router.delete('/:id', function(req, res) {
    // delete, also deletes all children, and children's children
});

router.post('/:id', function(req, res) {
    // create a child, generate id if not present, return the result object
});

module.exports = router;

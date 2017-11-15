var AWS = require('aws-sdk');

var DynamoProvider = {};

DynamoProvider.getDynamo = function() {
    if (!DynamoProvider._dynamo) {
        DynamoProvider._dynamo = new AWS.DynamoDB.DocumentClient();
    }

    return DynamoProvider._dynamo;
};

DynamoProvider.find = function(table_name, id) {
    const dynamo = DynamoProvider.getDynamo();
    const key = { id: id };
    return new Promise(function(resolve, reject) {
        dynamo.get({
            TableName: table_name,
            Key: key
        }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data['Item'] || null);
            }
        });
    });
};

DynamoProvider.create = function(table_name, data) {
    const dynamo = DynamoProvider.getDynamo();
    return new Promise(function(resolve, reject) {
        dynamo.put({
            TableName: table_name,
            Item: data
        }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

DynamoProvider.delete = function(table_name, id) {
    const dynamo = DynamoProvider.getDynamo();
    const key = { id: id };
    return new Promise(function(resolve, reject) {
        dynamo.delete({
            TableName: table_name,
            Key: key
        }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = DynamoProvider;

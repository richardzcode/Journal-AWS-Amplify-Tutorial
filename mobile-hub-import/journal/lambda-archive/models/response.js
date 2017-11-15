var Response = function(res, status, data) {
    return res.status(status).json(data);
};

Response.OK = function(res, data) {
    return Response(res, 200, data);
};

Response.NotFound = function(res, msg) {
    if (!msg) { msg = 'Not Found'; }
    return Response(res, 404, { message: msg });
};

Response.ServerError = function(res, err) {
    if (typeof err === 'string') { err = { message: err }; }
    return Response(res, 500, err);
};

module.exports = Response;

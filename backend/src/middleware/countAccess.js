global.serverRequest = {
    totalAccess: 0,
    totalConsult: 0
};

const sumAccess = async (req, res, next) => {
    if(req.path !== '/server'){
        serverRequest.totalAccess++;
    }
    next();
};

const sumConsult = async () => {
    serverRequest.totalConsult++;
};

module.exports = {sumAccess, sumConsult};
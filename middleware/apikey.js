function validAPIKeyNeeded(req, res, next) {
    if (req.headers['authorization']) {

        let authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
            return res.status(401).send();
        } else {
            if (authorization[1] == "unaisgreat")


                return next();

            else
                return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

module.exports = { validAPIKeyNeeded, logging1, logging2 }
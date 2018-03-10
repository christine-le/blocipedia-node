var jwt = require('jsonwebtoken');

function isAthenticated(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log('req', req);
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.jwt_secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
module.exports = isAthenticated;
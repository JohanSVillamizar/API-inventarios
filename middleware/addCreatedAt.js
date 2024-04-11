const moment = require('moment');

function addCreatedAt(req, res, next) {

  const currentDate = moment().format('YYYY-MM-DD HH:mm');

  if (!req.body) {
    req.body = {};
  }

  if (!req.body.created_at) {
    req.body.created_at = currentDate; 
  }

  next();
}

module.exports = addCreatedAt;

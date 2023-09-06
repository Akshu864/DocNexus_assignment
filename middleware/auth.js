const jwt = require('jsonwebtoken');


const authorize = (req, res, next) => {
 
  const token = req.header('Authorization');


  if (!token) {
    return res.status(401).send({ msg: 'Authorization token missing' });
  }

  try {
   
    const decoded = jwt.verify(token, 'akshay'); 

    req.user = decoded;

    next();

  } catch (error) {
 
    res.status(401).send({ msg: 'Token verification failed' });
  }
};




module.exports = authorize;

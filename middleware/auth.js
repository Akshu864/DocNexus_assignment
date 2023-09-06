const jwt = require('jsonwebtoken');


const authorize = (req, res, next) => {
 
  const token = req.header('Authorization');


  if (!token) {
    return res.status(401).json({ msg: 'Authorization token missing' });
  }

  try {
   
    const decoded = jwt.verify(token, 'akshay'); 

    req.user = decoded;

    next();

  } catch (error) {
 
    res.status(401).json({ msg: 'Token verification failed' });
  }
};




module.exports = authorize;

const jwt = require('jsonwebtoken')

module.exports.cektoken = (req, res, next) => {
  if (req.headers['x-token']) {
    const token = req.headers['x-token']
    console.log("test token ",token,process.env.SECRET_KEY)  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("test baris 9 ", err)
        next()
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    next(Error('Error! token is missing'))
  }
}

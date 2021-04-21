const route = require('express').Router()
const jwt = require('jsonwebtoken')
const conect = require('node-json-db')
const conf = require('node-json-db/dist/lib/JsonDBConfig')
const db = new conect.JsonDB(new conf.Config("db.json", true, false, '/'));

route.route('/').post(async (req, res, next) => {
  try {
    const { username, password } = req.body
    const data = db.getData("/users");
    const getuser = data.filter((item) => {
      return item.username === username && item.password === password
    })
    if (getuser.length >= 1) {
      const token = jwt.sign(
        { userid: getuser.id, username },
        process.env.SECRET_KEY, { expiresIn: '7d' }
      )
      res.json({
        response: { token },
        metadata: { message: 'Oke', code: res.statusCode },
      })
    } else {
      next(Error('User/Password tidak sesuai'))
    }


  } catch (error) {
    next(error)
  }
})

module.exports = route
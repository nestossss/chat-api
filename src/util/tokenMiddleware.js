const token = require('../util/token')

const checkTokenMid = (req, res, next) => {
   let tokenIsValid = token.checkToken(req.headers.token, req.headers.id, req.headers.nick);
   console.log("é valido: ", tokenIsValid)
   if(!tokenIsValid){
      return res.status(401).send({
         "msg": "usuario invalido"
      })
   }
   next();
}

module.exports = { checkTokenMid }
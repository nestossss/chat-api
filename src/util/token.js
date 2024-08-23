const jwt = require("jsonwebtoken");

const checkToken = (token, id, key) => {
    try{
        let dec = jwt.verify(token, key)
        if(dec.id == id)
            return true
        return false
    } catch { 
        return false
    }
}

const setToken = async (id, key) =>{
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
}

module.exports = {
    setToken,
    checkToken,
}
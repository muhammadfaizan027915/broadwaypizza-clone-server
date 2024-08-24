const Models = require('../Models')

const hasUserId = (req, res, next) => {
    if(!req.body.userId){
        res.status(404).send({
            message: 'User Id not provided!'
        })
        return ;
    }
    next()
}

const emailAlreadyUsed = async (req, res, next) => {
    const {email} = req.body 
    const user = await Models.User.findOne({email}, '_id')

    if(user)
        return res.status(406).send({
            message: "Email already exists!"
        })
    next()
}

module.exports = {
    hasUserId,
    emailAlreadyUsed
}
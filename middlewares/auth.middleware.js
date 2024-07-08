/**
 * create  a mw will check if the req body is prper and connected to the db
 */

const user_model = require("../models/user.model")
 const verifySignUpBody = async (req, res,nex)=>{
    try {
        //check for the name 
        if (!req.body.name) {
            return res.status(400).send({
                message: "failed : Name was not provided in the req body"
            })
        }
        //check for the email
        if(!req.body.email){    
            return res.status(400).send({
                message: "Failed: Email was not provided in the req body"
            })
        }
        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed: UserId was not provided in the request body "
            })
        }
        //check for the user with the same userId is already present or not
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "User with this userId already exists"
            })  
        }
    } catch (error) {
        console.log("Error while validating the body",error);

        res.status(400).send({
            message : "Error while validating the  req body"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
}
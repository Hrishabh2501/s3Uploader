const models=require('../../models')
const Logger = require('../../Services/logger')
const logger = new Logger('login')
const passwordHash = require('password-hash')
let jwt = require('jsonwebtoken')

/** @description Method for Login User
 * @async
 * @method
 * @param {object} req - Request object contains User login details --attributes email,password 
 * @param {object} res - Reponse object contains user details inserted in database.
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function loggedIn(req, res, next) {
    console.log('ENTER LOGIN')
    try {
        const user = await models.UserT.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            const passwordMatched = passwordHash.verify(
                req.body.password,
                user.password
            );

            if (passwordMatched) {
                var token = jwt.sign({ email: req.body.email, id: user.id }, "abcd")
                user.update({ isLoggedIn: true });

                logger.info('LOGIN SUCCESS!')
                res.status(200).json({
                    // user,
                    message: "SUCCESSFULLY LOGGED-IN",
                    success: true,
                    data: user,
                    token:token
                });
            }
            else {
                logger.error('WRONG PASSWORD')
                res.status(401).json({
                    success: false,
                    message: "PASSWORD INCORRECT",
                });
            }
        } else {
            logger.error('INVALID EMAIL')
            res.status(401).json({
                success: false,
                message: "EMAIL NOT EXIST",
            });
        }



    } catch (error) {
        res.status(500);
        next(error);
    }
}


module.exports={loggedIn}



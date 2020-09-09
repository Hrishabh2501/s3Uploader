const models=require('../../models')
const Logger = require('../../Services/logger')
const logger = new Logger('logout')


/** @description Method for Logout User
 * @async
 * @method
 * @param {object} req - Request object contains User details --attribute email 
 * @param {object} res - Reponse object set loggedIn boolean to False in database
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function loggedOut(req,res,next) {
    console.log('ENTER LOGOUT')
    try {
        const user = await models.UserT.findOne({
            where: {
                email: req.body.email,
            },
        });

        user.update({ isLoggedIn: false });
        logger.info('SIGNOUT SUCCESS')
        res.status(200).json({
            success: true,
            message: "SUCCESSFULLY SIGN-OUT",
        });
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports={loggedOut}
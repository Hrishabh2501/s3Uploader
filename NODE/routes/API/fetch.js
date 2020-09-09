const models = require('../../models')


/** @description Method for Getting User Data
 * @async
 * @method
 * @param {object} req - Request object contains User details --attributes email
 * @param {object} res - Reponse object contains User Data details.
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function getData(req, res, next) {
    console.log('ENTER FETCH')
    try {
        const user = await models.UserT.findOne({
            where: {
                id: req.params.uid
            }
        })
        // console.log(req.params.uid + ' & ' + user.email)
        const data = await models.Data.findAll({
            where: {
                email: user.email
            }
        })
        res.status(200).json({
            success: true,
            data
        })
    }
    catch (error) {
        res.status(500);
        next(error)
    }
}

module.exports = { getData }
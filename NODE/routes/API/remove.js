const models = require('../../models')
const Logger = require('../../Services/logger')
const logger = new Logger('fileActions')
const AWS = require("aws-sdk");
const BUCKET_NAME = "new-s3-uploader";
const s3 = new AWS.S3({
    accessKeyId: process.env.API_ID,
    secretAccessKey: process.env.API_KEY,
});


/** @description Method for Deleting User Data
 * @async
 * @method
 * @param {object} req - Request object contains User details --attribute email and File to delete
 * @param {object} res - Reponse object contains User Data details.
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function deleteData(req,res,next){
    console.log('ENTER DELETE')
    const user = await models.UserT.findOne({
        where: {
            email: req.body.email
        }
    })
    console.log(req.body)
    let delFile = req.body.delete
    BUCKET_FOLDER = user.firstName + "_" + user.lastName + "_" + user.id;

    var params = {
        Bucket: BUCKET_NAME,
        Delimiter: '/',
        Prefix: BUCKET_FOLDER + '/'
    };

    var params = { Bucket: BUCKET_NAME, Key: BUCKET_FOLDER+'/'+delFile };
    console.log(params)

    s3.deleteObject(params, function (err, data) {
        console.log("DELETEOBJECTS")
        if (err) console.log(err, err.stack);
        else console.log('DELETeD');
    });
    console.log('DELETE METHOD')
    const del = await models.Data.destroy({
        where:
        {
            email: req.body.email,
            fName: delFile

        }
    })

    logger.info('FILE DELETED from S3')

    res.status(200).json({
        success: true,
        message: "SUCCESSFULLY DELETED",
    });
}

module.exports={deleteData}

const models=require('../../models')
const Logger = require('../../Services/logger')
const logger = new Logger('fileActions')
var today = new Date();
const moment = require('moment')
const AWS = require("aws-sdk");
const BUCKET_NAME = "new-s3-uploader";
const s3 = new AWS.S3({
    accessKeyId: process.env.API_ID,
    secretAccessKey: process.env.API_KEY,
});


/** @description Method for Uploading Files
 * @async
 * @method
 * @param {object} req - Request object contains User detail --attributes email and files to upload
 * @param {object} res - Reponse object contains details of Uploaded data.
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function uploadS3(req, res, next) {
    try {
        const user = await models.UserT.findOne({
            where:
            {
                email: req.body.email
            }
        })
        const BUCKET_FOLDER = user.firstName + "_" + user.lastName + "_" + user.id;


        let imageFile = req.files.file;
        const dataArray = []
        let i = 0
        let imageFileArr = []
        console.log(Object.keys(imageFile).length, "SSSSSSSSSS")
        if (!Array.isArray(imageFile)) {
            imageFileArr.push(imageFile)
        }
        else {
            imageFileArr = imageFile
        }
        console.log(imageFileArr, 'AAAAAAAAAA')

        imageFileArr.map((item, key) => {

            var params = {
                Bucket: BUCKET_NAME,
                Key: BUCKET_FOLDER + "/" + item.name,
                Body: item.data,
                ACL: "public-read",
            };
            s3.upload(params, async function (err, data) {
                if (err) {
                    console.log("Error creating the folder: ", err);
                } else {
                    dataArray.push(data)
                    console.log("Successfully UPLOADED file on S3");
                    const uData = await models.Data.create({
                        fName: data.Key.replace(BUCKET_FOLDER + '/', ""),
                        fType: item.mimetype,
                        fSize: (item.size / 1000) + ' KB',
                        file: data.Location,
                        fDate: moment(today).format('L'),
                        email: user.email
                    })
                    i = i + 1
                    if (i === imageFileArr.length) {
                        res.status(200).json({
                            success: true,
                            data: dataArray,
                            message: "SUCCESSFULLY UPLOADED",
                        });
                    }


                }
            });
        });
        logger.info('FILE UPLOADED to S3')
    }

    catch (error) {
        res.status(500);
        next(error);
    }
  }

  module.exports={uploadS3}
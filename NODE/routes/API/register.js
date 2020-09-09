const models=require('../../models')
const Logger = require('../../Services/logger')
const logger = new Logger('signup')
const passwordHash = require('password-hash')
const AWS = require("aws-sdk");
const BUCKET_NAME = "new-s3-uploader";
const s3 = new AWS.S3({
    accessKeyId: process.env.API_ID,
    secretAccessKey: process.env.API_KEY,
});
/** @description Method for User Registration
 * @async
 * @method
 * @param {object} req - Request object contains User register details --attributes firstname,lastname,email,password
 * @param {object} res - Reponse object contains user details inserted in database.
 * @param {function next(error) {
}} next - calls the error handling middleware.
*/
async function createUser(req, res, next) {
    console.log('ENTER REGISTER')
    try {
        // const user = await models.UserT.create(req.body)
        const user = await models.UserT.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            logger.error('EMAIL ALREADY EXIST')
            res.status(200).json({
                success: false,
                message: "EMAIL ALREADY EXISTS",
            });
        } else {
            let hashedPassword = passwordHash.generate(req.body.password);
            req.body.password = hashedPassword;

            const user = await models.UserT.create(req.body);
            if (user) {
                const BUCKET_FOLDER =
                    user.firstName + "_" + user.lastName + "_" + user.id;

                s3.headBucket({ Bucket: BUCKET_NAME }, function (err, data) {
                    if (err) {
                        s3.createBucket(params, function (err, data) {
                            if (err) console.log(err, err.stack);
                            else {
                                console.log("Bucket Created Successfully", data.Location);

                                var params = {
                                    Bucket: BUCKET_NAME,
                                    Key: BUCKET_FOLDER + "/",
                                    ACL: "public-read",
                                    Body: "body does not matter",
                                };
                                s3.upload(params, function (err, data) {
                                    if (err) {
                                        console.log("Error creating the folder: ", err);
                                    } else {
                                        console.log("Successfully created a folder on S3");
                                    }
                                });
                            }
                        });
                    } else {
                        console.log("Bucket Already Exists ");
                        var params = {
                            Bucket: BUCKET_NAME,
                            Key: BUCKET_FOLDER + "/",
                            ACL: "public-read",
                            Body: "body does not matter",
                        };
                        s3.upload(params, function (err, data) {
                            if (err) {
                                console.log("Error creating the folder: ", err);
                            } else {
                                console.log("Successfully created a folder on S3");
                            }
                        });
                    }
                });
                logger.info('SIGNUP SUCCESS!')
                res.status(200).json({
                    success: true,
                    data: user,
                    message: "SUCCESSFULLY SIGN-UP",
                });
            }

            // res.status(200).json({
            //     user,
            // });
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports ={createUser}
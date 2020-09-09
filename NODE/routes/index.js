const express=require('express')
const router=express.Router()
const schemas = require('../schemas')
const middleware = require('../middleware')


const {createUser} = require('./API/register')
const {loggedIn} = require('./API/login')
const {loggedOut} = require('./API/logout')
const {getData} = require('./API/fetch')
const {uploadS3} = require('./API/upload')
const {deleteData} = require('./API/remove')


router.post('/signup',  middleware(schemas.userPOST, 'body') ,createUser)
router.post('/signin', loggedIn)
router.post('/signout',loggedOut)
router.get('/getData/:uid', middleware(schemas.getFiles, 'params') ,getData)
router.post('/upload' ,uploadS3)
router.post('/deleteData',deleteData)


module.exports=router;
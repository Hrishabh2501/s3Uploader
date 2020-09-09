require('dotenv').config();
const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");


app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/", routes);

app.use((error, req, res, next) =>
    res.json({
        success: false,
        error,
    })
);

app.listen(process.env.PORT_NO, () => {
    console.log("Server started at PORT:" + process.env.PORT_NO);
});



module.exports = app;



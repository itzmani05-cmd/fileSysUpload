const express= require('express');
const multer= require('multer');
const AWS = require("aws-sdk");
const auth= require("../middleware/auth");

const router= express.Router();
const s3= new AWS.S3({region: "us-east-1"});

const upload= multer({
    storage: multer.memoryStorage(),
})

router.post("/", auth, upload.single("file"), async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                message:"No file is uploaded"
            })
        }
        const params = {
            Bucket: "fileuploadsys",
            Key: `${req.userId}/${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        await s3.upload(params).promise();
        res.json({
            message: "File uploaded successfully"
        });



    }catch(err){
        console.log(err);
        res.status(500).json({
            messge:"Upload failed"
        });
    }
});

module.exports= router;

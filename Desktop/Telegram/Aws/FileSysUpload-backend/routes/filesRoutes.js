const express=require("express");
const AWS= require('aws-sdk');
const auth=require('../middleware/auth');

const router= express.Router();
const s3= new AWS.S3({region: "us-east-1"});

router.get('/', auth, async(req, res)=>{

    try{
        const params={
            Bucket: "fileuploadsys",
            Prefix: `${req.userId}/`,
        }

        const data= await s3.listObjectV2(params).promise();
        
        const files= (data.Contents || []).map(obj=>({
            key: obj.Key,
            name: obj.Key.split("/").pop(),
            size: obj.Size,
            lastModified: obj.lastModified,
        }));
        res.json(files);

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to list files"
        });
    }
});

router.get("/download", auth, async (req, res) => {
  try {
    const { key } = req.query;

    if (!key.startsWith(req.userId + "/")) {
      return res.status(403).json({ message: "Access denied" });
    }

    const url = s3.getSignedUrl("getObject", {
      Bucket: "fileuploadsys",
      Key: key,
      Expires: 60,
    });

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
});

module.exports = router;
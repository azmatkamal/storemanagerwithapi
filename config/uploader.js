const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const keys = require("./keys");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "the-teams",
    resource_type: "raw",
    public_id: (req, file) => uuidv4() + "-" + uuidv4(),
  },
});

const parser = multer({ storage: storage });

module.exports = parser;

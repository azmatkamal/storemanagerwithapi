const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "azykamal",
  api_key: "195322874143564",
  api_secret: "QLLQRlEy0vJkki-3ovbvRkU_riA",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "the-teams",
    // format: async () => "raw",
    resource_type: "raw",
    public_id: (req, file) => uuidv4() + "-" + uuidv4(),
  },
});

const parser = multer({ storage: storage });

module.exports = parser;

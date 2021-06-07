const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load User model
const Newsmedia = require("../../models/Newsmedia");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    let errors = {};
    // Check Validation
    if (!req.body.media_type || !req.body.media_type.trim()) {
      errors.media_type = "Media Type is required";
      return res.status(400).json(errors);
    }
    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
    } else {
      errors.icon = "Please select a file";
      return res.status(400).json(errors);
    }

    const newMediaType = new Newsmedia({
      media_type: req.body.media_type,
      news: req.body.news,
      updatedBy: req.user.id,
      createdBy: req.user.id,
      icon,
    });

    newMediaType
      .save()
      .then((media) => res.json(media))
      .catch((err) => console.log(err));
  }
);

router.options("/markmedia", cors());
router.post(
  "/markmedia",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const brand_id = req.body.id;

    // Find user by email
    Newsmedia.findOne({ _id: brand_id }).then((media) => {
      if (media) {
        Newsmedia.findOneAndUpdate(
          { _id: brand_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((b) => {
            res.json(b);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Media detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Media detail.";
        res.status(404).json(errors);
      }
    });
  }
);

router.options("/", cors());
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Newsmedia.find({ is_deleted: false })
      .populate("news")
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((media) => {
        if (media) return res.json(media);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

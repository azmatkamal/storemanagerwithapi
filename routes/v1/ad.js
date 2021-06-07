const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load User model
const Ad = require("../../models/Ad");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    let errors = {};
    if (!req.body.media_type && !req.body.media_type.trim()) {
      errors.media_type = "Media type is requried";
      return res.status(400).json(errors);
    }

    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
    }

    const newAd = new Ad({
      name: req.body.name,
      tel: req.body.tel,
      internal_link: req.body.internal_link,
      external_link: req.body.external_link,
      date: req.body.date,
      media_type: req.body.media_type,
      icon,
      updatedBy: req.user.id,
      createdBy: req.user.id,
    });

    newAd
      .save()
      .then((a) => res.json(a))
      .catch((err) => console.log(err));
  }
);

router.options("/", cors());
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    let errors = {};
    if (!req.body.media_type && !req.body.media_type.trim()) {
      errors.media_type = "Media type is requried";
      return res.status(400).json(errors);
    }

    const ad_id = req.body.id;

    Ad.findOne({ _id: ad_id }).then((city) => {
      if (city) {
        const data = {
          name: req.body.name,
          tel: req.body.tel,
          internal_link: req.body.internal_link,
          external_link: req.body.external_link,
          date: req.body.date,
          media_type: req.body.media_type,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Ad.findOneAndUpdate(
          { _id: ad_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((a) => {
            res.json(a);
          })
          .catch((err) => {
            errors.media_type =
              "There was some error in changing the Ad detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.media_type = "Ad doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markad", cors());
router.post(
  "/markad",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const ad_id = req.body.id;

    // Find user by email
    Ad.findOne({ _id: ad_id }).then((user) => {
      if (user) {
        Ad.findOneAndUpdate(
          { _id: ad_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((a) => {
            res.json(a);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Ad detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Ad detail.";
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
    Ad.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .then((a) => {
        if (a) return res.json(a);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

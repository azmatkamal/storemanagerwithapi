const express = require("express");
const router = express.Router();
const passport = require("passport");
// const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/color");

// Load User model
const Color = require("../../models/Color");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Color.findOne({
      en_name: req.body.en_name.toLowerCase(),
      is_deleted: false,
    }).then((b) => {
      if (b) {
        errors.en_name = "COlor already exists";
        return res.status(400).json(errors);
      } else {
        const newColor = new Color({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          code: req.body.code,
          updatedBy: req.user.id,
          createdBy: req.user.id,
        });

        newColor
          .save()
          .then((color) => res.json(color))
          .catch((err) => console.log(err));
      }
    });
  }
);

router.options("/", cors());
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const Color_id = req.body.id;

    Color.findOne({ _id: Color_id }).then((color) => {
      if (color) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          code: req.body.code,
          updatedBy: req.user.id,
        };

        Color.findOneAndUpdate(
          { _id: Color_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((color) => {
            res.json(color);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the COlor detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "COlor doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markcolor", cors());
router.post(
  "/markcolor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const Color_id = req.body.id;

    // Find user by email
    Color.findOne({ _id: Color_id }).then((color) => {
      if (color) {
        Color.findOneAndUpdate(
          { _id: Color_id },
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
            errors.msg = "Error while updating the COlor detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the COlor detail.";
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
    Color.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((color) => {
        if (color) return res.json(color);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

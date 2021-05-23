const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/district");

// Load User model
const District = require("../../models/District");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
    }

    District.findOne({
      en_name: new RegExp(["^", req.body.en_name, "$"].join(""), "i"),
      is_deleted: false,
    }).then((user) => {
      if (user) {
        errors.en_name = "District already exists";
        return res.status(400).json(errors);
      } else {
        const newDistrict = new District({
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          country: req.body.country,
          city: req.body.city,
          icon,
        });

        newDistrict
          .save()
          .then((district) => res.json(district))
          .catch((err) => console.log(err));
      }
    });
  }
);

router.options("/", cors());
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const district_id = req.body.id;

    District.findOne({ _id: district_id }).then((district) => {
      if (district) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          country: req.body.country,
          city: req.body.city,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        District.findOneAndUpdate(
          { _id: district_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((district) => {
            res.json(district);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the district detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "district doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markdistrict", cors());
router.post(
  "/markdistrict",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const district_id = req.body.id;

    // Find user by email
    District.findOne({ _id: district_id }).then((district) => {
      if (district) {
        District.findOneAndUpdate(
          { _id: district_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((district) => {
            res.json(district);
          })
          .catch((err) => {
            errors.msg = "Error while updating the district detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the district detail.";
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
    District.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .populate("country")
      .populate("city")
      .then((districts) => {
        if (districts) return res.json(districts);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

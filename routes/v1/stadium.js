const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/stadium");

// Load User model
const Stadium = require("../../models/Stadium");
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

    Stadium.findOne({
      en_name: req.body.en_name.toLowerCase(),
    }).then((user) => {
      if (user) {
        errors.en_name = "Stadium already exists";
        return res.status(400).json(errors);
      } else {
        const newStadium = new Stadium({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          country: req.body.country,
          city: req.body.city,
          district: req.body.district,
          lng: req.body.lng,
          lat: req.body.lat,
          icon,
        });

        newStadium
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

    Stadium.findOne({ _id: district_id }).then((district) => {
      if (district) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          country: req.body.country,
          city: req.body.city,
          district: req.body.district,
          lng: req.body.lng,
          lat: req.body.lat,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Stadium.findOneAndUpdate(
          { _id: district_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((district) => {
            res.json(district);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Stadium detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Stadium doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markstadium", cors());
router.post(
  "/markstadium",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const district_id = req.body.id;

    // Find user by email
    Stadium.findOne({ _id: district_id }).then((district) => {
      if (district) {
        Stadium.findOneAndUpdate(
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
            errors.msg = "Error while updating the Stadium detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Stadium detail.";
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
    Stadium.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .populate("country")
      .populate("city")
      .populate("district")
      .then((districts) => {
        // console.log(districts);
        if (districts) return res.json(districts);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

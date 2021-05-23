const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/country");

// Load User model
const Country = require("../../models/Country");
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

    Country.findOne({
      en_name: new RegExp(["^", req.body.en_name, "$"].join(""), "i"),
      is_deleted: false,
    }).then((user) => {
      if (user) {
        errors.en_name = "Country already exists";
        return res.status(400).json(errors);
      } else {
        const newCountry = new Country({
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          description: req.body.description,
          country_code: req.body.country_code,
          country_phone_code: req.body.country_phone_code,
          timezone: req.body.timezone,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newCountry
          .save()
          .then((country) => res.json(country))
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

    const country_id = req.body.id;

    Country.findOne({ _id: country_id }).then((country) => {
      if (country) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          description: req.body.description,
          country_code: req.body.country_code,
          country_phone_code: req.body.country_phone_code,
          timezone: req.body.timezone,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Country.findOneAndUpdate(
          { _id: country_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((country) => {
            res.json(country);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the country detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Country doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markcountry", cors());
router.post(
  "/markcountry",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const country_id = req.body.id;

    // Find user by email
    Country.findOne({ _id: country_id }).then((user) => {
      if (user) {
        Country.findOneAndUpdate(
          { _id: country_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            errors.msg = "Error while updating the country detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the country detail.";
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
    Country.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((countries) => {
        if (countries) return res.json(countries);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

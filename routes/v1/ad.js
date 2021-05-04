const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/ad");

// Load User model
const City = require("../../models/Ad");
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

    City.findOne({
      link: req.body.link.toLowerCase(),
    }).then((user) => {
      if (user) {
        errors.link = "Main Ad already exists";
        return res.status(400).json(errors);
      } else {
        const newCity = new City({
          link: req.body.link.toLowerCase(),
          country: req.body.country,
          icon,
        });

        newCity
          .save()
          .then((city) => res.json(city))
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

    const city_id = req.body.id;

    City.findOne({ _id: city_id }).then((city) => {
      if (city) {
        const data = {
          link: req.body.link,
          country: req.body.country,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        City.findOneAndUpdate(
          { _id: city_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((city) => {
            res.json(city);
          })
          .catch((err) => {
            errors.link =
              "There was some error in changing the Main Ad detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.link = "Main Ad doesn't exist";
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
    const city_id = req.body.id;

    // Find user by email
    City.findOne({ _id: city_id }).then((user) => {
      if (user) {
        City.findOneAndUpdate(
          { _id: city_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((city) => {
            res.json(city);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Main Ad detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Main Ad detail.";
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
    City.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .populate("country")
      .then((cities) => {
        if (cities) return res.json(cities);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

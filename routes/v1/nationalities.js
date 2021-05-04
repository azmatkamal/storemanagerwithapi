const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/nationalities");

// Load User model
const Nationalities = require("../../models/Nationalities");
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

    Nationalities.findOne({
      en_name: req.body.en_name.toLowerCase(),
    }).then((nationality) => {
      if (nationality) {
        errors.en_name = "Nationality already exists";
        return res.status(400).json(errors);
      } else {
        const newNationalities = new Nationalities({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          icon,
        });

        newNationalities
          .save()
          .then((nationalities) => res.json(nationalities))
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

    Nationalities.findOne({ _id: country_id }).then((nationalities) => {
      if (nationalities) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Nationalities.findOneAndUpdate(
          { _id: country_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((nationalities) => {
            res.json(nationalities);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Nationality detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Nationality doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/marknationality", cors());
router.post(
  "/marknationality",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const nationality_id = req.body.id;

    // Find user by email
    Nationalities.findOne({ _id: nationality_id }).then((user) => {
      if (user) {
        Nationalities.findOneAndUpdate(
          { _id: nationality_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((nationalities) => {
            res.json(nationalities);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Nationality detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Nationality detail.";
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
    Nationalities.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .then((nationalities) => {
        if (nationalities) return res.json(nationalities);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

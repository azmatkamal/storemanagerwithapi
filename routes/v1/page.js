const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");
const isEmpty = require("../../validation/is-empty");

// Load User model
const Country = require("../../models/Page");
const cors = require("cors");

router.options("/", cors());
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    Country.findOne().then((country) => {
      if (country) {
        const data = {
          ar_terms: req.body.ar_terms,
          ar_privacy: req.body.ar_privacy,
          terms: req.body.terms,
          privacy: req.body.privacy,
        };

        Country.findOneAndUpdate(
          {},
          { $set: data },
          { useFindAndModify: false }
        )
          .then((country) => {
            res.json(country);
          })
          .catch((err) => {
            errors.terms = "There was some error in changing the page detail.";
            res.status(404).json(errors);
          });
      } else {
        const newCountry = new Country({
          terms: req.body.terms,
          privacy: req.body.privacy,
          ar_terms: req.body.ar_terms,
          ar_privacy: req.body.ar_privacy,
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
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Country.findOne()
      .sort({ createdAt: -1 })
      .then((countries) => {
        if (countries) return res.json(countries);

        return res.json({});
      })
      .catch((err) => {
        res.json({});
      });
  }
);

module.exports = router;

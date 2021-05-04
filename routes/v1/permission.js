const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/permissions");

// Load User model
const City = require("../../models/Permission");
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

    City.findOne({
      link: req.body.link.toLowerCase(),
    }).then((user) => {
      if (user) {
        errors.link = "Link already exists";
        return res.status(400).json(errors);
      } else {
        const newCity = new City({
          link: req.body.link.toLowerCase(),
          name: req.body.name,
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
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const link_id = req.body.id;

    City.findOne({ _id: link_id }).then((city) => {
      if (city) {
        const data = {
          link: req.body.link.toLowerCase(),
          name: req.body.name,
        };

        City.findOneAndUpdate(
          { _id: link_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((city) => {
            res.json(city);
          })
          .catch((err) => {
            errors.link =
              "There was some error in changing the Permission detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.link = "Permission details doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markpermission", cors());
router.post(
  "/markpermission",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const link_id = req.body.id;

    // Find user by email
    City.findOne({ _id: link_id }).then((user) => {
      if (user) {
        City.findOneAndUpdate(
          { _id: link_id },
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
            errors.msg = "Error while updating the Link detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Link detail.";
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

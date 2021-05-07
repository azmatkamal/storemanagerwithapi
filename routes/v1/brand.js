const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/brand");

// Load User model
const Brand = require("../../models/Brand");
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

    Brand.findOne({
      en_name: req.body.en_name.toLowerCase(),
    }).then((b) => {
      if (b) {
        errors.en_name = "Brand already exists";
        return res.status(400).json(errors);
      } else {
        const newBrand = new Brand({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newBrand
          .save()
          .then((brand) => res.json(brand))
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

    Brand.findOne({ _id: country_id }).then((brand) => {
      if (brand) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Brand.findOneAndUpdate(
          { _id: country_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((brand) => {
            res.json(brand);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Brand detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Brand doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markbrand", cors());
router.post(
  "/markbrand",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const brand_id = req.body.id;

    // Find user by email
    Brand.findOne({ _id: brand_id }).then((user) => {
      if (user) {
        Brand.findOneAndUpdate(
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
            errors.msg = "Error while updating the Brand detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Brand detail.";
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
    Brand.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((brands) => {
        if (brands) return res.json(brands);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/brand");

// Load User model
const Model = require("../../models/Model");
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

    Model.findOne({
      en_name: req.body.en_name.toLowerCase(),
    }).then((model) => {
      if (model) {
        errors.en_name = "Model already exists";
        return res.status(400).json(errors);
      } else {
        const newBrand = new Model({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          year: req.body.year,
          brand: req.body.brand,
          icon,
        });

        newBrand
          .save()
          .then((model) => res.json(model))
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

    const model_id = req.body.id;

    Model.findOne({ _id: model_id }).then((model) => {
      if (model) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          year: req.body.year,
          brand: req.body.brand,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Model.findOneAndUpdate(
          { _id: model_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((model) => {
            res.json(model);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Model detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Model doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markmodel", cors());
router.post(
  "/markmodel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const brand = req.body.id;

    // Find user by email
    Model.findOne({ _id: brand }).then((model) => {
      if (model) {
        Model.findOneAndUpdate(
          { _id: brand },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((model) => {
            res.json(model);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Model detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Model detail.";
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
    Model.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .populate("brand")
      .populate("createdBy")
      .populate("updatedBy")
      .then((model) => {
        if (model) return res.json(model);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

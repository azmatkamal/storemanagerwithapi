const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/category");

// Load User model
const Category = require("../../models/Category");
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

    Category.findOne({
      en_name: req.body.en_name.toLowerCase(),
      is_deleted: false,
    }).then((user) => {
      if (user) {
        errors.en_name = "Category already exists";
        return res.status(400).json(errors);
      } else {
        const newCategory = new Category({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newCategory
          .save()
          .then((category) => res.json(category))
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

    const category_id = req.body.id;

    Category.findOne({ _id: category_id }).then((category) => {
      if (category) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Category.findOneAndUpdate(
          { _id: category_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((category) => {
            res.json(category);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Category detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Category doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markcategory", cors());
router.post(
  "/markcategory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const Category_id = req.body.id;

    // Find user by email
    Category.findOne({ _id: Category_id }).then((user) => {
      if (user) {
        Category.findOneAndUpdate(
          { _id: Category_id },
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
            errors.msg = "Error while updating the Category detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Category detail.";
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
    Category.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((category) => {
        if (category) return res.json(category);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

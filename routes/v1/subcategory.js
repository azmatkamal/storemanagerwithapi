const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/subcategory");

// Load User model
const SubCategory = require("../../models/Subcategory");
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

    SubCategory.findOne({
      en_name: new RegExp(["^", req.body.en_name, "$"].join(""), "i"),
      is_deleted: false,
    }).then((user) => {
      if (user) {
        errors.en_name = "Sub Category already exists";
        return res.status(400).json(errors);
      } else {
        const newSubCategory = new SubCategory({
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          category: req.body.category,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newSubCategory
          .save()
          .then((subcategory) => res.json(subcategory))
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

    const subcategory_id = req.body.id;

    SubCategory.findOne({ _id: subcategory_id }).then((subcategory) => {
      if (subcategory) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          category: req.body.category,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        SubCategory.findOneAndUpdate(
          { _id: Subcategory_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((subcategory) => {
            res.json(subcategory);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Sub Category detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Sub Category doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/marksubcategory", cors());
router.post(
  "/marksubcategory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const subCategory_id = req.body.id;

    // Find user by email
    SubCategory.findOne({ _id: subCategory_id }).then((subcategory) => {
      if (subcategory) {
        SubCategory.findOneAndUpdate(
          { _id: subCategory_id },
          {
            $set: {
              is_active,
              is_deleted,
            },
          },
          { useFindAndModify: false }
        )
          .then((subcategory) => {
            res.json(subcategory);
          })
          .catch((err) => {
            errors.msg = "Error while updating the Sub Category detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Sub Category detail.";
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
    SubCategory.find({ is_deleted: false })
      .populate("category")
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((subcategory) => {
        if (subcategory) return res.json(subcategory);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

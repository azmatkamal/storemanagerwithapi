const express = require("express");
const router = express.Router();
const passport = require("passport");
// const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/product");

// Load User model
const Product = require("../../models/Product");
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

    Product.findOne({
      en_name: new RegExp(["^", req.body.en_name, "$"].join(""), "i"),
      is_deleted: false,
    }).then((b) => {
      if (b) {
        errors.en_name = "Product already exists";
        return res.status(400).json(errors);
      } else {
        let colors = [];
        if (req.body.colors) {
          req.body.colors && req.body.colors.indexOf(",") >= 0
            ? req.body.colors.split(",").map((i) => ({
                id: i,
              }))
            : req.body.colors
            ? [req.body.colors]
            : [];
        }
        const newProduct = new Product({
          en_name: req.body.en_name,
          sub_category: req.body.sub_category,
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          en_treatment: req.body.en_treatment,
          ar_treatment: req.body.ar_treatment,
          width: req.body.width,
          height: req.body.height,
          size: req.body.size,
          price: req.body.price,
          category: req.body.category,
          currency_code: req.body.currency_code,
          is_featured: req.body.is_featured,
          stock_count: req.body.stock_count,
          stock_alert: req.body.stock_alert,
          img1: req.body.img1,
          img2: req.body.img2,
          img3: req.body.img3,
          colors,
          updatedBy: req.user.id,
          createdBy: req.user.id,
        });

        newProduct
          .save()
          .then((product) => res.json(product))
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

    const Product_id = req.body.id;

    Product.findOne({ _id: Product_id }).then((product) => {
      if (product) {
        let colors = [];
        if (req.body.colors) {
          colors =
            req.body.colors && req.body.colors.indexOf(",") >= 0
              ? req.body.colors.split(",").map((i) => ({
                  id: i,
                }))
              : req.body.colors
              ? [req.body.colors]
              : [];
        }
        const data = {
          updatedBy: req.user.id,
          sub_category: req.body.sub_category,
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          en_treatment: req.body.en_treatment,
          ar_treatment: req.body.ar_treatment,
          width: req.body.width,
          height: req.body.height,
          size: req.body.size,
          price: req.body.price,
          category: req.body.category,
          currency_code: req.body.currency_code,
          is_featured: req.body.is_featured,
          stock_count: req.body.stock_count,
          stock_alert: req.body.stock_alert,
          colors,
        };
        if (req.body.img1) data.img1 = req.body.img1;
        if (req.body.img2) data.img2 = req.body.img2;
        if (req.body.img3) data.img3 = req.body.img3;

        Product.findOneAndUpdate(
          { _id: Product_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((product) => {
            res.json(product);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Product detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Product doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markProduct", cors());
router.post(
  "/markProduct",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const Product_id = req.body.id;

    // Find user by email
    Product.findOne({ _id: Product_id }).then((product) => {
      if (product) {
        Product.findOneAndUpdate(
          { _id: Product_id },
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
            errors.msg = "Error while updating the Product detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Product detail.";
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
    Product.find({ is_deleted: false })
      .populate("colors.id")
      .populate("sub_category")
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((product) => {
        if (product) return res.json(product);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

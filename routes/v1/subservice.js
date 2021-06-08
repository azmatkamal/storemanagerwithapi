const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/subservice");

// Load User model
const Subservice = require("../../models/SubService");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    // console.log(req.body);
    const { errors, isValid } = validateCreateInput(req.body);
    // console.log(errors);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
    }

    Subservice.findOne({
      en_name: new RegExp(["^", req.body.en_name, "$"].join(""), "i"),
      is_deleted: false,
    }).then((b) => {
      if (b) {
        errors.en_name = "Sub service already exists";
        return res.status(400).json(errors);
      } else {
        const newSubservice = new Subservice({
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          price: req.body.price,
          service: req.body.service,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newSubservice
          .save()
          .then((subservice) => res.json(subservice))
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

    const Subservice_id = req.body.id;

    Subservice.findOne({ _id: Subservice_id }).then((subservice) => {
      if (subservice) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          service: req.body.service,
          price: req.body.price,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Subservice.findOneAndUpdate(
          { _id: Subservice_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((subservice) => {
            res.json(subservice);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Sub service detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Sub service doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/marksubservice", cors());
router.post(
  "/marksubservice",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const subservice_id = req.body.id;

    // Find user by email
    Subservice.findOne({ _id: subservice_id }).then((subservice) => {
      if (subservice) {
        Subservice.findOneAndUpdate(
          { _id: subservice_id },
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
            errors.msg = "Error while updating the Sub service detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Sub service detail.";
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
    Subservice.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .populate("service")
      .sort({ createdAt: -1 })
      .then((subservice) => {
        // console.log(subservice);
        if (subservice) return res.json(subservice);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

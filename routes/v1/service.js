const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/service");

// Load User model
const Service = require("../../models/Service");
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

    // let banner = "";
    // if (req.files.banner) {
    //   banner = req.files.banner[0].path;
    // }

    Service.findOne({
      en_name: req.body.en_name.toLowerCase(),
    }).then((b) => {
      if (b) {
        errors.en_name = "Service already exists";
        return res.status(400).json(errors);
      } else {
        const newService = new Service({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newService
          .save()
          .then((service) => res.json(service))
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
  // Uploader.fields([{ name: "banner", maxCount: 1 }]),
  (req, res) => {
    const { errors, isValid } = validateCreateInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const service_id = req.body.id;

    Service.findOne({ _id: service_id }).then((service) => {
      if (service) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          en_desc: req.body.en_desc,
          ar_desc: req.body.ar_desc,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }
        // if (req.files.banner) {
        //   data.banner = req.files.banner[0].path;
        // }

        Service.findOneAndUpdate(
          { _id: service_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((service) => {
            res.json(service);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Service detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Service doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markservice", cors());
router.post(
  "/markservice",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const Service_id = req.body.id;

    // Find user by email
    Service.findOne({ _id: Service_id }).then((service) => {
      if (service) {
        Service.findOneAndUpdate(
          { _id: Service_id },
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
            errors.msg = "Error while updating the Service detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Service detail.";
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
    Service.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((service) => {
        if (service) return res.json(service);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

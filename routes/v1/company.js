const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateCreateInput = require("../../validation/company");

// Load User model
const Company = require("../../models/Company");
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

    Company.findOne({
      en_name: req.body.en_name.toLowerCase(),
      is_deleted: false,
    }).then((user) => {
      if (user) {
        errors.en_name = "Company already exists";
        return res.status(400).json(errors);
      } else {
        const newCompany = new Company({
          en_name: req.body.en_name.toLowerCase(),
          ar_name: req.body.ar_name,
          ar_desc: req.body.ar_desc,
          en_desc: req.body.en_desc,
          address: req.body.address,
          lat: req.body.lat,
          lng: req.body.lng,
          tel: req.body.tel,
          mobile1: req.body.mobile1,
          mobile2: req.body.mobile2,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          snapchat: req.body.snapchat,
          youtube: req.body.youtube,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newCompany
          .save()
          .then((company) => res.json(company))
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

    // console.log(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const Company_id = req.body.id;

    Company.findOne({ _id: Company_id }).then((company) => {
      if (company) {
        const data = {
          en_name: req.body.en_name,
          ar_name: req.body.ar_name,
          ar_desc: req.body.ar_desc,
          en_desc: req.body.en_desc,
          address: req.body.address,
          lat: req.body.lat,
          lng: req.body.lng,
          tel: req.body.tel,
          mobile1: req.body.mobile1,
          mobile2: req.body.mobile2,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          snapchat: req.body.snapchat,
          youtube: req.body.youtube,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        Company.findOneAndUpdate(
          { _id: Company_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((company) => {
            res.json(company);
          })
          .catch((err) => {
            errors.en_name =
              "There was some error in changing the Company detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.en_name = "Company doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/markcompany", cors());
router.post(
  "/markcompany",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const Company_id = req.body.id;

    // Find user by email
    Company.findOne({ _id: Company_id }).then((user) => {
      if (user) {
        Company.findOneAndUpdate(
          { _id: Company_id },
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
            errors.msg = "Error while updating the Company detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the Company detail.";
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
    Company.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((company) => {
        if (company) return res.json(company);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

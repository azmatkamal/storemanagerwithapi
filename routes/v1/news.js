const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");

// Load User model
const News = require("../../models/News");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    let errors = {};
    if (!req.body.header || !req.body.header.trim()) {
      errors.header = "Header is required";
      return res.status(400).json(errors);
    }
    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
    } else {
      icon =
        "data:image/jpeg;base64,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";
    }

    News.findOne({
      header: new RegExp(["^", req.body.header, "$"].join(""), "i"),
      is_deleted: false,
    }).then((b) => {
      if (b) {
        errors.header = "News already exists";
        return res.status(400).json(errors);
      } else {
        const newNews = new News({
          description: req.body.description,
          header: req.body.header,
          client_name: req.body.client_name,
          ar_description: req.body.ar_description,
          ar_header: req.body.ar_header,
          ar_client_name: req.body.ar_client_name,
          brand: req.body.brand,
          model: req.body.model,
          subservice: req.body.subservice,
          service: req.body.service,
          year: req.body.year,
          allow_comment: req.body.allow_comment,
          date: req.body.date,
          updatedBy: req.user.id,
          createdBy: req.user.id,
          icon,
        });

        newNews
          .save()
          .then((news) => res.json(news))
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
    const news_id = req.body.id;

    News.findOne({ _id: news_id }).then((news) => {
      if (news) {
        const data = {
          description: req.body.description,
          header: req.body.header,
          client_name: req.body.client_name,
          ar_description: req.body.ar_description,
          ar_header: req.body.ar_header,
          ar_client_name: req.body.ar_client_name,
          brand: req.body.brand,
          model: req.body.model,
          subservice: req.body.subservice,
          service: req.body.service,
          year: req.body.year,
          allow_comment: req.body.allow_comment,
          date: req.body.date,
          updatedBy: req.user.id,
        };
        if (req.files.icon) {
          data.icon = req.files.icon[0].path;
        }

        News.findOneAndUpdate(
          { _id: news_id },
          { $set: data },
          { useFindAndModify: false }
        )
          .then((news) => {
            res.json(news);
          })
          .catch((err) => {
            errors.header = "There was some error in changing the news detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.header = "News doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/marknews", cors());
router.post(
  "/marknews",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const news_id = req.body.id;

    // Find user by email
    News.findOne({ _id: news_id }).then((user) => {
      if (user) {
        News.findOneAndUpdate(
          { _id: news_id },
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
            errors.msg = "Error while updating the News detail.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the News detail.";
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
    News.find({ is_deleted: false })
      .populate("createdBy")
      .populate("updatedBy")
      .sort({ createdAt: -1 })
      .then((news) => {
        if (news) return res.json(news);
        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

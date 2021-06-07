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
          brand: req.body.brand,
          model: req.body.model,
          subservice: req.body.subservice,
          service: req.body.service,
          year: req.body.year,
          allow_comment: req.body.allow_comment,
          client_name: req.body.client_name,
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
          brand: req.body.brand,
          model: req.body.model,
          subservice: req.body.subservice,
          service: req.body.service,
          year: req.body.year,
          allow_comment: req.body.allow_comment,
          client_name: req.body.client_name,
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

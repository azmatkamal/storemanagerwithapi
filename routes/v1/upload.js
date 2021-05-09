const express = require("express");
const router = express.Router();
const passport = require("passport");
const Uploader = require("../../config/uploader");
const cors = require("cors");

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    let icon = "";

    if (req.files.icon) {
      icon = req.files.icon[0].path;
      return res.json({ icon });
    }
    return res.json({ icon: null });
  }
);

module.exports = router;

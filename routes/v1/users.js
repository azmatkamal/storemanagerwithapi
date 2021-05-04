const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");
const Uploader = require("../../config/uploader");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const cors = require("cors");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.options("/register", cors());
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email.toLowerCase(), {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        user_type: "2",
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.options("/", cors());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  Uploader.fields([{ name: "icon", maxCount: 1 }]),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({
      email: req.body.email.toLowerCase(),
    }).then((user) => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        let avatar = gravatar.url(req.body.email.toLowerCase(), {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm", // Default
        });

        if (req.files.icon) {
          avatar = req.files.icon[0].path;
        }

        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email.trim().toLowerCase(),
          mobile: req.body.mobile,
          permissions:
            req.body.permissions & Array.isArray(req.body.permissions)
              ? req.body.permissions
              : [],
          user_type: "2",
          avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
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
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user_id = req.body.id;

    let permissions = [];
    if (req.body.permissions) {
      permissions = req.body.permissions.split(",").map((i) => ({
        id: i,
      }));
    }

    User.findOne({ _id: user_id }).then((user) => {
      if (user) {
        const data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile: req.body.mobile,
          permissions: permissions,
        };

        if (req.files.icon) {
          data.avatar = req.files.icon[0].path;
        }

        const password = req.body.password;

        if (password) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              data.password = hash;
              User.findOneAndUpdate(
                { _id: user_id },
                { $set: data },
                { useFindAndModify: false }
              )
                .then((user) => {
                  res.json(user);
                })
                .catch((err) => {
                  errors.password =
                    "There was some error in changing the password.";
                  res.status(404).json(errors);
                });
            });
          });
        } else {
          User.findOneAndUpdate(
            { _id: user_id },
            { $set: data },
            { useFindAndModify: false }
          )
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              console.log(err);
              errors.password =
                "There was some error in changing the password 2.";
              res.status(404).json(errors);
            });
        }
      } else {
        errors.email = "Email doesn't exist";
        return res.status(400).json(errors);
      }
    });
  }
);

router.options("/login", cors());
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Find user by email
  User.findOne({ email, is_active: true, is_deleted: false })
    .populate("permissions.id")
    .then((user) => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            permissions: user.permissions,
            avatar: user.avatar,
            user_type: user.user_type,
            is_active: user.is_active,
            is_deleted: user.is_deleted,
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
});

router.options("/changepassword", cors());
router.post(
  "/changepassword/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    let isValid = true;

    if (isEmpty(req.body.user_id)) {
      isValid = false;
      errors.password = "There was error is change the password.";
    }

    if (isEmpty(req.body.password)) {
      isValid = false;
      errors.password = "Enter the old password.";
    }

    if (isEmpty(req.body.npassword)) {
      isValid = false;
      errors.npassword = "Enter the new password.";
    }

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user_id = req.body.user_id;
    const password = req.body.password;
    const npassword = req.body.npassword;

    // Find user by email
    User.findOne({ _id: user_id }).then((user) => {
      // Check for user
      if (!user) {
        errors.password = "User not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const data = {
            password: npassword,
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              if (err) throw err;
              data.password = hash;
              User.findOneAndUpdate(
                { _id: user_id },
                { $set: data },
                { new: true }
              )
                .then((user) => {
                  // console.log(user);
                  res.json(user);
                })
                .catch((err) => {
                  errors.password =
                    "There was some error in changing the password.";
                  res.status(404).json(errors);
                });
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
);

router.options("/markaccount", cors());
router.post(
  "/markaccount",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    const is_active = req.body.is_active;
    const is_deleted = req.body.is_deleted;
    const user_id = req.body.id;

    // Find user by email
    User.findOne({ _id: user_id }).then((user) => {
      if (user) {
        User.findOneAndUpdate(
          { _id: user_id },
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
            errors.msg = "Error while updating the user.";
            res.status(404).json(errors);
          });
      } else {
        errors.msg = "Error while updating the user.";
        res.status(404).json(errors);
      }
    });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      user_type: req.user.user_type,
      permissions: req.user.permissions,
      email: req.user.email.toLowerCase(),
    });
  }
);

router.options("/", cors());
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Find user by email
    User.find({ is_deleted: false })
      .sort({ createdAt: -1 })
      .populate("permissions.id")
      .then((users) => {
        if (users) return res.json(users);

        return res.json([]);
      })
      .catch((err) => {
        res.json([]);
      });
  }
);

module.exports = router;

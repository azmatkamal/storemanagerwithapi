const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.ar_name = !isEmpty(data.ar_name) ? data.ar_name : "";
  data.en_name = !isEmpty(data.en_name) ? data.en_name : "";
  data.en_desc = !isEmpty(data.en_desc) ? data.en_desc : "";
  data.ar_desc = !isEmpty(data.ar_desc) ? data.ar_desc : "";

  if (!Validator.isLength(data.ar_name, { min: 2, max: 30 })) {
    errors.ar_name = "Arabic Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.en_name, { min: 2, max: 30 })) {
    errors.en_name = "English Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.ar_desc, { min: 2, max: 1000 })) {
    errors.ar_desc = "Arabic Description must be between 2 and 1000 characters";
  }

  if (!Validator.isLength(data.en_desc, { min: 2, max: 1000 })) {
    errors.en_desc =
      "English Description must be between 2 and 1000 characters";
  }

  if (Validator.isEmpty(data.ar_name)) {
    errors.ar_name = "Arabic Name field is required";
  }

  if (Validator.isEmpty(data.en_name)) {
    errors.en_name = "English Name field is required";
  }

  if (Validator.isEmpty(data.ar_desc)) {
    errors.ar_desc = "Arabic Description field is required";
  }

  if (Validator.isEmpty(data.en_desc)) {
    errors.en_desc = "English Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

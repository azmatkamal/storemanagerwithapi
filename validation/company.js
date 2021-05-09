const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.ar_name = !isEmpty(data.ar_name) ? data.ar_name : "";
  data.en_name = !isEmpty(data.en_name) ? data.en_name : "";
  // data.ar_desc = !isEmpty(data.ar_desc) ? data.ar_desc : "";
  // data.en_desc = !isEmpty(data.en_desc) ? data.en_desc : "";
  // data.address = !isEmpty(data.address) ? data.address : "";
  // data.location = !isEmpty(data.location) ? data.location : "";
  // data.tel = !isEmpty(data.tel) ? data.tel : "";
  // data.mobile1 = !isEmpty(data.mobile1) ? data.mobile1 : "";
  // data.mobile2 = !isEmpty(data.mobile2) ? data.mobile2 : "";
  // data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
  // data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
  // data.instagram = !isEmpty(data.instagram) ? data.instagram : "";
  // data.snapchat = !isEmpty(data.snapchat) ? data.snapchat : "";
  // data.youtube = !isEmpty(data.youtube) ? data.youtube : "";

  if (!Validator.isLength(data.ar_name, { min: 2, max: 30 })) {
    errors.ar_name = "Arabic Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.en_name, { min: 2, max: 30 })) {
    errors.en_name = "English Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.ar_name)) {
    errors.ar_name = "Arabic Name field is required";
  }

  if (Validator.isEmpty(data.en_name)) {
    errors.en_name = "English Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

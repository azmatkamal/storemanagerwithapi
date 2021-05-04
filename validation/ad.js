const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.link = !isEmpty(data.link) ? data.link : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (!Validator.isURL(data.link)) {
    errors.link = "Link field must contain valid URL";
  }

  if (Validator.isEmpty(data.link)) {
    errors.link = "Link field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

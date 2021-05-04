const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.link = !isEmpty(data.link) ? data.link : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.link)) {
    errors.link = "Link field is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.ar_name = !isEmpty(data.ar_name) ? data.ar_name : "";
  data.en_name = !isEmpty(data.en_name) ? data.en_name : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.district = !isEmpty(data.district) ? data.district : "";
  data.lat = !isEmpty(data.lat) ? data.lat : "";
  data.lng = !isEmpty(data.lng) ? data.lng : "";

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

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  if (Validator.isEmpty(data.district)) {
    errors.district = "District field is required";
  }

  if (Validator.isEmpty(data.lat)) {
    errors.lat = "Latitude field is required";
  }

  if (Validator.isEmpty(data.lng)) {
    errors.lng = "Longitude field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

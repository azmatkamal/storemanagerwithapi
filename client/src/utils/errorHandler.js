import { GET_ALERTS, GET_ERRORS, UNSET_GLOBAL_LOADING } from "../redux/types";

const error = err => {
  let arrObj = [];

  // console.log(err.response);

  if (err.response && err.response.status) {
    let status = err.response.status;
    if (status > 399 && status < 500) {
      // INTERNAL SERVER ERROR
      if (status === 404) {
        arrObj.push({
          type: GET_ALERTS,
          payload: {
            type: err.response.data.type === "danger" ? "error" : "warning",
            msg: err.response.data.msg
          }
        });
      } else {
        if (err.response.data) {
          arrObj.push({
            type: GET_ERRORS,
            payload: err.response.data
          });
        } else {
          arrObj.push({
            type: GET_ALERTS,
            payload: {
              type: err.response.data.type === "danger" ? "error" : "warning",
              msg: err.response.data.msg
            }
          });
        }
      }
    }
    if (status > 499 && status < 600) {
      // CLIENT ERROR
      arrObj.push({
        type: GET_ALERTS,
        payload: {
          type: "error",
          msg: "Network or Server error."
        }
      });
    }

    arrObj.push({
      type: UNSET_GLOBAL_LOADING
    });
    return arrObj;
  }

  //   if (err.response && err.response.data && err.response.data.data) {
  //     const { data } = err.response.data;
  //     if (err.response.status && err.response.status === 404) {
  //       arrObj.push({
  //         type: GET_ALERTS,
  //         payload: {
  //           type: "danger",
  //           msg: data
  //         }
  //       });
  //     } else {
  //       dispatch({
  //         type: GET_ERRORS,
  //         payload: err.response.data.data
  //       });
  //     }
  //   } else {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data.data
  //     });
  //   }
};

export default error;

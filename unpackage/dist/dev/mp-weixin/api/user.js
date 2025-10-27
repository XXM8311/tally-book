"use strict";
const api_request = require("./request.js");
const login = (data) => {
  return api_request.request.post("user/login", data);
};
const getCode = (phone) => {
  return api_request.request.get(`user/VerificationCode?phone=${phone}`);
};
const forgotPassword = (data) => {
  return api_request.request.post("user/forgotPasswordByCode", data);
};
exports.forgotPassword = forgotPassword;
exports.getCode = getCode;
exports.login = login;

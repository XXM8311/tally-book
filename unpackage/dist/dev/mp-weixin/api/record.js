"use strict";
const api_request = require("./request.js");
const addRecord = (data) => {
  return api_request.request.post("record/add", data);
};
exports.addRecord = addRecord;

"use strict";

const filterService = require("./services/filterService");

module.exports.filter = async (event) => {
  await filterService.filter_black_and_white(event);
  return {
    message: "Applied black and white filter successfully!",
  };
};

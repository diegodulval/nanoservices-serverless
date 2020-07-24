"use strict";

const thumbnailService = require("./services/thumbnailService");

module.exports.thumbnail = async (event) => {
  await thumbnailService.thumbnail(event);
  return {
    message: "Thumbnail generate successfully!",
  };
};

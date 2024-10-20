const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
const oneOpenTwoOpen = new Schema({
  heightZ: {
  type: Number,
  default: 0,
 },
 vanOpening: {
  type: Number,
  default: 0,
 },
 valueOO: {
  type: Number,
  default: 0,
 },
 isDeleted: {
  type: Boolean,
  default: false,
 }
});
module.exports = mongoose.model("oneOpenTwoOpen", oneOpenTwoOpen);
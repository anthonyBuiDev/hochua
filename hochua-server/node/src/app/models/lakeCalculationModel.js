const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");
const lakeCalculations = new Schema({
 heightZ: {
  type: Number,
  default: 0,
 },
 acreageF: {
  type: Number,
  default: 0,
 },
 capacityV: {
    type: Number,
    default: 0,
 },
 isDeleted: {
  type: Boolean,
  default: false,
 }
});
module.exports = mongoose.model("lakeCalculations", lakeCalculations);
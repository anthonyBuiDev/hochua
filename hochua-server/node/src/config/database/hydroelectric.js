const mongoose = require("mongoose");
async function connectHydroelectric() {
  try {
    mongoose.connect(process.env.MONGO_DB);
    console.log(
      "Connect Hydroelectric-Service thành công !!!"
    );
  } catch (error) {
    console.log("Connect không thành công");
  }
}
module.exports = { connectHydroelectric };
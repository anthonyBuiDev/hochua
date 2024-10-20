const calculationLake = require('./calculationLake');
const vanOpening = require('./vanOpening');
function routes(app) {
  app.use('/api/v1/van-opening', vanOpening);
  app.use('/api/v1/calculation-lake', calculationLake);
}
module.exports = routes;
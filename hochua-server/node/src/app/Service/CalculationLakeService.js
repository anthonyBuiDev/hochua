const lakeCalculationModel = require('../models/LakeCalculationModel');
class CalculationLakeService {
    async create(data) {
      const exist = await lakeCalculationModel.findOne({$and: [{heightZ: data.heightZ}, {isDeleted: false}]});
      if(exist) {
        return 0;
      }
      const lakeCalculationNew = new lakeCalculationModel(data);
      const result = await lakeCalculationNew.save();
      return result;
    }
    async update(data) {
      const exist = await lakeCalculationModel.findOne({$and: [{_id: data._id}, {isDeleted: false}]});
      if(!exist) {
        return 0;
      }
      const result = await lakeCalculationModel.findByIdAndUpdate(data._id, data, {new: true});
      return result;
    }
    async delete(id) {
      const exist = await lakeCalculationModel.findOne({$and: [{_id: id}, {isDeleted: false}]});
      if(!exist) {
        return 0;
      }
      const result = await lakeCalculationModel.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
      return result;
    }
    async calculator(data) {
      const exist = await lakeCalculationModel.findOne({$and:[ {heightZ: data.heightZ}, {isDeleted: false}]});
      if(!exist) {
        return 0;
      }
      const result = { F: exist.acreageF, V: exist.capacityV };
      return result;
    }
    async getAll() {
      const result = await lakeCalculationModel.find({isDeleted: false});
      return result;
    }
}
module.exports = new CalculationLakeService();

const oneOpenTwoCloseModel = require('../models/oneOpenTwoCloseModel');
const oneOpenTwoOpenModel = require('../models/oneOpenTwoOpenModel');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');
class VanOpeningService {
    async createOneOpenTwoClose(data) {
      const validFile = await this.checkFileType(data, 'oneOpenTwoClose');
      const result = await oneOpenTwoCloseModel.insertMany(validFile);
      return result;
    }
    async createOneOpenTwoOpen(data) {
      const validFile = await this.checkFileType(data, 'oneOpenTwoOpen');
      const result = await oneOpenTwoOpenModel.insertMany(validFile);
      return result;
    }
    // async update(data) {
    //   const exist = await oneOpenTwoCloseModel.findOne({$and: [{_id: data._id}, {isDeleted: false}]});
    //   if(!exist) {
    //     return 0;
    //   }
    //   const result = await oneOpenTwoCloseModel.findByIdAndUpdate(data._id, data, {new: true});
    //   return result;
    // }
    // async delete(id) {
    //   const exist = await oneOpenTwoCloseModel.findOne({$and: [{_id: data._id}, {isDeleted: false}]});
    //   if(!exist) {
    //     return 0;
    //   }
    //   const result = await oneOpenTwoCloseModel.findByIdAndUpdate(data._id, {isDeleted: true}, {new: true});
    //   return result;
    // }
    async calculator(data) {
      const exist2Close = await oneOpenTwoCloseModel.findOne({$and:[ {heightZ: data.heightZ}, {vanOpening: data.a1} ,{isDeleted: false}]});
      const exist2Open = await oneOpenTwoOpenModel.findOne({$and:[ {heightZ: data.heightZ}, {vanOpening: data.a2} ,{isDeleted: false}]});
      if(!exist2Close) {
        return 2;
      }
      if(!exist2Open) {
        return 3;
      }
      const result = { q1: exist2Close.valueOC, q2: exist2Open.valueOO, sum: exist2Close.valueOC + exist2Open.valueOO};
      return result;
    }
    async getAllOC() {
      const result = await oneOpenTwoCloseModel.find({isDeleted: false});
      return result;
    }
    async getAllOO() {
      const result = await oneOpenTwoOpenModel.find({isDeleted: false});
      return result;
    }
    async checkFileType(file, type) {
      if(file.filename === null || file.filename == 'undefined') {
       return "File khong ton tai";
      } else {
       const filePath = 'uploads/' + file.filename;
       const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 2,  
        },
        columnToKey: {
          A: 'heightZ',  
          B: '0.1',      
          C: '0.2',     
          D: '0.3',      
          E: '0.4',      
          F: '0.5',
          G: '0.6',
          H: '0.7',
          I: '0.8',
          J: '0.9',
          K: '1',
          L: '1.1',
          M: '1.2',
          N: '1.3',
          O: '1.4',
          P: '1.5',
          Q: '1.6',
          R: '1.7',
          S: '1.8',
          T: '1.9',
          U: '2',
          V: '2.1',
          W: '2.2',
          X: '2.3',
          Y: '2.4',
          Z: '2.5',
          AA: '2.6',
          AB: '2.7',
          AC: '2.8',
          AD: '2.9',
          AE: '3',
          AF: '3.1',
          AG: '3.2',
          AH: '3.3',
          AI: '3.4',
          AJ: '3.5',
          AK: '3.6',
          AL: '3.7',
          AM: '3.8',
          AN: '3.9',
          AO: '4',
          AP: '4.1',
          AQ: '4.2',
          AR: '4.3',
          AS: '4.4',
          AT: '4.5',
          AU: '4.6',
          AV: '4.7',
          AW: '4.8',
          AX: '4.9',
          AY: '5',
          AZ: '5.1',
          BA: '5.2',
          BB: '5.3',
          BC: '5.4',
          BD: '5.5',
          BE: '5.6',
          BF: '5.7',
          BG: '5.8',
          BH: '5.9',
          BI: '6',
          BJ: '6.1',
          BK: '6.2',
          BL: '6.3',
          BM: '6.4',
          BN: '6.5',
          BO: '6.6',
          BP: '6.7',
          BQ: '6.8',
          BR: '6.9',
        }
      });
      
      // Xử lý dữ liệu để biến thành format mong muốn
      const result = [];
      if(type === 'oneOpenTwoClose') {
        excelData["1 mo 2 dong"].forEach((row, rowIndex) => {
          if (rowIndex >= 0) {  // Bỏ qua tiêu đề (dữ liệu từ hàng đầu tiên trong sheet)
        
            // Lặp qua từng cột từ 0.1 đến 3 để lấy các giá trị vanOpening
            Object.keys(row).forEach((key) => {
              if (key !== 'heightZ') {
                result.push({
                  heightZ: row['heightZ'],         // Giá trị heightZ lấy từ cột A
                  vanOpening: parseFloat(key),     // Đổi key thành giá trị float của vanOpening
                  valueOC: row[key] || 0           // Giá trị valueOC, nếu rỗng thì gán 0
                });
              }
            });
          }
        });
      } else {
        excelData["1 mo 2 mo"].forEach((row, rowIndex) => {
          if (rowIndex >= 0) {  // Bỏ qua tiêu đề (dữ liệu từ hàng đầu tiên trong sheet)
        
            // Lặp qua từng cột từ 0.1 đến 3 để lấy các giá trị vanOpening
            Object.keys(row).forEach((key) => {
              if (key !== 'heightZ') {
                result.push({
                  heightZ: row['heightZ'],         // Giá trị heightZ lấy từ cột A
                  vanOpening: parseFloat(key),     // Đổi key thành giá trị float của vanOpening
                  valueOO: row[key] || 0           // Giá trị valueOC, nếu rỗng thì gán 0
                });
              }
            });
          }
        });
      }
       fs.remove(filePath);
       return result;
      }
     
     }
}
module.exports = new VanOpeningService();

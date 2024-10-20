const vanOpeningService = require('../Service/VanOpeningService');
class VanOpeningController {
  async createOneOpenTwoClose(req, res) {
    try {
      const data = req.file;
      const result = await vanOpeningService.createOneOpenTwoClose(data);
      // if(result === 0) {
      //   return res.status(400).json('Cao  trình này đã tồn tại');
      // }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Thêm thất bại', error: error.message});
    }
  }
  async createOneOpenTwoOpen(req, res) {
    try {
      const data = req.file;
      const result = await vanOpeningService.createOneOpenTwoOpen(data);
      // if(result === 0) {
      //   return res.status(400).json('Cao  trình này đã tồn tại');
      // }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Thêm thất bại', error: error.message});
    }
  }
  // async update(req, res) {
  //   try {
  //     const data = req.body;
  //     const result = await calculationLakeService.update(data);
  //     if(result === 0) {
  //       return res.status(400).json('Đặc tính lòng hồ không tồn tại');
  //     }
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return res.status(500).json({result: 'Update thất bại', error: error.message});
  //   }
  // }
  // async delete(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const result = await calculationLakeService.delete(id);
  //     if(result === 0) {
  //       return res.status(400).json('Đặc tính lòng hồ không tồn tại');
  //     }
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return res.status(500).json({result: 'Xóa thất bại', error: error.message});
  //   }
  // }
  async calculator(req, res) {
    try {
      const data = req.body;
      const result = await vanOpeningService.calculator(data);
      if(result === 0) {
        return res.status(400).json('Đặc tính lòng hồ không tồn tại');
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Tính toán thất bại', error: error.message});
    }
  }
  async getAllOC(req, res) {
    try {
      const result = await vanOpeningService.getAllOC();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Lấy danh sách 1 mở 2 đóng thất bại !!!', error: error.message});
    }
  }
  async getAllOO(req, res) {
    try {
      const result = await vanOpeningService.getAllOO();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Lấy danh sách 1 mở 2 mở thất bại !!!', error: error.message});
    }
  }
}
module.exports = new VanOpeningController();
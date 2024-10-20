const calculationLakeService = require('../Service/CalculationLakeService');
class CalculationLakeController {
  async create(req, res) {
    try {
      const data = req.body;
      const result = await calculationLakeService.create(data);
      if(result === 0) {
        return res.status(400).json('Cao  trình này đã tồn tại');
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Thêm thất bại', error: error.message});
    }
  }
  async update(req, res) {
    try {
      const data = req.body;
      const result = await calculationLakeService.update(data);
      if(result === 0) {
        return res.status(400).json('Đặc tính lòng hồ không tồn tại');
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Update thất bại', error: error.message});
    }
  }
  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await calculationLakeService.delete(id);
      if(result === 0) {
        return res.status(400).json('Đặc tính lòng hồ không tồn tại');
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Xóa thất bại', error: error.message});
    }
  }
  async calculator(req, res) {
    try {
      const data = req.body;
      const result = await calculationLakeService.calculator(data);
      if(result === 0) {
        return res.status(400).json('Đặc tính lòng hồ không tồn tại');
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Tính toán thất bại', error: error.message});
    }
  }
  async getAll(req, res) {
    try {
      const result = await calculationLakeService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({result: 'Lấy danh sách thất bại', error: error.message});
    }
  }
}
module.exports = new CalculationLakeController();
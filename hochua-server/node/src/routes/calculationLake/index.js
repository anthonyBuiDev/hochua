const express = require("express");
const calculationLakeController = require("../../app/Controller/CalculationLakeController");

const useRouter = express.Router();
useRouter.delete("/delete/:id", calculationLakeController.delete);
useRouter.post("/update", calculationLakeController.update);
useRouter.post("/calculator", calculationLakeController.calculator);
useRouter.get("/getAll", calculationLakeController.getAll);
useRouter.post("/create", calculationLakeController.create);
module.exports = useRouter;
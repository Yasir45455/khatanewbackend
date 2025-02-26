const express = require("express");
const router = express.Router();
const khataController = require("../controllers/khataController");
const authenticateAdmin = require('../middleWares/authMiddleware');
router.post("/",authenticateAdmin, khataController.addKhata);
router.get("/:clientId",authenticateAdmin, khataController.getKhataByUserId);
router.get("/clients/all",authenticateAdmin, khataController.getAllClientsWithTypes);
router.get("/",authenticateAdmin, khataController.getAllKhatas);
router.delete("/:id",authenticateAdmin, khataController.deleteKhata);

module.exports = router;
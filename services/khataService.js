const Khata = require("../models/Khata");

// Add a new Khata entry
const addKhata = async (khataData) => {
  return await new Khata(khataData).save();
};

// Get Khata by User ID
const getKhataByUserId = async (clientId) => {
  return await Khata.find({ clientId }).populate("clientId", "name");
};

// Delete Khata by ID
const deleteKhata = async (id) => {
  return await Khata.findByIdAndDelete(id);
};

const getAllKhatas = async () => {
  try {
    return await Khata.find();
  } catch (error) {
    throw new Error("Error fetching Khata entries: " + error.message);
  }
};

const getLatestKhata = async (clientId, type) => {
  return await Khata.findOne({ clientId, type }).sort({ createdAt: -1 });
};


module.exports = { addKhata, getKhataByUserId, deleteKhata, getAllKhatas, getLatestKhata };
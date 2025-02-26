const Client = require("../models/Client");

// Create Client
const createClient = async (name) => {
  const client = new Client({ name });
  return await client.save();
};

// Get All Clients
const getClients = async () => {
  return await Client.find();
};

// Get Client By ID
const getClientById = async (id) => {
  return await Client.findById(id);
};

// Update Client
const updateClient = async (id, name) => {
  return await Client.findByIdAndUpdate(id, { name }, { new: true });
};

// Delete Client
const deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };

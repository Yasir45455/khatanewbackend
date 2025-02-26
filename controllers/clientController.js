const clientService = require("../services/clientService");

// Create Client
const createClient = async (req, res) => {
  try {
    const { name } = req.body;
    const client = await clientService.createClient(name);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

// Get All Clients
const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

// Get Client By ID
const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error fetching client", error });
  }
};

// Update Client
const updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body.name);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Error updating client", error });
  }
};

// Delete Client
const deleteClient = async (req, res) => {
  try {
    const client = await clientService.deleteClient(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error });
  }
};

module.exports = { createClient, getClients, getClientById, updateClient, deleteClient };

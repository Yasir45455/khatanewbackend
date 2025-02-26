const khataService = require("../services/khataService");
const KhataModal = require("../models/Khata");

// Add a new Khata entry
// const addKhata = async (req, res) => {
//   try {
//     const { clientId, type, detail, weight, price, vehicleNo, gas11_8Kg, gas15Kg, gas45_4Kg, gasRate, totalPayment, received, remainingTotal } = req.body;
//     if (type.toLowerCase() === 'rubber') {
//       req.body.type = 'Rubber';
//     } else if (type.toLowerCase() === 'gas') {
//       req.body.type = 'Gas';
//     } else if (type.toLowerCase() === 'carbon') {
//       req.body.type = 'Carbon';
//     }
//     else if (type.toLowerCase() === 'taar') {
//       req.body.type = 'Taar';
//     }

//     else {
//       req.body.type = 'Unknown';
//     }


//     if (!["Rubber", "Carbon", "Gas", "Taar"].includes(req.body.type)) {
//       return res.status(400).json({ message: "Invalid type. Allowed: Rubber, Carbon, Gas" });
//     }

//     const khata = await khataService.addKhata({
//       clientId,
//       type,
//       detail,
//       weight,
//       price,
//       vehicleNo,
//       gas11_8Kg,
//       gas15Kg,
//       gas45_4Kg,
//       gasRate,
//       totalPayment,
//       received,
//       remainingTotal
//     });

//     res.status(201).json(khata);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding Khata entry", error });
//   }
// };

const addKhata = async (req, res) => {
  console.log(req.body);

  try {
    const { clientId, type, detail, weight, price, vehicleNo, gas11_8Kg, gas15Kg, gas45_4Kg, gasRate, totalPayment, received, remainingTotal } = req.body;

    // Standardize the type field
    const allowedTypes = { rubber: 'Rubber', gas: 'Gas', carbon: 'Carbon', taar: 'Taar' };
    const standardizedType = allowedTypes[type?.toLowerCase()] || 'Unknown';

    if (!["Rubber", "Carbon", "Gas", "Taar"].includes(standardizedType)) {
      return res.status(400).json({ message: "Invalid type. Allowed: Rubber, Carbon, Gas, Taar" });
    }

    // Get the latest record for the same client and type
    const previousKhata = await khataService.getLatestKhata(clientId, standardizedType);
    console.log("Previous Khata:", previousKhata);

    // Calculate fullTotal
    let fullTotal = remainingTotal;
    if (previousKhata) {
      fullTotal += previousKhata.fullTotal - received;
    }
    
    console.log("Calculated fullTotal:", fullTotal);

    // Save new Khata entry
    const khata = await khataService.addKhata({
      clientId,
      type: standardizedType,
      detail,
      weight,
      price,
      vehicleNo,
      gas11_8Kg,
      gas15Kg,
      gas45_4Kg,
      gasRate,
      totalPayment,
      received,
      remainingTotal,
      fullTotal, // Add fullTotal in the new record
    });

    res.status(201).json(khata);
  } catch (error) {
    console.error("Error adding Khata entry:", error);
    res.status(500).json({ message: "Error adding Khata entry", error });
  }
};



// Get Khata by User ID
const getKhataByUserId = async (req, res) => {
  try {
    const khata = await khataService.getKhataByUserId(req.params.clientId);
    if (!khata.length) return res.status(404).json({ message: "No Khata found for this client" });
    res.status(200).json(khata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Khata entries", error });
  }
};

// Delete Khata by ID
const deleteKhata = async (req, res) => {
  try {
    const khata = await khataService.deleteKhata(req.params.id);
    if (!khata) return res.status(404).json({ message: "Khata entry not found" });
    res.status(200).json({ message: "Khata entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Khata entry", error });
  }
};


const getAllKhatas = async (req, res) => {
  try {
    const khatas = await KhataModal.find(); // Direct database query
    res.status(200).json(khatas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Khata entries", error });
  }
};

const getAllClientsWithTypes = async (req, res) => {
  try {
    // Sab khatas fetch karo + client details populate karo
    const allKhatas = await KhataModal.find().populate("clientId", "name");

    if (!allKhatas.length) {
      return res.status(404).json({ message: "No Khata entries found" });
    }

    // Unique clients store karne ke liye object
    const clientMap = {};

    allKhatas.forEach(khata => {
      const clientId = khata.clientId?._id?.toString(); // Ensure clientId is a string
      const clientName = khata.clientId?.name; // Ensure clientName exists

      if (!clientId || !clientName) return;

      if (!clientMap[clientId]) {
        clientMap[clientId] = {
          clientId: clientId,
          clientName: clientName,
          types: new Set()
        };
      }

      clientMap[clientId].types.add(khata.type);
    });

    // Object ko array me convert karo
    const response = Object.values(clientMap).map(client => ({
      clientId: client.clientId, // Adding clientId in response
      clientName: client.clientName,
      types: Array.from(client.types)
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Khata data", error });
  }
};



module.exports = { addKhata, getKhataByUserId, deleteKhata, getAllKhatas , getAllClientsWithTypes };

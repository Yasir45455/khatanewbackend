const mongoose = require("mongoose");

const khataSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    type: { type: String, enum: ["Rubber", "Carbon", "Gas","Taar"] },
    
    // Common Fields for Rubber & Carbon
    detail: { type: String },
    weight: { type: Number },
    price: { type: Number },
    
    // Gas-Specific Fields
    vehicleNo: { type: String }, 
    gas11_8Kg: { type: Number },
    gas15Kg: { type: Number },
    gas45_4Kg: { type: Number },
    gasRate: { type: Number },
    
    // Payment Details
    totalPayment: { type: Number },
    received: { type: Number },
    remainingTotal: { type: Number },
    
    fullTotal: { type: Number },

    date: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Khata", khataSchema);

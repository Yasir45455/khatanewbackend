const Transaction = require('../models/transactionModel');

class TransactionRepository {
    async createTransaction(data) {
        return await Transaction.create(data);
    }

    async getAllTransactions() {
        return await Transaction.find();
    }

    async getTransactionById(id) {
        return await Transaction.findById(id);
    }

    async updateTransaction(id, data) {
        return await Transaction.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteTransaction(id) {
        return await Transaction.findByIdAndDelete(id);
    }
}

module.exports = new TransactionRepository();

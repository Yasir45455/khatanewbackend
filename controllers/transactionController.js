const transactionService = require('../services/transactionService');
const fs = require('fs'); // Import fs module for file handling

// Create a transaction
exports.createTransaction = async (req, res) => {

    console.log(req.body)
    try {
        const { bankName, transactionType, amount , date } = req.body;
        const screenshot = req.file ? req.file.path : null;
        
        const transaction = await transactionService.createTransaction({ bankName, transactionType, amount,date, screenshot });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update transaction


exports.updateTransaction = async (req, res) => {
    try {
        const { bankName, transactionType, amount } = req.body;

        // Step 1: Check if transaction exists before processing the file
        const existingTransaction = await transactionService.getTransactionById(req.params.id);
        if (!existingTransaction) {
            // If a file was uploaded, delete it
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: "Transaction not found!" });
        }

        // Step 2: Delete the old screenshot if a new one is uploaded
        if (req.file && existingTransaction.screenshot) {
            fs.unlink(existingTransaction.screenshot, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });
        }

        // Step 3: Save the new image path (if provided), else keep the old one
        const screenshot = req.file ? req.file.path : existingTransaction.screenshot;

        // Step 4: Update transaction
        const updatedTransaction = await transactionService.updateTransaction(req.params.id, {
            bankName,
            transactionType,
            amount,
            screenshot
        });

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Delete transaction
exports.deleteTransaction = async (req, res) => {
    try {
        await transactionService.deleteTransaction(req.params.id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

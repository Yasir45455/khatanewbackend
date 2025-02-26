const Product = require("../models/productModel");
const fs = require("fs");
// Create Product
exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            industry,
            pricing,
            licensing,
            features,
            videoLink,
            freeTrialLink,
        } = req.body;
        console.log(req.body)
        // Handle File Uploads

        console.log(req.files, "CHECK FILE UPLOAD");
        const logoPath = req.files.logo ?
            req.files.logo.map(file => `/uploads/${file.filename}`)
            : [];


        console.log(logoPath, "9999999999")

        const screenshotPaths = req.files?.screenshots
            ? req.files.screenshots.map(file => `/uploads/${file.filename}`)
            : [];

        const newProduct = new Product({
            name,
            logo: logoPath,
            description,
            category,
            industry,
            pricing,
            licensing,
            features: features, // Convert string to array
            screenshots: screenshotPaths,
            videoLink,
            freeTrialLink,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const updates = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            // Agr product exist nahi karta, aur koi file upload hui hai, toh use delete kardo
            if (req.files?.logo) {
                req.files.logo.forEach(file => fs.unlinkSync(`./uploads/${file.filename}`));
            }
            if (req.files?.screenshots) {
                req.files.screenshots.forEach(file => fs.unlinkSync(`./uploads/${file.filename}`));
            }
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle File Updates
        if (req.files?.logo) {
            // Delete Old Logo if Exists
            if (product.logo?.length > 0) {
                fs.unlinkSync(`./${product.logo[0]}`);
            }
            updates.logo = req.files.logo.map(file => `/uploads/${file.filename}`);
        }

        if (req.files?.screenshots) {
            // Delete Old Screenshots if Exists
            if (product.screenshots?.length > 0) {
                product.screenshots.forEach(img => fs.unlinkSync(`./${img}`));
            }
            updates.screenshots = req.files.screenshots.map(file => `/uploads/${file.filename}`);
        }

        // Update the Product
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
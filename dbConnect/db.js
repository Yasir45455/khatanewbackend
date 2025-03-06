const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khataapp4:khataapp4@cluster0.y9jhp.mongodb.net/KhaataApp?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log('dataBase Connected');
});


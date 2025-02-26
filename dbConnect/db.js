const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://yasirkh261:yasirkh261@cluster0.yhwramo.mongodb.net/khaataApp?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log('dataBase Connected');
});


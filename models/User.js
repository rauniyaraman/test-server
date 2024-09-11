const mongoose = require("mongoose");

// Schema bhaneko rule ho haamro data kasari  database maa raakhne tyo kura haami mongoose.Schema maa define garxam

const userSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    age: { 
        type: Number
    },
  },
  { timestamps: true }
);

// mongoose.model le haamro database maa euta users naam gareko collection banai dinxa. model banekai collection ho tara mongoose maa lekhen bela haamo "User" lekhxam tara tyo database banne bela "users" bhanera banxa and userSchema bahneko chai tyo model le follow garne rule if data chaii tyo schema jasto xaina bhane data save hudaina error aauxa like haamro schema maa aahile password xaina tara kasaile password ni haalo bane tyo data maa error aauxa

module.exports = mongoose.model("User", userSchema);

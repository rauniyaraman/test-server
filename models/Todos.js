const mongoose = require("mongoose");

// Schema bhaneko rule ho haamro data kasari  database maa raakhne tyo kura haami mongoose.Schema maa define garxam

// const todosSchema = new mongoose.Schema(
// const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: false 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    userId: { // Reference to the User model
      type: mongoose.Schema.Types.ObjectId, // Store the user's ObjectId
      ref: 'User', // Reference the User model
      required: true // Each todo must be linked to a user
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todosSchema);

// mongoose.model le haamro database maa euta users naam gareko collection banai dinxa. model banekai collection ho tara mongoose maa lekhen bela haamo "User" lekhxam tara tyo database banne bela "users" bhanera banxa and userSchema bahneko chai tyo model le follow garne rule if data chaii tyo schema jasto xaina bhane data save hudaina error aauxa like haamro schema maa aahile password xaina tara kasaile password ni haalo bane tyo data maa error aauxa


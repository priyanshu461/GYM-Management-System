const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gymSchema = new Schema(
    {
        name: {type: String, required: true},
        email:{ type:String, required: true, unique: true},
        mobile:{type: String, required: true},
        image:{ type:String},
        address:{type: String, required: true},
        status:{ type: String, enum: ["Active" , "Inactive"], default: "Active"}
    }, { timestamps: true}
)
module.exports = mongoose.model("Gym", gymSchema);
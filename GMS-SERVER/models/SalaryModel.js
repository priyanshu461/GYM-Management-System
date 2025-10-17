const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema(
    {
        employeeId:{ type: Schema.Types.ObjectId,ref:"Employee",required: true },
        amount:{ type: Number, required:true },
        payDate:{ type: Date, required:true },
        status:{ type:String,enum:["Paid","Pending","Overdue"],default:"Pending" },
    },
    {timestamps:true},


    
);
module.exports = mongoose.model("Salary",SalarySchema);
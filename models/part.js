import mongoose, { Schema } from "mongoose";


const partSchema = new Schema(
    {
        name: { 
            type: String,
            required: true
        },
        supplier: { 
            type: String,
            required: true
        },
        description: { 
            type: String,
            required: true
        }, 
        rating: { 
            type: Number,
        }, 
        compatibleMake: [{
            type: String,
        }]
    },
    {
        timestamps: true,
    }
)


// If a Part model does not already exist, create a new EmployeeModel
const Part = mongoose.models.Part || mongoose.model("Part", partSchema);

export default Part;


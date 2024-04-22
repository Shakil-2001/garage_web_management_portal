import mongoose, { Schema } from "mongoose";


const inventorySchema = new Schema(
    {
        quantity: {
            type: Number, 
            required: true,
        },
        minQuantity: {
            type: Number,
            required: true
        },
        name: { 
            type: String,
            required: true
        },
        supplier: { 
            type: String,
            required: true
        },
        cost: { 
            type: Number,
            required: true
        },
        rating: { 
            type: Number,
        }, 
        category: { 
            type: String,
            required: true
        }, 
        subCategory: { 
            type: String
        },
        compatibleMake: [{
            type: String,
        }],
    }, 
    {
        timestamps: true,
    }
)


// If a Inventory model does not already exist, create a new EmployeeModel
const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export default Inventory;


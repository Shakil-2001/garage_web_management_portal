import mongoose, { Schema } from "mongoose";


const vehicleSchema = new Schema(
    {
        customer: { 
            type: Schema.Types.ObjectId,
            ref: "Customer"
        },
        registrationNumber: { 
            type: String,
            required: true
        },
        make: { 
            type: String,
            required: true
        },
        yearOfManufacture: { 
            type: Number,
            required: true
        }, 
        engineCapacity: { 
            type: Number
        }, 
        fuelType: { 
            type: String,
            required: true
        },
        colour: { 
            type: String,
            required: true
        },
        wheelplan: { 
            type: String,
            required: true
        },
        monthOfFirstRegistration: { 
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;


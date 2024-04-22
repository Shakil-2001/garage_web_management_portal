import mongoose, { Schema } from "mongoose";


const customerSchema = new Schema(
    {
        vehicles: [{ 
            type: Schema.Types.ObjectId,
            ref: "Vehicle"
        }],
        jobs: [{ 
            type: Schema.Types.ObjectId,
            ref: "Job"
        }],
        firstName: { 
            type: String,
            required: true
        },
        surname: { 
            type: String,
            required: true
        }, 
        number: { 
            type: String,
            required: true
        }, 
        postcode: { 
            type: String,
            required: true
        },
        region: { 
            type: String,
            required: true
        },
        city: { 
            type: String,
            required: true
        },
        address: { 
            type: String,
            required: true
        },
        email: { 
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)


// If a Customer model does not already exist, create a new CustomerModel
const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;


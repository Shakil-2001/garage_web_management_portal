import mongoose, { Schema } from "mongoose";


// Values within need to be updated
const jobSchema = new Schema(
    {
        job: {
            type: String,
            required: true
        },
        tasks: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        vehicle:{ 
            type: Schema.Types.ObjectId,
            ref: "Vehicle"
        },
        customer:{ 
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        employees: [{ 
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        }],
        parts: [{ 
            type: Schema.Types.ObjectId,
            ref: "Inventory",
        }],
        status: {
            type: String,
            enum: ['Pending Confirmation', 'Buffer', 'In-Progress', 'Awaiting Collection', 'Complete', 'Abandoned'],
            required: true
        },
        manHours: {
            type: Number,
            required: true
        },
        location:{
            type: String,
        },
        estimatedCost: {
            type: Number,
        },
        runningCost: {
            type: Number,
        },
        jobStart: {
            type: Date,
            required: true
        },
        estimatedCompletion: {
            type: Date,
        },
        jobComplete: {
            type: Date,
        }
    }, 
    {
        timestamps: true,
    }
)


// If a Employee model does not already exist, create a new EmployeeModel
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;


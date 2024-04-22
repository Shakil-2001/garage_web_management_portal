import mongoose, { Schema } from "mongoose";

// Values within need to be changed
const employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'firstName is a required field']
        },
        surname: {
            type: String,
            required: [true, 'surname is a required field']
        },
        contactNumber: {
            type: Number,
            required: [true, 'contactNumber is a required field']
        },
        email: {
            type: String,
            required: [true, 'email is a required field']
        },
        password:{
            type: String,
            required: [true, 'password is a required field']
        },
        admin:{
            type: Boolean,
            required: [true, 'admin is a required field']
        },
        role: {
            type: String,
            required: [true, 'role is a required field']
        },
        jobs: [{ 
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: false
        }],
        emergencyContactName: {
            type: String,
            required: false
        },
        emergencyContactNumber: {
            type: Number,
            required: false
        },
    }, 
    {
        timestamps: true,
    }
)

// If a Employee model does not already exist, create a new EmployeeModel
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;


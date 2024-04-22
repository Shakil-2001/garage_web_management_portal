import connectMongoDB from "../../../libs/mongodb";
import Employee from "../../../models/employee";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// Create new employee
export async function POST(request) {
            
    let firstName, 
        surname, 
        contactNumber, 
        email, 
        password,
        admin,
        role, 
        emergencyContactName, 
        emergencyContactNumber

    try{ 
        ({
            firstName, 
            surname, 
            contactNumber, 
            email, 
            password,
            admin,
            role, 
            emergencyContactName, 
            emergencyContactNumber } = await request.json());
    } catch(error){
        return NextResponse.json({message: error.message} , {status:406});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

    //Check if an employee with the current email already exists
    const employee = await Employee.findOne({email}).select("_id");

    if (employee) {
        return NextResponse.json({message: "Employee with this email already exists."}, {status:400})
    }

    await Employee.create({firstName, surname, contactNumber, email, password: hashedPassword, admin, role, emergencyContactName, emergencyContactNumber});
    return NextResponse.json({message: "Employee Created"}, {status: 200})
}

// Get all employees
export async function GET(request) {

    const email = request.nextUrl.searchParams.get("email");


    await connectMongoDB();

    const employee = await Employee.findOne({email});

    if (employee){
        return NextResponse.json({employee}, {status:200});
    }

    const employees = await Employee.find();
    return NextResponse.json({employees});
}

// Delete an employee with parameter ID
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const existingEmployee = await Employee.findById(id);

    if(!existingEmployee) {
        return NextResponse.json({message:"No employee found."}, {status: 404})
    }

    await Employee.findByIdAndDelete(id);
    return NextResponse.json({message: "Employee deleted"}, {status: 200})
}


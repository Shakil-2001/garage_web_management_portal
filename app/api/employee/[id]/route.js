import connectMongoDB from "../../../../libs/mongodb";
import Employee from "../../../../models/employee";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Get By ID
export async function GET(request, { params }) {
    const { id } = params;

    await connectMongoDB();

    let employee;

    try {
        employee = await Employee.findOne({_id: id});
    } catch (error) {
        return NextResponse.json({message:"Employee ID not found.", status: 404})

    }
    return NextResponse.json({employee, status:200});

}

//  Update By ID
export async function PUT(request, { params }) {
    const { id } = params;
    const { firstName, surname, contactNumber, email, password,
            admin, role, jobs, emergencyContactName, emergencyContactNumber, passwordOnly
        } = await request.json();

    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (passwordOnly){
        try {
            await Employee.findByIdAndUpdate(id , { password: hashedPassword });
        } catch (error){
            return NextResponse.json({ message: error.message }, { status: 404 });
        }
        return NextResponse.json({ message: "Password updated successfully", status: 200 });
    } else if (password == "") {
        try {
            await Employee.findByIdAndUpdate(id , { firstName, surname, contactNumber, email, 
                admin, role, jobs, emergencyContactName, emergencyContactNumber 
            });
        } catch (error){
            return NextResponse.json({message:error.message}, {status:404})
        }
        return NextResponse.json({message:"Employee updated successfully", status: 200})
    } else{
        try {
            await Employee.findByIdAndUpdate(id , { firstName, surname, contactNumber, email, password: hashedPassword, 
                admin, role, jobs, emergencyContactName, emergencyContactNumber 
            });
        } catch (error){
            return NextResponse.json({message:error.message}, {status:404})
        }
        return NextResponse.json({message:"Employee updated successfully", status: 200})
    }
}
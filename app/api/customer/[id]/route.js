import connectMongoDB from "../../../../libs/mongodb";
import Customer from "../../../../models/customer";
import { NextResponse } from "next/server";

// Get By ID
export async function GET(request, { params }) {
    const { id } = params;

    await connectMongoDB();

    let customer;

    try {
        customer = await Customer.findOne({_id: id});
    } catch (error) {
        return NextResponse.json({message:"Customer ID not found.", status: 404})

    }
    return NextResponse.json({customer, status:200});

}

//  Update By ID
export async function PUT(request, { params }) {
    const { id } = params;
    

    const { vehicles,
            jobs,
            firstName, 
            surname, 
            number, 
            postcode,
            region,
            city,
            address,
            email,
             } = await request.json();

    await connectMongoDB();

    try {
        await Customer.findByIdAndUpdate(id , {
            vehicles,
            jobs,
            firstName, 
            surname, 
            number, 
            postcode,
            region,
            city,
            address,
            email,
         });
    } catch (error){
        return NextResponse.json({message:error.message}, {status:404})
    }
    return NextResponse.json({message:"Customer updated successfully", status: 200})
}


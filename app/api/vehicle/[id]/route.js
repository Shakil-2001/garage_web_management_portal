import connectMongoDB from "../../../../libs/mongodb";
import Vehicle from "../../../../models/vehicle";
import Customer from "../../../../models/customer";

import { NextResponse } from "next/server";

// Get By ID
export async function GET(request, { params }) {
    const { id } = params;

    await connectMongoDB();

    let vehicle;

    try {
        vehicle = await Vehicle.findOne({_id: id});
    } catch (error) {
        return NextResponse.json({message:"Vehicle ID not found.", status: 404})

    }
    return NextResponse.json({vehicle, status:200});

}

//  Update By ID
export async function PUT(request, { params }) {
    const { id } = params;

    const existingVehicle = await Vehicle.findById(id);

    const { customer,
            registrationNumber, 
            make, 
            yearOfManufacture, 
            engineCapacity, 
            fuelType, 
            colour,
            wheelplan,
            monthOfFirstRegistration } = await request.json();

    await connectMongoDB();

    if (existingVehicle.customer.toString() !== customer) {
        const oldCustomer = await Customer.findById(existingVehicle.customer);

        oldCustomer.vehicles = oldCustomer.vehicles.filter(vehicleId => vehicleId.toString() !== existingVehicle._id.toString());

        await oldCustomer.save();

        const newCustomer = await Customer.findById(customer);

        newCustomer.vehicles.push(existingVehicle._id);

        await newCustomer.save();
    }

    try {
        await Vehicle.findByIdAndUpdate(id , { 
            customer, 
            registrationNumber, 
            make, 
            yearOfManufacture, 
            engineCapacity, 
            fuelType, 
            colour,
            wheelplan,
            monthOfFirstRegistration });
    } catch (error){
        return NextResponse.json({message:error.message}, {status: 404});
    }
    
    return NextResponse.json({message:"Vehicle updated successfully", status: 200})
}

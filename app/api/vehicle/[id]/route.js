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

    await connectMongoDB();

    try {
        const existingVehicle = await Vehicle.findById(id);

        if (!existingVehicle) {
            return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
        }

        const { customer, registrationNumber, make, yearOfManufacture, engineCapacity, fuelType, colour, wheelplan, monthOfFirstRegistration } = await request.json();

        if(existingVehicle.customer){
            if (existingVehicle.customer.toString() !== customer) {
                const oldCustomer = await Customer.findById(existingVehicle.customer);
    
                oldCustomer.vehicles = oldCustomer.vehicles.filter(vehicleId => vehicleId.toString() !== existingVehicle._id.toString());
    
                await oldCustomer.save();
    
                const newCustomer = await Customer.findById(customer);
    
                newCustomer.vehicles.push(existingVehicle._id);
    
                await newCustomer.save();
            }
        }
        
        await Vehicle.findByIdAndUpdate(id, {
            customer,
            registrationNumber,
            make,
            yearOfManufacture,
            engineCapacity,
            fuelType,
            colour,
            wheelplan,
            monthOfFirstRegistration
        });

        return NextResponse.json({ message: "Vehicle updated successfully", status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


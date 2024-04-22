import connectMongoDB from "../../../libs/mongodb";
import Vehicle from "../../../models/vehicle";
import Customer from "../../../models/customer";

import { NextResponse } from "next/server"


// Create new vehicle
export async function POST(request) {
            
    let customer, registrationNumber, make, yearOfManufacture, engineCapacity, 
        fuelType, colour, wheelplan, monthOfFirstRegistration
    try{ 
        ({
            customer, registrationNumber, make, yearOfManufacture, engineCapacity, 
            fuelType, colour, wheelplan, monthOfFirstRegistration 
        } = await request.json());
    } catch(error){
        return NextResponse.json({message: error.message} , {status:406});
    }

    await connectMongoDB();

    if(customer){
        const customerDocument = await Customer.findById(customer);
    }

    const vehicle = await Vehicle.findOne({registrationNumber}).select("_id");

    if (vehicle) {
        return NextResponse.json({message: "Vehicle already exists."}, {status:400})
    }

    const newVehicle = 
        await Vehicle.create({  customer, registrationNumber, make, yearOfManufacture, engineCapacity, 
            fuelType, colour, wheelplan, monthOfFirstRegistration
        });

    if(customer){
        customerDocument.vehicles.push(newVehicle._id);
        await customerDocument.save();
    }
    
    return NextResponse.json(newVehicle, {message: "Vehicle Entry Created"}, {status: 200})
}

// Get all vehicles
export async function GET(request) {
    await connectMongoDB();

    let updatedVehicles;

    try { 

        const vehicles = await Vehicle.find()
				.populate('customer', 'firstName surname')

        updatedVehicles = vehicles.map(vehicle => ({
            ...vehicle.toJSON(),
            customerName: vehicle.customer ? `${vehicle.customer.firstName} ${vehicle.customer.surname}` : '',
        }));
    } catch (error){
        return NextResponse.json({message:error.message}, {status: 404})
    }
    
    return NextResponse.json({vehicles: updatedVehicles});
}

// Delete a vehicle with parameter ID
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const existingVehicle = await Vehicle.findById(id);


    if(!existingVehicle) {
        return NextResponse.json({message:"No vehicle found."}, {status: 404})
    }

    const customerDocument = await Customer.findById(existingVehicle.customer);

    customerDocument.vehicles = customerDocument.vehicles.filter(id => id.toString() !== existingVehicle._id.toString());

    await customerDocument.save();

    await Vehicle.findByIdAndDelete(id);
    
    return NextResponse.json({message: "Vehicle deleted"}, {status: 200})
}


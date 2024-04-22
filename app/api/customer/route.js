import connectMongoDB from "../../../libs/mongodb";
import Customer from "../../../models/customer";
import Vehicle from "../../../models/vehicle";
import { NextResponse } from "next/server"


// Create new employee
export async function POST(request) {
            
    let vehicles,
        jobs,
        firstName, 
        surname, 
        number, 
        postcode,
        region,
        city,
        address,
        email
    try{ 
        ({  vehicles,
            jobs,
            firstName, 
            surname, 
            number, 
            postcode,
            region,
            city,
            address,
            email,
         } = await request.json());
    } catch(error){
        return NextResponse.json({message: error.message} , {status:406});
    }

    await connectMongoDB();

    //Check if customer with the current email already exists
    const existingCustomer = await Customer.findOne({email}).select("_id");

    if (existingCustomer) {
        return NextResponse.json({message: "Customer with this email already exists."}, {status:400})
    }

    const newCustomer = await Customer.create({
        vehicles,
        jobs,
        firstName, 
        surname, 
        number, 
        postcode,
        region,
        city,
        address,
        email,});

    if (vehicles && vehicles.length > 0) {
        for(const vehicleId of vehicles) {
            const vehicle = await Vehicle.findById(vehicleId);
        
            if(!vehicle) {
                continue
            } 

        if(vehicle.customer.toString() !== newCustomer._id.toString()) {
            const oldCustomer = await Customer.findById(vehicle.customer)
        

            if (!oldCustomer) {
                continue;
            }

            oldCustomer.vehicles = oldCustomer.vehicles.filter(id => id.toString() !== vehicleId.toString());

            await oldCustomer.save();

            newCustomer.vehicles.push(vehicleId);

            await newCustomer.save();

            await Vehicle.findByIdAndUpdate(vehicleId, { customer: newCustomer._id });
        }

        }
    }
    return NextResponse.json(newCustomer, {message: "Customer Created"}, {status: 200})
}

// Get all customers
export async function GET(request) {
    await connectMongoDB();
    const customers = await Customer.find();
    return NextResponse.json({customers});
}

// Delete an customer with parameter ID
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const existingCustomer = await Customer.findById(id);

    if(!existingCustomer) {
        return NextResponse.json({message:"No customer found."}, {status: 404})
    }

    await Customer.findByIdAndDelete(id);
    return NextResponse.json({message: "Customer deleted"}, {status: 200})
}


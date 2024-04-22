import connectMongoDB from "../../../libs/mongodb";
import Inventory from "../../../models/inventory";
import { NextResponse } from "next/server"


// Add new inventory item
export async function POST(request) {
            
    let quantity, minQuantity, name, supplier, cost, rating, category, subCategory, compatibleMake; 

    try{ 
        ({
            quantity, minQuantity, name, supplier, cost, rating, category, subCategory, compatibleMake
         } = await request.json());
    } catch(error){
        return NextResponse.json({message: error.message} , {status:406});
    }

    await connectMongoDB();

    const existingPart = await Inventory.findOne({name}).select("_id");

    if (existingPart){
        return NextResponse.json({message: "Inventory part already exists"}, {status:400})
    }

    await Inventory.create({quantity, minQuantity, name, supplier, cost, rating, category, subCategory, compatibleMake});
    
    return NextResponse.json({message: "Inventory part added"}, {status: 200})
}

// Get all parts
export async function GET(request) {
    await connectMongoDB();
    const parts = await Inventory.find();
    return NextResponse.json({parts});
}

// Delete a part with parameter ID
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();

    const existingPart = await Inventory.findById(id);

    if(!existingPart) {
        return NextResponse.json({message:"No part found."}, {status: 404})
    }

    await Inventory.findByIdAndDelete(id);
    return NextResponse.json({message: "Part removed from the inventory."}, {status: 200})
}


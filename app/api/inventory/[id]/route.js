import connectMongoDB from "../../../../libs/mongodb";
import Inventory from "../../../../models/inventory";
import { NextResponse } from "next/server";

// Get By ID
export async function GET(request, { params }) {
    const { id } = params;

    await connectMongoDB();

    let inventory;

    try {
        inventory = await Inventory.findOne({_id: id});
    } catch (error) {
        return NextResponse.json({message:"Part in inventory not found.", status: 404})

    }
    return NextResponse.json({inventory, status:200});

}

//  Update By ID
export async function PUT(request, { params }) {
    const { id } = params;
    const { quantity, 
            minQuantity, 
            name, 
            supplier, 
            cost,
            rating, 
            category, 
            subCategory, 
            compatibleMake 
        } = await request.json();

    await connectMongoDB();

    try {
        await Inventory.findByIdAndUpdate(id , { 
            quantity, 
            minQuantity, 
            name, 
            supplier, 
            cost,
            rating, 
            category, 
            subCategory, 
            compatibleMake
        });
    } catch (error){
        return NextResponse.json({message:error.message}, {status:404})
    }
    return NextResponse.json({message:"Inventory stock updated successfully.", status: 200})
}


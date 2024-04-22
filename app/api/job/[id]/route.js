import connectMongoDB from "../../../../libs/mongodb";
import Job from '../../../../models/job';
import Employee from '../../../../models/employee';
import Customer from '../../../../models/customer';
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { job, tasks, description, employees, parts, status, manHours, location, estimatedCost, runningCost, jobStart, estimatedCompletion, jobComplete } = await request.json();

    try {
        await connectMongoDB();

        const updatedJob = await Job.findByIdAndUpdate(id, {
            job,
            tasks,
            description,
            employees,
            parts,
            status,
            manHours,
            location,
            estimatedCost,
            runningCost,
            jobStart,
            estimatedCompletion,
            jobComplete
        }, { new: true });

        await Employee.updateMany({ _id: { $in: employees } }, { $push: { jobs: id } });

        return NextResponse.json({ success: true, data: updatedJob }, { status: 200 });
    } catch (error) {
        console.error('Error updating job:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const jobToDelete = await Job.findById(id);

        if (!jobToDelete) {
            return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
        }

        await Customer.findByIdAndUpdate(jobToDelete.customer, { $pull: { jobs: id } });

        await Employee.updateMany({ _id: { $in: jobToDelete.employees } }, { $pull: { jobs: id } });

        await Job.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting job:', error);
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
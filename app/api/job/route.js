import connectMongoDB from "../../../libs/mongodb";
import Job from '../../../models/job';
import Customer  from "../../../models/customer";
import Employee from '../../../models/employee';
import Inventory from '../../../models/inventory';
import Vehicle from '../../../models/vehicle';
import { NextResponse } from "next/server"

export async function POST(request) {

	try {

		let job, tasks, description, vehicle, customer, employees, parts, status, manHours, location, estimatedCost, runningCost, jobStart, estimatedCompletion, jobComplete; 

    try{ 
        ({
					job, tasks, description, vehicle, customer, employees, parts, status, manHours, location, estimatedCost, runningCost, jobStart, estimatedCompletion, jobComplete
         } = await request.json());
    } catch(error){
        return NextResponse.json({message: error.message} , {status:406});
    }

		await connectMongoDB();

		const existingCustomer = await Customer.findById(customer);
			if (existingCustomer && !existingCustomer.vehicles.includes(vehicle)) {
				await Customer.findByIdAndUpdate(customer, { $push: { vehicles: vehicle } });
			}

		await Vehicle.findByIdAndUpdate(vehicle, { customer });

		// Create the job
		const newJob = await Job.create({
			job,
			tasks,
			description,
			vehicle,
			customer,
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
		});

		// Update employees to include the new job
		await Employee.updateMany({ _id: { $in: employees } }, { $push: { jobs: newJob._id } });

		return NextResponse.json({ success: true, data: newJob }, {status:201});

	} catch (error) {
		console.error('Error creating job:', error);
		return NextResponse.json({ success: false, error: 'Server Error' }, {status:500});
	}
}

export async function GET(request) {
	try {
			await connectMongoDB();

			const jobs = await Job.find()
				.populate('customer', 'firstName surname')
				.populate('vehicle', 'registrationNumber')
				.populate('employees')
				.populate('parts', 'cost name quantity');


			const updatedJobs = jobs.map(job => ({
					...job.toJSON(),
					customerName: job.customer ? `${job.customer.firstName} ${job.customer.surname}` : '',
					vehicleRegistration: job.vehicle ? job.vehicle.registrationNumber : '',
					employeeNames: job.employees.map(employee => `${employee.firstName} ${employee.surname}`)
			}));

			return NextResponse.json({ success: true, data: updatedJobs }, { status: 200 });
		} catch (error) {
			console.error('Error fetching jobs:', error);
			return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
		}
	
}

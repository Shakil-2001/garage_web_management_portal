import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MarkdownEditor from '@/app/components/MarkdownEditor/MarkdownEditor';
import PageNavigation from '@/app/components/PageNavigation/PageNavigation';


import * as Yup from "yup";
import {InputLabel, Select, Typography, MenuItem, Button, OutlinedInput, TextField, Autocomplete, Card, CardContent} from '@mui/material'


const AddJobModal = ({setEditToggle, edit ,defaultFormik, parts, employees}) => {

	const [error, setError] = useState("")
	const [page, setPage] = useState(1)
	const [selectedEmployees, setSelectedEmployees] = useState([])
	const [selectMarkdown, setSelectMarkdown] = useState("description")
	const [originalParts, setOriginalParts] = useState([]) 
	const [newParts, setNewParts] = useState([])
	const [removedParts, setRemovedParts] = useState([]);

	const editParts = (ids, action) => {

		const requestBody = JSON.stringify({
			action: action,
			itemIds: ids
		});

		fetch(`http://localhost:3000/api/inventory`, {
		  method: "PUT",
		  mode: "cors",
		  body: requestBody,
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("success, action")
		}) 
		.catch((error) => {
		  console.log(error)
		})
	  }


	const handleAutocompleteChange = (e, newValue) => {

		let totalCost = 0;

		const newPartsDifference = newValue.filter(part => !originalParts.some(originalPart => originalPart._id === part._id));
    
		const removedPartsDifference = originalParts.filter(originalPart => !newValue.some(part => part._id === originalPart._id));
		
		setNewParts(newPartsDifference);
		setRemovedParts(removedPartsDifference);
		
		formik.setFieldValue('parts', newValue);

		newValue.forEach((part) => {totalCost += part.cost})

		formik.setFieldValue('runningCost', parseFloat(totalCost.toFixed(2)));
	};
	

	const changeDescription = (obj) => {
		formik.setValues({ ...formik.values, description: obj });
	}

	const changeTasks = (obj) => {
		formik.setValues({ ...formik.values, tasks: obj });
	}

	const multiHandleChange = (e) => {
		const {
		  target: { value },
		} = e;

		const updatedEmployees = typeof value === 'string' ? value.split(',') : value;
		setSelectedEmployees(updatedEmployees);
		formik.setValues({ ...formik.values, employees: updatedEmployees });
		
	}

	const formik = useFormik({
		initialValues: {
			_id: "",
			job: "",
			tasks: "",
			description: "",
			vehicle: {
                _id: "",
                registrationNumber: "",
				make: ""
            },
			customer: {
                _id: "",
                firstName: "",
                surname: ""
            },
			employees: [{
                    _id: "",
                    firstName: "",
                    surname: ""
                }],
            parts: [{
                _id: "",
                name: "",
                cost: 0.00
            }],
            status: "",
            manHours: 0,
			location: "",
			estimatedCost: 0.00,
			runningCost: 0,
            jobComplete: Date,
            jobStart: Date,
            estimatedCompletion: Date,
            customerName: "",
            vehicleRegistration: "",
            employeeNames: ""
		},

		validationSchema: Yup.object({
            _id: Yup.string(),
            job: Yup.string()
                .required('Job is required'),
            tasks: Yup.string()
                .required('Task is required'),
            description: Yup.string(),
            vehicle: Yup.object().shape({
              _id: Yup.string()
                .required('Vehicle ID is required'),
              registrationNumber: Yup.string(),
              make: Yup.string()

            }),
            customer: Yup.object().shape({
              _id: Yup.string()
                .required('Customer ID is required'),
              firstName: Yup.string(),
              surname: Yup.string()
            }),
            employees: Yup.array().of(
              Yup.object().shape({
                _id: Yup.string()
                    .required('Employee ID is required'),
                firstName: Yup.string(),
                surname: Yup.string(),
              })
            ),
            parts: Yup.array().of(
              Yup.object().shape({
                _id: Yup.string(),
                quantity: Yup.number(),
                name: Yup.string(),
                cost: Yup.number(),
              })
            ),
            status: Yup.string()
                .required('Status is required'),
            manHours: Yup.number()
                .min(0, 'Man hours must be at least 0'),
            location: Yup.string(),
            estimatedCost: Yup.number()
                .min(0, 'Estimated cost must be at least 0'),
            runningCost: Yup.number()
                .min(0, 'Running cost must be at least 0'),
            jobStart: Yup.date()
				.required("Start date is required"),
          })
	});

	useEffect(() => {
		formik.setValues(defaultFormik)	

		setSelectedEmployees(defaultFormik.employees.map(employee => employee._id));

		setOriginalParts(defaultFormik.parts)

	}, [defaultFormik]);

	const handleSave = (e) => {
		e.preventDefault();

		if(JSON.stringify(formik.errors) === "{}" || formik.values === null) {
			edit(JSON.stringify(formik.values), defaultFormik._id);
			editParts(newParts.map(part => part._id), "remove")
			editParts(removedParts.map(part => part._id), "add")
			setEditToggle(false);
		} else{
			setError("Missing Required Fields")
		}
	}
  return (
	
	<>
    <ModalWrapper title={"Edit Job"} subtitle={"Enter job details here."}>

	<form action="">
		{(page === 1) &&

		<div className="border-gray-300 flex flex-col justify-center items-center">

			<div className="w-5/6 flex flex-row justify-center items-center">

			<div className="flex-1 flex-col border-solid border-right justify-center items-center">
				<div className="w-full mt-5">
					<TextField 
						className="w-full mt-3"
						id="job" variant="outlined"
						label={formik.errors.job ? formik.errors.job : "Job"}
						placeholder="Enter the Job Name:" 
						htmlFor="job" 
						required={true} 
						type="text" 
						value={formik.values.job} 
						onChange={formik.handleChange}/>
				</div>

				<div className="w-full mt-5">
					<TextField 
						className="w-full"
						disabled={true}
						id="jobStart" variant="outlined"
						label={formik.errors.jobStart ? formik.errors.jobStart : "Date"}
						placeholder="Enter the Job Name:" 
						htmlFor="jobStart" 
						required={true} 
						type="text" 
						value={formik.values.jobStart} 
						onChange={formik.handleChange}/>
				</div>
				
				<div className="w-full mt-5">
					<TextField 
						className="w-full"
						disabled={true}
						variant="outlined"
						label={formik.errors.customer ? formik.errors.customer : "Customer"}
						placeholder="Customer:" 
						htmlFor="jobStart" 
						required={true} 
						type="text" 
						value={`${formik.values.customer.firstName} ,${formik.values.customer.surname}`} />
				</div>
				
				<div className="w-full mt-5">
					<TextField 
						className="w-full"
						disabled={true}
						id="jobStart" variant="outlined"
						label={formik.errors.vehicle ? formik.errors.vehicle : "Vehicle"}
						placeholder="Vehicle" 
						htmlFor="vehicle" 
						required={true} 
						type="text" 
						value={formik.values.vehicle.registrationNumber}/>
				</div>
				
			</div>

			<div className="flex-1 flex-col ml-10 h-full">

				<div className="w-full flex-none">
					<InputLabel id="employee-label" 
						>*Select Employees</InputLabel>
					<div className="flex">
						<Select
						className="flex-grow"
						labelId="employee-label"
						id="employees"
						multiple
						value={selectedEmployees}
						onChange={(e) => multiHandleChange(e)}
						input={<OutlinedInput label="Employee" />}
						>
						{employees && employees.map((employee) => (
							<MenuItem
							key={employee._id}
							value={employee._id} 
							>
							{employee.firstName + " " + employee.surname}
							</MenuItem>
						))}
						</Select>
					</div>
				</div>

				<div className="flex-none">
					<InputLabel className="mt-3" id="status-label">Status</InputLabel>
					<Select
						className="w-full"
						labelId="status-label"
						id={formik.values.status}
						value={formik.values.status}
						onChange={(e) => formik.setFieldValue('status', e.target.value)}
						label="Status"
					>
						{['Pending Confirmation', 'Buffer', 'In-Progress', 'Awaiting Collection', 'Complete', 'Abandoned'].map(status => (
						<MenuItem key={status} value={status}>
							{status}
						</MenuItem>
						))}
					</Select>
				</div>

				<div className="mt-5 w-full">
					<TextField 
						className="w-full mt-5 flex-none"
						disabled={true}
						id="runningCost" variant="outlined"
						label={formik.errors.runningCost ? formik.errors.runningCost : "Running Cost"}
						placeholder="Running Cost" 
						htmlFor="runningCost" 
						type="text" 
						value={formik.values.runningCost}/>
				</div>

				<div className="flex-grow pb-10"></div>
			</div>
			</div>

			
		</div>
		
		} 

		{page === 2 && 

			<div className="flex flex-row">
				<div className="flex-7 flex flex-col items-center">
					<div>
						<Typography variant="h2" className="my-auto">*Tasks</Typography>
						<MarkdownEditor value={formik.values.tasks} handleChange={changeTasks}/>			
					</div>
				</div>

				<div className="flex-3 ml-3" style={{ flex: '3 0 30%' }}>
					<Autocomplete
						className="mt-5"
						multiple
						limitTags={2}
						id="compatibleMake"
						options={
							parts.filter(part => part.compatibleMake.includes(formik.values.vehicle.make) & part.quantity >= 1)
							.filter(option => !formik.values.parts.some(part => part._id === option._id))
						}
						getOptionLabel={(option) => option.name}
						value={formik.values.parts}
						onChange={(e, newValue) => handleAutocompleteChange(e, newValue)}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								label="Select Part"
								placeholder="Select Car Part"
							/>
						)}
						/>

						<div>
						<div>
						{formik.values.parts.map(part => (
							<Card key={part._id} style={{ marginBottom: '10px' }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
								{part.name}
								</Typography>
								<Typography>
								Cost: {part.cost}
								</Typography>
							</CardContent>
							</Card>
						))}
						</div>
						</div>  
				</div>



			</div>
			
		}

		{page === 3 && 
		<div className="flex flex-row">
			<div className="flex-7 flex flex-col items-center">
					<div>
						<Typography variant="h2" className="my-auto">Notes</Typography>
						<MarkdownEditor value={formik.values.description} handleChange={changeDescription}/>		
					</div>
				</div>

			<div className="flex-3 ml-3" style={{ flex: '3 0 30%' }}>
				<Autocomplete
					className="mt-5"
					multiple
					limitTags={2}
					id="compatibleMake"
					options={
						parts.filter(part => part.compatibleMake.includes(formik.values.vehicle.make) & part.quantity >= 1)
						.filter(option => !formik.values.parts.some(part => part._id === option._id))
					}
					getOptionLabel={(option) => option.name}
					value={formik.values.parts}
					onChange={(e, newValue) => handleAutocompleteChange(e, newValue)}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							label="Select Part"
							placeholder="Select Car Part"
						/>
					)}
					/>

					<div>
						<div>
						{formik.values.parts.map(part => (
							<Card key={part._id} style={{ marginBottom: '10px' }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
								{part.name}
								</Typography>
								<Typography>
								Cost: {part.cost}
								</Typography>
							</CardContent>
							</Card>
						))}
						</div>
					</div>  
			</div>
		</div>
		}

		

		<div className="flex flex-col items-center justify-center mt-10">

			{ error && (
				<div className="bg-red-500 text-white text-center text-sm py-2 px-2 mb-3 rounded-md">
					{error}
				</div>)
			}

			<div className="flex flex-row items-center justify-center mt-10">

				<button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
					onClick={(e) => {
						e.preventDefault();
						handleSave(e)}}>Save</button>

				<PageNavigation page={page} setPage={setPage} maxPages={3}/>

				<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300"
					onClick={(e) => {
						e.preventDefault();
						setEditToggle(false)}}>Cancel</button>
			</div>

			
		</div>

	</form>
        
    </ModalWrapper>
	</>
  )
}

export default AddJobModal
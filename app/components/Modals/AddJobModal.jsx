import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomerModal from '@/app/components/Modals/Customer/CustomerModal';
import MarkdownEditor from '@/app/components/MarkdownEditor/MarkdownEditor';

import VehicleModal from '@/app/components/Modals/VehicleModal';
import PageNavigation from '@/app/components/PageNavigation/PageNavigation';


import * as Yup from "yup";
import {InputLabel, Select, Typography, MenuItem, Button, OutlinedInput, TextField, Autocomplete} from '@mui/material'


const AddJobModal = ({setAddToggle, add ,defaultFormik, customers, vehicles, parts, employees}) => {

	const [error, setError] = useState("")
	const [customerModal, setCustomerModal] = useState(false)
	const [vehicleModal, setVehicleModal] = useState(false)
	const [edit, setEdit] = useState(false)
	const [page, setPage] = useState(1)
	const [selectedEmployees, setSelectedEmployees] = useState([])
	const [selectMarkdown, setSelectMarkdown] = useState("description")
	const [customerComplete, setCustomerComplete] = useState(false)

	const changeDescription = (obj) => {
		formik.setValues({ ...formik.values, description: obj });
	}

	const changeTasks = (obj) => {
		formik.setValues({ ...formik.values, tasks: obj });
	}

	const addCustomer = (json) => {
		fetch("http://localhost:3000/api/customer", {
		  method: "POST",
		  mode: "cors",
		  body: json
		})
		.then((response) => response.json())
		.then((data) => {
			formik.setValues({ ...formik.values, customer: {_id: data._id, firstName: data.firstName, surname: data.surname}});
			setCustomerModal(false);
		}) 
		.catch((error) => {
		  console.log(error)
		})
	  }
	
	const addVehicle = (json) => {

		fetch("http://localhost:3000/api/vehicle", {
		  method: "POST",
		  mode: "cors",
		  body: json
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			formik.setValues({ ...formik.values, vehicle: {_id: data._id, registrationNumber: data.registrationNumber}});
			setVehicleModal(false);
		}) 
		.catch((error) => {
		  console.log(error)
		})
	}
	
	const multiHandleChange = (e, dropdownType) => {
		const {
		  target: { value },
		} = e;

		if(dropdownType === "employee"){
			const updatedEmployees = typeof value === 'string' ? value.split(',') : value;
			setSelectedEmployees(updatedEmployees);
			formik.setValues({ ...formik.values, employees: updatedEmployees });
		} else if(dropdownType === "customer"){
			formik.setValues({ ...formik.values, customer: value });
		} else if(dropdownType === "vehicle"){
			console.log("value", value)
			formik.setValues({ ...formik.values, vehicle: value });
		}
	}

	const formik = useFormik({
		initialValues: {
			_id: "",
			job: "",
			tasks: "",
			description: "",
			vehicle: {
                _id: "",
                registrationNumber: ""
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
            // parts: [{
            //     _id: "",
            //     quantity: 0,
            //     name: "",
            //     cost: 0.00
            // }],
            status: "",
            manHours: 0,
			location: "",
			estimatedCost: 0.00,
			runningCost: 0.00,
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
              registrationNumber: Yup.string()
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
            customerName: Yup.string(),
            vehicleRegistration: Yup.string(),
            employeeNames: Yup.string(),
          })
	});

	useEffect(() => {
		if(!JSON.stringify(defaultFormik) === "{}") {
			formik.setValues(defaultFormik)
			console.log("running")
			setEdit(true)
		} else {
			formik.setValues({...formik.values, jobStart: new Date(), status: "Pending Confirmation"})
		}
	}, [defaultFormik]);

	const handleSave = (e) => {
		e.preventDefault();

		if(JSON.stringify(formik.errors) === "{}" || formik.values === null) {
			add(JSON.stringify(formik.values));
			setAddToggle(false);
		} else{
			console.log(JSON.stringify(formik.errors))
			setError("Missing Required Fields")
		}
	}
  return (
	
	<>
    <ModalWrapper title={"Start new Job"} subtitle={"Enter new job details here."}>

	<form action="">
		{(page === 1) &&
		<div className="flex">

            <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">

				<div className="w-2/3 flex flex-col justify-center items-center">
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

				<TextField 
					className="w-full mt-5"
					id="job" variant="outlined"
					label={formik.errors.job ? formik.errors.job : "Job"}
					placeholder="Enter the Job Name:" 
					htmlFor="job" 
					required={true} 
					type="text" 
					value={formik.values.job} 
					onChange={formik.handleChange}/>

				<div className="w-full mt-5 flex flex-row">
					<div className="w-full">
					<Autocomplete
						className="mt-5"
						multiple
						limitTags={3}
						id="employee"
						options={employees}
						getOptionLabel={(option) => (option.firstName, option.surname)}
						value={selectedEmployees}
						onChange={(e, newValue) => {
							setSelectedEmployees(newValue)
							formik.setFieldValue('employees', newValue)}}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								label="Select Employees"
								placeholder="Select Employee"
							/>
						)}
						/>
					</div>
				</div>

				<div className="w-full mt-5 flex flex-row">
					<div className="flex-4 w-full">
						<Autocomplete
							id="customer"
							options={customers}
							value={formik.values.customer}
							onChange={(event, newValue) => {
								console.log(newValue);
								if(newValue === null ){
									setCustomerComplete(false)
								} else { setCustomerComplete(true)
								}
								formik.setFieldValue('customer', newValue);
							}}
							getOptionLabel={(customer) => `${customer.surname} ${customer.firstName}`}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Customer"
									variant="outlined"
									required
								/>
							)}
							/>
					</div>
					<div className="flex-1 my-auto">
						<Button onClick={() => setCustomerModal(true)} variant="outline" endIcon={<AddCircleIcon />}>
							Create
						</Button>
					</div>
				</div>

				<div className="w-full mt-5 flex flex-row">
					<div className="flex-4 w-full">
						<Autocomplete
							fullWidth
							id="vehicle"
							disabled={!customerComplete}
							options={ formik.values.customer ?
								vehicles.filter(vehicle => !vehicle.customer || vehicle.customer._id === formik.values.customer._id) :
								vehicles.filter(vehicle => !vehicle.customer)
							}
							
							value={formik.values.vehicle}
							onChange={(event, newValue) => {
								console.log(newValue);
								formik.setFieldValue('vehicle', newValue);
							}}
							getOptionLabel={(vehicles) => `${vehicles.registrationNumber}`}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Vehicle"
									variant="outlined"
									required
								/>
							)}
						/>
					</div>
					<div className="flex-1 my-auto">
						<Button disabled={!customerComplete} onClick={() => setVehicleModal(true)} variant="outline" endIcon={<AddCircleIcon />}>
							Create
						</Button>
					</div>
				</div>

			</div>
			</div>
			
            
        </div>
		} 

		{page === 2 && 
			<div className="flex-1 ml-2 flex flex-col items-center">
				<div className="w-5/6">
					<Typography variant="h2" className="my-auto">*Tasks</Typography>
					<MarkdownEditor value={formik.values.tasks} handleChange={changeTasks}/>				
				</div>
			</div>
		}

		{page === 3 && 
		<div className="flex-1 ml-2 flex flex-col items-center">
			<div className="w-5/6">
				<Typography variant="h2" className="my-auto">Notes</Typography>
				<MarkdownEditor value={formik.values.description} handleChange={changeDescription}/>
			</div>
		</div>
		}

		

		<div className="flex flex-col items-center justify-center mt-10">

			{ error && (
				<div className="bg-red-500 text-white text-center text-sm py-2 px-2 mb-3 rounded-md">
					{error}
				</div>)
			}

			

			<div className="flex flex-row items-center justify-center mt-3">

				<button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
					onClick={(e) => {
						e.preventDefault();
						handleSave(e)}}>Save</button>

				<PageNavigation page={page} setPage={setPage} maxPages={3}/>

				<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300"
					onClick={(e) => {
						e.preventDefault();
						setAddToggle(false)}}>Cancel</button>
			</div>

			
		</div>

	</form>
        
    </ModalWrapper>

		{customerModal && <CustomerModal setAddToggle={setCustomerModal} add={addCustomer} editCustomer={null} defaultFormik={{}} vehicles={vehicles} setCurrentSelection={null}/>}
		{vehicleModal && <VehicleModal setAddToggle={setVehicleModal} add={addVehicle} editCustomer={null} defaultFormik={{}} customers={customers} setCurrentSelection={null} disableCustomer={true}/>}
	</>
  )
}

export default AddJobModal
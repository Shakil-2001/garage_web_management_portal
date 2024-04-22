import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import InputField from '../InputField/InputField';
import * as Yup from "yup";
import {Switch, FormControlLabel, InputLabel, Select, FormControl, MenuItem, Autocomplete, TextField} from '@mui/material'


const VehicleModal = ({setAddToggle, add, editVehicle, defaultFormik, customers, setCurrentSelection, disableCustomer}) => {

	const dvlaAPIKey = process.env.NEXT_PUBLIC_DVLA_API_KEY

	const [error, setError] = useState("")
	const [edit, setEdit] = useState(false)
	const [fetchedVehicle, setFetchedVehicle] = useState({});


	const getDVLA = (reg) => {

		// lcp --proxyUrl https://driver-vehicle-licensing.api.gov.uk
	
		fetch("http://localhost:8010/proxy/vehicle-enquiry/v1/vehicles", {
			method: "POST",
			//@ts-ignore
			body: JSON.stringify({registrationNumber: reg}),
			headers: {
			"Content-Type": "application/json",
			"x-api-key": dvlaAPIKey
			}
		})
		.then((response) => response.json())
		.then((data) => {
			if (data["errors"] === undefined){
				setError("")
				setFetchedVehicle({...data});
				formik.setValues({...data})
			} else {
				setError(data.errors[0].detail)
				formik.handleReset()
			}
		}) 
		.catch((error) => {
			console.log("error", error)
		})
	  }


	const formik = useFormik({
		initialValues: {
			_id: "",
			colour: "",
			fuelType: "",
			make: "",
			monthOfFirstRegistration: "",
			registrationNumber: "",
			wheelplan: "",
            yearOfManufacture: Number,
            customer: "",
            customerName:""
		},

		validationSchema: Yup.object({
			_id: Yup.string(),
			colour: Yup.string()
				.max(20, 'Colour must be 20 characters or less')
				.required('Colour is Required'),
            fuelType: Yup.string()
				.max(20, 'Fuel Type must be 20 characters or less')
				.required('Fuel Type is Required'),
            make: Yup.string()
				.max(20, 'Make must be 20 characters or less')
				.required('Make is Required'),
            monthOfFirstRegistration: Yup.string()
				.required('Month of First Registration is Required')
				.max(20, 'Must be less than 20 characters.'),
            registrationNumber: Yup.string()
				.required('Registration Number is Required')
				.matches(/^[a-zA-Z0-9_.-]*$/, "Must be letters and numbers")
				.max(10, 'Must be less than 10 characters'),
            wheelplan: Yup.string()
				.required('Wheel Plan is required.')
				.max(20, 'Must be less than 20 characters.'),
			yearOfManufacture: Yup.number()
				.required('Year of Manufacture is required.'),
		})
	});

	useEffect(() => {
		if(!(JSON.stringify(defaultFormik) === "{}")) {
			formik.setValues(defaultFormik)
			setEdit(true)
		}
	}, [defaultFormik]);

	const handleSave = (e) => {
		e.preventDefault();

		if(JSON.stringify(formik.errors) === "{}" || formik.values === null) {

			if(edit){
				editVehicle(JSON.stringify(formik.values), defaultFormik._id)
			} else {
				add(JSON.stringify(formik.values));
			}
			setAddToggle(false);
		} else{
			setError("Missing Required Fields")
		}
	}
  return (
	
    <ModalWrapper title={!(JSON.stringify(defaultFormik) === "{}") ? "Edit Vehicle." : "Add Vehicle"} subtitle={!(JSON.stringify(defaultFormik) === "{}") ? "View expanded vehicle details and edit vehicle details." : "Add new vehicle to database using registration number."}>

	<form action="">
		<div className="flex">
            <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">


					<InputField 
						label={formik.errors.registrationNumber ? formik.errors.registrationNumber : "Registration Number"}
						disabled={!(JSON.stringify(defaultFormik) === "{}") ? true : false}
						placeholder="Enter the Registration number:" 
						htmlFor="registrationNumber" 
						required={true} 
						type="text" 
						value={formik.values.registrationNumber} 
						onChange={formik.handleChange}/> 

					{(JSON.stringify(defaultFormik) === "{}") &&
						<button className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
						onClick={(e) => {
							e.preventDefault();
							getDVLA(formik.values.registrationNumber)}}>Search</button>
					}

					<InputField 
						label={formik.errors.make ? formik.errors.make : "Make"}
						placeholder="Search For Registration Number." 
                        disabled={true}
						htmlFor="make" 
						required={true} 
						type="text" 
						value={formik.values.make} 
						onChange={formik.handleChange}/> 


					<InputField 
						label={formik.errors.yearOfManufacture ? formik.errors.yearOfManufacture : "Year of Manufacture"}
                        disabled={true}
						placeholder="Search For Registration Number." 
						htmlFor="yearOfManufacture" 
						required={true} 
						type="Number" 
						value={formik.values.yearOfManufacture} 
						onChange={formik.handleChange}/> 


					<InputField 
						label={formik.errors.monthOfFirstRegistration ? formik.errors.monthOfFirstRegistration : "Month of Registration"}
                        disabled={true}
						placeholder="Search For Registration Number." 
						htmlFor="monthOfFirstRegistration" 
						required={true} 
						type="text" 
						value={formik.values.monthOfFirstRegistration} 
						onChange={formik.handleChange}/> 

			</div>
			
            <div className="flex-1 ml-2 flex flex-col items-center">

                    <InputField 
						label={formik.errors.fuelType ? formik.errors.fuelType : "Fuel Type"}
                        disabled={true}
						placeholder="Search For Registration Number."
						htmlFor="fuelType" 
						required={true} 
						type="text" 
						value={formik.values.fuelType} 
						onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.colour ? formik.errors.colour : "Colour"}
						placeholder="Enter the colour:"
						htmlFor="colour" 
						required={true} 
						type="text" 
						value={formik.values.colour} 
						onChange={formik.handleChange}/> 

                    <InputField 
						label={formik.errors.wheelplan ? formik.errors.wheelplan : "Wheelplan"}
                        disabled={true}
						placeholder="Search For Registration Number."
						htmlFor="wheelplan" 
						required={true} 
						type="text" 
						value={formik.values.wheelplan} 
						onChange={formik.handleChange}/> 

						<InputLabel className="mt-3" htmlFor="customer">Only use if neccessary.</InputLabel>
						<Autocomplete
							sx={{ width: "83.3%"}}
							id="customer"
							disabled={disableCustomer}
							options={customers}
							value={formik.values.customer}
							onChange={(event, newValue) => {
								console.log(newValue);
								formik.setFieldValue('customer', newValue);
							}}
							getOptionLabel={(customer) => `${customer.surname}, ${customer.firstName}`}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Customer"
									variant="outlined"
									required
								/>
							)}
						/>

				

				<div className="flex-grow"></div>



				<div className="mt-5 flex flex-col">

					{ error && (
						<div className="bg-red-500 text-white text-center text-sm py-2 px-2 mb-3 rounded-md">
							{error}
						</div>
					)
					}

					<div className="flex align-center justify-center">
						<button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
							onClick={(e) => {
								e.preventDefault();
								handleSave(e)}}>Save</button>

						<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300"
							onClick={(e) => {
								e.preventDefault();
								setAddToggle(false)
								console.log(customers)
								if(!disableCustomer){setCurrentSelection({})}
							}}>Cancel</button>
					</div>
				

				</div>


				

				

			</div>
        </div>
	</form>
        

		
		
        


    </ModalWrapper>
  )
}

export default VehicleModal
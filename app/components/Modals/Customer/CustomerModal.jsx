import React, { useState, useEffect } from 'react'

import ModalWrapper from '../../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import InputField from '../../InputField/InputField';
import * as Yup from "yup";
import {Switch, FormControlLabel, InputLabel, Select, FormControl, MenuItem, Autocomplete, TextField} from '@mui/material'


const CustomerModal = ({setAddToggle, add, editCustomer ,defaultFormik, vehicles, setCurrentSelection, job}) => {

	const [error, setError] = useState("")
	const [edit, setEdit] = useState(false)
    const [selectedVehicles, setSelectedVehicles] = useState()

	const formik = useFormik({
		initialValues: {
            _id:"",
			firstName: "",
			surname: "",
			email: "",
			number: "",
			postcode: "",
            region:"",
            city:"",
			address: "",
			vehicles: [],
            jobs: [],
		},

        

		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(20, 'First Name must be 20 characters or less')
				.required('First Name is Required'),
			surname: Yup.string()
				.max(20, 'Surname must be 20 characters or less')
				.required('Surname is Required'),
			email: Yup.string()
				.email('Invalid Email address')
				.required('Email is Required'),
			number: Yup.string()
				.required('Contact Number is Required')
				.matches(/^[0-9]+$/, "Must be only digits")
				.min(7, 'Must be atleast 7 digits')
				.max(11, 'Must be less than 12 digits'),
			postcode: Yup.string()
				.required('Postcode is Required')
				.matches(/^[a-zA-Z0-9_.-]*$/, "Must be letters and numbers")
				.min(5, 'Must be atleast 5 character')
				.max(8, 'Must be less than 9 characters'),
            region: Yup.string()
				.max(30, 'Region must be 30 characters or less')
				.required('Region is Required'),
            city: Yup.string()
				.max(30, 'City must be 30 characters or less')
				.required('City is Required'),
			address: Yup.string()
				.max(30, 'Address must be 30 characters or less')
				.required('Address is Required'),
			vehicles: Yup.array()
				.of(Yup.string()),
            jobs: Yup.array()
				.of(Yup.string())
		})
	});

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const isValidKey = (keyCode >= 48 && keyCode <= 57) || // Numeric keys
                           keyCode === 8 ||                 // Backspace
                           keyCode === 9 ||                 // Tab
                           keyCode === 46 ||                 // Delete
                           (keyCode >= 37 && keyCode <= 40);  // Arrow keys
    
        if (!isValidKey) {
          event.preventDefault();
        }
      };

	useEffect(() => {
		if(!(JSON.stringify(defaultFormik) === "{}")) {
			formik.setValues(defaultFormik)
            setSelectedVehicles(defaultFormik.vehicles)
			setEdit(true)
		}
	}, [defaultFormik]);

    // Needs edit
	const handleSave = (e) => {
		e.preventDefault();

		if(JSON.stringify(formik.errors) === "{}" || formik.values === null) {

			if(edit){
                console.log("beepboop editing: " + defaultFormik._id)
				editCustomer(JSON.stringify(formik.values), defaultFormik._id)
			} else {
				add(JSON.stringify(formik.values));
			}
			setAddToggle(false);
		} else{
			setError("Missing Required Fields")
		}
	}

    const onChangeVehicles = (data) => {
        const vehicleIds = [];

        for (const v of data) {
            vehicleIds.push(v._id);
        }
        formik.setFieldValue('vehicles', vehicleIds);
    }

    const getAddress = (postcode) => {

        fetch(`https://api.postcodes.io/postcodes/${postcode}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if(data["result"]){
                    setError("")
                    console.log(data)
                    formik.setFieldValue('postcode', data.result.postcode.split(" ").join(""));
                    formik.setFieldValue('region', data.result.region);
                    formik.setFieldValue('city', data.result.admin_district);
                } else {
                    setError(data.error)
                }
            })
            .catch((error) => {
                setError(error.message)
                console.log(error)
              }),[]
        }

  return (

    <ModalWrapper title={!(JSON.stringify(defaultFormik) === "{}") ? "Edit Customer." : "Create New Customer"} subtitle={!(JSON.stringify(defaultFormik) === "{}") ? "View expanded customer details and edit customer details." : "Enter new employee details here"}>

        <form action="">
            <div className="flex">
                <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">

                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.firstName ? formik.errors.firstName : "First Name"}
                            disabled={false}
                            placeholder="Enter First Name:" 
                            id="firstName" 
                            required={true} 
                            type="text" 
                            value={formik.values.firstName} 
                            onChange={formik.handleChange}/> 

                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.surname ? formik.errors.surname : "Surname"}
                            placeholder="Enter Surname:" 
                            disabled={false}
                            id="surname" 
                            required={true} 
                            type="text" 
                            value={formik.values.surname} 
                            onChange={formik.handleChange}/> 


                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.number ? formik.errors.number : "Number"}
                            disabled={false}
                            placeholder="Number Mobile Number:" 
                            id="number" 
                            required={true} 
                            type="tel" 
                            onKeyDown={handleKeyPress}
                            value={formik.values.number} 
                            onChange={formik.handleChange}/> 


                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.email ? formik.errors.email : "Email"}
                            disabled={false}
                            placeholder="Enter Email:" 
                            id="email" 
                            required={true} 
                            type="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange}/> 

                </div>
                
                <div className="flex-1 ml-2 flex flex-col items-center">

                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.postcode ? formik.errors.postcode : "Postcode"}
                            disabled={false}
                            placeholder="Enter Postcode"
                            id="postcode" 
                            required={true} 
                            type="text" 
                            value={formik.values.postcode} 
                            onChange={formik.handleChange}/> 

                            <button className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
                            onClick={(e) => {
                                e.preventDefault();
                                getAddress(formik.values.postcode)}}>Search</button>
                        
                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.region ? formik.errors.region : "Region"}
                            disabled={true}
                            placeholder="Enter Region:"
                            id="region" 
                            required={true} 
                            type="text" 
                            value={formik.values.region} 
                            onChange={formik.handleChange}/> 

                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.city ? formik.errors.city : "City"}
                            disabled={true}
                            placeholder="Enter City:"
                            id="city" 
                            required={true} 
                            type="text" 
                            value={formik.values.city} 
                            onChange={formik.handleChange}/> 

                        <TextField 
                            className="w-5/6 mt-5"
                            label={formik.errors.address ? formik.errors.address : "Address"}
                            disabled={
                                formik.values.postcode && formik.values.city && formik.values.region ? false : true
                            }
                            placeholder="Enter Address:"
                            id="address" 
                            required={true} 
                            type="text" 
                            value={formik.values.address} 
                            onChange={formik.handleChange}/>    

                        {/* <Autocomplete
                            multiple
                            options={vehicles}
                            getOptionLabel={(option) => option.registrationNumber}
                            onChange={(e, newValue) => {
                                onChangeVehicles(newValue);
                            }}
                            value={formik.values.vehicles}
                            isOptionEqualToValue={(option, value) => {

                                console.log("option id" ,option.id)

                                if (typeof value === 'string') {
                                  return option._id === value;
                                } else if (Array.isArray(value)) {
                                  return value.includes(option._id);
                                } else {
                                  return false;
                                }
                              }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                variant="outlined"
                                label="Select Vehicles"
                                placeholder="Search Vehicles"
                                />
                            )}
                            /> */}
                    <div className="flex-grow"></div>

                    <div className="mt-5 flex flex-col">
                        {error && (
                            <div className="bg-red-500 text-white text-center text-sm py-2 px-2 mb-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="flex align-center justify-center">
                            <button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSave(e)}}>Save</button>

                            <button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddToggle(false)
                                    if(!job){setCurrentSelection({})}
                                }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </ModalWrapper>
  )
}

export default CustomerModal
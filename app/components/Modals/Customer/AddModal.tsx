import React, { useState } from 'react';
import InputField from '../../InputField/InputField';
import { useFormik } from "formik"
import * as Yup from "yup";

const AddModal = ({isVisible, setAddToggle, addCustomer}: {isVisible: boolean, setAddToggle: Function, addCustomer: Function}) => {

	if(!isVisible) return null;

	//@ts-ignore
	const formik = useFormik({
		initialValues: {
			firstName: "",
			surname: "",
			email: "",
			number: "",
			postcode: "",
			address: "",
			vehicles: []
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
			address: Yup.string()
				.max(50, 'Address must be 50 characters or less')
				.required('Address is Required'),
			vehicles: Yup.array()
				.of(Yup.string())
		})
	});

	// soft validation, can be improved
	const handleSave = (e: React.MouseEvent) => {
		e.preventDefault();
		
		if(JSON.stringify(formik.errors) === "{}") {
			addCustomer(JSON.stringify(formik.values));
			setAddToggle(false);
		}
	}

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
        <div className="w-1/2 mr-60 border-primary-200 border-solid border-2 rounded-md">

						<div className="flex-1 text-white p-5 bg-primary-200 rounded-t">
							<h1 className="text-xl py-1">Add new customer: </h1>
							<p className="text-md">Add a new customer to database.</p>
						</div>

            <form className="bg-white p-5 rounded-b ">

							<div className="flex flex-col justify-center items-center">
								<InputField 
									label={formik.errors.firstName ? formik.errors.firstName : "First Name"}
									placeholder="Enter your first name:" 
									htmlFor="firstName" 
									required={true} 
									type="text" 
									value={formik.values.firstName} 
									onChange={formik.handleChange}/>

								<div className="pt-2">
								<InputField 
									label={formik.errors.surname ? formik.errors.surname: "Surname"}
									placeholder="Enter your surname:" 
									htmlFor="surname" 
									required={true} 
									type="text" 
									value={formik.values.surname} 
									onChange={formik.handleChange}/>
								</div>

								<div className="pt-2">
								<InputField 
									label={formik.errors.email ? formik.errors.email: "Email"}
									placeholder="Enter your Email:" 
									htmlFor="email" 
									required={true} 
									type="email" 
									value={formik.values.email} 
									onChange={formik.handleChange}/>
								</div>

								<div className="pt-2">
								<InputField 
									label={formik.errors.number ? formik.errors.number: "Contact Number"} 
									placeholder="Enter your contact number:" 
									htmlFor="number" 
									required={true} 
									type="text" 
									value={formik.values.number} 
									onChange={formik.handleChange}/>
								</div>

								<div className="pt-2">
								<InputField 
									label={formik.errors.postcode ? formik.errors.postcode: "Postcode"} 
									placeholder="Enter your postcode:" 
									htmlFor="postcode" 
									required={true} 
									type="text" 
									value={formik.values.postcode} 
									onChange={formik.handleChange}/>
								</div>

								<div className="pt-2">
								<InputField 
									label={formik.errors.address? formik.errors.address : "Address"} 
									placeholder="Enter your address:" 
									htmlFor="address" 
									required={true} 
									type="text" 
									value={formik.values.address} 
									onChange={formik.handleChange}/>
								</div>

								{/* <div className="pt-2">
								<label className="block text-sm pb-1" htmlFor="vehicle">
									Vehicles
								</label>
								<select name="vehicle" id="vehicles" className="border-2 border-gray-500 px-2 rounded-md">
									<option value="test1" id="abc">Test1</option>
									<option value="test2" id="sda">Test2</option>
								</select>
								
								</div>								 */}
								
							<div className="py-5">
								<button className={(JSON.stringify(formik.errors) === "{}" || formik.values.firstName === "") ? "bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform" : "bg-gray-400 text-black font-bold py-2 px-6 mx-5 rounded"}
									onClick={(e) => {handleSave(e)}}>
									Save
								</button>
								<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300" 
									type="button" onClick={() => setAddToggle(false)}>
									Cancel
								</button>
							</div>
							</div>
						</form>

						
        </div>
        
    </div>
  )
}

export default AddModal
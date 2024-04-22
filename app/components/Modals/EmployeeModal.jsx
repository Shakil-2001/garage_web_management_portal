import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import InputField from '../InputField/InputField';
import * as Yup from "yup";
import {Switch, FormControlLabel, InputLabel, Select, FormControl, MenuItem} from '@mui/material'


const EmployeeModal = ({me, setAddToggle, add, editEmployee ,defaultFormik, setCurrentSelection, title, description}) => {

	const [error, setError] = useState("")
	const [edit, setEdit] = useState(false)
	const [changePassword, setChangePassword] = useState(true)


	const formik = useFormik({
		initialValues: {
			_id: "",
			firstName: "",
			surname: "",
			email: "",
			contactNumber: "",
			password: "",
			confirmPassword: "",
            admin: false,
            role: "",
            jobs: [],
			emergencyContactName: "",
			emergencyContactNumber: "",
		},

		validationSchema: Yup.object({
			_id: Yup.string(),
			firstName: Yup.string()
				.max(20, 'First Name must be 20 characters or less')
				.required('First Name is Required'),
			surname: Yup.string()
				.max(20, 'Surname must be 20 characters or less')
				.required('Surname is Required'),
			email: Yup.string()
				.email('Invalid Email address')
				.required('Email is Required'),
            contactNumber: Yup.string()
				.required('Contact Number is Required')
				.matches(/^[0-9]+$/, "Must be only digits")
				.min(7, 'Must be atleast 7 digits')
				.max(11, 'Must be less than 12 digits'),
            password: changePassword ?
				Yup.string()
					.matches(/^[a-zA-Z0-9_.-]*$/, "Must be letters and numbers")
					.min(5, 'Must be atleast 6 character')
					.max(12, 'Must be less than 13 characters')
				:
				Yup.string(),
			confirmPassword: changePassword
				? Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match')
				: 
				Yup.string(),
			admin: Yup.boolean()
				.required('Admin value is required.'),
			role: Yup.string()
				.max(20, 'Role must be 20 characters or less')
				.required('Role is Required'),
			jobs: Yup.array()
				.of(Yup.string()),
			emergencyContactName: Yup.string()
				.max(20, 'Emergency Contact Name must be 30 characters or less')
				.required('Emergency Contact Name is Required'),
			emergencyContactNumber: Yup.string()
				.required('Emergency Contact Number is Required')
				.matches(/^[0-9]+$/, "Must be only digits")
				.min(7, 'Must be atleast 7 digits')
				.max(11, 'Must be less than 12 digits'),
			
		})
	});

	useEffect(() => {

		if(defaultFormik) {
			setChangePassword(false)
			formik.setValues({ ...defaultFormik, password: "" });
			setEdit(true)
		}
	}, [defaultFormik]);

	const handleSave = (e) => {
		e.preventDefault();



		
		if(JSON.stringify(formik.errors) === "{}" || 
			formik.values === null || 
			(changePassword & formik.values.password !== formik.values.changePassword) ||
			(changePassword && formik.values.password.length < 5)) {

			if(edit){
				editEmployee(JSON.stringify(formik.values), defaultFormik._id)
			} else {
				add(JSON.stringify(formik.values));
			}
			setAddToggle(false);
		} else{
			setError("Missing Required Fields")
		}
	}
  return (
	
    <ModalWrapper title={!defaultFormik || me ? title : "Edit Employee Information"} subtitle={description}>


	<form action="">
		<div className="flex ">
            <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">
				<InputField 
					label={formik.errors.firstName ? formik.errors.firstName : "First Name"}
					placeholder="Enter the employees first name:" 
					htmlFor="firstName" 
					required={true} 
					type="text" 
					value={formik.values.firstName} 
					onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.surname ? formik.errors.surname : "Surname"}
						placeholder="Enter the employees surname:" 
						htmlFor="surname" 
						required={true} 
						type="text" 
						value={formik.values.surname} 
						onChange={formik.handleChange}/> 


					<InputField 
						label={formik.errors.email ? formik.errors.email : "Email"}
						placeholder="Enter the employees email:" 
						htmlFor="email" 
						required={true} 
						type="email" 
						value={formik.values.email} 
						onChange={formik.handleChange}/> 


					<InputField 
						label={formik.errors.contactNumber ? formik.errors.contactNumber : "Contact Number"}
						placeholder="Enter the employees contact number:" 
						htmlFor="contactNumber" 
						required={true} 
						type="text" 
						value={formik.values.contactNumber} 
						onChange={formik.handleChange}/> 


					<InputField 
						label={formik.errors.password ? formik.errors.password : "Password"}
						placeholder="Enter employee password:"
						required={changePassword}
						disabled={!changePassword}
						htmlFor="password" 
						type="password" 
						value={formik.values.password} 
						onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.confirmPassword ? formik.errors.confirmPassword : "Confirm Password"}
						placeholder="Confirm employee password:"
						required={changePassword}
						disabled={!changePassword}
						htmlFor="confirmPassword" 
						type="password" 
						value={formik.values.confirmPassword} 
						onChange={formik.handleChange}/> 

			</div>
			
            <div className="flex-1 ml-2 flex flex-col items-center">

				<InputField 
					label={formik.errors.emergencyContactName ? formik.errors.emergencyContactName : "Emergency Contact Name"}
					placeholder="Enter the Emergency contact name:" 
					htmlFor="emergencyContactName" 
					required={true} 
					type="text" 
					value={formik.values.emergencyContactName} 
					onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.emergencyContactNumber ? formik.errors.emergencyContactNumber : "Emergency Contact Number"}
						placeholder="Enter the employees emergency contact number:" 
						htmlFor="emergencyContactNumber" 
						required={true} 
						type="text" 
						value={formik.values.emergencyContactNumber} 
						onChange={formik.handleChange}/> 

				<FormControl required fullWidth value="" sx={{ width: "83.3%"}}
				className="mt-4">

					<InputLabel className="mt-5" id="role">Role</InputLabel>
					<Select
					className="mt-5"
					labelId="role"
					id="role"
					name={"role"}
					value={formik.values.role}
					label="Age *"
					onChange={formik.handleChange}
					>
					<MenuItem >
						<em>None</em>
					</MenuItem>
					<MenuItem value={"Apprentice Mechanic"}>Apprentice Mechanic</MenuItem>
					<MenuItem value={"General Mechanic"}>General Mechanic</MenuItem>
					<MenuItem value={"Autobody Mechanic"}>Autobody Mechanic</MenuItem>
					<MenuItem value={"Service Technician"}>Service Technician</MenuItem>
					<MenuItem value={"Vehicle Inspectors"}>Vehicle Inspectors</MenuItem>
					<MenuItem value={"Assistant Manager"}>Assitant Manager</MenuItem>
					<MenuItem value={"Manager"}>Manager</MenuItem>
					</Select>
				</FormControl>

				<FormControlLabel 
					className="pt-5"
					disabled={me}
					control={<Switch color="primary" name={"admin"} value={formik.values.admin} onChange={formik.handleChange} />} 
					label="*Admin Rights" />

				<div className="flex-grow"></div>

				{defaultFormik && 
					!changePassword &&
						<button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
						onClick={(e) => {
							e.preventDefault();
							setChangePassword(true)}}>
								Change Password
						</button>
						
				}
				



				<div className="mt-5">

					{ error && (
						<div className="bg-red-500 text-white text-center text-sm py-2 mb-3 rounded-md">
							{error}
						</div>
					)
					}

					<button className="bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform"
						onClick={(e) => {
							e.preventDefault();
							handleSave(e)}}>Save</button>

					<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300"
						onClick={(e) => {
							e.preventDefault();
							if(!me){setCurrentSelection(null)}
							setAddToggle(false)}}>Cancel</button>

				</div>
			</div>
        </div>
	</form>
    </ModalWrapper>
  )
}

export default EmployeeModal
import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import * as Yup from "yup";
import {Switch, FormControlLabel, InputLabel, Select, FormControl, MenuItem, TextField} from '@mui/material'


const UpdatePassword = ({setToggle, editEmployee ,id}) => {

	const [error, setError] = useState("")

	const formik = useFormik({
		initialValues: {
			_id: "",
            passwordOnly: true,
			password: "",
			confirmPassword: "",
		},

		validationSchema: Yup.object({
			_id: Yup.string(),
            password: Yup.string()
				.required('Password is Required')
				.matches(/^[a-zA-Z0-9_.-]*$/, "Must be letters and numbers")
				.min(5, 'Must be atleast 6 character')
				.max(12, 'Must be less than 13 characters'),
			confirmPassword: Yup.string()
				.required('Password must match')
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		})
	});

	useEffect(() => {

		if(id) {
            formik.setValues({ ...formik.values, _id: id });
		}
	}, []);

	const handleSave = (e) => {
		e.preventDefault();

		
		if(JSON.stringify(formik.errors) === "{}" || formik.values === null) {
            editEmployee(JSON.stringify(formik.values), formik.values._id)
			setToggle(false);
		} else{
			setError("Passwords do not match")
		}
	}

  return (
	
    <ModalWrapper title={"Update Password."} subtitle={"Enter new password here."}>



	<form action="">
		<div className="flex ">
            <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">


                <div className="w-full mt-10 flex flex-col justify-center items-center">
                    <InputLabel className="w-1/2 mb-3" required={true} htmlFor="password">Password</InputLabel>
                    <TextField 
                            className="w-1/2"
                            variant="outlined"
                            label={formik.errors.password ? formik.errors.password : "Password"}
                            placeholder="Enter new password:"
                            id="password" 
                            required={true} 
                            type="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange}/> 
                </div>

                <div className="w-full my-10 flex flex-col justify-center items-center">
                    <InputLabel className="w-1/2 mb-3" required={true} htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <TextField 
                        className="w-1/2"
						label={formik.errors.confirmPassword ? formik.errors.confirmPassword : "Confirm Password"}
						placeholder="Confirm new password:"
						id="confirmPassword" 
						required={true} 
						type="password" 
						value={formik.values.confirmPassword} 
						onChange={formik.handleChange}/> 


                </div>

				<div className="">
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
							setToggle(false)}}>Cancel</button>

				</div>
			</div>
        </div>
	</form>

    </ModalWrapper>
  )
}

export default UpdatePassword
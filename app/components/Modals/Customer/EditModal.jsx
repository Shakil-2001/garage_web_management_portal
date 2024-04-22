import React from 'react'
import TextField from '@mui/material/TextField';

import { useFormik } from "formik"
import * as Yup from "yup";

const EditModal = ({json, isVisible, setEditModal, setReload, setMessage}) => {

  if(!isVisible) return null;

  const handleSave = (e) => {

		e.preventDefault();
		
		if(JSON.stringify(formik.errors) === "{}") {
      fetch(`http://localhost:3000/api/customer/${json._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formik.values)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setReload(true);
          setMessage(data.message)
          })
        .catch(error => console.error(error))
      
			setEditModal(false);
      
		}
	}

	//@ts-ignore
	let formik = useFormik({
		initialValues: {
			firstName: json.firstName,
			surname: json.surname,
			email: json.email,
			number: json.number,
			postcode: json.postcode,
			address: json.address,
			vehicles: json.vehicles
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

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="w-1/2 mr-60 mb-60 border-primary-200 border-solid border-2 rounded-md">

					<div className="flex-1 text-white p-5 bg-primary-200 rounded-t">
						<h1 className="text-xl py-1">Edit customer details: </h1>
						<p className="text-md">View expanded customer details and edit.</p>
					</div>

          <form className="bg-white p-5 rounded-b ">

							<div className="flex flex-col justify-center items-center">

              
              <TextField
                className="mt-3"
                id="firstName"
                label="First Name"
                required={true} 
                type="text" 
                error={formik.errors.firstName}
                helperText={formik.errors.firstName}
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />

              <TextField
                className="mt-3"
                id="surname"
                label="Surname"
                required={true} 
                type="text" 
                error={formik.errors.surname}
                helperText={formik.errors.surname}
                value={formik.values.surname} 
                onChange={formik.handleChange}
              />

              <TextField
                className="mt-3"
                id="email"
                label="Email"
                required={true} 
                type="email" 
                error={formik.errors.email}
                helperText={formik.errors.email}
                value={formik.values.email} 
                onChange={formik.handleChange}
              />

              <TextField
                className="mt-3"
                id="number"
                label="Contact Number"
                required={true} 
                type="text" 
                error={formik.errors.number}
                helperText={formik.errors.number}
                value={formik.values.number} 
                onChange={formik.number}
              />

              <TextField
                className="mt-3"
                id="postcode"
                label="Postcode"
                required={true} 
                type="text" 
                error={formik.errors.postcode}
                helperText={formik.errors.postcode}
                value={formik.values.postcode} 
                onChange={formik.handleChange}
              />

              <TextField
                id="address"
                label="Address"
                required={true} 
                type="text" 
                error={formik.errors.address}
                helperText={formik.errors.address}
                value={formik.values.address} 
                onChange={formik.handleChange}
              />

              </div>

              <div className="py-5">
								<button className={(JSON.stringify(formik.errors) === "{}") ? "bg-blue-600 text-white font-bold py-2 px-6 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform" : "bg-gray-400 text-black font-bold py-2 px-6 mx-5 rounded"}
									onClick={(e) => {handleSave(e)}}>
									Save
								</button>
								<button className="bg-red-700 text-white font-bold py-2 px-4 mx-5 rounded outline-none hover:ring-4 shadow-lg transform hover:scale-x-95 transition-transform ring-red-300" 
									type="button" onClick={() => setEditModal(false)}>
									Cancel
								</button>
							</div>
          </form>

        </div>
    </div>

  )
}

export default EditModal
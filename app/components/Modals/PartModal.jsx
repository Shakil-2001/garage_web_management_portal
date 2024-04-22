import React, { useState, useEffect } from 'react'

import ModalWrapper from '../Wrappers/ModalWrapper'
import { useFormik } from "formik"
import InputField from '../InputField/InputField';
import * as Yup from "yup";
import {Switch, FormControlLabel, InputLabel, Select, FormControl, MenuItem, Autocomplete, TextField,} from '@mui/material'
import { PART_CATEGORY, CAR_MAKES } from '@/app/constants';


const PartModal = ({setModalToggle, addPart, editPart, defaultFormik, parts, setCurrentSelection}) => {

	const [error, setError] = useState("")
	const [edit, setEdit] = useState(false)

    const handleChangeDecimal = (event) => {
        const { name, value } = event.target;
    
        const regex = /^\d*\.?\d{0,2}$/;
        if (regex.test(value) || value === '') {
          formik.handleChange(event);
        }
      };

	const formik = useFormik({
		initialValues: {
			_id: "",
			name: "",
			supplier: "",
			rating: "",
			category: "",
			subCategory: "",
			compatibleMake: [],
            quantity: Number,
            minQuantity: Number,
		},

		validationSchema: Yup.object({
			_id: Yup.string(),
			name: Yup.string()
				.max(100, 'Name must be 20 characters or less')
				.required('Name is Required'),
            supplier: Yup.string()
				.max(100, 'Supplier must be 20 characters or less')
				.required('Supplier is Required'),
            cost: Yup.number()
                .required("required")
                .positive(),
            rating: Yup.number()
				.max(5)
                .nullable(),
            category: Yup.string()
				.required('Category is Required')
				.max(100, 'Must be less than 100 characters.'),
            subCategory: Yup.string()
				.max(100, 'Must be less than 100 characters.'),
            compatibleMake: Yup.array()
				.of(Yup.string()),
            quantity: Yup.number()
				.required('Quantity is required.')
                .positive("Number Must be a Positive Interger")
                .integer("Number Must be a Positive Interger")
                .min(0, "Must = 0 or greater")
                .max(300, "Must be less than 300"),
            minQuantity: Yup.number()
				.required('Minimum Quantity is required.')
                .positive("Number Must be a Positive Interger")
                .integer("Number Must be a Positive Interger")
                .min(0, "Must = 0 or greater")
                .max(300, "Must be less than 300")
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
				editPart(JSON.stringify(formik.values), defaultFormik._id)
			} else {
				addPart(JSON.stringify(formik.values));
			}
			setModalToggle(false);
		} else{
			setError("Missing Required Fields")
		}
	}
  return (
	
    <ModalWrapper title={!(JSON.stringify(defaultFormik) === "{}") ? "Edit Part." : "Add Part"} subtitle={!(JSON.stringify(defaultFormik) === "{}") ? "View expanded part details and edit part details." : "Add new part to inventory."}>

	<form action="">
		<div className="flex">
            <div className="flex-1 border-gray-300 border-r flex flex-col justify-center items-center">
					<InputField 
						label={formik.errors.name ? formik.errors.name : "Part Name"}
						disabled={false}
						placeholder="Enter the Part Name:" 
						htmlFor="name" 
						required={true} 
						type="text" 
						value={formik.values.name} 
						onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.supplier ? formik.errors.supplier : "Supplier"}
						placeholder="Enter the Supplier:" 
                        disabled={false}
						htmlFor="supplier" 
						required={true} 
						type="text" 
						value={formik.values.supplier} 
						onChange={formik.handleChange}/> 

                    <InputField 
                        label={formik.errors.cost ? formik.errors.cost : "Cost"}
                        disabled={false}
                        placeholder="Select Cost."
                        htmlFor="cost" 
                        required={true} 
                        type="number" 
                        value={formik.values.cost} 
                        onChange={handleChangeDecimal}/> 

                    <FormControl required fullWidth value="" sx={{ width: "83.3%"}}
				        className="mt-4">

                        <InputLabel id="role">Category</InputLabel>

                        <Select
                        labelId="category"
                        id="category"
                        name={"category"}
                        value={formik.values.category}
                        label="Select the Part Category*"
                        onChange={formik.handleChange}
                        >
                        <MenuItem >
                            <em>None</em>
                        </MenuItem>
                        {PART_CATEGORY.map((categoryObj, index) => (
                            <MenuItem key={index} value={Object.keys(categoryObj)[0]}>
                                {Object.keys(categoryObj)[0]}
                            </MenuItem>
                        ))}
                        </Select>
				    </FormControl>

                    <FormControl required fullWidth value="" sx={{ width: "83.3%"}}
				        className="mt-4">

                        <InputLabel id="role">Sub Category</InputLabel>

                        <Select
                        disabled={formik.values.category ? false : true}
                        labelId="subCategory"
                        id="subCategory"
                        name={"subCategory"}
                        value={formik.values.subCategory}
                        label="Select the Part Category"
                        onChange={formik.handleChange}
                        >
                        <MenuItem >
                            <em>None</em>
                        </MenuItem>
                        {formik.values.category && PART_CATEGORY.find(category => Object.keys(category)[0] === formik.values.category)[formik.values.category].map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                        </Select>
				    </FormControl>
			</div>
			
            <div className="flex-1 ml-2 flex flex-col items-center">

                <div className="flex flex-row">

                    <InputField 
                            label={formik.errors.minQuantity ? "Min Quantity Required" : "Min Quantity"}
                            disabled={false}
                            placeholder="Select Minimum Quantity."
                            htmlFor="minQuantity" 
                            required={true} 
                            type="number" 
                            value={formik.values.minQuantity} 
                            onChange={formik.handleChange}/> 

					<InputField 
						label={formik.errors.quantity ? "Quantity Required" : "Quantity"}
                        disabled={false}
						placeholder="Select Quantity."
						htmlFor="quantity" 
						required={true} 
						type="number" 
						value={formik.values.quantity} 
						onChange={formik.handleChange}/> 

                </div>

                <Autocomplete
                        className="mt-5 w-4/5"
                        multiple
                        limitTags={2}
                        id="compatibleMake"
                        options={CAR_MAKES}
                        getOptionLabel={(option) => option}
                        value={formik.values.compatibleMake}
                        onChange={(e, newValue) => {
                            formik.setFieldValue('compatibleMake', newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Select Car Makes"
                                placeholder="Select Car Makes"
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
								setCurrentSelection({})
								setModalToggle(false)
							}}>Cancel</button>
					</div>
				</div>
			</div>
        </div>
	</form>
    </ModalWrapper>
  )
}

export default PartModal
import React from 'react'


const getCustomerByID = (id: String) => {
  
}

const getCustomers = () => {

	let tempData;

	fetch("http://localhost:3000/api/customer?")
		.then((response) => response.json())
		.then((data) => tempData = data);

		return tempData;
}

const createCustomer = () => {

}

const getVehicleByID = (id: String) => {
  
}

const getVehicles = () => {

}

const createVehicle = () => {

}



export { getCustomerByID, getCustomers }
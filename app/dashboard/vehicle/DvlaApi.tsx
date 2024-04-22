import React from 'react'

export const DvlaApi = (reg:string) => {
    "use server"

    fetch("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", {
        method: "POST",
        //@ts-ignore
        body: JSON.stringify({registrationNumber: reg}),
        headers: {
        "Content-Type": "application/json",
        "x-api-key": "PP3lRXF5jSPs6vrSuJWqZ3f0gcTqfM8n1JHBWb60"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("data: ", data)
        return data;
    }) 
    .catch((error) => {
        console.log(error)
        return error;
    })
    
}
"use client"

import React, { useEffect, useState, useMemo } from 'react'
import Table from "@/app/components/TestTable/Table";
import IntroCard from '@/app/components/Cards/IntroCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, Box, Typography, Alert, LinearProgress} from '@mui/material';
import CustomerModal from '@/app/components/Modals/Customer/CustomerModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const Customer = () => {

	const handleRowEditClick = (params: any) => {
		setCurrentSelection(params.row)
		setModalToggle(true);
  };

	const handleRowDeleteClick = (params: any) => {
		setCurrentSelection(params.row)
		deleteCustomer(params.row._id);
    setReload(true);
  };

  const columns = useMemo(() => [
		{field:'firstName', headerName:'First Name', flex:1},
		{field:'surname', headerName:'Surname', flex:1},
		{field:'number', headerName:'Number', flex:1},
		{field:'postcode', headerName:'Postcode', flex:1},
		{field:'address', headerName:'Address', flex:2},
		{field:'email', headerName:'Email', flex:2},
		{
			field: 'edit',
			headerName: 'Edit',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,

			renderCell: (params: any) => {
				return (
					<>
					<IconButton aria-label="edit" onClick={(e) => handleRowEditClick(params)}> 
						<EditIcon />
					</IconButton>
					<IconButton aria-label="delete" onClick={(e) => handleRowDeleteClick(params)}> 
						<DeleteIcon />
					</IconButton>
					</>
				);
			},
		},
	], []
	)

  const title = "Customer Database.";
  const introText = "View all customer records and information. Create, update and delete customer information.";

  const [customers, setCustomers] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentSelection, setCurrentSelection] = useState({});
  const [message, setMessage] = useState("");

  const getVehicles = () => {
    fetch("http://localhost:3000/api/vehicle?")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data.vehicles)
      }),[]
  }

  const getCustomers = () => {
    fetch("http://localhost:3000/api/customer?")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers)
      }),[]
  }

  const deleteCustomer = (id:string) => {
    fetch(`http://localhost:3000/api/customer?id=${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully deleted") 
        setReload(true)
        setMessage(data.message)
      })
      .catch((error) => {
        console.log(error)
      }),[]
  }

  const addCustomer = (json: JSON) => {
    fetch("http://localhost:3000/api/customer", {
      method: "POST",
      mode: "cors",
      //@ts-ignore
      body: json
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data)
      setReload(true)
      setMessage(data.message)
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  const editCustomer = (json: JSON, customerID: string) => {

    fetch(`http://localhost:3000/api/customer/${customerID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: json
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setReload(true);
          setMessage(data.message)
          })
        .catch(error => console.error(error))
			setModalToggle(false);
  }

  useEffect(() => {
    if(reload || !customers || !vehicles){
      setReload(false);
      getCustomers();
      getVehicles();
    }
      
  },[reload])

  return (
    <>
      <div className="mx-2">

        <IntroCard title={title} text={introText} icon={"lucide:users"} />

        {message && 
        <div className="flex justify-end">
          <Alert
            icon={<InfoIcon fontSize="inherit" style={{fontWeight:"bold"}} />}  severity="warning" 
            variant="filled" 
            onClose={() => {setMessage("")}} 
            style={{ width: "fit-content"}}>
              {message}
            </Alert>
        </div>
        }

        <Box sx={{
          height: '60%',
          width: 'max',
          overflow: 'auto',
          'z-index': '-1',
          margin: '10px 0px',
          padding: '10px 0px',
          'border-radius': '5px',
          border: 1,
          bgcolor: 'primary.main',
          color: "white"
            }}>
            <ul className="flex">

                <li className="my-auto ml-5">
                    <Typography variant="h3">Customers</Typography>
                </li>

                <li className="ml-auto mr-3 my-auto">
                    <Button 
                    variant="contained" color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => setModalToggle(true)}
                    sx={{
                        border: "1px solid",
                        color: "white",
                        float: 'right',

                    }}>
                        Add New Customer
                    </Button>
                </li>
            </ul>
        </Box>

      {reload && <LinearProgress />}

      {customers && 
        <Table data={customers} columns={columns} defaultRows={5}></Table>
      }
        
      </div>
      {modalToggle && <CustomerModal job={false} setAddToggle={setModalToggle} add={addCustomer} editCustomer={editCustomer} defaultFormik={currentSelection} vehicles={vehicles} setCurrentSelection={setCurrentSelection}/>}
    </>
    
  )
}



export default Customer
"use client"

import React, {useEffect, useState, useMemo} from 'react'
import Table from "@/app/components/TestTable/Table";
import IntroCard from '@/app/components/Cards/IntroCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, Box, Alert, Typography, LinearProgress } from '@mui/material';
import VehicleModal from '@/app/components/Modals/VehicleModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/close';
import InfoIcon from '@mui/icons-material/Info';

const Vehicle = () => {

  const title = "Vehicle Dashboard"
  const introText = "View all vehicle records and information. Create, update and delete vehicle information.";

  const [vehicles, setVehicles] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentSelection, setCurrentSelection] = useState({});
  const [message, setMessage] = useState("");


  const handleRowEditClick = (params: any) => {
		setCurrentSelection(params.row)
		setModalToggle(true);
  };

  const handleRowDeleteClick = (params: any) => {
		setCurrentSelection(params.row)
		deleteVehicle(params.row._id);
  };

  const columns = useMemo(() => [
		{field:'customerName', headerName:'Customer', flex:1},
		{field:'registrationNumber', headerName:'Reg Number', flex:1},
		{field:'make', headerName:'Make', flex:1},
		{field:'fuelType', headerName:'Fuel Type', flex:1},
		{field:'colour', headerName:'Colour', flex:1},
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

  const getCustomers = () => {
    // setCustomers(data)
    fetch("http://localhost:3000/api/customer?")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers)
        console.log(data.customers)
      }),[]
  }

  const getVehicles = () => {
    // setCustomers(data)
    fetch("http://localhost:3000/api/vehicle")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data.vehicles)
        console.log(data.vehicles)
      }),[]
  }

  const deleteVehicle = (id:string) => {

    console.log(id)

    fetch(`http://localhost:3000/api/vehicle?id=${id}`, {
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

  const addVehicle = (json: JSON) => {

    fetch("http://localhost:3000/api/vehicle", {
      method: "POST",
      mode: "cors",
      //@ts-ignore
      body: json
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data)
      setReload(true)
      setCurrentSelection({})
      setMessage(data.message)
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  const editVehicle = (json: JSON, vehicleId: string) => {

    fetch(`http://localhost:3000/api/vehicle/${vehicleId}`, {
      method: "PUT",
      mode: "cors",
      //@ts-ignore
      body: json,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data)
      setReload(true)
      setCurrentSelection({})
      setMessage(data.message)
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(!vehicles || !customers || reload){
      getCustomers();
      getVehicles();
      setReload(false);

    } 
  },[reload])
  return (
    <>
      <div className="mx-2">
        <IntroCard title={title} text={introText} icon={"lucide:car"} />

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
                    <Typography variant="h3">Vehicles</Typography>
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
                        Add New Vehicle
                    </Button>
                </li>
            </ul>
        </Box>

        {reload && <LinearProgress />}

        {vehicles && 
          <Table data={vehicles} columns={columns} defaultRows={5}></Table>
        } 

      </div>

      {modalToggle && <VehicleModal customers={customers} setAddToggle={setModalToggle} add={addVehicle} editVehicle={editVehicle} defaultFormik={currentSelection} setCurrentSelection={setCurrentSelection}/>}

    </>
  )
  }

export default Vehicle
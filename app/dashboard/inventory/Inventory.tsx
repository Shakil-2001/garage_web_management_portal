"use client"

import React, { useEffect, useState, useMemo } from 'react'
import Table from "@/app/components/TestTable/Table";
import IntroCard from '@/app/components/Cards/IntroCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, Box, Typography, Alert, LinearProgress} from '@mui/material';
import PartModal from '@/app/components/Modals/PartModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const Inventory = () => {

	const handleRowEditClick = (params: any) => {
		setCurrentSelection(params.row)
		setModalToggle(true);
  };

	const handleRowDeleteClick = (params: any) => {
		setCurrentSelection(params.row)
		deletePart(params.row._id);
    setReload(true);
  };

  const columns = useMemo(() => [
		{field:'name', headerName:'Name', flex:1},
		{field:'category', headerName:'Category', flex:1},
		{field:'subCategory', headerName:'Sub Category', flex:1},
		{field:'compatibleMake', headerName:'Compatible Makes', flex:2},
		{field:'cost', headerName:'Cost (£)', flex:1},
		{field:'minQuantity', headerName:'Min Quantity', flex:1},
		{field:'quantity', headerName:'Quantity', flex:1},
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

  const title = "Inventory.";
  const introText = "View all part records and information. Create, update and delete part information.";

  const [parts, setParts] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentSelection, setCurrentSelection] = useState({});
  const [message, setMessage] = useState("");

  const getParts = () => {
    fetch("http://localhost:3000/api/inventory?")
      .then((response) => response.json())
      .then((data) => {
        setParts(data.parts)
      }),[]
  }

  const deletePart = (id:string) => {
    fetch(`http://localhost:3000/api/inventory?id=${id}`, {
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

  const addPart = (json: JSON) => {
    fetch("http://localhost:3000/api/inventory?", {
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

  const editPart = (json: JSON, partID: string) => {

    fetch(`http://localhost:3000/api/inventory/${partID}`, {
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
    if(reload || !parts){
      setReload(false);
      getParts();
    }
      
  },[reload])

  return (
    <>
      
      <div className="mx-2">
        <IntroCard title={title} text={introText} icon={"lucide:warehouse"} />

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
                    <Typography variant="h3">Parts</Typography>
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
                        Add New Part
                    </Button>
                </li>
            </ul>
        </Box>

      {reload && <LinearProgress/>}

      {parts && 
        <Table data={parts} columns={columns} defaultRows={5}></Table>
      }
        
      </div>
      {modalToggle && <PartModal setModalToggle={setModalToggle} addPart={addPart} editPart={editPart} defaultFormik={currentSelection} parts={parts} setCurrentSelection={setCurrentSelection}/>}
    </>
    
  )
}



export default Inventory
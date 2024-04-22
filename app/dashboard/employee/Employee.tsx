"use client"

import React, { useEffect, useState, useMemo } from 'react'
import Table from "@/app/components/TestTable/Table";
import AddModal from '@/app/components/Modals/Customer/AddModal';
import IntroCard from '@/app/components/Cards/IntroCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, Box, Typography, Alert} from '@mui/material';
import EditModal from '@/app/components/Modals/Customer/EditModal';
import Modal from '@/app/components/Modals/EmployeeModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/close';
import InfoIcon from '@mui/icons-material/Info';
import { useUserStore } from "../../hooks/userStore"



const Customer = () => {

  const user = useUserStore.getState();

    const title = "Employee Database.";
    const introText = "View all employee records and information. Create, update and delete employee information.";

  const handleRowEditClick = (params: any) => {
    setModalToggle(true)
    setCurrentSelection(params.row)
  };

  const handleRowDeleteClick = (params: any) => {
    deleteEmployee(params.row._id);
  };

  const columns = useMemo(() => [
    {field:'firstName', headerName:'First Name', flex:1, style: { borderRight: '10px solid #ccc' }},
    {field:'surname', headerName:'Surname', flex:1},
    {field:'contactNumber', headerName:'Number', flex:1},
    {field:'role', headerName:'Role', flex:1},
    {field:'admin', headerName:'Admin', flex:1, 
            renderCell: (params: any) => {
                if (typeof params.value === 'boolean' && params.value) {
                    return <CheckIcon />;
                } else if (typeof params.value === 'boolean' && !params.value){
                    return <CrossIcon />
                }}
        },
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

  const [employees, setEmployees] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [reload, setReload] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [message, setMessage] = useState("");


  const getEmployees = () => {
    fetch("http://localhost:3000/api/employee?")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees)
      }),[]
  }

  const deleteEmployee = (id:string) => {

    fetch(`http://localhost:3000/api/employee?id=${id}`, {
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

  const addEmployee = (json: JSON) => {

    console.log(json)

    fetch("http://localhost:3000/api/employee", {
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

// @ts-ignore
  const editEmployee = (json, id) => {

    fetch(`http://localhost:3000/api/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: json
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setReload(true)
          setMessage(data.message)  
          })
        .catch(error => console.error(error))
  }

  useEffect(() => {
    if(reload || !employees){
      setReload(false);
      getEmployees();
    }
      
  },[reload])

  return (
    <>

      {user.admin === false ? (

        <IntroCard title={"This is restricted to Admins Only"} text={"If you would like to change personal details, please access personal account details through the dashboard."} icon={"lucide:user-cog"} />)
      :
      (
      <>
      <div className="mx-2">
        <IntroCard title={title} text={introText} icon={"lucide:user-cog"} />

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
                    <Typography variant="h3">Employees</Typography>
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
                        Create New Employee
                    </Button>
                </li>
            </ul>
        </Box>

        {employees && 
          <Table data={employees} columns={columns} defaultRows={5}></Table>
        } 
      </div>

      {modalToggle && <Modal setAddToggle={setModalToggle} add={addEmployee} editEmployee={editEmployee} defaultFormik={currentSelection} setCurrentSelection={setCurrentSelection}/>}
      </>
      )}
    </>
    
  )
}



export default Customer

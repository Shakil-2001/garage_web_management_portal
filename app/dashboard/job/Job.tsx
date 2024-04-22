"use client"

import React, {useEffect, useState, useMemo} from 'react'
import { useUserStore } from "../../hooks/userStore"
import Table from "@/app/components/TestTable/Table";
import IntroCard from '@/app/components/Cards/IntroCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, IconButton, Box, Alert, Typography, LinearProgress, ToggleButton, FormControlLabel, Switch } from '@mui/material';
import AddJobModal from '@/app/components/Modals/AddJobModal';
import EditJobModal from '@/app/components/Modals/EditJobModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

const Job = () => {

  const title = "Job Dashboard"
  const introText = "View all job records and information. Start, track and update job information"

  const user = useUserStore.getState();

  const [vehicles, setVehicles] = useState(null);
  const [myJobs, setMyJobs] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [parts, setParts] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [editModalToggle, setEditModalToggle] = useState(false);
  const [reload, setReload] = useState(true);
  const [currentSelection, setCurrentSelection] = useState({});
  const [message, setMessage] = useState("");
  const [myJobsButton, setMyJobsButton] = useState("View my jobs");

  const handleRowEditClick = (params: any) => {
		setCurrentSelection(params.row)
    console.log(params.row)
		setEditModalToggle(true);
  };

  const handleRowDeleteClick = (params: any) => {
		setCurrentSelection(params.row)
		deleteJob(params.row._id);
  };

  const columns = useMemo(() => [
		{field:'job', headerName:'Job', flex:1},
		{field:'customerName', headerName:'Customer', flex:1},
		{field:'vehicleRegistration', headerName:'Vehicle', flex:1},
		{field:'employeeNames', headerName:'Employee', flex:1},
		{field:'status', headerName:'Status', flex:1},
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
    fetch("http://localhost:3000/api/customer?")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers)
      }),[]
  }

  const getEmployees = () => {
    fetch("http://localhost:3000/api/employee?")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees)
      }),[]
  }

  const getVehicles = () => {
    fetch("http://localhost:3000/api/vehicle?")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data.vehicles)
      }),[]
  }

  const getParts = () => {
    fetch("http://localhost:3000/api/inventory?")
      .then((response) => response.json())
      .then((data) => {
        setParts(data.parts)
      }),[]
  }

  const getJobs = () => {
    fetch("http://localhost:3000/api/job?")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.data)
        console.log(JSON.stringify(data.data))
      }),[]
  }

  const addVehicle = (json: JSON) => {

    setMessage("adding vehicle")

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

  const addCustomer = (json: JSON) => {

    setMessage("adding customer")

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

  const addJob = (json: JSON) => {

    setMessage("adding job")

    fetch("http://localhost:3000/api/job", {
      method: "POST",
      mode: "cors",
      //@ts-ignore
      body: json
    })
    .then((response) => response.json())
    .then((data) => {
      setReload(true)
      setMessage("Successfully added Job entry.")
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  const editJob = (json: JSON, jobId: string) => {

    fetch(`http://localhost:3000/api/job/${jobId}`, {
      method: "PUT",
      mode: "cors",
      //@ts-ignore
      body: json,
    })
    .then((response) => response.json())
    .then((data) => {
      setReload(true)
      setCurrentSelection({})
      setMessage("Successfully updated Job entry.")
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  const deleteJob = (id:string) => {

    setMessage("deleting job")

    fetch(`http://localhost:3000/api/job/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setReload(true)
        setMessage(data.message)
      })
      .catch((error) => {
        console.log(error)
      }),[]
  }

  useEffect(() => {
    if(!vehicles || !customers || !parts || !jobs || !employees || reload){
      getCustomers();
      getVehicles();
      getJobs();
      getParts();
      getEmployees();
      setReload(false);
    } 
  },[reload])
  return (
    <>
      <div className="mx-2">
        <IntroCard title={title} text={introText} icon={"lucide:sticky-note"} />

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
                    <Typography variant="h3">Jobs</Typography>
                </li>

                <li className="flex-grow"></li>

                <li className="ml-auto mr-3 my-auto">
                    <Button 
                    variant="contained" color="primary"
                    onClick={() => {
                      setMyJobs(!myJobs)
                     if(myJobs) {
                        setMyJobsButton("View My Jobs") 
                     }else {
                      setMyJobsButton("View All Jobs")
                     }
                    }}
                    sx={{
                        border: "1px solid",
                        color: "white",
                        float: 'right',

                    }}>
                        {myJobsButton}
                    </Button>
                </li>

                <li className="ml-auto mr-3 my-auto">
                    <Button 
                    variant="contained" color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={() => setAddModalToggle(true)}
                    sx={{
                        border: "1px solid",
                        color: "white",
                        float: 'right',

                    }}>
                        Start New Job
                    </Button>
                </li>
            </ul>
        </Box>

        {reload && <LinearProgress/>}

        {jobs &&
          // @ts-ignore
          <Table data={myJobs ? jobs.filter(job => user.jobs.includes(job._id)) : jobs} columns={columns} defaultRows={5}></Table>
        } 

      </div>

      {addModalToggle && <AddJobModal customers={customers} vehicles={vehicles} parts={parts} employees={employees} setAddToggle={setAddModalToggle} add={addJob} defaultFormik={currentSelection}/>}

      {editModalToggle && <EditJobModal parts={parts} employees={employees} setEditToggle={setEditModalToggle} edit={editJob} defaultFormik={currentSelection}/>}

    </>
  )
  }

export default Job
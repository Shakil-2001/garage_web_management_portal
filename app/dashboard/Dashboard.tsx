"use client"

import React, {useMemo, useState, useEffect} from "react";

import IntroCard from '@/app/components/Cards/IntroCard';
import Table from "@/app/components/TestTable/Table";
import UpdatePassword from '@/app/components/Modals/UpdatePassword';
import InfoIcon from '@mui/icons-material/Info';




import { useUserStore } from "../hooks/userStore"

import {Button, Typography, Grid, Box, Alert, Paper} from "@mui/material"



const Dashboard = () => {

    const user = useUserStore.getState();
    const [jobs, setJobs] = useState(null)
    const [updatePasswordToggle, setUpdatePasswordToggle] = useState(false)

    const [message, setMessage] = useState("");

    const boxSx = {
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const columns = useMemo(() => [
        {field:'job', headerName:'Job', flex:1},
        {field:'vehicleRegistration', headerName:'Vehicle', flex:1},
        {field:'employeeNames', headerName:'Employee', flex:1},
        {field:'status', headerName:'Status', flex:1},
    ], []
    )

    const getJobs = () => {
        fetch("http://localhost:3000/api/job?")
          .then((response) => response.json())
          .then((data) => {
            setJobs(data.data)
            console.log(JSON.stringify(data.data))
          }),[]
      }

    const editEmployee = (json: JSON, id:string) => {

    fetch(`http://localhost:3000/api/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: json
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMessage(data.message)  
            })
        .catch(error => console.error(error))
    }


    useEffect(() => {
        if(!jobs){
          getJobs();
        } 
      },[user])
    


    return (
        <>
            <div className="mx-2">
                <IntroCard title={"Dashboard"} text={`Welcome ${user.firstName}`} icon={"lucide:home"} />
            
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={8}>
                        <Box sx={{...boxSx, backgroundColor: "#244D87", height:"100%"}}>
                            <Typography variant="h3" color="white" className="pb-2">My Jobs</Typography>
                            {jobs && 
                                // @ts-ignore
                                <Table data={jobs.filter(job => user.jobs.includes(job._id))} columns={columns} defaultRows={3}></Table>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{...boxSx, backgroundColor: '#F0355A', height:"100%"}}>
                            <Typography variant="h3" color="white" onClick={() => console.log(user)}>Notifications</Typography>
                            <Paper className="p-2 mt-2 h-4/5">
                                <Typography >This feature will be added in future iterations</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{...boxSx, backgroundColor: '#4caf50', height:"100%"}}>
                            <Typography variant="h3" color="white">Upcoming Tasks</Typography>
                            <Paper className="p-2 mt-2 h-4/5">
                                <Typography >This feature will be added in future iterations</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{...boxSx, backgroundColor: 'white', border: "solid 4px #244D87", height:"100%"}}>
                            <Typography variant="h3" className="pb-2">Account Details</Typography>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">First Name </Typography>
                                <Typography className="my-auto">{`:  ${user.firstName}`}</Typography>
                            </div>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">Surname </Typography>
                                <Typography className="my-auto">{`:  ${user.surname}`}</Typography>
                            </div>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">Email </Typography>
                                <Typography className="my-auto">{`:  ${user.email}`}</Typography>
                            </div>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">Role </Typography>
                                <Typography className="my-auto">{`:  ${user.role}`}</Typography>
                            </div>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">Emergency Contact </Typography>
                                <Typography className="my-auto">{`:  ${user.emergencyContactName}`}</Typography>
                            </div>

                            <div className="flex flex-row">
                                <Typography className="my-auto"variant="h4">Emergency Contact Number </Typography>
                                <Typography className="my-auto">{`:  ${user.emergencyContactNumber}`}</Typography>
                            </div>

                            
                        
                            <Button variant="contained" color="primary" onClick={(e) => {
                                e.preventDefault();
                                setUpdatePasswordToggle(true)
                            }}>Update Password</Button>

                        {message && 
                            <div className="flex justify-end mt-1">
                            <Alert
                                icon={<InfoIcon fontSize="inherit" style={{fontWeight:"bold"}} />}  severity="warning" 
                                variant="filled" 
                                onClose={() => {setMessage("")}} 
                                style={{ width: "fit-content"}}>
                                {message}
                                </Alert>
                            </div>
                        }

                        </Box>
                    </Grid>
                </Grid>            
            </div>
            {updatePasswordToggle && <UpdatePassword setToggle={setUpdatePasswordToggle} editEmployee={editEmployee} id={user._id} />}
        </>
    )
}

export default Dashboard;

import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material"

import EditModal from "../Modals/Customer/EditModal"

import React, {useState} from 'react'

//@ts-ignore
const CustomerTable = ({data, editToggle, setEditToggle, setReload, searchTerm}) => {

    const [currentSelection, setCurrentSelection] = useState({});

  return (
    <TableContainer component={Paper}>

        {editToggle && <EditModal json={currentSelection} isVisible={editToggle} setEditModal={setEditToggle} setReload={setReload}/>}

        <Table aria-label="Customer Table">

            <TableHead>
                <TableRow>
                    <TableCell>F.Name</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Postcode</TableCell>
                    <TableCell>Number</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    //@ts-ignore
                    data.filter((row) => {
                        return searchTerm.toLowerCase() === "" ? row : row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
                    //@ts-ignore
                    }).map(row => (
                        <TableRow 
                            className="cursor-pointer"
                            onClick={() => {
                                setEditToggle(true)
                                setCurrentSelection(row)
                            }}
                            key={row._id} 
                            sx={{'&:last-child td, &:last-child th' : { border: 0}}}>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.surname}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.postcode}</TableCell>
                            <TableCell>{row.number}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>

        </Table>

    </TableContainer>
  )
}

export default CustomerTable
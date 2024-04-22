"use client"

import React, {useState} from 'react'
import { Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import Add from '@mui/icons-material/Logout';
import SearchBar from '../SearchBar/SearchBar';
import ToolbarWrapper from '../Wrappers/ToolbarWrapper';
import ModalWrapper from '../Wrappers/ModalWrapper';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const InventoryToolbar = ({setSearchTerm, setPartToggle, disabled} : {setSearchTerm: Function, setPartToggle: Function, disabled: boolean}) => {

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
	};

  return (
    <ToolbarWrapper>
			<SearchBar handleChange={handleChange} />
					
			<div className="flex grow"></div>

			{!disabled && 
				<Button style={{maxHeight: '40px'}} size="medium" variant="contained" startIcon={<AddCircleIcon />} onClick={() => setPartToggle(true)}> Add Part
				</Button>
			}
			
    </ToolbarWrapper>
    
  )
}

export default InventoryToolbar
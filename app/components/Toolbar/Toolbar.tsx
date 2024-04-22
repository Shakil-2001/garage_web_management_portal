import React, {useState} from 'react'
import { AppBar, Button, Toolbar as Tbar, Typography, Box, Container, InputAdornment, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchBar from "../SearchBar/SearchBar"
import ToolbarWrapper from "../Wrappers/ToolbarWrapper"

const Toolbar = ({name, setAdd, editToggle, setSearchTerm}: {name:String, setAdd:Function, editToggle:boolean, setSearchTerm: Function}) => {

  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  };

  return (

    <ToolbarWrapper>
      <SearchBar handleChange={handleChange}/>

      <div className="grow"></div>

      <ul className="flex items-center ml-auto space-x-6 ml-10">
        <li>
          <Button 
            disabled={editToggle ? true : false}
            className="h-max mr-2" 
            variant="contained" 
            startIcon={<AddCircleIcon />}
            onClick={() => setAdd(true)}>
              Add
          </Button>
        </li>
      </ul>

    </ToolbarWrapper>
        
  )
}

export default Toolbar
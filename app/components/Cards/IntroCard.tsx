import React from 'react'
import { Icon } from "@iconify/react";
import { Paper, Box} from '@mui/material'

const IntroCard = ({title, text, icon}: {title:string, text:string, icon:string}) => {
  return (
    <Paper elevation={2} 
        sx={{
            margin: '10px 0px',
            padding: '10px 5px',
            display: 'flex',
            'flex-direction': 'row',
        }}>

        <Box 
        sx={{
            height: '100px',
            width: '100px',
            margin: '0 10px',
            padding: '10px 5px',
            border: '1px',
            'border-radius': '20px',
            bgcolor: ''
        }}>
            <Icon icon={icon} width="max" height="max"/>
        </Box>

        <Box 
        sx={{
            border: '1px',
            'border-radius': '20px',
            bgcolor: '',
            'margin': 'auto 20px',
            'vertical-align': 'middle'
        }}>
            <h1>{title}</h1>
            <h3>{text}</h3>
        </Box>


        
        
    </Paper>
  )
}

export default IntroCard
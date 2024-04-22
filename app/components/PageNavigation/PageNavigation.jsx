import React from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import {IconButton, Typography} from '@mui/material'

const PageNavigation = ({page, maxPages, setPage}) => {

    const nextPage = () => {
        if (page === maxPages) {
            setPage(page)
        } else {
            setPage(page + 1)
        }
    }

    const prevPage = () => {
        if (page === 1) {
            setPage(page)
        } else {
            setPage(page - 1)
        }
    }

  return (

    <div className="border-solid border-1 border-gray-500 rounded-lg flex items-center">
        
        <IconButton color={page === 1 ? "" : "primary"} aria-label="previous" onClick={(e) => {
                e.preventDefault();
                prevPage()}}>
            <NavigateBeforeIcon />
        </IconButton>

        <Typography className="text-center">{`${page}/${maxPages}`}</Typography>

        <IconButton color={page === maxPages ? "" : "primary"} aria-label="next" onClick={(e) => {
                e.preventDefault()
                nextPage()}}>
            <NavigateNextIcon />
        </IconButton>

    </div>
  )
}

export default PageNavigation
import React from 'react'

import {DataGrid} from '@mui/x-data-grid'
import {Box} from "@mui/material"




const Table = ({data, columns, defaultRows}) => {

	const numRow = defaultRows

  return (

	<Box sx={{
			border: 1,
			borderColor: "#192E4B",
			"border-radius": "5px",
			bgcolor: '#d7e2f2',
		}}>


			{console.log(numRow + typeof(numRow))}
			<DataGrid 
				columns={columns.map((col) => ({
					...col,
					headerClassName: 'column-header',
					cellClassName: 'column-cell',
				}))}
				initialState={{
					pagination: {
					  paginationModel: {
						pageSize: numRow,
					  },
					},
				  }}
				pageSizeOptions={[numRow, 5, 10, 15]} 
				rows={data}
				getRowId={row=>row._id}
				getRowSpacing={params => ({
					top:params.isFirstVisible ? 0:5,
					bottom: params.isLastVisible ? 0:5
				})}
				sx={{
						'z-index': '0'
				}}	
			/>
	</Box>

  )
}

export default Table
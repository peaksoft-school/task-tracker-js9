import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Toolbar, Tooltip, Typography } from '@mui/material'
import { Button } from '../button/Button'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${TableHead}`]: {
      color: theme.palette.common.white,
   },
   [`&.${TableBody}`]: {
      fontSize: 14,
   },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}))

const TableHeaderStyled = styled('h3')`
   font-family: 'Manrope';
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 19px;
`

const TableBodyTitleStyled = styled('p')`
   font-family: 'Manrope';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 22px;
`

export default function TableMui({ rows, column }) {
   return (
      <TableContainer component={Paper}>
         <Toolbar>
            <Typography
               sx={{ flex: '1 1 100%' }}
               variant="h6"
               id="tableTitle"
               component="div"
            >
               Workspace
            </Typography>
            <Tooltip title="Create">
               <Button>Create</Button>
            </Tooltip>
         </Toolbar>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {column.map((column) => (
                     <StyledTableCell
                        key={`header-${column.key}`}
                        align={column.align || 'left'}
                        style={
                           column.minWidth ? { minWidth: column.minWidth } : {}
                        }
                     >
                        <TableHeaderStyled>{column.heading}</TableHeaderStyled>
                     </StyledTableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                     {column.map((column) => {
                        const value = row[column.key]
                        return (
                           <StyledTableCell
                              key={`row-${column.key}`}
                              align={column.align}
                           >
                              <TableBodyTitleStyled>
                                 {value}
                              </TableBodyTitleStyled>
                           </StyledTableCell>
                        )
                     })}
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

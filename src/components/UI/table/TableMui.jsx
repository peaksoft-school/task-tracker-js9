import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Toolbar, Tooltip, Typography } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
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
               Workspase
            </Typography>
            <Tooltip>
               <div>create</div>
            </Tooltip>
         </Toolbar>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
               <StyledTableRow>
                  {column.map((item, index) => (
                     <StyledTableCell
                        key={item.key}
                        align={item.align || 'left'}
                     >
                        <TableHeaderStyled>{item.header}</TableHeaderStyled>
                     </StyledTableCell>
                  ))}
               </StyledTableRow>
            </TableHead>
            <TableBody>
               {rows.map((row) => (
                  <StyledTableRow key={row.key}>
                     <StyledTableCell key={column.key}>
                        {column.render(row)}
                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   )
}

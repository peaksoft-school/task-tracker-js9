import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function TableMui({ column, rows }) {
   return (
      <TableContainer style={{ width: '100%' }} component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead
               style={{
                  borderBottom: '2px solid #D7D7D7',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  height: '1rem',
               }}
            >
               <TableRow>
                  {column.map((column) => (
                     <StyledTableCell
                        key={`header-${column.key}`}
                        align={column.align}
                        style={
                           column.minWidth ? { minWidth: column.minWidth } : {}
                        }
                     >
                        {column.heading}
                     </StyledTableCell>
                  ))}
               </TableRow>
            </TableHead>

            <TableBody>
               {rows.map((row, rowIndex) => (
                  <StyledTableRow key={row.id || row.appointmentId}>
                     {column.map((column) => {
                        if (column.render) {
                           return (
                              <StyledTableCell
                                 key={column.key}
                                 align={column.align}
                              >
                                 {column.render(row)}
                              </StyledTableCell>
                           )
                        }
                        const value = column.index
                           ? rowIndex + 1
                           : row[column.key]
                        if (column.key === 'name') {
                           return (
                              <StyledTableCell
                                 key={`row-${column.key}`}
                                 align={column.align}
                              >
                                 {value}
                              </StyledTableCell>
                           )
                        }
                        return (
                           <StyledTableCell
                              key={`row-${column.key}`}
                              align={column.align}
                           >
                              {value}
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

const StyledTableCell = styled(TableCell)(({ theme, align }) => ({
   [`&.${TableHead}`]: {
      color: theme.palette.common.white,
   },
   [`&.${TableBody}`]: {
      fontSize: 14,
   },
   textAlign: align,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}))
